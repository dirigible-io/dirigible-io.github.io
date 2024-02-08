---
title: User
---

User
===

User gives the information about the currently logged in user, if any.

=== "Overview"
- Module: `security/user`
- Definition: [https://github.com/eclipse/dirigible/issues/17](https://github.com/eclipse/dirigible/issues/17)
- Source: [/security/user.js](https://github.com/eclipse/dirigible/blob/master/components/api-security/src/main/resources/META-INF/dirigible/security/user.js)
- Status: `stable`
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { user } from "sdk/security";
    import { response } from "sdk/http";

    response.println("[UserName]: " + user.getName());
    response.println("[Is in Role]: " + user.isInRole("Developer"));
    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const user = require("security/user");
    const response = require("http/response");

    response.println("[UserName]: " + user.getName());
    response.println("[Is in Role]: " + user.isInRole("Developer"));
    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | Returns the name of the currently logged in user, if any or null | *string*
**isInRole(role)**   | Returns true if the user has a given *role* and false otherwise | *boolean*
