# Session

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.http`
- source: [http/Session.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/http/Session.java)
:::

Reads and writes the HTTP session attached to the current request - attributes, lifetime, invalidation. Sessions persist across requests for the lifetime configured by the platform (typically 30 minutes idle, configurable via `setMaxInactiveInterval(int)`).

Use sessions for short-lived per-user state that does not need to survive a server restart (form wizards, in-progress UI selections). For longer-lived state prefer a database table; for cross-user state prefer the `Cache` or `Globals` facade from `org.eclipse.dirigible.sdk.cache` / `org.eclipse.dirigible.sdk.core`.

### Key Features:
- **Per-Request Binding**: Operates on the session attached to the current thread's request - no instance to pass around.
- **String-Keyed Attributes**: Store and retrieve attribute values as strings (serialise more complex data through Jackson).
- **Lifetime Control**: Inspect creation / last-accessed timestamps and adjust the idle timeout.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.http.Session;

if (Session.isValid()) {
    Session.setAttribute("step", "review");
    String step = Session.getAttribute("step");
    Session.setMaxInactiveInterval(60 * 60); // 1 hour
}
```

## Methods

### isValid()

Returns whether a session is attached to the current request.

> ```java
> public static boolean isValid();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> :::

### getId()

Returns the unique session identifier.

> ```java
> public static String getId();
> ```
>
> ::: info Returns
> - **Type**: `String`
> :::

### getAttribute()

Returns the value of the named session attribute.

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

### getAttributeNames()

Returns the names of all session attributes.

> ```java
> public static String[] getAttributeNames();
> ```
>
> ::: info Returns
> - **Type**: `String[]`
> :::

### getAttributeNamesJson()

Returns the names of all session attributes as a JSON-encoded list.

> ```java
> public static String getAttributeNamesJson();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON-encoded list of attribute names.
> :::

### setAttribute()

Stores a value under the given attribute name.

> ```java
> public static void setAttribute(String name, String value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Attribute name. |
> | `value` | `String` | Attribute value. |

### removeAttribute()

Removes the named session attribute.

> ```java
> public static void removeAttribute(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | Attribute name. |

### getCreationTime()

Returns the time the session was created (milliseconds since epoch).

> ```java
> public static long getCreationTime();
> ```
>
> ::: info Returns
> - **Type**: `long`
> :::

### getLastAccessedTime()

Returns the time the session was last accessed (milliseconds since epoch).

> ```java
> public static long getLastAccessedTime();
> ```
>
> ::: info Returns
> - **Type**: `long`
> :::

### getMaxInactiveInterval()

Returns the idle timeout in seconds after which the session will be invalidated.

> ```java
> public static int getMaxInactiveInterval();
> ```
>
> ::: info Returns
> - **Type**: `int`
> :::

### setMaxInactiveInterval()

Sets the idle timeout in seconds.

> ```java
> public static void setMaxInactiveInterval(int seconds);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `seconds` | `int` | Idle timeout in seconds. |

### invalidate()

Invalidates the session, releasing all attributes.

> ```java
> public static void invalidate();
> ```

### isNew()

Returns whether the session was created by the current request (and thus not yet acknowledged by the client).

> ```java
> public static boolean isNew();
> ```
>
> ::: info Returns
> - **Type**: `boolean`
> :::
