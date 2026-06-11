---
title: Scheduled jobs
description: Quartz-backed jobs declared by file or by annotation.
---

# Scheduled jobs

`engine-jobs` runs scheduled work on a Quartz scheduler. There are two ways to declare a job: the legacy `.job` artefact (JSON descriptor) and the modern `@Scheduled` decorator / annotation.

## `.job` artefact

A JSON descriptor under the project points at a JS/TS/Java handler module and supplies a cron expression. `JobSynchronizer` reconciles each `.job` file into a Quartz trigger.

```json
{
  "name": "demo-job",
  "group": "demo",
  "expression": "0 0 * * * ?",
  "handler": "demo/jobs/nightly.js",
  "description": "Run every hour"
}
```

Stop / start / reschedule from the Jobs perspective.

## `@Scheduled` annotation

The modern approach is a class with a no-arg `public void run()` method:

**Java:**

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.job.Scheduled;

@Scheduled(expression = "0 0 * * * ?")
public class NightlyJob {

    public void run() {
        // work here
    }
}
```

**TypeScript:**

```ts
import { Scheduled } from "@aerokit/sdk/job";

@Scheduled({ expression: "0 0 * * * ?" })
export class NightlyJob {

  public run() {
    // work here
  }
}
```

The expression is a standard Quartz cron string.

## Lifecycle

Hot-reload reinstalls the schedule on every change - rewriting the cron expression updates the trigger on the next synchronization cycle. Deleting the file removes the trigger.

## Operating the schedule

The Jobs perspective in the IDE shows every active job: state, next fire time, last result. Pause, resume, and trigger-now controls are there too. See [`/help/ide/perspectives/jobs`](/help/ide/perspectives/jobs).

For runtime control from code, use the `@aerokit/sdk/job/scheduler` module.

## Tenancy

Scheduled jobs are **tenant-isolated** - the same `.job` file under one project runs once per tenant.

## See also

- [TypeScript API - job](/api/job/).
- [Java SDK - job](/sdk/job/).
- [Jobs perspective](/help/ide/perspectives/jobs).
