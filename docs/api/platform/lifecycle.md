# Lifecycle

## Overview

::: tip Module
- package: `@aerokit/sdk/platform`
- source: [platform/lifecycle.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/platform/lifecycle.ts)
- last updated: 
:::

The Lifecycle module provides a static utility class for managing the lifecycle of projects on the platform, including publishing and unpublishing projects. It abstracts the complexities of project deployment, allowing developers to easily control the availability of their projects through simple method calls.

### Key Features:
- **Project Publishing**: The `publish` method allows developers to publish a specific project or all projects within a workspace for a given user.
- **Project Unpublishing**: The `unpublish` method enables developers to unpublish a specific project or all currently deployed projects, making them unavailable for use.

### Use Cases:
- **Deployment Management**: This module is ideal for applications that need to manage the deployment status of projects on the platform, allowing for dynamic control over which projects are available at any given time.
- **Automated Deployment**: Developers can use this module to automate the publishing and unpublishing of projects as part of their development and deployment workflows.

### Example Usage:
```ts
import { Lifecycle } from "@aerokit/sdk/platform";

// Publish a specific project
const publishResult = Lifecycle.publish("john_doe", "my_workspace", "my_project");
console.log("Publish Result:", publishResult);

// Unpublish all currently deployed projects
const unpublishResult = Lifecycle.unpublish();
console.log("Unpublish Result:", unpublishResult);
```

## Classes

### Lifecycle

#### publish()

Publishes a project for a specific user and workspace.

> ```ts
> static publish(user: string, workspace: string, project: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `user` | `string` | The username of the owner of the workspace. |
> | `workspace` | `string` | The name of the workspace to publish from. |
> | `project` | `string` | The specific project name to publish. Use "*" to publish all projects in the workspace. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the publish operation was successful, false otherwise.
> :::

#### unpublish()

Unpublishes a currently deployed project.

> ```ts
> static unpublish(project: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `project` | `string` | The specific project name to unpublish. Use "*" to unpublish all currently deployed projects. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the unpublish operation was successful, false otherwise.
> :::

