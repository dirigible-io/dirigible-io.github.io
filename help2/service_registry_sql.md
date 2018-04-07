---
layout: help
title: SQL Registry
icon: none
group: help-services
---

{{ page.title }} Service
===

SQL Registry Service lists all the SQL services.

> The endpoint is: */registry-sql*

To be able to use the service:

> User must be assigned to Role: *Operator*
> *Basic Authentication* headers must be provided
> Header *Accept* must be provided with value *application/json*

* To get the list of the SQL services:

> **GET** `http //[host]:[port]/[dirigible application context]/ *registry-sql*`

