# URL

## Overview

::: tip Module
- package: `@aerokit/sdk/utils`
- source: [utils/url.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/utils/url.ts)
- last updated: 
:::

The URL class provides static methods for performing various forms of URL encoding and decoding. It serves as a wrapper around native Java URL utility methods, allowing developers to easily encode and decode strings for use in URLs, query parameters, path segments, and form data. This utility is essential for ensuring that data is correctly formatted when included in URLs, preventing issues with special characters and ensuring proper transmission of data across the web.

### Key Features:
- **URL Encoding/Decoding**: Methods to encode and decode strings for safe inclusion in URLs.
- **Path Segment Escaping**: Specialized method for escaping strings that will be used as URL path segments.
- **Form Data Escaping**: Method for escaping strings according to HTML form data encoding rules.

### Use Cases:
- **Query Parameters**: Encode user input or dynamic data to be included in URL query parameters.
- **URL Path Segments**: Safely include dynamic values in URL paths without breaking the structure.
- **Form Submissions**: Prepare data for submission via HTML forms using application/x-www-form-urlencoded encoding.

### Example Usage:
```ts
import { URL } from "@aerokit/sdk/utils";

// Encode a query parameter value
const encodedValue = URL.encode("Hello World!");
console.log(encodedValue); // Output: Hello%20World%21

// Decode a previously encoded string
const decodedValue = URL.decode(encodedValue);
console.log(decodedValue); // Output: Hello World!

// Escape a string for use as a URL path segment
const escapedPath = URL.escapePath("my folder/file.txt");
console.log(escapedPath); // Output: my%20folder%2Ffile.txt

// Escape a string for use in form data
const escapedForm = URL.escapeForm("name=John Doe&age=30");
console.log(escapedForm); // Output: name%3DJohn+Doe%26age%3D30
```

## Classes

### URL

#### encode()

URL-encodes the input string, typically used for encoding query parameter values.

> ```ts
> static encode(input: string, charset: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The string to be encoded. |
> | `charset` | `string` | The character set (e.g., 'UTF-8', 'ISO-8859-1') to use for encoding. Defaults to the system's preferred encoding if omitted. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The URL-encoded string.
> :::

#### decode()

URL-decodes the input string, typically used for decoding query parameter values.

> ```ts
> static decode(input: string, charset: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The string to be decoded. |
> | `charset` | `string` | The character set (e.g., 'UTF-8', 'ISO-8859-1') that was used for encoding. Defaults to the system's preferred encoding if omitted. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The URL-decoded string.
> :::

#### escape()

Escapes the input string using general URL escaping rules.
This is typically equivalent to `encodeURIComponent` and is suitable for
encoding query parameter *values*.

> ```ts
> static escape(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The string to escape. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The escaped string.
> :::

#### escapePath()

Escapes the input string specifically for use as a **URL path segment**.
It typically preserves path delimiters like `/` that might otherwise be escaped
in standard URL encoding.

> ```ts
> static escapePath(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The path string to escape. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The escaped path string.
> :::

#### escapeForm()

Escapes the input string according to the rules for **HTML Form Data**
(application/x-www-form-urlencoded). This typically replaces spaces with `+`
instead of `%20`.

> ```ts
> static escapeForm(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The form data string to escape. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The escaped form data string.
> :::

