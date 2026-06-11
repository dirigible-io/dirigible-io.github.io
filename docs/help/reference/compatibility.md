---
title: Compatibility
description: JDK, Node, database, browser, Kubernetes support matrix.
---

# Compatibility

## JDK

- **JDK 21** (LTS) is the compile target and the only officially supported runtime.

## Build toolchain

- **Maven** 3.8.x.
- **Node.js** 22.x (only for the frontend WebJar bundling step at build time; not a runtime dependency).
- **TypeScript** and **esbuild** globals (install with `npm install -g typescript esbuild`).
- **ttyd** (only required at runtime for the in-IDE terminal on port 9000).

## Databases

CI runs the integration suite against all three of:

- **H2** (default, file-backed).
- **PostgreSQL 16**.
- **Microsoft SQL Server 2022**.

Supported via dedicated dialect modules but not in the CI integration matrix:

- **MariaDB**.
- **MySQL**.
- **SAP HANA** (Cloud and on-premise).
- **Snowflake**.
- **MongoDB** (via the platform's MongoDB JDBC adapter).

## Browsers

Modern evergreen browsers - **Chrome / Firefox / Safari / Edge** in their current and previous major versions. The IDE chrome relies on standard DOM / CSS features; no IE support.

## Kubernetes

Tested on:

- **Google Kubernetes Engine** (Autopilot + Standard).
- **Azure Kubernetes Service**.
- **Red Hat OpenShift** 4.x.
- **SAP BTP Kyma Runtime**.
- Vanilla Kubernetes via Helm, 1.27+.

## Authentication providers

- **Basic** - default.
- **GitHub OAuth** - `github` Spring profile.
- **Keycloak** - any modern Keycloak release with OIDC.
- **Amazon Cognito** - user pools, Authorization Code grant.
- **Snowflake** - OAuth security integration.

## See also

- [Setup overview](/help/setup/)
- [Databases](/help/setup/databases/)
- [Authentication](/help/setup/authentication/)
