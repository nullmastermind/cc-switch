<div align="center">

# Cli-Switch

### Claude Code、Claude Desktop、Codex、Gemini CLI、Grok Build、OpenCode、OpenClaw、Hermes Agent、MiniMax Code のオールインワン管理ツール

[![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%202-orange.svg)](https://tauri.app/)


### 🌐 唯一の公式サイト：**[viber.vn](https://viber.vn)**

[English](README.md) | [中文](README_ZH.md) | 日本語 | [Deutsch](README_DE.md) | [Changelog](CHANGELOG.md)

</div>

## Cli-Switch を選ぶ理由

最新の AI コーディングは Claude Code、Claude Desktop、Codex、Gemini CLI、Grok Build、OpenCode、OpenClaw、Hermes、MiniMax Code などのツールに依存していますが、各ツールの設定形式はバラバラです。API プロバイダを切り替えるたびに JSON、TOML、`.env` ファイルを手動で編集する必要があり、複数ツール間で MCP や Skills を統一的に管理する手段もありません。

**Cli-Switch** は、対応する AI ツールを 1 つのデスクトップアプリで一元管理できます。設定ファイルを手作業で編集する代わりに、ワンクリックでプロバイダをインポートし、瞬時に切り替えられるビジュアルインターフェースを提供します。50 以上の組み込みプリセット、統一 MCP・Skills 管理、システムトレイからの即時切り替え機能を搭載。すべてはアトミック書き込みによる信頼性の高い SQLite データベースに支えられており、設定の破損を防ぎます。

- **1 つのアプリで 9 つのツール** -- Claude Code、Claude Desktop、Codex、Gemini CLI、Grok Build、OpenCode、OpenClaw、Hermes、MiniMax Code を単一インターフェースで管理
- **手動編集は不要** -- AWS Bedrock、NVIDIA NIM、コミュニティリレーなど 50 以上のプロバイダプリセットを内蔵。選んで切り替えるだけ
- **統一 MCP・Skills 管理** -- 1 つのパネルで Claude、Codex、Gemini、Grok Build、OpenCode、Hermes、MiniMax Code の MCP サーバーと Skills を双方向同期で管理
- **システムトレイでクイック切り替え** -- トレイメニューから即座にプロバイダを切り替え。アプリを開く必要なし
- **クラウド同期** -- Dropbox、OneDrive、iCloud、または WebDAV サーバー経由でデバイス間のプロバイダデータを同期
- **クロスプラットフォーム** -- Tauri 2 で構築された Windows、macOS、Linux 対応のネイティブデスクトップアプリ
- **便利ツール内蔵** -- 初回起動時のログイン確認、署名バイパス、プラグイン拡張の同期など、さまざまなユーティリティを搭載

## スクリーンショット

|                  メイン画面                   |                  プロバイダ追加                  |
| :-------------------------------------------: | :----------------------------------------------: |
| ![メイン画面](assets/screenshots/main-ja.png) | ![プロバイダ追加](assets/screenshots/add-ja.png) |

## 特長

[完全な更新履歴](CHANGELOG.md) | [リリースノート](docs/release-notes/v3.16.1-ja.md)

### プロバイダ管理

- **90 以上のプロバイダプリセット** — プリセットを選んでキーを入力するだけで追加。カスタム設定の作成も可能
- **主要フィールドだけを変更** — 切り替え時に置き換えるのはリクエスト先アドレス、キー、モデルなどの接続情報だけ。プラグイン、フック、MCP、自分で追加した設定やコメントはそのまま残ります
- **プロジェクト** — Claude Code または Codex の現在のプロバイダ、MCP、Skills、プロンプトファイルを 1 つのプロジェクトとして保存（Claude Desktop はプロバイダのみ保存）。以降はメインページ上部のプロジェクトスイッチャーやトレイから設定一式をワンクリックで切り替え。別のプロジェクトに切り替えると、現在の状態は自動的に元のプロジェクトへ保存
- **OAuth 認証センター（Beta）** — 「設定 → 認証」で GitHub Copilot、ChatGPT、xAI（Grok）の複数アカウントにログインし、サブスクリプションをプロバイダとして Claude Code、Claude Desktop、Codex で利用（Codex の OpenAI Official 以外はすべてローカルルーティングの有効化が必要）。公式クライアント以外でサブスクリプションを使用すると、ベンダーの利用規約に違反する可能性があります。リスクはご自身で判断してください
- **Claude Desktop でサードパーティを利用** — Anthropic 互換エンドポイントに直接接続可能。Claude 以外のモデルは「モデルマッピング」を選び、ローカルルーティング経由で Sonnet、Opus、Haiku などのティアをプロバイダの実際のモデルにマッピング
- **ユニバーサルプロバイダ** — 1 つの設定を Claude Code、Codex、Gemini CLI に同期
- ワンクリック切り替え、システムトレイからのクイック切り替え（Claude Code、Codex、Gemini CLI、Grok Build）、ドラッグ＆ドロップ並び替え、インポート/エクスポート

### プロキシ & フェイルオーバー

- **API 形式の変換** — ローカルルーティングが Anthropic Messages、OpenAI Chat Completions、OpenAI Responses、Gemini Native の間でリクエスト形式を変換。Claude Code と Claude Desktop は OpenAI 形式や Gemini 形式のプロバイダを、Codex と Grok Build は Chat Completions 形式や Anthropic Messages 形式のプロバイダを利用可能
- **ツールごとに有効化** — Claude Code、Codex、Gemini CLI、Grok Build でそれぞれ個別にローカルルーティングを有効化可能。有効化すると、プロバイダの切り替えが以降のリクエストに即座に反映（切り替えでモデルが変わる場合、Codex、Gemini CLI、Grok Build は再起動が必要になることがあります）
- **自動フェイルオーバー** — ツールごとにフェイルオーバーキューを設定し、リクエストが失敗するとキューの順に次のプロバイダへ自動で切り替え。サーキットブレーカーとプロバイダのヘルスモニタリングと連携
- **整流器** — 一部の上流と互換性のないリクエストを自動で修正（Thinking 署名、画像非対応時のフォールバックなど）
- 公式プロバイダ（Claude Official など）はローカルルーティングを経由できません（Codex の OpenAI Official を除く）
- 使い方ガイド：[Claude Code で GPT を使う](docs/guides/claude-codex-routing-guide-ja.md) · [Codex で Claude を使う](docs/guides/codex-claude-routing-guide-ja.md)

### MCP、Prompts & Skills

- **統一 MCP パネル** -- Claude、Codex、Gemini、Grok Build、OpenCode、Hermes、MiniMax Code の MCP サーバーを管理、双方向同期、Deep Link インポート対応
- **Prompts** -- Markdown エディタ、クロスアプリ同期（CLAUDE.md / AGENTS.md / GEMINI.md）、バックフィル保護
- **Skills** -- GitHub リポジトリまたは ZIP ファイルからワンクリックインストール、カスタムリポジトリ管理、シンボリックリンクとファイルコピーに対応

### 使用量 & コストトラッキング

- **使用量ダッシュボード** -- プロバイダ横断で支出・リクエスト数・トークン使用量を追跡、トレンドチャート、詳細リクエストログ、カスタムモデル価格設定

### Session Manager & ワークスペース

- 対応するセッションソースの会話履歴を閲覧・検索・復元
- **ワークスペースエディタ**（OpenClaw）-- エージェントファイル（AGENTS.md、SOUL.md など）を Markdown プレビュー付きで編集

### システム & プラットフォーム

- **クラウド同期** -- カスタム設定ディレクトリ（Dropbox、OneDrive、iCloud、NAS）および WebDAV サーバー同期
- **Deep Link** -- URL 経由でプロバイダ、MCP サーバー、Prompts、Skills をワンクリックインポート
- ダーク / ライト / システムテーマ、自動起動、アトミック書き込み、自動バックアップ、多言語対応（簡体中文/繁體中文/英/日）

## よくある質問

<details>
<summary><strong>Cli-Switch はどの AI ツールに対応していますか？</strong></summary>

Cli-Switch は **Claude Code**、**Claude Desktop**、**Codex**、**Gemini CLI**、**Grok Build**、**OpenCode**、**OpenClaw**、**Hermes**、**MiniMax Code** の 9 つのツールに対応しています。各ツールに専用のプロバイダプリセットと設定管理が用意されています。

</details>

<details>
<summary><strong>プロバイダを切り替えた後、ターミナルの再起動は必要ですか？</strong></summary>

ツールによって異なります：

- **Claude Code**：プロバイダデータのホットスイッチに対応しており、再起動は不要です。
- **Codex、Gemini CLI、Grok Build**：変更を反映するにはターミナルまたは CLI ツールを再起動してください（切り替え後に通知が表示されます）。ローカルルーティングを有効にしている場合、リクエストは即座に新しいプロバイダへ転送されますが、切り替えでモデルが変わる場合は、この 3 つのツールは再起動が必要になることがあります。
- **Claude Desktop**：Claude Desktop を完全に終了してから再度開いてください。「モデルマッピング」を使用する場合は、Cli-Switch を起動したままにしておく必要もあります。
- **OpenCode、OpenClaw、Hermes、Pi、MiniMax Code**：これらは共存型のツールです。「追加」（Pi では「有効化」）をクリックするとプロバイダがツール自身の設定に書き込まれ、他のプロバイダと共存します。その後、ツール内で使用するモデルを選んでください。

</details>

<details>
<summary><strong>プロバイダを切り替えると、プラグインやフックなどの設定も変わってしまいますか？</strong></summary>

変わりません。Claude Code、Codex、Gemini CLI、Grok Build でプロバイダを切り替えるとき、Cli-Switch が置き換えるのは設定ファイルの**主要フィールド**だけです。対象はリクエスト先アドレス、キー、モデル名、API プロトコル（Codex は推論レベル、Gemini CLI は認証方式も含む）と、プロバイダに合わせて切り替わる一部の互換オプション（Claude Code の「Artifact ツールを無効化」やコンテキストウィンドウなど）です。プラグイン、フック、権限、MCP、自分で追加した環境変数、コメント、書式はそのまま残り、すべてのプロバイダに適用されます。

これらの共有設定は、ツール内で変更しても、設定ファイルを直接編集しても構いません。Cli-Switch で任意のプロバイダを編集して変更することもできます。エディタには「このプロバイダに切り替えた後の設定ファイルの内容」が表示され、保存すると主要フィールドはそのプロバイダに保存され、それ以外の変更は設定ファイルに書き込まれてすべてのプロバイダに適用されます。

そのため、以前の「共通設定スニペット」は不要になり、関連するボタンは削除されました。アップグレード前にスニペットに入れていた設定は、切り替えの際にすでに設定ファイルへ書き込まれているので、そのまま残ります。また Cli-Switch は、各設定ファイルを初めて書き換える前に、元のファイルを `~/.cc-switch/backups/live-first-write/` にバックアップします。

</details>

<details>
<summary><strong>ツール内でモデルを変えたのに、別のプロバイダに切り替えて戻すと元に戻ってしまうのはなぜですか？</strong></summary>

モデルは主要フィールドで、プロバイダに属します。ツール内で変えたモデル（Claude Code の `/model` など）は次に切り替えるまで有効です。切り替えると、設定ファイルのモデルは切り替え先のプロバイダに保存されたものに置き換わり、ツール内で変えたモデルが元のプロバイダに保存し直されることはありません。特定のモデルを継続して使いたい場合は、Cli-Switch でそのプロバイダを編集してください。

以前のバージョンは、別のプロバイダへ切り替えるときに設定ファイル全体をプロバイダに保存し直していましたが、現在はそうしていません。その方式では、プラグインなどの共有設定が 1 つのプロバイダに固定されてしまい、別のプロバイダに切り替えると失われていたためです。

</details>

<details>
<summary><strong>現在アクティブなプロバイダを削除できないのはなぜですか？</strong></summary>

Cli-Switch は「最小限の介入」という設計原則に従っています。アプリをアンインストールしても、CLI ツールは正常に動作し続けます。すべての設定を削除すると対応する CLI ツールが使用できなくなるため、システムは常にアクティブな設定を 1 つ保持します。特定の CLI ツールをあまり使用しない場合は、設定で非表示にできます。公式ログインに戻す方法は、次の質問をご覧ください。

</details>

<details>
<summary><strong>公式ログインに戻すにはどうすればよいですか？</strong></summary>

Claude Code、Claude Desktop、Codex、Gemini CLI、Grok Build のプロバイダリストには、公式プロバイダ（**Claude Official**、**Claude Desktop Official**、**OpenAI Official**、**Google Official**、**Grok Official**）があらかじめ含まれています。削除してしまった場合は、プリセットから追加し直してください。公式プロバイダに切り替えた後、ツール自身のログインフロー（Claude Code の `/login`、Codex の `codex login` など）を実行すれば、以降は公式プロバイダとサードパーティプロバイダを自由に切り替えられます。

Codex では、Cli-Switch 内の「ChatGPT でログイン」から複数の ChatGPT アカウントにログインし、**OpenAI Official** カードごとに「使用するアカウント」を選べるため、複数の Plus、Pro、Team アカウントをワンクリックで切り替えられます。「Codex のログインに追従」を選んだカードは、Codex CLI 自身のログインをそのまま使用します。

注意：ローカルルーティングを有効にしている間は、公式プロバイダに切り替えられません（Codex の OpenAI Official カードを除く）。

</details>

<details>
<summary><strong>ローカルルーティングを有効にすると、設定ファイルのアドレスが 127.0.0.1 に変わるのはなぜですか？</strong></summary>

ローカルルーティングを有効にすると、ツールのリクエストはまず Cli-Switch のローカルルーティング（デフォルトは `http://127.0.0.1:15721`）に送られ、そこから Cli-Switch が選択中のプロバイダへ転送します。そのため、ツールの設定ファイルにはローカルアドレスとプレースホルダーのキー `PROXY_MANAGED` だけが書き込まれます。Claude Code のモデル名も `claude-sonnet-5` のような固定のエイリアスになります（`/model` メニューには実際のモデル名が表示されます）。実際のプロバイダのアドレス、キー、モデルはすべて Cli-Switch に保存されています。

「設定 → 利用統計 → リクエストログ」では、各リクエストの「リクエストモデル → 実際のモデル」を確認できます。

ローカルルーティングを有効にしている間に切り替わるのは、ローカルルーティングが使うプロバイダです。有効にする前に使っていたプロバイダは変わらず、カードに「直接接続」と表示されます。ローカルルーティングを無効にすると、設定ファイルはこの直接接続のプロバイダの設定に書き戻されます。Cli-Switch を終了するときも先に直接接続のプロバイダを書き戻し、次回起動時にローカルルーティングへ接続し直します。

</details>

<details>
<summary><strong>Claude Code で OpenAI 互換 API、Gemini、ローカルモデルを使えますか？</strong></summary>

使えますが、ローカルルーティングを有効にする必要があります。プロバイダを編集する際に、「高級オプション」の「上流フォーマット」でプロバイダに合った API 形式を選んでください。Chat Completions API のみを提供するサービス（多くのローカルモデルサービスがこれに当たります）は「OpenAI Chat Completions」、Responses API を提供するサービスは「OpenAI Responses API」、Gemini は「Gemini Native generateContent」を選びます。その後、[クイックスタート](#クイックスタート)の手順 5 に従って Claude Code のローカルルーティングを有効にしてください。形式の選択を誤ったり、ローカルルーティングを有効にしていなかったりすると、通常は 404 または 405 エラーになります。

逆に、Codex や Grok Build の「上流フォーマット」で「Anthropic Messages」を選ぶと、Claude 形式のプロバイダを使えます。この場合もローカルルーティングの有効化が必要です。詳しくは [Claude Code で GPT を使う](docs/guides/claude-codex-routing-guide-ja.md) と [Codex で Claude を使う](docs/guides/codex-claude-routing-guide-ja.md) をご覧ください。

</details>

<details>
<summary><strong>「接続チェック」は成功したのに、リクエストが失敗するのはなぜですか？</strong></summary>

プロバイダカードの「接続チェック」は、プロバイダのアドレスに接続できるかどうかだけを確認し、実際のモデルリクエストは送信しません。そのため、API キーやモデル名が正しいかどうかは検証できません。リクエストが失敗する場合は、キー、モデル名、上流フォーマットを確認してください。ローカルルーティングを有効にしている場合は、「設定 → 利用統計 → リクエストログ」で具体的なエラー内容も確認できます。

</details>

<details>
<summary><strong>データはどこに保存されますか？</strong></summary>

すべてのデータはホームディレクトリ内の 1 つのフォルダにまとまっています。
**設定 → Cli-Switch 設定ディレクトリ** から開けます。クラウド同期フォルダを
指定することもできます。

- **データベース**: `cc-switch.db`（SQLite — プロバイダ、MCP、プロンプト、Skills、プロジェクト、使用量記録など）
- **ローカル設定**: `settings.json`（デバイスレベルの設定。各ツールの設定ディレクトリ、バックアップポリシー、クラウド同期の接続情報など）
- **バックアップ**: `backups/`（デフォルトでは 24 時間ごとに自動バックアップし、最新 10 件を保持。「設定 → 詳細 → バックアップと復元」で変更可能）
- **Skills**: `skills/`（設定で `~/.agents/skills` に変更可能）。デフォルトではシンボリックリンクで各ツールに同期し、失敗した場合はコピーに切り替え
- **Skill バックアップ**: `skill-backups/`（スキルのアンインストールまたは更新の前に自動作成、最新 20 件を保持）
- **OAuth ログイン認証情報**: `copilot_auth.json`、`codex_oauth_auth.json`、`xai_oauth_auth.json`
- **ログ**: `logs/cc-switch.log` と `crash.log`（問題を報告する際は添付してください）
- **この端末の状態**: `live-state.json`（各ツールが直接接続かローカルルーティング経由か、前回何を書き込んだか）、`codex-login-stash.json`（サードパーティのプロバイダに切り替えたときに退避した Codex の公式ログイン。公式プロバイダに戻すと復元されます）
- **設定ファイルの原本**: `backups/live-first-write/`（Cli-Switch が各ツールの設定ファイルを初めて書き換える前の元のファイル）

「設定 → 詳細 → 設定ディレクトリ」で「Cli-Switch 設定ディレクトリ」を変更すると、`settings.json`、この端末の状態、設定ファイルの原本以外の上記ファイルはすべて新しいディレクトリに保存されるようになります。Cli-Switch は既存のファイルを自動では移動しないため、先に手動でコピーしておいてください。`settings.json`、この端末の状態、設定ファイルの原本はこのコンピュータ専用のもので、常にデフォルトのディレクトリに置かれ、クラウド同期の対象にもなりません。

</details>

<details>
<summary><strong>Windows で WSL 内のツールを管理するには？</strong></summary>

Cli-Switch は WSL を自動では認識しません。「設定 → 詳細 → 設定ディレクトリ → 設定ディレクトリの上書き（詳細）」で、対象ツールのディレクトリを WSL 内のパス（例：`\\wsl.localhost\Ubuntu\home\<ユーザー名>\.claude`）に変更して保存すると、Cli-Switch は WSL 内の設定を読み書きするようになります（Claude Code、Codex、Gemini CLI、Grok Build、OpenCode、OpenClaw、Hermes、Pi で設定可能）。設定後は、「バージョン情報」ページでも対応する WSL ディストリビューション内でそのツールを検出・アップグレードします。

注意：ローカルルーティングが設定に書き込むアドレスは `127.0.0.1` です。WSL2 のデフォルトである NAT ネットワークモードでは、WSL 内の `127.0.0.1` から Windows 上のローカルルーティングに接続できないため、WSL の mirrored ネットワークモードに切り替える必要があります。

</details>

<details>
<summary><strong>コマンドライン版やヘッドレス版はありますか？</strong></summary>

Cli-Switch はデスクトップアプリとして提供されます（システム要件は[ダウンロード & インストール](#ダウンロード--インストール)を参照）。同じ UI は **[@spec-ade/cli-switch](https://www.npmjs.com/package/@spec-ade/cli-switch)**（`npx @spec-ade/cli-switch`）でブラウザ／ヘッドレスでも動かせ、デスクトップ版と同じ `~/.cc-switch` データベースを使います。

ターミナル専用の TUI / コマンドラインが必要な場合は、コミュニティがメンテナンスしている **[CC Switch CLI](https://github.com/SaladDay/cc-switch-cli)** をおすすめします。Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw、Hermes、Pi に対応し、Homebrew（`brew install cc-switch-cli`）またはインストールスクリプトで入れられます。

CC Switch CLI はデフォルトでデスクトップ版とデータディレクトリ `~/.cc-switch` を共有し、デスクトップ版の WebDAV 同期とも互換性があります。2 つのプロジェクトは別々にリリースされるため、CLI 版が対応するデータベースのバージョンがデスクトップ版より遅れることがあります。「データベースのバージョンが新しすぎます」という表示が出た場合は、CLI 版をアップグレードするか、CLI 版の対応を待ってください。

</details>

<details>
<summary><strong>Linux（Wayland + NVIDIA）：Web コンテンツがクリックできない・リサイズで黒画面になる</strong></summary>

AppImage は過去のネイティブ Wayland クラッシュを避けるため `GDK_BACKEND=x11`（XWayland）を強制します。新しい Wayland + NVIDIA 環境ではこれが原因で Web コンテンツ領域がクリックできなくなり（タイトルバーのボタンは動作します）、リサイズ時に黒画面になることがあります。内蔵のエスケープハッチでネイティブ Wayland に戻せます：

```bash
CLI_SWITCH_GDK_BACKEND=wayland ./Cli-Switch-*.AppImage
```

デスクトップアイコンから起動する場合は、`.desktop` の `Exec=` 行に追記するか（例：`env CLI_SWITCH_GDK_BACKEND=wayland /path/to/AppImage`）、セッション環境で設定してください。この変数は汎用です：タイル型 Wayland コンポジタ（sway/Hyprland）でクリックが効かない場合は、逆に `CLI_SWITCH_GDK_BACKEND=x11` を試してください。未設定の場合は既定の動作のままです。

</details>

## ドキュメント

各機能の詳しい使い方については、**[ユーザーマニュアル](docs/user-manual/ja/README.md)** をご覧ください。プロバイダ管理、MCP/Prompts/Skills、プロキシとフェイルオーバーなど、すべての機能を網羅しています。

## クイックスタート

### 基本的な使い方

1. **プロバイダ追加**: 「Add Provider」をクリック → プリセットを選ぶかカスタム設定を作成
2. **プロバイダ切り替え**:
   - メイン UI: プロバイダを選択 → 「Enable」をクリック
   - システムトレイ: プロバイダ名をクリック（即時反映）
3. **反映**: ターミナルまたは対応する CLI ツールを再起動して適用（Claude Code は再起動不要）
4. **公式設定に戻す**: 「Official Login」プリセットを追加し、CLI ツールを再起動してログイン/OAuth フローを実行

### MCP、Prompts、Skills & Sessions

- **MCP**: 「MCP」ボタンをクリック → テンプレートまたはカスタム設定でサーバーを追加 → アプリごとの同期をトグルで切り替え
- **Prompts**: 「Prompts」をクリック → Markdown エディタでプリセットを作成 → 有効化してライブファイルに同期
- **Skills**: 「Skills」をクリック → GitHub リポジトリを閲覧 → 対応アプリへワンクリックでインストール
- **Sessions**: 「Sessions」をクリック → 対応するセッションソースの会話履歴を閲覧・検索・復元

> **補足**: 初回起動時に、既存の CLI ツール設定を手動でインポートしてデフォルトプロバイダとして使用できます。

## ダウンロード & インストール

### システム要件

- **Windows**: Windows 10 以上
- **macOS**: macOS 12 (Monterey) 以上
- **Linux**: Ubuntu 22.04+ / Debian 11+ / Fedora 34+ など主要ディストリビューション

### Windows ユーザー

[Releases](../../releases) ページから最新版の `Cli-Switch-v{version}-Windows.msi` インストーラー、またはポータブル版 `Cli-Switch-v{version}-Windows-Portable.zip` をダウンロード。

### macOS ユーザー

[Releases](../../releases) から `Cli-Switch-v{version}-macOS.zip` をダウンロードして展開。

> **注意**: 開発者アカウント未登録のため、初回起動時に「開発元を確認できません」と表示される場合があります。一度閉じてから「システム設定」→「プライバシーとセキュリティ」→「このまま開く」をクリックしてください。以降は通常通り起動できます。

### Linux ユーザー

[Releases](../../releases) から最新版の Linux ビルドをダウンロード：

- `Cli-Switch-v{version}-Linux.deb`（Debian/Ubuntu）
- `Cli-Switch-v{version}-Linux.rpm`（Fedora/RHEL/openSUSE）
- `Cli-Switch-v{version}-Linux.AppImage`（汎用）

> **Flatpak**：公式リリースには含まれていません。`.deb` から自分でビルドできます — 手順は [`flatpak/README.md`](flatpak/README.md) を参照してください。

<details>
<summary><strong>アーキテクチャ概要</strong></summary>

### 設計原則

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

**コア設計パターン**

- **SSOT** (Single Source of Truth): すべてのデータを 1 つの SQLite データベースに集約
- **二層ストレージ**: 同期データは SQLite、デバイスデータは JSON
- **双方向同期**: 切り替え時はライブファイルへ書き込み、編集時はアクティブプロバイダから逆同期
- **アトミック書き込み**: 一時ファイル + rename パターンで設定破損を防止
- **並行安全**: Mutex で保護された DB 接続でレースコンディションを防止
- **レイヤードアーキテクチャ**: Commands → Services → DAO → Database を明確に分離

**主要コンポーネント**

- **ProviderService**: プロバイダの CRUD、切り替え、バックフィル、ソート
- **McpService**: MCP サーバー管理、インポート/エクスポート、ライブファイル同期
- **ProxyService**: ローカル Proxy モードのホットスイッチとフォーマット変換
- **SessionManager**: 対応する全アプリの会話履歴閲覧
- **ConfigService**: 設定のインポート/エクスポート、バックアップローテーション
- **SpeedtestService**: API エンドポイントの遅延計測

</details>

<details>
<summary><strong>開発ガイド</strong></summary>

### 開発環境

- Bun 1.3+
- Rust 1.85+
- Tauri CLI 2.8+

### 開発コマンド

```bash
# 依存関係をインストール
bun install

# ホットリロード付き開発モード
bun run dev

# 型チェック
bun run typecheck

# コード整形
bun run format

# フォーマット検証
bun run format:check

# フロントエンド単体テスト
bun run test:unit

# ウォッチモード（開発に推奨）
bun run test:unit:watch

# アプリをビルド
bun run build

# デバッグビルド
bun run tauri build --debug
```

### Rust バックエンド開発

```bash
cd src-tauri

# Rust コード整形
cargo fmt

# clippy チェック
cargo clippy

# バックエンドテスト
cargo test

# 特定テストのみ実行
cargo test test_name

# test-hooks フィーチャー付きでテスト
cargo test --features test-hooks
```

### テストガイド

**フロントエンドテスト**:

- テストフレームワークに **vitest** を使用
- **MSW (Mock Service Worker)** で Tauri API 呼び出しをモック
- コンポーネントテストに **@testing-library/react** を採用

**テスト実行**:

```bash
# 全テストを実行
bun run test:unit

# ウォッチモード（自動再実行）
bun run test:unit:watch

# カバレッジレポート付き
bun run test:unit --coverage
```

### 技術スタック

**フロントエンド**: React 18 · TypeScript · Vite · TailwindCSS 3.4 · TanStack Query v5 · react-i18next · react-hook-form · zod · shadcn/ui · @dnd-kit

**バックエンド**: Tauri 2.8 · Rust · serde · tokio · thiserror · tauri-plugin-updater/process/dialog/store/log

**テスト**: vitest · MSW · @testing-library/react

</details>

<details>
<summary><strong>プロジェクト構成</strong></summary>

```
├── src/                        # フロントエンド (React + TypeScript)
│   ├── components/
│   │   ├── providers/          # プロバイダ管理
│   │   ├── mcp/                # MCP パネル
│   │   ├── prompts/            # Prompts 管理
│   │   ├── skills/             # Skills 管理
│   │   ├── sessions/           # Session Manager
│   │   ├── proxy/              # Proxy モードパネル
│   │   ├── openclaw/           # OpenClaw 設定パネル
│   │   ├── settings/           # 設定 (Terminal/Backup/About)
│   │   ├── deeplink/           # Deep Link インポート
│   │   ├── env/                # 環境変数管理
│   │   ├── universal/          # クロスアプリ設定
│   │   ├── usage/              # 使用量統計
│   │   └── ui/                 # shadcn/ui コンポーネントライブラリ
│   ├── hooks/                  # カスタムフック（ビジネスロジック）
│   ├── lib/
│   │   ├── api/                # Tauri API ラッパー（型安全）
│   │   └── query/              # TanStack Query 設定
│   ├── i18n/                   # 国際化
│   │   └── locales/            # 翻訳 (zh/zh-TW/en/ja)
│   ├── config/                 # プリセット (providers/mcp)
│   └── types/                  # TypeScript 型定義
├── src-tauri/                  # バックエンド (Rust)
│   └── src/
│       ├── commands/           # Tauri コマンド層（ドメイン別）
│       ├── services/           # ビジネスロジック層
│       ├── database/           # SQLite DAO 層
│       ├── proxy/              # Proxy モジュール
│       ├── session_manager/    # セッション管理
│       ├── deeplink/           # Deep Link 処理
│       └── mcp/                # MCP 同期モジュール
├── tests/                      # フロントエンドテスト
└── assets/                     # スクリーンショット & パートナーリソース
```

</details>

## 貢献

Issue や提案を歓迎します！

PR を送る前に以下をご確認ください：

- 型チェック: `bun run typecheck`
- フォーマットチェック: `bun run format:check`
- 単体テスト: `bun run test:unit`

新機能の場合は、PR を送る前に Issue でディスカッションしてください。プロジェクトに合わない機能の PR はクローズされる場合があります。

## ライセンス

MIT
