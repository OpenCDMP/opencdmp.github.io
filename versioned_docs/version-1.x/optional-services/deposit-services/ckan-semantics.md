---
sidebar_position: 3
sidebar_label: CKAN
description: Reference of every semantic consumed by the CKAN deposit plugin and the CKAN API field it populates
---

# CKAN Deposit — Semantics Reference

The [CKAN deposit plugin](https://hub.docker.com/r/opencdmp/repository-deposit-ckan) submits plans as CKAN datasets and can also create CKAN dataset relationships. During deposit it reads values from the plan blueprint and descriptions, locating each field by its [semantic](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md) tag.

This page lists every CKAN field the plugin can populate and the semantic you must assign to a blueprint or description-template field to populate it.

## How the plugin resolves fields

Each semantic below is applied to both **plan blueprint** fields and **description template** fields. Single-valued semantics use the first matching value found (blueprint takes priority). Multi-valued semantics (tags, extras, relationships) aggregate from all matching fields and de-duplicate.

## Values that are always set (not semantic-driven)

| CKAN field | Source |
|---|---|
| `title` | Plan label. |
| `private` | `true` for restricted plans, `false` for public plans. |
| `notes` | Plan description. |
| `version` | Plan version. |
| `author` | Plan creator's name. |
| `author_email` | Plan creator's email. |
| `maintainer` | Assembled from the plan's contacts. A single contact becomes `"First Last"`; multiple contacts are joined as `"First Last (email)"` entries. |
| `maintainer_email` | Set when the plan has exactly one contact. |

## Dataset fields

| CKAN field | Semantic | Notes |
|---|---|---|
| `type` | `ckan.dataset.type` | Single-valued. |
| `url` | `ckan.dataset.source` | Single-valued. For public plans without a value, falls back to the URL of the plan's public page in OpenCDMP. |
| `owner_org` | `ckan.dataset.organization` | Single-valued. Value must match an existing CKAN organisation. Falls back to plan organisation references, then to the configured default organisation. |
| `license_id` | `ckan.dataset.license` | Single-valued. Value must match an existing CKAN licence id. Falls back to plan licence references. |

## Tags

| CKAN field | Semantic | Notes |
|---|---|---|
| `tags[].name` | `ckan.dataset.tags` | Aggregated from blueprint fields, description template fields, and each description's own tag list. Values must contain only letters, numbers, spaces, dots, underscores, or hyphens; others are silently skipped. Duplicates are dropped. |

## Extras

| CKAN field | Semantic | Notes |
|---|---|---|
| `extras[].key` / `extras[].value` | `ckan.dataset.extras` | Aggregated from blueprint and description template fields. Each matching field produces one extra entry. |

## Relationships

The relationship semantics control [CKAN dataset relationships](https://docs.ckan.org/en/2.11/maintaining/datastore.html). The field value is used as the id of the related dataset.

### This dataset as subject

| Relationship type | Semantic |
|---|---|
| `depends_on` | `ckan.dataset.relationships_as_object.depends_on` |
| `dependency_of` | `ckan.dataset.relationships_as_object.dependency_of` |
| `derives_from` | `ckan.dataset.relationships_as_object.derives_from` |
| `has_derivation` | `ckan.dataset.relationships_as_object.has_derivation` |
| `links_to` | `ckan.dataset.relationships_as_object.links_to` |
| `linked_from` | `ckan.dataset.relationships_as_object.linked_from` |
| `child_of` | `ckan.dataset.relationships_as_object.child_of` |
| `parent_of` | `ckan.dataset.relationships_as_object.parent_of` |

### This dataset as object

| Relationship type | Semantic |
|---|---|
| `depends_on` | `ckan.dataset.relationships_as_subject.depends_on` |
| `dependency_of` | `ckan.dataset.relationships_as_subject.dependency_of` |
| `derives_from` | `ckan.dataset.relationships_as_subject.derives_from` |
| `has_derivation` | `ckan.dataset.relationships_as_subject.has_derivation` |
| `links_to` | `ckan.dataset.relationships_as_subject.links_to` |
| `linked_from` | `ckan.dataset.relationships_as_subject.linked_from` |
| `child_of` | `ckan.dataset.relationships_as_subject.child_of` |
| `parent_of` | `ckan.dataset.relationships_as_subject.parent_of` |

All relationship semantics are assignable to both plan blueprint and description template fields; values from all matching fields are collected and de-duplicated.

## Related

- [Semantics — admin guide](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md)
- [Deposit Services](index.md)
- [Deposit Service Configuration](/versioned_docs/version-1.x/deployment/configuration/backend/deposit.md)
- [CKAN Action API](https://docs.ckan.org/en/latest/api/index.html)
