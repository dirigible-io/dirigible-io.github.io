# Response

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.http`
- source: [http/Response.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Response.java)
:::

Writes the outbound HTTP response bound to the calling thread — status, headers, cookies, body. Useful from `@Controller` methods that want to stream bytes, set explicit status codes, or send `30x` redirects.

Most controllers can rely on the dispatcher's automatic Jackson serialization of return values and reach for this class only at the edges (file downloads, binary responses, manual error shapes). `getNative()` hands back the underlying `HttpServletResponse` when you need a Servlet-only method.

### Key Features:
- **Thread-bound**: All methods operate on the response bound to the current thread.
- **Servlet Escape Hatch**: `getNative()` exposes the underlying `HttpServletResponse`.
- **Convenient Body Helpers**: `print`, `println`, and `write` cover the common cases of writing text or binary bytes; `getOutputStream()` is available for streaming.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.http.Response;

Response.setStatus(201);
Response.setContentType("application/json");
Response.setHeader("Location", "/services/java/orders/42");
Response.print("{\"id\":42}");
Response.flush();
```

## Methods

### getNative()

Returns the underlying Servlet response.

> ```java
> public static HttpServletResponse getNative();
> ```
>
> ::: info Returns
> - **Type**: `jakarta.servlet.http.HttpServletResponse`
> :::

### isValid()

Returns whether an HTTP response is bound to the current thread.

> ```java
> public static boolean isValid();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> :::

### print()

Writes the given text or object to the response body.

> ```java
> public static void print(String text);
> public static void print(Object o);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `text` | `String` | Text to write. |
> | `o` | `Object` | Object to write (converted via `toString()`). |

### println()

Writes the given text followed by a newline.

> ```java
> public static void println(String text);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `text` | `String` | Text to write. |

### write()

Writes raw bytes or a string to the response body.

> ```java
> public static void write(byte[] bytes);
> public static void write(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `bytes` | `byte[]` | Bytes to write. |
> | `input` | `String` | String to write. |

### isCommitted()

Returns whether the response has been committed (headers sent).

> ```java
> public static boolean isCommitted();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> :::

### setContentType()

Sets the response `Content-Type` header.

> ```java
> public static void setContentType(String contentType);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `contentType` | `String` | A media-type value. |

### getContentType()

Returns the response `Content-Type` header.

> ```java
> public static String getContentType();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### flush()

Flushes any buffered output to the client.

> ```java
> public static void flush();
> ```

### close()

Closes the response output stream.

> ```java
> public static void close();
> ```

### addCookie()

Adds a cookie to the response.

> ```java
> public static void addCookie(String cookieJson);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `cookieJson` | `String` | A JSON document describing the cookie (`name`, `value`, `path`, `maxAge`, `domain`, `secure`, `httpOnly`, …). |

### containsHeader()

Returns whether the response already contains the named header.

> ```java
> public static boolean containsHeader(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Header name. |
>
> ::: info Returns
> - **Type**: `boolean`
> :::

### encodeURL()

Encodes the given URL for use in this response, rewriting it to include the session ID if necessary.

> ```java
> public static String encodeURL(String url);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `String` | URL to encode. |
>
> ::: info Returns
> - **Type**: `String`
> :::

### encodeRedirectURL()

Encodes the given URL for use in a `sendRedirect` call.

> ```java
> public static String encodeRedirectURL(String url);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `url` | `String` | URL to encode. |
>
> ::: info Returns
> - **Type**: `String`
> :::

### sendError()

Sends an error response with the given status code (and optional message).

> ```java
> public static void sendError(int code, String message) throws IOException;
> public static void sendError(int code) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `code` | `int` | HTTP status code. |
> | `message` | `String` | Optional error message. |

### sendRedirect()

Sends a temporary redirect (`302`) response to the given location.

> ```java
> public static void sendRedirect(String location) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `location` | `String` | The redirect URL. |

### setCharacterEncoding()

Sets the response character encoding.

> ```java
> public static void setCharacterEncoding(String charset);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `charset` | `String` | Charset name (e.g. `UTF-8`). |

### getCharacterEncoding()

Returns the response character encoding.

> ```java
> public static String getCharacterEncoding();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### setContentLength()

Sets the `Content-Length` header.

> ```java
> public static void setContentLength(int length);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `length` | `int` | Body length in bytes. |

### setHeader()

Sets (replaces) a response header.

> ```java
> public static void setHeader(String name, String value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Header name. |
> | `value` | `String` | Header value. |

### addHeader()

Adds a response header (allowing multiple values).

> ```java
> public static void addHeader(String name, String value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Header name. |
> | `value` | `String` | Header value. |

### getHeader()

Returns the value of a response header.

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

### getHeaders()

Returns all values for a response header.

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

### getHeaderNames()

Returns the names of all response headers.

> ```java
> public static String getHeaderNames();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-encoded list of header names.
> :::

### setStatus()

Sets the HTTP status code.

> ```java
> public static void setStatus(int code);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `code` | `int` | HTTP status code. |

### reset()

Resets buffered output, headers, and status code.

> ```java
> public static void reset();
> ```

### setLocale()

Sets the response locale.

> ```java
> public static void setLocale(String language);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `language` | `String` | Language tag (e.g. `en`, `de-DE`). |

### getLocale()

Returns the response locale.

> ```java
> public static String getLocale();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getOutputStream()

Returns the raw response output stream — useful for streaming binary responses.

> ```java
> public static OutputStream getOutputStream() throws IOException;
> ```
>
> ::: info Returns
> - **Type**: `java.io.OutputStream`
> :::
