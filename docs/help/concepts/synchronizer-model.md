---
title: The synchronizer model
description: There is no deploy step. Files in the repository are continuously reconciled into runtime state by synchronizers.
---

# The synchronizer model

This is the single most important architectural pattern in Dirigible. The platform does not "deploy" projects - files under `/registry/public/...` are **continuously reconciled** into runtime state by **synchronizers**.

Understanding this model is mandatory before adding a new artefact type, changing an engine, or debugging why a file is not picked up.

## Three collaborating pieces per artefact type

For every reconciled artefact type the platform provides:

1. **An `Artefact` JPA entity** - a class extending `Artefact` (`components/core/core-base/.../artefact/Artefact.java`). It is the persisted projection of the file: location, hash, lifecycle phase, plus type-specific columns.
2. **A synchronizer** - a Spring bean extending `BaseSynchronizer<A, ID>` (single-tenant) or `MultitenantBaseSynchronizer<A, ID>`. It scans the repository for a file extension or pattern, parses each match, upserts the entity, and reacts to lifecycle events.
3. **An engine, service, or endpoint** - the runtime consumer of the live artefact. Quartz for `.job`, Flowable for `.bpmn`, Camel for `.camel`, Spring MVC for `*Controller.ts`, etc.

Existing implementations (grep `extends BaseSynchronizer` / `extends MultitenantBaseSynchronizer` in the codebase) give the full inventory: `Job`, `Bpmn`, `Camel`, `Listener`, `Csvim`, `DataSource`, `Table`, `View`, `Schema`, `Access`, `Roles`, `Expose`, `ExtensionPoint`, `Extension`, `Markdown`, `Confluence`, `Proxy`, `Websocket`, `OData`, `OpenAPI`, `Component`, `Entity`, `Java`.

## Lifecycle phases

Each artefact moves through a fixed set of phases, driven by the synchronizer:

- **CREATE** - artefact discovered for the first time.
- **UPDATE** - artefact's content hash changed.
- **DELETE** - file removed from the repository.
- **START** - bring the live runtime state up (register the Quartz job, deploy the Flowable process, install the Camel route, etc.).
- **STOP** - tear it down (used on DELETE, and before START on UPDATE).

A typical UPDATE pass is `STOP` (on the previous version) then `START` (on the new content). Engine implementations encode this in their concrete synchronizer.

## Ordering

Synchronizer execution order is fixed across types via constants in `SynchronizersOrder`. This matters for cross-artefact dependencies - a `*.table` must materialize before a `*.csvim` references it, a `*.datasource` must exist before a `*.table` targets it, and so on.

Within a single artefact type, ordering is governed by per-entity topological sort when an artefact declares dependencies (see `TopologicallySortable` / `TopologicallyDepletable` in `core-base`).

## Cadence

The synchronizer thread polls on a fixed cadence, configurable via `DIRIGIBLE_SYNCHRONIZER_FREQUENCY`. Between cycles, files are at rest on disk; the platform does not watch the filesystem aggressively (the local watcher in `core-initializers` covers external mounts, not the default registry).

For tests or scripted flows that need a synchronous reconciliation, call `SynchronizationProcessor.forceProcessSynchronizers()`. This is the path taken by HTTP-only integration tests (`JavaEngineIT` and friends); it is **not** the normal path.

## Adding a new artefact type

To support a new file extension end to end:

1. **Define the entity** - a class extending `Artefact` with a JPA `@Entity` mapping under one of the JPA scan packages (`org.eclipse.dirigible.components` or `org.eclipse.dirigible.engine`).
2. **Implement the synchronizer** - extend `BaseSynchronizer` (or `MultitenantBaseSynchronizer` if the artefact should be tenant-isolated). Override `parseImpl`, `completeImpl`, and the lifecycle hooks. Register it as a Spring `@Component`.
3. **Wire the engine** - whatever actually does work with the live artefact (a Spring service, a scheduled task, a Camel processor, a controller).
4. **Register the module** - add the component module to the matching `components/group/group-*/pom.xml` aggregator so the assembly picks it up.

The four parts together let the platform reconcile the new artefact type without further configuration.

## Special case: JavaScript and TypeScript

JS and TS user code is **not** synchronized. `JavascriptEndpoint` and `TypeScriptEndpoint` load modules on demand from the repository when a `/services/js/...` or `/services/ts/...` URL is hit. Save a JS file - it is live immediately on the next request. See [Lifecycle and hot-reload](/help/concepts/lifecycle-and-hot-reload).

## Special case: client Java

Client `.java` files **are** synchronized, but the heavy work (one `javac` task, one fresh `ClientClassLoader`, a single `ComponentContainer` that builds and wires every bean) happens inside `JavaSynchronizer.finishing()`. `@Component` (and the meta-annotated `@Repository` / `@Controller` / `@Scheduled` / `@Listener` / `@Websocket`) drives that wiring - see [Extensibility](/help/concepts/extensibility).

## Reference

- `Artefact` - `components/core/core-base/.../artefact/Artefact.java`
- `BaseSynchronizer`, `MultitenantBaseSynchronizer` - `components/core/core-base/.../synchronizer/`
- `SynchronizersOrder` - `components/core/core-base/.../synchronizer/SynchronizersOrder.java`
- `SynchronizationProcessor` - `components/core/core-initializers/`
