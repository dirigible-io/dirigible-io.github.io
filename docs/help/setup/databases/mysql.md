---
title: MySQL
description: MySQL setup.
---

# MySQL

Supported via `database-sql-mysql`. The official MySQL Connector/J driver is on the platform classpath.

## As the default database

```bash
DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER=com.mysql.cj.jdbc.Driver
DIRIGIBLE_DATASOURCE_DEFAULT_URL=jdbc:mysql://db.example.com:3306/dirigible?useSSL=true&serverTimezone=UTC
DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME=dirigible
DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD=<secret>
```

## As a named pool

```json
{
    "name": "ReportsDB",
    "driver": "com.mysql.cj.jdbc.Driver",
    "url": "jdbc:mysql://db:3306/reports?useSSL=true",
    "username": "${env.REPORTS_USER}",
    "password": "${env.REPORTS_PASSWORD}"
}
```

## Notes

- Use `serverTimezone=UTC` on the URL to avoid timezone-dependent timestamp drift.
- `useSSL=true` is the default for modern MySQL servers. Configure trust accordingly.
- ID generation: `IDENTITY` (`AUTO_INCREMENT`).

## See also

- [Working with data](/help/develop/working-with-data)
- [Data source artefact](/help/artefacts/data/datasource)
