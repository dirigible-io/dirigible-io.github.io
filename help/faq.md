---
layout: help
title: FAQ
icon: fa-question-circle
---

{{ page.title }}
---

*If you have a question that is not covered here, but it should be, please let us know.* 


### **Concepts**
***

<details>
<summary><b>Why vertical scenarios? And why with horizontal scaling?</b></summary>
- Covering end-to-end scenarios including all the application layers from architecture perspective as well as all the development process phases from project management perspective<br>
- All or nothing – partial doesn't count <br>
- Equal runtime instances based on a single content package for simple and reliable management <br>
</details>
<details>
<summary><b>Why content-centric with centralized repository?</b></summary>
- All artifacts are in a single repository <br>
- Operational repository vs SCM repository. During development process is used IO optimized repository. After the code is ready it is committed to SCM - version, inspection and support optimized repository. <br>
- Simple life-cycle management and transport <br>
- Workspace, Sandbox, Public Registry separation based on the development life-cycle phases <br>
</details>
<details>
<summary><b>Why In-System Development?</b></summary>
In-System Development is a programming model used when you work directly on a live system.<br>
- Avoid the side-effects of a simulated (local) environment by working on a live system <br>
- Access to the live data via the same channel which will be used in production<br>
- All the dependencies and integrations are on place as they will be in production <br>
- Shortest development turn-around time <br>
- Short life-cycle management process<br>
</details>
<details>
<summary><b>Why In-System Development?</b></summary>
- Perfect match to Dynamic Applications - built for change<br>
- Can interpret (rather than compile) the execution of tasks<br>
- Existing smooth integration within the web servers<br>
- No restart required</br>
- Java is also supported (javax.tools.*)<br>
</details>
<details>
<summary><b>Why injected services?</b></summary>
- Available out-of-the-box for developers – request, response, datasource, http, storage, wiki, indexer, repository, user, etc.<br>
- Standardized API for cloud developers<br>
- Different language's implementations are possible integrated via the extension point<br>
- Different provider's implementations can be exposed to developers on their cloud<br>
</details>
<details>
<summary><b>Why integration services are part of the core?</b></summary>
- Cloud applications usually are extensions to a packaged software (on-premise or on-demand)<br>
- Re-use of 3-thd party services is very often in this context<br>
- Replication use-case - major scenario for on-premise to on-demand cross-platform applications <br>
- Scheduled jobs as asynchronous activities usually needed<br>
- Semantic separation of integration and orchestration services from the other general purpose services<br>
</details>
<details>
<summary><b>Why is the extensibility important and for whom?</b></summary>
- Software vendor's code vs customer's specific extension's code<br>
- Update and Upgrade issues<br>
- Business agility depends on the process change -ability<br>
- Bilateral extension-points and extensions descriptors<br>
</details>
<details>
<summary><b>Why it looks like Eclipse in a web browser? Why not more webby style?</b></summary>
- Lower barrier for Eclipse developers<br>
- Overall experience comfortable for developers proven for years from on-premise tools<br>
- Using of Workbench API and concepts<br>
- There are some alternatives already available for the „webby“ guys<br>
</details>


