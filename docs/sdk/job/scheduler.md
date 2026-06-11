# Scheduler

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.job`
- source: [job/Scheduler.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/job/Scheduler.java)
:::

Returns a JSON listing of every Quartz job the platform knows about - name, group, cron, next fire time, owner. Useful for admin endpoints and health-check pages that need to display the scheduler state.

Job registration itself is declarative: either drop a `.job` JSON descriptor under a project (picked up by the Job synchronizer) or annotate a class with `@Scheduled`. Programmatic schedule / unschedule is not exposed through this class on purpose - it would bypass the synchronizer contract and leave the live state out of sync with the declarative source.

### Key Features:
- **Read-only listing** - fits admin and health-check use cases.
- **Declarative registration only** - schedule via `@Scheduled` or a `.job` descriptor.
- **JSON output** - pass straight through to a controller response.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.job.Scheduler;

String json = Scheduler.list();
```

## Methods

### list()

Returns all Quartz jobs known to the platform.

> ```java
> public static String list();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON array of job descriptors (name, group, cron, next fire time, owner).
> :::
