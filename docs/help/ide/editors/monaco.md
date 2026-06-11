---
title: Monaco Editor
description: Code editor for JS, TS, Java, Python, HTML, CSS, JSON, Markdown, and SQL.
---

# Monaco Editor

The [Monaco Editor](https://microsoft.github.io/monaco-editor/index.html) is the code-editing surface that backs every text-based artefact in the IDE. Same engine as VS Code; not supported in mobile browsers.

Component: `editor-monaco` (with `editor-monaco-extensions` for platform glyphs and decorations).

## Supported languages

| Language | Extensions | Language services |
| --- | --- | --- |
| JavaScript | `*.js`, `*.mjs` | Graalium-backed completion and diagnostics |
| TypeScript | `*.ts` | Same Graalium pipeline; on-demand transpilation |
| Java | `*.java` | JDT.LS (`ide-java-lsp`) - completion, navigation, refactor |
| Python | `*.py` | Syntax only |
| HTML / CSS / JSON / Markdown | `*.html`, `*.css`, `*.json`, `*.md` | Built-in Monaco services |
| SQL | `*.sql` | Syntax highlighting; execution via the Database perspective |

JS, TS, and Java are the only languages with full language-server features (completion, hover, peek references, rename, organize imports). The rest fall back to Monaco's built-in tokenizer.

## Editing

- Multi-cursor: `Cmd`/`Ctrl + click` for secondary cursors, `Alt + click` for column-mode selection.
- Format document: right-click then **Format Document**, or `Shift + Alt + F`.
- Peek references / go to definition: right-click then **Peek References** / **Go to Definition** (JS, TS, Java).
- Find and replace: `Cmd`/`Ctrl + F`, `Cmd`/`Ctrl + H`.
- Command palette: `F1`.

## Breakpoints and debug glyphs

The gutter displays two custom glyphs from `editor-monaco-extensions`:

- `debug-breakpoint-glyph` - red dot. Click the gutter to set or clear a breakpoint.
- `debug-current-line-glyph` - yellow arrow. Marks the line the runtime is paused on.

JS and TS breakpoints are picked up by the [JavaScript debugger](/help/ide/views/debugger-js). Java breakpoints are picked up by the [Java debugger](/help/ide/views/debugger-java) via the DAP bridge to JDT.LS.

## Notes

- Saving a `.ts` / `.js` / `.java` file triggers the respective synchronizer or on-demand loader; the new code is reflected at the next request.
- Java compilation problems surface in the [Problems](/help/ide/views/problems) view.
- Log output from running code streams to the [Console](/help/ide/views/console) and [Logs](/help/ide/views/logs) views.
