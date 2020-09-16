---
layout: api
title: Registry
icon: fa-check
---

{{ page.title }}
===

Registry object gives access to the content in the repository and also the pre-delivered content

Version 4.x
---

- Module: **platform/v4/registry**
- Alias: **platform/registry**
- Definition: [https://github.com/eclipse/dirigible/issues/508](https://github.com/eclipse/dirigible/issues/508)
- Source: [/platform/v4/registry.js](https://github.com/dirigiblelabs/api-platform/blob/master/platform/v4/registry.js)
- Facade: [ContentFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-repository/src/main/java/org/eclipse/dirigible/api/v3/repository/ContentFacade.java)
- Status: **stable**


### Basic Usage

```javascript

var response = require("http/v4/response");
var repositoryContent = require("platform/v4/registry");

var text = repositoryContent.getText("platform/v4/registry.js");

response.println(text);
response.flush();
response.close();

```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getContent(path)**   | Gets the content of resource by path, as byte array | *array of bytes*
**getText(path)**   | Gets the content of resource by path, as text | *string*
**find(path, pattern)**   | Find resources under certain path (e.g. /) by pattern (e.g. *.js) | *array of strings*

### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---
