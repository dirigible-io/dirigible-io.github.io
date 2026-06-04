---
layout: help
title: Concepts Overview
icon: fa-book
---

Concepts Overview
===

## Dynamic Applications

There are several must-know concepts that are implied in the cloud toolkit and have to be understood before getting started. Some of them are closely related to the [dynamic applications](dynamic-applications/) nature and behavior, others just follow the best practices from the service architecture reflected also in the cloud applications.

## Repository

First comes the concept of a [repository](repository/). It is the place where the application's content is stored - such as a database for the Eclipse Dirigible's instance.

## Workspace

Next is the concept of a [workspace](workspace/) that is very similar to the well known *workspace* from desktop IDEs (e.g., Eclipse). The workspace can hold one or more projects. One user can have multiple workspaces, but can work in only one at a given moment of time.

## Registry

[Registry](registry/) and the related [publishing](publishing/) processes are taken from the [SOA](http://en.wikipedia.org/wiki/Service-oriented_architecture) (UDDI) and recent API management trends to bring some of their strengths, such as discoverability, reusability, loose coupling, relevance, etc.

## Generation

To boost the development productivity at the very initial phase, we introduced template-based [generation](generation/) of application artifacts via wizards.

## Entity Services

The new Web 2.0 paradigm and the leveraged [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) architectural style changed the way services should behave and be described. Although there is push for bilateral contracts only and free description of the services, we decided to introduce a more sophisticated kind of services for special purposes - [entity services](entity-service/).

## Modeling

This is the visual definition of database schema models, entity data models, and BPMN processes. In Eclipse Dirigible, modeling is enabled by several [editors and modelers](../../overview/editors-modelers). 

## REST framework

Along with the low level HTTP request, response, and session handling, Eclipse Dirigible provides a higher level framework for building REST services. More information on how to use this framework can be found [here](rest/).

## Web Content

This is the client-side application code transported via the container web channel. More information can be found [here](web-content/).

## Mobile Apps

Mobile application support in Eclipse Dirigible is achieved via [Tabris.js](http://tabrisjs.com).

## Extensions

Extensibility is an important requirement for business applications built to follow custom processes in Line of Business (LoB) areas. In the cloud toolkit, a generic description of the extension points and extensions is provided without explicitly defining the contract. This a simple but powerful way to define [extensions](extensions/).


