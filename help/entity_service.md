---
layout: help
---

Entity Service
===

In general, the Entity Service is fully capable RESTful service as it is defined by [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) architecural style for performance, scalability, simplicity, etc. It exposes the [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations of a given domain model object. Underneath it connects the database store as data transfer layer.
Working following RESTful paradigm on business software components, soon it turns out that there is a service pattern, which is used very often - domain object management. Having in mind also the past experience from web services, we decided to enhance a bit the standard functionality of such a services without breaking REST principles. These enhancements are useful especially for generic utilities and user interface generation.

First of all let list what we have as a standard:

*	*GET* method
	*	if the requested path points directly to the service endpoint (no additional parameters) - it lists all the entities of this type (in this collection)
	*	if the request contains an *id* parameter - then the service returns only the requested entity
*	*POST* method - creates an entity getting the fields from the request body (JSON formatted) and auto-generated id
*	*PUT* method - updates the entity getting the id from the request body (JSON formatted)
*	*DELETE* method - deletes the entity by the provided id parameter which is mandatory

The enhancements we added to the standard functionality:

*	on *GET* as parameters
	*	*count* - returns the number of the entities collection size
	*	*metadata* - returns the simplified descriptor of the entity in JSON (see below)
	*	*sort* - indicate the order of the entities
	*	*desc* - indicates reverse order, used with the above parameter
	*	*limit* - used for paging, returns limited result set
	*	*offset* - used for paging, result set starts from the offset value

Example metadata for an entity

<pre><code>
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
</code></pre>

These enhancements we see as the minimal yet simplest valuable extension to the REST. Similar, but more complex specifications, which intentionally we do not included so far are [OData](http://en.wikipedia.org/wiki/Open_Data_Protocol) and [GData](http://en.wikipedia.org/wiki/GData).

All these features of entity services are implied during the generation process. The template uses as input a database table and name of the entity service, which are entered in the corrsponding [wizard](../samples/entity_service.html).
Just select the *.entity artifact in the Workspace Explorer and use the pop-up menu *Generate->User Interface for Entity Service*.

There are several limitation for the table to be entity service compliant:
*	there should be one and only column as primary key, which will be used for its *identity*
*	only a set of database column types, which are supported by default for generation (simple types only; clob, blob - not supported)

We do not generate also generic query methods, because on one hand it will cover only very simple cases with reasonable performance, which easiliy can be written anyway as additional methods (by parameters) and on the other hand for the complex queries there is no sense to introduce additional layer, which will not give the desired performance as well in comparison to the well analysed by the developer SQL script.

Entity services are generated used JavaScript language, hence the can be accessed right after the generation and publishing on:

<pre><code>
*[protocol]://[host]:[port]/[dirigible's runtime application context]/js/[project]/[entity service path]*
e.g.

*https ://dirigibleide.hana.ondemand.com/dirigible/js/bookstore/books.js*
</code></pre>

or just select them in Workspace Explorer and see the result in the Web Viewer.

