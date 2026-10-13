---
sidebar_position: 0
description: Discover everything about the file transformer services
---

# File Transformers

The `File Transformer Services` are standalone services responsible to provide a way for users to download [plans](/versioned_docs/version-1.x/using/plans/index.md) and [descriptions](/versioned_docs/version-1.x/using/descriptions/index.md) in various file formats. So, their role is to *"transform"* these data structures to these formats.

There are currently three file transformer services implemented and integrated:

| Service | Supported Schema Version(s) | Docker Image | Notes |
|---|---|---|---|
| DOCX File Transformer | - | [file-transformer-docx](https://hub.docker.com/r/opencdmp/file-transformer-docx) | PDF files and Word documents. Uses DOCX template placeholders — see the [template reference](docx-templates.md). |
| RDA File Transformer | 1.2 | [file-transformer-rda-json](https://hub.docker.com/r/opencdmp/file-transformer-rda-json) | JSON files following the [RDA specification](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard). See the [semantics reference](rda-json-semantics.md). |
| RAiD File Transformer | 1.6 – 1.6.3 | [file-transformer-raid-json](https://hub.docker.com/r/opencdmp/file-transformer-raid-json) | JSON files following the [RAiD specification](https://metadata.raid.org/en/v1.6.3/core/core.html#contents). See the [semantics reference](raid-json-semantics.md). |

:::note
You can create your own file transformer. More details [here](/versioned_docs/version-1.x/developers/plugins/file-transformers.md).
:::

## Plugin Reference

Each file transformer resolves output fields in its own way. The following pages document, for each plugin, what inputs map to what outputs:

- [DOCX — template reference](docx-templates.md) — placeholder codes recognised in a custom DOCX template
- [RDA maDMP JSON — semantics reference](rda-json-semantics.md) — field semantics used by the RDA JSON export
- [RAiD JSON — semantics reference](raid-json-semantics.md) — field semantics used by the RAiD JSON export

---

## See Also

- [File Transformer Configuration](/versioned_docs/version-1.x/deployment/configuration/backend/file-transformers.md) - Environment variable reference for deploying file transformer services
