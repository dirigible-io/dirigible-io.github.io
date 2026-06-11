---
title: Snowflake authentication
description: Sign-in via Snowflake OAuth.
---

# Snowflake authentication

Sign-in via Snowflake's OAuth. Backed by `security-snowflake`. The typical use case is a deployment where Snowflake is both the data store and the identity store.

## Configure the OAuth integration in Snowflake

```sql
CREATE OR REPLACE SECURITY INTEGRATION dirigible_oauth
    TYPE = OAUTH
    ENABLED = TRUE
    OAUTH_CLIENT = CUSTOM
    OAUTH_CLIENT_TYPE = CONFIDENTIAL
    OAUTH_REDIRECT_URI = 'https://dirigible.example.com/login/oauth2/code/snowflake'
    OAUTH_ISSUE_REFRESH_TOKENS = TRUE
    OAUTH_REFRESH_TOKEN_VALIDITY = 86400;
```

Read the client id and secret:

```sql
SELECT SYSTEM$SHOW_OAUTH_CLIENT_SECRETS('DIRIGIBLE_OAUTH');
```

## Enable the profile

```bash
SPRING_PROFILES_ACTIVE=snowflake
DIRIGIBLE_SNOWFLAKE_ACCOUNT=<account>
DIRIGIBLE_SNOWFLAKE_CLIENT_ID=<client-id>
DIRIGIBLE_SNOWFLAKE_CLIENT_SECRET=<client-secret>
```

## Role mapping

Snowflake roles map onto platform roles by name. Assign the Snowflake user the platform's expected roles (`DEVELOPER`, `ADMINISTRATOR`, plus application roles from `*.roles` artefacts).

## See also

- [Snowflake database](/help/setup/databases/snowflake)
- [Authentication overview](/help/setup/authentication/)
