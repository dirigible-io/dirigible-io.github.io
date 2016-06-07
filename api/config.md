---
layout: api
title: Config
icon: fa-check
---

Config
===

Config object is used to store and manage properties in the Configuration Store.

- Module: **core/config**
- Definition: [/core_api/issues/16](https://github.com/dirigiblelabs/core_api/issues/16)
- Source: [/core/config.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/core/config.js)
- Status: **stable**

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
