# HttpAsyncClient

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/client-async.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/client-async.ts)
- last updated: 
:::

The HttpAsyncClient class provides a JavaScript/TypeScript wrapper (Facade) for making asynchronous HTTP requests using the underlying Java HTTP client. It allows developers to perform non-blocking HTTP operations by defining success, error, and cancel callbacks as strings of executable JavaScript code. The class supports all standard HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD, TRACE) and accepts a comprehensive set of request options that mirror the capabilities of the Java client.

### Key Features:
- **Asynchronous Execution**: All HTTP methods return immediately, with callbacks executed upon completion.
- **Comprehensive Request Options**: Supports a wide range of configuration options for fine-tuning HTTP requests.
- **Callback Flexibility**: Callbacks are defined as strings of JavaScript code, allowing for dynamic execution in the JVM environment.

### Use Cases:
- **Non-blocking API Calls**: Ideal for scenarios where you want to perform HTTP requests without blocking the main execution thread.
- **Complex Request Configurations**: Suitable for advanced use cases that require detailed request configurations and handling.

### Example Usage:
```ts
import { HttpAsyncClient } from "@aerokit/sdk/http";

const client = HttpAsyncClient.getInstance();

client.getAsync("https://api.example.com/data", {
  success: "function(response) { console.log('Success:', response); }",
  error: "function(error) { console.error('Error:', error); }"
}, {
  headers: [{ name: 'Authorization', value: 'Bearer token' }],
  params: [{ name: 'query', value: 'search term' }]
});
```

## Classes

### HttpAsyncClient

#### getAsync()

Executes an asynchronous HTTP GET request.

> ```ts
> getAsync(url: string, config: HttpClientAsyncConfig, options: HttpClientRequestOptions): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `config` | `HttpClientAsyncConfig` | The callback configuration object. |
> | `options` | `HttpClientRequestOptions` | Request configuration options (e.g., headers, body, params). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### postAsync()

Executes an asynchronous HTTP POST request.

> ```ts
> postAsync(url: string, config: HttpClientAsyncConfig, options: HttpClientRequestOptions): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `config` | `HttpClientAsyncConfig` | The callback configuration object. |
> | `options` | `HttpClientRequestOptions` | Request configuration options. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### putAsync()

Executes an asynchronous HTTP PUT request.

> ```ts
> putAsync(url: string, config: HttpClientAsyncConfig, options: HttpClientRequestOptions): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `config` | `HttpClientAsyncConfig` | The callback configuration object. |
> | `options` | `HttpClientRequestOptions` | Request configuration options. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### patchAsync()

Executes an asynchronous HTTP PATCH request.

> ```ts
> patchAsync(url: string, config: HttpClientAsyncConfig, options: HttpClientRequestOptions): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `config` | `HttpClientAsyncConfig` | The callback configuration object. |
> | `options` | `HttpClientRequestOptions` | Request configuration options. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteAsync()

Executes an asynchronous HTTP DELETE request.

> ```ts
> deleteAsync(url: string, config: HttpClientAsyncConfig, options: HttpClientRequestOptions): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `config` | `HttpClientAsyncConfig` | The callback configuration object. |
> | `options` | `HttpClientRequestOptions` | Request configuration options. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### headAsync()

Executes an asynchronous HTTP HEAD request.

> ```ts
> headAsync(url: string, config: HttpClientAsyncConfig, options: HttpClientRequestOptions): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `config` | `HttpClientAsyncConfig` | The callback configuration object. |
> | `options` | `HttpClientRequestOptions` | Request configuration options. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### traceAsync()

Executes an asynchronous HTTP TRACE request.

> ```ts
> traceAsync(url: string, config: HttpClientAsyncConfig, options: HttpClientRequestOptions): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The target URL. |
> | `config` | `HttpClientAsyncConfig` | The callback configuration object. |
> | `options` | `HttpClientRequestOptions` | Request configuration options. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### execute()

Initiates the execution of queued asynchronous requests (depending on the underlying Java client's threading model).

> ```ts
> execute(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

