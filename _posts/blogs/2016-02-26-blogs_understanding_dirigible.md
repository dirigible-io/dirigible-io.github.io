---
layout: post
title: "Understanding Dirigible"
category: blogs
tag: blogs
author: nedelcho.delchev
brief: <h4><a href='blogs/2016/02/26/blogs_understanding_dirigible.html'>Understanding Dirigible</a></h4> <sub class="post-info">February 26, 2016 by Nedelcho Delchev</sub></br>During the past years Dirigible evolved from a RAP based web IDE for simplification and adaptation of SOAP based web services to a full fledged Dev Platform...<br>
---


Understanding Dirigible
===

<img class="img-responsive" src="/img/team/nedelcho.delchev.png" style="border-radius: 50%;">
<br>

<sub class="post-info">February 26, 2016 by Nedelcho Delchev</sub>

During the past couple of years Dirigible evolved from an RAP based Web IDE for
simplification and adaptation of SOAP based Web services to a full fledged
Dev Platform with its own yet unique to some extents architecture and features.

Besides the main driving principles like In-System Development Model, Dynamic Alteration,
Content Centric LM, Toolset Completeness, Vertical Scenarios Coverage and the other concepts
that can be found easily at the front pages at the Web site, here we will give you more
detailed insights of how Dirigible compares to the other similar frameworks and platforms.
We will explain the current focus, priorities and future vision.


Blocking vs. non-Blocking
---

There are tons of discussions about the significant improvements in the performance,
using the non-blocking a.k.a asynchronous programming model. 
It is quite successfully used in Node.js, Netty and other frameworks. 
We believe it is useful for many specific scenarios,
especially for long running tasks and complex event processing cases.
On the other hand, the main target application archetype for Dirigible is the one, that consists of
a database backed RESTful services exposed to the end user via HTML5 interface.
This type of applications aim at managing the entities from a 
business derived domain model. In this case the "traditional" i.e. synchronous
structuring of the source code is much easier for Java, PHP, ABAP programmers 
and the all others with the similar background.
Following this de-facto standard development style of writing business applications,
we decided not to teach you how to develop in a new way,
but simply to stick to the synchronous model - no matter that the default language in Dirigible is JavaScript.    
It could be strange to write JavaScript services in the "Java" way,
but this is the case in Dirigible and will remain in the future as a primary target.
All the current Injected APIs are synchronous. 


Events and Flows
---

Following the above statements, in Dirigible we highly encourage the 
you to use the declarative Flows services to achieve the non-blocking
processing of the long running tasks. The underlying flow engine will be responsible
for the distribution and parallelization of the execution of the given task in the best possible way.
Of course, you can code such asynchronous algorithms in JavaScript by using callbacks,
or any other scripting language by using its own capabilities,
but in this case the responsibility of the optimization, debugging and bug-fixing remains entirely yours.


Dependency Management
---

There are plenty of package management tools and dependency management descriptor files 
out there. Starting with the fact that
the major Linux distributions use their own package managers such as APT, RPM, YUM, Zipper,
throughout the language specific "default" descriptors such as 
MANIFEST.MF, package.json, gemspec, etc.
and even the build tools dependency descriptors such as pom.xml, build.xml, bower.json, etc.
it seems that there is no a silver bullet solution for this problem... obviously.
What is for sure - the problem is complex and as much as one tries to fix it completely
with very descriptive manifest files and complicated algorithms for strict dependency resolutions,
the outcome is that the manifest files become too hard to be maintained.
This leads to incorrect content and at the end leads to the fact that
it is quite difficult to have such systems, based on such strict dependencies up and running at all.
The "global install" has its drawbacks e.g. with version conflicts via transitive dependencies,
but to go to the 'npm' style that leads to duplications is simply unacceptable.
Another unacceptable decision is the strongest OSGi approach,
which could prevent a plugin or even the whole application from starting,
if there is an unsatisfied dependencies issues.
The standard Java way so far, with no explicit dependencies check at all
at run time, beats them all. Yes, you ever face such a problem, it will happen at the
worst possible time - when somebody actually start using the chain,
which has a dependency issue - Class Not Found case. In the same time
you can work with all the other chains, which do not have any issue.
In theory this is wrong because it
is not perfect, but in the reality this is the only working model
for the large scale applications combining huge set of components
contributed by the teams that are distributed and diverse.
Hence, in Dirigible we choose the "non-blocking" approach -
the dependencies declarations are only to help you to navigate and pull 
the right components, without stopping you if a single dependency 
is not present at the moment.


