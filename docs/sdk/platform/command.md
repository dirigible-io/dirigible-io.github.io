# Command

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.platform`
- source: [platform/Command.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/platform/Command.java)
:::

Spawns OS-level processes from the JVM, captures their merged stdout/stderr, and returns it as a `String`. The first overload runs with the inherited environment; the second and third let you add or remove specific variables; the third also accepts a `ProcessExecutionOptions` record for advanced settings (working directory, timeout, capture-error-stream toggle).

Use with caution - the command string is passed to a shell on POSIX and to `cmd /c` on Windows, so any user-supplied input must be sanitized or the call should use a `ProcessExecutionOptions` variant that takes an argv array (see the `commons-process` package for the full API).

### Key Features

- **Inherited environment by default**: Calls without explicit env-handling reuse the JVM's environment.
- **Selective env mutation**: Add or remove individual variables for a single invocation.
- **Advanced options**: Working directory, timeout, and error-stream capture via `ProcessExecutionOptions`.
- **Captured output**: Merged stdout/stderr returned as a `String`.

### Example Usage

```java
import java.util.List;
import java.util.Map;
import org.eclipse.dirigible.commons.process.execution.ProcessExecutionOptions;
import org.eclipse.dirigible.sdk.platform.Command;

// Simple invocation with the inherited environment:
String out = Command.exec("ls -la /tmp");

// Add and remove environment variables:
String result = Command.exec(
    "node -e 'console.log(process.env.MY_VAR)'",
    Map.of("MY_VAR", "hello"),
    List.of("UNWANTED_VAR")
);

// Advanced options - set a working directory and timeout:
ProcessExecutionOptions options = new ProcessExecutionOptions();
options.setWorkingDirectory("/tmp");
String advanced = Command.exec("pwd", Map.of(), List.of(), options);
```

## Methods

### exec()

Runs the given command using the JVM's inherited environment and returns its merged stdout/stderr.

> ```java
> public static String exec(String command) throws ExecutionException, InterruptedException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `command` | `String` | The shell command line to execute. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The merged stdout/stderr of the spawned process.
> :::

### exec()

Runs the given command with the inherited environment, plus the supplied additions and removals.

> ```java
> public static String exec(String command, Map<String, String> envAdditions, List<String> envRemovals)
>         throws ExecutionException, InterruptedException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `command` | `String` | The shell command line to execute. |
> | `envAdditions` | `Map<String, String>` | Environment variables to add (or override) for this invocation. |
> | `envRemovals` | `List<String>` | Names of inherited environment variables to remove for this invocation. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The merged stdout/stderr of the spawned process.
> :::

### exec()

Runs the given command with explicit env mutations and an advanced options record (working directory, timeout, capture-error-stream toggle).

> ```java
> public static String exec(String command, Map<String, String> envAdditions, List<String> envRemovals, ProcessExecutionOptions options)
>         throws ExecutionException, InterruptedException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `command` | `String` | The shell command line to execute. |
> | `envAdditions` | `Map<String, String>` | Environment variables to add (or override) for this invocation. |
> | `envRemovals` | `List<String>` | Names of inherited environment variables to remove for this invocation. |
> | `options` | `ProcessExecutionOptions` | Advanced settings - working directory, timeout, error-stream capture. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The merged stdout/stderr of the spawned process.
> :::
