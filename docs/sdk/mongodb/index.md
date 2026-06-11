# mongodb/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.mongodb`
- source: [mongodb/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/mongodb)
:::

This module hands back a configured MongoDB client wired against the platform's MongoDB connection settings. The returned object is the standard `com.mongodb.client.MongoClient`, so callers can address any database / collection on it directly and use the full driver surface - aggregation pipelines, transactions, GridFS, change streams.

The facade also exposes the default database name from the platform properties (commonly the entry point for application-managed collections) and a small helper to mint an empty `DBObject` for callers that still use the legacy DBObject API.

The main components of this module are:

- [`Client`](./client.md) - returns the configured `com.mongodb.client.MongoClient`, the default database name, and a legacy `DBObject` factory.

## Classes
