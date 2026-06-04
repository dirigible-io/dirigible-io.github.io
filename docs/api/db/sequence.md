# Sequence

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/sequence.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/sequence.ts)
- last updated: 
:::

This module provides a `Sequence` class for managing database sequences in the Dirigible environment. The `Sequence` class offers static methods to retrieve the next value from a sequence, create new sequences, and drop existing sequences. It abstracts the underlying database interactions, allowing developers to work with sequences in a consistent manner across different database systems supported by Dirigible.

### Key Features
- Retrieve the next value from a specified database sequence.
- Create new sequences with optional starting values.
- Drop existing sequences when they are no longer needed.
- Support for specifying datasource names to target specific database connections.

### Use Cases
- Generating unique identifiers for records in a database table using sequences.
- Managing database sequences as part of application setup or migration processes.
- Abstracting sequence management to allow for easier maintenance and potential database engine changes in the future.

### Example Usage
```ts
import { Sequence } from "@aerokit/sdk/db";

// Create a new sequence named "user_id_seq" starting at 1000
Sequence.create("user_id_seq", 1000);

// Get the next value from the "user_id_seq" sequence
const nextUserId = Sequence.nextval("user_id_seq");
console.log(nextUserId); // Output: 1000

// Drop the "user_id_seq" sequence when it's no longer needed
Sequence.drop("user_id_seq");
```

## Classes

### Sequence

#### nextval()

Retrieves the next available value from a specified sequence.

> ```ts
> static nextval(sequence: string, tableName: string, datasourceName: string): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `string` | The name of the database sequence. |
> | `tableName` | `string` | Optional: The name of the table associated with the sequence (depends on database dialect/facade implementation). |
> | `datasourceName` | `string` | Optional: The name of the database connection to use. |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The next sequence value as a number.
> :::

#### create()

Creates a new database sequence.

> ```ts
> static create(sequence: string, start: number, datasourceName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `string` | The name of the sequence to create. |
> | `start` | `number` | Optional: The starting value for the sequence (defaults to 1 if not provided). |
> | `datasourceName` | `string` | Optional: The name of the database connection to use. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### drop()

Drops (deletes) an existing database sequence.

> ```ts
> static drop(sequence: string, datasourceName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `string` | The name of the sequence to drop. |
> | `datasourceName` | `string` | Optional: The name of the database connection to use. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

