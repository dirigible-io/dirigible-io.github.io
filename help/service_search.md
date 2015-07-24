---
layout: help
title: Search
icon: fa-search
group: help-services
---

Search Service
===

Search Service exposes the [Apache Lucene](http://lucene.apache.org/) memory index over the *Repository* content.

* Main use case - search by query string

The endpoint is: */search*

> Parameter: *q*
> 
> **GET** `http //[host]:[port]/[dirigible application context]/ *search?q=[search_query]*`
> 
> Explicit search for *name* or *path* fields e.g.:
> 
> **GET** `http //[host]:[port]/[dirigible application context]/ *search?q=path:<term>*`


For more information about the query syntax of Apache Lucene, see [Apache Lucene](http://lucene.apache.org/core/2_9_4/queryparsersyntax.html).

* Hard reindex of the memory store

> Parameter: *reindex*
> 
> **GET** `http //[host]:[port]/[dirigible application context]/ *search?reindex*`