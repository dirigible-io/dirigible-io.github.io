# Request

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.http`
- source: [http/Request.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Request.java)
:::

Inspects the inbound HTTP request bound to the calling thread — method, headers, cookies, query parameters, body. Use this from a `@Controller` method that needs more than the parameter-binding annotations (e.g. raw header inspection, parameter iteration, streaming the body).

`getNative()` hands back the underlying `HttpServletRequest` when you need to call into Servlet APIs that aren't exposed through the static helpers; the helpers themselves are sufficient for the vast majority of use cases and keep call sites free of Servlet imports.

### Key Features:
- **Thread-bound**: All methods operate on the request bound to the current thread; there is no instance to pass around.
- **Servlet Escape Hatch**: `getNative()` exposes the underlying `HttpServletRequest` when you need to drop down to the Servlet API.
- **JSON-shaped Collections**: Aggregate helpers (`getHeaderNames`, `getCookies`, `getParameters`, `getAttributeNames`, `getParameterValues`) return JSON-encoded strings for easy serialisation.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.http.Request;

if (Request.isValid()) {
    String method = Request.getMethod();
    String auth = Request.getHeader("Authorization");
    String body = Request.getText();
    // ...
}
```

## Methods

### getNative()

Returns the underlying Servlet request.

> ```java
> public static HttpServletRequest getNative();
> ```
>
> ::: info Returns
> - **Type**: `jakarta.servlet.http.HttpServletRequest`
> - **Description**: The Servlet request bound to the current thread.
> :::

### isValid()

Returns whether an HTTP request is bound to the current thread.

> ```java
> public static boolean isValid();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` when a request is in scope.
> :::

### getMethod()

Returns the HTTP method (`GET`, `POST`, …).

> ```java
> public static String getMethod();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getRemoteUser()

Returns the authenticated remote user.

> ```java
> public static String getRemoteUser();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getPathInfo()

Returns the extra path information beyond the servlet path.

> ```java
> public static String getPathInfo();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getHeader()

Returns the value of the named request header.

> ```java
> public static String getHeader(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Header name. |
>
> ::: info Returns
> - **Type**: `String`
> :::

### getHeaderNames()

Returns the names of all request headers.

> ```java
> public static String getHeaderNames();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-encoded list of header names.
> :::

### getHeaders()

Returns all values for the named header.

> ```java
> public static String getHeaders(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Header name. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-encoded list of header values.
> :::

### getCookies()

Returns all cookies sent with the request.

> ```java
> public static String getCookies();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-encoded list of cookies.
> :::

### getAttribute()

Returns the value of the named request attribute.

> ```java
> public static String getAttribute(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Attribute name. |
>
> ::: info Returns
> - **Type**: `String`
> :::

### setAttribute()

Sets a request attribute.

> ```java
> public static void setAttribute(String name, String value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Attribute name. |
> | `value` | `String` | Attribute value. |

### removeAttribute()

Removes the named request attribute.

> ```java
> public static void removeAttribute(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Attribute name. |

### getAttributeNames()

Returns the names of all request attributes.

> ```java
> public static String getAttributeNames();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-encoded list of attribute names.
> :::

### isUserInRole()

Returns whether the authenticated user is in the given role.

> ```java
> public static boolean isUserInRole(String role);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `role` | `String` | Role name. |
>
> ::: info Returns
> - **Type**: `boolean`
> :::

### getAuthType()

Returns the authentication scheme used (`BASIC`, `FORM`, …).

> ```java
> public static String getAuthType();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getCharacterEncoding()

Returns the character encoding of the request body.

> ```java
> public static String getCharacterEncoding();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getContentLength()

Returns the request body length in bytes.

> ```java
> public static int getContentLength();
> ```
>
> ::: info Returns
> - **Type**: `int`
> :::

### getContentType()

Returns the request `Content-Type` header.

> ```java
> public static String getContentType();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getBytes()

Reads the entire request body as a Base64-encoded byte string.

> ```java
> public static String getBytes() throws IOException;
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getText()

Reads the entire request body as text.

> ```java
> public static String getText() throws IOException;
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getInputStream()

Returns the raw request body as a Servlet input stream — use for streaming uploads.

> ```java
> public static ServletInputStream getInputStream() throws IOException;
> ```
>
> ::: info Returns
> - **Type**: `jakarta.servlet.ServletInputStream`
> :::

### getParameter()

Returns the value of the named request parameter (form field or query parameter).

> ```java
> public static String getParameter(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Parameter name. |
>
> ::: info Returns
> - **Type**: `String`
> :::

### getParameters()

Returns all request parameters.

> ```java
> public static String getParameters();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-encoded parameter map.
> :::

### getParameterNames()

Returns the names of all request parameters.

> ```java
> public static String getParameterNames();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-encoded list of parameter names.
> :::

### getParameterValues()

Returns all values for the named request parameter.

> ```java
> public static String getParameterValues(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Parameter name. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-encoded list of values.
> :::

### getResourcePath()

Returns the resource path within the service.

> ```java
> public static String getResourcePath();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getProtocol()

Returns the request protocol (`HTTP/1.1`, `HTTP/2`).

> ```java
> public static String getProtocol();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getScheme()

Returns the URL scheme (`http`, `https`).

> ```java
> public static String getScheme();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getContextPath()

Returns the servlet context path.

> ```java
> public static String getContextPath();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getServerName()

Returns the host name of the server that received the request.

> ```java
> public static String getServerName();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getServerPort()

Returns the port number on which the request was received.

> ```java
> public static int getServerPort();
> ```
>
> ::: info Returns
> - **Type**: `int`
> :::

### getQueryString()

Returns the query string portion of the request URL.

> ```java
> public static String getQueryString();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getRemoteAddress()

Returns the IP address of the client.

> ```java
> public static String getRemoteAddress();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getRemoteHost()

Returns the host name of the client.

> ```java
> public static String getRemoteHost();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getLocale()

Returns the preferred locale of the client.

> ```java
> public static String getLocale();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getRequestURI()

Returns the part of the request URL from the protocol up to the query string.

> ```java
> public static String getRequestURI();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### isSecure()

Returns whether the request came over a secure channel (HTTPS).

> ```java
> public static boolean isSecure();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> :::

### getRequestURL()

Returns the full URL the client used to make the request.

> ```java
> public static String getRequestURL();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getServicePath()

Returns the path within the Dirigible service registry that handles this request.

> ```java
> public static String getServicePath();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::
