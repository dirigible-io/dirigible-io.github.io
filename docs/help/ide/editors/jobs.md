---
title: Jobs Editor
description: Visual editor for scheduled `.job` artefacts.
---

# Jobs Editor

Visual editor for `*.job` artefacts. A job binds a cron expression to a handler module that the Quartz-backed `engine-jobs` invokes at every trigger.

Component: `editor-jobs`. Synchronizer: `JobSynchronizer`.

## Artefact shape

```json
{
    "expression": "0 * * * * ?",
    "group": "defined",
    "handler": "sales/jobs/daily-sync.ts",
    "description": "Daily sales sync",
    "parameters": [
        { "name": "BATCH_SIZE", "type": "string", "defaultValue": "500" }
    ]
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `expression` | yes | Quartz cron expression (`sec min hour day-of-month month day-of-week [year]`). |
| `group` | no | Logical grouping. Defaults to `defined`. |
| `handler` | yes | Repository path to the handler module. TS / JS via `engine-javascript`, Java via `engine-java`. |
| `description` | no | Human-readable description. Shown in the [Jobs view](/help/ide/views/jobs). |
| `parameters` | no | Static key / value pairs passed to the handler context at each invocation. |

## Editor fields

The editor exposes the same fields as form inputs:

- **Cron expression** - validated client-side.
- **Handler** - file picker; accepts `*.ts`, `*.js`, `*.mjs`, `*.java`.
- **Description**.
- **Parameters** - inline table; **Add** / **Edit** / **Delete** rows.

## Runtime

On synchronization, the job is registered with Quartz. Subsequent runs are visible in the [Jobs view](/help/ide/views/jobs), where you can also pause, resume, or trigger a job manually. Handler errors land in the [Logs view](/help/ide/views/logs).

## See also

- [Job artefact](/help/artefacts/process/job)
- [Scheduled jobs](/help/develop/scheduled-jobs)
- [`@aerokit/sdk/job/scheduler`](/sdk/job/scheduler)
