---
layout: help
title: Import Project
icon: none
group: help-services
---

Import Project Service
===

The Import Project service provides the end-point for importing project content in design time format (source). This is useful for constructing a PROD instance (consisting only of Runtime components) by importing one or many ready-to-use source projects.

> The end-point is: */import-project*

* To override the existing content:


> Parameter: *override*
> 
> **POST** `http //[host]:[port]/[dirigible application context]/ *import-project?override=true*`

