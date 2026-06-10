# Utf8

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/Utf8.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/Utf8.java)
:::

UTF-8 byte / `String` conversion helpers. Equivalent to `str.getBytes(StandardCharsets.UTF_8)` and `new String(bytes, StandardCharsets.UTF_8)`; the wrapper exists so client code that reads and writes through `byte[]` streams (e.g. `org.eclipse.dirigible.sdk.io.Streams` output) can keep encoding choices in one obvious place.

`bytesToString(byte[], int, int)` lets callers decode a slice of a larger buffer without an intermediate copy — handy when chunking I/O.

### Key Features:
- **Single charset, single API**: No charset argument needed — UTF-8 is always the answer.
- **Slice-aware decode**: `bytesToString(bytes, offset, length)` decodes a window of a larger buffer.
- **Round-trip safe**: `decode(encode(s))` returns the original string.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.Utf8;

// String → UTF-8 bytes
byte[] bytes = Utf8.encode("Hello, World!");

// UTF-8 bytes → String
String text = Utf8.decode(bytes);

// Decode a slice of a larger buffer (e.g. partial network read)
byte[] buffer = readChunk();
String slice = Utf8.bytesToString(buffer, 0, 32);
```

## Methods

### encode()
Encodes a string as a UTF-8 byte array.

> ```java
> public static byte[] encode(String input) throws UnsupportedEncodingException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The text to encode. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The UTF-8 byte representation of `input`.
> :::

### decode()
Decodes a UTF-8 byte array into a string.

> ```java
> public static String decode(byte[] input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `byte[]` | The UTF-8 bytes to decode. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The decoded string.
> :::

### bytesToString()
Decodes a slice of a UTF-8 byte buffer — `offset` and `length` define the window within `bytes` to decode, with no intermediate copy.

> ```java
> public static String bytesToString(byte[] bytes, int offset, int length) throws UnsupportedEncodingException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `bytes` | `byte[]` | The source buffer. |
> | `offset` | `int` | Index of the first byte to decode. |
> | `length` | `int` | Number of bytes to decode starting from `offset`. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The decoded string for the specified window of `bytes`.
> :::
