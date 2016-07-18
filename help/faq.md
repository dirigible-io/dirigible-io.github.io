---
layout: help
title: Help
icon: fa-question-circle
---

FAQ
---

*If you have a question that is not covered here, but it should be, please let us know.* 


**Concepts**

- Why vertical scenarios? And why with horizontal scaling?
- Why content-centric with centralized repository?
- Why In-System Development?
- Why dynamic languages? Not Java?
- Why injected services?
- Why integration services are part of the core?
- Why is the extensibility important and for whom?
- Why it looks like Eclipse in a web browser? Why not more webby style?

**Decisions**

- Why RAP?
- Why Rhino?
- Why JSON for models?
- Why flat data models?
- Why REST instead of server-side generation?
- Why Activate and Publish?
- Why one-time-generation?
- Why OSGi?



**How to**

- How to integrate my dynamic language?
- How to integrate my Java based framework?
- How to register my injected service?
- How to integrate my non-Java framework?
- How to add my own templates?
- How to build my own Dirigible?

---

## Why vertical scenarios? And why with horizontal scaling?##

- Covering end-to-end scenarios including all the application layers from architecture perspective as well as all the development process phases from project management perspective
- All or nothing – partial doesn't count
- Equal runtime instances based on a single content package for simple and reliable management

## Why content-centric with centralized repository? ##

- All artifacts are in a single repository
- Operational repository vs SCM repository. During development process is used IO optimized repository. After the code is ready it is committed to SCM - version, inspection and support optimized repository.
- Simple life-cycle management and transport
- Workspace, Sandbox, Public Registry separation based on the development life-cycle phases

## Why In-System Development? ##

In-System Development is a programming model used when you work directly on a live system.

- Avoid the side-effects of a simulated (local) environment by working on a live system 
- Access to the live data via the same channel which will be used in production
- All the dependencies and integrations are on place as they will be in production 
- Shortest development turn-around time 
- Short life-cycle management process

## Why dynamic languages? Not Java? ##

- Perfect match to Dynamic Applications - built for change
- „Can interpret (rather than compile) the execution of tasks“
- Existing smooth integration within the web servers
- No restart required
- Java is also supported (javax.tools.*)

## Why injected services? ##

- Available out-of-the-box for developers – request, response, datasource, http, storage, wiki, indexer, repository, user, etc.
- Standardized API for cloud developers
- Different language's implementations are possible integrated via the extension point
- Different provider's implementations can be exposed to developers on their cloud

## Why integration services are part of the core? ##

- Cloud applications usually are extensions to a packaged software (on-premise or on-demand)
- Re-use of 3-thd party services is very often in this context
- Replication use-case - major scenario for on-premise to on-demand cross-platform applications 
- Scheduled jobs as asynchronous activities usually needed
- Semantic separation of integration and orchestration services from the other general purpose services

## Why is the extensibility important and for whom? ##

- Software vendor's code vs customer's specific extension's code
- Update and Upgrade issues
- Business agility depends on the process change -ability
- Bilateral extension-points and extensions descriptors

## Why it looks like Eclipse in a web browser? Why not more webby style? ##

- Lower barrier for Eclipse developers
- Overall experience comfortable for developers proven for years from on-premise tools
- Using of Workbench API and concepts
- There are some alternatives already available for the „webby“ guys

---




## Why RAP? ##
[RAP](http://eclipse.org/rap/) is an Eclipse framework providing a rendering of the user interface for standard SWT/JFace widgets remotely e.g. in a browser. It brings for us:

- Mature and reliable API to develop against
- Stable framework with great support
- Standard modularization – OSGi, plugins
- Writing mostly in pure Java with all the benefits it brings by itself
- Single sourcing - reuse of existing functionality written as Eclipse plugins
- Possibility to integrate non-Java modules as well (pure client side HTML and JavaScript) via the browser component
- Most productive web framework for more complex use-cases like development environments, administration tools, etc.


## Why Rhino? ##
[Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) is JavaScript engine written in Java. We use it as default scripting engine because:

- Mature and stable framework
- Supports [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) for dynamic loading of modules
- Built-in debugger with simple API
- Possibility to invoke standard Java objects directly 


## Why JSON for models? ##
[JSON](http://www.json.org/) is very simple data exchange format. We have chosen it for the standard format for all the models. For us it is:

- Simple enough and human readable/writable
- Support by mature frameworks for parsing/serializing
- Quite popular and proved in web applications context 
 
## Why flat data models? ##

We use entity-relational data model because:

- Proved by many business applications for years
- Straight forward implementation on relational-database
- Easy to understand and use by the developers
- Tools for it are also simple and easy to use  

## Why REST instead of server-side generation? ##

We leverage the use of REST paradigm for the cloud applications created with the toolkit. There are quite enough reasons for these already well described in blogs related to Web 2.0. For us the strong difference is:

- Clean separation of the data services from the user interface
- Independent development of both including easy mocking
- Possibility of reuse and/or composition of services in different user interfaces
- Possibility of UI-less integration if needed
- Better operation and support 

## Why Activate and Publish? ##

- Supporting sand-boxing is quite nice feature for developers. It is used during development for quick testing.
- The sand-box is per user and it get ready on "Activation".
- "Publish" transfer the artifacts to the central Registry for productive use - one for all. 

## Why one-time-generation?

- It is enough to boost productivity
- MDA failed, isn't it?

## Why OSGi? ##

The only real modularization framework for Java nowadays, isn't it?

---
    

## How to integrate my dynamic language? ##

- Have a look at `org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.groovy` plugin for runtime integration
- Register your own script executor provider by `org.eclipse.dirigible.runtime.scripting.IScriptExecutorProvider`
- Create your own Apache Velocity based templates for your language and register them using `org.eclipse.dirigible.ide.template.type` extension point    

## How to integrate my Java based framework? ##

- It is even simpler - wrap it as OSGi plugin (if it isn't already) and add it during the packaging phase as a regular OSGi plugin packaged in a WAR file. 


## How to register my injected service? ##

Once you make the your injected service available as OSGi plugin packaged into your WAR file, you can use the interface `org.eclipse.dirigible.runtime.scripting.IContextService` to register it. Actual configurations should be similar to ones at `org.eclipse.dirigible.runtime.wiki` plugin 

## How to integrate my non-Java framework? ##

It depends on the particular framework. Usually it is via the "Command" feature. Please, contact us in case of interest.

## How to add my own templates? ##

Use `org.eclipse.dirigible.ide.template.type` extension point similar as in `org.eclipse.dirigible.ide.template.ui.*` plugins

## How to build my own Dirigible? ##

You can choose which plugins to include in your own target platform from the Dirigible update sites:

- [http://dirigible.io/p2/bridge/](http://dirigible.io/p2/bridge/)
- [http://dirigible.io/p2/external/](http://dirigible.io/p2/external/)
- [http://dirigible.io/p2/ide/](http://dirigible.io/p2/ide/)
- [http://dirigible.io/p2/lib/](http://dirigible.io/p2/lib/)
- [http://dirigible.io/p2/repository/](http://dirigible.io/p2/repository/)
- [http://dirigible.io/p2/runtime/](http://dirigible.io/p2/runtime/)

---

