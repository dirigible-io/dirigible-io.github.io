---
title: "Making Reports in Eclipse Dirigible"
description: "Making Reports with small effort using Eclipse Dirigible: Step-by-Step Tutorial"
author: Nicole Georgieva
author_gh_user: NicoleNG18
author_avatar: https://avatars.githubusercontent.com/u/105500638?u=dc143b82eef5e59088ec2d5c140b1e6e4f59ddb6&v=4&size=64
read_time: 10 min
publish_date: October 21, 2024
---
# Making Reports in Eclipse Dirigible: Step-by-Step Tutorial

This sample demonstrates how to create a basic application with reports. It includes database tables, report queries, and the report model itself.

## Sections:

 * Database tables
 * Queries
 * Report models

### Database tables

This section shows how to create the database tables for the Reports application.

 - Create a project named `reports-sample-project`.

 - Navigate to the `Database Perspective`.

 - In the `SQL View` enter the following script:
 
```sql
       CREATE TABLE PRODUCT (
       PRODUCT_ID INT PRIMARY KEY AUTO_INCREMENT,
       PRODUCT_NAME VARCHAR(100) NOT NULL,
       PRODUCT_CATEGORY VARCHAR(100),
       PRODUCT_PRICE DECIMAL(10, 2) NOT NULL,
       PRODUCT_STOCKQUANTITY INT DEFAULT 0);

       CREATE TABLE SALE (
       SALE_ID INT PRIMARY KEY AUTO_INCREMENT,
       SALE_PRODUCT INT,
       SALE_CUSTOMER VARCHAR(100),
       SALE_DATE DATE NOT NULL,
       SALE_QUANTITYSOLD INT NOT NULL,
       SALE_TOTALAMOUNT DECIMAL(10, 2) NOT NULL,
       FOREIGN KEY (SALE_PRODUCT) REFERENCES PRODUCT(PRODUCT_ID));
```

<br>

- Press the `Run` icon to execute the SQL script.

- Press the `Refresh` button to see the `PRODUCT` and `SALE` tables.

![db-tables](../../../images/reports/db-tables.png)<br>

#### Table content

- Right-click on the `PRODUCT` or `SALE` tables and select `Show Contents`.

- The table data would be displayed in the `Result View`.
 
- As the table is empty, there should be no data:

![empty-tables](../../../images/reports/empty-tables.png)<br>

- In the `SQL View` enter the following script:

```sql
       INSERT INTO PRODUCT (PRODUCT_NAME, PRODUCT_CATEGORY, PRODUCT_PRICE, PRODUCT_STOCKQUANTITY) VALUES
       ('Apple', 'Fruits', 0.50, 100),
       ('Banana', 'Fruits', 0.30, 150),
       ('Milk', 'Dairy', 1.20, 50),
       ('Bread', 'Bakery', 2.00, 80),
       ('Cheese', 'Dairy', 3.50, 40),
       ('Orange Juice', 'Beverages', 2.50, 60);
 
       INSERT INTO SALE (SALE_PRODUCT, SALE_CUSTOMER, SALE_DATE, SALE_QUANTITYSOLD, SALE_TOTALAMOUNT) VALUES
       (1, 'John Doe', '2024-10-01', 5, 2.50),
       (2, 'Jane Smith', '2024-10-02', 10, 3.00),
       (3, 'Emily Johnson', '2024-10-03', 2, 2.40),  
       (4, 'Michael Brown', '2024-10-04', 1, 2.00),
       (5, 'Emma Wilson', '2024-10-05', 3, 10.50),
       (6, 'James Lee', '2024-10-06', 2, 5.00);
```

- Press the `Run` icon to execute the SQL script.

- Right-click on the `PRODUCT` or `SALE` tables and select `Show Contents`. You should see the data inside.

![product-table](../../../images/reports/product-table.png)<br>

![sale-table](../../../images/reports/sale-table.png)<br>

### Queries

The next step is to define the purpose of your reports. It’s essential to create your queries early and verify that they function correctly. You can test this by pasting them into the Database perspective and ensuring they run without errors.

