---
layout: help
---

Memory Service
===

Memory Service dumps the current information from the [Runtime|http://docs.oracle.com/javase/6/docs/api/java/lang/Runtime.html].

{info}
The endpoint is: */memory*
{info}

The result is in JSON format, e.g.:

{code}
{
  "totalMemory":126353408,
  "availableProcessors":4,
  "maxMemory":1877475328,
  "freeMemory":109053320
}
{code}

To retrieve the chart compliant data:
{info}
Parameter: *log*
The endpoint is: */memory?log*
{info}
