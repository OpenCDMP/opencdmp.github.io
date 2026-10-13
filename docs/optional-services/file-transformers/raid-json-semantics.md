---
sidebar_position: 3
sidebar_label: RAiD JSON
description: Reference of every semantic consumed by the RAiD JSON file transformer and the RAiD JSON output field it populates
---

# RAiD JSON Transformer — Semantics Reference

The [RAiD JSON file transformer](https://hub.docker.com/r/opencdmp/file-transformer-raid-json) exports plans to JSON files conforming to the [RAiD metadata schema v1.6.x](https://metadata.raid.org/en/v1.6.3/core/core.html#contents), and imports such files as new plans.

To populate a RAiD JSON field, assign the semantic listed below to a question of the plan blueprint or of an asset template. Values outside the RAiD vocabularies are dropped, and dates must be written as `yyyy`, `yyyy-MM`, or `yyyy-MM-dd`.

## How the transformer resolves fields

The transformer reads the blueprint's questions first, then the questions of each asset in the plan. Every semantic on this page works in both blueprints and asset templates.

- **Single blocks** (`identifier`, `date`, and `access`): RAiD allows one of each. Every value takes the first answer found, so a blueprint answer wins over an asset's, and an earlier asset's over a later one. Within a repeating question, only the first answered item counts.
- **Lists** (`titles`, `descriptions`, `contributors`, `organisations`, `relatedObjects`, `alternateIdentifiers`, `alternateUrls`, and `relatedRaids`): each answer to a question (each item of a repeating question) produces one entry, provided at least one of its values is valid. Blueprint entries come first, then those of each asset.
- **Empty blocks** are not written: a block or list without any valid value is left out of the file.

How an answer is read:

- Text inputs give their text, Yes/No and checkbox inputs `true` or `false`, number inputs the number, and date inputs `yyyy-MM-dd`.
- Select and radio inputs give the value of the chosen option. To write a RAiD vocabulary value, use it as the option's value and give the option a readable label.
- Reference inputs give the picked reference's value, for example its ROR or ORCID address.
- Tags inputs give their first tag.

## Values that are always set

| RAiD JSON field | Value |
|---|---|
| `titles[0].text` | The plan title, as the primary title. Titles answered in the plan or its assets follow it. |
| `titles[0].type.id` | `https://vocabulary.raid.org/title.type.id/380` (Primary). |
| `titles[0].type.schemaUri` | `https://vocabulary.raid.org/title.type.schema/376`. |
| `titles[0].startDate` | The date the plan was created (`yyyy-MM-dd`). |
| `titles[0].endDate` | The date the plan was finalized (`yyyy-MM-dd`), for a finalized plan. |

## `identifier`

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `identifier.id` | `raid.identifier.id` | |
| `identifier.schemaUri` | `raid.identifier.schemaUri` | See [identifier.schemaUri](https://metadata.raid.org/en/v1.6.3/core/identifier.html#identifier-id-schemauri). |
| `identifier.registrationAgency.id` | `raid.identifier.registrationAgency.id` | |
| `identifier.registrationAgency.schemaUri` | `raid.identifier.registrationAgency.schemaUri` | See [registrationAgency.schemaUri](https://metadata.raid.org/en/v1.6.3/core/identifier.html#identifier-registrationagencyid-schemauri). |
| `identifier.owner.id` | `raid.identifier.owner.id` | |
| `identifier.owner.schemaUri` | `raid.identifier.owner.schemaUri` | See [owner.schemaUri](https://metadata.raid.org/en/v1.6.3/core/identifier.html#identifier-owner-schemauri). |
| `identifier.owner.servicePoint` | `raid.identifier.owner.servicePoint` | A whole number; other answers are dropped. |
| `identifier.license` | `raid.identifier.license` | See [identifier.license](https://metadata.raid.org/en/v1.6.3/core/identifier.html#identifier-license). |
| `identifier.version` | `raid.identifier.version` | |

## `date`

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `date.startDate` | `raid.date.startDate` | Required by RAiD. Without an answer the block is left out, and the file does not validate against the RAiD schema. |
| `date.endDate` | `raid.date.endDate` | |

## `access`

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `access.type.id` | `raid.access.type.id` | Required by RAiD. See [access.type.id](https://metadata.raid.org/en/v1.6.3/core/access.html#access-type-id). |
| `access.type.schemaUri` | `raid.access.type.schemaUri` | Required by RAiD. See [access.type.schemaUri](https://metadata.raid.org/en/v1.6.3/core/access.html#access-type-schemauri). |
| `access.embargoExpiry` | `raid.access.embargoExpiry` | Required by RAiD for embargoed access. |
| `access.statement.text` | `raid.access.statement.text` | Required by RAiD for embargoed access. |
| `access.statement.language.id` | `raid.access.statement.language.id` | See [statement language id](https://metadata.raid.org/en/v1.6.3/core/access.html#access-statement-language-id). |
| `access.statement.language.schemaUri` | `raid.access.statement.language.schemaUri` | See [statement language schemaUri](https://metadata.raid.org/en/v1.6.3/core/access.html#access-statement-language-schemauri). |

## `titles[]`

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `titles[].text` | `raid.title.text` | |
| `titles[].type.id` | `raid.title.type.id` | See [title.type.id](https://metadata.raid.org/en/v1.6.3/core/titles.html#title-type-id). |
| `titles[].type.schemaUri` | `raid.title.type.schemaUri` | See [title.type.schemaUri](https://metadata.raid.org/en/v1.6.3/core/titles.html#title-type-schemauri). |
| `titles[].language.id` | `raid.title.language.id` | See [title.language.id](https://metadata.raid.org/en/v1.6.3/core/titles.html#title-language-id). |
| `titles[].language.schemaUri` | `raid.title.language.schemaUri` | See [title.language.schemaUri](https://metadata.raid.org/en/v1.6.3/core/titles.html#title-language-schemauri). |
| `titles[].startDate` | `raid.title.startDate` | |
| `titles[].endDate` | `raid.title.endDate` | |

## `descriptions[]`

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `descriptions[].text` | `raid.description.text` | |
| `descriptions[].type.id` | `raid.description.type.id` | See [description.type.id](https://metadata.raid.org/en/v1.6.3/core/descriptions.html#description-type-id). |
| `descriptions[].type.schemaUri` | `raid.description.type.schemaUri` | See [description.type.schemaUri](https://metadata.raid.org/en/v1.6.3/core/descriptions.html#description-type-schemauri). |
| `descriptions[].language.id` | `raid.description.language.id` | See [description.language.id](https://metadata.raid.org/en/v1.6.3/core/descriptions.html#description-language-id). |
| `descriptions[].language.schemaUri` | `raid.description.language.schemaUri` | See [description.language.schemaUri](https://metadata.raid.org/en/v1.6.3/core/descriptions.html#description-language-schemauri). |

## `contributors[]`

Each contributor gets at most one position and one role. RAiD requires a contributor's identifier and schema URI, and a position with its identifier, schema URI, and start date.

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `contributors[].id` | `raid.contributor.id` | For example an ORCID address. |
| `contributors[].schemaUri` | `raid.contributor.schemaUri` | See [contributor.schemaUri](https://metadata.raid.org/en/v1.6.3/core/contributors.html#contributor-schemauri). |
| `contributors[].position[0].id` | `raid.contributor.position.id` | See [position.id](https://metadata.raid.org/en/v1.6.3/core/contributors.html#contributor-position-id). |
| `contributors[].position[0].schemaUri` | `raid.contributor.position.schemaUri` | See [position.schemaUri](https://metadata.raid.org/en/v1.6.3/core/contributors.html#contributor-position-schemauri). |
| `contributors[].position[0].startDate` | `raid.contributor.position.startDate` | |
| `contributors[].position[0].endDate` | `raid.contributor.position.endDate` | |
| `contributors[].leader` | `raid.contributor.leader` | Set when the answer is `Yes` or `true`, in any case; other answers leave it out. |
| `contributors[].contact` | `raid.contributor.contact` | Same rule as `leader`. |
| `contributors[].role[0].id` | `raid.contributor.role.id` | See [role.id](https://metadata.raid.org/en/v1.6.3/core/contributors.html#contributor-role-id). |
| `contributors[].role[0].schemaUri` | `raid.contributor.role.schemaUri` | See [role.schemaUri](https://metadata.raid.org/en/v1.6.3/core/contributors.html#contributor-role-schemauri). |

## `organisations[]`

Each organisation gets at most one role.

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `organisations[].id` | `raid.organisation.id` | For example a ROR address. |
| `organisations[].schemaUri` | `raid.organisation.schemaUri` | See [organisation.schemaUri](https://metadata.raid.org/en/v1.6.3/core/organisations.html#organisation-schemauri). |
| `organisations[].role[0].id` | `raid.organisation.role.id` | See [role.id](https://metadata.raid.org/en/v1.6.3/core/organisations.html#organisation-role-id). |
| `organisations[].role[0].schemaUri` | `raid.organisation.role.schemaUri` | See [role.schemaUri](https://metadata.raid.org/en/v1.6.3/core/organisations.html#organisation-role-schemauri). |
| `organisations[].role[0].startDate` | `raid.organisation.role.startDate` | |
| `organisations[].role[0].endDate` | `raid.organisation.role.endDate` | |

## `relatedObjects[]`

Each related object gets at most one category.

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `relatedObjects[].id` | `raid.relatedObject.id` | |
| `relatedObjects[].schemaUri` | `raid.relatedObject.schemaUri` | See [relatedObject.schemaUri](https://metadata.raid.org/en/v1.6.3/core/relatedObjects.html#relatedobject-schemauri). |
| `relatedObjects[].type.id` | `raid.relatedObject.type.id` | See [type.id](https://metadata.raid.org/en/v1.6.3/core/relatedObjects.html#relatedobject-type-id). |
| `relatedObjects[].type.schemaUri` | `raid.relatedObject.type.schemaUri` | See [type.schemaUri](https://metadata.raid.org/en/v1.6.3/core/relatedObjects.html#relatedobject-type-schemauri). |
| `relatedObjects[].category[0].id` | `raid.relatedObject.category.id` | See [category.id](https://metadata.raid.org/en/v1.6.3/core/relatedObjects.html#relatedobject-category-id). |
| `relatedObjects[].category[0].schemaUri` | `raid.relatedObject.category.schemaUri` | See [category.schemaUri](https://metadata.raid.org/en/v1.6.3/core/relatedObjects.html#relatedobject-category-schemauri). |

## `alternateIdentifiers[]`

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `alternateIdentifiers[].id` | `raid.alternateIdentifier.id` | |
| `alternateIdentifiers[].type` | `raid.alternateIdentifier.type` | Free text. |

## `alternateUrls[]`

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `alternateUrls[].url` | `raid.alternateUrl.url` | Must be a valid URI; other answers are dropped. |

## `relatedRaids[]`

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `relatedRaids[].id` | `raid.relatedRaid.id` | |
| `relatedRaids[].type.id` | `raid.relatedRaid.type.id` | See [relatedRaid.type.id](https://metadata.raid.org/en/v1.6.3/core/relatedRaids.html#relatedraid-type-id). |
| `relatedRaids[].type.schemaUri` | `raid.relatedRaid.type.schemaUri` | See [relatedRaid.type.schemaUri](https://metadata.raid.org/en/v1.6.3/core/relatedRaids.html#relatedraid-type-schemauri). |

## Import

Importing a RAiD JSON file creates a new plan:

- The plan's title is the file's primary title, or its first title when none is marked primary.
- The plan is public when `access.type.id` is open access, and restricted otherwise.
- The `identifier`, `date`, and `access` values are written to the blueprint questions carrying their semantics. The lists are not read back, and no assets are created.

## Related

- [Semantics — admin guide](/docs/administering/content-management/templates/semantics.md)
- [File Transformers](index.md)
- [RAiD metadata schema](https://metadata.raid.org/en/v1.6.3/core/core.html#contents)
