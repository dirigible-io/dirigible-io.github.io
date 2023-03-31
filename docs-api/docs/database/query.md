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


### Basic Usage

=== "ECMA6"

    ```javascript
    import { query } from "@dirigible/db";
    import { response } from "@dirigible/http";

    let sql = "SELECT * FROM DIRIGIBLE_EXTENSIONS WHERE EXTENSION_EXTENSIONPOINT_NAME = ?";
    let resultset = query.execute(sql, ["ide-editor"], "SystemDB");

    response.println(JSON.stringify(resultset));

    response.flush();
    response.close();
    ```

=== "Require"

    ```javascript
    var query = require("db/query");
    var response = require("http/response");

    var sql = "SELECT * FROM DIRIGIBLE_EXTENSIONS WHERE EXTENSION_EXTENSIONPOINT_NAME = ?";
    var resultset = query.execute(sql, ["ide-editor"], "SystemDB");

    response.println(JSON.stringify(resultset));

    response.flush();
    response.close();
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**execute(sql, parameters?, datasourceName?)**   | Executes a SQL query against the selected *datasourceName* with the provided parameters | *result-set as JSON object*

> parameters array supports primitives e.g. [1, 'John', 34.56] or objects in format {'type':'[DATA_TYPE]', 'value':[VALUE]} e.g. [1, {'type':'CHAR', 'value':'ISBN19202323322'}]
