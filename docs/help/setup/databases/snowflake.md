---
title: Snowflake
description: Snowflake setup, including the Snowpark integration.
---

# Snowflake

Supported via `database-sql-snowflake`. The Snowflake JDBC driver ships on the platform classpath.

## As the default database

```bash
DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER=net.snowflake.client.jdbc.SnowflakeDriver
DIRIGIBLE_DATASOURCE_DEFAULT_URL=jdbc:snowflake://<account>.snowflakecomputing.com/?warehouse=COMPUTE_WH&db=DIRIGIBLE&schema=PUBLIC
DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME=DIRIGIBLE
DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD=<secret>
```

## As a named pool

```json
{
    "name": "AnalyticsDB",
    "driver": "net.snowflake.client.jdbc.SnowflakeDriver",
    "url": "jdbc:snowflake://acct.snowflakecomputing.com/?warehouse=COMPUTE_WH&db=ANALYTICS",
    "username": "${env.SNOWFLAKE_USER}",
    "password": "${env.SNOWFLAKE_PASSWORD}"
}
```

## Snowpark integration

The `data-source-snowpark` component provides a Snowpark session per Snowflake data source. Useful when you want to push compute into Snowflake instead of pulling rows over JDBC.

## Authentication

Username + password is the simplest path. For production prefer key-pair authentication:

```bash
DIRIGIBLE_DATASOURCE_DEFAULT_URL=jdbc:snowflake://acct.snowflakecomputing.com/?private_key_file=/etc/secrets/sf_rsa_key.p8&private_key_file_pwd=<pwd>
```

## Notes

- Default schema is `PUBLIC`. Override via the URL.
- Identifiers default to upper-case unquoted. Use upper-case names in `.schema` / `.table` artefacts.
- Snowflake supports `IDENTITY` and `SEQUENCE`. The platform's dialect emits both correctly.

## See also

- [Snowflake authentication](/help/setup/authentication/snowflake)
- [Working with data](/help/develop/working-with-data)
