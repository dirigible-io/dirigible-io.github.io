---
layout: help
title: Publishing
icon: fa-upload
group: help-concepts
---

Publishing
===

There is a conceptual separation between design-time and runtime phases of the development lifecycle.
During the design-time phase, the source artifacts are created and managed within the isolated developer's area - workspace.
When the developer is ready with a given feature, he/she has to publish the project so that the application artifacts become available for the users. 

The meaning of "available" depends on the type of artifact. For example, for Scripting Services this is the registration of a public end-point, while for Web and wiki content, it is just allowed access to the artifacts them self, etc.

Publishing action is accessible from the main menu under the *Project* section or at the project's context menu in the *Workspace Explorer*.

![Project Publish](../samples/bookstore/104_books_project_publish.png)

or

![Project Publish Popup](../samples/bookstore/106_books_project_publish_popup.png)

The space within the *Repository*, where all the public artifact are placed, is called **Registry**.

<pre><code>
  /db
    /dirigible
      /registry             (public space)
        /public             (placeholder)
          /ScriptingServices
            /project1
              /service1.js
      /users
        /<user>             (private space)
          /workspace
            /project1
              /ScriptingServices
                /service1.js
</code></pre>

To view the currently published artifacts, you can go to [Registry User Interface](registry.html). There are sections separated by the artifact types.
