---
title: Database
---

Database
===

Standard access to the registered relational data sources.

=== "Overview"
- Module: `db/database`
- Definition: [https://github.com/eclipse/dirigible/issues/21](https://github.com/eclipse/dirigible/issues/21)
- Source: [/db/database.js](https://github.com/eclipse/dirigible/blob/master/components/api-database/src/main/resources/META-INF/dirigible/db/database.js)
- Status: `stable`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { database } from "@dirigible/db";
    import { response } from "@dirigible/http";

    let connection = database.getConnection("SystemDB");
    try {
        let statement = connection.prepareStatement("select * from DIRIGIBLE_EXTENSIONS");
        let resultSet = statement.executeQuery();
        while (resultSet.next()) {
            response.println("[path]: " + resultSet.getString("ARTEFACT_LOCATION"));
        }
        resultSet.close();
        statement.close();
    } catch (e) {
        if (e instanceof Error) {
            console.error(e);
            response.println(e.message);
        } else {
            console.error("Something went wrong", e);
        }
    } finally {
        connection.close();
    }

    response.flush();
    response.close();
    ```

=== "Require"

    ```javascript
    var database = require("db/database");
    var response = require("http/response");

    var connection = database.getConnection("SystemDB");
    try {
        var statement = connection.prepareStatement("select * from DIRIGIBLE_EXTENSIONS");
        var resultSet = statement.executeQuery();
        while (resultSet.next()) {
            response.println("[path]: " + resultSet.getString("ARTEFACT_LOCATION"));
        }
        resultSet.close();
        statement.close();
    } catch (e) {
        if (e instanceof Error) {
            console.error(e);
            response.println(e.message);
        } else {
            console.error("Something went wrong", e);
        }
    } finally {
        connection.close();
    }

    response.flush();
    response.close();
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getDatabaseTypes()**   | `deprecated` as all the datasources now are in a single list | *list of string*
**getDataSources()**    | Returns the list of the available data-sources in this instance. The data-sources of the default database type are listed  | *list of string*
**createDataSource(name, driver, url, username, password, properties)**   | Creates a named dynamic datasource based on the provided parameters | *-*
**getMetadata(datasourceName)**   | Returns the metadata of the selected *datasourceName*. In case the *datasourceName* parameter is omitted, then the default data-source for the selected database is taken. | *metadata object*
**getConnection(datasourceName)**   | Establishes a connection to the selected data-source. Both parameters are optional | *Connection* 


### Objects

---

#### Connection

Function     | Description | Returns
------------ | ----------- | --------
**prepareStatement(sql)**   | Creates a prepared statement by the given SQL script | *PreparedStatement*
**prepareCall(sql)** | Creates a callable statement by the given SQL script | *CallableStatement*
**close()**   | Closes the Connection and returns it to the pool | -
**commit()**   | Commits the current transaction | -
**getAutoCommit()**   | Returns the value of the auto commit setting | *boolean*
**getCatalog()**   | Returns the Catalog name, which the Connection is related to | *string*
**getSchema()**   | Returns the Schema name, which the Connection is related to | *string*
**getTransactionIsolation()**   | Returns the value of the transaction isolation setting | *int*
**isClosed()**   | Returns true if the Connection is already closed and false otherwise | *boolean*
**isReadOnly()**   | Returns true if the Connection is opened in a read only state and false otherwise | *boolean*
**isValid()**   | Returns true if the Connection is still valid and false otherwise | *boolean*
**rollback()**   | Rolls the current transaction back | -
**setAutoCommit(autoCommit)**   | Sets the value of the auto commit setting | -
**setCatalog(catalog)**   | Sets the Catalog name, which the Connection is related to | -
**setSchema(schema)**   | Sets the Schema name, which the Connection is related to | -
**setReadOnly(readOnly)**   | Sets the value of the read only state | -
**setTransactionIsolation(transactionIsolation)**   | Sets the value of the transaction isolation setting | -


#### PreparedStatement

Function     | Description | Returns
------------ | ----------- | --------
**close()**   | Closes the Statement | -
**execute()**   | Executes an SQL query, script, procedure, etc. | *boolean*
**executeQuery()**   | Executes a query and returns a ResultSet | *ResultSet*
**executeUpdate()**   | Executes an update SQL statement | -
**setNull(index, value)**   | Sets a parameter as null | -
**setBoolean(index, value)**   | Sets a parameter of type boolean | -
**setDate(index, value)**   | Sets a parameter of type date | -
**setClob(index, value)**   | Sets a parameter of type clob | -
**setBlob(index, value)**   | Sets a parameter of type blob | -
**setBytes(index, value)**   | Sets a parameter of type bytes | -
**setDouble(index, value)**   | Sets a parameter of type double | -
**setFloat(index, value)**   | Sets a parameter of type float | -
**setInt(index, value)**   | Sets a parameter of type integer | -
**setLong(index, value)**   | Sets a parameter of type long | -
**setShort(index, value)**   | Sets a parameter of type short | -
**setString(index, value)**   | Sets a parameter of type string | -
**setTime(index, value)**   | Sets a parameter of type time | -
**setTimestamp(index, value)**   | Sets a parameter of type timestamp | -
**addBatch()** | Adds a set of parameters to this *PreparedStatement* batch of commands | -
**executeBatch()** | Submits a batch of commands to the database for execution and if all commands execute successfully, returns an array of update counts. | *integer array*
**getMetaData()**   | Retrieves a metadata object that contains information about the columns of the object that will be returned when this PreparedStatement is executed | *object*
**getMoreResults()** | Returns true, if there are more *ResultSet* objects to be retrieved. | *boolean*
**getParameterMetaData()** | Retrieves the number, types and properties of this *PreparedStatement* parameters | *object*
**getSQLWarning()** | Retrieves the first warning reported | *object*
**isClosed()** | Returns true, if closed | *boolean*


#### CallableStatement

Function     | Description | Returns
------------ | ----------- | --------
**close()**   | Closes the Statement | -
**execute()**   | Executes an SQL query, script, procedure, etc. | *boolean*
**executeQuery()**   | Executes a query and returns a ResultSet | *ResultSet*
**executeUpdate()**   | Executes an update SQL statement | -
**setNull(index, value)**   | Sets a parameter as null | -
**setBoolean(index, value)**   | Sets a parameter of type boolean | -
**setDate(index, value)**   | Sets a parameter of type date | -
**setClob(index, value)**   | Sets a parameter of type clob | -
**setBlob(index, value)**   | Sets a parameter of type blob | -
**setBytes(index, value)**   | Sets a parameter of type bytes | -
**setDouble(index, value)**   | Sets a parameter of type double | -
**setFloat(index, value)**   | Sets a parameter of type float | -
**setInt(index, value)**   | Sets a parameter of type integer | -
**setLong(index, value)**   | Sets a parameter of type long | -
**setShort(index, value)**   | Sets a parameter of type short | -
**setString(index, value)**   | Sets a parameter of type string | -
**setTime(index, value)**   | Sets a parameter of type time | -
**setTimestamp(index, value)**   | Sets a parameter of type timestamp | -
**addBatch()** | Adds a set of parameters to this *PreparedStatement* batch of commands | -
**executeBatch()** | Submits a batch of commands to the database for execution and if all commands execute successfully, returns an array of update counts. | *integer array*
**getMetaData()**   | Retrieves a metadata object that contains information about the columns of the object that will be returned when this PreparedStatement is executed | *object*
**getMoreResults()** | Returns true, if there are more *ResultSet* objects to be retrieved. | *boolean*
**getParameterMetaData()** | Retrieves the number, types and properties of this *PreparedStatement* parameters | *object*
**getSQLWarning()** | Retrieves the first warning reported | *object*
**isClosed()** | Returns true, if closed | *boolean*

#### ResultSet

Function     | Description | Returns
------------ | ----------- | --------
**toJson(limited)** | Returns the result set as stringfied JSON, `limited = true` will return only the first 100 records | *string*
**close()**   | Closes the ResultSet | -
**getBoolean(identifier)**   | Returns a value of type boolean | *boolean*
**getDate(identifier)**   | Returns a value of type date | *Date*
**getDouble(identifier)**   | Returns a value of type double | *double*
**getFloat(identifier)**   | Returns a value of type float | *float*
**getInt(identifier)**   | Returns a value of type integer | *int*
**getLong(identifier)**   | Returns a value of type long | *long*
**getShort(identifier)**   | Returns a value of type short | *short*
**getString(identifier)**   | Returns a value of type string | *string*
**getTime(identifier)**   | Returns a value of type time | *Date*
**getTimestamp(identifier)**   | Returns a value of type timestamp | *Date*
**isAfterLast()**   | Returns true if the ResultSet is iterated at the end and false otherwise | *boolean*
**isBeforeFirst()**   | Returns true if the ResultSet is iterated at the beginning and false otherwise | *boolean*
**isFirst()**   | Returns true if the ResultSet is iterated at the first row and false otherwise | *boolean*
**isLast()**   | Returns true if the ResultSet is iterated at the last row and false otherwise | *boolean*
**isClosed()**   | Returns true if the ResultSet is already closed and false otherwise | *boolean*
**next()**   | Iterates the ResultSet to the next row and returns true if it is successful. Returns false if no more rows remain. | *boolean*
