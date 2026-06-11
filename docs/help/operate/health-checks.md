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

Both return a JSON body of the form `{"status":"UP"}`.

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

## Per-artefact diagnostics

The [Problems view](/help/ide/views/problems) lists compile / validation / synchronizer failures per artefact. A red entry there means the platform is *up* but a specific user artefact failed to reconcile - the readiness probe will still report `UP`.

## Connection pool health

For data-source pool health use the [Monitoring perspective's Metrics view](/help/ide/views/monitoring-metrics) - it surfaces HikariCP `total / active / idle / threadsAwaitingConnection` counts per data source. Run-away `threadsAwaiting` is the canonical sign of pool exhaustion.

## See also

- [Observability](/help/operate/observability)
- [Monitoring perspective](/help/ide/perspectives/monitoring)
- [Problems view](/help/ide/views/problems)
