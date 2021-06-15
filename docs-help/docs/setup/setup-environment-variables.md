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
**DIRIGIBLE_ANONYMOUS_USER_NAME_PROPERTY_NAME**   | The name of the property, that will be used to retrieve the anonymous user name *(e.g. MY_USER_VARIABLE)* | _`-`_

### Branding
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_BRANDING_NAME**   | The brand name | _`Eclipse Dirigible`_
**DIRIGIBLE_BRANDING_BRAND**   | The branding name | _`Eclipse Dirigible`_
**DIRIGIBLE_BRANDING_BRAND_URL**   | The branding URL | _`https://www.dirigible.io`_
**DIRIGIBLE_BRANDING_ICON**   | The branding icon | _`../../../../services/v4/web/resources/images/favicon.png`_
**DIRIGIBLE_BRANDING_WELCOME_PAGE_DEFAULT**   | The branding welcome page | _`../../../../services/v4/web/ide/welcome.html`_
**DIRIGIBLE_BRANDING_HELP_ITEMS** | The list of the custom help menu items (comma separated)	| _`-`_

#### Branding - Help Items

!!! Note
	Replace `CUSTOM_ITEM` with the actual name set by `DIRIGIBLE_BRANDING_HELP_ITEMS` e.g. **`ITEM1`**

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_BRANDING_HELP_ITEM_CUSTOM_ITEM_NAME**   | The name of the custom help item | _`-`_
**DIRIGIBLE_BRANDING_HELP_ITEM_CUSTOM_ITEM_URL**   | The url of the custom help item | _`-`_
**DIRIGIBLE_BRANDING_HELP_ITEM_CUSTOM_ITEM_ORDER**   | (Optional) The order of the custom help item | _`0`_
**DIRIGIBLE_BRANDING_HELP_ITEM_CUSTOM_ITEM_DIVIDER**   | (Optional) Whether to set divider after the custom help item | _`false`_

### Git

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_GIT_ROOT_FOLDER**   | The external folder that will be used for synchronizing git projects | _`-`_


### Registry
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REGISTRY_SYNCH_ROOT_FOLDER**   | The external folder that will be used for synchronizing the public registry | _`-`_

### Repository
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REPOSITORY_PROVIDER**   | The name of the repository provider used in this instance | _`local` or `database`_
**DIRIGIBLE_REPOSITORY_DISABLE_CACHE**   | Disable the usage of the cache, which is enabled by default | _`true` or `false`_

#### Database Repository

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REPOSITORY_DATABASE_DATASOURCE_NAME**   | The name of the data source, which will be used to store the repository artifacts | _`DefaultDB`_

#### Local Repository

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER**   | The location of the root folder where the repository artifacts will be stored | _`.`_
**DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER_IS_ABSOLUTE**   | Whether the location of the root folder is absolute or context dependent | _`false`_

#### Master Repository

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_MASTER_REPOSITORY_PROVIDER**   | The name of the master repository provider used in this instance _(`filesystem`, `zip` or `jar`)_ | _`-`_
**DIRIGIBLE_MASTER_REPOSITORY_ROOT_FOLDER**   | The location of the root folder where the master repository artifacts will be loaded from | _`.`_
**DIRIGIBLE_MASTER_REPOSITORY_ZIP_LOCATION**   | The location of the zip file where the master repository artifacts will be loaded from _(e.g. `/User/data/my-repo.zip`)_| _`-`_
**DIRIGIBLE_MASTER_REPOSITORY_JAR_PATH**   | The JAR path location of the zip file where the master repository artifacts will be loaded from _(e.g. `/org/dirigible/example/my-repo.zip`)_| _`-`_

  !!! Note
	The JAR path is absolute inside the class path

#### Repository Search

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REPOSITORY_SEARCH_ROOT_FOLDER**   | The location of the root folder to be used by the indexing engine | _`.`_
**DIRIGIBLE_REPOSITORY_SEARCH_ROOT_FOLDER_IS_ABSOLUTE**   | Whether the location of the root folder is absolute or context dependent | _`false`_
**DIRIGIBLE_REPOSITORY_SEARCH_INDEX_LOCATION**   | The sub-folder under the root folder where the index files will be stored | _`dirigible/repository/index`_


