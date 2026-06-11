---
title: Workbench
description: Default perspective - project tree, editors, and bottom view tabs.
---

# Workbench

`perspective-workbench` is the default landing perspective and where most authoring happens. Layout:

- **Left** - Projects, Import, Search.
- **Center** - editor tabs. The active editor depends on the opened file type; Monaco for code, dedicated editors for `.bpmn`, `.edm`, `.form`, `.csv`, `.schema`, etc. See [Editors](/help/ide/editors/) and [Modelers](/help/ide/modelers/).
- **Bottom** - Console, Problems, Logs, Properties, Preview, Terminal.

## Quick walkthrough

1. **Open** - pick a project in the Projects view; double-click a file to open it.
2. **Create** - right-click a folder in the Projects tree, choose **New > File / Folder**. New artefacts can also be scaffolded from a template via **File > Generate**.
3. **Edit** - the editor for the file extension opens automatically. Save with `Ctrl+S` / `Cmd+S`.
4. **Publish** - right-click the project, choose **Publish**. Publishing copies the workspace project into `/registry/public/<project>/...` where the synchronizers pick it up and reconcile the runtime.

Workspaces are addressed by name and persisted under `/users/<user>/workspace/<project>/...`. The selected workspace is broadcast over the `platform.workspace.changed` topic; views that depend on it subscribe and refresh.

## Related

- [Editors](/help/ide/editors/)
- [Modelers](/help/ide/modelers/)
- [Views](/help/ide/views/)
- [Menus](/help/ide/menus) - `menu-projects`
- [Keyboard shortcuts](/help/ide/keyboard-shortcuts)
