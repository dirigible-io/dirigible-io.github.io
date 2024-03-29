---
title: Sequence
---

Sequence
===

Functionality for manipulating the database sequence objects.

=== "Overview"
- Module: `db/sequence`
- Definition: [https://github.com/eclipse/dirigible/issues/124](https://github.com/eclipse/dirigible/issues/124)
- Source: [/db/sequence.js](https://github.com/eclipse/dirigible/blob/master/components/api-database/src/main/resources/META-INF/dirigible/db/sequence.js)
- Status: `stable`
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { sequence } from "sdk/db";
    import { response } from "sdk/http";

    let value = sequence.nextval("MYSEQUENCE");

    response.println(value.toString());
    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const sequence = require("db/sequence");
    const response = require("http/response");

    let value = sequence.nextval("MYSEQUENCE");

    response.println(value.toString());
    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**nextval(name, databaseType?, datasourceName?)**   | Increment the sequence with the given *name* and returns the value. Creates the sequence implicitly if it deos not exist. | *integer*
**create(name, databaseType?, datasourceName?)**   | Creates the sequence by the given *name*. | -
**drop(name, databaseType?, datasourceName?)**   | Remove the sequence by the given *name*. | -
