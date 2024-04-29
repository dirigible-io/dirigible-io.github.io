---
title: Insert
---

Insert
===


Simplified insert functionality, accepts SQL script and query parameters.

=== "Overview"
- Module: `db/insert`
- Definition: 
- Source: 
- Status: `stable`
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { query, update, insert } from "sdk/db";
    import { response } from "sdk/http";
    
    update.execute("CREATE TABLE MY_TABLE (COLUMN_A INT)", [], "DefaultDB");
    
    insert.execute("INSERT INTO MY_TABLE VALUES (1)", [], "DefaultDB");
    
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
**execute(sql, parameters?, datasourceName?)**   | Executes a SQL insert against the selected *datasourceName* with the provided parameters and returns the number of affected rows | *int*
**executeNamed(sql, parameters?, datasourceName?)**   | Executes a SQL insert against the selected *datasourceName* with the provided parameters and returns the number of affected rows | *int*

> parameters array supports primitives e.g. [1, 'John', 34.56] or objects in format {'type':'[DATA_TYPE]', 'value':[VALUE]} e.g. [1, {'type':'CHAR', 'value':'ISBN19202323322'}]
> named parameters array supports objects in format {'name':[PARAM_NAME] 'type':'[DATA_TYPE]', 'value':[VALUE]} e.g. [1, {'name':'isbn', 'type':'CHAR', 'value':'ISBN19202323322'}]
