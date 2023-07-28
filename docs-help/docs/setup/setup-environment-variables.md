---
title: Environment Variables
---

Environment Variables
===

## Configuration Types

Based on the layer, they are defined, configuration variables have the following priorities:

=== "Runtime"

    Highest precedence:
    
    - No rebuild or restart of the application is required when configuration is changed.
    - The [Configuration API](../../../api/core/configurations/) could be used to apply changes in the **Runtime** configuration.

=== "Environment"

    Second precedence:
    
    - No rebuild is required when configuration is changed, however the application should be restarted, to apply the environment changes.
    - Usually the **Environment** configurations are provided during the application deployment, as part of application descriptor _(e.g. [Define environment variable for container in Kubernetes](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/) or in [Cloud Foundry App Manifest](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#-add-variables-to-a-manifest))_.


=== "Deployment"

    Third precedence:
    
    - Rebuild and re-deployment is required.
    - "Default" deployment _(`ROOT.war`)_ configuration variables are taken from `dirigible.properties` properties file _(sample could be found [here](https://github.com/eclipse/dirigible/blob/master/releng/server-all/src/main/resources/dirigible.properties))_.

=== "Module"

    Lowest precedence:
    
    - Rebuild and re-deployment is required.
    - "Default" module _(e.g. `dirigible-database-custom.jar`, `dirigible-database-h2.jar`)_ configuration variables are taken from `dirigible-xxx.properties` properties files _(sample could be found [here](https://github.com/eclipse/dirigible/blob/master/modules/database/database-h2/src/main/resources/dirigible-database-h2.properties) and [here](https://github.com/eclipse/dirigible/blob/master/modules/database/database-custom/src/main/resources/dirigible-database-custom.properties))_

!!! Note
	The precedence order means that, if the there is an **Environment** variable with name `DIRIGIBLE_TEST` and **Runtime** variable with the same name, the **Runtime** variable will have high prority and will be applied.

All applied configuration values could be found under the [Configurations View](https://www.dirigible.io/help/development/ide/views/configurations/).

## Configuration Parameters

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

### Basic

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_BASIC_ENABLED** | Whether the Basic authentication is enabled | _`true`_
**DIRIGIBLE_BASIC_USERNAME**   | Base64 encoded property, which will be used as user name for basic authentication | _`admin`_
**DIRIGIBLE_BASIC_PASSWORD**   | Base64 encoded property, which will be used as password for basic authentication | _`admin`_

### OAuth

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_OAUTH_ENABLED** | Whether the OAuth authentication is enabled | _`false`_
**DIRIGIBLE_OAUTH_AUTHORIZE_URL** | The OAuth authorization URL _(e.g. `https://my-oauth-server/oauth/authorize`)_ | _`-`_
**DIRIGIBLE_OAUTH_TOKEN_URL** | The OAuth token URL _(e.g. `https://my-oauth-server/oauth/token`)_ | _`-`_
**DIRIGIBLE_OAUTH_TOKEN_REQUEST_METHOD** | The OAuth token request method _(`GET` or `POST`)_ | _`GET`_
**DIRIGIBLE_OAUTH_CLIENT_ID** | The OAuth `clientid` _(e.g. `sb-xxx-yyy`)_ | _`-`_
**DIRIGIBLE_OAUTH_CLIENT_SECRET** | The OAuth `clientsecret` _(e.g. `PID/cpkD8aZzbGaa6+muYYOOMWPDeM1ug/sQ5ZF...`)_ | _`-`_
**DIRIGIBLE_OAUTH_APPLICATION_HOST** | The application host _(e.g. `https://my-application-host`)_ | _`-`_
**DIRIGIBLE_OAUTH_ISSUER** | The OAuth `issuer` _(e.g. `http://xxx.localhost:8080/uaa/oauth/token`)_ | _`-`_
**DIRIGIBLE_OAUTH_VERIFICATION_KEY** | The OAuth `verificationkey` _(e.g. `-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhki...`)_ | _`-`_
**DIRIGIBLE_OAUTH_VERIFICATION_KEY_EXPONENT** | The OAuth verificationkey exponent _(e.g. `AQAB`)_ | _`-`_
**DIRIGIBLE_OAUTH_CHECK_ISSUER_ENABLED** | Sets whether the JWT verifier should check the token `issuer` | _`true`_
**DIRIGIBLE_OAUTH_CHECK_AUDIENCE_ENABLED** | Sets whether the JWT verifier should check the token `aud` | _`true`_
**DIRIGIBLE_OAUTH_APPLICATION_NAME** | The application name _(e.g. `dirigible-xxx`)_ | _`-`_

!!! Note "Redirect/Callback URL"

    Configure the Redirect/Callback URL in the OAuth client to: `<DIRIGIBLE_OAUTH_APPLICATION_HOST>/services/v4/oauth/callback`

### Keycloak

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_KEYCLOAK_ENABLED** | Sets whether the  Keycloak Authentication is enabled* | _`false`_
**DIRIGIBLE_KEYCLOAK_AUTH_SERVER_URL** | The Keycloak Authentication Server URL _(e.g. `https://keycloak-server/auth/`)_ | _`-`_
**DIRIGIBLE_KEYCLOAK_REALM** | The Keycloak realm _(e.g. `my-realm`)_ | _`-`_
**DIRIGIBLE_KEYCLOAK_SSL_REQUIRED** | The Keyclaok SSL Required _(e.g. `none`/`external`)_ | _`-`_
**DIRIGIBLE_KEYCLOAK_CLIENT_ID** | The Keycloak Client ID _(e.g. `my-client`)_ | _`-`_
**DIRIGIBLE_KEYCLOAK_CONFIDENTIAL_PORT** | The Keycloak Confidential Port _(e.g. `443`)_ | _`-`_
**DIRIGIBLE_KEYCLOAK_CONFIDENTIAL_PORT** | The Keycloak Confidential Port _(e.g. `443`)_ | _`-`_
**SERVER_MAXHTTPHEADERSIZE** | The HTTP header max size _(e.g. `48000`)_ | _`Default for the underlying server (e.g. Tomcat)`_

!!! Note
	In addition to setting the `DIRIGIBLE_KEYCLOAK_ENABLED` property to `true`, the `DIRIGIBLE_BASIC_ENABLED` property should be set to `false` in order to enable the Keycloak integration.
	To find more details about the Keycloak configuration go to [Keycloak Java Adapter Configuration](https://www.keycloak.org/docs/latest/securing_apps/#_java_adapter_config).

### Git

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_GIT_ROOT_FOLDER**   | The external folder that will be used for synchronizing git projects | _`-`_


### Registry
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REGISTRY_EXTERNAL_FOLDER**   | The external folder that will be used for synchronizing the public registry | _`-`_
**DIRIGIBLE_REGISTRY_IMPORT_WORKSPACE**   | The external folder that will be imported into the public registry | _`-`_

### Repository
---

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REPOSITORY_PROVIDER**   | The name of the repository provider used in this instance | _`local` or `database`_
**DIRIGIBLE_REPOSITORY_CACHE_ENABLED**   | Enable the usage of the repository cache | _`true`_

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
**DIRIGIBLE_DATABASE_DATASOURCE_NAME_SYSTEM**   | The name of the system data source used in this instance | _`SystemDB`_
**DIRIGIBLE_DATABASE_NAMES_CASE_SENSITIVE**   | The names of the tables, views and columns to be considered as case sensitive | _`false`_
**DIRIGIBLE_DATABASE_TRANSFER_BATCH_SIZE**    | The batch size used during the data transfer | _`1000`_
**DIRIGIBLE_DATABASE_DEFAULT_QUERY_LIMIT**	| The batch size used during quering data from the database | _`1000`_

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
**DIRIGIBLE_SCHEDULER_LOGS_RETANTION_PERIOD**   | The period the logs of the job execution will be kept (the default is one week - 24x7) | _`168`_
**DIRIGIBLE_SCHEDULER_EMAIL_SENDER**   | The sender for the e-mail notifications | _`-`_
**DIRIGIBLE_SCHEDULER_EMAIL_RECIPIENTS**   | The recipients list for the e-mail notifications | _`-`_
**DIRIGIBLE_SCHEDULER_EMAIL_SUBJECT_ERROR**   | The error subject for the e-mail notifications | _`-`_
**DIRIGIBLE_SCHEDULER_EMAIL_SUBJECT_NORMAL**   | The normal subject for the e-mail notifications | _`-`_
**DIRIGIBLE_SCHEDULER_EMAIL_TEMPLATE_ERROR**   | The error template for the e-mail notifications | _`-`_
**DIRIGIBLE_SCHEDULER_EMAIL_TEMPLATE_NORMAL**   | The normal template for the e-mail notifications | _`-`_
**DIRIGIBLE_SCHEDULER_EMAIL_URL_SCHEME**   | The scheme part of the URL for the e-mail notifications | _`-`_
**DIRIGIBLE_SCHEDULER_EMAIL_URL_HOST**   | The host part of the URL for the e-mail notifications | _`-`_
**DIRIGIBLE_SCHEDULER_EMAIL_URL_PORT**   | The port part of the URL for the e-mail notifications | _`-`_
**DIRIGIBLE_SCHEDULER_DATABASE_DELEGATE**   | The name of the JDBC delegate used by Quartz, if not the default one | _`org.quartz.impl.jdbcjobstore.StdJDBCDelegate`_

!!! Note
	Quartz JDBC delegates:

	- `org.quartz.impl.jdbcjobstore.StdJDBCDelegate` _(for fully JDBC-compliant drivers)_
	- `org.quartz.impl.jdbcjobstore.MSSQLDelegate` _(for Microsoft SQL Server, and Sybase)_
	- `org.quartz.impl.jdbcjobstore.PostgreSQLDelegate`
	- `org.quartz.impl.jdbcjobstore.WebLogicDelegate` _(for WebLogic drivers)_
	- `org.quartz.impl.jdbcjobstore.oracle.OracleDelegate`
	- `org.quartz.impl.jdbcjobstore.oracle.WebLogicOracleDelegate` _(for Oracle drivers used within Weblogic)_
	- `org.quartz.impl.jdbcjobstore.oracle.weblogic.WebLogicOracleDelegate` _(for Oracle drivers used within Weblogic)_
	- `org.quartz.impl.jdbcjobstore.CloudscapeDelegate`
	- `org.quartz.impl.jdbcjobstore.DB2v6Delegate`
	- `org.quartz.impl.jdbcjobstore.DB2v7Delegate`
	- `org.quartz.impl.jdbcjobstore.DB2v8Delegate`
	- `org.quartz.impl.jdbcjobstore.HSQLDBDelegate`
	- `org.quartz.impl.jdbcjobstore.PointbaseDelegate`
	- `org.quartz.impl.jdbcjobstore.SybaseDelegate`

### Synchronizer

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_SYNCHRONIZER_IGNORE_DEPENDENCIES**   |  Whether to ignore dependencies for synchronizers, e.g. for tests purposes  | _`false`_
**DIRIGIBLE_SYNCHRONIZER_EXCLUDE_PATHS**   |  Paths to be excluded from processing (comma separated list)  | _``_


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
| **DIRIGIBLE_JOB_EXPRESSION_SECURITY**  | Security synchronizer job config | _`0/10 * * * * ?`_ |
| **DIRIGIBLE_JOB_EXPRESSION_REGISTRY**  | Registry synchronizer job config | _`0/35 * * * * ?`_ |
| **DIRIGIBLE_JOB_DEFAULT_TIMEOUT**  | Default timeout in minutes | _`3`_ |


### Runtime Core

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_HOME_URL**   | The home URL where the user to be redirected on access | _`/services/v4/web/ide/index.html`_

### Vert.x

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_VERTX_PORT**   | The Vert.x server port, if used | _`8888`_

### CSV

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CSV_DATA_MAX_COMPARE_SIZE**   | The maximum number of CSV records for which will be performed comparison with the existing table data | _`1000`_
**DIRIGIBLE_CSV_DATA_BATCH_SIZE** | The number of CSV records to be included in a _**batch**_ operation | _`100`_

### CMS

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_PROVIDER**   | The type of the CMS provider used in this instance _(e.g. `internal`, `managed` or `database`)_| _`internal`_
**DIRIGIBLE_CMS_ROLES_ENABLED** | Whether the RBAC over the CMS content to be enabled | _`true`_

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
**DIRIGIBLE_GRAALIUM_ENABLE_DEBUG** | Whether the debug mode is enabled | _`false`_
**DIRIGIBLE_JAVASCRIPT_GRAALVM_DEBUGGER_PORT** | The GraalVM debugger port | _`8081` and `0.0.0.0:8081` in Docker environment_
**DIRIGIBLE_JAVASCRIPT_GRAALVM_ALLOW_HOST_ACCESS** | Whether GraalVM can load classes form custom packages | _`true`_
**DIRIGIBLE_JAVASCRIPT_GRAALVM_ALLOW_CREATE_THREAD** | Whether GraalVM can create threads | _`true`_
**DIRIGIBLE_JAVASCRIPT_GRAALVM_ALLOW_CREATE_PROCESS** | Whether GraalVM can make IO operations | _`true`_
**DIRIGIBLE_JAVASCRIPT_GRAALVM_ALLOW_IO** | Whether GraalVM can make IO operations | _`true`_
**DIRIGIBLE_JAVASCRIPT_GRAALVM_COMPATIBILITY_MODE_NASHORN** | Whether GraalVM has enabled compatibility mode for Nashorn | _`true`_
**DIRIGIBLE_JAVASCRIPT_GRAALVM_COMPATIBILITY_MODE_MOZILLA** | Whether GraalVM has enabled compatibility mode for Mozilla | _`false`_

#### OData

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_ODATA_HANDLER_EXECUTOR_TYPE**   | The type of the JavaScript engine to be used for event handlers in OData | 
**DIRIGIBLE_ODATA_HANDLER_EXECUTOR_ON_EVENT**   | The location of the wrapper helper to be used for event handlers in OData | 

#### FTP

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_FTP_USERNAME**   | The FTP server username | _`admin`_
**DIRIGIBLE_FTP_PASSWORD**   | The FTP server password | _`admin`_
**DIRIGIBLE_FTP_PORT**   | The location of the wrapper helper to be used for event handlers in OData | _`8022`_


### Operations
---

#### Logs

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_OPERATIONS_LOGS_ROOT_FOLDER_DEFAULT**   | The folder where the log files are stored in | _`../logs`_
**DIRIGIBLE_EXEC_COMMAND_LOGGING_ENABLED** | Whether to log the executed command by the _[exec](/api/core/exec/)_ API | _`false`_

### Look & Feel
---

#### Theme

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_THEME_DEFAULT**   | The name of the default name | _`Default`_

### Terminal
---
Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_TERMINAL_ENABLED**   | Whether the `Terminal` view is enabled | _`true`_
