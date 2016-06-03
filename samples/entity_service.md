---
layout: samples
title: Entity Service
icon: fa-rss
group: simple
---

Entity Service
===

In the context of Dirigible, the Entity Service means a REST service which exposes the [CRUD](http://en.wikipedia.org/wiki/Create,\_read,\_update\_and\_delete) methods on top of the database table. The following steps shows how to generate such an entity service on top of existing table.

1. Select the **ScriptingServices** sub-folder of the project and open the pop-up menu.
2. From the menu, choose **New** -> **Scripting Service**.

	![Entity Service](bookstore/16_books_entity_service_menu.png)

3. From the wizard, select **Entity Service on Table** from the list of available templates.
4. Click **Next**.
5. From the list of all available tables, select the one that will be used to generate the entity service and click **Next**.

	![Entity Service](bookstore/18_books_entity_service_wizard_2.png)

6. Enter the name of your entity service and click **Finish**.
7. The generated service will be opened in the editor.

	![Entity Service](bookstore/20_books_entity_service_content.png)

8. Now, you can use the **Publish** action from the project's pop-up menu to enable the service.
9. Go to **Workspace Explorer** where the project is managed and select the service artifact (**books.js**). This action will make a GET HTTP request to the service and the response from the service can be seen the **Preview** view.

	![Entity Service](bookstore/22_books_entity_service_test.png)

	> In this case - just an empty JSON array.

10. To discover all available services, you should go to the [Registry](../help/registry.html).
11. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
12. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.

13. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**

	![Entity Service](bookstore/25_books_entity_service_registry_2.png)

14. You directly open (and make HTTP GET request) to the service by clicking on the icon.

	![Entity Service](bookstore/26_books_entity_service_registry_3.png)


The naming convention for the service endpoints URLs is as follows:

> *{protocol}://{host}:{port}/{dirigible's runtime application context}/services/js/{project}/{service-name}*

**For example:**

> *https ://dirigibleide.hana.ondemand.com/dirigible/services/js/bookstore/books.js*


There are some specific requirements for the table to be exposed as an entity service (e.g. primary key has to be defined, it should be a single column, etc.). Also, the entity service itself supports a bit more operations than the standard ones defined by HTTP. For more information, see [Entity Service](../help/entity_service.html).