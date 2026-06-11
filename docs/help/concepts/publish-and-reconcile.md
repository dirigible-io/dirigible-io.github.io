---
title: Publish and reconcile
description: Save a file in the workspace, publish it to the registry, let the synchronizer reconcile it. Three steps, no redeploy.
---

# Publish and reconcile

The end-to-end UX for changing a Dirigible application has three steps:

1. **Save** the file in the IDE workspace.
2. **Publish** the project (or the file).
3. The **synchronizer** reconciles the change into runtime state on its next cycle.

There is no build server, no deploy job, no restart.

## What "save" does

Saving in the in-browser IDE writes the file to the workspace root:

```
/users/<user>/workspace/<project>/<path>
```

The runtime does not see workspace files. Workspaces are author-private drafts.

## What "publish" does

The *Publish* action in the IDE (Workbench perspective, or the `PublisherEndpoint`) copies the workspace tree to the public registry:

```
/users/<user>/workspace/<project>/...   ->   /registry/public/<project>/...
```

Programmatic equivalents:

- REST: `POST /services/ide/publisher/request/<workspace>/<project>` (and `/services/ide/publisher/request/<workspace>/<project>/<path>` for a single file).
- JS / TS: [`@aerokit/sdk/platform/workspace-client`](/api/platform).
- Java: `IRepository.createResource(...)` directly into `/registry/public/...` for tests.

## What reconciliation does

A background thread runs the synchronizer chain on a fixed cadence (`DIRIGIBLE_SYNCHRONIZER_FREQUENCY`). On each cycle:

1. Every synchronizer scans `/registry/public/...` for files matching its extension pattern.
2. New / changed files become **CREATE** or **UPDATE** artefacts; missing files become **DELETE**.
3. Each engine's STOP / START hooks bring the live runtime in line with the new state.

See [The synchronizer model](/help/concepts/synchronizer-model) for the lifecycle.

By the time the cycle completes, the new file is live - the next HTTP request hits the new controller, the next Quartz tick fires the new schedule, the next Camel poll uses the new route.

## Special case: JS / TS

JavaScript and TypeScript modules are **not** synchronized - they are loaded on demand by `JavascriptEndpoint` / `TypeScriptEndpoint`. Publish a JS file - the next request to `/services/js/<project>/<file>.js` evaluates the new source. No cycle wait.

## Special case: client Java

Java is synchronized. The full reconciliation (one `javac` task, one fresh `ClientClassLoader`, all `JavaClassConsumer`s) runs inside `JavaSynchronizer.finishing()` once per cycle. Publish a Java file - it takes up to one cycle to compile and reload.

## Forcing a sync

For HTTP-only integration tests and scripted scenarios:

```java
synchronizationProcessor.forceProcessSynchronizers();
```

`SynchronizationProcessor` (in `core-initializers`) runs every synchronizer **synchronously** on the calling thread. Used by `JavaEngineIT`-style tests that bypass Selenide. Not intended as part of the normal request path.

## Cadence tuning

| Variable                                          | Purpose                                                |
| ------------------------------------------------- | ------------------------------------------------------ |
| `DIRIGIBLE_SYNCHRONIZER_FREQUENCY`                | Reconciliation cadence (seconds).                     |
| `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_COUNT`        | Retries across synchronizers when an artefact's dependency isn't ready yet. |
| `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_INTERVAL_MILLIS` | Backoff between cross-synchronizer retries.        |

The defaults are conservative; lower the frequency on dev boxes for tighter feedback, raise it on production for less filesystem pressure.

## Reference

- `PublisherEndpoint` - `components/ide/ide-workspace/`
- `SynchronizationProcessor` - `components/core/core-initializers/`
- `DirigibleConfig` enum - `modules/commons/commons-config/.../config/DirigibleConfig.java`
