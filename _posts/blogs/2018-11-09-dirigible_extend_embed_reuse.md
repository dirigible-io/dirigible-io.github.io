---
title: Dirigible - Extend, Embed Reuse
author: yordan.pavlov
---

The latest major upgrade of Dirigible to 3.x opens the door for scenarios like building custom stacks, standardized application CI, embedded Dirigible and many more ...

# Dirigible - Extend, Embed, Reuse

## Overview

With the latest major upgrade to Eclipse Dirigible 3.x, there are a lot of improvements starting from the project structure and stretching all the way up to the entirely new Web IDE. Some of them are:
- New Web IDE
- Entity Data Modeler
- Support for Business Processes
- Standardized Applications CI (WebJars)
- Keycloak Integration
- 200+ Maven Artifacts
- OSGi Free Modules
- and many more ...

In this post, we will emphasize on the improved CI process and the scenarios it unlocks. For example, with the 200+ Maven Artifacts, the customization of Dirigible is more flexible than ever. _**Custom Dirigible Stack**_ can be built with ease, or only some modules can be _**added as dependencies**_ in existing projects (e.g. SQL & Persistency modules). Finally, having a _**hybrid (embedded)**_ deployment is another interesting capability that is worth looking at (e.g. in existing Spring Stack).

# Custom Stack

![Custom-Dirigible-Stack](/img/posts/20181109/Custom-Dirigible-Stack.png){: .img-responsive }

