# Store

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/store.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/store.ts)
- last updated: 
:::

This module provides a `Store` class that serves as a facade for interacting with the underlying Dirigible Data Store. The `Store` class offers methods for performing CRUD operations, executing parameterized queries, and retrieving metadata about entities. It abstracts away the complexities of JSON serialization and deserialization when communicating with the native Java facade, allowing developers to work with plain JavaScript objects and arrays seamlessly.

### Key Features
- CRUD Operations: Create, read, update, and delete entries in the data store using simple methods.
- Query Execution: Execute parameterized queries with support for both primitive and complex parameters.
- Metadata Retrieval: Access metadata about entities, such as table names and ID fields.
- JSON Handling: Automatically handles JSON serialization and deserialization of JavaScript objects when interacting with the native Java APIs.

### Use Cases
- Managing application data in a structured way using the data store.
- Executing complex queries with dynamic parameters to retrieve specific subsets of data.
- Abstracting away database interactions to allow for easier maintenance and potential future changes to the underlying data storage mechanism.

### Example Usage
```ts
import { Store } from "@aerokit/sdk/db";

// Save a new entry to the "users" entity
const userId = Store.save("users", { name: "Alice", email: "alice@example.com" });
```

## Classes

### Store

#### save()

Saves a new entry to the data store.

> ```ts
> static save(name: string, entry: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The entity/table name. |
> | `entry` | `any` | The JavaScript object to save. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The ID of the newly created entry (string or number).
> :::

#### upsert()

Inserts a new entry or updates an existing one if the ID is present.

> ```ts
> static upsert(name: string, entry: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The entity/table name. |
> | `entry` | `any` | The JavaScript object to insert/update. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### update()

Updates an existing entry.

> ```ts
> static update(name: string, entry: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The entity/table name. |
> | `entry` | `any` | The JavaScript object with the ID and updated data. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### list()

Lists entries based on optional filtering, sorting, and pagination options.

> ```ts
> static list(name: string, options: Options): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The entity/table name. |
> | `options` | `Options` | Optional Options for query execution. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of JavaScript objects.
> :::

#### count()

Counts the number of entries based on optional filtering options.

> ```ts
> static count(name: string, options: Options): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The entity/table name. |
> | `options` | `Options` | Optional Options for query execution. |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The count of matching entries.
> :::

#### get()

Retrieves a single entry by its ID.

> ```ts
> static get(name: string, id: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The entity/table name. |
> | `id` | `any` | The ID of the entry. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The entry object, or undefined if not found.
> :::

#### remove()

Deletes an entry by its ID.

> ```ts
> static remove(name: string, id: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The entity/table name. |
> | `id` | `any` | The ID of the entry to remove. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### find()

Finds entries matching an example object (query-by-example).

> ```ts
> static find(name: string, example: any, limit: number, offset: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The entity/table name. |
> | `example` | `any` | An object containing properties to match. |
> | `limit` | `number` | Maximum number of results to return. |
> | `offset` | `number` | Number of results to skip. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of matching JavaScript objects.
> :::

#### query()

Queries all entries for a given script with pagination.

> ```ts
> static query(query: string, parameters: any, limit: number, offset: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `query` | `string` | The query script. |
> | `parameters` | `any` |  |
> | `limit` | `number` | Maximum number of results to return. |
> | `offset` | `number` | Number of results to skip. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of JavaScript objects.
> :::

#### queryNative()

Queries all entries for a given entity name without pagination.

> ```ts
> static queryNative(query: string, parameters: any, limit: number, offset: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `query` | `string` | The entity/table name. |
> | `parameters` | `any` |  |
> | `limit` | `number` |  |
> | `offset` | `number` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of all JavaScript objects.
> :::

#### getEntityName()

Gets the name of the entity associated with the store name.

> ```ts
> static getEntityName(name: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getTableName()

Gets the underlying database table name for the entity.

> ```ts
> static getTableName(name: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getIdName()

Gets the property name used as the ID field in the entity object.

> ```ts
> static getIdName(name: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getIdColumn()

Gets the underlying database column name used for the ID field.

> ```ts
> static getIdColumn(name: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

