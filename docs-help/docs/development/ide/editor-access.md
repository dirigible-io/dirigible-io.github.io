---
title: Access Editor
---

Access Editor
===


The **Access** editor lets you manage access to your project. The editor works with security constraints files (`*.access`). You can create multiple access constraints within your project as part of one security constraints file.  

![Access Editor](../../../images/accesseditor.png)

## Create a Security Constraints File 

1. Right-click on your project in the **Workspace** view and choose **New** **&rarr;** **Access Constraints**.

    ![New Security Constraint](../../../images/securityconstraint.png)

2. Enter a name for the security constraints file.

    ![Security Constraints File Name](../../../images/securityconstraint_name.png)



## Create an Access Constraint

1. Double-click on your security constraints file to open it in the **Access** editor.

    ![Access Editor](../../../images/access_editor1.png)

2. Choose **New** (<kbd>+</kbd>).

    ![New Constraint](../../../images/new_constraint.png)

3. In the **Create Constraint** dialog, fill in the path to the file for which you're creating the access constraint in the **Path** field.

4. Choose an HTTP or CMIS method for which the access constraint will be valid in the **Method** field.

5. Select HTTP or CMIS scope from the drop-down list in the **Scope** field.

6. Fill in a role for which the access constraint is valid in the **Roles** field.

7. Choose **Save**.

    ![Dialog Create Constraint](../../../images/dialog_create_constraint.png)