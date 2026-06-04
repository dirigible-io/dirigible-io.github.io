# Writer

## Overview

::: tip Module
- package: `@aerokit/sdk/indexing`
- source: [indexing/writer.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/indexing/writer.ts)
- last updated: 
:::

The Writer class provides a static façade for adding new documents or content to the native indexing service. It allows developers to index documents with full-text content, a last modification timestamp, and optional metadata, facilitating efficient organization and retrieval of indexed data.

### Key Features:
- **Document Indexing**: The `add` method enables adding new documents to a specified index with relevant content and metadata.
- **Metadata Support**: Allows associating additional key-value metadata with indexed documents, which can be useful for filtering and searching.
- **Timestamp Management**: Supports specifying the last modification time of the document, which can be used for time-based queries and index maintenance.

### Use Cases:
- **Content Management**: Developers can use the Writer class to index various types of content (e.g., articles, products, user profiles) to make them searchable within the application.
- **Search Optimization**: By providing rich metadata and accurate timestamps, developers can enhance the search experience and relevance of results retrieved from the index.

### Example Usage:
```ts
import { Writer } from "@aerokit/sdk/indexing";

// Index a new document with metadata
Writer.add('documents', '/path/to/document.txt', 'This is the full text content of the document.', new Date(), { author: 'John Doe', category: 'example' });
```

## Classes

### Writer

#### add()

Adds a new document entry to the specified index.

> ```ts
> static add(index: string, location: string, contents: string, lastModified: Date, parameters: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `string` | The name or identifier of the index (e.g., 'documents', 'users'). |
> | `location` | `string` | A unique identifier or path for the indexed document (e.g., a file path or URL). |
> | `contents` | `string` | The full-text content of the document to be indexed and made searchable. |
> | `lastModified` | `Date` | The Date object representing the last modification time of the document. Defaults to the current date/time if omitted. |
> | `parameters` | `any` | Optional key-value map of additional metadata to associate with the document. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

