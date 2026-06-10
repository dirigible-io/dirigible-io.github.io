# Writer

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.indexing`
- source: [indexing/Writer.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/indexing/Writer.java)
:::

Adds documents to a Lucene index so they become searchable via `Searcher`. Each call is a single document — pass a JSON `parameters` blob for arbitrary additional fields beyond the named ones (`location`, `contents`, `lastModified`).

Writes are buffered and committed by the indexing service on its own cadence — callers don't need to flush. For bulk imports, batch by sending many adds in succession; the underlying Lucene writer amortises segment merges well.

### Key Features:
- **Per-document add** — straightforward call shape.
- **Custom fields** — JSON `parameters` extends beyond the three named fields.
- **Auto-commit** — the platform handles segment management.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.indexing.Writer;

Writer.add(
    "products",
    "/catalog/headphones/HP-200",
    "Premium noise-cancelling headphones with 30-hour battery",
    "2026-06-10T09:00:00Z",
    "{\"category\":\"audio\",\"price\":299.0}"
);
```

## Methods

### add()

Adds a single document to a named index.

> ```java
> public static void add(String index, String location, String contents,
>     String lastModified, String parameters) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `String` | Index name. |
> | `location` | `String` | Document identifier (URL, path, primary key). |
> | `contents` | `String` | Full-text contents to index. |
> | `lastModified` | `String` | Last-modified marker (typically ISO-8601). |
> | `parameters` | `String` | JSON document with extra fields to attach to the entry. |
