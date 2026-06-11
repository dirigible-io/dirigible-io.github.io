---
title: Multi-tenancy
description: Multi-tenancy is on by default. Tenants are resolved by subdomain. Some artefact types are tenant-isolated; some are system-level.
---

# Multi-tenancy

Dirigible runs in **multi-tenant mode by default** (`DIRIGIBLE_MULTI_TENANT_MODE=true`). A single platform instance serves multiple tenants from the same JVM, with per-tenant isolation for the artefact types that own user data.

## Tenant resolution

Tenants are resolved from the HTTP request's host header, matched against `DIRIGIBLE_TENANT_SUBDOMAIN_REGEX`. The first capture group is the tenant subdomain. For example, with a regex like `^([a-z0-9-]+)\.example\.com$`, requests to `acme.example.com` resolve to tenant `acme`.

The current tenant is exposed through `TenantContext` (`components/core/core-base/.../tenant/`). User code reaches it via [`@aerokit/sdk/security`](/api/security) (JS / TS) or by injecting `TenantContext` into a Java service.

Authentication backends (Keycloak, Cognito) have single-realm options if you want one realm per tenant or a shared realm.

## What is tenant-isolated

These artefact types reconcile **per tenant**, via `MultitenantBaseSynchronizer`:

- **Data sources** (`.datasource`) - each tenant gets its own JDBC pool registration.
- **CSV import / export** (`.csvim`, `.csv`) - tenant-scoped data loads.
- **OData services** (`.odata`) - per-tenant CXF surface.
- **Documents** (CMS storage) - the internal CMIS root, S3 prefix, and SharePoint site are tenant-keyed.
- **Scheduled jobs** (`.job`) - each tenant's Quartz triggers fire independently.
- **Listeners** (`.listener`) - per-tenant ActiveMQ consumers.

In practice this means tenant A and tenant B can both author the same `.datasource` file in their project tree and end up with **different** runtime data sources.

## What is system-level

These artefact types are **not** tenant-isolated - they reconcile once for the whole platform:

- **BPMN process instances** (`.bpmn`) - one Flowable engine; processes are global.
- **Camel integration flows** (`.camel`) - one Camel context.
- **Declared extensions** (`.extensionpoint`, `.extension`) - shared extension registry.
- **Git perspective** - workspace-level operations.
- **Development workspaces** (`/users/<user>/workspace/...`) - user-keyed, not tenant-keyed.

When you need tenant awareness inside a system-level artefact, read `TenantContext` at runtime instead of relying on synchronizer-level isolation.

## How the runtime keeps tenants apart

- **Data sources.** `DataSourcesManager.getDefaultDataSource()` returns a tenant-resolved view of the configured pool; SQL emitted from any language hits the tenant's DB.
- **Synchronizer iteration.** `MultitenantBaseSynchronizer` walks the artefact set once per known tenant.
- **Thread context.** `ThreadContextFacade` propagates the current tenant across request handlers, scheduled jobs, and message listeners.

## Switching modes off

`DIRIGIBLE_MULTI_TENANT_MODE=false` collapses everything to a single default tenant. Useful for single-tenant deployments where the subdomain routing is irrelevant.

## Reference

- `Tenant`, `TenantContext`, `TenantResult<T>` - `components/core/core-base/.../tenant/`
- `MultitenantBaseSynchronizer` - `components/core/core-base/.../synchronizer/`
- `TenantProvisioningStep`, `TenantPostProvisioningStep` - onboarding hooks for new tenants
- `DIRIGIBLE_TENANTS_PROVISIONING_FREQUENCY_SECONDS` - tenant provisioning cadence
