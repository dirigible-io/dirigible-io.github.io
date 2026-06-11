---
title: PostgreSQL
description: PostgreSQL setup - default-DB or named-pool.
---

# PostgreSQL

PostgreSQL is the most-tested non-default database. CI runs the integration suite against **PostgreSQL 16**.

## As the default database

```bash
DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER=org.postgresql.Driver
DIRIGIBLE_DATASOURCE_DEFAULT_URL=jdbc:postgresql://db.example.com:5432/dirigible
DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME=dirigible
DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD=<secret>
```

JDBC driver: `org.postgresql.Driver` (`postgresql:42.x`). Already on the platform classpath.

## As a named pool

Declare a `*.datasource` artefact:

```json
{
    "name": "ReportsDB",
    "driver": "org.postgresql.Driver",
    "url": "jdbc:postgresql://db:5432/reports",
    "username": "${env.REPORTS_USER}",
    "password": "${env.REPORTS_PASSWORD}"
}
```

See [`/help/artefacts/data/datasource`](/help/artefacts/data/datasource).

## TLS

For TLS connections set `sslmode=require` (or `verify-full`) on the URL plus the truststore properties needed by your environment.

## Notes

- Schema name defaults to `public`. Use `currentSchema=…` on the URL to scope.
- Sequence-based ID generation (`@GeneratedValue(strategy = SEQUENCE)`) is fully supported - prefer this over `IDENTITY` on Postgres.

## See also

- [Working with data](/help/develop/working-with-data)
- [Data source artefact](/help/artefacts/data/datasource)
- [Databases overview](/help/setup/databases/)
