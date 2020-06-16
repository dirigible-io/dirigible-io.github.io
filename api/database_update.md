---
layout: api
title: Database Update
icon: fa-ellipsis-h
---

{{ page.title }}
===

Simplified update functionality, accepts SQL script and query parameters and returns the result-set as a JSON object.

Version 4.x
---

- Module: **db/v4/update**
- Alias: **db/update**
- Definition: [https://github.com/eclipse/dirigible/issues/49](https://github.com/eclipse/dirigible/issues/49)
- Source: [/db/v4/update.js](https://github.com/dirigiblelabs/api-db/blob/master/db/v4/update.js)
- Facade: [DatabaseFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-database/src/main/java/org/eclipse/dirigible/api/v3/db/DatabaseFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var update = require("db/v4/update");

update.execute("CREATE TABLE MY_TABLE (COLUMN_A INT, COLUMN_B VARCHAR(10))");
update.execute("INSERT INTO MY_TABLE VALUES (1, 'ABC')");
update.execute("INSERT INTO MY_TABLE VALUES (2, 'DEF')");
update.execute("DROP TABLE MY_TABLE");
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**execute(sql, parameters?, databaseType?, datasourceName?)**   | Executes a SQL update against the selected *databaseType* and *datasourceName* with the provided parameters and returns the number of affected rows | *int*

> parameters array supports primitives e.g. [1, 'John', 34.56] or objects in format {'type':'[DATA_TYPE]', 'value':[VALUE]} e.g. [1, {'type':'CHAR', 'value':'ISBN19202323322'}]


Compatibility
---

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **db/v3/update**
- Alias: **db/update**
- Definition: [https://github.com/eclipse/dirigible/issues/49](https://github.com/eclipse/dirigible/issues/49)
- Source: [/db/v3/update.js](https://github.com/dirigiblelabs/api-v3-db/blob/master/db/v3/update.js)
- Facade: [DatabaseFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-database/src/main/java/org/eclipse/dirigible/api/v3/db/DatabaseFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var update = require("db/v3/update");

update.execute("CREATE TABLE MY_TABLE (COLUMN_A INT, COLUMN_B VARCHAR(10))");
update.execute("INSERT INTO MY_TABLE VALUES (1, 'ABC')");
update.execute("INSERT INTO MY_TABLE VALUES (2, 'DEF')");
update.execute("DROP TABLE MY_TABLE");
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**execute(sql, parameters?, databaseType?, datasourceName?)**   | Executes a SQL update against the selected *databaseType* and *datasourceName* with the provided parameters and returns the number of affected rows | *int*

> parameters array supports primitives e.g. [1, 'John', 34.56] or objects in format {'type':'[DATA_TYPE]', 'value':[VALUE]} e.g. [1, {'type':'CHAR', 'value':'ISBN19202323322'}]


Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---
