---
title: Intent
description: One .intent file at a project root authors every other model in the project - entities, processes, forms, reports, roles, seeds - one altitude above the EDM / BPMN / form layer.
---

# Intent

A single `.intent` file at a project root is the source of truth for every other authoring artefact in that project. The intent layer sits **one altitude above** the models Dirigible already generates from: where you used to hand-author `.edm` / `.bpmn` / `.form` / `.report` / `.roles` / `.csvim` and generate code from them, the intent layer authors **those model files themselves** from one YAML document.

This is the practical, feature-level documentation. For the philosophy behind it - why Model-Driven Development needed a new authoring layer - read the [Intent-Driven Application Development Manifesto](/manifesto/).

## The three altitudes

| Altitude | Artefact | Authored by | Transform below it |
| --- | --- | --- | --- |
| 1 - Intent | `app.intent` (one per project) | human + AI, in the Intent Editor | deterministic generation |
| 2 - Models | `.edm` / `.model` / `.bpmn` / `.form` / `.report` / `.roles` / `.glue` / `.csvim` | the intent generators | the existing template engine |
| 3 - Application | schema, persistence, REST, UI, jobs, listeners, processes, security | the platform's `template-application-*` templates | the [synchronizers](/help/concepts/synchronizer-model) bring it live |

The intent **never emits code**. It stops at the model file. `Entity.ts`, `Controller.ts`, `*.java`, HTML and SQL come from the IDE's existing "Generate from EDM / Schema / BPMN" templates, fed by the model files the intent wrote. That contract is non-negotiable.

## Editor-first, not a synchronizer

The intent is an **authoring** artefact, not a runtime one. The platform draws a hard line: authoring artefacts (`.edm`, `.form`, `.report`, `.intent`) get **editors in the workspace plus an explicit Generate step**; only runtime artefacts (`.bpmn`, `.roles`, `.csvim`, jobs, listeners) are reconciled from the registry by synchronizers. The `.edm` has no synchronizer - and neither does the intent.

Consequences:

- Generation happens **in your workspace project**, visible immediately in the Projects view, before anything is published.
- A published `app.intent` is inert source (exactly like a published `.edm`). The generated models are committed and published as artefacts; an intent-only project does not self-materialise from a headless git import.
- There is no `DIRIGIBLE_INTENTS` table, no JPA entity, no `IntentSynchronizer`.

## The workflow

```
1. Create a project in your workspace.
2. Create app.intent (any *.intent) at the project root - by hand, via the structured editor, or by prompting the AI assistant.
3. Double-click it. The Intent Editor opens: editable YAML on the left, a live read-only diagram on the right, validation issues inline.
4. Click Generate. The generators write the derived model files NEXT TO app.intent, in your workspace project:
       <intent>.edm + <intent>.model     entities + relations + UI metadata
       <process>.bpmn                     processes
       <form>.form                        forms
       <report>.report                    reports
       <intent>.roles                     permissions
       <intent>.glue                      triggers, resolvers, notifications, schedules, ...
       <seed>.csvim + <seed>.csv          seed data
5. Generate once more, one level down: open a generated model and run the template engine, or let the editor chain it.
6. Publish. The registry receives intent + models + generated code together; the per-artefact synchronizers bring the runtime live as for any project.
```

## Project layout

The folders layer cleanly, each owned by exactly one tool:

| Folder | Owned by | Lifecycle |
| --- | --- | --- |
| `app.intent` | you (and the AI assistant) | the only hand-authored artefact |
| project-root model files | the intent engine's Generate | re-emitted and scrubbed on every Generate |
| `gen/` | the template engine | wiped wholesale on every regeneration |
| `custom/` | you | the escape hatch, touched by nobody |

Model-layer files at the project root are owned by the regeneration pass. **Do not hand-edit the generated `.edm` / `.bpmn` / `.form`** - changes are overwritten, and a file no longer backed by the intent is scrubbed on the next Generate. Adding `app.intent` to a classic project hands ownership of its root-level model files to the intent engine; migrate them into the intent first. A project without an `app.intent` stays "classic" and you hand-edit its models as before.

## In this section

- [The `.intent` file](/help/intent/intent-file) - the full YAML schema: entities, relations, processes, forms, reports, permissions, seeds, and the semantics that matter.
- [The Intent Editor](/help/intent/editor) - the split editor, the live diagram, validation, and Generate.
- [The AI assistant](/help/intent/ai-assistant) - Claude proposes a patch to the intent; you accept or refine.
- [Generators and generation](/help/intent/generators) - what each generator produces, the regeneration contract, and `.settings`.
- [Declarative glue](/help/intent/glue) - notifications, schedules, integrations, inbound webhooks, rollups and lifecycle triggers, generated as annotated client-Java.

## See also

- [Intent-Driven Application Development Manifesto](/manifesto/)
- [The synchronizer model](/help/concepts/synchronizer-model)
- [Generation from models](/help/develop/using-templates-for-generation)
- [Entity Data modeler](/help/ide/modelers/entity-data)
