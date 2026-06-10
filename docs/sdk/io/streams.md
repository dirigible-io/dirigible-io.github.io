# Streams

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.io`
- source: [io/Streams.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/io/Streams.java)
:::

Stream-shaped I/O — read text / bytes from an `InputStream`, write to an `OutputStream`, copy between them, build in-memory buffers via `ByteArrayInputStream` / `ByteArrayOutputStream`. Useful when wiring together sources and sinks supplied by different APIs (a multipart upload feeding a ZIP entry, the platform repository feeding an HTTP response).

`copyLarge(InputStream, OutputStream)` should be preferred over plain `copy(InputStream, OutputStream)` for files larger than a few MB — it uses a bigger internal buffer and reports a `long` byte count via the underlying facade.

### Key Features:
- **Read primitives**: `read`, `readBytes`, `readText` over any `InputStream`.
- **Write primitives**: `write` a single byte, `writeBytes` (string-encoded), `writeText` over any `OutputStream`.
- **Copying**: `copy` for small payloads, `copyLarge` for multi-MB streams.
- **In-memory buffers**: Factory methods for `ByteArrayInputStream` / `ByteArrayOutputStream`.
- **Resource access**: Load a classpath resource as a `ByteArrayInputStream`.

### Example Usage:
```java
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import org.eclipse.dirigible.sdk.io.Streams;

try (InputStream in = Streams.getResourceAsByteArrayInputStream("/img/logo.png")) {
    ByteArrayOutputStream out = Streams.createByteArrayOutputStream();
    Streams.copy(in, out);
    byte[] data = Streams.getBytes(out);
}
```

## Methods

### read()
Reads a single byte from the stream and returns it as an `int`, or `-1` on end-of-stream.

> ```java
> public static int read(InputStream input) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `InputStream` | The stream to read from. |
>
> ::: info Returns
> - **Type**: `int`
> - **Description**: The byte read (0–255), or `-1` at end-of-stream.
> :::

### readBytes()
Reads all remaining bytes from the stream into a `byte[]`.

> ```java
> public static byte[] readBytes(InputStream input) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `InputStream` | The stream to drain. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: All bytes read from the stream.
> :::

### readText()
Reads the stream contents fully as text using the platform default encoding.

> ```java
> public static String readText(InputStream input) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `InputStream` | The stream to read. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The decoded text content.
> :::

### close()
Closes the given stream. Overloads cover both `InputStream` and `OutputStream`.

> ```java
> public static void close(InputStream input) throws IOException;
> public static void close(OutputStream output) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `InputStream` | The input stream to close. |
> | `output` | `OutputStream` | The output stream to close. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### write()
Writes a single byte (low 8 bits of `value`) to the output stream.

> ```java
> public static void write(OutputStream output, int value) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `output` | `OutputStream` | The output stream. |
> | `value` | `int` | The byte value to write (low 8 bits used). |
>
> ::: info Returns
> - **Type**: `void`
> :::

### writeBytes()
Writes the bytes encoded by the given string input to the output stream.

> ```java
> public static void writeBytes(OutputStream output, String input) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `output` | `OutputStream` | The output stream. |
> | `input` | `String` | The string-encoded byte input. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### writeText()
Writes a string of text to the output stream using the platform default encoding.

> ```java
> public static void writeText(OutputStream output, String value) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `output` | `OutputStream` | The output stream. |
> | `value` | `String` | The text to write. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### copy()
Copies all bytes from the input stream to the output stream. Suitable for small payloads — prefer `copyLarge` for multi-MB transfers.

> ```java
> public static void copy(InputStream input, OutputStream output) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `InputStream` | The source stream. |
> | `output` | `OutputStream` | The sink stream. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### copyLarge()
Copies all bytes from the input stream to the output stream using a larger internal buffer. Preferred for files above a few MB.

> ```java
> public static void copyLarge(InputStream input, OutputStream output) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `InputStream` | The source stream. |
> | `output` | `OutputStream` | The sink stream. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### createByteArrayInputStream()
Creates a new in-memory `ByteArrayInputStream`. Overloads cover an explicit `byte[]`, a `String`-encoded buffer, and an empty stream.

> ```java
> public static ByteArrayInputStream createByteArrayInputStream(byte[] input) throws IOException;
> public static ByteArrayInputStream createByteArrayInputStream(String input) throws IOException;
> public static ByteArrayInputStream createByteArrayInputStream() throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `byte[]` | The bytes to wrap. Optional. |
> | `input` | `String` | The string-encoded bytes to wrap. Optional. |
>
> ::: info Returns
> - **Type**: `ByteArrayInputStream`
> - **Description**: A new in-memory input stream.
> :::

### createByteArrayOutputStream()
Creates a new in-memory `ByteArrayOutputStream` to accumulate bytes.

> ```java
> public static ByteArrayOutputStream createByteArrayOutputStream() throws IOException;
> ```
>
> ::: info Returns
> - **Type**: `ByteArrayOutputStream`
> - **Description**: A new in-memory output stream.
> :::

### getBytes()
Returns the bytes accumulated in a `ByteArrayOutputStream`.

> ```java
> public static byte[] getBytes(ByteArrayOutputStream output) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `output` | `ByteArrayOutputStream` | The buffer to drain. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The accumulated bytes.
> :::

### getText()
Returns the accumulated bytes of a `ByteArrayOutputStream` decoded as text using the platform default encoding.

> ```java
> public static String getText(ByteArrayOutputStream output) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `output` | `ByteArrayOutputStream` | The buffer to drain. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The accumulated bytes decoded as text.
> :::

### getResourceAsByteArrayInputStream()
Loads a classpath resource at the given path and returns its contents as a `ByteArrayInputStream`.

> ```java
> public static ByteArrayInputStream getResourceAsByteArrayInputStream(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The classpath resource path. |
>
> ::: info Returns
> - **Type**: `ByteArrayInputStream`
> - **Description**: A stream over the resource contents.
> :::
