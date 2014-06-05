---
layout: help
title: Help
---

Search Service
===

Search Service exposes the [Apache Lucene](http://lucene.apache.org/) memory index over the Repository content.

* Main use case - search by query string

The endpoint is: */search*

> Parameter: *q*
> 
> http //[host]:[port]/dirigible/ *search?q=[search_query]*
> 
> Explicit search for *name* or *path* fields e.g.:
> 
> http //[host]:[port]/dirigible/ *search?q=path:<term>*


More info about the query syntax of Apache Lucene can be found [here](http://lucene.apache.org/core/2_9_4/queryparsersyntax.html).

* Hard reindex the memory store

> Parameter: *reindex*
> 
> http //[host]:[port]/dirigible/ *search?reindex*


