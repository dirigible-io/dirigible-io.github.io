---
title: Client Async
---

Client Async
===

Client Async is used by scripting services to call asynchronously external services via HTTP.

=== "Overview"
- Module: `http/v4/clientAsync`
- Alias: `http/clientAsync`
- Definition: [https://github.com/eclipse/dirigible/issues/388](https://github.com/eclipse/dirigible/issues/388)
- Source: [/http/v4/clientAsync.js](https://github.com/dirigiblelabs/api-http/blob/master/http/v4/clientAsync.js)
- Facade: [HttpClientAsync](https://github.com/eclipse/dirigible/blob/master/modules/engines/engine-javascript-rhino/src/main/java/org/eclipse/dirigible/engine/js/rhino/api/v3/http/HttpClientAsync.java)
- Status: `stable`


### Basic Usage

```javascript
var httpClient = require("http/v4/client");
var httpClientAsync = require("http/v4/clientAsync");
var clientAsync = httpClientAsync.getInstnace();

var api = 'https://services.odata.org/V4/Northwind/Northwind.svc/';
var northWindResponse = httpClient.get(api, {
    params: [{
        name: "$format",
	value: "json"
    }]
});

var northWindEntities = JSON.parse(northWindResponse.text);

for (var i = 0; i < northWindEntities.value.length; i ++) {
    clientAsync.getAsync(api + northWindEntities.value[i].url, {
        success: function(response) {
	    var entity = JSON.parse(response.text);
	    console.error(entity["@odata.context"] + " : " + entity.value.length);
	}
    });
}
clientAsync.execute();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getAsync(url, config, options)**   | Makes a HTTP GET Async request to a remote service at the URL by the HttpOptions and returns HttpResponse to the HttpResponseCallback | *-*
**postAsync(url, config, options)**   | Makes a HTTP POST Async request to a remote service at the URL by the HttpOptions and returns HttpResponse to the HttpResponseCallback | *-*
**putAsync(url, config, options)**   | Makes a HTTP PUT Async request to a remote service at the URL by the HttpOptions and returns HttpResponse to the HttpResponseCallback | *-*
**deleteAsync(url, config, options)**   | Makes a HTTP DELETE Async request to a remote service at the URL by the HttpOptions and returns HttpResponse to the HttpResponseCallback | *-*
**headAsync(url, config, options)**   | Makes a HTTP HEAD Async request to a remote service at the URL by the HttpOptions and returns HttpResponse to the HttpResponseCallback | *-*
**traceAsync(url, config, options)**   | Makes a HTTP TRACE Async request to a remote service at the URL by the HttpOptions and returns HttpResponse to the HttpResponseCallback | *-*


### Objects

---

#### HttpResponseCallbackConfig


Property     | Description | Type
------------ | ----------- | --------
**success**   | The success response callback | *HttpResponseCallback function*
**error**   | The error response callback | *HttpResponseCallback function*
**cancel**   | The cancel response callback | *HttpResponseCallback function*

#### HttpResponseCallback


Parameters     | Description | Type
------------ | ----------- | --------
**response?**   | The HTTP Response object | *HttpResponse*
**error?**   | The HTTP Response Error Object | *HttpResponseError*



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


#### HttpResponseError


Property     | Description | Type
------------ | ----------- | --------
**message**   | The error message | *string*

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
