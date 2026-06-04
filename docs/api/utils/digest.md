# Digest

## Overview

::: tip Module
- package: `@aerokit/sdk/utils`
- source: [utils/digest.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/utils/digest.ts)
- last updated: 
:::

The Digest class provides static utility methods for calculating cryptographic hash digests (MD5, SHA1, SHA256, SHA384, SHA512) from input data. It supports both string and byte array inputs, allowing developers to easily compute digests in various formats. The class abstracts the underlying Java implementation, providing a simple interface for performing digest operations in JavaScript.

### Key Features:
- **Multiple Digest Algorithms**: Supports MD5, SHA1, SHA256, SHA384, and SHA512 digest algorithms.
- **Flexible Input Types**: Accepts both string and byte array inputs for digest calculation.
- **Output Formats**: Provides methods to return digest results as byte arrays or hexadecimal strings.

### Use Cases:
- **Data Integrity**: Compute digests to verify the integrity of data by comparing computed digests with expected values.
- **Password Hashing**: Use digest functions to hash passwords before storing them in a database (note: consider using a stronger hashing algorithm with salt for password storage).
- **Unique Identifiers**: Generate unique identifiers for data based on their content by computing their digests.

### Example Usage:
```ts
import { Digest } from "@aerokit/sdk/utils";

// Calculate MD5 digest of a string and get it as a hex string
const md5Hex = Digest.md5Hex("Hello, World!");
console.log(md5Hex); // Output: 65a8e27d8879283831b664bd8b7f0ad4

// Calculate SHA256 digest of a byte array and get it as a byte array
const sha256Bytes = Digest.sha256([72, 101, 108, 108, 111]); // "Hello" in bytes
console.log(sha256Bytes); // Output: [185, 105, 241, 149, 122, 223, 173, 190, ...]
```

## Classes

### Digest

#### md5()

Calculate MD5 digest from input (text or byte array) and return result as byte array

> ```ts
> static md5(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### md5AsNativeBytes()

Calculate MD5 digest from input (text or byte array) and return result as 16 elements java native byte array

> ```ts
> static md5AsNativeBytes(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### md5Hex()

Calculate MD5 digest from input (text or byte array) and return result as 32 character hex string

> ```ts
> static md5Hex(input: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### sha1()

Calculate SHA1 digest from input (text or byte array) and return result as 20 elements byte array

> ```ts
> static sha1(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sha1AsNativeBytes()

Calculate SHA1 digest from input (text or byte array) and return result as 20 elements java native byte array

> ```ts
> static sha1AsNativeBytes(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sha256()

Calculate SHA256 digest from input (text or byte array) and return result as 32 elements byte array

> ```ts
> static sha256(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sha256AsNativeBytes()

Calculate SHA256 digest from input (text or byte array) and return result as 32 elements java native byte array

> ```ts
> static sha256AsNativeBytes(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sha384()

Calculate SHA384 digest from input (text or byte array) and return result as 48 elements byte array

> ```ts
> static sha384(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sha384AsNativeBytes()

Calculate SHA384 digest from input (text or byte array) and return result as 48 elements java native byte array

> ```ts
> static sha384AsNativeBytes(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sha512()

Calculate SHA512 digest from input (text or byte array) and return result as 64 elements byte array

> ```ts
> static sha512(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sha512AsNativeBytes()

Calculate SHA512 digest from input (text or byte array) and return result as 64 elements java native byte array

> ```ts
> static sha512AsNativeBytes(input: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### sha1Hex()

Calculate SHA1 digest from input (text or byte array) and return result as 40 character hex string

> ```ts
> static sha1Hex(input: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

