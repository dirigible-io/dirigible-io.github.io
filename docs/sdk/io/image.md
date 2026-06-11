# Image

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.io`
- source: [io/Image.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/io/Image.java)
:::

Image resize helper. Reads from any `InputStream` (file, HTTP body, in-memory buffer), scales the image to the requested dimensions, and returns a fresh stream you can pipe into the next sink. The `type` argument is the output format (`"png"`, `"jpg"`, ...) - the platform uses `javax.imageio.ImageIO` under the hood, so the supported list matches whatever codecs are on the JVM classpath.

For more advanced transformations (crop, rotate, compose) drop down to `ImageIO` or a dedicated library and bring the bytes back through `Streams`.

### Key Features:
- **Stream-friendly**: Takes any `InputStream` source and returns an `InputStream` you can pipe forward.
- **Format conversion**: Output format is decided by the `type` argument independently of the input.
- **Pluggable codecs**: Uses `javax.imageio.ImageIO`, so any extra codecs on the classpath light up automatically.

### Example Usage:
```java
import java.io.InputStream;
import org.eclipse.dirigible.sdk.io.Files;
import org.eclipse.dirigible.sdk.io.Image;
import org.eclipse.dirigible.sdk.io.Streams;

try (InputStream src = Files.exists("/var/data/in.png")
        ? java.nio.file.Files.newInputStream(java.nio.file.Paths.get("/var/data/in.png"))
        : null) {
    InputStream resized = Image.resize(src, "png", 256, 256);
    byte[] data = Streams.readBytes(resized);
    // ... write `data` somewhere
}
```

## Methods

### resize()
Resizes the image read from `original` to the given `width` and `height`, encoding the result as `type` and returning a new `InputStream` over the encoded bytes.

> ```java
> public static InputStream resize(InputStream original, String type, int width, int height) throws IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `original` | `InputStream` | Source stream over the original image bytes. |
> | `type` | `String` | Output image format (e.g. `"png"`, `"jpg"`). |
> | `width` | `int` | Target width in pixels. |
> | `height` | `int` | Target height in pixels. |
>
> ::: info Returns
> - **Type**: `InputStream`
> - **Description**: A new stream over the resized image bytes.
> :::
