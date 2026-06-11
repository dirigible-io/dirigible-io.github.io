---
title: Debugging JavaScript and TypeScript
description: Graalium debugger - breakpoints, step, locals, watch.
---

# Debugging JavaScript and TypeScript

The platform's JS / TS debugger is Graalium's debug bridge. Hit a breakpoint in your `.js` / `.mjs` / `.ts` file, the JVM pauses the script, and the IDE inspects state in the [JavaScript debugger view](/help/ide/views/debugger-js).

## Prerequisites

- Debug mode is **enabled by default** in the official Docker image (`DIRIGIBLE_GRAALIUM_ENABLE_DEBUG=true`).
- The Graalium debug port is `8081` (env `DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT`).
- For self-hosted runs, start the JVM with debug enabled.

## Workflow

1. Open the `.ts` / `.js` file in Monaco.
2. Click in the gutter to set a breakpoint - the red dot appears.
3. Run the endpoint - hit it via the browser, curl, or the Swagger view.
4. The script pauses; the [JavaScript debugger view](/help/ide/views/debugger-js) opens with call stack, locals, watch, and step controls.
5. Step over (F10), step into (F11), step out (Shift+F11), continue (F8). Variables resolve in the locals tree; watch expressions live in the panel beside the stack.

## Conditional breakpoints

Right-click a breakpoint to set a condition. The script pauses only when the JS expression evaluates truthy.

## Source maps

TypeScript files debug at the source level - the Monaco breakpoint sits on the `.ts` line, not the transpiled `.js`. Source maps are produced as part of the on-demand transpile.

## See also

- [JavaScript debugger view](/help/ide/views/debugger-js)
- [Debugging Java](/help/develop/debugging-java)
- [Monaco editor](/help/ide/editors/monaco)
