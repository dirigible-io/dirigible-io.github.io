---
title: Generation from templates
description: Scaffold projects and individual artefacts from the platform's template library.
---

# Generation from templates

Dirigible ships a library of templates that generate either a full application or a single artefact. Templates live under `components/template/template-*/` in the source tree and are reachable through the IDE's **Generate** action or the `GenerationEndpoint` REST API.

## Two template families

| Family | Examples | What it produces |
| ------ | -------- | ---------------- |
| **Application** | `template-application-angular`, `…-angular-java`, `…-angular-v2`, `template-application-dao`, `…-rest`, `…-data`, `…-feed`, `…-odata`, `…-schema`, `…-ui-angular` | Full CRUD app: tables, REST endpoints, OData, UI. Driven by an EDM model. |
| **Single artefact** | `template-bpm`, `template-camel`, `template-camel-cron-route`, `template-camel-http-route`, `template-database-access`, `template-database-table`, `template-database-view`, `template-editor`, `template-extension-perspective`, `template-extension-view`, `template-form`, `template-form-builder-angularjs`, `template-html`, `template-http-client`, `template-job`, `template-listener`, `template-mapping-javascript`, `template-perspective`, `template-react`, `template-typescript`, `template-view`, `template-websocket` | One file or a tight bundle of files for the named artefact. |

Sample-project templates: `template-bookstore`, `template-hello-world`.

## Generating from an Entity Data Model

The Entity Data Modeler (`*.edm`) is the canonical input to the application templates.

1. Open or create an `*.edm` in the [Entity Data modeler](/help/ide/modelers/entity-data).
2. Drag entities, add fields, draw associations.
3. Right-click the model, choose **Generate Application**, pick a template, set the target project name.

The platform emits tables, OData services, REST endpoints, an Angular UI, and per-entity perspectives.

## Generating from a Database Schema model

Use the [Database Schema modeler](/help/ide/modelers/database-schema) for `*.dsm` files. The DSM is closer to raw DDL than an EDM; generation produces `.schema` / `.table` / `.view` artefacts and constraints.

## REST API

The same templates are reachable programmatically through `GenerationEndpoint`:

```
POST /services/ide/generate
{
  "project": "demo",
  "template": "template-application-rest",
  "parameters": { ... }
}
```

Use this for CI-driven scaffolding or for embedding the platform inside another build system.

## Templating engines

The body of each template uses the platform's [`@aerokit/sdk/template`](/api/template/engines) engines - Mustache, Velocity, or JavaScript-expression - depending on the template author's choice. The pipeline lives under `components/template/`.

## See also

- [Entity Data modeler](/help/ide/modelers/entity-data)
- [Database Schema modeler](/help/ide/modelers/database-schema)
- [`@aerokit/sdk/template`](/api/template/engines)
- [`org.eclipse.dirigible.sdk.template`](/sdk/template/engines)
- Tutorial: [Generate from model](/help/tutorials/generate-from-model)
- Tutorial: [Generate from data source](/help/tutorials/generate-from-datasource)
