---
layout: api
title: CMIS
icon: fa-check
---

{{ page.title }}
===

CMIS object is used for access of the underlying Content Management System (CMS) with [CMIS API](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html).


Version 4.x
---

- Module: **cms/v4/cmis**
- Alias: **cms/cmis**
- Definition: [https://github.com/eclipse/dirigible/issues/178](https://github.com/eclipse/dirigible/issues/178)
- Source: [/cms/v4/cmis.js](https://github.com/dirigiblelabs/api-cms/blob/master/cms/v4/cmis.js)
- Facade: [CmisFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-cms/src/main/java/org/eclipse/dirigible/api/v3/cms/CmisFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var cmis = require("cms/v4/cmis");
var response = require("http/v4/response");
var streams = require("io/v4/streams");

var cmisSession = cmis.getSession();

var rootFolder = cmisSession.getRootFolder();

var children = rootFolder.getChildren();
response.println("Listing the children of the root folder:");
for (var i in children) {
    response.println("Object ID: " + children[i].getId());
    response.println("Object Name: " + children[i].getName());
}

var textFileName = "test.txt";
response.println("Creating a simple text file, " + textFileName);

var mimetype = "text/plain; charset=UTF-8";
var content = "This is some test content.";
var filename = textFileName;

var outputStream = streams.createByteArrayOutputStream();
outputStream.writeText(content);
var bytes = outputStream.getBytes();
var inputStream = streams.createByteArrayInputStream(bytes);

var contentStream = cmisSession.getObjectFactory().createContentStream(filename, bytes.length, mimetype, inputStream);

var properties = {};
properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_DOCUMENT;
properties[cmis.NAME] = filename;
var newDocument;
try {
    newDocument = rootFolder.createDocument(properties, contentStream, cmis.VERSIONING_STATE_MAJOR);
} catch(e) {
    response.println("Error: " + e);	
}
var documentId = newDocument.getId();
response.println("Document ID: " + documentId);

children = rootFolder.getChildren();
response.println("Listing the children of the root folder again:");
for (var i in children) {
    response.println("Object ID: " + children[i].getId());
    response.println("Object Name: " + children[i].getName());
    response.println("Object Type: " + children[i].getType());
}

// Get the contents of the file
var doc = cmisSession.getObject(documentId);
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
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getSession()**   | Returns the CMIS connection session to the CMS system | *Session*

#### Objects

---

##### Session

Function     | Description | Returns
------------ | ----------- | --------
**getRepositoryInfo()**   | Returns the information about the CMIS repository | *RepositoryInfo*
**getObjectFactory()**   | Returns the ObjectFactory utility | *ObjectFactory*
**getRootFolder()**   | Returns the root folder of this repository | *Folder*
**getObject()**   | Returns a CMIS Object by name | *CmisObject*
**getObjectByPath()**   | Returns a CMIS Object by path | *CmisObject*


##### RepositoryInfo

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of the CMIS repository | *string*
**getName()**   | Returns the Name of the CMIS repository | *string*


##### ObjectFactory

Function     | Description | Returns
------------ | ----------- | --------
**createContentStream()**   | Returns a newly created ContentStream object | *ContentStream*


##### ContentStream

Function     | Description | Returns
------------ | ----------- | --------
**getStream()**   | Returns the InputStream of this ContentStream object | *streams.InputStream*


##### CmisObject

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of this CmisObject | *string*
**getName()**   | Returns the Name of this CmisObject | *string*
**getType()**   | Returns the Type of this CmisObject | *string*
**delete()**   | Deletes this CmisObject | *string*
**rename(newName)**   | Renames this CmisObject | *-*


##### Folder

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


##### Document

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of this Document | *string*
**getName()**   | Returns the Name of this Document | *string*
**delete()**   | Deletes this Document | *string*
**getContentStream()**   | Returns the ContentStream representing the contents of this Document | *ContentStream*
**rename(newName)**   | Renames this Document | *-*



#### Constants

---

##### Base

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


##### Document

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


##### Folder

Constant     | Description | Type
------------ | ----------- | --------
**PARENT_ID**   | Value is *cmis:parentId* | *string*
**ALLOWED_CHILD_OBJECT_TYPE_IDS**   | Value is *cmis:allowedChildObjectTypeIds* | *string*
**PATH**   | Value is *cmis:path* | *string*


##### Relationship

Constant     | Description | Type
------------ | ----------- | --------
**SOURCE_ID**   | Value is *cmis:sourceId* | *string*
**TARGET_ID**   | Value is *cmis:targetId* | *string*


##### Relationship

Constant     | Description | Type
------------ | ----------- | --------
**POLICY_TEXT**   | Value is *cmis:policyText* | *string*


##### Versioning States

Constant     | Description | Type
------------ | ----------- | --------
**VERSIONING_STATE_NONE**   | Value is *none* | *string*
**VERSIONING_STATE_MAJOR**   | Value is *major* | *string*
**VERSIONING_STATE_MINOR**   | Value is *minor* | *string*
**VERSIONING_STATE_CHECKEDOUT**   | Value is *checkedout* | *string*


##### Object Types

Constant     | Description | Type
------------ | ----------- | --------
**OBJECT_TYPE_DOCUMENT**   | Value is *cmis:document* | *string*
**OBJECT_TYPE_FOLDER**   | Value is *cmis:folder* | *string*
**OBJECT_TYPE_RELATIONSHIP**   | Value is *cmis:relationship* | *string*
**OBJECT_TYPE_POLICY**   | Value is *cmis:policy* | *string*
**OBJECT_TYPE_ITEM**   | Value is *cmis:item* | *string*
**OBJECT_TYPE_SECONDARY**   | Value is *cmis:secondary* | *string*



### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |


---

Version 3.x
---

- Module: **cms/v3/cmis**
- Alias: **cms/cmis**
- Definition: [https://github.com/eclipse/dirigible/issues/178](https://github.com/eclipse/dirigible/issues/178)
- Source: [/cms/v3/cmis.js](https://github.com/dirigiblelabs/api-cms/blob/master/cms/v3/cmis.js)
- Facade: [CmisFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-cms/src/main/java/org/eclipse/dirigible/api/v3/cms/CmisFacade.java)
- Status: **alpha**


### Basic Usage

```javascript
var cmis = require("cms/v3/cmis");
var response = require("http/v3/response");
var streams = require("io/v3/streams");

var cmisSession = cmis.getSession();

var rootFolder = cmisSession.getRootFolder();

var children = rootFolder.getChildren();
response.println("Listing the children of the root folder:");
for (var i in children) {
    response.println("Object ID: " + children[i].getId());
    response.println("Object Name: " + children[i].getName());
}

var textFileName = "test.txt";
response.println("Creating a simple text file, " + textFileName);

var mimetype = "text/plain; charset=UTF-8";
var content = "This is some test content.";
var filename = textFileName;

var outputStream = streams.createByteArrayOutputStream();
outputStream.writeText(content);
var bytes = outputStream.getBytes();
var inputStream = streams.createByteArrayInputStream(bytes);

var contentStream = cmisSession.getObjectFactory().createContentStream(filename, bytes.length, mimetype, inputStream);

var properties = {};
properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_DOCUMENT;
properties[cmis.NAME] = filename;
var newDocument;
try {
    newDocument = rootFolder.createDocument(properties, contentStream, cmis.VERSIONING_STATE_MAJOR);
} catch(e) {
    response.println("Error: " + e);	
}
var documentId = newDocument.getId();
response.println("Document ID: " + documentId);

children = rootFolder.getChildren();
response.println("Listing the children of the root folder again:");
for (var i in children) {
    response.println("Object ID: " + children[i].getId());
    response.println("Object Name: " + children[i].getName());
    response.println("Object Type: " + children[i].getType());
}

// Get the contents of the file
var doc = cmisSession.getObject(documentId);
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
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getSession()**   | Returns the CMIS connection session to the CMS system | *Session*

#### Objects

---

##### Session

Function     | Description | Returns
------------ | ----------- | --------
**getRepositoryInfo()**   | Returns the information about the CMIS repository | *RepositoryInfo*
**getObjectFactory()**   | Returns the ObjectFactory utility | *ObjectFactory*
**getRootFolder()**   | Returns the root folder of this repository | *Folder*
**getObject()**   | Returns a CMIS Object by name | *CmisObject*
**getObjectByPath()**   | Returns a CMIS Object by path | *CmisObject*


##### RepositoryInfo

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of the CMIS repository | *string*
**getName()**   | Returns the Name of the CMIS repository | *string*


##### ObjectFactory

Function     | Description | Returns
------------ | ----------- | --------
**createContentStream()**   | Returns a newly created ContentStream object | *ContentStream*


##### ContentStream

Function     | Description | Returns
------------ | ----------- | --------
**getStream()**   | Returns the InputStream of this ContentStream object | *streams.InputStream*


##### CmisObject

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of this CmisObject | *string*
**getName()**   | Returns the Name of this CmisObject | *string*
**getType()**   | Returns the Type of this CmisObject | *string*
**delete()**   | Deletes this CmisObject | *string*
**rename(newName)**   | Renames this CmisObject | *-*


##### Folder

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


##### Document

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of this Document | *string*
**getName()**   | Returns the Name of this Document | *string*
**delete()**   | Deletes this Document | *string*
**getContentStream()**   | Returns the ContentStream representing the contents of this Document | *ContentStream*
**rename(newName)**   | Renames this Document | *-*



#### Constants

---

##### Base

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


##### Document

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


##### Folder

Constant     | Description | Type
------------ | ----------- | --------
**PARENT_ID**   | Value is *cmis:parentId* | *string*
**ALLOWED_CHILD_OBJECT_TYPE_IDS**   | Value is *cmis:allowedChildObjectTypeIds* | *string*
**PATH**   | Value is *cmis:path* | *string*


##### Relationship

Constant     | Description | Type
------------ | ----------- | --------
**SOURCE_ID**   | Value is *cmis:sourceId* | *string*
**TARGET_ID**   | Value is *cmis:targetId* | *string*


##### Relationship

Constant     | Description | Type
------------ | ----------- | --------
**POLICY_TEXT**   | Value is *cmis:policyText* | *string*


##### Versioning States

Constant     | Description | Type
------------ | ----------- | --------
**VERSIONING_STATE_NONE**   | Value is *none* | *string*
**VERSIONING_STATE_MAJOR**   | Value is *major* | *string*
**VERSIONING_STATE_MINOR**   | Value is *minor* | *string*
**VERSIONING_STATE_CHECKEDOUT**   | Value is *checkedout* | *string*


##### Object Types

Constant     | Description | Type
------------ | ----------- | --------
**OBJECT_TYPE_DOCUMENT**   | Value is *cmis:document* | *string*
**OBJECT_TYPE_FOLDER**   | Value is *cmis:folder* | *string*
**OBJECT_TYPE_RELATIONSHIP**   | Value is *cmis:relationship* | *string*
**OBJECT_TYPE_POLICY**   | Value is *cmis:policy* | *string*
**OBJECT_TYPE_ITEM**   | Value is *cmis:item* | *string*
**OBJECT_TYPE_SECONDARY**   | Value is *cmis:secondary* | *string*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---

Version 2.x
---

- Module: **doc/cmis**
- Definition: [/core_api/issues/42](https://github.com/dirigiblelabs/core_api/issues/42)
- Source: [/doc/cmis.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/doc/cmis.js)
- Status: **beta**


### Basic Usage

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var cmis = require('doc/cmis');
var response = require('net/http/response');
var streams = require('io/streams');

var cmisSession = cmis.getSession();

var rootFolder = cmisSession.getRootFolder();

var children = rootFolder.getChildren();
response.println("Listing the children of the root folder:");
for (var i in children) {
	response.println("Object ID: " + children[i].getId());
	response.println("Object Name: " + children[i].getName());
}


var textFileName = "test.txt";
response.println("Creating a simple text file, " + textFileName);

var mimetype = "text/plain; charset=UTF-8";
var content = "This is some test content.";
var filename = textFileName;

var outputStream = streams.createByteArrayOutputStream();
streams.writeText(outputStream, content);
var bytes = outputStream.getBytes();
var inputStream = streams.createByteArrayInputStream(bytes);

var contentStream = cmisSession.getObjectFactory().createContentStream(filename, bytes.length, mimetype, inputStream);

var properties = {};
properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_DOCUMENT;
properties[cmis.NAME] = filename;
var newDocument;
try {
	newDocument = rootFolder.createDocument(properties, contentStream, cmis.VERSIONING_STATE_MAJOR);
} catch(e) {
	response.println("Error: " + e);
}
var documentId = newDocument.getId();
response.println("Document ID: " + documentId);

children = rootFolder.getChildren();
response.println("Listing the children of the root folder again:");
for (var i in children) {
	response.println("Object ID: " + children[i].getId());
	response.println("Object Name: " + children[i].getName());
	response.println("Object Type: " + children[i].getType());
}

// Get the contents of the file
var doc = cmisSession.getObject(documentId);
contentStream = doc.getContentStream(); // returns null if the document has no content
if (contentStream !== null) {
    content = streams.readText(contentStream.getStream());
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


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getSession()**   | Returns the CMIS connection session to the CMS system | *Session*

#### Objects

---

##### Session

Function     | Description | Returns
------------ | ----------- | --------
**getRepositoryInfo()**   | Returns the information about the CMIS repository | *RepositoryInfo*
**getObjectFactory()**   | Returns the ObjectFactory utility | *ObjectFactory*
**getRootFolder()**   | Returns the root folder of this repository | *Folder*
**getObject()**   | Returns a CMIS Object by name | *CmisObject*
**getObjectByPath()**   | Returns a CMIS Object by path | *CmisObject*


##### RepositoryInfo

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of the CMIS repository | *string*
**getName()**   | Returns the Name of the CMIS repository | *string*


##### ObjectFactory

Function     | Description | Returns
------------ | ----------- | --------
**createContentStream()**   | Returns a newly created ContentStream object | *ContentStream*


##### ContentStream

Function     | Description | Returns
------------ | ----------- | --------
**getStream()**   | Returns the InputStream of this ContentStream object | *streams.InputStream*


##### CmisObject

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of this CmisObject | *string*
**getName()**   | Returns the Name of this CmisObject | *string*
**getType()**   | Returns the Type of this CmisObject | *string*
**delete()**   | Deletes this CmisObject | *string*
**rename(newName)**   | Renames this CmisObject | *-*


##### Folder

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


##### Document

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the ID of this Document | *string*
**getName()**   | Returns the Name of this Document | *string*
**delete()**   | Deletes this Document | *string*
**getContentStream()**   | Returns the ContentStream representing the contents of this Document | *ContentStream*
**rename(newName)**   | Renames this Document | *-*



#### Constants

---

##### Base

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


##### Document

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


##### Folder

Constant     | Description | Type
------------ | ----------- | --------
**PARENT_ID**   | Value is *cmis:parentId* | *string*
**ALLOWED_CHILD_OBJECT_TYPE_IDS**   | Value is *cmis:allowedChildObjectTypeIds* | *string*
**PATH**   | Value is *cmis:path* | *string*


##### Relationship

Constant     | Description | Type
------------ | ----------- | --------
**SOURCE_ID**   | Value is *cmis:sourceId* | *string*
**TARGET_ID**   | Value is *cmis:targetId* | *string*


##### Relationship

Constant     | Description | Type
------------ | ----------- | --------
**POLICY_TEXT**   | Value is *cmis:policyText* | *string*


##### Versioning States

Constant     | Description | Type
------------ | ----------- | --------
**VERSIONING_STATE_NONE**   | Value is *none* | *string*
**VERSIONING_STATE_MAJOR**   | Value is *major* | *string*
**VERSIONING_STATE_MINOR**   | Value is *minor* | *string*
**VERSIONING_STATE_CHECKEDOUT**   | Value is *checkedout* | *string*


##### Object Types

Constant     | Description | Type
------------ | ----------- | --------
**OBJECT_TYPE_DOCUMENT**   | Value is *cmis:document* | *string*
**OBJECT_TYPE_FOLDER**   | Value is *cmis:folder* | *string*
**OBJECT_TYPE_RELATIONSHIP**   | Value is *cmis:relationship* | *string*
**OBJECT_TYPE_POLICY**   | Value is *cmis:policy* | *string*
**OBJECT_TYPE_ITEM**   | Value is *cmis:item* | *string*
**OBJECT_TYPE_SECONDARY**   | Value is *cmis:secondary* | *string*



### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

---
