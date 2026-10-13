---
sidebar_position: 4
sidebar_label: Dataverse
description: Reference of every semantic consumed by the Dataverse deposit plugin and the citation-block field it populates
---

# Dataverse Deposit — Semantics Reference

The [Dataverse deposit plugin](https://hub.docker.com/r/opencdmp/repository-deposit-dataverse) creates datasets on a Dataverse instance by building the dataset's citation metadata block and submitting it to a dataverse collection. During deposit it reads values from the plan blueprint and the plan's assets, locating each field by its [semantic](/docs/administering/content-management/templates/semantics.md) tag. To populate a Dataverse field, assign the semantic listed below to a blueprint or asset-template field. The field names on this page are those of the Dataverse dataset metadata, mostly of its citation block.

## How the plugin resolves fields

Every semantic on this page works on both **plan blueprint** fields and **asset template** fields. Single-valued semantics use the first value found, looking at the blueprint before the assets. Multi-valued semantics collect the values of every matching field. Semantics that add one entry per answer (descriptions, contributors, related publications, and the question-based entries below) take a single value from each answer, so a tags or multiple choice field contributes only one of its values there.

The value a field gives depends on its type:

- Free text, text area, and rich text fields give their text, and tags fields give each tag.
- Single and multiple choice fields give the label of each chosen option.
- Date fields give the date as `yyyy-MM-dd`.
- Number, Yes / No, and tick box fields give the value as text (`true` or `false` for the last two).
- Reference fields give the identifier of each chosen reference, not its name.
- Dataset identifier fields give the identifier.
- Other field types, such as file uploads, preset fields, and links to plans or assets, give nothing.

Where a section says **question**, put its semantics on the inputs of the **same** question (a field set, whose fields are the question's inputs). Each answer to the question, one per repetition of a repeatable question, produces one Dataverse compound entry when at least one of its inputs has a value. Entries that come from the plan itself are listed first, then the answers in assets, then the answers in the blueprint.

Subjects, contributor types, and publication identifier and relation types are controlled vocabularies that the Dataverse instance defines in its citation block. A value that is not in the instance's vocabulary is dropped, so it never makes Dataverse reject the deposit.

## Dataverse targeting

| Purpose | Semantic | Notes |
|---|---|---|
| Target dataverse collection | `dataverse.identifier` | The alias of the dataverse collection the dataset is created in. First value only. Falls back to the organisation's **Dataverse collection** [setting](/docs/optional-services/deposit-services/index.md#organisation-settings), then to the installation's collection. A new version of an already published plan updates the existing dataset, so this value only matters for the first deposit. It is not written into the dataset metadata. |

## Values that are always set (not semantic-driven)

| Dataverse field | Source |
|---|---|
| `title` | The plan title. |
| `dsDescription[].dsDescriptionValue` | The plan description, added as the last entry after any descriptions from semantics. |
| `author[].authorName` / `authorAffiliation` | One author per plan member, chosen by the organisation's **Authors from plan members** setting: **Every member** (default), **Owners and editors**, **Owners only**, or **None (only what the blueprint maps)**. Each member is credited once. All of these authors get the same affiliation: the names of the plan's organisation references, separated by commas. |
| `datasetContact[].datasetContactName` / `datasetContactEmail` | The plan's **Contact**: first and last name, and email. A contact without a name is sent with its email only. When neither the plan nor a semantic gives a contact, the organisation's **Contact name** and **Contact e-mail** settings are used; this fallback needs the email. |
| `contributor[]` | Every plan member, whatever the **Authors from plan members** setting: owners as `Editor`, other members as `Project Member`. Then researcher references as `Researcher` and funder references as `Funder`. Each of these types is added only when the instance's contributor types include it. |
| `grantNumber[].grantNumberAgency` / `grantNumberValue` | One entry per grant reference, with the grant's identifier as the value. The plan does not link grants to funders, so a grant gets the funder's name as the agency only when the plan has exactly one funder reference. When the plan has no grant references, or more than one funder reference, each funder is also added as an entry with only its name as the agency. |
| `license` or `termsOfUse` | The plan's licence reference, when it matches an active licence of the Dataverse instance by name or URL. Otherwise the organisation's **Licence** setting, as the name of a licence of the instance. Otherwise the terms of use `CC0 - Public Domain Dedication`. |
| `metadataLanguage` | The organisation's **Metadata language** setting, else the installation's. Left out when neither is set. |

The plugin recognises the plan's organisation, funder, grant, researcher, and licence references by their reference type. The organisation's **Reference types** settings name these types; when they are empty, the installation's codes apply, which default to `organisations`, `funders`, `grants`, `researchers`, and `licenses`.

## Required fields

A default Dataverse installation requires a title, at least one author name, a contact email, a description, and a subject, and does not publish a dataset that lacks one of them. The plugin fills them as follows:

- **Title**: always the plan title.
- **Author**: the plan members. When **Authors from plan members** is set to none, map `dataverse.author.name` instead.
- **Contact email**: the plan's **Contact**, `dataverse.point_of_contact.email`, or the organisation's **Contact e-mail**.
- **Description**: the plan description or `dataverse.dataset.description`.
- **Subject**: `dataverse.dataset.subject` or the **Default subject** setting.

The review that users see before publishing marks the sections the instance requires.

## Citation — top-level fields

Blueprint **or** asset template.

| Dataverse field (`typeName`) | Semantic | Notes |
|---|---|---|
| `alternativeTitle` | `dataverse.dataset.alternative_title` | Multi-valued: every value when the instance allows several alternative titles (the default), otherwise the first. |
| `subtitle` | `dataverse.dataset.subtitle` | First value only. |
| `notesText` | `dataverse.dataset.notes` | First value only. |
| `subject` | `dataverse.dataset.subject` | Multi-valued. Each value must be a subject of the instance, written exactly as Dataverse lists it (for example `Computer and Information Science`); other values are dropped. When no field gives a value, the organisation's **Default subject** setting applies, then the installation's default subject. When fields give values but all of them are dropped, the dataset has no subject. |
| `alternativeURL` | `dataverse.dataset.alternative_url` | First value only. When no field gives a value and the plan is public, the URL of the plan's public page in OpenCDMP is used, unless the organisation turned off **Link the public plan page**. |
| `dateOfDeposit` | `dataverse.dataset.date_of_deposit` | First value only. It must be a `yyyy-MM-dd` date, otherwise it is dropped. |

## Citation — `dsDescription` (compound)

Blueprint **or** asset template. One entry per answer to each matching field, before the plan description.

| Compound sub-field | Semantic |
|---|---|
| `dsDescriptionValue` | `dataverse.dataset.description` |

## Citation — `author` (compound, question) {#citation--author-compound-field-set--asset-template-only}

Blueprint **or** asset template, on the inputs of one question. These authors are added after the plan members.

| Compound sub-field | Semantic |
|---|---|
| `authorName` | `dataverse.author.name` |
| `authorAffiliation` | `dataverse.author.affiliation` |

## Citation — `datasetContact` (compound, question) {#citation--datasetcontact-compound-field-set--asset-template-only}

Blueprint **or** asset template, on the inputs of one question. These contacts are added after the plan's **Contact**.

| Compound sub-field | Semantic |
|---|---|
| `datasetContactName` | `dataverse.point_of_contact.name` |
| `datasetContactEmail` | `dataverse.point_of_contact.email` |
| `datasetContactAffiliation` | `dataverse.point_of_contact.affiliation` |

## Citation — `contributor` (compound)

Blueprint **or** asset template. Each semantic below writes the field value as `contributorName` with the given `contributorType`, one entry per answer. These contributors are added after the plan members, researchers, and funders.

The keys follow the contributor types of the Dataverse instance: `dataverse.contributor.type.` followed by the type's name in lowercase, with every run of other characters replaced by `_`. The table lists the types of a default installation. A key whose type the instance does not have is ignored.

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

Blueprint **or** asset template. Each semantic writes the field value as `publicationIDNumber` with the given `publicationIDType`, one entry per answer. A relation-type semantic (see below) **on the same field** also sets `publicationRelationType`.

The keys follow the publication identifier types of the Dataverse instance, built the same way as the contributor-type keys: `dataverse.publication.type.` followed by the type's name in lowercase, with every run of other characters replaced by `_`. The table lists the types of a default installation. A key whose type the instance does not have is ignored.

| Semantic | `publicationIDType` |
|---|---|
| `dataverse.publication.type.ark` | ark |
| `dataverse.publication.type.arxiv` | arXiv |
| `dataverse.publication.type.bibcode` | bibcode |
| `dataverse.publication.type.cstr` | cstr |
| `dataverse.publication.type.doi` | doi |
| `dataverse.publication.type.ean13` | ean13 |
| `dataverse.publication.type.eissn` | eissn |
| `dataverse.publication.type.handle` | handle |
| `dataverse.publication.type.isbn` | isbn |
| `dataverse.publication.type.issn` | issn |
| `dataverse.publication.type.istc` | istc |
| `dataverse.publication.type.lissn` | lissn |
| `dataverse.publication.type.lsid` | lsid |
| `dataverse.publication.type.pmid` | pmid |
| `dataverse.publication.type.purl` | purl |
| `dataverse.publication.type.upc` | upc |
| `dataverse.publication.type.url` | url |
| `dataverse.publication.type.urn` | urn |
| `dataverse.publication.type.dash_nrs` | DASH-NRS |

### Relation-type semantics

Assign one of these on the **same field** as an identifier-type semantic above to also set `publicationRelationType`. On its own, a relation-type semantic writes nothing. The keys follow the publication relation types of the instance in the same way; the table lists those of a default installation.

| Semantic | `publicationRelationType` |
|---|---|
| `dataverse.publication.relation_type.iscitedby` | IsCitedBy |
| `dataverse.publication.relation_type.cites` | Cites |
| `dataverse.publication.relation_type.issupplementto` | IsSupplementTo |
| `dataverse.publication.relation_type.issupplementedby` | IsSupplementedBy |
| `dataverse.publication.relation_type.isreferencedby` | IsReferencedBy |
| `dataverse.publication.relation_type.references` | References |

A relation type written with the identifier-type prefix, for example `dataverse.publication.type.iscitedby`, also sets the relation type, unless an identifier type of the instance has the same key.

### Question semantics {#field-set-semantics-asset-template-only}

Blueprint **or** asset template, on the inputs of one question. Use any of these semantics together. The identifier type and the relation type must be values of the instance's vocabularies, written exactly as Dataverse lists them (for example `doi` or `IsCitedBy`); other values are dropped.

| Compound sub-field | Semantic |
|---|---|
| `publicationIDType` | `dataverse.related_publication.identifier_type` |
| `publicationRelationType` | `dataverse.related_publication.relation_type` |
| `publicationIDNumber` | `dataverse.related_publication.identifier` |
| `publicationCitation` | `dataverse.related_publication.citation` |
| `publicationURL` | `dataverse.related_publication.url` |

### Reference type semantics

`dataverse.related_publication.identifier` and `dataverse.related_publication.identifier_type` also work on the fields of a [reference type](/docs/administering/system-configuration/reference-types.md#fields). Every reference of that type chosen in a plan or asset reference field adds one related publication entry: the value of the field with `identifier` becomes the `publicationIDNumber`, and the value of the field with `identifier_type` becomes the `publicationIDType` when it is one of the instance's identifier types.

## Citation — `keyword` (compound, question) {#citation--keyword-compound-field-set--asset-template-only}

Blueprint **or** asset template, on the inputs of one question.

| Compound sub-field | Semantic |
|---|---|
| `keywordValue` | `dataverse.keyword.term` |
| `keywordTermURI` | `dataverse.keyword.term_uri` |
| `keywordVocabulary` | `dataverse.keyword.controlled_vocabulary_name` |
| `keywordVocabularyURI` | `dataverse.keyword.controlled_vocabulary_url` |

## Citation — `otherId` (compound, question) {#citation--otheridentifier-compound-field-set--asset-template-only}

Blueprint **or** asset template, on the inputs of one question.

| Compound sub-field | Semantic |
|---|---|
| `otherIdAgency` | `dataverse.other_identifier.agency` |
| `otherIdValue` | `dataverse.other_identifier.identifier` |

## Assignability summary

Every semantic works on both plan blueprint and asset template fields.

| Semantic group | Where to assign it |
|---|---|
| `dataverse.identifier` | Any field |
| `dataverse.dataset.*` | Any field |
| `dataverse.contributor.type.*` | Any field |
| `dataverse.publication.type.*` | Any field |
| `dataverse.publication.relation_type.*` | The same field as a `dataverse.publication.type.*` semantic |
| `dataverse.author.*` | The inputs of one question |
| `dataverse.point_of_contact.*` | The inputs of one question |
| `dataverse.related_publication.*` | The inputs of one question; `identifier` and `identifier_type` also on reference type fields |
| `dataverse.keyword.*` | The inputs of one question |
| `dataverse.other_identifier.*` | The inputs of one question |

## Related

- [Semantics — admin guide](/docs/administering/content-management/templates/semantics.md)
- [Deposit Services](index.md)
- [Deposit Service Configuration](/docs/deployment/configuration/backend/deposit.md)
- [Dataverse Native API / Metadata Blocks](https://guides.dataverse.org/en/latest/api/native-api.html#metadata-blocks)
