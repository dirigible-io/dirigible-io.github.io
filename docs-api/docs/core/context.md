---
title: Context
---

Context
===

Context object is used to store and manage properties for a single execution flow (with or without HTTP request)

=== "Overview"
- Module: `core/context`
- Definition: [https://github.com/eclipse/dirigible/issues/31](https://github.com/eclipse/dirigible/issues/31)
- Source: [/core/context.js](https://github.com/eclipse/dirigible/blob/master/components/api-core/src/main/resources/META-INF/dirigible/core/context.js)
- Status: `stable`

### Basic Usage

#### ECMA6

```javascript
import { context } from "@dirigible/core";
import { response } from "@dirigible/http";

context.set("attr1", "value1");
let attr = context.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
```

#### Require

```javascript
var context = require('core/context');
var response = require('http/response');

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
