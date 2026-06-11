# HttpUtils

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.http`
- source: [http/HttpUtils.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/HttpUtils.java)
:::

Small content-type and query-string helpers - recognising JSON / XML media types, URL-encoding / decoding a `Map` of parameters. Saves writing the `&`-joining loop for the dozenth time and centralises the answer to "is this content-type JSON?" so future RFC additions (custom `+json` suffixes etc.) flow through every caller.

Implemented inline against the JDK - no platform facade - because the operations are pure and the result must match the equivalent TS helpers exactly.

### Key Features:
- **JSON / XML Detection**: Recognises both base media types (`application/json`, `application/xml`, `text/xml`) and the structured-suffix forms (`+json`, `+xml`).
- **URL-encoded Query Strings**: Builds and parses `application/x-www-form-urlencoded` query strings against UTF-8.
- **Pure JDK**: No platform dependency - safe to call from tests or from utility code that needs no Dirigible runtime.

### Example Usage:
```java
import java.util.Map;
import org.eclipse.dirigible.sdk.http.HttpUtils;

boolean isJson = HttpUtils.isContentTypeJson("application/vnd.api+json"); // true
String query = HttpUtils.toQueryString(Map.of("q", "hello world", "page", "2"));
Map<String, String> params = HttpUtils.fromQueryString("?q=hello%20world&page=2");
```

## Methods

### isContentTypeJson()

Returns whether the given content-type identifies a JSON payload - either `application/json` or any structured-suffix `+json` media type.

> ```java
> public static boolean isContentTypeJson(String contentType);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `contentType` | `String` | A content-type / media-type value. May be `null`. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` when the value contains `application/json` or ends with `+json` (case-insensitive); `false` otherwise. `null` returns `false`.
> :::

### isContentTypeXml()

Returns whether the given content-type identifies an XML payload - `application/xml`, `text/xml`, or any structured-suffix `+xml` media type.

> ```java
> public static boolean isContentTypeXml(String contentType);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `contentType` | `String` | A content-type / media-type value. May be `null`. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` when the value contains `application/xml`, `text/xml`, or ends with `+xml` (case-insensitive); `false` otherwise. `null` returns `false`.
> :::

### toQueryString()

Serialises a map of parameters as a URL-encoded query string. The map's iteration order is preserved (use `LinkedHashMap` if order matters).

> ```java
> public static String toQueryString(Map<String, String> params);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `params` | `Map<String, String>` | Parameter name / value pairs. May be `null` or empty. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A UTF-8 URL-encoded query string (no leading `?`). Empty when the input is `null` or empty. `null` values are encoded as an empty value.
> :::

### fromQueryString()

Parses a URL-encoded query string into an ordered map. Accepts an optional leading `?`. Pairs with no `=` sign map to an empty value.

> ```java
> public static Map<String, String> fromQueryString(String queryString);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `queryString` | `String` | A URL-encoded query string, optionally prefixed with `?`. |
>
> ::: info Returns
> - **Type**: `Map<String, String>`
> - **Description**: A `LinkedHashMap` preserving the input order. Empty when the input is `null` or empty.
> :::
