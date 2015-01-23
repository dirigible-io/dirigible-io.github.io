---
layout: help
title: Operational
icon: fa-tachometer
group: help-services
---

Operational Service
===

Operational Service exposes some utility functions.

> The end-point is: */op*

* To get the current logged-in user name:


> Parameter: *user*
> 
> `http //[host]:[port]/[dirigible application context]/ *op?user*`

* To log-out from the the current user session:

> Parameter: *logout*
> 
> `http //[host]:[port]/[dirigible application context]/ *op?logout*`