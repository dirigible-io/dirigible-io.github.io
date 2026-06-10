# Context

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.core`
- source: [core/Context.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/core/Context.java)
:::

Per-request scratch storage bound to the calling thread. Useful for passing values from a filter or interceptor down to a controller method without threading the data through every method signature — for example user-derived language preferences, correlation ids, request-scoped feature flags.

Values are *not* persisted across requests. For longer-lived global state use `Globals`; for the actual HTTP session-scoped storage use `org.eclipse.dirigible.sdk.http.Session`.

### Key Features

- **Thread-bound**: Values are visible only to the thread that wrote them.
- **Request-scoped**: Cleared between requests — no leak across calls.
- **Untyped values**: Stores arbitrary `Object`s, so the caller is responsible for cast safety.

### Example Usage

```java
import org.eclipse.dirigible.sdk.core.Context;

// In a request filter / interceptor:
Context.set("correlationId", request.getHeader("X-Correlation-Id"));
Context.set("locale", resolveLocale(request));

// Later, in a controller or service:
String correlationId = (String) Context.get("correlationId");
```

## Methods

### get()

Retrieves the value previously set under the given name on the current thread, or `null` if none.

> ```java
> public static Object get(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | The context key. |
>
> ::: info Returns
> - **Type**: `Object`
> - **Description**: The stored value, or `null` if no value is set under that name.
> :::

### set()

Stores a value under the given name in the current thread's context.

> ```java
> public static void set(String name, Object value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | The context key. |
> | `value` | `Object` | The value to store. |
>
> ::: info Returns
> - **Type**: `void`
> :::
