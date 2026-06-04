# Alphanumeric

## Overview

::: tip Module
- package: `@aerokit/sdk/utils`
- source: [utils/alphanumeric.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/utils/alphanumeric.ts)
- last updated: 
:::

The Alphanumeric class provides a collection of static utility methods for generating and validating alphanumeric strings. It includes methods for transforming strings to alphanumeric format, generating random alphanumeric sequences, and validating whether a given string is numeric or alphanumeric. These utilities are essential for scenarios where input sanitization, random identifier generation, or format validation is required, making it easier for developers to handle common string manipulation tasks in a consistent manner.

### Key Features:
- **String Transformation**: The `toAlphanumeric` method transforms a given string into an alphanumeric sequence by removing non-conformant characters.
- **Random String Generation**: Methods like `randomString`, `alphanumeric`, and `alpha` allow for generating random strings of specified lengths and character sets.
- **Validation Methods**: The `isNumeric` and `isAlphanumeric` methods provide a way to validate whether a string is purely numeric or alphanumeric, respectively.

### Use Cases:
- **Input Sanitization**: The `toAlphanumeric` method can be used to sanitize user input by stripping out unwanted characters, ensuring that only valid alphanumeric characters are retained.
- **Identifier Generation**: The random string generation methods are useful for creating unique identifiers, such as user IDs, session tokens, or any other scenario where a random string is needed.
- **Format Validation**: The validation methods can be used to check if user input or data conforms to expected formats, such as ensuring that a string is numeric before processing it as a number.

### Example Usage:
```ts
import { Alphanumeric } from "@aerokit/sdk/utils";

// Transform a string to alphanumeric format
const sanitized = Alphanumeric.toAlphanumeric("Hello, World! 123");
console.log(sanitized); // Output: "HelloWorld123"

// Generate a random alphanumeric string of length 8
const randomId = Alphanumeric.alphanumeric(8, true);
console.log(randomId); // Output: e.g., "a1b2c3d4"

// Validate if a string is numeric
const isNumeric = Alphanumeric.isNumeric("12345");
console.log(isNumeric); // Output: true

// Validate if a string is alphanumeric * const isAlphanumeric = Alphanumeric.isAlphanumeric("abc123");
console.log(isAlphanumeric); // Output: true
```

## Classes

### Alphanumeric

#### toAlphanumeric()



> ```ts
> static toAlphanumeric(string: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `string` | `string` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### randomString()

Generates a random alphanumeric sequence with the specified length

> ```ts
> static randomString(length: number, charset: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `length` | `number` | {Integer} Defaults to 4 |
> | `charset` | `string` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### alphanumeric()

Generates a random alphanumeric sequence with the specified length

> ```ts
> static alphanumeric(length: number, lowercase: boolean): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `length` | `number` | {Integer} Defaults to 4 |
> | `lowercase` | `boolean` | {Boolean} Defaults to true |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### alpha()

Generates a random ASCII sequence with the specified length

> ```ts
> static alpha(length: number, lowercase: boolean): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `length` | `number` | {Integer} Defaults to 4 |
> | `lowercase` | `boolean` | {Boolean} Defaults to true |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### numeric()

Generates a random numeric value

> ```ts
> static numeric(length: number): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `length` | `number` | {Integer} Defaults to 4 |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### isNumeric()

Tests is the provided `str` argument is a valid numeric sequence.

> ```ts
> static isNumeric(str: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `str` | `string` | {String} the string to test |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### isAlphanumeric()

Tests is the provided `str` argument is a valid alphanumeric sequence.

> ```ts
> static isAlphanumeric(str: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `str` | `string` | {String} the string to test |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

