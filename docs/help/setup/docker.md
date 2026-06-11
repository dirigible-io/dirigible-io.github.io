---
title: Docker
description: Run Dirigible in Docker - one command, persistent volume optional.
---

# Docker

The fastest install path. The official image is `dirigiblelabs/dirigible` on GitHub Container Registry.

## Run

```bash
docker run --rm -p 8080:8080 dirigiblelabs/dirigible:latest
```

Open `http://localhost:8080`. Default credentials: `admin` / `admin`.

## Persisting the registry

The image keeps the platform's registry under `/target/dirigible` inside the container. Mount a host volume to persist projects across restarts:

```bash
docker run --rm -p 8080:8080 \
    -v "$(pwd)/dirigible-data:/target/dirigible" \
    dirigiblelabs/dirigible:latest
```

## Exposed ports

| Port | Purpose | Env override |
| ---- | ------- | ------------ |
| 8080 | UI + REST | `DIRIGIBLE_SERVER_PORT` |
| 8081 | GraalJS / Graalium debugger | `DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT` |

The in-IDE terminal (`ttyd`) binds to port `9000` **inside** the container only - the IDE proxies it through the WebSocket endpoint, no host mapping needed.

## Environment overrides

Pass `DIRIGIBLE_*` env vars on the command line:

```bash
docker run --rm -p 8080:8080 \
    -e DIRIGIBLE_BASIC_USERNAME=admin \
    -e DIRIGIBLE_BASIC_PASSWORD=secret \
    -e DIRIGIBLE_MULTI_TENANT_MODE=false \
    dirigiblelabs/dirigible:latest
```

For the full env-var inventory see [`/help/reference/environment-variables`](/help/reference/environment-variables).

## Image tags

- `latest` - the current main build.
- `<version>` - tagged release. Pin in production.

## See also

- [Standalone JAR](/help/setup/tomcat)
- [Kubernetes](/help/setup/kubernetes/)
- [Authentication setup](/help/setup/authentication/)
