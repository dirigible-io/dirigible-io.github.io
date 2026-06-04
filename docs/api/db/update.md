# Update

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/update.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/update.ts)
- last updated: 
:::

This module provides the `Update` class, which serves as a facade for executing SQL UPDATE, INSERT, and DELETE statements in the Dirigible environment. The `execute` method allows for parameterized queries using either primitive values or structured parameter objects that specify both type and value. This flexibility enables developers to work with various data types and database-specific requirements when performing update operations.

### Key Features
- **Parameterized Queries**: Supports both primitive parameters and structured parameter objects for flexible query execution.
- **Named Parameters**: Allows for named parameters in the form of `:paramName` placeholders, enhancing readability and maintainability of SQL statements.
- **Type Specification**: Structured parameters can include type information, which is useful for databases that require explicit type definitions for certain operations.
- **Datasource Support**: The method accepts an optional datasource name, enabling execution against specific database connections in a multi-database environment.

### Use Cases
- Performing update operations on database records with dynamic values.
- Executing complex SQL statements that require specific data types or named parameters.
- Integrating with other modules that generate parameters in JSON format, allowing for seamless data flow within the application.

### Example Usage
```ts
import { Update } from "@aerokit/sdk/db";

// Example with primitive parameters
const rowsAffected1 = Update.execute("UPDATE Users SET name = ? WHERE id = ?", ["Alice", 1]);
console.log(rowsAffected1); // Output: number of rows updated

// Example with structured parameters
const rowsAffected2 = Update.execute(
  "INSERT INTO Orders (order_number, total) VALUES (:order_number, :total)",
  [
    { name: "order_number", type: "CHAR", value: "ORD12345" },
    { name: "total", type: "DECIMAL", value: 99.99 }
  ]
);
console.log(rowsAffected2); // Output: number of rows inserted
```

## Classes

### Update

#### execute()

Executes a parameterized SQL update statement (INSERT, UPDATE, or DELETE).

> ```ts
> static execute(sql: string, parameters: any, datasourceName: string): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `string` | The SQL query to execute. |
> | `parameters` | `any` | An optional array of values (primitives, TypedQueryParameter or NamedQueryParameter objects) to replace '?' or :paramName placeholders. |
> | `datasourceName` | `string` | The name of the database connection to use (optional). |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The number of rows affected by the statement.
> :::

