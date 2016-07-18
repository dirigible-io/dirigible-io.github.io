---
layout: help
title: Flow Registry
icon: none
group: help-services
---

Flow Registry Service
===

Flow Registry Service lists all the Flow declarations.

> The endpoint is: */registry-flow*

To be able to use the service:

> User must be assigned to Role: *Operator*
> *Basic Authentication* headers must be provided
> Header *Accept* must be provided with value *application/json*

* To get the list of the flows services:

> **GET** `http //[host]:[port]/[dirigible application context]/ *registry-flow*`

