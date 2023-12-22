---
title: Bookstore Application - Database
---

Bookstore Application - Database
===

## Overview

This section shows how to create the database layer for the Bookstore application.
It contains a database table definition for the `BOOKS` table, `CSV` data, `CSVIM` import definition and TypeScript `Repository` class. 

## Steps

### Table Definition
1. Create a project named `babylon-project`.
1. Right click on the `babylon-project` project and select **New &#8594; Folder**.
1. Enter `data` for the name of the folder.
1. Right click on the `data` folder and select **New &#8594; Database Table**.
1. Enter `BABYLON_BOOKS.table` for the name of the database table descriptor.
1. Right click on `BABYLON_BOOKS.table` and select **Open With &#8594; Code Editor**.
1. Replace the content with the following definition:

    ```json
    {
        "name": "BABYLON_BOOKS",
        "type": "TABLE",
        "columns": [
            {
                "name": "BOOK_ID",
                "type": "INTEGER",
                "primaryKey": true,
                "identity": "true",
                "unique": false,
                "nullable": false
            },
            {
                "name": "BOOK_ISBN",
                "type": "CHAR",
                "length": "17",
                "unique": true,
                "primaryKey": false,
                "nullable": false
            },
            {
                "name": "BOOK_TITLE",
                "type": "VARCHAR",
                "length": "120",
                "primaryKey": false,
                "unique": false,
                "nullable": false
            },
            {
                "name": "BOOK_PUBLISHER",
                "type": "VARCHAR",
                "length": "120",
                "primaryKey": false,
                "unique": false,
                "nullable": false
            },
            {
                "name": "BOOK_DATE",
                "type": "DATE",
                "nullable": true,
                "unique": false
            },
            {
                "name": "BOOK_PRICE",
                "type": "DOUBLE",
                "primaryKey": false,
                "unique": false,
                "nullable": false
            }
        ],
        "dependencies": []
    }
    ```

1. Save the changes and close the _`Code Editor`_.
1. Double click on `BABYLON_BOOKS.table` to view the definition with the _`Table Editor`_.

!!! info "Save & Publish"
    
	Saving the file will trigger a _`Publish`_ action, which will create the database table in the target database schema.
	Usually this action should take several seconds to complete, after which the database table would be visible in the [`Database Perspective`](/help/development/ide/perspectives/database/).

	_**Note:** Manual _`Publish`_ can be performed by right clicking on the artifact and selecting `Publish` from the context menu. The _`Publish`_ action can be performed also on project level._

### CSV Data

1. Right click on the `babylon-project/data` folder and select **New &#8594; File**.
1. Enter `books.csv` for the name of the file.
1. Right click on `books.csv` and select **Open With &#8594; Code Editor**.
1. Paste the following CSV data:

    ```csv
    BOOK_ID,BOOK_ISBN,BOOK_TITLE,BOOK_PUBLISHER,BOOK_DATE,BOOK_PRICE
    10001,978-3-598-21500-1,Beartown,Simon & Schuster,2019-05-01,17.0
    10002,978-3-598-21501-8,Beneath a Scarlet Sky,Lake Union Publishing,2017-05-01,9.74
    10003,978-3-598-21529-2,Dead Certain,Free Press,2007-09-04,7.19
    10004,978-3-598-21550-6,Everything We Keep,Lake Union Publishing,2016-08-01,14.65
    10005,978-3-598-21550-9,Exit West,Hamish Hamilton,2017-02-27,11.45
    ```

1. Save the changes and close the _`Code Editor`_.
1. Double click on `books.csv` to view the data with the _[`CSV Editor`](/help/development/ide/editor-csv/)_.

### CSVIM

1. Right click on the `babylon-project/data` folder and select **New &#8594; File**.
1. Enter `books.csvim` for the name of the file.
1. Right click on `books.csvim` and select **Open With &#8594; Code Editor**.
1. Paste the following CSVIM definition:

    ```json
    {
      "files": [
        {
          "table": "BABYLON_BOOKS",
          "schema": "PUBLIC",
          "file": "/babylon-project/data/books.csv",
          "header": true,
          "useHeaderNames": true,
          "delimField": ",",
          "delimEnclosing": "\"",
          "distinguishEmptyFromNull": true,
          "version": ""
        }
      ]
    }
    ```

1. Save the changes and close the _`Code Editor`_.
1. Double click on `books.csvim` to view the definition with the _[`CSVIM Editor`](/help/development/ide/editor-csvim/)_.

