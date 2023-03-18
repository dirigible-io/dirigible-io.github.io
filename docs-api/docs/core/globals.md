---
title: Globals
---

Globals
===


Globals object is used to store and manage properties in the global store.

=== "Overview"
- Module: `core/globals`
- Definition: [https://github.com/eclipse/dirigible/issues/30](https://github.com/eclipse/dirigible/issues/30)
- Source: [/core/globals.js](https://github.com/eclipse/dirigible/blob/master/components/api-core/src/main/resources/META-INF/dirigible/core/globals.js)
- Status: `stable`

### Basic Usage

```javascript
var globals = require("core/globals");
var response = require("http/response");

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
