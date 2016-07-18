---
layout: help
title: Data Export
icon: none
group: help-services
---

Data Export Service
===

Data Export service helps in exporting the data of a table in delimiter separated values file (*.dsv).

> The end-point is: */data-export*
> Parameter: *table* the name of the table to be exported

Can be useful for backups of the data for test purposes.

> **GET** `http //[host]:[port]/[dirigible application context]/ *data-export*?table=XXX`
