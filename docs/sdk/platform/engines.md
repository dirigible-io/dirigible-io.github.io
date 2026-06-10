# Engine

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.platform`
- source: [platform/Engine.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/platform/Engine.java)
:::

Invokes another scripting engine on a file in the registry — most often GraalJS, occasionally Python or another GraalVM polyglot engine. The `parameters` map is forwarded into the engine's global scope and the engine's natural return value is propagated back.

Useful for hybrid workflows where a Java controller delegates a step to a script in another language (or vice versa) — Dirigible's polyglot runtime lets every language share the same in-process services. For pure in-Java composition prefer regular method calls; spinning up an engine has non-trivial cost compared to invoking a `Component` bean directly.

### Key Features

- **Polyglot dispatch**: Run a registry-hosted script (JavaScript, TypeScript, Python, …) from Java without an HTTP hop.
- **Parameter passing**: The supplied `Map` is exposed in the engine's global scope.
- **Debug flag**: The full overload supports a `debug` toggle for breakpoint-friendly execution.
- **Engine discovery**: `listEngines()` returns the registered engine type names.

### Example Usage

```java
import java.util.Map;
import org.eclipse.dirigible.sdk.platform.Engine;

// Run a registry script in another language with a parameter map:
Object result = Engine.execute(
    "javascript",
    "demo",
    "demo/handlers/hello.ts",
    Map.of("name", "world")
);

// List the registered engine types:
String types = Engine.listEngines();
```

## Methods

### execute()

Executes a registry file under the given engine type with an empty parameter map.

> ```java
> public static Object execute(String type, String project, String filePath) throws Exception;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `type` | `String` | The engine type — e.g. `"javascript"`, `"python"`. |
> | `project` | `String` | The project name under `/registry/public/`. |
> | `filePath` | `String` | The path to the script file inside the project. |
>
> ::: info Returns
> - **Type**: `Object`
> - **Description**: The engine's natural return value.
> :::

### execute()

Executes a registry file under the given engine type, passing a parameter map into the engine's global scope.

> ```java
> public static Object execute(String type, String project, String filePath, Map<Object, Object> parameters) throws Exception;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `type` | `String` | The engine type — e.g. `"javascript"`, `"python"`. |
> | `project` | `String` | The project name under `/registry/public/`. |
> | `filePath` | `String` | The path to the script file inside the project. |
> | `parameters` | `Map<Object, Object>` | Values to expose in the engine's global scope. |
>
> ::: info Returns
> - **Type**: `Object`
> - **Description**: The engine's natural return value.
> :::

### execute()

Full-form execute with a path parameter, parameter map, and a debug toggle.

> ```java
> public static Object execute(String type, String project, String filePath, String pathParam, Map<Object, Object> parameters, boolean debug)
>         throws Exception;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `type` | `String` | The engine type — e.g. `"javascript"`, `"python"`. |
> | `project` | `String` | The project name under `/registry/public/`. |
> | `filePath` | `String` | The path to the script file inside the project. |
> | `pathParam` | `String` | An optional path parameter forwarded into the engine. |
> | `parameters` | `Map<Object, Object>` | Values to expose in the engine's global scope. |
> | `debug` | `boolean` | When `true`, runs the engine in debug mode (breakpoints honoured). |
>
> ::: info Returns
> - **Type**: `Object`
> - **Description**: The engine's natural return value.
> :::

### listEngines()

Returns the set of registered scripting-engine type names.

> ```java
> public static String listEngines();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A serialized list of engine type identifiers (e.g. `"javascript"`, `"python"`).
> :::
