---
title: Custom editor
description: Author a new per-artefact editor.
---

# Custom editor

Editors handle one artefact type each. Add one with a WebJar module under `components/ui/editor-<name>/`.

## Module layout

```
components/ui/editor-<name>/
  pom.xml
  src/main/resources/META-INF/dirigible/editor-<name>/
    editor.html
    configs/
      editor.js
    extensions/
      editor.extension
```

## Editor config

```js
const editorData = {
    id: 'reports-template-editor',
    label: 'Reports Template',
    fileExtensions: ['rtpl'],
    contentTypes: ['application/json+reports-template'],
    path: '/services/web/editor-reports-template/editor.html',
    defaultEditor: true
};
if (typeof exports !== 'undefined') {
    exports.getEditor = () => editorData;
}
```

The Workbench's editor registry picks the editor whose `fileExtensions` matches the file being opened. Set `defaultEditor: true` to win over `editor-monaco` for the matched extensions.

## Editor.extension

```json
{
    "module": "editor-reports-template/configs/editor.js",
    "extensionPoint": "platform-editors",
    "description": "Reports Template editor"
}
```

## Common patterns

- **Monaco-based** - mount Monaco for syntax highlighting and let your editor add custom toolbars / panels around it. The existing `editor-monaco-extensions` module demonstrates the pattern.
- **Visual / form-based** - drop Monaco entirely, render with BlimpKit primitives. Save the artefact via the standard Workspace REST API.

## Save flow

The editor is responsible for persistence. Call the Workspace REST API to write the artefact back to the repository:

```
PUT /services/ide/workspaces/<workspace>/<project>/<path>
Content-Type: application/json
{ ... }
```

## Register with the group aggregator

Add to `components/group/group-ide/pom.xml`.

## See also

- [Custom view](/help/extend/custom-view)
- [BlimpKit primer](/help/extend/blimpkit-ui)
- [Custom synchronizer](/help/extend/custom-synchronizer)
