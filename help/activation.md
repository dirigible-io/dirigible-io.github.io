---
layout: help
title: Activation
icon: none
group: help-concepts
---

Activation
===

Activation is a concept related to the development lifecycle of an application. The original sources are stored in the workspace of the user. All changes reflect directly on the source artifacts there. When the source artifact is already in the state to be tested, the developer has to perform an *activation* on project level. This will copy the source artifacts from the workspace to the *sandbox*. This place is a fully-functional runtime container isolated for the current user only. The only difference between the *sandbox* and the *registry* space is the user isolation.

The activation action is accessible from the main menu under the *Project* section and from the project's context menu in the *Workspace Explorer*.

![Project Activate](../samples/bookstore/105_books_project_activate.png)

or

![Project Activate Popup](../samples/bookstore/107_books_project_activate_popup.png)


<pre><code>
   /db
     /dirigible
       /sandbox
         /<user>             (private space)
           /ScriptingServices
             /service1.js
       /users
         /<user>             (private space)
           /workspace
             /project1
               /ScriptingServices
                 /service1.js
</code></pre>


> NOTE: The scripting services in the sandbox can access the services from the registry, but it does not work the other way around.

There is a default *auto-activation* mechanism, which can perform the activation upon **Save** of the artifact. This can be switched on and off from the main menu in the *Project* section if you are in the **Workspace** perspective.


The auto-activation is enabled only for:

*	Scripting services
*	Integration services
*	Web content
*	Wiki content
 
There is no sandboxing supported and no auto-activation For:

*	Data structures
*	Security constraints
*	Extension definitions

In these cases, the activation process is equal to [publication](publication.html).

