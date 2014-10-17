---
layout: samples
title: Quartz Job
icon: fa-clock-o
group: simple
---

Scheduled Job with Quartz
===

In the integrated Camel engine, you can use the most popular job scheduling library - [Quartz](http://quartz-scheduler.org/).
A simple job which is triggering every day at midnight, and prints in the default output some message, looks like the following:

<pre><code>
< routes xmlns="http://camel.apache.org/schema/spring">
    < route id="jobId">
        < from uri="quartz://groupName/timerName?cron=0+0+0+*+*+?" />
        < transform>
    		< simple>Hello from Quartz< /simple>
        < /transform>
        < to uri="stream:out"/>
    < /route>
< /routes>
</code></pre>
