# Process

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.bpm`
- source: [bpm/Process.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/bpm/Process.java)
:::

Start, inspect, and steer Flowable process instances from Java code. The static helpers cover the everyday surface - starting a process by definition key, reading and writing instance variables, correlating message events. Anything beyond that (sub-process trees, history queries, advanced delegate state) is one step away through the underlying Flowable `BpmProviderFlowable` returned by `getEngine()`.

Variables are exchanged as native Java values - strings, numbers, booleans, and JSON-friendly `Map`s land in Flowable's variable store unchanged. Use this together with the `.bpmn` synchronizer for steady-state processes; the `Deployer` helper covers programmatic deployment when you need it.

### Key Features:
- **Static facade** - all methods are `public static`; no instance to create.
- **Native value passing** - variables flow as plain Java types into Flowable.
- **Escape hatch** - `getEngine()` exposes the raw `BpmProviderFlowable` for advanced cases.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.bpm.Process;
import java.util.Map;

String instanceId = Process.start(
    "order-fulfilment",
    "ORDER-42",
    "{\"customer\":\"acme\",\"amount\":1299.00}");

Process.setVariable(instanceId, "approver", "alice");
Object current = Process.getVariable(instanceId, "approver");

Process.correlateMessageEvent(instanceId, "payment-received", Map.of("txId", "T-7"));
```

## Methods

### getEngine()

Returns the underlying Flowable provider for advanced use cases not covered by this facade.

> ```java
> public static BpmProviderFlowable getEngine();
> ```
>
> ::: info Returns
> - **Type**: `BpmProviderFlowable`
> - **Description**: The raw Flowable engine the facade delegates to.
> :::

### start()

Starts a new process instance for the given process-definition key.

> ```java
> public static String start(String key, String businessKey, String parametersJson);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `String` | Process-definition key (BPMN `id`). |
> | `businessKey` | `String` | Application-level correlation id, typically a primary key from another table. |
> | `parametersJson` | `String` | JSON document whose top-level fields become the initial process variables. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The newly created process-instance id.
> :::

### setProcessInstanceName()

Updates the human-readable name of a running process instance.

> ```java
> public static void setProcessInstanceName(String processInstanceId, String name);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `String` | The instance id returned by `start`. |
> | `name` | `String` | New display name. |

### updateBusinessKey()

Changes the application-level correlation key on a running instance.

> ```java
> public static void updateBusinessKey(String processInstanceId, String businessKey);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `String` | The instance id. |
> | `businessKey` | `String` | New business key. |

### updateBusinessStatus()

Updates the business-status string carried alongside the instance.

> ```java
> public static void updateBusinessStatus(String processInstanceId, String businessStatus);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `String` | The instance id. |
> | `businessStatus` | `String` | New status label. |

### getVariable()

Reads a single process variable.

> ```java
> public static Object getVariable(String processInstanceId, String variableName);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `String` | The instance id. |
> | `variableName` | `String` | Variable to fetch. |
>
> ::: info Returns
> - **Type**: `Object`
> - **Description**: The variable value, or `null` if not set.
> :::

### getVariables()

Reads all process variables of an instance as a `Map`.

> ```java
> public static Map<String, Object> getVariables(String processInstanceId);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `String` | The instance id. |
>
> ::: info Returns
> - **Type**: `Map<String, Object>`
> - **Description**: All variables currently set on the instance.
> :::

### setVariable()

Sets a single process variable.

> ```java
> public static void setVariable(String processInstanceId, String variableName, Object value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `String` | The instance id. |
> | `variableName` | `String` | Variable name. |
> | `value` | `Object` | New value. |

### removeVariable()

Removes a process variable.

> ```java
> public static void removeVariable(String processInstanceId, String variableName);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `String` | The instance id. |
> | `variableName` | `String` | Variable to remove. |

### correlateMessageEvent()

Delivers a message event with payload variables to all process instances waiting on a matching intermediate-message catch event. The execution is resumed transactionally.

> ```java
> public static void correlateMessageEvent(String processInstanceId, String messageName, Map<String, Object> variables);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `String` | The instance id (or `null` to broadcast to any matching instance). |
> | `messageName` | `String` | The BPMN message name. |
> | `variables` | `Map<String, Object>` | Payload promoted into process scope. |
