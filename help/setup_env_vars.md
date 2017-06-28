---
layout: help
title: Environment Variables
icon: none
group: help-setup
---

{{ page.title }}
===

There are a few parameters, which can reconfigure dynamically the behavior of the Eclipse Dirigible instance. They can be either pass as a initialization parameters in the web.xml or more flexible approach - via system parameters a.k.a environment variables.


Parameters
---

Parameter     | Description | Default*
------------ | ----------- | --------
**runtimeUrl**   | The location of the root context path. Depends on the name of the WAR file | empty
**servicesUrl**   | The mapping of the Equinox OSGi "services" Servlet | /services
**enableRoles**   | Enable usage of roles - Developer, Operators, etc. Default is true, false means Everyone can do anything | true
**logInSystemOutput**   | Print logs in the System Output in addition to the standard logger. Workaround for some application servers | false
**jndiDefaultDataSource**   | The key (e.g. in JNDI) for the Default Database DataSource | java:comp/env/jdbc/DefaultDB
**jndiConnectivityService**   | The key (e.g. in JNDI) for the Connectivity Service  | empty
**jndiMailService**   | The key (e.g. in JNDI) for the Mail Service | empty
**jdbcAutoCommit**   | "Auto Commit" property for database connection (JDBC) | false
**jdbcMaxConnectionsCount**   | Available database connections count | 8
**jdbcWaitTimeout**   | Maximum waiting timeout of a connection before to be considered as a hanging connection | 500
**jdbcWaitCount**   | Maximum number of tries to keep it alive, if free connections are still available | 5
**repositoryProvider**   | Default Repository Provider. Can be *local* (file-system based), *db* (RDBMS based), rcp (Eclipse Workspace based)  | local
**repositoryProviderMaster**   | Default Repository Provider Master (used for Initial Load or Reset). Can be *filesystem*, *db*, *git*, *zip*, *jar* | 
**localRepositoryRootFolder** | The root folder of the repository in case of a *local* | 
**localRepositoryRootFolderName** | The name of the root folder in case of a *local* repository | dirigible_local
**localRepositoryRootFolderIsAbsolute** | Whether the root folder is absolute or relative, in case of a *local* or *zip* | 
**masterRepositoryGitTarget** | Target Git folder, in case of a *git* master repository | 
**masterRepositoryGitLocation** | The Git repository location, in case of a *git* master repository | 
**masterRepositoryGitUser** | The Git user, in case of a *git* master repository | 
**masterRepositoryGitPassword** | The Git password, in case of a *git* master repository | 
**masterRepositoryGitBranch** | The Git branch, in case of a *git* master repository |
**masterRepositoryZipLocation** | The Zip file location on the file system, in case of a *zip* master repository | 
**masterRepositoryJarPath** | The Zip file location in the Jar file accessible via System, Parent or Current Classloaders, in case of a *jar* master repository | 
**localDatabaseRootFolder** | The root folder of the local Derby database in case of a *local* | 
**localCmisRootFolder** | The root folder of the CMIS repository in case of a *local* | 
**defaultDataSourceType**   | Type of the Default Database DataSource. Possible options are **jndi** and **local** | local
**mailSender**   | provided built-in | true
**homeLocation**   | Whether to check the user roles. Useful to disable in "trial" mode | true
**runTestsOnInit**   | Perform execution of all the available test on the current instance during startup | true
**autoActivateEnabled**   | Enable Auto-Activate option. Artifacts go to Sandbox space on Save | true
**autoPublishEnabled**   | Enable Auto-Publish option. Artifacts go to Registry space on Save | true
**enableSandbox**   | Enable Sandboxing" option | false
**jndiCmisService**   | Lookup and inject an CMIS service from the infrastructure if present | java:comp/env/EcmService (for SAP HCP)
**jndiCmisServiceName**   | The name of the CMIS repository | cmis:dirigible
**jndiCmisServiceKey**   | The access key of the CMIS repository | cmis:dirigible:key
**jndiCmisServiceAuth**   | The type of authentication of the CMIS repository. The valid values are 'key' and 'destination' | key
**jndiCmisServiceDestination**   | The destination name where the name and the key of the CMIS repository are stored as User and Password fields (related to SAP HCP) | cmis
**defaultTheme**   | The default theme for this instance | default
**dataSourceDefaultUrl** | The URL property for the custom JDBC DataSource |
**dataSourceDefaultDriver** | The Driver property for the custom JDBC DataSource |
**dataSourceDefaultUser** | The User property for the custom JDBC DataSource |
**dataSourceDefaultPassword** | The Password property for the custom JDBC DataSource |
**dataSourceDefaultAutoCommit** | The AutoCommit property for the custom JDBC DataSource |
**dataSourceDefaultMaxActive** | The MaxActive property for the custom JDBC DataSource |
**dataSourceDefaultMaxIdle** | The MaxIdle property for the custom JDBC DataSource |
**dataSourceDefaultMaxWait** | The MaxWait property for the custom JDBC DataSource |




* the default values above are according the default Tomcat setup option. They can differ depending on the application platform and the cloud provider.

