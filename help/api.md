---
layout: help
title: API
icon: fa-question-circle
---

API
===

There are several predefined injected objects which can be used directly from the script code:

* *context* - a standard [Map](http://docs.oracle.com/javase/6/docs/api/java/util/Map.html) that can be used as a context holder during execution.

* *out* - the standard [System](http://docs.oracle.com/javase/7/docs/api/java/lang/System.html) output, which is redirected to the trace file.

* *datasource* - the default JDBC [Datasource](http://docs.oracle.com/javase/7/docs/api/javax/sql/DataSource.html) configured at server instance level.

* *db* - an utillity object with methods:
	* <code>int createSequence(String sequenceName, int start)</code>
	* <code>int getNext(String sequenceName)</code>
	* <code>int dropSequence(String sequenceName)</code>
	* <code>boolean existSequence(String sequenceName)</code>
	* <code>String createLimitAndOffset(String limit, String offset)</code> - used for paging
	* <code>String createTopAndStart(int limit, int offset)</code> - used for paging

* *request* - the standard [HttpServletRequest](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html) object

* *response* - the standard [HttpServletResponse](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletResponse.html) object

* *user* - the name of the current logged-in user

* *repository* - the reference to Dirigible Content Repository

* *io* - Apache Commons [IOUtils](http://commons.apache.org/proper/commons-io/apidocs/org/apache/commons/io/IOUtils.html)

* *http* - Apache Commons [Http Client](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/overview-tree.html) wrapped utility object with methods:
	* <code>[HttpGet](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/client/methods/HttpGet.html) createGet(String strURL)</code>
	* <code>[HttpPost](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/client/methods/HttpPost.html) createPost(String strURL)</code>
	* <code>[HttpPut](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/client/methods/HttpPut.html) createPut(String strURL)</code>
	* <code>[HttpDelete](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/client/methods/HttpDelete.html) createDelete(String strURL)</code>
	* <code>[DefaultHttpClient](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/impl/client/DefaultHttpClient.html) createHttpClient()</code>
	* <code>void consume([HttpEntity](http://hc.apache.org/httpcomponents-core-4.2.x/httpcore/apidocs/org/apache/http/HttpEntity.html) entity)</code>

* *base64* - Apache Commons Codecs [Base64](http://commons.apache.org/proper/commons-codec/apidocs/org/apache/commons/codec/binary/Base64.html)
* *hex* - Apache Commons Codecs [Hex](http://commons.apache.org/proper/commons-codec/apidocs/org/apache/commons/codec/binary/Hex.html)
* *digest* - Apache Commons Codecs [Digest](http://commons.apache.org/proper/commons-codec/apidocs/org/apache/commons/codec/digest/DigestUtils.html)
* *xss* - Apache Commons [StringEscapeUtils](http://commons.apache.org/proper/commons-lang/javadocs/api-3.1/org/apache/commons/lang3/StringEscapeUtils.html)

* *upload* - Apache Commons [File Upload Servlet](http://commons.apache.org/proper/commons-fileupload/apidocs/org/apache/commons/fileupload/servlet/ServletFileUpload.html)

* *url* - [URLEncode](http://docs.oracle.com/javase/6/docs/api/java/net/URLEncoder.html) and [URLDecoder](http://docs.oracle.com/javase/6/docs/api/java/net/URLDecoder.html) wrapped in an object with methods:
	* <code>void encode(String s, String enc)</code>  
	* <code>void decode(String s, String enc)</code>

* *uuid* - Universally Unique Identifier ([UUID](http://docs.oracle.com/javase/6/docs/api/java/util/UUID.html)) 128-bit generator

* *input* - the object representing a [Message](http://camel.apache.org/maven/current/camel-core/apidocs/org/apache/camel/Message.html) body in case of Route step

* *extensionManager* - the [object](http://www.dirigible.io/apidocs/com/sap/dirigible/repository/ext/extensions/ExtensionManager.html) holding the [extension points and extensions](extension_definitions.html) meta-data.

* *indexer* - utility uses [Apache Lucene](http://lucene.apache.org/). Method <code>getIndex([index name])</code> returns a [CustomMemoryIndexer](http://www.dirigible.io/apidocs/com/sap/dirigible/repository/ext/lucene/CustomMemoryIndexer.html) instance

* *wiki* - [Confluence](https://confluence.atlassian.com/display/DOC/Confluence+Wiki+Markup) to HTML converter utility. Method <code>toHtml([confluence text])</code> renders it as HTML, as also shown [here](../samples/confluence_to_html.html).

* *storage* - simple binary storage - <code>put(path, data)</code>, <code>get(path)</code>, <code>clear()</code> and <code>delete(path)</code> are supported

* *xml* - XML to JSON and vice-versa: <code>toJson(xmlString)</code> and <code>fromJson(jsonString)</code>

Full Javadoc can be found at [Dirigible API](http://www.dirigible.io/apidocs).

Samples about how to use the APIs can be found at [Dirigible Samples](http://samples.dirigible.io).
