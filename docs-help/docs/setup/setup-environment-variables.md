---
title: Environment Variables
hide:
  - toc
---

Environment Variables
===

## Configuration Parameters

### Anonymous Access
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_ANONYMOUS_USER_NAME_PROPERTY_NAME**   | The name of the property, that will be used to retrieve the anonymous user name | *e.g. MY_USER_VARIABLE*

### Branding
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_BRANDING_NAME**   | The brand name | default is *'Eclipse Dirigible'*
**DIRIGIBLE_BRANDING_BRAND**   | The branding name | default is *'Eclipse Dirigible'*
**DIRIGIBLE_BRANDING_ICON**   | The branding icon | default is *'../../../../services/v3/web/resources/images/favicon.png'*
**DIRIGIBLE_BRANDING_WELCOME_PAGE_DEFAULT**   | The branding welcome page | default is *'../../../../services/v3/web/ide/welcome.html'*

### Git

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_GIT_ROOT_FOLDER**   | The external folder that will be used for synchronizing git projects | *-*

### Registry
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REGISTRY_SYNCH_ROOT_FOLDER**   | The external folder that will be used for synchronizing the public registry | *-*

### Repository
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REPOSITORY_PROVIDER**   | The name of the repository provider used in this instance | *local* or *database*

#### Database Repository

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REPOSITORY_DATABASE_DATASOURCE_NAME**   | The name of the data source, which will be used to store the repository artifacts | default is *DefaultDB*

#### Local Repository

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER**   | The location of the root folder where the repository artifacts will be stored | default is *'.'*
**DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER_IS_ABSOLUTE**   | Whether the location of the root folder is absolute or context dependent | *true* or *false*

#### Master Repository

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_MASTER_REPOSITORY_PROVIDER**   | The name of the master repository provider used in this instance | *filesystem* or *zip* or *jar*
**DIRIGIBLE_MASTER_REPOSITORY_ROOT_FOLDER**   | The location of the root folder where the master repository artifacts will be loaded from | default is **'.'**
**DIRIGIBLE_MASTER_REPOSITORY_ZIP_LOCATION**   | The location of the zip file where the master repository artifacts will be loaded from | e.g. '/User/data/my-repo.zip'
**DIRIGIBLE_MASTER_REPOSITORY_JAR_PATH**   | The JAR path location of the zip file where the master repository artifacts will be loaded from | e.g. '/org/dirigible/example/my-repo.zip'

  > _**Note:** The JAR path is absolute inside the class path_

#### Repository Search

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REPOSITORY_SEARCH_ROOT_FOLDER**   | The location of the root folder to be used by the indexing engine | default is *'.'*
**DIRIGIBLE_REPOSITORY_SEARCH_ROOT_FOLDER_IS_ABSOLUTE**   | Whether the location of the root folder is absolute or context dependent | *true* or *false*
**DIRIGIBLE_REPOSITORY_SEARCH_INDEX_LOCATION**   | The sub-folder under the root folder where the index files will be stored | e.g. 'dirigible/repository/index'


### Database

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_DATABASE_PROVIDER**   | The name of the database provider which will be used in this instance | *local* or *managed* or *custom* - default is *local*
**DIRIGIBLE_DATABASE_DEFAULT_SET_AUTO_COMMIT**   | The *AUTO_COMMIT* data source parameter | *true*
**DIRIGIBLE_DATABASE_DEFAULT_MAX_CONNECTIONS_COUNT**   | The *MAX_CONNECTIONS_COUNT* data source parameter | *8*
**DIRIGIBLE_DATABASE_DEFAULT_WAIT_TIMEOUT**   | The *WAIT_TIMEOUT* data source parameter | *500*
**DIRIGIBLE_DATABASE_DEFAULT_WAIT_COUNT**   | The *WAIT_COUNT* data source parameter | *5*
**DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES**   | The list of the custom data sources names used in this instance | default is *''*
**DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT**   | The name of the primary data source used in this instance | default is *'DefaultDB'*
**DIRIGIBLE_DATABASE_NAMES_CASE_SENSITIVE**   | The names of the tables, views and columns to be considered as case sensitive | default is *false*


#### Database - Custom

> _**Note:** Replace `CUSTOME_NAME` with the actual name set by `DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES` e.g. `POSTGRES_DRIVER`_

