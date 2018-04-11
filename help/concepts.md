---
layout: help
title: Concepts
icon: fa-book
---

Concepts
===

There are several must-to-know concepts implied in the cloud toolkit, which have to be understood before getting started. Some of them are closely related to the [dynamic applications](dynamic_applications.html) nature and behavior, others just follow the best practices from the service architecture reflected also in the cloud applications.

First comes the concept of a [Repository](concepts_repository.html). It is the place where the applications content is stored - such as a database for the Dirigible's instance.

Next is the concept of a [Workspace](concepts_workspace.html), which is very similar to the well known *workspace* from desktop IDEs e.g. Eclipse. The *workspace* can hold one or more *projects*. One user can have multiple workspaces, but can work in one only at a given moment of time.

[Registry](concepts_registry.html) and the related [publishing](publishing.html) processes are taken from the [SOA](http://en.wikipedia.org/wiki/Service-oriented_architecture) (UDDI) and recent API Management to bring some of the strengths, such as discoverability, reusability, loose coupling, relevance, etc.

To boost the development productivity at the very initial phase, we introduced template-based [generation](concepts_generation.html) of application artifacts via wizards.

The new Web 2.0 paradigm and the leveraged [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) architectural style changed the way of how services should behave as well as how to be described. Although there is push for bilateral contracts only and free description of the services, we decided to introduce a bit more sophisticated kind of services for special purposes - [Entity Services](concepts_entity_service.html).
