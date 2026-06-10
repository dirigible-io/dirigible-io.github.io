# Upload

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.http`
- source: [http/Upload.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Upload.java)
:::

Parses `multipart/form-data` bodies — the standard mechanism for file uploads from HTML forms and from `curl -F`. `isMultipartContent()` short-circuits before the parse (cheap header check) so a controller that handles both URL-encoded forms and uploads can branch correctly.

Each `FileItem` reports its field name, content type, byte size, and streams its content via `FileItem#getInputStream()`. The parser writes oversized parts to disk through the platform's configured temp dir, so very large uploads will not blow up the heap.

### Key Features:
- **Cheap Pre-Check**: `isMultipartContent()` inspects the `Content-Type` header without consuming the body.
- **Streamed Parts**: Each `FileItem` is read lazily through `getInputStream()`; large uploads spill to disk through the configured temp directory.
- **Form Fields and Files Mixed**: `parseRequest()` returns every part of the multipart body — call `FileItem#isFormField()` to tell a regular form field from an uploaded file.

### Example Usage:
```java
import java.util.List;
import org.apache.commons.fileupload2.core.FileItem;
import org.eclipse.dirigible.sdk.http.Upload;

if (Upload.isMultipartContent()) {
    List<FileItem> items = Upload.parseRequest();
    for (FileItem item : items) {
        if (!item.isFormField()) {
            String name = item.getName();
            long size = item.getSize();
            try (var in = item.getInputStream()) {
                // process the uploaded bytes
            }
        }
    }
}
```

## Methods

### isMultipartContent()

Returns whether the current request body is `multipart/form-data`.

> ```java
> public static boolean isMultipartContent();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` when the request's `Content-Type` header identifies a multipart body.
> :::

### parseRequest()

Parses the current request body into a list of `FileItem` parts.

> ```java
> public static List<FileItem> parseRequest() throws FileUploadException;
> ```
>
> ::: info Returns
> - **Type**: `List<org.apache.commons.fileupload2.core.FileItem>`
> - **Description**: One `FileItem` per multipart part. File parts stream their content through `FileItem#getInputStream()`; form fields are accessible via `FileItem#getString()`.
> :::