Parameter     | Description | Default*
------------ | ----------- | --------
**CUSTOM_NAME_DRIVER**   | The *Driver* name of the custom datasource | *e.g. org.postgresql.Driver*
**CUSTOM_NAME_URL**   | The *URL* of the custom datasource | *e.g. jdbc:postgresql://localhost:5432/<database-name>*
**CUSTOM_NAME_USERNAME**   | The *User Name* of the custom datasource | *-*
**CUSTOM_NAME_PASSWORD**   | The *Password* of the custom datasource | *-*
**CUSTOM_NAME_CONNECTION_PROPERTIES** | The additional connection properties if any | *-*

#### Database Derby

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_DATABASE_DERBY_ROOT_FOLDER_DEFAULT**   | The location used by Derby database | default is *./target/dirigible/derby*

#### Database H2

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_DATABASE_H2_ROOT_FOLDER_DEFAULT**   | The location used by H2 database | default is: *./target/dirigible/h2*
**DIRIGIBLE_DATABASE_H2_DRIVER**   | The Driver used by H2 database | default is: *org.h2.Driver*
**DIRIGIBLE_DATABASE_H2_URL**   | The URL used by H2 database | default is *jdbc:h2:./target/dirigible/h2*
**DIRIGIBLE_DATABASE_H2_USERNAME**   | The Username used by H2 database | default is *sa*
**DIRIGIBLE_DATABASE_H2_PASSWORD**   | The Password used by H2 database | default is *empty*

#### Persistence

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_PERSISTENCE_CREATE_TABLE_ON_USE**   | Whether the table to be created automatically on use if it does not exist | default is *true*

#### MongoDB

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_MONGODB_CLIENT_URI**   | The location used by MongoDB server | default is: *mongodb://localhost:27017*
**DIRIGIBLE_MONGODB_DATABASE_DEFAULT**   | The default database name | default is: *db*

### Scheduler

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_SCHEDULER_MEMORY_STORE**   | Whether Quartz to use in-memory job store | default is null
**DIRIGIBLE_SCHEDULER_DATABASE_DATASOURCE_TYPE**   | The type of the custom data-source used by Quartz, if not the default one | default is null
**DIRIGIBLE_SCHEDULER_DATABASE_DATASOURCE_NAME**   | The name of the custom data-source used by Quartz, if not the default one | default is null
**DIRIGIBLE_SCHEDULER_DATABASE_DELEGATE**   | The name of the JDBC delegate used by Quartz, if not the default one | (default: org.quartz.impl.jdbcjobstore.StdJDBCDelegate)

* org.quartz.impl.jdbcjobstore.StdJDBCDelegate (for fully JDBC-compliant drivers)
* org.quartz.impl.jdbcjobstore.MSSQLDelegate (for Microsoft SQL Server, and Sybase)
* org.quartz.impl.jdbcjobstore.PostgreSQLDelegate
* org.quartz.impl.jdbcjobstore.WebLogicDelegate (for WebLogic drivers)
* org.quartz.impl.jdbcjobstore.oracle.OracleDelegate
* org.quartz.impl.jdbcjobstore.oracle.WebLogicOracleDelegate (for Oracle drivers used within Weblogic)
* org.quartz.impl.jdbcjobstore.oracle.weblogic.WebLogicOracleDelegate (for Oracle drivers used within Weblogic)
* org.quartz.impl.jdbcjobstore.CloudscapeDelegate
* org.quartz.impl.jdbcjobstore.DB2v6Delegate
* org.quartz.impl.jdbcjobstore.DB2v7Delegate
* org.quartz.impl.jdbcjobstore.DB2v8Delegate
* org.quartz.impl.jdbcjobstore.HSQLDBDelegate
* org.quartz.impl.jdbcjobstore.PointbaseDelegate
* org.quartz.impl.jdbcjobstore.SybaseDelegate

### Synchronizer

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_SYNCHRONIZER_IGNORE_DEPENDENCIES**   |  Whether to ignore dependencies for synchronizers, e.g. for tests purposes  | default is false


### Job Expression

