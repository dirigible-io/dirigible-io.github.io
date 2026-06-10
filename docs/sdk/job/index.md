# job/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.job`
- source: [job/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/job)
:::

This module provides the Quartz-backed scheduling surface. Job registration is **declarative** — annotate a class with `@Scheduled` and the platform manages the rest. `Scheduler` exposes a read-only listing of every Quartz job the platform knows about, useful for admin UIs.

The main components of this module are:
- **Scheduler**: Static facade that returns the JSON list of registered jobs.
- **@Scheduled**: Class annotation that registers a public no-arg `run()` method as a Quartz job on the given cron schedule.

## Classes
