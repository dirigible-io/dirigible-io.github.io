---
title: Troubleshooting
description: Common failure modes and where to look.
---

# Troubleshooting

When the platform misbehaves, start at the symptom and walk to the right view.

## My code doesn't seem to be running

1. Check the [Problems view](/help/ide/views/problems) - compile or validation errors block a file from being served.
2. Check the [Registry view](/help/ide/views/registry) - did the file actually publish? It should appear under `/registry/public/<project>/...`.
3. Check the [Logs view](/help/ide/views/logs) at `INFO` or `DEBUG` for the relevant synchronizer / engine.

## A `.bpmn`, `.job`, `.listener`, or other artefact isn't picked up

- Synchronizer cadence is governed by `DIRIGIBLE_SYNCHRONIZER_FREQUENCY` (seconds). Default is fast enough for interactive use; for tests use `SynchronizationProcessor.forceProcessSynchronizers()`.
- Cross-synchronizer dependencies retry per `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_COUNT` and `_INTERVAL_MILLIS`. A dependent artefact may need its dependency to publish first.

## Connection pool exhausted

- Open the [Monitoring perspective's Metrics view](/help/ide/views/monitoring-metrics). Each data source shows `total / active / idle / threadsAwaitingConnection`.
- `threadsAwaitingConnection > 0` for a sustained period is the smoking gun. Track down the leak via `DIRIGIBLE_LEAKED_CONNECTIONS_CHECK_INTERVAL_SECONDS` / `_MAX_IN_USE_SECONDS`.
- Common cause: a controller that opens a `Connection` but never closes it. Always `try-with-resources`.

## Heap pressure / GC thrash

- [JVM monitoring view](/help/ide/views/jvm-monitoring) - watch heap usage trend toward `max`.
- Per-pool tiles tell you if it's Old Gen (long-lived state) or Metaspace (classloader churn from many `engine-java` rebuild cycles).
- For a thread-level investigation switch to the [JVM threads view](/help/ide/views/jvm-threads) and look for `BLOCKED` threads sharing a lock owner.

## Java code change isn't picked up

- The Java synchronizer rebuilds **all** client classes in one cycle. Check the [Logs view](/help/ide/views/logs) for `JavaSynchronizer` entries.
- Compile errors on one file can take down the whole rebuild cycle - fix the error and retry.
- The old `ClientClassLoader` is unreachable on swap; if your code holds a static reference to it, that's a leak.

## I/O against the host filesystem fails

- The platform runs as a non-root user in the official Docker image. Mounted volumes must be writeable by `1000:1000` (or whatever you've configured).
- `Files.exists("/tmp/...")` resolves against the container's `/tmp` - not the host's.

## Tenant-isolation surprises

- An OData service / data source / scheduled job is **tenant-scoped** by default. Test as the right tenant via subdomain.
- BPMN, Camel, Extensions, Git workspaces are **system-level** - one global instance.

See [`/help/concepts/multi-tenancy`](/help/concepts/multi-tenancy) for the full isolation matrix.

## The IDE shell doesn't load

- Check that `<meta name="platform-links">` resolved - missing scripts indicate a broken `platform-links.json` category mapping.
- BlimpKit / Fundamental-Styles bundle is `~158 KB`; a stripped-down ad-blocker can break it. Verify the bundle 200s from `/webjars/blimpkit__blimpkit/dist/blimpkit.min.js`.

## When to attach a remote debugger

- For client Java code use the [Java debugger view](/help/ide/views/debugger-java).
- For platform Java (synchronizers, engines, controllers in `components/`) attach an external IDE over JDWP (`-agentlib:jdwp=...,address=8000`).

## See also

- [Logs view](/help/ide/views/logs)
- [Monitoring perspective](/help/ide/perspectives/monitoring)
- [Health checks](/help/operate/health-checks)
- [Problems view](/help/ide/views/problems)
