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
- Group: `core`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { uuid } from "sdk/utils";
    import { response } from "sdk/http";

    response.println(uuid.random());
    response.println(JSON.stringify(uuid.validate("14a3ddce-f86d-4f51-a2e0-6e497b94bbe5")));

    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const uuid = require("utils/uuid");
    const response = require("http/response");

    response.println(uuid.random());
    response.println(uuid.validate("14a3ddce-f86d-4f51-a2e0-6e497b94bbe5"));

    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**random()**   | Returns a random UUID string | *string*
**validate(input)**   | Validates whether the provided input is a valid UUID string | *boolean*
