---
title: Environment variables
description: All DIRIGIBLE_* tunables - the curated reference.
---

# Environment variables

Authoritative source: `modules/commons/commons-config/src/main/java/org/eclipse/dirigible/commons/config/DirigibleConfig.java` (the enum) plus `Configuration.java` (the allow-list). The list below covers everything you typically reach for.

For the install-oriented subset see [`/help/setup/environment-variables`](/help/setup/environment-variables).

## Server

| Variable                        | Default                   | Purpose                                                                                                                                                                                                          |
| ------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DIRIGIBLE_SERVER_PORT`         | `8080`                    | HTTP listen port.                                                                                                                                                                                                |
| `DIRIGIBLE_HOME_URL`            | `services/web/shell-ide/` | Where `/` redirects to.                                                                                                                                                                                          |
| `DIRIGIBLE_BASIC_USERNAME`      | `admin`                   | Default basic-auth user.                                                                                                                                                                                         |
| `DIRIGIBLE_BASIC_PASSWORD`      | `admin`                   | Default basic-auth password.                                                                                                                                                                                     |
| `DIRIGIBLE_SECURITY_LOGIN_PAGE` |                           | Application-owned login page for the OAuth2 profiles. Unauthenticated browsers are redirected there instead of the identity provider. See [First-Party Sign-In](/help/setup/authentication/first-party-sign-in). |

## CORS

Cross-origin access for frontends hosted outside the platform. Unset, the OAuth2 login profiles (`cognito`, `keycloak`, `github`) answer no cross-origin request at all, and the `basic` and `snowflake` profiles keep allowing every origin - without credentials, so a page a signed-in user happens to visit cannot call the platform with that user's session. Setting the origins enables CORS on every profile with exactly what the other keys grant - a combination that cannot be safe (credentials for every origin, the `null` origin, an unknown method) fails the start. The STOMP handshake accepts those of the origins that name a host - a wildcard never reaches it, since a WebSocket handshake carries the session cookie. See [External frontends](/help/setup/authentication/external-frontends).

| Variable                           | Default                                              | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DIRIGIBLE_CORS_ALLOWED_ORIGINS`   |                                                      | Comma-separated origins or origin patterns, e.g. `https://app.example.com`, `https://*.example.com`, `capacitor://localhost`, `tauri://localhost`. A port pattern is accepted (`https://*.example.com:[8080]`, `https://*.example.com:[*]`). The value is split on commas, so Spring's multi-port list `:[8080,8081]` cannot be written - list each port as its own pattern. A pattern must name a host to be usable with credentials or on the STOMP handshake. A bare `*` or `https://*` serves bearer clients over HTTP only. |
| `DIRIGIBLE_CORS_ALLOW_CREDENTIALS` | `false`                                              | Whether cross-origin requests from the listed origins may carry cookies and HTTP authentication. Refused together with a wildcard origin. CSRF tokens are disabled on every chain, so an origin granted credentials is fully trusted with the sessions of signed-in users. Bearer-token clients do not need it. Does not govern the STOMP endpoint: a WebSocket handshake carries cookies by its nature and the SockJS transports answer with credentials, as SockJS requires - the origin list is what protects it.             |
| `DIRIGIBLE_CORS_ALLOWED_METHODS`   | `GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS`             | HTTP methods granted to the listed origins.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `DIRIGIBLE_CORS_ALLOWED_HEADERS`   | `Authorization,Content-Type,Accept,X-Requested-With` | Request headers granted to the listed origins.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `DIRIGIBLE_CORS_EXPOSED_HEADERS`   | `Content-Disposition`                                | Response headers a cross-origin script may read.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `DIRIGIBLE_CORS_MAX_AGE`           | `3600`                                               | Seconds a browser may cache a preflight answer. A tightened configuration reaches a browser only after that time.                                                                                                                                                                                                                                                                                                                                                                                                                |

## Bearer tokens (cognito, keycloak)

How the OAuth2 login profiles treat a token presented in the `Authorization: Bearer` header - by an external frontend, a mobile application, a machine client or a STOMP CONNECT frame. Every token is verified against the identity provider's keys and must carry its issuer. The two kinds are then held to different rules - an ID token is verified like a login, an access token keeps the rules machine clients relied on - so that an ID token cannot act as a user it does not prove:

