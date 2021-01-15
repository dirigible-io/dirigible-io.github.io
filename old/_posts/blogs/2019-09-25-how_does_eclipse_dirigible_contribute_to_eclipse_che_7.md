---
title: How Does Eclipse Dirigible Contribute to Eclipse Che 7?
author: dragomir.anachkov
---

Eclipse Che unites a wide range of different frameworks, programming languages, and development tools, and helps developers design and create next-level services on the Cloud. Eclipse Che provides you with a default Web IDE. However, Eclipse Che also allows you to plug in other IDEs, because the default IDE may not be able to cover your use case.

For example, we work on Eclipse Dirigible – an open-source cloud development platform that comes with its own Web IDE. You can directly integrate the Eclipse Dirigible Web IDE in Eclipse Che. This means that you can create a workspace in Eclipse Chе using the Eclipse Dirigible Web IDE instead of the default Eclipse Theia IDE.

![Fiori-UI-Theme](/img/posts/20190925/dirigible_fiori_che7.png){: .img-responsive }

### What is so cool about that?

Developers can run Eclipse Dirigible on whatever platform Eclipse Che 7 is deployed. The most notable example is the OpenShift platform offered by Red Hat. That way, the Eclipse Dirigible portfolio of services and features for business application development becomes available to the entire Che community.

### What does Eclipse Dirigible have to offer?

Now, let us take a look at what this portfolio currently consists of.
Eclipse Dirigible puts an emphasis on [low-code/no-code tools](https://www.dirigible.io/blogs/2018/12/05/you_dont_need_abs_to_model_apps.html) for developing business applications. As of version 3.4, Eclipse Dirigible provides the following tools:

* [In-system development with server-side JavaScript](https://www.youtube.com/watch?v=NZGbQOwAlYE)
  
  You can develop backend applications using Enterprise JavaScript.

* Enhanced RESTful frameworks - [RS](https://www.dirigible.io/api/http_rs.html) and [RS data](https://www.dirigible.io/api/http_rs-data.html)

* [Entity data modeler](https://www.youtube.com/watch?v=im_BMYNnLZQ)

  You can generate an application using predefined application templates.

  ![Entity-Data-Modeler](/img/posts/20190925/dirigible_edm_che7.png){: .img-responsive }
 
* [Business process modeler](https://www.dirigible.io/blogs/2018/12/05/you_dont_need_abs_to_model_apps.html)

  You can model process flows and implement in-system and Java tasks.
  
  ![Business-Process-Modeler](/img/posts/20190925/dirigible_bpmn_che7.png){: .img-responsive }
  
* [Database modeler](https://www.dirigible.io/help/ide_modeler_database_schema.html)

  You can design your own database schema with tables, views, and their relations.

* [Job scheduler](https://www.youtube.com/watch?v=_FJwZQZo2A8)

  You can define declaratively and schedule jobs that run regularly.

* [Message listener](https://www.youtube.com/watch?v=zMnQBQbTPOE)

  You can create topics and queues and subscribe for events.
  
* [Kubernetes support](https://www.dirigible.io/blogs/2018/06/25/kubernetes_keycloak_postgresql_dirigible.html)

  For productive use cases, we recommend that you use Kubernetes, Keycloak, and PostgreSQL.

### Why use JavaScript as a business application language?

At Dirigible, we have decided to focus on JavaScript, because it has a small learning curve, and it is a well-known programming language that has proven itself in the context of web development throughout the years.

For business application development, which is our case, JavaScript is just a tool, which lets you consume the standardized set of Enterprise APIs that we provide. Additionally, Dirigible allows you to set the default server-side JavaScript execution as synchronous, so you could develop your service in a callback-free way. For example, some of the most popular Enterprise APIs that you can use are:

* [Database](https://www.dirigible.io/api/database.html) / [Database DAO](https://www.dirigible.io/api/database_dao.html)

* [HTTP Client](https://www.dirigible.io/api/http_client.html) / [HTTP Client Async](https://www.dirigible.io/api/http_client_async.html)

* [CMIS](https://www.dirigible.io/api/cmis.html)

* [HTTP Request](https://www.dirigible.io/api/http_request.html) / [HTTP Response](https://www.dirigible.io/api/http_response.html) / [HTTP RS](https://www.dirigible.io/api/http_rs.html)

* [BPM Process](https://www.dirigible.io/api/bpm_process.html)

### Are there any alternatives to Eclipse Dirigible?

There are alternatives to Eclipse Dirigible and these are platforms such as Mendix and Force.com by Salesforce. However, you have to purchase the corresponding licenses to start using them.

In the open-source world though, there are no alternatives to this day. There are other open-source platforms such as Eclipse Theia and Jupyter, but they are not competing directly with Eclipse Dirigible, because they specialize in other areas. For example, Eclipse Theia focuses on general-purpose code editing using the VSCode platform while Jupyter, on the other hand, is the right choice when it comes to big data analysis and data mining.

However, none of these platforms provide what Eclipse Dirigible has to offer in terms of low-code/no-code tools for developing business applications. At least for now.

### Conclusions

Thanks to the great collaboration with the Eclipse Che team, Eclipse Dirigible is on the right way of achieving its ultimate goal, which is to provide developers of business applications with the fastest turnaround time in the Cloud and a unique user experience at the same time.

So why don’t you [give it a try](https://www.dirigible.io)?

If there is something that you don't like, or you think it can be improved, don't hesitate to share your [feedback](https://github.com/eclipse/dirigible/issues). The Eclipse Dirigible team will definitely appreciate it. That is one of the best things about the open-source community that we are all part of!

### Resources

[How to Run Eclipse Dirigible on Eclipse Che 7](https://www.youtube.com/watch?v=AA3M-vuY3pY)
