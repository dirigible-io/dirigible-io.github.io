---
layout: api
title: Repository
icon: fa-ellipsis-h
---

{{ page.title }}
===

> ⚠ Deprecated

Repository module is used for accessing the development artifacts directly from the underlying Repository Component.

Version 3.x
---

Moved to [Repository Manager](repository_manager.html)

---


Version 2.x
---

- Module: **platform/repository**
- Definition: [/core_api/issues/27](https://github.com/dirigiblelabs/core_api/issues/27)
- Source: [/platform/repository.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/platform/repository.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var repository = require('platform/repository');
var response = require('net/http/response');

var bytes = [83, 111, 109, 101, 32, 116, 101, 120, 116, 32, 99, 111, 110, 116, 101, 110, 116]; // Some text content

// create a collection
repository.createCollection("/myRoot/myCollection");
response.println("Collection created.");
response.println("Collection exists? " + repository.hasCollection("/myRoot/myCollection"));

//create a resource
repository.createResource("/myRoot/myCollection/myResource.txt", bytes, false, "plain/text");
response.println("Resource created.");
response.println("Resource exists? " + repository.hasResource("/myRoot/myCollection/myResource.txt"));

// remove resource
repository.removeResource("/myRoot/myCollection/myResource.txt");
response.println("Resource removed.");
response.println("Resource exists? " + repository.hasResource("/myRoot/myCollection/myResource.txt"));

// remove collection
repository.removeCollection("/myRoot/myCollection");
response.println("Collection removed.");
response.println("Collection exists? " + repository.hasCollection("/myRoot/myCollection"));

response.flush();
response.close();
```




Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**createCollection(path)**   | Creates a Collection by the given path | -
**createResource(path, content, isBinary, contentType)**   | Creates a generic Resource by the given path and sets the provided bytes as content object. The isBinary flag indicates whether the provided content represents a text object or not. With contentType you can be more precise of the type of the content provided e.g. text/html, application/json, etc. | -
**createTextResource(path, text, contentType)**   | Creates a text Resource by the given path and sets the provided string as text object. With contentType you can be more precise of the type of the content provided e.g. text/html, application/json, etc. | -
**getCollection(path)**   | Returns a Collection by the given path | **Collection**
**getResource(path)**   | Returns a Resource by the given path | **Resource**
**getRoot()**   | Returns the root Collection | **Collection**
**hasCollection(path)**   | Check the existence of a Collection by the given path | **boolean**
**hasResource(path)**   | Check the existence of a Resource by the given path | **boolean**
**removeCollection(path)**   | Check the existence of a Collection by the given path | -
**removeResource(path)**   | Check the existence of a Resource by the given path | -




### Objects

---

#### Collection


Function     | Description | Returns
------------ | ----------- | --------
**create()**   | Persist the Collection object to the Repository | -
**delete()**   | Removes the Collection object from the Repository | -
**exists()**   | Check the existence of the Collection object in the Repository | **boolean**
**getName()**   | Returns the name of the Collection object | **string**
**getParent()**   | Returns the Parent of the Collection object | **Collection**
**getPath()**   | Returns the full path of the Collection object | **string**
**createCollection()**   | Creates and returns a new child of this Collection object | **Collection**
**createResource(name, content, isBinary, contentType)**   | Creates a generic child Resource with the given name and sets the provided bytes as content object. The isBinary flag indicates whether the provided content represents a text object or not. With contentType you can be more precise of the type of the content provided e.g. text/html, application/json, etc. | **Resource**
**getCollection(name)**   | Returns a child Collection by name | **Collection**
**getCollections()**   | Returns all the child Collections | **array of Collection**
**getCollectionNames()**   | Returns all the child Collections' names | **array of string**
**getResource(name)**   | Returns a child Resource by name | **Resource**
**getResources()**   | Returns all the child Resources | **array of Resource**
**getResourceNames()**   | Returns all the child Resources' names | **array of string**
**isEmpty()**   | Returns true if the Collection object is empty and false otherwise | **boolean**
**removeCollection(name)**   | Removes a child Collection form the Repository | -
**removeResource(name)**   | Removes a child Resource form the Repository | -
**renameTo(name)**   | Renames the Collection object | -
**moveTo(path)**   | Move the Collection object to a different path | -
**copyTo(path)**   | Copy the Collection object to another path | -



#### Resource


Function     | Description | Returns
------------ | ----------- | --------
**create()**   | Persist the Resource object to the Repository | -
**delete()**   | Removes the Resource object from the Repository | -
**exists()**   | Check the existence of the Resource object in the Repository | **boolean**
**getName()**   | Returns the name of the Resource object | **string**
**getParent()**   | Returns the Parent of the Resource object | **Collection**
**getPath()**   | Returns the full path of the Resource object | **string**
**getContent()**   | Returns the content of the Resource object | **array of byte**
**getTextContent()**   | Returns the content of the Resource object as string | **string**
**isBinary()**   | Returns true if the content of the Resource object is a binary object and false otherwise | **boolean**
**isEmpty()**   | Returns true if the content of the Resource object is empty and false otherwise | **boolean**
**renameTo(name)**   | Renames the Resource object | -
**moveTo(path)**   | Move the Resource object to a different path | -
**copyTo(path)**   | Copy the Resource object to another path | -
**setContent(content)**   | Sets the content of the Resource object as array of byte | -
**setTextContent(text)**   | Sets the content of the Resource object as string | -



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌


