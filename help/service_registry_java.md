---
layout: help
title: Java Registry
icon: none
group: help-services
---

Java Registry Service
===

Java Registry Service lists all the Java services.

> The endpoint is: */registry-java*

To be able to use the service:

> User must be assigned to Role: *Operator*
> *Basic Authentication* headers must be provided
> Header *Accept* must be provided with value *application/json*

* To get the list of the Java services:

> **GET** `http //[host]:[port]/[dirigible application context]/ *registry-java*`

