---
title: Projects
description: Workspace and project tree.
---

# Projects

The Projects view is the workspace tree. It lists projects and their files for the currently selected workspace.

## Workspace switcher

Each user can have multiple workspaces. The switcher at the top of the view changes the active workspace. Selection broadcasts on the `platform.workspace.changed` hub topic, so every other view subscribed to it (Java debugger, Git, Search, ...) follows the switch without a reload.

Workspaces live at `/users/<user>/workspace/<project>/...`. The published view lives at `/registry/public/<project>/...` and is reached via the [Registry](/help/ide/views/registry) view.

## File operations

Right-click a project, folder, or file to open the context menu:

- **New** - project, folder, file, or any registered artefact template.
- **Import** - upload files, import from Git, import a ZIP archive.
- **Publish** - copy the project from the workspace into the public registry, triggering the synchronizers.
- **Unpublish** - remove the published copy.
- **Rename**, **Delete**, **Copy**, **Cut**, **Paste**.
- **Open**, **Open With** - choose the editor when more than one is registered for a file type.

## Search

The view has an inline filter that narrows the visible tree by name. For repository-wide content search, see [Search](/help/ide/views/search).

## See also

- [Workbench perspective](/help/ide/perspectives/workbench)
- [Registry view](/help/ide/views/registry)
- [Repository view](/help/ide/views/repository)
