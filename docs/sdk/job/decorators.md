# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.job`
- sources: [Scheduled.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/job/Scheduled.java), [JobHandler.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/job/JobHandler.java)
:::

`@Scheduled` registers a client Java class as a Quartz-managed scheduled job. The annotated class must expose a public no-arg `run()` method; Dirigible instantiates the class once and invokes `run()` on the configured cron schedule.

The optional `JobHandler` interface formalises that `run()` shape - implementing it gives compile-time signature checking, IDE refactoring, and a direct (non-reflective) dispatch path. Classes that don't implement it still work; the runtime falls back to a reflective `run()` lookup by name.

Hot-reload replaces the instance transparently - the old schedule is cancelled and a new one is registered with the updated class.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.job.JobHandler;
import org.eclipse.dirigible.sdk.job.Scheduled;
import org.eclipse.dirigible.sdk.log.Logger;
import org.eclipse.dirigible.sdk.log.Logging;

@Scheduled(expression = "0/30 * * * * ?")
public class CleanupJob implements JobHandler {

    private static final Logger LOG = Logging.getLogger("com.acme.cleanup");

    @Override
    public void run() {
        LOG.info("cleanup tick");
    }
}
```

## @Scheduled

Registers the class as a Quartz job with the given cron expression.

> ```java
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.TYPE)
> public @interface Scheduled { ... }
> ```

### Attributes

| Attribute | Type | Description |
| ------ | ------ | ------ |
| `expression` | `String` | Quartz cron expression (six or seven fields). For example `"0/30 * * * * ?"` fires every 30 seconds. |

### Notes

- The annotated class must expose a public no-arg `run()` method. Implementing `JobHandler` is the recommended way to declare it.
- Hot-reload reinstalls the schedule when the class changes.
- For programmatic / non-cron scheduling, drop a `.job` JSON descriptor under the project - the Job synchronizer picks it up.

## JobHandler

Optional typed contract for a `@Scheduled` class. Implementing it gives compile-time signature checking and a direct dispatch path; classes that don't implement it still work via reflection.

> ```java
> public interface JobHandler {
>     void run();
> }
> ```

### Notes

- `@Scheduled` is the marker that turns the class into a scheduled job - implementing the interface alone does not register anything.
- The default dispatch path for `JobHandler` skips `Method.invoke` entirely; performance is identical to a direct call.
- The startup log line reports which path was chosen (`typed dispatch` vs `reflective dispatch`).
