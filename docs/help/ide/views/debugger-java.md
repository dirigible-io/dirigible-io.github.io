---
title: Java debugger
description: DAP-to-JDWP bridge debugger for client Java code.
---

# Java debugger

Debugger for client `.java` code compiled by `engine-java`. The IDE bridges the browser UI to the JDT.LS-managed Debug Adapter Protocol (DAP) server, which in turn attaches to the JVM over JDWP.

## Protocol and ports

```
Browser (debug.js) <-WebSocket-> JavaDebugWebSocketHandler
                                  -> JavaDebugManager
                                  -> JavaDebugBridge (per workspace)
                                  -> DAP TCP socket
                                  -> JDT.LS (vscode.java.startDebugSession)
                                  -> JDWP TCP (port 8000 by default)
                                  -> Target JVM
```

- JDWP default port: `8000`. Override with `DIRIGIBLE_JAVA_DEBUG_JDWP_PORT`.
- Host: always `localhost`. Not configurable from the UI.

The DAP port is allocated dynamically by JDT.LS at attach time; the view fetches it from `GET /services/ide/java-debug/config` and falls back to `8000` for the JDWP target if the config endpoint is unreachable.

## UI

Compact toolbar on top:

- **Attach** - connect to the JDWP target and start a DAP session.
- **Disconnect** - tear down the DAP session without terminating the JVM (the bridge sends a `disconnect` with `terminateDebuggee:false`).
- **Step controls** - continue, step over, step into, step out, pause, terminate.

A status strip below the toolbar reports the current state (`disconnected`, `connecting`, `connected`, `paused`, `error`). Three collapsible panels below that:

- **Call stack** - stack frames at the current pause; click a frame to switch context.
- **Variables** - locals and fields for the selected frame. Expand objects to navigate.
- **Breakpoints** - every breakpoint across all files; toggle, remove, or jump to the source line.

## Workspace scope

The bridge is keyed by `(username, workspace)` - one DAP session per user per workspace. The active workspace is read from `localStorage[${prefix}.workspace.selected]` and kept in sync via the `platform.workspace.changed` hub topic; switching workspace in the Projects view drops the current session.

## Breakpoints

- Set or remove a breakpoint by clicking the Monaco gutter (glyph margin) next to a line.
- Breakpoints persist in `localStorage['dirigible.java.debug.breakpoints']` as `{ virtualPath: int[] }`. They survive page reloads.
- The debug view broadcasts the current set on the `java.debug.breakpoints` topic; the Monaco editor restores the red-circle glyph for its file.
- When paused, the editor highlights the current line via the `java.debug.highlight` topic (yellow triangle in the glyph margin, faint yellow line background).

## See also

- [JavaScript debugger](/help/ide/views/debugger-js)
- [Monaco editor](/help/ide/editors/)
