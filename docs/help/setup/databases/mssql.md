---
title: Microsoft SQL Server
description: MSSQL setup.
---

# Microsoft SQL Server

Supported via `database-sql-mssql`. The Microsoft JDBC driver (`com.microsoft.sqlserver:mssql-jdbc`) is **not bundled** in Dirigible; add it to the launch classpath first, see [Adding a JDBC driver](/help/setup/databases/#adding-a-jdbc-driver). CI does not run the integration suite on MSSQL; it runs on H2 and PostgreSQL.

## As the default database

```bash
DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER=com.microsoft.sqlserver.jdbc.SQLServerDriver
DIRIGIBLE_DATASOURCE_DEFAULT_URL=jdbc:sqlserver://mssql.example.com:1433;databaseName=dirigible;encrypt=true;trustServerCertificate=false
DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME=dirigible
DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD=<secret>
```

For dev / self-signed certs you can set `trustServerCertificate=true`. Do not ship that to production.

## As a named pool

```json
{
    "name": "ReportsDB",
    "driver": "com.microsoft.sqlserver.jdbc.SQLServerDriver",
    "url": "jdbc:sqlserver://mssql:1433;databaseName=reports;encrypt=true",
    "username": "${env.REPORTS_USER}",
    "password": "${env.REPORTS_PASSWORD}"
}
```

## Notes

- Default schema is the database user's default schema (often `dbo`). Override via `currentSchema` if your dialect-aware DDL needs it.
- `IDENTITY` is the natural ID-generation path on MSSQL; sequences exist but identity is more common.
- The platform's `database-sql-mssql` dialect handles MSSQL-specific quoting (`[ident]`) and type coercion.

## See also

- [Working with data](/help/develop/working-with-data)
- [Data source artefact](/help/artefacts/data/datasource)
