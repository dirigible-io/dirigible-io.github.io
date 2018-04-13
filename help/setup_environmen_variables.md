---
layout: help
title: Environment Variables
icon: none
group: help-setup
---

Environment Variables
===

## Configuration Parameters

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

  > Note: The JAR path is absolute inside the class path

#### Repository Search

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_REPOSITORY_SEARCH_ROOT_FOLDER**   | The location of the root folder to be used by the indexing engine | default is *'.'*
**DIRIGIBLE_REPOSITORY_SEARCH_ROOT_FOLDER_IS_ABSOLUTE**   | Whether the location of the root folder is absolute or context dependent | *true* or *false*
**DIRIGIBLE_REPOSITORY_SEARCH_INDEX_LOCATION**   | The sub-folder under the root folder where the index files will be stored | e.g. 'dirigible/repository/index'


#### Database

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_DATABASE_PROVIDER**   | The name of the database provider which will be used in this instance | *local* or *managed* or *custom* - default is *local*
**DIRIGIBLE_DATABASE_DEFAULT_SET_AUTO_COMMIT**   | The *AUTO_COMMIT* data source parameter | *true*
**DIRIGIBLE_DATABASE_DEFAULT_MAX_CONNECTIONS_COUNT**   | The *MAX_CONNECTIONS_COUNT* data source parameter | *8*
**DIRIGIBLE_DATABASE_DEFAULT_WAIT_TIMEOUT**   | The *WAIT_TIMEOUT* data source parameter | *500*
**DIRIGIBLE_DATABASE_DEFAULT_WAIT_COUNT**   | The *WAIT_COUNT* data source parameter | *5*
**DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES**   | The list of the custom data sources names used in this instance | default is *''*
**DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT**   | The name of the primary data source used in this instance | default is *'DefaultDB'*

#### Scheduler

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_SCHEDULER_DATABASE_DRIVER**   | The name of the database driver used by Quartz if not the default one | default is *''*
**DIRIGIBLE_SCHEDULER_DATABASE_URL**   | The name of the database URL used by Quartz if not the default one | default is *''*
**DIRIGIBLE_SCHEDULER_DATABASE_USER**   | The name of the database user name used by Quartz if not the default one | default is *''*
**DIRIGIBLE_SCHEDULER_DATABASE_PASSWORD**   | The name of the database password used by Quartz if not the default one | default is *''*
**DIRIGIBLE_SCHEDULER_DATASOURCE_NAME**   | The name of the custom data-source used by Quartz if not the default one | default is *''*

#### Database Derby

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_DATABASE_DERBY_DEFAULT_ROOT_FOLDER**   | The location used by Derby database | default is *.*

#### Persistence

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_PERSISTENCE_CREATE_TABLE_ON_USE**   | Whether the table to be created automatically on use if it does not exist | default is *true*


#### Runtime Core

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_HOME_URL**   | The home URL where the user to be redirected on access | default is */services/v3/web/ide/index.html*

#### CMS

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_PROVIDER**   | The type of the CMS provider used in this instance | internal or managed or remote - default is *internal*

##### Internal

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER**   | The location of the CMS internal repository | default is *target*
**DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER_IS_ABSOLUTE**   | Whether the root folder parameter is absolute or not | *false*

##### Managed

Parameter     | Description | Default*
------------ | ----------- | --------
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_JNDI_NAME**   | The JNDI name of the managed CMS repository | default is *java:comp/env/EcmService* in case of SAP package
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_AUTH_METHOD**   | The authentication method | key or destination - default is *key*
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_NAME**   | The name of the repository | e.g. cmis:dirigible
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_KEY**   | The key of the repository | e.g. cmis:dirigible:key
**DIRIGIBLE_CMS_MANAGED_CONFIGURATION_DESTINATION**   | The name of the destination where the name and the key for the repository are stored | e.g. CMIS_DESTINATION
**DIRIGIBLE_CONNECTIVITY_CONFIGURATION_JNDI_NAME**   | The JNDI name of the connectivity configuration serivce | default is *java:comp/env/connectivity/Configuration* in case of SAP package

### Engines
---

#### JavaScript

**DIRIGIBLE_JAVASCRIPT_ENGINE_TYPE_DEFAULT**   | The type of the JavaScript engine provider used in this instance | rhino or nashorn or v8 - default is *rhino*


The source is [here](https://github.com/eclipse/dirigible/blob/master/modules/commons/commons-config/README.md)

