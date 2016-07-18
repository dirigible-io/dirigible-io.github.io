---
layout: help
title: Web Registry
icon: none
group: help-services
---

Web Registry Service
===

Web Content Registry Service lists all the artifacts under the Web Content space.

> The endpoint is: */registry-web*

To be able to use the service:

> User must be assigned to Role: *Operator*
> *Basic Authentication* headers must be provided
> Header *Accept* must be provided with value *application/json*

* To get the list of the Web Content artifacts:

> **GET** `http //[host]:[port]/[dirigible application context]/ *registry-web*`

