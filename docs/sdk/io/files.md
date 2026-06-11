# Files

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.io`
- source: [io/Files.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/io/Files.java)
:::

Filesystem operations against the operating-system view - read/write content, query metadata, change permissions, copy or move entries. Paths are absolute OS paths (not registry paths); to read or write artefacts under `/registry/public/...` or a project workspace use `org.eclipse.dirigible.sdk.platform.Registry` or `org.eclipse.dirigible.sdk.platform.Workspace` instead.

Every method propagates `IOException` from the platform - callers should funnel them up to a controller or background-job boundary that knows what to do with them.

### Key Features:
- **Property checks**: `exists`, `isFile`, `isDirectory`, `isReadable`, `isWritable`, `isExecutable`, `isHidden`, `isSameFile`.
- **Content I/O**: Read and write text or bytes against absolute OS paths.
- **Metadata**: Last-modified time, owner, permissions, size; getters and setters where supported.
- **Lifecycle**: Create files and directories, copy or move them, delete files.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.io.Files;

String contents = Files.readText("/var/data/import.csv");
Files.writeText("/var/data/out.json", json);

String target = "/var/data/archive";
if (!Files.exists(target)) {
    Files.createDirectory(target);
}
```

## Methods

### exists()
Checks if a file or directory exists at the given path.

> ```java
> public static boolean exists(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if the path exists, `false` otherwise.
> :::

### isExecutable()
Checks if the file or directory at the given path is executable.

> ```java
> public static boolean isExecutable(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if executable, `false` otherwise.
> :::

### isReadable()
Checks if the file or directory at the given path is readable.

> ```java
> public static boolean isReadable(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if readable, `false` otherwise.
> :::

### isWritable()
Checks if the file or directory at the given path is writable.

> ```java
> public static boolean isWritable(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if writable, `false` otherwise.
> :::

### isHidden()
Checks if the file or directory at the given path is hidden.

> ```java
> public static boolean isHidden(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if hidden, `false` otherwise.
> :::

### isDirectory()
Checks if the path refers to a directory.

> ```java
> public static boolean isDirectory(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if it's a directory, `false` otherwise.
> :::

### isFile()
Checks if the path refers to a regular file.

> ```java
> public static boolean isFile(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if it's a file, `false` otherwise.
> :::

### isSameFile()
Checks if two paths refer to the same underlying file system object.

> ```java
> public static boolean isSameFile(String path1, String path2) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path1` | `String` | The first path. |
> | `path2` | `String` | The second path. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if both paths reference the same file/directory, `false` otherwise.
> :::

### getCanonicalPath()
Returns the canonical (absolute and normalized) path for the given path.

> ```java
> public static String getCanonicalPath(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to normalize. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The canonical path string.
> :::

### getName()
Gets the simple name of the file or directory at the given path (the last element).

> ```java
> public static String getName(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The simple name.
> :::

### getParentPath()
Gets the path of the parent directory.

> ```java
> public static String getParentPath(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The parent path string, or `null`/empty if none exists.
> :::

### readBytes()
Reads all bytes from a file.

> ```java
> public static byte[] readBytes(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The contents of the file as a byte array.
> :::

### readText()
Reads all text content from a file using the platform's default character encoding.

> ```java
> public static String readText(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The content of the file as a string.
> :::

### writeText()
Writes a string of text to a file using the platform's default character encoding. Overwrites existing content.

> ```java
> public static void writeText(String path, String text) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file. |
> | `text` | `String` | The string content to write. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### writeBytes()
Writes the supplied string-encoded byte input to a file. Overwrites existing content. For raw `byte[]` payloads, prefer `writeBytesNative`.

> ```java
> public static void writeBytes(String path, String input) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file. |
> | `input` | `String` | The string-encoded byte data to write. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### writeBytesNative()
Writes a native Java byte array to a file. Overwrites existing content.

> ```java
> public static void writeBytesNative(String path, byte[] input) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file. |
> | `input` | `byte[]` | The byte array to write. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### getLastModified()
Gets the last modified time of the file or directory, in milliseconds since the epoch.

> ```java
> public static long getLastModified(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file or directory. |
>
> ::: info Returns
> - **Type**: `long`
> - **Description**: The last-modified time in milliseconds since the epoch.
> :::

### setLastModified()
Sets the last modified time of the file or directory.

> ```java
> public static void setLastModified(String path, long time) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file or directory. |
> | `time` | `long` | The new last-modified time in milliseconds since the epoch. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### getOwner()
Gets the owner of the file or directory.

> ```java
> public static String getOwner(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file or directory. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The owner name as a string.
> :::

### setOwner()
Sets the owner of the file or directory.

> ```java
> public static void setOwner(String path, String owner) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file or directory. |
> | `owner` | `String` | The new owner name. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### getPermissions()
Gets the permissions string for the file or directory (implementation dependent).

> ```java
> public static String getPermissions(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file or directory. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The permissions string.
> :::

### setPermissions()
Sets the permissions for the file or directory (implementation dependent).

> ```java
> public static void setPermissions(String path, String permissions) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file or directory. |
> | `permissions` | `String` | The permissions string. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### size()
Gets the size of the file in bytes.

> ```java
> public static long size(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file. |
>
> ::: info Returns
> - **Type**: `long`
> - **Description**: The size in bytes.
> :::

### createFile()
Creates a new, empty file at the specified path.

> ```java
> public static void createFile(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path where the file should be created. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### createDirectory()
Creates a new directory at the specified path.

> ```java
> public static void createDirectory(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path where the directory should be created. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### copy()
Copies a file or directory from a source path to a target path.

> ```java
> public static void copy(String source, String target) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `source` | `String` | The source path. |
> | `target` | `String` | The target path. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### move()
Moves or renames a file or directory.

> ```java
> public static void move(String source, String target) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `source` | `String` | The source path. |
> | `target` | `String` | The target path. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### deleteFile()
Deletes the file at the specified path.

> ```java
> public static void deleteFile(String path) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The path to the file to delete. |
>
> ::: info Returns
> - **Type**: `void`
> :::
