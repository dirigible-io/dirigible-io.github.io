# redis/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.redis`
- source: [redis/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/redis)
:::

This module hands back a connected Jedis client wired against the platform's Redis configuration (`DIRIGIBLE_REDIS_*`). Jedis exposes the full Redis command surface - strings, lists, sets, sorted sets, hashes, streams, pub/sub - so the SDK does not duplicate it; the wrapper exists purely to lift the configuration boilerplate.

The returned Jedis client should be treated as a per-call resource - close it (or use try-with-resources) so the underlying connection returns to the platform-managed pool. Sharing a single Jedis instance across threads is not safe.

The main components of this module are:

- [`Client`](./client.md) - returns the configured `redis.clients.jedis.Jedis` client.

## Classes
