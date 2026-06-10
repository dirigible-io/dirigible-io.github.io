# Logging

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.log`
- source: [log/Logging.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/log/Logging.java), [log/Logger.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/log/Logger.java)
:::

`Logging` is the entry point for obtaining named application loggers. Names are conventionally dot-separated package paths (`com.acme.orders.fulfilment`) and are nested under the platform's `app.` root, so the same configuration knobs that govern other application loggers also govern these — set levels in `logback.xml`, override at runtime through `Logger.setLevel(String)`.

Loggers returned by `Logging.getLogger` are independent value objects; cache them in a `static final` field per class if performance matters.

Each `Logger` level method (`trace`, `debug`, `info`, `warn`, `error`) accepts an SLF4J-style template plus varargs — placeholders are `{}` (not `{0}`), and a trailing `Throwable` is unpacked into the stack-trace slot by SLF4J automatically.

### Key Features

- **SLF4J semantics**: `{}` placeholders, trailing `Throwable` captures stack traces.
- **Runtime level control**: `setLevel("DEBUG")` adjusts the level via Logback at runtime.
- **Level guards**: `isTraceEnabled` / `isDebugEnabled` / `isInfoEnabled` / `isWarnEnabled` / `isErrorEnabled` let you skip expensive argument construction.
- **Platform integration**: Logger names are automatically prefixed with `app.`, sharing appenders and configuration with the rest of the Dirigible platform.

### Example Usage

```java
import org.eclipse.dirigible.sdk.log.Logger;
import org.eclipse.dirigible.sdk.log.Logging;

public class OrderService {

    private static final Logger LOG = Logging.getLogger("com.acme.orders");

    public void process(String orderId, Payload payload) {
        if (LOG.isDebugEnabled()) {
            LOG.debug("payload received: {}", payload);
        }
        try {
            // ...
            LOG.info("processed order {}", orderId);
        } catch (IOException ex) {
            LOG.error("failed to load order {}", orderId, ex); // stack trace captured
        }
    }
}
```

## Factory

### Logging.getLogger()

Returns a new named `Logger`. The supplied name is conventionally a dot-separated package path; the platform prefixes it with `app.` before delegating to SLF4J.

> ```java
> public static Logger getLogger(String loggerName);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `loggerName` | `String` | The logger name, conventionally a dot-separated package path. |
>
> ::: info Returns
> - **Type**: `Logger`
> - **Description**: A new `Logger` instance bound to the given name.
> :::

## Logger

### getName()

Returns the logger's name as it was passed to `Logging.getLogger`.

> ```java
> public String getName();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The logger name.
> :::

### setLevel()

Adjusts the logger's level at runtime via Logback. Accepts the standard level names (`TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`). Returns the same `Logger` for fluent chaining.

> ```java
> public Logger setLevel(String level);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `level` | `String` | The level name (`TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`). |
>
> ::: info Returns
> - **Type**: `Logger`
> - **Description**: The same `Logger` instance, for chaining.
> :::

### isTraceEnabled()

Reports whether the `TRACE` level is enabled for this logger. Use this to guard expensive argument construction.

> ```java
> public boolean isTraceEnabled();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if `TRACE` is enabled, `false` otherwise.
> :::

### isDebugEnabled()

Reports whether the `DEBUG` level is enabled for this logger.

> ```java
> public boolean isDebugEnabled();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if `DEBUG` is enabled, `false` otherwise.
> :::

### isInfoEnabled()

Reports whether the `INFO` level is enabled for this logger.

> ```java
> public boolean isInfoEnabled();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if `INFO` is enabled, `false` otherwise.
> :::

### isWarnEnabled()

Reports whether the `WARN` level is enabled for this logger.

> ```java
> public boolean isWarnEnabled();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if `WARN` is enabled, `false` otherwise.
> :::

### isErrorEnabled()

Reports whether the `ERROR` level is enabled for this logger.

> ```java
> public boolean isErrorEnabled();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if `ERROR` is enabled, `false` otherwise.
> :::

### trace()

Logs a message at `TRACE` level. The `message` template uses SLF4J-style `{}` placeholders, filled from `args`. A trailing `Throwable` argument is unpacked into the stack-trace slot by SLF4J.

> ```java
> public void trace(String message, Object... args);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `String` | SLF4J-style template using `{}` placeholders. |
> | `args` | `Object...` | Values for the placeholders; an optional trailing `Throwable` becomes the stack trace. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### debug()

Logs a message at `DEBUG` level. Same template/varargs semantics as `trace`.

> ```java
> public void debug(String message, Object... args);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `String` | SLF4J-style template using `{}` placeholders. |
> | `args` | `Object...` | Values for the placeholders; an optional trailing `Throwable` becomes the stack trace. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### info()

Logs a message at `INFO` level. Same template/varargs semantics as `trace`.

> ```java
> public void info(String message, Object... args);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `String` | SLF4J-style template using `{}` placeholders. |
> | `args` | `Object...` | Values for the placeholders; an optional trailing `Throwable` becomes the stack trace. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### warn()

Logs a message at `WARN` level. Same template/varargs semantics as `trace`.

> ```java
> public void warn(String message, Object... args);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `String` | SLF4J-style template using `{}` placeholders. |
> | `args` | `Object...` | Values for the placeholders; an optional trailing `Throwable` becomes the stack trace. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### error()

Logs a message at `ERROR` level. Same template/varargs semantics as `trace`.

> ```java
> public void error(String message, Object... args);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `String` | SLF4J-style template using `{}` placeholders. |
> | `args` | `Object...` | Values for the placeholders; an optional trailing `Throwable` becomes the stack trace. |
>
> ::: info Returns
> - **Type**: `void`
> :::
