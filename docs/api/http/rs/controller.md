# HttpController

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/rs/controller.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/rs/controller.ts)
- last updated: 
:::

This module defines the `HttpController` class, which serves as the main entry point for handling HTTP requests in a RESTful manner. The `HttpController` class provides methods for defining resource paths and HTTP method handlers (GET, POST, PUT, DELETE, etc.) using a fluent API. It also includes logic for matching incoming requests to the appropriate resource handlers based on the request path, HTTP method, and media type constraints (consumes/produces). The controller supports before, serve, catch, and finally handler functions for each resource method, allowing for flexible request processing and error handling. Additionally, it includes functionality for sending error responses formatted according to the client's accepted media types.

### Key Features:
- Define resource paths and HTTP method handlers using a fluent API.
- Match incoming requests to resource handlers based on path, method, and media type constraints.
- Support for before, serve, catch, and finally handler functions for each resource method.
- Flexible error handling with customizable error responses formatted according to client preferences.

### Use Cases:
- Building RESTful APIs with complex routing and media type handling requirements.

### Usage Example:

```javascript
import { service } from '@aerokit/sdk/http';

const controller = service();

controller.get('/api/resource', (ctx) => {
    ctx.response.print('Hello, World!');
});

// Start listening for requests (this would typically be done by the framework)
controller.listen();
```

## Classes

### HttpController

#### listen()

Alias for execute.

> ```ts
> listen(request: any, response: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `request` | `any` |  |
> | `response` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### execute()

Executes the request handling logic, finding the best matching resource and handler.

> ```ts
> execute(request: any, response: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `request` | `any` |  |
> | `response` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### mappings()

Returns the ResourceMappings instance of this controller.

> ```ts
> mappings(): ResourceMappings;
> ```
>
>
> ::: info Returns
> - **Type**: `ResourceMappings`
> - **Description**: 
> :::

#### sendError()

Sends an error response to the client, formatted based on the accepted media type.

> ```ts
> sendError(httpErrorCode: number, applicationErrorCode: any, errorName: string, errorDetails: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `httpErrorCode` | `number` |  |
> | `applicationErrorCode` | `any` |  |
> | `errorName` | `string` |  |
> | `errorDetails` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### closeResponse()

Flushes and closes the HTTP response stream.

> ```ts
> closeResponse(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

