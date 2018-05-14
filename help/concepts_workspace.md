---
layout: help
title: Workspace
icon: fa-files
---

{{ page.title }}
===

The **Workspace** is the developer's place where he/she creates and manages the application artifacts. The first-level citizens of the *workspace* are the *projects*. Version 3 of Dirigible enables the users to create, manage, and switch between multiple workspaces through the Workspace view.
Each project can contain multiple folders and files (artifacts).
The new template-based project and artifacts scaffolding generators features are worthy of mention.
The projects file organization is now non-normative and entirely up-to the preferences of the users.
The IDE supports multiple editors registered for different file (MIME) types. More than one editor can be registered for one file type and in this case a “Open with…” context menu entry is rendered for the user to select, which one to use.

The Workspace explorer displays a standard view on the projects in your [workspace](concepts_workspace.html). It shows the folder structure along with the files. 

![Workspace View](images/ide_view_workspace.png){: .img-responsive }

There is a context menu assigned to the project node:

![Context Menu / New](images/ide_workspace_menu_new.png){: .img-responsive }

Via this context menu, you can create new [artifacts](artifacts.html) such as:

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

A single user can have multiple workspaces, containing different set of projects.

The artifacts i.e. the project management, can be done via the views and editors in the [Workbench Perspective](ide_perspective_workbench.html).


