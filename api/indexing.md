---
layout: api
title: Indexing
icon: fa-ellipsis-h
---

{{ page.title }}
===

> ⚠ Deprecated

Version 3.x ⚠
---

Moved to different package in modules [indexing/searcher](indexing_searcher.html) and [indexing/writer](indexing_writer.html).

---

---

Version 2.x
---

Indexing module is used for creating an in-memory full-text-search capable storage.

- Module: **service/indexing**
- Definition: [/core_api/issues/8](https://github.com/dirigiblelabs/core_api/issues/8)
- Source: [/service/indexing.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/service/indexing.js)
- Status: **beta**

### Basic Usage

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var indexing = require('service/indexing');
var response = require('net/http/response');

var index = indexing.getIndex("myIndex");
var document1 = {
       "id": "1",
       "content": "some cool content 1"
    };
var document2 = {
       "id": "2",
       "content": "some cool content 2"
    };

index.add(document1);
index.add(document2);

var results = index.search("cool");
for (var i=0;i<results.length;i++) {
	var result = results[i];
    response.println("[Found for 'cool']: " + result.id);    
}

results = index.search("1");
for (var i=0;i<results.length;i++) {
	result = results[i];
    response.println("[Found for '1']: " + result.id);
}

results = index.search("2");
for (var i=0;i<results.length;i++) {
	result = results[i];
    response.println("[Found for '2']: " + result.id);
}

index.clear();

response.flush();
response.close();
```




### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getIndex(name)**   | Returns an Index by a given name. Creates it if needed. | *Index*




#### Objects

---

##### Index


Function     | Description | Returns
------------ | ----------- | --------
**add(document)**   | Adds a document to the Index | -
**search(term)**   | Returns the matching documents | *array of Document*
**clear()**   | Removes all the documents from the Index | -


##### Document


Function     | Description | Returns
------------ | ----------- | --------
**id**   | The ID of the Document | *string*
**content**   | The content of the Document | *string*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌


