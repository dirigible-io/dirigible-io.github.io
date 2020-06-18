---
layout: api
title: Repository Content
icon: fa-check
---

{{ page.title }}
===

> ⚠ Deprecated, migrated to [platform/registry](platform_registry.html)

Repository Content object gives access to the content in the repository and also the pre-delivered content

Version 4.x
---

- Module: **repository/v4/content**
- Alias: **repository/content**
- Definition: [https://github.com/eclipse/dirigible/issues/508](https://github.com/eclipse/dirigible/issues/508)
- Source: [/repository/v4/content.js](https://github.com/dirigiblelabs/api-repository/blob/master/repository/v4/content.js)
- Facade: [ContentFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-repository/src/main/java/org/eclipse/dirigible/api/v3/repository/ContentFacade.java)
- Status: **stable**


### Basic Usage

```javascript

var response = require("http/v4/response");
var repositoryContent = require("repository/v4/content");

var text = repositoryContent.getText("repository/v4/content.js");

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

### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---
