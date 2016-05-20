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

	var ioLib = require('io');

	var url = 'http://rest.call/example';
	
	var getRequest = http.createGet(url);
	var httpClient = http.createHttpClient();
	var httpResponse = httpClient.execute(getRequest);
	var entity = httpResponse.getEntity();
	var content = entity.getContent();
	
	var input = ioLib.read(content);
	http.consume(entity);
	
	response.getWriter().println(input);

```

Parsing 'input' to JSON
----

```javascript

	var json = JSON.parse(input);

```

POST Call
----

```javascript

	var postRequest = http.creatPost(url);

```

PUT Call
----

```javascript

	var putRequest = http.createPut(url);

```

DELETE Call
----

```javascript

	var deleteRequest = http.createDelete(url);

```

For more information, see the *[API](../help/api.html)* documentation.
