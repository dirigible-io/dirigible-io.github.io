# Scheduler

## Overview

::: tip Module
- package: `@aerokit/sdk/job`
- source: [job/scheduler.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/job/scheduler.ts)
- last updated: 
:::

The Scheduler class provides a static façade for managing scheduled jobs and tasks within the platform. It allows users to retrieve job definitions, enable or disable jobs, trigger immediate execution, and log output associated with specific job instances. The Scheduler interacts with the underlying job scheduling system to facilitate the execution of recurring tasks based on cron expressions or other scheduling criteria.

### Key Features:
- **Job Retrieval**: Methods to retrieve all job definitions or a specific job by name.
- **Job Control**: Methods to enable, disable, or trigger jobs on demand.
- **Logging**: Methods to log messages at various levels (standard, error, warning, info) for specific job instances.

### Use Cases:
- **Task Scheduling**: Developers can use the Scheduler to manage tasks that need to run at specific intervals, such as data cleanup, report generation, or any recurring background processing.
- **Monitoring and Debugging**: The logging methods allow developers to track the execution of jobs and diagnose issues by associating log messages with specific job instances.

### Example Usage:
```ts
import { Scheduler } from "@aerokit/sdk/job";

// Retrieve all job definitions
const jobs = Scheduler.getJobs();
console.log(jobs);

// Enable a specific job
Scheduler.enable("myScheduledJob");

// Trigger a job immediately with parameters
Scheduler.trigger("myScheduledJob", { param1: "value1", param2: "value2" });

// Log a message for a specific job instance
Scheduler.log("myScheduledJob", "This is a log message for the job instance.");
```

## Classes

### Scheduler

#### getJobs()

Retrieves all job definitions currently configured in the system.

> ```ts
> static getJobs(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of Job objects.
> :::

#### getJob()

Retrieves a specific job definition by its unique name.

> ```ts
> static getJob(name: string): Job;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the job. |
>
> ::: info Returns
> - **Type**: `Job`
> - **Description**: A Job object corresponding to the provided name.
> :::

#### enable()

Enables a job, allowing it to be executed according to its schedule (cron expression).

> ```ts
> static enable(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the job to enable. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### disable()

Disables a job, preventing it from executing on its schedule.

> ```ts
> static disable(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the job to disable. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### trigger()

Triggers the immediate execution of a job.

> ```ts
> static trigger(name: string, parameters: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the job to trigger. |
> | `parameters` | `any` | Optional key-value object of parameters to pass to the job execution. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### log()

Logs a message at the standard log level for a specific job instance.
This is useful when the log context needs to be associated with a running job.

> ```ts
> static log(name: string, message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the job to associate the log with. |
> | `message` | `string` | The log message content. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### error()

Logs an error message for a specific job instance.

> ```ts
> static error(name: string, message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the job. |
> | `message` | `string` | The error message content. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### warn()

Logs a warning message for a specific job instance.

> ```ts
> static warn(name: string, message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the job. |
> | `message` | `string` | The warning message content. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### info()

Logs an informational message for a specific job instance.

> ```ts
> static info(name: string, message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the job. |
> | `message` | `string` | The information message content. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

