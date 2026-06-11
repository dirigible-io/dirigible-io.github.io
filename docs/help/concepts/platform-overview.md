---
title: Platform overview
description: Eclipse Dirigible is a high-productivity application platform - a single Spring Boot fat jar bundling an in-browser IDE and a stack of execution engines.
---

# Platform overview

Eclipse Dirigible is a **high-productivity application platform as a service (hpaPaaS)**. It ships as a single Spring Boot fat jar that bundles an in-browser IDE alongside the runtime engines that execute the artefacts users author against it.

## In-system programming

Dirigible is built around one premise: users develop and modify the running system through the browser. There is no separate build, no `kubectl apply`, no redeploy. Files placed under the on-disk repository are reconciled into runtime state by [synchronizers](/help/concepts/synchronizer-model) on every change.

The mental model is "edit a file - hit save - it is live". The platform itself is the runtime, the IDE, and the deployment target.

## What the fat jar bundles

A single executable carries:

- **GraalJS / GraalVM polyglot** - executes `.js`, `.mjs`, `.ts` (`engine-javascript`, `engine-typescript`).
- **In-process Java compiler** - compiles client `.java` per cycle (`engine-java`).
- **Python** - server-side modules over `engine-python`.
- **Flowable** - BPMN 2.0 process engine.
- **Apache Camel** - integration routes.
- **Quartz** - scheduled jobs.
- **ActiveMQ-style listeners** - message-bus consumers.
- **Apache CXF** - OData v2.
- **Apache Lucene** - registry search and indexing.
- **CMIS / CMS** - internal, S3, SharePoint backends.
- **Hibernate** - entity store (dynamic-map mode, see [`@aerokit/sdk/db`](/api/db)).
- **Spring Security** - basic, OAuth2, Keycloak, Cognito, Snowflake, GitHub.
- **In-browser IDE** - Monaco editor, perspectives, modelers.

The shipped artifact is `build/application/target/dirigible-application-*-executable.jar`; the entry point is `org.eclipse.dirigible.DirigibleApplication`.

## Running it

```bash
java -jar build/application/target/dirigible-application-*-executable.jar
```

- UI at `http://localhost:8080`
- Default credentials: `admin` / `admin`
- Swagger UI: `/swagger-ui/index.html`
- Health probes: `/actuator/health/readiness`, `/actuator/health/liveness`

The default datasource is a file-backed H2 instance at `./target/dirigible/h2/DefaultDB`. Override via `DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER` / `_URL` / `_USERNAME` / `_PASSWORD`. The server port is `DIRIGIBLE_SERVER_PORT` (default `8080`).

## License

Eclipse Public License 2.0.

## Next

- [Polyglot runtime](/help/concepts/polyglot-runtime)
- [Repository and workspace](/help/concepts/repository-and-workspace)
- [The synchronizer model](/help/concepts/synchronizer-model)
