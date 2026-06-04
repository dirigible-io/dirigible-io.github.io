# Logging

## Overview

::: tip Module
- package: `@aerokit/sdk/log`
- source: [log/logging.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/log/logging.ts)
- last updated: 
:::

The Logging module provides a structured and flexible logging API for applications, allowing developers to create named loggers and emit log messages at various levels (e.g., DEBUG, INFO, WARN, ERROR). The module abstracts the underlying logging implementation, providing a consistent interface for logging across the application. It supports message formatting with variable arguments and can handle error objects to include stack traces in log outputs.

### Key Features:
- **Named Loggers**: Create loggers with specific names to categorize log messages (e.g., 'com.app.service').
- **Leveled Logging**: Emit log messages at different levels (DEBUG, INFO, WARN, ERROR) with the ability to set logging thresholds.
- **Message Formatting**: Support for message templates with variable arguments for dynamic log content.
- **Error Handling**: Ability to include Error objects in log messages to capture stack traces and error details.

### Use Cases:
- **Application Logging**: Use the Logging module to emit log messages throughout your application for debugging, monitoring, and auditing purposes.
- **Error Tracking**: Log errors with stack traces to facilitate troubleshooting and issue resolution.
- **Performance Monitoring**: Emit log messages at different levels to monitor application performance and behavior under various conditions.

### Example Usage:
```ts
import { Logging } from "@aerokit/sdk/log";

const logger = Logging.getLogger("com.app.service");
logger.setLevel("DEBUG");

logger.debug("Debugging value: {0}", someVariable);
logger.info("Service started successfully");
logger.warn("Low disk space warning");
logger.error("An error occurred while processing request", new Error("Database connection failed"));
```

## Classes

### Logging

#### getLogger()

Retrieves or creates a Logger instance associated with a specific name.
The logger name is typically used to categorize log messages (e.g., 'com.app.service').

> ```ts
> static getLogger(loggerName: string): Logger;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `loggerName` | `string` | The name of the logger. |
>
> ::: info Returns
> - **Type**: `Logger`
> - **Description**: A Logger instance.
> :::

### Logger

#### setLevel()

Sets the logging level for this specific logger instance.
Messages below this threshold will be ignored.

> ```ts
> setLevel(level: string): Logger;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `level` | `string` | The desired logging level (e.g., 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'). |
>
> ::: info Returns
> - **Type**: `Logger`
> - **Description**: The Logger instance for method chaining.
> :::

#### isDebugEnabled()

Checks if the DEBUG level is currently enabled for this logger.

> ```ts
> isDebugEnabled(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if DEBUG logging is enabled, false otherwise.
> :::

#### isErrorEnabled()

Checks if the ERROR level is currently enabled for this logger.

> ```ts
> isErrorEnabled(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if ERROR logging is enabled, false otherwise.
> :::

#### isWarnEnabled()

Checks if the WARN level is currently enabled for this logger.

> ```ts
> isWarnEnabled(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if WARN logging is enabled, false otherwise.
> :::

#### isInfoEnabled()

Checks if the INFO level is currently enabled for this logger.

> ```ts
> isInfoEnabled(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if INFO logging is enabled, false otherwise.
> :::

#### isTraceEnabled()

Checks if the TRACE level is currently enabled for this logger.

> ```ts
> isTraceEnabled(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if TRACE logging is enabled, false otherwise.
> :::

#### log()

The core logging method. Logs a message at the specified level, optionally
supporting parameters for message formatting and a final Error object for stack trace logging.

> ```ts
> log(msg: string, level: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `msg` | `string` | The log message template (e.g., "User {0} failed to connect: {1}"). |
> | `level` | `string` | The logging level (e.g., 'DEBUG', 'ERROR'). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### debug()

Logs a message at the DEBUG level.

> ```ts
> debug(msg: string, _: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `msg` | `string` | The log message template. |
> | `_` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### info()

Logs a message at the INFO level.

> ```ts
> info(msg: string, _: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `msg` | `string` | The log message template. |
> | `_` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### trace()

Logs a message at the TRACE level.

> ```ts
> trace(msg: string, _: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `msg` | `string` | The log message template. |
> | `_` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### warn()

Logs a message at the WARN level.

> ```ts
> warn(msg: string, _: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `msg` | `string` | The log message template. |
> | `_` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### error()

Logs a message at the ERROR level.

> ```ts
> error(msg: string, _: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `msg` | `string` | The log message template. |
> | `_` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

