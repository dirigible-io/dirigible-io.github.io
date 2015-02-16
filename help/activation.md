---
layout: help
title: Activation
icon: fa-sign-in
group: help-concepts
---

Activation
===

Activation is a concept related to the development lifecycle of an application. The original sources are stored in the workspace of the user. All changes reflect directly on the source artifacts there. When the source artifact is already in the state to be executed (i.e. tested), the developer has to perform *activation* on project level. This will transfer (copy) the source artifacts from the workspace to the *sandbox*. This place is a fully-functional runtime container isolated for the current user only. The only difference between the *sandbox* and the *registry* space is the user isolation.

Activation action is accessible from the main menu under the *Project* section, or at the project's context menu in *Workspace Explorer*.

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


> NOTE: The scripting services in the sandbox can access the services from the registry but not vice versa.

There is a default *auto-activation* mechanism, which can perform the activation on **Save** of the artifact. This can be switched on/off from the main menu -> *Project* (if you are in the **Workspace** perspective)


The auto-activation is enabled only for:

*	Scripting services
*	Integration services
*	Web content
*	Wiki content
 
For:

*	Data structures
*	Security constraints
*	Extension definitions

there is no sandboxing supported, nor auto-activation. The activation process is equal to [publication](publication.html) in this case.

