# SQL

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/sql.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/sql.ts)
- last updated: 
:::

This module provides a fluent API for building SQL statements in a database-agnostic way. It includes builders for SELECT, INSERT, UPDATE, DELETE, CREATE, and DROP statements, as well as a builder for retrieving the next value from a sequence. The builders allow for method chaining to construct complex SQL queries while managing parameters separately to prevent SQL injection. The module abstracts away differences in SQL dialects and provides a consistent interface for constructing SQL statements across different databases.

### Key Features
- Fluent API for building SQL statements with method chaining.
- Support for SELECT, INSERT, UPDATE, DELETE, CREATE, and DROP statements.
- Separate parameter management to prevent SQL injection.
- Database-agnostic design that abstracts away SQL dialect differences.
- Integration with the underlying database connection for executing built statements.

### Use Cases
- Constructing complex SQL queries in a readable and maintainable way.
- Building SQL statements dynamically based on application logic or user input.
- Abstracting database interactions to allow for easier maintenance and potential database engine changes in the future.

### Example Usage
```ts
import { SQLBuilder } from "@aerokit/sdk/db";

// Example of building a SELECT statement
const sqlBuilder = SQLBuilder.getDialect();
const selectQuery = sqlBuilder.select()
  .column("id")
  .column("name")
  .from("users")
  .where("id = ?", 1);
```

## Classes

### SQLBuilder

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getDialect()

Factory method to get a dialect-specific SQLBuilder instance.

> ```ts
> static getDialect(connection: Connection): SQLBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `connection` | `Connection` |  |
>
> ::: info Returns
> - **Type**: `SQLBuilder`
> - **Description**: 
> :::

#### select()



> ```ts
> select(): SelectBuilder;
> ```
>
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### insert()



> ```ts
> insert(): InsertBuilder;
> ```
>
>
> ::: info Returns
> - **Type**: `InsertBuilder`
> - **Description**: 
> :::

#### update()



> ```ts
> update(): UpdateBuilder;
> ```
>
>
> ::: info Returns
> - **Type**: `UpdateBuilder`
> - **Description**: 
> :::

#### delete()



> ```ts
> delete(): DeleteBuilder;
> ```
>
>
> ::: info Returns
> - **Type**: `DeleteBuilder`
> - **Description**: 
> :::

#### nextval()



> ```ts
> nextval(name: string): NextvalBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
>
> ::: info Returns
> - **Type**: `NextvalBuilder`
> - **Description**: 
> :::

#### create()



> ```ts
> create(): CreateBuilder;
> ```
>
>
> ::: info Returns
> - **Type**: `CreateBuilder`
> - **Description**: 
> :::

#### drop()



> ```ts
> drop(): DropBuilder;
> ```
>
>
> ::: info Returns
> - **Type**: `DropBuilder`
> - **Description**: 
> :::

### SelectBuilder

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### distinct()



> ```ts
> distinct(): SelectBuilder;
> ```
>
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### forUpdate()



> ```ts
> forUpdate(): SelectBuilder;
> ```
>
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### column()



> ```ts
> column(column: string): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `column` | `string` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### from()



> ```ts
> from(table: string, alias: string): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
> | `alias` | `string` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### join()



> ```ts
> join(table: string, on: string, alias: string, parameters: any): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
> | `on` | `string` |  |
> | `alias` | `string` |  |
> | `parameters` | `any` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### innerJoin()



> ```ts
> innerJoin(table: string, on: string, alias: string, parameters: any): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
> | `on` | `string` |  |
> | `alias` | `string` |  |
> | `parameters` | `any` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### outerJoin()



> ```ts
> outerJoin(table: string, on: string, alias: string, parameters: any): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
> | `on` | `string` |  |
> | `alias` | `string` |  |
> | `parameters` | `any` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### leftJoin()



> ```ts
> leftJoin(table: string, on: string, alias: string, parameters: any): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
> | `on` | `string` |  |
> | `alias` | `string` |  |
> | `parameters` | `any` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### rightJoin()



> ```ts
> rightJoin(table: string, on: string, alias: string, parameters: any): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
> | `on` | `string` |  |
> | `alias` | `string` |  |
> | `parameters` | `any` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### fullJoin()



> ```ts
> fullJoin(table: string, on: string, alias: string, parameters: any): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
> | `on` | `string` |  |
> | `alias` | `string` |  |
> | `parameters` | `any` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### where()

