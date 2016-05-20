---
layout: post
title: "Dirigible - To Replicate or Not To Replicate"
category: blogs
tag: blogs
author: nedelcho.delchev
brief: <h4><a href='blogs/2014/08/19/blogs_dirigible_to_replicate_or_not_to_replicate.html'>Dirigible - To Replicate or Not To Replicate</a></h4> <sub class="post-info">August 19, 2014 by Nedelcho Delchev</sub></br> The existential question, which only seems to offer two equal and yet feasible options...<br>
---

Dirigible - To Replicate or Not To Replicate
===

<img class="img-responsive" src="/img/team/nedelcho.delchev.png" style="border-radius: 50%;">
<br>

<sub class="post-info">August 19, 2014 by Nedelcho Delchev</sub>

The existential question, which only seems to offer two equal and yet feasible options.<br>

The first time we face such a question in a distributed environment (typical in the context of cloud applications) we’ll have a hard time finding the “right” answer …hmm the second time as well? The actual problem is that we cannot give
a universal solution just by definition, but have to go through case by case each time. Such scenarios could be
transferring data between two legacy or 3-thd party systems, between a legacy system and our custom extension,
even between the different extension applications that we could have. There could be different boundary conditions depending mainly on the source and target systems’ capabilities for external communication. Sometimes, additional intermediate component could be required to cope with the integration between the systems. Hence, we need to deeply investigate the pros & cons for the given scenario, personas and components and to take concrete conscious decisions for the architectural patterns, which can be used. We have to consider also aspects like the performance for direct synchronous calls between remote systems, scalability of the source system itself, lack of tailored interfaces for our brand new use-cases, preserving the security model e.g. identity propagation, need of preliminary cache and other non-functional requirements, we often reach to the well-known situation (after taking the red pill) when – “the choice has already been made, and now you have to understand it”.<br>

<a href="http://scn.sap.com/servlet/JiveServlet/downloadImage/38-112251-523197/325-364/6.png"><img alt="show_view.png" class="jive-image" src="http://scn.sap.com/servlet/JiveServlet/downloadImage/38-112251-523197/325-364/6.png"></a><br>


Full Article Here: [Dirigible - To Replicate or Not To Replicate](http://scn.sap.com/community/developer-center/cloud-platform/blog/2014/08/19/dirigible--to-replicate-or-not-to-replicate)