JavaScript vs. Java vs. ?
---

The scripting languages are the ones chosen in Dirigible by several reasons.
The project's ultimate driving force - shortest development turn-around time,
requires the time between "coding" and "testing" to be zero or near to zero.
Complex and time consuming build and deploy processes are just unacceptable. Fact.
Scripting languages perfectly matches in this case and the whole
architecture of Dirigible is built around this concept.
Why at the same time do we support Java? The simple answer is - 
as an arbitrary scripting language. The detailed one - with in-memory compilation.
Why JavaScript is the "chosen" one? First class citizen in the
scripting languages group, widely used already for client and server side
components, etc. Also important thing, which to some extents depends 
on the same factors,
there is already available comprehensive source code web based editors,
with highlighting, code analysis and code completion - such as Orion.



Domain Driven Design vs. Model Driven Architecture
---

Domain Driven Design (DDD) is the natural choice of what Dirigible aims to provide -
the dev platform for business services. The starting point of the development 
of a business application is the definition of the domain model entities.
At this phase nothing else matters - only the players and theirs interactions.
The ultimate goal of any toolkit is after this design and definition phase to
generate and run a full-fledged application auto-magically.
We are not there yet, although you can in just a couple of seconds expose your entity from 
a database table, thru the RESTful service with pattern-based HTML5 user interface.
But the important point here is that we know this kind of automatic generation
is just to have a scaffold as a preview quickly. In this way we can have an idea how the real application will
look like eventually, when it is ready. The real work on customizations based on the consumer's
requirements just begins.
What happens if you have to change the model, but
you have already made lots of changes in the generated code?
Bad news, you have to do them again after the generation of the new artefacts or you can
skip the generation step and go and apply the needed modifications
derived from the model changes on your own.
Can Model Driven Architecture (MDA) help here?
If yes, do we see MDA as an essential part of Dirigible?
In short - yes for both. Sometimes the "preview" state is good enough to be used "in the time being".
But we have to be clear here, such a "magic" that can solve this problem completely - does not exist.
MDA approach comes with performance degradation it is never optimized enough for your specific case.
User interface is never fancy enough nor extensible enough. The behavior that comes
from the MDA framework doesn't necessarily match your need, but it is hard or impossible to change.
Hence, in Dirigible we see DDD with one-time generation as a primary approach and MDA as just an option.


Microservices vs. Monoliths
---

There is a big noise related to the Microservices concepts although they are 
neither new nor unknown in the technology space until now.
How do they reflect on Dirigible? How can we build a business application
in the Cloud following the Microservices architecture?
First of all it is possible to do this.
What’s more, in Dirigible this style of componentization is even kind of enforced.
But here comes the major difference - in Dirigible we leverage an unified platform,
which the services can run on - the Dev Platform. Hence, whether you decide to divide
your components to run on separate instances (to scale separately) or to
have them all in a single instance - this is entirely your choice.
We keep the unified approach, because in the most of the cases the performance of the 
local communication channel between the components, for example, is the only acceptable choice.
To be fair here, the Microservices architecture does not come
because it is the best option - that is because this is an approach to solve the current
situation, where many different components are written in different languages, run on different
platforms, hence the unification for the deployment of all these can be done only 
at a very low level - OS, VM, containers and the communication channel can be established 
on a very high (and expensive) level - TCP/HTTP/File System.


Roles Separation vs. One Man Army
---

Depending on the project scale, there is a common suggestion, which constantly appears - separation of roles. 
This leads to the implied conclusion that the different roles (personas) mean different persons.
And this, on the other hand, means that the different persons can use
different tools during the development process of a single solution, doesn't it?
In Dirigible we take this very seriously -
we strive to provide the full set of tools as well as runtime foundation required by all the roles
concerning a given project. Whether you will decide to bring the whole crew to work on
the project or you will do it alone - it is your decision - you can do both.
Dirigible claims to cover all your needs, with the appropriate tooling and runtime engines
to develop your next generation business application.


Open Source vs. Proprietary
---

Dirigible is an open source project. It is based on a huge set of the open source frameworks.
If there weren't such open source methodologies and initiatives, our world would
never be the same, that's for sure. Dirigible would have never appeared.
The collective intelligence - the major benefit of the open source,
proved already many times that it can beat any
other proprietary yet closed way of innovations. 
This leads us to the natural evolution of the Dev Platform concept - Dirigible
to be used as the unified foundation for open source business services and utilities.
Stay tuned for the exiting news in the next couple of weeks.

Enjoy!