Sets the WHERE condition.

> ```ts
> where(condition: string, parameters: any): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `condition` | `string` | The SQL condition string (e.g., "column1 = ?"). |
> | `parameters` | `any` | Optional parameters to replace '?' in the condition. |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### order()



> ```ts
> order(column: string, asc: boolean): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `column` | `string` |  |
> | `asc` | `boolean` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### group()



> ```ts
> group(column: string): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `column` | `string` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### limit()



> ```ts
> limit(limit: number): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `limit` | `number` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### offset()



> ```ts
> offset(offset: number): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `offset` | `number` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### having()



> ```ts
> having(having: string): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `having` | `string` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

#### union()



> ```ts
> union(select: string): SelectBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `select` | `string` |  |
>
> ::: info Returns
> - **Type**: `SelectBuilder`
> - **Description**: 
> :::

### InsertBuilder

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### into()



> ```ts
> into(table: string): InsertBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
>
> ::: info Returns
> - **Type**: `InsertBuilder`
> - **Description**: 
> :::

#### column()



> ```ts
> column(column: string): InsertBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `column` | `string` |  |
>
> ::: info Returns
> - **Type**: `InsertBuilder`
> - **Description**: 
> :::

#### value()

Sets the value for the last column specified.

> ```ts
> value(value: string, parameters: any): InsertBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `string` | The value placeholder (e.g., "?") or literal. |
> | `parameters` | `any` | Optional parameters if a placeholder was used. |
>
> ::: info Returns
> - **Type**: `InsertBuilder`
> - **Description**: 
> :::

#### select()



> ```ts
> select(select: string): InsertBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `select` | `string` |  |
>
> ::: info Returns
> - **Type**: `InsertBuilder`
> - **Description**: 
> :::

### UpdateBuilder

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### table()



> ```ts
> table(table: string): UpdateBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
>
> ::: info Returns
> - **Type**: `UpdateBuilder`
> - **Description**: 
> :::

#### set()

Sets a column to a value.

> ```ts
> set(column: string, value: string, parameters: any): UpdateBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `column` | `string` | The column name. |
> | `value` | `string` | The value placeholder (e.g., "?") or literal. |
> | `parameters` | `any` | Optional parameters if a placeholder was used. |
>
> ::: info Returns
> - **Type**: `UpdateBuilder`
> - **Description**: 
> :::

#### where()

Sets the WHERE condition for the update.

> ```ts
> where(condition: string, parameters: any): UpdateBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `condition` | `string` | The SQL condition string (e.g., "column1 = ?"). |
> | `parameters` | `any` | Optional parameters to replace '?' in the condition. |
>
> ::: info Returns
> - **Type**: `UpdateBuilder`
> - **Description**: 
> :::

### DeleteBuilder

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### from()



> ```ts
> from(table: string): DeleteBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
>
> ::: info Returns
> - **Type**: `DeleteBuilder`
> - **Description**: 
> :::

#### where()

Sets the WHERE condition for the deletion.

> ```ts
> where(condition: string, parameters: any): DeleteBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `condition` | `string` | The SQL condition string (e.g., "column1 = ?"). |
> | `parameters` | `any` | Optional parameters to replace '?' in the condition. |
>
> ::: info Returns
> - **Type**: `DeleteBuilder`
> - **Description**: 
> :::

### NextvalBuilder

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

### CreateBuilder

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### table()



> ```ts
> table(table: string): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### view()



> ```ts
> view(view: string): CreateViewBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `view` | `string` |  |
>
> ::: info Returns
> - **Type**: `CreateViewBuilder`
> - **Description**: 
> :::

#### sequence()



