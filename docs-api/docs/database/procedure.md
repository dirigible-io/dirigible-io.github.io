---
title: Procedure
---

Procedure
===


Simplified procedure functionality, accepts SQL script and query parameters and returns the result-set as a JSON object.

=== "Overview"
- Module: `db/procedure`
- Definition: [https://github.com/eclipse/dirigible/issues/773](https://github.com/eclipse/dirigible/issues/773)
- Source: [/db/procedure.js](https://github.com/eclipse/dirigible/blob/master/components/api-database/src/main/resources/META-INF/dirigible/db/procedure.js)
- Status: `stable`
- Group: `core`


### Basic Usage

!!! note

    To use procedures you need to add database that supports them (default DB is H2 that does not support procedures):

    1. Open `Database` perspective and click on `Databases` at the bottom.
    2. Click `New` and add your database information.
    3. Use you newly added database in most methods as `databaseType`.

Create Procedure:

=== "ECMA6"

    ```javascript
    import { procedure } from "@dirigible/db";
    import { response } from "@dirigible/http";

    const sql = " \
    CREATE PROCEDURE CUSTOMERS_BY_COUNTRY_AND_ALL_CUSTOMERS(c_id integer, c_name text, c_country text) \
    LANGUAGE SQL \
    AS $$ \
      INSERT INTO CUSTOMERS(id, name, country) values (c_id, c_name, c_country); \
    $$; \
    "

    procedure.create(sql, "psql");

    response.println("Procedure created");
    response.flush();
    response.close();
    ```

=== "CommonJS"

    ```javascript
    const response = require("http/response");
    const procedure = require("db/procedure");

    const sql = " \
    CREATE PROCEDURE CUSTOMERS_BY_COUNTRY_AND_ALL_CUSTOMERS(c_id integer, c_name text, c_country text) \
    LANGUAGE SQL \
    AS $$ \
      INSERT INTO CUSTOMERS(id, name, country) values (c_id, c_name, c_country); \
    $$; \
    "

    procedure.create(sql, "psql");

    response.println("Procedure created");
    response.flush();
    response.close();
    ```

Call Procedure:

=== "ECMA6"

    ```javascript
    import { query, procedure } from "@dirigible/db";
    import { response } from "@dirigible/http";

    const sql = "CALL CUSTOMERS_BY_COUNTRY_AND_ALL_CUSTOMERS(c_id => ?, c_name => ?, c_country => ?)";

    try {
        procedure.execute(sql, [6, "IBM", "USA"], "psql");
    } finally {
        let result = query.execute("SELECT * FROM CUSTOMERS", [], "psql");

        response.println(JSON.stringify(result));
        response.flush();
        response.close();
    }
    ```

=== "CommonJS"

    ```javascript
    const response = require("http/response");
    const procedure = require("db/procedure");
    const query = require("db/query");

    const sql = "CALL CUSTOMERS_BY_COUNTRY_AND_ALL_CUSTOMERS(c_id => ?, c_name => ?, c_country => ?)";
    try {
        procedure.execute(sql, [6, "IBM", "USA"], "psql");
    } finally {
        let result = query.execute("SELECT * FROM CUSTOMERS", [], "psql");

        response.println(JSON.stringify(result));
        response.flush();
        response.close();
    }
    ```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**create(sql, datasourceName?)**   | Creates a SQL Stored Procedure in the selected *datasourceName*, throws Error, if issue occur | *-*
**execute(sql, parameters?, datasourceName?)**   | Execute SQL Stored Procedure in the selected *datasourceName* with the provided parameters and returns the result, if any | *array of arrays*

Sample Parameters Array:

```javascript
let parameters = [1, 'John', 34.56];
```

or
```javascript
let parameters = [
  {
    value: 1,
    type: "int"
  }, {
    value: 'John',
    type: "string"
  }, {
    value: 34.56
    type: "double"
  }
];
```
