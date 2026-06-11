---
title: Metrics view
description: Left-rail navigator for the Monitoring perspective - data-source pool stats and quick links to the JVM dashboards.
---

# Metrics view

Left-rail companion in the [Monitoring](/help/ide/perspectives/monitoring) perspective. Two roles: surface the platform-wide counts that don't fit on the JVM dashboard tiles, and act as the navigator into the centre views.

## What it shows

- One entry per registered data source. For HikariCP-backed sources (the default) the pool's `HikariPoolMXBean` exposes:
  - `total`  - current pool size
  - `active` - connections currently checked out
  - `idle`   - connections currently parked
  - `threadsAwaitingConnection` - callers blocked waiting for a free connection
- Aggregated counts: registered data sources, named caches, registered handlers - anything `MonitoringService.counts()` reports as a `CountMetrics.MetricGroup`.

## Data source

Polls `GET /services/ide/monitoring/counts`. Same role gate as the rest of the Monitoring backend (`ADMINISTRATOR` / `DEVELOPER` / `OPERATOR`).

## Configuration

- View id: `monitoring-metrics`
- Region: `left`
- Label: `Metrics`
- `lazyLoad: true`

## See also

- [Monitoring view](/help/ide/views/jvm-monitoring) - JVM dashboards in the centre region.
- [Threads view](/help/ide/views/jvm-threads) - filterable live-thread list.
