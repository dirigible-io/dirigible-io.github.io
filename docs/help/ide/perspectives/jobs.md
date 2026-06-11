---
title: Jobs
description: Scheduled job control - list, trigger, enable, disable.
---

# Jobs

`perspective-jobs` shows every Quartz job registered in the running system. Read-only schedule control: jobs are **defined** via source artefacts and **operated** here.

## Layout

A table of every job with:

- **Name** and **group**.
- **Cron expression**.
- **Next fire time**.
- **Owner** (the user / tenant that registered it).
- **State** (enabled / disabled / paused).

## Actions

- **Trigger now** - fires the job out-of-band; the next scheduled fire time is unaffected.
- **Enable / Disable** - pauses or resumes the Quartz trigger without removing it.
- **View parameters** - inspect static parameters bound to the job.

To **create** or **delete** a job, edit its source:

- Declare a `.job` artefact and publish it. See [`.job` artefacts](/help/artefacts/process/job).
- Or annotate a Java class with `@Scheduled` - the synchronizer picks it up and registers it. See [Scheduled jobs in Java](/help/develop/scheduled-jobs).

## Related

- [`.job` artefact](/help/artefacts/process/job)
- [Scheduled jobs](/help/develop/scheduled-jobs)
- [Jobs editor](/help/ide/editors/jobs)
- [Jobs view](/help/ide/views/jobs)
