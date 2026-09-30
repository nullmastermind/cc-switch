<div align="center">

# Cli-Switch

### Der All-in-One-Manager für Claude Code, Claude Desktop, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, Hermes Agent, MiniMax Code

[![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%202-orange.svg)](https://tauri.app/)


### 🌐 Die einzige offizielle Website: **[viber.vn](https://viber.vn)**

[English](README.md) | [中文](README_ZH.md) | [日本語](README_JA.md) | Deutsch | [Changelog](CHANGELOG.md)

</div>

## Warum Cli-Switch?

Modernes KI-gestütztes Programmieren stützt sich auf Werkzeuge wie Claude Code, Claude Desktop, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, Hermes, MiniMax Code — doch jedes hat sein eigenes Konfigurationsformat. Der Wechsel des API-Anbieters bedeutet, JSON-, TOML- oder `.env`-Dateien von Hand zu bearbeiten, und es gibt keine einheitliche Möglichkeit, MCP und Skills über mehrere Werkzeuge hinweg zu verwalten.

**Cli-Switch** gibt Ihnen eine einzige Desktop-App, um alle unterstützten KI-Werkzeuge zu verwalten. Statt Konfigurationsdateien von Hand zu bearbeiten, erhalten Sie eine visuelle Oberfläche, um Anbieter mit einem Klick zu importieren und sofort zwischen ihnen zu wechseln — mit 50+ integrierten Anbieter-Presets, einheitlicher MCP- und Skills-Verwaltung und schnellem Umschalten über das System-Tray. Das Ganze gestützt auf eine zuverlässige SQLite-Datenbank mit atomaren Schreibvorgängen, die Ihre Konfigurationen vor Beschädigung schützen.

- **Eine App, neun Werkzeuge** — Verwalten Sie Claude Code, Claude Desktop, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, Hermes, MiniMax Code über eine einzige Oberfläche
- **Kein manuelles Bearbeiten mehr** — 50+ Anbieter-Presets einschließlich AWS Bedrock, NVIDIA NIM und Community-Relays; einfach auswählen und umschalten
- **Einheitliche MCP- & Skills-Verwaltung** — Ein Panel zur Verwaltung von MCP-Servern und Skills für Claude, Codex, Gemini, Grok Build, OpenCode, Hermes, MiniMax Code mit bidirektionaler Synchronisierung
- **Schnellumschaltung über System-Tray** — Wechseln Sie Anbieter sofort über das Tray-Menü, ohne die vollständige App öffnen zu müssen
- **Cloud-Synchronisierung** — Synchronisieren Sie Anbieterdaten geräteübergreifend über Dropbox, OneDrive, iCloud oder WebDAV-Server
- **Plattformübergreifend** — Native Desktop-App für Windows, macOS und Linux, gebaut mit Tauri 2
- **Integrierte Hilfsprogramme** — Enthält diverse Hilfsprogramme für die Login-Bestätigung beim Erststart, das Umgehen von Signaturen, die Synchronisierung von Plugin-Erweiterungen und mehr

## Screenshots

|                  Hauptoberfläche                   |                  Anbieter hinzufügen                  |
| :-----------------------------------------------: | :--------------------------------------------: |
| ![Hauptoberfläche](assets/screenshots/main-en.png) | ![Anbieter hinzufügen](assets/screenshots/add-en.png) |

## Funktionen

[Vollständiges Changelog](CHANGELOG.md) | [Release Notes](docs/release-notes/v3.16.1-en.md)

### Anbieterverwaltung

- **90+ Anbieter-Presets** — Preset auswählen und Schlüssel eintragen, um einen Anbieter hinzuzufügen; alternativ können Sie eine eigene Konfiguration erstellen
- **Nur Kernfelder** — Beim Wechsel werden nur die Verbindungsdaten wie Endpunkt, Schlüssel und Modell ersetzt; Plugins, Hooks, MCP, selbst hinzugefügte Einstellungen und Kommentare bleiben unverändert
- **Projekte** — Speichern Sie den aktuellen Anbieter sowie MCP, Skills und Prompt-Dateien von Claude Code oder Codex als Projekt (bei Claude Desktop nur den Anbieter) und wechseln Sie später über den Projektumschalter oben auf der Hauptseite oder über das System-Tray mit einem Klick die gesamte Konfiguration; beim Wechsel zu einem anderen Projekt wird der aktuelle Zustand automatisch im bisherigen Projekt gespeichert
- **OAuth Authentication Center (Beta)** — Melden Sie sich unter „Settings → Auth“ bei mehreren GitHub-Copilot-, ChatGPT- und xAI-(Grok-)Konten an und nutzen Sie die Abonnements als Anbieter in Claude Code, Claude Desktop und Codex (außer bei OpenAI Official in Codex ist dafür jeweils das lokale Routing erforderlich). Die Nutzung von Abonnements außerhalb der offiziellen Clients kann gegen die Nutzungsbedingungen des Herstellers verstoßen — bitte schätzen Sie das Risiko selbst ein
- **Claude Desktop mit Drittanbietern** — Direkte Verbindung zu Anthropic-kompatiblen Endpunkten möglich; für Nicht-Claude-Modelle wählen Sie „Model Mapping“, dann bildet das lokale Routing Stufen wie Sonnet, Opus und Haiku auf die tatsächlichen Modelle des Anbieters ab
- **Universelle Anbieter** — Eine Konfiguration synchronisiert sich mit Claude Code, Codex und Gemini CLI
- Umschaltung mit einem Klick, Schnellzugriff über System-Tray, Sortierung per Drag-and-drop, Import/Export

### Proxy & Failover

- **Formatkonvertierung** — Das lokale Routing konvertiert Anfragen zwischen Anthropic Messages, OpenAI Chat Completions, OpenAI Responses und Gemini Native: Claude Code und Claude Desktop können Anbieter im OpenAI- oder Gemini-Format nutzen, Codex und Grok Build Anbieter im Chat-Completions- oder Anthropic-Messages-Format
- **Pro Werkzeug aktivierbar** — Für Claude Code, Codex, Gemini CLI und Grok Build lässt sich das lokale Routing jeweils einzeln aktivieren; danach wirkt ein Anbieterwechsel sofort auf die folgenden Anfragen (ändert der Wechsel das Modell, kann bei Codex, Gemini CLI und Grok Build trotzdem ein Neustart nötig sein)
- **Automatisches Failover** — Konfigurieren Sie für jedes Werkzeug eine Failover-Warteschlange; schlägt eine Anfrage fehl, wird automatisch der nächste Anbieter in der Warteschlange verwendet — ergänzt durch Circuit Breaker und Anbieter-Health-Monitoring
- **Request-Rectifier** — Korrigiert automatisch bestimmte Anfragen, die mit dem Upstream nicht kompatibel sind (z. B. Thinking-Signaturen, Herabstufung, wenn keine Bilder unterstützt werden)
- Offizielle Anbieter (z. B. Claude Official) können nicht über das lokale Routing laufen (ausgenommen OpenAI Official von Codex)
- Anleitungen (auf Englisch): [GPT in Claude Code nutzen](docs/guides/claude-codex-routing-guide-en.md) · [Claude in Codex nutzen](docs/guides/codex-claude-routing-guide-en.md)

### MCP, Prompts & Skills

- **Einheitliches MCP-Panel** — Verwalten Sie MCP-Server für Claude, Codex, Gemini, Grok Build, OpenCode, Hermes, MiniMax Code mit bidirektionaler Synchronisierung und Deep-Link-Import
- **Prompts** — Markdown-Editor mit App-übergreifender Synchronisierung (CLAUDE.md / AGENTS.md / GEMINI.md) und Backfill-Schutz
- **Skills** — Installation mit einem Klick aus GitHub-Repositorys oder ZIP-Dateien, Verwaltung eigener Repositorys, mit Unterstützung für Symlinks und Dateikopien

### Nutzungs- & Kostenverfolgung

- **Nutzungs-Dashboard** — Verfolgen Sie Ausgaben, Anfragen und Token mit Trenddiagrammen, detaillierten Anfrageprotokollen und eigener Preisgestaltung pro Modell

### Session Manager & Workspace

- Gesprächsverlauf aus unterstützten Sitzungsquellen durchsuchen, suchen und wiederherstellen
- **Workspace-Editor** (OpenClaw) — Bearbeiten Sie Agent-Dateien (AGENTS.md, SOUL.md usw.) mit Markdown-Vorschau

### System & Plattform

- **Cloud-Synchronisierung** — Eigenes Konfigurationsverzeichnis (Dropbox, OneDrive, iCloud, NAS) und WebDAV-Server-Synchronisierung
- **Deep Link** — Importieren Sie Anbieter, MCP-Server, Prompts und Skills per URL
- Dunkles / Helles / System-Theme, automatischer Start, atomare Schreibvorgänge, automatische Backups, i18n (zh/zh-TW/en/ja/vi)

## FAQ

<details>
<summary><strong>Welche KI-Werkzeuge unterstützt Cli-Switch?</strong></summary>

Cli-Switch unterstützt neun Werkzeuge: **Claude Code**, **Claude Desktop**, **Codex**, **Gemini CLI**, **Grok Build**, **OpenCode**, **OpenClaw**, **Hermes**, **MiniMax Code**. Jedes Werkzeug verfügt über dedizierte Anbieter-Presets und Konfigurationsverwaltung.

</details>

<details>
<summary><strong>Muss ich das Terminal nach einem Anbieterwechsel neu starten?</strong></summary>

Das hängt vom Werkzeug ab:

- **Claude Code**: unterstützt Hot-Switching von Anbieterdaten — kein Neustart nötig.
- **Codex, Gemini CLI, Grok Build**: Starten Sie Ihr Terminal oder das CLI-Werkzeug neu, damit die Änderungen wirksam werden (Cli-Switch erinnert Sie nach dem Wechsel daran). Mit aktiviertem lokalem Routing gehen Anfragen sofort an den neuen Anbieter; ändert der Wechsel jedoch das Modell, kann bei allen drei Werkzeugen trotzdem ein Neustart nötig sein.
- **Claude Desktop**: Beenden Sie Claude Desktop vollständig und öffnen Sie es erneut; bei Verwendung von „Model Mapping“ muss Cli-Switch außerdem weiterlaufen.
- **OpenCode, OpenClaw, Hermes, Pi, MiniMax Code**: Dies sind Werkzeuge im Parallelmodus — ein Klick auf „Add“ (bei Pi „Enable“) trägt den Anbieter zusätzlich zu den bereits vorhandenen in die eigene Konfiguration des Werkzeugs ein; das gewünschte Modell wählen Sie anschließend im Werkzeug aus.

</details>

<details>
<summary><strong>Ändert ein Anbieterwechsel meine Plugins, Hooks oder andere Einstellungen?</strong></summary>

Nein. Beim Anbieterwechsel für Claude Code, Codex, Gemini CLI oder Grok Build ersetzt Cli-Switch in der Konfigurationsdatei nur die **Kernfelder**: Endpunkt, Schlüssel, Modellname und API-Protokoll (bei Codex zusätzlich die Reasoning-Stufe, bei Gemini CLI die Authentifizierungsmethode) sowie einige Kompatibilitätsoptionen, die zum Anbieter gehören (etwa „Disable Artifact Tool“ bei Claude Code und das Kontextfenster). Plugins, Hooks, Berechtigungen, MCP, selbst hinzugefügte Umgebungsvariablen, Kommentare und Formatierung bleiben unverändert und gelten für alle Anbieter.

Diese gemeinsamen Einstellungen können Sie direkt im Werkzeug ändern oder die Konfigurationsdatei von Hand bearbeiten. Sie können auch einen beliebigen Anbieter in Cli-Switch bearbeiten: Der Editor zeigt, „wie die Konfigurationsdatei nach dem Wechsel zu diesem Anbieter aussieht“. Beim Speichern werden die Kernfelder in diesem Anbieter gespeichert; alle anderen Änderungen werden in die Konfigurationsdatei geschrieben und gelten für alle Anbieter.

Das frühere „Common Config Snippet“ wird daher nicht mehr gebraucht, und die zugehörigen Schaltflächen wurden entfernt. Einstellungen, die vor dem Upgrade im Snippet standen, wurden beim Wechseln bereits in die Konfigurationsdatei geschrieben und bleiben dort erhalten. Bevor Cli-Switch eine Konfigurationsdatei zum ersten Mal umschreibt, sichert es außerdem das Original unter `~/.cc-switch/backups/live-first-write/`.

</details>

<details>
<summary><strong>Ich habe im Werkzeug das Modell gewechselt — warum ist es nach dem Hin- und Zurückwechseln wieder das alte?</strong></summary>

Das Modell ist ein Kernfeld und gehört zum Anbieter. Ein im Werkzeug gewähltes Modell (etwa mit `/model` in Claude Code) gilt bis zum nächsten Wechsel; beim Wechsel wird das Modell in der Konfigurationsdatei durch das im Zielanbieter gespeicherte ersetzt, und Cli-Switch speichert das im Werkzeug gewählte Modell nicht im vorherigen Anbieter. Wenn Sie ein Modell dauerhaft nutzen möchten, bearbeiten Sie diesen Anbieter in Cli-Switch.

Ältere Versionen haben beim Wegwechseln die gesamte Konfigurationsdatei in den Anbieter zurückgeschrieben. Das passiert nicht mehr: Dadurch wurden Plugins und andere gemeinsame Einstellungen in einem einzelnen Anbieter eingefroren und gingen beim Wechsel zu einem anderen Anbieter verloren.

</details>

<details>
<summary><strong>Warum kann ich den aktuell aktiven Anbieter nicht löschen?</strong></summary>

Cli-Switch folgt dem Designprinzip der „minimalen Eingriffstiefe" — selbst wenn Sie die App deinstallieren, funktionieren Ihre CLI-Werkzeuge weiterhin normal. Das System behält immer eine aktive Konfiguration bei, da das Löschen aller Konfigurationen das entsprechende CLI-Werkzeug unbrauchbar machen würde. Wenn Sie ein bestimmtes CLI-Werkzeug selten verwenden, können Sie es in den Einstellungen ausblenden. Wie Sie zurück zum offiziellen Login wechseln, erfahren Sie in der nächsten Frage.

</details>

<details>
<summary><strong>Wie wechsle ich zurück zum offiziellen Login?</strong></summary>

In Cli-Switch enthält die Anbieterliste von Claude Code, Claude Desktop, Codex, Gemini CLI und Grok Build jeweils bereits einen offiziellen Anbieter (**Claude Official**, **Claude Desktop Official**, **OpenAI Official**, **Google Official**, **Grok Official**); falls Sie ihn gelöscht haben, fügen Sie ihn aus den Presets wieder hinzu. Folgen Sie nach dem Wechsel zum offiziellen Anbieter dem Login-Vorgang des Werkzeugs (z. B. `/login` in Claude Code, `codex login` für Codex); anschließend können Sie frei zwischen dem offiziellen Anbieter und Drittanbietern wechseln.

Codex kann sich in Cli-Switch außerdem über „Sign in with ChatGPT“ bei mehreren ChatGPT-Konten anmelden; für jede **OpenAI Official**-Karte wählen Sie dann unter „Account to use“ ein Konto aus, sodass der Wechsel zwischen mehreren Plus-, Pro- oder Team-Konten mit einem Klick gelingt. Karten mit „Follow Codex login“ verwenden weiterhin den eigenen Login der Codex CLI.

Hinweis: Solange das lokale Routing aktiviert ist, kann nicht zu offiziellen Anbietern gewechselt werden — ausgenommen die OpenAI-Official-Karten von Codex.

</details>

<details>
<summary><strong>Warum steht nach dem Aktivieren des lokalen Routings 127.0.0.1 als Adresse in der Konfigurationsdatei?</strong></summary>

Bei aktiviertem lokalem Routing sendet das Werkzeug seine Anfragen zunächst an das lokale Routing von Cli-Switch (standardmäßig `http://127.0.0.1:15721`), und Cli-Switch leitet sie an den ausgewählten Anbieter weiter. Deshalb enthält die Konfigurationsdatei des Werkzeugs nur die lokale Adresse und den Platzhalterschlüssel `PROXY_MANAGED`; bei Claude Code wird der Modellname außerdem als fester Alias wie `claude-sonnet-5` eingetragen (im `/model`-Menü wird weiterhin der tatsächliche Modellname angezeigt). Die tatsächliche Anbieteradresse, der Schlüssel und das Modell sind in Cli-Switch gespeichert.

Unter „Settings → Usage Statistics → Request Logs“ sehen Sie für jede Anfrage „angefragtes Modell → tatsächliches Modell“.

Solange das lokale Routing aktiv ist, wechseln Sie den Anbieter, den das lokale Routing verwendet; der Anbieter, den Sie vor dem Aktivieren genutzt haben, bleibt unverändert und ist auf seiner Karte mit „Direct“ gekennzeichnet. Nach dem Deaktivieren des lokalen Routings wird die Konfigurationsdatei auf die Konfiguration dieses direkten Anbieters zurückgeschrieben. Auch beim Beenden von Cli-Switch wird zuerst der direkte Anbieter zurückgeschrieben; beim nächsten Start verbindet sich das lokale Routing wieder.

</details>

<details>
<summary><strong>Kann ich in Claude Code OpenAI-kompatible Schnittstellen, Gemini oder lokale Modelle verwenden?</strong></summary>

Ja, dafür muss jedoch das lokale Routing aktiviert sein. Wählen Sie beim Bearbeiten des Anbieters unter „Advanced Options“ im Feld „Upstream Format“ das Schnittstellenformat, das der Anbieter verwendet: Für Dienste, die nur eine Chat-Completions-Schnittstelle anbieten (was bei vielen lokalen Modelldiensten der Fall ist), wählen Sie „OpenAI Chat Completions“, für Dienste mit Responses-Schnittstelle „OpenAI Responses API“ und für Gemini „Gemini Native generateContent“. Aktivieren Sie anschließend wie in Schritt 5 des [Schnellstarts](#schnellstart) beschrieben das lokale Routing für Claude Code. Ist das falsche Format gewählt oder das lokale Routing nicht aktiviert, erscheint in der Regel ein 404- oder 405-Fehler.

Umgekehrt können Sie in Codex oder Grok Build unter „Upstream Format“ die Option „Anthropic Messages“ wählen, um Anbieter im Claude-Format zu nutzen — auch dafür muss das lokale Routing aktiviert sein. Details finden Sie in den Anleitungen [GPT in Claude Code nutzen](docs/guides/claude-codex-routing-guide-en.md) und [Claude in Codex nutzen](docs/guides/codex-claude-routing-guide-en.md) (auf Englisch).

</details>

<details>
<summary><strong>Der „Connectivity check“ war erfolgreich — warum schlagen Anfragen trotzdem fehl?</strong></summary>

Der „Connectivity check“ auf der Anbieterkarte prüft nur, ob die Anbieteradresse erreichbar ist, und sendet keine echte Modellanfrage; ob API-Schlüssel und Modellname korrekt sind, lässt sich damit also nicht überprüfen. Wenn Anfragen fehlschlagen, prüfen Sie Schlüssel, Modellname und Upstream-Format; bei aktiviertem lokalem Routing finden Sie die konkrete Fehlermeldung außerdem unter „Settings → Usage Statistics → Request Logs“.

</details>

<details>
<summary><strong>Wo werden meine Daten gespeichert?</strong></summary>

Alle Daten liegen in einem einzigen Ordner in Ihrem Home-Verzeichnis. Sie können
ihn über **Einstellungen → Cli-Switch Configuration Directory** öffnen und dort
auch auf einen cloud-synchronisierten Ordner verweisen lassen.

- **Datenbank**: `cc-switch.db` (SQLite — Anbieter, MCP, Prompts, Skills, Projekte, Nutzungsdaten usw.)
- **Lokale Einstellungen**: `settings.json` (gerätebezogene Einstellungen, z. B. die Konfigurationsverzeichnisse der einzelnen Werkzeuge, Backup-Richtlinie, Verbindungsdaten für die Cloud-Synchronisierung)
- **Backups**: `backups/` (standardmäßig automatisch alle 24 Stunden, die 10 neuesten werden behalten; anpassbar unter „Settings → Advanced → Backup & Restore“)
- **Skills**: `skills/` (in den Einstellungen auf `~/.agents/skills` umstellbar); standardmäßig per Symlink mit den einzelnen Werkzeugen synchronisiert; schlägt das fehl, wird stattdessen kopiert
- **Skill-Backups**: `skill-backups/` (vor dem Deinstallieren oder Aktualisieren eines Skills automatisch erstellt, die 20 neuesten werden behalten)
- **OAuth-Anmeldedaten**: `copilot_auth.json`, `codex_oauth_auth.json`, `xai_oauth_auth.json`
- **Logs**: `logs/cc-switch.log` und `crash.log` — bitte fügen Sie sie bei Problemmeldungen bei
- **Gerätezustand**: `live-state.json` (ob jedes Werkzeug direkt oder über das lokale Routing verbunden ist und was zuletzt geschrieben wurde), `codex-login-stash.json` (der offizielle Codex-Login, der beim Wechsel zu einem Drittanbieter beiseitegelegt und beim Zurückwechseln zu einem offiziellen Anbieter wiederhergestellt wird)
- **Original-Konfigurationsdateien**: `backups/live-first-write/` (die Konfigurationsdateien der Werkzeuge, bevor Cli-Switch sie zum ersten Mal umgeschrieben hat)

Wenn Sie unter „Settings → Advanced → Configuration Directory“ das „Cli-Switch Configuration Directory“ ändern, werden alle oben genannten Dateien außer `settings.json`, dem Gerätezustand und den Original-Konfigurationsdateien im neuen Verzeichnis abgelegt. Cli-Switch verschiebt vorhandene Dateien nicht automatisch; kopieren Sie sie vorher manuell dorthin. `settings.json`, der Gerätezustand und die Original-Konfigurationsdateien gehören nur zu diesem Rechner: Sie bleiben immer im Standardverzeichnis und werden nicht per Cloud synchronisiert.

</details>

<details>
<summary><strong>Wie verwalte ich unter Windows Werkzeuge in WSL?</strong></summary>

Cli-Switch erkennt WSL nicht automatisch. Ändern Sie unter „Settings → Advanced → Configuration Directory → Configuration Directory Override (Advanced)“ das Verzeichnis des jeweiligen Werkzeugs auf einen Pfad in WSL, z. B. `\\wsl.localhost\Ubuntu\home\<Benutzername>\.claude`; nach dem Speichern liest und schreibt Cli-Switch die Konfiguration in WSL (einstellbar für Claude Code, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, Hermes und Pi). Anschließend erkennt und aktualisiert auch die Seite „About“ das Werkzeug in der entsprechenden WSL-Distribution.

Hinweis: Das lokale Routing trägt als Adresse `127.0.0.1` in die Konfiguration ein. Im standardmäßigen NAT-Netzwerkmodus von WSL2 erreicht `127.0.0.1` in WSL das lokale Routing unter Windows nicht; wechseln Sie daher in den Mirrored-Netzwerkmodus von WSL.

</details>

<details>
<summary><strong>Gibt es eine Kommandozeilen- oder Headless-Version?</strong></summary>

Cli-Switch gibt es als Desktop-App (Systemanforderungen siehe [Download & Installation](#download--installation)). Dieselbe Oberfläche läuft auch im Browser oder headless über **[@spec-ade/cli-switch](https://www.npmjs.com/package/@spec-ade/cli-switch)** (`npx @spec-ade/cli-switch`) und nutzt dieselbe `~/.cc-switch`-Datenbank wie die Desktop-Version.

Für eine reine Terminal-TUI oder Kommandozeile empfehlen wir das von der Community gepflegte **[CC Switch CLI](https://github.com/SaladDay/cc-switch-cli)**: Claude Code, Codex, Gemini CLI, OpenCode, OpenClaw, Hermes und Pi, Installation per Homebrew (`brew install cc-switch-cli`) oder Installationsskript.

CC Switch CLI verwendet standardmäßig dasselbe Datenverzeichnis `~/.cc-switch` wie die Desktop-Version und ist auch mit deren WebDAV-Synchronisierung kompatibel. Die beiden Projekte werden unabhängig voneinander veröffentlicht, daher kann die von der CLI-Version unterstützte Datenbankversion zeitweise hinter der Desktop-Version zurückliegen; erscheint der Hinweis, dass die Datenbankversion zu neu ist, aktualisieren Sie die CLI-Version oder warten Sie, bis sie nachzieht.

</details>

<details>
<summary><strong>Linux (Wayland + NVIDIA): Klicks im Webinhalt reagieren nicht, schwarzer Bildschirm beim Größenändern</strong></summary>

Das AppImage erzwingt `GDK_BACKEND=x11` (XWayland), um einen historischen nativen Wayland-Absturz zu vermeiden. Auf neueren Wayland-+-NVIDIA-Systemen kann das dazu führen, dass der Webinhalt nicht anklickbar ist (die Titelleisten-Schaltflächen funktionieren weiterhin) und das Fenster beim Größenändern schwarz wird. Starten Sie mit dem optionalen Notausgang, um zu nativem Wayland zu wechseln:

```bash
CLI_SWITCH_GDK_BACKEND=wayland ./Cli-Switch-*.AppImage
```

Wenn Sie über ein Desktop-Symbol starten, fügen Sie es der `Exec=`-Zeile der `.desktop`-Datei hinzu (z. B. `env CLI_SWITCH_GDK_BACKEND=wayland /pfad/zum/AppImage`) oder setzen Sie es in Ihrer Sitzungsumgebung. Die Variable ist generisch: Auf Tiling-Wayland-Compositors (sway/Hyprland), bei denen Klicks nicht reagieren, versuchen Sie umgekehrt `CLI_SWITCH_GDK_BACKEND=x11`. Bleibt sie ungesetzt, bleibt das Standardverhalten erhalten.

</details>

## Dokumentation

Ausführliche Anleitungen zu jeder Funktion finden Sie im **[Benutzerhandbuch](docs/user-manual/en/README.md)** — es deckt Anbieterverwaltung, MCP/Prompts/Skills, Proxy & Failover und mehr ab.

## Schnellstart

### Grundlegende Verwendung

1. **Anbieter hinzufügen**: Klicken Sie auf „Add Provider" → Wählen Sie ein Preset oder erstellen Sie eine eigene Konfiguration
2. **Anbieter wechseln**:
   - Hauptoberfläche: Anbieter auswählen → auf „Enable" klicken
   - System-Tray: Anbietername direkt anklicken (sofort wirksam)
3. **Wirksam werden**: Starten Sie Ihr Terminal oder das entsprechende CLI-Werkzeug neu, um die Änderungen anzuwenden (Claude Code erfordert keinen Neustart)
4. **Zurück zum Offiziellen**: Fügen Sie ein „Official Login"-Preset hinzu, starten Sie das CLI-Werkzeug neu und folgen Sie dann seinem Login-/OAuth-Vorgang

### MCP, Prompts, Skills & Sessions

- **MCP**: Klicken Sie auf die Schaltfläche „MCP" → Server über Vorlagen oder eigene Konfiguration hinzufügen → Synchronisierung pro App umschalten
- **Prompts**: Klicken Sie auf „Prompts" → Presets mit dem Markdown-Editor erstellen → Aktivieren, um mit den Live-Dateien zu synchronisieren
- **Skills**: Klicken Sie auf „Skills" → GitHub-Repositorys durchsuchen → mit einem Klick in unterstützte Apps installieren
- **Sessions**: Klicken Sie auf „Sessions" → Gesprächsverlauf aus unterstützten Sitzungsquellen durchsuchen, suchen und wiederherstellen

> **Hinweis**: Beim Erststart können Sie bestehende CLI-Werkzeug-Konfigurationen manuell als Standardanbieter importieren.

## Download & Installation

### Systemanforderungen

- **Windows**: Windows 10 und höher
- **macOS**: macOS 12 (Monterey) und höher
- **Linux**: Ubuntu 22.04+ / Debian 11+ / Fedora 34+ und andere gängige Distributionen

### Windows-Nutzer

Laden Sie das neueste Installationsprogramm `Cli-Switch-v{version}-Windows.msi` oder die portable Version `Cli-Switch-v{version}-Windows-Portable.zip` von der Seite [Releases](../../releases) herunter.

### macOS-Nutzer

Laden Sie `Cli-Switch-v{version}-macOS.dmg` (empfohlen) oder `.zip` von der Seite [Releases](../../releases) herunter.

> **Hinweis**: Cli-Switch für macOS ist von Apple code-signiert und notarisiert. Sie können es direkt installieren und öffnen.

### Linux-Nutzer

Laden Sie den neuesten Linux-Build von der Seite [Releases](../../releases) herunter:

- `Cli-Switch-v{version}-Linux.deb` (Debian/Ubuntu)
- `Cli-Switch-v{version}-Linux.rpm` (Fedora/RHEL/openSUSE)
- `Cli-Switch-v{version}-Linux.AppImage` (universell)

> **Flatpak**: Nicht in den offiziellen Releases enthalten. Sie können es selbst aus dem `.deb` bauen — eine Anleitung finden Sie unter [`flatpak/README.md`](flatpak/README.md).

<details>
<summary><strong>Architekturüberblick</strong></summary>

### Designprinzipien

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

**Kern-Designmuster**

- **SSOT** (Single Source of Truth): Alle Daten werden in einer einzigen SQLite-Datenbank gespeichert
- **Zweischichtiger Speicher**: SQLite für synchronisierbare Daten, JSON für gerätebezogene Einstellungen
- **Bidirektionale Synchronisierung**: Schreiben in Live-Dateien beim Umschalten, Backfill aus den Live-Dateien beim Bearbeiten des aktiven Anbieters
- **Atomare Schreibvorgänge**: Das Muster aus temporärer Datei + Umbenennen verhindert die Beschädigung von Konfigurationen
- **Nebenläufigkeitssicher**: Eine durch Mutex geschützte Datenbankverbindung vermeidet Race Conditions
- **Geschichtete Architektur**: Klare Trennung (Commands → Services → DAO → Database)

**Schlüsselkomponenten**

- **ProviderService**: Anbieter-CRUD, Umschaltung, Backfill, Sortierung
- **McpService**: Verwaltung von MCP-Servern, Import/Export, Synchronisierung von Live-Dateien
- **ProxyService**: Lokaler Proxy-Modus mit Hot-Switching und Formatkonvertierung
- **SessionManager**: Durchsuchen des Gesprächsverlaufs über alle unterstützten Apps hinweg
- **ConfigService**: Konfigurations-Import/-Export, Backup-Rotation
- **SpeedtestService**: Messung der Latenz von API-Endpunkten

</details>

<details>
<summary><strong>Entwicklungsleitfaden</strong></summary>

### Umgebungsanforderungen

- Bun 1.3+
- Rust 1.85+
- Tauri CLI 2.8+

### Entwicklungsbefehle

```bash
# Abhängigkeiten installieren
bun install

# Entwicklungsmodus (Hot Reload)
bun run dev

# Typprüfung
bun run typecheck

# Code formatieren
bun run format

# Codeformatierung prüfen
bun run format:check

# Frontend-Unit-Tests ausführen
bun run test:unit

# Tests im Watch-Modus ausführen (für die Entwicklung empfohlen)
bun run test:unit:watch

# Anwendung bauen
bun run build

# Debug-Version bauen
bun run tauri build --debug
```

### Entwicklung des Rust-Backends

```bash
cd src-tauri

# Rust-Code formatieren
cargo fmt

# Clippy-Prüfungen ausführen
cargo clippy

# Backend-Tests ausführen
cargo test

# Bestimmte Tests ausführen
cargo test test_name

# Tests mit dem Feature test-hooks ausführen
cargo test --features test-hooks
```

### Testleitfaden

**Frontend-Tests**:

- Verwendet **vitest** als Test-Framework
- Verwendet **MSW (Mock Service Worker)**, um Tauri-API-Aufrufe zu mocken
- Verwendet **@testing-library/react** für Komponententests

**Tests ausführen**:

```bash
# Alle Tests ausführen
bun run test:unit

# Watch-Modus (automatische erneute Ausführung)
bun run test:unit:watch

# Mit Coverage-Bericht
bun run test:unit --coverage
```

### Tech-Stack

**Frontend**: React 18 · TypeScript · Vite · TailwindCSS 3.4 · TanStack Query v5 · react-i18next · react-hook-form · zod · shadcn/ui · @dnd-kit

**Backend**: Tauri 2.8 · Rust · serde · tokio · thiserror · tauri-plugin-updater/process/dialog/store/log

**Testing**: vitest · MSW · @testing-library/react

</details>

<details>
<summary><strong>Projektstruktur</strong></summary>

```
├── src/                        # Frontend (React + TypeScript)
│   ├── components/
│   │   ├── providers/          # Anbieterverwaltung
│   │   ├── mcp/                # MCP-Panel
│   │   ├── prompts/            # Prompts-Verwaltung
│   │   ├── skills/             # Skills-Verwaltung
│   │   ├── sessions/           # Session Manager
│   │   ├── proxy/              # Proxy-Modus-Panel
│   │   ├── openclaw/           # OpenClaw-Konfigurationspanels
│   │   ├── settings/           # Einstellungen (Terminal/Backup/About)
│   │   ├── deeplink/           # Deep-Link-Import
│   │   ├── env/                # Verwaltung von Umgebungsvariablen
│   │   ├── universal/          # App-übergreifende Konfiguration
│   │   ├── usage/              # Nutzungsstatistik
│   │   └── ui/                 # shadcn/ui-Komponentenbibliothek
│   ├── hooks/                  # Eigene Hooks (Geschäftslogik)
│   ├── lib/
│   │   ├── api/                # Tauri-API-Wrapper (typsicher)
│   │   └── query/              # TanStack-Query-Konfiguration
│   ├── i18n/                   # Internationalisierung
│   │   └── locales/            # Übersetzungen (zh/zh-TW/en/ja)
│   ├── config/                 # Presets (providers/mcp)
│   └── types/                  # TypeScript-Definitionen
├── src-tauri/                  # Backend (Rust)
│   └── src/
│       ├── commands/           # Tauri-Befehlsschicht (nach Domäne)
│       ├── services/           # Geschäftslogikschicht
│       ├── database/           # SQLite-DAO-Schicht
│       ├── proxy/              # Proxy-Modul
│       ├── session_manager/    # Sitzungsverwaltung
│       ├── deeplink/           # Deep-Link-Verarbeitung
│       └── mcp/                # MCP-Synchronisierungsmodul
├── tests/                      # Frontend-Tests
└── assets/                     # Screenshots & Partnerressourcen
```

</details>

## Mitwirken

Issues und Vorschläge sind willkommen!

Bitte stellen Sie vor dem Einreichen von PRs Folgendes sicher:

- Typprüfung besteht: `bun run typecheck`
- Formatprüfung besteht: `bun run format:check`
- Unit-Tests bestehen: `bun run test:unit`

Eröffnen Sie für neue Funktionen bitte vor dem Einreichen eines PR ein Issue zur Diskussion. PRs für Funktionen, die nicht gut zum Projekt passen, können geschlossen werden.

## Lizenz

MIT
