---
title: Databases
description: Supported databases and connection settings.
---

# Databases

- **[H2](/help/setup/databases/h2)** - the default; file-backed. Driver bundled.
- **[PostgreSQL](/help/setup/databases/postgres)** - driver bundled.
- **[Microsoft SQL Server](/help/setup/databases/mssql)** - [add the driver](#adding-a-jdbc-driver).
- **[MariaDB](/help/setup/databases/mariadb)** - [add the driver](#adding-a-jdbc-driver).
- **[MySQL](/help/setup/databases/mysql)** - [add the driver](#adding-a-jdbc-driver).
- **[SAP HANA](/help/setup/databases/hana)** - [add the driver](#adding-a-jdbc-driver).
- **[Snowflake](/help/setup/databases/snowflake)**
- **[MongoDB](/help/setup/databases/mongodb)** - NoSQL via the platform's MongoDB JDBC adapter.

## Adding a JDBC driver

Dirigible bundles only the drivers it tests: **H2** and **PostgreSQL**. The dialects of the other databases (SQL generation, DDL, type mapping) ship with the platform, their JDBC drivers do not. Add the driver of the database you connect to in one of three ways:

| Way | For | Example |
| --- | --- | --- |
| **`/modules` drop-in** | the default and system databases, any image | `COPY mysql-connector-j-9.7.0.jar /modules/` in a downstream image, or mount a volume at `/modules`. The runtime image launches with `-Dloader.path=/modules`; set `LOADER_PATH` (comma-separated) for another location. |
| **Application pom** | a custom edition built from the Dirigible modules | add the driver dependency next to `dirigible-application`; the version is managed by `dirigible-dependencies`. |
| **`project.json`, `scope: "platform"`** | named data sources (`*.datasource`) declared by a project | `{ "type": "maven", "id": "com.mysql:mysql-connector-j:9.7.0", "scope": "platform" }`, see [Maven dependencies](/help/develop/maven-dependencies). |

The default and system databases connect at boot, before any project dependency is resolved, so their driver must be on the launch classpath: use the drop-in or the application pom.

| Database | Driver class | Maven coordinate |
| --- | --- | --- |
| Microsoft SQL Server | `com.microsoft.sqlserver.jdbc.SQLServerDriver` | `com.microsoft.sqlserver:mssql-jdbc` |
| SAP HANA | `com.sap.db.jdbc.Driver` | `com.sap.cloud.db.jdbc:ngdbc` |
| MySQL | `com.mysql.cj.jdbc.Driver` | `com.mysql:mysql-connector-j` |
| MariaDB | `org.mariadb.jdbc.Driver` | `org.mariadb.jdbc:mariadb-java-client` |

A data source whose driver class is not on the classpath fails with a message naming the driver class, the data source and the coordinate to add.
