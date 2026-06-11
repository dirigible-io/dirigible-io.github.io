---
title: Data source artefact
description: JDBC pool registration via .datasource. Synchronizer DataSourcesSynchronizer.
---

# Data source - `*.datasource`

Registers a named JDBC pool with the platform. Synchronizer: `DataSourcesSynchronizer` (`components/data/data-sources`). Engine: HikariCP-backed `DataSourcesManager`.

## File format

```json
{
    "name": "ReportsDB",
    "driver": "org.postgresql.Driver",
    "url": "jdbc:postgresql://db:5432/reports",
    "username": "${env.REPORTS_USER}",
    "password": "${env.REPORTS_PASSWORD}",
    "properties": {
        "ApplicationName": "dirigible",
        "tcpKeepAlive": "true"
    }
}
```

Drop the file anywhere under `/registry/public/<project>/...` and publish. The pool appears in the Database perspective and is reachable by name from user code:

```ts
import { Database } from "@aerokit/sdk/db";
const conn = Database.getConnection("ReportsDB");
```

```java
java.sql.Connection conn = org.eclipse.dirigible.sdk.db.Database.getConnection("ReportsDB");
```

## Fields

| Field | Required | Notes |
| ----- | -------- | ----- |
| `name`       | yes | Logical handle used by `Database.getConnection(name)`. Must be unique per tenant. |
| `driver`     | yes | Fully-qualified JDBC driver class. |
| `url`        | yes | JDBC URL. Supports `${env.*}` interpolation. |
| `username`   | no  | Pool credential. Supports `${env.*}`. |
| `password`   | no  | Pool credential. Supports `${env.*}`. |
| `properties` | no  | Map merged into the driver's connection properties. |

## Default data source

The platform's default JDBC pool is **not** declared as a `*.datasource` - it is configured via `DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER` / `_URL` / `_USERNAME` / `_PASSWORD`. See [`/help/setup/databases/`](/help/setup/databases/).

## Tenant isolation

When multi-tenancy is on (default), each tenant gets its own resolved pool. The SystemDB is system-level.

## Editor

Edit visually in the Database perspective or as JSON in [Monaco](/help/ide/editors/monaco).

## See also

- [`@aerokit/sdk/db/database`](/api/db/database)
- [`org.eclipse.dirigible.sdk.db.Database`](/sdk/db/database)
- [Working with data](/help/develop/working-with-data)
- [Databases setup](/help/setup/databases/)
