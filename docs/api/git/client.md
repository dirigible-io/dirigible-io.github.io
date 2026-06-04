# Client

## Overview

::: tip Module
- package: `@aerokit/sdk/git`
- source: [git/client.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/git/client.ts)
- last updated: 
:::

This module provides a `Client` class for interacting with Git repositories within the Dirigible environment. The `Client` class offers methods for initializing repositories, committing changes, managing branches, and retrieving repository information such as status and history. It abstracts the underlying Git operations through a native Java facade, providing a simplified interface for common Git tasks in the context of workspace projects.

### Key Features
- Repository initialization with an initial commit.
- Committing changes with options for staging and commit messages.
- Branch management, including creation, deletion, and renaming of local and remote branches.
- Pulling and pushing changes to remote repositories.
- Retrieving repository status, current branch, and commit history.

### Use Cases
- Managing Git repositories for projects within the Dirigible workspace.
- Automating Git operations as part of application workflows or CI/CD pipelines.
- Integrating Git functionality into custom applications or modules that require version control capabilities.

### Example Usage
```ts
import { Client } from "@aerokit/sdk/git";

// Initialize a new Git repository for a project
Client.initRepository("Alice", "alice@example.com");
```

## Classes

### Client

#### initRepository()

Initializes a new Git repository for a project, performs an initial commit, and pushes.

> ```ts
> static initRepository(user: string, email: string, workspaceName: string, projectName: string, repositoryName: string, commitMessage: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `user` | `string` | The username of the committer. |
> | `email` | `string` | The email address of the committer. |
> | `workspaceName` | `string` | The name of the workspace. |
> | `projectName` | `string` | The name of the project. |
> | `repositoryName` | `string` | The name of the repository (where to put the git folder). |
> | `commitMessage` | `string` | The initial commit message. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### commit()

Performs a commit in the specified repository.

> ```ts
> static commit(user: string, email: string, workspaceName: string, repositoryName: string, commitMessage: string, all: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `user` | `string` | The username of the committer. |
> | `email` | `string` | The email address of the committer. |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `commitMessage` | `string` | The commit message. |
> | `all` | `boolean` | If true, automatically stages modified and deleted files before committing. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getGitRepositories()

Retrieves a list of all Git repositories (projects) within the specified workspace.

> ```ts
> static getGitRepositories(workspaceName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of ProjectDescriptor objects.
> :::

#### getHistory()

Retrieves the commit history for the specified repository or a specific file path within it.

> ```ts
> static getHistory(repositoryName: string, workspaceName: string, path: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `repositoryName` | `string` | The name of the repository. |
> | `workspaceName` | `string` | The name of the workspace. |
> | `path` | `string` | The file path for history, or null/empty string for full repository history. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of GitCommitInfo objects.
> :::

#### deleteRepository()

Deletes the specified Git repository.

> ```ts
> static deleteRepository(workspaceName: string, repositoryName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository to delete. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### cloneRepository()

Clones a remote repository into the local workspace.

> ```ts
> static cloneRepository(workspaceName: string, repositoryUri: string, username: string, password: string, branch: string): GitConnector;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryUri` | `string` | The URI of the remote repository. |
> | `username` | `string` | The username for authentication. |
> | `password` | `string` | The password for authentication. |
> | `branch` | `string` | The specific branch to checkout after cloning. |
>
> ::: info Returns
> - **Type**: `GitConnector`
> - **Description**: A GitConnector instance for interacting directly with the cloned repository.
> :::

#### pull()

Pulls changes from the remote repository and attempts to merge them into the current branch.

> ```ts
> static pull(workspaceName: string, repositoryName: string, username: string, password: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `username` | `string` | The username for authentication. |
> | `password` | `string` | The password for authentication. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### push()

Pushes the local commits to the remote repository.

> ```ts
> static push(workspaceName: string, repositoryName: string, username: string, password: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `username` | `string` | The username for authentication. |
> | `password` | `string` | The password for authentication. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### checkout()

Checks out a specific branch, commit, or tag in the repository.

> ```ts
> static checkout(workspaceName: string, repositoryName: string, branch: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `branch` | `string` | The branch or tree-ish object to check out. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createBranch()

Creates a new branch starting from a specified point (e.g., HEAD, a commit hash, or another branch).

> ```ts
> static createBranch(workspaceName: string, repositoryName: string, branch: string, startingPoint: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `branch` | `string` | The name of the new branch to create. |
> | `startingPoint` | `string` | The tree-ish object to start the new branch from. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteBranch()

Deletes a local branch.

> ```ts
> static deleteBranch(workspaceName: string, repositoryName: string, branch: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `branch` | `string` | The name of the branch to delete. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### renameBranch()

Renames a local branch.

> ```ts
> static renameBranch(workspaceName: string, repositoryName: string, oldName: string, newName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `oldName` | `string` | The current name of the branch. |
> | `newName` | `string` | The new name for the branch. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createRemoteBranch()

Creates a new remote branch on the Git server.

> ```ts
> static createRemoteBranch(workspaceName: string, repositoryName: string, branch: string, startingPoint: string, username: string, password: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `branch` | `string` | The name of the remote branch to create. |
> | `startingPoint` | `string` | The tree-ish object to start the new remote branch from. |
> | `username` | `string` | The username for authentication. |
> | `password` | `string` | The password for authentication. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteRemoteBranch()

Deletes a remote branch on the Git server.

> ```ts
> static deleteRemoteBranch(workspaceName: string, repositoryName: string, branch: string, username: string, password: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `branch` | `string` | The name of the remote branch to delete. |
> | `username` | `string` | The username for authentication. |
> | `password` | `string` | The password for authentication. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### hardReset()

Resets the repository, discarding all uncommitted changes in the working directory and index.

> ```ts
> static hardReset(workspaceName: string, repositoryName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### rebase()

Reapplies commits from the specified branch onto the current branch.

> ```ts
> static rebase(workspaceName: string, repositoryName: string, branch: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `branch` | `string` | The branch to rebase. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### status()

Retrieves the current status of the repository (staged, unstaged, untracked files).

> ```ts
> static status(workspaceName: string, repositoryName: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: A string representation of the repository status.
> :::

#### getBranch()

Retrieves the name of the currently active branch.

> ```ts
> static getBranch(workspaceName: string, repositoryName: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The name of the current branch.
> :::

#### getLocalBranches()

Retrieves a list of all local branches in the repository.

> ```ts
> static getLocalBranches(workspaceName: string, repositoryName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of GitBranch objects representing local branches.
> :::

#### getRemoteBranches()

Retrieves a list of all remote branches configured for the repository.

> ```ts
> static getRemoteBranches(workspaceName: string, repositoryName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of GitBranch objects representing remote branches.
> :::

#### getUnstagedChanges()

Retrieves a list of all unstaged files (changes not yet added to the index).

> ```ts
> static getUnstagedChanges(workspaceName: string, repositoryName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of GitChangedFile objects.
> :::

#### getStagedChanges()

Retrieves a list of all staged files (changes added to the index, ready for commit).

> ```ts
> static getStagedChanges(workspaceName: string, repositoryName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of GitChangedFile objects.
> :::

#### getFileContent()

Retrieves the content of a file at a specific revision (commit, branch, or tag).

> ```ts
> static getFileContent(workspaceName: string, repositoryName: string, filePath: string, revStr: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `workspaceName` | `string` | The name of the workspace. |
> | `repositoryName` | `string` | The name of the repository. |
> | `filePath` | `string` | The path to the file. |
> | `revStr` | `string` | The revision string (e.g., commit hash or branch name). |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The content of the file as a string.
> :::