Building a custom Dirigible stack is the second-best option to run in production (if the pre-built releases don't fit the project needs).
The [Helium Custom Stack](http://www.dirigible.io/samples/tutorial_helium_custom_stack.html) tutorial explores in detail all aspects of building a custom Dirigible stack:
1. Setting up maven project(s) layout
2. Building WebJar(s)
3. Exposing an Enterprise JavaScript API (both Java facade and JavaScript API)
4. Consuming Dirigible dependencies

# Reuse of Modules
![Modules-Re-Use](/img/posts/20181109/Modules-Re-Use.png){: .img-responsive }

With 200+ Maven artifacts, it's obvious that some modules can be reused even in non-Dirigible related projects. For example, the SQL builder and the ORM can be consumed on their own:

### Database - SQL Builder:

1. Builder:
    ```java
    ...
    import org.eclipse.dirigible.database.sql.SqlFactory;
    ...

    public class StudentsDao {

        private static SqlFactory sqlFactory;

        public List<StudentEntity> searchByFirstName(String name) {
            String sql = getSqlFactory()
                    .select()
                    .column("*")
                    .from("STUDENTS")
                    .where("STUDENT_FIRST_NAME like ?")
                    .build();
            return query(sql, name);
        }

        private SqlFactory getSqlFactory() {
            if (sqlFactory == null) {
                Connection connection = null;
                try {
                    connection = getConnection();
                    sqlFactory = SqlFactory.getNative(connection);
                } finally {
                    closeConnection(connection);
                }
            }
            return sqlFactory;
	    }
    ...
    ```
1. Dependency:
    ```xml
    <dependency>
        <groupId>org.eclipse.dirigible</groupId>
        <artifactId>dirigible-database-sql</artifactId>
        <version>3.2.8</version>
    </dependency>
    ```

### Database - ORM:

Dirigible's ORM is compatible with the _**Java Persistence API**_:

1. Entity

    ```java
    ...
    import javax.persistence.Column;
    import javax.persistence.GeneratedValue;
    import javax.persistence.GenerationType;
    import javax.persistence.Id;
    import javax.persistence.Table;
    ...

    @Table(name = "STUDENTS")
    public class StudentEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "STUDENT_ID", columnDefinition = "BIGINT")
        private Long id;
    ...
    ```
1. DAO:
    ```java
    ...
    import org.eclipse.dirigible.database.persistence.PersistenceManager;
    ...

    public class StudentsDao {

        private PersistenceManager<StudentEntity> persistenceManager = new PersistenceManager<>();

        public StudentEntity find(Long id) {
            Connection connection = null;
            try {
                connection = getConnection();
                return persistenceManager.find(connection, StudentEntity.class, id);
            } finally {
                closeConnection(connection);
            }
        }

        public List<StudentEntity> query(String sql, Object... values) {
            Connection connection = null;
            try {
                connection = getConnection();
                return persistenceManager.query(connection, StudentEntity.class, sql, values);
            } finally {
                closeConnection(connection);
            }
        }
    ...
    ```
1. Dependency

    ```xml
    <dependency>
        <groupId>org.eclipse.dirigible</groupId>
        <artifactId>dirigible-database-persistence</artifactId>
        <version>3.2.8</version>
    </dependency>
    ```

# Embedded Dirigible

![Embedded-Dirigible](/img/posts/20181109/Embedded-Dirigible.png){: .img-responsive }

The last option is the hybrid/embedded deployment, where a legacy application is running in coexistence with part of the Dirigible stack. The setup targets the scenarios where there is a lot of legacy (Java) code, but the _**low-code/no-code**_ and _**In-System Development**_ capabilities of Dirigible are desired. 

```java
...
import org.eclipse.dirigible.runtime.core.embed.EmbeddedDirigible;
...

public void callDirigible() {
    EmbeddedDirigible dirigible = new EmbeddedDirigible();
    dirigible.load("./content");
    dirigible.executeJavaScript("project/api.js");
}
...
```

For more details about this setup, check out the embedded Dirigible [sample](https://github.com/eclipse/dirigible/tree/master/releng/embedded-all).

# Resources

Experiment with the **single-click deployment** of the following demos from **EclipseCon 2018**:

1. [![Run on Dirigible](https://img.shields.io/badge/Run%20on%20Dirigible-Bookshop-blue.svg)](http://dirigible.eclipse.org/services/v3/web/ide-deploy-manager/index.html?repository=https://github.com/dirigiblelabs/demo-eclipsecon2018-edm.git&uri=/services/v3/web/bookshop-admin/) ([GitHub](https://github.com/dirigiblelabs/demo-eclipsecon2018-edm))

1. [![Run on Dirigible](https://img.shields.io/badge/Run%20on%20Dirigible-Bookshop%20Marketplace-blue.svg)](http://dirigible.eclipse.org/services/v3/web/ide-deploy-manager/index.html?repository=https://github.com/dirigiblelabs/demo-eclipsecon2018-edm-complex.git&uri=/services/v3/web/bookshop/) ([GitHub](https://github.com/dirigiblelabs/demo-eclipsecon2018-edm-complex))

1. [![Run on Dirigible](https://img.shields.io/badge/Run%20on%20Dirigible-Bookshop%20Print%20on%20Demand-blue.svg)](http://dirigible.eclipse.org/services/v3/web/ide-deploy-manager/index.html?repository=https://github.com/dirigiblelabs/demo-eclipsecon2018-bpm.git&uri=/services/v3/web/bookshop/) ([GitHub](https://github.com/dirigiblelabs/demo-eclipsecon2018-bpm))

1. [![Run on Dirigible](https://img.shields.io/badge/Run%20on%20Dirigible-IDE%20Perspective%20&%20View-blue.svg)](http://dirigible.eclipse.org/services/v3/web/ide-deploy-manager/index.html?repository=https://github.com/dirigiblelabs/demo-eclipsecon2018-ide-layout.git&uri=/services/v3/web/ide-layout/) ([GitHub](https://github.com/dirigiblelabs/demo-eclipsecon2018-ide-layout))

1. [![Run on Dirigible](https://img.shields.io/badge/Run%20on%20Dirigible-IDE%20Guestbook-blue.svg)](http://dirigible.eclipse.org/services/v3/web/ide-deploy-manager/index.html?repository=https://github.com/dirigiblelabs/demo-eclipsecon2018-ide.git&uri=/services/v3/web/ide-guestbook/) ([GitHub](https://github.com/dirigiblelabs/demo-eclipsecon2018-ide))
