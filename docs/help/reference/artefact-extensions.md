---
title: Artefact extensions
description: File-extension cheat sheet - what each extension does, which engine runs it.
---

# Artefact extensions

One row per file extension. For full per-artefact docs see the page in the `Artefacts` section.

## Runtime / execution

| Extension | What | Engine | Synchronizer |
| --------- | ---- | ------ | ------------ |
| `*.js`, `*.mjs` | [JavaScript module](/help/artefacts/scripting/javascript) | `engine-javascript` (Graalium) | n/a - loaded on demand |
| `*.ts` | [TypeScript module](/help/artefacts/scripting/typescript) | `engine-typescript` + `engine-javascript` | n/a |
| `*.java` | [Client Java](/help/artefacts/scripting/java) | `engine-java` | `JavaSynchronizer` |
| `*.py` | [Python module](/help/artefacts/scripting/python) | `engine-python` | n/a |
| `*.bpmn` | [BPMN process](/help/artefacts/process/bpmn) | `engine-bpm-flowable` | `BpmnSynchronizer` |
| `*.camel` | [Camel route](/help/artefacts/process/camel) | `engine-camel` | `CamelSynchronizer` |
| `*.job` | [Scheduled job](/help/artefacts/process/job) | `engine-jobs` (Quartz) | `JobSynchronizer` |
| `*.listener` | [Message listener](/help/artefacts/process/listener) | `engine-listeners` | `ListenerSynchronizer` |
| `*.websocket` | [WebSocket binding](/help/artefacts/process/websocket) | `engine-websockets` | `WebsocketsSynchronizer` |
| `*.odata` | [OData service](/help/artefacts/services/odata) | `engine-odata` (CXF) | `ODataSynchronizer` |
| `*.proxy` | [HTTP proxy route](/help/artefacts/services/proxy) | `engine-proxy` | `ProxySynchronizer` |
| `*.nativeapp` | [Native app](/help/artefacts/services/nativeapp) | `engine-native-apps` | NativeApp synchronizer |
| `*.access`, `*.roles` | [Access / roles](/help/artefacts/security/) | `engine-security` | `AccessSynchronizer`, `RolesSynchronizer` |
| `expose` (project root) | [Expose static resources](/help/artefacts/services/expose) | `engine-web` | `ExposesSynchronizer` |
| `*.extensionpoint`, `*.extension` | [Extensions](/help/artefacts/extensibility/) | `core-extensions` | `ExtensionPointsSynchronizer`, `ExtensionsSynchronizer` |
| `*Component.ts` | [TS component](/help/artefacts/extensibility/component) | `engine-di` | `ComponentSynchronizer` |
| `*Entity.ts`, `@Entity` Java | Entity persistence | `data-store` / `data-store-java` | `EntitySynchronizer`, `EntityClassConsumer` |
| `*Controller.ts`, `@Controller` Java | REST controller -> auto OpenAPI | `engine-openapi` | `OpenAPISynchronizer` (+ `ControllerClassConsumer` for Java) |

## Data

| Extension | What | Synchronizer |
| --------- | ---- | ------------ |
| `*.datasource` | [JDBC pool registration](/help/artefacts/data/datasource) | `DataSourcesSynchronizer` |
| `*.schema` | [Schema grouping](/help/artefacts/data/schema) | `SchemasSynchronizer` |
| `*.table` | [Single-table DDL](/help/artefacts/data/table) | `TablesSynchronizer` |
| `*.view` | [View DDL](/help/artefacts/data/view) | `ViewsSynchronizer` |
| `*.csvim`, `*.csv` | [CSV import model](/help/artefacts/data/csvim) | `CsvimSynchronizer` |

## Documentation

| Extension | What | Engine | Synchronizer |
| --------- | ---- | ------ | ------------ |
| `*.md` | [Markdown wiki](/help/artefacts/docs/markdown) | `engine-wiki` | `MarkdownSynchronizer` |
| `*.confluence` | [Confluence wiki](/help/artefacts/docs/confluence) | `engine-wiki` | `ConfluenceSynchronizer` |

## Design-time

These are model artefacts; generation produces runtime artefacts from them.

| Extension | Modeler | Generates |
| --------- | ------- | --------- |
| `*.edm`, `*.model` | [Entity Data modeler](/help/ide/modelers/entity-data) | Full CRUD app via `template-application-*` |
| `*.dsm` | [Database Schema modeler](/help/ide/modelers/database-schema) | `.schema` + `.table` + `.view` |
| `*.form` | [Form Designer](/help/ide/modelers/form-designer) | HTML form layout |
| `*.command` | (legacy) | Shell-command descriptor - superseded by `@aerokit/sdk/platform/command` |

## See also

- [Synchronizer model](/help/concepts/synchronizer-model)
- [Artefacts overview](/help/artefacts/)
