# TemplateEngines

## Overview

::: tip Module
- package: `@aerokit/sdk/template`
- source: [template/engines.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/template/engines.ts)
- last updated: 
:::

The TemplateEngines module provides a unified interface for working with various server-side template engines, including Velocity, Mustache, and JavaScript. It allows developers to generate dynamic content by processing templates with provided parameters. The module abstracts the underlying template engine implementations, offering a consistent API for generating output from both raw template strings and templates stored in the registry.

### Key Features:
- **Multiple Template Engines**: Supports Velocity, Mustache, and JavaScript template engines, allowing developers to choose the most suitable one for their use case.
- **Dynamic Content Generation**: Enables the generation of dynamic content by processing templates with context parameters.
- **File-Based Templates**: Provides functionality to load templates from the public registry and generate output based on their content.

### Use Cases:
- **Email Templating**: Generate dynamic email content using templates stored in the registry.
- **Report Generation**: Create dynamic reports by processing templates with data retrieved from various sources.
- **Server-Side Rendering**: Use JavaScript templates for server-side rendering of HTML content.

### Example Usage:
```ts
import { TemplateEngines } from "@aerokit/sdk/template";

// Generate content from a raw template string
const output = TemplateEngines.generate("template1", "Hello, {{name}}!", { name: "World" });
console.log(output); // Output: Hello, World!

// Generate content from a template file in the registry
const fileOutput = TemplateEngines.generateFromFile("templates/email.mustache", { name: "Alice" });
console.log(fileOutput); // Output depends on the content of 'email.mustache'
```

## Classes

### TemplateEngines

#### getDefaultEngine()

Retrieves the default template engine, which is currently the Velocity engine.

> ```ts
> static getDefaultEngine(): TemplateEngine;
> ```
>
>
> ::: info Returns
> - **Type**: `TemplateEngine`
> - **Description**: The default template engine instance.
> :::

#### getMustacheEngine()

Retrieves the Mustache template engine instance.
Mustache is often used for logic-less templating and uses '{{' and '}}' as default markers.

> ```ts
> static getMustacheEngine(): TemplateEngine;
> ```
>
>
> ::: info Returns
> - **Type**: `TemplateEngine`
> - **Description**: The Mustache template engine instance.
> :::

#### getVelocityEngine()

Retrieves the Velocity template engine instance.
Velocity is often used for complex templating with directives (e.g., #set, #foreach).

> ```ts
> static getVelocityEngine(): TemplateEngine;
> ```
>
>
> ::: info Returns
> - **Type**: `TemplateEngine`
> - **Description**: The Velocity template engine instance.
> :::

#### getJavascriptEngine()

Retrieves the JavaScript template engine instance (usually used for server-side evaluation).

> ```ts
> static getJavascriptEngine(): TemplateEngine;
> ```
>
>
> ::: info Returns
> - **Type**: `TemplateEngine`
> - **Description**: The JavaScript template engine instance.
> :::

#### generate()

Generates output by processing a raw template string using the **default template engine (Velocity)**.

> ```ts
> static generate(location: string, template: string, parameters: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `location` | `string` | A string identifying the template (used for error reporting/caching, often a file path). |
> | `template` | `string` | The raw template string content to process. |
> | `parameters` | `any` | An object containing key-value pairs to be used as context variables in the template. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The processed output string.
> :::

#### generateFromFile()

Loads a template from the public registry, selects an appropriate engine, and generates output.
It uses the **Mustache engine** if the file extension is `.mustache`, otherwise it uses the **default (Velocity)**.

> ```ts
> static generateFromFile(location: string, parameters: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `location` | `string` | The path to the template file within the `/registry/public/` directory (e.g., 'templates/email.mustache'). |
> | `parameters` | `any` | An object containing key-value pairs to be used as context variables in the template. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The processed output string, or `undefined` if the resource does not exist.
> :::

