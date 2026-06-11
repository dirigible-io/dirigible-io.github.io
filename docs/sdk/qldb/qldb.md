# Qldb

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.qldb`
- source: [qldb/Qldb.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/qldb/Qldb.java)
:::

Entry point to Amazon QLDB (Quantum Ledger Database) - the platform's append-only, cryptographically-verifiable ledger backend. `open(ledger, table)` returns a platform `QLDBRepository` pinned to a specific ledger and table; the returned object exposes the full insert / get / update / delete / history surface.

Suitable for any data set that must keep an audit trail of every change - financial ledgers, regulatory submissions, certified document chains. For regular CRUD without the audit trail, prefer `org.eclipse.dirigible.sdk.db.Database` on a traditional RDBMS.

### Key Features:
- **Ledger-backed Repository**: `open(ledger, table)` returns a `QLDBRepository` pinned to one ledger / table pairing.
- **Append-only with audit trail**: Every change is recorded immutably and is cryptographically verifiable.
- **Full CRUD + History**: The returned repository exposes insert / get / update / delete and history operations.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.qldb.Qldb;
import org.eclipse.dirigible.components.api.qldb.QLDBRepository;

QLDBRepository ledger = Qldb.open("CertifiedDocuments", "Documents");

// Insert / get / update / delete / history calls are exposed by QLDBRepository.
```

## Methods

### open()

Opens a `QLDBRepository` pinned to the given ledger name and table name. The returned repository exposes the full insert / get / update / delete / history surface.

> ```java
> public static QLDBRepository open(String ledgerName, String tableName);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `ledgerName` | `String` | The name of the QLDB ledger to open. |
> | `tableName` | `String` | The name of the table within the ledger. |
>
> ::: info Returns
> - **Type**: `org.eclipse.dirigible.components.api.qldb.QLDBRepository`
> - **Description**: A repository handle pinned to the given ledger / table.
> :::
