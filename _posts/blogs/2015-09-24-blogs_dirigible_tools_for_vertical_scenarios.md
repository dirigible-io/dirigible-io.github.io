---
layout: post
title: "Dirigible - Toolkit for Vertical Scenarios"
category: blogs
tag: blogs
author: nedelcho.delchev
brief: <h4><a href='blogs/2015/09/24/blogs_dirigible_tools_for_vertical_scenarios.html'>Dirigible - Toolkit for Vertical Scenarios</a></h4> <sub class="post-info">September 24, 2015 by Nedelcho Delchev</sub></br> What does vertical scenario mean? Why building applications covering such scenarios need special tools and why all these relates to Dirigible?...<br>
---

Dirigible - Toolkit for Vertical Scenarios
===

<img class="img-responsive" src="/img/team/nedelcho.delchev.png" style="border-radius: 50%;">
<br>

<sub class="post-info">September 24, 2015 by Nedelcho Delchev</sub>

What does vertical scenario mean? Why building applications covering such scenarios need special toolkit and why all these relates to Dirigible?

Starting the work on your next cloud application, you have to set the key concepts, architecture, boundary conditions, dependencies, development model, language, tools and many more aspects, which can lead you up to either fast delivery or fail-fast situation. If you do not ask your-self questions about these aspects every time starting a project, in these turbulent times you will not be agile enough, hence not innovative enough, hence - dull coward. Assuming that - you are here and read these article, this means you are agile, innovative, devoted to be perfect each time, so let's continue - what do you need to start and where from?

Let's distinguish four major application categories in the cloud applications domain:

* user interface only
* user interface and services
* user interface, services and data
* user interface, services, data and integration

User Interface Only
----
 
In this category fall the static sites, reports, analytical dash-boards and all the client side only applications, which rely on existing already available services. 

User Interface and Services
----
 
These kind of applications require some server-side logic. Mostly transformation, simplification and adaptation use-cases, where there is already an existing service which provide some data in a given scope and format, but the user interface should use only part of these data in different format.

User Interface, Services and Data
----
 
Here fall the set of well known atomic applications consisting of the standard building blocks - data model and its persistence, business logic in web services and user interface on top of these services.

User Interface, Services, Data and Integrations
----
 
Following the natural process of application evolution, sooner or later the applications from the above category start requiring integrations with some 3td party services, regular replication of data from external sources, scheduled or real-time synchronizations of events, etc.

Progress Gravity
---- 

Based on the above categorization, the question is: in which category does my application fall? Depending on the use-case that you have to cover and the level of understanding of this use-case, you can choose one of four. Are you ready? Good! Which one did you choose?

Next question is what happens after the initial demo with some mocked data, hard-coded configurations and dummy business logic? You have to add some real services with real end-points? You have to create a real persistence, hopefully reliable, eventually consistent and as for the cloud - scalable? Step by step shaping the product adding more and more features mostly based on the key requirements, not just nice to have, you will recognize that your tiny, simple and sweet show-case application became full-fledged yet powerful beast from the last category. How did this happen?! We call this - "progress gravity". No matter how do you start at the beginning, maturity process pulls your application down through the category stack and finally it ends up at the last one.

<br>
<img src="/img/posts/pyramid.png"/>
<br>

End-to-End Coverage with Tools
--- 

Now you have an idea what we do mean with the term "vertical scenario", right? Once you have a real problem you have to solve it completely - partial doesn't count. Who can help you in this situation - usually you need a single instrument for every single task in the chain. What if, all the instruments are packed in one toolkit? This would be perfect, right? You do not need to jump around every time you need to change the instrument. This very simple and naive explanation shows how do we look at the problem and how do we strive to solve it - to provide you with a full-fledged toolkit, where you can find all the single "instruments" you need to build and operate your application for a vertical scenario - <b>completely</b>.

Feedback and Requests
--- 

If you miss an "instrument" in the current version of Dirigible, you can always request such via: <a href="http://forum.dirigible.io">http://forum.dirigible.io</a>






