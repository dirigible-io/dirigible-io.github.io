---
layout: help
title: Security
icon: none
group: help-features
---

{{ page.title }}
===

Security is quite a broad topic. We will emphasize mostly on the authentication and authorization concept of [dynamic applications](dynamic_applications.html).

Being a standard Java Web application, the *Dirigible Design-Time* and *Runtime* components rely entirely on the underlying Java Web container or server for the authentication process. It integrates the [JAAS](http://en.wikipedia.org/wiki/Java_Authentication_and_Authorization_Service) service. 

There are several predefined roles, which can be used for dynamic applications:

*	*Administrator*
*	*Manager*
*	*PowerUser*
*	*User*
*	*ReadWrite*
*	*ReadOnly*
*	*Everyone*


> Bear in mind that the above roles are shared for all projects and dynamic applications within an account.

> More roles can be added only via custom build of the Eclipse Dirigible's Runtime component.

1. As soon as the Roles definition is well [standardized](http://docs.oracle.com/javaee/5/tutorial/doc/bncav.html#bncay), the *User* or *Principals* to Roles assignments become platform specific. For the SAP HANA Cloud Platform, you can refer to section **1.3.10.3.1** in the [SAP_HANA_Cloud.pdf](https://help.hana.ondemand.com/help/SAP_HANA_Cloud_Platform.pdf).
2. Once you have defined the roles and the User-to-Roles assignments, you have to define the protected resources. It can be done by a simple JSON formatted **\*.access** file in the project's *SecurityConstraints* sub-folder. 
3. A wizard generates the sample **main.access** file, which looks like this:
<pre><code>[
  {
    "location":"/project1/secured",
    "roles":
      [
        {"role":"User"},
        {"role":"PowerUser"}
      ]
  },
  {
    "location":"/project1/confidential",
    "roles":
      [
        {"role":"Administrator"}
      ]
  }
]
</code></pre>
4. After publishing the project, try to access the protected resources with users assigned to different roles. 

The impact of resource protection is on the Web content, on the wiki content, and on the end-points of the scripting services.

> The location attribute of the protected resource is transitive, that is, the most specific location wins in case of multiple definitions with equal roots.

There is a *Security Manager* view that is opened by default in the *Workspace* perspective. There you can see the currently protected resources and disable the protection when it is no longer needed.
