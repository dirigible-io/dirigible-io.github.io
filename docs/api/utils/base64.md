# Base64

## Overview

::: tip Module
- package: `@aerokit/sdk/utils`
- source: [utils/base64.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/utils/base64.ts)
- last updated: 
:::

The Base64 class provides static utility methods for encoding and decoding data using the Base64 encoding scheme. It supports both string and byte array inputs, allowing developers to easily convert data to and from Base64 format. The class abstracts the underlying Java implementation, providing a simple interface for performing Base64 operations in JavaScript.

### Key Features:
- **Encoding**: Methods to encode strings or byte arrays into Base64 format, returning either a Base64 string or a byte array.
- **Decoding**: Methods to decode Base64 strings or byte arrays back into their original byte array form.

### Use Cases:
- **Data Serialization**: Base64 encoding is commonly used for serializing binary data (like images or files) into a text format that can be easily transmitted over text-based protocols such as HTTP.
- **Authentication**: Base64 encoding is often used in authentication schemes (e.g., Basic Authentication) to encode credentials before transmission.
- **Data Storage**: Developers can use Base64 encoding to store binary data in databases that only support text formats.

### Example Usage:
```ts
import { Base64 } from "@aerokit/sdk/utils";

// Encoding a string to Base64
const encodedString = Base64.encode("Hello, World!");
console.log(encodedString); // Output: SGVsbG8sIFdvcmxkIQ==

// Decoding a Base64 string back to bytes
const decodedBytes = Base64.decode(encodedString);
console.log(decodedBytes); // Output: [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]
```

## Classes

### Base64

#### encode()

Base64 encoding: Converts the input data (text or byte array) into a
standard **Base64 encoded string representation**.

> ```ts
> static encode(input: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The data to encode, either as a string or a JavaScript byte array (any[]). |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The resulting Base64 encoded string.
> :::

#### encodeAsBytes()

Base64 encoding: Converts the input data (text or byte array) into a
**JavaScript byte array (any[])** containing the Base64 encoded representation.

> ```ts
> static encodeAsBytes(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The data to encode, either as a string or a JavaScript byte array (any[]). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The resulting byte array containing the Base64 encoded data.
> :::

#### encodeAsNativeBytes()

Base64 encoding: Converts the input data (text or byte array) into a
**native Java byte array** containing the Base64 encoded representation.
This method is generally for internal use.

> ```ts
> static encodeAsNativeBytes(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The data to encode, either as a string or a JavaScript byte array (any[]). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The resulting native Java byte array containing the Base64 data.
> :::

#### decode()

Base64 decoding: Converts a Base64 input (text or byte array) back into
the original **raw byte array (JavaScript any[])**.

> ```ts
> static decode(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The Base64 data to decode, either as a string or a JavaScript byte array (any[]). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The decoded raw byte array (any[]). Returns null if decoding fails or input is null.
> :::

#### decodeAsNativeBytes()

Base64 decoding: Converts a Base64 input (text or byte array) back into
the original **native Java raw byte array**. This method is generally for internal use.

> ```ts
> static decodeAsNativeBytes(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The Base64 data to decode, either as a string or a JavaScript byte array (any[]). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The decoded native Java byte array.
> :::

