# Workspace

## Overview

::: tip Module
- package: `@aerokit/sdk/platform`
- source: [platform/workspace.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/platform/workspace.ts)
- last updated: 
:::

The Workspace module provides a wrapper for the platform's WorkspaceFacade, allowing developers to manage workspaces, projects, folders, and files in a structured manner. It abstracts the underlying Java API, providing a more intuitive and JavaScript-friendly interface for interacting with the platform's filesystem and project management capabilities.

### Key Features:
- **Workspace Management**: Create, retrieve, list, and delete workspaces.
- **Project Management**: Create, retrieve, list, copy, move, and delete projects within a workspace.
- **Folder and File Management**: Create, retrieve, list, and delete folders and files within projects.
- **Content Access**: Read and write file content as byte arrays or text strings.

### Use Cases:
- **Project Organization**: This module is ideal for applications that need to organize code and resources into projects and workspaces on the platform.
- **File Manipulation**: Developers can use this module to manage files and folders within their projects, including reading and writing file content.

### Example Usage:
```ts
import { Workspace } from "@aerokit/sdk/platform";

// Create a new workspace
const workspace = Workspace.createWorkspace("MyWorkspace");

// Create a new project within the workspace
const project = workspace.createProject("MyProject");

// Create a new folder within the project
const folder = project.createFolder("src");

// Create a new file within the folder with initial content
const file = folder.createFile("index.js", [...]); // Initial content as byte array

// Read file content as text
const content = file.getText();
console.log("File Content:", content);

// Update file content with new text
file.setText("console.log('Hello, World!');");
```

## Classes

### Workspace

#### createWorkspace()

Creates a new workspace with the given name.

> ```ts
> static createWorkspace(name: string): Workspace;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the workspace to create. |
>
> ::: info Returns
> - **Type**: `Workspace`
> - **Description**: The newly created Workspace instance.
> :::

#### getWorkspace()

Retrieves an existing workspace by name.

> ```ts
> static getWorkspace(name: string): Workspace;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the workspace to retrieve. |
>
> ::: info Returns
> - **Type**: `Workspace`
> - **Description**: The Workspace instance.
> :::

#### getWorkspacesNames()

Retrieves the names of all existing workspaces.

