# Problems

## Overview

::: tip Module
- package: `@aerokit/sdk/platform`
- source: [platform/problems.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/platform/problems.ts)
- last updated: 
:::

The Problems module provides a static utility class for managing system problems and issues through the platform's ProblemsFacade. It allows developers to save new problems, fetch existing ones, update their status, and delete them as needed. This module abstracts the complexities of problem management, providing a simple interface for handling issues that arise during development or runtime.

### Key Features:
- **Problem Recording**: Save detailed information about problems, including location, type, cause, and expected outcomes.
- **Problem Retrieval**: Fetch individual problems by ID or retrieve all problems with optional filtering and batching.
- **Status Management**: Update the status of problems to indicate whether they are active, solved, or ignored.
- **Problem Deletion**: Remove specific problems or clear all problems based on their status.

### Use Cases:
- **Issue Tracking**: This module is ideal for applications that need to track and manage issues that occur during development or runtime, providing a structured way to log and resolve problems.
- **Automated Problem Handling**: Developers can use this module to automate the handling of known issues by updating their status or deleting them as part of maintenance routines.

### Example Usage:
```ts
import { Problems } from "@aerokit/sdk/platform";

// Save a new problem
Problems.save("/path/to/file.js", "Syntax Error", "10", "15", "Unexpected token", "Expected ';'", "Syntax", "JavaScript", "const a = ;", "file.js");

// Fetch all problems
const allProblems = Problems.fetchAllProblems();
console.log("All Problems:", allProblems);

// Update the status of a problem
Problems.updateStatus(1, Problems.SOLVED);

// Delete a specific problem
Problems.deleteProblem(1);
```

## Classes

### Problems

#### save()

Saves a new problem entry to the system's problem log.

> ```ts
> static save(location: string, type: string, line: string, column: string, cause: string, expected: string, category: string, module: string, source: string, program: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `location` | `string` | The resource path or file location. |
> | `type` | `string` | The severity or nature of the problem. |
> | `line` | `string` | The line number. |
> | `column` | `string` | The column number. |
> | `cause` | `string` | The cause description. |
> | `expected` | `string` | The expected state/value description. |
> | `category` | `string` | The problem category. |
> | `module` | `string` | The module/component name. |
> | `source` | `string` | The original source content. |
> | `program` | `string` | The program or file name. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### findProblem()

Finds a specific problem by its unique ID.
Note: The underlying facade returns a JSON string which is parsed here.

> ```ts
> static findProblem(id: number): Problem;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `number` | The unique problem ID. |
>
> ::: info Returns
> - **Type**: `Problem`
> - **Description**: The found Problem object.
> :::

#### fetchAllProblems()

Fetches all recorded problems in the system.
Note: The underlying facade returns a JSON string which is parsed here.

> ```ts
> static fetchAllProblems(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of all Problem objects.
> :::

#### fetchProblemsBatch()

Fetches a batch of problems based on a custom condition and limit.

> ```ts
> static fetchProblemsBatch(condition: string, limit: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `condition` | `string` | A SQL-like condition string (e.g., "CATEGORY='Syntax'"). |
> | `limit` | `number` | The maximum number of problems to retrieve. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of Problem objects matching the condition.
> :::

#### deleteProblem()

Deletes a problem record by its unique ID.

> ```ts
> static deleteProblem(id: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `number` | The unique problem ID to delete. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteAllByStatus()

Deletes all problem records that currently have the specified status.

> ```ts
> static deleteAllByStatus(status: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `status` | `string` | The status (e.g., Problems.SOLVED or Problems.IGNORED). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### clearAllProblems()

Clears (deletes) all problem records in the system, regardless of status.

> ```ts
> static clearAllProblems(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### updateStatus()

Updates the status of a single problem by its ID.

> ```ts
> static updateStatus(id: number, status: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `number` | The unique problem ID. |
> | `status` | `string` | The new status (e.g., Problems.SOLVED). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### updateStatusMultiple()

Updates the status of multiple problems identified by an array of IDs.

> ```ts
> static updateStatusMultiple(ids: any, status: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `ids` | `any` | An array of unique problem IDs. |
> | `status` | `string` | The new status to apply to all problems. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

