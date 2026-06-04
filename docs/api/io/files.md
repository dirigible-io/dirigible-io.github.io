# Files

## Overview

::: tip Module
- package: `@aerokit/sdk/io`
- source: [io/files.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/io/files.ts)
- last updated: 
:::

The Files class provides a comprehensive static façade for file and directory operations, abstracting the underlying Java file system implementation. It offers a wide range of methods for checking file properties, reading and writing content, managing file metadata, and performing common file system tasks such as copying, moving, and deleting files and directories.

### Key Features:
- **File Property Checks**: Methods to check if a path exists, is a file or directory, is readable/writable/executable, and more.
- **Content Manipulation**: Methods to read and write both text and binary content to files, with automatic conversion between Java byte arrays and JavaScript arrays.
- **Metadata Management**: Methods to get and set file metadata such as last modified time, owner, and permissions.
- **File System Operations**: Methods to create files and directories, copy and move files/directories, delete files/directories, and create temporary files/directories.
- **Directory Traversal**: Methods to traverse directory structures and list contents with support for glob patterns.

### Use Cases:
- **File Handling in Applications**: Essential for any application that needs to read from or write to the file system, such as configuration management, data storage, or log handling.
- **Scripting and Automation**: Useful for scripts that perform file system maintenance, batch processing of files, or automated generation of content.
- **Data Processing**: When working with data files, the Files class can be used to read input data, process it, and write output results back to the file system.

### Example Usage:
```ts
import { Files } from "@aerokit/sdk/io";

// Check if a file exists and read its content
const filePath = "/path/to/file.txt";
if (Files.exists(filePath)) {
    const content = Files.readText(filePath);
    console.log(content);
}

// Write text to a new file
const newFilePath = "/path/to/newfile.txt";
Files.writeText(newFilePath, "Hello, World!");
```

## Classes

### Files

#### exists()

Checks if a file or directory exists at the given path.

