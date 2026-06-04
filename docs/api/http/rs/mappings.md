# ResourceMappings

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/rs/mappings.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/rs/mappings.ts)
- last updated: 
:::

The ResourceMappings class is a core component of the HTTP controller module, responsible for managing the mappings between URL path templates and their corresponding resource handler specifications. It serves as the configuration store for the HttpController, allowing developers to define and manage their API resources in a structured manner.

### Key Features:
- **Resource Management**: Allows defining resources with specific URL path templates and their associated handlers.

### Use Cases:
- **API Configuration**: Developers can use ResourceMappings to configure their API endpoints, specifying the paths and the logic that should handle requests to those paths.

### Example Usage:
```ts
import { ResourceMappings } from "@aerokit/sdk/http";

const resourceMappings = new ResourceMappings({
 "users/{id}": {
  get: (req, res) => { ... },
  post: (req, res) => { ... }
},
"products/{id}": {
 get: (req, res) => { ... },
 post: (req, res) => { ... }
}
});
```

## Classes

### ResourceMappings

#### path()

Creates or retrieves a Resource object corresponding to the given path.
The second, optional argument can be used to initialize the resource.

> ```ts
> path(sPath: string, oConfiguration: any): Resource;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sPath` | `string` | The URL path template for the resource (e.g., "users/{id}"). |
> | `oConfiguration` | `any` | Optional configuration object for initial resource setup. |
>
> ::: info Returns
> - **Type**: `Resource`
> - **Description**: The created or existing Resource instance.
> :::

#### resourcePath()

Alias for path().

> ```ts
> resourcePath(sPath: string, oConfiguration: any): Resource;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sPath` | `string` |  |
> | `oConfiguration` | `any` |  |
>
> ::: info Returns
> - **Type**: `Resource`
> - **Description**: 
> :::

#### resource()

Alias for path().

> ```ts
> resource(sPath: string, oConfiguration: any): Resource;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sPath` | `string` |  |
> | `oConfiguration` | `any` |  |
>
> ::: info Returns
> - **Type**: `Resource`
> - **Description**: 
> :::

#### configuration()

Returns the compiled configuration object for all resources managed by this ResourceMappings.
The configuration is structured to be consumed by the HttpController's routing logic.

> ```ts
> configuration(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### readonly()

Removes all but GET resource handlers from all managed resources, making them read-only.

> ```ts
> readonly(): this;
> ```
>
>
> ::: info Returns
> - **Type**: `this`
> - **Description**: The ResourceMappings instance for method chaining.
> :::

#### disable()

Disables resource handling specifications matching the arguments, effectively removing them from this API.

> ```ts
> disable(sPath: string, sVerb: string, arrConsumes: any, arrProduces: any): this;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sPath` | `string` | The path of the resource. |
> | `sVerb` | `string` | The HTTP verb (e.g., 'get', 'post'). |
> | `arrConsumes` | `any` | Array of consumed media types. |
> | `arrProduces` | `any` | Array of produced media types. |
>
> ::: info Returns
> - **Type**: `this`
> - **Description**: The ResourceMappings instance for method chaining.
> :::

#### find()

Provides a reference to a handler specification matching the supplied arguments.

> ```ts
> find(sPath: string, sVerb: string, arrConsumes: any, arrProduces: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sPath` | `string` | The path of the resource. |
> | `sVerb` | `string` | The HTTP verb (e.g., 'get', 'post'). |
> | `arrConsumes` | `any` | Array of consumed media types. |
> | `arrProduces` | `any` | Array of produced media types. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The matching Resource handler specification or undefined.
> :::

