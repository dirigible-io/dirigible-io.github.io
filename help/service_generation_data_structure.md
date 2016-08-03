---
layout: help
title: Generation of Data Structure
icon: none
group: help-services
---

{{ page.title }} Service
===

Generation of Data Structure Service provides the capability to remotely (via HTTP) generate project artifacts by using the available templates in the current instance. The same templates that are used in the Generation Wizards can be used also here. 

> The end-point is: */generation-data-structure*

A sample request for creating a relational database table looks like this:

#### POST

	{
	  "templateType":"table",
	  "fileName":"mytable.table",
	  "projectName":"myproject",
	  "packageName":"mypackage",
	  "columns":
	  [
	    {"name":"BOOKID", "type":"INTEGER", "length":"0", "notNull":"true", "primaryKey":"true", "defaultValue":""},
	    {"name":"BOOKISBN", "type":"CHAR", "length":"13", "notNull":"true", "primaryKey":"false", "defaultValue":""},
	    {"name":"BOOKTITLE", "type":"VARCHAR", "length":"200", "notNull":"true", "primaryKey":"false", "defaultValue":""},
	    {"name":"BOOKAUTHOR", "type":"VARCHAR", "length":"100", "notNull":"true", "primaryKey":"false", "defaultValue":""},
	    {"name":"BOOKPUBLICATIONDATE", "type":"DATE", "length":"0", "notNull":"false", "primaryKey":"false", "defaultValue":""},
	    {"name":"BOOKPRICE", "type":"DOUBLE", "length":"0", "notNull":"true", "primaryKey":"false", "defaultValue":""}
	  ]
	}

By using GET request you can retrieve the list of all the available templates.
