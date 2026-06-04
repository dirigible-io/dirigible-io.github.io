# Streams

## Overview

::: tip Module
- package: `@aerokit/sdk/io`
- source: [io/streams.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/io/streams.ts)
- last updated: 
:::

The Streams module provides core functionality for input/output stream management, including stream creation, data transfer, and byte array handling. It abstracts the complexities of working with streams in JavaScript by providing a set of classes and methods that wrap native Java stream objects, allowing developers to easily read from and write to streams in a consistent manner.

### Key Features:
- **Stream Copying**: Methods for copying data between input and output streams, with support for both small and large data transfers.
- **Resource Stream Creation**: Ability to create input streams from resources accessible via the class loader, facilitating access to bundled resources.
- **Byte Array Handling**: Methods for creating streams from JavaScript byte arrays and retrieving byte data from streams in both JavaScript and native formats.
- **Text Handling**: Methods for reading and writing text data to streams, with automatic encoding and decoding based on the platform's default character set.

### Use Cases:
- **File I/O**: Reading from and writing to files using streams, which is essential for handling large files without consuming excessive memory.
- **Network Communication**: Managing input and output streams for network sockets or HTTP requests/responses.
- **Data Transformation**: Using streams to transform data on-the-fly, such as compressing or encrypting data as it is read or written.

### Example Usage:
```ts
import { Streams, InputStream, OutputStream } from "@aerokit/sdk/io";

// Create an input stream from a resource
const inputStream = Streams.getResourceAsByteArrayInputStream("data/input.txt");

// Create an output stream to write to a file
const outputStream = new OutputStream(...);

// Copy data from the input stream to the output stream
Streams.copy(inputStream, outputStream);

// Read text from the input stream
const text = inputStream.readText();
console.log(text);

// Write text to the output stream
outputStream.writeText("Hello, World!");
```

## Classes

### Streams

#### copy()

Copies all bytes from the input stream to the output stream.
This method is generally used for smaller streams.

> ```ts
> static copy(input: InputStream, output: OutputStream): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `InputStream` | The source InputStream. |
> | `output` | `OutputStream` | The destination OutputStream. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### copyLarge()

Copies all bytes from the input stream to the output stream using a large buffer,
suitable for large file transfers.

> ```ts
> static copyLarge(input: InputStream, output: OutputStream): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `InputStream` | The source InputStream. |
> | `output` | `OutputStream` | The destination OutputStream. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getResourceAsByteArrayInputStream()

Creates a new InputStream from a resource accessible via the class loader.
This is typically used to read bundled resources within the application runtime.

> ```ts
> static getResourceAsByteArrayInputStream(path: string): InputStream;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the resource. |
>
> ::: info Returns
> - **Type**: `InputStream`
> - **Description**: A new InputStream instance for the resource.
> :::

#### createByteArrayInputStream()

Creates a new InputStream from a JavaScript byte array (`any[]`).

> ```ts
> static createByteArrayInputStream(data: any): InputStream;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `data` | `any` | The JavaScript array of byte values (`number[]`). |
>
> ::: info Returns
> - **Type**: `InputStream`
> - **Description**: A new InputStream instance initialized with the byte data.
> :::

#### createByteArrayOutputStream()

Creates a new OutputStream that writes data into an in-memory byte array.
This is typically used as a buffer to capture output before processing it.

> ```ts
> static createByteArrayOutputStream(): OutputStream;
> ```
>
>
> ::: info Returns
> - **Type**: `OutputStream`
> - **Description**: A new OutputStream instance backed by a byte array.
> :::

#### createInputStream()

Wraps a native (Java) InputStream object into a new JavaScript InputStream instance.

> ```ts
> static createInputStream(native: any): InputStream;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `native` | `any` | The underlying native InputStream object. |
>
> ::: info Returns
> - **Type**: `InputStream`
> - **Description**: A new InputStream wrapper.
> :::

#### createOutputStream()

Wraps a native (Java) OutputStream object into a new JavaScript OutputStream instance.

Note: This method is not static in the original definition, but is placed here for completeness
and consistency with other factory methods.

> ```ts
> createOutputStream(native: any): OutputStream;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `native` | `any` | The underlying native OutputStream object. |
>
> ::: info Returns
> - **Type**: `OutputStream`
> - **Description**: A new OutputStream wrapper.
> :::

### InputStream

#### read()

Reads the next byte of data from this input stream.

> ```ts
> read(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The next byte of data, or -1 if the end of the stream is reached.
> :::

#### readBytes()

Reads all remaining bytes from the stream and returns them as a JavaScript array.

> ```ts
> readBytes(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A JavaScript array (`number[]`) of the byte values.
> :::

#### readBytesNative()

Reads all remaining bytes from the stream and returns the native Java byte array.

> ```ts
> readBytesNative(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The native Java byte array object.
> :::

#### readText()

Reads all remaining bytes from the stream and converts them to a string
using the platform's default character encoding.

> ```ts
> readText(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The content of the stream as a string.
> :::

#### close()

Closes this input stream and releases any system resources associated with it.

> ```ts
> close(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### isValid()

Checks if the underlying native stream object is defined and non-null.

> ```ts
> isValid(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the stream is valid, false otherwise.
> :::

### OutputStream

#### write()

Writes the specified byte to this output stream.

> ```ts
> write(byte: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `byte` | `number` | The byte (as a number 0-255) to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### writeBytes()

Writes the entire content of a JavaScript byte array to this output stream.

> ```ts
> writeBytes(data: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `data` | `any` | The JavaScript array (`number[]`) of byte values to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### writeBytesNative()

Writes the entire content of a native Java byte array to this output stream.

> ```ts
> writeBytesNative(data: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `data` | `any` | The native Java byte array object to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### writeText()

Converts the string to bytes using the platform's default character encoding
and writes them to this output stream.

> ```ts
> writeText(text: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `text` | `string` | The string content to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### close()

Closes this output stream and releases any system resources associated with it.

> ```ts
> close(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getBytes()

Retrieves the content written to this stream as a JavaScript byte array.
This is typically used with a ByteArrayOutputStream.

> ```ts
> getBytes(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A JavaScript array (`number[]`) of the byte values written to the stream.
> :::

#### getBytesNative()

Retrieves the content written to this stream as the native Java byte array.
This is typically used with a ByteArrayOutputStream.

> ```ts
> getBytesNative(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The native Java byte array object.
> :::

#### getText()

Retrieves the content written to this stream as a string using the platform's
default character encoding. This is typically used with a ByteArrayOutputStream.

> ```ts
> getText(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The content of the stream as a string.
> :::

#### isValid()

Checks if the underlying native stream object is defined and non-null.

> ```ts
> isValid(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the stream is valid, false otherwise.
> :::

