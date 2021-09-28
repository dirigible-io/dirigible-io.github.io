---
title: Database - Procedure Call
hide:
  - toc
---

# Database - Procedure Call

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

1. Create `CUSTOMERS_BY_COUNTRY_AND_ALL_CUSTOMERS` stored procedure:

   ```sql
   CREATE PROCEDURE CUSTOMERS_BY_COUNTRY_AND_ALL_CUSTOMERS (in country varchar(50), out customersByCountry CUSTOMERS, out allCustomers CUSTOMERS)
   AS
     BEGIN
       customersByCountry = SELECT * FROM CUSTOMERS WHERE COUNTRY = :country;
       allCustomers = SELECT * FROM CUSTOMERS;
     END;
   ```

1. Create a project `database-procedure`.
1. Then create a JavaScript service named `database-procedure-call.js`.
1. Within the service code, enter the following content:

```javascript
var response = require("http/v4/response");
var database = require("db/v4/database");

let connection = null;

try {
  connection = database.getConnection();
  let hasMoreResults = false;
  let sql =
    "CALL CUSTOMERS_BY_COUNTRY_AND_ALL_CUSTOMERS(COUNTRY => 'Bulgaria', customersByCountry => ?, allCustomers => ?)";
  let callableStatement = connection.prepareCall(sql);
  let resultSet = callableStatement.executeQuery();

  do {
    while (resultSet.next()) {
      response.println(
        "Name: " +
          resultSet.getString("NAME") +
          ", Country: " +
          resultSet.getString("COUNTRY")
      );
    }
    hasMoreResults = callableStatement.getMoreResults();
    if (hasMoreResults) {
      resultSet.close();
      resultSet = callableStatement.getResultSet();
      response.println("\n---- End of ResultSet ----\n");
    }
  } while (hasMoreResults);

  callableStatement.close();
} finally {
  if (connection != null) {
    connection.close();
  }
}

response.flush();
response.close();
```

---

> For more information, see the _[API](../../api/)_ documentation.
