---
title: Native app integration
description: Wrap an external web server as a first-class Dirigible artefact via .nativeapp.
---

# Native app integration

This tutorial wraps an external Node / Python / Go web server into the platform as a first-class artefact. The platform reverse-proxies the upstream server under `/services/native-apps-proxy/v1/<basePath>/...` with optional Dirigible-managed authentication and role-based access.

## When this is useful

- Existing internal service (admin panel, dashboard, ML model) that you want to surface through the platform without rewriting.
- Per-tenant or per-user lifecycle - start a sidecar, route traffic, stop it.

## 1. Create a project

In the IDE, create a project named `internal-admin`.

## 2. Add a `.nativeapp` artefact

Create `internal-admin/admin.nativeapp`:

```json
{
    "name": "admin",
    "description": "Internal admin panel",
    "basePath": "admin",
    "kind": "remote",
    "url": "http://admin-service.default.svc.cluster.local:3000",
    "startMode": "always",
    "roles": ["ADMINISTRATOR"]
}
```

Fields:

| Field | Notes |
| ----- | ----- |
| `name`        | Logical name of the native app. |
| `basePath`    | The URL slug under `/services/native-apps-proxy/v1/<basePath>/`. |
| `kind`        | `remote` (URL already serves) or `process` (the platform spawns it). |
| `url`         | Upstream endpoint. |
| `startMode`   | `always` (start on platform boot), `on-demand` (start on first request). |
| `roles`       | Required roles for access. Empty -> public. |

For `kind: process` you supply `command` and optional `args` / `env` instead of `url`; the platform spawns the process, picks a free port, and tears it down on shutdown.

## 3. Publish

Right-click -> **Publish**. The `NativeApp` synchronizer registers the artefact and brings the proxy route up.

## 4. Hit it

```bash
curl -H 'cookie: ...' http://localhost:8080/services/native-apps-proxy/v1/admin/
```

The platform applies authentication and role checks before forwarding the request to the upstream server.

## 5. Inspect

The [Operations perspective](/help/ide/perspectives/operations) lists every registered native app, its kind, its current PID + port (for `process` kind), and its proxy status.

## See also

- [Native app artefact](/help/artefacts/services/nativeapp)
- [Operations perspective](/help/ide/perspectives/operations)
