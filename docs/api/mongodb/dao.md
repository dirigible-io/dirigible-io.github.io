# DAO

## Overview

::: tip Module
- package: `@aerokit/sdk/mongodb`
- source: [mongodb/dao.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/mongodb/dao.ts)
- last updated: 
:::

The DAO (Data Access Object) module provides a high-level abstraction for performing CRUD operations on MongoDB collections. It defines a DAO class that encapsulates the logic for interacting with MongoDB, including entity validation, transformation, and database operations. The module also includes a factory function for creating DAO instances based on ORM definitions.

### Key Features:
- **Entity Validation**: The DAO class includes methods for validating entities against mandatory properties defined in the ORM.
- **Entity Transformation**: The `createNoSQLEntity` method transforms JavaScript objects into a format suitable for MongoDB storage, applying any necessary transformations defined in the ORM.
- **CRUD Operations**: The DAO class provides methods for inserting, updating, deleting, and querying entities in MongoDB collections.
- **Logging**: The module integrates with the logging system to provide detailed logs of database operations and errors.

### Use Cases:
- **Data Management**: Developers can use the DAO module to manage data stored in MongoDB collections, performing CRUD operations with ease.
- **ORM Integration**: By defining ORM specifications, developers can leverage the DAO module to ensure consistent data handling and validation across their application.

### Example Usage:
```ts
import { dao } from "@aerokit/sdk/mongodb";

// Define an ORM specification for a "users" collection
const userOrm = {
  table: "users",
  primaryKey: { name: "id" },
  mandatoryProperties: [
    { name: "name", type: "VARCHAR" },
    { name: "email", type: "VARCHAR" }
  ],
  optionalProperties: [
    { name: "age", type: "INTEGER" }
  ]
};

// Create a DAO instance for the "users" collection
const userDao = dao(userOrm);

// Insert a new user entity
const newUserId = userDao.insert({ name: "Alice", email: "alice@example.com" });

// Find the inserted user entity
const user = userDao.find(newUserId);
console.log("User found:", user);

// Update the user entity
user.age = 30;
userDao.update(user);

// Delete the user entity
userDao.remove(newUserId);
```

## Classes

### DAO

#### notify()



> ```ts
> notify(event: any, a: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `event` | `any` |  |
> | `a` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createNoSQLEntity()



> ```ts
> createNoSQLEntity(entity: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entity` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### validateEntity()



> ```ts
> validateEntity(entity: any, skip: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entity` | `any` |  |
> | `skip` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### insert()



> ```ts
> insert(_entity: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `_entity` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### update()



> ```ts
> update(entity: any): DAO;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entity` | `any` |  |
>
> ::: info Returns
> - **Type**: `DAO`
> - **Description**: 
> :::

#### remove()



> ```ts
> remove(id: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### expand()



> ```ts
> expand(expansionPath: any, context: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `expansionPath` | `any` |  |
> | `context` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### find()



> ```ts
> find(id: any, expand: any, select: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `any` |  |
> | `expand` | `any` |  |
> | `select` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### count()



> ```ts
> count(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### list()



> ```ts
> list(settings: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `settings` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### existsTable()



> ```ts
> existsTable(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### createTable()



> ```ts
> createTable(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### dropTable()



> ```ts
> dropTable(): DAO;
> ```
>
>
> ::: info Returns
> - **Type**: `DAO`
> - **Description**: 
> :::

