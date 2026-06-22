# job/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.job`
- source: [job/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/job)
:::

This module provides the Quartz-backed scheduling surface. Job registration is **declarative** - declare a [`@Component`](/sdk/component/decorators) job in either of two styles and the platform manages the rest: a method-level `@Scheduled(expression = …)`, or a class implementing the self-describing `JobHandler` interface. `Scheduler` exposes a read-only listing of every Quartz job the platform knows about, useful for admin UIs.

The main components of this module are:
- **Scheduler**: Static facade that returns the JSON list of registered jobs.
- **@Scheduled**: Method-level annotation that schedules a public no-arg method of a `@Component` on the given cron schedule.
- **JobHandler**: Self-describing interface (`cron()` + `run()`) - a `@Component` implementing it is itself the scheduled job.

## Classes
