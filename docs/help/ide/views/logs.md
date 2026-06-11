---
title: Logs
description: Live log stream from the running JVM.
---

# Logs

Streams the running JVM's log output into the IDE.

## Backend

Backed by `ide-logs`. The log appender on the server pushes entries over a WebSocket to the view as they are written. Existing rolling log files on disk are independent of this stream.

## UI

- **Stream** - entries append at the bottom; auto-scroll while at the tail.
- **Filter** - by logger name (substring) and minimum level (`TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`).
- **Pause / resume** - freeze the stream to inspect a block of output.
- **Clear** - empty the visible buffer.

## Loggers sub-view

A companion sub-view (or per-logger control inline) lets you change a logger's level at runtime. Changes apply to the live `LoggerContext` and persist for the lifetime of the JVM; restart resets them unless backed by configuration.

## See also

- [Console](/help/ide/views/console) - user-code `console.log` output without server-log noise.
