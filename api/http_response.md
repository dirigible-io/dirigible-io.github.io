---
layout: api
title: HTTP Response
icon: fa-ellipsis-h
---

{{ page.title }}
===

HTTP Response object provided to the scripting services implementation to create the result, which will be sent back to the client.


Version 3.x
---


- Module: **http/v3/response**
- Alias: **http/response**
- Definition: [https://github.com/eclipse/dirigible/issues/13](https://github.com/eclipse/dirigible/issues/13)
- Source: [/http/v3/response.js](https://github.com/dirigiblelabs/api-v3-http/blob/master/http/v3/response.js)
- Facade: [HttpResponseFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facades/api-http/src/main/java/org/eclipse/dirigible/api/v3/http/HttpResponseFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var response = require('http/v3/response');

response.println("Hello World!");
response.flush();
response.close();
```



### Definition


#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**isValid()**   | Returns true if the current execution context is in a HTTP call | *boolean*
**print(text)**   | Prints the text to the response body | -
**println(text)**   | Prints the text to the response body with line separator at the end | -
**write(bytes)**   | Prints the bytes array to the response body | -
**isCommitted()**   | Whether response is already committed | *boolean*
**setContentType()**   | Sets the content type | -
**flush()**   | Flushes the content to the response to the client | -
**close()**   | Closes the response stream to the client | -
**addCookie(cookie)**   | Adds a HttpCookie to the response | -
**containsHeader(name)**   | Checks existence of the header by name | *boolean*
**encodeURL(url)**   | Returns the encoded *url* parameter | *string*
**getCharacterEncoding()**   | Returns the character encoding of the response | *string*
**encodeRedirectURL()**   | Returns the encoded redirect URL | *string*
**getContentType()**   | Returns the content type of the response | *string*
**sendError(code, message)**   | Sends an error instruction to the client with the given *code* and *message*. The *message* parameter is optional | -
**setCharacterEncoding(encoding)**   | Sets the character encoding of the response | -
**sendRedirect(location)**   | Sends a redirect instruction to the client to the given location | -
**setContentLength(length)**   | Sets the content length of the response | -
**setHeader(name, value)**   | Updates a header name/value pair to the response | -
**addHeader(name, value)**   | Adds a header name/value pair to the response | -
**setStatus(status)**   | Sets the status of the response | -
**reset(status)**   | Resets the response | -
**getHeader(name)**   | Returns the header value by *name* | -
**setLocale(language, country, variant)**   | Sets the locale to the response | -
**getHeaders(name)**   | Returns the array of header values by *name* | *array of string*
**getHeaderNames()**   | Returns the names of all the headers | *array of string*
**getLocale()**   | Returns the locale of the response | *string*


#### Constants

---

Constant     | Description | Type
------------ | ----------- | --------
**ACCEPTED**   | Status code (202) indicating that a request was accepted for processing, but was not completed. | *int*
**BAD_GATEWAY**   | Status code (502) indicating that the HTTP server received an invalid response from a server it consulted when acting as a proxy or gateway. | *int*
**BAD_REQUEST**   | Status code (400) indicating the request sent by the client was syntactically incorrect. | *int*
**CONFLICT**   | Status code (409) indicating that the request could not be completed due to a conflict with the current state of the resource. | *int*
**CONTINUE**   | Status code (100) indicating the client can continue. | *int*
**CREATED**   | Status code (201) indicating the request succeeded and created a new resource on the server. | *int*
**EXPECTATION_FAILED**   | Status code (417) indicating that the server could not meet the expectation given in the Expect request header. | *int*
**FORBIDDEN**   | Status code (403) indicating the server understood the request but refused to fulfill it. | *int*
**FOUND**   | Status code (302) indicating that the resource reside temporarily under a different URI. | *int*
**GATEWAY_TIMEOUT**   | Status code (504) indicating that the server did not receive a timely response from the upstream server while acting as a gateway or proxy. | *int*
**GONE**   | Status code (410) indicating that the resource is no longer available at the server and no forwarding address is known. | *int*
**HTTP_VERSION_NOT_SUPPORTED**   | Status code (505) indicating that the server does not support or refuses to support the HTTP protocol version that was used in the request message. | *int*
**INTERNAL_SERVER_ERROR**   | Status code (500) indicating an error inside the HTTP server which prevented it from fulfilling the request. | *int*
**LENGTH_REQUIRED**   | Status code (411) indicating that the request cannot be handled without a defined Content-Length. | *int*
**METHOD_NOT_ALLOWED**   | Status code (405) indicating that the method specified in the Request-Line is not allowed for the resource identified by the Request-URI. | *int*
**MOVED_PERMANENTLY**   | Status code (301) indicating that the resource has permanently moved to a new location, and that future references should use a new URI with their requests. | *int*
**MOVED_TEMPORARILY**   | Status code (302) indicating that the resource has temporarily moved to another location, but that future references should still use the original URI to access the resource. | *int*
**MULTIPLE_CHOICES**   | Status code (300) indicating that the requested resource corresponds to any one of a set of representations, each with its own specific location. | *int*
**NO_CONTENT**   | Status code (204) indicating that the request succeeded but that there was no new information to return. | *int*
**NON_AUTHORITATIVE_INFORMATION**   | Status code (203) indicating that the meta information presented by the client did not originate from the server. | *int*
**NOT_ACCEPTABLE**   | Status code (406) indicating that the resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request. | *int*
**NOT_FOUND**   | Status code (404) indicating that the requested resource is not available. | *int*
**NOT_IMPLEMENTED**   | Status code (501) indicating the HTTP server does not support the functionality needed to fulfill the request. | *int*
**NOT_MODIFIED**   | Status code (304) indicating that a conditional GET operation found that the resource was available and not modified. | *int*
**OK**   | Status code (200) indicating the request succeeded normally. | *int*
**PARTIAL_CONTENT**   | Status code (206) indicating that the server has fulfilled the partial GET request for the resource. | *int*
**PAYMENT_REQUIRED**   | Status code (402) reserved for future use. | *int*
**PRECONDITION_FAILED**   | Status code (412) indicating that the precondition given in one or more of the request-header fields evaluated to false when it was tested on the server. | *int*
**PROXY_AUTHENTICATION_REQUIRED**   | Status code (407) indicating that the client MUST first authenticate itself with the proxy. | *int*
**REQUEST_ENTITY_TOO_LARGE**   | Status code (413) indicating that the server is refusing to process the request because the request entity is larger than the server is willing or able to process. | *int*
**REQUEST_TIMEOUT**   | Status code (408) indicating that the client did not produce a request within the time that the server was prepared to wait. | *int*
**REQUEST_URI_TOO_LONG**   | Status code (414) indicating that the server is refusing to service the request because the Request-URI is longer than the server is willing to interpret. | *int*
**REQUESTED_RANGE_NOT_SATISFIABLE**   | Status code (416) indicating that the server cannot serve the requested byte range. | *int*
**RESET_CONTENT**   | Status code (205) indicating that the agent SHOULD reset the document view which caused the request to be sent. | *int*
**SEE_OTHER**   | Status code (303) indicating that the response to the request can be found under a different URI. | *int*
**SERVICE_UNAVAILABLE**   | Status code (503) indicating that the HTTP server is temporarily overloaded, and unable to handle the request. | *int*
**SERVICE_SWITCHING_PROTOCOLSUNAVAILABLE**   | Status code (101) indicating the server is switching protocols according to Upgrade header. | *int*
**TEMPORARY_REDIRECT**   | Status code (307) indicating that the requested resource resides temporarily under a different URI. | *int*
**UNAUTHORIZED**   | Status code (401) indicating that the request requires HTTP authentication. | *int*
**UNSUPPORTED_MEDIA_TYPE**   | Status code (415) indicating that the server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method. | *int*
**USE_PROXY**   | Status code (305) indicating that the requested resource MUST be accessed through the proxy given by the Location field. | *int*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---

---



- Module: **net/http/response**
- Definition: [/core_api/issues/1](https://github.com/dirigiblelabs/core_api/issues/1)
- Source: [/net/http/response.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/http/response.js)
- Status: **beta**

### Basic Usage

```javascript
var response = require('net/http/response');

response.println("Hello World!");
response.flush();
response.close();
```



### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**print(text)**   | Prints the text in the response body | -
**println(text)**   | Prints the text in the response body with line separator at the end | -
**flush()**   | Flushes the content in the response to the client | -
**close()**   | Closes the response stream to the client | -
**addCookie(cookie)**   | Adds a HttpCookie to the response | -
**addHeader(name, Value)**   | Adds a header name/value pair to the response | -
**setHeader(name, Value)**   | Updates a header name/value pair to the response | -
**containsHeader(name)**   | Checks existence of the header by name | *boolean*
**getCharacterEncoding()**   | Returns the character encoding of the response | *string*
**getContentLength()**   | Returns the content length of the response | *int*
**getContentType()**   | Returns the content type of the response | *string*
**sendError(code, message)**   | Sends an error instruction to the client with the given code and message | -
**sendRedirect(location)**   | Sends a redirect instruction to the client to the given location | -
**setCharacterEncoding(encoding)**   | Sets the character encoding of the response | -
**setContentLength(length)**   | Sets the content length of the response | -
**setContentType(type)**   | Sets the content type of the response | -
**setStatus(status)**   | Sets the status of the response | -
**getOutputStream()**   | Returns the OutputStream object | *streams.OutputStream*
**writeStream(inputStream)**   | Writes the inputStream to the output stream of this Response | -
**writeOutput(bytes)**   | Writes the byte array to the output stream of this Response | -




#### Constants

---

Constant     | Description | Type
------------ | ----------- | --------
**ACCEPTED**   | Status code (202) indicating that a request was accepted for processing, but was not completed. | *int*
**BAD_GATEWAY**   | Status code (502) indicating that the HTTP server received an invalid response from a server it consulted when acting as a proxy or gateway. | *int*
**BAD_REQUEST**   | Status code (400) indicating the request sent by the client was syntactically incorrect. | *int*
**CONFLICT**   | Status code (409) indicating that the request could not be completed due to a conflict with the current state of the resource. | *int*
**CONTINUE**   | Status code (100) indicating the client can continue. | *int*
**CREATED**   | Status code (201) indicating the request succeeded and created a new resource on the server. | *int*
**EXPECTATION_FAILED**   | Status code (417) indicating that the server could not meet the expectation given in the Expect request header. | *int*
**FORBIDDEN**   | Status code (403) indicating the server understood the request but refused to fulfill it. | *int*
**FOUND**   | Status code (302) indicating that the resource reside temporarily under a different URI. | *int*
**GATEWAY_TIMEOUT**   | Status code (504) indicating that the server did not receive a timely response from the upstream server while acting as a gateway or proxy. | *int*
**GONE**   | Status code (410) indicating that the resource is no longer available at the server and no forwarding address is known. | *int*
**HTTP_VERSION_NOT_SUPPORTED**   | Status code (505) indicating that the server does not support or refuses to support the HTTP protocol version that was used in the request message. | *int*
**INTERNAL_SERVER_ERROR**   | Status code (500) indicating an error inside the HTTP server which prevented it from fulfilling the request. | *int*
**LENGTH_REQUIRED**   | Status code (411) indicating that the request cannot be handled without a defined Content-Length. | *int*
**METHOD_NOT_ALLOWED**   | Status code (405) indicating that the method specified in the Request-Line is not allowed for the resource identified by the Request-URI. | *int*
**MOVED_PERMANENTLY**   | Status code (301) indicating that the resource has permanently moved to a new location, and that future references should use a new URI with their requests. | *int*
**MOVED_TEMPORARILY**   | Status code (302) indicating that the resource has temporarily moved to another location, but that future references should still use the original URI to access the resource. | *int*
**MULTIPLE_CHOICES**   | Status code (300) indicating that the requested resource corresponds to any one of a set of representations, each with its own specific location. | *int*
**NO_CONTENT**   | Status code (204) indicating that the request succeeded but that there was no new information to return. | *int*
**NON_AUTHORITATIVE_INFORMATION**   | Status code (203) indicating that the meta information presented by the client did not originate from the server. | *int*
**NOT_ACCEPTABLE**   | Status code (406) indicating that the resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request. | *int*
**NOT_FOUND**   | Status code (404) indicating that the requested resource is not available. | *int*
**NOT_IMPLEMENTED**   | Status code (501) indicating the HTTP server does not support the functionality needed to fulfill the request. | *int*
**NOT_MODIFIED**   | Status code (304) indicating that a conditional GET operation found that the resource was available and not modified. | *int*
**OK**   | Status code (200) indicating the request succeeded normally. | *int*
**PARTIAL_CONTENT**   | Status code (206) indicating that the server has fulfilled the partial GET request for the resource. | *int*
**PAYMENT_REQUIRED**   | Status code (402) reserved for future use. | *int*
**PRECONDITION_FAILED**   | Status code (412) indicating that the precondition given in one or more of the request-header fields evaluated to false when it was tested on the server. | *int*
**PROXY_AUTHENTICATION_REQUIRED**   | Status code (407) indicating that the client MUST first authenticate itself with the proxy. | *int*
**REQUEST_ENTITY_TOO_LARGE**   | Status code (413) indicating that the server is refusing to process the request because the request entity is larger than the server is willing or able to process. | *int*
**REQUEST_TIMEOUT**   | Status code (408) indicating that the client did not produce a request within the time that the server was prepared to wait. | *int*
**REQUEST_URI_TOO_LONG**   | Status code (414) indicating that the server is refusing to service the request because the Request-URI is longer than the server is willing to interpret. | *int*
**REQUESTED_RANGE_NOT_SATISFIABLE**   | Status code (416) indicating that the server cannot serve the requested byte range. | *int*
**RESET_CONTENT**   | Status code (205) indicating that the agent SHOULD reset the document view which caused the request to be sent. | *int*
**SEE_OTHER**   | Status code (303) indicating that the response to the request can be found under a different URI. | *int*
**SERVICE_UNAVAILABLE**   | Status code (503) indicating that the HTTP server is temporarily overloaded, and unable to handle the request. | *int*
**SERVICE_SWITCHING_PROTOCOLSUNAVAILABLE**   | Status code (101) indicating the server is switching protocols according to Upgrade header. | *int*
**TEMPORARY_REDIRECT**   | Status code (307) indicating that the requested resource resides temporarily under a different URI. | *int*
**UNAUTHORIZED**   | Status code (401) indicating that the request requires HTTP authentication. | *int*
**UNSUPPORTED_MEDIA_TYPE**   | Status code (415) indicating that the server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method. | *int*
**USE_PROXY**   | Status code (305) indicating that the requested resource MUST be accessed through the proxy given by the Location field. | *int*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

