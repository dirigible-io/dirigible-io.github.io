---
title: Search
description: Repository-wide text search.
---

# Search

Full-text search across every file in the platform repository (workspaces plus the published registry).

## Backend

Backed by Lucene through `IRepositorySearch`. The index is rebuilt incrementally as files change.

## Filters

- **Query** - case-sensitive or case-insensitive.
- **File extension** - restrict to `*.ts`, `*.bpmn`, `*.java`, `*.sql`, ...
- **Project** - restrict to a single project, or the whole workspace.
- **Path** - restrict to a folder subtree.

## Results

Each match shows project, file path, line number, and a context snippet. Click an entry to open the file in the registered editor at the matching line.

For a tree-scoped filename filter use the inline filter in the [Projects view](/help/ide/views/projects).
