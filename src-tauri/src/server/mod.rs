//! Browser (server) mode: serves the built frontend over HTTP and bridges it to
//! the same Tauri commands the desktop app uses.
//!
//! Only compiled under the `server-runtime` feature, where `AppRuntime` is
//! `tauri::test::MockRuntime` — the app runs headless, with no OS window.

pub mod auth;
pub mod bridge;
mod handler;
pub mod options;
pub mod runtime;
pub mod sse;

use std::net::SocketAddr;
use std::path::PathBuf;

use axum::{
    routing::{get, post},
    Router,
};
use tauri::AppHandle;
use tower_http::services::{ServeDir, ServeFile};

use crate::AppRuntime;
use auth::AuthToken;
use bridge::IpcWebview;
use options::ServerOptions;

/// Upper bound on an `/api/invoke` body. Well above any real command payload
/// (config imports are the largest) while still bounding memory per request;
/// axum's 2 MiB default is too small for zip/config imports.
const MAX_INVOKE_BODY_BYTES: usize = 64 * 1024 * 1024;

pub struct ServerHandles {
    pub app: AppHandle<AppRuntime>,
    pub webview: IpcWebview,
    pub token: AuthToken,
    pub options: ServerOptions,
}

/// Builds the router: authenticated JSON-RPC + SSE under `/api`, static
/// frontend everywhere else.
pub fn build_router(handles: &ServerHandles, static_dir: Option<PathBuf>) -> Router {
    let token = handles.token.clone();

    let api = Router::new()
        .route("/invoke", post(bridge::invoke))
        .layer(axum::extract::DefaultBodyLimit::max(MAX_INVOKE_BODY_BYTES))
        .with_state(handles.webview.clone())
        .merge(
            Router::new()
                .route("/events", get(sse::events))
                .with_state(handles.app.clone()),
        )
        // Applied last so it wraps both routes above.
        .layer(axum::middleware::from_fn_with_state(
            token,
            auth::require_token,
        ));

    let router = Router::new().nest("/api", api);

    match static_dir {
        Some(dir) => {
            // SPA fallback: unknown paths serve index.html so client-side
            // routing survives a reload.
            let index = dir.join("index.html");
            router.fallback_service(ServeDir::new(dir).fallback(ServeFile::new(index)))
        }
        None => router,
    }
}

/// Resolves where the built frontend lives.
///
/// In the npm package the binary and `dist/` ship side by side, so prefer a
/// sibling of the executable; `CC_SWITCH_WEB_DIST` overrides for local dev.
pub fn resolve_static_dir() -> Option<PathBuf> {
    if let Some(dir) = std::env::var_os("CC_SWITCH_WEB_DIST") {
        let dir = PathBuf::from(dir);
        if dir.join("index.html").is_file() {
            return Some(dir);
        }
        log::warn!(
            "[Server] CC_SWITCH_WEB_DIST is set but has no index.html: {}",
            dir.display()
        );
    }

    let exe_dir = std::env::current_exe().ok()?.parent()?.to_path_buf();
    [exe_dir.join("dist"), exe_dir.join("web")]
        .into_iter()
        .find(|candidate| candidate.join("index.html").is_file())
}

/// Binds the listener and serves until the process exits.
pub async fn serve(handles: ServerHandles) -> std::io::Result<()> {
    let static_dir = resolve_static_dir();
    if static_dir.is_none() {
        log::warn!("[Server] No frontend build found; serving API only");
    }

    let addr = SocketAddr::from((handles.options.host, handles.options.port));
    let listener = tokio::net::TcpListener::bind(addr).await?;
    let local_addr = listener.local_addr()?;

    let url = format!(
        "http://{}:{}/?token={}",
        display_host(&handles.options),
        local_addr.port(),
        handles.token.as_str()
    );

    // Printed rather than logged: this is the one line the user must see to
    // reach the UI, and it must not depend on the configured log level.
    println!("\n  CC Switch is running at:\n\n    {url}\n");
    if !handles.options.host.is_loopback() {
        println!(
            "  Warning: bound to {} — anyone who can reach this port and the\n  \
             token above can change your provider configuration.\n",
            handles.options.host
        );
    }

    if handles.options.open {
        open_browser(&url);
    }

    let router = build_router(&handles, static_dir);
    axum::serve(listener, router).await
}

fn display_host(options: &ServerOptions) -> String {
    if options.host.is_unspecified() {
        // 0.0.0.0 is not a URL a browser can open.
        "127.0.0.1".to_string()
    } else {
        options.host.to_string()
    }
}

fn open_browser(url: &str) {
    // `open`/`start`/`xdg-open` rather than the opener plugin: this runs before
    // any webview exists, and keeps the failure non-fatal.
    #[cfg(target_os = "windows")]
    let result = std::process::Command::new("cmd")
        .args(["/C", "start", "", url])
        .spawn();
    #[cfg(target_os = "macos")]
    let result = std::process::Command::new("open").arg(url).spawn();
    #[cfg(all(unix, not(target_os = "macos")))]
    let result = std::process::Command::new("xdg-open").arg(url).spawn();

    if let Err(e) = result {
        log::warn!("[Server] Could not open a browser automatically: {e}");
        println!("  Open the URL above manually.");
    }
}
