# Base64

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/Base64.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/Base64.java)
:::

Base64 encode/decode helpers in the standard (non URL-safe) alphabet. The `encode` and `decode` overloads handle the common `String` &harr; `byte[]` cases; the `Native` pair returns / accepts byte arrays on both sides for callers that already work in bytes (avoiding the intermediate `String` allocation).

Prefer this over `java.util.Base64` when you want behaviour consistent with the rest of the platform — the underlying facade uses Apache Commons Codec, which produces unchunked output (no embedded line breaks).

### Key Features:
- **Standard alphabet**: Uses the canonical non URL-safe Base64 alphabet.
- **Unchunked output**: No embedded line breaks (unlike `java.util.Base64.getMimeEncoder()`).
- **Bytes-first overloads**: `encodeNative` / `decodeNative` skip the `String` round-trip for streaming use cases.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.Base64;
import java.nio.charset.StandardCharsets;

// Encode a string
String encoded = Base64.encode("Hello, World!");
// → "SGVsbG8sIFdvcmxkIQ=="

// Decode back to raw bytes
byte[] decoded = Base64.decode(encoded);
String original = new String(decoded, StandardCharsets.UTF_8);
// → "Hello, World!"

// Bytes-in, bytes-out — no String allocation in between
byte[] payload = "binary".getBytes(StandardCharsets.UTF_8);
byte[] encodedBytes = Base64.encodeNative(payload);
byte[] roundTripped = Base64.decodeNative(encodedBytes);
```

## Methods

### encode()
Encodes the input into a standard Base64 string. Overloaded for `String` and `byte[]` inputs — string inputs are encoded as UTF-8 by the underlying facade.

> ```java
> public static String encode(String input);
> public static String encode(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` or `byte[]` | The data to encode. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The Base64-encoded representation (unchunked, no line breaks).
> :::

### decode()
Decodes a Base64 string back into the original raw bytes.

> ```java
> public static byte[] decode(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The Base64-encoded text to decode. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The decoded raw bytes.
> :::

### encodeNative()
Bytes-in, bytes-out Base64 encoding — avoids the intermediate `String` allocation. Use when the caller already has the payload as a `byte[]` and the next step also consumes bytes.

> ```java
> public static byte[] encodeNative(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `byte[]` | The raw bytes to encode. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The Base64-encoded bytes (ASCII).
> :::

### decodeNative()
Bytes-in, bytes-out Base64 decoding — accepts the ASCII Base64 representation as a `byte[]` and returns the decoded raw bytes.

> ```java
> public static byte[] decodeNative(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `byte[]` | The Base64-encoded bytes (ASCII) to decode. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The decoded raw bytes.
> :::