### Database

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_DATABASE_PROVIDER**   | The name of the database provider which will be used in this instance _(`local`, `managed` or `custom`)_| _`local`_
**DIRIGIBLE_DATABASE_DEFAULT_SET_AUTO_COMMIT**   | The _`AUTO_COMMIT`_ data source parameter | _`true`_
**DIRIGIBLE_DATABASE_DEFAULT_MAX_CONNECTIONS_COUNT**   | The _`MAX_CONNECTIONS_COUNT`_ data source parameter | _`8`_
**DIRIGIBLE_DATABASE_DEFAULT_WAIT_TIMEOUT**   | The _`WAIT_TIMEOUT`_ data source parameter | _`500`_
**DIRIGIBLE_DATABASE_DEFAULT_WAIT_COUNT**   | The _`WAIT_COUNT`_ data source parameter | _`5`_
**DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES**   | The list of the custom data sources names used in this instance | ` `
**DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT**   | The name of the primary data source used in this instance | _`DefaultDB`_
**DIRIGIBLE_DATABASE_NAMES_CASE_SENSITIVE**   | The names of the tables, views and columns to be considered as case sensitive | _`false`_


#### Database - Custom

!!! Note
	Replace `CUSTOM_NAME` with the actual name set by `DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES` e.g. **`POSTGRES_DRIVER`**

Parameter     | Description | Default*
------------ | ----------- | --------
**CUSTOM_NAME_DRIVER**   | The _`Driver`_ name of the custom datasource _(e.g. `org.postgresql.Driver`)_| _`-`_
**CUSTOM_NAME_URL**   | The _`URL`_ of the custom datasource _(e.g. `jdbc:postgresql://localhost:5432/<database-name>`)_| _`-`_
**CUSTOM_NAME_USERNAME**   | The _`User Name`_ of the custom datasource | _`-`_
**CUSTOM_NAME_PASSWORD**   | The _`Password`_ of the custom datasource | _`-`_
**CUSTOM_NAME_CONNECTION_PROPERTIES** | The additional connection properties if any | *-*

#### Database Derby

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_DATABASE_DERBY_ROOT_FOLDER_DEFAULT**   | The location used by Derby database | _`./target/dirigible/derby`_

#### Database H2

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_DATABASE_H2_ROOT_FOLDER_DEFAULT**   | The location used by H2 database | _`./target/dirigible/h2`_
**DIRIGIBLE_DATABASE_H2_DRIVER**   | The Driver used by H2 database | _`org.h2.Driver`_
**DIRIGIBLE_DATABASE_H2_URL**   | The URL used by H2 database | _`jdbc:h2:./target/dirigible/h2`_
**DIRIGIBLE_DATABASE_H2_USERNAME**   | The Username used by H2 database | _`sa`_
**DIRIGIBLE_DATABASE_H2_PASSWORD**   | The Password used by H2 database | _`-`_

#### Persistence

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_PERSISTENCE_CREATE_TABLE_ON_USE**   | Whether the table to be created automatically on use if it does not exist | _`true`_

#### MongoDB

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_MONGODB_CLIENT_URI**   | The location used by MongoDB server | _`mongodb://localhost:27017`_
**DIRIGIBLE_MONGODB_DATABASE_DEFAULT**   | The default database name | _`db`_

### Scheduler

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_SCHEDULER_MEMORY_STORE**   | Whether Quartz to use in-memory job store | _`false`_
**DIRIGIBLE_SCHEDULER_DATABASE_DATASOURCE_TYPE**   | The type of the custom data-source used by Quartz, if not the default one | _`-`_
**DIRIGIBLE_SCHEDULER_DATABASE_DATASOURCE_NAME**   | The name of the custom data-source used by Quartz, if not the default one | _`-`_
**DIRIGIBLE_SCHEDULER_DATABASE_DELEGATE**   | The name of the JDBC delegate used by Quartz, if not the default one | _`org.quartz.impl.jdbcjobstore.StdJDBCDelegate`_

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
**DIRIGIBLE_SYNCHRONIZER_IGNORE_DEPENDENCIES**   |  Whether to ignore dependencies for synchronizers, e.g. for tests purposes  | _`false`_


### Job Expression

