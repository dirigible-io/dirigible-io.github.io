# Escape

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/Escape.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/Escape.java)
:::

Output escaping helpers covering the contexts that templates and emitters commonly target - CSV cells, HTML 3/4 attribute and text content, JavaScript string literals, Java string literals, JSON values, and XML text. Each escape has a matching `unescape` for round-trip decoding when the source is text produced by the same alphabet (it is *not* a general HTML / JSON parser).

Reach for these when generating output by string concatenation; for structured output (assembled JSON via Jackson, XML via SAX/DOM, HTML via a templating engine) the surrounding library already takes care of escaping correctly.

### Key Features:
- **Six contexts**: CSV, HTML3, HTML4, JavaScript, Java, JSON, XML.
- **Round-trip pairs**: Every `escape*` has a matching `unescape*` for the same alphabet.
- **Single-string surface**: Each method takes a `String` and returns a `String` - easy to chain into template expressions.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.Escape;

// HTML-escape user input before interpolating into a template
String safe = Escape.escapeHtml4("<script>alert(1)</script>");
// -> "&lt;script&gt;alert(1)&lt;/script&gt;"

// JSON-escape a value being concatenated into a hand-built JSON string
String literal = "\"value: " + Escape.escapeJson(input) + "\"";

// CSV-escape a cell with embedded commas / quotes
String cell = Escape.escapeCsv("Smith, John \"JD\"");
```

## Methods

### escapeCsv() / unescapeCsv()
Escapes / unescapes a CSV cell value - quotes the field if it contains a comma, newline, or double-quote, and doubles any embedded double-quotes.

> ```java
> public static String escapeCsv(String input);
> public static String unescapeCsv(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The CSV cell content to escape / unescape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The escaped / unescaped CSV cell value.
> :::

### escapeJavascript() / unescapeJavascript()
Escapes / unescapes a JavaScript string literal - backslash-escapes quotes, backslashes, and control characters.

> ```java
> public static String escapeJavascript(String input);
> public static String unescapeJavascript(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The string content to escape / unescape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The escaped / unescaped JavaScript string literal content.
> :::

### escapeHtml3() / unescapeHtml3()
Escapes / unescapes HTML 3 text and attribute content (smaller named-entity set than HTML 4).

> ```java
> public static String escapeHtml3(String input);
> public static String unescapeHtml3(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The HTML content to escape / unescape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The escaped / unescaped HTML 3 content.
> :::

### escapeHtml4() / unescapeHtml4()
Escapes / unescapes HTML 4 text and attribute content (full named-entity set). The usual choice for modern HTML output.

> ```java
> public static String escapeHtml4(String input);
> public static String unescapeHtml4(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The HTML content to escape / unescape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The escaped / unescaped HTML 4 content.
> :::

### escapeJava() / unescapeJava()
Escapes / unescapes a Java string literal - backslash-escapes quotes, backslashes, and Unicode control characters.

> ```java
> public static String escapeJava(String input);
> public static String unescapeJava(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The string content to escape / unescape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The escaped / unescaped Java string literal content.
> :::

### escapeJson() / unescapeJson()
Escapes / unescapes a JSON string value - backslash-escapes quotes, backslashes, and the JSON-required control characters.

> ```java
> public static String escapeJson(String input);
> public static String unescapeJson(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The string content to escape / unescape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The escaped / unescaped JSON string value.
> :::

### escapeXml() / unescapeXml()
Escapes / unescapes XML text and attribute content - replaces `&`, `<`, `>`, `"`, `'` with their entity equivalents and vice-versa.

> ```java
> public static String escapeXml(String input);
> public static String unescapeXml(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The XML content to escape / unescape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The escaped / unescaped XML text content.
> :::
