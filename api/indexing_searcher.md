---
layout: api
title: Indexing Searcher
icon: fa-ellipsis-h
---

{{ page.title }}
===

The Indexing Searcher is the object used for free-text or exact periods searches over the added documents with the [Indexing Writer](indexing_writer.html). This version is backed by the [Apache Lucene](http://lucene.apache.org/).

Version 4.x
---

- Module: **indexing/v4/searcher**
- Alias: **indexing/searcher**
- Definition: [https://github.com/eclipse/dirigible/issues/110](https://github.com/eclipse/dirigible/issues/110)
- Source: [/indexing/v4/searcher.js](https://github.com/dirigiblelabs/api-indexing/blob/master/indexing/v4/searcher.js)
- Facade: [IndexingFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-indexing/src/main/java/org/eclipse/dirigible/api/v3/indexing/IndexingFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var writer = require("indexing/v4/writer");
var searcher = require("indexing/v4/searcher");

writer.add("index2", "file1", "apache lucene", new Date(123));
writer.add("index2", "file2", "lucene - the search engine", new Date(234), {"name2":"value2"});
writer.add("index2", "file3", "search engine", new Date(345), {"name2":"value2"});

var found = searcher.between("index2", new Date(124), new Date(344));
```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**search(index, term)**   | Returns an array of document descriptors matching the *term* | *list of descriptors*
**before(index, date)**   | Returns an array of document descriptors where *lastModified* is before the *date* | *list of descriptors*
**after(index, date)**   | Returns an array of document descriptors where *lastModified* is after the *date* | *list of descriptors*
**between(index, lower, upper)**   | Returns an array of document descriptors where *lastModified* is between the *lower* and *upper* | *list of descriptors*


### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
 ---

Version 3.x
---


- Module: **indexing/v3/searcher**
- Alias: **indexing/searcher**
- Definition: [https://github.com/eclipse/dirigible/issues/110](https://github.com/eclipse/dirigible/issues/110)
- Source: [/indexing/v3/searcher.js](https://github.com/dirigiblelabs/api-v3-indexing/blob/master/indexing/v3/searcher.js)
- Facade: [IndexingFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-indexing/src/main/java/org/eclipse/dirigible/api/v3/indexing/IndexingFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var writer = require("indexing/v3/writer");
var searcher = require("indexing/v3/searcher");

writer.add("index2", "file1", "apache lucene", new Date(123));
writer.add("index2", "file2", "lucene - the search engine", new Date(234), {"name2":"value2"});
writer.add("index2", "file3", "search engine", new Date(345), {"name2":"value2"});

var found = searcher.between("index2", new Date(124), new Date(344));
```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**search(index, term)**   | Returns an array of document descriptors matching the *term* | *list of descriptors*
**before(index, date)**   | Returns an array of document descriptors where *lastModified* is before the *date* | *list of descriptors*
**after(index, date)**   | Returns an array of document descriptors where *lastModified* is after the *date* | *list of descriptors*
**between(index, lower, upper)**   | Returns an array of document descriptors where *lastModified* is between the *lower* and *upper* | *list of descriptors*


### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅
 
 ---
