# Registry

## Overview

::: tip Module
- package: `@aerokit/sdk/platform`
- source: [platform/registry.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/platform/registry.ts)
- last updated: 
:::

The Registry module provides a set of utilities and data structures for interacting with the platform's Registry/Repository, which manages files and directories (Artefacts and Collections). It allows developers to retrieve content and metadata from the registry using simple JavaScript interfaces, abstracting the underlying complexities of the Java-based registry system. The module includes classes for representing both individual resources (Artefacts) and collections of resources (Directories), as well as a class for accessing detailed metadata about these resources.

### Key Features:
- **Content Retrieval**: Methods to get the content of registry resources as byte arrays or text.
- **Resource Navigation**: Classes to represent and navigate through directories and artefacts in the registry.
- **Metadata Access**: Ability to access detailed information about resources, such as creation date, size, and permissions.

### Use Cases:
- **File Management**: This module is ideal for applications that need to manage files and directories within the platform's registry, allowing for easy access and manipulation of stored resources.
- **Metadata Analysis**: Developers can use this module to analyze resource metadata for auditing, reporting, or conditional logic based on resource attributes.

### Example Usage:
```ts
import { Registry } from "@aerokit/sdk/platform";

// Get the root directory of the public registry
const rootDirectory = Registry.getRoot();
console.log("Root Directory Path:", rootDirectory.getPath());

// List all artefacts in the root directory
const artefacts = rootDirectory.getArtefactsNames();
console.log("Artefacts in Root Directory:", artefacts);

// Get a specific artefact and its content
const myFile = rootDirectory.getArtefact("myFile.txt");
if (myFile.exists()) {
    const content = myFile.getText();
    console.log("Content of myFile.txt:", content);
} else {
    console.log("myFile.txt does not exist in the registry.");
}
```

## Classes

### Registry

#### getContent()

Retrieves the content of a registry resource at the given path, converting it into a
JavaScript-friendly byte array format.

> ```ts
> static getContent(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The absolute path to the resource (e.g., "/registry/public/myFile.txt"). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The resource content as a JavaScript byte array.
> :::

#### getContentNative()

Retrieves the content of a registry resource at the given path in its native Java byte array format.

> ```ts
> static getContentNative(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The absolute path to the resource. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The resource content as a native Java byte array.
> :::

#### getText()

Retrieves the content of a registry resource at the given path as a string.

> ```ts
> static getText(path: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The absolute path to the resource. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The resource content as plain text.
> :::

#### find()

Searches the registry starting from a given path for resources matching a glob pattern.

> ```ts
> static find(path: string, pattern: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The starting path for the search. |
> | `pattern` | `string` | The glob pattern to match resource names against (e.g., "*.js"). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of registry paths (strings) that match the search criteria.
> :::

#### getRoot()

Gets the root directory object for the public registry space.

> ```ts
> static getRoot(): Directory;
> ```
>
>
> ::: info Returns
> - **Type**: `Directory`
> - **Description**: A Directory instance representing the root public collection.
> :::

### Artefact

#### getName()

Gets the name of the artefact (file name).

> ```ts
> getName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The name.
> :::

#### getPath()

Gets the full registry path of the artefact.

> ```ts
> getPath(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The registry path.
> :::

#### getParent()

Gets the parent directory of this artefact.

> ```ts
> getParent(): Directory;
> ```
>
>
> ::: info Returns
> - **Type**: `Directory`
> - **Description**: The parent Directory instance.
> :::

#### getInformation()

Gets detailed metadata about the artefact.

> ```ts
> getInformation(): ArtefactInformation;
> ```
>
>
> ::: info Returns
> - **Type**: `ArtefactInformation`
> - **Description**: The metadata object.
> :::

#### exists()

Checks if the artefact currently exists in the registry.

> ```ts
> exists(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the artefact exists, false otherwise.
> :::

#### isEmpty()

Checks if the artefact (file) is empty (has zero size).

> ```ts
> isEmpty(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the content is empty, false otherwise.
> :::

#### getText()

Gets the content of the artefact as a text string.

> ```ts
> getText(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The text content.
> :::

#### getContent()

Gets the content of the artefact as a JavaScript-friendly byte array.

> ```ts
> getContent(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The content bytes.
> :::

#### getContentNative()

Gets the content of the artefact as its native Java byte array representation.

> ```ts
> getContentNative(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The content bytes.
> :::

#### isBinary()

Checks if the artefact content is determined to be binary.

> ```ts
> isBinary(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if binary, false if text.
> :::

#### getContentType()

Gets the content type (MIME type) of the artefact.

> ```ts
> getContentType(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The content type string.
> :::

### Directory

#### getName()

Gets the name of the directory (folder name).

> ```ts
> getName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The name.
> :::

#### getPath()

Gets the full registry path of the directory.

> ```ts
> getPath(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The registry path.
> :::

#### getParent()

Gets the parent directory.

> ```ts
> getParent(): Directory;
> ```
>
>
> ::: info Returns
> - **Type**: `Directory`
> - **Description**: The parent Directory instance.
> :::

#### getInformation()

Gets detailed metadata about the directory.

> ```ts
> getInformation(): ArtefactInformation;
> ```
>
>
> ::: info Returns
> - **Type**: `ArtefactInformation`
> - **Description**: The metadata object.
> :::

#### exists()

Checks if the directory currently exists in the registry.

> ```ts
> exists(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the directory exists, false otherwise.
> :::

#### isEmpty()

Checks if the directory is empty (contains no files or sub-directories).

> ```ts
> isEmpty(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if empty, false otherwise.
> :::

#### getDirectoriesNames()

Gets the names of all sub-directories within this directory.

> ```ts
> getDirectoriesNames(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of sub-directory names.
> :::

#### getDirectory()

Gets a specific sub-directory by name.

> ```ts
> getDirectory(name: string): Directory;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the sub-directory. |
>
> ::: info Returns
> - **Type**: `Directory`
> - **Description**: The child Directory instance.
> :::

#### getArtefactsNames()

Gets the names of all files (artefacts) within this directory.

> ```ts
> getArtefactsNames(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of artefact names.
> :::

#### getArtefact()

Gets a specific file (artefact) by name.

> ```ts
> getArtefact(name: string): Artefact;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the artefact. |
>
> ::: info Returns
> - **Type**: `Artefact`
> - **Description**: The child Artefact instance.
> :::

### ArtefactInformation

#### getName()

Gets the name of the resource.

> ```ts
> getName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The name.
> :::

#### getPath()

Gets the full registry path of the resource.

> ```ts
> getPath(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The registry path.
> :::

#### getPermissions()

Gets the access permissions for the resource (typically an integer bitmask).

> ```ts
> getPermissions(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The permissions value.
> :::

#### getSize()

Gets the size of the resource content in bytes.

> ```ts
> getSize(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The size in bytes.
> :::

#### getCreatedBy()

Gets the user who created the resource.

> ```ts
> getCreatedBy(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The creator's name.
> :::

#### getCreatedAt()

Gets the creation timestamp.

> ```ts
> getCreatedAt(): Date;
> ```
>
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: The creation date and time.
> :::

#### getModifiedBy()

Gets the user who last modified the resource.

> ```ts
> getModifiedBy(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The modifier's name.
> :::

#### getModifiedAt()

Gets the last modification timestamp.

> ```ts
> getModifiedAt(): Date;
> ```
>
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: The modification date and time.
> :::

