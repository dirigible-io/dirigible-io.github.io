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


### Basic Usage

#### ECMA6

```javascript
import { update } from "@dirigible/db";

update.execute("CREATE TABLE MY_TABLE (COLUMN_A INT, COLUMN_B VARCHAR(10))");
update.execute("INSERT INTO MY_TABLE VALUES (1, 'ABC')");
update.execute("INSERT INTO MY_TABLE VALUES (2, 'DEF')");
update.execute("DROP TABLE MY_TABLE");
```

#### Require

```javascript
var update = require("db/update");

update.execute("CREATE TABLE MY_TABLE (COLUMN_A INT, COLUMN_B VARCHAR(10))");
update.execute("INSERT INTO MY_TABLE VALUES (1, 'ABC')");
update.execute("INSERT INTO MY_TABLE VALUES (2, 'DEF')");
update.execute("DROP TABLE MY_TABLE");
```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**execute(sql, parameters?, datasourceName?)**   | Executes a SQL update against the selected *datasourceName* with the provided parameters and returns the number of affected rows | *int*

> parameters array supports primitives e.g. [1, 'John', 34.56] or objects in format {'type':'[DATA_TYPE]', 'value':[VALUE]} e.g. [1, {'type':'CHAR', 'value':'ISBN19202323322'}]
