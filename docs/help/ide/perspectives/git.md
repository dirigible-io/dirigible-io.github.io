---
title: Git
description: Browser-side Git client - clone, pull, push, branch, diff, log.
---

# Git

`perspective-git` exposes the most common Git operations against repositories living in the active workspace. Backed by the `ide-git` REST endpoint (`GitEndpoint`).

## Layout

- **Git Projects** - cloned repositories in the selected workspace; the workspace dropdown switches between workspaces.
- **Local branches** - list, create, checkout, delete.
- **Remote branches** - list, fetch, track.
- **History** - commit log for the selected branch.
- **Staging** - staged / unstaged file lists with diff preview.

## Workflow

```
Clone -> edit in Workbench -> Stage -> Commit -> Push
```

1. **Clone** - paste a URL, pick a target workspace. The repository is cloned into `/users/<user>/workspace/<workspace>/<repo>/`.
2. **Edit** - switch to the [Workbench](/help/ide/perspectives/workbench) and edit the cloned project like any workspace project.
3. **Stage / Commit** - back in the Git perspective, select files in the Staging view, write a message, commit.
4. **Push** - push the current branch to the tracked remote.

Repositories are addressed by `(workspace, repository name)`; the same repo cloned into two workspaces is two independent working trees.

## Merge conflicts on push

If a push fails because the remote moved ahead, a branch with your local changes is created on the remote. Resolve the merge in your tool of choice and continue.

## Programmatic access

The same operations are available from user code:

- JavaScript / TypeScript: [`@aerokit/sdk/git/client`](/api/git/client)
- Java: [`/sdk/git/client`](/sdk/git/client)

## Related

- [Workbench perspective](/help/ide/perspectives/workbench)
- [`ide-git` backend](/help/ide/)
