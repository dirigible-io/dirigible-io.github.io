---
layout: help
title: Architecture
icon: fa-building-o
---

{{ page.title }}
===

The Eclipse Dirigible architecture follows the well proved principles of simplicity and scalability in the classical service-oriented architecture.

The components are separated between the design time (definition work, modeling, scripting) and the runtime (execution of services, content provisioning and monitoring). The transition between design time and runtime is achieved with a [repository](concepts_repository.html) component. The only linking part is the content itself.

![Dirigible Design Time and Runtime](images/architecture_designtime_runtime.png){: .img-responsive }

At design time, the programmers and designers use the Web-based integrated development environment [Web IDE](ide.html). This tooling is based on the most popular client side JavaScript framework - AngularJS, as well as Bootstrap for theme-ing and GoldenLayout for windows management.

![Dirigible Design Time and Runtime](images/ide_workbench_perspective.png){: .img-responsive }

After the creation of the cloud application, it gets provided by the runtime components. The underlying technology platform is the Java Web Profile compliant application server (such as Tomcat). On top, there are the Eclipse Dirigible containers for service execution, which depending on the scripting language and purpose can be: Rhino, Nashorn, V8, Mylyn, Flowable, ActiveMQ, etc. The runtime can be scaled independently from the design time and can be deployed without the design time at all (for productive landscapes).

![Dirigible Components](images/architecture_components.png){: .img-responsive }

Depending on the target cloud platform, in Eclipse Dirigible can be integrated the services provided by the underlying platform.

![Dirigible on a Cloud Platform](images/architecture_on_platform.png){: .img-responsive }

