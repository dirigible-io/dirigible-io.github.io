# Procedure

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/procedure.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/procedure.ts)
- last updated: 
:::

This module provides a `Procedure` class for executing stored procedures in a database. It allows for both the creation of stored procedures using DDL statements and the execution of existing stored procedures with parameter support. The `execute` method can handle multiple result sets returned by a stored procedure and returns them as an array of JSON objects.

### Key Features
- **Create Procedures**: Use the `create` method to execute DDL statements for creating or modifying stored procedures.
- **Execute Procedures**: The `execute` method allows you to call stored procedures with parameters and handles multiple result sets.
- **Parameter Mapping**: Supports both primitive parameters (string and number) and structured parameters using the `ProcedureParameter` interface for explicit type definitions.
- **Resource Management**: Ensures proper closing of database resources (connections, statements, result sets) to prevent leaks.

### Use Cases
- Managing complex database operations encapsulated in stored procedures, allowing for cleaner application code and improved performance.
- Handling multiple result sets returned by stored procedures, which is common in scenarios like reporting or batch processing.
- Providing a flexible parameter mapping mechanism that can accommodate various data types and structures when calling stored procedures.

### Example Usage
```ts
import { Procedure } from "@aerokit/sdk/db";

// Create a stored procedure
const createSql = `
  CREATE PROCEDURE GetUserById(IN userId INT)
  BEGIN
    SELECT * FROM Users WHERE id = userId;
  END
`;
Procedure.create(createSql);

// Execute the stored procedure with a parameter
const result = Procedure.execute("{CALL GetUserById(?)}", [1]);
console.log(result); // Output: [{ id: 1, name: "Alice", email: "alice@example.com" }]
```

## Classes

### Procedure

#### create()

Executes a DDL/DML statement to create or modify a stored procedure without results.
*

> ```ts
> static create(sql: string, datasourceName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `string` | The SQL statement (e.g., CREATE PROCEDURE). |
> | `datasourceName` | `string` | Optional name of the data source to use. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### execute()

Executes a stored procedure call and returns the result set(s).
*

> ```ts
> static execute(sql: string, parameters: any, datasourceName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `string` | The callable statement (e.g., {CALL my_procedure(?, ?)}). |
> | `parameters` | `any` | An array of parameters. Primitives (string/number) are automatically typed. Use ProcedureParameter for explicit types. |
> | `datasourceName` | `string` | Optional name of the data source to use. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of JSON objects representing the result set(s).
> :::

