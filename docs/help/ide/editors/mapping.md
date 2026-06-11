---
title: Mapping Editor
description: Visual mapping between a source schema and a target schema.
---

# Mapping Editor

Editor for data-mapping artefacts. Define a source-to-target schema mapping; the editor emits the JavaScript module that the runtime mapping engine executes.

Component: `editor-mapping`.

## What it does

- Load a source schema (e.g. the shape of a CSV row, REST payload, or DB query result) and a target schema (e.g. a target table or downstream entity).
- Draw field-to-field links on the canvas. Each link can carry a transformation expression (concatenation, casting, lookup, conditional).
- Save - the editor regenerates the backing `.js` module containing the `transform(source)` function and its helpers.

## Generated code

The generated module exports a single transformation function:

```js
export function transform(source) {
    return {
        customerId: source.id,
        fullName: source.firstName + " " + source.lastName,
        registeredAt: new Date(source.created_at).toISOString()
    };
}
```

You can edit the generated module directly in the [Monaco editor](/help/ide/editors/monaco); subsequent changes in the mapping editor will overwrite the generated function but preserve manually added helpers in marked-up regions.

## See also

- [`template-mapping-javascript`](/help/develop/using-templates-for-generation) - the project template that scaffolds a mapping artefact and its generated module.
