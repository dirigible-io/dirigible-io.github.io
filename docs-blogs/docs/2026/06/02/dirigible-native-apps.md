---
title: "Native Applications in Eclipse Dirigible — Any Language, Local or Remote"
description: "A new artefact type that pulls external HTTP services — local OS processes Dirigible spawns and supervises, or remote endpoints anywhere on the network — under one reverse proxy, with managed authentication, role-based access, and lifecycle control. Build the service in Node, Python, Go, .NET, Rust, anything that talks HTTP — Dirigible takes it from there."
author: Iliyan Velichkov
author_gh_user: iliyan-velichkov
author_avatar: https://avatars.githubusercontent.com/u/5058839?v=4
read_time: 9 min
publish_date: June 02, 2026
---

Eclipse Dirigible has always been a polyglot platform — but a *first-party* polyglot platform. You wrote your services in TypeScript, JavaScript, or [Java](../../../../2026/05/19/dirigible-java-decorators.md), and Dirigible compiled, loaded, hot-reloaded, and ran them in-process. That's a beautiful experience for code that's *yours to write today*.

But your reality usually has more layers. A Python ML model already exposes `/predict` via FastAPI. A Go gateway already handles SAML. A small Node.js library service has been running for two years and isn't going anywhere. A third-party SaaS API — Stripe, Shopify, an internal Hub — speaks HTTPS and would be useful inside your application surface.

Until today, the only way to integrate any of those was to push them to the perimeter — separate auth, separate deployment, separate routes for the client to know about, separate observability story. That perimeter has just collapsed.

Meet **native applications**: a new Dirigible artefact type that brings *any* HTTP service — local OS process or remote URL — under the same `/services` umbrella as your TypeScript routes and Java controllers. One reverse proxy. One auth model. One role-based access policy. One artefact file.

> **TL;DR.** Drop a `*.native-app` JSON file into your project. Dirigible reverse-proxies the upstream under `/services/native-apps-proxy/v1/<basePath>/...`, enforces your role-based access list, optionally injects authentication outbound, and — for local apps — spawns and supervises the process for you.

---

## What a native application is

A native application is a Dirigible artefact whose source is a single JSON file with the extension `.native-app`. It declares:

