---
title: 3.x Series - A new era began!
author: nedelcho.delchev
---


Hello Dirigibles!

### Let's the new era begin!

As a community driven project we stick to a very important principle that help us to navigate throughout the new emerging technologies and to focus on the right priorities:

> We Listen!
 
Based on the feedback we received so far, we had to take a few major decisions:

#### Moved to the standard Java/Maven development model for the core components

OSGi based development model coming with Maven and Tycho integration, Orbit repositories and target platform definitions was listed many times as something too complex by younger generation of developers tried to understand the project source code and to become contributors. The comparison was often with the Spring Boot and the other similar frameworks and projects. The decision was not easy, but we jumped to pure Maven project structure. The major benfit from this decision is that now you can build your own stack including also external dependencies easily and in a more natural way.

#### Moved from Eclipse RAP to pure Angular 1.x/Boostrap/GoldenLayout for WebIDE

Eclipse RAP was the most stable part we have been using all the time. As a Web port of the Eclipse Rich Client Platform (RCP), we expected that the thousands of Eclipse plugin developers will recognize Dirigible as the easiest way to port their existing plugins to Web or just to leverage their experience to create some brand new Cloud related plugins. This did not happen. We decided to go to pure Angular 1.x/Boostrap/GoldenLayout user interfaces even for the WebIDE parts. The front-end, then use a set of RESTful services for workspace management, life-cycle management, repository, database, documents, etc., following the standard Web 2.0 approach. That one we anyway set for the applications built with Dirigible,  hence now we are developing Dirigible with Dirigible itself. Finally we can say that!  

#### Adapt V8 engine in the API layer

Javascript language and the community around it is quite interesting phenomenon. The language itself, as de-facto THE language for the front-end, last years start gaining traction also as the language for the backend. There are several engines that were used for that and still exist, but it seems now we have a clear winner - V8. It supports the latest language specification and in most of the cases it is the fastest one. We adopted it via the great J2V8 bridge. As a side effect we had to re-implement the Enterprise Javascript API layer to support such a non-JVM engine.

#### Webjars for applications content

To comply with the legacy CI/CD processes, where the requirements such as reproducibility, immutability, testability are must to have features of the underlying framework, we had to add new approach of packaging of the applications for production. We decided to follow the so called "webjars" structures, where the application content (e.g. HTML files, database definitions, extensions, etc.) are packed as a standard Java archive and are accessible at runtime in the same way as they reside within the repository. In this way nobody can change them once they are built into a deployable archive. The side benefit, is that they can be distributed in the same way as the rest of the core modules - as standard Maven dependencies.

#### The focus, the development model and the main goal - reconfirmed

What remained and was reconfirmed was the focus on the business applications development in the cloud. Not just a general purpose IDE or a platform, but tailored for specific scenarios required by the businesses to optimize their processes. In-system programming was clear differentiator, which gives an unique development experience and the fastest turn-around time in the Cloud.

It was hard period for all the contributors to re-implement almost the whole stack from scratch - but we did it!

In the next few days we plan to publish a blog series explaining how exactly we did it and how you can use it - to extend, configure and run Dirigible in the most optimal way.

## Enjoy!
