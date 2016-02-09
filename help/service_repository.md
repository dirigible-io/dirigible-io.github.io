---
layout: help
title: Repository
icon: fa-inbox
group: help-services
---

Repository Service
===

Repository Service gives full access to the Dirigible Repository API.

> The endpoint is: */repository*

To be able to use the service:

> User must be assigned to Role: *Repository*
> *Basic Authentication* headers must be provided
> Header *Accept* must be provided with value *application/json*

* To get the catalog of the full content:

> **GET** `http //[host]:[port]/[dirigible application context]/ *repository*`


* To get the index of a given collection:

> **GET** `http //[host]:[port]/[dirigible application context]/ *repository/db/dirigible*`

		{
		    "name" : "root",
			"path" : "/",
			"files" : [ {
				"name" : "registry",
				"path" : "/dirigible/repository/db/dirigible/registry/",
				"folder" : true
			}, {
				"name" : "sandbox",
				"path" : "/dirigible/repository/db/dirigible/sandbox/",
				"folder" : true
			}, {
				"name" : "templates",
				"path" : "/dirigible/repository/db/dirigible/templates/",
				"folder" : true
			}, {
				"name" : "users",
				"path" : "/dirigible/repository/db/dirigible/users/",
				"folder" : true
			} ]
		}


* To get the content of a given artifact:

> **GET** `http //[host]:[port]/[dirigible application context]/ *repository/db/dirigible/registry/WebContent/[my_web_project]/index.html*`

