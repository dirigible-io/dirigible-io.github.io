---
title: Standalone JAR
description: Run the Dirigible fat jar directly with a JDK.
---

# Standalone JAR

Dirigible ships as a Spring Boot fat jar - no servlet container needed.

## Prerequisites

- JDK 21 (JVM 21 LTS).
- ~512 MB free memory for evaluation; 2 GB+ for production.
- Optional: `ttyd` on `PATH` for the in-IDE terminal.

## Get the JAR

Either build from source (see [`/help/contributing/building-from-source`](/help/contributing/building-from-source)) or download a release jar from the GitHub Releases page of `eclipse/dirigible`.

The built artifact is at `build/application/target/dirigible-application-<version>-executable.jar`.

## Run

```bash
java -jar dirigible-application-*-executable.jar
```

Open `http://localhost:8080`. Default credentials: `admin` / `admin`.

## Choosing a port

```bash
DIRIGIBLE_SERVER_PORT=9090 java -jar dirigible-application-*-executable.jar
```

## Choosing a registry location

The platform stores projects, registry artefacts, the H2 system database, and tenant data under `./target/` relative to the working directory by default. Pick a stable directory:

```bash
DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER=/var/dirigible \
    java -jar dirigible-application-*-executable.jar
```

## Default database

H2 file-backed at `<repo>/dirigible/h2/DefaultDB`. Switch to PostgreSQL / MSSQL / etc. via:

```bash
DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER=org.postgresql.Driver \
DIRIGIBLE_DATASOURCE_DEFAULT_URL=jdbc:postgresql://db:5432/dirigible \
DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME=postgres \
DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD=secret \
    java -jar dirigible-application-*-executable.jar
```

See [`/help/setup/databases/`](/help/setup/databases/).

## Remote debugging

```bash
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000 \
    -jar dirigible-application-*-executable.jar
```

Connect any JDWP-aware IDE on port `8000`. This is the same port the in-IDE [Java debugger view](/help/ide/views/debugger-java) uses.

## See also

- [Docker](/help/setup/docker)
- [Kubernetes](/help/setup/kubernetes/)
- [Environment variables](/help/setup/environment-variables)
- [Databases setup](/help/setup/databases/)
