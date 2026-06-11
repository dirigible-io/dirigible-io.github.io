---
title: Jobs
description: Quartz scheduler state.
---

# Jobs

Lists the state of the embedded Quartz scheduler.

## Columns

- **Name** - job name.
- **Group** - Quartz job group.
- **Cron** - the trigger expression.
- **Handler** - JS / TS file or Java class executed on fire.
- **Next fire** - time of the next scheduled execution.
- **Previous fire** - time of the last execution.
- **State** - `NORMAL`, `PAUSED`, `BLOCKED`, `ERROR`, `COMPLETE`.
- **Owner** - declaring project.

The view is read-only. Authoring is done via [Job artefacts](/help/artefacts/) (`*.job` files reconciled by the job synchronizer).

## See also

- [Listeners view](/help/ide/views/listeners) - message listeners (other long-lived background workers).
- [@aerokit/sdk/job](/sdk/) - job control from JS / TS code.
