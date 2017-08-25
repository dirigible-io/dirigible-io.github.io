---
layout: api
title: HTTP Client
icon: fa-ellipsis-h
---

{{ page.title }}
===

HTTP Client is used by scripting services to call external services via HTTP.


Version 3.x
---

- Module: **http/v3/client**
- Alias: **http/client**
- Definition: [https://github.com/eclipse/dirigible/issues/15](https://github.com/eclipse/dirigible/issues/15)
- Source: [/http/v3/client.js](https://github.com/dirigiblelabs/api-v3-db/blob/master/http/v3/client.js)
- Facade: [HttpClientFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facades/api-db/src/main/java/org/eclipse/dirigible/api/v3/http/HttpClientFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var httpClient = require('http/v3/client');
var response = require('http/v3/response');

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
**head(url, options)**   | Makes a HTTP HEAD request to a remote service at the URL by the HttpOptions and returns the result | *HttpResponse*
**trace(url, options)**   | Makes a HTTP TRACE request to a remote service at the URL by the HttpOptions and returns the result | *HttpResponse*


### Objects

---

#### HttpResponse


Property     | Description | Type
------------ | ----------- | --------
**statusCode**   | The Response status code | *int*
**statusMessage**   | The Response status message | *string*
**data**   | The Response data | *array of bytes*
**text**   | The Response data as text | *string*
**binary**   | Whether the Response data is binary in *data* or string in *text* | *boolean*
**protocol**   | The HTTP version of the Response | *string*
**headers**   | The Response headers | *array of HttpHeader*


#### HttpHeader


Property     | Description | Type
------------ | ----------- | --------
**name**   | The name of the header | *string*
**value**   | The value of the header | *string*


#### HttpParam


Property     | Description | Type
------------ | ----------- | --------
**name**   | The name of the param | *string*
**value**   | The value of the param | *string*


#### HttpOptions


Property     | Description | Type
------------ | ----------- | --------
**data**     | The body of the HTTP Request as binary | *array of bytes*
**text**     | The body of the HTTP Request as text | *string*
**files**     | The body of the HTTP Request as files (for POST) | *array of strings*
**params**   | The body of the HTTP Request as form parameters | *array of HttpParam*
**binary**     | Whether the body of the HTTP Request is binary | *boolean*
**characterEncoding**   | The character encoding parameter. Default is UTF-8 | *string*
**contentType**   | The content type parameter. Default is *plain/text* | *string*
**headers**   | The Response headers | *array of HttpHeader*
**proxyHost**     | The proxy host parameter | *string*
**proxyPort**     | The proxy port parameter | *int*
**expectContinueEnabled**     | The continue enabled parameter | *boolean*
**cookieSpec**     | The cookieSpec parameter | *string*
**redirectsEnabled**     | The redirects enabled parameter | *boolean*
**relativeRedirectsAllowed**     | The relative redirects allowed parameter | *boolean*
**circularRedirectsAllowed**     | The circular redirects allowed parameter | *boolean*
**maxRedirects**     | The max redirects parameter | *int*
**authenticationEnabled**     | The authentication enabled parameter | *boolean*
**targetPreferredAuthSchemes**     | The target preferred authentication schemes parameter | *array of strings*
**proxyPreferredAuthSchemes**     | The proxy preferred authentication schemes parameter | *array of strings*
**connectionRequestTimeout**     | The connection request timeout parameter | *int*
**connectTimeout**     | The connect timeout parameter | *int*
**socketTimeout**     | The socket timeout parameter | *int*
**contentCompressionEnabled**     | The content compression enabled parameter | *boolean*
**sslTrustAllEnabled**     | The SSL trust all enabled parameter | *boolean*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---

---

Version 2.x
---


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
**body**     | The body of the HTTP Request | *string*
**charset**   | The charset parameter. Default  | *string*
**headers**   | The Response headers | *array of HttpHeader*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

