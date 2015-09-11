---
layout: help
title: Eclipse Offline Tooling
icon: fa-cogs
group: help-setup
---

Setup Offline Tooling on Eclipse
===




For offline mode development environment, Dirigible provide standalone plugins that can run in standard Eclipse. Most of the functionality leverage the single source paradigm promoted by RAP, i.e. the same plugins can be used in Web and standalone environment. The benefits of standalone Eclipse is not only the offline mode that developers can use, but mainly the possibility to reuse also the huge set of features already available as RCP plugins, e.g. JDT, JSDT, EGit, etc. 

##### Prerequisites

- [Eclipse IDE](https://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/marsr) Mars for Java EE Developers

##### Steps

1. Install the RCP plugins of Dirigible as described at:

		http://download.dirigible.io/

That's it. You can make use of the most productive development model ever existed just from your standard Eclipse IDE.

> If you plan to use Java services, just create a Tomcat 7 runtime. Once it is available in the Eclipse environment, the projects created via Dirigible's Workspace perspective will automatically find it. This is required for the HttpServletRequest and HttpServletResponse classes used in the standard Dirigible's Java service interface.

> In this environment, it is a kind of limited functionality caused by the server-less execution. There is no running HTTP server, which processes the requests like in the hosted variant. Besides the enhanced security filters and real time web content processing, you can use the offline mode for scripting services development. The engines integration can run server-less in this case.

> If you need fully functional Dirigible, but on your local machine, you can always deploy it on standalone Tomcat as WAR or just download and run the single JAR executable.