---
title: Next Steps
description: Where to go after your first Dirigible app runs.
---

# Next Steps

With Dirigible running and a first endpoint published, the deep-dive sections are organised by what you do next.

## Read first

- **[Concepts](/help/concepts/)** - start with the synchronizer model. Dirigible does not deploy projects; it reconciles files in the registry into runtime state on every change. Everything else - jobs, BPMN, data sources, controllers - hangs off that.

## Build with code

- **[Develop](/help/develop/)** - the decorator / annotation model in TypeScript (`@aerokit/sdk/*`) and Java (`org.eclipse.dirigible.sdk.*`). REST controllers, entities, repositories, scheduled jobs, listeners, components.
- **[Artefacts](/help/artefacts/)** - full catalogue of file extensions the platform recognises (`.job`, `.bpmn`, `.camel`, `.listener`, `.odata`, `.datasource`, `.table`, `.csvim`, ...) and how each is reconciled.
- **[SDKs](/sdk/)** - Java SDK landing. The [API reference](/api/) covers the TypeScript / JavaScript surface (`@aerokit/sdk/*`).

## Common first projects

Pick the closest one to what you want to build:

- **REST API** - extend the [first application](/help/get-started/first-application) with a repository and entity. See [TypeScript SDK - http](/api/) and [db](/api/).
- **Scheduled job** - drop a `.job` artefact or use the `@Scheduled` decorator. See [Process](/help/develop/scheduled-jobs).
- **BPMN process** - model in the BPM perspective, deploy a `.bpmn`, drive it via the Flowable REST surface. See [BPM](/help/develop/scheduled-jobs).
- **Message listener** - declare a `.listener` artefact (or `@Listener` in TS / Java) to consume from the embedded ActiveMQ broker. See [Listeners](/help/develop/scheduled-jobs).
- **Data integration** - import CSV with a `.csvim` artefact, query through a `.datasource`, expose via `@Controller`. See [Data](/help/develop/working-with-data).
- **OData service** - define a `.odata` artefact for V2-compatible service exposure. See [Services](/help/develop/rest-apis).

## Operating

- **[Setup](/help/setup/)** - environment variables, authentication providers, multi-tenancy, external databases, Kubernetes specifics.
- **Observability** - Spring Boot Admin at `/spring-admin/`, actuator health probes at `/actuator/health/*`, the Operations perspective for runtime introspection.

## Reference

- **[Reference](/help/reference/)** - configuration, HTTP surface, conventions.
- **[API](/api/)** - `@aerokit/sdk/*` modules.
- **[SDK](/sdk/)** - Java SDK packages.

## Stay in touch

- Slack: [slack.dirigible.io](https://slack.dirigible.io)
- Issues: [github.com/eclipse/dirigible/issues](https://github.com/eclipse/dirigible/issues)
- Releases: [github.com/eclipse/dirigible/releases](https://github.com/eclipse/dirigible/releases)
