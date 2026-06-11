---
title: Environment variables
description: Curated DIRIGIBLE_* tunables for setup.
---

# Environment variables

The authoritative source is `modules/commons/commons-config/src/main/java/org/eclipse/dirigible/commons/config/DirigibleConfig.java` (the enum) plus `Configuration.java` (the allow-list). The list below covers the variables you typically set during install.

The full reference (every variable, every default) is at [`/help/reference/environment-variables`](/help/reference/environment-variables).

## Server

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_SERVER_PORT` | `8080` | HTTP listen port. |
| `DIRIGIBLE_HOME_URL` | `services/web/shell-ide/` | Where `/` redirects to. |
| `DIRIGIBLE_BASIC_USERNAME` | `admin` | Default basic-auth user. |
| `DIRIGIBLE_BASIC_PASSWORD` | `admin` | Default basic-auth password. |

## Repository

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER` | `./target/` | On-disk registry root. |
| `DIRIGIBLE_REGISTRY_EXTERNAL_FOLDER` |  | Mount an external folder into the registry. |
| `DIRIGIBLE_REGISTRY_EXTERNAL_FOLDER_AS_SUBFOLDER` |  | Mount under a sub-path. |
| `DIRIGIBLE_REGISTRY_EXTERNAL_FOLDER_IGNORED_FOLDERS` |  | Comma-separated ignore list. |

## Data sources

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER` | H2 file driver | JDBC driver class. |
| `DIRIGIBLE_DATASOURCE_DEFAULT_URL` | local H2 | JDBC URL. |
| `DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME` |  | JDBC user. |
| `DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD` |  | JDBC password. |
| `DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT` | `DefaultDB` | Logical name. |
| `DIRIGIBLE_DATABASE_DATASOURCE_NAME_SYSTEM` | `SystemDB` | Logical name of the system DB. |
| `DIRIGIBLE_LEAKED_CONNECTIONS_CHECK_INTERVAL_SECONDS` |  | JDBC leak detection cadence. |
| `DIRIGIBLE_LEAKED_CONNECTIONS_CHECK_MAX_IN_USE_SECONDS` |  | Threshold before logging a leak. |

## Multi-tenancy

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_MULTI_TENANT_MODE` | `true` | Multi-tenant switch. |
| `DIRIGIBLE_TENANT_SUBDOMAIN_REGEX` |  | Tenant resolution regex. |
| `DIRIGIBLE_TENANTS_PROVISIONING_FREQUENCY_SECONDS` |  | Provisioning poll cadence. |

## Debuggers

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT` | `8081` | Graalium JS debugger port. |
| `DIRIGIBLE_GRAALIUM_ENABLE_DEBUG` | `true` (in Docker) | Toggle JS debug. |
| `DIRIGIBLE_JAVA_DEBUG_JDWP_PORT` | `8000` | JDWP port for the Java debugger view. |
| `DIRIGIBLE_JAVA_LSP_ENABLED` |  | Toggle JDT.LS. |
| `DIRIGIBLE_JAVA_LSP_INSTALL_DIR` |  | JDT.LS install directory. |

## Synchronizers

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_SYNCHRONIZER_FREQUENCY` |  | Reconciliation cadence. |
| `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_COUNT` |  | Retry budget for cross-synchronizer dependencies. |
| `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_INTERVAL_MILLIS` |  | Retry interval. |

## Mail / Flowable / SharePoint / S3

| Variable | Purpose |
| -------- | ------- |
| `DIRIGIBLE_MAIL_*` | SMTP defaults for the Mail SDK. |
| `DIRIGIBLE_FLOWABLE_*` | Flowable engine config (datasource, mail). |
| `DIRIGIBLE_MS_SHAREPOINT_*` | SharePoint CMS credentials. |
| `DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER` | Internal CMIS root path. |
| `DIRIGIBLE_S3_PROVIDER` | `aws` or `localstack`. |

## OAuth (GitHub profile)

| Variable | Purpose |
| -------- | ------- |
| `DIRIGIBLE_GITHUB_CLIENT_ID` | GitHub OAuth client id. |
| `DIRIGIBLE_GITHUB_CLIENT_SECRET` | GitHub OAuth client secret. |
| `DIRIGIBLE_GITHUB_SCOPE` | Requested scopes. |

Activated only when the `github` Spring profile is active. See [`/help/setup/authentication/github-oauth`](/help/setup/authentication/github-oauth).

## Misc

| Variable | Purpose |
| -------- | ------- |
| `DIRIGIBLE_EXEC_COMMAND_LOGGING_ENABLED` | Audit shell-exec calls. |
| `DIRIGIBLE_TRIAL_ENABLED` | Trial-mode flag. |

## See also

- [Full env-var reference](/help/reference/environment-variables)
- `DirigibleConfig.java` in the platform repo - source of truth.