|                     | ID token (`token_use=id` on Cognito, `typ=ID` on Keycloak)                                                         | Access token (`token_use=access` on Cognito, `typ=Bearer` on Keycloak)                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Audience            | required: `aud` must name one of `DIRIGIBLE_OAUTH2_JWT_AUDIENCES`, by default the profile's client id              | checked only when `DIRIGIBLE_OAUTH2_JWT_AUDIENCES` is set - Cognito access tokens present `client_id`, Keycloak ones `aud` |
| User name           | `DIRIGIBLE_OAUTH2_JWT_PRINCIPAL_CLAIM`. A token without the claim is refused                                       | `sub`                                                                                                                      |
| Roles               | the user's groups (`cognito:groups` / `groups`, by the tenant resolution strategy) plus whatever the scopes map to | whatever the scopes map to                                                                                                 |
| `POST /login/token` | mints a session                                                                                                    | refused                                                                                                                    |

A refresh token, an offline token, a Keycloak token without a `typ` or a token of any other kind is never accepted. Tokens are validated against the profile's provider only - a custom client registration with another issuer cannot present bearer tokens - and must be signed with an asymmetric algorithm whose key the provider publishes (RS256/384/512, PS256/384/512, ES256/384/512). The keys are cached for five minutes and refetched at most once every thirty seconds when a token names a key that is not cached.

| Variable                                      | Default                                                                                 | Purpose                                                                                                                                                                             |
| --------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DIRIGIBLE_OAUTH2_JWT_TOKEN_KINDS`            | `id,access`                                                                             | Kinds of tokens accepted at all. `id` alone refuses machine clients, `access` alone refuses user tokens.                                                                            |
| `DIRIGIBLE_OAUTH2_JWT_PRINCIPAL_CLAIM`        | the profile's user-name attribute: `email` on Cognito, `preferred_username` on Keycloak | Claim of an ID token the user name is read from.                                                                                                                                    |
| `DIRIGIBLE_OAUTH2_JWT_AUDIENCES`              | the profile's client id                                                                 | Comma-separated audiences a token must be issued for. Setting it also switches the audience check on for access tokens, so list every client whose access tokens must keep working. |
| `DIRIGIBLE_OAUTH2_JWT_ISSUER_URI`             | the profile's issuer                                                                    | Issuer every token must carry. Set it when the tokens name the provider by a URL other than the one the platform reaches it by.                                                     |
| `DIRIGIBLE_OAUTH2_JWT_JWK_SET_URI`            | the profile's JWKS endpoint                                                             | Where the signing keys are fetched from.                                                                                                                                            |
| `DIRIGIBLE_OAUTH2_JWT_REQUIRE_VERIFIED_EMAIL` | `true`                                                                                  | An ID token identified by its `email` claim must also carry `email_verified=true`. Switch off only for a provider that verifies addresses before issuing them.                      |

## Repository

| Variable                                             | Default     | Purpose                                     |
| ---------------------------------------------------- | ----------- | ------------------------------------------- |
| `DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER`             | `./target/` | On-disk registry root.                      |
| `DIRIGIBLE_REPOSITORY_PROVIDER`                      | local       | Repository backend.                         |
| `DIRIGIBLE_REPOSITORY_MASTER_PROVIDER`               |             | Master / upstream repository.               |
| `DIRIGIBLE_REGISTRY_EXTERNAL_FOLDER`                 |             | Mount an external folder into the registry. |
| `DIRIGIBLE_REGISTRY_EXTERNAL_FOLDER_AS_SUBFOLDER`    |             | Mount under a sub-path.                     |
| `DIRIGIBLE_REGISTRY_EXTERNAL_FOLDER_IGNORED_FOLDERS` |             | Comma-separated ignore list.                |

## Data sources

| Variable                                                | Default        | Purpose                          |
| ------------------------------------------------------- | -------------- | -------------------------------- |
| `DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER`                   | H2 file driver | JDBC driver class.               |
| `DIRIGIBLE_DATASOURCE_DEFAULT_URL`                      | local H2       | JDBC URL.                        |
| `DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME`                 |                | JDBC user.                       |
| `DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD`                 |                | JDBC password.                   |
| `DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT`            | `DefaultDB`    | Default data source name.        |
| `DIRIGIBLE_DATABASE_DATASOURCE_NAME_SYSTEM`             | `SystemDB`     | System data source name.         |
| `DIRIGIBLE_LEAKED_CONNECTIONS_CHECK_INTERVAL_SECONDS`   |                | JDBC leak-check cadence.         |
| `DIRIGIBLE_LEAKED_CONNECTIONS_CHECK_MAX_IN_USE_SECONDS` |                | Threshold before logging a leak. |

## Multi-tenancy

| Variable                                           | Default          | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DIRIGIBLE_MULTI_TENANT_MODE`                      | `true`           | Multi-tenant switch.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `DIRIGIBLE_TENANT_RESOLUTION_STRATEGY`             | `SUBDOMAIN`      | How a request's tenant is determined. `SUBDOMAIN` matches the host header against `DIRIGIBLE_TENANT_SUBDOMAIN_REGEX`, so each tenant needs a host of its own. `TOKEN_GROUPS` serves every tenant from one host and takes the tenant the signed-in user selected, out of those their identity provider groups grant.                                                                                                           |
| `DIRIGIBLE_TENANT_SUBDOMAIN_REGEX`                 |                  | Host pattern the tenant subdomain is captured from, under the `SUBDOMAIN` strategy. Unused by `TOKEN_GROUPS`.                                                                                                                                                                                                                                                                                                                 |
| `DIRIGIBLE_APP_ID`                                 |                  | This deployment's application id, the middle part of the group names `<tenantId>.<appId>.<role>`. Groups naming another application are ignored, so one identity provider can serve several applications. Required under `TOKEN_GROUPS`, and it must not contain a dot.                                                                                                                                                       |
| `DIRIGIBLE_TENANT_GROUPS_CLAIM`                    | `cognito:groups` | The token claim the user's groups are read from. Set it explicitly on Keycloak - a claim that carries no groups is not an error, the user simply appears to have no tenants.                                                                                                                                                                                                                                                  |
| `DIRIGIBLE_TENANTS_PROVISIONING_FREQUENCY_SECONDS` | `900`            | Provisioning poll cadence, in seconds.                                                                                                                                                                                                                                                                                                                                                                                        |
| `DIRIGIBLE_TENANT_PROVISIONING_API_ENABLED`        | `false`          | Exposes the [tenant provisioning API](/help/setup/tenant-provisioning-api) under `/services/tenant-provisioning/`, through which an external service registers a tenant, registers its data source from credentials it created itself, and activates it. Off by default and off means absent: no endpoint answers and none of its beans exist. The API accepts database credentials over HTTP, so a deployment has to opt in. |

