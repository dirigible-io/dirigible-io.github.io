---
title: Native app
description: External web server (local process or remote endpoint) as a first-class platform artefact. *.nativeapp.
---

# Native app

`*.nativeapp` wraps an external web server - either a local OS process the platform spawns and supervises, or a remote HTTP(S) endpoint - as a first-class Dirigible artefact, reverse-proxied under `/services/native-apps-proxy/v1/<basePath>/...` with optional Dirigible-managed authentication and role-based access.

- **File format.** JSON descriptor.
- **Synchronizer.** `NativeAppSynchronizer` (single-tenant - apps are platform-global). Order `SynchronizersOrder.NATIVE_APP = 440`.
- **Engine.** `engine-native-apps`. Filter chain runs on top of Spring Cloud Gateway WebMvc.
- **URL.** `/services/native-apps-proxy/v1/<basePath>/...`.
- **Management REST.** `/services/native-apps[/<id>][/start|/stop]` - list / get / start / stop / delete. Restricted to **DEVELOPER**, **ADMINISTRATOR**, or **OPERATOR**.

## Kinds

| Kind | Meaning |
| --- | --- |
| `remote` | A third-party HTTP(S) URL Dirigible does not own. The artefact declares only `config.url`. |
| `local` | An OS process Dirigible spawns and supervises. Carries `config.lifecycle.start.commands[]` and optional `config.lifecycle.stop.commands[]`. |

## Start modes (local only)

| Mode | Meaning |
| --- | --- |
| `always` | Spawned on `ApplicationReadyEvent`; kept alive by `NativeAppMonitorJob` (default interval 30 s, override with `DIRIGIBLE_NATIVE_APP_MONITOR_INTERVAL_SECONDS`). |
| `lazy` | Spawned on the first proxy request that hits the app. |

## File format - remote

```json
{
  "name": "http-bin-app",
  "description": "Remote upstream; whitelist allows /get..delete with no scopes.",
  "basePath": "http-bin-app",
  "type": "remote",
  "config": {
    "url": "https://upstream.example.com",
    "security": {
      "authentication": null,
      "exposedPaths": [
        { "path": "/get",    "scopes": [] },
        { "path": "/post",   "scopes": [] },
        { "path": "/delete", "scopes": [] }
      ]
    }
  }
}
```

## File format - remote with basic auth

```json
{
  "name": "http-bin-app-auth",
  "basePath": "http-bin-app-auth",
  "type": "remote",
  "config": {
    "url": "https://upstream.example.com",
    "security": {
      "authentication": {
        "type": "basic",
        "credentials": {
          "user": "${SAMPLE_APP_USER}.{alice}",
          "password": "${SAMPLE_APP_PASSWORD}.{wonderland}"
        }
      },
      "exposedPaths": [
        { "path": "/get", "scopes": ["library-admin"] }
      ]
    }
  }
}
```

Placeholders follow the `${KEY}.{DEFAULT}` convention shared with Jobs and other artefacts; they are resolved at parse time and persisted.

## File format - local process

```json
{
  "name": "library-app",
  "basePath": "library",
  "type": "local",
  "config": {
    "defaultPort": 4001,
    "startMode": "always",
    "lifecycle": {
      "start": {
        "commands": [
          { "os": "linux",   "command": "npm start", "dir": "." },
          { "os": "mac",     "command": "npm start", "dir": "." },
          { "os": "windows", "command": "npm.cmd start", "dir": "." }
        ]
      },
      "stop": {
        "commands": [
          { "os": "linux",   "command": "npm stop", "dir": "." }
        ]
      }
    },
    "security": {
      "exposedPaths": [
        { "path": "/api", "scopes": ["library-admin"] }
      ]
    }
  }
}
```

Key rules:

