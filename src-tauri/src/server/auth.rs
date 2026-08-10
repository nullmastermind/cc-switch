//! Bearer-token authentication for browser (server) mode.
//!
//! The headless server binds to loopback by default, but loopback alone is not
//! a security boundary: any local process (including a browser page from an
//! unrelated origin doing a fetch to `127.0.0.1`) could otherwise drive the
//! whole config API. So every `/api/*` route requires a token that is generated
//! fresh on each start and only printed to the terminal that launched us.

use std::sync::Arc;

use axum::{
    extract::{Query, Request, State},
    http::{header, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
};
use serde::Deserialize;

/// The session token, generated once per server start.
///
/// Two v4 UUIDs (256 bits total, hyphens stripped) — the same source of
/// randomness the app already relies on for provider/session ids, so no new
/// dependency is needed just to produce a secret.
#[derive(Clone)]
pub struct AuthToken(Arc<String>);

impl AuthToken {
    pub fn generate() -> Self {
        let raw = format!(
            "{}{}",
            uuid::Uuid::new_v4().simple(),
            uuid::Uuid::new_v4().simple()
        );
        Self(Arc::new(raw))
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }

    /// Constant-time comparison, so a caller cannot recover the token
    /// byte-by-byte by measuring how long a rejection takes.
    fn matches(&self, candidate: &str) -> bool {
        let expected = self.0.as_bytes();
        let actual = candidate.as_bytes();
        if expected.len() != actual.len() {
            return false;
        }
        let mut diff = 0u8;
        for (a, b) in expected.iter().zip(actual.iter()) {
            diff |= a ^ b;
        }
        diff == 0
    }
}

#[derive(Deserialize)]
pub struct TokenQuery {
    token: Option<String>,
}

/// Rejects any `/api/*` request that does not carry the current token.
///
/// Accepts either `Authorization: Bearer <token>` (what the webshim's
/// `invoke()` sends) or `?token=<token>` (needed for `EventSource`, which the
/// browser gives us no way to attach custom headers to).
pub async fn require_token(
    State(token): State<AuthToken>,
    Query(query): Query<TokenQuery>,
    request: Request,
    next: Next,
) -> Response {
    let from_header = request
        .headers()
        .get(header::AUTHORIZATION)
        .and_then(|value| value.to_str().ok())
        .and_then(|value| value.strip_prefix("Bearer "))
        .map(str::to_owned);

    let presented = from_header.or(query.token);

    match presented {
        Some(value) if token.matches(&value) => next.run(request).await,
        _ => (
            StatusCode::UNAUTHORIZED,
            [(header::CONTENT_TYPE, "application/json")],
            r#"{"error":"missing or invalid token"}"#,
        )
            .into_response(),
    }
}

#[cfg(test)]
mod tests {
    use super::AuthToken;

    #[test]
    fn generated_token_is_64_hex_chars() {
        let token = AuthToken::generate();
        assert_eq!(token.as_str().len(), 64);
        assert!(token.as_str().chars().all(|c| c.is_ascii_hexdigit()));
    }

    #[test]
    fn distinct_tokens_per_generation() {
        assert_ne!(
            AuthToken::generate().as_str(),
            AuthToken::generate().as_str()
        );
    }

    #[test]
    fn matches_only_the_exact_token() {
        let token = AuthToken::generate();
        let value = token.as_str().to_string();

        assert!(token.matches(&value));
        assert!(!token.matches(""));
        assert!(!token.matches(&value[..value.len() - 1]));
        assert!(!token.matches(&format!("{value}x")));
        assert!(!token.matches(&value.to_uppercase()));
    }
}
