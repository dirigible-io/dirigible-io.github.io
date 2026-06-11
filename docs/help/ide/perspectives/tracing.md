---
title: Tracing
description: OpenTelemetry-backed traces, spans, and metrics from executed services.
---

# Tracing

`perspective-tracing` is the OpenTelemetry-backed observability surface. Powered by `engine-open-telemetry` plus the Camel OpenTelemetry component, it exposes spans, metrics, and traces for executed services.

## Layout

- **Traces** - recent traces; click to expand the span tree.
- **Spans** - span detail with timing, attributes, and parent / child links.
- **Metrics** - counters and histograms emitted by the runtime and by user code.

## Configuration

Tracing is configured through standard OTLP environment variables; common ones:

| Variable                              | Purpose                                          |
|---------------------------------------|--------------------------------------------------|
| `OTEL_EXPORTER_OTLP_ENDPOINT`         | OTLP collector endpoint (gRPC or HTTP).         |
| `OTEL_EXPORTER_OTLP_PROTOCOL`         | `grpc` or `http/protobuf`.                       |
| `OTEL_SERVICE_NAME`                   | Service name reported on every span.             |
| `OTEL_RESOURCE_ATTRIBUTES`            | Static resource attributes (`key=value,...`).    |
| `OTEL_TRACES_SAMPLER`                 | Sampler (`always_on`, `parentbased_traceidratio`, ...). |

Camel routes inherit the Camel OpenTelemetry component automatically when the engine is on the classpath.

## Related

- [OpenTelemetry setup](/help/operate/opentelemetry)
- [Operations perspective](/help/ide/perspectives/operations)
