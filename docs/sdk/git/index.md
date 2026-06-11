# git/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.git`
- source: [git/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/git)
:::

This module provides JGit-backed operations against repositories the Dirigible IDE knows about under a user's workspace. It covers the everyday flow - clone, pull, push, checkout, status, log, file content at a given revision - plus branch and remote management.

The main components of this module are:
- **Git**: Static facade for workspace-resident Git repositories. Repositories are addressed by `(workspaceName, repositoryName)`; credentials and URIs only appear on the clone / pull / push operations.

## Classes
