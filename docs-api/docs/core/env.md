---
title: Env
---

Env
===

Env object is used for access of the environment variables.

=== "Overview"
- Module: `core/v4/env`
- Alias: `core/env`
- Definition: [https://github.com/eclipse/dirigible/issues/29](https://github.com/eclipse/dirigible/issues/29)
- Source: [/core/v4/env.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/env.js)
- Facade: [EnvFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/EnvFacade.java)
- Status: `stable`

### Basic Usage

```javascript
var env = require("core/v4/env");
var response = require("http/v4/response");

var os = env.get("os.name");
response.println("[OS]: " + os);

response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the environments variables | *string*
**list()**   | Returns the list of the environments variables in JSON formatted string | *string*
