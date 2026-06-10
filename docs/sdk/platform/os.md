# Os

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.platform`
- source: [platform/Os.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/platform/Os.java)
:::

Read-only snapshot of the host JVM — operating system, architecture, processor count, and the current memory budget. Useful for diagnostics endpoints and for jobs that want to gate their batch size by available memory.

Implemented directly against `Runtime` and JVM system properties (`os.name`, `os.arch`), so the values are the same ones reported by `Runtime.getRuntime()` and `System.getProperty(...)`. "Available memory" follows the conventional JVM definition: `maxMemory - (totalMemory - freeMemory)` — i.e. how much more the heap can grow before hitting `-Xmx`, not how much physical RAM the OS has free. For OS-level numbers you need a JMX-based view (see `com.sun.management.OperatingSystemMXBean`).

### Key Features

- **OS identity**: `os.name` and `os.arch` straight from system properties.
- **CPU count**: `availableProcessors()` for sizing thread pools.
- **JVM memory snapshot**: Free, total, max, and effective-available heap sizes.

### Example Usage

```java
import org.eclipse.dirigible.sdk.platform.Os;

String os   = Os.getOS();          // e.g. "Linux"
String arch = Os.getArch();        // e.g. "amd64"
int cpus    = Os.getProcessors();  // e.g. 8

long freeBytes = Os.getAvailableMemory();
if (freeBytes < 200L * 1024 * 1024) {
    // back off — heap is close to -Xmx
}
```

## Methods

### getOS()

Returns the host operating-system name as reported by `System.getProperty("os.name")`.

> ```java
> public static String getOS();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The value of the `os.name` system property (e.g. `"Linux"`, `"Mac OS X"`, `"Windows 10"`).
> :::

### getArch()

Returns the host architecture as reported by `System.getProperty("os.arch")`.

> ```java
> public static String getArch();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The value of the `os.arch` system property (e.g. `"amd64"`, `"aarch64"`).
> :::

### getProcessors()

Returns the number of processors available to the JVM.

> ```java
> public static int getProcessors();
> ```
>
> ::: info Returns
> - **Type**: `int`
> - **Description**: The value of `Runtime.getRuntime().availableProcessors()`.
> :::

### getFreeMemory()

Returns the amount of free memory in the current heap, in bytes.

> ```java
> public static long getFreeMemory();
> ```
>
> ::: info Returns
> - **Type**: `long`
> - **Description**: `Runtime.getRuntime().freeMemory()` — free space within the currently committed heap.
> :::

### getTotalMemory()

Returns the total amount of memory in the current heap, in bytes.

> ```java
> public static long getTotalMemory();
> ```
>
> ::: info Returns
> - **Type**: `long`
> - **Description**: `Runtime.getRuntime().totalMemory()` — the currently committed heap size.
> :::

### getMaxMemory()

Returns the maximum amount of memory the JVM will attempt to use, in bytes.

> ```java
> public static long getMaxMemory();
> ```
>
> ::: info Returns
> - **Type**: `long`
> - **Description**: `Runtime.getRuntime().maxMemory()` — typically the `-Xmx` setting.
> :::

### getAvailableMemory()

Returns how much more the heap can grow before hitting `-Xmx`, in bytes.

> ```java
> public static long getAvailableMemory();
> ```
>
> ::: info Returns
> - **Type**: `long`
> - **Description**: `maxMemory - (totalMemory - freeMemory)` — the effective free budget against the heap ceiling.
> :::
