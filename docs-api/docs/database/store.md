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

The `Entity` class with corresponding decorators:

=== "TypeScript"

    ```typescript
    @Entity("Customer")
	@Table("CUSTOMER")
	export class Customer {
	    
	    @Id()
	    @Generated("sequence")
	    @Column({ name: "CUSTOMER_ID", type: "long" })
	    public id: number;
	
	    @Column({ name: "CUSTOMER_NAME", type: "string" })
	    public name: string;
	
	    @Column({ name: "CUSTOMER_ADDRESS", type: "string" })
	    public address: string;
	}
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
    response.println(JSON.stringify(list, null, 2));
    
    response.println("");
    response.println("Select customers with first name John:");
    let select = store.query("from Customer c where c.name = 'John'");
    response.println(JSON.stringify(select, null, 2));
    
    response.println("");
    response.println("Select native customers with first name John:");
    let selectNative = store.queryNative("select * from Customer c where c.name = 'John'");
    response.println(JSON.stringify(selectNative, null, 2));
    
    response.println("");
    response.println("Find customers by Example:");
    let findByExample = store.find('Customer', {"name":"John"});
    response.println(JSON.stringify(findByExample, null, 2));
    
    response.println("");
    response.println("List customers with filter options:");
    let listWithOptions = store.list('Customer', {"conditions":[{"propertyName":"name","operator":"LIKE","value":"J%"}],"sorts":[{"propertyName":"name","direction":"ASC"}],"limit":"100"});
    response.println(JSON.stringify(listWithOptions, null, 2));
    
    response.flush();
    response.close();
    ```
    



### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**save(name, entry)**   | Save the `entry` in the collection with `name` | *-*
**update(name, entry)**   | Update the `entry` in the collection with `name` | *-*
**upsert(name, entry)**   | Save or update the `entry` in the collection with `name` | *-*
**list(name, Options)**   | List all the entries in the collection with `name` and optionally `Options` | *Array of Objects*
**get(name, id)**   | Get the entry from the collection with `name` by its `id` | *Object*
**deleteEntry(name, id)**   | Delete the entry from the collection with `name` by its `id` | *-*
**query(query, limit, offset)**   | Query the entries with `query` | *Array of Objects*
**queryNative(query)**   | Query the entries with native `query`` | *Array of Objects*
**find(name, example, limit, offset)**   | Find all the entries in the collection with `name` matching `example` | *Array of Objects*
**count(name, Options)**   | Count the entries with `name` and optionally `Options` | *number*


### Objects

---

```javascript
interface Options {
	conditions?: Condition[],
	sorts?: Sort[],
	limit?: number,
	offset?: number,
	language: string
}

interface Condition {
	propertyName: string,
	operator: Operator,
	value: any | any[]
}

enum Operator {
	EQ = "=", // Equals
	NE = "<>", // Not Equals
	GT = ">", // Greater Than
	LT = "<", // Less Than
	GE = ">=", // Greater Than or Equals
	LE = "<=", // Less Than or Equals
	LIKE = "LIKE", // SQL LIKE operator
	BETWEEN = "BETWEEN", // SQL BETWEEN operator (requires two values)
	IN = "IN" // SQL IN operator (requires a List or Array of values)
}

interface Sort {
	propertyName: string,
	direction: Direction
}

enum Direction {
	ASC = "ASC", // Ascending
	DESC = "DESC" // Descending
}
```
