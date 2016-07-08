---
layout: help
title: Environment Variables
icon: fa-cogs
group: help-setup
---

Environment Variables supported during bootstrap
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
**repositoryProviderMaster**   | Default Repository Provider Master (used for Initial Load or Reset). Can be *filesystem*, *db*, *git* | 
**defaultDataSourceType**   | Type of the Default Database DataSource. Possible options are **jndi** and **local** | local
**mailSender**   | provided built-in | true
**homeLocation**   | Whether to check the user roles. Useful to disable in "trial" mode | true
**runTestsOnInit**   | Perform execution of all the available test on the current instance during startup | true
**autoActivateEnabled**   | Enable Auto-Activate option. Artifacts go to Sandbox space on Save | true
**autoPublishEnabled**   | Enable Auto-Publish option. Artifacts go to Registry space on Save | true
**enableSandbox**   | Enable Sandboxing" option | false



* the default values above are according the default Tomcat setup option. They can differ depending on the application platform and the cloud provider.

