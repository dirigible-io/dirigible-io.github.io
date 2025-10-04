---
title: Store
---

Store
===

Simple Data Store functionality based on [Hibernate](https://hibernate.org/) framework.

=== "Overview"
- Module: `db/store`
- Definition: [https://github.com/eclipse/dirigible/issues/2485](https://github.com/eclipse/dirigible/issues/2485)
- Source: [/db/store.js](https://github.com/eclipse/dirigible/blob/master/components/api-database/src/main/resources/META-INF/dirigible/db/store.js)
- Status: `beta`
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { store } from "sdk/db";
    import { response } from "sdk/http";

    let entry = { 'name': 'John', 'address': 'Sofia, Bulgaria' };

    store.save('Customer', entry);

    let list = store.list('Customer');

    response.println(JSON.stringify(list));
    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const store = require("db/store");
    const response = require("http/response");

    let entry = { 'name': 'John', 'address': 'Sofia, Bulgaria' };

    store.save('Customer', entry);

    let list = store.list('Customer');

    response.println(JSON.stringify(list));
    response.flush();
    response.close();
    ``` -->

The `Entity` description in the Hibernate `xml` or `json` format (e.g. Customer.hbm.xml as XML or Customer.entity as JSON)

=== "XML"

    ```xml
    <hibernate-mapping>

        <class entity-name="Customer">

            <id name="id" type="long" column="ID">
                <generator class="sequence" />
            </id>

            <property name="name" column="NAME" type="string" />

            <property name="address" column="ADDRESS" type="string" />

        </class>

    </hibernate-mapping>
    ```

### Advanced Usage

=== "ECMA6"

    ```javascript
    import { store } from "sdk/db";
    import { response } from "sdk/http";
    
    let entry1 = { 'name': 'John', 'address': 'Sofia, Bulgaria' };
    let entry2 = { 'name': 'Jane', 'address': 'Varna, Bulgaria' };
    let entry3 = { 'name': 'Matthias', 'address': 'Berlin, Germany' };
    
    store.save('Customer', entry1);
    store.save('Customer', entry2);
    store.save('Customer', entry3);
    
    let list = store.list('Customer');
    response.println("List all customers:");
    response.println("---------------------------------------------");
    response.println(JSON.stringify(list, null, 2));
    
    response.println("");
    response.println("Select customers with first name John:");
    response.println("---------------------------------------------");
    let select = store.query("from Customer c where c.name = 'John'");
    response.println(JSON.stringify(select, null, 2));
    
    response.println("");
    response.println("Select native customers with first name John:");
    response.println("---------------------------------------------");
    let selectNative = store.queryNative("select * from Customer c where c.name = 'John'");
    response.println(JSON.stringify(selectNative, null, 2));
    
    response.println("");
    response.println("Find customers by Example:");
    response.println("---------------------------------------------");
    let findByExample = store.find('Customer', '{"name":"John"}');
    response.println(JSON.stringify(findByExample, null, 2));
    
    response.println("");
    response.println("List customers with filter options:");
    response.println("---------------------------------------------");
    let listWithOptions = store.list('Customer', '{"conditions":[{"propertyName":"name","operator":"LIKE","value":"J%"}],"sorts":[{"propertyName":"name","direction":"ASC"}],"limit":"100"}');
    response.println(JSON.stringify(listWithOptions, null, 2));
    
    response.flush();
    response.close();
    ```
    



### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**save(name, entry)**   | Save the `entry` in the collection with `name` | *-*
**list(name, options)**   | List all the entries in the collection with `name` and optionally `options` | *Array of Objects*
**get(name, id)**   | Get the entry from the collection with `name` by its `id` | *Object*
**deleteEntry(name, id)**   | Delete the entry from the collection with `name` by its `id` | *-*
**query(query, limit, offset)**   | Query the entries with `query` | *Array of Objects*
**queryNative(query)**   | Query the entries with native `query`` | *Array of Objects*
**find(name, example, limit, offset)**   | Find all the entries in the collection with `name` matching `example` | *Array of Objects*

