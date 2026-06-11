# Globals

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.core`
- source: [core/Globals.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/core/Globals.java)
:::

Application-wide global variables - values survive across requests and across all tenants in the JVM (so be careful in multi-tenant deployments). Strictly typed to `String` (use JSON encoding for richer payloads); for richer types or per-tenant scoping prefer the `Cache` or a database table.

Globals are commonly set once at startup (a `@Scheduled` job, a controller endpoint triggered on deploy) and read frequently from the rest of the application.

### Key Features

- **JVM-wide scope**: Values are visible from any thread, any request, any tenant.
- **Survives requests**: Unlike `Context`, the value persists until the JVM restarts or it is overwritten.
- **String-only values**: For richer payloads, encode as JSON before storing.
- **Static API**: `public static` methods backed by the platform `GlobalsFacade`.

### Example Usage

```java
import org.eclipse.dirigible.sdk.core.Globals;

// At startup
Globals.set("appVersion", "1.7.3");
Globals.set("featureMatrix", "{\"reportsV2\":true,\"darkMode\":true}");

// Anywhere later
String version = Globals.get("appVersion");

// Dump all globals (as JSON)
String json = Globals.list();
```

## Methods

### get()

Retrieves the global value associated with the given name.

> ```java
> public static String get(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | The global variable name. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The stored value, or `null` if no global is set under that name.
> :::

### set()

Stores a global value under the given name.

> ```java
> public static void set(String name, String value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | The global variable name. |
> | `value` | `String` | The value to store. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### list()

Returns all globals currently set in the JVM as a JSON document.

> ```java
> public static String list();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON string mapping every global name to its value.
> :::