> ```ts
> static exists(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the path exists, false otherwise.
> :::

#### isExecutable()

Checks if the file or directory at the given path is executable.

> ```ts
> static isExecutable(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if executable, false otherwise.
> :::

#### isReadable()

Checks if the file or directory at the given path is readable.

> ```ts
> static isReadable(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if readable, false otherwise.
> :::

#### isWritable()

Checks if the file or directory at the given path is writable.

> ```ts
> static isWritable(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if writable, false otherwise.
> :::

#### isHidden()

Checks if the file or directory at the given path is hidden.

> ```ts
> static isHidden(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if hidden, false otherwise.
> :::

#### isDirectory()

Checks if the path refers to a directory.

> ```ts
> static isDirectory(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if it's a directory, false otherwise.
> :::

#### isFile()

Checks if the path refers to a regular file.

> ```ts
> static isFile(path: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if it's a file, false otherwise.
> :::

#### isSameFile()

Checks if two paths refer to the same underlying file system object.

> ```ts
> static isSameFile(path1: string, path2: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path1` | `string` | The first path. |
> | `path2` | `string` | The second path. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if they reference the same file/directory, false otherwise.
> :::

#### getCanonicalPath()

Returns the canonical (absolute and normalized) path for the given path.

> ```ts
> static getCanonicalPath(path: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to normalize. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The canonical path string.
> :::

#### getName()

Gets the simple name of the file or directory at the given path (the last element).

> ```ts
> static getName(path: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The name.
> :::

#### getParentPath()

Gets the path of the parent directory.

> ```ts
> static getParentPath(path: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The parent path string, or null/empty if none exists.
> :::

#### readBytes()

Reads all bytes from a file into a JavaScript byte array (an array of numbers).

Note: This method automatically converts the native Java byte array to a
JavaScript array using `Bytes.toJavaScriptBytes()`.

> ```ts
> static readBytes(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A JavaScript array of byte values.
> :::

#### readBytesNative()

Reads all bytes from a file and returns the native Java byte array object.

> ```ts
> static readBytesNative(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The native Java byte array.
> :::

#### readText()

Reads all text content from a file using the platform's default character encoding.

> ```ts
> static readText(path: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The content of the file as a string.
> :::

#### writeBytes()

Writes the content of a JavaScript byte array to a file. Overwrites existing content.

Note: This method automatically converts the JavaScript array to a native
Java byte array using `Bytes.toJavaBytes()` before writing.

> ```ts
> static writeBytes(path: string, data: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file. |
> | `data` | `any` | The JavaScript array of byte values to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### writeBytesNative()

Writes the content of a native Java byte array to a file. Overwrites existing content.

> ```ts
> static writeBytesNative(path: string, data: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file. |
> | `data` | `any` | The native Java byte array to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### writeText()

Writes a string of text to a file using the platform's default character encoding. Overwrites existing content.

> ```ts
> static writeText(path: string, text: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file. |
> | `text` | `string` | The string content to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getLastModified()

Gets the last modified time of the file or directory.

> ```ts
> static getLastModified(path: string): Date;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file or directory. |
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: A JavaScript Date object representing the last modified time.
> :::

#### setLastModified()

Sets the last modified time of the file or directory.

> ```ts
> static setLastModified(path: string, time: Date): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file or directory. |
> | `time` | `Date` | The new Date object to set as the last modified time. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getOwner()

Gets the owner of the file or directory.

> ```ts
> static getOwner(path: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file or directory. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The owner name as a string.
> :::

#### setOwner()

Sets the owner of the file or directory.

> ```ts
> static setOwner(path: string, owner: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file or directory. |
> | `owner` | `string` | The new owner name. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getPermissions()

Gets the permissions string for the file or directory (implementation dependent).

> ```ts
> static getPermissions(path: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file or directory. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The permissions string.
> :::

#### setPermissions()

Sets the permissions for the file or directory (implementation dependent).

> ```ts
> static setPermissions(path: string, permissions: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file or directory. |
> | `permissions` | `string` | The permissions string. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### size()

Gets the size of the file in bytes.

> ```ts
> static size(path: string): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file. |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The size in bytes.
> :::

#### createFile()

Creates a new, empty file at the specified path.

> ```ts
> static createFile(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path where the file should be created. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createDirectory()

Creates a new directory at the specified path.

> ```ts
> static createDirectory(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path where the directory should be created. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### copy()

Copies a file or directory from a source path to a target path.

> ```ts
> static copy(source: string, target: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `source` | `string` | The source path. |
> | `target` | `string` | The target path. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### move()

Moves or renames a file or directory.

> ```ts
> static move(source: string, target: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `source` | `string` | The source path. |
> | `target` | `string` | The target path. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteFile()

Deletes the file at the specified path.

> ```ts
> static deleteFile(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file to delete. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteDirectory()

Deletes the directory at the specified path.

> ```ts
> static deleteDirectory(path: string, forced: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the directory to delete. |
> | `forced` | `boolean` | If true, recursively deletes the directory and its contents. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createTempFile()

Creates a new temporary file with the given prefix and suffix.

> ```ts
> static createTempFile(prefix: string, suffix: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `prefix` | `string` | The prefix string to be used in generating the file's name. |
> | `suffix` | `string` | The suffix string to be used in generating the file's name. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The path of the created temporary file.
> :::

#### createTempDirectory()

Creates a new temporary directory with the given prefix.

> ```ts
> static createTempDirectory(prefix: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `prefix` | `string` | The prefix string to be used in generating the directory's name. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The path of the created temporary directory.
> :::

#### createInputStream()

Creates and returns a new InputStream for reading data from the file.

> ```ts
> static createInputStream(path: string): InputStream;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file. |
>
> ::: info Returns
> - **Type**: `InputStream`
> - **Description**: A new InputStream instance.
> :::

#### createOutputStream()

Creates and returns a new OutputStream for writing data to the file.

> ```ts
> static createOutputStream(path: string): OutputStream;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the file. |
>
> ::: info Returns
> - **Type**: `OutputStream`
> - **Description**: A new OutputStream instance.
> :::

#### traverse()

Traverses a directory and returns a structured FolderObject hierarchy.

> ```ts
> static traverse(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the folder to traverse. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The root FolderObject containing the file system tree structure.
> :::

#### list()

Lists the direct children (files and folders) of a directory, returning only their paths.

> ```ts
> static list(path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The path to the directory. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of string paths for the contents of the directory.
> :::

#### find()

Finds files and directories matching a specified glob pattern within a directory tree.

> ```ts
> static find(path: string, pattern: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `string` | The starting path for the search. |
> | `pattern` | `string` | The glob pattern to match (e.g., "*.js", "**.txt"). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of string paths that match the pattern.
> :::

