---
title: Debugging Java
description: DAP-to-JDWP bridge - attach to client Java code from the browser IDE.
---

# Debugging Java

Client `.java` files run inside the same JVM as the platform, so the standard JDWP attach works. The IDE bridges JDT.LS's DAP server to the platform's JDWP port, surfacing call stack, variables, watch, and breakpoints in the [Java debugger view](/help/ide/views/debugger-java).

## Prerequisites

- JDWP must be enabled on the platform JVM. The official Docker image is preconfigured.
- The JDWP port is `8000` (env `DIRIGIBLE_JAVA_DEBUG_JDWP_PORT`).
- The Java debugger view itself is workspace-scoped - one bridge per `(user, workspace)`.

## Workflow

1. Open a `.java` file in Monaco.
2. Click in the gutter - a red dot marks the breakpoint.
3. Switch to the [Java debugger view](/help/ide/views/debugger-java) and press **Attach**.
4. Status flips through a "connecting…" animation, then **connected**.
5. Hit the endpoint that runs your class. The JVM pauses; the call stack, variables, and breakpoints panels populate.
6. Step (over / into / out), continue, or disconnect.

## Architecture in brief

```
Browser (debug.js) <-WebSocket-> JavaDebugWebSocketHandler
                                  v JavaDebugManager
                                  v JavaDebugBridge (per workspace)
                                  v DAP TCP socket
                                  JDT.LS (vscode.java.startDebugSession)
                                  v JDWP TCP (port 8000)
                                  Target JVM
```

- `JavaDebugManager` holds a singleton `JavaDebugBridge` per `(username, workspace)` key.
- Path translation rewrites virtual workspace paths (`/workspace/proj/Foo.java`) to absolute on-disk paths and back.
- Disconnect sends `terminateDebuggee:false` so the JDWP port stays attachable for the next session.

## Breakpoints persistence

The view stores breakpoints in `localStorage['dirigible.java.debug.breakpoints']` as a `{ virtualPath -> int[] }` map. Restored on view load; broadcast to open editors via the `java.debug.breakpoints` topic.

## When the debugger fails to attach

- "unknown command" from DAP - `com.microsoft.java.debug.plugin-*.jar` is missing from the JDT.LS `plugins/` directory or its `config_<platform>/config.ini` `osgi.bundles` entry. `JdtLsManager.installDebugPlugin()` is supposed to install both.
- 60-second `ensureInitialized` timeout - the JDT.LS server hasn't received `initialize`/`initialized` yet. Restart it from the Operations perspective.
- "Address already in use" on port 8000 - another process is bound to JDWP. Change the port via `DIRIGIBLE_JAVA_DEBUG_JDWP_PORT`.

## See also

- [Java debugger view](/help/ide/views/debugger-java)
- [Debugging JavaScript](/help/develop/debugging-javascript)
- [Monaco editor](/help/ide/editors/monaco)
