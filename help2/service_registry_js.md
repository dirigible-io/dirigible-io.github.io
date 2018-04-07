---
layout: help
title: JavaScript Registry
icon: none
group: help-services
---

{{ page.title }} Service
===

JavaScript Registry Service lists all the JavaScript services.

> The endpoint is: */registry-js*

To be able to use the service:

> User must be assigned to Role: *Operator*
> *Basic Authentication* headers must be provided
> Header *Accept* must be provided with value *application/json*

* To get the list of the JavaScript services:

> **GET** `http //[host]:[port]/[dirigible application context]/ *registry-js*`

