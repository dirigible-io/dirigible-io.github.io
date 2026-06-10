# indexing/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.indexing`
- source: [indexing/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/indexing)
:::

This module provides Lucene-backed full-text indexing and search. Documents are added to a named index via `Writer` and queried via `Searcher`. Multiple corpora can co-exist by name in the same JVM.

The main components of this module are:
- **Writer**: Adds documents to a named Lucene index.
- **Searcher**: Runs full-text queries against a named index using Lucene query syntax.

## Classes
