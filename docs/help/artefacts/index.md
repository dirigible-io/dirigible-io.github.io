---
title: Artefacts
description: Every file extension Dirigible recognises and what the platform does with it.
---

# Artefacts

Files placed under a project are reconciled into runtime state by **synchronizers**. Each artefact type has a file extension, a serving engine, and an authoring editor.

## Scripting

- **[JavaScript](/help/artefacts/scripting/javascript)** - `*.js`, `*.mjs`
- **[TypeScript](/help/artefacts/scripting/typescript)** - `*.ts`
- **[Java](/help/artefacts/scripting/java)** - `*.java`
- **[Python](/help/artefacts/scripting/python)** - `*.py`

## Data

- **[Data source](/help/artefacts/data/datasource)** - `*.datasource`
- **[Schema](/help/artefacts/data/schema)** - `*.schema`
- **[Table](/help/artefacts/data/table)** - `*.table`
- **[View](/help/artefacts/data/view)** - `*.view`
- **[CSV import model](/help/artefacts/data/csvim)** - `*.csvim` + `*.csv`

## Modeling

Design-time models. Generation turns them into the runtime artefacts on this page (and the code under `gen/`).

- **[Intent](/help/intent/intent-file)** - `*.intent` (the whole application in one YAML file; generates the models below)
- **[Declarative glue](/help/intent/glue)** - `*.glue` (annotated client-Java: `@Listener` / `@Scheduled` / `@Controller`, generated from the intent)
- **[Entity Data Model](/help/ide/modelers/entity-data)** - `*.edm` + `*.model`
- **[Database schema model](/help/ide/modelers/database-schema)** - `*.dsm`
- **[Form](/help/ide/modelers/form-designer)** - `*.form`
- **[Report](/help/ide/editors/report)** - `*.report`

## Process

- **[BPMN](/help/artefacts/process/bpmn)** - `*.bpmn`
- **[Scheduled job](/help/artefacts/process/job)** - `*.job`
- **[Camel route](/help/artefacts/process/camel)** - `*.camel`
- **[Message listener](/help/artefacts/process/listener)** - `*.listener`
- **[WebSocket](/help/artefacts/process/websocket)** - `*.websocket`

## Services

- **[OData](/help/artefacts/services/odata)** - `*.odata`
- **[HTTP proxy](/help/artefacts/services/proxy)** - `*.proxy`
- **[Native app](/help/artefacts/services/nativeapp)** - `*.nativeapp`
- **[Expose](/help/artefacts/services/expose)** - `expose` file

## Security

- **[Access](/help/artefacts/security/access)** - `*.access`
- **[Roles](/help/artefacts/security/roles)** - `*.roles`
- **[Client registration](/help/artefacts/security/client-registration)** - OAuth client registrations

## Extensibility

- **[Extension point](/help/artefacts/extensibility/extensionpoint)** - `*.extensionpoint`
- **[Extension](/help/artefacts/extensibility/extension)** - `*.extension`
- **[Component](/help/artefacts/extensibility/component)** - `*Component.ts`

## Docs

- **[Markdown](/help/artefacts/docs/markdown)** - `*.md`
- **[Confluence](/help/artefacts/docs/confluence)** - `*.confluence`
