---
title: 3.x Series - A new era has begun!
author: nedelcho.delchev
---


Hello Dirigibles!

### Let the new era begin!

As a community-driven project, we stick to a very important principle that helps us navigate throughout the new emerging technologies and focus on the right priorities:

> We Listen!
 
Based on the feedback we have received so far, we had to take a few major decisions:

#### Moved to the standard Java/Maven development model for the core components

The OSGi-based development model coming with Maven and Tycho integration, Orbit repositories and target platform definitions was listed many times as something too complex by the younger generation of developers who tried to understand the project source code and become contributors. The comparison was often with Spring Boot and other similar frameworks and projects. The decision was not easy, but we jumped to pure Maven project structure. The major benefit from this decision is that now you can build your own stack including also external dependencies more easily and in a more natural way.

![dirigible-architecture-components](/img/posts/20180202/dirigible-architecture-components.png){: .img-responsive }  

#### Moved from Eclipse RAP to pure Angular 1.x/Boostrap/GoldenLayout for WebIDE

Of all the technologies we have been using, Eclipse RAP has been the most stable one. As a Web port of the Eclipse Rich Client Platform (RCP), we expected that the thousands of Eclipse plugin developers would recognize Dirigible as the easiest way to port their existing plugins to the Web or just to leverage their experience to create some brand new Cloud-related plugins. This did not happen. We decided to go to pure Angular 1.x/Boostrap/GoldenLayout user interfaces even for the WebIDE parts. The front-end now uses a set of RESTful services for workspace management, lifecycle management, repository, database, documents, etc., following the standard Web 2.0 approach. We have chosen that approach for building applications with Dirigible, hence now we are developing Dirigible with Dirigible itself. Finally we can say that!

![workspace-v3](/img/posts/20180202/workspace-v3.png){: .img-responsive }  

#### Adapt V8 engine in the API layer

The JavaScript language and the community around it is quite an interesting phenomenon. The language itself, acknowledged as de facto THE front-end programming language, in recent years has also started gaining attention as a back-end language. There are several engines that were used for that and still exist, but now it seems we have a clear winner - V8. It supports the latest language specification and in most cases it is the fastest one. We adopted it via the great J2V8 bridge. As a side effect, we had to reimplement the Enterprise Javascript API layer to support such a non-JVM engine.

#### Webjars for applications content

To comply with the legacy of CI/CD processes, where requirements such as reproducibility, immutability, testability are must-have features of the underlying framework, we had to add a new approach of packaging of the applications for production. We decided to follow the so called "webjars" structures, where the application content (e.g. HTML files, database definitions, extensions, etc.) are packed as a standard Java archive and are accessible at runtime in the same way as they reside within the repository. In this way, nobody can change them once they are built into a deployable archive. The side benefit is that they can be distributed in the same way as the rest of the core modules - as standard Maven dependencies.

![dirigible-lifecycle-flows](/img/posts/20180202/dirigible-lifecycle-flows.png){: .img-responsive }

#### The focus, the development model and the main goal - reconfirmed

What remained and was reconfirmed was the focus on the business applications development in the cloud. Not just a general purpose IDE or a platform, but tailored for specific scenarios required by the businesses to optimize their processes. In-system programming was the clear differentiator giving an unique development experience and the fastest turn-around time in the Cloud.

It was a hard period for all contributors to reimplement almost the whole stack from scratch - but we did it!

In the next few days, we plan to publish a series of blog articles explaining how exactly we did it and how you can use it - to extend, configure, and run Dirigible in the most optimal way.
