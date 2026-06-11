---
title: OpenTelemetry
description: Distributed traces and metrics via the OTLP exporter.
---

# OpenTelemetry

Dirigible ships an OpenTelemetry integration through `engine-open-telemetry` plus Camel OpenTelemetry. Traces from controller invocations, Camel routes, BPMN tasks, and scheduled jobs all flow through the same OTLP exporter.

## Enable the exporter

The OTLP exporter follows the upstream env-var convention:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
OTEL_SERVICE_NAME=dirigible
OTEL_RESOURCE_ATTRIBUTES=deployment.environment=prod
```

For OTLP/gRPC use `http/grpc` and port 4317.

## What gets traced

- Every HTTP request through `BaseEndpoint`-rooted controllers.
- Camel exchanges (route name, exchange id propagated).
- Quartz job firings.
- Outbound HTTP calls via `@aerokit/sdk/http`.
- JDBC calls when the OTLP JDBC instrumentation is enabled.

## Where the data goes

OTLP-compatible backends:

- Grafana Tempo / Loki / Mimir.
- Jaeger (via the OTLP receiver).
- Cloud-vendor backends - Cloud Trace, Azure Monitor, X-Ray (via the AWS distro collector).

## In-IDE view

The [Tracing perspective](/help/ide/perspectives/tracing) is the browser-side companion. Useful during development; production should use the dedicated APM backend.

## See also

- [Tracing perspective](/help/ide/perspectives/tracing)
- [Monitoring perspective](/help/ide/perspectives/monitoring)
- [Observability](/help/operate/observability)
