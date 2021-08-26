---
title: Registry
---

Registry
===

Registry object gives access to the content in the repository and also the pre-delivered content

=== "Overview"
- Module: `platform/v4/registry`
- Alias: `platform/registry`
- Definition: [https://github.com/eclipse/dirigible/issues/508](https://github.com/eclipse/dirigible/issues/508)
- Source: [/platform/v4/registry.js](https://github.com/dirigiblelabs/api-platform/blob/master/platform/v4/registry.js)
- Facade: [RegistryFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-platform/src/main/java/org/eclipse/dirigible/api/v3/platform/RegistryFacade.java)
- Status: `stable`


### Basic Usage

```javascript

var response = require("http/v4/response");
var registry = require("platform/v4/registry");

var text = registry.getText("platform/v4/registry.js");

response.println(text);
response.flush();
response.close();

```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getContent(path)**   | Gets the content of resource by path, as byte array | *array of bytes*
**getContentNative(path)**   | Gets the content of resource by path, as array of Java bytes | *array of Java bytes*
**getText(path)**   | Gets the content of resource by path, as text | *string*
**find(path, pattern)**   | Find resources under certain path (e.g. /) by pattern (e.g. *.js) | *array of strings*

