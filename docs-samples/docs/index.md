---
layout: samples
title: Samples
icon: fa-caret-right
---

# Eclipse Dirigible<sup>&trade;</sup> Samples

This section collects various applications created to demonstrate the main use purposes and strengths of the cloud toolkit.
They are built on scenarios with different complexity level, from exemplary samples targeting demonstration of single features to complete end-to-end applications.

#### Simple Samples

- [Decode a String from Base64](basic/base64-decode) - how to decode a string from Base64 encoded input
- [Encode a String to Base64](basic/base64-encode) - how to encode a string with Base64
- [Console Log Levels](basic/console) - show how to use the built-in **console** object to print information in the standard output
- [Database Dynamic Datasource](basic/database-dynamic) - how to use dynamic datasources
- [Database Statement](basic/database-statement) - getting started with the low level Database API
- [Database Procedure Call](basic/database-procedure-call) - call SQL Procedure through the low level Database API
- [Database Procedure - Create & Execute](basic/database-procedure) - create & execute SQL Procedure through the Database Procedure API
- [Database Query](basic/database-query) - using the simplified Query Database API
- [Encrypt a Text with SHA512](basic/digest) - how to use SHA512 to encrypt an input byte array
- [Decode a String from Hexadecimal Format](basic/hex-decode) - decoding string from HEX
- [Encode a String to Hexadecimal Format](basic/hex-encode) - encoding a string to HEX
- [HTTP Request](basic/http-request) - basic usage of the HTTP Request API
- [Convert a String from JSON to XML](basic/convert-json2xml) - JSON to XML transformation
- [Convert a String from XML to JSON](basic/convert-xml2json) - XML to JSON
- [Mail Client](basic/mail-client) - how to send mails using the Mail Client API
- [Print Configuration Variables](basic/print-configurations) - prints configuration variables
- [Print Environment Variables](basic/print-env) - prints environment variables
- [Repository Manager](basic/repository-manager) - working with the Repository Manager API
- [REST Call with Binary Response](basic/http-client-binary) - how to retrieve the binary content from the response
- [REST Calls](basic/rest-calls) - how to execute REST calls (GET, POST, PUT, DELETE) using the HTTP Client API
- [REST Service](basic/rest-service) - getting started with the REST framework
- [Decoding of a URL](basic/url-decode) - decoding of an encoded URL
- [Encoding of a URL](basic/url-encode) - encoding an URL
- [Generate a Random UUID](basic/uuid-random-generation) - generate a random UUID
- [SOAP Client](basic/soap-client) - building a client for calling a SOAP service
- [SOAP Server](basic/soap-server) - building a server side SOAP service
- [FTP Client](basic/ftp-client) - getting started with the FTP Client
- [Platform Lifecycle](basic/platform-lifecycle) - getting started with the Platform Lifecycle API

#### Complex Samples

- [Scheduled Job](complex/job-console) - create a **Job** definition, which triggers a JavaScript handler service
- [Message Listener](complex/listener-queue) - create a **Listener** definition, which listens for events coming from a message queue and execute a JavaScript handler service
- [BPMN Process](complex/process-console) - create a **BPMN Process** definition, with a simple Service step, which triggers a JavaScript handler service
- [Bookstore Application](complex/bookstore) - create a full-stack application for Books management - database, persistence, web service and user interface.
- [Embedded Dirigible](complex/embedded) - embed Dirigible into an arbitrary Java application with specific requirements for the architecture, infrastructure and lifecycle management e.g. SpringBoot, Jakarta EE, etc.
- [RBAC for CMS](complex/rbac-for-cms) - how to enable the Role Based Access Management for the Content Management System
- [Master Repository](complex/master-repository) - how to run an application from a Zip file
- [Shell Command](complex/shell-command) - how to execute and arbitrary shell command
- [File Upload](complex/file-upload) - how to upload a file from HTML frontend and process the content at the backend
- [Kafka Producer and Consumer](complex/kafka) - usage of Kafka client

#### Tutorials

- [Zeus on Kubernetes](tutorial_zeus_on_kubernetes_minikube) - installation and configuration of a Kubernetes Minikube cluster and Zeus deployment.
- [Build a Custom Stack](tutorial_helium_custom_stack) - how to combine Dirigible modules with pure Java based ones and how to fine-tune the distribution for production.
- [Generate Application from Model](tutorial_generate_application_from_model) - this tutorial will guide you through the creation of an entity data model and generation of a full-stack Dirigible application, from this model.
- [Contributing to IDE Modules](tutorial/contributing-to-ide-modules) - this tutorial will guide you through the adding of changes in the IDE projects.
