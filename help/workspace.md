---
layout: help
---

Workspace
===

The Workspce is the developer's place where he/she creates and manages the application artifacts.
The first level entities are the projects them selves. Each project contains several system folders based on the type of the artifacts.
Default ones are:


*	DataStructures          - containing the tables, views, etc. database related artifacts (more info [here](data_structures.html)
*	IntegrationServices     - containing the definitions about the routes and related artifacts (more info [here](integration_services.html)
*	ScriptingServices       - containing the JavaScript, Ruby, Groovy, etc. server-side services and related artifacts (more info [here](scripting_services.html)
*	SecurityConstraints     - containing the access control definitions artifacts (more info [here](security_constraints.html)
*	TestCases               - containing the unit tests for the scripting services and related artifacts (more info [here](test_cases.html)
*	WebContent              - containing the static pages as well as the client-side scripting artifacts (more info [here](web_content.html)
*	WikiContent             - containing the confluence formatted wiki pages and related artifacts (more info [here](wiki_content.html)

Example layout of a project looks like this:

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
