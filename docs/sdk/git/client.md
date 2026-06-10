# Git

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.git`
- source: [git/Git.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/git/Git.java)
:::

JGit-backed operations against repositories the IDE knows about under a user's workspace. Covers the everyday flow — clone, pull, push, checkout, status, log, file content at a given revision — plus branch and remote management.

Repositories are addressed by `(workspaceName, repositoryName)`; the URI and credentials only appear on the clone and pull / push operations. Every method that touches the repository propagates the underlying JGit / connector checked exceptions verbatim — handle them at the controller / job boundary the way you would with `GitFacade` directly.

For ad-hoc Git work that does not need to live in a workspace (CI scripts, throwaway tooling), the bare JGit API (`org.eclipse.jgit.api.Git`) is a more appropriate fit.

### Key Features:
- **Workspace-resident** — repositories are addressed by name, not by filesystem path.
- **Full JGit surface** — clone, pull, push, checkout, rebase, hard-reset, status, history.
- **Native return types** — `GitBranch`, `GitChangedFile`, `GitCommitInfo`, `Status` etc.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.git.Git;
import org.eclipse.dirigible.components.ide.git.domain.GitCommitInfo;
import java.util.List;

Git.cloneRepository("myws", "https://github.com/acme/svc.git", "user", "token", "main");

Git.commit("alice", "alice@acme.com", "myws", "svc", "tighten validation", true);
Git.push("myws", "svc", "user", "token");

List<GitCommitInfo> history = Git.getHistory("svc", "myws", "src/Main.java");
```

## Methods

### initRepository()

Initializes a new repository under the given workspace and creates an initial commit.

> ```java
> public static void initRepository(String username, String email, String workspaceName,
>     String projectName, String repositoryName, String commitMessage)
>     throws IOException, GitAPIException, GitConnectorException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `username` | `String` | Author user name. |
> | `email` | `String` | Author email. |
> | `workspaceName` | `String` | Owning workspace. |
> | `projectName` | `String` | Project to seed the repository from. |
> | `repositoryName` | `String` | New repository name. |
> | `commitMessage` | `String` | Initial commit message. |

### commit()

Creates a commit on the workspace's current branch.

> ```java
> public static void commit(String username, String email, String workspaceName,
>     String repositoryName, String commitMessage, Boolean add)
>     throws GitAPIException, IOException, GitConnectorException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `username` | `String` | Author user name. |
> | `email` | `String` | Author email. |
> | `workspaceName` | `String` | The workspace. |
> | `repositoryName` | `String` | The repository. |
> | `commitMessage` | `String` | Commit message. |
> | `add` | `Boolean` | If `true`, stage all changes before committing. |

### getRepositories()

Lists all Git repositories under a workspace.

> ```java
> public static List<ProjectDescriptor> getRepositories(String workspaceName);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `String` | The workspace. |
>
> ::: info Returns
> - **Type**: `List<ProjectDescriptor>`
> - **Description**: Descriptors for every Git repository in the workspace.
> :::

### getHistory()

Returns the commit history of a path within a repository.

> ```java
> public static List<GitCommitInfo> getHistory(String repositoryName, String workspaceName, String path)
>     throws GitConnectorException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `repositoryName` | `String` | The repository. |
> | `workspaceName` | `String` | The workspace. |
> | `path` | `String` | Path within the repository (or empty for the root). |
>
> ::: info Returns
> - **Type**: `List<GitCommitInfo>`
> - **Description**: Commits in reverse chronological order.
> :::

### deleteRepository()

Removes a repository from the workspace.

> ```java
> public static void deleteRepository(String workspaceName, String repositoryName)
>     throws GitConnectorException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `String` | The workspace. |
> | `repositoryName` | `String` | The repository. |

### cloneRepository()

Clones a remote repository into the workspace.

> ```java
> public static IGitConnector cloneRepository(String workspaceName, String repositoryUri,
>     String username, String password, String branch)
>     throws IOException, GitAPIException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `String` | The destination workspace. |
> | `repositoryUri` | `String` | Remote URL. |
> | `username` | `String` | Credentials user. |
> | `password` | `String` | Credentials secret (token, app password). |
> | `branch` | `String` | Branch to check out after clone. |
>
> ::: info Returns
> - **Type**: `IGitConnector`
> - **Description**: Live connector to the cloned repository.
> :::

### pull()

Pulls from the configured remote.

> ```java
> public static void pull(String workspaceName, String repositoryName, String username, String password)
>     throws GitAPIException, IOException, GitConnectorException;
> ```

### push()

Pushes the current branch to the configured remote.

> ```java
> public static void push(String workspaceName, String repositoryName, String username, String password)
>     throws GitAPIException, IOException, GitConnectorException;
> ```

### checkout()

Switches to the named branch.

> ```java
> public static void checkout(String workspaceName, String repositoryName, String branchName)
>     throws GitAPIException, IOException, GitConnectorException;
> ```

### hardReset()

Discards working-tree and index changes, resetting `HEAD` hard.

> ```java
> public static void hardReset(String workspaceName, String repositoryName)
>     throws GitAPIException, IOException, GitConnectorException;
> ```

### rebase()

Rebases the current branch onto the named branch.

> ```java
> public static void rebase(String workspaceName, String repositoryName, String branchName)
>     throws GitAPIException, IOException, GitConnectorException;
> ```

### status()

Returns JGit's `Status` for the repository.

> ```java
> public static Status status(String workspaceName, String repositoryName)
>     throws GitAPIException, IOException, GitConnectorException;
> ```
>
> ::: info Returns
> - **Type**: `org.eclipse.jgit.api.Status`
> - **Description**: JGit status object — `added()`, `modified()`, `removed()`, etc.
> :::

### getBranch()

Returns the current branch name.

> ```java
> public static String getBranch(String workspaceName, String repositoryName)
>     throws GitAPIException, IOException, GitConnectorException;
> ```

### getLocalBranches() / getRemoteBranches()

List local or remote branches.

> ```java
> public static List<GitBranch> getLocalBranches(String workspaceName, String repositoryName);
> public static List<GitBranch> getRemoteBranches(String workspaceName, String repositoryName);
> ```

### getUnstagedChanges() / getStagedChanges()

Inspect the working-tree / index state.

> ```java
> public static List<GitChangedFile> getUnstagedChanges(String workspaceName, String repositoryName);
> public static List<GitChangedFile> getStagedChanges(String workspaceName, String repositoryName);
> ```

### getFileContent()

Reads file content at a specific revision.

> ```java
> public static String getFileContent(String workspaceName, String repositoryName, String filePath, String revStr)
>     throws GitAPIException, IOException, GitConnectorException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `String` | The workspace. |
> | `repositoryName` | `String` | The repository. |
> | `filePath` | `String` | Path within the repository. |
> | `revStr` | `String` | Revision (commit hash, branch, tag, or `HEAD`). |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: File contents at the given revision.
> :::
