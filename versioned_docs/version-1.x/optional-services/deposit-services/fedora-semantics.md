---
sidebar_position: 5
sidebar_label: Fedora
description: Reference of every semantic consumed by the Fedora deposit plugin and the Dublin Core element it populates
---

# Fedora Deposit — Semantics Reference

The [Fedora deposit plugin](https://hub.docker.com/r/opencdmp/repository-deposit-fedora) submits plans to a Fedora 6.x repository as RDF using the [Dublin Core Elements 1.1](https://www.dublincore.org/specifications/dublin-core/dces/) vocabulary. During deposit it reads values from the plan blueprint and descriptions, locating each field by its [semantic](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md) tag.

This page lists every Dublin Core element the plugin can populate and the semantic you must assign to a blueprint or description-template field to populate it.

## How the plugin resolves fields

Every semantic below applies to **both** plan blueprint fields and description template fields with no priority ordering — values from either source are merged into a de-duplicated set and emitted as one RDF statement per unique value.

## Values that are always set (not semantic-driven)

| Dublin Core element | Source |
|---|---|
| `dc:date` | Deposit date (today, `yyyy-MM-dd`). |
| `dc:title` | Plan label. |
| `dc:identifier` | For public plans: the URL of the plan's public page in OpenCDMP. Coexists with any `fedora.identifier` semantic values. |
| `dc:creator` | Every plan user's name (one RDF statement per user). Coexists with any `fedora.creator` semantic values. |

## Dublin Core semantic mapping

| Dublin Core element | Semantic |
|---|---|
| `dc:creator` | `fedora.creator` |
| `dc:subject` | `fedora.subject` |
| `dc:description` | `fedora.description` |
| `dc:publisher` | `fedora.publisher` |
| `dc:contributor` | `fedora.contributor` |
| `dc:type` | `fedora.type` |
| `dc:format` | `fedora.format` |
| `dc:identifier` | `fedora.identifier` |
| `dc:source` | `fedora.source` |
| `dc:language` | `fedora.language` |
| `dc:relation` | `fedora.relation` |
| `dc:coverage` | `fedora.coverage` |
| `dc:rights` | `fedora.rights` |

## Related

- [Semantics — admin guide](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md)
- [Deposit Services](index.md)
- [Deposit Service Configuration](/versioned_docs/version-1.x/deployment/configuration/backend/deposit.md)
- [Dublin Core Elements 1.1](https://www.dublincore.org/specifications/dublin-core/dces/)
