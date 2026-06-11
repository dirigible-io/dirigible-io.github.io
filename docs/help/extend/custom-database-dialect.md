---
title: Custom database dialect
description: Add support for a new RDBMS via ISqlDialect / ISqlDialectProvider.
---

# Custom database dialect

Adding support for a new RDBMS means implementing the SQL dialect SPI. Pattern lives under `modules/database/database-sql/`.

## Interfaces

| Interface | Role |
| --------- | ---- |
| `ISqlDialectProvider` | Factory selecting a dialect for a connection. Registered via `META-INF/services/`. |
| `ISqlDialect`         | Per-RDBMS dialect: column types, identifier quoting, escape rules, DDL templates. |
| `ISqlBuilder`         | Fluent DDL / DML builder the platform's synchronizers use to emit SQL. |
| `ISqlKeywords`        | Reserved-keyword constants per dialect. |

## Module layout

```
modules/database/database-sql-<name>/
  pom.xml
  src/main/java/.../<name>/
    <Name>SqlDialect.java
    <Name>SqlDialectProvider.java
    <Name>SqlKeywords.java
  src/main/resources/META-INF/services/
    org.eclipse.dirigible.database.sql.ISqlDialectProvider
```

`META-INF/services` declares the provider so `ServiceLoader` picks it up. Add a single line with the FQN of your provider class.

## Implementing the provider

```java
public class FooSqlDialectProvider implements ISqlDialectProvider {

    @Override
    public String getName() { return "foo"; }

    @Override
    public ISqlDialect getDialect() { return new FooSqlDialect(); }

    @Override
    public boolean isApplicable(String productName) {
        return productName != null && productName.toLowerCase().contains("foo");
    }
}
```

`isApplicable` is called against the JDBC driver's reported product name. Pick a substring that uniquely identifies your database.

## Implementing the dialect

The dialect translates a small set of platform operations into SQL: `CREATE TABLE`, `CREATE VIEW`, identifier quoting, type mapping (`BIGINT`, `VARCHAR(...)`, `DECIMAL(p,s)`, ...). The HSQL / Postgres / MSSQL dialects under `database-sql-*` are the reference implementations.

## Registration

Add the module to `dependencies/` for version pinning and to the relevant `components/group/group-*` aggregator so the assembly bundles it.

## See also

- [Databases (setup)](/help/setup/databases/)
- [Schema artefact](/help/artefacts/data/schema)
- [Table artefact](/help/artefacts/data/table)
