---
title: Glossary
description: One-line definitions of platform terms.
---

# Glossary

**Artefact** - A user-authored file (`.js`, `.ts`, `.java`, `.bpmn`, `.job`, `.table`, ...) reconciled into runtime state by a synchronizer.

**Synchronizer** - A Spring bean that scans for one artefact extension, parses each match, upserts a JPA entity, and reacts to lifecycle phases (CREATE, UPDATE, DELETE, START, STOP).

**Registry** - The published-artefacts side of the repository. Reachable at `/registry/public/<project>/...`. The synchronizers reconcile from here.

**Repository** - The platform's storage abstraction. Pluggable via `IRepository` - local filesystem, S3, master/replica setups all sit behind the same interface.

**Workspace** - The IDE's draft area for a single user. Lives at `/users/<user>/workspace/<project>/...`. Publishing copies into the registry.

**Project** - A folder of artefacts. Holds zero or one `project.json` and any number of artefact files.

**Tenant** - An isolated unit in a multi-tenant deployment. Identified by subdomain. Gets its own data sources, CMS root, jobs, listeners, OData services.

**Perspective** - A configured set of editors + views for a single task (Workbench, Database, Git, Operations, Messaging, ...).

**View** - A reusable side / centre / bottom panel mounted into one or more perspectives.

**Editor** - A per-artefact authoring surface (Monaco for code, the BPMN modeler for `*.bpmn`, the form builder for `*.form`, ...).

**Modeler** - A visual designer that authors a model artefact (`*.edm`, `*.dsm`, `*.bpmn`, `*.form`, `*.camel`).

**Engine** - A runtime that executes a class of artefact - `engine-javascript`, `engine-java`, `engine-bpm-flowable`, `engine-camel`, `engine-jobs`, etc.

**Facade** - A `*Facade` Java class exposing static methods that user code (typically JS / TS) can call. Each module in `@aerokit/sdk/*` is backed by one.

**Decorator** - A TS class/method/field decorator that wires the annotated symbol into the platform (`@Controller`, `@Get`, `@Entity`, `@Inject`, `@Scheduled`, `@Listener`, `@Roles`, ...).

**Annotation** - The Java equivalent of a decorator. Same names, same semantics, ships under `org.eclipse.dirigible.sdk.*`.

**Extension point** - A named hook other artefacts can contribute to. Declared by `*.extensionpoint`; satisfied by `*.extension` or `@Extension`-annotated classes.

**Component** - A dependency-injected TS singleton declared via `*Component.ts` and the `@Component(...)` decorator. Java counterpart: `@Repository`.

**Job** - A scheduled task. Declared as a `.job` artefact or with the `@Scheduled(...)` annotation. Backed by Quartz.

**Listener** - A message-bus subscriber. Declared as a `.listener` artefact or with the `@Listener(...)` annotation. Backed by the embedded ActiveMQ broker.

**Route** - A Camel integration route declared as a `.camel` artefact.

**Process** - A BPMN 2.0 process declared as a `.bpmn` artefact. Executed by Flowable.

**OData** - V2 service declared as a `.odata` artefact. Served under `/odata/v2/...` by Apache CXF.

**Camel** - Apache Camel - the integration runtime behind `*.camel` artefacts.

**CMIS** - Content Management Interoperability Services - the standard the platform's Documents perspective speaks. Backends: Internal / S3 / SharePoint.

**SDK** - The shipped Software Development Kit. Two surfaces: `@aerokit/sdk/*` (TS / JS) and `org.eclipse.dirigible.sdk.*` (Java).

**ClientClassLoader** - The classloader the platform installs for client `.java` code. One fresh instance per `engine-java` rebuild cycle.

**Synchronization cycle** - One pass of the reconciler. All artefacts of all types are visited per cycle.

## See also

- [Concepts](/help/concepts/)
- [Artefact extensions](/help/reference/artefact-extensions)