- A **basePath** — the segment users will hit under `/services/native-apps-proxy/v1/`.
- A **kind** — `remote` (an HTTP(S) endpoint Dirigible doesn't own) or `local` (an OS process Dirigible spawns and supervises).
- A **security policy** — which sub-paths are exposed, which Dirigible roles guard them, and (optionally) what authentication header to attach when forwarding to the upstream.
- For local apps, a **lifecycle** — start/stop commands per OS, and a start mode (`lazy` or `always`).

The synchronizer picks the file up the moment you publish it; the proxy starts serving requests the moment registration completes; lifecycle and authentication are wired in automatically.

You write zero glue code.

---

## Why this matters

A few patterns that just got cheap:

- **Polyglot microservices on the same platform.** Run a Python service for ML, a Go service for protocol bridges, a Node service for legacy code — Dirigible spawns them, supervises them, and exposes them all under the same `/services` namespace as your TypeScript routes.
- **SaaS APIs as managed artefacts.** A `remote` native app turns Stripe / GitHub / Slack / your internal hub into a Dirigible-resident route. Outbound auth lives in the artefact (resolved from environment, so secrets stay out of Git); inbound auth is your normal Dirigible auth; role-based access controls who in your tenant can call it. The browser code calls `/services/native-apps-proxy/v1/stripe/...` and never sees the API key.
- **Lift-and-shift, not rewrite.** Got an existing Node/Python/Go service that runs perfectly well today? Drop a `.native-app` next to it and it becomes a first-class Dirigible artefact — same auth, same logs, same proxy, no code change to the service itself.
- **Same artefact lifecycle as everything else.** Publish the `.native-app` → registered. Edit it → re-registered. Delete it → unregistered, child process stopped, database row gone. No separate deploy pipeline.

---

## Anatomy of the `*.native-app` file

Every native app — local or remote — shares the same top-level shape:

```jsonc
{
  "name": "my-app",            // unique artefact name
  "description": "...",
  "basePath": "my-app",        // segment under /services/native-apps-proxy/v1/
  "type": "remote",            // or "local"
  "config": { /* kind-specific */ }
}
```

The two flavours diverge under `config`. We'll start with the simpler one.

---

## Flavour 1 — Remote applications

A remote native app declares an existing HTTP(S) URL Dirigible should reverse-proxy. Dirigible doesn't own the process; it just stands in front of it, enforcing your auth and role policy.

**Use cases:** third-party SaaS APIs, internal services in another cluster, anything that already speaks HTTP and isn't moving.

**The minimal config:**

```jsonc
{
  "name": "sample-remote-native-app",
  "description": "Reverse-proxy the public httpbin.org API under /services/native-apps-proxy/v1/http-bin/.",
  "basePath": "http-bin",
  "type": "remote",
  "config": {
    "url": "https://httpbin.org",
    "security": {
      "authentication": null,
      "exposedPaths": [
        { "path": "/", "scopes": ["http-bin"] }
      ]
    }
  }
}
```

That's the entire artefact. Three things happen the moment you publish it:

1. The basePath `http-bin` gets registered. From this point, requests to `/services/native-apps-proxy/v1/http-bin/...` are routed to this app.
2. The exposed-paths whitelist is applied. `path: "/"` is a prefix that matches everything below, so the whole upstream API is reachable — but only to users holding the **`http-bin`** Dirigible role.
3. Outbound `authentication` is optional. With `authentication: null` (or omitted entirely), no `Authorization` header is attached to forwarded requests — appropriate here because `httpbin.org` is anonymous. Set it when the upstream needs credentials.

The companion `roles.roles` file in the same project declares the role:

```jsonc
[
  {
    "name": "http-bin",
    "description": "Permission to call the httpbin.org upstream via the native-app proxy."
  }
]
```

Try it after publishing and assigning the role:

```bash
# 200 OK — proxied to https://httpbin.org/get
curl -u admin:admin http://localhost:8080/services/native-apps-proxy/v1/http-bin/get

# 403 Forbidden — user is authenticated but lacks the http-bin role
curl -u guest:guest http://localhost:8080/services/native-apps-proxy/v1/http-bin/get

# 404 Not Found — path is outside the whitelist
curl -u admin:admin http://localhost:8080/services/native-apps-proxy/v1/other-app/get
```

GitHub sample: [**dirigiblelabs/sample-remote-native-app**](https://github.com/dirigiblelabs/sample-remote-native-app)

### Outbound authentication

`httpbin.org` is anonymous, but real upstreams aren't. Drop a basic-auth block in and Dirigible attaches `Authorization: Basic …` to every outbound request:

```jsonc
"authentication": {
  "type": "basic",
  "credentials": {
    "user": "${MY_API_USER}.{default-user}",
    "password": "${MY_API_PASS}.{default-pass}"
  }
}
```

The `${KEY}.{DEFAULT}` syntax is the same placeholder Dirigible already uses for Jobs and other artefacts: resolve `MY_API_USER` from the environment (or `dirigible-config-*.properties`), fall back to the literal in `{…}` if unset. Secrets stay out of Git; the file checks in safely.

**Inbound vs outbound is decoupled.** Your browser code authenticates against Dirigible normally (whatever session / OAuth / OIDC you have wired up). Dirigible *then* attaches the outbound credentials on the way to the upstream. The client never sees them.

---

## Flavour 2 — Local applications

A local native app is more ambitious: Dirigible **spawns** the OS process for you, picks a free port, exports that port to the child as an environment variable, polls until it's ready, and from then on supervises it (with optional auto-restart). When the artefact is deleted or the platform shuts down, the process is stopped — gracefully if possible, forcibly if not.

**Use cases:** Run a Node / Python / Go / .NET / Rust service *on the same host* as Dirigible, owned by the platform, secured by the platform, restarted by the platform.

### The sample

[**dirigiblelabs/sample-library-local-native-app**](https://github.com/dirigiblelabs/sample-library-local-native-app) is a small library-management REST service written in TypeScript on Fastify. It runs on Node.js 22+, validates input with Zod, generates an OpenAPI document with `@fastify/swagger`, and ships a Vitest suite. The service itself isn't important here — the important part is that it's a real, idiomatic Node.js project, and the entire integration with Dirigible is one JSON file in the repo root:

```jsonc
{
  "name": "sample-library-local-native-app",
  "description": "Sample library REST service (Fastify + Zod) exposed as a Dirigible-managed local native application.",
  "basePath": "library-native-app-nodejs",
  "type": "local",
  "config": {
    "defaultPort": 8080,
    "lifecycle": {
      "start": {
        "mode": "lazy",
        "commands": [
          {
            "os": "mac",
            "executable": "sh",
            "arguments": [
              { "name": "-c", "value": "npm install --silent --no-audit --no-fund && exec npm run build:start -- \"$@\"" },
              { "name": "sample-library-local-native-app", "value": "" },
              { "name": "--library-address", "value": "42 Wallaby Way, Sydney" },
              { "name": "--library-phone", "value": "+61-2-9999-0042" }
            ]
          },
          { "os": "linux",   "executable": "sh",      "arguments": [/* same as mac */] },
          { "os": "windows", "executable": "cmd.exe", "arguments": [/* npm install && npm run build:start ... */] }
        ]
      },
      "stop": {
        "commands": [
          { "os": "mac",     "executable": "sh",      "arguments": [{ "name": "-c", "value": "npm stop" }] },
          { "os": "linux",   "executable": "sh",      "arguments": [{ "name": "-c", "value": "npm stop" }] },
          { "os": "windows", "executable": "cmd.exe", "arguments": [{ "name": "/c", "value": "npm run stop:win" }] }
        ]
      }
    },
    "security": {
      "authentication": {
        "type": "basic",
        "credentials": {
          "user": "${SAMPLE_APP_USER}.{admin}",
          "password": "${SAMPLE_APP_PASS}.{admin}"
        }
      },
      "exposedPaths": [
        { "path": "/rest/api/v1", "scopes": ["library-admin"] }
      ]
    }
  }
}
```

There's a lot in there. Let's walk through it.

### Per-OS commands

Each entry under `lifecycle.start.commands` is tagged with `os` (one of `mac` / `linux` / `windows`). Dirigible picks the right entry for the host it's running on, case-insensitively. The matching is strict — an unknown token is rejected at parse time with a clear error, not silently ignored.

This keeps the artefact portable: ship one `.native-app` file, and the same project runs on a developer's Mac, a CI Linux box, and a Windows production server. No build-time scripting.

### Port resolution — prefer-then-allocate

`defaultPort: 8080` is a *preference*, not a contract. Dirigible probes the wildcard interface (not just loopback — that's a deliberate macOS workaround) at the declared port. If it's free, the process gets that port. If it's taken, Dirigible asks the OS for an ephemeral free port via `ServerSocket(0)` and uses that instead. Either way, **the resolved port is exported to the child process as `DIRIGIBLE_NATIVE_APP_PORT`** — and the child must read it rather than hardcode a port.

Concretely, the sample's `src/config.ts` does:

```ts
port: Number(env.DIRIGIBLE_NATIVE_APP_PORT ?? env.PORT ?? 8080)
```

Read the Dirigible-provided variable first, fall back to `PORT` for local non-Dirigible runs, fall back to 8080 for standalone development. The same pattern works in any language — `os.environ['DIRIGIBLE_NATIVE_APP_PORT']` in Python, `os.Getenv("DIRIGIBLE_NATIVE_APP_PORT")` in Go, and so on.

This decoupling is what lets two native apps coexist on the same host without manual port management. They both prefer 8080? Fine: the first to start gets it, the second falls back to an ephemeral.

### Working directory

`command.dir` is optional and resolves *relative to the project root* (`<registry>/<project>/`). Omit it and the command runs in the project root. Set `"dir": "apps/server"` and it runs in `<project>/apps/server/` — handy when the runtime code lives in a subfolder of a larger project. **Do not embed the project folder name in `command.dir`** — Dirigible already knows it, and hard-coding it makes the artefact brittle to renames and forks. If a configured subpath doesn't exist on disk, the platform logs a WARN with a concrete remediation hint and falls back to the project root.

### Start modes — `lazy` vs `always`

- **`lazy`** (the sample's choice). The process starts on the *first* proxy request to its basePath. Cold-start cost lands on whoever's poking first; the platform sleeps the rest of the time. Best for development, ad-hoc tools, and services that aren't called often.
- **`always`**. The process starts when Dirigible itself becomes ready, and a built-in monitor job (configurable interval via `DIRIGIBLE_NATIVE_APP_MONITOR_INTERVAL_SECONDS`, default 30 s) restarts it if it dies. Best for production paths that should always be hot.

Both modes go through the same readiness probe: after spawn, Dirigible polls the chosen loopback port every 200 ms until the process is accepting connections, with a configurable timeout (`DIRIGIBLE_NATIVE_APP_READY_TIMEOUT_MS`, default 30 s — bump it for first-run `npm install` cold starts).

If the process exits *before* it becomes ready, you don't get a useless "exited" log — you get a rich diagnostic message including the PID, exit code, runtime in ms, port, working directory, and the last ~30 stderr lines from the child. The "what did it print before dying" question is answered inline, not after a 20-minute log archaeology session.

### Inbound auth, outbound auth, and exposed paths

Two security mechanisms operate independently:

- **`security.exposedPaths`** is a *whitelist with role scopes*. Only `/rest/api/v1` is exposed under the basePath; anything else through the proxy returns `404`. The whitelist also requires the caller to hold the `library-admin` role — `403` otherwise. Native-app scope semantics are strict: `DEVELOPER` and `ADMINISTRATOR` super-roles do **not** grant implicit access. If you want admins to bypass, give them the app's role explicitly.

- **`security.authentication`** is *outbound*. The sample upstream (Fastify with `@fastify/basic-auth`) requires HTTP Basic. Dirigible attaches `Authorization: Basic …` to every forwarded request, with credentials resolved from environment via `${SAMPLE_APP_USER}.{admin}` / `${SAMPLE_APP_PASS}.{admin}`. The browser caller never sees those credentials — they're a Dirigible-internal concern.

The two stack cleanly. The browser logs into Dirigible. Dirigible checks that the request matches an exposed path. Dirigible checks that the caller holds the right role. Dirigible attaches the outbound credentials. The upstream sees a perfectly-formed Basic-Auth request.

### Stop scripts — the hard rule

Most local apps don't need a custom stop script. Dirigible always follows up with its own `Process.destroy()` (then `destroyForcibly()` after a 5-second grace), and a well-behaved app handles SIGTERM gracefully. Node does by default.

If you *do* ship a stop script (the sample does, as a reference example), **target `$DIRIGIBLE_NATIVE_APP_PID` — never enumerate PIDs by port**. Both env vars are exported to the stop subprocess: `DIRIGIBLE_NATIVE_APP_PID` (the held root PID) and `DIRIGIBLE_NATIVE_APP_PORT` (the resolved port).

The sample's POSIX stop is exactly:

```bash
kill "$DIRIGIBLE_NATIVE_APP_PID" 2>/dev/null || true
```

And its Windows equivalent is:

```powershell
& taskkill /PID $env:DIRIGIBLE_NATIVE_APP_PID /T
```

That's it. Three rules: PID-targeted, exit cleanly, leave the rest to the platform.

**Why?** Because `lsof -ti tcp:<port>` returns *every* PID with a TCP file descriptor on that port — listeners *and* keep-alive clients. After every proxy round-trip, the Dirigible JVM itself holds an idle outbound connection to the upstream port. A port-based `kill` from your stop script would therefore reliably take down the Dirigible JVM. This is not theoretical — it was the exact bug that motivated documenting the rule. The platform now exports the PID precisely so authors don't have to discover it the hard way.

GitHub sample: [**dirigiblelabs/sample-library-local-native-app**](https://github.com/dirigiblelabs/sample-library-local-native-app)

---

## What happens on a request

Once a native app is published, hitting `/services/native-apps-proxy/v1/<basePath>/<path>` runs through this filter chain (Spring Cloud Gateway WebMvc under the hood):

1. **`rewritePath`** strips the `/services/native-apps-proxy/v1/` prefix.
2. **Lookup filter** resolves the basePath to the registered native app.
3. **Exposed-path filter** checks the remaining path against the whitelist; if it doesn't match, **`404`**. If it matches but the caller lacks the required role, **`403`**.
4. **Lazy-start filter** spawns the local process on demand and waits until its port is open (for lazy mode; no-op for always-mode or remote apps).
5. **Dispatcher** picks the downstream target — `http://127.0.0.1:<resolvedPort>` for local, the declared upstream URL for remote.
6. **Auth-injection filter** consults the registered injectors and rewrites the outbound `Authorization` header (basic for now, with the SPI open for more).
7. **Forward** the request, drop the inbound `Cookie` header, stream the response back.

You don't have to think about any of this in steady state. It's there to be debugged when something goes wrong — and every transition is logged with PID + port so you can cross-reference `ps`, `lsof`, and the proxy logs in seconds rather than minutes.

---

## Lifecycle and supervision

For local apps, the moving parts are:

- **`NativeAppBootstrap`** spawns `always`-mode apps when Spring's `ApplicationReadyEvent` fires.
- **`NativeAppMonitorJob`** wakes every 30 s (configurable), iterates the registered `always`-mode apps, and restarts dead ones. A built-in `SystemJob` — no Quartz config required.
- **`LazyStartFilter`** spawns `lazy`-mode apps on the first request to their basePath, then steps out of the way for subsequent requests.
- **`NativeAppShutdown`** stops every owned process on JVM shutdown, snapshotting the descendant tree *before* destroying the root so orphaned grandchildren get cleaned up too. This is the `sh → npm → node` scenario, where killing the root via SIGTERM doesn't always propagate; the descendants walk catches what SIGTERM misses.

There's also a small management REST surface at `/services/native-apps` for listing, starting, stopping, and deleting apps interactively. It's gated to `DEVELOPER` / `ADMINISTRATOR` / `OPERATOR`. Handy when debugging a misbehaving lazy-start.

---

## Removal: just delete the file

The synchronizer's DELETE path mirrors the spawn path symmetrically:

1. Stop the process — author's `lifecycle.stop` first (best-effort), then `Process.destroy()`, then `destroyForcibly()` after the grace period, then a descendants-walk for any leftover grandchildren.
2. Drop the JPA row in `DIRIGIBLE_NATIVE_APPS`.
3. Unregister the basePath from the proxy router.

From this point, requests to the now-defunct basePath return `404`. No restart needed. No manual cleanup. No orphaned processes. (The cleanup logic was hardened by an end-to-end IT that snapshots the descendant PID set, runs `stop()`, and asserts every PID is dead afterwards — including the case where the *author's* stop script kills the held root PID before the platform's own destroy fires.)

---

## When to use this — and when not to

Native applications are the right tool when:

- You have an existing HTTP service (yours or third-party) that you want inside the Dirigible perimeter without rewriting.
- You need polyglot — a Python ML stage, a Go bridge, a Rust hot path — alongside Dirigible's TypeScript and Java surface.
- You want unified auth, unified RBAC, and unified observability for a service that doesn't *fit* the in-process model.
- You want managed start/stop/restart of a sidecar process without writing systemd units.

They're **not** the right tool when:

- The thing you're writing fits comfortably in TypeScript or Java. Use [TypeScript decorators](../../../../2025/12/04/dirigible-decorators.md) or [Java decorators](../../../../2026/05/19/dirigible-java-decorators.md) — they hot-reload, share the platform's process, and skip the proxy hop entirely.
- The thing already runs in your Kubernetes cluster behind an ingress with its own auth. There's no value in double-proxying.
- The upstream is a streaming endpoint and you need very low latency. Native apps add one reverse-proxy hop; the overhead is small, but it's not zero.

---

## Putting it together

Two artefacts. Two completely different runtime profiles. One model.

```text
/services/native-apps-proxy/v1/http-bin/...                 → https://httpbin.org/...   (remote, no auth)
/services/native-apps-proxy/v1/library-native-app-nodejs/...→ http://127.0.0.1:<port>/... (local Node.js process, basic auth injected)
```

Both authenticate the caller against Dirigible. Both enforce a per-app role policy. Both expose only the whitelisted paths. Both clean up when their `.native-app` file is deleted. One is a five-line config pointing at a public URL; the other is a managed OS process whose port the platform allocates and whose lifecycle the platform owns.

You wrote zero glue code. You wrote one JSON file.

That's the whole point.

---

## Try it

1. **Remote** — clone [`dirigiblelabs/sample-remote-native-app`](https://github.com/dirigiblelabs/sample-remote-native-app) into a running Dirigible instance via the Git perspective. Publish. Assign the `http-bin` role to a user. Hit `/services/native-apps-proxy/v1/http-bin/get`.
2. **Local** — clone [`dirigiblelabs/sample-library-local-native-app`](https://github.com/dirigiblelabs/sample-library-local-native-app). Publish. Assign the `library-admin` role. Hit `/services/native-apps-proxy/v1/library-native-app-nodejs/rest/api/v1/books`. Watch Dirigible spawn the Node process on the first request and proxy through.

Both projects ship with `roles.roles` and `project.json` alongside their `.native-app` file. Both are real, runnable samples — the local one is a complete Fastify+Zod REST service with a Vitest suite.

---

## A unified surface, finally

Dirigible's strength has always been integration density: the more artefact types live under the same `/services` namespace, the less plumbing your application surface has, the less your operations team has to memorize. Native applications take the last category of "code that ran somewhere else" and pull it in.

Write in any language. Run in-process or out-of-process. Local or remote. Lazy or always. Spawn-and-supervise or just-proxy. One JSON file, one consistent model.

The polyglot story just got a lot better.

Happy hacking — and may your processes always come up ready before the timeout.
