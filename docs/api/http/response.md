# Response

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/response.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/response.ts)
- last updated: 
:::

The `Response` class provides a static façade for managing the HTTP response in a server context. It wraps a native Java HTTP response object, offering methods for setting status codes, headers, cookies, and writing content (text, JSON, or binary) to the response body. The class also includes constants for standard HTTP status codes and a mapping of these codes to their reason phrases as defined in RFC 7231.

### Key Features:
- **HTTP Status Codes**: Provides constants for all standard HTTP status codes, making it easier to set response statuses without memorizing numeric values.
- **Content Writing**: Methods for writing text, JSON, or binary data to the response body, with proper handling of character encoding.
- **Header Management**: Methods for setting and adding headers, as well as checking for existing headers.
- **Cookie Management**: A method for adding cookies to the response, with support for cookie attributes.
- **Response Control**: Methods for flushing and closing the response output stream, sending redirects and errors, and resetting the response.

### Use Cases:
- **API Development**: Used in HTTP controllers to construct responses to client requests in a structured and consistent manner.
- **Web Application Development**: Useful in any server-side code that needs to send HTTP responses, such as rendering HTML pages or serving files.

### Example Usage:
```ts
import { Response } from "@aerokit/sdk/http";

// Sending a JSON response with a 200 OK status
Response.setStatus(Response.OK);
Response.json({ message: "Hello, world!" });

// Sending a plain text response with a custom header
Response.setHeader("X-Custom-Header", "CustomValue");
Response.print("This is a plain text response.");

// Adding a cookie to the response
Response.addCookie({
    name: "sessionId",
    value: "abc123",
    attributes: {
        maxAge: "3600",
        path: "/"
    }
});
```

## Classes

### Response

#### isValid()

Checks if the response façade is currently valid or connected to an active request context.

> ```ts
> static isValid(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if valid, false otherwise.
> :::

#### json()

Serializes a JavaScript object to JSON, sets the `Content-Type: application/json` header,
and writes the JSON string to the response output stream.

> ```ts
> static json(obj: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `obj` | `any` | The JavaScript object to be serialized and sent. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### print()

Writes a string of text to the response body using **UTF-8** encoding.
Note: This method automatically handles flushing the output stream.

> ```ts
> static print(text: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `text` | `string` | The string content to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### println()

Writes a string of text followed by a newline character (`\n`) to the response body
using **UTF-8** encoding.

> ```ts
> static println(text: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `text` | `string` | The string content to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### write()

Writes an array of bytes directly to the response output stream, typically used for binary data.

> ```ts
> static write(bytes: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `bytes` | `any` | The array of bytes to write. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### isCommitted()

Checks if the response headers and status have already been sent to the client.

> ```ts
> static isCommitted(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the response is committed, false otherwise.
> :::

#### setContentType()

Sets the value of the `Content-Type` header.

> ```ts
> static setContentType(contentType: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `contentType` | `string` | The MIME type string (e.g., 'text/html', 'application/pdf'). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### flush()

Forces any buffered output to be written to the client.

> ```ts
> static flush(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### close()

Closes the response output stream.

> ```ts
> static close(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addCookie()

Adds a cookie to the response. The cookie object is serialized to JSON before being passed
to the underlying Java facade.

> ```ts
> static addCookie(cookie: Cookie): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `cookie` | `Cookie` | The cookie definition object. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### containsHeader()

Checks if a response header with the specified name has already been set.

> ```ts
> static containsHeader(name: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the header. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the header exists, false otherwise.
> :::

#### encodeURL()

Encodes a URL for use in redirects or forms, including session information if necessary.

> ```ts
> static encodeURL(url: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The URL to encode. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The encoded URL string.
> :::

#### getCharacterEncoding()

Gets the character encoding used for the response body.

> ```ts
> static getCharacterEncoding(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The character encoding string.
> :::

#### encodeRedirectURL()

Encodes a URL for use in the `Location` header of a redirect response.

> ```ts
> static encodeRedirectURL(url: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `string` | The redirect URL to encode. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The encoded redirect URL string.
> :::

#### getContentType()

Gets the current `Content-Type` header value.

> ```ts
> static getContentType(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The content type string.
> :::

#### sendError()

Sends an HTTP error response to the client with the specified status code and optional message.
This bypasses the normal response body writing process.

> ```ts
> static sendError(status: number, message: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `status` | `number` | The HTTP status code (e.g., 404, 500). |
> | `message` | `string` | An optional message to include in the error response. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setCharacterEncoding()

Sets the character encoding to be used for the response body (e.g., 'UTF-8').

> ```ts
> static setCharacterEncoding(charset: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `charset` | `string` | The character set string. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sendRedirect()

Sends a redirect response (status code 302 by default) to the client.

> ```ts
> static sendRedirect(location: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `location` | `string` | The new URL to redirect the client to. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setContentLength()

Sets the `Content-Length` header for the response.

> ```ts
> static setContentLength(length: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `length` | `number` | The size of the response body in bytes. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setHeader()

Sets a response header with the given name and value. If the header already exists, its value is overwritten.

> ```ts
> static setHeader(name: string, value: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the header. |
> | `value` | `string` | The value of the header. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addHeader()

Adds a response header with the given name and value. If the header already exists, a second header with the same name is added.

> ```ts
> static addHeader(name: string, value: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the header. |
> | `value` | `string` | The value of the header. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setStatus()

Sets the HTTP status code for the response.

> ```ts
> static setStatus(status: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `status` | `number` | The integer status code (e.g., 200, 404). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### reset()

Clears all buffers, status code, and headers from the response, allowing a new response to be generated.
This is only possible if the response has not yet been committed.

> ```ts
> static reset(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getHeader()

Gets the value of a specific header. If multiple headers with the same name exist, it returns the first one.

> ```ts
> static getHeader(name: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the header. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The header value string.
> :::

#### setLocale()

Sets the locale for the response, which may affect language and date/time formatting.

> ```ts
> static setLocale(language: string, country: string, variant: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `language` | `string` | The language code (e.g., 'en', 'fr'). |
> | `country` | `string` | The optional country code (e.g., 'US', 'GB'). |
> | `variant` | `string` | The optional variant code. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getHeaders()

Gets all header values for a specific header name as an array of strings.

> ```ts
> static getHeaders(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the header. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of header values.
> :::

#### getHeaderNames()

Gets the names of all headers that have been set on the response.

> ```ts
> static getHeaderNames(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of header names.
> :::

#### getLocale()

Gets the currently set locale string for the response.

> ```ts
> static getLocale(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The locale string.
> :::

#### getOutputStream()

Gets the underlying output stream object, wrapped in the SDK's `OutputStream` class.
This is useful for writing raw or large amounts of data.

> ```ts
> static getOutputStream(): OutputStream;
> ```
>
>
> ::: info Returns
> - **Type**: `OutputStream`
> - **Description**: The output stream object.
> :::

