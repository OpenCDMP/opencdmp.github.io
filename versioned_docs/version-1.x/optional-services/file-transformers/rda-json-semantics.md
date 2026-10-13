---
sidebar_position: 2
sidebar_label: RDA maDMP JSON
description: Reference of every semantic consumed by the RDA maDMP JSON file transformer and the RDA JSON output field it populates
---

# RDA maDMP JSON Transformer — Semantics Reference

The [RDA JSON file transformer](https://hub.docker.com/r/opencdmp/file-transformer-rda-json) exports plans (and their descriptions) to JSON files that conform to the [RDA DMP Common Standard v1.2](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard).

At export time the transformer walks the plan and every description attached to it. For each RDA output field, it looks up the first field whose [semantic](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md) tag matches the expected value and writes that field's value to the JSON. If no matching field is found the transformer falls back to a platform default where possible, or leaves the RDA field out.

This page lists every RDA JSON output field the transformer can populate and the semantic you must assign to the backing blueprint or description-template field to populate it.

:::info
Assigning a semantic to a field does **not** change how the platform stores or validates that field. It only signals to downstream plugins (including this transformer) how to interpret it. See the [Semantics admin guide](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md) for how to assign semantics.
:::

## How the transformer resolves fields

The transformer reads values from two places:

- **Plan blueprint fields** — contribute to top-level `dmp.*` properties. The transformer scans all blueprint sections and picks the first field whose `semantics` contains the expected value.
- **Description template fields** — contribute to entries in `dmp.dataset[]` and can also *augment* top-level `dmp.*` properties (for example, descriptions may supply additional `alternate_identifier`, `cost`, `related_identifier`, `contributor`, `project`, or `ethical_issues_*` entries on the DMP).

Grouped RDA structures (`dmp.project.funding`, `dmp.dataset.distribution`, `dmp.dataset.creator`, `dmp.dataset.contributor`, `dmp.dataset.metadata`, `dmp.dataset.distribution.host`, and others) are populated from **field sets** in the description template. The transformer scans field sets whose child fields carry any of the relevant semantics and produces one RDA array entry per field-set item.

## `dmp` — top-level plan metadata

Assign these semantics to fields in the [plan blueprint](/versioned_docs/version-1.x/administering/content-management/blueprints/index.md).

### Identity and timestamps

| RDA JSON field | Semantic | Source / fallback |
|---|---|---|
| `dmp.dmp_id.identifier` | — | Zenodo DOI of the plan if one has been minted, otherwise the plan's internal UUID. |
| `dmp.dmp_id.type` | — | `doi` if a Zenodo DOI is present, otherwise `other`. |
| `dmp.title` | `rda.dmp.title` | Falls back to the plan's label. |
| `dmp.description` | `rda.dmp.description` | Falls back to the plan's description. |
| `dmp.created` | `rda.dmp.created` | Falls back to the plan's `createdAt`. |
| `dmp.modified` | `rda.dmp.modified` | Falls back to the plan's `updatedAt`. |
| `dmp.language` | `rda.dmp.language` | Falls back to the plan's language. The value is mapped through the transformer's `languageMap` configuration to an ISO 639-3 code. |

### Contact

| RDA JSON field | Semantic | Notes |
|---|---|---|
| `dmp.contact.name` | `rda.dmp.contact.name` | If the blueprint field is the built-in **Contact** system field, the contact's first + last name from plan properties is used when the field is empty. Ultimately falls back to the plan creator's name. |
| `dmp.contact.mbox` | `rda.dmp.contact.mbox` | Similar system-field / creator fallback. |
| `dmp.contact.contact_id.identifier` | `rda.dmp.contact.contact_id.identifier` | Falls back to the creator's contact-info record id. |
| `dmp.contact.contact_id.type` | `rda.dmp.contact.contact_id.type` | Defaults to `OTHER` when an id is filled in by fallback. |
| `dmp.contact.affiliation[].name` | `rda.dmp.contact.affiliation.name` | |
| `dmp.contact.affiliation[].affiliation_id.identifier` | `rda.dmp.contact.affiliation.affiliation_id.identifier` | |
| `dmp.contact.affiliation[].affiliation_id.type` | `rda.dmp.contact.affiliation.affiliation_id.type` | |

### Contributors

`dmp.contributor[]` is not driven directly by blueprint semantics. It is built from:

- Plan references of type **researcher**. For each reference the transformer writes `name`, `role`, `mbox`, and a `contributor_id` derived from its `reference` value (ORCID prefixes produce a `type: orcid`, otherwise `type: other`).
- The plan's users, grouped by user id. Each user produces one contributor entry with their user id as `contributor_id.identifier`, the user's name, their email (if any), and their plan role(s) as `role`.

Description templates can additionally contribute to `dmp.contributor[]` via the semantics listed below under [Additions to `dmp.*` from description templates](#additions-to-dmp-from-description-templates).

### Ethical issues

| RDA JSON field | Semantic |
|---|---|
| `dmp.ethical_issues_exist` | `rda.dmp.ethical_issues_exist` |
| `dmp.ethical_issues_description` | `rda.dmp.ethical_issues_description` |
| `dmp.ethical_issues_report` | `rda.dmp.ethical_issues_report` |

If no blueprint field has `rda.dmp.ethical_issues_exist`, the transformer defaults to `unknown` and then tries to upgrade it from description-template fields with the same semantics.

### Project and funding

`dmp.project[]` is built primarily from plan references, not blueprint semantics:

- The references of type **project** drive `dmp.project[].title`, `.description`, `.start`, and `.end`. Start and end dates are read from the reference definition fields identified by `projectStartDateCode` and `projectEndDateCode`.
- References of type **grant** and **funder** fill `dmp.project[].funding[].grant_id` and `.funder_id`. A funder reference with a resolved `reference` is typed `fundref`; anything else falls back to `other`.

Description templates can contribute additional projects (see the project-funding semantics further below).

### Cost

| RDA JSON field | Semantic | Notes |
|---|---|---|
| `dmp.cost[].title` | `rda.dmp.cost.title` | |
| `dmp.cost[].description` | `rda.dmp.cost.description` | |
| `dmp.cost[].value` | `rda.dmp.cost.value` | Numeric value. The cost block is only written if a value is present. |
| `dmp.cost[].currency_code` | `rda.dmp.cost.currency_code` | Validated against the RDA `CurrencyCode` enum. |

Description templates can append further cost entries via the same semantic names (see the description-cost table below).

### Related and alternate identifiers

| RDA JSON field | Semantic |
|---|---|
| `dmp.related_identifier[].identifier` | `rda.dmp.related_identifier.identifier` |
| `dmp.related_identifier[].metadata_scheme` | `rda.dmp.related_identifier.metadata_scheme` |
| `dmp.related_identifier[].relation_type` | `rda.dmp.related_identifier.relation_type` |
| `dmp.related_identifier[].resource_type` | `rda.dmp.related_identifier.resource_type` |
| `dmp.related_identifier[].scheme_type` | `rda.dmp.related_identifier.scheme_type` |
| `dmp.related_identifier[].scheme_uri` | `rda.dmp.related_identifier.scheme_uri` |
| `dmp.related_identifier[].type` | `rda.dmp.related_identifier.type` |
| `dmp.alternate_identifier[].identifier` | `rda.dmp.alternate_identifier.identifier` |
| `dmp.alternate_identifier[].type` | `rda.dmp.alternate_identifier.type` |

A blueprint-level related identifier is only emitted if `identifier`, `relation_type`, and `type` are all present.

## `dmp.dataset[]` — description-level metadata

Each plan description produces one entry in `dmp.dataset[]`. Assign these semantics to fields in the [description templates](/versioned_docs/version-1.x/administering/content-management/templates/index.md) used by those descriptions.

### Identity

| RDA JSON field | Semantic | Notes |
|---|---|---|
| `dataset.title` | `rda.dataset.title` | Falls back to the description's label. |
| `dataset.description` | `rda.dataset.description` | Falls back to the description's description. |
| `dataset.language` | `rda.dataset.language` | Mapped through the transformer's `languageMap`. |
| `dataset.type` | `rda.dataset.type` | |
| `dataset.issued` | `rda.dataset.issued` | |
| `dataset.rights` | `rda.dataset.rights` | |
| `dataset.is_reused` | `rda.dataset.is_reused` | Accepts boolean fields, or text fields containing `true`/`false`. |
| `dataset.personal_data` | `rda.dataset.personal_data` | |
| `dataset.sensitive_data` | `rda.dataset.sensitive_data` | |
| `dataset.keyword` | `rda.dataset.keyword` | Combined; if no field with this semantic is set, the transformer falls back to the description's tags. |
| `dataset.preservation_statement` | `rda.dataset.preservation_statement` | |
| `dataset.data_quality_assurance` | `rda.dataset.data_quality_assurance` | Multiple values supported; text-list fields contribute each entry. |
| `dataset.dataset_id.identifier` | `rda.dataset.dataset_id` *or* `rda.dataset.dataset_id.identifier` | The simple `rda.dataset.dataset_id` form wins if present (text, external identifier, or reference). Falls back to the description's UUID. |
| `dataset.dataset_id.type` | `rda.dataset.dataset_id.type` | Defaults to `other`. |

### Alternate identifiers

| RDA JSON field | Semantic |
|---|---|
| `dataset.alternate_identifier[].identifier` | `rda.dataset.alternate_identifier.identifier` |
| `dataset.alternate_identifier[].type` | `rda.dataset.alternate_identifier.type` |

Entries are only written when both `identifier` and `type` are present.

### Creators

Assign these to fields inside a single field set in the description template. One creator is produced per field-set item.

| RDA JSON field | Semantic |
|---|---|
| `dataset.creator[].name` | `rda.dataset.creator.name` |
| `dataset.creator[].mbox` | `rda.dataset.creator.mbox` |
| `dataset.creator[].creator_id.identifier` | `rda.dataset.creator.creator_id.identifier` |
| `dataset.creator[].creator_id.type` | `rda.dataset.creator.creator_id.type` |
| `dataset.creator[].affiliation[].name` | `rda.dataset.creator.affiliation.name` |
| `dataset.creator[].affiliation[].affiliation_id.identifier` | `rda.dataset.creator.affiliation.affiliation_id.identifier` |
| `dataset.creator[].affiliation[].affiliation_id.type` | `rda.dataset.creator.affiliation.affiliation_id.type` |

### Related identifiers

| RDA JSON field | Semantic |
|---|---|
| `dataset.related_identifier[].identifier` | `rda.dataset.related_identifier.identifier` |
| `dataset.related_identifier[].metadata_scheme` | `rda.dataset.related_identifier.metadata_scheme` |
| `dataset.related_identifier[].relation_type` | `rda.dataset.related_identifier.relation_type` |
| `dataset.related_identifier[].resource_type` | `rda.dataset.related_identifier.resource_type` |
| `dataset.related_identifier[].scheme_type` | `rda.dataset.related_identifier.scheme_type` |
| `dataset.related_identifier[].scheme_uri` | `rda.dataset.related_identifier.scheme_uri` |
| `dataset.related_identifier[].type` | `rda.dataset.related_identifier.type` |

### Technical resources

| RDA JSON field | Semantic |
|---|---|
| `dataset.technical_resource[].name` | `rda.dataset.technical_resource.name` |
| `dataset.technical_resource[].description` | `rda.dataset.technical_resource.description` |
| `dataset.technical_resource[].id.identifier` | `rda.dataset.technical_resource.id.identifier` |
| `dataset.technical_resource[].id.type` | `rda.dataset.technical_resource.id.type` |

### Security and privacy

| RDA JSON field | Semantic |
|---|---|
| `dataset.security_and_privacy[].title` | `rda.dataset.security_and_privacy.title` |
| `dataset.security_and_privacy[].description` | `rda.dataset.security_and_privacy.description` |

### Metadata standards

| RDA JSON field | Semantic |
|---|---|
| `dataset.metadata[].language` | `rda.dataset.metadata.language` |
| `dataset.metadata[].description` | `rda.dataset.metadata.description` |
| `dataset.metadata[].metadata_standard_id[].identifier` | `rda.dataset.metadata.metadata_standard_id` *or* `rda.dataset.metadata.metadata_standard_id.identifier` |
| `dataset.metadata[].metadata_standard_id[].type` | `rda.dataset.metadata.metadata_standard_id.type` |

If a field tagged `rda.dataset.metadata.metadata_standard_id` contains a plain text value, the transformer uses it directly as the standard identifier and skips the other two.

### Distributions

Each distribution is a field-set item. The following semantics may be placed on its child fields.

| RDA JSON field | Semantic |
|---|---|
| `dataset.distribution[].title` | `rda.dataset.distribution.title` |
| `dataset.distribution[].description` | `rda.dataset.distribution.description` |
| `dataset.distribution[].format` | `rda.dataset.distribution.format` |
| `dataset.distribution[].access_url` | `rda.dataset.distribution.access_url` |
| `dataset.distribution[].download_url` | `rda.dataset.distribution.download_url` |
| `dataset.distribution[].byte_size` | `rda.dataset.distribution.byte_size` |
| `dataset.distribution[].data_access` | `rda.dataset.distribution.data_access` |
| `dataset.distribution[].available_until` | `rda.dataset.distribution.available_until` |
| `dataset.distribution[].issued` | `rda.dataset.distribution.issued` |

The transformer also accepts `rda.dataset.distribution.exists` as a field semantic; the value is not written to a dedicated RDA property but the presence of such a field can contribute to locating the distribution field set.

#### License

| RDA JSON field | Semantic | Notes |
|---|---|---|
| `dataset.distribution[].license[].license_ref` | `rda.dataset.distribution.license` *or* `rda.dataset.distribution.license.license_ref` | A field of type `rda.dataset.distribution.license` that holds a reference resolves `license_ref` from the reference and `start_date` from its `licenseStartDateCode` reference field (falling back to "now"). |
| `dataset.distribution[].license[].start_date` | `rda.dataset.distribution.license.start_date` | |

#### Host

| RDA JSON field | Semantic |
|---|---|
| `dataset.distribution[].host.title` | `rda.dataset.distribution.host.title` |
| `dataset.distribution[].host.url` | `rda.dataset.distribution.host.url` |
| `dataset.distribution[].host.description` | `rda.dataset.distribution.host.description` |
| `dataset.distribution[].host.storage_type` | `rda.dataset.distribution.host.storage_type` |
| `dataset.distribution[].host.backup_type` | `rda.dataset.distribution.host.backup_type` |
| `dataset.distribution[].host.backup_frequency` | `rda.dataset.distribution.host.backup_frequency` |
| `dataset.distribution[].host.availability` | `rda.dataset.distribution.host.availability` |
| `dataset.distribution[].host.geo_location` | `rda.dataset.distribution.host.geo_location` |
| `dataset.distribution[].host.support_versioning` | `rda.dataset.distribution.host.support_versioning` |
| `dataset.distribution[].host.certified_with` | `rda.dataset.distribution.host.certified_with` |
| `dataset.distribution[].host.pid_system` | `rda.dataset.distribution.host.pid_system` |
| `dataset.distribution[].host.host_id.identifier` | `rda.dataset.distribution.host.host_id.identifier` |
| `dataset.distribution[].host.host_id.type` | `rda.dataset.distribution.host.host_id.type` |

`geo_location`, `support_versioning`, `certified_with`, and `pid_system` values are validated against their respective RDA enums; unknown values are logged and skipped.

## Additions to `dmp.*` from description templates

These semantics live on description-template fields but feed the **top-level** `dmp` object rather than the dataset. Each description contributes entries; duplicates (for contributors, by identifier) are not re-added.

### Additional alternate identifiers on the DMP

| RDA JSON field | Semantic |
|---|---|
| `dmp.alternate_identifier[].identifier` | `rda.dmp.alternate_identifier.identifier` |
| `dmp.alternate_identifier[].type` | `rda.dmp.alternate_identifier.type` |

### Additional related identifiers on the DMP

| RDA JSON field | Semantic |
|---|---|
| `dmp.related_identifier[].identifier` | `rda.dmp.related_identifier.identifier` |
| `dmp.related_identifier[].metadata_scheme` | `rda.dmp.related_identifier.metadata_scheme` |
| `dmp.related_identifier[].relation_type` | `rda.dmp.related_identifier.relation_type` |
| `dmp.related_identifier[].resource_type` | `rda.dmp.related_identifier.resource_type` |
| `dmp.related_identifier[].scheme_type` | `rda.dmp.related_identifier.scheme_type` |
| `dmp.related_identifier[].scheme_uri` | `rda.dmp.related_identifier.scheme_uri` |
| `dmp.related_identifier[].type` | `rda.dmp.related_identifier.type` |

### Additional costs on the DMP

| RDA JSON field | Semantic |
|---|---|
| `dmp.cost[].title` | `rda.dmp.cost.title` |
| `dmp.cost[].description` | `rda.dmp.cost.description` |
| `dmp.cost[].value` | `rda.dmp.cost.value` |
| `dmp.cost[].currency_code` | `rda.dmp.cost.currency_code` |

### Additional contributors on the DMP

| RDA JSON field | Semantic | Notes |
|---|---|---|
| `dmp.contributor[]` | `rda.dmp.contributor` | When a field tagged with this semantic holds a **reference**, every referenced entity produces a contributor (same logic as researcher references). |
| `dmp.contributor[].name` | `rda.dmp.contributor.name` | |
| `dmp.contributor[].mbox` | `rda.dmp.contributor.mbox` | |
| `dmp.contributor[].role` | `rda.dmp.contributor.role` | Single value or text list. |
| `dmp.contributor[].contributor_id.identifier` | `rda.dmp.contributor.contributor_id.identifier` | |
| `dmp.contributor[].contributor_id.type` | `rda.dmp.contributor.contributor_id.type` | |
| `dmp.contributor[].affiliation[].name` | `rda.dmp.contributor.affiliation.name` | |
| `dmp.contributor[].affiliation[].affiliation_id.identifier` | `rda.dmp.contributor.affiliation.affiliation_id.identifier` | |
| `dmp.contributor[].affiliation[].affiliation_id.type` | `rda.dmp.contributor.affiliation.affiliation_id.type` | |

### Additional ethical-issues values

Values from description-template fields with `rda.dmp.ethical_issues_exist`, `rda.dmp.ethical_issues_description`, and `rda.dmp.ethical_issues_report` upgrade the DMP-level values computed from the blueprint. `ethical_issues_exist` only overrides when the resolved value is not `unknown`.

### Additional projects on the DMP

Description-template field sets whose children carry the project semantics below contribute further entries to `dmp.project[]` (including their funding and project identifiers).

| RDA JSON field | Semantic |
|---|---|
| `dmp.project[].title` | `rda.dmp.project.title` |
| `dmp.project[].description` | `rda.dmp.project.description` |
| `dmp.project[].start` | `rda.dmp.project.start` |
| `dmp.project[].end` | `rda.dmp.project.end` |
| `dmp.project[].project_id[].identifier` | `rda.dmp.project.project_id.identifier` |
| `dmp.project[].project_id[].type` | `rda.dmp.project.project_id.type` |
| `dmp.project[].funding[].funder_id` (identifier from reference) | `rda.dmp.project.funding.funder_id` |
| `dmp.project[].funding[].funder_id.identifier` | `rda.dmp.project.funding.funder_id.identifier` |
| `dmp.project[].funding[].funder_id.type` | `rda.dmp.project.funding.funder_id.type` |
| `dmp.project[].funding[].grant_id` (identifier from reference) | `rda.dmp.project.funding.grant_id` |
| `dmp.project[].funding[].grant_id.identifier` | `rda.dmp.project.funding.grant_id.identifier` |
| `dmp.project[].funding[].grant_id.type` | `rda.dmp.project.funding.grant_id.type` |
| `dmp.project[].funding[].funding_status` | `rda.dmp.project.funding.funding_status` |

A field with the plain `rda.dmp.project.funding.funder_id` (or `grant_id`) semantic holding a reference yields an identifier typed `other`; the `.identifier` variant of the same field additionally promotes a resolved reference to `fundref`. The `.type` semantic overrides the resulting `funder_id.type` / `grant_id.type`.

## Related

- [Semantics — admin guide](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md) — how to assign semantics to blueprint and template fields
- [File Transformers](index.md) — service overview and configuration pointers
- [File Transformer configuration](/versioned_docs/version-1.x/deployment/configuration/backend/file-transformers.md) — environment variables
- [RDA DMP Common Standard v1.2](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) — canonical specification of the JSON structure documented above
