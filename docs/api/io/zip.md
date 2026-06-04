# Zip

## Overview

::: tip Module
- package: `@aerokit/sdk/io`
- source: [io/zip.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/io/zip.ts)
- last updated: 
:::

The Zip class provides a façade for handling ZIP archive operations, including file compression, decompression, and stream-based entry processing. It allows developers to easily create and extract ZIP files using both file paths and stream-based APIs, abstracting away the complexities of working with ZIP archives directly.

### Key Features:
- **File-Based Operations**: The `zip` and `unzip` methods allow for straightforward compression and extraction of files and directories using file system paths.
- **Stream-Based APIs**: The `createZipInputStream` and `createZipOutputStream` methods enable working with ZIP data in memory or through network streams, providing flexibility for various use cases.

### Use Cases:
- **File Archiving**: Developers can use the Zip class to create ZIP archives of files and directories for backup, distribution, or storage purposes.
- **Data Streaming**: The stream-based APIs are useful for scenarios where ZIP data needs to be processed on-the-fly, such as streaming a ZIP file over HTTP or processing ZIP data from an external source without saving it to disk.

### Example Usage:
```ts
import { Zip } from "@aerokit/sdk/io";
* // Zip a directory
Zip.zip('/path/to/source', '/path/to/archive.zip');
// Unzip an archive
Zip.unzip('/path/to/archive.zip', '/path/to/destination');
// Create a ZipOutputStream to write ZIP data to an OutputStream
const outputStream = new OutputStream(...);
const zipOutputStream = Zip.createZipOutputStream(outputStream);
zipOutputStream.createZipEntry('file.txt');
zipOutputStream.writeText('Hello, ZIP!');
zipOutputStream.closeEntry();
zipOutputStream.close();
```

## Classes

### Zip

#### zip()

Zips the content of a source directory or file into a target ZIP file.

> ```ts
> static zip(sourcePath: string, zipTargetPath: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `sourcePath` | `string` | The file system path to the content to be compressed. |
> | `zipTargetPath` | `string` | The file system path where the resulting ZIP file should be saved. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### unzip()

Unzips an existing ZIP file into a target directory.

> ```ts
> static unzip(zipPath: string, targetPath: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `zipPath` | `string` | The file system path to the ZIP file to be extracted. |
> | `targetPath` | `string` | The file system path to the directory where content should be extracted. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createZipInputStream()

Creates a ZipInputStream that reads ZIP archive data from a provided
generic InputStream. This allows for reading ZIP entries without
writing the archive to disk first.

> ```ts
> static createZipInputStream(inputStream: InputStream): ZipInputStream;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `inputStream` | `InputStream` | The source stream containing the raw ZIP data. |
>
> ::: info Returns
> - **Type**: `ZipInputStream`
> - **Description**: A new ZipInputStream instance.
> :::

#### createZipOutputStream()

Creates a ZipOutputStream that writes compressed ZIP archive data
to a provided generic OutputStream. This allows for creating ZIP archives
in memory or streaming them directly.

> ```ts
> static createZipOutputStream(outputStream: OutputStream): ZipOutputStream;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `outputStream` | `OutputStream` | The destination stream where the raw ZIP data will be written. |
>
> ::: info Returns
> - **Type**: `ZipOutputStream`
> - **Description**: A new ZipOutputStream instance.
> :::

### ZipInputStream

#### getNextEntry()

Reads the next ZIP file entry and positions the stream at the beginning of the entry data.
Must be called before reading data for an entry.

> ```ts
> getNextEntry(): ZipEntry;
> ```
>
>
> ::: info Returns
> - **Type**: `ZipEntry`
> - **Description**: The next ZipEntry object, or null if there are no more entries.
> :::

#### read()

Reads the data for the current entry and returns it as a JavaScript byte array.

> ```ts
> read(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A JavaScript array (`number[]`) of the byte values for the current entry.
> :::

#### readNative()

Reads the data for the current entry and returns the native Java byte array.

> ```ts
> readNative(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The native Java byte array object.
> :::

#### readText()

Reads the data for the current entry and converts it to a string
using the platform's default character encoding.

> ```ts
> readText(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The content of the current entry as a string.
> :::

#### close()

Closes the underlying native ZipInputStream.

> ```ts
> close(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

### ZipOutputStream

#### createZipEntry()

Creates a new ZipEntry with the given name, and begins writing the
entry's header to the archive stream. All subsequent write operations
will apply to this entry until closeEntry is called.

> ```ts
> createZipEntry(name: string): ZipEntry;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The file or directory name to use inside the ZIP archive. |
>
> ::: info Returns
> - **Type**: `ZipEntry`
> - **Description**: The newly created ZipEntry object.
> :::

#### write()

Writes the data from a JavaScript byte array to the current active entry in the stream.

> ```ts
> write(data: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `data` | `any` | The JavaScript array (`number[]`) of byte values to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### writeNative()

Writes the data from a native Java byte array to the current active entry in the stream.

> ```ts
> writeNative(data: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `data` | `any` | The native Java byte array object to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### writeText()

Converts the string to bytes and writes it to the current active entry in the stream.

> ```ts
> writeText(text: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `text` | `string` | The string content to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### closeEntry()

Closes the current active ZIP entry and positions the stream for the next entry.

> ```ts
> closeEntry(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### close()

Finalizes the writing of the ZIP file, flushes the stream, and closes the native object.
This must be called after all entries have been written.

> ```ts
> close(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

### ZipEntry

#### getName()

Gets the name of the entry (path relative to the ZIP root).

> ```ts
> getName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The name of the entry.
> :::

#### getSize()

Gets the uncompressed size of the entry data.

> ```ts
> getSize(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The size in bytes.
> :::

#### getCompressedSize()

Gets the compressed size of the entry data.

> ```ts
> getCompressedSize(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The compressed size in bytes.
> :::

#### getTime()

Gets the modification time of the entry.

> ```ts
> getTime(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The time as a numerical timestamp.
> :::

#### getCrc()

Gets the CRC-32 checksum of the uncompressed entry data.

> ```ts
> getCrc(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The CRC value.
> :::

#### getComment()

Gets the optional comment for the entry.

> ```ts
> getComment(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The comment string.
> :::

#### isDirectory()

Checks if the entry represents a directory.

> ```ts
> isDirectory(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if it is a directory, false otherwise.
> :::

#### isValid()

Checks if the underlying native ZipEntry object is defined and non-null.

> ```ts
> isValid(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the entry is valid, false otherwise.
> :::

