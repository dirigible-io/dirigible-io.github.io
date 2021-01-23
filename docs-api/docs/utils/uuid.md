---
title: UUID
---

UUID
===

UUID object is used to generate random universally unique identifiers.

=== "Overview"
- Module: `utils/v4/uuid`
- Alias: `utils/uuid`
- Definition: [https://github.com/eclipse/dirigible/issues/27](https://github.com/eclipse/dirigible/issues/27)
- Source: [/utils/v4/uuid.js](https://github.com/dirigiblelabs/api-utils/blob/master/utils/v4/uuid.js)
- Facade: [UuidFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-utils/src/main/java/org/eclipse/dirigible/api/v3/utils/UuidFacade.java)
- Status: `stable`

### Basic Usage

```javascript
var uuid = require("utils/v4/uuid");
var response = require("http/v4/response");

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
