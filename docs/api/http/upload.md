# Upload

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/upload.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/upload.ts)
- last updated: 
:::

The Upload module provides a static façade (`Upload` class) for checking and parsing multipart/form-data HTTP requests, which are commonly used for file uploads. This module allows developers to easily determine if an incoming request contains multipart content and to parse that content into manageable file items, abstracting away the complexities of handling multipart requests directly.

### Key Features:
- **Multipart Detection**: The `isMultipartContent` method allows developers to quickly check if the incoming request is of the multipart/form-data type.
- **Request Parsing**: The `parseRequest` method processes the multipart content and provides a structured representation of the uploaded files and form fields through the `FileItems` class.

### Use Cases:
- **File Upload Handling**: This module is essential for handling file uploads in web applications, allowing developers to access uploaded files and their metadata easily.
- **Form Data Processing**: In addition to file uploads, this module can also handle regular form fields that are part of a multipart request, making it versatile for various form processing scenarios.

### Example Usage:
```ts
import { Upload } from "@aerokit/sdk/http";

if (Upload.isMultipartContent()) {
    const fileItems = Upload.parseRequest();
    for (let i = 0; i < fileItems.size(); i++) {
        const fileItem = fileItems.get(i);
        console.log(`Uploaded file: ${fileItem.getName()}, size: ${fileItem.getSize()} bytes`);
    }
}
```

## Classes

### Upload

#### isMultipartContent()

Checks if the current incoming HTTP request contains multipart content
(e.g., from an HTML form with `enctype="multipart/form-data"`).

> ```ts
> static isMultipartContent(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the request is multipart, false otherwise.
> :::

#### parseRequest()

Parses the incoming multipart request content into a collection of file items.
This operation typically consumes the request body.

> ```ts
> static parseRequest(): FileItems;
> ```
>
>
> ::: info Returns
> - **Type**: `FileItems`
> - **Description**: A FileItems object representing all parts (files and form fields) of the request.
> :::

### FileItems

#### get()

Retrieves a specific item (file or form field) by its index in the collection.

> ```ts
> get(index: number): FileItem;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `number` | The zero-based index of the item. |
>
> ::: info Returns
> - **Type**: `FileItem`
> - **Description**: A FileItem object representing the item at the specified index.
> :::

#### size()

Returns the total number of items (files and form fields) in the collection.

> ```ts
> size(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The size of the collection.
> :::

### FileItem

#### getName()

For a file upload, returns the original filename as reported by the client.
For a regular form field, this is typically null or undefined.

> ```ts
> getName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The original filename string.
> :::

#### getContentType()

Returns the MIME type of the uploaded file or content part.

> ```ts
> getContentType(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The content type string (e.g., 'image/png', 'text/plain').
> :::

#### isEmpty()

Checks if the uploaded item is empty (e.g., a file upload with zero bytes).

> ```ts
> isEmpty(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the item is empty, false otherwise.
> :::

#### getSize()

Returns the size of the uploaded item in bytes.

> ```ts
> getSize(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The size as a number.
> :::

#### getBytes()

Retrieves the content of the file item as a JavaScript array of bytes.
This uses a utility (`Bytes.toJavaScriptBytes`) to convert the native Java byte array.

> ```ts
> getBytes(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of bytes (`any[]`).
> :::

#### getBytesNative()

Retrieves the content of the file item as the native Java byte array.

> ```ts
> getBytesNative(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The native byte array (`any[]`).
> :::

#### getText()

Retrieves the content of the file item as a string.
Note: This assumes the content is text and may not handle all encodings correctly.
It relies on JavaScript's `String.fromCharCode.apply` for conversion.

> ```ts
> getText(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The content as a string.
> :::

#### getInputStream()

Gets an input stream for reading the content of the file item.
This is useful for handling large files without loading the entire content into memory.

> ```ts
> getInputStream(): InputStream;
> ```
>
>
> ::: info Returns
> - **Type**: `InputStream`
> - **Description**: An InputStream object wrapping the native input stream.
> :::

