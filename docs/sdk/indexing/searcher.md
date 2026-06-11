# Searcher

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.indexing`
- source: [indexing/Searcher.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/indexing/Searcher.java)
:::

Full-text search over the documents previously indexed via `Writer`. The query string uses Lucene query syntax - field-qualified (`title:invoice`), boolean (`title:invoice AND status:open`), wildcard (`invoice*`), fuzzy (`invoice~`). Results are returned as a JSON document with location, content excerpt, and metadata for each hit.

Indexes are named so the same JVM can host multiple corpora (`products`, `orders`, `docs`); the `index` name on every call selects which corpus to search.

### Key Features:
- **Lucene query syntax** - boolean, wildcard, fuzzy, field-qualified.
- **Multi-corpus** - name-isolated indexes share one JVM.
- **JSON output** - easy to forward straight into a controller response.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.indexing.Searcher;

String hits = Searcher.search("products", "title:headphones AND status:active");
```

## Methods

### search()

Runs a Lucene query against the named index.

> ```java
> public static String search(String index, String term) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `String` | Index name. |
> | `term` | `String` | Lucene query string. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: JSON document with one entry per matching document.
> :::
