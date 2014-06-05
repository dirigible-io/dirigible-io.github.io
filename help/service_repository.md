---
layout: help
title: Help - Repository Service
icon: fa-question-circle
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

> http //[host]:[port]/dirigible/ *repository*


* To get the index of a given collection:

> http //[host]:[port]/dirigible/ *repository/db/dirigible*

<pre><code>{
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
</code></pre>

* To get the content of a given artifact:

> http //[host]:[port]/dirigible/ *repository/db/dirigible/registry/WebContent/[my_web_project]/index.html*

