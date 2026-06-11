---
title: Custom CMS provider
description: Back the Documents perspective with a new content store.
---

# Custom CMS provider

The CMS surface ships three providers out of the box - Internal (local folders), S3, SharePoint. Add a fourth by implementing the `CmsProvider` SPI under `components/engine/engine-cms-<name>/`.

## Interfaces

| Interface | Role |
| --------- | ---- |
| `CmsProvider` | The provider itself - returns a `Session` for the configured backing store. |
| `CmsProviderFactory` | Factory selecting the active provider based on configuration. |
| `CmisSession`, `CmisObject`, `CmisFolder`, `CmisDocument`, `CmisContentStream`, `CmisConstants` | The CMIS-style object model exposed to user code. |

## Module layout

```
components/engine/engine-cms-<name>/
  pom.xml
  src/main/java/.../<name>/
    <Name>CmsProvider.java
    <Name>CmsSession.java
    config/<Name>Config.java
```

## Implementing the provider

```java
@Component
public class FooCmsProvider implements CmsProvider {

    @Override
    public String getName() { return "foo"; }

    @Override
    public CmisSession getSession() {
        return new FooCmsSession(/* config */);
    }
}
```

`CmisSession` returns folders and documents shaped like the Apache Chemistry types - the existing CMS facade (`@aerokit/sdk/cms/cmis`) speaks to them through the platform's CMIS object model, so user code doesn't change when a new backend is added.

## Activation

The provider is selected via configuration (typically a `DIRIGIBLE_CMS_PROVIDER` env var picked up by `CmsProviderFactory`). For backwards compatibility the Internal provider is the default when nothing is set.

## Group registration

Add the module to `components/group/group-engines/pom.xml`.

## Tenant isolation

If your backend stores content for multiple tenants, scope each tenant's root by a tenant-id prefix - this is how the Internal provider lays out content under `DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER/<tenant-id>/...`.

## See also

- [Documents perspective](/help/ide/perspectives/documents)
- [`@aerokit/sdk/cms/cmis`](/api/cms/cmis)
- [Multi-tenancy](/help/concepts/multi-tenancy)
