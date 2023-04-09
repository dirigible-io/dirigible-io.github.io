---
title: Indexing Writer
---

Indexing Writer
===

The Indexing Writer is an object which can store a text content with additional parameters for later high-performant free-text search. This version is backed by the [Apache Lucene](http://lucene.apache.org/).

=== "Overview"
- Module: `indexing/writer`
- Definition: [https://github.com/eclipse/dirigible/issues/110](https://github.com/eclipse/dirigible/issues/110)
- Source: [/indexing/writer.js](https://github.com/eclipse/dirigible/blob/master/components/api-indexing/src/main/resources/META-INF/dirigible/indexing/writer.js)
- Status: `stable`
- Group: `platform`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { writer, searcher } from "@dirigible/indexing";

    writer.add("index1", "file1", "apache lucene", new Date(), { "name1": "value1" });
    writer.add("index1", "file2", "lucene - the search engine", new Date(), { "name2": "value2" });

    let found = searcher.search("index1", "lucene");

    console.log(JSON.stringify(found))
    ```

=== "CommonJS"

    ```javascript
    const writer = require("indexing/writer");
    const searcher = require("indexing/searcher");

    writer.add("index1", "file1", "apache lucene", new Date(), {"name1":"value1"});
    writer.add("index1", "file2", "lucene - the search engine", new Date(), {"name2":"value2"});

    let found = searcher.search("index1", "lucene");

    console.log(JSON.stringify(found))
    ```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**add(index, location, contents, lastModified, parameters)**   | Adds a document *contents* with the given *location* and *parameters* to an *index* | -
