# HttpClient

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/client.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/client.ts)
- last updated: 
:::

The HttpClient class provides a JavaScript/TypeScript wrapper (Facade) for making synchronous HTTP requests. It abstracts the underlying Java implementation and exposes a simple API for performing HTTP operations such as GET, POST, PUT, PATCH, DELETE, HEAD, and TRACE. The class allows developers to configure various aspects of the HTTP request, including headers, query parameters, request body content, timeouts, and more.

### Key Features:
- **Synchronous Requests**: All methods execute synchronously, blocking until a response is received.
- **Comprehensive Configuration**: Supports a wide range of options for customizing the HTTP request.
- **Structured Response**: Returns a structured response object containing status, headers, and body content.

### Use Cases:
- **API Consumption**: Ideal for scenarios where you need to consume external APIs and require a simple interface for making HTTP requests.
- **Testing and Scripting**: Useful in testing scenarios or scripts where synchronous execution is acceptable and simplicity is desired.

### Example Usage:
```ts
import { HttpClient } from "@aerokit/sdk/http";

const response = HttpClient.get("https://api.example.com/data", {
  headers: [{ name: "Authorization", value: "Bearer token" }],
  params: [{ name: "query", value: "search term" }],
  timeout: 5000
});

console.log(response.statusCode); // e.g., 200
console.log(response.text); // Response body as text
console.log(response.headers); // Array of response headers
```

## Classes

### HttpClient

#### get()

Executes a synchronous HTTP GET request.

> ```ts
> static get(url: string, options: HttpClientRequestOptions): HttpClientResponse;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `options` | `HttpClientRequestOptions` | Configuration options for the request. |
>
> ::: info Returns
> - **Type**: `HttpClientResponse`
> - **Description**: The parsed response object containing status, headers, and body.
> :::

#### post()

Executes a synchronous HTTP POST request.

> ```ts
> static post(url: string, options: HttpClientRequestOptions): HttpClientResponse;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `options` | `HttpClientRequestOptions` | Configuration options for the request, including request body in `text` or `data`. |
>
> ::: info Returns
> - **Type**: `HttpClientResponse`
> - **Description**: The parsed response object.
> :::

#### put()

Executes a synchronous HTTP PUT request.

> ```ts
> static put(url: string, options: HttpClientRequestOptions): HttpClientResponse;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `options` | `HttpClientRequestOptions` | Configuration options for the request. |
>
> ::: info Returns
> - **Type**: `HttpClientResponse`
> - **Description**: The parsed response object.
> :::

#### patch()

Executes a synchronous HTTP PATCH request.

> ```ts
> static patch(url: string, options: HttpClientRequestOptions): HttpClientResponse;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `options` | `HttpClientRequestOptions` | Configuration options for the request. |
>
> ::: info Returns
> - **Type**: `HttpClientResponse`
> - **Description**: The parsed response object.
> :::

#### delete()

Executes a synchronous HTTP DELETE request.

> ```ts
> static delete(url: string, options: HttpClientRequestOptions): HttpClientResponse;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `options` | `HttpClientRequestOptions` | Configuration options for the request. |
>
> ::: info Returns
> - **Type**: `HttpClientResponse`
> - **Description**: The parsed response object.
> :::

#### del()

Alias for HttpClient.delete. Executes a synchronous HTTP DELETE request.

> ```ts
> static del(url: string, options: HttpClientRequestOptions): HttpClientResponse;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `options` | `HttpClientRequestOptions` | Configuration options for the request. |
>
> ::: info Returns
> - **Type**: `HttpClientResponse`
> - **Description**: The parsed response object.
> :::

#### head()

Executes a synchronous HTTP HEAD request (fetches headers only).

> ```ts
> static head(url: string, options: HttpClientRequestOptions): HttpClientResponse;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `options` | `HttpClientRequestOptions` | Configuration options for the request. |
>
> ::: info Returns
> - **Type**: `HttpClientResponse`
> - **Description**: The parsed response object. The body (`text` and `data`) will typically be empty.
> :::

#### trace()

Executes a synchronous HTTP TRACE request.

> ```ts
> static trace(url: string, options: HttpClientRequestOptions): HttpClientResponse;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `options` | `HttpClientRequestOptions` | Configuration options for the request. |
>
> ::: info Returns
> - **Type**: `HttpClientResponse`
> - **Description**: The parsed response object.
> :::

