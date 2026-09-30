<div align="center">

# Cli-Switch

### The All-in-One Manager for Claude Code, Claude Desktop, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, Hermes Agent, MiniMax Code

[![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%202-orange.svg)](https://tauri.app/)


### 🌐 The Only Official Website: **[viber.vn](https://viber.vn)**

English | [中文](README_ZH.md) | [日本語](README_JA.md) | [Deutsch](README_DE.md) | [Changelog](CHANGELOG.md)

</div>

## Why Cli-Switch?

Modern AI-powered coding relies on tools like Claude Code, Claude Desktop, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, Hermes, MiniMax Code — but each has its own configuration format. Switching API providers means manually editing JSON, TOML, or `.env` files, and there is no unified way to manage MCP and Skills across multiple tools.

**Cli-Switch** gives you a single desktop app to manage all supported AI tools. Instead of editing config files by hand, you get a visual interface to import providers with one click, switch between them instantly, with 50+ built-in provider presets, unified MCP and Skills management, and system tray quick switching — all backed by a reliable SQLite database with atomic writes that protect your configs from corruption.

- **One App, Nine Tools** — Manage Claude Code, Claude Desktop, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, Hermes, MiniMax Code from a single interface
- **No More Manual Editing** — 50+ provider presets including AWS Bedrock, NVIDIA NIM, and community relays; just pick and switch
- **Unified MCP & Skills Management** — One panel to manage MCP servers and Skills across Claude, Codex, Gemini, Grok Build, OpenCode, Hermes, MiniMax Code with bidirectional sync
- **System Tray Quick Switch** — Switch providers instantly from the tray menu, no need to open the full app
- **Cloud Sync** — Sync provider data across devices via Dropbox, OneDrive, iCloud, or WebDAV servers
- **Cross-Platform** — Native desktop app for Windows, macOS, and Linux, built with Tauri 2
- **Built-in Utilities** — Includes various utilities for first-launch login confirmation, signature bypass, plugin extension sync, and more

## Screenshots

|                  Main Interface                   |                  Add Provider                  |
| :-----------------------------------------------: | :--------------------------------------------: |
| ![Main Interface](assets/screenshots/main-en.png) | ![Add Provider](assets/screenshots/add-en.png) |

## Features

[Full Changelog](CHANGELOG.md) | [Release Notes](docs/release-notes/v3.16.1-en.md)

### Provider Management

- **90+ provider presets** — Pick a preset and enter your key to add a provider, or create a custom configuration
- **Key fields only** — Switching replaces only the connection details such as the endpoint, key, and model; plugins, hooks, MCP, settings you added yourself, and comments stay as they are
- **Projects** — Save Claude Code's or Codex's current provider, MCP, Skills, and prompt files as a project (for Claude Desktop, only the provider is saved), then switch the whole setup in one click from the project switcher at the top of the main page or from the tray; when you switch to another project, the current state is automatically saved back to the previous project
- **OAuth Authentication Center (Beta)** — Sign in to multiple GitHub Copilot, ChatGPT, and xAI (Grok) accounts in "Settings → Auth" and use those subscriptions as providers in Claude Code, Claude Desktop, and Codex (everything except Codex's OpenAI Official requires local routing). Using a subscription outside the official client may violate the vendor's terms of service; assess the risk yourself
- **Third-party providers for Claude Desktop** — Connect directly to Anthropic-compatible endpoints; for non-Claude models, choose "Model Mapping" to map tiers like Sonnet, Opus, and Haiku to the provider's actual models through local routing
- **Universal providers** — One config syncs to Claude Code, Codex, and Gemini CLI
- One-click switching, system tray quick access, drag-and-drop sorting, import/export

### Proxy & Failover

- **API format conversion** — Local routing converts requests between Anthropic Messages, OpenAI Chat Completions, OpenAI Responses, and Gemini Native: Claude Code and Claude Desktop can use OpenAI- or Gemini-format providers, and Codex and Grok Build can use Chat Completions or Anthropic Messages providers
- **Per-tool toggle** — Local routing can be turned on separately for Claude Code, Codex, Gemini CLI, and Grok Build; once it's on, switching providers takes effect immediately for subsequent requests (Codex, Gemini CLI, and Grok Build may still need a restart if the switch changes the model)
- **Auto-failover** — Configure a failover queue for each tool; when a request fails, Cli-Switch automatically moves on to the next provider in the queue, backed by a circuit breaker and provider health monitoring
- **Rectifier** — Automatically fixes certain requests that some upstreams can't handle (e.g. Thinking signatures, or falling back when images aren't supported)
- Official providers (e.g. Claude Official) can't go through local routing (except Codex's OpenAI Official)
- Guides: [Using GPT in Claude Code](docs/guides/claude-codex-routing-guide-en.md) · [Using Claude in Codex](docs/guides/codex-claude-routing-guide-en.md)

