---
title: XML
---

XML
===

XML object is used to transfrom from JSON to XML and vice versa.

=== "Overview"
- Module: `utils/xml`
- Definition: [https://github.com/eclipse/dirigible/issues/28](https://github.com/eclipse/dirigible/issues/28)
- Source: [/utils/xml.js](https://github.com/eclipse/dirigible/blob/master/components/api-utils/src/main/resources/META-INF/dirigible/utils/xml.js)
- Status: `stable`
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { xml } from "@dirigible/utils";
    import { response } from "@dirigible/http";

    const jsonInput = {
        firstName: "John",
        lastName: "Doe",
        bio: {
            age: 24,
            sex: "male"
        }
    };

    const xmlInput =
        "<person>" +
        "<firstName>John</firstName>" +
        "<lastName>Doe</lastName>" +
        "<bio>" +
        "<age>24</age>" +
        "<sex>male</sex>" +
        "</bio>" +
        "</person>";

    response.println(xml.fromJson(JSON.stringify(jsonInput)));
    response.println(xml.toJson(xmlInput));

    response.flush();
    response.close();
    ```

=== "CommonJS"

    ```javascript
    const xml = require("utils/xml");
    const response = require("http/response");

    const jsonInput = {
        firstName: "John",
        lastName: "Doe",
        bio: {
            age: 24,
            sex: "male"
        }
    };

    const xmlInput =
        "<person>" +
        "<firstName>John</firstName>" +
        "<lastName>Doe</lastName>" +
        "<bio>" +
        "<age>24</age>" +
        "<sex>male</sex>" +
        "</bio>" +
        "</person>";

    response.println(xml.fromJson(JSON.stringify(jsonInput)));
    response.println(xml.toJson(xmlInput));

    response.flush();
    response.close();
    ```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**fromJson(json)**   | Converts a JSON to a XML string | *string*
**toJson(xml)**   | Converts a XML to JSON string | *string*
