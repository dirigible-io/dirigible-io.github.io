# Process

## Overview

::: tip Module
- package: `@aerokit/sdk/bpm`
- source: [bpm/process.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/bpm/process.ts)
- last updated: 
:::

This module provides functionalities for managing and interacting with BPMN process instances, including starting processes, updating metadata, and handling process variables.

### Key Features
- Start new process instances with optional business keys and parameters
- Update process instance metadata such as name, business key, and business status
- Manage process variables with support for local and global scopes, as well as transient variables

### Use Cases
- Initiating new process instances from application code
- Dynamically updating process instance information during execution
- Managing process variables for data storage and retrieval within process executions

### Example Usage
```ts
import { Process } from "@aerokit/sdk/bpm";
// Start a new process instance
const processInstanceId = Process.start("myProcessDefinitionKey", "myBusinessKey", { myVariable: "value" });
console.log(`Started process instance with ID: ${processInstanceId}`);
// Update process instance name
Process.setProcessInstanceName(processInstanceId, "My Process Instance");
// Set a process variable
Process.setVariable(processInstanceId, "myVariable", "newValue");
```

## Classes

### BpmnError

### Process

#### start()

Starts a new process instance for a given process definition key.

> ```ts
> static start(key: string, businessKey: string, parameters: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The process definition key (ID) of the process to start. |
> | `businessKey` | `string` | An optional business key to associate with the process instance. Defaults to an empty string. |
> | `parameters` | `any` | An optional map of process variables to pass to the process instance upon starting. Defaults to an empty object. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The unique ID of the newly started process instance.
> :::

#### setProcessInstanceName()

Sets a human-readable name for an existing process instance.

> ```ts
> static setProcessInstanceName(processInstanceId: string, name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `string` | The ID of the process instance to update. |
> | `name` | `string` | The new name for the process instance. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### updateBusinessKey()

Updates the business key of an existing process instance.

> ```ts
> static updateBusinessKey(processInstanceId: string, businessKey: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `string` | The ID of the process instance to update. |
> | `businessKey` | `string` | The new business key. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### updateBusinessStatus()

Updates the business status of an existing process instance.

> ```ts
> static updateBusinessStatus(processInstanceId: string, businessStatus: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `string` | The ID of the process instance to update. |
> | `businessStatus` | `string` | The new business status. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getVariable()

Retrieves the value of a specific variable from a process instance.

> ```ts
> static getVariable(processInstanceId: string, variableName: string): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `string` | The ID of the process instance. |
> | `variableName` | `string` | The name of the variable to retrieve. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The value of the variable, or `null` if the variable does not exist. The type is `any` as it depends on the stored value.
> :::

#### getVariables()

Retrieves all variables associated with a process instance.

> ```ts
> static getVariables(processInstanceId: string): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `string` | The ID of the process instance. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: An object containing all variables for the process instance, where keys are variable names and values are the variable values.
> :::

#### setVariable()

Sets or updates the value of a variable in a process instance.

> ```ts
> static setVariable(processInstanceId: string, variableName: string, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `string` | The ID of the process instance. |
> | `variableName` | `string` | The name of the variable to set. |
> | `value` | `any` | The new value for the variable. The type is `any` to accommodate different data types. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### removeVariable()

Removes a variable from a process instance.

> ```ts
> static removeVariable(processInstanceId: string, variableName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `string` | The ID of the process instance. |
> | `variableName` | `string` | The name of the variable to remove. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### correlateMessageEvent()

Correlates a message event with a running process instance.

> ```ts
> static correlateMessageEvent(processInstanceId: string, messageName: string, variables: Map): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `string` | The ID of the process instance to correlate the message to. |
> | `messageName` | `string` | The name of the message event defined in the BPMN process. |
> | `variables` | `Map` | A map of variables (`Map<string, any>`) to pass along with the message event. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getExecutionContext()

Retrieves the current execution context object, typically used within an execution listener or service task.

> ```ts
> static getExecutionContext(): ExecutionContext;
> ```
>
>
> ::: info Returns
> - **Type**: `ExecutionContext`
> - **Description**: A new instance of the `ExecutionContext` containing details about the current process execution path.
> :::

#### getTaskContext()

Retrieves the current task context object, typically used within a task listener or service task.

> ```ts
> static getTaskContext(): TaskContext;
> ```
>
>
> ::: info Returns
> - **Type**: `TaskContext`
> - **Description**: A new instance of the `TaskContext` containing details about the current task.
> :::

