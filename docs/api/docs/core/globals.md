---
title: Globals
---

Globals
===


Globals object is used to store and manage properties in the global store.

=== "Overview"
- Module: `core/v4/globals`
- Alias: `core/globals`
- Definition: [https://github.com/eclipse/dirigible/issues/30](https://github.com/eclipse/dirigible/issues/30)
- Source: [/core/v4/globals.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/globals.js)
- Facade: [GlobalsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/GlobalsFacade.java)
- Status: `stable`

### Basic Usage

```javascript
var globals = require("core/v4/globals");
var response = require("http/v4/response");

globals.set("attr1", "value1");
var attr = globals.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the global parameters | *string*
**set(key, value)**   | Sets the value per key to the global parameters | -
