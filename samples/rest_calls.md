---
layout: samples
title: REST Call
icon: fa-phone-square
group: simple
---

REST Call
===

1. Create a project **RESTCall**.
2. Then create a JavaScript service named **rest_call.js**.
3. Within the service code, enter the following content:

GET Call
---

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	var httpClient = require('net/http/client');
	var response = require('net/http/response');
	
	var httpResponse = httpClient.get('http://services.odata.org/V4/Northwind/Northwind.svc/');
	
	response.println(httpResponse.statusMessage);
	response.println(httpResponse.data);
	response.flush();
	response.close();

```

Parsing 'input' to JSON
----

```javascript

	var json = JSON.parse(input);

```

POST Call
----

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	var http = require('net/http/client');
	var response = require('net/http/response');
	
	var bodyContent = JSON.stringify({
		'firstName': 'John',
		'lastName': 'Doe',
		'age': 24
	});
	
	var httpResponse = http.request({
	    method: 'POST',
	    host: 'http://httpbin.org',
	    path: '/post',
	    binary: false,
	    body: bodyContent
	});
	
	response.println(httpResponse.statusMessage);
	response.println(httpResponse.data);
	response.flush();
	response.close();

```

PUT Call
----

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	var http = require('net/http/client');
	var response = require('net/http/response');
	
	var bodyContent = JSON.stringify({
		'firstName': 'John',
		'lastName': 'Doe',
		'age': 24
	});
	
	var httpResponse = http.request({
	    method: 'PUT',
	    host: 'http://httpbin.org',
	    path: '/put',
	    binary: false,
	    body: bodyContent
	});
	
	response.println(httpResponse.statusMessage);
	response.println(httpResponse.data);
	response.flush();
	response.close();

```

DELETE Call
----

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	var http = require('net/http/client');
	var response = require('net/http/response');
	
	var httpResponse = http.request({
	    method: 'DELETE',
	    host: 'http://httpbin.org',
	    path: '/delete',
	    binary: false
	});
	
	response.println(httpResponse.statusMessage);
	response.println(httpResponse.data);
	response.flush();
	response.close();

```

For more information, see the *[API](../help/api.html)* documentation.