See [Tenant resolution](/help/setup/multi-tenancy#tenant-resolution) and [Tenant provisioning API](/help/setup/tenant-provisioning-api).

## Synchronizers

| Variable                                             | Purpose                                           |
| ---------------------------------------------------- | ------------------------------------------------- |
| `DIRIGIBLE_SYNCHRONIZER_FREQUENCY`                   | Reconciliation cadence (seconds).                 |
| `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_COUNT`           | Retry budget for cross-synchronizer dependencies. |
| `DIRIGIBLE_SYNCHRONIZER_CROSS_RETRY_INTERVAL_MILLIS` | Retry interval.                                   |

## Dynamic dependencies

| Variable                                         | Default                                     | Purpose                                                                                          |
| ------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `DIRIGIBLE_DEPENDENCIES_DYNAMIC`                 | `true`                                      | Runtime resolution of `project.json` maven declarations. Disable on immutable production images. |
| `DIRIGIBLE_DEPENDENCIES_FROZEN`                  | `false`                                     | Activate the lockfile's set only - checksum-verified, no re-mediation, network never consulted.  |
| `DIRIGIBLE_DEPENDENCIES_DIR`                     | `~/.dirigible/resolved-modules`             | Directory the resolved jars are linked into (the launch-classpath seed).                         |
| `DIRIGIBLE_DEPENDENCIES_LOCKFILE`                | `project-lock.json` in the dependencies dir | Lockfile location.                                                                               |
| `DIRIGIBLE_MAVEN_REPOSITORIES`                   | Maven Central                               | Comma-separated `id=url` pairs; an entry with id `central` overrides the default Central URL.    |
| `DIRIGIBLE_MAVEN_[ID]_USERNAME` / `..._PASSWORD` |                                             | Credentials per repository id (uppercased, non-alphanumerics become `_`).                        |
| `DIRIGIBLE_MAVEN_LOCAL_REPO`                     | `~/.m2/repository` when present             | Local Maven repository the artifacts resolve into.                                               |
| `DIRIGIBLE_MAVEN_OFFLINE`                        | `false`                                     | Resolve from the local repository only.                                                          |

See [Maven dependencies](/help/develop/maven-dependencies) and [How dependency versions are decided](/help/concepts/dependency-resolution).

## Debuggers and language tooling

| Variable                                     | Default            | Purpose                          |
| -------------------------------------------- | ------------------ | -------------------------------- |
| `DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT` | `8081`             | Graalium JS debugger port.       |
| `DIRIGIBLE_GRAALIUM_ENABLE_DEBUG`            | `true` (in Docker) | Toggle JS debug.                 |
| `DIRIGIBLE_JAVA_DEBUG_JDWP_PORT`             | `8000`             | JDWP for the Java debugger view. |
| `DIRIGIBLE_JAVA_LSP_ENABLED`                 |                    | Toggle JDT.LS.                   |
| `DIRIGIBLE_JAVA_LSP_INSTALL_DIR`             |                    | JDT.LS install directory.        |

## Mail

| Variable                                                 | Purpose            |
| -------------------------------------------------------- | ------------------ |
| `DIRIGIBLE_MAIL_USERNAME`                                | SMTP username.     |
| `DIRIGIBLE_MAIL_PASSWORD`                                | SMTP password.     |
| `DIRIGIBLE_MAIL_TRANSPORT_PROTOCOL`                      | `smtp` or `smtps`. |
| `DIRIGIBLE_MAIL_SMTPS_HOST` / `DIRIGIBLE_MAIL_SMTP_HOST` | SMTP host.         |
| `DIRIGIBLE_MAIL_SMTPS_PORT` / `DIRIGIBLE_MAIL_SMTP_PORT` | SMTP port.         |
| `DIRIGIBLE_MAIL_SMTPS_AUTH` / `DIRIGIBLE_MAIL_SMTP_AUTH` | Auth toggle.       |

## Flowable

| Variable                        | Purpose                     |
| ------------------------------- | --------------------------- |
| `DIRIGIBLE_FLOWABLE_DATABASE_*` | Flowable's own data source. |
| `DIRIGIBLE_FLOWABLE_MAIL_*`     | Flowable mail settings.     |

## Messaging

| Variable                                   | Default | Purpose                                                                                                                                                                                                                                                                         |
| ------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DIRIGIBLE_MESSAGING_BROKER_URL`           |         | Connect to an **external** ActiveMQ broker instead of the embedded one - `tcp://activemq:61616`, `ssl://b-....mq.eu-central-1.amazonaws.com:61617`, `failover:(tcp://one:61616,tcp://two:61616)`. Unset or blank starts the embedded broker and attaches over `vm://localhost`. |
| `DIRIGIBLE_MESSAGING_BROKER_USERNAME`      |         | Broker username. Unset connects anonymously.                                                                                                                                                                                                                                    |
| `DIRIGIBLE_MESSAGING_BROKER_PASSWORD`      |         | Broker password.                                                                                                                                                                                                                                                                |
| `DIRIGIBLE_MESSAGING_USE_DEFAULT_DATABASE` | `true`  | Persist the **embedded** broker's messages in the system database. Ignored (and logged as such) when a broker URL is set - an external broker owns its own persistence.                                                                                                         |

Setting a broker URL replaces the in-process broker entirely: nothing is started locally, and every
producer and consumer - `.listener` artefacts, `@Component` listeners, the messaging SDK - connects to
the configured broker. Two consequences to plan for:

- **The Messaging perspective goes dark.** It reads the in-process broker object, so its endpoints are
  not registered against an external broker and return `404`. Administer that broker from its own
  console.
- **An unreachable broker fails startup**, deliberately, rather than leaving messaging silently
  inoperative.

See [Message listeners](/help/develop/message-listeners#broker-embedded-or-external).

## CMS / S3 / SharePoint

| Variable                             | Purpose                     |
| ------------------------------------ | --------------------------- |
| `DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER` | Internal CMIS root.         |
| `DIRIGIBLE_S3_PROVIDER`              | `aws` or `localstack`.      |
| `DIRIGIBLE_MS_SHAREPOINT_*`          | SharePoint CMS credentials. |

## Authentication providers

| Variable                                                   | Purpose                          |
| ---------------------------------------------------------- | -------------------------------- |
| `DIRIGIBLE_GITHUB_CLIENT_ID` / `_CLIENT_SECRET` / `_SCOPE` | GitHub OAuth (`github` profile). |
| `DIRIGIBLE_KEYCLOAK_*`                                     | Keycloak.                        |
| `DIRIGIBLE_COGNITO_*`                                      | AWS Cognito.                     |
| `DIRIGIBLE_SNOWFLAKE_*`                                    | Snowflake OAuth.                 |

## Encryption

| Variable                          | Purpose                    |
| --------------------------------- | -------------------------- |
| `DIRIGIBLE_ENCRYPTION_KEY`        | Base64 master key.         |
| `DIRIGIBLE_ENCRYPTION_KEYSTORE_*` | Java keystore alternative. |

## Misc

| Variable                                 | Purpose                                                                      |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| `DIRIGIBLE_EXEC_COMMAND_LOGGING_ENABLED` | Audit shell-exec calls.                                                      |
| `DIRIGIBLE_TRIAL_ENABLED`                | Trial-mode flag.                                                             |
| `SPRING_PROFILES_ACTIVE`                 | Spring profile selector (`github`, `keycloak`, `cognito`, `snowflake`, ...). |

The platform reads variables only through `DirigibleConfig` / `Configuration`. New tunables are added to those classes - don't introduce ad-hoc `System.getProperty` reads.

## See also

- [Setup environment variables](/help/setup/environment-variables)
- [Setup overview](/help/setup/)
