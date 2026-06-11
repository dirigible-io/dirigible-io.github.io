# HttpClient

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.http`
- source: [http/HttpClient.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/HttpClient.java)
:::

Synchronous outbound HTTP client for calling third-party APIs from controllers, jobs, and listeners. Options (headers, query params, body, timeouts, basic-auth credentials) are passed as a JSON document - a consistent shape used across the platform - so the same option payloads can be reused across components written in any language.

The client is blocking; for non-trivial latency, wrap calls in a `java.util.concurrent.CompletableFuture#supplyAsync` or batch them through a small executor. For long-running streaming downloads, drop down to `org.apache.hc.client5.http.impl.classic.HttpClients` directly.

### Key Features:
- **Synchronous Requests**: All methods block until a response is received.
- **JSON-shaped Options**: Headers, query params, body, timeouts and basic-auth credentials are passed as a JSON string with a consistent platform-wide shape, allowing the same option objects to be reused across components written in any language.
- **String Response**: Each method returns the response payload as a `String` (typically a JSON-encoded response object containing status, headers, and body).

### Example Usage:
```java
import org.eclipse.dirigible.sdk.http.HttpClient;

String optionsJson = """
    {
      "headers": [{ "name": "Authorization", "value": "Bearer token" }],
      "params":  [{ "name": "query", "value": "search term" }],
      "timeout": 5000
    }
    """;

String response = HttpClient.get("https://api.example.com/data", optionsJson);
System.out.println(response);
```

## Methods

### get()

Executes a synchronous HTTP GET request. Two overloads are provided - one for the URL alone, and one taking a JSON-encoded options document.

> ```java
> public static String get(String url) throws IOException;
> public static String get(String url, String optionsJson) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `String` | The target URL. |
> | `optionsJson` | `String` | JSON string carrying the platform-standard `HttpClientRequestOptions` shape - headers, query parameters, body, timeouts, basic-auth credentials. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The parsed response payload returned by the underlying facade.
> :::

### post()

Executes a synchronous HTTP POST request.

> ```java
> public static String post(String url, String optionsJson) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `String` | The target URL. |
> | `optionsJson` | `String` | JSON string carrying the platform-standard `HttpClientRequestOptions` shape, including the request body in `text` or `data`. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The parsed response payload returned by the underlying facade.
> :::

### put()

Executes a synchronous HTTP PUT request.

> ```java
> public static String put(String url, String optionsJson) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `String` | The target URL. |
> | `optionsJson` | `String` | JSON string carrying the platform-standard `HttpClientRequestOptions` shape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The parsed response payload returned by the underlying facade.
> :::

### patch()

Executes a synchronous HTTP PATCH request.

> ```java
> public static String patch(String url, String optionsJson) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `String` | The target URL. |
> | `optionsJson` | `String` | JSON string carrying the platform-standard `HttpClientRequestOptions` shape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The parsed response payload returned by the underlying facade.
> :::

### delete()

Executes a synchronous HTTP DELETE request.

> ```java
> public static String delete(String url, String optionsJson) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `String` | The target URL. |
> | `optionsJson` | `String` | JSON string carrying the platform-standard `HttpClientRequestOptions` shape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The parsed response payload returned by the underlying facade.
> :::

### head()

Executes a synchronous HTTP HEAD request (fetches headers only).

> ```java
> public static String head(String url, String optionsJson) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `String` | The target URL. |
> | `optionsJson` | `String` | JSON string carrying the platform-standard `HttpClientRequestOptions` shape. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The parsed response payload returned by the underlying facade. The body will typically be empty.
> :::
