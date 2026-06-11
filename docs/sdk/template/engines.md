# TemplateEngines

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.template`
- source: [template/TemplateEngines.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/template/TemplateEngines.java)
:::

Renders a template against a JSON parameter document. Three engines are available:

- **Mustache** - logic-less; perfect for emails and HTML fragments.
- **Velocity** - Apache Velocity with the platform's default tool set.
- **JavaScript** - evaluates `${expr}` fragments through GraalJS for the full power of script expressions inside the template.

`generate(template, parametersJson)` picks the default engine (Mustache); the named variants are for explicit choice. The five-argument `generate` overload lets you change the marker pair (the Mustache defaults are double curly braces) - useful when the template body itself contains the delimiter characters.

### Key Features:
- **Three engines** - pick the one that suits the template style.
- **Custom markers** - override start / end delimiters per call.
- **JSON parameter document** - consistent JSON shape across the platform.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.template.TemplateEngines;

String out = TemplateEngines.generate(
    "Hello, {{name}}!",
    "{\"name\":\"Alice\"}");

String html = TemplateEngines.generateMustache(
    "<p>Order {{orderId}} total {{amount}}</p>",
    "{\"orderId\":\"42\",\"amount\":\"1299.00\"}");
```

## Methods

### generate()

Renders a template using the default (Mustache) engine.

> ```java
> public static String generate(String template, String parametersJson) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `template` | `String` | Template body. |
> | `parametersJson` | `String` | JSON document supplying the substitution values. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: Rendered output.
> :::

### generateMustache()

Renders explicitly with the Mustache engine.

> ```java
> public static String generateMustache(String template, String parametersJson) throws IOException;
> ```

### generateVelocity()

Renders with Apache Velocity.

> ```java
> public static String generateVelocity(String template, String parametersJson) throws IOException;
> ```

### generateJavascript()

Renders with the JavaScript engine - `${expr}` fragments are evaluated through GraalJS.

> ```java
> public static String generateJavascript(String template, String parametersJson) throws IOException;
> ```

### generate() - custom markers

Renders with custom delimiter markers (defaults vary per engine).

> ```java
> public static String generate(String location, String template, String parametersJson,
>     String startMarker, String endMarker) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `location` | `String` | Optional source label used in error messages. |
> | `template` | `String` | Template body. |
> | `parametersJson` | `String` | JSON document with substitution values. |
> | `startMarker` | `String` | Opening delimiter (e.g. `<%`). |
> | `endMarker` | `String` | Closing delimiter (e.g. `%>`). |
