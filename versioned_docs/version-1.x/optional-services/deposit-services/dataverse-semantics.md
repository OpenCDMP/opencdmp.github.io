---
sidebar_position: 4
sidebar_label: Dataverse
description: Reference of every semantic consumed by the Dataverse deposit plugin and the citation-block field it populates
---

# Dataverse Deposit — Semantics Reference

The [Dataverse deposit plugin](https://hub.docker.com/r/opencdmp/repository-deposit-dataverse) creates datasets on a Dataverse instance by building the citation metadata block and submitting it to a target dataverse. During deposit it reads values from the plan blueprint and descriptions, locating each field by its [semantic](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md) tag.

This page lists every Dataverse output field the plugin can populate and the semantic you must assign to a blueprint or description-template field to populate it.

## How the plugin resolves fields

Each semantic below is applied to both **plan blueprint** fields and **description template** fields. Single-valued semantics use the first matching value found. Multi-valued semantics aggregate from all matching fields and de-duplicate.

Where a field set is mentioned, all semantics must appear on child fields of the **same** description-template field set — one Dataverse compound entry is produced per field-set item.

## Dataverse targeting

| Purpose | Semantic | Notes |
|---|---|---|
| Target dataverse alias | `dataverse.identifier` | Blueprint or description template. Falls back to the configured default alias. Selects the destination dataverse collection; not written into the dataset metadata. |

## Values that are always set (not semantic-driven)

| Dataverse field | Source |
|---|---|
| `citation.title` | Plan label. |
| `citation.dsDescription[].dsDescriptionValue` | Plan description, appended as a final entry alongside any semantic-derived descriptions. |
| `citation.author[].authorName` | Each plan member's name (one author per member). Affiliation is set from plan organisation references. |
| `citation.datasetContact[].datasetContactName` / `datasetContactEmail` | Plan contacts. |
| `citation.contributor[]` | Plan owners → `Editor`, other plan members → `Project Member`, researcher references → `Researcher`, funder references → `Funder`. |
| `citation.funding[].fundingAgency` / `fundingAgencyGrantNumber` | Funder references (name and reference value). |
| `datasetVersion.termsOfUse` | `CC0 - Public Domain Dedication`. |

## Citation — top-level fields

Blueprint **or** description template.

| Dataverse field (`typeName`) | Semantic | Notes |
|---|---|---|
| `alternativeTitle` | `dataverse.dataset.alternative_title` | Multi-valued; duplicates removed. |
| `subtitle` | `dataverse.dataset.subtitle` | First value only. |
| `notesText` | `dataverse.dataset.notes` | First value only. |
| `subject` | `dataverse.dataset.subject` | Controlled vocabulary. Falls back to `"Other"` if no value is found. |
| `alternativeURL` | `dataverse.dataset.alternative_url` | First value only. For public plans without a value, falls back to the URL of the plan's public page in OpenCDMP. |
| `dateOfDeposit` | `dataverse.dataset.date_of_deposit` | First value; must be formatted as `yyyy-MM-dd`, otherwise dropped. |

## Citation — `dsDescription` (compound)

Blueprint **or** description template. One entry per matching field.

| Compound sub-field | Semantic |
|---|---|
| `dsDescriptionValue` | `dataverse.dataset.description` |

## Citation — `author` (compound, field set — description template only)

| Compound sub-field | Semantic |
|---|---|
| `authorName` | `dataverse.author.name` |
| `authorAffiliation` | `dataverse.author.affiliation` |

## Citation — `datasetContact` (compound, field set — description template only)

| Compound sub-field | Semantic |
|---|---|
| `datasetContactName` | `dataverse.point_of_contact.name` |
| `datasetContactEmail` | `dataverse.point_of_contact.email` |
| `datasetContactAffiliation` | `dataverse.point_of_contact.affiliation` |

## Citation — `contributor` (compound)

Blueprint **or** description template. Each semantic below maps the field value to `contributorName` and sets the corresponding `contributorType`.

| Semantic | `contributorType` |
|---|---|
| `dataverse.contributor.type.data_collector` | Data Collector |
| `dataverse.contributor.type.data_curator` | Data Curator |
| `dataverse.contributor.type.data_manager` | Data Manager |
| `dataverse.contributor.type.editor` | Editor |
| `dataverse.contributor.type.funder` | Funder |
| `dataverse.contributor.type.hosting_institution` | Hosting Institution |
| `dataverse.contributor.type.project_leader` | Project Leader |
| `dataverse.contributor.type.project_manager` | Project Manager |
| `dataverse.contributor.type.project_member` | Project Member |
| `dataverse.contributor.type.related_person` | Related Person |
| `dataverse.contributor.type.researcher` | Researcher |
| `dataverse.contributor.type.research_group` | Research Group |
| `dataverse.contributor.type.rights_holder` | Rights Holder |
| `dataverse.contributor.type.sponsor` | Sponsor |
| `dataverse.contributor.type.supervisor` | Supervisor |
| `dataverse.contributor.type.work_package_leader` | Work Package Leader |
| `dataverse.contributor.type.other` | Other |

## Citation — `publication` (compound)

### Identifier-type semantics

Blueprint **or** description template. Each semantic maps a field value to `publicationIDNumber` and sets `publicationIDType` to the corresponding identifier type. Assigning a relation-type semantic (see below) **on the same field** also sets `publicationRelationType`.

| Semantic | `publicationIDType` |
|---|---|
| `dataverse.related_publication.identifier_type.ark` | ark |
| `dataverse.related_publication.identifier_type.arxiv` | arxiv |
| `dataverse.related_publication.identifier_type.bibcode` | bibcode |
| `dataverse.related_publication.identifier_type.cstr` | cstr |
| `dataverse.related_publication.identifier_type.doi` | doi |
| `dataverse.related_publication.identifier_type.ean13` | ean13 |
| `dataverse.related_publication.identifier_type.eissn` | eissn |
| `dataverse.related_publication.identifier_type.handle` | handle |
| `dataverse.related_publication.identifier_type.isbn` | isbn |
| `dataverse.related_publication.identifier_type.issn` | issn |
| `dataverse.related_publication.identifier_type.istc` | istc |
| `dataverse.related_publication.identifier_type.lissn` | lissn |
| `dataverse.related_publication.identifier_type.lsid` | lsid |
| `dataverse.related_publication.identifier_type.pmid` | pmid |
| `dataverse.related_publication.identifier_type.purl` | purl |
| `dataverse.related_publication.identifier_type.upc` | upc |
| `dataverse.related_publication.identifier_type.url` | url |
| `dataverse.related_publication.identifier_type.urm` | urm |
| `dataverse.related_publication.identifier_type.DASH-NRS` | DASH-NRS |

### Relation-type semantics

Assign one of these on the **same field** as an identifier-type semantic above to also set `publicationRelationType`:

| Semantic | `publicationRelationType` |
|---|---|
| `dataverse.related_publication.relation_type.isCitedBy` | isCitedBy |
| `dataverse.related_publication.relation_type.Cites` | Cites |
| `dataverse.related_publication.relation_type.IsSupplementTo` | IsSupplementTo |
| `dataverse.related_publication.relation_type.IsSupplementedBy` | IsSupplementedBy |
| `dataverse.related_publication.relation_type.IsContinuedBy` | IsContinuedBy |
| `dataverse.related_publication.relation_type.Continues` | Continues |
| `dataverse.related_publication.relation_type.References` | References |
| `dataverse.related_publication.relation_type.IsReferencedBy` | IsReferencedBy |

### Field-set semantics (description template only)

All five semantics must appear within the **same field set**.

| Compound sub-field | Semantic |
|---|---|
| `publicationIDType` | `dataverse.related_publication.identifier_type` |
| `publicationRelationType` | `dataverse.related_publication.relation_type` |
| `publicationIDNumber` | `dataverse.related_publication.identifier` |
| `publicationCitation` | `dataverse.related_publication.citation` |
| `publicationURL` | `dataverse.related_publication.url` |

## Citation — `keyword` (compound, field set — description template only)

| Compound sub-field | Semantic |
|---|---|
| `keywordValue` | `dataverse.keyword.term` |
| `keywordTermURI` | `dataverse.keyword.term_uri` |
| `keywordVocabulary` | `dataverse.keyword.controlled_vocabulary_name` |
| `keywordVocabularyURI` | `dataverse.keyword.controlled_vocabulary_url` |

## Citation — `otherIdentifier` (compound, field set — description template only)

| Compound sub-field | Semantic |
|---|---|
| `otherIdentifierAgency` | `dataverse.other_identifier.agency` |
| `otherIdentifierValue` | `dataverse.other_identifier.identifier` |

## Assignability summary

| Semantic group | Plan blueprint | Description template |
|---|:-:|:-:|
| `dataverse.identifier` | yes | yes |
| `dataverse.dataset.*` | yes | yes |
| `dataverse.dataset.description` | yes | yes |
| `dataverse.author.*` | — | yes (field set) |
| `dataverse.point_of_contact.*` | — | yes (field set) |
| `dataverse.contributor.type.*` | yes | yes |
| `dataverse.related_publication.identifier_type.*` | yes | yes |
| `dataverse.related_publication.relation_type.*` | yes (on same field as identifier type) | yes (on same field as identifier type) |
| `dataverse.related_publication.identifier_type` / `relation_type` / `identifier` / `citation` / `url` | — | yes (field set) |
| `dataverse.keyword.*` | — | yes (field set) |
| `dataverse.other_identifier.*` | — | yes (field set) |

## Related

- [Semantics — admin guide](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md)
- [Deposit Services](index.md)
- [Deposit Service Configuration](/versioned_docs/version-1.x/deployment/configuration/backend/deposit.md)
- [Dataverse Native API / Metadata Blocks](https://guides.dataverse.org/en/latest/api/native-api.html#metadata-blocks)
