---
title: MongoDB DAO
---

MongoDB DAO
===

The MongoDB DAO simplified database access objects utility.

=== "Overview"
- Module: `mongodb/dao`
- Definition: [https://github.com/eclipse/dirigible/issues/671](https://github.com/eclipse/dirigible/issues/671)
- Source: [/mongodb/dao.js](https://github.com/eclipse/dirigible/blob/master/components/api-mongodb/src/main/resources/META-INF/dirigible/mongodb/dao.js)
- Status: `stable`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { dao } from "@dirigible/mongodb";
    import { response } from "@dirigible/http";

    //create a DAO from configuration
    let customers = dao.create({
        table: "CUSTOMERS",
        properties: [{
            name: "id",
            column: "ID",
            type: "BIGINT",
            id: true
        }, {
            name: "orgName",
            column: "ORG_NAME",
            type: "VARCHAR",
            required: true
        }, {
            name: "employeesNumber",
            column: "ORG_EMP_NUM",
            type: "INTEGER",
            required: true
        }, {
            name: "orgDescription",
            column: "ORG_DESCR",
            type: "VARCHAR",
            required: false
        }]
    });

    //Create a new customer entity
    let customerId = customers.insert({
        orgName: "ACME",
        employeesNumber: 1000
    });

    response.println("Id: " + customerId);

    //List all customer entities
    let customersList = customers.list();

    //Get a particular customer entity by its id
    let customer = customers.find(customerId);

    //Update a customer entity property
    customer.orgDescription = "ACME is a company";
    customers.update(customer);

    //Delete a customer entity
    customers.remove(customerId);
    ```

=== "Require"

    ```javascript
    var dao = require("mongodb/dao");
    var response = require("http/response");

    //create a DAO from configuration
    var customers = dao.create({
        table: "CUSTOMERS",
        properties: [{
            name: "id",
            column: "ID",
            type: "BIGINT",
            id: true
        }, {
            name: "orgName",
            column: "ORG_NAME",
            type: "VARCHAR",
            required: true
        }, {
            name: "employeesNumber",
            column: "ORG_EMP_NUM",
            type: "INTEGER",
            required: true
        }, {
            name: "orgDescription",
            column: "ORG_DESCR",
            type: "VARCHAR",
            required: false
        }]
    });

    //Create a new customer entity
    var customerId = customers.insert({
        orgName: "ACME",
        employeesNumber: 1000
    });

    response.println("Id: " + customerId);

    //List all customer entities
    var customersList = customers.list();

    //Get a particular customer entity by its id
    var customer = customers.find(customerId);

    //Update a customer entity property
    customer.orgDescription = "ACME is a company";
    customers.update(customer);

    //Delete a customer entity
    customers.remove(customerId);
    ```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**create(oConfiguration, loggerName?)** | Creates new DAO instances from oConfiguraiton JS object, which can be either standard ORM definition or a standard dirigible table definition |  DAO 


### Objects

---

#### DAO

Function     | Description | Returns
------------ | ----------- | --------
**insert(entity)** | inserts array or entity and returns id (or ids of array of entities was supplied as input)  |  any 
**list(oQuerySettings?)** | lists entities optionally constrained with the supplied query settings |  Array 
**find(id, expand?, select?)** | returns an entity by its id(if any), optionally expanding inline the associations defined in expand and optionally constraining the entitiy properties to those specified in select |  Object
**update(entity)** | updates a persistent entity and returns for its dao chaining  |  DAO
**remove(?id)** | delete entity by id, or array of ids, or delete all (if not argument is provided). |  ---
**count()** | returns the number of persisted entities |  Number
