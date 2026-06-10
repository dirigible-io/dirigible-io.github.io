# Cmis

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.cms`
- source: [cms/Cmis.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/cms/Cmis.java)
:::

Entry point into the platform's CMIS repository — the internal Dirigible store by default, or S3 / SharePoint when those engines are wired in. `getSession()` returns the underlying Apache Chemistry `Session` (`org.apache.chemistry.opencmis.client.api.Session`) so callers can use the full CMIS 1.1 surface — create / read / update / delete documents and folders, query with CMIS-SQL, manage document versions.

The session is typed as `Object` on the SDK signature to avoid pulling Apache Chemistry types into the SDK compile surface. Cast it to `org.apache.chemistry.opencmis.client.api.Session` at the call site.

Access-control questions can be answered ahead of time with `isAllowed(String, String)` and `getAccessDefinitions(String, String)` — useful when an authorisation outcome needs to be reported before attempting the operation.

### Key Features:
- **Raw CMIS Session**: Returns an Apache Chemistry `Session` so callers can use the full CMIS 1.1 surface.
- **Backend-agnostic**: Sits over the internal Dirigible repository, Amazon S3, or Microsoft SharePoint depending on the platform configuration.
- **Access-control helpers**: Resolve whether a path is readable / writable, or fetch the matching access definitions, before attempting the operation.
- **Method constants**: `METHOD_READ` and `METHOD_WRITE` constants for use with the access-control helpers.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.cms.Cmis;
import org.apache.chemistry.opencmis.client.api.Session;
import org.apache.chemistry.opencmis.client.api.Folder;

if (Cmis.isAllowed("/reports", Cmis.METHOD_WRITE)) {
    Session session = (Session) Cmis.getSession();
    Folder root = session.getRootFolder();
    // ... create / read / update / delete using the raw CMIS API
}
```

## Methods

### getSession()

Returns the underlying Apache Chemistry `Session` for the configured CMIS repository. Cast it to `org.apache.chemistry.opencmis.client.api.Session` at the call site to use the full CMIS 1.1 surface.

> ```java
> public static Object getSession();
> ```
>
> ::: info Returns
> - **Type**: `Object` (cast to `org.apache.chemistry.opencmis.client.api.Session`)
> - **Description**: The raw CMIS session connected to the platform's configured repository.
> :::

### getVersioningState()

Resolves a versioning-state string (for example `none`, `major`, `minor`, `checkedout`) into the matching Apache Chemistry `VersioningState` enum value.

> ```java
> public static Object getVersioningState(String state);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `state` | `String` | The versioning state name. |
>
> ::: info Returns
> - **Type**: `Object` (cast to `org.apache.chemistry.opencmis.commons.enums.VersioningState`)
> - **Description**: The matching versioning-state enum value.
> :::

### getUnifiedObjectDelete()

Returns the platform's unified object-delete constant used by CMIS delete operations.

> ```java
> public static Object getUnifiedObjectDelete();
> ```
>
> ::: info Returns
> - **Type**: `Object`
> - **Description**: The unified delete-mode value to pass to CMIS delete calls.
> :::

### isAllowed()

Checks whether the calling principal is allowed to perform the given method on the given path.

> ```java
> public static boolean isAllowed(String path, String method);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The CMIS path to check (for example `/reports/2026/Q2.pdf`). |
> | `method` | `String` | The access method — use `Cmis.METHOD_READ` or `Cmis.METHOD_WRITE`. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if the principal is allowed, `false` otherwise.
> :::

### getAccessDefinitions()

Returns the set of platform `Access` definitions that apply to the given path / method combination. Useful for reporting authorisation outcomes in detail (which role, which scope) before attempting the operation.

> ```java
> public static Set<Access> getAccessDefinitions(String path, String method) throws ServletException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `path` | `String` | The CMIS path. |
> | `method` | `String` | The access method — use `Cmis.METHOD_READ` or `Cmis.METHOD_WRITE`. |
>
> ::: info Returns
> - **Type**: `Set<Access>`
> - **Description**: The access definitions matching the given path and method.
> :::

## Constants

| Name | Type | Description |
| ------ | ------ | ------ |
| `METHOD_READ` | `String` | Method constant for read-access checks. |
| `METHOD_WRITE` | `String` | Method constant for write-access checks. |
