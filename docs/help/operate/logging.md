---
title: Logging
description: Logback config, live tail, runtime log levels.
---

# Logging

Dirigible logs through SLF4J / Logback. Default configuration lives in `application-common.properties`; override either via mounted `logback-spring.xml` or via standard Spring Boot `LOGGING_*` env vars.

## Runtime log levels

Change a logger level without restart from:

- The [Logs view](/help/ide/views/logs) - one-click level toggles per logger.
- Spring Boot Admin under `/spring-admin/`.
- The Actuator endpoint at `/actuator/loggers/<name>` (`POST` with `{"configuredLevel":"DEBUG"}`).

## Log output destinations

Default: console (`stdout`). For Kubernetes deployments rely on stdout aggregation (`kubectl logs`, Loki/Stackdriver/Azure Monitor).

To add a file appender, mount a `logback-spring.xml`:

```xml
<configuration>
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>
    <include resource="org/springframework/boot/logging/logback/console-appender.xml"/>

    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>/var/log/dirigible/app.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>/var/log/dirigible/app.%d{yyyy-MM-dd}.%i.gz</fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <maxHistory>14</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} %-5level [%thread] %logger - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```

Set `LOGGING_CONFIG=/path/to/logback-spring.xml` on the JVM.

## SLF4J from user code

```ts
import { Logging } from "@aerokit/sdk/log";
const log = Logging.getLogger("demo");
log.info("file size: {}", size);
```

```java
import org.eclipse.dirigible.sdk.log.Logging;
import org.eclipse.dirigible.sdk.log.Logger;

private static final Logger LOG = Logging.getLogger("demo");
LOG.info("file size: {}", size);
```

User-code loggers are namespaced under `app.` so they share configuration with the rest of the platform.

## Auditing

The shell-exec audit log is opt-in:

```bash
DIRIGIBLE_EXEC_COMMAND_LOGGING_ENABLED=true
```

When enabled, every `@aerokit/sdk/platform/command` invocation logs the command line.

## See also

- [Logs view](/help/ide/views/logs)
- [Observability](/help/operate/observability)
