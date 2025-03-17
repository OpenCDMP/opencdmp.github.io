---
sidebar_position: 3
description: Discover everything about the file transformer services
---

# File Transformers

The `File Transformer Services` are standalone services responsible to provide a way for users to download [plans](/docs/application/plans/index.md) and [descriptions](/docs/application/descriptions/index.md) in various file formats. So, their role is to *"transform"* these data structures to these formats.

There are currently two file transformer services implemented and integrated.

- **[Docx file transformer service](https://hub.docker.com/r/opencdmp/file-transformer-docx)**: Used for PDF files and Word documents.
- **[Rda file transformer service](https://hub.docker.com/r/opencdmp/file-transformer-rda-json)**: Used for JSON files following the [RDA specification](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard).

:::note
You can create your own file transformer. More details [here](/docs/for-devs/plugins/file-transformers.md).
:::