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

## `@Component` job

The modern approach is a `@Component` bean. There are exactly **two** styles. A class uses **one or the other, never both** - the engine rejects a class that mixes them.

**Java**

**Style 1 - self-describing interface.** A `@Component` that implements `JobHandler`. The interface carries the binding itself: `cron()` returns the schedule and `run()` does the work, so **no class-level `@Scheduled`** is used. This mirrors Spring's `org.quartz.Job`.

```java
package demo.scheduled;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.job.JobHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class CleanupJob implements JobHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger("app.out");

    @Override
    public String cron() {
        return "* * * * * ?";
    }

    @Override
    public void run() {
        LOGGER.info("CleanupJob executed!");
    }
}
```

**Style 2 - method-level `@Scheduled`.** `@Scheduled(expression = "…")` on a public no-arg method of a `@Component` (Spring `@Scheduled` style), so a single bean can hold several jobs alongside other logic and inject collaborators:

```java
package demo.scheduled;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.job.Scheduled;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class Maintenance {

    private static final Logger LOGGER = LoggerFactory.getLogger("app.out");

    @Scheduled(expression = "0/45 * * * * ?")
    public void purgeTempFiles() {
        LOGGER.info("Maintenance.purgeTempFiles executed (method-level @Scheduled)!");
    }
}
```

Both styles give compile-time signature checking and a direct dispatch path. There is no reflective by-name fallback. See [`/sdk/job/decorators`](/sdk/job/decorators) for details.

**Sample project:** [`dirigiblelabs/sample-java-job-decorator`](https://github.com/dirigiblelabs/sample-java-job-decorator) - `CleanupJob` (interface style, fires every second) and `Maintenance` (method-level `@Scheduled`). SDK reference: [`/sdk/`](https://www.dirigible.io/sdk/).

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

- Working sample: [`dirigiblelabs/sample-java-job-decorator`](https://github.com/dirigiblelabs/sample-java-job-decorator).
- [TypeScript API - job](/api/job/).
- [Java SDK - job](/sdk/job/).
- [SDK reference](https://www.dirigible.io/sdk/).
- [Jobs perspective](/help/ide/perspectives/jobs).
