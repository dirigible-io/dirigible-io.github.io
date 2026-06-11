---
title: Standalone JAR
description: Run the Dirigible Spring Boot fat jar directly on a JDK.
---

# Standalone JAR

Dirigible ships as a single Spring Boot executable jar. Use this when you do not want a container runtime.

## Prerequisites

- JDK 21 (project compiles to Java 21)
- `ttyd` on the host if you want the in-IDE terminal on port 9000
  - macOS: `brew install ttyd`
  - Fedora / RHEL: `sudo dnf install ttyd`
  - Debian / Ubuntu: `sudo apt install ttyd`

## Download

Prebuilt binaries: [download.dirigible.io](http://download.dirigible.io/).

Or build from source:

```bash
git clone https://github.com/eclipse/dirigible.git
cd dirigible
mvn -T 1C clean install -P quick-build
```

The jar lands at `build/application/target/dirigible-application-*-executable.jar`.

## Run

```bash
java -jar build/application/target/dirigible-application-*-executable.jar
```

Open [http://localhost:8080](http://localhost:8080) and log in with `admin` / `admin`.

## Remote debugging

```bash
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000 \
     -jar build/application/target/dirigible-application-*-executable.jar
```

## Ports

| Port | Purpose |
| ---- | ------- |
| `8080` | HTTP UI and REST endpoints (`DIRIGIBLE_SERVER_PORT`) |
| `9000` | `ttyd` terminal launched by Dirigible |
| `8081` | Graalium JS debugger (`DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT`) |
| `8000` | JDWP (only when started with the agent flags above) |

## Repository location

The on-disk registry defaults to `./target/` relative to the working directory. Override with:

```bash
export DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER=/var/lib/dirigible
```

Layout inside the root:

```
/registry/public/<project>/...          # published artefacts
/users/<user>/workspace/<project>/...   # IDE workspaces
```

## Default database

A file-backed H2 instance is created at `./target/dirigible/h2/DefaultDB`. Switch to PostgreSQL, HANA, MySQL, MSSQL or any JDBC-compatible engine via:

```bash
export DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER=org.postgresql.Driver
export DIRIGIBLE_DATASOURCE_DEFAULT_URL=jdbc:postgresql://localhost:5432/postgres
export DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME=postgres
export DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD=postgres
```

Full env-var catalogue: [Environment Variables](/help/setup/environment-variables).

## Next

- [Your first application](/help/get-started/first-application)
- [Tour the IDE](/help/get-started/ide-tour)
