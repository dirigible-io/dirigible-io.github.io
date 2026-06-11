# Client

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.mongodb`
- source: [mongodb/Client.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/mongodb/Client.java)
:::

Hands back a configured Mongo `MongoClient` (`com.mongodb.client.MongoClient`). Callers can address any database / collection on it directly and use the full MongoDB driver surface - aggregation pipelines, multi-document transactions, GridFS, change streams.

`getDefaultDatabaseName()` returns the database name configured in the platform properties (often the entry point for application-managed collections); `createBasicDBObject()` returns a fresh empty `DBObject` for callers that still use the legacy DBObject API.

### Key Features:
- **Raw MongoClient**: Returns the standard `com.mongodb.client.MongoClient` so callers can use the full driver surface.
- **Default Database**: `getDefaultDatabaseName()` exposes the database name from the platform configuration.
- **Legacy DBObject Factory**: `createBasicDBObject()` returns an empty `DBObject` for code paths still using the legacy API.
- **Connection parameters**: Accepts a URI, user, and password - pass `null` to fall back to the platform defaults.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.mongodb.Client;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

MongoClient client = Client.getClient(null, null, null);
MongoDatabase db = client.getDatabase(Client.getDefaultDatabaseName());
MongoCollection<Document> orders = db.getCollection("orders");

orders.insertOne(new Document("orderId", "O-1001").append("status", "NEW"));
```

## Methods

### getClient()

Returns a configured `MongoClient`. If `uri` is `null` the platform default URI is used; the same applies to `user` and `password`.

> ```java
> public static MongoClient getClient(String uri, String user, String password);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `uri` | `String` | The MongoDB connection URI, or `null` to use the platform default. |
> | `user` | `String` | The MongoDB user, or `null` to use the platform default. |
> | `password` | `String` | The MongoDB password, or `null` to use the platform default. |
>
> ::: info Returns
> - **Type**: `com.mongodb.client.MongoClient`
> - **Description**: A connected MongoDB client ready for use against any database / collection.
> :::

### getDefaultDatabaseName()

Returns the default MongoDB database name from the platform configuration. Use this when an application does not need to switch between multiple databases.

> ```java
> public static String getDefaultDatabaseName();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The configured default database name.
> :::

### createBasicDBObject()

Returns a fresh empty legacy `DBObject`. Useful for code paths still working with the pre-Document driver API.

> ```java
> public static DBObject createBasicDBObject();
> ```
>
> ::: info Returns
> - **Type**: `com.mongodb.DBObject`
> - **Description**: A new empty `BasicDBObject`.
> :::
