---
title: Working with data
description: Declare data sources, schemas, tables, views, and CSV import models; run SQL from user code.
---

# Working with data

Two layers cooperate. **Artefacts** declare the structure (data sources, schemas, tables, views, CSV imports) and are reconciled into the live runtime by their synchronizers. **SDK calls** let your user code execute queries, updates, and bulk operations against the resulting data sources.

## Declaring data sources

Add a `*.datasource` artefact to register a new JDBC pool:

```json
{
    "name": "ReportsDB",
    "driver": "org.postgresql.Driver",
    "url": "jdbc:postgresql://db:5432/reports",
    "username": "${env.REPORTS_USER}",
    "password": "${env.REPORTS_PASSWORD}",
    "properties": { "ApplicationName": "dirigible" }
}
```

See [`/help/artefacts/data/datasource`](/help/artefacts/data/datasource).

## Declaring tables, views, schemas

For declarative DDL pick the right artefact:

- A single table - `*.table`. See [`/help/artefacts/data/table`](/help/artefacts/data/table).
- A view - `*.view`. See [`/help/artefacts/data/view`](/help/artefacts/data/view).
- A group of tables / views / constraints - `*.schema`. See [`/help/artefacts/data/schema`](/help/artefacts/data/schema).

Edit visually in the [Database Schema modeler](/help/ide/modelers/database-schema).

## Bulk-importing CSV

Pair a `*.csvim` (the model) with one or more `*.csv` files. See [`/help/artefacts/data/csvim`](/help/artefacts/data/csvim) and the [CSVIM editor](/help/ide/editors/csv-and-csvim).

## Running SQL from user code

Use the SDK's `db` modules.

```ts
import { Database } from "@aerokit/sdk/db";

const conn = Database.getConnection();
try {
    const stmt = conn.prepareStatement("SELECT id, name FROM countries WHERE active = ?");
    stmt.setBoolean(1, true);
    const rows = stmt.executeQuery();
    while (rows.next()) {
        console.log(rows.getLong("id"), rows.getString("name"));
    }
} finally {
    conn.close();
}
```

```java
import org.eclipse.dirigible.sdk.db.Database;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

try (Connection conn = Database.getConnection()) {
    PreparedStatement stmt = conn.prepareStatement(
        "SELECT id, name FROM countries WHERE active = ?");
    stmt.setBoolean(1, true);
    try (ResultSet rows = stmt.executeQuery()) {
        while (rows.next()) {
            System.out.println(rows.getLong("id") + " " + rows.getString("name"));
        }
    }
}
```

For typed entity CRUD use the entity store - see [`/help/develop/entities-and-persistence`](/help/develop/entities-and-persistence).

## Multi-tenancy

User data sources are **tenant-isolated** by default. Each tenant's calls to `Database.getConnection()` resolve to its own pool. The SystemDB stays system-level. See [`/help/concepts/multi-tenancy`](/help/concepts/multi-tenancy).

## Supported databases

H2 (default, file-backed), PostgreSQL, Microsoft SQL Server, MariaDB, MySQL, SAP HANA, Snowflake, MongoDB (via the platform's MongoDB JDBC adapter). See [`/help/setup/databases/`](/help/setup/databases/).

CI runs the integration suite against H2, PostgreSQL 16, and MSSQL 2022 - emit DB-portable SQL.

## See also

- [`@aerokit/sdk/db`](/api/db/)
- [`org.eclipse.dirigible.sdk.db`](/sdk/db/)
- [Database perspective](/help/ide/perspectives/database)
- [Data transfer](/help/operate/data-transfer)
