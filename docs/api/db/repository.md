# Repository

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/repository.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/repository.ts)
- last updated: 
:::

This module provides an abstract `Repository` class that serves as a base for data access and business logic layers in the Dirigible environment. The `Repository` class wraps the underlying `store` API, providing a structured way to perform CRUD operations on entities while also handling entity metadata, translation, and event triggering. It is designed to be extended by specific repositories for different entities, allowing for customization of behavior and event handling.

### Key Features
- Abstract base class for repositories with built-in support for entity metadata management.
- CRUD operations (Create, Read, Update, Delete) with automatic translation of results.
- Event triggering mechanism for create, update, and delete operations, allowing for custom logic to be executed in response to these events.
- Type safety through TypeScript generics, ensuring that repositories are strongly typed according to their entity definitions.

### Use Cases
- Implementing data access layers for various entities in an application, providing a consistent and reusable approach to database interactions.
- Adding custom business logic or side effects in response to entity lifecycle events (e.g., logging, notifications, cache invalidation).
- Managing entity metadata and translations in a centralized manner within the repository layer.

### Example Usage
```ts
import { Repository } from "@aerokit/sdk/db";

// Define an entity interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Create a UserRepository by extending the Repository class
class UserRepository extends Repository<User> {
  constructor() {
    super(User);
  }

  // Override triggerEvent to add custom logic on create/update/delete
  protected async triggerEvent(data: EntityEvent<User>): Promise<void> {
    console.log(`User ${data.operation}d:`, data.entity);
    // Additional logic such as sending notifications or updating related data can be added here
  }
}

// Example of using the UserRepository
const userRepo = new UserRepository();
const newUserId = userRepo.create({ name: "Alice", email: "alice@example.com" });
const user = userRepo.findById(newUserId);
console.log(user); // Output: { id: 1, name: "Alice", email: "alice@example.com" }
userRepo.update({ id: newUserId, name: "Alice Smith", email: "alice.smith@example.com" });
userRepo.deleteById(newUserId);
```

## Classes

### Repository

#### getEntityName()



> ```ts
> getEntityName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getTableName()



> ```ts
> getTableName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getIdName()



> ```ts
> getIdName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getIdColumn()



> ```ts
> getIdColumn(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### findAll()

Finds all entities matching the given options.

> ```ts
> findAll(options: Options): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `options` | `Options` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### findById()

Finds a single entity by its primary key ID.

> ```ts
> findById(id: any, options: Options): T;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `any` |  |
> | `options` | `Options` |  |
>
> ::: info Returns
> - **Type**: `T`
> - **Description**: 
> :::

#### create()

Creates a new entity in the database.

> ```ts
> create(entity: T): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entity` | `T` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The generated ID (string or number).
> :::

#### update()

Updates an existing entity.
The entity must contain the primary key.

> ```ts
> update(entity: T): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entity` | `T` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### upsert()

Creates the entity if the ID is null/undefined, otherwise updates it.
If an ID is provided but the entity doesn't exist, it creates it.

> ```ts
> upsert(entity: T): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entity` | `T` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The entity's ID.
> :::

#### deleteById()

Deletes an entity by its primary key ID.

> ```ts
> deleteById(id: any): void;
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

#### count()

Counts the number of entities matching the given options.

> ```ts
> count(options: Options): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `options` | `Options` |  |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### triggerEvent()

Protected method intended for subclass overriding or internal event handling.

> ```ts
> triggerEvent(_data: EntityEvent): Promise;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `_data` | `EntityEvent` |  |
>
> ::: info Returns
> - **Type**: `Promise`
> - **Description**: 
> :::

