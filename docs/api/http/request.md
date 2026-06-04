# Request

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/request.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/request.ts)
- last updated: 
:::

The Request class provides a comprehensive API for accessing HTTP request data and metadata within server-side scripting services. It abstracts the underlying HTTP request details and exposes a rich set of static methods to retrieve information such as headers, query parameters, cookies, authentication details, and the request body in various formats (text, JSON, binary).

### Key Features:
- **Comprehensive Request Data Access**: Provides methods to access all aspects of the HTTP request, including headers, parameters, cookies, and body content.
- **Convenient Body Parsing**: Offers built-in methods to retrieve the request body as text or parse it as JSON, simplifying common use cases.
- **Security Information**: Allows checking user roles and authentication types directly from the request context.

### Use Cases:
- **API Development**: Used in RESTful API endpoints to access incoming request data and make decisions based on headers, parameters, or authentication status.
- **Middleware Logic**: Can be used in middleware functions to inspect requests before they reach the main handler logic.

### Example Usage:
```ts
import { Request } from "@aerokit/sdk/http";

function handleRequest() {
    if (Request.isValid()) {
        const method = Request.getMethod();
        const user = Request.getRemoteUser();
        const body = Request.json();
        // Process the request based on method, user, and body content
    } else {
        // Handle invalid request context
    }
}
```

## Classes

### Request

#### isValid()

Determines whether the current thread is handling a valid HTTP request.

> ```ts
> static isValid(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if called in a valid HTTP request context, otherwise `false`.
> :::

#### getMethod()

Returns the HTTP method (GET, POST, PUT, DELETE, etc.).

> ```ts
> static getMethod(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getRemoteUser()

Returns the authenticated remote user name if available.

> ```ts
> static getRemoteUser(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getPathInfo()

Returns the portion of the request path following the servlet path.

> ```ts
> static getPathInfo(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getPathTranslated()

Returns the translated file system path for the request.

> ```ts
> static getPathTranslated(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getHeader()

Returns the value of a specific HTTP header.

> ```ts
> static getHeader(name: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | Header name to retrieve. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The header value or `undefined` if not found.
> :::

#### isUserInRole()

Checks whether the remote user has the given role.

> ```ts
> static isUserInRole(role: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `role` | `string` | The role name to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getAttribute()

Returns a request attribute value previously associated with the request.

> ```ts
> static getAttribute(name: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The attribute name. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: A string value or `undefined`.
> :::

#### getAuthType()

Returns the authentication type if known (BASIC, CLIENT_CERT, etc.).

> ```ts
> static getAuthType(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getCookies()

Returns all cookies sent with the request.

> ```ts
> static getCookies(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of Cookie objects.
> :::

#### getAttributeNames()

Returns all available request attribute names.

> ```ts
> static getAttributeNames(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getCharacterEncoding()

Returns the character encoding used in the request body.

> ```ts
> static getCharacterEncoding(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getContentLength()

Returns the size of the request body in bytes, if known.

> ```ts
> static getContentLength(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getHeaders()

Returns all values of a specific header.

> ```ts
> static getHeaders(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | Header name to retrieve. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getContentType()

Returns the MIME content type of the request body.

> ```ts
> static getContentType(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getBytes()

Returns the raw request body as a byte array.

> ```ts
> static getBytes(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getText()

Returns the request body as text. This is computed once and cached.

> ```ts
> static getText(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### json()

Returns the request body parsed as JSON if valid.

> ```ts
> static json(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: A JSON object or `undefined` if parsing fails.
> :::

#### getJSON()

Same as json(); explicit form.

> ```ts
> static getJSON(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getParameter()

Returns a request parameter value.

> ```ts
> static getParameter(name: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getParameters()

Returns a map of request parameters to arrays of values.

> ```ts
> static getParameters(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getResourcePath()

Returns the allocated request resource path.

> ```ts
> static getResourcePath(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getHeaderNames()

Returns all header names.

> ```ts
> static getHeaderNames(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getParameterNames()

Returns all parameter names.

> ```ts
> static getParameterNames(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getParameterValues()

Returns all values for a given parameter name.

> ```ts
> static getParameterValues(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getProtocol()

Returns the HTTP protocol version.

> ```ts
> static getProtocol(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getScheme()

Returns the transport scheme (e.g., http, https).

> ```ts
> static getScheme(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getContextPath()

Returns the context path of the request.

> ```ts
> static getContextPath(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getServerName()

Returns the server host name.

> ```ts
> static getServerName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getServerPort()

Returns the server port number.

> ```ts
> static getServerPort(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getQueryString()

Returns the full raw query string.

> ```ts
> static getQueryString(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getQueryParametersMap()

Parses the query string and returns a map of parameter keys to values.
If the same key appears multiple times, values are collected into arrays.

> ```ts
> static getQueryParametersMap(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getRemoteAddress()

Returns the remote client IP address.

> ```ts
> static getRemoteAddress(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getRemoteHost()

Returns the remote client host name.

> ```ts
> static getRemoteHost(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### setAttribute()

Assigns a new attribute to the request.

> ```ts
> static setAttribute(name: string, value: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
> | `value` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### removeAttribute()

Removes an attribute from the request.

> ```ts
> static removeAttribute(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getLocale()

Returns the client locale preferences.

> ```ts
> static getLocale(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getRequestURI()

Returns the full request URI.

> ```ts
> static getRequestURI(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### isSecure()

Returns `true` if the request was made over HTTPS.

> ```ts
> static isSecure(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getRequestURL()

Returns the full request URL including protocol and host.

> ```ts
> static getRequestURL(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getServicePath()

Returns the internal service path for routing.

> ```ts
> static getServicePath(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getRemotePort()

Returns the remote client port number.

> ```ts
> static getRemotePort(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getLocalName()

Returns the local network host name.

> ```ts
> static getLocalName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getLocalAddress()

Returns the local IP address.

> ```ts
> static getLocalAddress(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getLocalPort()

Returns the server local port number handling the request.

> ```ts
> static getLocalPort(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

#### getInputStream()

Returns the request body as a binary input stream.

Useful for processing binary uploads.

> ```ts
> static getInputStream(): InputStream;
> ```
>
>
> ::: info Returns
> - **Type**: `InputStream`
> - **Description**: 
> :::