> ```ts
> sequence(sequence: string): CreateSequenceBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `string` |  |
>
> ::: info Returns
> - **Type**: `CreateSequenceBuilder`
> - **Description**: 
> :::

### CreateTableBuilder

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### column()

Adds a generic column definition.

> ```ts
> column(name: string, type: DataType, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, isIdentity: boolean, isFuzzyIndexEnabled: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `type` | `DataType` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `isIdentity` | `boolean` |  |
> | `isFuzzyIndexEnabled` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnVarchar()

Adds a VARCHAR column.

> ```ts
> columnVarchar(name: string, length: number, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, isIdentity: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `length` | `number` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `isIdentity` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnNvarchar()

Adds an NVARCHAR column.

> ```ts
> columnNvarchar(name: string, length: number, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, isIdentity: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `length` | `number` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `isIdentity` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnChar()

Adds a CHAR column.

> ```ts
> columnChar(name: string, length: number, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, isIdentity: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `length` | `number` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `isIdentity` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnDate()

Adds a DATE column.

> ```ts
> columnDate(name: string, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnTime()

Adds a TIME column.

> ```ts
> columnTime(name: string, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnTimestamp()

Adds a TIMESTAMP column.

> ```ts
> columnTimestamp(name: string, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnInteger()

Adds an INTEGER column.

> ```ts
> columnInteger(name: string, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, isIdentity: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `isIdentity` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnTinyint()

Adds a TINYINT column.

> ```ts
> columnTinyint(name: string, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnBigint()

Adds a BIGINT column.

> ```ts
> columnBigint(name: string, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, isIdentity: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `isIdentity` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnSmallint()

Adds a SMALLINT column.

> ```ts
> columnSmallint(name: string, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnReal()

Adds a REAL column.

> ```ts
> columnReal(name: string, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnDouble()

Adds a DOUBLE column.

> ```ts
> columnDouble(name: string, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnBoolean()

Adds a BOOLEAN column.

> ```ts
> columnBoolean(name: string, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnBlob()

Adds a BLOB column.

> ```ts
> columnBlob(name: string, isNullable: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `isNullable` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### columnDecimal()

Adds a DECIMAL column with precision and scale.

> ```ts
> columnDecimal(name: string, precision: number, scale: number, isPrimaryKey: boolean, isNullable: boolean, isUnique: boolean, isIdentity: boolean, args: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `precision` | `number` |  |
> | `scale` | `number` |  |
> | `isPrimaryKey` | `boolean` |  |
> | `isNullable` | `boolean` |  |
> | `isUnique` | `boolean` |  |
> | `isIdentity` | `boolean` |  |
> | `args` | `any` | Additional dialect-specific arguments passed as an array to native. |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### primaryKey()



> ```ts
> primaryKey(columns: any, name: string): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `columns` | `any` |  |
> | `name` | `string` |  |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### foreignKey()



> ```ts
> foreignKey(name: string, columns: any, referencedTable: string, referencedColumns: any, referencedTableSchema: string): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `columns` | `any` |  |
> | `referencedTable` | `string` |  |
> | `referencedColumns` | `any` |  |
> | `referencedTableSchema` | `string` |  |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### unique()



> ```ts
> unique(name: string, columns: any): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `columns` | `any` |  |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

#### check()



> ```ts
> check(name: string, expression: string): CreateTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `expression` | `string` |  |
>
> ::: info Returns
> - **Type**: `CreateTableBuilder`
> - **Description**: 
> :::

### CreateViewBuilder

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### column()



> ```ts
> column(column: string): CreateViewBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `column` | `string` |  |
>
> ::: info Returns
> - **Type**: `CreateViewBuilder`
> - **Description**: 
> :::

#### asSelect()



> ```ts
> asSelect(select: string): CreateViewBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `select` | `string` |  |
>
> ::: info Returns
> - **Type**: `CreateViewBuilder`
> - **Description**: 
> :::

### CreateSequenceBuilder

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

### DropBuilder

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### table()



> ```ts
> table(table: string): DropTableBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `table` | `string` |  |
>
> ::: info Returns
> - **Type**: `DropTableBuilder`
> - **Description**: 
> :::

#### view()



> ```ts
> view(view: string): DropViewBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `view` | `string` |  |
>
> ::: info Returns
> - **Type**: `DropViewBuilder`
> - **Description**: 
> :::

#### sequence()



> ```ts
> sequence(sequence: string): DropSequenceBuilder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sequence` | `string` |  |
>
> ::: info Returns
> - **Type**: `DropSequenceBuilder`
> - **Description**: 
> :::

### DropTableBuilder

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

### DropViewBuilder

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

### DropSequenceBuilder

#### prepareBuilder()

Hook for subclasses to set up the native builder object (e.g., calling .select()).

> ```ts
> prepareBuilder(builder: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `builder` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### parameters()



> ```ts
> parameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addParameter()

Adds parameter(s) to the internal list. Handles single values and arrays of values.

> ```ts
> addParameter(value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### build()

Builds and returns the final SQL string.

> ```ts
> build(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

