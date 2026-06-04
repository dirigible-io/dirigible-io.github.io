# Resource

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/rs/resource.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/rs/resource.ts)
- last updated: 
:::

The Resource class is a fundamental component of the HTTP controller module, representing an individual API resource. It encapsulates the URL path and the associated handler specifications for various HTTP methods (GET, POST, etc.) that define how requests to that resource should be processed. The Resource class provides a structured way to define and manage API endpoints, allowing developers to configure their API resources with specific paths and handling logic.

### Key Features:
- **Resource Representation**: Represents an API resource with a specific URL path and associated handlers for different HTTP methods.
- **Method Configuration**: Allows defining handlers for various HTTP methods (GET, POST, PUT, DELETE) with specific configurations.
- **Redirection and Disabling**: Provides functionality to redirect requests or disable certain method handlers based on constraints.

### Use Cases:
- **API Endpoint Definition**: Developers can use the Resource class to define API endpoints with specific paths and handling logic for different HTTP methods.
- **Dynamic Resource Management**: The Resource class allows for dynamic configuration of resources, enabling features like redirection and selective disabling of method handlers.

### Example Usage:
```ts
import { Resource } from "@aerokit/sdk/http";

const userResource = new Resource("users/{id}")
  .get((req, res) => { ... })
 .post((req, res) => { ... })
  .redirect("/new-users/{id}")
  .disable("post");
```

## Classes

### Resource

#### path()

Sets the URL path for this resource, overriding the one specified upon its construction,
if a path string is provided as argument ot the method (i.e. acts as setter),
or returns the path set for this resource, if the method is invoked without arguments (i.e. acts as getter).

> ```ts
> path(sPath: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sPath` | `string` | The path property to be set for this resource. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The resource instance for method chaining (setter mode), or the path set for this resource (getter mode).
> :::

#### method()

Creates a new HTTP method handling specification.

> ```ts
> method(sHttpMethod: string, oConfiguration: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sHttpMethod` | `string` | The HTTP method (method) (e.g., "GET"). |
> | `oConfiguration` | `any` | The handler specification(s) for this HTTP method. Can be a single object or array. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The ResourceMethod instance, or an array of ResourceMethod instances.
> :::

#### get()

Creates a handling specification for the HTTP method "GET".

> ```ts
> get(fServeCb: Function): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `fServeCb` | `Function` |  |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance or array.
> :::

#### post()

Creates a handling specification for the HTTP method "POST".

> ```ts
> post(fServeCb: Function): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `fServeCb` | `Function` |  |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance or array.
> :::

#### put()

Creates a handling specification for the HTTP method "PUT".

> ```ts
> put(fServeCb: Function): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `fServeCb` | `Function` |  |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance or array.
> :::

#### delete()

Creates a handling specification for the HTTP method "DELETE".

> ```ts
> delete(fServeCb: Function): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `fServeCb` | `Function` |  |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance or array.
> :::

#### remove()

Creates a handling specification for the HTTP method "DELETE" (alias for delete()).

> ```ts
> remove(fServeCb: Function): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `fServeCb` | `Function` |  |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The ResourceMethod instance or array.
> :::

#### find()

Finds a ResourceMethod with the given constraints.

> ```ts
> find(sVerb: string, arrConsumesMimeTypeStrings: any, arrProducesMimeTypeStrings: any): ResourceMethod;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sVerb` | `string` | The name of the method property of the ResourceMethod in search (e.g., "GET"). |
> | `arrConsumesMimeTypeStrings` | `any` | The consumes constraint property of the ResourceMethod in search. |
> | `arrProducesMimeTypeStrings` | `any` | The produces constraint property of the ResourceMethod in search. |
>
> ::: info Returns
> - **Type**: `ResourceMethod`
> - **Description**: The found ResourceMethod instance, or undefined if not found.
> :::

#### configuration()

Returns the configuration of this resource.

> ```ts
> configuration(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The resource configuration object.
> :::

#### redirect()

Instructs redirection of the request base don the parameter. If it is a stirng representing URI, the request will be
redirected to this URI for any method. If it's a function it will be invoked and epxected to return a URI string to redirect to.

> ```ts
> redirect(fRedirector: any): Resource;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `fRedirector` | `any` | The function or string URI to redirect to.
   * |
>
> ::: info Returns
> - **Type**: `Resource`
> - **Description**: The resource instance for method chaining.
> :::

#### disable()

Disables the ResourceMethods that match the given constraints
   *
   *

> ```ts
> disable(sVerb: string, arrConsumesTypeStrings: any, arrProducesTypeStrings: any): Resource;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sVerb` | `string` | The HTTP verb (e.g., "GET"). |
> | `arrConsumesTypeStrings` | `any` | The consumes constraint property of the ResourceMethod in search. |
> | `arrProducesTypeStrings` | `any` | The produces constraint property of the ResourceMethod in search.
   * |
>
> ::: info Returns
> - **Type**: `Resource`
> - **Description**: The resource instance for method chaining.
> :::

#### readonly()

Disables all but 'read' HTTP methods in this resource (GET, HEAD, TRACE).
   *
   *

> ```ts
> readonly(): Resource;
> ```
>
>
> ::: info Returns
> - **Type**: `Resource`
> - **Description**: The resource instance for method chaining.
> :::

