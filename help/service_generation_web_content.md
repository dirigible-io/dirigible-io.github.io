---
layout: help
title: Generation of Web Content
icon: none
group: help-services
---

{{ page.title }} Service
===

Generation of Web Content Service provides the capability to remotely (via HTTP) generate project artifacts by using the available templates in the current instance. The same templates that are used in the Generation Wizards can be used also here. 

> The end-point is: */generation-web-content*

A sample request for creating an index page with header, footer and menu looks like this:

#### POST

	{
	  "templateType":"index_page",
	  "fileName":"index.html",
	  "projectName":"myproject",
	  "packageName":"mypackage"	
	}

By using GET request you can retrieve the list of all the available templates.
