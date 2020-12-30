---
layout: help
title: Concepts
icon: fa-book
---

Concepts
===

### Dynamic Applications

There are several must-know concepts that are implied in the cloud toolkit and have to be understood before getting started. Some of them are closely related to the [dynamic applications](concepts_dynamic_applications.html) nature and behavior, others just follow the best practices from the service architecture reflected also in the cloud applications.

### Repository

First comes the concept of a [repository](concepts_repository.html). It is the place where the application's content is stored - such as a database for the Eclipse Dirigible's instance.

### Workspace

Next is the concept of a [workspace](concepts_workspace.html), which is very similar to the well known *workspace* from desktop IDEs (e.g., Eclipse). The workspace can hold one or more projects. One user can have multiple workspaces, but can work in only one at a given moment of time.

### Registry

[Registry](concepts_registry.html) and the related [publishing](concepts_publishing.html) processes are taken from the [SOA](http://en.wikipedia.org/wiki/Service-oriented_architecture) (UDDI) and recent API management trends to bring some of their strengths, such as discoverability, reusability, loose coupling, relevance, etc.

### Generation

To boost the development productivity at the very initial phase, we introduced template-based [generation](concepts_generation.html) of application artifacts via wizards.

### Entity Services

The new Web 2.0 paradigm and the leveraged [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) architectural style changed the way services should behave and be described. Although there is push for bilateral contracts only and free description of the services, we decided to introduce a more sophisticated kind of services for special purposes - [entity services](concepts_entity_service.html).

### Modelling

This is the visual definition of database schema models, entity data models, and BPMN processes. In Eclipse Dirigible, modelling is enabled by several [editors and modelers](editorsandmodelers.html). 

### REST framework

Along with the low level HTTP request, response, and session handling, Eclipse Dirigible provides a higher level framework for building REST services. More information on how to use this framework can be found [here](concepts_rest.html).

### Web Content

This is the client-side application code transported via the container web channel. More information can be found [here](concepts_web_content.html).

### Mobile Apps

Mobile application support in Eclipse Dirigible is achieved via [Tabris.js](http://tabrisjs.com).




