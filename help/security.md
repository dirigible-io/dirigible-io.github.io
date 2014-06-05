---
layout: help
---

Security
===

Security is quite broad topic, so that here will be described mostly the authentication and authorization concept of [dynamic applications](dynamic_applications.html).

Being a standard Java web application, the Dirigible Design-Time as well as Runtime components rely entirely on the underlying Java web container/server for the authentication process. 
Usually it comes as well integrated [JAAS](http://en.wikipedia.org/wiki/Java_Authentication_and_Authorization_Service) service. 

There are several predefined roles coming by default and can be used for dynamic applications:

*	Administrator
*	Manager
*	PowerUser
*	User
*	ReadWrite
*	ReadOnly
*	Everyone


> Have in mind that the above roles are shared for all the projects/dynamic applications within the account
> More roles can be added only via custom build of the Dirigible's Runtime component.

As soon as the Roles definition are well [standardized](http://docs.oracle.com/javaee/5/tutorial/doc/bncav.html#bncay), User/Principals to Roles assignments are platform specific. For HANA Cloud Platfrom you can refer at [SAP_HANA_Cloud.pdf](https://help.hana.ondemand.com/help/SAP_HANA_Cloud.pdf) section - 1.3.10.3.1

Once we have defined the Roles as well as the User-to-Roles assignments, it comes the definition of the protected resources. It is done by a simple JSON formatted \*.access file under the SecurityConstraints project's sub-folder.
There is a wizard which generates the sample main.access, which looks like:

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

After the publishing of the project you can try to access the protected resources with users with different roles assignments. 
The impact of protection of the resources is on the web and wiki content and also on scripting services' end-points.

> The location attribute of the protected resource is transitive i.e. the most specific location wins in case of multiple definitions with equal roots

There is a Security Manager view, opened by default in Workspace perspective, where you can see the currently protected resources as well as to disable the protection.
