---
title: Database Procedure - Create & Execute
hide:
  - toc
---

Database Procedure - Create & Execute
===

### Steps

1. Switch to the `Database Perspective`
1. Execute the following SQL script:

    ```sql
    CREATE TABLE CUSTOMERS (ID INTEGER PRIMARY KEY, NAME VARCHAR(50), COUNTRY VARCHAR(50));

    INSERT INTO CUSTOMERS VALUES (1, 'Google', 'USA');
    INSERT INTO CUSTOMERS VALUES (2, 'SAP', 'Germany');
    INSERT INTO CUSTOMERS VALUES (3, 'DigitalLights', 'Bulgaria');
    INSERT INTO CUSTOMERS VALUES (4, 'Quanterall', 'Bulgaria');
    INSERT INTO CUSTOMERS VALUES (5, 'SyMetric', 'India');
    ```

1. Create a project `database-procedure`.
1. Then create a JavaScript service named `database-procedure-create.js`.
1. Within the service code, enter the following content:

    ```javascript
    var response = require("http/v4/response");
    var procedure = require("db/v4/procedure");

    let sql = " \
    CREATE PROCEDURE CUSTOMERS_BY_COUNTRY_AND_ALL_CUSTOMERS (in country varchar(50), out customersByCountry CUSTOMERS, out allCustomers CUSTOMERS) \
    AS \
      BEGIN \
        customersByCountry = SELECT * FROM CUSTOMERS WHERE COUNTRY = :country; \
        allCustomers = SELECT * FROM CUSTOMERS; \
      END; \
    ";

    procedure.create(sql);

    response.println("Procedure created");
    response.flush();
    response.close();
    ```

1. Create a JavaScript service named `database-procedure-execute.js`.
1. Within the service code, enter the following content:

    ```javascript
    var response = require("http/v4/response");
    var procedure = require("db/v4/procedure");

    let sql = "CALL CUSTOMERS_BY_COUNTRY_AND_ALL_CUSTOMERS(COUNTRY => ?, customersByCountry => ?, allCustomers => ?)";
    let result = procedure.execute(sql, ["Bulgaria"]);

    response.println(JSON.stringify(result));
    response.flush();
    response.close();
    ```

---

> For more information, see the *[API](../api/)* documentation.
