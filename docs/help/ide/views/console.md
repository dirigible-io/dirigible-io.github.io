---
title: Console
description: Output of console.log / console.error from user code.
---

# Console

The Console view streams output from user code running in the platform.

## Sources

- `console.log` / `console.info` / `console.warn` / `console.error` from JS and TS handlers running in the Graalium engine.
- Java client code writing to `System.out` / `System.err` and any SLF4J logger configured to fall through to the console appender.
- Output from Camel routes, BPMN service tasks, jobs, and listeners when their handler code logs.

## UI

- **Stream** - new entries append at the bottom; the view auto-scrolls unless you scroll up manually.
- **Clear** - flushes the visible buffer. The server-side ring buffer is unaffected.
- **Level filter** - hide entries below a chosen severity.

Backed by `ide-console`. For the full log surface (logger configuration, level changes at runtime, the underlying log files), use [Logs](/help/ide/views/logs).
