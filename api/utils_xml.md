---
layout: api
title: XML
icon: fa-ellipsis-h
---

XML
===

XML object is used to transfrom from JSON to XML and vice versa.

- Module: **utils/xml**
- Definition: [/core_api/issues/25](https://github.com/dirigiblelabs/core_api/issues/25)
- Source: [/utils/xml.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/utils/xml.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var xml = require('utils/xml');
var response = require('net/http/response');

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



Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**fromJson(json)**   | Converts a JSON to a XML string | *string*
**toJson(xml)**   | Converts a XML to JSON string | *string*




Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

