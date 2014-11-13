---
layout: help
title: Workspace
icon: fa-desktop
group: help-concepts
---

Workspace
===

The **Workspace** is the developer's place where he/she creates and manages the application artifacts. The first-level entities are the projects themselves. Each project contains several system folders based on the type of artifacts.

The default artifacts are:


*	*DataStructures*          - contains database-related artifacts, such as tables, views, etc. (more info [here](data_structures.html))
*	*IntegrationServices*     - contains the definitions about the routes and related artifacts (more info [here](integration_services.html))
*	*ScriptingServices*       - contains the JavaScript, Ruby, Groovy, etc. server-side services and related artifacts (more info [here](scripting_services.html))
*	*SecurityConstraints *    - contains the access control definitions artifacts (more info [here](security_constraints.html))
*	*TestCases*               - contains the unit tests for the scripting services and related artifacts (more info [here](test_cases.html))
*	*WebContent*              - contains the static pages as well as client-side scripting artifacts (more info [here](web_content.html))
*	*WikiContent*             - contains the confluence-formatted wiki pages and related artifacts (more info [here](wiki_content.html))

Exemplary layout of a project:

<pre><code>
  /db
    /dirigible
      /users
        /<user>             (private space)
          /workspace
            /project1
              /DataStructures
                /data1.table
                /data1.dsv
              /IntegrationServices
                /connector1.routes
              /ScriptingServices
                /service1.js
              /SecurityConstraints
                /main.access
              /TestCases
                /service1_test.js
              /WebContent
                /index.html
                /default.css
              /WikiContent
                /project1.wiki
                /license.wiki
</code></pre>

The project management can be done via the views and editors in the [workspace perspective](workspace_perspective.html).
