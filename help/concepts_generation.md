---
layout: help
title: Generation
icon: none
group: help-concepts
---

{{ page.title }}
===

Template based generation of artifacts helps for developer productivity in the initial phase of building the application. There are several application components that have similar behavior and often very similar implementation. 

A prominent example is [entity service](concepts_entity_service.html). It has several predefined methods based on [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) concepts and [HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) - GET, POST, PUT, DELETE on an entity level as well as a list of all entities. Additionally, the most notable storage for the entity data is the RDBMS provided by the platform.

Another example are user interface templates based on patterns - list, master-detail, input form, etc. 
Templates can also be provided based on different frameworks for client-side interaction.

> NOTE: The generation here is a one-time process. Once you have the generated artifact, you can modify it based on your own requirements.

In contrast to the approach above, in case of [MDA](http://en.wikipedia.org/wiki/Model-driven_architecture), 
you can expect to regenerate the [PSMs](http://en.wikipedia.org/wiki/Platform-specific_model) every time you make changes on [PIMs](http://en.wikipedia.org/wiki/Platform-independent_model). For this approach, we introduced the [entity data modeler](ide_editor_edm.html) where you can define declaratively all the needed components and their attributes. Afterwards, you can use them to generate a complete full-stack data-driven application.

> NOTE: The enhancements in this case must go via [extensions](concepts_extensions.html) only.

