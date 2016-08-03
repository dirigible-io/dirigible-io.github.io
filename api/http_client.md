---
layout: api
title: HTTP Client
icon: fa-ellipsis-h
---

{{ page.title }}
===

HTTP Client is used by scripting services to call external services via HTTP.

- Module: **net/http/client**
- Definition: [/core_api/issues/3](https://github.com/dirigiblelabs/core_api/issues/3)
- Source: [/net/http/client.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/http/client.js)
- Status: **beta**

Basic Usage
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


Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(url, options)**   | Makes a HTTP GET request to a remote service at the URL by the HttpOptions and returns the result | *HttpResponse*
**post(url, options)**   | Makes a HTTP POST request to a remote service at the URL by the HttpOptions and returns the result | *HttpResponse*
**put(url, options)**   | Makes a HTTP PUT request to a remote service at the URL by the HttpOptions and returns the result | *HttpResponse*
**delete(url, options)**   | Makes a HTTP DELETE request to a remote service at the URL by the HttpOptions and returns the result | *HttpResponse*
**request(options)**   | Makes a HTTP request to a remote service and returns the result | *HttpResponse*


### Objects

---

#### HttpResponse


Function     | Description | Returns
------------ | ----------- | --------
**statusCode**   | The Response status code | *int*
**statusMessage**   | The Response status message | *string*
**data**   | The Response data | *array of bytes*
**httpVersion**   | The HTTP version of the Response | *string*
**headers**   | The Response headers | *array of HttpHeader*


#### HttpHeader


Function     | Description | Returns
------------ | ----------- | --------
**name**   | The name of the header | *string*
**value**   | The value of the header | *string*


#### HttpOptions


Function     | Description | Returns
------------ | ----------- | --------
**host**   | The host parameter | *string*
**port**   | The port parameter | *int*
**method**   | The method parameter - GET, POST, PUT, DELETE. Default GET | *string*
**charset**   | The charset parameter. Default  | *string*
**headers**   | The Response headers | *array of HttpHeader*




Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

