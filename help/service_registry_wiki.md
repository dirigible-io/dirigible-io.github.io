---
layout: help
title: Wiki Registry
icon: none
group: help-services
---

Wiki Registry Service
===

Wiki Pages Registry Service lists all the wiki pages under the Wiki Content space.

> The endpoint is: */registry-wiki*

To be able to use the service:

> User must be assigned to Role: *Operator*
> *Basic Authentication* headers must be provided
> Header *Accept* must be provided with value *application/json*

* To get the list of the Wiki Pages:

> **GET** `http //[host]:[port]/[dirigible application context]/ *registry-wiki*`

