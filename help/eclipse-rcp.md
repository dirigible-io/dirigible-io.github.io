---
layout: help
title: Eclipse Offline Tooling
icon: fa-cogs
group: help-setup
---

Setup Offline Tooling on Eclipse
===




For offline development, Eclipse Dirigible provides standalone plugins for Eclipse. Most of the functionality leverage the single source paradigm promoted by RAP, meaning that the same plugins can be used in a Web and in a standalone environment. The benefits of standalone Eclipse is not only the ability to work offline, but also the possibility to reuse the huge set of features already available as RCP plugins, for example JDT, JSDT, EGit, etc. 

##### Prerequisites

- [Eclipse IDE](https://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/marsr) for Java EE Developers

##### Steps

1. Install the RCP plugins of Dirigible from:

		http://download.eclipse.org/dirigible/drops/R-2.1-201510071717/p2/rcp/

That's it. You can make use of the most productive development model that has ever existed just from your standard Eclipse IDE.

> If you plan to use Java services, just create a Tomcat 7 runtime. Once it is available in the Eclipse environment, the projects created via the Eclipse Dirigible Workspace perspective will automatically find it. This is required for the HttpServletRequest and HttpServletResponse classes used in the standard Eclipse Dirigible Java service interface.

> In this environment, the functionality is limited because there is no running HTTP server to process the requests like in the hosted variant. Besides the enhanced security filters and real time web content processing, you can use the offline mode for scripting services development. In this case, the engines integration can run without a server.

> If you need a fully functional Eclipse Dirigible on your local machine, you can always deploy it on astandalone Tomcat as WAR or just download and run the single JAR executable.
