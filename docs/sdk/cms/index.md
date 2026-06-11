# cms/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.cms`
- source: [cms/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/cms)
:::

This module is the entry point into the platform's Content Management Service (CMS). Under the hood it speaks CMIS 1.1 against the configured backing store - the internal Dirigible repository by default, or external engines such as Amazon S3 or Microsoft SharePoint when those are wired in.

The facade hands back the raw Apache Chemistry `Session`, so callers retain access to the full CMIS surface - create / read / update / delete folders and documents, query with CMIS-SQL, manage document versions, and inspect ACLs. A small access-control helper is included so authorisation outcomes can be reported up-front without first attempting the operation.

The main components of this module are:

- [`Cmis`](./cmis.md) - entry point to the CMIS repository, returns the raw Apache Chemistry `Session` and exposes access-control helpers.

## Classes
