---
layout: api
title: Lifecycle
icon: fa-check
---

{{ page.title }}
===

Lifecycle object is used for publish and activate projects and templates programmatically.

- Module: **platform/lifecycle**
- Definition: [/core_api/issues/44](https://github.com/dirigiblelabs/core_api/issues/44)
- Source: [/platform/lifecycle.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/platform/lifecycle.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var lifecycle = require('platform/lifecycle');
var response = require('net/http/response');

// Publish All Projects
lifecycle.publishAll();

response.println("All projects have been published.");

response.flush();
response.close();
```

Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**activateProject(projectName)**   | Activates the project with the given name | *-*
**publishProject(projectName)**   | Publishes the project with the given name | *-*
**publishTemplate(projectName)**   | Publishes the project with the given name as a Template | *-*
**activateAll()**   | Activates all the projects in the user's workspace | *-*
**publishAll()**   | Publishes all the projects in the user's workspace | *-*


Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
