---
layout: api
title: MongoDB Client API
icon: fa-ellipsis-h
---

{{ page.title }}
===

The MongoDB Client is giving an access to a [MongoDB](https://www.mongodb.com/) noSQL server.

Version 4.x
---

- Module: **mongodb/client**
- Alias: **mongodb/client**
- Definition: [https://github.com/eclipse/dirigible/issues/668](https://github.com/eclipse/dirigible/issues/668)
- Source: [/mongodb/client.js](https://github.com/dirigiblelabs/ext-mongodb/blob/master/mongodb/client.js)
- Facade: [MongoDBFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-mongodb/src/main/java/org/eclipse/dirigible/api/mongodb/MongoDBFacade.java)
- Status: **alpha**


### Basic Usage

##### Create an object and find it:

```javascript
var response = require("http/v4/response");
var mongodb = require("mongodb/client");

var mongoClient = mongodb.getClient();

var collection = mongoClient.getDB("db").getCollection("people");

var person = mongodb.createBasicDBObject()
    .append("_id", "jo")
    .append("name", "Jo Bloggs");
// or directly create an Object:
// var person = {"_id": "jo", "name": "Jo Bloggs"};
collection.insert(person);

var query = mongodb.createBasicDBObject().append("_id", "jo");
var cursor = collection.find(query);
var result = cursor.one();

response.println("Result: " + result._id);
response.flush();
response.close();
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getClient()**   | Returns an object representing a MongoDB Client | *Client*
**createBasicDBObject()**   | Creates an empty DBObject | *DBObject*


### Objects

---

#### Client

Function     | Description | Returns
------------ | ----------- | --------
**getDB(name)**   | Returns an object representing a MongoDB Database | *DB*

#### DB

Function     | Description | Returns
------------ | ----------- | --------
**getCollection(name)**   | Returns an object representing a MongoDB Collection | *DBCollection*

#### DBCollection

Function     | Description | Returns
------------ | ----------- | --------
**insert(dbObject)**   | Inserts a DBObject to a Collection | *-*
**find(query, projection)**   | Returns a DBCursor based on the optional DBObjects parameters | *DBCursor*
**findOne(query, projection, sort)**   | Returns a single DBObject based on the optional DBObjects parameters and sort | *DBObject*
**findOneById(id, projection)**   | Returns a single DBObject by *id* and the optional DBObject *projection* parameter | *DBObject*
**count(query)**   | Returns the count of matching DBObjects by the optional DBObject *query* parameter | *integer*
**createIndex(keys, options)**   | Creates an index by *keys* and optional DBObject *options* parameters | *-*
**createIndexForField(name)**   | Creates an index for field by *name* | *-*
**dropIndex(index)**   | Drops the index by the DBObeject parameter | *-*
**dropIndexByName(name)**   | Drops the index by the name parameter | *-*
**dropIndexes()**   | Drops all the indexes | *-*
**remove(query)**   | Removes the objects matching the *query* DBObject parameter | *-*
**rename(newName)**   | Renames the collection by the *newName* parameter | *-*
**save(dbObject)**   | Saves a DBObject to a Collection depends on whether *_id* of the object is provided or not | *-*
**update(query, update, upsert, multi)**   | Updates the matching objects by *query* parameter with *update* value and optional *upsert* and *multi* flags | *-*
**updateMulti(query, update)**   | Updates the matching objects by *query* parameter with *update* value | *-*
**getNextId()**   | Calculate the next id for this collection in case of integer sequence is used | *integer*
**generateUUID()**   | Generate UUID to be used as id | *string*

#### DBCursor

Function     | Description | Returns
------------ | ----------- | --------
**one()**   | Returns a single DBObject | *DBObject*
**batchSize(numberOfElements)**   | Sets the batch size | *-*
**getBatchSize()**   | Gets the batch size | *integer*
**getCollection()**   | Gets the corresponding DBCollection | *DBCollection*
**getCursorId()**   | Gets the cursor id | *integer*
**getKeysWanted()**   | Returns as a *keys* DBObject | *DBObject*
**getLimit()**   | Gets the results limit | *integer*
**close()**   | Closes the cursor | *-*
**hasNext()**   | Returns true if there is more objects | *boolean*
**next()**   | Returns the next single DBObject | *DBObject*
**getQuery()**   | Returns as a *query* DBObject | *DBObject*
**length()**   | Returns the length of the results | *integer*
**limit(limit)**   | Sets the results limit | **
**min(min)**   | Sets the min results | **
**max(max)**   | Sets the max results | **
**maxTime(maxTime)**   | Sets the *maxTime* timeout in ms | **
**size()**   | Gets the results size | *integer*
**sort(orderBy)**   | Sort the result by the *orderBy* parameter | *-*
**skip(numberOfElements)**   | Skips the next *numberOfElements* | *-*

#### DBObject

Function     | Description | Returns
------------ | ----------- | --------
**append(key, value)**   | Adds a pair by *key* and *value* parameters | *DBObject* (this)
**toJson()**   | Renders the DBObject as a JSON | *string*
**isPartialObject()**   | Only matters if you are going to upsert and do not want to risk losing fields | *-*
**containsField(key)**   | Whether contans a given field by *key* parameter | *boolean*
**get(key)**   | Returns the value by the *key* parameter | *primitive*
**put(key, value)**   | Adds the *key*-*value* pair | *-*
**removeField(key)**   | Removes the field by *key* parameter | *-*


### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
 ---


 
