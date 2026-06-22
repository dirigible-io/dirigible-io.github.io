---
title: Lifecycle and hot-reload
description: How edits propagate without redeploy. JS / TS loads on demand, Java compiles per cycle, artefact-based engines restart on change via their synchronizer.
---

# Lifecycle and hot-reload

Dirigible has no redeploy. Edits propagate to the running system through one of three paths, depending on the artefact type.

## JavaScript and TypeScript: load on demand

JS and TS modules are **not synchronized**. They are loaded fresh on every request by `JavascriptEndpoint` (`/services/js/...`, `/public/js/...`) and `TypeScriptEndpoint` (`/services/ts/...`).

The flow on a request:

1. The endpoint resolves the module path under `/registry/public/<project>/<file>`.
2. `DirigibleJavascriptCodeRunner` constructs (or reuses) a GraalJS context.
3. The module source is read from the repository and evaluated.

Save a JS / TS file - the next request runs the new source. Module-resolver caches respect file modification time, so a published change is picked up immediately.

## Client Java: one compile, one classloader, per cycle

Java is synchronized by `JavaSynchronizer` (`components/engine/engine-java`), but the heavy work is deferred to the `finishing()` phase of the cycle. Per cycle, exactly once:

1. **Parse + persist.** `parseImpl` for each `.java` file upserts the `JavaFile` artefact and enforces global FQN uniqueness. `completeImpl` flips a dirty flag.
2. **Single `javac` task.** `finishing()` invokes the in-process compiler over **every** client source in one go - cross-file references resolve because they share the same compilation unit.
3. **Single fresh `ClientClassLoader`.** All compiled classes land in one new classloader, parent = platform classloader. The previous generation becomes unreachable; GC reclaims its Metaspace.
4. **Container build.** A single `ComponentContainer` builds every bean for the generation. `@Component` (and the meta-annotated `@Repository`, `@Controller`, `@Scheduled`, `@Listener`, `@Websocket`, plus extension contributions) become beans; the container instantiates each, satisfies constructor / `@Inject` field / collection (`List<T>`) injection by type, then registers it with its service (`@Entity` → entity manager, `@Controller` routes → router + OpenAPI, scheduled / listener / websocket beans → their engines).

Result: cross-file references in client code work, injection is order-independent (a `@Controller` can depend on any `@Repository` regardless of declaration order, in the constructor or via `@Inject`), and old controllers / handlers are atomically swapped for new ones.

## Artefact-based engines: STOP / START via the synchronizer

For BPMN processes, Camel routes, Quartz jobs, listeners, websockets, OData services, proxies, and access rules, the lifecycle on UPDATE is:

1. Synchronizer detects content change (hash mismatch).
2. Engine's **STOP** hook tears down the live runtime state (unregisters Quartz trigger, undeploys Camel route, etc.).
3. Engine's **START** hook brings up the new state.

On DELETE, only STOP fires; on CREATE, only START.

This is why a change to a `.job` cron expression takes one synchronizer cycle to apply, not zero - but it does apply, with no restart of the platform.

## Reconciliation cadence

| Variable                                              | Purpose                                               |
| ----------------------------------------------------- | ----------------------------------------------------- |
| `DIRIGIBLE_SYNCHRONIZER_FREQUENCY`                    | Synchronizer cycle period.                            |
| `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_COUNT`            | Retries across synchronizers for unmet dependencies. |
| `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_INTERVAL_MILLIS`  | Backoff between cross-synchronizer retries.          |

## Forcing a reload

For tests or scripted scenarios:

```java
synchronizationProcessor.forceProcessSynchronizers();
```

Runs every synchronizer synchronously on the calling thread. See [Publish and reconcile](/help/concepts/publish-and-reconcile).

## Reference

- `JavascriptEndpoint`, `TypeScriptEndpoint` - `components/engine/engine-javascript`, `engine-typescript`
- `JavaSynchronizer` - `components/engine/engine-java/.../synchronizer/JavaSynchronizer.java`
- `ClientClassLoader`, `ClassPathIndex` - `components/engine/engine-java/.../runtime/`
- `ComponentContainer` (client-Java DI) - `components/engine/engine-java/.../runtime/`
- `BaseSynchronizer` lifecycle hooks - `components/core/core-base/.../synchronizer/`
