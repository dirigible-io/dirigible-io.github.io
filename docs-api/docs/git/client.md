---
title: Client
---

Git Client
===

Git Client is used by scripting services to call git commands

=== "Overview"
- Module: `git/client`
- Source: [/git/client.js](https://github.com/dirigiblelabs/api-git/blob/master/git/v4/client.js)
- Status: `stable`


### Basic Usage

```javascript
const git = require("git/client");

const user = "dirigible";
const email = "dirigible@eclipse.org";
const workspaceName = "workspace";
const projectName = "project";
const repositoryName = projectName;
const initialCommitMessage = "Initial commit";
const commitMessage = "Second commit";
const add = true;

git.initRepository(user, email, workspaceName, projectName, repositoryName, initialCommitMessage);

git.commit(user, email, workspaceName, repositoryName, commitMessage, add);
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**initRepository(user, email, workspaceName, projectName, repositoryName, commitMessage)**   | Initializes a repository in the selected project | *-*
**commit(user, userEmail, workspaceName, repositoryName, commitMessage, add)**   | Creates a new commit in the selected project repository | *-*
**getGitRepositories(workspaceName)**   | Returns all git repositories in the selected workspace | *Projects*
**getHistory(repositoryName, workspaceName, path)**   | Returns git history for the selected repository | *GitCommitInfoList*
**deleteRepository(workspaceName, repositoryName)**   | Deletes git repository | *-*
**cloneRepository(workspaceName, repositoryUri, username, password, branch)**   | Clones repository from given URL in selected workspace | *-*
**pull(workspaceName, repositoryName, username, password)**   | Pull current branch of selected repository  | *-*
**push(workspaceName, repositoryName, username, password)**   | Push current branch to origin| *-*
**checkout(workspaceName, repositoryName, branchName)**   | Checkout given branch| *-*
**createBranch(workspaceName, repositoryName, branchName, startingPoint)** | Creates a new branch | *-*
**hardReset(workspaceName, repositoryName)** | Hard reset current branch | *-*
**rebase(workspaceName, repositoryName, branchName)** | Rebase selected branch | *-*
**status(workspaceName, repositoryName)** | Get selected repository status| *Status*
**getBranch(workspaceName, repositoryName)** | Get current branch | *String*
**getLocalBranches(workspaceName, repositoryName)** | Get list of local branches | *Branches*
**getRemoteBranches(workspaceName, repositoryName)** | Get list of remote branches | *Branches*
**getUnstagedChanges(workspaceName, repositoryName)** | Get unstaged changes for selected repository | *GitChangedFiles*
**getStagedChanges(workspaceName, repositoryName)** | Get staged changes for selected repository | *GitChangedFiles*
**getFileContent(workspaceName, repositoryName, filePath, revStr)** | Get the content of selected file | *String*


### Objects

---

#### GitCommitInfoList

Function     | Description | Returns
------------ | ----------- | --------
**size()** | Returns the size of this GitCommitInfoList programmatically | *integer*
**get(index)**   | Gets a GitCommitInfo by index programmatically | *[GitCommitInfo](#gitCommitInfo)*


#### GitCommitInfo

Function    | Description | Returns
------------ | ----------- | --------
**getId()**   | Gets the id of the commit | *string*
**getAuthor()**   | Gets the author of the commit | *string*
**getEmailAddress()**   | Gets the author's email address| *string*
**getDateTime()** | Gets the date and time of the commit| *string*
**getMessage()** | Gets the commit's message| *string*


#### Status


Function     | Description | Returns
------------ | ----------- | --------
**isClean()**   | Checks whether the repository is clean | *boolean*
**getAdded()**   | Gets added files | *array of strings*
**getChanged()**   | Gets changed files | *array of strings*
**getRemoved()**   | Gets removed files | *array of strings*
**getMissing()**   | Gets missing files | *array of strings*
**getUntracked()**   | Gets untracked files| *array of strings*
**getUntrackedFolders()**   | Gets untracked folders | *array of strings*
**getConflicting()**   | Gets conflicting files| *array of strings*
**getIgnoredNotInIndex()**   | Get ignored files | *array of strings*
**getUncommittedChanges()**   | Get uncommited changes | *array of strings*

#### Branches

Function     | Description | Returns
------------ | ----------- | --------
**size()** | Returns the size of this Branches list programmatically | *integer*
**get(index)**   | Gets a Branch by index programmatically | *[Branch](#branch)*


#### Branch

Function    | Description | Returns
------------ | ----------- | --------
**getName()**   | Gets the name of the branch | *string*
**isRemote()**   | Checks whether the branch is remote| *boolean*
**isCurrent**   | Checks whether the branch is current | *boolean*
**getCommitObjectId()** | Gets the commit's object id| *string*
**getCommitShortId()** | Gets the commit's short id| *string*
**getCommitDate()** | Gets the commit's data| *string*
**getCommitMessage()** | Gets the commit's message| *string*
**getCommitAuthor** | Gets the commit's author name| *string*

#### GitChangedFiles

Function     | Description | Returns
------------ | ----------- | --------
**size()** | Returns the size of this GitChangedFiles list programmatically | *integer*
**get(index)**   | Gets a GitChangedFile by index programmatically | *[GitChangedFile](#gitChangedFile)*


#### GitChangedFile

Function    | Description | Returns
------------ | ----------- | --------
**getPath()**   | Gets the path of the changed file | *string*




