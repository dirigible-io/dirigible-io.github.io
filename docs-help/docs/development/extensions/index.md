---
title: Extensions Overview
---

Extensions Overview
===

## Extensibility

Extensibility is an important requirement for business applications built to follow custom processes in Line of Business(LoB) areas. In the cloud toolkit, a generic description of the extension points and extensions is provided without explicitly defining the contract. This a simple but powerful way to define extensions.


To learn more about the `Extensions` concept, click [here](../concepts/extensions/)

## Extension Points

  - [ide-perspective](perspective/)
  - [ide-view](view/)
  - [ide-editor](editor/)
  - [ide-template](template/)
  - ide-menu
  - ide-themes
  - ide-workspace-menu-new-template
  - api-modules
  - ide-operations-menu
  - ide-documents-content-type
  - ide-documents-menu
  - ide-git-menu
  - ide-terminal-menu
  - ide-discussions-menu
  - ide-database-menu
  - ide-repository-menu

## Events

  - editor.file.saved
  - editor.file.dirty
  - status.message
  - status.caret
  - status.error
  - database.database.selection.changed
  - database.datasource.selection.changed
  - database.sql.execute
  - database.sql.run
  - git.repository.run
  - workspace.file.selected
  - workspace.file.created
  - workspace.file.open
  - workspace.file.pull
  - workspace.file.deleted
  - workspace.file.renamed
  - workspace.file.moved
  - workspace.file.copied
  - workspace.file.properties
  - workspace.file.published
  - workspace.project.exported
  - repository.resource.selected
  - repository.resource.created
  - repository.resource.open
  - repository.resource.deleted