![Database](database.png)

!!! info "Save & Publish"
    
	Once the file is saved a _`Publish`_ action would be triggered, which will result into the data from the CSV file to be imported to the database table.

    _**Note:** Navigate to the [`Database Perspective`](/help/development/ide/perspectives/database/) to check that the `BABYLON_BOOKS` table is created and perform the following SQL query to check that the data from the CSV file is imported._

    ```sql
    select * from BABYLON_BOOKS;
    ```

### Repository

1. Right click on the `babylon-project/data` folder and select **New &#8594; File**.
1. Enter `tsconfig.json` for the name of the File.
1. Replace the content with the following:

    ```json
    {
        "compilerOptions": {
            "module": "ESNext"
        }
    }
    ```

1. Right click on the `babylon-project/data` folder and select **New &#8594; File**.
1. Enter `project.json` for the name of the File.
1. Replace the content with the following:

    ```json
    {
        "guid": "babylon-project",
        "actions": [
            {
                "name": "Build TypeScript",
                "commands": [
                    {
                        "os": "unix",
                        "command": "tsc"
                    },
                    {
                        "os": "windows",
                        "command": "cmd /c tsc"
                    }
                ],
                "registry": "true"
            }
        ]
    }
    ```

!!! note "TypeScript Compilation"

    The `tsconfig.json` and `project.json` files are needed for the compilation of the TypeScript files.
    In order to run the compilation a _`Publish`_ action should be performed on the _`Project`_ level _(right click on the project and select **Publish**)_.


1. Right click on the `babylon-project/data` folder and select **New &#8594; TypeScript Service**.
1. Enter `BookRepository.ts` for the name of the TypeScript Service.
1. Replace the content with the following code:

    ```ts
    import { dao as daoApi } from "@dirigible/db"

    export interface Book {
        readonly id?: number;
        readonly isbn: string;
        readonly title: string;
        readonly publisher: string;
        readonly date: Date;
        readonly price: number;
    }

    export class BookRepository {

        private repository;

        constructor(dataSourceName?: string, logCtxName?: string) {
            this.repository = daoApi.create({
                table: "BABYLON_BOOKS",
                properties: [
                    {
                        name: "id",
                        column: "BOOK_ID",
                        type: "INTEGER",
                        id: true,
                        required: true
                    }, {
                        name: "isbn",
                        column: "BOOK_ISBN",
                        type: "CHAR",
                        id: false,
                        required: false
                    }, {
                        name: "title",
                        column: "BOOK_TITLE",
                        type: "VARCHAR",
                        id: false,
                        required: false
                    }, {
                        name: "publisher",
                        column: "BOOK_PUBLISHER",
                        type: "VARCHAR",
                        id: false,
                        required: false
                    }, {
                        name: "date",
                        column: "BOOK_DATE",
                        type: "DATE",
                        id: false,
                        required: true
                    }, {
                        name: "price",
                        column: "BOOK_PRICE",
                        type: "DOUBLE",
                        id: false,
                        required: true
                    }]
            }, logCtxName, dataSourceName);
        }

        public list = (settings?): Book[] => {
            return this.repository.list(settings);
        };

        public findById = (id: number): Book | null => {
            return this.repository.find(id);
        };

        public create = (entity: Book): Book => {
            return this.repository.insert(entity);
        };

        public update = (entity: Book): Book => {
            return this.repository.update(entity);
        };

        public deleteById = (id: number): void => {
            this.repository.remove(id);
        };

        public count = (): number => {
            return this.repository.count();
        }
    }
    ```

!!! info "Save & Publish"
    
	In order to run the compilation of _`TypeScript`_ files a _`Publish`_ action should be performed on the _`Project`_ level _(right click on the project and select **Publish**)_.

!!! tip "db/dao"

    Take a look at the [`db/dao`](https://www.dirigible.io/api/database/dao/) documentation for more details about the API.

## Next Steps

!!! success "Section Completed"

    After completing the steps in this tutorial, you would have:

    - Database table named `BABYLON_BOOKS`.
    - Initial data imported into the database table.
    - TypeScript repository class to perform basic data operations.

    Continue to the [API](../api/) section to build a REST API for the Book entity.

    _**Note:** The complete content of the Bookstore tutorial is available at: [https://github.com/dirigiblelabs/tutorial-babylon-project](https://github.com/dirigiblelabs/tutorial-babylon-project)_