---
layout: help
title: Overview3
icon: none
group: help-concepts
---

Concepts
===

There are several must-to-know concepts implied in the cloud toolkit, which have to be understood before starting. Some of them are closely related to the [dynamic applications](dynamic_applications.html) nature and behavior, others just follow the best practices from the service architecture reflected also in the cloud applications.

Isolated [workspace](workspace.html) for project management is important when we have to share a single server instance to many users. Another related feature is [sand-boxing](activation.html) - the way every user to have its own private runtime space where to test his/her services during the development.

[Registry](registry.html) and the related [publishing](publishing.html) processes are taken from the [SOA](http://en.wikipedia.org/wiki/Service-oriented_architecture) (UDDI) and recent API Management to bring some of the strengths, such as discoverability, reusability, loose coupling, relevance, etc.

To boost the development productivity at the initial phase, we introduced template-based [generation](generation.html) of application artifacts via wizards. The new Web 2.0 paradigm and the leveraged [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) architectural style changed the way of how services should behave as well as how to be described. Although there is push for bilateral contracts only and free description of the services, we decided to introduce a bit more sophisticated kind of services for special purposes - [Entity Services](entity_service.html).
