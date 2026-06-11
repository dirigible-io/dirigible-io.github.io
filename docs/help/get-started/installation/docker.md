---
title: Docker
description: Run Eclipse Dirigible from the official container image.
---

# Docker

The recommended way to run Dirigible locally. Single container, no JDK required on the host.

## Prerequisites

- [Docker](https://docs.docker.com/engine/installation/)

## Run

```bash
docker run --name dirigible --rm -p 8080:8080 dirigiblelabs/dirigible:latest
```

Open [http://localhost:8080](http://localhost:8080) and log in with `admin` / `admin`.

## Image source

The image is published to GitHub Container Registry as [`dirigiblelabs/dirigible`](https://github.com/orgs/dirigiblelabs/packages/container/package/dirigible). Use a release tag (e.g. `:13.0.0`) in production; `:latest` tracks the most recent build.

## Ports

| Port | Purpose |
| ---- | ------- |
| `8080` | HTTP UI and REST endpoints |
| `8081` | GraalJS / Graalium debugger (optional, see `DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT`) |
| `9000` | In-IDE `ttyd` terminal (expose if you need browser shell access) |

Add `-p 8081:8081 -p 9000:9000` to publish them.

## Persistent registry

The on-disk registry (workspaces, projects, generated databases) lives at `/target/dirigible` inside the container. Without a volume it is wiped on container removal. Mount a named volume to keep state across restarts:

```bash
docker volume create dirigible_data

docker run --name dirigible --rm -p 8080:8080 \
    -v dirigible_data:/target/dirigible \
    dirigiblelabs/dirigible:latest
```

A bind-mounted host folder works on Linux and macOS; on Windows prefer a named volume for performance.

## Environment configuration

Override any platform setting via `-e DIRIGIBLE_*` variables. The full catalogue is in [Environment Variables](/help/setup/environment-variables).

## Next

- [Your first application](/help/get-started/first-application)
- [Tour the IDE](/help/get-started/ide-tour)
