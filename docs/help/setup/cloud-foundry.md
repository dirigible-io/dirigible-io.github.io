---
title: Cloud Foundry
description: Deploy Dirigible to a Cloud Foundry foundation.
---

# Cloud Foundry

Dirigible runs on Cloud Foundry as a standard Java buildpack application. Push the fat jar with a manifest pinning the buildpack and any bound services.

## Prerequisites

- A CF foundation with the Java buildpack available.
- `cf` CLI logged in to the target org / space.
- The built fat jar (`build/application/target/dirigible-application-*-executable.jar`).

## Minimal manifest

```yaml
applications:
- name: dirigible
  memory: 2G
  buildpacks:
  - java_buildpack
  path: ./dirigible-application.jar
  env:
    DIRIGIBLE_BASIC_USERNAME: admin
    DIRIGIBLE_BASIC_PASSWORD: ((dirigible-admin-password))
    JBP_CONFIG_OPEN_JDK_JRE: '{ jre: { version: 21.+ } }'
```

```bash
cf push -f manifest.yml
```

## Binding a database service

Bind a PostgreSQL or HANA service instance, then expose the credentials through the standard `DIRIGIBLE_DATASOURCE_DEFAULT_*` variables. CF's service-binding metadata is available through `VCAP_SERVICES`; map the relevant keys in the manifest's `env` block.

```yaml
  services:
  - postgres-instance
  env:
    DIRIGIBLE_DATASOURCE_DEFAULT_DRIVER: org.postgresql.Driver
    DIRIGIBLE_DATASOURCE_DEFAULT_URL: ((vcap-postgres-url))
    DIRIGIBLE_DATASOURCE_DEFAULT_USERNAME: ((vcap-postgres-user))
    DIRIGIBLE_DATASOURCE_DEFAULT_PASSWORD: ((vcap-postgres-pass))
```

A small CF buildpack-friendly entry script can extract `VCAP_SERVICES.postgres[0].credentials` and export the variables before launching the jar - keep it simple.

## SSO

For platform SSO (Cloud Foundry UAA / SAP IAS / etc.) use the OAuth client registration flow - see [`/help/setup/authentication/`](/help/setup/authentication/) and [`/help/artefacts/security/client-registration`](/help/artefacts/security/client-registration).

## See also

- [Docker](/help/setup/docker)
- [Standalone JAR](/help/setup/tomcat)
- [Kubernetes](/help/setup/kubernetes/)
