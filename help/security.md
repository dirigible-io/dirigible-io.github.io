---
layout: help
title: Security
icon: fa-shield
group: help-features
---

Security
===

Security is quite a broad topic, therefore we'll emphasize mostly on the authentication and authorization concept of [dynamic applications](dynamic_applications.html).

Being a standard Java Web application, the *Dirigible Design-Time* and *Runtime* components rely entirely on the underlying Java Web container/server for the authentication process.  Generally, it comes as a well-integrated [JAAS](http://en.wikipedia.org/wiki/Java_Authentication_and_Authorization_Service) service. 

There are several predefined roles coming by default, which can be used for dynamic applications:

*	*Administrator*
*	*Manager*
*	*PowerUser*
*	*User*
*	*ReadWrite*
*	*ReadOnly*
*	*Everyone*


> Bear in mind that the above roles are shared for all projects/dynamic applications within an account.

> More roles can be added only via custom build of the Dirigible's Runtime component.

1. As soon as the Roles definition is well [standardized](http://docs.oracle.com/javaee/5/tutorial/doc/bncav.html#bncay), *User*/*Principals* to Roles assignments are platform specific. For SAP HANA Cloud Platfrom, you can refer at [SAP_HANA_Cloud.pdf](https://help.hana.ondemand.com/help/SAP_HANA_Cloud_Platform.pdf) -> section **1.3.10.3.1**.
2. Once we have defined the roles and the User-to-Roles assignments, it comes the definition of the protected resources. It can be done by a simple JSON formatted **\*.access** file under the *SecurityConstraints* project's sub-folder. 
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

The impact of resource protection is on the Web and wiki content, and also on scripting services end-points.

> The location attribute of the protected resource is transitive,  i.e. the most specific location wins in case of multiple definitions with equal roots.

There is a *Security Manager* view, opened by default in the *Workspace* perspective, where you can see the currently protected resources, as well as to disable the protection.
