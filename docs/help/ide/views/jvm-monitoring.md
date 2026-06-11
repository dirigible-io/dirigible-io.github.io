---
title: JVM monitoring view
description: JVM dashboard tiles - CPU, heap, non-heap, memory pools, GC, threads.
---

# JVM monitoring view

Centre-region dashboard of the [Monitoring](/help/ide/perspectives/monitoring) perspective. One auto-refreshing snapshot of the JVM's live state.

## What it shows

| Tile group        | Source                                                                 |
| ----------------- | ---------------------------------------------------------------------- |
| Runtime           | `RuntimeMXBean` - JVM name, vendor, version, uptime, start time, args. |
| CPU               | `com.sun.management.OperatingSystemMXBean` (reflective read) - process load, system load, available processors. |
| Heap / non-heap   | `MemoryMXBean.getHeapMemoryUsage()` / `getNonHeapMemoryUsage()`.       |
| Memory pools      | One tile per `MemoryPoolMXBean` - Eden, Survivor, Old Gen, Metaspace, Compressed Class Space, code-cache regions. Shows `used / committed / max` per pool. |
| Threads           | `ThreadMXBean` totals - live, peak, daemon, total started.             |
| GC                | One row per `GarbageCollectorMXBean` - collection count and accumulated time. |

The tiles render with BlimpKit components (`bk-card`, `bk-progress-indicator`, `bk-object-status`); no view-local CSS for layout. Refresh interval is a dropdown in the view toolbar.

## Data source

Polls `GET /services/ide/monitoring/metrics` and renders the resulting `MonitoringSnapshot`. The list of live threads is intentionally not part of this payload - it lives in the separate [Threads view](/help/ide/views/jvm-threads) so the dashboard's poll stays cheap.

## Configuration

- View id: `jvm-monitoring`
- Region: `center`
- Label: `Monitoring`
- `lazyLoad: true`, `autoFocusTab: false`

## When to use it

- Spot a heap-usage trend climbing toward `max`.
- Read GC count delta over time to confirm a stop-the-world spike.
- Confirm a CPU-bound workload by watching process load against available processors.
- Verify daemon/non-daemon thread counts after a synchronizer rebuild.

For per-thread state or stack-blocked diagnostics, flip to the [Threads view](/help/ide/views/jvm-threads).
