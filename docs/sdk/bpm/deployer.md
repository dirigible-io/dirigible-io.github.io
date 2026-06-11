# Deployer

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.bpm`
- source: [bpm/Deployer.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/bpm/Deployer.java)
:::

Programmatic Flowable process deployer - sibling to the `.bpmn` synchronizer for the cases where you need to push process definitions from code (one-off migrations, sample data loaders, tests).

`deployProcess(String)` accepts a path inside the platform repository (typically under `/registry/public/<project>/<file>.bpmn`); the returned id is Flowable's deployment id, which you then pass to `undeployProcess(String)` or `deleteProcess(String, String)` to clean up.

For long-lived processes the synchronizer-based flow is preferable - drop the `.bpmn` into the project and let the platform pick it up; reach for this class only when ad-hoc deployment is actually required.

### Key Features:
- **Repository-path deployment**: Deploy a `.bpmn` straight from a registry path - no classpath or URL juggling.
- **Symmetric lifecycle**: Pair each deploy with `undeployProcess` (definitions) or `deleteProcess` (running instances).
- **Synchronizer-friendly**: Coexists with the file synchronizer; use one or the other per definition.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.bpm.Deployer;

// one-off deployment from code
String deploymentId = Deployer.deployProcess("/registry/public/demo/order.bpmn");

// later - tear it down
Deployer.undeployProcess(deploymentId);

// terminate a specific running instance
Deployer.deleteProcess(processInstanceId, "cancelled by admin");
```

## Methods

### deployProcess()
Deploys the BPMN process definition at `location` (a repository path) and returns the Flowable deployment id.

> ```java
> public static String deployProcess(String location);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `location` | `String` | Repository path to the `.bpmn` definition (e.g. `/registry/public/demo/order.bpmn`). |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The Flowable deployment id.
> :::

### undeployProcess()
Removes a deployment previously registered via `deployProcess(String)`. Running instances of processes from that deployment are *not* terminated - use `deleteProcess(String, String)` for instance-level cleanup.

> ```java
> public static void undeployProcess(String deploymentId);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `deploymentId` | `String` | The Flowable deployment id returned by `deployProcess`. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### deleteProcess()
Terminates a specific process instance with the given reason text (visible in Flowable's history tables and the BPM perspective).

> ```java
> public static void deleteProcess(String processInstanceId, String reason);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `String` | The process instance id to terminate. |
> | `reason` | `String` | Human-readable termination reason (recorded in history). |
>
> ::: info Returns
> - **Type**: `void`
> :::
