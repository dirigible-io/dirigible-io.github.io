---
title: CSVIM Editor
---

CSVIM Editor
===

The CSVIM editor in the Eclipse Dirigible IDE allows you to open, save, delete, and edit the properties of CSV files. Such properties are:

- Table

  The **Table** input field can contain letters (a-z, A-Z), numbers (0-9), hyphens (-), dots (.), underscores (_), and dollar signs ($).
  
 - Schema

   The **Schema** input field can contain letters (a-z, A-Z), numbers (0-9), hyphens (-), dots (.), underscores (_), and dollar signs ($).
   
 - File path
 
   The **File path** input field can contain letters (a-z, A-Z), numbers (0-9), hyphens (-), forward slashes (/), dots (.), underscores (_), and dollar signs ($).

   Here’s an example for a correct file path: */workspace/csv/subfolder/bigstats.csv*. In this example, the file path consists of:
   
   - *workspace*
 
     The workspace is the place where you create and manage the artifacts of your application.

   - *csv*

     This is the name of your project.
     
   - *subfolder*

     This is the subfolder that contains the CSV file.

   - *bigstats.csv*
   
     This is the CSV file.
     
   **Note:** If the file path isn’t correct, the input field will turn red, and you won’t be able to open the CSV file with the CSV editor. However, you will be able to save the CSVIM file.

 - Delimiter

   The currently supported delimiters are comma (,), tab (/t), dot (.), and vertical bar (|).

   **Note:** If you’re trying to use an unsupported character such as “+”, a warning message will pop up. Nevertheless, you will be able to open the CSV file or save the CSVIM file.

   ![unsupported_characters](https://user-images.githubusercontent.com/20664881/132522169-9a57b186-7dc2-4d05-afb8-99e5b108ff0f.png)

 - Quote character

   The currently supported quote characters are apostrophe (‘), quotation mark (“), and number sign or hash (#).

   **Note:** If you’re trying to use an unsupported character such as “^”, a warning message will pop up. Nevertheless, you will be able to open the CSV file or save the CSVIM file.

 - Keys

   Here you can add column names and column values by clicking **Add Column Row** and **Add Value**, respectively.
   
   The columns and their values in the **Keys** field can contain letters (a-z, A-Z), numbers (0-9), hyphens (-), dots (.), underscores (_), and dollar signs ($).

   **Note:** All column names and column values must be **unique**. Otherwise, you won’t be allowed to save the CSVIM file.

There are three additional customization options:

 - [ ] Header

   If you select this checkbox, your CSV file will have column headers.
   
 - [ ] Use header names
 
   If you select this checkbox, your column headers will also have a specific name.
   
 - [ ] Distinguish empty from null
 
   Selecting this checkbox will allow you to have empty row and columns in your table. If you don’t use this option, you won’t be able to have any empty fields at all.




