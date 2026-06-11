---
title: Problems
description: Compilation and validation problems.
---

# Problems

The Problems view lists compile-time and validation errors detected by the platform.

## Sources

- **Java** - `javac` diagnostics from `engine-java` after each rebuild cycle. Source path, line, column, kind (`ERROR`, `WARNING`), message.
- **TypeScript** - type errors and parse errors from the TS transpilation step.
- **Synchronizers** - parse failures and validation errors from every synchronizer that reconciles an artefact type (`.bpmn`, `.camel`, `.job`, `.listener`, `.table`, ...). Each emits its file location and the underlying error.

## Columns

- **Project** - owning project.
- **File** - file path within the project.
- **Line** - line number (when available).
- **Severity** - `ERROR`, `WARNING`, `INFO`.
- **Message** - the diagnostic text.

Click an entry to open the offending file at the relevant line in the registered editor.

## Workflow

Problems clear automatically the next time the source compiles cleanly or the synchronizer parses the artefact successfully.
