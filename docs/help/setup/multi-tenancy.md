---
title: Multi-tenancy setup
description: Configure how a request's tenant is resolved, and how tenants are provisioned.
---

# Multi-tenancy

Multi-tenancy is on by default (`DIRIGIBLE_MULTI_TENANT_MODE=true`). Each tenant gets its own data source, CMS root, scheduled jobs, listeners, and OData services. See [`/help/concepts/multi-tenancy`](/help/concepts/multi-tenancy) for what is and isn't isolated.

## Tenant resolution

There are two ways to determine which tenant a request belongs to, selected with `DIRIGIBLE_TENANT_RESOLUTION_STRATEGY`:

| Strategy | The tenant comes from | Hosts |
| -------- | --------------------- | ----- |
| `SUBDOMAIN` (default) | the request's host header | one per tenant |
| `TOKEN_GROUPS` | the tenant the signed-in user selected, out of the tenants their identity provider groups grant | one for all tenants |

### One host per tenant (SUBDOMAIN)

The default. The platform matches the request's host header against a configured subdomain regex:

```bash
DIRIGIBLE_MULTI_TENANT_MODE=true
DIRIGIBLE_TENANT_RESOLUTION_STRATEGY=SUBDOMAIN
DIRIGIBLE_TENANT_SUBDOMAIN_REGEX='(.+)\\.dirigible\\.example\\.com'
```

A request to `acme.dirigible.example.com` activates the `acme` tenant context for the duration of the request. The capture group is the tenant id; configure DNS to point every `*.dirigible.example.com` at the platform. A host naming no registered tenant is answered with a 404.

### One host for all tenants (TOKEN_GROUPS)

Every tenant is served from the same host, and the tenant of a request is the one the signed-in user picked. Which tenants a user may pick is carried by their identity provider groups, so the identity provider stays the single place where access is granted.

```bash
DIRIGIBLE_MULTI_TENANT_MODE=true
DIRIGIBLE_TENANT_RESOLUTION_STRATEGY=TOKEN_GROUPS
DIRIGIBLE_APP_ID=library
DIRIGIBLE_TENANT_GROUPS_CLAIM=groups
```

Groups are named `<tenantId>.<appId>.<role>`, for example `acme.library.Owner`, which grants the role `Owner` in tenant `acme`. `DIRIGIBLE_APP_ID` is this deployment's application id: groups naming a different application are ignored, so one identity provider can serve several applications from one set of users. `DIRIGIBLE_TENANT_GROUPS_CLAIM` names the token claim the groups are read from (`cognito:groups` by default, which is where AWS Cognito puts them).

A group with **no** dots in it, such as `ADMINISTRATOR`, is not tied to a tenant and grants a platform-wide role instead. Tenant ids and application ids must not contain a dot; a role name may (`acme.library.Tenant.Owner` grants `Tenant.Owner`).

The host header is never consulted in this mode, so no wildcard DNS or per-tenant certificate is needed. `DIRIGIBLE_TENANT_SUBDOMAIN_REGEX` is unused, though each tenant still needs a unique subdomain value in its registration.

This strategy requires multi-tenancy to be on (`DIRIGIBLE_MULTI_TENANT_MODE=true`, the default), an application id without a dot, and the legacy per-tenant identity models turned off (`DIRIGIBLE_MULTI_TENANT_MODE_COGNITO_SINGLE_USER_POOL=false` and `DIRIGIBLE_MULTI_TENANT_MODE_KEYCLOAK_SINGLE_REALM=false`, both the default).

::: warning Platform roles have to be groups
In this mode a session's roles come from the user's groups, so a platform role such as `ADMINISTRATOR`, `DEVELOPER` or `OPERATOR` must be granted as a group of that name. Roles assigned any other way are not applied.
:::

## Selecting a tenant

Under `TOKEN_GROUPS` the tenant is chosen after sign-in:

- A user whose groups grant exactly **one** tenant enters it without being asked.
- A user with **several** is sent to the tenant picker at `/tenant-selection.html`, and lands in the application once they choose. Open the picker again with `/tenant-selection.html?switch=true` to change tenant; no new sign-in is needed, and the roles change with the tenant. Without the parameter the page sends a user who already has a tenant straight on, so it is safe to link to from an application.
- A tenant the user was granted but that this instance has **not provisioned yet** is listed on the picker and cannot be entered until provisioning finishes. See [`/help/operate/tenants`](/help/operate/tenants).
- Someone whose groups grant **no** tenant of this application cannot use it. Staff who hold only platform-wide roles are an exception: they keep working in the default tenant, which is where the IDE and the administration pages live.
- A programmatic caller that would have been sent to the picker is answered with a `409` naming the tenants to choose from, instead of being redirected.

Machine-to-machine calls, bearer-token requests and anonymous traffic carry no selection and always run in the default tenant.

## Single-tenant mode

For local development or single-org deployments, disable resolution:

```bash
DIRIGIBLE_MULTI_TENANT_MODE=false
```

In single-tenant mode every artefact resolves against the default tenant and the resolution strategy is ignored.

## Provisioning cadence

The platform polls for new tenants at a configurable cadence:

```bash
DIRIGIBLE_TENANTS_PROVISIONING_FREQUENCY_SECONDS=30
```

The default is `900` (15 minutes), so a freshly registered tenant becomes usable some minutes after it is created. Tenant lifecycle is driven by `TenantProvisioningStep` / `TenantPostProvisioningStep` SPI implementations. See [`/help/operate/tenants`](/help/operate/tenants).

## Authentication providers and tenants

Which identity provider you use is independent of how tenants are resolved. With `TOKEN_GROUPS` the provider carries the tenant assignments as groups, so one realm or user pool serves every tenant; see [Keycloak](/help/setup/authentication/keycloak) and [Cognito](/help/setup/authentication/cognito) for the claim each one emits and what a realm needs. With `SUBDOMAIN` the provider need not know about tenants at all.

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
- [Environment variables](/help/setup/environment-variables#multi-tenancy)
