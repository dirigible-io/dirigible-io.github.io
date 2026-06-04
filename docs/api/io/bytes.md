# Bytes

## Overview

::: tip Module
- package: `@aerokit/sdk/io`
- source: [io/bytes.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/io/bytes.ts)
- last updated: 
:::

The Bytes class provides static methods for converting and manipulating byte arrays, facilitating conversions between JavaScript arrays, Java arrays, text, and integers. It serves as a utility for bridging data types between the JavaScript environment and native Java components, particularly in scenarios where byte-level data manipulation is required.

### Key Features:
- **Byte Array Conversion**: Methods to convert between JavaScript byte arrays (arrays of numbers) and native Java byte arrays, enabling seamless data exchange with Java methods.
- **Text Encoding/Decoding**: Methods to convert text strings to byte arrays and vice versa, using the default platform encoding (UTF-8).
- **Integer Conversion**: Methods to convert 32-bit integers to byte arrays and back, with support for both big-endian and little-endian byte orders.

### Use Cases:
- **File Handling**: When working with file uploads or downloads, the Bytes class can be used to convert file content between different formats.
- **Network Communication**: In scenarios involving network communication where data is transmitted as bytes, the Bytes class can facilitate encoding and decoding of messages.
- **Data Serialization**: For applications that require custom serialization of data into byte formats, the Bytes class provides essential utilities for handling such conversions.

### Example Usage:
```ts
import { Bytes } from "@aerokit/sdk/io";

// Convert text to byte array and back
const text = "Hello, World!";
const byteArray = Bytes.textToByteArray(text);
const reconstructedText = Bytes.byteArrayToText(byteArray);
console.log(reconstructedText); // Output: Hello, World!

// Convert integer to byte array and back
const intValue = 123456789;
const intByteArray = Bytes.intToByteArray(intValue, "BIG_ENDIAN");
const reconstructedInt = Bytes.byteArrayToInt(intByteArray, "BIG_ENDIAN");
console.log(reconstructedInt); // Output: 123456789
```

## Classes

### Bytes

#### toJavaBytes()

Converts a native JavaScript byte array (an array of numbers) to a Java byte array.
This is used internally by the API layer to pass data to Java methods.

> ```ts
> static toJavaBytes(bytes: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `bytes` | `any` | The JavaScript array of bytes (e.g., [104, 101, 108, 108, 111]). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A native Java byte array (internal representation).
> :::

#### toJavaScriptBytes()

Converts a native Java byte array back to a JavaScript array of numbers.
This is used internally by the API layer to retrieve data from Java methods.

> ```ts
> static toJavaScriptBytes(internalBytes: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `internalBytes` | `any` | The native Java byte array. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A JavaScript array containing the byte values (numbers).
> :::

#### textToByteArray()

Converts a standard text string into a byte array using the default platform encoding.

> ```ts
> static textToByteArray(text: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `text` | `string` | The input text string. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A JavaScript array representing the bytes of the text.
> :::

#### byteArrayToText()

Converts a byte array back into a text string.

> ```ts
> static byteArrayToText(data: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `data` | `any` | The JavaScript array of bytes. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The reconstructed text string.
> :::

#### intToByteArray()

Converts a 32-bit integer value into a byte array, respecting the specified byte order.

> ```ts
> static intToByteArray(value: number, byteOrder: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `number` | The integer value to convert. |
> | `byteOrder` | `any` | Specifies the byte ordering: "BIG_ENDIAN" (most significant byte first) or "LITTLE_ENDIAN" (least significant byte first). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A JavaScript array representing the 4-byte integer.
> :::

#### byteArrayToInt()

Converts a 4-byte array back into a 32-bit integer value, respecting the specified byte order.

> ```ts
> static byteArrayToInt(data: any, byteOrder: any): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `data` | `any` | The 4-byte array (JavaScript array of numbers). |
> | `byteOrder` | `any` | Specifies the byte ordering used during conversion. |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The reconstructed integer value.
> :::

