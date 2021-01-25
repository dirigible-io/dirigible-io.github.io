---
title: Context
---

Context
===

Context object is used to store and manage properties for a single execution flow (with or without HTTP request)

=== "Overview"
- Module: `core/v4/context`
- Alias: `core/context`
- Definition: [https://github.com/eclipse/dirigible/issues/31](https://github.com/eclipse/dirigible/issues/31)
- Source: [/core/v4/context.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/context.js)
- Facade: [ContextFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/ContextFacade.java)
- Status: `stable`

### Basic Usage

```javascript
var context = require('core/v4/context');
var response = require('http/v4/response');

context.set("attr1", "value1");
var attr = context.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the context parameters | *string*
**set(key, value)**   | Sets the value per key to the context parameters | -
