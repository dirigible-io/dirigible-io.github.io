# Image

## Overview

::: tip Module
- package: `@aerokit/sdk/io`
- source: [io/image.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/io/image.ts)
- last updated: 
:::

The Image class provides a static façade for performing common image manipulation operations, primarily focusing on resizing images. It allows developers to easily resize images by specifying the desired dimensions and output format, while abstracting away the complexities of handling image processing directly.

### Key Features:
- **Image Resizing**: The `resize` method enables resizing an image to specified dimensions and output format, making it suitable for various use cases such as generating thumbnails or optimizing images for web delivery.

### Use Cases:
- **Thumbnail Generation**: Developers can use the Image class to create smaller versions of images for use as thumbnails in galleries or listings.
- **Image Optimization**: Resizing images to appropriate dimensions can help optimize them for faster loading times on websites and applications.

### Example Usage:
```ts
import { Image } from "@aerokit/sdk/io";
import { InputStream } from "@aerokit/sdk/io/streams";

// Assume we have an InputStream containing the original image data
const originalImageStream = new InputStream(...);

// Resize the image to 200x200 pixels in PNG format
const resizedImageStream = Image.resize(originalImageStream, "png", 200, 200);

// The resizedImageStream can now be used for further processing or output
```

## Classes

### Image

#### resize()

Resizes an image contained within an InputStream to the specified dimensions.

> ```ts
> static resize(original: InputStream, type: string, width: number, height: number): InputStream;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `original` | `InputStream` | The InputStream containing the original image data. |
> | `type` | `string` | The target format of the resized image (e.g., "png", "jpeg", "gif"). |
> | `width` | `number` | The target width in pixels. |
> | `height` | `number` | The target height in pixels. |
>
> ::: info Returns
> - **Type**: `InputStream`
> - **Description**: A new InputStream containing the resized image data in the specified format.
> :::

