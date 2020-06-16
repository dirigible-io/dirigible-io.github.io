---
layout: api
title: Config
icon: fa-check
---

> ⚠ Deprecated

{{ page.title }}
===

Config object is used to store and manage properties in the Configuration Store.

Version 4.x
---

[core/configurations](http://www.dirigible.io/api/core_configurations.html)

Version 3.x
---

[core/configurations](http://www.dirigible.io/api/core_configurations.html)

---


Version 2.x
---

- Module: **core/config**
- Definition: [/core_api/issues/16](https://github.com/dirigiblelabs/core_api/issues/16)
- Source: [/core/config.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/core/config.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var config = require('core/config');
var response = require('net/http/response');

var properties = {
		"property1": "value1",
		"property2": "value2"
	}

config.set("/path/to/property", "key1", "value1");
config.setJson("/path/to/properties", JSON.stringify(properties));

response.println(config.get("/path/to/property", "key1"));
var result = JSON.parse(config.getJson("/path/to/properties"));
response.println(result.property2);

config.delete("/path/to/property");
config.delete("/path/to/properties");

response.println(config.get("/path/to/property"));
response.println(config.get("/path/to/properties"));

response.flush();
response.close();
```


Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(path, key)**   | Returns the value per key from a set at the given path | *string*
**set(path, key, value)**   | Sets the value by a key of a set at the given path | -
**delete(path)**   | Deletes a properties set at the given path | -
**clear()**   | Deletes all the properties sets | -
**getJson(path)**   | Returns the properties set at the given path as JSON | *string*
**setJson(path, json)**   | Creates or update the properties set at the given path from JSON | -



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
