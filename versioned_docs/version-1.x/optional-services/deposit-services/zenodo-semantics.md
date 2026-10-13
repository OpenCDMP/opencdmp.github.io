---
sidebar_position: 1
sidebar_label: Zenodo
description: Reference of every semantic consumed by the Zenodo deposit plugin and the Zenodo metadata field it populates
---

# Zenodo Deposit — Semantics Reference

The [Zenodo deposit plugin](https://hub.docker.com/r/opencdmp/repository-deposit-zenodo) mints DOIs for plans on Zenodo (InvenioRDM v12). During deposit it builds the record metadata by reading values from both the plan blueprint and the descriptions attached to the plan, locating each field by its [semantic](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md) tag.

This page lists every Zenodo metadata field the plugin can populate and the semantic you must assign to the backing field to populate it.

## How the plugin resolves fields

Every semantic below is looked up **first** on plan blueprint fields, **then** on all description-template fields of the plan's descriptions. Values from both sources are typically merged (with de-duplication). A subset of semantics (additional titles) require all fields to appear within the same field set, as noted in the relevant section.

## Values that are always set (not semantic-driven)

| Zenodo field | Source |
|---|---|
| `metadata.title` | Plan label. |
| `metadata.description` | Plan description (or empty if not provided). |
| `metadata.version` | Plan version. |
| `metadata.publisher` | Configured publisher name. |
| `metadata.resource_type.id` | Configured resource type. |
| `access.record` / `access.files` / `access.embargo.*` | Derived from the plan's access type and finalisation date. |

An additional related identifier is auto-emitted for public plans pointing back to the OpenCDMP record, with relation type `isidenticalto` and scheme `url`.

## Top-level metadata

| Zenodo field | Semantic | Notes |
|---|---|---|
| `metadata.publication_date` | `zenodo.publication_date` | **Plan blueprint only.** First match wins. Formatted `yyyy-MM-dd`. Falls back to today. |
| `metadata.subjects[].subject` | `zenodo.subject` | Blueprint **and** description. Each collected value becomes one subject entry. |
| `metadata.languages[].id` | `zenodo.language` | Blueprint **and** description. Must be an ISO-639-3 code; invalid codes are dropped. |
| `metadata.references[].reference` | `zenodo.reference` | Blueprint **and** description. |

## Communities

| Zenodo field | Semantic | Notes |
|---|---|---|
| Community slug | `zenodo.community` | Resolved from blueprint first, then description. Falls back to the configured community. |

## Additional titles (field set — description template)

One entry per field-set item. All three semantics must appear **within the same field set**.

| Zenodo field | Semantic | Notes |
|---|---|---|
| `metadata.additional_titles[].title` | `zenodo.additional_title.title` | |
| `metadata.additional_titles[].type.id` | `zenodo.additional_title.type` | Accepted values: `alternativetitle`, `subtitle`, `translatedtitle`, `other`. Defaults to `other`. |
| `metadata.additional_titles[].lang.id` | `zenodo.additional_title.language` | ISO-639-3 code; dropped if invalid. |

## Related identifiers (description template)

Each semantic below maps to one `metadata.related_identifiers[]` entry. The relation type id is derived from the last segment of the semantic (lowercased). Assign one of the scheme semantics (see below) **on the same field** to set the identifier scheme; defaults to `other`.

| Zenodo field | Semantic |
|---|---|
| `metadata.related_identifiers[].identifier` — relation type `iscitedby` | `zenodo.related_identifiers.isCitedBy` |
| `metadata.related_identifiers[].identifier` — relation type `cites` | `zenodo.related_identifiers.cites` |
| `metadata.related_identifiers[].identifier` — relation type `issupplementto` | `zenodo.related_identifiers.isSupplementTo` |
| `metadata.related_identifiers[].identifier` — relation type `issupplementedby` | `zenodo.related_identifiers.isSupplementedBy` |
| `metadata.related_identifiers[].identifier` — relation type `iscontinuedby` | `zenodo.related_identifiers.isContinuedBy` |
| `metadata.related_identifiers[].identifier` — relation type `continues` | `zenodo.related_identifiers.continues` |
| `metadata.related_identifiers[].identifier` — relation type `isdescribedby` | `zenodo.related_identifiers.isDescribedBy` |
| `metadata.related_identifiers[].identifier` — relation type `describes` | `zenodo.related_identifiers.describes` |
| `metadata.related_identifiers[].identifier` — relation type `hasmetadata` | `zenodo.related_identifiers.hasMetadata` |
| `metadata.related_identifiers[].identifier` — relation type `ismetadatafor` | `zenodo.related_identifiers.isMetadataFor` |
| `metadata.related_identifiers[].identifier` — relation type `isnewversionof` | `zenodo.related_identifiers.isNewVersionOf` |
| `metadata.related_identifiers[].identifier` — relation type `ispreviousversionof` | `zenodo.related_identifiers.isPreviousVersionOf` |
| `metadata.related_identifiers[].identifier` — relation type `ispartof` | `zenodo.related_identifiers.isPartOf` |
| `metadata.related_identifiers[].identifier` — relation type `haspart` | `zenodo.related_identifiers.hasPart` |
| `metadata.related_identifiers[].identifier` — relation type `isreferencedby` | `zenodo.related_identifiers.isReferencedBy` |
| `metadata.related_identifiers[].identifier` — relation type `references` | `zenodo.related_identifiers.references` |
| `metadata.related_identifiers[].identifier` — relation type `isdocumentedby` | `zenodo.related_identifiers.isDocumentedBy` |
| `metadata.related_identifiers[].identifier` — relation type `documents` | `zenodo.related_identifiers.documents` |
| `metadata.related_identifiers[].identifier` — relation type `iscompiledby` | `zenodo.related_identifiers.isCompiledBy` |
| `metadata.related_identifiers[].identifier` — relation type `compiles` | `zenodo.related_identifiers.compiles` |
| `metadata.related_identifiers[].identifier` — relation type `isvariantformof` | `zenodo.related_identifiers.isVariantFormOf` |
| `metadata.related_identifiers[].identifier` — relation type `isoriginalformof` | `zenodo.related_identifiers.isOriginalFormof` |
| `metadata.related_identifiers[].identifier` — relation type `isidenticalto` | `zenodo.related_identifiers.isIdenticalTo` |
| `metadata.related_identifiers[].identifier` — relation type `isalternateidentifier` | `zenodo.related_identifiers.isAlternateIdentifier` |
| `metadata.related_identifiers[].identifier` — relation type `isreviewedby` | `zenodo.related_identifiers.isReviewedBy` |
| `metadata.related_identifiers[].identifier` — relation type `reviews` | `zenodo.related_identifiers.reviews` |
| `metadata.related_identifiers[].identifier` — relation type `isderivedfrom` | `zenodo.related_identifiers.isDerivedFrom` |
| `metadata.related_identifiers[].identifier` — relation type `issourceof` | `zenodo.related_identifiers.isSourceOf` |
| `metadata.related_identifiers[].identifier` — relation type `requires` | `zenodo.related_identifiers.requires` |
| `metadata.related_identifiers[].identifier` — relation type `isrequiredby` | `zenodo.related_identifiers.isRequiredBy` |
| `metadata.related_identifiers[].identifier` — relation type `isobsoletedby` | `zenodo.related_identifiers.isObsoletedBy` |
| `metadata.related_identifiers[].identifier` — relation type `obsoletes` | `zenodo.related_identifiers.obsoletes` |

### Related identifier scheme semantics

Assign one of these on the **same field** as the relation-type semantic above to set `metadata.related_identifiers[].scheme`:

| Scheme | Semantic |
|---|---|
| `ark` | `zenodo.related_identifiers.scheme.ark` |
| `arxiv` | `zenodo.related_identifiers.scheme.arxiv` |
| `ads` | `zenodo.related_identifiers.scheme.ads` |
| `crossreffunderid` | `zenodo.related_identifiers.scheme.crossreffunderid` |
| `doi` | `zenodo.related_identifiers.scheme.doi` |
| `ean13` | `zenodo.related_identifiers.scheme.ean13` |
| `eissn` | `zenodo.related_identifiers.scheme.eissn` |
| `grid` | `zenodo.related_identifiers.scheme.grid` |
| `handle` | `zenodo.related_identifiers.scheme.handle` |
| `igsn` | `zenodo.related_identifiers.scheme.igsn` |
| `isbn` | `zenodo.related_identifiers.scheme.isbn` |
| `isni` | `zenodo.related_identifiers.scheme.isni` |
| `issn` | `zenodo.related_identifiers.scheme.issn` |
| `istc` | `zenodo.related_identifiers.scheme.istc` |
| `lissn` | `zenodo.related_identifiers.scheme.lissn` |
| `lsid` | `zenodo.related_identifiers.scheme.lsid` |
| `pmid` | `zenodo.related_identifiers.scheme.pmid` |
| `purl` | `zenodo.related_identifiers.scheme.purl` |
| `upc` | `zenodo.related_identifiers.scheme.upc` |
| `url` | `zenodo.related_identifiers.scheme.url` |
| `urn` | `zenodo.related_identifiers.scheme.urn` |
| `w3id` | `zenodo.related_identifiers.scheme.w3id` |
| `other` | `zenodo.related_identifiers.scheme.other` |

## Alternate identifiers

Each semantic below maps to one `metadata.alternate_identifiers[]` entry. The scheme is derived from the last segment of the semantic (lowercased).

| Zenodo field | Semantic |
|---|---|
| `metadata.alternate_identifiers[].identifier` — scheme `ark` | `zenodo.alternate-identifiers.scheme.ark` |
| `metadata.alternate_identifiers[].identifier` — scheme `arxiv` | `zenodo.alternate-identifiers.scheme.arxiv` |
| `metadata.alternate_identifiers[].identifier` — scheme `ads` | `zenodo.alternate-identifiers.scheme.ads` |
| `metadata.alternate_identifiers[].identifier` — scheme `crossreffunderid` | `zenodo.alternate-identifiers.scheme.crossreffunderid` |
| `metadata.alternate_identifiers[].identifier` — scheme `doi` | `zenodo.alternate-identifiers.scheme.doi` |
| `metadata.alternate_identifiers[].identifier` — scheme `ean13` | `zenodo.alternate-identifiers.scheme.ean13` |
| `metadata.alternate_identifiers[].identifier` — scheme `eissn` | `zenodo.alternate-identifiers.scheme.eissn` |
| `metadata.alternate_identifiers[].identifier` — scheme `grid` | `zenodo.alternate-identifiers.scheme.grid` |
| `metadata.alternate_identifiers[].identifier` — scheme `handle` | `zenodo.alternate-identifiers.scheme.handle` |
| `metadata.alternate_identifiers[].identifier` — scheme `igsn` | `zenodo.alternate-identifiers.scheme.igsn` |
| `metadata.alternate_identifiers[].identifier` — scheme `isbn` | `zenodo.alternate-identifiers.scheme.isbn` |
| `metadata.alternate_identifiers[].identifier` — scheme `isni` | `zenodo.alternate-identifiers.scheme.isni` |
| `metadata.alternate_identifiers[].identifier` — scheme `issn` | `zenodo.alternate-identifiers.scheme.issn` |
| `metadata.alternate_identifiers[].identifier` — scheme `istc` | `zenodo.alternate-identifiers.scheme.istc` |
| `metadata.alternate_identifiers[].identifier` — scheme `lissn` | `zenodo.alternate-identifiers.scheme.lissn` |
| `metadata.alternate_identifiers[].identifier` — scheme `lsid` | `zenodo.alternate-identifiers.scheme.lsid` |
| `metadata.alternate_identifiers[].identifier` — scheme `pmid` | `zenodo.alternate-identifiers.scheme.pmid` |
| `metadata.alternate_identifiers[].identifier` — scheme `purl` | `zenodo.alternate-identifiers.scheme.purl` |
| `metadata.alternate_identifiers[].identifier` — scheme `upc` | `zenodo.alternate-identifiers.scheme.upc` |
| `metadata.alternate_identifiers[].identifier` — scheme `url` | `zenodo.alternate-identifiers.scheme.url` |
| `metadata.alternate_identifiers[].identifier` — scheme `urn` | `zenodo.alternate-identifiers.scheme.urn` |
| `metadata.alternate_identifiers[].identifier` — scheme `w3id` | `zenodo.alternate-identifiers.scheme.w3id` |
| `metadata.alternate_identifiers[].identifier` — scheme `other` | `zenodo.alternate-identifiers.scheme.other` |

## Dates

Each semantic below maps to one `metadata.dates[]` entry. The date-type id is derived from the last segment of the semantic (lowercased). Values must be formatted as `yyyy-MM-dd` or `yyyy/MM/dd`; invalid dates are dropped.

| Zenodo field | Semantic |
|---|---|
| `metadata.dates[].date` — type `accepted` | `zenodo.date_type.accepted` |
| `metadata.dates[].date` — type `available` | `zenodo.date_type.available` |
| `metadata.dates[].date` — type `collected` | `zenodo.date_type.collected` |
| `metadata.dates[].date` — type `copyrighted` | `zenodo.date_type.copyrighted` |
| `metadata.dates[].date` — type `created` | `zenodo.date_type.created` |
| `metadata.dates[].date` — type `issued` | `zenodo.date_type.issued` |
| `metadata.dates[].date` — type `other` | `zenodo.date_type.other` |
| `metadata.dates[].date` — type `submitted` | `zenodo.date_type.submitted` |
| `metadata.dates[].date` — type `updated` | `zenodo.date_type.updated` |
| `metadata.dates[].date` — type `valid` | `zenodo.date_type.valid` |
| `metadata.dates[].date` — type `withdrawn` | `zenodo.date_type.withdrawn` |

## License

Licenses are resolved from plan licence references against Zenodo's licence vocabulary. The only semantic involved is on the **reference type field definition**:

| Zenodo field | Semantic | Notes |
|---|---|---|
| `metadata.license[].link` | `zenodo.metadata.rights.link` | Read from a licence reference field's definition. Used only when the Zenodo vocabulary lookup fails and the plugin falls back to a custom licence block. |

## Contributors

Researcher contributors are built from plan researcher references. Two semantics on the **reference type field definition** populate contributor names:

| Zenodo field | Semantic | Notes |
|---|---|---|
| `metadata.contributors[].person_or_org.family_name` | `zenodo.metadata.contributors.person_or_org.family_name` | Falls back to the reference label. |
| `metadata.contributors[].person_or_org.given_name` | `zenodo.metadata.contributors.person_or_org.given_name` | Falls back to empty string. |

Other contributor fields (`role.id`, `person_or_org.name`, identifiers, affiliations) are derived from the reference itself — not from semantics. Plan members in `metadata.creators[]` are derived from plan users and organisation references, also not semantic-driven.

## Funding

Funders and grants come from plan funder and grant references. Zenodo funder and award lookups are performed against the Zenodo API. No semantics are consulted; documented here for completeness.

## Custom fields — Publishing information

Single-valued (first matching value wins). Blueprint **and** description sources.

### Journal

| Zenodo field | Semantic |
|---|---|
| `custom_fields.journal:journal.title` | `zenodo.publishing_information.journal.title` |
| `custom_fields.journal:journal.issn` | `zenodo.publishing_information.journal.issn` |
| `custom_fields.journal:journal.volume` | `zenodo.publishing_information.journal.volume` |
| `custom_fields.journal:journal.issue` | `zenodo.publishing_information.journal.issue` |
| `custom_fields.journal:journal.pages` | `zenodo.publishing_information.journal.page_range_or_article_number` |

### Imprint

| Zenodo field | Semantic |
|---|---|
| `custom_fields.imprint:imprint.title` | `zenodo.publishing_information.imprint.title` |
| `custom_fields.imprint:imprint.isbn` | `zenodo.publishing_information.imprint.isbn` |
| `custom_fields.imprint:imprint.place` | `zenodo.publishing_information.imprint.place` |
| `custom_fields.imprint:imprint.pages` | `zenodo.publishing_information.imprint.pagination` |

### Thesis

| Zenodo field | Semantic |
|---|---|
| `custom_fields.thesis:university` | `zenodo.publishing_information.thesis.university` |

## Custom fields — Conference (meeting)

Single-valued. Blueprint **and** description sources.

| Zenodo field | Semantic | Notes |
|---|---|---|
| `custom_fields.meeting:title` | `zenodo.conference.title` | |
| `custom_fields.meeting:acronym` | `zenodo.conference.acronym` | |
| `custom_fields.meeting:place` | `zenodo.conference.place` | |
| `custom_fields.meeting:dates` | `zenodo.conference.dates` | |
| `custom_fields.meeting:url` | `zenodo.conference.website` | Only set if the value is a valid URL. |
| `custom_fields.meeting:session` | `zenodo.conference.session` | |
| `custom_fields.meeting:session_part` | `zenodo.conference.part` | |

## Custom fields — Software / Code

| Zenodo field | Semantic | Notes |
|---|---|---|
| `custom_fields.code:codeRepository` | `zenodo.software.repository-url` | Only set if the value is a valid URL. Single-valued. |
| `custom_fields.code:programmingLanguage[].id` | `zenodo.software.programming-language` | Multi-valued. Values must match a supported programming language identifier; others are dropped. |
| `custom_fields.code:developmentStatus.id` | `zenodo.software.development-status` | Single-valued. Accepted values: `wip`, `unsupported`, `inactive`, `suspended`, `moved`, `concept`, `abandoned`, `active`. |

## Related

- [Semantics — admin guide](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md)
- [Deposit Services](index.md)
- [Deposit Service Configuration](/versioned_docs/version-1.x/deployment/configuration/backend/deposit.md)
- [Zenodo InvenioRDM metadata](https://inveniordm.docs.cern.ch/reference/metadata/)
