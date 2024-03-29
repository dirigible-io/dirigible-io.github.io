---
title: CMIS
---

CMIS
===

CMIS object is used for access of the underlying Content Management System (CMS) with [CMIS API](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html).


=== "Overview"
- Module: `cms/cmis`
- Definition: [https://github.com/eclipse/dirigible/issues/178](https://github.com/eclipse/dirigible/issues/178)
- Source: [/cms/cmis.js](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/cms/cmis.ts)
- Status: `stable`
- Group: `cms`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { cmis } from "sdk/cms";
    import { response } from "sdk/http";
    import { streams } from "sdk/io";


    let cmisSession = cmis.getSession();

    let rootFolder = cmisSession.getRootFolder();

    let children = rootFolder.getChildren();
    response.println("Listing the children of the root folder:");
    for (let i in children) {
        response.println("Object ID: " + children[i].getId());
        response.println("Object Name: " + children[i].getName());
    }

    const textFileName = "test.txt";
    response.println("Creating a simple text file, " + textFileName);

    const mimetype = "text/plain; charset=UTF-8";
    let content = "This is some test content.";
    let filename = textFileName;

    let outputStream = streams.createByteArrayOutputStream();
    outputStream.writeText(content);
    let bytes = outputStream.getBytes();
    let inputStream = streams.createByteArrayInputStream(bytes);

    let contentStream = cmisSession.getObjectFactory().createContentStream(filename, bytes.length, mimetype, inputStream);

    let properties = { "cmis:name": "", "cmis:objectTypeId": "" };
    properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_DOCUMENT;
    properties[cmis.NAME] = filename;
    let newDocument;
    try {
        newDocument = rootFolder.createDocument(properties, contentStream, cmis.VERSIONING_STATE_MAJOR);
    } catch (e) {
        response.println("Error: " + e);
    }
    let documentId = newDocument?.getId();

    response.println("Document ID: " + documentId);

    children = rootFolder.getChildren();
    response.println("Listing the children of the root folder again:");
    for (let i in children) {
        response.println("Object ID: " + children[i].getId());
        response.println("Object Name: " + children[i].getName());
        response.println("Object Type: " + JSON.stringify(children[i].getType().getId().toString()));
    }

    // Get the contents of the file
    let doc;
    if (documentId !== undefined) {
        doc = cmisSession.getObject(documentId);
    } else {
        response.println("No content");
    }

    contentStream = doc?.getContentStream(); // returns null if the document has no content
    if (contentStream !== null) {
        content = contentStream.getStream().readText();
        response.println("Contents of " + filename + " are: " + content);
    } else {
        response.println("No content.");
    }

    response.println("Deleting the newly created document");
    if (newDocument) {
        newDocument.delete();
    }

    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const cmis = require("cms/cmis");
    const response = require("http/response");
    const streams = require("io/streams");

    let cmisSession = cmis.getSession();

    let rootFolder = cmisSession.getRootFolder();

    let children = rootFolder.getChildren();
    response.println("Listing the children of the root folder:");
    for (let i in children) {
        response.println("Object ID: " + children[i].getId());
        response.println("Object Name: " + children[i].getName());
    }

    const textFileName = "test.txt";
    response.println("Creating a simple text file, " + textFileName);

    const mimetype = "text/plain; charset=UTF-8";
    const content = "This is some test content.";
    let filename = textFileName;

    let outputStream = streams.createByteArrayOutputStream();
    outputStream.writeText(content);
    let bytes = outputStream.getBytes();
    let inputStream = streams.createByteArrayInputStream(bytes);

    let contentStream = cmisSession.getObjectFactory().createContentStream(filename, bytes.length, mimetype, inputStream);

    let properties = { "cmis:name": "", "cmis:objectTypeId": "" };
    properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_DOCUMENT;
    properties[cmis.NAME] = filename;
    let newDocument;
    try {
        newDocument = rootFolder.createDocument(properties, contentStream, cmis.VERSIONING_STATE_MAJOR);
    } catch(e) {
        response.println("Error: " + e);	
    }
    let documentId = newDocument.getId();
    response.println("Document ID: " + documentId);

    children = rootFolder.getChildren();
    response.println("Listing the children of the root folder again:");
    for (let i in children) {
        response.println("Object ID: " + children[i].getId());
        response.println("Object Name: " + children[i].getName());
        response.println("Object Type: " + children[i].getType());
    }

    // Get the contents of the file
    let doc = cmisSession.getObject(documentId);
    contentStream = doc.getContentStream(); // returns null if the document has no content
    if (contentStream !== null) {
        content = contentStream.getStream().readText();
        response.println("Contents of " + filename + " are: " + content);
    } else {
        response.println("No content.");
    }

    response.println("Deleting the newly created document");
    if (newDocument) {
        newDocument.delete();
    }

    response.flush();
    response.close();
    ``` -->


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getSession()**   | Returns the CMIS connection session to the CMS system | *Session*
**getAccessDefinitions(path, method)**   | Returns array of CMIS access constraints for the specified path and method | *array of objects*


### Objects

---

#### Session

Function     | Description | Returns
------------ | ----------- | --------
**getRepositoryInfo()**   | Returns the information about the CMIS repository | *RepositoryInfo*
**getObjectFactory()**   | Returns the ObjectFactory utility | *ObjectFactory*
**getRootFolder()**   | Returns the root folder of this repository | *Folder*
**getObject()**   | Returns a CMIS Object by name | *CmisObject*
**getObjectByPath()**   | Returns a CMIS Object by path | *CmisObject*


#### RepositoryInfo

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of the CMIS repository | *string*
**getName()**   | Returns the Name of the CMIS repository | *string*


#### ObjectFactory

Function     | Description | Returns
------------ | ----------- | --------
**createContentStream()**   | Returns a newly created ContentStream object | *ContentStream*


#### ContentStream

Function     | Description | Returns
------------ | ----------- | --------
**getStream()**   | Returns the InputStream of this ContentStream object | *streams.InputStream*


#### CmisObject

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of this CmisObject | *string*
**getName()**   | Returns the Name of this CmisObject | *string*
**getType()**   | Returns the Type of this CmisObject | *string*
**delete()**   | Deletes this CmisObject | *string*
**rename(newName)**   | Renames this CmisObject | *-*


#### Folder

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of this Folder | *string*
**getName()**   | Returns the Name of this Folder | *string*
**getPath()**   | Returns the Path of this Folder | *string*
**createFolder(properties)**   | Creates a new folder under this Folder | *Folder*
**createDocument(properties, contentStream, versioningState)**   | Creates a new document under this Folder | *Document*
**getChildren()**   | Returns an array of CmisObject sub-elements of this Folder | *array of CmisObject*
**isRootFolder()**   | Returns true if this Folder is a root folder and false otherwise | *boolean*
**getFolderParent()**   | Returns the parent Folder of this Folder | *Folder*
**delete()**   | Deletes this Folder | *string*
**rename(newName)**   | Renames this Folder | *-*


#### Document

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of this Document | *string*
**getName()**   | Returns the Name of this Document | *string*
**delete()**   | Deletes this Document | *string*
**getContentStream()**   | Returns the ContentStream representing the contents of this Document | *ContentStream*
**rename(newName)**   | Renames this Document | *-*



### Constants

---

#### Base

Constant     | Description | Type
------------ | ----------- | --------
**NAME**   | Value is *cmis:name* | *string*
**OBJECT_ID**   | Value is *cmis:objectId* | *string*
**OBJECT_TYPE_ID**   | Value is *cmis:objectTypeId* | *string*
**BASE_TYPE_ID**   | Value is *cmis:baseTypeId* | *string*
**CREATED_BY**   | Value is *cmis:createdBy* | *string*
**CREATION_DATE**   | Value is *cmis:creationDate* | *string*
**LAST_MODIFIED_BY**   | Value is *cmis:lastModifiedBy* | *string*
**LAST_MODIFICATION_DATE**   | Value is *cmis:lastModificationDate* | *string*
**CHANGE_TOKEN**   | Value is *mis:changeToken* | *string*


#### Document

Constant     | Description | Type
------------ | ----------- | --------
**IS_IMMUTABLE**   | Value is *cmis:isImmutable* | *string*
**IS_LATEST_VERSION**   | Value is *cmis:isLatestVersion* | *string*
**IS_MAJOR_VERSION**   | Value is *cmis:isMajorVersion* | *string*
**IS_LATEST_MAJOR_VERSION**   | Value is *cmis:isLatestMajorVersion* | *string*
**VERSION_LABEL**   | Value is *cmis:versionLabel* | *string*
**VERSION_SERIES_ID**   | Value is *ccmis:versionSeriesId* | *string*
**IS_VERSION_SERIES_CHECKED_OUT**   | Value is *cmis:isVersionSeriesCheckedOut* | *string*
**VERSION_SERIES_CHECKED_OUT_BY**   | Value is *cmis:versionSeriesCheckedOutBy* | *string*
**VERSION_SERIES_CHECKED_OUT_ID**   | Value is *cmis:versionSeriesCheckedOutId* | *string*
**CHECKIN_COMMENT**   | Value is *cmis:checkinComment* | *string*
**CONTENT_STREAM_LENGTH**   | Value is *cmis:contentStreamLength* | *string*
**CONTENT_STREAM_MIME_TYPE**   | Value is *cmis:contentStreamMimeType* | *string*
**CONTENT_STREAM_FILE_NAME**   | Value is *cmis:contentStreamFileName* | *string*
**CONTENT_STREAM_ID**   | Value is *cmis:contentStreamId* | *string*


#### Folder

Constant     | Description | Type
------------ | ----------- | --------
**PARENT_ID**   | Value is *cmis:parentId* | *string*
**ALLOWED_CHILD_OBJECT_TYPE_IDS**   | Value is *cmis:allowedChildObjectTypeIds* | *string*
**PATH**   | Value is *cmis:path* | *string*


#### Relationship

Constant     | Description | Type
------------ | ----------- | --------
**SOURCE_ID**   | Value is *cmis:sourceId* | *string*
**TARGET_ID**   | Value is *cmis:targetId* | *string*


#### Relationship

Constant     | Description | Type
------------ | ----------- | --------
**POLICY_TEXT**   | Value is *cmis:policyText* | *string*


#### Versioning States

Constant     | Description | Type
------------ | ----------- | --------
**VERSIONING_STATE_NONE**   | Value is *none* | *string*
**VERSIONING_STATE_MAJOR**   | Value is *major* | *string*
**VERSIONING_STATE_MINOR**   | Value is *minor* | *string*
**VERSIONING_STATE_CHECKEDOUT**   | Value is *checkedout* | *string*


#### Object Types

Constant     | Description | Type
------------ | ----------- | --------
**OBJECT_TYPE_DOCUMENT**   | Value is *cmis:document* | *string*
**OBJECT_TYPE_FOLDER**   | Value is *cmis:folder* | *string*
**OBJECT_TYPE_RELATIONSHIP**   | Value is *cmis:relationship* | *string*
**OBJECT_TYPE_POLICY**   | Value is *cmis:policy* | *string*
**OBJECT_TYPE_ITEM**   | Value is *cmis:item* | *string*
**OBJECT_TYPE_SECONDARY**   | Value is *cmis:secondary* | *string*
