---
layout: api
title: Generator
icon: fa-check
---

{{ page.title }}
===

Generator object is used to produce project artifacts based on existing templates programmatically.

- Module: **gen/generator**
- Definition: [/core_api/issues/41](https://github.com/dirigiblelabs/core_api/issues/41)
- Source: [/gen/generator.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/gen/generator.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var generator = require('gen/generator');
var response = require('net/http/response');

var genWorker = generator.getWorker(generator.WORKER_TYPE_DATA_STRUCTURES);
response.println(genWorker.getTemplates());

var parameters = {
  "templateType":"index_page",
  "fileName":"index.html",
  "projectName":"myproject1",
  "packageName":"mypackage1",
  "pageTitle":"My Programmatically Created Page"
};

genWorker.generate(parameters);

response.println("done - 'index.html' in 'myproject1' under 'mypackage1'");

response.flush();
response.close();
```


Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getWorker(category)**   | Returns the generation worker for this category of templates | *Worker*


### Objects

---

#### Worker

Function     | Description | Returns
------------ | ----------- | --------
**getTemplates()**   | Returns the list of the available templates for this category | *JSON*
**generate(parameters)**   | Produces the artifacts based on the chosen template and provided parameters | *-*



### Constants

---

Constant     | Description | Type
------------ | ----------- | --------
**WORKER_TYPE_DATA_STRUCTURES**   | Value is *DataStructures* | *string*
**WORKER_TYPE_SCRIPTING_SERVICES**   | Value is *ScriptingServices* | *string*
**WORKER_TYPE_WEB_CONTENT**   | Value is *WebContent* | *string*
**WORKER_TYPE_WEB_CONTENT_FOR_ENTITY**   | Value is *WebContentForEntity* | *string*


Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

