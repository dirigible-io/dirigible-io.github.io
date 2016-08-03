---
layout: help
title: Logging
icon: none
group: help-services
---

{{ page.title }} Service
===

Logging Service exposes the list of log files as well as their content.

> The endpoint is: */logging*

* To list all the available log files, use:

> **GET** `http //[host]:[port]/[dirigible application context]/ *logging*`

* To retrieve the content of a log file (e.g. *ljs_trace.log*), use:

> Parameter: *log*
> 
> **GET** `http //[host]:[port]/[dirigible application context]/ *logging?log=ljs_trace.log*`


The user interface in the IDE for accessing the logs is [Log Viewer](log_viewer.html).

