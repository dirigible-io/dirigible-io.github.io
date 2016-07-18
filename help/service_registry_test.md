---
layout: help
title: Test Registry
icon: none
group: help-services
---

Test Registry Service
===

Test Registry Service lists all the Test services.

> The endpoint is: */registry-test*

To be able to use the service:

> User must be assigned to Role: *Operator*
> *Basic Authentication* headers must be provided
> Header *Accept* must be provided with value *application/json*

* To get the list of the Test services:

> **GET** `http //[host]:[port]/[dirigible application context]/ *registry-test*`

