---
layout: help
title: API
icon: fa-question-circle
---

API
===

There are several predefined injected APIs, which can be used directly from the script code. The new version promotes use of holder object *$* and corresponding getters. There are four major types of injected APIs - objects, services, utilities and extensions:

Objects
---

* *context* - a standard [Map](http://docs.oracle.com/javase/6/docs/api/java/util/Map.html) that can be used as a context holder during execution.

> $.getExecutionContext();

* * *

* *out* - the standard [System](http://docs.oracle.com/javase/7/docs/api/java/lang/System.html) output, which is redirected to the trace file.

> $.getSystemOutput();

* * *

* *datasource* - the default JDBC [Datasource](http://docs.oracle.com/javase/7/docs/api/javax/sql/DataSource.html) configured at server instance level.

> $.getDatasource();

* * *

* *request* - the standard [HttpServletRequest](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html) object

> $.getRequest();

* * *

* *response* - the standard [HttpServletResponse](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletResponse.html) object

> $.getResponse();

* * *

* *session* - the standard [HttpSession](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpSession.html) object

> $.getSession();

* * *

* *repository* - the reference to Dirigible's Content [Repository](https://github.com/eclipse/dirigible/blob/6cd8f957f0eb3ae2140bd37aa11e433e5a48e1f1/org.eclipse.dirigible/org.eclipse.dirigible.parent/repository/org.eclipse.dirigible.repository.api/src/org/eclipse/dirigible/repository/api/IRepository.java)

> $.getRepository();

* * *

* *input* - the standard Request's input stream [InputStream](http://docs.oracle.com/javase/6/docs/api/java/io/InputStream.html) object

> $.getRequestInput();

* * *

* *user* - the name of the current logged-in user
	
> $.getUserName();

* * *

* *jndi* - the standard JNDI [InitialContext](https://docs.oracle.com/javase/6/docs/api/javax/naming/InitialContext.html)

> $.getInitialContext();

* * *

* *storage* - simple binary storage - <code>put(path, data)</code>, <code>get(path)</code>, <code>clear()</code> and <code>delete(path)</code> are supported. Interface can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.core/src/org/eclipse/dirigible/runtime/scripting/IStorage.java).

> $.getBinaryStorage();

* * *

* *fileStorage* - simple file storage - <code>put(path, data)</code>, <code>get(path)</code>, <code>clear()</code> and <code>delete(path)</code> are supported. Interface can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.core/src/org/eclipse/dirigible/runtime/scripting/IStorage.java).

> $.getFileStorage();

* * *

* *config* - simple configuration storage - <code>put(path, data)</code>, <code>get(path)</code>, <code>clear()</code> and <code>delete(path)</code> are supported. Interface can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.core/src/org/eclipse/dirigible/runtime/scripting/IStorage.java).

> $.getConfigurationStorage();

* * *

Services
---

* *mail* - a service linking the underlying mail server provided by the platform. Interface can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.core/src/org/eclipse/dirigible/runtime/scripting/IMailService.java).

> $.getMailService();

* * *

