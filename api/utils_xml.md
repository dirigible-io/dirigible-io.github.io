---
layout: api
title: XML
icon: fa-ellipsis-h
group: api-utils
---

XML
===

XML object is used to transfrom from JSON to XML and vice versa.

- Module: **api/utils/xml**
- Definition: [/core_api/issues/25](https://github.com/dirigiblelabs/core_api/issues/25)
- Source: [/api/utils/xml.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/api/utils/xml.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var xml = require('api/utils/xml');
var response = require('api/http/response');

var jsonInput = {
	'firstName': 'John',
	'lastName': 'Doe',
	'bio': {
		'age': 24,
		'sex': 'male'
	}
};

var xmlInput = 
	"<firstName>John</firstName>" +
	"<lastName>Doe</lastName>" + 
	"<bio>" + 
	"<age>24</age>" +
	"<sex>male</sex>" +
	"</bio>";

response.println(xml.fromJson(jsonInput));
response.println(xml.toJson(xmlInput));

response.flush();
response.close();
```
