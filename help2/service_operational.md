---
layout: help
title: Operational
icon: none
group: help-services
---

{{ page.title }} Service
===

Operational Service exposes some utility functions.

> The end-point is: */op*

> **GET** `http //[host]:[port]/[dirigible application context]/ *op*`

* To get the current logged-in user name:


> Parameter: *user*
> 
> **GET** `http //[host]:[port]/[dirigible application context]/ *op?user*`

* To log-out from the the current user session:

> Parameter: *logout*
> 
> **GET** `http //[host]:[port]/[dirigible application context]/ *op?logout*`
