---
title: Query
---

Query
===


Simplified query functionality, accepts SQL script and query parameters and returns the result-set as a JSON object.

=== "Overview"
- Module: `db/v4/query`
- Alias: `db/query`
- Definition: [https://github.com/eclipse/dirigible/issues/48](https://github.com/eclipse/dirigible/issues/48)
- Source: [/db/v4/query.js](https://github.com/dirigiblelabs/api-db/blob/master/db/v4/query.js)
- Facade: [DatabaseFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-database/src/main/java/org/eclipse/dirigible/api/v3/db/DatabaseFacade.java)
- Status: `stable`


### Basic Usage

```javascript
var query = require("db/v4/query");
var response = require("http/v4/response");

var sql = "SELECT * FROM DIRIGIBLE_EXTENSIONS WHERE EXTENSION_EXTENSIONPOINT_NAME = ?";
var resultset = query.execute(sql, ["ide-editor"]);

response.println(JSON.stringify(resultset));

response.flush();
response.close();
```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**execute(sql, parameters?, databaseType?, datasourceName?)**   | Executes a SQL query against the selected *databaseType* and *datasourceName* with the provided parameters | *result-set as JSON object*

> parameters array supports primitives e.g. [1, 'John', 34.56] or objects in format {'type':'[DATA_TYPE]', 'value':[VALUE]} e.g. [1, {'type':'CHAR', 'value':'ISBN19202323322'}]
