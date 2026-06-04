# Tracer

## Overview

::: tip Module
- package: `@aerokit/sdk/bpm`
- source: [bpm/tracer.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/bpm/tracer.ts)
- last updated: 
:::

This module provides a `Tracer` class for logging and tracing the execution of BPMN processes within the Dirigible environment. The `Tracer` class allows developers to log informational messages, warnings, and errors, as well as to track the duration of process execution from start to completion or failure.

### Key Features
- Context-aware logging: Automatically includes process definition ID, instance ID, business key, and activity ID in log messages.
- Execution timing: Tracks the duration of process execution and logs it upon completion or failure.
- Flexible logging levels: Supports informational, warning, and error logging.

### Use Cases
- Debugging and monitoring BPMN process execution in development and production environments.
- Providing insights into process performance and identifying bottlenecks or issues.
- Enhancing observability of BPMN processes for better maintenance and support.

### Example Usage
```ts
import { Tracer } from "@aerokit/sdk/bpm";

const tracer = new Tracer();
try {
  // Perform some operations related to the BPMN process
  tracer.log("Performing step 1");
  // ...
  tracer.log("Performing step 2");
 // ...
 tracer.complete("Process completed successfully");
} catch (error) {
 tracer.fail(`Process failed with error: ${error.message}`);
}
```

## Classes

### Tracer

#### log()



> ```ts
> log(message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### warn()



> ```ts
> warn(message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### error()



> ```ts
> error(message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### complete()



> ```ts
> complete(message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### fail()



> ```ts
> fail(message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

