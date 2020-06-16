---
layout: api
title: Indexing Writer
icon: fa-ellipsis-h
---

{{ page.title }}
===

The Indexing Writer is an object which can store a text content with additional parameters for later high-performant free-text search. This version is backed by the [Apache Lucene](http://lucene.apache.org/).

Version 4.x
---

- Module: **indexing/v4/writer**
- Alias: **indexing/writer**
- Definition: [https://github.com/eclipse/dirigible/issues/110](https://github.com/eclipse/dirigible/issues/110)
- Source: [/indexing/v4/writer.js](https://github.com/dirigiblelabs/api-indexing/blob/master/indexing/v4/writer.js)
- Facade: [IndexingFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-indexing/src/main/java/org/eclipse/dirigible/api/v3/indexing/IndexingFacade.java)
- Status: **stable**

### Basic Usage

```javascript
var writer = require("indexing/v4/writer");
var searcher = require("indexing/v4/searcher");

writer.add("index1", "file1", "apache lucene", new Date(), {"name1":"value1"});
writer.add("index1", "file2", "lucene - the search engine", new Date(), {"name2":"value2"});

var found = searcher.search("index1", "lucene");
```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**add(index, location, contents, lastModified, parameters)**   | Adds a document *contents* with the given *location* and *parameters* to an *index* | -


### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
 ---
 
Version 3.x
---

- Module: **indexing/v3/writer**
- Alias: **indexing/writer**
- Definition: [https://github.com/eclipse/dirigible/issues/110](https://github.com/eclipse/dirigible/issues/110)
- Source: [/indexing/v3/writer.js](https://github.com/dirigiblelabs/api-v3-indexing/blob/master/indexing/v3/writer.js)
- Facade: [IndexingFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-indexing/src/main/java/org/eclipse/dirigible/api/v3/indexing/IndexingFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var writer = require("indexing/v3/writer");
var searcher = require("indexing/v3/searcher");

writer.add("index1", "file1", "apache lucene", new Date(), {"name1":"value1"});
writer.add("index1", "file2", "lucene - the search engine", new Date(), {"name2":"value2"});

var found = searcher.search("index1", "lucene");
```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**add(index, location, contents, lastModified, parameters)**   | Adds a document *contents* with the given *location* and *parameters* to an *index* | -


### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅
 
 ---
