---
title: Properties
description: Read-only properties pane for the current selection.
---

# Properties

Properties pane for the active selection in the IDE - a file, a project, or a runtime artefact row. Read-only.

The shape of the pane depends on what is selected:

## File or folder

- Path (workspace-relative and absolute repository path).
- Size, content type, encoding.
- Last modified timestamp.
- Owner (creator) and last modifier.
- Version count when the resource has history.

Backed by `IEntityInformation` on the underlying `IResource` / `ICollection`.

## Project

- Project name, root path.
- Publish state (published / unpublished, last publish timestamp).
- Git state when the project is a working copy (current branch, dirty flag).

## Runtime artefact

When the selection is a row in an Operations view (Jobs, Listeners, Extensions, Websockets, ...):

- Artefact name and source location.
- Lifecycle state (`NEW`, `CREATED`, `UPDATED`, `FAILED`, `MODIFIED`).
- Last error when the state is `FAILED`.
- Created / updated timestamps and audit user (`Auditable` fields).

## Related

- [Repository view](/help/ide/views/repository)
- [Projects view](/help/ide/views/projects)
- [Synchronization](/help/concepts/synchronizer-model)
