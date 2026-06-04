# Values

## Overview

::: tip Module
- package: `@aerokit/sdk/bpm`
- source: [bpm/values.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/bpm/values.ts)
- last updated: 
:::

The `Values` class provides utility methods for serializing and deserializing complex variable values (such as objects and arrays) to and from JSON strings. This is particularly useful for handling process variables in BPMN processes, where variables may need to be stored or transferred across API boundaries in a consistent format.

### Key Features
- **parseValue**: Safely attempts to parse a string value as JSON, returning the original value if parsing fails.
- **parseValuesMap**: Applies JSON parsing to all values in a Map, allowing for bulk deserialization of process variables.
- **stringifyValue**: Converts objects and arrays into their JSON string representations, while leaving primitive types unchanged. Arrays are also converted into Java Lists for compatibility with Java APIs.
- **stringifyValuesMap**: Applies JSON stringification to all values in a Map, enabling bulk serialization of process variables before API calls.

### Use Cases
- Managing complex process variables in BPMN processes, including objects and arrays.
- Ensuring consistent serialization and deserialization of variables when interacting with APIs that expect string values.
- Facilitating the transfer of structured data across API boundaries in a format that can be easily parsed and utilized.

## Classes

### Values

#### parseValue()

Attempts to parse a value as a JSON string.
If the value is a valid JSON string (representing an object or array), it is parsed and returned as an object.
If parsing fails (e.g., the value is a primitive or an invalid JSON string), the original value is returned.

> ```ts
> static parseValue(value: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` | The value to parse, typically a string read from the API. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The parsed object, or the original value if parsing fails.
> :::

#### parseValuesMap()

Iterates over the values of a Map and applies #parseValue(any) to each value.
This is typically used to deserialize all variables returned from an API call.

> ```ts
> static parseValuesMap(variables: Map): Map;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `variables` | `Map` | The Map of variable names to their values (which may be JSON strings). |
>
> ::: info Returns
> - **Type**: `Map`
> - **Description**: The Map with all values deserialized where possible.
> :::

#### stringifyValue()

Serializes a value for persistence or API transfer.
Arrays and objects are converted into their respective JSON string representations.
Note: Arrays are additionally converted into a `java.util.List` of stringified elements for Java API compatibility.
Primitive types are returned as is.

> ```ts
> static stringifyValue(value: any): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `any` | The value to serialize. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The JSON string representation, a Java List (for arrays), or the original primitive value.
> :::

#### stringifyValuesMap()

Iterates over the values of a Map and applies #stringifyValue(any) to each value.
This is typically used to serialize a map of variables before sending them to an API call.

> ```ts
> static stringifyValuesMap(variables: Map): Map;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `variables` | `Map` | The Map of variable names to their values. |
>
> ::: info Returns
> - **Type**: `Map`
> - **Description**: The Map with all values serialized.
> :::

