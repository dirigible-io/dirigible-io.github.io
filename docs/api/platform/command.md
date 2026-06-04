# Command

## Overview

::: tip Module
- package: `@aerokit/sdk/platform`
- source: [platform/command.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/platform/command.ts)
- last updated: 
:::

The Command module provides a static utility class for executing system commands through the platform's CommandEngine. It allows developers to run shell commands with configurable options, including working directory and environment variable management. The module abstracts the complexities of process execution, providing a simple interface for integrating command execution into applications.

### Key Features:
- **Command Execution**: The `execute` method allows for running system commands with specified options and environment variable configurations.
- **Structured Output**: The method returns a structured output containing the exit code, standard output, and error output of the executed command.

### Use Cases:
- **System Integration**: This module is ideal for applications that need to interact with the underlying operating system or execute external processes as part of their functionality.
- **Automation and Scripting**: Developers can use this module to automate tasks by executing shell commands from within their applications.

### Example Usage:
```ts
import { Command } from "@aerokit/sdk/platform";

const result = Command.execute("ls -l", { workingDirectory: "/home/user" }, { "ENV_VAR": "value" }, ["OLD_ENV_VAR"]);
console.log("Exit Code:", result.exitCode);
console.log("Standard Output:", result.standardOutput);
console.log("Error Output:", result.errorOutput);
```

## Classes

### Command

#### execute()

Executes a system command with specified configuration, environment variables, and exclusions.

> ```ts
> static execute(command: string, options: CommandOptions, add: EnvironmentVariables, remove: any): CommandOutput;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `command` | `string` | The command string to execute (e.g., "ls -l"). |
> | `options` | `CommandOptions` | Optional configuration for the execution environment. |
> | `add` | `EnvironmentVariables` | Optional environment variables to add to the process. |
> | `remove` | `any` | Optional list of environment variable keys to remove from the process. |
>
> ::: info Returns
> - **Type**: `CommandOutput`
> - **Description**: A structured object containing the exit code and output streams.
> :::

