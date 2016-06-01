---
layout: api
title: Indexing
icon: fa-check
---

Indexing
===

Indexing module is used for creating an in-memory full-text-search capable storage.

- Module: **api/indexing**
- Definition: [/core_api/issues/8](https://github.com/dirigiblelabs/core_api/issues/8)
- Source: [/api/indexing.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/indexing.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var indexing = require('api/indexing');
var response = require('api/http/response');

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
