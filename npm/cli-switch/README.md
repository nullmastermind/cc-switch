# @spec-ade/cli-switch

Run [CC Switch](https://github.com/nullmastermind/cc-switch) in your browser — no desktop install required.

```bash
npx -y @spec-ade/cli-switch
```

This starts a local server and opens the CC Switch UI in your default browser.
A random access token is generated on every start; the printed URL already
includes it.

## Options

```
-p, --port <PORT>    Port to listen on (default: an OS-assigned free port)
    --host <HOST>    Address to bind (default: 127.0.0.1)
    --no-open        Do not open a browser automatically
-h, --help           Print help
```

## Security

The server binds to `127.0.0.1` by default and requires the printed token on
every API request. Binding `--host 0.0.0.0` (or any non-loopback address)
exposes your provider configuration — including API keys — to anyone who can
reach that port and the token. Only do this on a trusted network, and prefer
an SSH tunnel or VPN over exposing the port directly.

## Supported platforms

Windows, macOS, and Linux, on x64 and arm64. The matching binary is installed
automatically as an optional dependency of this package.
