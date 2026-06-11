# Client

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.etcd`
- source: [etcd/Client.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/etcd/Client.java)
:::

Hands back a connected jetcd `KV` client against the platform's etcd configuration. Use it for distributed configuration storage, leader election, and distributed-lock primitives - the full jetcd async surface is available on the returned client, so this SDK class deliberately does not re-export every jetcd operation.

etcd keys and values are byte sequences; the `toBytes` / `toString` helpers convert between Java `String` / `byte[]` and jetcd `ByteSequence` so callers do not have to import jetcd's encoding helpers directly.

### Key Features:
- **Raw jetcd Client**: Returns the connected `io.etcd.jetcd.KV` so callers can use the full async / watch / lease surface.
- **Encoding Helpers**: `toBytes(String)` / `toBytes(byte[])` / `toString(ByteSequence)` cover the common encoding conversions between Java types and `ByteSequence`.
- **Platform-managed configuration**: The connection is driven by the platform's etcd configuration - callers do not need to manage endpoints or credentials.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.etcd.Client;
import io.etcd.jetcd.ByteSequence;
import io.etcd.jetcd.KV;

KV kv = Client.getClient();
ByteSequence key = Client.toBytes("app/feature-flags/native-apps");
ByteSequence value = Client.toBytes("enabled");
kv.put(key, value).get();

String current = Client.toString(kv.get(key).get().getKvs().get(0).getValue());
```

## Methods

### getClient()

Returns the connected jetcd `KV` client wired against the platform's etcd configuration.

> ```java
> public static KV getClient();
> ```
>
> ::: info Returns
> - **Type**: `io.etcd.jetcd.KV`
> - **Description**: The configured jetcd `KV` client.
> :::

### toBytes()

Converts a Java `String` or `byte[]` into a jetcd `ByteSequence`. Two overloads are provided.

> ```java
> public static ByteSequence toBytes(String value);
> public static ByteSequence toBytes(byte[] value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `String` or `byte[]` | The value to encode into a jetcd `ByteSequence`. |
>
> ::: info Returns
> - **Type**: `io.etcd.jetcd.ByteSequence`
> - **Description**: The encoded byte sequence ready for use as an etcd key or value.
> :::

### toString()

Converts a jetcd `ByteSequence` (typically a key or value returned by the jetcd client) into a Java `String`.

> ```java
> public static String toString(ByteSequence value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `io.etcd.jetcd.ByteSequence` | The byte sequence to decode. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The decoded string form of the byte sequence.
> :::