| Parameter | Description | Default* |
|-----------|-------------|----------|
| **DIRIGIBLE_JOB_EXPRESSION_BPM**  | BPM synchronizer job config | 0/50 * * * * ? |
| **DIRIGIBLE_JOB_EXPRESSION_DATA_STRUCTURES**  | Data structures job synchronizer config | 0/25 * * * * ? |
| **DIRIGIBLE_JOB_EXPRESSION_EXTENSIONS**  | Extension synchronizer job config | 0/10 * * * * ? |
| **DIRIGIBLE_JOB_EXPRESSION_JOBS**  | Jobs synchronizer job config | 0/15 * * * * ? |
| **DIRIGIBLE_JOB_EXPRESSION_MESSAGING**  | Messaging synchronizer job config | 0/25 * * * * ? |
| **DIRIGIBLE_JOB_EXPRESSION_MIGRATIONS**  | Migration synchronizer job config | 0/55 * * * * ? |
| **DIRIGIBLE_JOB_EXPRESSION_ODATA**  | OData synchronizer job config | 0/45 * * * * ? |
| **DIRIGIBLE_JOB_EXPRESSION_PUBLISHER**  | Publisher synchronizer job config | 0/5 * * * * ? |
| **DIRIGIBLE_JOB_EXPRESSION_SECURITY**  | Security synchronizer job config | 0/20 * * * * ? |
| **DIRIGIBLE_JOB_EXPRESSION_REGISTRY**  | Registry synchronizer job config | 0/35 * * * * ? |
| **DIRIGIBLE_JOB_DEFAULT_TIMEOUT**  | Default timeout | default: 3 minutes |


### Runtime Core

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_HOME_URL**   | The home URL where the user to be redirected on access | default is */services/v3/web/ide/index.html*

### CMS

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_PROVIDER**   | The type of the CMS provider used in this instance | internal, managed or database - default is *internal*
**DIRIGIBLE_CMS_ROLES_ENABLED** | Whether the RBAC over the CMS content to be enabled | default is *false*

#### CMS - Internal

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER**   | The location of the CMS internal repository | default is *target*
**DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER_IS_ABSOLUTE**   | Whether the root folder parameter is absolute or not | *false*

#### CMS - Managed

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_JNDI_NAME**   | The JNDI name of the managed CMS repository | default is *java:comp/env/EcmService* in case of SAP package
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_AUTH_METHOD**   | The authentication method | key or destination - default is *key*
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_NAME**   | The name of the repository | e.g. cmis:dirigible
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_KEY**   | The key of the repository | e.g. cmis:dirigible:key
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_DESTINATION**   | The name of the destination where the name and the key for the repository are stored | e.g. CMIS_DESTINATION
**DIRIGIBLE_CONNECTIVITY_CONFIGURATION_JNDI_NAME**   | The JNDI name of the connectivity configuration serivce | default is *java:comp/env/connectivity/Configuration* in case of SAP package

#### CMS Database

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_DATABASE_DATASOURCE_TYPE**   | Type of the database for CMS repository | local, managed, custom, dynamic
**DIRIGIBLE_CMS_DATABASE_DATASOURCE_NAME**   | The datasource name | default is *DefaultDB*


### BPM

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_BPM_PROVIDER**   | The provider of the BPM engine | internal, managed, remote; default is *internal*

#### BPM - Flowable

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_FLOWABLE_DATABASE_DRIVER**   | The driver of the Flowable engine | *e.g. org.postgresql.Driver*
**DIRIGIBLE_FLOWABLE_DATABASE_URL**   | The URL of the Flowable engine | *e.g. jdbc:postgresql://localhost:5432/<database-name>*
**DIRIGIBLE_FLOWABLE_DATABASE_USER**   | The user of the Flowable engine | *-*
**DIRIGIBLE_FLOWABLE_DATABASE_PASSWORD**   | The driver of the Flowable engine | *-*
**DIRIGIBLE_FLOWABLE_DATABASE_DATASOURCE_NAME**   | The datasource name of the Flowable engine, if any configured | *-*
**DIRIGIBLE_FLOWABLE_DATABASE_SCHEMA_UPDATE**   | Whether to materialize the database layout or not | default is: *true*
**DIRIGIBLE_FLOWABLE_USE_DEFAULT_DATABASE**   | Whether to use the DefaultDB datasource or built-in H2 | *true* (DefaultDB) or *false* (H2) default is *true*

