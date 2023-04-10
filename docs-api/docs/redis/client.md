---
title: Client
---

Redis Client
===

The Redis Client is giving an access to a [redis](https://redis.io//) in-memory data store.

=== "Overview"
- Module: `redis/client`
- Definition: [https://github.com/eclipse/dirigible/issues/723](https://github.com/eclipse/dirigible/issues/723)
- Source: [/redis/client.js](https://github.com/eclipse/dirigible/tree/master/components/api-redis/src/main/resources/META-INF/dirigible/redis/client.js)
- Facade: [RedisFacade](https://github.com/eclipse/dirigible/blob/master/components/api-redis/src/main/java/org/eclipse/dirigible/components/api/redis/RedisFacade.java)
- Status: `beta`
- Group: `ext`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { client } from "@dirigible/redis";
    import { response } from "@dirigible/http";

    const redisClient = client.getClient();

    redisClient.set("foo", "bar");

    const data = redisClient.get("foo");

    response.println(data);
    ```
    
=== "CommonJS"

    ```javascript
    const client = require("redis/client");
    const response = require("http/response");

    const redisClient = client.getClient();

    redisClient.set("foo", "bar");

    const data = redisClient.get("foo");

    response.println(data);
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getClient()**   | Returns an object representing a Redis Client | *Client*

### Objects

---

#### Client

Function     | Description | Returns
------------ | ----------- | --------
**append(key, value)**   | Append a string to the value of a key | *-*
**bitcount(key)**   | Count the number of set bits in a string | *string*
**decr(key)**   | Decrements the integer value of a key by one. Uses 0 as initial value if the key doesn't exist. | *-*
**del(key)**   | Deletes one or more keys | *-*
**exists(key)**   | Determine whether one or more keys exist | *boolean*
**get(key)**   | Returns the string value of a key | *string*
**incr(key)**   | Increments the integer value of a key by one. Uses 0 as initial value if the key doesn't exist | *-*
**keys(pattern)**   | Returns all key names that match a pattern | *string*
**set(key, value)**   | Sets the string value of a key, ignoring its type. The key is created if it doesn't exist | *-*
**lindex(key, index)**   | Returns an element from a list by its index | *string*
**llen(key)**   | Returns the length of a list | *integer*
**lpop(key)**   | Removes and returns the first elements of the list stored at key | *-*
**lpush(key)**   | Prepends one or more elements to a list. Creates the key if it doesn't exist | *-*
**lrange(key)**   | Returns a range of elements from a list | *integer*
**rpop(key)**   | Returns and removes the last elements of a list. Deletes the list if the 1st elements was popped | *string*
**rpush(key)**   | Appends one or more elements to a list. Create the key if it doesn't exist | *-*
 
