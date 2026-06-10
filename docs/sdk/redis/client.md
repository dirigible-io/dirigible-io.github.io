# Client

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.redis`
- source: [redis/Client.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/redis/Client.java)
:::

Hands back a connected Jedis client (`redis.clients.jedis.Jedis`) wired against the platform's Redis configuration (`DIRIGIBLE_REDIS_*`). Jedis exposes the full Redis command surface — strings, lists, sets, sorted sets, hashes, streams, pub/sub — so the SDK deliberately does not duplicate it; this wrapper exists purely to lift the configuration boilerplate.

Treat the returned client as a per-call resource — close it (or use try-with-resources) so the underlying connection returns to the platform-managed pool. Sharing a single Jedis instance across threads is not safe.

### Key Features:
- **Raw Jedis Client**: Returns the standard `redis.clients.jedis.Jedis` so callers can use the full Redis command surface.
- **Platform-managed configuration**: Connection settings (host, port, credentials) are picked up from `DIRIGIBLE_REDIS_*` environment configuration.
- **Per-call resource**: Each call to `getClient()` returns a Jedis instance that should be closed by the caller — use try-with-resources to return it cleanly to the pool.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.redis.Client;
import redis.clients.jedis.Jedis;

try (Jedis jedis = Client.getClient()) {
    jedis.set("greeting", "Hello, Redis!");
    String value = jedis.get("greeting");
    System.out.println(value); // Hello, Redis!

    jedis.rpush("inbox", "msg-1", "msg-2", "msg-3");
}
```

## Methods

### getClient()

Returns a Jedis client connected against the platform's Redis configuration. The caller is responsible for closing the returned client.

> ```java
> public static Jedis getClient();
> ```
>
> ::: info Returns
> - **Type**: `redis.clients.jedis.Jedis`
> - **Description**: A connected Jedis client. Close it (or use try-with-resources) to return it to the platform-managed pool.
> :::
