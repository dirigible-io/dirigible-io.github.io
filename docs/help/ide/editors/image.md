---
title: Image Editor
description: Raster image preview - dimensions, file size, format. No editing.
---

# Image Editor

Read-only preview for raster images opened from the project tree (`*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.bmp`, `*.webp`, `*.ico`).

Component: `editor-image`.

## What it shows

- The image, rendered at native resolution.
- File name and repository path.
- Dimensions (width x height in pixels).
- File size.
- Detected format.

## What it does not do

- No drawing, cropping, resizing, or colour adjustment.
- No re-encoding. Use external tooling and re-import.

For runtime image processing in user code, see [`@aerokit/sdk/io/image`](/sdk/io/image).
