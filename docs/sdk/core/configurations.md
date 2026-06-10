# Configurations

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.core`
- source: [core/Configurations.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/core/Configurations.java)
:::

Reads platform configuration values through the Dirigible `Configuration` layer — the same source the rest of Dirigible consults for `DIRIGIBLE_*` env vars, `application*.properties` entries, and runtime overrides. Use this rather than `System.getenv(String)` so the precedence rules (env &gt; property file &gt; default) apply consistently with the rest of the platform.

For lists of supported keys see `DirigibleConfig` in `modules/commons/commons-config`; that enum is the canonical inventory.

### Key Features

- **Unified precedence**: Reads from env vars, property files, and runtime overrides in the same order the rest of Dirigible does.
- **Static API**: All methods are `public static` — no instance needed.
- **Mutable at runtime**: `set` and `remove` adjust the live configuration for the JVM.
- **Default value fallback**: The two-arg `get` returns a caller-supplied default when the key is absent.

### Example Usage

```java
import org.eclipse.dirigible.sdk.core.Configurations;

// Read with a default fallback
String endpoint = Configurations.get("DIRIGIBLE_API_ENDPOINT", "https://localhost:8080");

// Probe whether a key is set
if (Configurations.has("DIRIGIBLE_FEATURE_BETA")) {
    // ...
}

// Override at runtime
Configurations.set("MY_APP_REGION", "eu-central-1");

// Remove a key
Configurations.remove("MY_APP_REGION");
```

## Methods

### get()

Retrieves the configuration value associated with the given key. Returns `null` if the key is not set.

> ```java
> public static String get(String key);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `String` | The configuration key. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The configuration value, or `null` if the key is not set.
> :::

### get() with default

Retrieves the configuration value associated with the given key, returning a caller-supplied default when the key is not set.

> ```java
> public static String get(String key, String defaultValue);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `String` | The configuration key. |
> | `defaultValue` | `String` | The value to return if the key is not set. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The configuration value, or `defaultValue` if the key is not set.
> :::

### has()

Reports whether a configuration value is set for the given key.

> ```java
> public static boolean has(String key);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `String` | The configuration key. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if the key resolves to a non-null value, `false` otherwise.
> :::

### set()

Sets or overwrites the configuration value for the given key at runtime.

> ```java
> public static void set(String key, String value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `String` | The configuration key. |
> | `value` | `String` | The value to set. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### remove()

Removes the configuration entry associated with the given key.

> ```java
> public static void remove(String key);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `String` | The configuration key to remove. |
>
> ::: info Returns
> - **Type**: `void`
> :::
