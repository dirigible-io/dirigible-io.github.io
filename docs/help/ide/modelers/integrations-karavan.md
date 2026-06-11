---
title: Integrations Modeler (Karavan)
description: Karavan-based Apache Camel route designer (*.camel).
---

# Integrations Modeler (Karavan)

A Karavan-powered visual designer for Apache Camel routes. It authors `*.camel` files that the platform's Camel engine deploys.

## Files

- `*.camel` - Camel route definition (YAML or XML, both supported by Karavan).

Reconciled by `CamelSynchronizer` into running Camel contexts.

## Authoring

Drag components from the Camel palette into a route graph.

- **Endpoints** - `http`, `https`, `file`, `ftp`, `sftp`, `timer`, `cron`, `direct`, `seda`.
- **Messaging** - `jms`, `activemq`, `kafka`, `rabbitmq`, `amqp`.
- **Processors** - `to`, `choice`, `filter`, `split`, `aggregate`, `transform`, `marshal`, `unmarshal`, `process`, `bean`, `setHeader`, `setBody`.
- **Data formats** - JSON (Jackson), XML (JAXB), CSV.

Connect components to define the flow. Configure each component's URI parameters in the property panel.

## Files on disk

Saving writes the Camel route as YAML or XML next to the project sources. The synchronizer picks it up and instantiates a Camel route in the running context.

## Underlying library

[Apache Camel Karavan](https://camel.apache.org/karavan/) bundled as the `resources-karavan-libs` resource module.

## See also

- [Camel artefacts](/help/artefacts/process/camel)
- [Apache Camel engine](https://camel.apache.org/)
