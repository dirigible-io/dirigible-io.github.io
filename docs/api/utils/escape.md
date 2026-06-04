# Escape

## Overview

::: tip Module
- package: `@aerokit/sdk/utils`
- source: [utils/escape.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/utils/escape.ts)
- last updated: 
:::

The Escape class provides static utility methods for performing context-aware string escaping and unescaping operations. These methods are essential for ensuring that strings are safely embedded in various contexts (like HTML, JavaScript, JSON, etc.) without introducing security vulnerabilities such as injection attacks. The class delegates the actual escaping logic to a native Java EscapeFacade, providing a simple interface for JavaScript developers to utilize these functionalities.

### Key Features:
- **Context-Aware Escaping**: Methods to escape strings for specific contexts such as CSV, JavaScript, HTML (3.2 and 4.0), Java, JSON, and XML.
- **Unescaping Support**: Corresponding unescape methods to reverse the escaping process for each context.
- **Security**: Helps prevent injection attacks by properly escaping special characters in strings before embedding them in different formats.

### Use Cases:
- **Data Serialization**: Safely serialize data into formats like JSON or XML by escaping special characters.
- **Web Development**: Escape user-generated content before embedding it in HTML or JavaScript to prevent XSS attacks.
- **CSV Handling**: Escape values that contain commas, quotes, or newlines when generating CSV files.

### Example Usage:
```ts
import { Escape } from "@aerokit/sdk/utils";
// Escape a string for use in HTML
const htmlSafe = Escape.escapeHtml4("<script>alert('XSS');</script>");
console.log(htmlSafe); // Output: &lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;

// Unescape the previously escaped HTML string
const original = Escape.unescapeHtml4(htmlSafe);
console.log(original); // Output: <script>alert('XSS');</script>
```

## Classes

### Escape

#### escapeCsv()

Escapes special characters in a string to make it safe for use as a value within a CSV file.
Typically handles double quotes, commas, and newlines.

> ```ts
> static escapeCsv(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The string to be escaped. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The CSV-safe escaped string.
> :::

#### escapeJavascript()

Escapes characters in a string to create a valid JavaScript string literal.
This makes it safe for embedding string values within JavaScript code blocks.

> ```ts
> static escapeJavascript(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The string to be escaped. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The JavaScript-safe escaped string.
> :::

#### escapeHtml3()

Escapes characters in a string using HTML 3.2 entity references.

> ```ts
> static escapeHtml3(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The string to be escaped. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The HTML 3.2 escaped string.
> :::

#### escapeHtml4()

Escapes characters in a string using HTML 4.0 entity references.
This is the common standard for escaping characters like <, >, &, and ".

> ```ts
> static escapeHtml4(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The string to be escaped. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The HTML 4.0 escaped string.
> :::

#### escapeJava()

Escapes characters in a string to create a valid Java string literal.

> ```ts
> static escapeJava(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The string to be escaped. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The Java-safe escaped string.
> :::

#### escapeJson()

Escapes characters (like quotes, backslashes, and control characters) in a string
to make it safe for embedding as a value within a JSON document.

> ```ts
> static escapeJson(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The string to be escaped. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The JSON-safe escaped string.
> :::

#### escapeXml()

Escapes characters in a string to make it valid for use within an XML document.
Typically handles characters like <, >, &, ", and '.

> ```ts
> static escapeXml(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The string to be escaped. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The XML-safe escaped string.
> :::

#### unescapeCsv()

The inverse of `escapeCsv`: unescapes CSV-specific escape sequences back to their original form.

> ```ts
> static unescapeCsv(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The CSV-escaped string. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The unescaped string.
> :::

#### unescapeJavascript()

The inverse of `escapeJavascript`: unescapes JavaScript string literals.

> ```ts
> static unescapeJavascript(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The JavaScript-escaped string. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The unescaped string.
> :::

#### unescapeHtml3()

The inverse of `escapeHtml3`: unescapes HTML 3.2 entity references.

> ```ts
> static unescapeHtml3(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The HTML 3.2 escaped string. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The unescaped string.
> :::

#### unescapeHtml4()

The inverse of `escapeHtml4`: unescapes HTML 4.0 entity references.

> ```ts
> static unescapeHtml4(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The HTML 4.0 escaped string. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The unescaped string.
> :::

#### unescapeJava()

The inverse of `escapeJava`: unescapes Java string literals.

> ```ts
> static unescapeJava(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The Java-escaped string. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The unescaped string.
> :::

#### unescapeJson()

The inverse of `escapeJson`: unescapes JSON string escape sequences.

> ```ts
> static unescapeJson(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The JSON-escaped string. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The unescaped string.
> :::

#### unescapeXml()

The inverse of `escapeXml`: unescapes XML entity references.

> ```ts
> static unescapeXml(input: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The XML-escaped string. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The unescaped string.
> :::

