---
title: Destinations
---

Destinations
===

Destinations object is used to access properties usually stored and managed by external service. 

=== "Overview"
- Module: `core/destinations`
- Source: [/core/destinations.js](https://github.com/eclipse/dirigible/blob/master/components/api-core/src/main/resources/META-INF/dirigible/core/destinations.js)
- Status: `NOT YET MIGRATED`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { destinations } from "@dirigible/core";
    import { response } from "@dirigible/http";

    let destination = { name1: "" };

    destination.name1 = 'value1';

    destinations.set('destination1', destination);

    let result = destinations.get('destination1');

    response.println(JSON.stringify(result))
    ```

=== "CommonJS"

    ```javascript
    const destinations = require('core/destinations');
    const response = require("http/response");

    let destination = { name1: "" };

    destination.name1 = 'value1';

    destinations.set('destination1', destination);

    let result = destinations.get('destination1');

    response.println(JSON.stringify(result));
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(name)** | Returns the value for the specified key | *string*
**set(name, destination)** | Sets a value, for the specified key | *-*
