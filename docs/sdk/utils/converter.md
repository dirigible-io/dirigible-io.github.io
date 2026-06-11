# Converter

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/Converter.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/Converter.java)
:::

Quick JSON serialization helpers around Jackson's default `ObjectMapper`. Convenient when you just need `String` / object conversion without configuring a mapper instance - for non-trivial schemas (custom serializers, mixed polymorphism, date format overrides) inject a Jackson `ObjectMapper` bean instead.

XML conversion lives in [`Xml`](./xml.md); CSV parsing requires a dedicated library (Apache Commons CSV or OpenCSV) - this class deliberately does not pretend to handle quoting and escaping around the edges of CSV semantics.

### Key Features:
- **Default Jackson `ObjectMapper`**: Shared static instance - zero configuration on the call site.
- **Typed and untyped parsing**: `fromJson(String, Class)` for typed bindings, `fromJson(String)` for `Map`/`List` shapes.
- **Wrapping exception**: Jackson's checked `JsonProcessingException` is wrapped as `IllegalArgumentException` for ergonomic call sites.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.Converter;
import java.util.Map;

// Serialize to JSON
String json = Converter.toJson(Map.of("name", "Eclipse Dirigible", "version", 13));
// → {"name":"Eclipse Dirigible","version":13}

// Untyped parse - comes back as Map / List / primitives
Object generic = Converter.fromJson(json);

// Typed parse
record Project(String name, int version) {}
Project project = Converter.fromJson(json, Project.class);
```

## Methods

### toJson()
Serializes the supplied object to a JSON string using the default `ObjectMapper`.

> ```java
> public static String toJson(Object input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `Object` | The value to serialize. May be a POJO, `Map`, `List`, primitive, or array. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The JSON-serialized form of `input`. Throws `IllegalArgumentException` (wrapping Jackson's `JsonProcessingException`) if serialization fails.
> :::

### fromJson()
Parses a JSON string. The single-argument overload returns a generic `Object` graph (`Map`/`List`/primitives); the two-argument overload binds the JSON to the supplied type.

> ```java
> public static <T> T fromJson(String input, Class<T> type);
> public static Object fromJson(String input);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `String` | The JSON text to parse. |
> | `type` | `Class<T>` | Target type to bind to (only on the typed overload). |
>
> ::: info Returns
> - **Type**: `T` (typed overload) or `Object` (untyped overload)
> - **Description**: The deserialized value. Throws `IllegalArgumentException` (wrapping Jackson's `JsonProcessingException`) if parsing fails.
> :::
