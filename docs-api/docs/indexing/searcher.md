---
title: Indexing Searcher
---

Indexing Searcher
===

The Indexing Searcher is the object used for free-text or exact periods searches over the added documents with the [Indexing Writer](../writer). This version is backed by the [Apache Lucene](http://lucene.apache.org/).

=== "Overview"
- Module: `indexing/searcher`
- Definition: [https://github.com/eclipse/dirigible/issues/110](https://github.com/eclipse/dirigible/issues/110)
- Source: [/indexing/searcher.js](https://github.com/eclipse/dirigible/blob/master/components/api-indexing/src/main/resources/META-INF/dirigible/indexing/searcher.js)
- Status: `stable`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { writer, searcher } from "@dirigible/indexing";

    writer.add("index2", "file1", "apache lucene", new Date(123));
    writer.add("index2", "file2", "lucene - the search engine", new Date(234), { "name2": "value2" });
    writer.add("index2", "file3", "search engine", new Date(345), { "name2": "value2" });

    let found = searcher.between("index2", new Date(124), new Date(344));

    console.log(JSON.stringify(found))
    ```

=== "CommonJS"

    ```javascript
    const writer = require("indexing/writer");
    const searcher = require("indexing/searcher");

    writer.add("index2", "file1", "apache lucene", new Date(123));
    writer.add("index2", "file2", "lucene - the search engine", new Date(234), {"name2":"value2"});
    writer.add("index2", "file3", "search engine", new Date(345), {"name2":"value2"});

    let found = searcher.between("index2", new Date(124), new Date(344));

    console.log(JSON.stringify(found))
    ```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**search(index, term)**   | Returns an array of document descriptors matching the *term* | *list of descriptors*
**before(index, date)**   | Returns an array of document descriptors where *lastModified* is before the *date* | *list of descriptors*
**after(index, date)**   | Returns an array of document descriptors where *lastModified* is after the *date* | *list of descriptors*
**between(index, lower, upper)**   | Returns an array of document descriptors where *lastModified* is between the *lower* and *upper* | *list of descriptors*
