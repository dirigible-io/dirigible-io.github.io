---
title: Ports
description: Network ports used by the platform.
---

# Ports

| Port | Purpose | Env override |
| ---- | ------- | ------------ |
| **8080** | HTTP (UI + REST + WebSockets). | `DIRIGIBLE_SERVER_PORT` |
| **8081** | Graalium JavaScript / TypeScript debugger. | `DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT` |
| **9000** | `ttyd` terminal server (in-IDE shell). | n/a - bound inside the JVM process |
| **8000** | JDWP for the Java debugger view. | `DIRIGIBLE_JAVA_DEBUG_JDWP_PORT` |

## In Docker

The official image exposes `8080` and `8081`. `9000` is bound inside the container only - the IDE proxies it over WebSocket so there's no host mapping.

## In Kubernetes

The Helm chart exposes the pod's `8080`. Liveness / readiness probes hit `/actuator/health/*` on the same port. For development access to the debug ports, port-forward from the pod:

```
kubectl -n dirigible port-forward deploy/dirigible 8081:8081 8000:8000
```

## See also

- [Environment variables](/help/reference/environment-variables)
- [Java debugger](/help/ide/views/debugger-java)
- [JavaScript debugger](/help/ide/views/debugger-js)