* *extensionManager* - the [service](https://github.com/eclipse/dirigible/blob/89b198692f9a16d66c6fa51b077471492f4f7148/org.eclipse.dirigible/org.eclipse.dirigible.parent/repository/org.eclipse.dirigible.repository.ext/src/org/eclipse/dirigible/repository/ext/extensions/IExtensionService.java) holding the [extension points and extensions](extension_definitions.html) meta-data.

> $.getExtensionService();

* * *

* *indexer* - indexing service uses [Apache Lucene](http://lucene.apache.org/). Method <code>getIndex([index name])</code> returns an [IIndex](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/repository/org.eclipse.dirigible.repository.ext/src/org/eclipse/dirigible/repository/ext/indexing/IIndex.java) instance. Interface can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.core/src/org/eclipse/dirigible/runtime/scripting/IIndexingService.java).

> $.getIndexingService();

* * *

* *messageHub* - passive message hub with functions: <code>subscribe(client, topic)</code>, <code>send(client, topic, subject, body)</code>, <code>receive(client, topic?)</code>. Optional functions: <code>registerClient(client)</code>, <code>registerTopic(client)</code>, <code>cleanup()</code>. Interface can be found [here](https://github.com/eclipse/dirigible/blob/89b198692f9a16d66c6fa51b077471492f4f7148/org.eclipse.dirigible/org.eclipse.dirigible.parent/repository/org.eclipse.dirigible.repository.ext/src/org/eclipse/dirigible/repository/ext/messaging/IMessagingService.java).

> $.getMessagingService();

* * *

* *connectivity* - a service linking the underlying configuration sorage provided by the platform. Interface can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.core/src/org/eclipse/dirigible/runtime/scripting/IConnectivityService.java).

> $.getConnectivityService();

* * *
	
Utilities
---

* *io* - Apache Commons [IOUtils](http://commons.apache.org/proper/commons-io/apidocs/org/apache/commons/io/IOUtils.html)

> $.getIOUtils();

* * *
	 
* *http* - Apache Commons [Http Client](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/overview-tree.html) wrapped utility object with methods:
	* <code>[HttpGet](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/client/methods/HttpGet.html) createGet(strURL)</code>
	* <code>[HttpPost](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/client/methods/HttpPost.html) createPost(strURL)</code>
	* <code>[HttpPut](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/client/methods/HttpPut.html) createPut(strURL)</code>
	* <code>[HttpDelete](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/client/methods/HttpDelete.html) createDelete(strURL)</code>
	* <code>[DefaultHttpClient](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/impl/client/DefaultHttpClient.html) createHttpClient()</code>
	* <code>void consume([HttpEntity](http://hc.apache.org/httpcomponents-core-4.2.x/httpcore/apidocs/org/apache/http/HttpEntity.html) entity)</code>
	Class can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.core/src/org/eclipse/dirigible/runtime/scripting/utils/HttpUtils.java).
	
> $.getHttpUtils();

* * *

* *base64* - Apache Commons Codecs [Base64](http://commons.apache.org/proper/commons-codec/apidocs/org/apache/commons/codec/binary/Base64.html)

> $.getBase64Utils();

* * *

* *hex* - Apache Commons Codecs [Hex](http://commons.apache.org/proper/commons-codec/apidocs/org/apache/commons/codec/binary/Hex.html)

> $.getHexUtils();

* * *

* *digest* - Apache Commons Codecs [Digest](http://commons.apache.org/proper/commons-codec/apidocs/org/apache/commons/codec/digest/DigestUtils.html)

> $.getDigestUtils();

* * *

* *url* - [URLEncode](http://docs.oracle.com/javase/6/docs/api/java/net/URLEncoder.html) and [URLDecoder](http://docs.oracle.com/javase/6/docs/api/java/net/URLDecoder.html) wrapped in an object with methods:
	* <code>void encode(String s, String enc)</code>  
	* <code>void decode(String s, String enc)</code>
	Class can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.core/src/org/eclipse/dirigible/runtime/scripting/utils/URLUtils.java).

> $.getUrlUtils();

* * *

* *upload* - Apache Commons [File Upload Servlet](http://commons.apache.org/proper/commons-fileupload/apidocs/org/apache/commons/fileupload/servlet/ServletFileUpload.html)

> $.getUploadUtils();

* * *

* *uuid* - Universally Unique Identifier ([UUID](http://docs.oracle.com/javase/6/docs/api/java/util/UUID.html)) 128-bit generator

> $.getUuidUtils();

* * *

* *db* - an utillity object with methods:
	* <code>createSequence(sequenceName, start)</code>
	* <code>getNext(sequenceName)</code>
	* <code>dropSequence(sequenceName)</code>
	* <code>existSequence(sequenceName)</code>
	* <code>createLimitAndOffset(limit, offset)</code> - used for paging
	* <code>createTopAndStart(limit, offset)</code> - used for paging
	Class can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/repository/org.eclipse.dirigible.repository.ext/src/org/eclipse/dirigible/repository/ext/db/DBUtils.java).

> $.getDatabaseUtils();

* * *

* *xss* - Apache Commons [StringEscapeUtils](http://commons.apache.org/proper/commons-lang/javadocs/api-3.1/org/apache/commons/lang3/StringEscapeUtils.html)

> $.getXssUtils();

* * *

* *xml* - XML to JSON and vice-versa: <code>toJson(xmlString)</code> and <code>fromJson(jsonString)</code>.
  Class can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.core/src/org/eclipse/dirigible/runtime/scripting/utils/XMLUtils.java).

> $.getXmlUtils();

* * *

* *get* - getter for instance parameters

> $.get(key);

* * *
	
* *set* - setter for instance parameters

> $.set(key, value);

* * *

Extensions
---

* *wiki* - [Confluence](https://confluence.atlassian.com/display/DOC/Confluence+Wiki+Markup) to HTML converter utility. 
	Method <code>toHtml([confluence text])</code> renders it as HTML. The latest version supports also Markdown, Textile, TracWiki and TWiki.
	Class can be found [here](https://github.com/eclipse/dirigible/blob/c68c51f112b9d55f9c5dbf0f3589d11bfd3b22b0/org.eclipse.dirigible/org.eclipse.dirigible.parent/runtime/org.eclipse.dirigible.runtime.wiki/src/org/eclipse/dirigible/runtime/wiki/WikiUtils.java).

> $.get("wiki");

* * *


Samples about how to use the APIs can be found at [Dirigible Samples](http://samples.dirigible.io).
