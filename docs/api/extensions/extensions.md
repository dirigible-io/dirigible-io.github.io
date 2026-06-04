# Extensions

## Overview

::: tip Module
- package: `@aerokit/sdk/extensions`
- source: [extensions/extensions.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/extensions/extensions.ts)
- last updated: 
:::

This module provides the `Extensions` class, which offers functionality for discovering and loading extensions defined against the Dirigible extension model. The `Extensions` class allows developers to retrieve registered extensions for specific extension points and to load those extensions as modules, ensuring that they meet specified requirements (e.g., exporting certain functions).

### Key Features
- Retrieve registered extension module paths for specific extension points.
- Load extension modules with support for both synchronous and asynchronous loading mechanisms.
- Validate loaded extensions against required function exports to ensure they meet expected interfaces.
- Configurable error handling to either log issues or throw exceptions based on the use case.

### Use Cases
- Dynamically loading and integrating extensions at runtime based on the application's needs.
- Ensuring that loaded extensions conform to expected interfaces by checking for required functions.
- Managing extensions in a modular application design, allowing for third-party contributions without modifying core code.

### Example Usage
```ts
import { Extensions } from "@aerokit/sdk/extensions";

// Load extensions for a specific extension point, requiring certain functions to be exported
const loadedExtensions = await Extensions.load("my.extension.point", ["initialize", "execute"], true);

// Use the loaded extensions
loadedExtensions.forEach(extension => {
  extension.initialize();
  extension.execute();
});
```

## Classes

### Extensions

#### getExtensions()

Retrieves the list of extension module paths registered for a specific extension point.

> ```ts
> static getExtensions(extensionPoint: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `extensionPoint` | `string` | The unique identifier of the extension point (e.g., "my.extension.point"). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of string paths (modules) registered for the given extension point.
> :::

#### getExtensionPoints()

Retrieves all available extension point identifiers.

> ```ts
> static getExtensionPoints(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of strings representing all registered extension point IDs.
> :::

#### loadExtensionModules()

Loads extension modules registered for a specific extension point.
It handles both synchronous (require) and asynchronous (import) loading.

> ```ts
> static loadExtensionModules(extensionPoint: string, requiredFunctions: any, throwError: boolean): Promise;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `extensionPoint` | `string` | The unique identifier of the extension point. |
> | `requiredFunctions` | `any` | An optional list of function names that the extension module must export to be included. |
> | `throwError` | `boolean` | If true, throws an error on failure; otherwise, logs the error and continues. |
>
> ::: info Returns
> - **Type**: `Promise`
> - **Description**: A Promise that resolves to an array of successfully loaded and validated extension modules (exports).
> :::

#### load()

Alias for loadExtensionModules

> ```ts
> static load(extensionPoint: string, requiredFunctions: any, throwError: boolean): Promise;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `extensionPoint` | `string` |  |
> | `requiredFunctions` | `any` |  |
> | `throwError` | `boolean` |  |
>
> ::: info Returns
> - **Type**: `Promise`
> - **Description**: 
> :::

