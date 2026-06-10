# Xml

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/Xml.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/Xml.java)
:::

XML ↔ JSON conversion via the platform's Jackson XML mapper. Use this to consume legacy SOAP responses without writing schema-derived bindings, or to emit XML payloads from data already shaped as JSON.

The conversion is structural — element / attribute names become JSON keys, text nodes become string values, repeated elements become arrays. Round-tripping is reliable for tree-shaped documents; mixed-content XML (text interleaved with elements) loses some fidelity.

### Key Features:
- **Jackson XML-backed** — same conversion rules across the platform.
- **String in / string out** — no streaming or DOM bookkeeping.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.Xml;

String json = Xml.toJson("<order><id>42</id><amount>1299</amount></order>");
String xml  = Xml.fromJson("{\"order\":{\"id\":\"42\",\"amount\":\"1299\"}}");
```

## Methods

### toJson()

Converts an XML document into its JSON representation.

> ```java
> public static String toJson(String xml) throws Exception;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `xml` | `String` | XML document. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The JSON form of the input.
> :::

### fromJson()

Converts a JSON document into XML.

> ```java
> public static String fromJson(String json) throws Exception;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `json` | `String` | JSON document. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The XML form of the input. |
> :::
