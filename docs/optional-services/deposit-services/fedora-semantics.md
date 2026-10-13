---
sidebar_position: 5
sidebar_label: Fedora
description: Reference of every semantic consumed by the Fedora deposit plugin and the Dublin Core element it populates
---

# Fedora Deposit — Semantics Reference

The [Fedora deposit plugin](https://hub.docker.com/r/opencdmp/repository-deposit-fedora) submits plans to a Fedora 6.x repository as RDF using the [Dublin Core Elements 1.1](https://www.dublincore.org/specifications/dublin-core/dces/) vocabulary. During deposit it reads values from the plan blueprint and assets, locating each field by its [semantic](/docs/administering/content-management/templates/semantics.md) tag. To populate a Dublin Core element, assign the semantic listed below to a blueprint or asset-template field.

## How the plugin resolves fields

Every semantic below applies to **both** plan blueprint fields and asset template fields, in every asset of the plan, with no priority between them. Values from either source are merged, de-duplicated, and written as one RDF statement per unique value. Values are written as given, without checks against a vocabulary.

The plugin reads a field's value as follows:

- Text, number, and checkbox fields give their value as entered (`true` or `false` for checkboxes).
- Date fields give the date as `yyyy-MM-dd`.
- Select and radio fields give the label of each chosen option.
- Tag fields give each tag.
- Reference fields give the code of each selected reference.
- Identifier fields give the identifier.

## Values that are always set (not semantic-driven)

| Dublin Core element | Source |
|---|---|
| `dc:date` | Deposit date (today, `yyyy-MM-dd`). |
| `dc:title` | Plan label. |
| `dc:identifier` | For public plans: the address of the plan's public page in OpenCDMP, unless the organisation turns off **Link the public plan page**. Coexists with any `fedora.identifier` semantic values. |
| `dc:creator` | The names of the plan members that the organisation's **Authors from plan members** setting selects: **Every member** (the default), **Owners and editors**, **Owners only**, or **None (only what the blueprint maps)**. One RDF statement per member. Coexists with any `fedora.creator` semantic values; with none, the creators are only those values. |

## Dublin Core semantic mapping

| Dublin Core element | Semantic | Notes |
|---|---|---|
| `dc:creator` | `fedora.creator` | Added to the plan members above. |
| `dc:subject` | `fedora.subject` | |
| `dc:description` | `fedora.description` | |
| `dc:publisher` | `fedora.publisher` | If no field with this semantic has a value, the organisation's **Publisher** setting is used, when set. |
| `dc:contributor` | `fedora.contributor` | |
| `dc:type` | `fedora.type` | |
| `dc:format` | `fedora.format` | |
| `dc:identifier` | `fedora.identifier` | Added to the public plan page above. |
| `dc:source` | `fedora.source` | |
| `dc:language` | `fedora.language` | |
| `dc:relation` | `fedora.relation` | |
| `dc:coverage` | `fedora.coverage` | |
| `dc:rights` | `fedora.rights` | If no field with this semantic has a value, the organisation's **Rights** setting is used, when set. |

Users review these Dublin Core elements before the record is published and can edit them. The organisation can lock the publisher and the rights so that users cannot change them.

## Related

- [Semantics — admin guide](/docs/administering/content-management/templates/semantics.md)
- [Deposit Services](index.md)
- [Deposit Service Configuration](/docs/deployment/configuration/backend/deposit.md)
- [Dublin Core Elements 1.1](https://www.dublincore.org/specifications/dublin-core/dces/)
