# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.job`
- source: [job/Scheduled.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/job/Scheduled.java)
:::

`@Scheduled` registers a client Java class as a Quartz-managed scheduled job. The annotated class must expose a public no-arg `run()` method; Dirigible instantiates the class once and invokes `run()` on the configured cron schedule.

Hot-reload replaces the instance transparently - the old schedule is cancelled and a new one is registered with the updated class.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.job.Scheduled;
import org.eclipse.dirigible.sdk.log.Logger;
import org.eclipse.dirigible.sdk.log.Logging;

@Scheduled(expression = "0/30 * * * * ?")
public class CleanupJob {

    private static final Logger LOG = Logging.getLogger("com.acme.cleanup");

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

- The annotated class must expose a public no-arg `run()` method.
- Hot-reload reinstalls the schedule when the class changes.
- For programmatic / non-cron scheduling, drop a `.job` JSON descriptor under the project - the Job synchronizer picks it up.
