# OS

## Overview

::: tip Module
- package: `@aerokit/sdk/platform`
- source: [platform/os.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/platform/os.ts)
- last updated: 
:::

The OS module provides a static utility class for retrieving operating system information and checking OS types. It leverages the platform's access to Java's SystemUtils for system properties, allowing developers to easily determine the operating system their application is running on. This can be particularly useful for applications that need to perform OS-specific operations or optimizations.

### Key Features:
- **OS Name Retrieval**: Access the full name of the operating system through a static constant.
- **OS Type Checking**: Static methods to check if the operating system is a variant of Windows or Unix (including Linux, macOS, and BSD).

### Use Cases:
- **Cross-Platform Compatibility**: This module is ideal for applications that need to ensure compatibility across different operating systems by conditionally executing code based on the OS type.
- **System Information**: Developers can use this module to gather information about the operating system for logging, debugging, or analytics purposes.

### Example Usage:
```ts
import { OS } from "@aerokit/sdk/platform";

console.log("Operating System:", OS.OS_NAME);
if (OS.isWindows()) {
    console.log("Running on Windows");
} else if (OS.isUnix()) {
    console.log("Running on a Unix-like OS");
} else {
    console.log("Running on an unknown OS");
}
```

## Classes

### OS

#### isWindows()

Checks if the operating system is a variant of Windows.

> ```ts
> static isWindows(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the OS is Windows, false otherwise.
> :::

#### isUnix()

Checks if the operating system is a variant of Unix (including Linux, macOS, and BSD).

> ```ts
> static isUnix(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the OS is Unix-like, false otherwise.
> :::

