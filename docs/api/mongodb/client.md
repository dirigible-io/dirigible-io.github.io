# Client

## Overview

::: tip Module
- package: `@aerokit/sdk/mongodb`
- source: [mongodb/client.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/mongodb/client.ts)
- last updated: 
:::

The Client module provides a high-level API for connecting to MongoDB databases and performing operations on collections. It abstracts the underlying MongoDB Java driver, allowing developers to interact with MongoDB using familiar JavaScript objects and methods. The module includes classes for managing database connections, accessing collections, and executing queries, making it easier to integrate MongoDB into applications built on the Dirigible platform.

### Key Features:
- **MongoDB Connection Management**: The `Client` class allows for connecting to MongoDB using a connection URI and credentials.
- **Database and Collection Access**: The `DB` and `DBCollection` classes provide methods for accessing databases and collections, as well as performing CRUD operations.
- **Querying and Cursor Management**: The `DBCursor` class enables iterating over query results with support for sorting, limiting, and batch processing.

### Use Cases:
- **Data Storage and Retrieval**: Developers can use this module to store and retrieve data in MongoDB, leveraging its flexible document model.
- **Integration with MongoDB**: By providing a JavaScript-friendly API, this module facilitates integration with MongoDB in applications running on the Dirigible platform.

### Example Usage:
```ts
import { Client } from "@aerokit/sdk/mongodb";

// Create a MongoDB client and connect to the database
const client = new Client("mongodb://localhost:27017", "username", "password");
const db = client.getDB("myDatabase");
const collection = db.getCollection("myCollection");

// Insert a document into the collection
collection.insert({ name: "Alice", age: 30 });

// Find documents in the collection
const cursor = collection.find({ age: { $gt: 25 } });
while (cursor.hasNext()) {
    const doc = cursor.next();
    console.log(doc);
}
```

## Classes

### DBObject

#### append()

Appends a key-value pair to the DBObject.

