---
title: FAQ
---

*If you have a question that is not covered here, but it should be, please let us [know](https://github.com/eclipse/dirigible/issues).* 


## Concepts

???+ info "In-System Development"
    - `In-System Development` is a programming model used when you work directly on a live system.
    - Avoid side-effects of a simulated (local) environment by working on a live system.
    - Access live data via the same channel which will be used in production.
    - All the dependencies and integrations are on place as they will be in production.
    - Shortest development turn-around time.
    - Short life-cycle management process.
    
??? info "Vertical Scenarios & Horizontal Scaling"
    - Covering end-to-end scenarios including all the application layers from architecture perspective as well as all the development process phases from project management perspective.
    - All or nothing – partial doesn't count.
    - Equal runtime instances based on a single content package for simple and reliable management.

??? info "Content-Centric & Centralized Repository"
    - All application artifacts are in a single repository.
    - Operational repository vs SCM repository. During development process is used IO optimized repository. After the code is ready it is committed to SCM - version, inspection and support optimized repository.
    - Simple life-cycle management and transport.
    - Workspace, Public Registry separation based on the development life-cycle phases.

??? info "Dynamic Languages"
    - Perfect match to Dynamic Applications - built for change.
    - Can interpret (rather than compile) the execution of tasks.
    - Existing smooth integration within the web servers.
    - No restart required.
    - Java is used for the core components of the platform, while JavaScript is for the application business logic (the glue code).

??? info "Injected Services"
    - Available out-of-the-box for developers – request, response, datasource, http, CMIS storage, BPMN engine, wiki, indexer, user, etc.
    - [Standardized API](../../../api/) for cloud developers.
    - Different language's implementations are possible integrated via the extension point.
    - Different provider's implementations can be exposed to developers on their cloud.

??? info "Integration Services"
    Why integration services are part of the core?

    - Cloud applications usually are extensions to a packaged software (on-premise or on-demand).
    - Re-use of 3-rd party services is very often in this context.
    - Replication use-case - major scenario for on-premise to on-demand cross-platform applications.
    - Scheduled jobs as asynchronous activities usually needed.
    - Semantic separation of integration and orchestration services from the other general purpose services.

??? info "Extensibility"
    Why is the extensibility important and for whom?

    - Software vendor's code vs customer's specific extension's code.
    - Update and Upgrade issues.
    - Business agility depends on the process change -ability.
    - Bilateral extension-points and extensions descriptors.

## Decisions

???+ important "GraalJS"
    Why [GraalJS](https://www.graalvm.org/reference-manual/js/)? What about Rhino, Nashorn and V8?

    - Mature engine with the best performance.
    <!-- - Supports [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) for dynamic loading of modules. -->
    - Built-in debugger with simple API.
    - Possibility to invoke standard Java objects directly, which is not recommended of course.

??? important "JSON Models"
    Why JSON for models?

    - [JSON](https://www.json.org/) is very simple data exchange format. We have chosen it for the standard format for all the models.
    - Simple enough and human readable/writable.
    - Support by mature frameworks for parsing/serializing.
    - Quite popular and proved in web applications context.

??? important "Flat Data Models"
    Why flat data models?

    - Proved by many business applications for years.
    - Straight forward implementation on relational-database.
    - Easy to be understood and used by the developers.
    - Tools for it are also simple and easy to use.

??? important "REST"

    Why REST instead of server-side generation?

    - We leverage the use of REST paradigm for the cloud applications created with the toolkit. There are quite enough reasons for these already well described in blogs related to Web 2.0.
    - Clean separation of the data services from the user interface.
    - Independent development of both including easy mocking.
    - Possibility of reuse and/or composition of services in different user interfaces.
    - Possibility of UI-less integration if needed.
    - Better operations and support.

??? important "Publish"
    Why Publish?

    - Developers can work safely on multiple workspaces.
    - "Publish" transfers the artifacts to the central registry space for public use.

??? important "One-Time-Generation"

    Why one-time-generation?

    - It is enough to boost productivity in some cases.
    - MDA is also supported via Entity Data Modeler.

??? important "No OSGi"

    - OSGi is the only real modularization framework for Java, but comes with much more complexity than needed for our case.
    - We moved from OSGi to build only simple Maven dependency management with Java Services and Guice for runtime injections for the backend.

## How to

???+ question "How to build my own Dirigible?"

    It is a standard Maven based project, so:

    ```
    git clone
    cd dirigible
    mvn clean install
    ```

    should work.

??? question "How to add my own templates?"

    It is quite easy - create a project with layout similar to ones from [DirigibleLabs](https://github.com/dirigiblelabs?utf8=%E2%9C%93&q=template-v3&type=&language=) 

??? question "How to integrate my Java framework?"

    It is even simpler - add it during the packaging phase as a regular Maven module to be packaged in the WAR or the executable JAR files.

??? question "How to register my Enterprise JavaScript API?"

    Once you make the your core framework available as a Maven module packaged into your WAR file, you can implement your own [Enterprise JavaScript API](../../../api/) facade.

??? question "How to integrate my non-Java framework?"

    It depends on the particular framework. Usually, it is via the Command feature. Please, contact us in case of interest.

??? question "How to integrate my dynamic language?"

    There is an Engine API which can be implemented, as well as a REST service which can execute the code.

    !!! warning
		Please, contact us if you plan such an integration.