---
sidebar_position: 2
sidebar_label: DSpace
description: Reference of every semantic consumed by the DSpace deposit plugin and the Dublin Core field it populates
---

# DSpace Deposit — Semantics Reference

The [DSpace deposit plugin](https://hub.docker.com/r/opencdmp/repository-deposit-dspace) submits plans to a DSpace 8.x repository. During deposit it reads values from the plan blueprint and descriptions, locating each field by its [semantic](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md) tag, and writes them to the corresponding Dublin Core field in the DSpace record.

This page lists every DSpace field the plugin can populate and the semantic you must assign to a blueprint or description-template field to populate it.

## How the plugin resolves fields

Each semantic below is applied to both **plan blueprint** fields and **description template** fields. Values from both sources are merged and all collected values are written to the corresponding Dublin Core field.

## Values that are always set (not semantic-driven)

| DSpace field | Value |
|---|---|
| `dc.title` | Plan label. |
| `dc.date.issued` | Date of deposit. |
| `dc.description.abstract` | Plan description. |
| `dc.identifier.uri` | For public plans: the URL of the plan's public page in OpenCDMP. |

## Identifiers

| DSpace field | Semantic |
|---|---|
| `dc.identifier.citation` | `dspace.identifier.citation` |
| `dc.identifier.govdoc` | `dspace.identifier.govdoc` |
| `dc.identifier.isbn` | `dspace.identifier.isbn` |
| `dc.identifier.ismn` | `dspace.identifier.ismn` |
| `dc.identifier.other` | `dspace.identifier.other` |
| `dc.identifier.uri` | `dspace.identifier.uri` |

## Titles

| DSpace field | Semantic |
|---|---|
| `dc.title.alternative` | `dspace.title.alternative` |

## Descriptions

| DSpace field | Semantic |
|---|---|
| `dc.description` | `dspace.description` |
| `dc.description.sponsorship` | `dspace.description.sponsorship` |
| `dc.description.provenance` | `dspace.description.provenance` |

## Contributors

| DSpace field | Semantic | Notes |
|---|---|---|
| `dc.contributor.author` | `dspace.contributor.author` | Plan members' names are always included. If no field with this semantic is found, plan members are still set as authors. |

## Dates

| DSpace field | Semantic |
|---|---|
| `dc.date.accessioned` | `dspace.date.accessioned` |
| `dc.date.available` | `dspace.date.available` |

## Type

| DSpace field | Semantic | Notes |
|---|---|---|
| `dc.type` | `dspace.type` | `"Dataset"` is always included as an entry. If no field with this semantic is found, the default type is used as a fallback. |

## Language

| DSpace field | Semantic | Notes |
|---|---|---|
| `dc.language.iso` | `dspace.language` | If no field with this semantic is found, the plan's language is used as a fallback. |

## Publisher

| DSpace field | Semantic |
|---|---|
| `dc.publisher` | `dspace.publisher` |

## Related

- [Semantics — admin guide](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md)
- [Deposit Services](index.md)
- [Deposit Service Configuration](/versioned_docs/version-1.x/deployment/configuration/backend/deposit.md)
- [DSpace submission JSON Patch API](https://wiki.lyrasis.org/display/DSDOC8x/REST+API)
