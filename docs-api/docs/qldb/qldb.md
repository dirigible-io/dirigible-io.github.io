---
title: QLDB Repository
---

QLDB Repository
===

The QLDB Repository is giving an access to a [qldb](https://aws.amazon.com/qldb/) - Amazon's fully managed ledger database.

=== "Overview"
- Module: `qldb/qldbrepository`
- Facade: [QLDBRepository](https://github.com/eclipse/dirigible/blob/master/components/api-redis/src/main/java/org/eclipse/dirigible/components/api/qldb/QLDBRepository.java)
- Status: `beta`
- Group: `ext`



### Basic Usage

1. Activate `QLDB` in your AWS dashboard and create a `Ledger`
2. Create `~/.aws/credentials` with the following:
```
[default] 
aws_access_key_id = your_access_key_id
aws_secret_access_key = your_secret_access_key
region = your_region
```

=== "ECMA6"

    ```javascript
    //first we need to create a table
    import { QLDBRepository } from "@dirigible/qldb";

    const qldb = new QLDBRepository("myLedger", "testTable").createTable();
    ```


    ```javascript
    //use the newly created object to interact with qldb
    import { QLDBRepository } from "@dirigible/qldb";

    const qldb = new QLDBRepository("myLedger", "testTable");

    qldb.insert({ "foo": "bar" })

    console.log(qldb.getAll())
    ```
    
=== "CommonJS"

    ```javascript
    //first we need to create a table
    const QLDBRepository = require("qldb/QLDBRepository");
    
    const qldb = new QLDBRepository("myLedger", "testTable").createTable();

    qldb.insert({ "foo": "bar" })

    console.log(qldb.getAll())
    ```

    ```javascript
    //use the newly created object to interact with qldb
    const QLDBRepository = require("qldb/QLDBRepository");
    
    const qldb = new QLDBRepository("myLedger", "testTable");

    qldb.insert({ "foo": "bar" })

    console.log(qldb.getAll())
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**QLDBRepository(String ledger, String tableName)**   |  Constructs a repository with given ledger and table. `Notice:` If the table does not exist you must call .createTable() | *object*

#### QLDBRepository

Function     | Description | Returns
------------ | ----------- | --------
**createTable()**   | Creates the repository table. | *-*
**dropTable()**   |  Drops the repository table. Notice: Dropping tables in QLDB inactivates them. You can undo that with an UNDROP statement in PartiQL | *-*
**insert(entry: object)**   |  Inserts the entry in the repository. On success returns the inserted entry | *object*
**update(entry: object)**   |  Updates the entry in the repository. On success returns the updated entry. Notice: The entry must contain a documentId property | *object*
**getById(documentId: string)**   | Returns the repository entry with given documentId | *object*
**getAll()**   | Returns all the repository entries | *object[]*
**delete(documentId: string)**   |  Deletes the entry by given documentId.documentId. On success returns the documentId of the deleted object. | *object*
**delete(entry: object)**   |  Deletes the entry. On success returns the documentId of the deleted object. Notice: The entry must contain a documentId property. | *string*
**getHistory(key, value)**   | Returns the entire history of transactions of the repository | *object[]*
**getLedgerName(key, index)**   | Returns the ledger name the repository is working against | *string*
**getTableName(key)**   | Returns the table name the repository is working against | *string*
 
