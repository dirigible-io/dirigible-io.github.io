---
title: Form Designer
description: Visual form-layout designer (*.form). Output HTML used by EDM generation and freestanding forms.
---

# Form Designer

The Form Designer is a drag-and-drop form-layout editor. It authors `*.form` files. The generated HTML is consumed by the Entity Data Modeler's CRUD UI templates and by freestanding form pages.

## Files

- `*.form` - layout descriptor (JSON). Renders to HTML on generation.

## Authoring

Drag controls from the palette onto the canvas.

- **Inputs** - text, number, password, date, date-time, checkbox, radio.
- **Selection** - dropdown, multi-select, table picker.
- **Layout** - section, row, column, label, divider.
- **Output** - read-only display fields, formatted text.

For each control set:

- Field binding (model key).
- Label and placeholder.
- Required / read-only flags.
- Validators (regex, min/max, custom expression).
- Visibility / enablement expression bound to the form model.

## Output

On generation the descriptor is rendered to HTML and wired against the project's controllers. The same `*.form` is reused by EDM-generated CRUD pages when an entity declares a form binding.

## Underlying library

In-browser canvas backed by AngularJS form-builder primitives.

## See also

- [Entity Data Modeler](/help/ide/modelers/entity-data)
