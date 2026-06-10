# bpm/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.bpm`
- source: [bpm/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/bpm)
:::

This module provides Business Process Management (BPM) functionalities for the Eclipse Dirigible Java SDK, on top of the embedded Flowable engine. It covers everything a Java module needs to drive a BPMN process — deploying definitions, starting instances, reading and writing process variables, correlating messages, and completing user tasks.

All classes in this module are stateless facades exposing `public static` methods that delegate to the `BpmFacade` (and through it, Flowable). For everyday process work the static helpers are enough; for advanced cases (history queries, sub-process navigation, custom delegates) `Process.getEngine()` returns the raw Flowable `BpmProviderFlowable`.

The main components of this module are:
- **Deployer**: Programmatic deployment of `.bpmn` process definitions from repository paths.
- **Process**: Start, inspect, and steer process instances; read/write variables; correlate message events; reach the raw Flowable engine.
- **Tasks**: List user-task work for the calling user, read/write task variables, and complete tasks.

## Classes

- [Deployer](./deployer.md)
- [Process](./process.md)
- [Tasks](./tasks.md)
