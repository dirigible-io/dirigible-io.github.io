---
title: Store
---

Store
===


Simplified Data Store functionality based on [Hibernate](https://hibernate.org/) framework.

=== "Overview"
- Module: `db/store`
- Definition: [https://github.com/eclipse/dirigible/issues/2485](https://github.com/eclipse/dirigible/issues/2485)
- Source: [/db/store.js](https://github.com/eclipse/dirigible/blob/master/components/api-database/src/main/resources/META-INF/dirigible/db/store.js)
- Status: `beta`
- Group: `core`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { store } from "@dirigible/db";
    import { response } from "@dirigible/http";

    let entry = { 'name': 'John', 'address': 'Sofia, Bulgaria' };

    store.save('Customer', entry);

    let list = store.list('Customer');

    response.println(JSON.stringify(list));
    response.flush();
    response.close();
    ```

=== "CommonJS"

    ```javascript
    const query = require("db/store");
    const response = require("http/response");

    let entry = { 'name': 'John', 'address': 'Sofia, Bulgaria' };

    store.save('Customer', entry);

    let list = store.list('Customer');

    response.println(JSON.stringify(list));
    response.flush();
    response.close();
    ```

The `Entity` description in the Hibernate `xml` format (e.g. Customer.hbm.xml)

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

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**save(name, entry)**   | Save the `entry` in the collection with `name` | *-*
**list(name)**   | List all the entris in the collection with `name` | *Array of Objects*
**get(name, id)**   | Get the entry from the collection with `name` by its `id` | *Object*
**delete(name, id)**   | Delete the entry from the collection with `name` by its `id` | *-*

