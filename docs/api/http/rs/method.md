# ResourceMethod

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/rs/method.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/rs/method.ts)
- last updated: 
:::

The ResourceMethod class is a core component of the HTTP controller module, responsible for managing the configuration of individual HTTP method handlers (e.g., GET, POST) attached to a Resource. It provides a fluent API for defining the behavior of these handlers, including their processing logic and MIME type constraints.

### Key Features:
- **Fluent API**: Allows developers to define HTTP method handlers in a fluent and intuitive manner.
- **Handler Configuration**: Supports configuration of various processing phases (before, serve, catch, finally) for matched resource requests.
- **MIME Type Management**: Provides methods to specify the MIME types that the handler consumes and produces.

### Use Cases:
- **API Endpoint Definition**: Developers can use ResourceMethod to define the behavior of specific HTTP methods for their API endpoints, including request processing logic and content type handling.

### Example Usage:
```ts
import { ResourceMethod } from "@aerokit/sdk/http";

const resourceMethod = new ResourceMethod()
 .get(function(req, res) {
     // Handler logic for GET requests
 })
 .produces("application/json")
 .execute();
```

## Classes

### ResourceMethod

#### execute()

Delegates to the HttpController's execute function to process the request.

> ```ts
> execute(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### get()

Delegates to the parent Resource's 'get' method.

> ```ts
> get(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### post()

Delegates to the parent Resource's 'post' method.

> ```ts
> post(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### put()

Delegates to the parent Resource's 'put' method.

> ```ts
> put(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### delete()

Delegates to the parent Resource's 'delete' method.

> ```ts
> delete(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### remove()

Delegates to the parent Resource's 'remove' method.

> ```ts
> remove(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### method()

Delegates to the parent Resource's 'method' method.

> ```ts
> method(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### configuration()

Returns the configuration object for this ResourceMethod instance.

> ```ts
> configuration(): ResourceMethodConfig;
> ```
>
>
> ::: info Returns
> - **Type**: `ResourceMethodConfig`
> - **Description**: The configuration object.
> :::

#### before()

Applies a callback function for the **before** phase of processing a matched resource request.

> ```ts
> before(fHandler: Function): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `fHandler` | `Function` | Callback function for the before phase. |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance for method chaining.
> :::

#### serve()

Applies a callback function for processing a matched resource request (**serve** phase).

> ```ts
> serve(fHandler: Function): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `fHandler` | `Function` | Callback function for the serve phase. |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance for method chaining.
> :::

#### catch()

Applies a callback function for the **catch** errors phase of processing a matched resource request.

> ```ts
> catch(fHandler: Function): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `fHandler` | `Function` | Callback function for the catch phase. |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance for method chaining.
> :::

#### finally()

Applies a callback function for the **finally** phase of processing a matched resource request.

> ```ts
> finally(fHandler: Function): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `fHandler` | `Function` | Callback function for the finally phase. |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance for method chaining.
> :::

#### consumes()

Defines the content MIME type(s), which this ResourceMethod expects as input (**consumes**).

> ```ts
> consumes(mimeTypes: any): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `mimeTypes` | `any` | Sets the mime types that this ResourceMethod is capable to consume. |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance for method chaining.
> :::

#### produces()

Defines the HTTP response payload MIME type(s), which this ResourceMethod request processing function outputs, i.e.
those that it 'produces'. At runtime, the Accept request header will be matched for compatibility with this setting
to elicit request processing functions.
Note that the matching is performed by compatibility, not strict equality, i.e. the MIME type format wildcards are
considered too. For example, a request Accept header "*/json" will match a produces setting "application/json".

   *

> ```ts
> produces(mimeTypes: any): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `mimeTypes` | `any` | Sets the mime type(s) that this ResourceMethod may produce.
   * |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance for method chaining.
> :::

