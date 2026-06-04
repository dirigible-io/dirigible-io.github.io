# Deployer

## Overview

::: tip Module
- package: `@aerokit/sdk/bpm`
- source: [bpm/deployer.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/bpm/deployer.ts)
- last updated: 
:::

This module provides functionalities for managing Business Process Model and Notation (BPMN) definitions,
including deployment, undeployment, and deletion of process definitions.

### Key Features
- Deploy BPMN process definitions from specified locations (e.g., file paths).
- Undeploy previously deployed process definitions based on their deployment location.
- Permanently delete process definitions by their ID, with a reason for deletion.

### Use Cases
- Managing the lifecycle of BPMN process definitions in a workflow engine.
- Automating deployment and cleanup of process definitions in development and production environments.
- Integrating BPMN management into larger application workflows or administrative tools.

### Example Usage
```ts
import { Deployer } from "@aerokit/sdk/bpm";

// Deploy a new process definition
const deploymentId = Deployer.deployProcess("/path/to/process.bpmn");
console.log(`Deployed process with ID: ${deploymentId}`);

// Undeploy the process definition
Deployer.undeployProcess("/path/to/process.bpmn");
console.log("Undeployed process from location: /path/to/process.bpmn");

// Delete a deployed process definition by ID
Deployer.deleteProcess(deploymentId, "Obsolete");
console.log(`Deleted process with ID: ${deploymentId} for reason: Obsolete`);
```

## Classes

### Deployer

#### deployProcess()

Deploys a new process definition from a specified location (e.g., a file path).

> ```ts
> static deployProcess(location: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `location` | `string` | The path or location of the BPMN XML file to be deployed. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The deployment ID assigned to the new process definition.
> :::

#### undeployProcess()

Undeploys a process definition previously deployed from the specified location.

> ```ts
> static undeployProcess(location: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `location` | `string` | The path or location associated with the deployed BPMN file. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteProcess()

Deletes a deployed process definition by its ID.

> **Note:** This permanently removes the process definition and all its associated history and runtime data.

> ```ts
> static deleteProcess(id: string, reason: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `string` | The ID of the process definition to delete. |
> | `reason` | `string` | The reason for deleting the process definition (e.g., "Obsolete"). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

