---
title: Scheduled job
description: Quartz cron-scheduled handler. *.job artefact.
---

# Scheduled job

`*.job` is a JSON descriptor that schedules a handler module on a Quartz cron expression.

- **File format.** JSON.
- **Synchronizer.** `JobSynchronizer` (tenant-isolated).
- **Engine.** `engine-jobs` (Quartz).
- **Editor.** [Jobs editor](/help/ide/editors/jobs).
- **JS / TS API.** [`@aerokit/sdk/job/scheduler`](/api/job/scheduler) for runtime job control.

## File format

```json
{
    "expression": "0/5 * * * * ?",
    "group": "defined",
    "handler": "myproject/jobs/cleanup-handler.ts",
    "description": "Nightly cleanup",
    "parameters": [
        { "name": "batchSize", "type": "string", "defaultValue": "1000" }
    ]
}
```

| Field | Purpose |
| --- | --- |
| `expression` | Quartz cron expression (6-7 fields - seconds first). |
| `group` | Quartz group name. Use `defined` for user-authored jobs. |
| `handler` | Registry path of the JS / TS module to execute. |
| `description` | Free text. Shown in the Jobs perspective. |
| `parameters` | Optional. Each parameter is `{ name, type, defaultValue, description, choices }`; available to the handler via `@aerokit/sdk/job`. |

The handler module is invoked synchronously on each fire by the Quartz scheduler thread. Long-running work should fork its own thread or queue.

## Parameters

The `parameters` list is the job's declared input. A handler reads one by name, as a configuration value:

```ts
import { Configurations } from "@aerokit/sdk/core";

const batchSize = Configurations.get("batchSize");
```

```java
import org.eclipse.dirigible.sdk.core.Configurations;

String batchSize = Configurations.get("batchSize");
```

`Scheduler.getJob(name).getParameter("batchSize")` does the same read and falls back to the declared `defaultValue` when nothing was supplied - `name` is the job's name as the Jobs perspective lists it (the artefact's file name without the extension).

On a **scheduled fire** the handler sees the `defaultValue` from the artefact - a cron run carries no caller.

On a **manual trigger** - the play button in the [Jobs perspective](/help/ide/perspectives/jobs), `POST /services/jobs/trigger/{job}`, or `Scheduler.trigger(name, { ... })` - the caller supplies values. Two rules apply:

- **Only declared parameters may be set.** A name the artefact does not declare is rejected (`400` from the endpoint); declare it in the `.job` file first. A trigger is not a way to write platform configuration.
- **The values live for that run only**, on the thread that executes the handler. They are not global: a concurrent request, another tenant, or the next scheduled fire never sees them.

## Java alternative - `@Scheduled`

A client-Java `@Component` with a method-level `@Scheduled(expression = "...")` (the Dirigible annotations under `org.eclipse.dirigible.sdk.*`) is scheduled without a `.job` artefact - note the attribute is `expression`, not `cron`:

```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.job.Scheduled;

@Component
class CleanupJob {

    @Scheduled(expression = "0/5 * * * * ?")
    void run() {
        // ...
    }
}
```

Alternatively, a `@Component` implementing the self-describing `JobHandler` interface carries its own schedule - `String cron()` plus `void run()`. `.job` is preferred when the schedule, parameters, or handler should be authored in the registry (and reloaded without a restart).

## Tenancy

Job execution is tenant-isolated - each tenant gets an independent Quartz schedule keyed off its own reconciled `.job` artefacts.
