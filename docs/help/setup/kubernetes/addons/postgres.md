---
title: PostgreSQL addon
description: In-cluster PostgreSQL for development and small production deployments.
---

# PostgreSQL addon

The Helm chart bundles a PostgreSQL subchart. Enable for evaluation; for production prefer a managed Postgres (Cloud SQL, RDS, Azure DB for Postgres, Crunchy / CloudNativePG operators).

## Install

```yaml
postgres:
  enabled: true
  auth:
    username: dirigible
    password:
      valueFrom: { secretKeyRef: { name: pg-secrets, key: password } }
    database: dirigible
  persistence:
    enabled: true
    size: 10Gi
```

The chart will wire the resulting credentials into the standard `DIRIGIBLE_DATASOURCE_DEFAULT_*` env vars on the Dirigible pod.

## External Postgres

Disable the subchart and point Dirigible at an external instance:

```yaml
postgres:
  enabled: false

env:
  DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER: org.postgresql.Driver
  DIRIGIBLE_DATASOURCE_DEFAULT_URL: jdbc:postgresql://pg.example.com:5432/dirigible
  DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME:
    valueFrom: { secretKeyRef: { name: dirigible-db, key: username } }
  DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD:
    valueFrom: { secretKeyRef: { name: dirigible-db, key: password } }
```

## See also

- [PostgreSQL database setup](/help/setup/databases/postgres)
- [Helm install](/help/setup/kubernetes/helm)
