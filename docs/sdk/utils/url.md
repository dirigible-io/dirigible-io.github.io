# Url

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/Url.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/Url.java)
:::

URL component encoding helpers. `encode(String)` / `decode(String)` use the UTF-8 percent-encoding rules; the `escape*` family exposes the variants needed when building paths or `application/x-www-form-urlencoded` bodies where the standard URL rules differ slightly.

The class is named `Url` (lower-case `rl`) to avoid a name clash with `java.net.URL` in callers that statically import the JDK type — both names coexist on the import list cleanly this way.

### Key Features:
- **Named `Url` on purpose**: Avoids collision with `java.net.URL` in the same file.
- **Charset-aware encode / decode**: Two-argument overload accepts an explicit charset name.
- **Context-specific escapes**: `escape`, `escapePath`, `escapeForm` cover the variants of percent-encoding rules that real-world URLs need.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.Url;

// Standard URL component encoding (UTF-8)
String encoded = Url.encode("name with spaces & symbols");
// → "name+with+spaces+%26+symbols" (form-encoded variant)

// Custom charset
String latin1 = Url.encode("café", "ISO-8859-1");

// Round-trip decode
String decoded = Url.decode(encoded);

// Build a percent-escaped URL path segment
String segment = Url.escapePath("docs/release notes");
```

## Methods

### encode()
Percent-encodes the input as a URL component. The single-argument overload uses UTF-8; the two-argument overload uses the supplied charset name.

> ```java
> public static String encode(String input) throws UnsupportedEncodingException;
> public static String encode(String input, String charset) throws UnsupportedEncodingException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The text to encode. |
> | `charset` | `String` | Charset name (e.g. `"UTF-8"`, `"ISO-8859-1"`). Only on the two-argument overload. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The URL-encoded representation. Throws `UnsupportedEncodingException` if the supplied charset isn't available.
> :::

### decode()
Decodes a URL-encoded string back to its original form. The single-argument overload uses UTF-8; the two-argument overload uses the supplied charset name.

> ```java
> public static String decode(String input) throws DecoderException, UnsupportedEncodingException;
> public static String decode(String input, String charset) throws DecoderException, UnsupportedEncodingException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The URL-encoded text to decode. |
> | `charset` | `String` | Charset name. Only on the two-argument overload. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The decoded text. Throws `DecoderException` on malformed input, or `UnsupportedEncodingException` if the supplied charset isn't available.
> :::

### escape()
Escapes a string using the general URL component rules. Use this when assembling arbitrary query parameter values.

> ```java
> public static String escape(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The text to escape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The escaped string, safe to include as a URL component.
> :::

### escapePath()
Escapes a string using the URL path-segment rules — leaves characters that are safe in path segments unescaped while still percent-encoding the rest.

> ```java
> public static String escapePath(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The path segment to escape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The escaped string, safe to include as a URL path segment.
> :::

### escapeForm()
Escapes a string for use as an `application/x-www-form-urlencoded` value — `+` for spaces, percent-encodes the rest.

> ```java
> public static String escapeForm(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The form-field value to escape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The escaped string, safe to include in a form-urlencoded body.
> :::
