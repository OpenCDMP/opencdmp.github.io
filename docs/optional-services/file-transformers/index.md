---
sidebar_position: 0
description: Discover everything about the file transformer services
---

# File Transformers

The `File Transformer Services` are standalone services that transform [plans](/docs/using/plans/index.md) and [assets](/docs/using/assets/index.md) into file formats that users can download.

Three file transformer services are available:

| Service | Supported Schema Version(s) | Docker Image | Notes |
|---|---|---|---|
| DOCX File Transformer | - | [`opencdmp/file-transformer-docx`](https://hub.docker.com/r/opencdmp/file-transformer-docx) | PDF files and Word documents, laid out by a Word template and export settings. See [managing templates](docx-templates.md). |
| RDA File Transformer | 1.3 | [`opencdmp/file-transformer-rda-json`](https://hub.docker.com/r/opencdmp/file-transformer-rda-json) | JSON files following the [RDA specification](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard). See the [semantics reference](rda-json-semantics.md). |
| RAiD File Transformer | 1.6 – 1.6.3 | [`opencdmp/file-transformer-raid-json`](https://hub.docker.com/r/opencdmp/file-transformer-raid-json) | JSON files following the [RAiD specification](https://metadata.raid.org/en/v1.6.3/core/core.html#contents). See the [semantics reference](raid-json-semantics.md). |

:::note
You can create your own file transformer; see [File transformer plugin development](/docs/developers/plugins/file-transformers.md).
:::

## Plugin reference

Each file transformer maps plan and asset data to its output in its own way:

- [DOCX — managing templates](docx-templates.md): where templates apply, starting from the built-in template, uploading and previewing
- [DOCX — export settings](docx-export-settings.md): layout, references, cover facts, wording and watermark settings
- [DOCX — template reference](docx-template-reference.md): tags, data and styles for writing a custom template
- [RDA maDMP JSON — semantics reference](rda-json-semantics.md): field semantics used by the RDA JSON export
- [RAiD JSON — semantics reference](raid-json-semantics.md): field semantics used by the RAiD JSON export

---

## See also

- [File Transformer Configuration](/docs/deployment/configuration/backend/file-transformers.md) - Environment variable reference for deploying file transformer services
- [Registering plugin services](/docs/deployment/configuration/plugin-services.md) - Running a file transformer and registering it for the installation or an organisation
