---
title: IDE
---

IDE
===

## Web IDE

The Web-based integrated development environment (Web IDE) runs directly in a browser and, therefore, does not require additional downloads and installations. It has a rich set of editors, viewers, wizards, DevOps productivity tools, and a new Web IDE for in-system application development.

The Web IDE is a composition of perspectives, each consisting of the necessary tools to accomplish a certain goal. Three of the UI elements retain their positions in all perpectives:

* top-area toolbar for the menus, theme selection, and user control
* sidebar on the left with shortcuts to the perspectives
* status bar at the bottom, for notifications and other use by the tools

![Workbench Perspective](../../images/ide_workbench_perspective.png)

The tools that constitute the perspectives are laid out in predefined regions of the work plot, but you can change their position using drag and drop. The perspectives are simply predefined configurations, hence you can open, move, or close different tools on the work plot of a perspective for your convenience. You can also be maximize, minimize, or even pop out any of the tools in a separate window.
 
The tools are the smallest atomic parts in the Web IDE. They are referred to as views or editors, and each type is handled differently.

## Perspectives

By default, the different views and editors are separated into a few perspectives:

* [Workbench](perspectives/workbench)
* [Git](perspectives/git)
* [Database](perspectives/database)
* [Repository](perspectives/repository) 
* [Terminal](perspectives/terminal)
* [Operations](perspectives/operations)
* [Documents](perspectives/documents)
* [Debugger](perspectives/debugger)

## Views

Each perspective is comprised of different views. Learn more about them following the list below:

* [Snapshot](views/snapshot)
* [Debugger](views/debugger)
* [Roles](views/roles)
* [Jobs](views/jobs)
* [Documents](views/documents)
* [Git](views/git)
* [Preview](views/preview)
* [Workspace](views/workspace)
* [SQL](views/sql)
* [Extensions](views/extensions)
* [Terminal](views/terminal)
* [Variables](views/variables)
* [Breakpoints](views/breakpoints)
* [Console](views/console)
* [Logs](views/logs)
* [Data Structures](views/datastructures)
* [Access](views/access)
* [Listeners](views/listeners)
* [Database](views/database)
* [Search](views/search)
* [Import](views/import)
* [Registry](views/registry)
* [Repository](views/repository)

## Editors


[Monaco](https://microsoft.github.io/monaco-editor/) is the editor integrated into the Eclipse Dirigible Web IDE.


## Modelers

There are some more sophisticated visual editors:

* [BPMN Modeler](modelers/bpmn)
* [Database Schema Modeler](modelers/database-schema)
* [Entity Data Modeler](modelers/entity-data)
* [Form Designer](modelers/form-designer)


## Layouts

The Web IDE layout API delegates the layout management to the GoldenLayout framework. Layouts is a convenience bag of functions that significantly simplifies the work with layouts. It takes care of views registry setup, the work plot regions configuration, layout initialization, serialization, control on the layout manager, open view and open editor functions, global notifications, and others.

The top-area toolbar is a composite that aggregates the drop-down menus, the theme selection, the user name, and sign-out control. It uses the corresponding UI microservices available in the ideUiCore module as Menu, User, and Theme.

By convention, all UI components are built with Bootstrap 3.x CSS and the themes in the Web IDE are actually custom Bootstrap CSS. A UI microservice enables dynamic change of the CSS upon change of the theme automatically. It is available as Angular factory theme.

The Angular service User provides the details for the user that are rendered by the Menu directive, such as the user name.

The sidebar is Angular directive that takes care of rendering a standard sidebar in the framework template. It works with the `perspectives.js` service to populate the registered perspectives as shortcuts.

The status bar is an Angular directive that renders a standard, fixed-position footer. The component is subscribed to listen to message types configured as value of the status-bar-topic attribute, or by default to status-message messages.
 
