---
layout: help
title: Memory
icon: none
group: help-services
---

{{ page.title }} Service
===

Memory Service dumps the current information from the [Runtime](http://docs.oracle.com/javase/6/docs/api/java/lang/Runtime.html).

> The endpoint is: */memory*

> **GET** `http //[host]:[port]/[dirigible application context]/ */memory*`

The result is in JSON format, for example:

<pre><code>{
  "totalMemory":126353408,
  "availableProcessors":4,
  "maxMemory":1877475328,
  "freeMemory":109053320
}
</code></pre>

To retrieve the chart compliant data:

> Parameter: *log*
> 
> **GET** `http //[host]:[port]/[dirigible application context]/ */memory?log*`
