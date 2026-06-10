# Env

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.core`
- source: [core/Env.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/core/Env.java)
:::

Read-only view of process environment variables. `get(String)` returns a single value, `list()` returns the full map as a JSON document — handy for debug endpoints or feature-flag inspection from an admin UI.

Note that for configuration knobs that *also* have a `DIRIGIBLE_*` configuration key (`Configuration.get(...)` or `Configurations`) you should usually read the configuration value, not the raw env var — the configuration layer also honours `DIRIGIBLE_*` property files and runtime overrides.

### Key Features

- **Read-only**: There is no `set` — env vars are immutable from the JVM's perspective.
- **JSON dump**: `list()` returns the full environment as JSON, ready to feed to a UI or log.
- **Static API**: No instance, no state — just call the methods.

### Example Usage

```java
import org.eclipse.dirigible.sdk.core.Env;

// Read a single variable
String home = Env.get("HOME");

// Get the entire environment as a JSON document
String envJson = Env.list();
```

## Methods

### get()

Retrieves the value of the named environment variable.

> ```java
> public static String get(String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `String` | The environment variable name. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The environment value, or `null` if the variable is not set.
> :::

### list()

Returns the full process environment as a JSON document.

> ```java
> public static String list();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A JSON string mapping every environment variable name to its value.
> :::
