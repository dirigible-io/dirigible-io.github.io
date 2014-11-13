---
layout: help
title: Database
icon: fa-th-large
group: help-perspectives
---

Database Perspective
===

The **Database** perspective contains tools for inspection and manipulation of the artifacts within the underlying relational database. 

You have direct access to the default target schema assigned to your account in the cloud platform. From the *Database Browser* you can expand the schema item and see the list of all tables and views created either via the [models](data_structures.html) or directly via SQL script.

![Database Perspective](images/tooling/perspectives/database/database-perspective.png)

The actions which can be performed on a table or view are:

*	*Open Definition* - presents the columns layout 
*	*Show Content* - generates a select statement in the SQL Console and executes it
*	*Export Data* - exports the data from the table or view in **\*.dsv** format
*	*Delete* - removes physically the table from the database

Another tool in the **Database** perspective is a very generic but powerful one - [SQL Console](sql_console.html).
