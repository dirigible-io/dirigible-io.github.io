# Java SDK

Welcome to the **Eclipse Dirigible Java SDK** documentation.

The Java SDK is the Java surface of the Eclipse Dirigible platform - a comprehensive set of facades and annotations under `org.eclipse.dirigible.sdk.*` that lets you build cloud applications, services, jobs, and integrations in pure Java, running directly inside the Dirigible runtime.

## The Dirigible Development Model

Eclipse Dirigible is **polyglot by design**. The platform exposes the same underlying capabilities to every supported language through dedicated SDKs - Java, TypeScript, JavaScript, Python - so teams pick the language that fits the task and the engineer, not the platform. The Java SDK, the TypeScript SDK, and any future language bindings all delegate to the same in-process platform services, so behaviour stays consistent regardless of which language a given file is written in.

For Java specifically, that means:

* `.java` source files dropped under `/registry/public/<project>/...` are compiled in-process by the `engine-java` synchronizer
* The SDK classpath is already wired in - no Maven or Gradle build setup needed inside the platform
* You import from `org.eclipse.dirigible.sdk.*` and call static facades or decorate classes with annotations to wire them into the runtime
* The same project can mix Java with TypeScript / JavaScript files; everything runs in the same JVM and shares the same data sources, message queues, jobs, and security context

## Overview

The SDK provides a modular, facade-style surface that lets Java code:

* Build REST controllers and request / response handling
* Talk to databases (relational + dynamic stores)
* Schedule jobs, listen on message queues, run BPM processes
* Manage configuration, environment, and the platform repository
* Integrate with caches, search indexes, mail, PDF, templates
* Reach external systems - MongoDB, Redis, etcd, RabbitMQ, Kafka, QLDB

The SDK is split into independent packages under `org.eclipse.dirigible.sdk.*`. Each one focuses on a single concern and is explored separately from the sidebar.

## Modules

The Java SDK groups its surface into the following package categories:

* **Core** - configuration, context, environment, globals
* **HTTP** - synchronous HTTP client, request/response, sessions, uploads, REST decorators
* **Database** - `DatabaseFacade` operations, dynamic entity store, JPA-style decorators
* **BPM** - process deployment, runtime, tasks (Flowable-backed)
* **Job** - scheduler facade + `@Scheduled` decorator
* **Messaging** - platform queues/topics with `@Listener` decorator
* **Integrations** - external systems (Kafka, RabbitMQ, Mail, MongoDB, Redis, etcd, QLDB, CMS)
* **IO** - Files, Bytes, Streams, Zip, Image
* **Security** - authenticated user info, `@Roles` decorator
* **Platform** - Workspace, Registry, Repository, Engines, Lifecycle, OS
* **Utilities** - Base64, Hex, UUID, JSON/XML converters, escapes, digests, QR codes
* **Net** - SOAP, Websockets
* **Indexing / Cache / Template / PDF / Git / Extensions**

## Getting Started

The SDK is **pre-bundled** with every Eclipse Dirigible runtime - there is nothing to install on the classpath. A `.java` source file placed in a Dirigible project just imports from `org.eclipse.dirigible.sdk.*`:

```java
import org.eclipse.dirigible.sdk.log.Logging;
import org.eclipse.dirigible.sdk.log.Logger;

public class Demo {
    private static final Logger LOG = Logging.getLogger("com.acme.demo");

    public static void main(String[] args) {
        LOG.info("hello from Java SDK");
    }
}
```

For a full REST + persistence example, see [Get Started](/sdk/get-started).

## Design Principles

* **Polyglot platform, one runtime** - Java code runs side-by-side with other languages inside the same JVM
* **Static facades** - pure utility classes; no DI plumbing needed to call `Files.read(...)` or `Logging.getLogger(...)`
* **Annotation-driven app code** - controllers, entities, jobs, and listeners are declared with annotations under `org.eclipse.dirigible.sdk.*`
* **Pass-through, not abstraction** - modules like `mongodb`, `redis`, `etcd`, `cms` return the underlying client (Jedis, MongoClient, Apache Chemistry `Session`, etc.) so power users keep full access to the upstream API

## License

Eclipse Dirigible - including the Java SDK - is released under the [Eclipse Public License v2.0](https://www.eclipse.org/legal/epl-v20.html).

## Next Steps

Pick a module from the sidebar to browse its classes, annotations, and usage examples.
