---
title: Observability
description: Spring Boot Admin and Actuator for live ops introspection.
---

# Observability

Dirigible exposes two standard JVM observability surfaces:

## Spring Boot Admin

A web console aggregating Spring Boot Actuator data from one or more JVMs.

- URL: `/spring-admin/`
- The server profile is enabled by default - the runtime is its own Admin server.
- Inspect bean wiring, environment, mappings, metrics, log levels, scheduled tasks.

For multi-instance deployments point the additional pods at a single Admin server via the Boot Admin Client.

## Actuator endpoints

| Endpoint | Purpose |
| -------- | ------- |
| `/actuator/health/readiness` | Readiness probe - the JVM has finished startup. |
| `/actuator/health/liveness` | Liveness probe - the JVM is still alive. |
| `/actuator/info` | Build metadata. |
| `/actuator/metrics` | Micrometer metric registry contents. |
| `/actuator/loggers` | Live logger levels (also reachable from the [Logs view](/help/ide/views/logs)). |

Probes are what CI's DAST job polls and what Kubernetes liveness / readiness probes hit.

## In-IDE views

The browser IDE surfaces several of these signals natively:

- [Monitoring perspective](/help/ide/perspectives/monitoring) - JVM dashboards (CPU, memory, GC, threads, data-source pools).
- [Tracing perspective](/help/ide/perspectives/tracing) - OpenTelemetry-backed.
- [Logs view](/help/ide/views/logs) - live log stream and runtime level changes.

## See also

- [OpenTelemetry](/help/operate/opentelemetry)
- [Logging](/help/operate/logging)
- [Health checks](/help/operate/health-checks)
