# HttpUtils

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/utils.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/utils.ts)
- last updated: 
:::

The HttpUtils class provides a collection of static utility methods for sending standardized HTTP responses in a consistent format. These methods abstract away the details of setting response status codes, content types, and formatting response bodies as JSON, allowing developers to easily send common success and error responses with minimal code.

### Key Features:
- **Standardized Responses**: Provides methods for sending common HTTP responses such as 200 OK, 201 Created, 204 No Content, 400 Bad Request, 403 Forbidden, 404 Not Found, and 500 Internal Server Error.
- **JSON Formatting**: Automatically formats response bodies as JSON, ensuring a consistent response structure across the application.

### Use Cases:
- **API Development**: These utilities are essential for API development, allowing developers to quickly send appropriate responses based on the outcome of request processing.
- **Error Handling**: Simplifies error handling by providing methods to send standardized error responses with descriptive messages.

### Example Usage:
```ts
import { HttpUtils } from "@aerokit/sdk/http";

// Sending a successful response with data
HttpUtils.sendResponseOk({ id: "123", name: "Example" });

// Sending a created response after creating a resource
HttpUtils.sendResponseCreated({ id: "123", name: "New Resource" });

// Sending a no content response after deleting a resource
HttpUtils.sendResponseNoContent();

// Sending a bad request error response
HttpUtils.sendResponseBadRequest("Invalid input data");

// Sending a forbidden error response
HttpUtils.sendForbiddenRequest("You do not have permission to access this resource");

// Sending a not found error response
HttpUtils.sendResponseNotFound("Resource not found");

// Sending an internal server error response
HttpUtils.sendInternalServerError("An unexpected error occurred");
```

## Classes

### HttpUtils

#### sendResponseOk()

Sends a successful response with HTTP status 200 (OK).
The provided entity is serialized as the JSON response body.

> ```ts
> static sendResponseOk(entity: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entity` | `any` | The data entity to return in the response body. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sendResponseCreated()

Sends a successful response with HTTP status 201 (Created).
Typically used after a resource has been successfully created.

> ```ts
> static sendResponseCreated(entity: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entity` | `any` | The data entity of the newly created resource. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sendResponseNoContent()

Sends a successful response with HTTP status 204 (No Content).
Typically used for successful DELETE requests or updates that do not return a body.

> ```ts
> static sendResponseNoContent(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sendResponseBadRequest()

Sends an error response with HTTP status 400 (Bad Request).
Used when the request could not be understood or processed due to client-side errors (e.g., validation failure).

> ```ts
> static sendResponseBadRequest(message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `string` | A descriptive error message explaining why the request was invalid. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sendForbiddenRequest()

Sends an error response with HTTP status 403 (Forbidden).
Used when the client is authenticated but does not have the necessary permissions to access the resource.

> ```ts
> static sendForbiddenRequest(message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `string` | A descriptive error message. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sendResponseNotFound()

Sends an error response with HTTP status 404 (Not Found).
Used when the requested resource could not be found.

> ```ts
> static sendResponseNotFound(message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `string` | A descriptive error message. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sendInternalServerError()

Sends an error response with HTTP status 500 (Internal Server Error).
Used for unexpected server-side conditions encountered during processing.

> ```ts
> static sendInternalServerError(message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `string` | A descriptive error message (should mask internal details in production). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

