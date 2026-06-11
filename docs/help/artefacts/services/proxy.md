---
title: HTTP proxy
description: HTTP reverse-proxy route. *.proxy artefact.
---

# HTTP proxy

`*.proxy` is a thin HTTP reverse-proxy route - forwards traffic from a path under the platform to an arbitrary target URL.

- **File format.** JSON descriptor.
- **Synchronizer.** `ProxySynchronizer`.
- **Engine.** `engine-proxy` (Spring Cloud Gateway WebMvc).

## File format

```json
{
    "name": "ip-proxy",
    "url": "https://api.ipify.org"
}
```

| Field | Purpose |
| --- | --- |
| `name` | Path segment under the platform. Requests to `/services/proxy/<name>/...` are forwarded to the target. |
| `url` | Absolute target URL. The request path suffix after `<name>` is appended to this URL on dispatch. |

The proxy preserves the HTTP method, headers (minus hop-by-hop), query string, and body. Authentication on the Dirigible side is enforced by Spring Security on `/services/**` before the proxy fires; outbound auth to the target is **not** added - use [`*.nativeapp`](/help/artefacts/services/nativeapp) if you need Dirigible to inject credentials on the outbound leg.

## When to use which

| Need | Use |
| --- | --- |
| Plain pass-through to a fixed upstream URL | `*.proxy` |
| Outbound auth injection, role-scoped exposed-path whitelist, or a local process supervised by the platform | [`*.nativeapp`](/help/artefacts/services/nativeapp) |
