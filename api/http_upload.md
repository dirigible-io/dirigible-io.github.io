---
layout: api
title: HTTP Upload
icon: fa-ellipsis-h
---

HTTP Upload
===

HTTP Upload is used to consume files posted as multipart request.

- Module: **net/http/upload**
- Definition: [/core_api/issues/24](https://github.com/dirigiblelabs/core_api/issues/24)
- Source: [/net/http/upload.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/http/upload.js)
- Status: **stable**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var upload = require('net/http/upload');
var request = require('net/http/request');
var response = require('net/http/response');

if (request.getMethod() === "POST") {
	if (upload.isMultipartContent()) {
		var files = upload.parseRequest();
		files.forEach(function(file) {
			response.println("[File Name] " + file.name);
			response.println("[File Data]");
			// response.println(file.data); // as a raw byte array or as a string below
			response.println(String.fromCharCode.apply(null, file.data));
		});
	} else {
		response.println("The request's content must be 'multipart'");
	}
} else if (request.getMethod() === "GET") {
	response.println("Use POST request.");
}

response.flush();
response.close();
```