- **Port resolution is prefer-then-allocate.** The declared `defaultPort` is probed on the wildcard interface; on bind failure (or if `defaultPort` is null) the OS allocates an ephemeral port. The resolved port is exported to the spawned process as `DIRIGIBLE_NATIVE_APP_PORT` - **the spawned process must read that env var** rather than hardcode a port.
- **`command.dir` resolves under the artefact's project root** (`/registry/public/<project>/`). Null / blank / `"."` means the project root itself. Do not embed the project folder name in `command.dir` - the platform already knows it.
- **Readiness probe.** After spawn, the loopback port is polled every 200 ms up to `DIRIGIBLE_NATIVE_APP_READY_TIMEOUT_MS` (default 30 s). Bump it for cold starts that need a first-time `npm install`.
- **Stop subprocess env.** The stop script receives both `DIRIGIBLE_NATIVE_APP_PORT` and `DIRIGIBLE_NATIVE_APP_PID`. **Always target `$DIRIGIBLE_NATIVE_APP_PID`, never `lsof | xargs kill` by port** - `lsof -ti tcp:<port>` returns every PID with a TCP FD on the port (listeners and keep-alive clients), so a port-based kill from an author's stop script can reliably kill the Dirigible JVM itself.

## Security: exposed paths and scopes

`config.security.exposedPaths[]` is a whitelist:

- A request whose path does not match any entry returns **404**.
- A matching entry whose `scopes` list is non-empty requires the caller to hold one of those roles, otherwise **403**.
- Native-app scope semantics are intentionally strict - **DEVELOPER / ADMINISTRATOR super-roles do not grant implicit access**. Authors define their app's audience explicitly.
- If `scopes` is empty or `security` is null, any authenticated caller passes (authentication itself is still enforced by Spring Security on `/services/**`).

## Proxy filter chain

`/services/native-apps-proxy/v1/**` runs through:

1. `rewritePath` strips the absolute base.
2. `NativeAppLookupFilter` resolves `basePath` → app, rewrites the path to the upstream-relative form. Empty-`basePath` is a catch-all that matches when no named app catches first.
3. `ExposedPathFilter` enforces `security.exposedPaths` (404 on whitelist miss) and `scopes` (403 on miss).
4. `LazyStartFilter` spawns LOCAL + LAZY apps on demand.
5. `NativeAppDispatcher` sets the downstream scheme / host / port: local → `http://127.0.0.1:<resolvedPort>`, remote → `config.url`.
6. `AuthInjectionFilter` consults the matching `AuthenticationInjector` (currently `basic`).
7. `removeRequestHeader("Cookie")` + forward.

## Lifecycle and teardown (local)

`NativeAppProcessManager.stop` runs three layered guarantees:

1. Author's `lifecycle.stop` command, best-effort, with the same env (`DIRIGIBLE_NATIVE_APP_PORT` and `DIRIGIBLE_NATIVE_APP_PID`).
2. `Process.destroy()` on the held root, with a 5 s grace, then `destroyForcibly()`.
3. A descendants walk (captured before `destroy()`, since the OS reparents orphans to init / launchd once the root dies). Each leftover descendant is `destroyForcibly()`d.

Most apps do not need a custom stop script - `Process.destroy()` SIGTERMs the held PID and well-behaved apps handle SIGTERM gracefully (Node does by default).

## Diagnostics

When the spawned process dies before its port opens, the thrown `IllegalStateException` carries: PID, exit code, elapsed runtime in ms, resolved port, working directory, and the last ~30 stderr lines. Live stderr is also written to `org.eclipse.dirigible.nativeapps.<name>.stderr`.

Every lifecycle transition logs PID + port for cross-reference with `lsof -iTCP:<port> -sTCP:LISTEN -P -n` and `ps -p <pid>`.

## Configuration

| Env var | Default | Purpose |
| --- | --- | --- |
| `DIRIGIBLE_NATIVE_APP_PORT` | - | Exported to the spawned process; the resolved port. |
| `DIRIGIBLE_NATIVE_APP_PID` | - | Exported to the stop subprocess; the held root PID. |
| `DIRIGIBLE_NATIVE_APP_READY_TIMEOUT_MS` | `30000` | Readiness-probe timeout. Bump for cold starts. |
| `DIRIGIBLE_NATIVE_APP_MONITOR_INTERVAL_SECONDS` | `30` | Interval at which `NativeAppMonitorJob` restarts dead ALWAYS apps. |