| Parameter | Description | Default* |
|-----------|-------------|----------|
| **DIRIGIBLE_JOB_EXPRESSION_BPM**  | BPM synchronizer job config | _`0/50 * * * * ?`_ |
| **DIRIGIBLE_JOB_EXPRESSION_DATA_STRUCTURES**  | Data structures job synchronizer config | _`0/25 * * * * ?`_ |
| **DIRIGIBLE_JOB_EXPRESSION_EXTENSIONS**  | Extension synchronizer job config | _`0/10 * * * * ?`_ |
| **DIRIGIBLE_JOB_EXPRESSION_JOBS**  | Jobs synchronizer job config | _`0/15 * * * * ?`_ |
| **DIRIGIBLE_JOB_EXPRESSION_MESSAGING**  | Messaging synchronizer job config | _`0/25 * * * * ?`_ |
| **DIRIGIBLE_JOB_EXPRESSION_MIGRATIONS**  | Migration synchronizer job config | _`0/55 * * * * ?`_ |
| **DIRIGIBLE_JOB_EXPRESSION_ODATA**  | OData synchronizer job config | _`0/45 * * * * ?`_ |
| **DIRIGIBLE_JOB_EXPRESSION_PUBLISHER**  | Publisher synchronizer job config | _`0/5 * * * * ?`_ |
| **DIRIGIBLE_JOB_EXPRESSION_SECURITY**  | Security synchronizer job config | _`0/20 * * * * ?`_ |
| **DIRIGIBLE_JOB_EXPRESSION_REGISTRY**  | Registry synchronizer job config | _`0/35 * * * * ?`_ |
| **DIRIGIBLE_JOB_DEFAULT_TIMEOUT**  | Default timeout in minutes | _`3`_ |


### Runtime Core

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_HOME_URL**   | The home URL where the user to be redirected on access | _`/services/v4/web/ide/index.html`_

### CMS

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_PROVIDER**   | The type of the CMS provider used in this instance _(e.g. `internal`, `managed` or `database`)_| _`internal`_
**DIRIGIBLE_CMS_ROLES_ENABLED** | Whether the RBAC over the CMS content to be enabled | _`false`_

#### CMS - Internal

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER**   | The location of the CMS internal repository | _`target`_
**DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER_IS_ABSOLUTE**   | Whether the root folder parameter is absolute or not | _`false`_

#### CMS - Managed

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_JNDI_NAME**   | The JNDI name of the managed CMS repository | _`java:comp/env/EcmService` in case of SAP package_
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_AUTH_METHOD**   | The authentication method _(e.g. `key` or `destination`)_ | _`key`_
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_NAME**   | The name of the repository | _`cmis:dirigible`_
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_KEY**   | The key of the repository | _`cmis:dirigible:key`_
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_DESTINATION**   | The name of the destination where the name and the key for the repository are stored _(e.g. `CMIS_DESTINATION`)_ | _`-`_
**DIRIGIBLE_CONNECTIVITY_CONFIGURATION_JNDI_NAME**   | The JNDI name of the connectivity configuration serivce | _`java:comp/env/connectivity/Configuration` in case of SAP package_

#### CMS Database

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_DATABASE_DATASOURCE_TYPE**   | Type of the database for CMS repository _(e.g. `local`, `managed`, `custom`, `dynamic`)_| _`managed`_
**DIRIGIBLE_CMS_DATABASE_DATASOURCE_NAME**   | The datasource name | _`DefaultDB`_


### BPM

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_BPM_PROVIDER**   | The provider of the BPM engine _(e.g. `internal`, `managed`, `remote`)_| _`internal`_

#### BPM - Flowable

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_FLOWABLE_DATABASE_DRIVER**   | The driver of the Flowable engine _(e.g. `org.postgresql.Driver`)_ | _`-`_
**DIRIGIBLE_FLOWABLE_DATABASE_URL**   | The URL of the Flowable engine _(e.g. `jdbc:postgresql://localhost:5432/<database-name>`)_ | _`-`_
**DIRIGIBLE_FLOWABLE_DATABASE_USER**   | The user of the Flowable engine | _`-`_
**DIRIGIBLE_FLOWABLE_DATABASE_PASSWORD**   | The driver of the Flowable engine | _`-`_
**DIRIGIBLE_FLOWABLE_DATABASE_DATASOURCE_NAME**   | The datasource name of the Flowable engine, if any configured | _`-`_
**DIRIGIBLE_FLOWABLE_DATABASE_SCHEMA_UPDATE**   | Whether to materialize the database layout or not | _`true`_
**DIRIGIBLE_FLOWABLE_USE_DEFAULT_DATABASE**   | Whether to use the DefaultDB datasource or built-in H2 _(e.g. `true` (DefaultDB) or `false` (H2))_ | _`true`_

