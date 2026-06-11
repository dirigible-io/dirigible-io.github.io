---
title: MariaDB
description: MariaDB setup.
---

# MariaDB

Supported via `database-sql-mariadb`. The MariaDB JDBC driver ships on the platform classpath.

## As the default database

```bash
DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER=org.mariadb.jdbc.Driver
DIRIGIBLE_DATASOURCE_DEFAULT_URL=jdbc:mariadb://db.example.com:3306/dirigible
DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME=dirigible
DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD=<secret>
```

## As a named pool

```json
{
    "name": "ReportsDB",
    "driver": "org.mariadb.jdbc.Driver",
    "url": "jdbc:mariadb://db:3306/reports",
    "username": "${env.REPORTS_USER}",
    "password": "${env.REPORTS_PASSWORD}"
}
```

## Notes

- TLS is configured via the standard MariaDB URL parameters (`useSsl=true`, etc.).
- ID generation: `IDENTITY` (`AUTO_INCREMENT`) is the natural fit. Sequences exist in modern MariaDB.

## See also

- [Working with data](/help/develop/working-with-data)
- [Data source artefact](/help/artefacts/data/datasource)
