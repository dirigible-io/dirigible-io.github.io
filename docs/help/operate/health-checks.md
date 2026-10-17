---
title: Health checks
description: Readiness and liveness probes for orchestrators.
---

# Health checks

Two Actuator endpoints expose JVM health for orchestrators:

| Endpoint | Returns 200 when |
| -------- | ---------------- |
| `/actuator/health/readiness` | Spring context has finished startup and the platform is ready to serve traffic. |
| `/actuator/health/liveness`  | The JVM is alive. |

Both return a JSON body of the form `{"status":"UP"}`. The full `/actuator/health` document also carries the platform's own [health components](#health-components).

## Kubernetes probes

Wire the probes into the pod spec:

```yaml
livenessProbe:
  httpGet: { path: /actuator/health/liveness, port: 8080 }
  initialDelaySeconds: 30
  periodSeconds: 10
readinessProbe:
  httpGet: { path: /actuator/health/readiness, port: 8080 }
  initialDelaySeconds: 10
  periodSeconds: 5
```

The Helm chart already does this. Override `initialDelaySeconds` if your DB is slow to come up.

## Health components

`GET /actuator/health` lists the platform's own components next to the standard ones. They are quality signals: each reports `UNKNOWN` until the first synchronization pass after boot has completed and `UP` afterwards, and none of them turns `DOWN` on its own.

| Component | Details | Meaning |
| --------- | ------- | ------- |
| `artefacts` | `state`, `total`, `failed`, `failedByType` | The census of every synchronized artefact: how many are registered, how many are `FAILED`, and the failures counted per artefact type (`{"migration": 1, "listener": 2}`). |
| `migrations` | `total`, `pending`, `failed` | The [data migrations](/help/artefacts/data/migration): how many are registered, how many are parsed but not yet applied everywhere, how many failed in some database. |

```json
{
  "status": "UP",
  "components": {
    "artefacts": { "status": "UP", "details": { "state": "READY", "total": 184, "failed": 1, "failedByType": { "migration": 1 } } },
    "migrations": { "status": "UP", "details": { "total": 3, "pending": 0, "failed": 1 } }
  }
}
```

By default a failed artefact does not affect readiness: the platform is *up*, and the failure is a per-artefact problem. Set `DIRIGIBLE_READINESS_REQUIRE_CLEAN_BOOT=true` and the readiness probe stays out of service until the boot is **clean** - every artefact reconciled and none `FAILED` - so a deployment whose migration failed takes no traffic. Readiness is also held while the first pass after boot is still running, whatever the flag.

## Per-artefact diagnostics

The [Problems view](/help/ide/views/problems) lists compile / validation / synchronizer failures per artefact. A red entry there means the platform is *up* but a specific user artefact failed to reconcile - the readiness probe still reports `UP` unless `DIRIGIBLE_READINESS_REQUIRE_CLEAN_BOOT` is on (see above).

## Connection pool health

For data-source pool health use the [Monitoring perspective's Metrics view](/help/ide/views/monitoring-metrics) - it surfaces HikariCP `total / active / idle / threadsAwaitingConnection` counts per data source. Run-away `threadsAwaiting` is the canonical sign of pool exhaustion.

## See also

- [Observability](/help/operate/observability)
- [Monitoring perspective](/help/ide/perspectives/monitoring)
- [Problems view](/help/ide/views/problems)
