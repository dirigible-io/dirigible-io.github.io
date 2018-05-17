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
- Equal runtime instances based on a single content package for simple and reliable management<br>
</details>
<details>
<summary><b>Why content-centric with centralized repository?</b></summary>
- All application artifacts are in a single repository<br>
- Operational repository vs SCM repository. During development process is used IO optimized repository. After the code is ready it is committed to SCM - version, inspection and support optimized repository.<br>
- Simple life-cycle management and transport<br>
- Workspace, Public Registry separation based on the development life-cycle phases<br>
</details>
<details>
<summary><b>Why In-System Development?</b></summary>
- In-System Development is a programming model used when you work directly on a live system<br>
- Avoid the side-effects of a simulated (local) environment by working on a live system<br>
- Access to the live data via the same channel which will be used in production<br>
- All the dependencies and integrations are on place as they will be in production<br>
- Shortest development turn-around time<br>
- Short life-cycle management process<br>
</details>
<details>
<summary><b>Why dynamic languages?</b></summary>
- Perfect match to Dynamic Applications - built for change<br>
- Can interpret (rather than compile) the execution of tasks<br>
- Existing smooth integration within the web servers<br>
- No restart required<br>
- Java is used for the core components of the platform, while JavaScript is for the application business logic (the glue code)<br>
</details>
<details>
<summary><b>Why injected services?</b></summary>
- Available out-of-the-box for developers – request, response, datasource, http, CMIS storage, BPMN engine, wiki, indexer, user, etc.<br>
- <a href="../api/index.html" target="_blank">Standardized API</a> for cloud developers<br>
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
- Using of Resource like API and concepts<br>
- There are some themes you can choose from the menu for more "webby" look and feel<br>
</details>


### **Decisions**
***
<details>
<summary><b>Why moved from RAP to Angular, Bootstrap, GoldenLayout web frameworks?</b></summary>
<a href="http://eclipse.org/rap/">RAP</a> is an Eclipse framework providing a rendering of the user interface for standard SWT/JFace widgets remotely e.g. in a browser. It brings for us:<br>
- RAP is a mature framework and depends on a reliable API, but not so attractive for pure web developers (HTML, JavaScript, etc.)<br>
- RAP is a stable framework with great support, but also it could be said for Angular 1.x and Bootstrap 3.x<br>
- RAP rely on the standard modularization – OSGi, plugins, but comes with the complexity of Maven, Tycho, OSGi, Orbit, etc. integration<br>
- In RAP developers can write mostly in pure Java with all the benefits it brings by itself, but for web developers it turns out it is not a benefit, but a drawback<br>
- In RAP one can have a single sourcing components - reuse of existing functionality written as Eclipse plugins, which has never happen in the reality<br>
- RAP has possibility to integrate non-Java modules as well (pure client side HTML and JavaScript) via the browser component, but it is much more complex than pure web coding<br>
</details>
<details>
<summary><b>Why Rhino? What about Nashorn and V8?</b></summary>
<a href="https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino">Rhino</a> is JavaScript engine written in Java. We use it as default scripting engine because:<br>
- Mature and stable framework<br>
- Supports <a href="http://wiki.commonjs.org/wiki/CommonJS">CommonJS</a> for dynamic loading of modules<br>
- Built-in debugger with simple API<br>
- Possibility to invoke standard Java objects directly, which is not recommended of course<br>
- Nashorn and V8 are also supported in v3 API set and above<br>
</details>
<details>
<summary><b>Why JSON for models?</b></summary>
<a href="http://www.json.org/">JSON</a> is very simple data exchange format. We have chosen it for the standard format for all the models. For us it is:<br>
- Simple enough and human readable/writable<br>
- Support by mature frameworks for parsing/serializing<br>
- Quite popular and proved in web applications context<br>
</details>
<details>
<summary><b>Why flat data models?</b></summary>
- Proved by many business applications for years<br>
- Straight forward implementation on relational-database<br>
- Easy to be understood and used by the developers<br>
- Tools for it are also simple and easy to use<br>
</details>
<details>
<summary><b>Why REST instead of server-side generation?</b></summary>
We leverage the use of REST paradigm for the cloud applications created with the toolkit. There are quite enough reasons for these already well described in blogs related to Web 2.0. For us the strong difference is:<br>
- Clean separation of the data services from the user interface<br>
- Independent development of both including easy mocking<br>
- Possibility of reuse and/or composition of services in different user interfaces<br>
- Possibility of UI-less integration if needed<br>
- Better operations and support<br>
</details>
<details>
<summary><b>Why Publish?</b></summary>
- Developers can work safely on multiple workspaces
- "Publish" transfers the artifacts to the central registry space for public use<br>
</details>
<details>
<summary><b>Why one-time-generation?</b></summary>
- It is enough to boost productivity in some cases<br>
- MDA is also supported via Entity Data Modeler<br>
</details>
<details>
<summary><b>Why not OSGi?</b></summary>
 - OSGi is the only real modularization framework for Java, but comes with much more complexity than needed for our case<br>
 - We moved from OSGi to build only simple Maven dependency management with Java Services and Guice for runtime injections for the backend<br>
</details>


### **How to**
***
<details>
<summary><b>How to integrate my dynamic language?</b></summary>
 - There is an Engine API which can be implemented, as well as a REST service which can execute the code<br>
Please, contact us if you plan such an integration<br>
</details>
<details>
<summary><b>How to integrate my Java based framework?</b></summary>
 - It is even simpler - add it during the packaging phase as a regular Maven module to be packaged in the WAR or the executable JAR files.<br>
</details>
<details>
<summary><b>How to register my injected service?</b></summary>
 Once you make the your core framework available as a Maven module packaged into your WAR file, you can implement your own [Enterprise JavaScript API](../api/index.html) facade.
</details>
<details>
<summary><b>How to integrate my non-Java framework?</b></summary>
 It depends on the particular framework. Usually, it is via the "Command" feature. Please, contact us in case of interest.
</details>
<details>
<summary><b>How to add my own templates?</b></summary>
 It is quite easy - create a project with layout similar to ones from <a href="https://github.com/dirigiblelabs?utf8=%E2%9C%93&q=template-v3&type=&language=" target="_blank">DirigibleLabs</a> 
</details>
<details>
<summary><b>How to build my own Dirigible?</b></summary>
 It is a standard Maven based project, so:<br>
<pre>
> git clone
> cd dirigible
> mvn clean install
</pre>
should work.<br>
</details>

