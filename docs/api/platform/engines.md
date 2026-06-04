# Engines

## Overview

::: tip Module
- package: `@aerokit/sdk/platform`
- source: [platform/engines.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/platform/engines.ts)
- last updated: 
:::

The Engines module provides a class for interacting with the platform's execution engines, such as JavaScript or Groovy. It allows developers to execute scripts or processes within the context of a project, passing parameters and optionally enabling debug mode. The module abstracts the complexities of engine execution, providing a simple interface for running code in various supported languages.

### Key Features:
- **Engine Type Management**: Retrieve the list of available engine types supported by the platform.
- **Script Execution**: Execute project scripts or processes using a specified engine type, with support for passing parameters and enabling debug mode.

### Use Cases:
- **Multi-Language Support**: This module is ideal for applications that need to execute code in different languages supported by the platform, such as JavaScript or Groovy.
- **Project-Based Execution**: Developers can use this module to run scripts within the context of a project, allowing for better organization and management of code.

### Example Usage:
```ts
import { Engine } from "@aerokit/sdk/platform";

// Get available engine types
const engineTypes = Engine.getTypes();
console.log("Available Engines:", engineTypes);

// Create an instance of the Engine class for JavaScript
const jsEngine = new Engine("javascript");

// Execute a script within a project context
const result = jsEngine.execute(
    "MyProject",
    "lib/script.js",
    "",
    { param1: "value1", param2: 42 },
    false
);
console.log("Execution Result:", result);
```

## Classes

### Engine

#### getTypes()

Retrieves the list of available engine types from the platform.

> ```ts
> static getTypes(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of supported engine type names.
> :::

#### execute()

Executes a project script or process using the configured engine type.

> ```ts
> execute(projectName: string, projectFilePath: string, projectFilePathParam: string, parameters: ExecutionParameters, debug: boolean): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `projectName` | `string` | The name of the project. |
> | `projectFilePath` | `string` | The relative path to the main file to execute within the project (e.g., "lib/script.js"). |
> | `projectFilePathParam` | `string` | A secondary file path parameter (often unused or context-specific). |
> | `parameters` | `ExecutionParameters` | An object containing key/value parameters to pass to the script context. |
> | `debug` | `boolean` | Whether to execute in debug mode. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The result returned by the executed script.
> :::

