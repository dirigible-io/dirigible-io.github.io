# Configurations

## Overview

::: tip Module
- package: `@aerokit/sdk/core`
- source: [core/configurations.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/core/configurations.ts)
- last updated: 
:::

The Configurations API provides a centralized, type-safe interface for managing application configuration properties and detecting the runtime operating system. It serves as the foundation for environment-specific settings and system-aware behavior in Aerokit applications.

### Key Features

- **Static Interface**: Thread-safe, singleton-like access to configuration data
- **Type Safety**: Full TypeScript support with proper type definitions
- **File Loading**: Support for loading configurations from external files
- **OS Detection**: Comprehensive operating system identification
- **Memory Efficient**: In-memory storage with optional persistence

### Use Cases
- Application configuration management
- Environment variable management
- Feature flag configuration
- Database connection settings
- API endpoint configuration
- Platform-specific behavior adaptation

### Example Usage
```ts
import { Configurations } from "@aerokit/sdk/core";

// Set a configuration property
Configurations.set("apiEndpoint", "https://api.example.com");
// Get a configuration property
const apiEndpoint = Configurations.get("apiEndpoint");
console.log(apiEndpoint); // Output: "https://api.example.com"

// Check the operating system
if (Configurations.isOSWindows()) {
  console.log("Running on Windows");
} else if (Configurations.isOSMac()) {
  console.log("Running on Mac");
} else if (Configurations.isOSUNIX()) {
  console.log("Running on UNIX");
}
```

## Classes

### Configurations

#### get()

Retrieves the configuration value associated with the given key.

> ```ts
> static get(key: string, defaultValue: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The configuration key. |
> | `defaultValue` | `string` | The optional default value to return if the key is not found. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The configuration value as a string, or `undefined` if the key is not found and no default is provided.
> :::

#### set()

Sets the configuration value for the given key.
If the key already exists, its value is overwritten.

> ```ts
> static set(key: string, value: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The configuration key. |
> | `value` | `string` | The configuration value to set. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### remove()

Removes the configuration property associated with the given key.

> ```ts
> static remove(key: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The configuration key to remove. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getKeys()

Retrieves a list of all current configuration keys.

> ```ts
> static getKeys(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of configuration keys (strings).
> :::

#### load()

Loads configuration properties from a file at the specified path, overriding existing ones.

> ```ts
> static load(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The file path to load configurations from. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### update()

Reloads or updates the current configuration settings from their source (e.g., persistence layer).

> ```ts
> static update(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getOS()

Retrieves the name of the current Operating System.

> ```ts
> static getOS(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The OS name as a string (e.g., "Windows", "Linux", "Mac OS X").
> :::

#### isOSWindows()

Checks if the current Operating System is Windows.

> ```ts
> static isOSWindows(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the OS is Windows, false otherwise.
> :::

#### isOSMac()

Checks if the current Operating System is Mac OS (or Mac OS X).

> ```ts
> static isOSMac(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the OS is Mac, false otherwise.
> :::

#### isOSUNIX()

Checks if the current Operating System is a UNIX-like system (e.g., Linux, macOS, or others).

> ```ts
> static isOSUNIX(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the OS is a UNIX variant, false otherwise.
> :::

#### isOSSolaris()

Checks if the current Operating System is Solaris.

> ```ts
> static isOSSolaris(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the OS is Solaris, false otherwise.
> :::

