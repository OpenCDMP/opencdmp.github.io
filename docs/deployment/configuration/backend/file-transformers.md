---
sidebar_position: 3
title: File transformer services
description: Environment variables of the DOCX, RDA JSON, and RAiD JSON file transformer services
---

# File transformer services

These are the settings of the shipped [file transformer services](/docs/optional-services/file-transformers/index.md). Every transformer also reads the [settings common to all plugin services](/docs/deployment/configuration/plugin-services.md#settings-common-to-all-plugin-services): `IDP_ISSUER_URI`, `IDP_CLAIMS_ROLES_PATH`, and `SECURITY_AUDIENCE` for authentication, `PROFILE`, the logging settings, and `STORAGE_PATH`. To make a transformer available, register it in the API service; see [Registering plugin services](/docs/deployment/configuration/plugin-services.md).

## DOCX file transformer

Exports plans and assets as Word documents and, through the PDF service, as PDF. Image `opencdmp/file-transformer-docx` on Docker Hub, plugin id `docx-file-transformer`.

### Templates

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `WORD_FILE_TRANSFORMER_WORD_PLAN_TEMPLATE` | Built-in Word template for plans. Organisations can upload their own; see [Managing templates](/docs/optional-services/file-transformers/docx-templates.md). | No | `classpath:documents/plan.docx` | `file:/config/plan.docx` |
| `WORD_FILE_TRANSFORMER_WORD_DESCRIPTION_TEMPLATE` | Built-in Word template for assets. | No | `classpath:documents/description.docx` | `file:/config/description.docx` |
| `WORD_FILE_TRANSFORMER_PID_LINKS` | JSON file that maps persistent identifier types (DOI, Handle, arXiv, and others) to the links written for them, such as `https://doi.org/{pid}`. A value without a prefix is read from the transformer's own files. | No | `classpath:pidLinks.json` | `file:/config/pidLinks.json` |

### PDF conversion

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `PDF_CONVERTER_URL` | Address of the [Gotenberg](https://gotenberg.dev/) PDF service that converts the Word output to PDF. | Yes | - | `http://opencdmp.pdf-service:3000` |
| `PDF_CONVERTER_PDFA_FORMAT` | When set, the PDF conversion produces archival PDF/A output in the given format. Supported values depend on the Gotenberg LibreOffice route: `PDF/A-1b`, `PDF/A-2b`, `PDF/A-3b`. | No | - | `PDF/A-2b` |
| `PDF_CONVERTER_PDFUA` | When `true`, the PDF conversion produces PDF/UA (accessibility) compliant output. | No | `false` | `true` |

### Plugin settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `WORD_FILE_TRANSFORMER_USE_SHARED_STORAGE` | Exchange files with the API service through a shared folder; see [Shared storage](/docs/deployment/configuration/plugin-services.md#shared-storage). | No | `false` | `true` |
| `WORD_FILE_TRANSFORMER_ORGANIZATIONS_CODE` | Code of the reference type of organisations. | No | `organisations` | `organisations` |
| `WORD_FILE_TRANSFORMER_GRANTS_CODE` | Code of the reference type of grants. | No | `grants` | `grants` |
| `WORD_FILE_TRANSFORMER_RESEARCHERS_CODE` | Code of the reference type of researchers. | No | `researchers` | `researchers` |
| `WORD_FILE_TRANSFORMER_LICENCES_CODE` | Code of the reference type of licences. | No | `licenses` | `licenses` |
| `WORD_FILE_TRANSFORMER_DATASETS_CODE` | Code of the reference type of datasets. | No | `datasets` | `datasets` |
| `WORD_FILE_TRANSFORMER_PUBLICATIONS_CODE` | Code of the reference type of publications. | No | `publications` | `publications` |

The `*_CODE` variables are described in [Reference type codes](/docs/deployment/configuration/plugin-services.md#reference-type-codes).

## RDA JSON file transformer

Exports and imports plans in the RDA maDMP JSON format, which the deposit services and evaluators also use. Image `opencdmp/file-transformer-rda-json` on Docker Hub, plugin id `rda-file-transformer`. See the [RDA JSON semantics reference](/docs/optional-services/file-transformers/rda-json-semantics.md).

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `RDA_FILE_TRANSFORMER_USE_SHARED_STORAGE` | Exchange files with the API service through a shared folder; see [Shared storage](/docs/deployment/configuration/plugin-services.md#shared-storage). | No | `false` | `true` |
| `RDA_FILE_TRANSFORMER_ORGANIZATIONS_CODE` | Code of the reference type of organisations. | No | `organisations` | `organisations` |
| `RDA_FILE_TRANSFORMER_GRANTS_CODE` | Code of the reference type of grants. | No | `grants` | `grants` |
| `RDA_FILE_TRANSFORMER_FUNDERS_CODE` | Code of the reference type of funders. | No | `funders` | `funders` |
| `RDA_FILE_TRANSFORMER_RESEARCHERS_CODE` | Code of the reference type of researchers. | No | `researchers` | `researchers` |
| `RDA_FILE_TRANSFORMER_LICENCES_CODE` | Code of the reference type of licences. | No | `licenses` | `licenses` |
| `RDA_FILE_TRANSFORMER_PROJECTS_CODE` | Code of the reference type of projects. | No | `projects` | `projects` |
| `RDA_FILE_TRANSFORMER_DATASETS_CODE` | Code of the reference type of datasets. | No | `datasets` | `datasets` |
| `RDA_FILE_TRANSFORMER_PUBLICATIONS_CODE` | Code of the reference type of publications. | No | `publications` | `publications` |

The grants, funders, projects, and researchers codes are also the defaults of settings that each organisation can change for the transformer.

## RAiD JSON file transformer

Exports and imports plans in the RAiD JSON format. Image `opencdmp/file-transformer-raid-json` on Docker Hub, plugin id `raid-file-transformer`. See the [RAiD JSON semantics reference](/docs/optional-services/file-transformers/raid-json-semantics.md).

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `RAID_FILE_TRANSFORMER_USE_SHARED_STORAGE` | Exchange files with the API service through a shared folder; see [Shared storage](/docs/deployment/configuration/plugin-services.md#shared-storage). | No | `false` | `true` |

---

## See also

- [Registering plugin services](/docs/deployment/configuration/plugin-services.md) - Run, register, and test a transformer, and the settings every plugin shares
- [Backend configuration: file transformer service authentication](/docs/deployment/configuration/backend/index.md#file-transformer-service-authentication) - The client the API service signs in with
- [File transformers](/docs/optional-services/file-transformers/index.md) - What each transformer produces
- [Keycloak setup](/docs/deployment/configuration/keycloak.md) - The `plugins` client scope
