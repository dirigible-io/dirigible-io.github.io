---
layout: help
title: Help
---

Generation
===

Template based generation of artifacts helps for developer productivity in the initial phase of building the application.
There are several application components, which have similar behavior and often very similar implementation. 
A prominent example is [Entity Service](entity_service.html). It has several predefined methods based on 
[REST](http://en.wikipedia.org/wiki/Representational_state_transfer) concepts and 
[HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) - GET, POST, PUT, DELETE on an entity level as well as list of all entities. 
On the other hand, the most notable storage for the entity's data is the RDBMS provided by the platform. 
Hence to save the developer's effort to create such entity services from scratch we introduced a template, which can be used for generation from table to service.
Another example is user interface templates based on patterns - list, master-detail, input form, etc. 
There can be provided also templates based on different frameworks for client-side interaction.

> The generation is one-time process. Once you have the generated artifact you can modify it based on your own requirements.

In contrast of the [MDA](http://en.wikipedia.org/wiki/Model-driven_architecture), 
where you can expect to regenerate the [PSMs](http://en.wikipedia.org/wiki/Platform-specific_model) every time you make changes on 
[PIMs](http://en.wikipedia.org/wiki/Platform-independent_model), we decided to choose the more pragmatic approach - single model. 
In general it is good to have an abstraction and technology agnostic languages and models, 
but in practice last years it turned out that it brings more problems than the benefits especially for support - where MDA claims to be good for.
