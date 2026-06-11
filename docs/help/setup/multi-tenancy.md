---
title: Multi-tenancy setup
description: Configure subdomain-based tenant routing and provisioning.
---

# Multi-tenancy

Multi-tenancy is on by default (`DIRIGIBLE_MULTI_TENANT_MODE=true`). Each tenant gets its own data source, CMS root, scheduled jobs, listeners, and OData services. See [`/help/concepts/multi-tenancy`](/help/concepts/multi-tenancy) for what is and isn't isolated.

## Tenant resolution

The platform resolves the active tenant from the request's host header against a configured subdomain regex:

```bash
DIRIGIBLE_MULTI_TENANT_MODE=true
DIRIGIBLE_TENANT_SUBDOMAIN_REGEX='(.+)\\.dirigible\\.example\\.com'
```

A request to `acme.dirigible.example.com` activates the `acme` tenant context for the duration of the request. The capture group is the tenant id; configure DNS to point every `*.dirigible.example.com` at the platform.

## Single-tenant mode

For local development or single-org deployments, disable resolution:

```bash
DIRIGIBLE_MULTI_TENANT_MODE=false
```

In single-tenant mode every artefact resolves against the default tenant and the subdomain regex is ignored.

## Provisioning cadence

The platform polls for new tenants at a configurable cadence:

```bash
DIRIGIBLE_TENANTS_PROVISIONING_FREQUENCY_SECONDS=30
```

Tenant lifecycle (NEW -> PROVISIONING -> READY) is driven by `TenantProvisioningStep` / `TenantPostProvisioningStep` SPI implementations. See [`/help/operate/tenants`](/help/operate/tenants).

## Authentication providers and tenants

Keycloak, Cognito, and Snowflake auth providers support multi-realm setups - configure separate realms / pools per tenant. See [`/help/setup/authentication/`](/help/setup/authentication/).

## Per-tenant resources

| Resource | Tenant-isolated? |
| -------- | ---------------- |
| Data sources | yes (each tenant gets its own resolved pool) |
| CMS root | yes |
| Scheduled jobs / listeners | yes |
| OData services | yes |
| BPMN process instances | no - system-level |
| Camel routes | no |
| Extensions | no |
| Git workspaces | no |

## See also

- [Multi-tenancy (concepts)](/help/concepts/multi-tenancy)
- [Tenant management (operate)](/help/operate/tenants)