> ```ts
> append(key: string, value: any): DBObject;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The field name. |
> | `value` | `any` | The value to append. |
>
> ::: info Returns
> - **Type**: `DBObject`
> - **Description**: The current DBObject instance for chaining.
> :::

#### toJson()

Converts the DBObject to a standard JavaScript object representation (JSON).

> ```ts
> toJson(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A plain JavaScript object.
> :::

#### markAsPartialObject()

Marks the object as a partial object (used internally by MongoDB driver).

> ```ts
> markAsPartialObject(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### isPartialObject()

Checks if the object is a partial object.

> ```ts
> isPartialObject(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if partial, false otherwise.
> :::

#### containsField()

Checks if the DBObject contains a field with the specified key.

> ```ts
> containsField(key: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The field name. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the field exists, false otherwise.
> :::

#### get()

Gets the value associated with the given key.

> ```ts
> get(key: string): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The field name. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The field value.
> :::

#### put()

Puts a key-value pair into the DBObject.

> ```ts
> put(key: string, value: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The field name. |
> | `value` | `any` | The value to put. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The previous value associated with the key, or null.
> :::

#### removeField()

Removes a field from the DBObject.

> ```ts
> removeField(key: string): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The field name to remove. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The removed field value.
> :::

### Client

#### getDB()

Retrieves a database instance.

> ```ts
> getDB(name: string): DB;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | Optional name of the database. If not provided, the default database name is used. |
>
> ::: info Returns
> - **Type**: `DB`
> - **Description**: A DB instance.
> :::

### DB

#### getCollection()

Retrieves a collection instance from the database.

> ```ts
> getCollection(name: string): DBCollection;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the collection. |
>
> ::: info Returns
> - **Type**: `DBCollection`
> - **Description**: A DBCollection instance.
> :::

### DBCollection

#### insert()

Inserts a document into the collection.

> ```ts
> insert(dbObject: DBInput): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `dbObject` | `DBInput` | The document to insert (can be a plain JS object or DBObject). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### find()

Finds documents matching the query.

> ```ts
> find(query: DBInput, projection: DBInput): DBCursor;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `query` | `DBInput` | The query specification (can be a plain JS object or DBObject). |
> | `projection` | `DBInput` | The fields to include or exclude (can be a plain JS object or DBObject). |
>
> ::: info Returns
> - **Type**: `DBCursor`
> - **Description**: A DBCursor for iterating over results.
> :::

#### findOne()

Finds a single document matching the query.

> ```ts
> findOne(query: DBInput, projection: DBInput, sort: DBInput): DBObject;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `query` | `DBInput` | The query specification. |
> | `projection` | `DBInput` | The fields to include or exclude. |
> | `sort` | `DBInput` | The sorting specification. |
>
> ::: info Returns
> - **Type**: `DBObject`
> - **Description**: The found document as a DBObject.
> :::

#### findOneById()

Finds a single document by its string ID.

> ```ts
> findOneById(id: string, projection: DBInput): DBObject;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `string` | The string ID of the document. |
> | `projection` | `DBInput` | The fields to include or exclude. |
>
> ::: info Returns
> - **Type**: `DBObject`
> - **Description**: The found document as a DBObject.
> :::

#### count()

Counts the number of documents in the collection, optionally filtered by a query.

> ```ts
> count(query: DBInput): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `query` | `DBInput` | Optional query to filter the count. |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The number of documents.
> :::

#### getCount()

Gets the count of documents (alias for count).

> ```ts
> getCount(query: DBInput): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `query` | `DBInput` | Optional query to filter the count. |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The number of documents.
> :::

#### createIndex()

Creates an index on the collection.

> ```ts
> createIndex(keys: DBInput, options: DBInput): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `keys` | `DBInput` | The index key specification. |
> | `options` | `DBInput` | Optional index options. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createIndexForField()

Creates an index on a single field by name.

> ```ts
> createIndexForField(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the field to index. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### distinct()

Retrieves the distinct values for a specified field across a collection.
NOTE: The signature in the original code seems slightly off compared to typical MongoDB drivers.
This implementation follows the original structure using `keys.native` if `keys` is provided.

> ```ts
> distinct(name: string, query: DBInput, keys: DBInput): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The field name. |
> | `query` | `DBInput` | Optional query to filter results. |
> | `keys` | `DBInput` | Optional keys to use for distinct (replaces 'name' if provided and query exists). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### dropIndex()

Drops a specified index.

> ```ts
> dropIndex(index: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `any` | The name of the index or the DBObject representing the index keys. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### dropIndexByName()

Drops a specified index by name.

> ```ts
> dropIndexByName(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the index. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### dropIndexes()

Drops all indexes on the collection.

> ```ts
> dropIndexes(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### remove()

Removes documents from the collection matching the query.

> ```ts
> remove(query: DBInput): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `query` | `DBInput` | The deletion query specification. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### rename()

Renames the collection.

> ```ts
> rename(newName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `newName` | `string` | The new name for the collection. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### save()

Saves a document to the collection. If the document has an `_id`, it performs an update;
otherwise, it performs an insert.

> ```ts
> save(dbObject: DBInput): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `dbObject` | `DBInput` | The document to save. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### update()

Updates documents in the collection matching the query.

> ```ts
> update(query: DBInput, update: DBInput, upsert: boolean, multi: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `query` | `DBInput` | The update query specification. |
> | `update` | `DBInput` | The update operation specification (e.g., {$set: {...}}). |
> | `upsert` | `boolean` | If true, creates a new document if no documents match the query. |
> | `multi` | `boolean` | If true, updates all documents matching the query; otherwise, only one. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### updateMulti()

Updates multiple documents in the collection matching the query.
(Equivalent to calling `update` with `multi=true` and `upsert=true` implicitly).

> ```ts
> updateMulti(query: DBInput, update: DBInput): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `query` | `DBInput` | The update query specification. |
> | `update` | `DBInput` | The update operation specification. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getNextId()

Calculates the next sequential ID based on the largest existing `_id` in the collection.
Assumes `_id` is a numeric field.

> ```ts
> getNextId(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The next available sequential ID (starting at 1 if collection is empty).
> :::

#### generateUUID()

Generates a new random UUID (Universally Unique Identifier).

> ```ts
> generateUUID(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: A string representing the UUID.
> :::

### DBCursor

#### one()

Returns the single result from the cursor.

> ```ts
> one(): DBObject;
> ```
>
>
> ::: info Returns
> - **Type**: `DBObject`
> - **Description**: A DBObject representing the document.
> :::

#### batchSize()

Sets the batch size for the cursor.

> ```ts
> batchSize(numberOfElements: number): DBCursor;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `numberOfElements` | `number` | The batch size. |
>
> ::: info Returns
> - **Type**: `DBCursor`
> - **Description**: The DBCursor instance for chaining.
> :::

#### getBatchSize()

Gets the current batch size.

> ```ts
> getBatchSize(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The batch size.
> :::

#### getCollection()

Gets the collection associated with this cursor.

> ```ts
> getCollection(): DBCollection;
> ```
>
>
> ::: info Returns
> - **Type**: `DBCollection`
> - **Description**: The DBCollection instance.
> :::

#### getCursorId()

Gets the cursor ID.

> ```ts
> getCursorId(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The cursor ID string.
> :::

#### getKeysWanted()

Gets the projection object (fields wanted) used in the query.

> ```ts
> getKeysWanted(): DBObject;
> ```
>
>
> ::: info Returns
> - **Type**: `DBObject`
> - **Description**: The projection DBObject.
> :::

#### getLimit()

Gets the limit set on the cursor.

> ```ts
> getLimit(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The limit number.
> :::

#### close()

Closes the cursor.

> ```ts
> close(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### hasNext()

Checks if there is a next document in the cursor.

> ```ts
> hasNext(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if there is a next document, false otherwise.
> :::

#### next()

Retrieves the next document in the cursor.

> ```ts
> next(): DBObject;
> ```
>
>
> ::: info Returns
> - **Type**: `DBObject`
> - **Description**: The next document as a DBObject.
> :::

#### getQuery()

Gets the query object used to create this cursor.

> ```ts
> getQuery(): DBObject;
> ```
>
>
> ::: info Returns
> - **Type**: `DBObject`
> - **Description**: The query DBObject.
> :::

#### length()

Gets the number of documents matched by the query.

> ```ts
> length(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The total number of documents.
> :::

#### sort()

Specifies the order in which the query returns the results.

> ```ts
> sort(orderBy: DBInput): DBCursor;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `orderBy` | `DBInput` | The sorting specification (e.g., {field: 1} for ascending). |
>
> ::: info Returns
> - **Type**: `DBCursor`
> - **Description**: The DBCursor instance for chaining.
> :::

#### limit()

Limits the number of results to be returned.

> ```ts
> limit(limit: number): DBCursor;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `limit` | `number` | The maximum number of documents to return. |
>
> ::: info Returns
> - **Type**: `DBCursor`
> - **Description**: The DBCursor instance for chaining.
> :::

#### min()

Specifies the exclusive upper bound for a specific index.

> ```ts
> min(min: number): DBCursor;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `min` | `number` | The minimum value. |
>
> ::: info Returns
> - **Type**: `DBCursor`
> - **Description**: The DBCursor instance for chaining.
> :::

#### max()

Specifies the exclusive upper bound for a specific index.

> ```ts
> max(max: number): DBCursor;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `max` | `number` | The maximum value. |
>
> ::: info Returns
> - **Type**: `DBCursor`
> - **Description**: The DBCursor instance for chaining.
> :::

#### maxTime()

Sets a timeout for the server to execute the query.

> ```ts
> maxTime(maxTime: number): DBCursor;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `maxTime` | `number` | The maximum time in milliseconds. |
>
> ::: info Returns
> - **Type**: `DBCursor`
> - **Description**: The DBCursor instance for chaining.
> :::

#### size()

Gets the size of the result set.

> ```ts
> size(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The size number.
> :::

#### skip()

Skips the specified number of documents.

> ```ts
> skip(numberOfElements: number): DBCursor;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `numberOfElements` | `number` | The number of documents to skip. |
>
> ::: info Returns
> - **Type**: `DBCursor`
> - **Description**: The DBCursor instance for chaining.
> :::

