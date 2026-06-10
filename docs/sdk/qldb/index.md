# qldb/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.qldb`
- source: [qldb/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/qldb)
:::

This module is the entry point to Amazon QLDB (Quantum Ledger Database) — the platform's append-only, cryptographically-verifiable ledger backend. Useful for any data set that must keep an audit trail of every change (financial ledgers, regulatory submissions, certified document chains).

For regular CRUD workloads without the audit trail, prefer the platform's database module (`org.eclipse.dirigible.sdk.db.Database`) over a traditional RDBMS.

The main components of this module are:

- [`Qldb`](./qldb.md) — opens a `QLDBRepository` pinned to a specific ledger / table.

## Classes
