---
layout: help
title: Workbench
icon: none
group: help-perspectives
---

{{ page.title }} Perspective
===

This is the place where the user develops the dynamic applications. This perspective contains all views and editors that may help in the overall implementation, from domain models via services to the user interface.

![Workbench Perspective](images/ide_workbench_perspective.png){: .img-responsive }

The Workbench perspective is comprised of Workspace, Import, Properties, Console and Preview views, plus the editors registered for each file type. In other words, the minimal toolset for file management, preview and editing operations. The new template-based project and artifacts scaffolding generators features are worthy of mention.
Version 3 of Dirigible enables the users to create, manage, and switch between multiple workspaces through the Workspace view.
The projects file organization is now non-normative and entirely up-to the preferences of the users.
The IDE supports multiple editors registered for different file (MIME) types. More than one editor can be registered for one file type and in this case a “Open with…” context menu entry is rendered for the user to select, which one to use.

The main view opened by default in this perspective is the *Workspace* explorer, a standard view on the projects in your [workspace](concepts_workspace.html). It shows the folder structure along with the files. 

There is a context menu assigned to the project node:

![Context Menu / New](images/ide_workspace_menu_new.png){: .img-responsive }

Via this context menu, you can create new artifacts such as:

* Database Table
* Database View
* Database Schema Model
* Entity Data Model
* JavaScript Service
* HTML5 Page
* Scheduled Job
* Message Listener
* Business Process Model
* Access Constraints
* Roles Definitions

or just regular ones:

*	File 
*	Folder

When selecting an artifact, you can use the *Open* or *Open With* actions to load its content in the corresponding editor, for example, [Orion Editor](ide_editor_orion.html).



