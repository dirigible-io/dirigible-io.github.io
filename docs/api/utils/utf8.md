# UTF8

## Overview

::: tip Module
- package: `@aerokit/sdk/utils`
- source: [utils/utf8.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/utils/utf8.ts)
- last updated: 
:::

The UTF8 class provides static methods for encoding and decoding UTF-8 data. It serves as a utility for converting between standard JavaScript strings and their UTF-8 encoded representations, as well as handling raw byte arrays that represent UTF-8 data. This class abstracts the underlying native Java UTF8Facade, allowing developers to easily perform UTF-8 encoding and decoding operations in their JavaScript applications without needing to manage the complexities of character encoding directly.

### Key Features:
- **UTF-8 Encoding**: Convert standard JavaScript strings or byte arrays into UTF-8 encoded strings.
- **UTF-8 Decoding**: Convert UTF-8 encoded strings or byte arrays back into standard JavaScript strings.
- **Byte Array Handling**: Decode specific segments of byte arrays into strings using UTF-8 encoding.

### Use Cases:
- **Data Interchange**: Ensure that text data is correctly encoded and decoded when transmitted between systems that use UTF-8 encoding.
- **File Handling**: Read and write files with UTF-8 encoding, ensuring proper handling of international characters.
- **Web Development**: Encode and decode data for web applications that require UTF-8 encoding for compatibility with browsers and APIs.

### Example Usage:
```ts
import { UTF8 } from "@aerokit/sdk/utils";

// Encode a string into UTF-8
const utf8Encoded = UTF8.encode("Hello, World!");
console.log(utf8Encoded); // Output: Hello, World! (UTF-8 encoded)

// Decode a UTF-8 encoded string back to a standard string
const decodedString = UTF8.decode(utf8Encoded);
console.log(decodedString); // Output: Hello, World!

// Decode a segment of a byte array into a string
const byteArray = [72, 101, 108, 108, 111]; // Represents "Hello" in UTF-8
const decodedSegment = UTF8.bytesToString(byteArray, 0, byteArray.length);
console.log(decodedSegment); // Output: Hello
```

## Classes

### UTF8

#### encode()

Encodes the input (either a standard JavaScript string or a raw byte array)
into a UTF-8 encoded string representation.

> ```ts
> static encode(input: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The text string to be encoded, or a byte array to convert to its string representation. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The resulting UTF-8 encoded string.
> :::

#### decode()

Decodes the input (either a UTF-8 encoded string or a raw byte array)
back into a standard JavaScript string.

> ```ts
> static decode(input: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The UTF-8 encoded string or byte array to be decoded. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The resulting standard decoded string.
> :::

#### bytesToString()

Decodes a specific segment of a raw byte array into a standard string
using UTF-8 encoding.

> ```ts
> static bytesToString(bytes: any, offset: number, length: number): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `bytes` | `any` | The raw byte array containing the UTF-8 data. |
> | `offset` | `number` | The starting index (inclusive) from which to begin decoding. |
> | `length` | `number` | The number of bytes to decode starting from the offset. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The decoded string segment.
> :::

