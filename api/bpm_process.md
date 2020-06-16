---
layout: api
title: BPM Process
icon: fa-check
---

{{ page.title }}
===

BPM Process object is used to access and manage the BPM process within the underlying engine.


Version 4.x
---

- Module: **bpm/v4/process**
- Alias: **bpm/process**
- Definition: [https://github.com/eclipse/dirigible/issues/227](https://github.com/eclipse/dirigible/issues/227)
- Source: [/bpm/v4/process.js](https://github.com/dirigiblelabs/api-bpm/blob/master/bpm/v4/process.js)
- Facade: [BpmFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-bpm/src/main/java/org/eclipse/dirigible/api/v3/bpm/BpmFacade.java)
- Status: **stable**


### Basic Usage

The service which starts the process:

```javascript
var process = require("bpm/v4/process");
process.start("hello", {
    variable1: "value1"
});
```

The process definition:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef">
  <process id="hello" name="hello" isExecutable="true">
    <startEvent id="sid-3334E861-7999-4B89-B8B0-11724BA17A3E"/>
    <serviceTask id="sayHello" name="SayHello" flowable:class="org.eclipse.dirigible.bpm.flowable.DirigibleCallDelegate">
      <extensionElements>
        <flowable:field name="handler">
          <flowable:string><![CDATA[bpmFlows/hello.js]]></flowable:string>
        </flowable:field>
      </extensionElements>
    </serviceTask>
    <sequenceFlow id="sid-797626AE-B2F6-4C00-ABEE-FB30ADC177E4" sourceRef="sid-3334E861-7999-4B89-B8B0-11724BA17A3E" targetRef="sayHello"/>
    <endEvent id="sid-70B488C1-384A-4E19-8091-1B12D1AEC7FD"/>
    <sequenceFlow id="sid-645847E8-C959-48BD-816B-2E9CC4A2F08A" sourceRef="sayHello" targetRef="sid-70B488C1-384A-4E19-8091-1B12D1AEC7FD"/>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_hello">
    <bpmndi:BPMNPlane bpmnElement="hello" id="BPMNPlane_hello">
      <bpmndi:BPMNShape bpmnElement="sid-3334E861-7999-4B89-B8B0-11724BA17A3E" id="BPMNShape_sid-3334E861-7999-4B89-B8B0-11724BA17A3E">
        <omgdc:Bounds height="30.0" width="30.0" x="103.0" y="78.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sayHello" id="BPMNShape_sayHello">
        <omgdc:Bounds height="80.0" width="100.0" x="300.0" y="105.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-70B488C1-384A-4E19-8091-1B12D1AEC7FD" id="BPMNShape_sid-70B488C1-384A-4E19-8091-1B12D1AEC7FD">
        <omgdc:Bounds height="28.0" width="28.0" x="562.0" y="78.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-797626AE-B2F6-4C00-ABEE-FB30ADC177E4" id="BPMNEdge_sid-797626AE-B2F6-4C00-ABEE-FB30ADC177E4">
        <omgdi:waypoint x="133.0" y="93.0"/>
        <omgdi:waypoint x="201.0" y="93.0"/>
        <omgdi:waypoint x="201.0" y="145.0"/>
        <omgdi:waypoint x="300.0" y="145.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-645847E8-C959-48BD-816B-2E9CC4A2F08A" id="BPMNEdge_sid-645847E8-C959-48BD-816B-2E9CC4A2F08A">
        <omgdi:waypoint x="400.0" y="145.0"/>
        <omgdi:waypoint x="466.0" y="145.0"/>
        <omgdi:waypoint x="466.0" y="92.0"/>
        <omgdi:waypoint x="562.0" y="92.0"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

The delegate 'hello.js':

```javascript
// Hello from the Enterprise Javascript delegate
console.info("Hello from the Javascript Engine!");

// manipulating process variables throughout the execution context
var process = require("bpm/v4/process");
var execution = process.getExecutionContext();
process.setVariable(execution.getId(), "variable2", "value2");
try {
    console.info("variable1: " + process.getVariable(execution.getId(), "variable1"));
    console.info("variable2: " + process.getVariable(execution.getId(), "variable2"));
} catch(e) {
    console.error(e.message);
}
```


### Definition

#### Delegate parameters:

* Type: ServiceType
* Class: **org.eclipse.dirigible.bpm.flowable.DirigibleCallDelegate**
* Field for Service Callback: handler (e.g. 'bpmFlows/hello.js')
* Field for Service Engine Type: type (e.g. 'javascript')

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**start(key, parameters)**   | Starts a process by its key and initial parameters and returns the process instance id | *string*
**getExecutionContext()**   | Returns the execution context object | *ExecutionContext*


#### Objects

---

##### ExecutionContext

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the id from the execution context | *string*
**isActive()**   | Returns the isActive flag from the execution context | *string*
**isScope()**   | Returns the isScope flag from the execution context | *string*
**isConcurrent()**   | Returns the isConcurrent flag from the execution context | *string*
**isEnded()**   | Returns the isEnded flag from the execution context | *string*
**isEventScope()**   | Returns the isEventScope flag from the execution context | *string*
**isMultiInstanceRoot()**   | Returns the isMultiInstanceRoot flag from the execution context | *string*
**isCountEnabled()**   | Returns the isCountEnabled flag from the execution context | *string*
**suspensionState()**   | Returns the suspensionState flag from the execution context | *string*
**startTime()**   | Returns the start time from the execution context | *string*
**eventSubscriptionCount()**   | Returns the event subscription count from the execution context | *string*
**taskCount()**   | Returns the task count from the execution context | *string*
**jobCount()**   | Returns the job count from the execution context | *string*
**timerJobCount()**   | Returns the timer job count from the execution context | *string*
**suspendedJobCount()**   | Returns the suspended job count from the execution context | *string*
**deadLetterJobCount()**   | Returns the dead letter job count from the execution context | *string*
**variableCount()**   | Returns the variable count from the execution context | *string*
**identityLinkCount()**   | Returns the identity link count from the execution context | *string*
**processDefinitionId()**   | Returns the process definition id from the execution context | *string*
**processDefinitionKey()**   | Returns the process definition key from the execution context | *string*
**activityId()**   | Returns the activity id from the execution context | *string*
**processInstanceId()**   | Returns the process instance id from the execution context | *string*
**parentId()**   | Returns the parent process id from the execution context | *string*
**rootProcessInstanceId()**   | Returns the root process instance id from the execution context | *string*
**forcedUpdate()**   | Returns the forcedUpdate flag from the execution context | *string*
**revision()**   | Returns the revision from the execution context | *string*
**tenantId()**   | Returns the tenant id from the execution context | *string*





### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |


---

Version 3.x
---

- Module: **bpm/v3/process**
- Alias: **bpm/process**
- Definition: [https://github.com/eclipse/dirigible/issues/227](https://github.com/eclipse/dirigible/issues/227)
- Source: [/bpm/v3/process.js](https://github.com/dirigiblelabs/api-bpm/blob/master/bpm/v3/process.js)
- Facade: [BpmFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-bpm/src/main/java/org/eclipse/dirigible/api/v3/bpm/BpmFacade.java)
- Status: **alpha**


### Basic Usage

The service which starts the process:

```javascript
var process = require("bpm/v3/process");
process.start("hello", {
    variable1: "value1"
});
```

The process definition:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef">
  <process id="hello" name="hello" isExecutable="true">
    <startEvent id="sid-3334E861-7999-4B89-B8B0-11724BA17A3E"/>
    <serviceTask id="sayHello" name="SayHello" flowable:class="org.eclipse.dirigible.bpm.flowable.DirigibleCallDelegate">
      <extensionElements>
        <flowable:field name="handler">
          <flowable:string><![CDATA[bpmFlows/hello.js]]></flowable:string>
        </flowable:field>
      </extensionElements>
    </serviceTask>
    <sequenceFlow id="sid-797626AE-B2F6-4C00-ABEE-FB30ADC177E4" sourceRef="sid-3334E861-7999-4B89-B8B0-11724BA17A3E" targetRef="sayHello"/>
    <endEvent id="sid-70B488C1-384A-4E19-8091-1B12D1AEC7FD"/>
    <sequenceFlow id="sid-645847E8-C959-48BD-816B-2E9CC4A2F08A" sourceRef="sayHello" targetRef="sid-70B488C1-384A-4E19-8091-1B12D1AEC7FD"/>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_hello">
    <bpmndi:BPMNPlane bpmnElement="hello" id="BPMNPlane_hello">
      <bpmndi:BPMNShape bpmnElement="sid-3334E861-7999-4B89-B8B0-11724BA17A3E" id="BPMNShape_sid-3334E861-7999-4B89-B8B0-11724BA17A3E">
        <omgdc:Bounds height="30.0" width="30.0" x="103.0" y="78.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sayHello" id="BPMNShape_sayHello">
        <omgdc:Bounds height="80.0" width="100.0" x="300.0" y="105.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-70B488C1-384A-4E19-8091-1B12D1AEC7FD" id="BPMNShape_sid-70B488C1-384A-4E19-8091-1B12D1AEC7FD">
        <omgdc:Bounds height="28.0" width="28.0" x="562.0" y="78.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-797626AE-B2F6-4C00-ABEE-FB30ADC177E4" id="BPMNEdge_sid-797626AE-B2F6-4C00-ABEE-FB30ADC177E4">
        <omgdi:waypoint x="133.0" y="93.0"/>
        <omgdi:waypoint x="201.0" y="93.0"/>
        <omgdi:waypoint x="201.0" y="145.0"/>
        <omgdi:waypoint x="300.0" y="145.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-645847E8-C959-48BD-816B-2E9CC4A2F08A" id="BPMNEdge_sid-645847E8-C959-48BD-816B-2E9CC4A2F08A">
        <omgdi:waypoint x="400.0" y="145.0"/>
        <omgdi:waypoint x="466.0" y="145.0"/>
        <omgdi:waypoint x="466.0" y="92.0"/>
        <omgdi:waypoint x="562.0" y="92.0"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

The delegate 'hello.js':

```javascript
// Hello from the Enterprise Javascript delegate
console.info("Hello from the Javascript Engine!");

// manipulating process variables throughout the execution context
var process = require("bpm/v3/process");
var execution = process.getExecutionContext();
process.setVariable(execution.getId(), "variable2", "value2");
try {
    console.info("variable1: " + process.getVariable(execution.getId(), "variable1"));
    console.info("variable2: " + process.getVariable(execution.getId(), "variable2"));
} catch(e) {
    console.error(e.message);
}
```


### Definition

#### Delegate parameters:

* Type: ServiceType
* Class: **org.eclipse.dirigible.bpm.flowable.DirigibleCallDelegate**
* Field for Service Callback: handler (e.g. "bpmFlows/hello.js")
* Field for Service Engine Type: type (e.g. "javascript")

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**start(key, parameters)**   | Starts a process by its key and initial parameters and returns the process instance id | *string*
**getExecutionContext()**   | Returns the execution context object | *ExecutionContext*


#### Objects

---

##### ExecutionContext

Function     | Description | Returns
------------ | ----------- | --------
**getId()**   | Returns the id from the execution context | *string*
**isActive()**   | Returns the isActive flag from the execution context | *string*
**isScope()**   | Returns the isScope flag from the execution context | *string*
**isConcurrent()**   | Returns the isConcurrent flag from the execution context | *string*
**isEnded()**   | Returns the isEnded flag from the execution context | *string*
**isEventScope()**   | Returns the isEventScope flag from the execution context | *string*
**isMultiInstanceRoot()**   | Returns the isMultiInstanceRoot flag from the execution context | *string*
**isCountEnabled()**   | Returns the isCountEnabled flag from the execution context | *string*
**suspensionState()**   | Returns the suspensionState flag from the execution context | *string*
**startTime()**   | Returns the start time from the execution context | *string*
**eventSubscriptionCount()**   | Returns the event subscription count from the execution context | *string*
**taskCount()**   | Returns the task count from the execution context | *string*
**jobCount()**   | Returns the job count from the execution context | *string*
**timerJobCount()**   | Returns the timer job count from the execution context | *string*
**suspendedJobCount()**   | Returns the suspended job count from the execution context | *string*
**deadLetterJobCount()**   | Returns the dead letter job count from the execution context | *string*
**variableCount()**   | Returns the variable count from the execution context | *string*
**identityLinkCount()**   | Returns the identity link count from the execution context | *string*
**processDefinitionId()**   | Returns the process definition id from the execution context | *string*
**processDefinitionKey()**   | Returns the process definition key from the execution context | *string*
**activityId()**   | Returns the activity id from the execution context | *string*
**processInstanceId()**   | Returns the process instance id from the execution context | *string*
**parentId()**   | Returns the parent process id from the execution context | *string*
**rootProcessInstanceId()**   | Returns the root process instance id from the execution context | *string*
**forcedUpdate()**   | Returns the forcedUpdate flag from the execution context | *string*
**revision()**   | Returns the revision from the execution context | *string*
**tenantId()**   | Returns the tenant id from the execution context | *string*


### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---
