---
layout: help
title: Database Table
icon: fa-code
---

{{ page.title }}
===
The database table is a JSON-based database table descriptor file. Data structures synchroniser automatically reads all the available *.table files in the repository (including the classpath resources) and creates the underlying database tables into the default database. The definition supports also dependencies which gives the ability to the synchroniser to make a topological sorting before starting the creation of the database artifacts. 
