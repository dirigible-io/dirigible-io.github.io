---
title: Request
---

HTTP Request
===


HTTP Request object provided to the scripting services implementation. It contains the headers and parameters coming as input from the HTTP call.

=== "Overview"
- Module: `http/request`
- Definition: [https://github.com/eclipse/dirigible/issues/12](https://github.com/eclipse/dirigible/issues/12)
- Source: [/http/request.js](https://github.com/eclipse/dirigible/blob/master/components/api-http/src/main/resources/META-INF/dirigible/http/request.js)
- Status: `stable`
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { request, response } from "sdk/http";

    let method = request.getMethod();

    response.println("[Method]: " + method);
    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const request = require("http/request");
    const response = require("http/response");

    let method = request.getMethod();

    response.println("[Method]: " + method);
    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**isValid()**   | Returns true if the current execution context is in a HTTP call | *boolean*
**getMethod()**   | Returns the HTTP request method - GET, POST, PUT, DELETE, HEAD, TRACE | *string*
**getRemoteUser()**   | Returns the user name performing the request | *string*
**getPathInfo()**   | Returns the path info section of the URL | *string*
**getPathTranslated()**   | Returns the translated path | *string*
**getHeader(name)**   | Returns the value of the header by name, if any | *string*
**isUserInRole(role)**   | Returns true if the user has the given role and false otherwise | *string*
**getAttribute(name)**   | Returns the value of the attribute by name, if any | *string*
**getAuthType()**   | Returns the authentication type | *string*
**getCookies()**   | Returns all the cookies from the request | *array of HttpCookie*
**getAttributeNames()**   | Returns the names of all the attribute | *array of string*
**getCharacterEncoding()**   | Returns the character encoding | *string*
**getContentLength()**   | Returns the content length | *string*
**getHeaders()**   | Returns the array of headers | *array of HttpHeader*
**getContentType()**   | Returns the content type | *string*
**getBytes()**   | Returns the content as byte array | *array of bytes*
**getText()**   | Returns the content as text | *string*
**getJSON()**   | Returns a JSON object, after parsing the content as text | *Object*
**getParameter(name)**   | Returns the value of the parameter by name, if any | *string*
**getHeaderNames()**   | Returns the names of all the headers | *array of string*
**getParameterNames()**   | Returns the names of all the parameters | *array of string*
**getParameterValues(name)**   | Returns the values of the parameter by name | *array of string*
**getParameters()**   | Returns the all the parameters - name and value pairs | *array of pair*
**getProtocol()**   | Returns the protocol | *string*
**getScheme()**   | Returns the scheme | *string*
**getContextPath()**   | Returns the context path | *string*
**getServerName()**   | Returns the server name | *string*
**getServerPort()**   | Returns the server port | *int*
**getQueryString()**   | Returns the query string | *string*
**getRemoteAddress()**   | Returns the remote address | *string*
**getRemoteHost()**   | Returns the remote host | *string*
**setAttribute(name,value)**   | Sets the value of the attribute by name | -
**removeAttribute(name)**   | Sets the value of the attribute by name | -
**getLocale()**   | Returns the locale string | *string*
**getRequestURI()**   | Returns the request URI | *string*
**isSecure()**   | Whether the request goes via a secured channel | *boolean*
**getRequestURL()**   | Returns the request URL | *string*
**getServicePath()**   | Returns the service path | *string*
**getRemotePort()**   | Returns the remote port | *string*
**getLocalName()**   | Returns the local name | *string*
**getLocalAddress()**   | Returns the local address | *string*
**getLocalPort()**   | Returns the local port | *string*


### Objects

---

##### HttpCookie


Property     | Description | Type
------------ | ----------- | --------
**name**   | The HttpCookie name | *string*
**value**   | The HttpCookie value | *string*
**comment**   | The HttpCookie comment section | *string*
**maxAge**   | The HttpCookie maximum age | *int*
**path**   | The URI path to which the client should return the HttpCookie | *string*
**domain**   | The domain name set to this HttpCookie | *string*
**secure**   | Returns true if the client is sending HttpCookie only over a secure protocol | *string*
**version**   | Returns the version of the protocol this cookie complies with | *0*
**httpOnly**   | The HttpCookie will not be exposed to the client-side scripting code if true | *boolean*



##### HttpHeader


Property     | Description | Type
------------ | ----------- | --------
**name**   | The name of the header | *string*
**value**   | The value of the header | *string*
