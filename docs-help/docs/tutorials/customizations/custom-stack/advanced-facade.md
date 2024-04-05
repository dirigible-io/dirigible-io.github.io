---
title: Custom Stack - Advanced Facade
---

Custom Stack - Advanced Facade
===

## Overview

This section will guide you through the different ways of creating a `TypeScript API` for the Eclipse Dirigible Custom Stack.

!!! note "Prerequisites"

    - Node.js 18+ - Node.js versions can be found [here](https://nodejs.org/en/download)
    - esbuild 0.19+ - esbuild versions can be found [here](https://esbuild.github.io/getting-started/#install-esbuild)
    - tsc 5.2+ - tsc versions can be found [here](https://www.typescriptlang.org/download)
	- The [Facade](../facade/) section is completed.

### Steps

#### Create Java Facade

- Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Navigate to the `apis/src/main/java/io/dirigible/samples/` folder.
- Create `Example.java`, `SubExample.java`, `ExampleRequest.java`, `ExampleResponse.java` and `ExampleService.java` files.

=== "Example.java"

	1. Create new `apis/src/main/java/io/dirigible/samples/api/domain/Example.java` file.
	1. Paste the following content:

	??? abstract "apis/src/main/java/io/dirigible/samples/api/domain/Example.java"

		```java
		package io.dirigible.samples.api.domain;

		import java.util.ArrayList;
		import java.util.List;

		public class Example {

			private String id;

			private String name;

			private List<SubExample> subexamples = new ArrayList<>();

			public String getId() {
				return id;
			}

			public String getName() {
				return name;
			}

			public List<SubExample> getSubexamples() {
				return subexamples;
			}

			public void setId(String id) {
				this.id = id;
			}

			public void setName(String name) {
				this.name = name;
			}

			public void setSubexamples(List<SubExample> subexamples) {
				this.subexamples = subexamples;
			}

			public Example withId(String id) {
				setId(id);
				return this;
			}

			public Example withName(String name) {
				setName(name);
				return this;
			}

			public Example withSubexamples(List<SubExample> subexamples) {
				setSubexamples(subexamples);
				return this;
			}
		}
		```

=== "SubExample.java"

	1. Create new `apis/src/main/java/io/dirigible/samples/api/domain/SubExample.java` file.
	1. Paste the following content:

	??? abstract "apis/src/main/java/io/dirigible/samples/api/domain/SubExample.java"

		```java
		package io.dirigible.samples.api.domain;

		import java.util.Date;

		public class SubExample {

			private Date date;

			public Date getDate() {
				return date;
			}

			public void setDate(Date date) {
				this.date = date;
			}

			public SubExample withDate(Date date) {
				setDate(date);
				return this;
			}
		}
		```

=== "ExampleRequest.java"

	1. Create new `apis/src/main/java/io/dirigible/samples/api/domain/input/ExampleRequest.java` file.
	1. Paste the following content:

	??? abstract "apis/src/main/java/io/dirigible/samples/api/domain/input/ExampleRequest.java"

		```java
		package io.dirigible.samples.api.domain.input;

		public class ExampleRequest {

			private String exampleId;
			private String exampleName;

			public String getExampleId() {
				return exampleId;
			}

			public void setExampleId(String exampleId) {
				this.exampleId = exampleId;
			}

			public String getExampleName() {
				return exampleName;
			}

			public void setExampleName(String exampleName) {
				this.exampleName = exampleName;
			}

			public ExampleRequest withExampleId(String exampleId) {
				setExampleId(exampleId);
				return this;
			}

			public ExampleRequest withExampleName(String exampleName) {
				setExampleName(exampleName);
				return this;
			}
		}
		```

=== "ExampleResponse.java"

	1. Create new `apis/src/main/java/io/dirigible/samples/api/domain/output/ExampleResponse.java` file.
	1. Paste the following content:

	??? abstract "apis/src/main/java/io/dirigible/samples/api/domain/output/ExampleResponse.java"

		```java
		package io.dirigible.samples.api.domain.output;

		import java.util.ArrayList;
		import java.util.List;

		import io.dirigible.samples.api.domain.Example;

		public class ExampleResponse {

			private List<Example> examples = new ArrayList<>();

			public List<Example> getExamples() {
				return examples;
			}

			public void setExamples(List<Example> examples) {
				this.examples = examples;
			}

			public ExampleResponse withExamples(List<Example> examples) {
				setExamples(examples);
				return this;
			}
		}
		```

=== "ExampleService.java"

	1. Create new `apis/src/main/java/io/dirigible/samples/api/service/ExampleService.java` file.
	1. Paste the following content:

	??? abstract "apis/src/main/java/io/dirigible/samples/api/service/ExampleService.java"

		```java
		package io.dirigible.samples.api.service;

		import io.dirigible.samples.api.domain.input.ExampleRequest;
		import io.dirigible.samples.api.domain.output.ExampleResponse;

		public interface ExampleService {

			ExampleResponse doExample(ExampleRequest request);
		}
		```

#### Create TypeScript API

- Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Navigate to the `apis/src/main/resources/META-INF/dirigible/custom-api/` folder.
- Create `Example.ts`, `SubExample.ts`, `ExampleRequest.ts` and `ExampleResponse.ts` files.

	!!! note

		The TypeScript files are `1:1` representation of the Java classes. They have the same methods, signature and logic as the Java classes. All TypeScript files are in the `custom-api` folder and don't follow the Java packages nesting, just for simplicity.

=== "Example.ts"

	1. Create new `apis/src/main/resources/META-INF/dirigible/custom-api/Example.ts` file.
	1. Paste the following content:

	??? abstract "apis/src/main/resources/META-INF/dirigible/custom-api/Example.ts"

		```typescript
		import { SubExample } from "./SubExample";

		export class Example {

			// @ts-ignore
			private id: string;

			// @ts-ignore
			private name: string;

			// @ts-ignore
			private subexamples: SubExample[] = [];

			public getId(): string {
				return this.id;
			}

			public getName(): string {
				return this.name;
			}

			public getSubexamples(): SubExample[] {
				return this.subexamples;
			}

			public setId(id: string): void {
				this.id = id;
			}

			public setName(name: string): void {
				this.name = name;
			}

			public setSubexamples(subexamples: SubExample[]): void {
				this.subexamples = subexamples;
			}

			public withId(id: string): Example {
				this.setId(id);
				return this;
			}

			public withName(name: string): Example {
				this.setName(name);
				return this;
			}

			public withSubexamples(subexamples: SubExample[]): Example {
				this.setSubexamples(subexamples);
				return this;
			}
		}
		```

=== "SubExample.ts"

	1. Create new `apis/src/main/resources/META-INF/dirigible/custom-api/SubExample.ts` file.
	1. Paste the following content:

	??? abstract "apis/src/main/resources/META-INF/dirigible/custom-api/SubExample.ts"

		```typescript
		export class SubExample {

			// @ts-ignore
			private date: Date;

			public getDate(): Date {
				return this.date;
			}

			public setDate(date: Date): void {
				this.date = date;
			}

			public withDate(date: Date): SubExample {
				this.setDate(date);
				return this;
			}
		}
		```

=== "ExampleRequest.ts"

	1. Create new `apis/src/main/resources/META-INF/dirigible/custom-api/ExampleRequest.ts` file.
	1. Paste the following content:

	??? abstract "apis/src/main/resources/META-INF/dirigible/custom-api/ExampleRequest.ts"

		```typescript
		export class ExampleRequest {

			// @ts-ignore
			private exampleId: string;

			// @ts-ignore
			private exampleName: string;

			public getExampleId(): string {
				return this.exampleId;
			}

			public setExampleId(exampleId: string): void {
				this.exampleId = exampleId;
			}

			public getExampleName(): string {
				return this.exampleName;
			}

			public setExampleName(exampleName: string): void {
				this.exampleName = exampleName;
			}

			public withExampleId(exampleId: string): ExampleRequest {
				this.setExampleId(exampleId);
				return this;
			}

			public withExampleName(exampleName: string): ExampleRequest {
				this.setExampleName(exampleName);
				return this;
			}
		}
		```

=== "ExampleResponse.ts"

	1. Create new `apis/src/main/resources/META-INF/dirigible/custom-api/ExampleResponse.ts` file.
	1. Paste the following content:

	??? abstract "apis/src/main/resources/META-INF/dirigible/custom-api/ExampleResponse.ts"

		```typescript
		import { Example } from "./Example";

		export class ExampleResponse {

			private examples: Example[] = [];

			public getExamples(): Example[] {
				return this.examples;
			}

			public setExamples(examples: Example[]): void {
				this.examples = examples;
			}

			public withExamples(examples: Example[]): ExampleResponse {
				this.setExamples(examples);
				return this;
			}
		}
		```

#### Create Java Client Facade

- Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Navigate to the `apis/src/main/java/io/dirigible/samples/` folder.
- Create `ExampleClient.java` and `ExampleClientV2.java` files.

!!! tip "ExampleClient.java vs ExampleClientV2.java"

	There is a difference in the method signature of the `ExampleClient` and the `ExampleClientV2` classes. Although they have the same functionallity there is difference in the `input parameter type` and the `return type`.

	In `ExampleClient`:

	```java
	public ExampleResponse doExample(ExampleRequest request)
	```

	In `ExampleClientV2`:

	```java
	public String doExample(String requestAsString)
	```

	The `ExampleClientV2` accepts `String` input parameter instead of `ExampleRequest` and returns also `String` instead of `ExampleResponse`. Inside the implementation `Gson` is used to parse and to stringify the JSON representation of the `ExampleRequest` and the `ExampleResponse`.

	This technique is used to simplify the integration between the Java facade and the TypeScript API.

=== "ExampleClient.java"

	1. Create new `apis/src/main/java/io/dirigible/samples/api/client/ExampleClient.java` file.
	1. Paste the following content:

	??? abstract "apis/src/main/java/io/dirigible/samples/api/client/ExampleClient.java"

		```java
		package io.dirigible.samples.api.client;

		import java.util.Date;

		import com.google.gson.Gson;

		import io.dirigible.samples.api.domain.Example;
		import io.dirigible.samples.api.domain.SubExample;
		import io.dirigible.samples.api.domain.input.ExampleRequest;
		import io.dirigible.samples.api.domain.output.ExampleResponse;
		import io.dirigible.samples.api.service.ExampleService;

		public class ExampleClient implements ExampleService {

			@Override
			public ExampleResponse doExample(ExampleRequest request) {
				final var exampleResponse = new ExampleResponse();
				final var subexample = new SubExample().withDate(new Date());
				final var example = new Example().withId(request.getExampleId()).withName("Example Name");
				example.getSubexamples().add(subexample);
				exampleResponse.getExamples().add(example);
				return exampleResponse;
			}

		}
		```

=== "ExampleClientV2.java"

	1. Create new `apis/src/main/java/io/dirigible/samples/api/client/ExampleClientV2.java` file.
	1. Paste the following content:

	??? abstract "apis/src/main/java/io/dirigible/samples/api/client/ExampleClientV2.java"

		```java
		package io.dirigible.samples.api.client;

		import java.util.Date;

		import com.google.gson.Gson;

		import io.dirigible.samples.api.domain.Example;
		import io.dirigible.samples.api.domain.SubExample;
		import io.dirigible.samples.api.domain.input.ExampleRequest;
		import io.dirigible.samples.api.domain.output.ExampleResponse;

		public class ExampleClientV2 {

			public String doExample(String requestAsString) {
				final var gson = new Gson();
				final var request = gson.fromJson(requestAsString, ExampleRequest.class);
				final var exampleResponse = new ExampleResponse();
				final var subexample = new SubExample().withDate(new Date());
				final var example = new Example().withId(request.getExampleId()).withName("Example Name");
				example.getSubexamples().add(subexample);
				exampleResponse.getExamples().add(example);
				return gson.toJson(exampleResponse);
			}

		}
		```

#### Create TypeScript API Client

- Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Navigate to the `apis/src/main/resources/META-INF/dirigible/custom-api/` folder.
- Create `ExampleClient.ts`, `ExampleClientV2.ts`, `ExampleRequestV2.ts` and `ExampleResponseV2.ts` files.

!!! tip "ExampleClient.ts vs ExampleClientV2.ts"

	The `ExampleClient` uses the native Java objects, so it has to follow the _**`Java way`**_ of creation of objects and assigning properties.

	The `ExampleClientV2` uses TypeScript `interfaces`, that represents the Java classes _(see `ExampleRequestV2.ts` and `ExampleResponseV2.ts`)_ to follow the _**`TypeScript way`**_ of creation of objects and assigning properties.

=== "ExampleClient.ts"

	1. Create new `apis/src/main/resources/META-INF/dirigible/custom-api/ExampleClient.ts` file.
	1. Paste the following content:

	??? abstract "apis/src/main/resources/META-INF/dirigible/custom-api/ExampleClient.ts"

		```typescript
		import { ExampleResponse } from "./ExampleResponse";
		import { ExampleRequest } from "./ExampleRequest";
		import { Example } from "./Example";
		import { SubExample } from "./SubExample";

		const ExampleClientClass = Java.type("io.dirigible.samples.api.client.ExampleClient");
		const ExampleRequestClass = Java.type("io.dirigible.samples.api.domain.input.ExampleRequest");

		export class ExampleClient {

			public doExample(request: ExampleRequest): ExampleResponse {
				const requestObj = new ExampleRequestClass();
				requestObj.setExampleId(request.getExampleId());
				requestObj.setExampleName(request.getExampleName());

				const responseObj = new ExampleClientClass().doExample(requestObj);

				const examples: Example[] = [];

				for (const exampleObj of responseObj.getExamples()) {
					const example = new Example();
					const subExamples: SubExample[] = [];

					example.setId(exampleObj.getId());
					example.setName(exampleObj.getName());

					for (const subexampleObj of exampleObj.getSubexamples()) {
						const subexample = new SubExample();
						subexample.setDate(subexampleObj.getDate());
						subExamples.push(subexample);
					}
					example.setSubexamples(subExamples)

					examples.push(example);
				}

				const response = new ExampleResponse();
				response.setExamples(examples);
				return response;
			}
		}
		```

=== "ExampleClientV2.ts"

	1. Create new `apis/src/main/resources/META-INF/dirigible/custom-api/ExampleClientV2.ts` file.
	1. Paste the following content:

	??? abstract "apis/src/main/resources/META-INF/dirigible/custom-api/ExampleClientV2.ts"

		```typescript
		import { ExampleResponseV2 } from "./ExampleResponseV2";
		import { ExampleRequestV2 } from "./ExampleRequestV2";

		const ExampleClientV2Class = Java.type("io.dirigible.samples.api.client.ExampleClientV2");

		export class ExampleClientV2 {

			public doExample(request: ExampleRequestV2): ExampleResponseV2 {
				const response = new ExampleClientV2Class().doExample(JSON.stringify(request));
				return JSON.parse(response);
			}
		}
		```

=== "ExampleRequestV2.ts"

	1. Create new `apis/src/main/resources/META-INF/dirigible/custom-api/ExampleRequestV2.ts` file.
	1. Paste the following content:

	??? abstract "apis/src/main/resources/META-INF/dirigible/custom-api/ExampleRequestV2.ts"

		```typescript
		export interface ExampleRequestV2 {
			readonly exampleId: string;
			readonly exampleName: string;
		}
		```

=== "ExampleResponseV2.ts"

	1. Create new `apis/src/main/resources/META-INF/dirigible/custom-api/ExampleResponseV2.ts` file.
	1. Paste the following content:

	??? abstract "apis/src/main/resources/META-INF/dirigible/custom-api/ExampleResponseV2.ts"

		```typescript
		export interface SubExampleV2 {
			readonly date: Date;
		}

		export interface ExampleV2 {
			readonly id: string;
			readonly name: string;
			readonly subexamples: SubExampleV2[];
		}

		export interface ExampleResponseV2 {
			readonly examples: ExampleV2[];
		}
		```

#### Build the Custom Platform

- Navigate to the root folder of the project _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Open the **Terminal** and execute the following command to build the _Custom Platform_:

	```
	mvn clean install
	```

#### Run the Custom Platform

- Navigate to the root folder of the project _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Open the **Terminal** and execute the following command to run the _Custom Stack_:

	```
	java --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED -jar application/target/custom-stack-application-*.jar
	```

- Go to [http://localhost:8080](http://localhost:8080/) to access the _Custom Stack_.

#### Test the Advanced TypeScript API

- Create a project named `demo-application`.
- Right click on the `demo-application` project and select **New &#8594; TypeScript CJS Service**.
- Enter `demo-client.ts` for the name of the TypeScript Service.
- Replace the content with the following code:

	```typescript
	import { response } from "sdk/http";
	import { ExampleClient } from "custom-api/ExampleClient";
	import { ExampleRequest } from "custom-api/ExampleRequest";

	const exampleRequest = new ExampleRequest();
	exampleRequest.setExampleId('example-id-1234');
	exampleRequest.setExampleName('Custom Stack Example');

	const exampleClient = new ExampleClient();
	const exampleResponse = exampleClient.doExample(exampleRequest);

	response.println(JSON.stringify(exampleResponse, null, 2));
	```

- Save the changes.
- Enter `demo-client-v2.ts` for the name of the TypeScript Service.
- Replace the content with the following code:

	```typescript
	import { response } from "sdk/http";
	import { ExampleClientV2 } from "custom-api/ExampleClientV2";
	import { ExampleRequestV2 } from "custom-api/ExampleRequestV2";

	const exampleRequest: ExampleRequestV2 = {
		exampleId: 'example-id-1234',
		exampleName: 'Custom Stack Example'
	};

	const exampleClient = new ExampleClientV2();
	const exampleResponse = exampleClient.doExample(exampleRequest);

	response.println(JSON.stringify(exampleResponse, null, 2));
	```

- Save the changes.
- Right click on the `demo-application` project and select **New &#8594; File**.
- Enter `tsconfig.json` for the name of the File.

	```json
	{
		"compilerOptions": {
			"module": "ESNext",
			"target": "ES6",
			"moduleResolution": "Node",
			"baseUrl": "../",
			"lib": [
				"ESNext",
				"DOM"
			],
			"paths": {
				"sdk/*": [
					"../modules/src/*"
				],
				"/*": [
					"../*"
				]
			},
			"types": [
				"../modules/types"
			]
		}
	}
	```

- Save the changes.
- Right click on the `demo-application` project and select **New &#8594; File**.
- Enter `project.json` for the name of the File.

	```json
	{
		"guid": "demo-application",
		"actions": [
			{
				"name": "Build TypeScript",
				"commands": [
					{
						"os": "unix",
						"command": "tsc"
					},
					{
						"os": "windows",
						"command": "cmd /c tsc"
					}
				],
				"registry": "true"
			}
		]
	}
	```

- Save the changes.
- Right click on the `demo-application` project and select **Publish**.
- Select the `demo-client.ts` from the **Projects** explorer and open the **Preview** view to see the result.
- Select the `demo-client-v2.ts` from the **Projects** explorer and open the **Preview** view to see the result.

!!! tip 

	As in the TypeScript API Client section, there is a difference between the usage of the `ExampleClient` and the `ExampleClientV2` in the application code.

	_The `demo-client.ts` uses the `ExampleClient` and the native Java objects, so it has to follow the _**`Java way`**_ of creation of objects and assigning properties, while the `demo-client-v2.ts` follows the _**`TypeScript way`**_ of creation of objects and assigning properties._

## Next Steps

!!! success "Section Completed"

    After completing the steps in this tutorial, you would have:

    - Two different versions of the `ExampleClient` Java Facades.
    - Two different versions of the `ExampleClient` TypeScript APIs.
	- Learned the difference between the native _**`Java way`**_ and native _**`TypeScript way`**_ of implementing the Java Facades and the TypeScript APIs

    Continue to the [Dependency](../dependency/) section where external Maven dependency is added and used in the Custom Stack without creating a Java Facade and TypeScript API.

    _**Note:** The complete content of the Custom Stack tutorial is available at: [https://github.com/dirigiblelabs/sample-custom-stack](https://github.com/dirigiblelabs/sample-custom-stack)_