---
layout: api
title: Database DAO
icon: fa-ellipsis-h
---

{{ page.title }}
===

Simplified database access objects utility.

Version 3.x
---

- Module: **db/v3/dao**
- Alias: **db/dao**
- Definition: [https://github.com/eclipse/dirigible/issues/84](https://github.com/eclipse/dirigible/issues/84)
- Source: [/db/v3/dao.js](https://github.com/dirigiblelabs/api-v3-db/blob/master/db/v3/dao.js)
- Facade: none
- Status: **alpha**


### Basic Usage

```javascript
var dao = require('db/dao');

//create a DAO from configuration
var customers = dao.get({
  "dbName": "CUSTOMER",
  "properties": [{
      "name": "id",
      "dbName": "ID",
      "type": "Long",
      "id": true
    }, {
      "name": "orgName",
      "dbName": "ORG_NAME",
      "type": "String",
      "required": true
    },{
      "name": "employeesNumber",
      "dbName": "ORG_EMP_NUM",
      "type": "Int",
      "required": true
   },{
      "name": "orgDescription",
      "dbName": "ORG_DESCR",
      "type": "String",
      "required": false
   }]
});

//Create CUSTOMERS table
customers.createTable();

try{
	
  //Create a new customer entity
  var customerId = customers.insert({"orgName": "ACME", "employeesNumber": 1000});
		
  //List all customer entities
  var customersList = customers.list(); 
	
  //Get a particular customer entity by its id
  var customer = customers.find(customerId); 
	
  //Update a customer entity property
  customer.orgDescription = "ACME is a company";
  customers.update(customer);
	 
  //Delete a customer entity
  customers.remove(customerId);
	
} finally {  
  //Drop CUSTOMERS table
  customers.dropTable();
}
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------




Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---

---