### MCP, Prompts & Skills

- **Unified MCP panel** — Manage MCP servers across Claude, Codex, Gemini, Grok Build, OpenCode, Hermes, MiniMax Code with bidirectional sync and Deep Link import
- **Prompts** — Markdown editor with cross-app sync (CLAUDE.md / AGENTS.md / GEMINI.md) and backfill protection
- **Skills** — One-click install from GitHub repos or ZIP files, custom repository management, with symlink and file copy support

### Usage & Cost Tracking

- **Usage dashboard** — Track spending, requests, and tokens with trend charts, detailed request logs, and custom per-model pricing

### Session Manager & Workspace

- Browse, search, and restore conversation history across supported session sources
- **Workspace editor** (OpenClaw) — Edit agent files (AGENTS.md, SOUL.md, etc.) with Markdown preview

### System & Platform

- **Cloud sync** — Custom config directory (Dropbox, OneDrive, iCloud, NAS) and WebDAV server sync
- **Deep Link** — Import providers, MCP servers, prompts, and skills via URL
- Dark / Light / System theme, auto-launch, atomic writes, auto-backups, i18n (zh/zh-TW/en/ja/vi)

## FAQ

<details>
<summary><strong>Which AI tools does Cli-Switch support?</strong></summary>

Cli-Switch supports nine tools: **Claude Code**, **Claude Desktop**, **Codex**, **Gemini CLI**, **Grok Build**, **OpenCode**, **OpenClaw**, **Hermes**, and **MiniMax Code**. Each tool has dedicated provider presets and configuration management.

</details>

<details>
<summary><strong>Do I need to restart the terminal after switching providers?</strong></summary>

It depends on the tool:

- **Claude Code**: supports hot-switching of provider data — no restart needed.
- **Codex, Gemini CLI, Grok Build**: restart your terminal or the CLI tool for changes to take effect (Cli-Switch reminds you after switching). With local routing on, requests go to the new provider immediately, but all three tools may still need a restart if the switch changes the model.
- **Claude Desktop**: fully quit and reopen Claude Desktop; when using "Model Mapping", also keep Cli-Switch running.
- **OpenCode, OpenClaw, Hermes, Pi, MiniMax Code**: these are coexist-mode tools — clicking "Add" ("Enable" for Pi) writes the provider into the tool's own config alongside the others; you then pick the model you want inside the tool.

</details>

<details>
<summary><strong>Will switching providers change my plugins, hooks, or other settings?</strong></summary>

