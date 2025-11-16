---
title: Query
---

Query
===


Simplified query functionality, accepts SQL script and query parameters and returns the result-set as a JSON object.

=== "Overview"
- Module: `db/query`
- Definition: [https://github.com/eclipse/dirigible/issues/48](https://github.com/eclipse/dirigible/issues/48)
- Source: [/db/query.js](https://github.com/eclipse/dirigible/blob/master/components/api-database/src/main/resources/META-INF/dirigible/db/query.js)
- Status: `stable`
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { query } from "sdk/db";
    import { response } from "sdk/http";

    const sql = "SELECT * FROM DIRIGIBLE_EXTENSIONS WHERE EXTENSION_EXTENSIONPOINT_NAME = ?";
    let resultset = query.execute(sql, ["platform-editors"], "SystemDB");

    response.println(JSON.stringify(resultset, null, 4));
    ```

### Typed Parameters Usage

=== "ECMA6"

    ```javascript
    import { query } from "sdk/db";
    import { response } from "sdk/http";
    
    const sql = "SELECT * FROM DIRIGIBLE_EXTENSIONS WHERE EXTENSION_EXTENSIONPOINT_NAME = ?";
    let resultset = query.execute(sql, [{ "type": "VARCHAR", "value": "platform-editors" }], "SystemDB");

    response.println(JSON.stringify(resultset, null, 4));
    ```

### Named Parameters Usage

=== "ECMA6"

    ```javascript
    import { query } from "sdk/db";
    import { response } from "sdk/http";
    
    const sql = "SELECT * FROM DIRIGIBLE_EXTENSIONS WHERE EXTENSION_EXTENSIONPOINT_NAME = :editor";
    let resultset = query.execute(sql, [{ "name": "editor", "type": "VARCHAR", "value": "platform-editors" }], "SystemDB");

    response.println(JSON.stringify(resultset, null, 4));
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**execute(sql, parameters?, datasourceName?)**   | Executes a SQL query against the selected *datasourceName* with the provided parameters | *result-set as JSON object*


> parameters array supports primitives e.g. `[1, 'John', 34.56]` or objects in format either `{'type':'[DATA_TYPE]', 'value':[VALUE]}` or `{'name':'[string]', 'type':'[DATA_TYPE]', 'value':[VALUE]}` e.g. `[{'type':'CHAR', 'value':'ISBN19202323322'}]` or `[{'name': 'order_number', 'type':'CHAR', 'value':'ISBN19202323322'}]`