### Mail

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_MAIL_USERNAME**   | Mailbox username | *-*
**DIRIGIBLE_MAIL_PASSWORD**   | Mailbox password | *-*
**DIRIGIBLE_MAIL_TRANSPORT_PROTOCOL**   | Mail transport protocol | default is *smtps*
**DIRIGIBLE_MAIL_SMTPS_HOST**   | Mailbox SMTPS host | *-*
**DIRIGIBLE_MAIL_SMTPS_PORT**   | Mailbox SMTPS port | *-*
**DIRIGIBLE_MAIL_SMTPS_AUTH**   | Enable/disable mailbox SMTPS authentication | *-*
**DIRIGIBLE_MAIL_SMTP_HOST**   | Mailbox SMTP host | *-*
**DIRIGIBLE_MAIL_SMTP_PORT**   | Mailbox SMTP port | *-*
**DIRIGIBLE_MAIL_SMTP_AUTH**   | Enable/disable mailbox SMTP authentication | *-*


### Messaging

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_MESSAGING_USE_DEFAULT_DATABASE**   | Whether to use the DefaultDB datasource or built-in KahaDB | *true* (DefaultDB) or *false* (KahaDB) default is *true*

### Kafka

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_KAFKA_BOOTSTRAP_SERVER**   | The Kafka server location | *localhost:9092*
**DIRIGIBLE_KAFKA_ACKS**   | The number of brokers that must receive the record before considering the write as successful | *all*
**DIRIGIBLE_KAFKA_KEY_SERIALIZER**   | The Key serializer | *org.apache.kafka.common.serialization.StringSerializer*
**DIRIGIBLE_KAFKA_VALUE_SERIALIZER**   | The Value serializer | *org.apache.kafka.common.serialization.StringSerializer*
**DIRIGIBLE_KAFKA_AUTOCOMMIT_ENABLED**   | Whether Auto Commit is enabled | *true*
**DIRIGIBLE_KAFKA_AUTOCOMMIT_INTERVAL**   | Auto Commit interval in ms | *1000*


### Engines
---

#### JavaScript

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_JAVASCRIPT_ENGINE_TYPE_DEFAULT**   | The type of the JavaScript engine provider used in this instance | graalvm, rhino, nashorn or v8 - default is *graalvm* since 5.0

##### GraalVM

**DIRIGBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT** | The GraalVM debugger port | default is *8081* and *0.0.0.0:8081* in Docker environment
**DIRIGBLE_JAVASCRIPT_GRAALVM_ALLOW_HOST_ACCESS** | Whether GraalVM can load classes form custom packages | default is **true**
**DIRIGBLE_JAVASCRIPT_GRAALVM_ALLOW_CREATE_THREAD** | Whether GraalVM can create threads | default is **true**
**DIRIGBLE_JAVASCRIPT_GRAALVM_ALLOW_CREATE_PROCESS** | Whether GraalVM can make IO operations | default is **true**
**DIRIGBLE_JAVASCRIPT_GRAALVM_ALLOW_IO** | Whether GraalVM can make IO operations | default is **true**
**DIRIGBLE_JAVASCRIPT_GRAALVM_COMPATIBILITY_MODE_NASHORN** | Whether GraalVM has enabled compatibility mode for Nashorn | default is **true**
**DIRIGBLE_JAVASCRIPT_GRAALVM_COMPATIBILITY_MODE_MOZILLA** | Whether GraalVM has enabled compatibility mode for Mozilla | default is **false**

### Operations
---

#### Logs

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_OPERATIONS_LOGS_ROOT_FOLDER_DEFAULT**   | The folder where the log files are stored in | default is **../logs**

### Look & Feel
---

#### Theme

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_THEME_DEFAULT**   | The name of the default name | default is **Default**

### Destinations
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_DESTINATIONS_PROVIDER**   | The name of the Destinations Service provider used in this instance | *local* or *managed*
**DIRIGIBLE_DESTINATIONS_INTERNAL_ROOT_FOLDER**   | The location of the Destinations internal repository | default is *target*
**DIRIGIBLE_DESTINATIONS_INTERNAL_ROOT_FOLDER_IS_ABSOLUTE**   | Whether the root folder parameter is absolute or not | *false*


The source is [here](https://github.com/eclipse/dirigible/blob/master/modules/commons/commons-config/README.md)

