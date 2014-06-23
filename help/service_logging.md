---
layout: help
title: Logging
icon: fa-video-camera
group: help-services
---

Logging Service
===

Logging Service exposes the list of log files as well as theirs content.

> The endpoint is: */logging*

* To list all the available log files use:

> http //<host>:<port>/dirigible/ *logging*

* To retrieve the content of a log file (e.g. ljs_trace.log) use:

> Parameter: *log*
> 
> http //<host>:<port>/dirigible/ *logging?log=ljs_trace.log*


The user interface in the IDE for accessing the logs is [Log Viewer](log_viewer.html).

