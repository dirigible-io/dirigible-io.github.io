---
title: Bookstore Application - API
---

Bookstore Application - API
===

## Overview

This section shows how to create the API layer for the Bookstore application.
It contains a Books `REST API`. 

## Steps

### REST API

1. Right click on the `babylon-project` project and select **New &#8594; Folder**.
1. Enter `api` for the name of the folder.
1. Right click on the `api` folder and select **New &#8594; TypeScript Service**.
1. Enter `books.ts` for the name of the TypeScript Service.
1. Replace the content the following code:

    ```ts
    import { rs } from "@dirigible/http";
    import { BookRepository, Book } from '../data/BookRepository';

    const repository = new BookRepository();

    rs.service()
        .resource("")
        .get(function (ctx, request, response) {
            const entities: Book[] = repository.list();

            response.setContentType("application/json");
            response.setStatus(response.OK);
            response.println(JSON.stringify(entities));
        })

        .resource("{id}")
        .get(function (ctx, request, response) {
            const id: number = ctx.pathParameters.id;
            const entity: Book = repository.findById(id);

            response.setContentType("application/json");
            if (entity) {
                response.setStatus(response.OK);
                response.println(JSON.stringify(entity));
            } else {
                response.setStatus(response.NOT_FOUND);
                response.println(JSON.stringify({
                    code: response.NOT_FOUND,
                    message: "Book not found"
                }));
            }
        })

        .resource("/count")
        .get(function (ctx, request, response) {
            const count: number = repository.count();

            response.setStatus(response.OK);
            response.println(`${count}`);
        })

        .resource("")
        .post(function (ctx, request, response) {
            const entity: Book = repository.create(request.getJSON());

            response.setHeader("Content-Location", `/services/ts/babylon-project/service/Books.ts/${entity.id}`);
            response.setStatus(response.CREATED);
        })

        .resource("{id}")
        .put(function (ctx, request, response) {
            const entity = request.getJSON();
            entity.id = ctx.pathParameters.id;
            repository.update(entity);
            response.setStatus(response.OK);
        })

        .resource("{id}")
        .delete(function (ctx, request, response) {
            const id: number = ctx.pathParameters.id;
            const entity: Book = repository.findById(id);

            if (entity) {
                repository.deleteById(id);
                response.setStatus(response.NO_CONTENT);
            } else {
                response.setStatus(response.NOT_FOUND);
                response.println(JSON.stringify({
                    code: response.NOT_FOUND,
                    message: "Book not found"
                }));
            }
        })
        .execute();
    ```

!!! info "Save & Publish"
    
	Saving the file will trigger a _`Publish`_ action, which will build and deploy the **TypeScript Service**. A `GET` to the root path of the REST API request is triggered by selecting the `books.ts` file and openning the `Preview` view. The **TypeScript Service** is available at the http://localhost:8080/services/ts/babylon-project/api/books.ts URL. It can be accessed in a separate browser tab, consumed by a third-party application or API tools like `Postman` or `cURL`.

## Next Steps

!!! success "Section Completed"

    After completing the steps in this tutorial, you would have:

    - REST API and business logic to perform CRUD operations on the Book entity.

    Continue to the [User Interface](../ui/) section to build a UI for the Book entity.

    _**Note:** The complete content of the Bookstore tutorial is available at: [https://github.com/dirigiblelabs/tutorial-babylon-project](https://github.com/dirigiblelabs/tutorial-babylon-project)_