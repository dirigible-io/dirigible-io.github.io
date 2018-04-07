---
layout: help
title: Generation of Scripting Service
icon: none
group: help-services
---

{{ page.title }} Service
===

Generation of Scripting Service Service provides the capability to remotely (via HTTP) generate project artifacts by using the available templates in the current instance. The same templates that are used in the Generation Wizards can be used also here. 

> The end-point is: */generation-scripting-service*

A sample request for creating an "Entity" RESTful service looks like this:

#### POST

	{
	  "templateType":"js_db_crud",
	  "fileName":"myservice.js",
	  "projectName":"myproject",
	  "packageName":"mypackage",
	  "tableName":"MY_BOOKS",
	  "tableType":"TABLE",
	  "columns":
	  [
	    { "name":"BOOKID", "type":"INTEGER", "primaryKey":"true", "visible":"true" },
	    { "name":"BOOKISBN", "type":"CHAR", "primaryKey":"false", "visible":"true" },
	    { "name":"BOOKTITLE", "type":"VARCHAR", "primaryKey":"false", "visible":"true" },
	    { "name":"BOOKAUTHOR", "type":"VARCHAR", "primaryKey":"false", "visible":"true" },
	    { "name":"BOOKPRICE", "type":"DOUBLE", "primaryKey":"false", "visible":"true" }
	  ]
	}

By using GET request you can retrieve the list of all the available templates.