### Mail

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_MAIL_USERNAME**   | Mailbox username | _`-`_
**DIRIGIBLE_MAIL_PASSWORD**   | Mailbox password | _`-`_
**DIRIGIBLE_MAIL_TRANSPORT_PROTOCOL**   | Mail transport protocol | _`smtps`_
**DIRIGIBLE_MAIL_SMTPS_HOST**   | Mailbox SMTPS host | _`-`_
**DIRIGIBLE_MAIL_SMTPS_PORT**   | Mailbox SMTPS port | _`-`_
**DIRIGIBLE_MAIL_SMTPS_AUTH**   | Enable/disable mailbox SMTPS authentication | _`-`_
**DIRIGIBLE_MAIL_SMTP_HOST**   | Mailbox SMTP host | _`-`_
**DIRIGIBLE_MAIL_SMTP_PORT**   | Mailbox SMTP port | _`-`_
**DIRIGIBLE_MAIL_SMTP_AUTH**   | Enable/disable mailbox SMTP authentication | _`-`_


### Messaging

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_MESSAGING_USE_DEFAULT_DATABASE**   | Whether to use the DefaultDB datasource or built-in KahaDB _(e.g. `true` (DefaultDB) or `false` (KahaDB))_ | _`true`_

### Kafka

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_KAFKA_BOOTSTRAP_SERVER**   | The Kafka server location | _`localhost:9092`_
**DIRIGIBLE_KAFKA_ACKS**   | The number of brokers that must receive the record before considering the write as successful | _`all`_
**DIRIGIBLE_KAFKA_KEY_SERIALIZER**   | The Key serializer | _`org.apache.kafka.common.serialization.StringSerializer`_
**DIRIGIBLE_KAFKA_VALUE_SERIALIZER**   | The Value serializer | _`org.apache.kafka.common.serialization.StringSerializer`_
**DIRIGIBLE_KAFKA_AUTOCOMMIT_ENABLED**   | Whether Auto Commit is enabled | _`true`_
**DIRIGIBLE_KAFKA_AUTOCOMMIT_INTERVAL**   | Auto Commit interval in ms | _`1000`_


### Engines
---

#### JavaScript

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_JAVASCRIPT_ENGINE_TYPE_DEFAULT**   | The type of the JavaScript engine provider used in this instance _(e.g. `graalvm`, `rhino`, `nashorn` or `v8`)_ | _`graalvm` since 5.0_

##### GraalVM

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT** | The GraalVM debugger port | _`8081` and `0.0.0.0:8081` in Docker environment_
**DIRIGBLE_JAVASCRIPT_GRAALVM_ALLOW_HOST_ACCESS** | Whether GraalVM can load classes form custom packages | _`true`_
**DIRIGBLE_JAVASCRIPT_GRAALVM_ALLOW_CREATE_THREAD** | Whether GraalVM can create threads | _`true`_
**DIRIGBLE_JAVASCRIPT_GRAALVM_ALLOW_CREATE_PROCESS** | Whether GraalVM can make IO operations | _`true`_
**DIRIGBLE_JAVASCRIPT_GRAALVM_ALLOW_IO** | Whether GraalVM can make IO operations | _`true`_
**DIRIGBLE_JAVASCRIPT_GRAALVM_COMPATIBILITY_MODE_NASHORN** | Whether GraalVM has enabled compatibility mode for Nashorn | _`true`_
**DIRIGBLE_JAVASCRIPT_GRAALVM_COMPATIBILITY_MODE_MOZILLA** | Whether GraalVM has enabled compatibility mode for Mozilla | _`false`_

### Operations
---

#### Logs

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_OPERATIONS_LOGS_ROOT_FOLDER_DEFAULT**   | The folder where the log files are stored in | _`../logs`_

### Look & Feel
---

#### Theme

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_THEME_DEFAULT**   | The name of the default name | _`Default`_

### Destinations
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_DESTINATIONS_PROVIDER**   | The name of the Destinations Service provider used in this instance | _`local` or `managed`_
**DIRIGIBLE_DESTINATIONS_INTERNAL_ROOT_FOLDER**   | The location of the Destinations internal repository | _`target`_
**DIRIGIBLE_DESTINATIONS_INTERNAL_ROOT_FOLDER_IS_ABSOLUTE**   | Whether the root folder parameter is absolute or not | _`false`_


The source is [here](https://github.com/eclipse/dirigible/blob/master/modules/commons/commons-config/README.md)

