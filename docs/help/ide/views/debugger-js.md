---
title: JavaScript debugger
description: Graalium debugger for JavaScript and TypeScript.
---

# JavaScript debugger

Debugger for `.js`, `.mjs`, and `.ts` code running in the Graalium / GraalVM polyglot engine.

## Protocol and port

The Graalium engine exposes a JDWP-style debug protocol. The browser debugger UI attaches to it over WebSocket.

- Default port `8081`.
- Configurable via `DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT`.
- Debugging is enabled by default (`DIRIGIBLE_GRAALIUM_ENABLE_DEBUG=true`).

## UI

Set breakpoints by clicking the gutter glyph margin in the Monaco editor. Once attached, paused execution highlights the current line and populates the side panels:

- **Call stack** - stack frames; click a frame to switch the variables view to that scope.
- **Variables** - local and global variables, including closure scope when applicable. Expand objects to inspect properties.
- **Watch** - user-added expressions evaluated against the current frame.
- **Breakpoints** - all set breakpoints across files; toggle and remove.

Step controls: continue, step over, step into, step out.

## See also

- [Java debugger](/help/ide/views/debugger-java) for client `.java` code.
- [Monaco editor](/help/ide/editors/) for setting and managing breakpoint glyphs.
