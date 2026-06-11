---
title: JVM threads view
description: Filterable list of every live JVM thread with state, CPU time, and lock ownership.
---

# JVM threads view

Centre-region detailed-thread inspector of the [Monitoring](/help/ide/perspectives/monitoring) perspective. Sibling of the [JVM monitoring](/help/ide/views/jvm-monitoring) dashboard.

## What it shows

For every live thread the JVM reports through `ThreadMXBean`:

| Column          | Source |
| --------------- | ------ |
| Id              | `ThreadInfo.getThreadId()`         |
| Name            | `ThreadInfo.getThreadName()`       |
| State           | `ThreadInfo.getThreadState()` - `NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING`, `TERMINATED`. |
| Daemon          | `Thread.isDaemon()`                |
| Priority        | `Thread.getPriority()`             |
| CPU time        | `ThreadMXBean.getThreadCpuTime(id)` when CPU-time sampling is supported and enabled. `-1` otherwise. |
| User time       | `ThreadMXBean.getThreadUserTime(id)` - same caveat. |
| Lock name       | `ThreadInfo.getLockName()` - the monitor the thread is parked on, if any. |
| Lock owner name | `ThreadInfo.getLockOwnerName()` - the thread holding that monitor. |
| Lock owner id   | `ThreadInfo.getLockOwnerId()`.     |

The list is filterable (state, name pattern, daemon-only) and sortable on every column. A refresh-interval dropdown in the toolbar controls polling.

## Data source

Polls `GET /services/ide/monitoring/threads`. Returns the full `ThreadDetail[]` straight from `MonitoringService.threads()`. Same role gate as the rest of the Monitoring backend.

## Configuration

- View id: `jvm-threads`
- Region: `center`
- Label: `Threads`
- `lazyLoad: true`, `autoFocusTab: false`

## Diagnostic patterns

- A `BLOCKED` thread whose `lockOwnerName` always points to the same other thread - classic monitor contention. Pin both threads' ids and read their stack traces from the platform's log on the next dump.
- A `WAITING` thread on a known internal lock name - typically a synchronizer or a Quartz worker; safe.
- CPU time growing faster than user time for a `RUNNABLE` thread - kernel time, often I/O. Pair with the [Logs view](/help/ide/views/logs) to confirm.
- Many `daemon=true` `Camel (camel-1) thread #..` entries - the Camel context is healthy; spike count tracks active routes.

## Notes

- The view does not include stack traces. For full thread dumps use the JVM's own tooling (`jcmd <pid> Thread.print`) or the [Operations perspective](/help/ide/perspectives/operations).
- If `ThreadMXBean.isThreadCpuTimeSupported()` returns `false` on the platform JVM, CPU-time / user-time columns show `-1` for every row. This is an MXBean limitation, not a Dirigible setting.
