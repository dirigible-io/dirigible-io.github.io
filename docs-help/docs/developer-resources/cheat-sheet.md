---
title: Cheat Sheet
---

Cheat Sheet
===


Clean Up Database
---

1. Go to the `Database` perspective.
2. Switch to the `local` datasource type and select the `SystemDB`.
3. Execute the following queries:

=== "Delete Data"

    ```sql
    DELETE FROM DIRIGIBLE_BPM;
    DELETE FROM DIRIGIBLE_DATA_STRUCTURES;
    DELETE FROM DIRIGIBLE_EXTENSIONS;
    DELETE FROM DIRIGIBLE_EXTENSION_POINTS;
    DELETE FROM DIRIGIBLE_IDENTITY;
    DELETE FROM DIRIGIBLE_JOBS;
    DELETE FROM DIRIGIBLE_LISTENERS;
    DELETE FROM DIRIGIBLE_MIGRATIONS;
    DELETE FROM DIRIGIBLE_ODATA;
    DELETE FROM DIRIGIBLE_ODATA_CONTAINER;
    DELETE FROM DIRIGIBLE_ODATA_MAPPING;
    DELETE FROM DIRIGIBLE_ODATA_SCHEMA;
    DELETE FROM DIRIGIBLE_ODATA_HANDLER;
    DELETE FROM DIRIGIBLE_PUBLISH_LOGS;
    DELETE FROM DIRIGIBLE_PUBLISH_REQUESTS;
    DELETE FROM DIRIGIBLE_SECURITY_ACCESS;
    DELETE FROM DIRIGIBLE_SECURITY_ROLES;
    DELETE FROM DIRIGIBLE_SYNCHRONIZER_STATE;
    DELETE FROM DIRIGIBLE_SYNCHRONIZER_STATE_ARTEFACTS
    DELETE FROM DIRIGIBLE_SYNCHRONIZER_STATE_LOG;
    DELETE FROM DIRIGIBLE_WEBSOCKETS;

    DELETE FROM QUARTZ_BLOB_TRIGGERS;
    DELETE FROM QUARTZ_CALENDARS;
    DELETE FROM QUARTZ_CRON_TRIGGERS;
    DELETE FROM QUARTZ_FIRED_TRIGGERS;
    DELETE FROM QUARTZ_LOCKS;
    DELETE FROM QUARTZ_PAUSED_TRIGGER_GRPS;
    DELETE FROM QUARTZ_SCHEDULER_STATE;
    DELETE FROM QUARTZ_SIMPLE_TRIGGERS;
    DELETE FROM QUARTZ_SIMPROP_TRIGGERS;
    DELETE FROM QUARTZ_TRIGGERS;
    DELETE FROM QUARTZ_JOB_DETAILS;
    ```

=== "Drop Tables"

    ```sql
    DROP TABLE DIRIGIBLE_BPM;
    DROP TABLE DIRIGIBLE_DATA_STRUCTURES;
    DROP TABLE DIRIGIBLE_EXTENSIONS;
    DROP TABLE DIRIGIBLE_EXTENSION_POINTS;
    DROP TABLE DIRIGIBLE_IDENTITY;
    DROP TABLE DIRIGIBLE_JOBS;
    DROP TABLE DIRIGIBLE_LISTENERS;
    DROP TABLE DIRIGIBLE_MIGRATIONS;
    DROP TABLE DIRIGIBLE_ODATA;
    DROP TABLE DIRIGIBLE_ODATA_CONTAINER;
    DROP TABLE DIRIGIBLE_ODATA_MAPPING;
    DROP TABLE DIRIGIBLE_ODATA_SCHEMA;
    DROP TABLE DIRIGIBLE_ODATA_HANDLER;
    DROP TABLE DIRIGIBLE_PUBLISH_LOGS;
    DROP TABLE DIRIGIBLE_PUBLISH_REQUESTS;
    DROP TABLE DIRIGIBLE_SECURITY_ACCESS;
    DROP TABLE DIRIGIBLE_SECURITY_ROLES;
    DROP TABLE DIRIGIBLE_SYNCHRONIZER_STATE;
    DROP TABLE DIRIGIBLE_SYNCHRONIZER_STATE_ARTEFACTS;
    DROP TABLE DIRIGIBLE_SYNCHRONIZER_STATE_LOG;
    DROP TABLE DIRIGIBLE_WEBSOCKETS;

    DROP TABLE QUARTZ_BLOB_TRIGGERS;
    DROP TABLE QUARTZ_CALENDARS;
    DROP TABLE QUARTZ_CRON_TRIGGERS;
    DROP TABLE QUARTZ_FIRED_TRIGGERS;
    DROP TABLE QUARTZ_LOCKS;
    DROP TABLE QUARTZ_PAUSED_TRIGGER_GRPS;
    DROP TABLE QUARTZ_SCHEDULER_STATE;
    DROP TABLE QUARTZ_SIMPLE_TRIGGERS;
    DROP TABLE QUARTZ_SIMPROP_TRIGGERS;
    DROP TABLE QUARTZ_TRIGGERS;
    DROP TABLE QUARTZ_JOB_DETAILS;
    ```
