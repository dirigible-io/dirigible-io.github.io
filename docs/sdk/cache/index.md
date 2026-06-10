# cache/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.cache`
- source: [cache/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/cache)
:::

The `cache` module provides a process-wide in-memory key/value cache shared across all client code in the tenant. It is backed by the Dirigible platform's cache manager — values survive the request that wrote them but not a JVM restart, so treat the cache as derived state, not a system of record.

Useful for memoising expensive lookups, holding short-lived per-user state across requests, and coordinating between components that share the same key.

The main components of this module are:
- **Cache**: Static `contains` / `get` / `set` / `delete` / `clear` helpers over the platform cache.

## Classes

- [Cache](./cache.md)