### **Decisions**
***
<details>
<summary><b>Why RAP?</b></summary>
<a href="http://eclipse.org/rap/">RAP</a> is an Eclipse framework providing a rendering of the user interface for standard SWT/JFace widgets remotely e.g. in a browser. It brings for us:<br>
- Mature and reliable API to develop against<br>
- Stable framework with great support<br>
- Standard modularization – OSGi, plugins<br>
- Writing mostly in pure Java with all the benefits it brings by itself<br>
- Single sourcing - reuse of existing functionality written as Eclipse plugins</br>
- Possibility to integrate non-Java modules as well (pure client side HTML and JavaScript) via the browser component<br>
- Most productive web framework for more complex use-cases like development environments, administration tools, etc.<br>
</details>
<details>
<summary><b>Why Rhino?</b></summary>
<a href="https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino">Rhino</a> is JavaScript engine written in Java. We use it as default scripting engine because:<br>
- Mature and stable framework<br>
- Supports <a href="http://wiki.commonjs.org/wiki/CommonJS">CommonJS</a> for dynamic loading of modules<br>
- Built-in debugger with simple API<br>
- Possibility to invoke standard Java objects directly <br>
</details>
<details>
<summary><b>Why JSON for models?</b></summary>
<a href="http://www.json.org/">JSON</a> is very simple data exchange format. We have chosen it for the standard format for all the models. For us it is:<br>
- Simple enough and human readable/writable<br>
- Support by mature frameworks for parsing/serializing<br>
- Quite popular and proved in web applications context <br>
</details>
<details>
<summary><b>Why flat data models?</b></summary>
We use entity-relational data model because:<br>
- Proved by many business applications for years<br>
- Straight forward implementation on relational-database<br>
- Easy to understand and use by the developers<br>
- Tools for it are also simple and easy to use <br>
</details>
<details>
<summary><b>Why REST instead of server-side generation?</b></summary>
We leverage the use of REST paradigm for the cloud applications created with the toolkit. There are quite enough reasons for these already well described in blogs related to Web 2.0. For us the strong difference is:<br>
- Clean separation of the data services from the user interface<br>
- Independent development of both including easy mocking<br>
- Possibility of reuse and/or composition of services in different user interfaces<br>
- Possibility of UI-less integration if needed<br>
- Better operation and support <br>
</details>
<details>
<summary><b>Why Activate and Publish?</b></summary>
- Supporting sand-boxing is quite nice feature for developers. It is used during development for quick testing.<br>
- The sand-box is per user and it get ready on "Activation".<br>
- "Publish" transfer the artifacts to the central Registry for productive use - one for all.<br>
</details>
<details>
<summary><b>Why one-time-generation?</b></summary>
- It is enough to boost productivity<br>
- MDA failed, isn't it?<br>
</details>
<details>
<summary><b>Why OSGi?</b></summary>
The only real modularization framework for Java nowadays, isn't it?
</details>


### **How to**
***
<details>
<summary><b>How to integrate my dynamic language?</b></summary>
- Have a look at `org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.groovy` plugin for runtime integration<br>
- Register your own script executor provider by `org.eclipse.dirigible.runtime.scripting.IScriptExecutorProvider`<br>
- Create your own Apache Velocity based templates for your language and register them using `org.eclipse.dirigible.ide.template.type` extension point <br>   
</details>
<details>
<summary><b>How to integrate my Java based framework?</b></summary>
 - It is even simpler - wrap it as OSGi plugin (if it isn't already) and add it during the packaging phase as a regular OSGi plugin packaged in a WAR file.<br>
</details>
<details>
<summary><b>How to register my injected service?</b></summary>
 Once you make the your injected service available as OSGi plugin packaged into your WAR file, you can use the interface `org.eclipse.dirigible.runtime.scripting.IContextService` to register it. Actual configurations should be similar to ones at `org.eclipse.dirigible.runtime.wiki` plugin.
</details>
<details>
<summary><b>How to integrate my non-Java framework?</b></summary>
 It depends on the particular framework. Usually it is via the "Command" feature. Please, contact us in case of interest.
</details>
<details>
<summary><b>How to add my own templates?</b></summary>
 Use `org.eclipse.dirigible.ide.template.type` extension point similar as in `org.eclipse.dirigible.ide.template.ui.*` plugins.
</details>
<details>
<summary><b>How to build my own Dirigible?</b></summary>
 You can choose which plugins to include in your own target platform from the Dirigible update sites:<br>
- [http://dirigible.io/p2/bridge/](http://dirigible.io/p2/bridge/)<br>
- [http://dirigible.io/p2/external/](http://dirigible.io/p2/external/)<br>
- [http://dirigible.io/p2/ide/](http://dirigible.io/p2/ide/)<br>
- [http://dirigible.io/p2/lib/](http://dirigible.io/p2/lib/)<br>
- [http://dirigible.io/p2/repository/](http://dirigible.io/p2/repository/)<br>
- [http://dirigible.io/p2/runtime/](http://dirigible.io/p2/runtime/)<br>
</details>

