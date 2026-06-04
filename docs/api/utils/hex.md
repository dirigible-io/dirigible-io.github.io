# Hex

## Overview

::: tip Module
- package: `@aerokit/sdk/utils`
- source: [utils/hex.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/utils/hex.ts)
- last updated: 
:::

The Hex class provides static utility methods for encoding and decoding data using hexadecimal representation. It supports both string and byte array inputs, allowing developers to easily convert data to and from hexadecimal format. The class abstracts the underlying Java implementation, providing a simple interface for performing hexadecimal operations in JavaScript.

### Key Features:
- **Encoding**: Methods to encode strings or byte arrays into hexadecimal format, returning either a hexadecimal string or a byte array.
- **Decoding**: Methods to decode hexadecimal strings or byte arrays back into their original byte array form.

### Use Cases:
- **Data Serialization**: Hexadecimal encoding is commonly used for representing binary data in a human-readable format, which can be useful for debugging or logging purposes.
- **Cryptographic Operations**: Hexadecimal encoding is often used in cryptographic contexts to represent hash digests, keys, or other binary data in a readable format.
- **Data Transmission**: Developers can use hexadecimal encoding to transmit binary data over text-based protocols where Base64 might not be suitable.

### Example Usage:
```ts
import { Hex } from "@aerokit/sdk/utils";

// Encoding a string to hexadecimal
const hexString = Hex.encode("Hello, World!");
console.log(hexString); // Output: 48656c6c6f2c20576f726c6421

// Decoding a hexadecimal string back to bytes
const decodedBytes = Hex.decode(hexString);
console.log(decodedBytes); // Output: [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]
```

## Classes

### Hex

#### encode()

Hexadecimal encoding: Converts the input data (text or byte array) into a
standard **hexadecimal string representation**.

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
> - **Description**: The resulting hexadecimal string.
> :::

#### encodeAsBytes()

Hexadecimal encoding: Converts the input data (text or byte array) into a
**JavaScript byte array (any[])** containing the hexadecimal representation.

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
> - **Description**: The resulting byte array containing the hexadecimal data.
> :::

#### encodeAsNativeBytes()

Hexadecimal encoding: Converts the input data (text or byte array) into a
**native Java byte array** containing the hexadecimal representation.
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
> - **Description**: The resulting native Java byte array.
> :::

#### decode()

Hexadecimal decoding: Converts a hexadecimal input (text or byte array) back into
the original **raw byte array (JavaScript any[])**.

> ```ts
> static decode(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The hexadecimal data to decode, either as a string or a JavaScript byte array (any[]). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The decoded raw byte array (any[]). Returns null if decoding fails or input is null.
> :::

#### decodeAsNativeBytes()

Hexadecimal decoding: Converts a hexadecimal input (text or byte array) back into
the original **native Java raw byte array**. This method is generally for internal use.

> ```ts
> static decodeAsNativeBytes(input: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The hexadecimal data to decode, either as a string or a JavaScript byte array (any[]). |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The decoded native Java byte array.
> :::

