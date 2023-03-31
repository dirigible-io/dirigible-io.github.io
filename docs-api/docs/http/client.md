---
title: Client
---

HTTP Client
===

Client is used by scripting services to call external services via HTTP.

=== "Overview"
- Module: `http/client`
- Definition: [https://github.com/eclipse/dirigible/issues/15](https://github.com/eclipse/dirigible/issues/15)
- Source: [/http/client.js](https://github.com/eclipse/dirigible/blob/master/components/api-http/src/main/resources/META-INF/dirigible/http/client.js)
- Status: `stable`


### Basic Usage

=== "ECMA6"
```javascript
import { client, response } from "@dirigible/http";

let httpResponse = client.get("https://services.odata.org/V4/Northwind/Northwind.svc/");

response.println(httpResponse.statusMessage);
response.println(httpResponse.text);
response.flush();
response.close();
```

=== "Require"
```javascript
var httpClient = require("http/client");
var response = require("http/response");

var httpResponse = httpClient.get("https://services.odata.org/V4/Northwind/Northwind.svc/");

response.println(httpResponse.statusMessage);
response.println(httpResponse.text);
response.flush();
response.close();
```

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
**characterEncodingEnabled** | The character encoding enabled parameter. Default is true | *boolean*
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
