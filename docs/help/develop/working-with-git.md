---
title: Working with Git
description: Clone, pull, push, branch, diff workspace-resident repositories from user code or the Git perspective.
---

# Working with Git

Dirigible's IDE Git perspective and the `git` SDK module both wrap [JGit](https://www.eclipse.org/jgit/) against repositories registered under a workspace. Repositories are addressed by `(workspaceName, repositoryName)` - URI and credentials appear only on clone, pull, and push.

## From the IDE

The [Git perspective](/help/ide/perspectives/git) provides the everyday flow: clone, commit, push, pull, branch, diff, log. Use it for interactive work.

## From user code

```ts
import { Git } from "@aerokit/sdk/git";

Git.cloneRepository("myws", "https://github.com/acme/svc.git", "user", "token", "main");
Git.commit("alice", "alice@acme.com", "myws", "svc", "tighten validation", true);
Git.push("myws", "svc", "user", "token");
```

```java
import org.eclipse.dirigible.sdk.git.Git;

Git.cloneRepository("myws", "https://github.com/acme/svc.git", "user", "token", "main");
Git.commit("alice", "alice@acme.com", "myws", "svc", "tighten validation", true);
Git.push("myws", "svc", "user", "token");
```

Reading commit history:

```java
import org.eclipse.dirigible.components.ide.git.domain.GitCommitInfo;
import java.util.List;

List<GitCommitInfo> history = Git.getHistory("svc", "myws", "src/Main.java");
```

## File content at a specific revision

```java
String content = Git.getFileContent("myws", "svc", "src/Main.java", "HEAD~3");
```

## Reaching the JGit API directly

For operations not covered by the facade - rebase strategies, cherry-picks, advanced merge configs - drop down to `org.eclipse.jgit.api.Git` against the on-disk repository path. Resolve the path through `IRepository` or the workspace API.

## See also

- [`@aerokit/sdk/git/client`](/api/git/client)
- [`org.eclipse.dirigible.sdk.git.Git`](/sdk/git/client)
- [Git perspective](/help/ide/perspectives/git)
