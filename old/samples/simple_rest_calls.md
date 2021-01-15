---
layout: samples
title: REST Calls
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps


1. Create a project **rest_calls**.
2. Then create a JavaScript service named **get_call.js**.
3. Within the service code, enter the following content:

#### GET Call

```javascript

var httpClient = require("http/v4/client");
var response = require("http/v4/response");

var httpResponse = httpClient.get("https://services.odata.org/V4/Northwind/Northwind.svc/");

response.println(httpResponse.statusMessage);
response.println(httpResponse.text);
response.flush();
response.close();

```

2. Then create a JavaScript service named **post_call.js**.
3. Within the service code, enter the following content:

#### POST Call


```javascript

var httpClient = require("http/v4/client");
var response = require("http/v4/response");
	
var bodyContent = JSON.stringify({
		firstName: "John",
		lastName: "Doe",
		age: 24
	});
	
var httpResponse = httpClient.post("http://httpbin.org/post", {
	    text: bodyContent
	});
	
response.println(httpResponse.statusMessage);
response.println(httpResponse.text);
response.flush();
response.close();

```

2. Then create a JavaScript service named **put_call.js**.
3. Within the service code, enter the following content:

#### PUT Call


```javascript

var httpClient = require("http/v4/client");
var response = require("http/v4/response");
	
var bodyContent = JSON.stringify({
		firstName: "John",
		lastName: "Doe",
		age: 24
	});
	
var httpResponse = httpClient.put("http://httpbin.org/put", {
	    text: bodyContent
	});
	
response.println(httpResponse.statusMessage);
response.println(httpResponse.text);
response.flush();
response.close();

```
2. Then create a JavaScript service named **delete_call.js**.
3. Within the service code, enter the following content:

#### DELETE Call

```javascript

var httpClient = require("http/v4/client");
var response = require("http/v4/response");
	
var httpResponse = httpClient.delete("http://httpbin.org/delete");
	
response.println(httpResponse.statusMessage);
response.println(httpResponse.text);
response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
