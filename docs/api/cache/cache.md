# Cache

## Overview

::: tip Module
- package: `@aerokit/sdk/cache`
- source: [cache/cache.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/cache/cache.ts)
- last updated: 
:::

This module provides a `Cache` class that serves as a static utility for interacting with a server-side cache facade. The `Cache` class allows developers to perform simple key-value storage, retrieval, and invalidation operations on the cache, enabling efficient data management and performance optimization within the Dirigible environment.

### Key Features
- Simple key-value storage: Store any serializable data in the cache using a unique key.
- Efficient retrieval: Quickly retrieve cached values using their associated keys.
- Cache invalidation: Remove specific entries or clear the entire cache when needed.
- Server-side management: The cache is managed on the server, allowing for centralized control over caching behavior and policies.

### Use Cases
- Caching frequently accessed data to improve performance and reduce latency.
- Storing intermediate results of expensive computations or API calls for reuse.
- Managing session data or user-specific information in a scalable manner.
- Implementing application-level caching strategies to optimize resource usage and response times.

### Example Usage
```ts
import { Cache } from "@aerokit/sdk/cache";

// Store a value in the cache
Cache.set("user_123", { name: "Alice", age: 30 });
// Retrieve a value from the cache
const userData = Cache.get("user_123");
console.log(userData); // Output: { name: "Alice", age: 30 }
// Check if a key exists in the cache
const exists = Cache.contains("user_123");
console.log(exists); // Output: true
// Delete a specific key from the cache
Cache.delete("user_123");
// Clear the entire cache
Cache.clear();
```

## Classes

### Cache

#### contains()

Checks if the cache contains a value for the specified key.

> ```ts
> static contains(key: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The key to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the key exists in the cache, false otherwise.
> :::

#### get()

Retrieves the value associated with the specified key from the cache.

> ```ts
> static get(key: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `any` | The key to retrieve. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The cached value, or `undefined` if the key is not found.
> :::

#### set()

Stores a value in the cache under the specified key.
Note: The duration/time-to-live (TTL) is typically configured server-side.

> ```ts
> static set(key: string, data: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The key to store the data under. |
> | `data` | `any` | The data to store. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### delete()

Removes the key and its associated value from the cache.

> ```ts
> static delete(key: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The key to delete. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### clear()

Clears all entries from the cache.

> ```ts
> static clear(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