No. When you switch providers for Claude Code, Codex, Gemini CLI, or Grok Build, Cli-Switch replaces only the **key fields** in the config file: the endpoint, key, model name, and API protocol (plus the reasoning effort for Codex and the auth method for Gemini CLI), along with a few compatibility options that belong to the provider (such as Claude Code's "Disable Artifact Tool" and the context window). Plugins, hooks, permissions, MCP, environment variables you added yourself, comments, and formatting all stay as they are and apply to every provider.

You can change these shared settings in the tool itself or by editing the config file by hand. You can also edit any provider in Cli-Switch: the editor shows "what the config file will look like after switching to this provider". When you save, the key fields are stored in that provider, and every other change is written to the config file and applies to every provider.

So the old "Common Config Snippet" is no longer needed, and its buttons have been removed. Settings that were in your snippet before the upgrade were already written into the config file when you switched, so they stay. Before Cli-Switch rewrites each config file for the first time, it also backs up the original to `~/.cc-switch/backups/live-first-write/`.

</details>

<details>
<summary><strong>I changed the model inside the tool — why does it go back after I switch away and back?</strong></summary>

The model is a key field and belongs to the provider. A model you pick inside the tool (such as with `/model` in Claude Code) stays in effect until the next switch; when you switch, the model in the config file is replaced with the one saved in the target provider, and Cli-Switch doesn't save the model you picked back to the previous provider. To keep using a model long-term, edit that provider in Cli-Switch.

Older versions saved the whole config file back to the provider when you switched away. That no longer happens: it froze plugins and other shared settings into one provider, so they were lost when you switched to another one.

</details>

<details>
<summary><strong>Why can't I delete the currently active provider?</strong></summary>

Cli-Switch follows a "minimal intrusion" design principle — even if you uninstall the app, your CLI tools will continue to work normally. The system always keeps one active configuration, because deleting all configurations would make the corresponding CLI tool unusable. If you rarely use a specific CLI tool, you can hide it in Settings. To switch back to official login, see the next question.

</details>

<details>
<summary><strong>How do I switch back to official login?</strong></summary>

In Cli-Switch, the provider lists for Claude Code, Claude Desktop, Codex, Gemini CLI, and Grok Build each include a built-in official provider (**Claude Official**, **Claude Desktop Official**, **OpenAI Official**, **Google Official**, **Grok Official**); if you deleted it, add it back from the presets. After switching to the official provider, follow the tool's own login flow (e.g. `/login` in Claude Code, `codex login` for Codex), and then you can freely switch between the official provider and third-party providers.

For Codex, you can also sign in to multiple ChatGPT accounts inside Cli-Switch via "Sign in with ChatGPT" and choose an "Account to use" for each **OpenAI Official** card, so switching between multiple Plus, Pro, or Team accounts takes one click; cards set to "Follow Codex login" keep using the Codex CLI's own login.

Note: official providers can't be selected while local routing is on — Codex's OpenAI Official cards are the exception.

</details>

<details>
<summary><strong>With local routing on, why does my config file point to 127.0.0.1?</strong></summary>

With local routing on, the tool's requests first go to Cli-Switch's local routing (`http://127.0.0.1:15721` by default), and Cli-Switch then forwards them to the provider you selected. That's why the tool's config file only contains the local address and the placeholder key `PROXY_MANAGED`; for Claude Code, the model name is also written as a fixed alias such as `claude-sonnet-5` (the `/model` menu still shows the real model name). The real provider address, key, and model are all stored in Cli-Switch.

In "Settings → Usage Statistics → Request Logs" you can see "requested model → actual model" for each request.

While local routing is on, switching changes the provider that local routing uses; the provider you were using before you turned it on stays the same and is labeled "Direct" on its card. When you turn local routing off, the config file is written back to this direct provider's configuration. Quitting Cli-Switch also writes back the direct provider first, and local routing is reconnected the next time Cli-Switch starts.

</details>

<details>
<summary><strong>Can I use OpenAI-compatible APIs, Gemini, or local models in Claude Code?</strong></summary>

Yes, but you need to turn on local routing. When editing the provider, set "Upstream Format" under "Advanced Options" to match the provider's API: choose "OpenAI Chat Completions" for services that only offer a Chat Completions endpoint (as many local model servers do), "OpenAI Responses API" for services that offer a Responses endpoint, and "Gemini Native generateContent" for Gemini. Then turn on local routing for Claude Code as described in step 5 of [Quick Start](#quick-start). Choosing the wrong format or not turning on local routing usually results in a 404 or 405 error.

Conversely, choosing "Anthropic Messages" as the "Upstream Format" in Codex or Grok Build lets you use Claude-format providers; this also requires local routing. See [Using GPT in Claude Code](docs/guides/claude-codex-routing-guide-en.md) and [Using Claude in Codex](docs/guides/codex-claude-routing-guide-en.md) for details.

</details>

<details>
<summary><strong>"Connectivity check" passed, so why do requests still fail?</strong></summary>

The "Connectivity check" on a provider card only checks whether the provider address is reachable; it doesn't send a real model request, so it can't verify whether the API key and model name are correct. When requests fail, check the key, model name, and upstream format; with local routing on, you can also see the exact error in "Settings → Usage Statistics → Request Logs".

</details>

<details>
<summary><strong>Where is my data stored?</strong></summary>

Everything lives in a single folder in your home directory. You can open it from
**Settings → Cli-Switch Configuration Directory**, and point it at a cloud-synced
folder there too.

- **Database**: `cc-switch.db` (SQLite — providers, MCP, prompts, Skills, projects, usage records, etc.)
- **Local settings**: `settings.json` (device-level settings such as each tool's config directory, backup policy, and cloud sync connection details)
- **Backups**: `backups/` (backed up automatically every 24 hours by default, keeping the 10 most recent; adjustable in "Settings → Advanced → Backup & Restore")
- **Skills**: `skills/` (can be changed to `~/.agents/skills` in Settings), synced to each tool via symlinks by default, falling back to copying if that fails
- **Skill Backups**: `skill-backups/` (created automatically before uninstalling or updating a skill, keeping the 20 most recent)
- **OAuth login credentials**: `copilot_auth.json`, `codex_oauth_auth.json`, `xai_oauth_auth.json`
- **Logs**: `logs/cc-switch.log` and `crash.log` — please attach them when reporting an issue
- **Device state**: `live-state.json` (whether each tool is connected directly or through local routing, and what was last written), `codex-login-stash.json` (the official Codex login moved aside when you switch to a third-party provider, restored when you switch back to an official one)
- **Original config files**: `backups/live-first-write/` (each tool's config file as it was before Cli-Switch first rewrote it)

After you change "Cli-Switch Configuration Directory" in "Settings → Advanced → Configuration Directory", all of the files above except `settings.json`, the device state, and the original config files are stored in the new directory. Cli-Switch doesn't move existing files automatically, so copy them over manually first. `settings.json`, the device state, and the original config files belong to this computer only: they always stay in the default directory and are not included in cloud sync.

</details>

<details>
<summary><strong>How do I manage tools inside WSL on Windows?</strong></summary>

Cli-Switch doesn't detect WSL automatically. In "Settings → Advanced → Configuration Directory → Configuration Directory Override (Advanced)", change the directory for the corresponding tool to a path inside WSL, e.g. `\\wsl.localhost\Ubuntu\home\<user>\.claude`; after you save, Cli-Switch reads and writes the config inside WSL (supported for Claude Code, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, Hermes, and Pi). Once this is set, the "About" page also detects and upgrades that tool in the corresponding WSL distribution.

Note: local routing writes `127.0.0.1` as the address into the config. In WSL2's default NAT networking mode, `127.0.0.1` inside WSL can't reach local routing on Windows; switch WSL to mirrored networking mode instead.

</details>

<details>
<summary><strong>Is there a command-line or headless version?</strong></summary>

Cli-Switch ships as a desktop app (see [Download & Installation](#download--installation) for system requirements). The same UI also runs in a browser or on a headless machine via **[@spec-ade/cli-switch](https://www.npmjs.com/package/@spec-ade/cli-switch)** (`npx @spec-ade/cli-switch`); it uses the same `~/.cc-switch` database as the desktop app.

For a terminal-only TUI or command-line mode, the community-maintained **[CC Switch CLI](https://github.com/SaladDay/cc-switch-cli)** supports Claude Code, Codex, Gemini CLI, OpenCode, OpenClaw, Hermes, and Pi, and can be installed via Homebrew (`brew install cc-switch-cli`) or an install script.

By default, CC Switch CLI shares the `~/.cc-switch` data directory with the desktop app and is compatible with the desktop app's WebDAV sync. The two projects are released separately, and the database version the CLI supports sometimes lags behind the desktop app; if you see a "database version is too new" message, upgrade the CLI or wait for it to catch up.

</details>

<details>
<summary><strong>Linux (Wayland + NVIDIA): clicks don't register and the window black-screens on resize</strong></summary>

The AppImage forces `GDK_BACKEND=x11` (XWayland) to avoid a historical native-Wayland crash. On newer Wayland + NVIDIA setups this can leave the web content area unclickable (the title-bar buttons still work) and black-screen on resize. Launch with the opt-in escape hatch to switch back to native Wayland:

```bash
CLI_SWITCH_GDK_BACKEND=wayland ./Cli-Switch-*.AppImage
```

If you launch from a desktop icon, add it to the `.desktop` `Exec=` line (e.g. `env CLI_SWITCH_GDK_BACKEND=wayland /path/to/AppImage`) or set it in your session environment. The variable is generic: on tiling Wayland compositors (sway/Hyprland) where clicks don't register, try `CLI_SWITCH_GDK_BACKEND=x11` instead. Leaving it unset keeps the default behavior.

</details>

## Documentation

For detailed guides on every feature, check out the **[User Manual](docs/user-manual/en/README.md)** — covering provider management, MCP/Prompts/Skills, proxy & failover, and more.

## Quick Start

### Basic Usage

1. **Add Provider**: Click "Add Provider" → Choose a preset or create custom configuration
2. **Switch Provider**:
   - Main UI: Select provider → Click "Enable"
   - System Tray: Click provider name directly (instant effect)
3. **Takes Effect**: Restart your terminal or the corresponding CLI tool to apply changes (Claude Code does not require a restart)
4. **Back to Official**: Add an "Official Login" preset, restart the CLI tool, then follow its login/OAuth flow

### MCP, Prompts, Skills & Sessions

- **MCP**: Click the "MCP" button → Add servers via templates or custom config → Toggle per-app sync
- **Prompts**: Click "Prompts" → Create presets with Markdown editor → Activate to sync to live files
- **Skills**: Click "Skills" → Browse GitHub repos → One-click install to supported apps
- **Sessions**: Click "Sessions" → Browse, search, and restore conversation history across supported session sources

> **Note**: On first launch, you can manually import existing CLI tool configs as the default provider.

## Download & Installation

### System Requirements

- **Windows**: Windows 10 and above
- **macOS**: macOS 12 (Monterey) and above
- **Linux**: Ubuntu 22.04+ / Debian 11+ / Fedora 34+ and other mainstream distributions

### Windows Users

Download the latest `Cli-Switch-v{version}-Windows.msi` installer or `Cli-Switch-v{version}-Windows-Portable.zip` portable version from the [Releases](../../releases) page.

### macOS Users

Download `Cli-Switch-v{version}-macOS.dmg` (recommended) or `.zip` from the [Releases](../../releases) page.

> **Note**: Cli-Switch for macOS is code-signed and notarized by Apple. You can install and open it directly.

### Linux Users

Download the latest Linux build from the [Releases](../../releases) page:

- `Cli-Switch-v{version}-Linux.deb` (Debian/Ubuntu)
- `Cli-Switch-v{version}-Linux.rpm` (Fedora/RHEL/openSUSE)
- `Cli-Switch-v{version}-Linux.AppImage` (Universal)

> **Flatpak**: Not included in official releases. You can build it yourself from the `.deb` — see [`flatpak/README.md`](flatpak/README.md) for instructions.

<details>
<summary><strong>Architecture Overview</strong></summary>

### Design Principles

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + TS)                    │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ Components  │  │    Hooks     │  │  TanStack Query  │    │
│  │   (UI)      │──│ (Bus. Logic) │──│   (Cache/Sync)   │    │
│  └─────────────┘  └──────────────┘  └──────────────────┘    │
└────────────────────────┬────────────────────────────────────┘
                         │ Tauri IPC
┌────────────────────────▼────────────────────────────────────┐
│                  Backend (Tauri + Rust)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │  Commands   │  │   Services   │  │  Models/Config   │    │
│  │ (API Layer) │──│ (Bus. Layer) │──│     (Data)       │    │
│  └─────────────┘  └──────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Core Design Patterns**

- **SSOT** (Single Source of Truth): All data stored in one SQLite database
- **Dual-layer Storage**: SQLite for syncable data, JSON for device-level settings
- **Dual-way Sync**: Write to live files on switch, backfill from live when editing active provider
- **Atomic Writes**: Temp file + rename pattern prevents config corruption
- **Concurrency Safe**: Mutex-protected database connection avoids race conditions
- **Layered Architecture**: Clear separation (Commands → Services → DAO → Database)

**Key Components**

- **ProviderService**: Provider CRUD, switching, backfill, sorting
- **McpService**: MCP server management, import/export, live file sync
- **ProxyService**: Local proxy mode with hot-switching and format conversion
- **SessionManager**: Conversation history browsing across supported session sources
- **ConfigService**: Config import/export, backup rotation
- **SpeedtestService**: API endpoint latency measurement

</details>

<details>
<summary><strong>Development Guide</strong></summary>

### Environment Requirements

- Bun 1.3+
- Rust 1.85+
- Tauri CLI 2.8+

### Development Commands

```bash
# Install dependencies
bun install

# Dev mode (hot reload)
bun run dev

# Type check
bun run typecheck

# Format code
bun run format

# Check code format
bun run format:check

# Run frontend unit tests
bun run test:unit

# Run tests in watch mode (recommended for development)
bun run test:unit:watch

# Build application
bun run build

# Build debug version
bun run tauri build --debug
```

### Rust Backend Development

```bash
cd src-tauri

# Format Rust code
cargo fmt

# Run clippy checks
cargo clippy

# Run backend tests
cargo test

# Run specific tests
cargo test test_name

# Run tests with test-hooks feature
cargo test --features test-hooks
```

### Testing Guide

**Frontend Testing**:

- Uses **vitest** as test framework
- Uses **MSW (Mock Service Worker)** to mock Tauri API calls
- Uses **@testing-library/react** for component testing

**Running Tests**:

```bash
# Run all tests
bun run test:unit

# Watch mode (auto re-run)
bun run test:unit:watch

# With coverage report
bun run test:unit --coverage
```

### Tech Stack

**Frontend**: React 18 · TypeScript · Vite · TailwindCSS 3.4 · TanStack Query v5 · react-i18next · react-hook-form · zod · shadcn/ui · @dnd-kit

**Backend**: Tauri 2.8 · Rust · serde · tokio · thiserror · tauri-plugin-updater/process/dialog/store/log

**Testing**: vitest · MSW · @testing-library/react

</details>

<details>
<summary><strong>Project Structure</strong></summary>

```
├── src/                        # Frontend (React + TypeScript)
│   ├── components/
│   │   ├── providers/          # Provider management
│   │   ├── mcp/                # MCP panel
│   │   ├── prompts/            # Prompts management
│   │   ├── skills/             # Skills management
│   │   ├── sessions/           # Session Manager
│   │   ├── proxy/              # Proxy mode panel
│   │   ├── openclaw/           # OpenClaw config panels
│   │   ├── settings/           # Settings (Terminal/Backup/About)
│   │   ├── deeplink/           # Deep Link import
│   │   ├── env/                # Environment variable management
│   │   ├── universal/          # Cross-app configuration
│   │   ├── usage/              # Usage statistics
│   │   └── ui/                 # shadcn/ui component library
│   ├── hooks/                  # Custom hooks (business logic)
│   ├── lib/
│   │   ├── api/                # Tauri API wrapper (type-safe)
│   │   └── query/              # TanStack Query config
│   ├── i18n/                   # Internationalization
│   │   └── locales/            # Translations (zh/zh-TW/en/ja)
│   ├── config/                 # Presets (providers/mcp)
│   └── types/                  # TypeScript definitions
├── src-tauri/                  # Backend (Rust)
│   └── src/
│       ├── commands/           # Tauri command layer (by domain)
│       ├── services/           # Business logic layer
│       ├── database/           # SQLite DAO layer
│       ├── proxy/              # Proxy module
│       ├── session_manager/    # Session management
│       ├── deeplink/           # Deep Link handling
│       └── mcp/                # MCP sync module
├── tests/                      # Frontend tests
└── assets/                     # Screenshots & partner resources
```

</details>

## Contributing

Issues and suggestions are welcome!

Before submitting PRs, please ensure:

- Pass type check: `bun run typecheck`
- Pass format check: `bun run format:check`
- Pass unit tests: `bun run test:unit`

For new features, please open an issue for discussion before submitting a PR. PRs for features that are not a good fit for the project may be closed.

## License

MIT
