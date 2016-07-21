---
layout: samples
title: Entity User Interface
icon: fa-caret-right
group: simple
---

Entity User Interface
===

After creating the data model and the entity service, let's now generate user interface for entity management (list, new, edit, delete...)

Develop
--
1. Select **books.entity** and open the pop-up menu. 
2. Choose **Generate** -> **User Interface for Entity Service**.

	![Entity Service UI 1](bookstore/27_books_entity_service_ui_1.png)

3. From the wizard, select the template **List and Manage View**.
4. Click **Next**.
5. Select all columns from the list, or you can use the **Select All** button.

	![Entity Service UI 3](bookstore/29_books_entity_service_ui_3.png)

6. On the next page, enter the name **books_manage.html** and click **Next**.
7. In **Page Title**, enter ***Manage Books***.

	![Entity Service UI 5](bookstore/31_books_entity_service_ui_5.png)

8. Click **Finish**.
> The generation is triggered and you can see the result under the **WebContent** folder.
9. When you select the file, you should see the result page in the **Preview** view.

	![Entity Service UI 6](bookstore/32_books_entity_service_ui_6.png)

Discover
--
To discover all available web pages, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **Web** to open the currently available web pages.
3. You can see a list of all projects, that have at least one web page.
4. Drill-down in the **BookStore** project folder and click on the page which is listed.
5. You can open the page in a new tab, by click on the icon.

	![Entity Service UI 8](bookstore/34_books_entity_service_ui_8.png)

6. Click the **Edit** button and input the information about the first book you want to have in your store.

	![Entity Service UI 9](bookstore/35_books_entity_service_ui_9.png)

7. Click the **Save** button and see the record inserted in the table above.

	![Entity Service UI 10](bookstore/36_books_entity_service_ui_10.png)

