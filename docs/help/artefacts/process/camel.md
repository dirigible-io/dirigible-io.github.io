---
title: Camel route
description: Apache Camel integration route. *.camel artefact.
---

# Camel route

`*.camel` is an Apache Camel route definition - YAML or XML.

- **File format.** Camel YAML (preferred) or XML route definition.
- **Synchronizer.** `CamelSynchronizer`.
- **Engine.** `engine-camel`. Camel context spins up one route per artefact.
- **Editor.** [Integrations Modeler (Karavan)](/help/ide/modelers/integrations-karavan).
- **JS / TS bridge.** Steps can dispatch into JS / TS via the `dirigible-java-script` Camel component (see below).

## File format - YAML

```yaml
- route:
    id: http-route-b0a6
    from:
      id: from-a460
      description: Expose path /services/integrations/http-route
      uri: platform-http
      parameters:
        path: http-route
        httpMethodRestrict: GET
      steps:
        - to:
            id: to-c54d
            description: Call handler.ts
            uri: dirigible-java-script
            parameters:
              javaScriptPath: myproject/handlers/handler.ts
```

The route above publishes `GET /services/integrations/http-route` and delegates the handling to a JS / TS module under the registry.

## Common URI schemes

| Scheme | Purpose |
| --- | --- |
| `platform-http` | Expose an HTTP endpoint under `/services/integrations/...`. |
| `dirigible-java-script` | Invoke a JS / TS module by registry path. The exchange body and headers are passed through. |
| `cron` | Time-driven trigger. |
| `file`, `ftp`, `sftp` | File-based sources / sinks. |
| `jms`, `activemq` | Message-broker integration (uses the embedded ActiveMQ broker). |

Camel's full catalogue is available - anything Karavan supports.

## Authoring

Use the [Karavan modeler](/help/ide/modelers/integrations-karavan) - drag-and-drop with live YAML preview. The same `*.camel` file is reconciled by `CamelSynchronizer` regardless of whether it was authored visually or by hand.

## Tenancy

Camel routes run at the system level - they are not tenant-isolated.
