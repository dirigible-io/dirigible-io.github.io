---
layout: help
title: Help - Git
icon: fa-question-circle
---

Git Integration
===

There is a Git connector for team development in the toolkit.
The goal is to provided the simplest way to synchronize the sources with the remote source control repository and to leave the more complex operation (e.g. merge) for external tools.

Available commands: 
*	*Clone* - clones remote Git repository to the toolkit as a project

> Constraint: Remote Git repository must contain only one project.

*	*Push* - tries to push changes to the project's remote repository. If the changes are not conflicting with what is in remote "origin/master" branch, then the push is successful. After that the project content is synchronized with the state in the remote "origin/master" branch. 
If there are conflicts with the newly made changes then new remote branch is created and changes are pushed in it. The remote branch's name is "changes_branch_{dirigible's username}", e.g. "changes_branch_user1234".

> Constraint: Merging of conflicting branches should be done via an external tool e.g. "GitBash", "eGit", etc.

*	*Pull* - checkouts the remote changes from the "origin/master", if there are conflicts then an error will be raised.

> Constraint: If there are conflicting changes during Pull, then the recommendation is to [backup|backup.wiki] the project as zip, then to Reset it and manually apply your changes again.


*	*Reset* - sets the local project to be as the latest state of the remote "origin/master" branch.

*	*Share* - shares the selected project to remote repository.



All the commands are accessible from the project's pop-up menu

![Git](../samples/bookstore/101_books_git.png)
