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

## Java alternative - `@Scheduled`

A Spring `@Component` carrying `@Scheduled(cron = "...")` is auto-discovered by the platform and runs without a `.job` artefact:

```java
@Component
class CleanupJob {
    @Scheduled(cron = "0/5 * * * * ?")
    void run() {
        // ...
    }
}
```

`.job` is preferred when the schedule, parameters, or handler should be authored in the registry (and reloaded without a restart). Use `@Scheduled` for platform-internal Spring beans.

## Tenancy

Job execution is tenant-isolated - each tenant gets an independent Quartz schedule keyed off its own reconciled `.job` artefacts.