- Total sales by product

```sql
        SELECT P.PRODUCT_NAME,
        SUM(S.SALE_QUANTITYSOLD) AS TOTAL_QUANTITY_SOLD,
        SUM(S.SALE_TOTALAMOUNT) AS TOTAL_SALES_AMOUNT
        FROM SALE S
        JOIN PRODUCT P
        ON S.SALE_PRODUCT = P.PRODUCT_ID
        GROUP BY P.PRODUCT_NAME 
        ORDER BY TOTAL_SALES_AMOUNT DESC;
```

- Sales on a specific date

```sql
        SELECT P.PRODUCT_NAME, S.SALE_CUSTOMER, S.SALE_QUANTITYSOLD, S.SALE_TOTALAMOUNT
        FROM SALE S
        JOIN PRODUCT P
        ON S.SALE_PRODUCT = P.PRODUCT_ID
        WHERE S.SALE_DATE = :parameter;
```

### Report models

#### Total sales by product

1. Right click on the Project -> New -> Report Model.

2. Open the report-model.report file and assign a name to the report.

![report-name-1](../../../images/reports/report-name-1.png)

3. Select the main table for the report; in our case, it’s SALE.

![base-table-1](../../../images/reports/base-table-1.png)
     
4. In the columns section, remove any columns you don’t want to include in the report and set the aggregate functions.

![columns-1](../../../images/reports/columns-1.png)

![columns-functions-1](../../../images/reports/columns-functions-1.png)

5. In the Joins section, define the joins by specifying their type and conditions.

![join-1](../../../images/reports/join-1.png)

6. In the Ordering section, specify the column and the order for displaying the results.

![order-1](../../../images/reports/order-1.png)

7. After completing these steps, a query is generated for the report. You can review it and make any necessary adjustments, adding or removing elements as needed.

![query-1](../../../images/reports/query-1.png)

8. Report generation

- Right click ot .report file and choose generate 

![generate-report](../../../images/reports/generate-report.png)

- Choose Application Report - Table for template and enter needed information in the next dialog

![generate-report-template](../../../images/reports/generate-report-template.png)

![generate-second-template](../../../images/reports/generate-second-template.png)

- Publish the project

![publish-report](../../../images/reports/publish-report.png)

- Open the index.html and view the report

![open-index](../../../images/reports/open-index.png)

![report-table-1](../../../images/reports/report-table-1.png)

- You can also print the report 

![print-report](../../../images/reports/print-report.png)

-------------------------
 
#### Sales on a specific date

1. Right click on the Project -> New -> Report Model.
      
2. Open the report-model.report file and assign a name to the report.

![report-name-2](../../../images/reports/report-name-2.png)

3. Select the main table for the report; in our case, it’s SALE.

![base-table-1](../../../images/reports/base-table-1.png)

4. In the columns section, remove any columns you don’t want to include in the report.

![columns-2](../../../images/reports/columns-2.png)

5. In the Joins section, define the joins by specifying their type and conditions.

![join-2](../../../images/reports/join-2.png)

6. In the Conditions section, define the criteria for filtering the results..

         Note: ':date' is dynamic parameter which will be configured in step 7

![conditions-2](../../../images/reports/conditions-2.png)

7. In the Parameters section, specify their names, types, and initial values.

![parameters-2](../../../images/reports/parameters-2.png)

8. After completing these steps, a query is generated for the report. You can review it and make any necessary adjustments, adding or removing elements as needed.

![query-2](../../../images/reports/query-2.png)

9. Report generation

- Right click ot .report file and choose generate 

![generate-report](../../../images/reports/generate-report.png)

- Choose Application Report - Table for template and enter needed information in the next dialog

![generate-report-template](../../../images/reports/generate-report-template.png)

![generate-second-template](../../../images/reports/generate-second-template.png)

- Publish the project

![publish-report](../../../images/reports/publish-report.png)

- Open the index.html and view the report

![open-index](../../../images/reports/open-index.png)

![report-table-2](../../../images/reports/report-table-2.png)

- You can now filter by date

![filter](../../../images/reports/filter.png)













