---
title: Monitoring perspective
description: JVM and platform monitoring - CPU, memory, GC, threads, data-source pools.
---

# Monitoring

A live introspection surface over the running JVM. Use it when you need to see CPU load, heap pressure, GC behaviour, thread state, and the underlying connection-pool counters for every data source the platform has registered.

The data is sampled from the standard `java.lang.management.*` MXBeans on each request - no agent, no JMX socket. CPU-load accessors come from `com.sun.management.OperatingSystemMXBean` via reflection so the module stays free of Sun-internal compile-time dependencies. HikariCP pool stats come from the pool's own `HikariPoolMXBean`.

## Layout

| Region | View | Purpose |
| ------ | ---- | ------- |
| Left   | [Metrics](/help/ide/views/monitoring-metrics) | Navigator - jumps between the centre views and shows the platform-wide counts (data-source pools, registered data sources). |
| Centre | [Monitoring](/help/ide/views/jvm-monitoring)   | JVM dashboard tiles: CPU, heap, non-heap, per-pool memory, GC, thread totals. Auto-refreshes. |
| Centre | [Threads](/help/ide/views/jvm-threads)         | Filterable list of every live thread - id, state, daemon, priority, CPU / user time, lock owners. |

## Access

- Perspective id: `monitoring`. Display order `1100` (after Operations / before Settings).
- All three views are `lazyLoad: true`. The Metrics navigator loads first; the centre views activate on tab click.
- Backend REST endpoints are mounted at `/services/ide/monitoring/`:

| Endpoint | Returns |
| -------- | ------- |
| `GET /services/ide/monitoring/metrics`  | Point-in-time `MonitoringSnapshot` (runtime / CPU / memory / threads / GC). |
| `GET /services/ide/monitoring/threads`  | Detailed `ThreadDetail[]` - omitted from the snapshot to keep dashboard polls small. |
| `GET /services/ide/monitoring/counts`   | Named counts: data sources, Hikari pool sizes per source. |

All three are gated by `@RolesAllowed({"ADMINISTRATOR","DEVELOPER","OPERATOR"})`. Anonymous users see nothing.

## When to use what

- A spike in p99 latency you want to diagnose - open Monitoring, scan heap and GC tiles, switch to Threads to find the blocker.
- An `OutOfMemoryError` - check the per-pool MemoryPoolInfo tiles (Eden, Old Gen, Metaspace) on the Monitoring tab. The Metrics navigator also surfaces Hikari pool exhaustion as a count.
- "Why is this connection-pool reporting zero idle?" - the Metrics navigator's count groups list every `DirigibleDataSource`; for HikariCP-backed pools the `total / active / idle / threads-awaiting` counts come straight off `HikariPoolMXBean`.

## Notes

- The Monitoring perspective and the [Messaging](/help/ide/perspectives/messaging) perspective are sibling devops surfaces - Monitoring covers the JVM, Messaging covers the embedded ActiveMQ broker.
- The platform-wide [Tracing](/help/ide/perspectives/tracing) perspective is the OpenTelemetry-backed companion for distributed traces; use it together with this perspective when an externally observable slowdown maps back to an internal hotspot.
