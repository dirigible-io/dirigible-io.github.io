---
title: XML
---

XML
===

XML object is used to transfrom from JSON to XML and vice versa.

=== "Overview"
- Module: `utils/v4/xml`
- Alias: `utils/xml`
- Definition: [https://github.com/eclipse/dirigible/issues/28](https://github.com/eclipse/dirigible/issues/28)
- Source: [/utils/v4/xml.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/xml.js)
- Facade: [Xml2JsonFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/Xml2JsonFacade.java)
- Status: `stable`


### Basic Usage

```javascript
var xml = require("utils/v4/xml");
var response = require("http/v4/response");

var jsonInput = {
    firstName: "John",
    lastName: "Doe",
    bio: {
        age: 24,
        sex: "male"
    }
};

var xmlInput = 
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
