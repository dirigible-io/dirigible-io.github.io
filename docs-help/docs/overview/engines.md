---
title: Engines
---

Engines
===

## Engines List

The execution engines live under [`components/engine/`](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine) in the source repository. Each engine is auto-discovered by the Spring Boot runtime when its module is on the classpath.

- [JavaScript](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-javascript) - server-side JavaScript executed on top of [GraalVM](https://www.graalvm.org/reference-manual/js/) via the embedded [Graalium](https://github.com/eclipse-dirigible/graalium) runtime.
- [TypeScript](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-typescript) - TypeScript support, transpiled with `tsc`/`esbuild` and executed through the JavaScript engine.
- [Python](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-python) - Python support powered by GraalPy.
- [Web](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-web) - serves static content (HTML, CSS, JS, images) directly out of the repository.
- [Wiki Markdown](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-wiki) - renders [Markdown](https://daringfireball.net/projects/markdown/syntax) using the [Mylyn WikiText](https://wiki.eclipse.org/Mylyn/WikiText) framework.
- [BPM (Flowable)](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-bpm-flowable) - a [BPMN 2.0](http://www.omg.org/bpmn/) execution engine based on [Flowable](https://www.flowable.org/).
- [Camel](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-camel) - [Apache Camel](https://camel.apache.org/) integration routes.
- [Jobs](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-jobs) - scheduled jobs backed by [Quartz](https://www.quartz-scheduler.org/).
- [Listeners](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-listeners) - JMS / message-queue listeners.
- [OData](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-odata) - expose [OData v2](https://olingo.apache.org/) services from database tables/views (served at `/odata/v2`).
- [OpenAPI](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-openapi) - aggregates OpenAPI/Swagger definitions of the running services.
- [WebSockets](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-websockets) - server-side WebSocket endpoints.
- [CMS](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-cms) - Content Management with pluggable backends ([Internal](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-cms-internal), [S3](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-cms-s3), [SharePoint](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-cms-sharepoint)).
- [Command](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-command) - execute shell commands and scripts.
- Template engines - [JavaScript](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-template-javascript), [Mustache](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-template-mustache), and [Velocity](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-template-velocity).
- [SFTP](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-sftp) / [FTP](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-ftp) - file-transfer endpoints.
- [OpenTelemetry](https://github.com/eclipse-dirigible/dirigible/tree/master/components/engine/engine-open-telemetry) - traces, metrics, and logs exporter.