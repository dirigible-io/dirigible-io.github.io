---
layout: help
title: Entity Service
icon: none
group: help-concepts
---

{{ page.title }}
===

In general, the Entity Service is a fully capable RESTful service as it is defined by [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) architectural style for performance, scalability, simplicity, and so on. It exposes the [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations of a given domain model object. Underneath it,the database store is connected as a data transfer layer.

 The **domain object management** is the service pattern that is used most often when following the RESTful paradigm on business software components. In Eclipse Dirigible, the standard functionality of Web services is enhanced but without breaking the REST principles. This is useful for generic utilities and used interface generation.

Standard functionality:

*	*GET* method
	*	If the requested path points directly to the service endpoint (no additional parameters), it lists all the entities of this type (in this collection).
	*	If the request contains an *id* parameter, the service returns only the requested entity.
*	*POST* method - creates an entity, getting the fields from the request body (JSON formatted) and auto-generated ID.
*	*PUT* method - updates the entity, getting the ID from the request body (JSON formatted).
*	*DELETE* method - deletes the entity by the provided ID parameter, which is mandatory.

Enhancements to the standard functionality of *GET* with the following parameters:
*	*count* - returns the number of the entities collection size.
*	*metadata* - returns the simplified descriptor of the entity in JSON (see below).
*	*sort* - indicates the order of the entities.
*	*desc* - indicates the reverse order used with the above parameter.
*	*limit* - used for paging, returns limited result set.
*	*offset* - used for paging, result set starts from the offset value.

Example metadata for an entity:

```javascript

	{"name":"books","type":"object","properties":
	  [
	    {"name":"book_id","type":"integer","key":"true","required":"true"},
	    {"name":"book_isbn","type":"string"},
	    {"name":"book_title","type":"string"},
	    {"name":"book_author","type":"string"},
	    {"name":"book_editor","type":"string"},
	    {"name":"book_publisher","type":"string"},
	    {"name":"book_format","type":"string"},
	    {"name":"book_publication_date","type":"date"},
	    {"name":"book_price","type":"double"}
	  ]
	}
```

All these features of entity services are implied during the generation process. The template uses as input a database table and an entity service name, which are entered in the corresponding [wizard](../samples/entity_service.html).
Just select the **\*.entity** artifact in the *Workspace Explorer*. From the context menu *Generate*, select *User Interface for Entity Service*.

Limitations for the table to be entity-service compliant:

*	There should be only one column as a primary key, which will be used for its *identity*.
*	There should be only one set of database column types, which are supported by default for generation (simple types only as clob and blob are not supported).

Generic query methods are not generated because:
* It will cover only very simple cases with reasonable performance
* For the complex queries, the introduction of an additional layer results in worse performance in comparison to the SQL script.

Entity services are generated in JavaScript, hence they can be accessed right after the generation and publishing on:


> [protocol]://[host]:[port]/[dirigible application context]/services/js/[project]/[entity service path]

e.g.

> https ://example.com/dirigible/services/js/bookstore/books.js

or just select them in the *Workspace Explorer* and see the result in the **Preview**.

