# Zip

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.io`
- source: [io/Zip.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/io/Zip.java)
:::

ZIP archive creation and extraction. Two styles are supported:

- The folder-level shortcuts `importZip(String, String)` (extract everything under a directory) and `exportZip(String, String)` (zip a folder onto disk).
- The streaming form via `ZipInputStream` / `ZipOutputStream` when you want entry-by-entry control — useful for producing a download on the fly, scanning archives without writing intermediate files, or filtering entries during extraction.

For end-to-end "zip this folder, send it" workflows the shortcuts are enough; reach for the streaming overloads only when you need entry-level control.

### Key Features:
- **One-shot folder import/export**: Extract or create archives in a single call.
- **Streaming form**: Wrap any `InputStream` / `OutputStream` with `ZipInputStream` / `ZipOutputStream` for entry-by-entry processing.
- **Read/write helpers**: Read or write the current entry as text or bytes.

### Example Usage:
```java
import java.io.OutputStream;
import java.util.zip.ZipOutputStream;
import org.eclipse.dirigible.sdk.io.Zip;

// folder-level export
Zip.exportZip("/var/data/project", "/var/tmp/project.zip");

// streaming export with two entries
try (OutputStream out = /* HTTP response stream, file stream, ... */ null) {
    ZipOutputStream zos = Zip.createZipOutputStream(out);
    zos.putNextEntry(Zip.createZipEntry("hello.txt"));
    Zip.writeText(zos, "Hello, world!");
    zos.closeEntry();
}
```

## Methods

### importZip()
Extracts the ZIP archive at `zipPath` into `targetPath`.

> ```java
> public static void importZip(String zipPath, String targetPath);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `zipPath` | `String` | Path to the ZIP archive. |
> | `targetPath` | `String` | Directory to extract into. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### exportZip()
Compresses the contents of `folderPath` into a ZIP archive written to `zipPath`.

> ```java
> public static void exportZip(String folderPath, String zipPath);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `folderPath` | `String` | Directory to compress. |
> | `zipPath` | `String` | Output path for the ZIP archive. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### createZipInputStream()
Wraps an existing `InputStream` as a `ZipInputStream` for entry-by-entry reading.

> ```java
> public static ZipInputStream createZipInputStream(InputStream in) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `in` | `InputStream` | The underlying input stream. |
>
> ::: info Returns
> - **Type**: `ZipInputStream`
> - **Description**: A ZIP-aware input stream over the same bytes.
> :::

### createZipOutputStream()
Wraps an existing `OutputStream` as a `ZipOutputStream` so you can write ZIP entries to it.

> ```java
> public static ZipOutputStream createZipOutputStream(OutputStream out) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `out` | `OutputStream` | The underlying output stream. |
>
> ::: info Returns
> - **Type**: `ZipOutputStream`
> - **Description**: A ZIP-aware output stream over the same sink.
> :::

### createZipEntry()
Creates a new `ZipEntry` with the given name. Pass to `ZipOutputStream.putNextEntry(...)`.

> ```java
> public static ZipEntry createZipEntry(String name) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Entry name (path inside the archive). |
>
> ::: info Returns
> - **Type**: `ZipEntry`
> - **Description**: A new ZIP entry with the given name.
> :::

### write()
Writes raw bytes or a string-encoded payload to the current entry of the given `ZipOutputStream`.

> ```java
> public static void write(ZipOutputStream output, byte[] bytes) throws IOException;
> public static void write(ZipOutputStream output, String data) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `output` | `ZipOutputStream` | The ZIP output stream. |
> | `bytes` | `byte[]` | Raw bytes to write. |
> | `data` | `String` | String-encoded bytes to write. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### writeNative()
Writes a native Java byte array to the current entry of the given `ZipOutputStream`.

> ```java
> public static void writeNative(ZipOutputStream output, byte[] data) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `output` | `ZipOutputStream` | The ZIP output stream. |
> | `data` | `byte[]` | The byte array to write. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### writeText()
Writes text to the current entry of the given `ZipOutputStream` using the platform default encoding.

> ```java
> public static void writeText(ZipOutputStream output, String text) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `output` | `ZipOutputStream` | The ZIP output stream. |
> | `text` | `String` | The text to write. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### read()
Reads the current entry of the given `ZipInputStream` and returns its contents as a string-encoded byte payload.

> ```java
> public static String read(ZipInputStream input) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `ZipInputStream` | The ZIP input stream. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The string-encoded byte content of the current entry.
> :::

### readNative()
Reads the current entry of the given `ZipInputStream` into a native Java byte array.

> ```java
> public static byte[] readNative(ZipInputStream input) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `ZipInputStream` | The ZIP input stream. |
>
> ::: info Returns
> - **Type**: `byte[]`
> - **Description**: The bytes of the current entry.
> :::

### readText()
Reads the current entry of the given `ZipInputStream` and decodes it as text using the platform default encoding.

> ```java
> public static String readText(ZipInputStream input) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `ZipInputStream` | The ZIP input stream. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The decoded text content of the current entry.
> :::
