---
layout: help
---

Repository Service
===

Repository Service gives full access to the Dirigible Repository API.

{info}
The endpoint is: */repository*
{info}

To be able to use the service:

{warning}
User must be assigned to Role: *Repository*
*Basic Authentication* headers must be provided
Header *Accept* must be provided with value *application/json*
{warning}

* To get the catalog of the full content:

{info}
http //<host>:<port>/dirigible/ *repository*
{info}

* To get the index of a given collection:

{info}
http //<host>:<port>/dirigible/ *repository/db/dirigible*
{info}

{code}
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
{code}

* To get the content of a given artifact:

{info}
http //<host>:<port>/dirigible/ *repository/db/dirigible/registry/WebContent/<my_web_project>/index.html*
{info}
