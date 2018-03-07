---
layout: api
title: Database Query
icon: fa-ellipsis-h
---

{{ page.title }}
===

Simplified query functionality, accepts SQL script and query parameters and returns the result-set as a JSON object.

Version 3.x
---

- Module: **db/v3/query**
- Alias: **db/query**
- Definition: [https://github.com/eclipse/dirigible/issues/48](https://github.com/eclipse/dirigible/issues/48)
- Source: [/db/v3/query.js](https://github.com/dirigiblelabs/api-v3-db/blob/master/db/v3/query.js)
- Facade: [DatabaseFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-db/src/main/java/org/eclipse/dirigible/api/v3/db/DatabaseFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var query = require('db/v3/query');
var response = require('http/v3/response');

var sql = "SELECT * FROM MY_TABLE WHERE MY_COLUMN = ?";
var resultset = query.execute(sql, [1]);

response.println(JSON.stringify(resultset));

response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**execute(sql, parameters?, databaseType?, datasourceName?)**   | Executes a SQL query against the selected *databaseType* and *datasourceName* with the provided parameters | *result-set as JSON object*

> parameters array supports primitives e.g. [1, 'John', 34.56] or objects in format {'type':'[DATA_TYPE]', 'value':[VALUE]} e.g. [1, {'type':'CHAR', 'value':'ISBN19202323322'}]


Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---

---

