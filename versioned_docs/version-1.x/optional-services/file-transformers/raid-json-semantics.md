---
sidebar_position: 3
sidebar_label: RAiD JSON
description: Reference of every semantic consumed by the RAiD JSON file transformer and the RAiD JSON output field it populates
---

# RAiD JSON Transformer — Semantics Reference

The [RAiD JSON file transformer](https://hub.docker.com/r/opencdmp/file-transformer-raid-json) exports plans and their descriptions to JSON files conforming to the [RAiD metadata schema v1.6.x](https://metadata.raid.org/en/v1.6.3/core/core.html#contents).

At export time the transformer walks the plan and every description attached to it. For each RAiD output field, it looks up the first field whose [semantic](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md) tag matches the expected value and writes that field's value to the JSON. Enum values are validated against the RAiD controlled vocabularies; unknown values are logged and skipped.

This page lists every RAiD JSON output field the transformer can populate and the semantic you must assign to the backing blueprint or description-template field to populate it.

## How the transformer resolves fields

The transformer uses the same two-tier pattern as the [RDA JSON transformer](rda-json-semantics.md):

- **Plan blueprint fields** seed the top-level singletons: `raid.identifier`, `raid.date`, and `raid.access`.
- **Description template fields** contribute entries to every repeatable section — `raid.title[]`, `raid.description[]`, `raid.contributor[]`, `raid.organisation[]`, `raid.relatedObject[]`, `raid.alternateIdentifier[]`, `raid.alternateUrl[]`, `raid.relatedRaid[]` — **and** can override the same identifier / date / access singletons that the blueprint seeded. Because each description runs the singleton pass, the **last description processed wins** for singleton overrides.

A field-set item produces an RAiD array entry only when at least one of its semantics yields a non-blank value. Enum-valued fields validated via `fromValue(...)` drop silently on invalid input; unparseable dates are validated against `yyyy`, `yyyy-MM`, or `yyyy-MM-dd`.

## Defaults not driven by semantics

These fields are always populated regardless of blueprint or template configuration:

| RAiD JSON field | Source |
|---|---|
| `title[0].text` | Plan label. The transformer always prepends a primary title entry. |
| `title[0].type.id` | Hardcoded `Primary` (https://vocabulary.raid.org/title.type.id/380). |
| `title[0].type.schemaUri` | Hardcoded schema URI (https://vocabulary.raid.org/title.type.schema/376). |
| `title[0].startDate` | Plan `createdAt` (`yyyy-MM-dd`). |
| `title[0].endDate` | Plan `finalizedAt` (`yyyy-MM-dd`), emitted only if the plan is finalized. |
| `date.startDate` | Plan `updatedAt`; overridden by blueprint / description semantics below. |
| `date.endDate` | Plan `updatedAt`; overridden by blueprint / description semantics below. |

Additional titles produced from description templates are **appended** after this primary title.

## `raid.identifier` — plan blueprint

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `identifier.id` | `raid.identifier.id` | |
| `identifier.schemaUri` | `raid.identifier.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/identifier.html#identifier-id-schemauri. |
| `identifier.registrationAgency.id` | `raid.identifier.registrationAgency.id` | |
| `identifier.registrationAgency.schemaUri` | `raid.identifier.registrationAgency.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/identifier.html#identifier-registrationagencyid-schemauri. |
| `identifier.owner.id` | `raid.identifier.owner.id` | |
| `identifier.owner.schemaUri` | `raid.identifier.owner.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/identifier.html#identifier-owner-schemauri. |
| `identifier.owner.servicePoint` | `raid.identifier.owner.servicePoint` | |
| `identifier.license` | `raid.identifier.license` | https://metadata.raid.org/en/v1.6.3/core/identifier.html#identifier-license. |
| `identifier.version` | `raid.identifier.version` | |

These same semantics, if present on description-template fields, **override** the blueprint values.

## `raid.date` — plan blueprint

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `date.startDate` | `raid.date.startDate` | Falls back to the plan's `updatedAt`. Valid formats: `yyyy`, `yyyy-MM`, `yyyy-MM-dd`. |
| `date.endDate` | `raid.date.endDate` | Same as above. |

Overridden by description-template fields with the same semantics.

## `raid.access` — plan blueprint

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `access.type.id` | `raid.access.type.id` | https://metadata.raid.org/en/v1.6.3/core/access.html#access-type-id. |
| `access.type.schemaUri` | `raid.access.type.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/access.html#access-type-schemauri. |
| `access.embargoExpiry` | `raid.access.embargoExpiry` | At the blueprint level the value must match `yyyy-MM-dd` exactly; at the description level the more permissive `yyyy`, `yyyy-MM`, `yyyy-MM-dd` set applies. |
| `access.statement.text` | `raid.access.statement.text` | |
| `access.statement.language.id` | `raid.access.statement.language.id` | https://metadata.raid.org/en/v1.6.3/core/access.html#access-statement-language-id. |
| `access.statement.language.schemaUri` | `raid.access.statement.language.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/access.html#access-statement-language-schemauri. |

Also override-able by description-template fields.

## `raid.title[]` — description template (field set)

One entry per field-set item.

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `title[].text` | `raid.title.text` | |
| `title[].type.id` | `raid.title.type.id` | https://metadata.raid.org/en/v1.6.3/core/titles.html#title-type-id. |
| `title[].type.schemaUri` | `raid.title.type.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/titles.html#title-type-schemauri. |
| `title[].language.id` | `raid.title.language.id` | https://metadata.raid.org/en/v1.6.3/core/titles.html#title-language-id. |
| `title[].language.schemaUri` | `raid.title.language.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/titles.html#title-language-schemauri. |
| `title[].startDate` | `raid.title.startDate` | Date format as above. |
| `title[].endDate` | `raid.title.endDate` | Date format as above. |

## `raid.description[]` — description template (field set)

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `description[].text` | `raid.description.text` | |
| `description[].type.id` | `raid.description.type.id` |https://metadata.raid.org/en/v1.6.3/core/descriptions.html#description-type-id. |
| `description[].type.schemaUri` | `raid.description.type.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/descriptions.html#description-type-schemauri. |
| `description[].language.id` | `raid.description.language.id` | Ehttps://metadata.raid.org/en/v1.6.3/core/descriptions.html#description-language-id. |
| `description[].language.schemaUri` | `raid.description.language.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/descriptions.html#description-language-schemauri. |

## `raid.contributor[]` — description template (field set)

The transformer emits each contributor's `position[]` and `role[]` as a **single-element array** — only one position and one role per contributor are populated by the current code.

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `contributor[].id` | `raid.contributor.id` | |
| `contributor[].position[0].id` | `raid.contributor.position.id` | https://metadata.raid.org/en/v1.6.3/core/contributors.html#contributor-position-id. |
| `contributor[].position[0].schemaUri` | `raid.contributor.position.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/contributors.html#contributor-position-schemauri. |
| `contributor[].position[0].startDate` | `raid.contributor.position.startDate` | |
| `contributor[].position[0].endDate` | `raid.contributor.position.endDate` | |
| `contributor[].leader` | `raid.contributor.leader` | Set to `Yes` only for the literal `Yes` value or `true` (case-insensitive); otherwise left null. |
| `contributor[].contact` | `raid.contributor.contact` | Same `Yes`/`true` rule. |
| `contributor[].role[0].id` | `raid.contributor.role.id` | https://metadata.raid.org/en/v1.6.3/core/contributors.html#contributor-role-id. |
| `contributor[].role[0].schemaUri` | `raid.contributor.role.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/contributors.html#contributor-role-schemauri. |

:::note
`raid.contributor.schemaUri` is recognised when scanning for contributor field sets but is not written to any output field — it exists as a grouping hint only.
:::

## `raid.organisation[]` — description template (field set)

One role object per organisation (single-element `role[]`).

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `organisation[].id` | `raid.organisation.id` | |
| `organisation[].schemaUri` | `raid.organisation.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/organisations.html#organisation-schemauri. |
| `organisation[].role[0].id` | `raid.organisation.role.id` | https://metadata.raid.org/en/v1.6.3/core/organisations.html#organisation-role-id. |
| `organisation[].role[0].schemaUri` | `raid.organisation.role.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/organisations.html#organisation-role-schemauri. |
| `organisation[].role[0].startDate` | `raid.organisation.role.startDate` | |
| `organisation[].role[0].endDate` | `raid.organisation.role.endDate` | |

## `raid.relatedObject[]` — description template (field set)

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `relatedObject[].id` | `raid.relatedObject.id` | |
| `relatedObject[].schemaUri` | `raid.relatedObject.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/relatedObjects.html#relatedobject-schemauri. |
| `relatedObject[].type.id` | `raid.relatedObject.type.id` | https://metadata.raid.org/en/v1.6.3/core/relatedObjects.html#relatedobject-type-id. |
| `relatedObject[].type.schemaUri` | `raid.relatedObject.type.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/relatedObjects.html#relatedobject-type-schemauri. |
| `relatedObject[].category.id` | `raid.relatedObject.category.id` | https://metadata.raid.org/en/v1.6.3/core/relatedObjects.html#relatedobject-category-id. |
| `relatedObject[].category.schemaUri` | `raid.relatedObject.category.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/relatedObjects.html#relatedobject-category-id. |

## `raid.alternateIdentifier[]` — description template (field set)

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `alternateIdentifier[].id` | `raid.alternateIdentifier.id` | |
| `alternateIdentifier[].type` | `raid.alternateIdentifier.type` | Free-form string, no enum validation. |

## `raid.alternateUrl[]` — description template (field set)

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `alternateUrl[].url` | `raid.alternateUrl.url` | Parsed via `URI.create`; invalid URIs are skipped with a warning. |

## `raid.relatedRaid[]` — description template (field set)

| RAiD JSON field | Semantic | Notes |
|---|---|---|
| `relatedRaid[].id` | `raid.relatedRaid.id` | |
| `relatedRaid[].type.id` | `raid.relatedRaid.type.id` | https://metadata.raid.org/en/v1.6.3/core/relatedRaids.html#relatedraid-type-id. |
| `relatedRaid[].type.schemaUri` | `raid.relatedRaid.type.schemaUri` | https://metadata.raid.org/en/v1.6.3/core/relatedRaids.html#relatedraid-type-schemauri. |

## Import (RAiD → plan)

On import, the transformer writes back to plan blueprint values using the **same identifier / date / access semantics** listed above. It also sets `plan.accessType` to `Public` when `access.type.id` equals `OpenAccess`, otherwise `Restricted`. Description-level import is not implemented.

## Related

- [Semantics — admin guide](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md)
- [File Transformers](index.md)
- [RAiD metadata schema](https://metadata.raid.org/en/v1.6.3/core/core.html#contents)
