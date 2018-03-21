---
layout: help
title: Architecture
icon: fa-question-circle
---

{{ page.title }}
===

The Eclipse Dirigible architecture follows the well proved principles of simplicity and scalability in the classical service-oriented architecture.

The components are separated between the design time (definition work, modeling, scripting) and the runtime (execution of services, content provisioning and monitoring). The transition between design time and runtime is achieved with a repository component. The only linking part is the content itself.

At design time, the programmers and designers use the Web-based integrated development environment. This tooling is mainly based on the Remote Application Platform (RAP) from Eclipse. Using this robust and powerful framework, the tooling itself can be easily enhanced via well known APIs and concepts, such as SWT, JFaces, OSGi, extension points, etc.

The Repository is the container of the project artifacts. It is a generic file system like acontent repository in a relation database.

After the creation of the cloud application, it is provided by the runtime components. The main part is the Java Web Profile compliant application server. On top of it are the Eclipse Dirigible containers for service execution, which depending on the scripting language and purpose can be: Rhino, jRuby, Groovy, Camel, CXF, etc. The runtime can be scaled independently from the design time and can be deployed without the design time at all (for productive landscapes).

Depending on the target cloud platform, in Eclipse Dirigible can be integrated the services provided by the underlying platform.

![Dirigible Components](images/architecture.png)

