---
title: The Intent Editor
description: A split editor - Monaco YAML on the left, a live mxGraph diagram on the right, inline validation, and Generate - opened by double-clicking any .intent file.
---

# The Intent Editor

Double-click any `.intent` file to open it. The editor is registered for content type `application/yaml+intent` via the `platform-editors` extension point, like every other specialised editor.

## Layout

A three-pane split:

- **Source (left)** - an embedded Monaco editor with YAML highlighting, theme-synced to the IDE. Save with the toolbar button or `ctrl+s`; dirty state is tracked. The text buffer is the single source the parse / diagram / Generate code reads.
- **Diagram (right)** - a live, read-only [mxGraph](/help/ide/modelers/) rendering of the intent, refreshed on a 600ms debounce as you type.
- **AI assistant (toggled)** - a third pane behind the toolbar's discussion icon. See [the AI assistant](/help/intent/ai-assistant).

Below the diagram, the forms / reports / roles / seeds are summarised as plain bound HTML.

## The diagram

`POST /services/ide/intent/parse` is called on every debounced change; the response drives both the diagram and the validation strip. The diagram has these sections:

- **Entities** - one card per entity (name over its field list, PK marked), laid out left-to-right. A solid edge is a required relation, a dashed edge an optional one.
- **One flowchart per process** - slate start/end ellipses, blue user-task and green service-task rounded rectangles, an amber decision rhombus. A decision emits a conditioned edge (`if`) to `then` and a default edge to `else`, exactly as the generated BPMN does.
- **Glue and Outputs** - one card per form / report / notification / schedule / integration / inbound webhook / rollup, each badged with a platform icon and edged to the entity it binds to.

The cells use **fixed brand colours** chosen to read on both the light and dark IDE themes, painted on a transparent canvas. The diagram therefore looks identical in either theme and does not recolour on a theme switch. It is read-only: there is no selection or editing. Authoring is the YAML pane plus the AI assistant - the diagram confirms, it does not capture.

## Validation

Structural problems surface inline as a strip fed by the `/parse` call. The parser reports **every** issue at once, not just the first:

- duplicate entity / process / form / report / seed names;
- dangling relation / form / report / seed targets;
- unknown field types, relation kinds, step kinds;
- decision `then` / `else` targets that name no declared step;
- multiple primary keys, a non-integer PK, empty seeds;
- a wrong-typed scalar (for example an unquoted-brace recipient) reported as a clean issue rather than a 500.

Nothing is persisted by `/parse`; it only validates and feeds the views.

## Generate

The **Generate** button calls `POST /services/ide/intent/generate`, which:

1. resolves your workspace project (so it is inherently user-scoped);
2. reads the intent file and runs every registered generator (a failure in one is logged and isolated);
3. scrubs stale intent-owned model files at the project root;
4. returns `{ "written": [...], "scrubbed": [...] }` and a code-generation plan.

The project tree is then refreshed (the same `projects.tree.refresh` mechanism the form builder uses), so the generated model files appear immediately. Generation is **idempotent and diff-stable**: identical input produces byte-identical output, and byte-identical content is not rewritten. See [Generators and generation](/help/intent/generators) for the regeneration contract.

The editor can chain the second level too - replaying the code-generation plan turns the generated models into the full-stack application under `gen/`.

## See also

- [The `.intent` file](/help/intent/intent-file)
- [The AI assistant](/help/intent/ai-assistant)
- [Generators and generation](/help/intent/generators)
- [Editors overview](/help/ide/editors/)
