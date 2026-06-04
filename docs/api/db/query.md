# Query

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/query.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/query.ts)
- last updated: 
:::

This module provides a `Query` class for executing parameterized SQL SELECT statements against a database in the Dirigible environment. The `Query` class supports both positional parameters (using '?' placeholders) and named parameters (using ':paramName' placeholders), allowing for flexible query construction and execution. It also includes options for formatting the result set, such as specifying date formats.

### Key Features
- **Parameterized Queries**: Supports both positional and named parameters for secure and efficient query execution.
- **Result Formatting**: Allows for custom formatting of query results, including date formatting options.
- **JSON Input Support**: Accepts parameters as JSON strings or JavaScript arrays, providing flexibility in how parameters are passed to the query.
- **Error Handling**: Provides robust error handling for invalid parameter formats and JSON parsing issues.

### Use Cases
- Executing complex SQL queries with dynamic parameters in a secure manner to prevent SQL injection.
- Formatting query results according to specific requirements, such as date formats or custom data transformations.
- Integrating with other modules that generate parameters in JSON format, enabling seamless data flow within the application.

### Example Usage
```ts
import { Query } from "@aerokit/sdk/db";

// Positional parameters example
const result1 = Query.execute("SELECT * FROM Users WHERE age > ?", [30]);
console.log(result1); // Output: [{ id: 1, name: "Alice", age: 35 }, { id: 2, name: "Bob", age: 40 }]
```

## Classes

### Query

#### execute()

Executes a standard SQL query with positional parameters. Parameters array supports primitives e.g. `[1, 'John', 34.56]` or objects in format either `{'type':'[DATA_TYPE]', 'value':[VALUE]}` or `{'name':'[string]', 'type':'[DATA_TYPE]', 'value':[VALUE]}` e.g. `[{'type':'CHAR', 'value':'ISBN19202323322'}]` or `[{'name': 'order_number', 'type':'CHAR', 'value':'ISBN19202323322'}]`

> ```ts
> static execute(sql: string, parameters: any, datasourceName: string, formatting: FormattingParameter): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `string` | The SQL query to execute. |
> | `parameters` | `any` | An optional array of values (primitives, TypedQueryParameter or NamedQueryParameter objects) to replace '?' or :paramName placeholders. |
> | `datasourceName` | `string` | The name of the database connection to use (optional). |
> | `formatting` | `FormattingParameter` | Optional formatting parameters for the result set (e.g., date format). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of records representing the query results.
> :::

#### executeNamed()

Executes a SQL query with named parameters (e.g., ":name", ":id").

> ```ts
> static executeNamed(sql: string, parameters: any, datasourceName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `string` | The SQL query to execute. |
> | `parameters` | `any` | An optional array of NamedQueryParameter objects. |
> | `datasourceName` | `string` | The name of the database connection to use (optional). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of records representing the query results.
> :::

#### exportCsv()

Exports a SQL query with named parameters (e.g., ":name", ":id").

> ```ts
> static exportCsv(sql: string, parameters: any, datasourceName: string, fileName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sql` | `string` | The SQL query to execute. |
> | `parameters` | `any` | An optional array of NamedQueryParameter objects. |
> | `datasourceName` | `string` | The name of the database connection to use (optional). |
> | `fileName` | `string` | The file name pattern. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of records representing the query results.
> :::

