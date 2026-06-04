# XML

## Overview

::: tip Module
- package: `@aerokit/sdk/utils`
- source: [utils/xml.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/utils/xml.ts)
- last updated: 
:::

The XML class provides static utility methods for converting data between XML and JSON formats. It abstracts the underlying native Java Xml2JsonFacade, allowing developers to easily perform these conversions in their JavaScript applications. The class automatically handles input serialization if a non-string object is passed, ensuring that the conversion methods can work seamlessly with both raw strings and JavaScript objects.

### Key Features:
- **JSON to XML Conversion**: Convert JSON data (either as a string or a JavaScript object) into an XML string representation.
- **XML to JSON Conversion**: Convert XML data (expected as a string) into a JSON formatted string.
- **Automatic Serialization**: If a JavaScript object is passed instead of a string, it is automatically serialized using JSON.stringify() before conversion.

### Use Cases:
- **Data Interchange**: Facilitate data interchange between systems that use different formats (e.g., REST APIs that accept XML but produce JSON).
- **Configuration Management**: Convert configuration data between XML and JSON formats for compatibility with different tools and libraries.
- **Legacy System Integration**: Integrate with legacy systems that require XML while allowing modern applications to work with JSON.

### Example Usage:
```ts
import { XML } from "@aerokit/sdk/utils";

// Convert a JSON object to XML
const jsonObject = { name: "John", age: 30 };
const xmlString = XML.fromJson(jsonObject);
console.log(xmlString); // Output: <name>John</name><age>30</age>

// Convert an XML string to JSON
const xmlInput = "<person><name>John</name><age>30</age></person>";
const jsonOutput = XML.toJson(xmlInput);
console.log(jsonOutput); // Output: {"person":{"name":"John","age":30}}
```

## Classes

### XML

#### fromJson()

Converts a JSON input (either a JSON string or a raw JavaScript object) into an XML string.

Note: If a JavaScript object is passed, it is first stringified using JSON.stringify().

> ```ts
> static fromJson(input: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The JSON string or object to be converted to XML. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The resulting XML content as a string.
> :::

#### toJson()

Converts an XML input (expected as an XML string) into a JSON formatted string.

> ```ts
> static toJson(input: any): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `input` | `any` | The XML string to be converted to JSON. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The resulting JSON content as a string.
> :::

