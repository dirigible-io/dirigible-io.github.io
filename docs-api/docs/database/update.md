---
title: Update
---

Update
===


Simplified update functionality, accepts SQL script and query parameters and returns the result-set as a JSON object.

=== "Overview"
- Module: `db/update`
- Definition: [https://github.com/eclipse/dirigible/issues/49](https://github.com/eclipse/dirigible/issues/49)
- Source: [/db/update.js](https://github.com/eclipse/dirigible/blob/master/components/api-database/src/main/resources/META-INF/dirigible/db/update.js)
- Status: `stable`
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { query, update } from "sdk/db";
    import { response } from "sdk/http";
    
    update.execute("CREATE TABLE MY_TABLE (COLUMN_A INT)", [], "DefaultDB");
    
    update.execute("INSERT INTO MY_TABLE VALUES (1)", [], "DefaultDB");
    
    let resultSetBefore = query.execute("SELECT COLUMN_A FROM MY_TABLE", [], "DefaultDB");
    response.println("Value before update: " + JSON.stringify(resultSetBefore));
    
    update.execute("UPDATE MY_TABLE SET COLUMN_A = 2", [], "DefaultDB");
    
    let resultSetAfter = query.execute("SELECT COLUMN_A FROM MY_TABLE", [], "DefaultDB");
    response.println("Value after update: " + JSON.stringify(resultSetAfter));
    
    update.execute("DROP TABLE MY_TABLE", [], "DefaultDB");
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**execute(sql, parameters?, datasourceName?)**   | Executes a SQL update against the selected *datasourceName* with the provided parameters and returns the number of affected rows | *int*
**executeNamed(sql, parameters?, datasourceName?)**   | Executes a SQL update against the selected *datasourceName* with the provided parameters and returns the number of affected rows | *int*

> parameters array supports primitives e.g. [1, 'John', 34.56] or objects in format {'type':'[DATA_TYPE]', 'value':[VALUE]} e.g. [1, {'type':'CHAR', 'value':'ISBN19202323322'}]
> named parameters array supports objects in format {'name':[PARAM_NAME] 'type':'[DATA_TYPE]', 'value':[VALUE]} e.g. [1, {'name':'isbn', 'type':'CHAR', 'value':'ISBN19202323322'}]
