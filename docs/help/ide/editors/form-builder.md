---
title: Form Builder Editor
description: Visual form designer that produces `.form` artefacts.
---

# Form Builder Editor

Visual form designer. The output is a `*.form` artefact - an HTML form layout consumed by the runtime and by application templates.

Component: `editor-form-builder`.

## What it does

- Drag UI controls (input, select, checkbox, radio, table, button, label, ...) from the palette onto the canvas.
- Set per-control properties: label, model binding, validation, visibility expression, CSS class.
- Save - the canvas is serialized to a `*.form` file containing the HTML layout plus the metadata that lets the designer round-trip it.

The form builder is a focused authoring tool. The detailed design canvas, control palette, and binding semantics are covered by the modeler page:

See [Form Designer (modeler)](/help/ide/modelers/form-designer).

## Generation pipeline

`*.form` artefacts are consumed by the `template-form` and `template-form-builder-angularjs` application templates. When generating a CRUD application from an `*.edm` model via the Entity Data Modeler, the per-entity edit / create forms are emitted as `*.form` artefacts that can be opened and refined in this editor.

## See also

- [Form Designer (modeler)](/help/ide/modelers/form-designer)
- [Entity Data Modeler](/help/ide/modelers/entity-data)
