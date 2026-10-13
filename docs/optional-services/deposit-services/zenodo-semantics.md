---
sidebar_position: 1
sidebar_label: Zenodo
description: Reference of every semantic the Zenodo deposit plugin reads and the Zenodo metadata field it populates
---

# Zenodo deposit semantics reference

The [Zenodo deposit plugin](https://hub.docker.com/r/opencdmp/repository-deposit-zenodo) mints DOIs for plans on Zenodo (InvenioRDM v12). It builds the record metadata from the plan, the organisation's [Zenodo settings](/docs/optional-services/deposit-services/index.md#organisation-settings), and the answers in the plan blueprint and the plan's assets, finding each answer by its [semantic](/docs/administering/content-management/templates/semantics.md). To populate a Zenodo metadata field, assign the semantic listed below to the input that holds the value. Users see the resulting metadata in the review before publishing and can change it there.

## How the plugin resolves fields

Every semantic on this page works on plan blueprint inputs and on asset template inputs alike. The two exceptions are the contributor name and license link semantics, which go on fields of a reference type (see [License](#license) and [Contributors](#contributors)).

The plugin reads the blueprint's answers first, then the answers of each of the plan's assets:

- Fields that take several values (subjects, languages, references, additional titles, related and alternate identifiers, dates, and programming languages) collect every answer from both, including every repeat of a repeatable field set. Subjects, languages, and references that differ only in case are added once.
- Fields that take one value (publication date, community, publishing information, conference, repository URL, and development status) use the first answer found, so a blueprint answer wins over an asset answer.

### Which answers count

| Input type | Value read |
|---|---|
| **Free Text**, **Text Area**, **Rich Text Area** | The text, unless blank. |
| **Number** | The number. |
| **Boolean Decision**, **Checkbox** | `true` or `false`. |
| **Date Picker** | The date as `yyyy-MM-dd`. |
| **Dataset Identifier**, **Validator** | The identifier. |
| **Tags** | Each tag as a separate value. For an additional title or a related identifier, the tags are joined with `, `. |
| **Select**, **Radio Box** | The value of each chosen option, or its label when the option has no value. Semantics with fixed values, such as the additional title type, match on this value. |
| **Reference Types** | The identifier of each chosen reference, not its label. |

**Upload**, **Internal Plans**, and **Internal Assets** inputs and the blueprint's system fields (such as the plan's title or description) are not read, even when they carry a semantic.

## Values that are always set {#values-that-are-always-set-not-semantic-driven}

| Zenodo field | Source |
|---|---|
| `metadata.title` | Plan title. |
| `metadata.description` | Plan description; empty when the plan has none. |
| `metadata.version` | Plan version. |
| `metadata.publication_date` | Today, unless [`zenodo.publication_date`](#top-level-metadata) gives a date. |
| `metadata.publisher` | The organisation's **Publisher** setting, else the installation's publisher. |
| `metadata.resource_type.id` | The organisation's **Resource type** setting, else the installation's resource type (`publication-datamanagementplan` by default). |
| `metadata.copyright` | The organisation's **Copyright** setting; left out when empty. |
| `metadata.creators[]` | Plan members, as described in [Creators](#creators). |
| `access.record` | Always `public`. |
| `access.files` | `public` for a public plan, `restricted` otherwise. |

When the plan is public and the organisation's **Link the public plan page** setting is **Yes** (the default), the plugin also adds a related identifier pointing to the plan's public page in OpenCDMP, with relation type `isidenticalto` and scheme `url`. With **No**, the record does not link to the plan.

## Creators

Plan members become `metadata.creators[]`, each member once, as the organisation's **Authors from plan members** setting decides:

| Setting | Creators |
|---|---|
| **Every member** (default) | Every plan member, whatever their role. |
| **Owners and editors** | Members with the Owner or Editor role. |
| **Owners only** | Members with the Owner role. |
| **None (users must add the creators in the review)** | No plan member. |

Each creator is a person with the member's full name as the family name, an empty given name, and the role `projectmember`. The creator's affiliations are the plan's organisation references; when the plan has none, the organisation's **Affiliation** setting is used, else the installation's affiliation.

No semantic adds creators. With **None**, the record has only the creators users add in the review, and Zenodo does not publish a record without creators.

## Top-level metadata

| Zenodo field | Semantic | Notes |
|---|---|---|
| `metadata.publication_date` | `zenodo.publication_date` | Accepts `yyyy-MM-dd`, `yyyy/MM/dd`, or an ISO date-time such as `2024-01-01T00:00:00Z`, and is sent as `yyyy-MM-dd`. The first valid answer wins; other values are ignored. Falls back to today. |
| `metadata.subjects[].subject` | `zenodo.subject` | One subject per answer. |
| `metadata.languages[].id` | `zenodo.language` | A lowercase three-letter ISO 639 code, such as `eng`; other values are dropped. Without a valid answer, the organisation's **Default language** setting is used, if set. |
| `metadata.references[].reference` | `zenodo.reference` | One reference per answer. |

## Communities

| Zenodo field | Semantic | Notes |
|---|---|---|
| Community slug | `zenodo.community` | The first answer wins. Falls back to the organisation's **Community** setting, then to the installation's community. |

After a new record is published, the plugin submits it to this community, to the organisation's **Additional communities**, and to any communities users add in the review. A new version of an existing record is not submitted again.

## Additional titles {#additional-titles-field-set--asset-template}

Put the three semantics on inputs of the same field set, in a blueprint or an asset template. Each answer of the field set (each repeat, when the field set is repeatable) becomes one `metadata.additional_titles[]` entry. An answer without a title is skipped.

| Zenodo field | Semantic | Notes |
|---|---|---|
| `metadata.additional_titles[].title` | `zenodo.additional_title.title` | Required for the entry. |
| `metadata.additional_titles[].type.id` | `zenodo.additional_title.type` | `alternative-title`, `subtitle`, `translated-title`, or `other`. Any other value gives `other`, and so does an empty answer or a field set without a type input. |
| `metadata.additional_titles[].lang.id` | `zenodo.additional_title.language` | A lowercase three-letter ISO 639 code; other values are dropped. |

## Related identifiers {#related-identifiers-asset-template}

Each answer of an input that carries one of these semantics, in a blueprint or an asset template, becomes one `metadata.related_identifiers[]` entry. The relation type is the last part of the semantic, in lowercase. To set the scheme, add one of the [scheme semantics](#related-identifier-scheme-semantics) to the same input; without one, the scheme is `other`. Empty answers are skipped.

On a **Reference Types** input, the identifier is the reference's identifier. When the reference has a `pid` field and a `pidTypeField` field with an accepted PID type (such as `doi`, `handle`, `orcid`, or `ROR`), its PID is sent instead. References of the organisation and researcher reference types always send their identifier. An answer with several references still gives one related identifier.

| Relation type | Semantic |
|---|---|
| `iscitedby` | `zenodo.related_identifiers.isCitedBy` |
| `cites` | `zenodo.related_identifiers.cites` |
| `issupplementto` | `zenodo.related_identifiers.isSupplementTo` |
| `issupplementedby` | `zenodo.related_identifiers.isSupplementedBy` |
| `iscontinuedby` | `zenodo.related_identifiers.isContinuedBy` |
| `continues` | `zenodo.related_identifiers.continues` |
| `isdescribedby` | `zenodo.related_identifiers.isDescribedBy` |
| `describes` | `zenodo.related_identifiers.describes` |
| `hasmetadata` | `zenodo.related_identifiers.hasMetadata` |
| `ismetadatafor` | `zenodo.related_identifiers.isMetadataFor` |
| `isnewversionof` | `zenodo.related_identifiers.isNewVersionOf` |
| `ispreviousversionof` | `zenodo.related_identifiers.isPreviousVersionOf` |
| `ispartof` | `zenodo.related_identifiers.isPartOf` |
| `haspart` | `zenodo.related_identifiers.hasPart` |
| `isreferencedby` | `zenodo.related_identifiers.isReferencedBy` |
| `references` | `zenodo.related_identifiers.references` |
| `isdocumentedby` | `zenodo.related_identifiers.isDocumentedBy` |
| `documents` | `zenodo.related_identifiers.documents` |
| `iscompiledby` | `zenodo.related_identifiers.isCompiledBy` |
| `compiles` | `zenodo.related_identifiers.compiles` |
| `isvariantformof` | `zenodo.related_identifiers.isVariantFormOf` |
| `isoriginalformof` | `zenodo.related_identifiers.isOriginalFormOf` (`zenodo.related_identifiers.isOriginalFormof` also works) |
| `isidenticalto` | `zenodo.related_identifiers.isIdenticalTo` |
| `isalternateidentifier` | `zenodo.related_identifiers.isAlternateIdentifier` |
| `isreviewedby` | `zenodo.related_identifiers.isReviewedBy` |
| `reviews` | `zenodo.related_identifiers.reviews` |
| `isderivedfrom` | `zenodo.related_identifiers.isDerivedFrom` |
| `issourceof` | `zenodo.related_identifiers.isSourceOf` |
| `requires` | `zenodo.related_identifiers.requires` |
| `isrequiredby` | `zenodo.related_identifiers.isRequiredBy` |
| `isobsoletedby` | `zenodo.related_identifiers.isObsoletedBy` |
| `obsoletes` | `zenodo.related_identifiers.obsoletes` |

### Related identifier scheme semantics

Add one of these to the same input as the relation type semantic to set `metadata.related_identifiers[].scheme`:

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

Each answer of an input that carries one of these semantics becomes one `metadata.identifiers[]` entry, with the answer as the identifier. The scheme is the last part of the semantic, in lowercase.

| Scheme | Semantic |
|---|---|
| `ark` | `zenodo.alternate-identifiers.scheme.ark` (`zenodo.alternate.scheme.ark` also works) |
| `arxiv` | `zenodo.alternate-identifiers.scheme.arxiv` |
| `ads` | `zenodo.alternate-identifiers.scheme.ads` |
| `crossreffunderid` | `zenodo.alternate-identifiers.scheme.crossreffunderid` |
| `doi` | `zenodo.alternate-identifiers.scheme.doi` |
| `ean13` | `zenodo.alternate-identifiers.scheme.ean13` |
| `eissn` | `zenodo.alternate-identifiers.scheme.eissn` |
| `grid` | `zenodo.alternate-identifiers.scheme.grid` |
| `handle` | `zenodo.alternate-identifiers.scheme.handle` |
| `igsn` | `zenodo.alternate-identifiers.scheme.igsn` |
| `isbn` | `zenodo.alternate-identifiers.scheme.isbn` |
| `isni` | `zenodo.alternate-identifiers.scheme.isni` |
| `issn` | `zenodo.alternate-identifiers.scheme.issn` |
| `istc` | `zenodo.alternate-identifiers.scheme.istc` |
| `lissn` | `zenodo.alternate-identifiers.scheme.lissn` |
| `lsid` | `zenodo.alternate-identifiers.scheme.lsid` |
| `pmid` | `zenodo.alternate-identifiers.scheme.pmid` |
| `purl` | `zenodo.alternate-identifiers.scheme.purl` |
| `upc` | `zenodo.alternate-identifiers.scheme.upc` |
| `url` | `zenodo.alternate-identifiers.scheme.url` |
| `urn` | `zenodo.alternate-identifiers.scheme.urn` |
| `w3id` | `zenodo.alternate-identifiers.scheme.w3id` |
| `other` | `zenodo.alternate-identifiers.scheme.other` |

## Dates

Each answer of an input that carries one of these semantics becomes one `metadata.dates[]` entry. The date type is the last part of the semantic, in lowercase. Values must be `yyyy-MM-dd` or `yyyy/MM/dd` and are sent as `yyyy-MM-dd`; other values are dropped. A **Date Picker** input always gives a valid date.

| Date type | Semantic |
|---|---|
| `accepted` | `zenodo.date_type.accepted` |
| `available` | `zenodo.date_type.available` |
| `collected` | `zenodo.date_type.collected` |
| `copyrighted` | `zenodo.date_type.copyrighted` |
| `created` | `zenodo.date_type.created` |
| `issued` | `zenodo.date_type.issued` |
| `other` | `zenodo.date_type.other` |
| `submitted` | `zenodo.date_type.submitted` |
| `updated` | `zenodo.date_type.updated` |
| `valid` | `zenodo.date_type.valid` |
| `withdrawn` | `zenodo.date_type.withdrawn` |

## License

Licenses come from the plan's license references, of the reference type set in the organisation's **Licences** setting. The plugin looks up each reference's identifier in Zenodo's license vocabulary and sends a match as `metadata.rights[].id`. When the lookup fails, it sends a custom license instead, with the reference's identifier as the title, its description as the description, and the link below. A plan without license references gets the organisation's **Default licence** setting, if set.

The only semantic goes on a field of the license reference type, not on a blueprint or template input:

| Zenodo field | Semantic | Notes |
|---|---|---|
| `metadata.rights[].link` | `zenodo.metadata.rights.link` | Used only for a custom license. |

## Contributors

The plan's researcher references, of the reference type set in the organisation's **Researchers** setting, become `metadata.contributors[]` with the role `researcher` and the reference's label as the name. A researcher from ORCID also gets the ORCID iD as an identifier. No affiliation is sent.

Two semantics on fields of the researcher reference type set the name parts:

| Zenodo field | Semantic | Notes |
|---|---|---|
| `metadata.contributors[].person_or_org.family_name` | `zenodo.metadata.contributors.person_or_org.family_name` | Falls back to the reference's label. |
| `metadata.contributors[].person_or_org.given_name` | `zenodo.metadata.contributors.person_or_org.given_name` | Falls back to empty. |

Plan members become creators, not contributors; see [Creators](#creators).

## Funding

Funders and grants come from the plan's funder and grant references, of the reference types set in the organisation's **Funders** and **Grants** settings. No semantic is involved.

- A funder whose label matches one of the installation's known funders (such as the European Commission or the National Science Foundation) is looked up in Zenodo by its Crossref Funder ID and sent by its Zenodo id. Any other funder is sent by name.
- A grant is sent by its title (the reference's label) only. The plugin does not look grants up in Zenodo; in the review, users can search Zenodo's awards and pick one instead.
- The plan does not link grants to funders, so every grant goes with the first funder. Further funders are sent without a grant.

## Custom fields — Publishing information {#custom-fields--publishing-information}

Each field takes the first answer found. The journal and the imprint are sent only when at least one of their fields is answered.

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
| `custom_fields.thesis:thesis.university` | `zenodo.publishing_information.thesis.university` |

## Custom fields — Conference (meeting) {#custom-fields--conference-meeting}

Each field takes the first answer found. The conference is sent only when at least one of its fields is answered.

| Zenodo field | Semantic | Notes |
|---|---|---|
| `custom_fields.meeting:meeting.title` | `zenodo.conference.title` | |
| `custom_fields.meeting:meeting.acronym` | `zenodo.conference.acronym` | |
| `custom_fields.meeting:meeting.place` | `zenodo.conference.place` | |
| `custom_fields.meeting:meeting.dates` | `zenodo.conference.dates` | |
| `custom_fields.meeting:meeting.url` | `zenodo.conference.website` | A full URL, such as `https://example.org`; other values are dropped. |
| `custom_fields.meeting:meeting.session` | `zenodo.conference.session` | |
| `custom_fields.meeting:meeting.session_part` | `zenodo.conference.part` | |

## Custom fields — Software / Code {#custom-fields--software--code}

| Zenodo field | Semantic | Notes |
|---|---|---|
| `custom_fields.code:codeRepository` | `zenodo.software.repository-url` | The first answer, if it is a full URL; otherwise nothing is sent. |
| `custom_fields.code:programmingLanguage[].id` | `zenodo.software.programming-language` | One entry per answer. Values must be Zenodo programming language ids, such as `python`, `java`, or `r`; others are dropped. |
| `custom_fields.code:developmentStatus.id` | `zenodo.software.development-status` | The first answer, if it is one of `wip`, `unsupported`, `inactive`, `suspended`, `moved`, `concept`, `abandoned`, or `active`; otherwise nothing is sent. |

## Related

- [Semantics — admin guide](/docs/administering/content-management/templates/semantics.md)
- [Deposit services and organisation settings](index.md)
- [Deposit Service Configuration](/docs/deployment/configuration/backend/deposit.md)
- [Zenodo InvenioRDM metadata](https://inveniordm.docs.cern.ch/reference/metadata/)
