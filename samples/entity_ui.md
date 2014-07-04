---
layout: samples
title: Entity User Interface
icon: fa-picture-o
group: simple
---

Entity User Interface
===

After the creation of the data model and the entity service, now we will going to generate an user interface for entity management (list, new, edit, delete...)

Select the *books.entity* and open the pop-up menu. Choose *Generate->User Interface for Entity Service*

![Entity Service UI 1](bookstore/27_books_entity_service_ui_1.png)

From the wizard select the template "List and Manage View"

![Entity Service UI 2](bookstore/28_books_entity_service_ui_2.png)

Click Next and select all the columns from the list. You can use "Select All" button

![Entity Service UI 3](bookstore/29_books_entity_service_ui_3.png)

On the next page enter the name of the page *books_manage.html*

![Entity Service UI 4](bookstore/30_books_entity_service_ui_4.png)

For the Title on the next page you can enter *Manage Books*

![Entity Service UI 5](bookstore/31_books_entity_service_ui_5.png)

After clicking Finish button the generation is triggered. You can see the result under the WebContent folder
When you select the file with active Preview you shall see the resulted running page.

![Entity Service UI 6](bookstore/32_books_entity_service_ui_6.png)

For the real test of the web page and the entity service you can [Publish](../help/publishing.html) the project

![Project Publish](bookstore/104_books_project_publish.png)

or

![Project Publish Popup](bookstore/106_books_project_publish_popup.png)

Now fo to the Registry perspective to find the link to the page, so that we can open it in an external browser.
From the Registry embedded page menu choose Web->Content

![Entity Service UI 7](bookstore/33_books_entity_service_ui_7.png)

Drill-down in the bookstore project folder and click on the page which is listed.
To open the page in a new tab click on the icon on the right side

![Entity Service UI 8](bookstore/34_books_entity_service_ui_8.png)

Click on "Edit" button and input the information about the first book you want to have in your store.

![Entity Service UI 9](bookstore/35_books_entity_service_ui_9.png)

Click Save button and see the inserted record in the table above

![Entity Service UI 10](bookstore/36_books_entity_service_ui_10.png)

