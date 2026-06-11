---
title: HTTP endpoints
description: Stable URL roots exposed by the platform.
---

# HTTP endpoints

The platform serves everything off a single HTTP port (default `8080`, env `DIRIGIBLE_SERVER_PORT`). Stable URL roots are defined as constants on `BaseEndpoint` and reused across `@RestController`-annotated classes.

| Path root | Purpose |
| --------- | ------- |
| `/services/...` | Authenticated REST endpoints (workspace, git, jobs, listeners, websockets, security, openapi, ...). |
| `/public/...` | Same endpoints without authentication (where the endpoint exposes a public variant). |
| `/services/ts/<project>/<file>` | Execute a TypeScript user module. |
| `/services/js/<project>/<file>` | Execute a JavaScript user module. |
| `/services/java/{project}/{*classPath}` | Dispatch into a client-Java controller or `JavaHandler`. |
| `/services/py/<project>/<file>` | Execute a Python user module. |
| `/services/web/<project>/<path>` | Static project resources exposed via the `expose` artefact. |
| `/services/wiki/<project>/<path>.html` | Markdown / Confluence wiki rendered to HTML. |
| `/services/openapi` | Aggregated OpenAPI document (TS + Java controllers). |
| `/services/ide/...` | IDE-side backend endpoints (workspaces, git, terminal, java-debug, monitoring, messaging-monitoring, etc.). |
| `/services/data/...` | Data-tooling endpoints (transfer, anonymise). |
| `/services/native-apps-proxy/v1/<basePath>/...` | Reverse-proxied native-app endpoints. |
| `/odata/v2/...` | OData V2 services (Apache CXF). |
| `/websockets/...` | WebSocket endpoints, including `/websockets/stomp/<endpoint>` for user-authored handlers and `/websockets/ide/java-debug?workspace=<name>` for the Java debugger bridge. |
| `/swagger-ui/index.html` | Swagger UI for built-in REST endpoints. |
| `/api-docs` | Raw OpenAPI document for the built-in endpoints. |
| `/spring-admin/` | Spring Boot Admin server console. |
| `/actuator/health/readiness`, `/actuator/health/liveness` | Health probes for orchestrators. |
| `/actuator/info`, `/actuator/metrics`, `/actuator/loggers` | Other Actuator endpoints. |
| `/` | Redirects to `DIRIGIBLE_HOME_URL` (default `services/web/shell-ide/`). |

Anything you see in legacy docs starting with `/services/v4/...` is obsolete.

## Public vs services

`/public/...` paths skip the security filter chain. Use them when you want anonymous access to a specific JS / Java module without changing the platform's anonymous-mode toggle.

## See also

- [URL patterns](/help/reference/url-patterns)
- [Ports](/help/reference/ports)
- [Security model](/help/concepts/security-model)
