---
title: Tenant provisioning API
description: Provision tenants into a running application from an external service.
---

# Tenant provisioning API

Off by default. An opt-in REST API through which an **external** provisioner registers a tenant,
hands the platform a database user and schema it created itself, activates the tenant and polls its
initialization.

The built-in flow provisions a tenant the other way round: you register it, and the platform creates
its database user and schema for you (see [`/help/operate/tenants`](/help/operate/tenants)). That
suits a deployment that owns its own tenants. It does not suit a landscape where one provisioning
service owns tenants across several applications, decides their ids, and creates their database
objects with its own credentials. This API is for the second case, and the two never touch the same
tenant.

```bash
DIRIGIBLE_TENANT_PROVISIONING_API_ENABLED=true
```

## The state a tenant sits in

`PENDING_ACTIVATION` is the window between a tenant being registered and being activated. The
platform leaves such a tenant alone: it neither provisions it, since it only provisions `INITIAL`
tenants, nor serves it, since synchronizers, jobs and listeners only run for `PROVISIONED` ones.

That is what lets an external provisioner own a tenant end to end without racing the platform.
`DELETE /services/security/tenants/{id}` accepts the state too, which is the rollback path when
provisioning is abandoned before activation. Deleting a `PROVISIONED` tenant is still refused.

## The sequence

Register the tenant, register its data source, activate, poll.

```bash
BASE=https://app.example.com/services/tenant-provisioning/tenants

# 1. register - the id is yours to choose
curl -X PUT "$BASE/acme" -H 'Content-Type: application/json' \
     -d '{"name":"Acme Ltd"}'

# 2. register the data source, from credentials you created
curl -X PUT "$BASE/acme/datasources/default" -H 'Content-Type: application/json' \
     -d '{"username":"u_acme","password":"<secret>","schema":"ACME"}'

# 3. activate, then poll
curl -X POST "$BASE/acme/activation"
curl "$BASE/acme/activation"
```

**Every call is idempotent**, because the caller is a retrying process: a step that timed out may
have completed, and re-running the whole sequence has to converge rather than collide.

## Endpoints

Every endpoint below requires one of the roles `TENANT_PROVISIONER`, `ADMINISTRATOR` or `OPERATOR`.

### Register a tenant

```
PUT /services/tenant-provisioning/tenants/{tenantId}
{ "name": "Acme Ltd", "subdomain": "acme" }
```

`subdomain` is optional and defaults to the tenant id.

| Status | Meaning |
| ------ | ------- |
| `201` | created, in `PENDING_ACTIVATION` |
| `200` | already registered; the call updated `name` (and `subdomain`, when supplied) and left the status alone |
| `400` | the id or the subdomain is not a DNS label, or the body has no name |
| `409` | the subdomain belongs to a different tenant |

Both the id and the subdomain must be **DNS labels**: letters, digits and inner hyphens, at most 63
characters, **no dots**. The id is also the prefix of the tenant's data source name and, under the
`TOKEN_GROUPS` strategy, the first segment of the identity provider group
`<tenantId>.<appId>.<role>`, which a dot would make unparseable. The subdomain is matched out of a
request's host name, so anything else could never resolve.

Display names need not be unique. Two customers may both be called `Acme Ltd`.

### Read a tenant

```
GET /services/tenant-provisioning/tenants/{tenantId}
```

```json
{
  "id": "acme",
  "name": "Acme Ltd",
  "subdomain": "acme",
  "status": "PENDING_ACTIVATION",
  "initialization": { "status": "NOT_STARTED", "error": null }
}
```

`404` if there is no such tenant.

### Register the tenant's data source

```
PUT /services/tenant-provisioning/tenants/{tenantId}/datasources/default
{ "username": "u_acme", "password": "<secret>", "schema": "ACME" }
```

**Credentials only.** The URL, the driver and the connection properties come from the application's
own default data source, so the tenant lives in the same database as the application. Its data source
is registered as `<tenantId>_DefaultDB`.

| Status | Meaning |
| ------ | ------- |
| `201` / `200` | registered / updated |
| `400` | a required field is missing |
| `404` | there is no such tenant |
| `502` | the credentials do not work; the body carries the database's own message, and nothing is stored |

Re-registering replaces the previous registration and rebuilds the tenant's connections, so a
rotated password takes effect at once rather than at the next restart. The credentials are tried
before they are stored, so a wrong password is refused and nothing is registered.

### Activate and poll

```
POST /services/tenant-provisioning/tenants/{tenantId}/activation
GET  /services/tenant-provisioning/tenants/{tenantId}/activation
```

`POST` activates the tenant and answers **`202`** with a `Location` header pointing at the `GET`.
It answers before the work is done, because creating a tenant's tables, jobs and listeners takes tens
of seconds to minutes - too long for one request. Poll the `GET` until it settles.

| Status | Meaning |
| ------ | ------- |
| `202` | accepted; the tenant is active and its initialization has started |
| `400` | the tenant's data source is not registered yet |
| `404` | there is no such tenant |

Re-posting is safe: on an already-active tenant it re-runs the initialization, which is how a failed
one is retried.

`GET` answers `{ "status": ..., "error": ... }`:

| Status | Returned when |
| ------ | ------------- |
| `NOT_STARTED` | the tenant was registered, perhaps with a data source, but never activated |
| `IN_PROGRESS` | the tenant is active and its artefacts are still being created |
| `COMPLETED` | everything was created |
| `FAILED` | something could not be created; `error` says what |

The status is worked out from what the platform has actually recorded, so every instance of a
cluster gives the same answer and a restart does not lose it.

Two things follow. Tenants activated at about the same time share one initialization, so each reads
`IN_PROGRESS` until all of them are done, and a failure is reported for all of them. And a deployment
with no tenant-specific artefacts has nothing to create, so it answers `COMPLETED` straight away.

## Errors

A refusal answers with the reason in the body, which is what a calling process branches on:

```json
{ "status": 502, "error": "Bad Gateway",
  "message": "Could not connect to the database of data source [acme_DefaultDB] with the supplied credentials: FATAL: password authentication failed for user \"u_acme\"" }
```

## Authorizing the caller

The caller is a machine, so it presents an OAuth client-credentials token. The token's scope becomes
the role that opens this API.

A scope value has to be qualified with a `/`, and the part after the last one is the name that
counts. A resource server `codbex-apps` with a scope `TENANT_PROVISIONER` gives the token value
`codbex-apps/TENANT_PROVISIONER`, which grants the role `TENANT_PROVISIONER`:

```
scope codbex-apps/TENANT_PROVISIONER  ->  role TENANT_PROVISIONER
```

A scope value with no `/` grants nothing, so a bare `TENANT_PROVISIONER` will not work.

That is all this API needs. To have one scope grant several roles instead, declare a `.scopes`
artefact:

```json
[
  {
    "scope": "provisioning",
    "roles": ["TENANT_PROVISIONER", "OPERATOR"],
    "description": "The provisioning service"
  }
]
```

`TENANT_PROVISIONER` is not one of the platform's built-in roles, so a deployment using basic
authentication has to create it as a role of its own.

## See also

- [Tenant management](/help/operate/tenants)
- [Multi-tenancy (setup)](/help/setup/multi-tenancy)
- [Multi-tenancy (concepts)](/help/concepts/multi-tenancy)
- [Environment variables](/help/setup/environment-variables#multi-tenancy)
