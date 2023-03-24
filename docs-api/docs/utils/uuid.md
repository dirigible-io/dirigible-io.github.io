---
title: UUID
---

UUID
===

UUID object is used to generate random universally unique identifiers.

=== "Overview"
- Module: `utils/uuid`
- Definition: [https://github.com/eclipse/dirigible/issues/27](https://github.com/eclipse/dirigible/issues/27)
- Source: [/utils/uuid.js](https://github.com/eclipse/dirigible/blob/master/components/api-utils/src/main/resources/META-INF/dirigible/utils/uuid.js)
- Status: `stable`

### Basic Usage

```javascript
var uuid = require("utils/uuid");
var response = require("http/response");

response.println(uuid.random());
response.println(uuid.validate("14a3ddce-f86d-4f51-a2e0-6e497b94bbe5"));

response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**random()**   | Returns a random UUID string | *string*
**validate(input)**   | Validates whether the provided input is a valid UUID string | *boolean*
