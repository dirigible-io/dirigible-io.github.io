# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.job`
- sources: [Scheduled.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/job/Scheduled.java), [JobHandler.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/job/JobHandler.java)
:::

A scheduled job is a [`@Component`](/sdk/component/decorators) declared in one of two styles - never both on the same class:

- **`@Scheduled`** on a method - annotate a public no-arg method of a `@Component` with `@Scheduled(expression = "<cron>")`; the runtime invokes that method on the cron schedule.
- **`JobHandler`** - a self-describing interface (`String cron()` + `void run()`); a `@Component` that implements it *is* the job, with the cron carried by `cron()` and no `@Scheduled` needed.

Hot-reload replaces the bean transparently - the old schedule is cancelled and a new one is registered with the updated class.

### Example Usage:

Method-level `@Scheduled`:
```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.job.Scheduled;
import org.eclipse.dirigible.sdk.log.Logger;
import org.eclipse.dirigible.sdk.log.Logging;

@Component
public class CleanupJob {

    private static final Logger LOG = Logging.getLogger("com.acme.cleanup");

    @Scheduled(expression = "0/30 * * * * ?")
    public void cleanup() {
        LOG.info("cleanup tick");
    }
}
```

Self-describing `JobHandler`:
```java
import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.job.JobHandler;

@Component
public class CleanupHandler implements JobHandler {

    @Override
    public String cron() {
        return "0/30 * * * * ?";
    }

    @Override
    public void run() {
        // cleanup tick
    }
}
```

## @Scheduled

Schedules a public no-arg method of a `@Component` to run on the given cron expression. It is a **method-level** annotation.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.METHOD)
> public @interface Scheduled { ... }
> ```

### Attributes

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `expression` | `String` | Quartz cron expression (six or seven fields). For example `"0/30 * * * * ?"` fires every 30 seconds. |

### Notes

- The annotated method must be public and take no arguments.
- The enclosing class must be a `@Component`.
- Hot-reload reinstalls the schedule when the class changes.
- For programmatic / non-cron scheduling, drop a `.job` JSON descriptor under the project - the Job synchronizer picks it up.

## JobHandler

Self-describing contract for a job. A `@Component` implementing it *is* the scheduled job - it carries its own cron expression, so no `@Scheduled` annotation is involved.

> ```java
> public interface JobHandler {
>     String cron();
>     void run();
> }
> ```

### Notes

- `cron()` returns the Quartz cron expression; `run()` is the job body.
- Use either `JobHandler` or a method-level `@Scheduled` on a class, never both.
