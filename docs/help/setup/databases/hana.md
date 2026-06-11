---
title: SAP HANA
description: SAP HANA (Cloud and on-premise) setup.
---

# SAP HANA

Supported via `database-sql-hana`. The SAP HANA JDBC driver (`ngdbc`) ships on the platform classpath.

## As the default database

```bash
DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER=com.sap.db.jdbc.Driver
DIRIGIBLE_DATASOURCE_DEFAULT_URL=jdbc:sap://hana.example.com:443/?encrypt=true&validateCertificate=true
DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME=DIRIGIBLE
DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD=<secret>
```

For HANA Cloud the URL ends with `?encrypt=true&validateCertificate=true`; for on-premise instances `currentSchema=YOUR_SCHEMA` is often needed.

## As a named pool

```json
{
    "name": "ReportsDB",
    "driver": "com.sap.db.jdbc.Driver",
    "url": "jdbc:sap://hana:443/?encrypt=true&validateCertificate=true&currentSchema=REPORTS",
    "username": "${env.REPORTS_USER}",
    "password": "${env.REPORTS_PASSWORD}"
}
```

## Encryption

HANA enforces TLS for the database protocol. The driver validates the server certificate against the JVM truststore by default. Mount your CA bundle into the JVM truststore if you run with self-signed certs.

## Notes

- Schema names default to upper-case unless quoted. The platform's HANA dialect emits unquoted identifiers, so prefer upper-case names in `.schema` / `.table` artefacts.
- Sequences are the natural ID-generation path - `@GeneratedValue(strategy = SEQUENCE)`.
- HANA is used widely across SAP BTP Kyma deployments - see [`/help/setup/kubernetes/kyma`](/help/setup/kubernetes/kyma).

## See also

- [Working with data](/help/develop/working-with-data)
- [Kyma install](/help/setup/kubernetes/kyma)
