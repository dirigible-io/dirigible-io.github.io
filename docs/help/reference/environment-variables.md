---
title: Environment variables
description: All DIRIGIBLE_* tunables - the curated reference.
---

# Environment variables

Authoritative source: `modules/commons/commons-config/src/main/java/org/eclipse/dirigible/commons/config/DirigibleConfig.java` (the enum) plus `Configuration.java` (the allow-list). The list below covers everything you typically reach for.

For the install-oriented subset see [`/help/setup/environment-variables`](/help/setup/environment-variables).

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
| `DIRIGIBLE_REPOSITORY_PROVIDER` | local | Repository backend. |
| `DIRIGIBLE_REPOSITORY_MASTER_PROVIDER` |  | Master / upstream repository. |
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
| `DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT` | `DefaultDB` | Default data source name. |
| `DIRIGIBLE_DATABASE_DATASOURCE_NAME_SYSTEM` | `SystemDB` | System data source name. |
| `DIRIGIBLE_LEAKED_CONNECTIONS_CHECK_INTERVAL_SECONDS` |  | JDBC leak-check cadence. |
| `DIRIGIBLE_LEAKED_CONNECTIONS_CHECK_MAX_IN_USE_SECONDS` |  | Threshold before logging a leak. |

## Multi-tenancy

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_MULTI_TENANT_MODE` | `true` | Multi-tenant switch. |
| `DIRIGIBLE_TENANT_SUBDOMAIN_REGEX` |  | Tenant resolution regex. |
| `DIRIGIBLE_TENANTS_PROVISIONING_FREQUENCY_SECONDS` |  | Provisioning poll cadence. |

## Synchronizers

| Variable | Purpose |
| -------- | ------- |
| `DIRIGIBLE_SYNCHRONIZER_FREQUENCY` | Reconciliation cadence (seconds). |
| `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_COUNT` | Retry budget for cross-synchronizer dependencies. |
| `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_INTERVAL_MILLIS` | Retry interval. |

## Debuggers and language tooling

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT` | `8081` | Graalium JS debugger port. |
| `DIRIGIBLE_GRAALIUM_ENABLE_DEBUG` | `true` (in Docker) | Toggle JS debug. |
| `DIRIGIBLE_JAVA_DEBUG_JDWP_PORT` | `8000` | JDWP for the Java debugger view. |
| `DIRIGIBLE_JAVA_LSP_ENABLED` |  | Toggle JDT.LS. |
| `DIRIGIBLE_JAVA_LSP_INSTALL_DIR` |  | JDT.LS install directory. |

## Mail

| Variable | Purpose |
| -------- | ------- |
| `DIRIGIBLE_MAIL_USERNAME` | SMTP username. |
| `DIRIGIBLE_MAIL_PASSWORD` | SMTP password. |
| `DIRIGIBLE_MAIL_TRANSPORT_PROTOCOL` | `smtp` or `smtps`. |
| `DIRIGIBLE_MAIL_SMTPS_HOST` / `DIRIGIBLE_MAIL_SMTP_HOST` | SMTP host. |
| `DIRIGIBLE_MAIL_SMTPS_PORT` / `DIRIGIBLE_MAIL_SMTP_PORT` | SMTP port. |
| `DIRIGIBLE_MAIL_SMTPS_AUTH` / `DIRIGIBLE_MAIL_SMTP_AUTH` | Auth toggle. |

## Flowable

| Variable | Purpose |
| -------- | ------- |
| `DIRIGIBLE_FLOWABLE_DATABASE_*` | Flowable's own data source. |
| `DIRIGIBLE_FLOWABLE_MAIL_*` | Flowable mail settings. |

## CMS / S3 / SharePoint

| Variable | Purpose |
| -------- | ------- |
| `DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER` | Internal CMIS root. |
| `DIRIGIBLE_S3_PROVIDER` | `aws` or `localstack`. |
| `DIRIGIBLE_MS_SHAREPOINT_*` | SharePoint CMS credentials. |

## Authentication providers

| Variable | Purpose |
| -------- | ------- |
| `DIRIGIBLE_GITHUB_CLIENT_ID` / `_CLIENT_SECRET` / `_SCOPE` | GitHub OAuth (`github` profile). |
| `DIRIGIBLE_KEYCLOAK_*` | Keycloak. |
| `DIRIGIBLE_COGNITO_*` | AWS Cognito. |
| `DIRIGIBLE_SNOWFLAKE_*` | Snowflake OAuth. |

## Encryption

| Variable | Purpose |
| -------- | ------- |
| `DIRIGIBLE_ENCRYPTION_KEY` | Base64 master key. |
| `DIRIGIBLE_ENCRYPTION_KEYSTORE_*` | Java keystore alternative. |

## Misc

| Variable | Purpose |
| -------- | ------- |
| `DIRIGIBLE_EXEC_COMMAND_LOGGING_ENABLED` | Audit shell-exec calls. |
| `DIRIGIBLE_TRIAL_ENABLED` | Trial-mode flag. |
| `SPRING_PROFILES_ACTIVE` | Spring profile selector (`github`, `keycloak`, `cognito`, `snowflake`, ...). |

The platform reads variables only through `DirigibleConfig` / `Configuration`. New tunables are added to those classes - don't introduce ad-hoc `System.getProperty` reads.

## See also

- [Setup environment variables](/help/setup/environment-variables)
- [Setup overview](/help/setup/)
