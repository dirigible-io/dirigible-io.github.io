---
layout: help
title: Generation of Entity UI
icon: none
group: help-services
---

{{ page.title }} Service
===

Generation of Web Content for Entity Service provides the capability to remotely (via HTTP) generate project artifacts by using the available templates in the current instance. The same templates that are used in the Generation Wizards can be used also here. 

> The end-point is: */generation-web-content-entity*

A sample request for creating a list and manage entity page looks like this:

#### POST

	{
	  "templateType":"list_and_manage",
	  "fileName":"my_page.html",
	  "projectName":"myproject",
	  "packageName":"mypackage",
	  "pageTitle":"My Title",
	  "serviceEndpoint":"/mypackage/myservice.js",
	  "columns":
	  [
	    { "name":"BOOKID", "type":"INTEGER", "primaryKey":"true", "visible":"true", "size":"5", "widgetType":"text", "label":"#" },
	    { "name":"BOOKISBN", "type":"CHAR", "primaryKey":"false", "visible":"true", "size":"13", "widgetType":"text", "label":"ISBN" },
	    { "name":"BOOKTITLE", "type":"VARCHAR", "primaryKey":"false", "visible":"true", "size":"15", "widgetType":"text", "label":"Title" },
	    { "name":"BOOKAUTHOR", "type":"VARCHAR", "primaryKey":"false", "visible":"true", "size":"7", "widgetType":"text", "label":"Author" },
	    { "name":"BOOKPRICE", "type":"DOUBLE", "primaryKey":"false", "visible":"true", "size":"12", "widgetType":"float", "label":"Price" }
	  ]
	}

By using GET request you can retrieve the list of all the available templates.
