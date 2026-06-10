# etcd/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.etcd`
- source: [etcd/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/etcd)
:::

This module gives Dirigible Java code a configured jetcd client against the platform's etcd backend. etcd is a distributed key-value store typically used for distributed configuration storage, leader election, and distributed-lock primitives — the full jetcd async surface is available on the returned client.

etcd works in byte sequences rather than strings; small helpers in the facade convert between Java `String` / `byte[]` and jetcd `ByteSequence` so callers do not have to import jetcd's encoding helpers directly.

The main components of this module are:

- [`Client`](./client.md) — returns the configured `io.etcd.jetcd.KV` client and string / byte-array conversion helpers.

## Classes