> ```ts
> static getWorkspacesNames(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of workspace names.
> :::

#### deleteWorkspace()

Deletes the workspace with the specified name.

> ```ts
> static deleteWorkspace(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the workspace to delete. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getProjects()

Gets a collection of all projects within this workspace.

> ```ts
> getProjects(): Projects;
> ```
>
>
> ::: info Returns
> - **Type**: `Projects`
> - **Description**: A Projects collection instance.
> :::

#### createProject()

Creates a new project within this workspace.

> ```ts
> createProject(name: string): Project;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the project to create. |
>
> ::: info Returns
> - **Type**: `Project`
> - **Description**: The newly created Project instance.
> :::

#### getProject()

Retrieves an existing project by name from this workspace.

> ```ts
> getProject(name: string): Project;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the project to retrieve. |
>
> ::: info Returns
> - **Type**: `Project`
> - **Description**: The Project instance.
> :::

#### deleteProject()

Deletes a project from this workspace by name.

> ```ts
> deleteProject(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the project to delete. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### exists()

Checks if the workspace currently exists.

> ```ts
> exists(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the workspace exists, false otherwise.
> :::

#### existsFolder()

Checks if a specific folder path exists within the workspace's filesystem structure.

> ```ts
> existsFolder(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The relative path to the folder. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the folder exists.
> :::

#### existsFile()

Checks if a specific file path exists within the workspace's filesystem structure.

> ```ts
> existsFile(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The relative path to the file. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the file exists.
> :::

#### copyProject()

Copies a project from a source name to a target name within the workspace.

> ```ts
> copyProject(source: string, target: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `source` | `string` | The name of the project to copy. |
> | `target` | `string` | The name of the new project copy. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### moveProject()

Moves a project from a source name to a target name (renaming it).

> ```ts
> moveProject(source: string, target: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `source` | `string` | The current name of the project. |
> | `target` | `string` | The new name/path of the project. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

### Projects

#### size()

Gets the number of projects in the collection.

> ```ts
> size(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The size of the collection.
> :::

#### get()

Gets a Project instance at the specified index.

> ```ts
> get(index: number): Project;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` | The index of the project. |
>
> ::: info Returns
> - **Type**: `Project`
> - **Description**: The Project instance.
> :::

### Project

#### getName()

Gets the name of the project.

> ```ts
> getName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The project name.
> :::

#### getPath()

Gets the path of the project.

> ```ts
> getPath(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The project path (relative to the repository/workspace root).
> :::

#### createFolder()

Creates a new folder within the project.

> ```ts
> createFolder(path: string): Folder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path of the folder to create (relative to the project root). |
>
> ::: info Returns
> - **Type**: `Folder`
> - **Description**: The newly created Folder instance.
> :::

#### exists()

Checks if the project itself exists.

> ```ts
> exists(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the project exists.
> :::

#### existsFolder()

Checks if a specific folder path exists within the project.

> ```ts
> existsFolder(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The relative path to the folder. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the folder exists.
> :::

#### getFolder()

Retrieves a folder by its path relative to the project root.

> ```ts
> getFolder(path: string): Folder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The relative path to the folder. |
>
> ::: info Returns
> - **Type**: `Folder`
> - **Description**: The Folder instance.
> :::

#### getFolders()

Retrieves a collection of folders at a specific path.

> ```ts
> getFolders(path: string): Folders;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path containing the folders to retrieve. |
>
> ::: info Returns
> - **Type**: `Folders`
> - **Description**: The Folders collection instance.
> :::

#### deleteFolder()

Deletes a folder from the project.

> ```ts
> deleteFolder(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path of the folder to delete (relative to the project root). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createFile()

Creates a new file within the project.

> ```ts
> createFile(path: string, input: any): File;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path of the file to create (relative to the project root). |
> | `input` | `any` | Optional initial content as a byte array. |
>
> ::: info Returns
> - **Type**: `File`
> - **Description**: The newly created File instance.
> :::

#### existsFile()

Checks if a specific file path exists within the project.

> ```ts
> existsFile(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The relative path to the file. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the file exists.
> :::

#### getFile()

Retrieves a file by its path relative to the project root.

> ```ts
> getFile(path: string): File;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The relative path to the file. |
>
> ::: info Returns
> - **Type**: `File`
> - **Description**: The File instance.
> :::

#### getFiles()

Retrieves a collection of files at a specific path.

> ```ts
> getFiles(path: string): Files;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path containing the files to retrieve. |
>
> ::: info Returns
> - **Type**: `Files`
> - **Description**: The Files collection instance.
> :::

#### deleteFile()

Deletes a file from the project.

> ```ts
> deleteFile(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path of the file to delete (relative to the project root). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

### Folders

#### size()

Gets the number of folders in the collection.

> ```ts
> size(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The size of the collection.
> :::

#### get()

Gets a Folder instance at the specified index.

> ```ts
> get(index: number): Folder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` | The index of the folder. |
>
> ::: info Returns
> - **Type**: `Folder`
> - **Description**: The Folder instance.
> :::

### Files

#### size()

Gets the number of files in the collection.

> ```ts
> size(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The size of the collection.
> :::

#### get()

Gets a File instance at the specified index.

> ```ts
> get(index: number): File;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` | The index of the file. |
>
> ::: info Returns
> - **Type**: `File`
> - **Description**: The File instance.
> :::

### Folder

#### getName()

Gets the name of the folder.

> ```ts
> getName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The folder name.
> :::

#### getPath()

Gets the full path of the folder.

> ```ts
> getPath(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The folder path.
> :::

#### createFolder()

Creates a new sub-folder within this folder.

> ```ts
> createFolder(path: string): Folder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path of the sub-folder to create (relative to this folder). |
>
> ::: info Returns
> - **Type**: `Folder`
> - **Description**: The newly created Folder instance.
> :::

#### exists()

Checks if the folder itself exists.

> ```ts
> exists(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the folder exists.
> :::

#### existsFolder()

Checks if a specific sub-folder path exists within this folder.

> ```ts
> existsFolder(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The relative path to the sub-folder. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the sub-folder exists.
> :::

#### getFolder()

Retrieves a sub-folder by its path relative to this folder.

> ```ts
> getFolder(path: string): Folder;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The relative path to the sub-folder. |
>
> ::: info Returns
> - **Type**: `Folder`
> - **Description**: The Folder instance.
> :::

#### getFolders()

Retrieves a collection of folders at a specific path relative to this folder.

> ```ts
> getFolders(path: string): Folders;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path containing the folders to retrieve. |
>
> ::: info Returns
> - **Type**: `Folders`
> - **Description**: The Folders collection instance.
> :::

#### deleteFolder()

Deletes a sub-folder from this folder.

> ```ts
> deleteFolder(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path of the sub-folder to delete (relative to this folder). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createFile()

Creates a new file within this folder.

> ```ts
> createFile(path: string, input: any): File;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path of the file to create (relative to this folder). |
> | `input` | `any` | Optional initial content as a byte array. |
>
> ::: info Returns
> - **Type**: `File`
> - **Description**: The newly created File instance.
> :::

#### existsFile()

Checks if a specific file path exists within this folder.

> ```ts
> existsFile(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The relative path to the file. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the file exists.
> :::

#### getFile()

Retrieves a file by its path relative to this folder.

> ```ts
> getFile(path: string): File;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The relative path to the file. |
>
> ::: info Returns
> - **Type**: `File`
> - **Description**: The File instance.
> :::

#### getFiles()

Retrieves a collection of files at a specific path relative to this folder.

> ```ts
> getFiles(path: string): Files;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path containing the files to retrieve. |
>
> ::: info Returns
> - **Type**: `Files`
> - **Description**: The Files collection instance.
> :::

#### deleteFile()

Deletes a file from this folder.

> ```ts
> deleteFile(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path of the file to delete (relative to this folder). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

### File

#### getName()

Gets the name of the file.

> ```ts
> getName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The file name.
> :::

#### getPath()

Gets the full path of the file.

> ```ts
> getPath(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The file path.
> :::

#### getContentType()

Gets the content type (MIME type) of the file.

> ```ts
> getContentType(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The content type string.
> :::

#### isBinary()

Checks if the file content is determined to be binary.

> ```ts
> isBinary(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if binary, false if text.
> :::

#### getContent()

Gets the content of the file as a JavaScript-friendly byte array.

> ```ts
> getContent(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The content bytes.
> :::

#### getText()

Gets the content of the file as a text string.

> ```ts
> getText(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The text content.
> :::

#### setContent()

Sets the content of the file using a byte array.

> ```ts
> setContent(input: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The new content bytes. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setText()

Sets the content of the file using a text string.
The string is converted to a byte array before saving.

> ```ts
> setText(input: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `string` | The new text content. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### exists()

Checks if the file exists.

> ```ts
> exists(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the file exists.
> :::

