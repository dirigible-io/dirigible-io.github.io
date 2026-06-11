# Cache

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.cache`
- source: [cache/Cache.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/cache/Cache.java)
:::

Process-wide key/value cache shared across all client code in the tenant. Backed by the Dirigible platform's in-memory cache manager - values survive the request that wrote them but not a JVM restart, so treat the cache as derived state, not a system of record.

Useful for memoising expensive lookups, holding short-lived per-user state across requests, and coordinating between components that share the same key. Values are stored as plain `Object`s; the caller is responsible for cast safety.

### Key Features

- **In-memory**: Reads and writes are cheap; data is lost on JVM restart.
- **Tenant-wide**: A single shared keyspace across all code in the tenant - use prefixed keys (e.g. `"user:" + id + ":permissions"`) to avoid collisions.
- **Untyped values**: Stores arbitrary `Object`s; cast on read.
- **Polyglot-friendly**: Entries are accessible from any language running in the platform, provided the value is JSON-encodable.

### Example Usage

```java
import org.eclipse.dirigible.sdk.cache.Cache;

String key = "user:" + userId + ":permissions";
if (!Cache.contains(key)) {
    Cache.set(key, loadPermissions(userId));
}
@SuppressWarnings("unchecked")
Set<String> perms = (Set<String>) Cache.get(key);
```

## Methods

### contains()

Reports whether the cache currently holds a value for the given key.

> ```java
> public static boolean contains(String key);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `String` | The cache key. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if a value is currently cached under `key`, `false` otherwise.
> :::

### get()

Retrieves the cached value for the given key, or `null` if none.

> ```java
> public static Object get(String key);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `String` | The cache key. |
>
> ::: info Returns
> - **Type**: `Object`
> - **Description**: The cached value, or `null` if no value is cached under `key`. The caller is responsible for cast safety.
> :::

### set()

Stores a value in the cache under the given key, overwriting any previous value.

> ```java
> public static void set(String key, Object content);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `String` | The cache key. |
> | `content` | `Object` | The value to cache. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### delete()

Removes the cached entry for the given key. No-op if no value is cached under that key.

> ```java
> public static void delete(String key);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `String` | The cache key to remove. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### clear()

Removes every entry from the cache. Use with caution - the cache is shared across all client code in the tenant.

> ```java
> public static void clear();
> ```
>
> ::: info Returns
> - **Type**: `void`
> :::
