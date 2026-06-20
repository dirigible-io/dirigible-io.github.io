---
title: Generators and generation
description: The six model generators that turn an .intent into .edm / .bpmn / .form / .report / .roles / .csvim, the regeneration and scrub contract, and the .settings recipe.
---

# Generators and generation

Generate runs every registered generator in `@Order`, writes the derived model files at the project root, then scrubs any stale intent-owned files. Each generator is a Spring bean implementing one slice; ordering leaves gaps of 100 so future generators can slot between.

## What each generator produces

| Intent block | Output | Order |
| --- | --- | --- |
| `entities` | `<intent>.edm` (XML) + `<intent>.model` (JSON twin) | 200 |
| `processes[]` | `<process>.bpmn` (one per process) | 300 |
| `forms[]` | `<form>.form` (one per form) | 400 |
| `reports[]` | `<report>.report` (one per report) | 500 |
| `permissions` | `<intent>.roles` | 600 |
| `seeds[]` | `<seed>.csvim` + `<seed>.csv` (one pair per seed) | 700 |
| triggers, resolvers, glue | `<intent>.glue` | (with the events template) |

These cover every intent block defined today.

### Entities to `.edm` + `.model`

`EdmIntentGenerator` writes a complete, openable EDM document plus its JSON twin. It fleshes each entity out with EDM editor defaults (icons, menu keys, layout type, perspective metadata, widget types) derived from the names, so the model opens correctly in the [Entity Data modeler](/help/ide/modelers/entity-data). It follows the canonical Dirigible conventions:

- property names are PascalCase; physical columns stay UPPER_SNAKE and intent-prefixed;
- every property carries `auditType="NONE"`; required fields and FKs carry `isRequiredProperty="true"` (the REST controller's required-value validation keys on it);
- **every to-one FK property carries full relationship metadata** - `relationshipType` (COMPOSITION vs ASSOCIATION), `relationshipCardinality` (`1_n` / `n_1` / `1_1`), `relationshipName` (`<owner>_<target>`), `relationshipEntityName`, `relationshipEntityPerspectiveName`. The last two build the FK dropdown's data-service URL, so they are not optional;
- the `.edm` also carries an `mxGraphModel` diagram block - the EDM editor renders its canvas exclusively from this, so without it the editor opens empty.

### Processes to `.bpmn`

`BpmnIntentGenerator` writes minimal Flowable BPMN 2.0: a start event, the steps, an end event, the connecting flows, and an exclusive gateway per decision. It emits the `bpmndi:BPMNDiagram` interchange block (a deterministic left-to-right layout) so the BPMN modeler renders a canvas - a process with no shapes opens empty. Element ids are lower camelCase; task / gateway / process display names are humanized (`librarianReview` to "Librarian Review").

### Forms, reports, roles, seeds

- `FormIntentGenerator` to `<form>.form` - typed controls bound to the entity, action buttons coloured by name.
- `ReportIntentGenerator` to `<report>.report` - the Dirigible `.report` shape with a materialised SQL `query` (joins from `relation.field` paths, `WHERE` from `filter`, default-role `security`). All physical identifiers double-quoted for Postgres.
- `PermissionIntentGenerator` to `<intent>.roles` - deduped roles; no `.access` URL constraints (those belong to the downstream template).
- `CsvimIntentGenerator` to `<seed>.csvim` + `<seed>.csv` - platform-default CSVIM settings; project-qualified CSV path.

See [the `.intent` file](/help/intent/intent-file) for the authoring shape each consumes, and [declarative glue](/help/intent/glue) for the `.glue` output.

## The regeneration contract

This is the most important operational rule of the intent layer:

- Generators write **only** through the generation context's `writeModelFile`, **only at the project root**. A generator that writes elsewhere would have its output scrubbed right after producing it.
- After the pass, **stale intent-owned model files at the project root are deleted** - any model-layer file the pass did not re-emit. Remove a process / form / seed from the intent and its model file disappears on the next Generate. The scrub is limited to model extensions and direct child resources; it never touches `app.intent` itself, code files, `gen/`, or `custom/`.
- **Never write into `gen/`.** The model-to-code templates own that folder and wipe it wholesale on every regeneration; intent output placed there would be destroyed.
- Generators **never reference template-engine output paths** - the intent layer is ignorant of which downstream template will consume its models, so it cannot couple to one template's choices.
- Generation is **idempotent and diff-stable**: identical input produces byte-identical output; byte-identical content is not rewritten.

Output extensions are restricted to the model layer: `.edm` / `.model` / `.bpmn` / `.form` / `.report` / `.roles` / `.access` / `.glue` / `.dsm` / `.schema` / `.table` / `.view` / `.csvim` / `.csv`. Anything code-shaped (`*.ts`, `*.java`, `*.html`, `*.sql`, `*.css`) is the template engine's output and is never emitted by an intent generator. The one exception is the declarative-glue layer, which deliberately generates annotated client-Java - see [glue](/help/intent/glue).

## The `.settings` file

`<intent>.settings` is **developer-owned**: scaffolded once on the first Generate, then preserved (never scrubbed). It holds:

- the **generation recipe** - which template id and parameters to use per model type when chaining model-to-code;
- per-artefact **overrides** (`{ triggers | resolvers | forms }.<name>.generate = false`) - skip a generated artefact and reuse a hand-written one under `custom/`;
- `userTasks.candidateGroupsExtra` (defaults to `ADMINISTRATOR`, appended to every user-task `candidateGroups`).

It is loaded before the generators run and honoured by the glue, form and BPMN generators. The Generate endpoint returns a code-generation plan built from this recipe plus the written files, which the editor replays to chain model-to-code.

## From models to the application

The intent stops at the model file. To get the running application, the model is fed to the platform's existing **"Generate from EDM / Schema / BPMN"** templates - the same [generation from models](/help/develop/using-templates-for-generation) that classic projects use - producing the schema, persistence, REST services, UI, jobs and listeners under `gen/`. The editor can chain this step from its Generate button; otherwise open a generated model and run the template engine there.

## See also

- [The `.intent` file](/help/intent/intent-file)
- [Declarative glue](/help/intent/glue)
- [Generation from models](/help/develop/using-templates-for-generation)
- [The synchronizer model](/help/concepts/synchronizer-model)
