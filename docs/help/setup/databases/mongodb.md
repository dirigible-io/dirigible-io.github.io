---
title: MongoDB
description: MongoDB via the platform's MongoDB JDBC adapter.
---

# MongoDB

Supported via `database-sql-mongodb` and `database-mongodb-jdbc`. The platform exposes MongoDB through a JDBC adapter so existing relational-style platform tooling (data-transfer, OData, queries) just works.

## As the default database

```bash
DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER=org.eclipse.dirigible.database.mongodb.jdbc.MongoDBDriver
DIRIGIBLE_DATASOURCE_DEFAULT_URL=jdbc:mongodb://mongo.example.com:27017/dirigible
DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME=dirigible
DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD=<secret>
```

## Reaching native Mongo `Document`s

The JDBC adapter exposes a trick: `ResultSet.getObject(-100)` returns the native `org.bson.Document` for the current row instead of column-by-column projection. Use this when the underlying document has nested fields the JDBC `ResultSet` can't naturally express.

```java
ResultSet rs = stmt.executeQuery("SELECT * FROM orders");
while (rs.next()) {
    org.bson.Document doc = (org.bson.Document) rs.getObject(-100);
    // doc.getNested("items").get(0)...
}
```

## SDK alternative

For pure-Mongo workflows skip JDBC and use the SDK Mongo client directly:

- TS: [`@aerokit/sdk/mongodb`](/api/mongodb/)
- Java: [`org.eclipse.dirigible.sdk.mongodb`](/sdk/mongodb/)

Both return the raw `com.mongodb.client.MongoClient`, so the full driver API surface is reachable.

## Notes

- Schema / table concepts map to Mongo databases / collections.
- DDL-emitting synchronizers (`.schema`, `.table`, `.view`) target relational databases - they do not apply to a Mongo data source.

## See also

- [Working with data](/help/develop/working-with-data)
- [`@aerokit/sdk/mongodb`](/api/mongodb/)
- [`org.eclipse.dirigible.sdk.mongodb`](/sdk/mongodb/)
