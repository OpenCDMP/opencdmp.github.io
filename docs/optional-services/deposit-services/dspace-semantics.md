---
sidebar_position: 2
sidebar_label: DSpace
description: Reference of every semantic consumed by the DSpace deposit plugin and the Dublin Core field it populates
---

# DSpace Deposit — Semantics Reference

The [DSpace deposit plugin](https://hub.docker.com/r/opencdmp/repository-deposit-dspace) submits plans to a DSpace 8.x repository. During deposit it reads values from the plan blueprint and assets, locating each field by its [semantic](/docs/administering/content-management/templates/semantics.md) tag, and writes them to the corresponding Dublin Core field in the DSpace record.

To populate a DSpace field, assign the semantic listed below to a blueprint or asset-template field. Users see the resulting metadata in the review before publishing and can change it there.

## How the plugin resolves fields

Each semantic below is read from both **plan blueprint** fields and **asset template** fields, in every asset of the plan. Values from both sources are merged, and duplicates are dropped.

The plugin reads a field's value as follows:

- Text, number, and checkbox fields give their value as entered (`true` or `false` for checkboxes).
- Date fields give the date as `yyyy-MM-dd`.
- Select and radio fields give the label of each chosen option.
- Tag fields give each tag.
- Reference fields give the code of each selected reference.
- Identifier fields give the identifier.

Fields marked **Several** in the tables below keep every value. Fields marked **One** take one value: when several fields carry the semantic, the record keeps only one of their values, so map each of these semantics to a single field.

The plugin fills the item through the collection's submission form, so the form must include each field the plan maps, as well as the publisher and rights fields when the organisation sets defaults for them. Provenance and the accession dates are the exception: they are written to the item once it is archived.

## Values that are always set (not semantic-driven)

| DSpace field | Value |
|---|---|
| `dc.title` | Plan label. |
| `dc.date.issued` | Date of deposit (`yyyy-MM-dd`). |
| `dc.description.abstract` | Plan description. |
| `dc.identifier.uri` | For public plans: the address of the plan's public page in OpenCDMP, as the first URI, followed by the values of `dspace.identifier.uri`. The plugin adds it to every public plan; the **Link the public plan page** setting does not apply to DSpace. |
| `dc.contributor.author` | The plan members chosen by the organisation's **Authors from plan members** setting, followed by the values of `dspace.contributor.author`. See [Contributors](#contributors). |
| `dc.type` | The default item type, followed by the values of `dspace.type`. See [Type](#type). |
| `dc.language.iso` | The value of `dspace.language`, else the plan's language. |

The plugin also accepts the collection's deposit licence on the submitter's behalf. When the organisation's **Submission** setting publishes records in the archive (the default), a restricted plan's item is hidden from search and browse in DSpace.

## Identifiers

| DSpace field | Semantic | Values |
|---|---|---|
| `dc.identifier.citation` | `dspace.identifier.citation` | Several |
| `dc.identifier.govdoc` | `dspace.identifier.govdoc` | Several |
| `dc.identifier.isbn` | `dspace.identifier.isbn` | Several |
| `dc.identifier.ismn` | `dspace.identifier.ismn` | Several |
| `dc.identifier.other` | `dspace.identifier.other` | Several |
| `dc.identifier.uri` | `dspace.identifier.uri` | Several |

## Titles

| DSpace field | Semantic | Values |
|---|---|---|
| `dc.title.alternative` | `dspace.title.alternative` | Several |

## Descriptions

| DSpace field | Semantic | Values | Notes |
|---|---|---|---|
| `dc.description` | `dspace.description` | One | |
| `dc.description.sponsorship` | `dspace.description.sponsorship` | One | |
| `dc.description.provenance` | `dspace.description.provenance` | One | Written only when the **Submission** setting publishes records in the archive, after the item is archived. |

## Contributors

| DSpace field | Semantic | Values | Notes |
|---|---|---|---|
| `dc.contributor.author` | `dspace.contributor.author` | Several | The authors start with the plan members that the organisation's **Authors from plan members** setting selects: **Every member** (the default), **Owners and editors**, **Owners only**, or **None (only what the blueprint maps)**. The values of this semantic follow them. With none, the authors are only the values of this semantic, and a plan that maps none has no author. |

## Dates

| DSpace field | Semantic | Values | Notes |
|---|---|---|---|
| `dc.date.accessioned` | `dspace.date.accessioned` | One | Written only when the **Submission** setting publishes records in the archive, after the item is archived. |
| `dc.date.available` | `dspace.date.available` | One | Written only when the **Submission** setting publishes records in the archive, after the item is archived. |

## Type

| DSpace field | Semantic | Values | Notes |
|---|---|---|---|
| `dc.type` | `dspace.type` | Several | The first type is always the default item type: the organisation's **Default item type**, else the installation's (`Dataset` unless configured otherwise). The values of this semantic follow it. Each value must be one of the accepted types, matched without regard to case; any other value is written as `Other`. |

The accepted types are `Animation`, `Article`, `Book`, `Book chapter`, `Dataset`, `Learning Object`, `Image`, `Image, 3-D`, `Map`, `Musical Score`, `Plan or blueprint`, `Preprint`, `Presentation`, `Recording, acoustical`, `Recording, musical`, `Recording, oral`, `Software`, `Technical Report`, `Thesis`, `Video`, `Working Paper`, and `Other`.

## Language

| DSpace field | Semantic | Values | Notes |
|---|---|---|---|
| `dc.language.iso` | `dspace.language` | One | If no field with this semantic has a value, the plan's language is used. |

## Publisher

| DSpace field | Semantic | Values | Notes |
|---|---|---|---|
| `dc.publisher` | `dspace.publisher` | One | If no field with this semantic has a value, the organisation's **Publisher** setting is used, when set. |

## Rights

| DSpace field | Semantic | Values | Notes |
|---|---|---|---|
| `dc.rights` | `dspace.rights` | One | If no field with this semantic has a value, the organisation's **Rights** setting is used, when set. |
| `dc.rights.uri` | `dspace.rights.uri` | One | If no field with this semantic has a value, the organisation's **Rights URI** setting is used, when set. |

## Related

- [Semantics — admin guide](/docs/administering/content-management/templates/semantics.md)
- [Deposit Services](index.md)
- [Deposit Service Configuration](/docs/deployment/configuration/backend/deposit.md)
- [DSpace submission JSON Patch API](https://wiki.lyrasis.org/spaces/DSDOC8x/pages/315720842/REST+API)
