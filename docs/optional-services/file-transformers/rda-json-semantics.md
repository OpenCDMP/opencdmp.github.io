---
sidebar_position: 2
sidebar_label: RDA maDMP JSON
description: Reference of every semantic consumed by the RDA maDMP JSON file transformer and the RDA JSON output field it populates
---

# RDA maDMP JSON Transformer — Semantics Reference

The [RDA JSON file transformer](https://hub.docker.com/r/opencdmp/file-transformer-rda-json) exports plans and their assets to JSON files that conform to the [RDA DMP Common Standard v1.3](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard).

At export time the transformer walks the plan and every asset attached to it. For each RDA output field, it looks up the first field whose [semantic](/docs/administering/content-management/templates/semantics.md) tag matches the expected value and writes that field's value to the JSON. If no matching field is found, the transformer falls back to a platform default where possible, or leaves the RDA field out.

To populate an RDA JSON field, assign the semantic listed below to the blueprint or asset-template field that holds the value.

:::info
Assigning a semantic to a field does **not** change how the platform stores or validates that field. It tells plugins, such as this transformer, how to interpret the field. See the [Semantics admin guide](/docs/administering/content-management/templates/semantics.md) for how to assign semantics.
:::

## How the transformer resolves fields

The transformer reads values from two places:

- **Plan blueprint fields** contribute to top-level `dmp.*` properties. The transformer scans all blueprint sections and picks the first field whose `semantics` contains the expected value.
- **Asset template fields** contribute to entries in `dmp.dataset[]` and can also *augment* top-level `dmp.*` properties (for example, assets may supply additional `alternate_identifier`, `cost`, `related_identifier`, `contributor`, `project`, `affiliation`, or `ethical_issues_*` entries on the DMP).

Grouped RDA structures (`dmp.project.funding`, `dmp.dataset.distribution`, `dmp.dataset.creator`, `dmp.dataset.contributor`, `dmp.dataset.metadata`, `dmp.dataset.distribution.host`, and others) are built from **answers**. Which answers make up one object depends on the [objects](/docs/administering/content-management/templates/semantics.md#objects-several-questions-one-exported-object) set on sections and questions:

- **Without an object**, each answer to a question (each item of a repeating question) produces its own RDA entry.
- **In a section described as an object** (for example `rda.dataset.distribution`), all the section's questions about that object produce one entry together. The outermost section that describes the object counts.
- **In a question described as an object** (for example `rda.dataset.distribution.license`), each answer produces one entry inside the object around it.

[Answer options that stand for key values](/docs/administering/content-management/templates/semantics.md#answer-options-that-stand-for-key-values) are read as if inputs with those keys had been answered; an input answered explicitly wins over the option. An option marked **Exports nothing** leaves the object out.

### Example: a distribution from a few plain questions

A "Data sharing" section described as `rda.dataset.distribution` contains:

| Question | Object | Input semantics |
|---|---|---|
| Where will the data be deposited? | `rda.dataset.distribution.host` | A radio input whose options stand for `…host.title`, `…host.url`, and `…host.pid_system` |
| Who can access the data? | — | `rda.dataset.distribution.data_access` |
| Which licences apply? (repeating) | `rda.dataset.distribution.license` | `…license.license_ref`, `…license.start_date` |

The export writes one distribution with its host, its access level, and one licence per answer to the licence question.

## Organisation settings

Organisation administrators set these on the transformer's **Settings** tab (see [Plugins](/docs/administering/tenant-management/plugins.md)). An empty setting uses the default.

| Setting | Group | What it does | Default |
|---|---|---|---|
| **Grants** | Reference types | The reference type whose references are exported as the plan's grants. | `grants` |
| **Funders** | Reference types | The reference type whose references are exported as the plan's funders. | `funders` |
| **Projects** | Reference types | The reference type whose references are exported as the plan's projects. | `projects` |
| **Researchers** | Reference types | The reference type whose references are exported as the plan's contributors. | `researchers` |
| **Repository of the plan identifier** | Identifiers | Once the plan is deposited there, the DOI from this repository becomes the plan's identifier. Use the repository's id as listed on the **Plugins** page, for example `zenodo` (case does not matter). | `Zenodo` |

The installation sets the reference type defaults with the `RDA_FILE_TRANSFORMER_GRANTS_CODE`, `RDA_FILE_TRANSFORMER_FUNDERS_CODE`, `RDA_FILE_TRANSFORMER_PROJECTS_CODE`, and `RDA_FILE_TRANSFORMER_RESEARCHERS_CODE` [environment variables](/docs/deployment/configuration/backend/file-transformers.md).

## `dmp` — top-level plan metadata

Assign these semantics to fields in the [plan blueprint](/docs/administering/content-management/blueprints/index.md).

### Identity and timestamps

| RDA JSON field | Semantic | Source / fallback |
|---|---|---|
| `dmp.dmp_id.identifier` | `rda.dmp.dmp_id` *or* `rda.dmp.dmp_id.identifier` | The DOI the plan received from the repository set in **Repository of the plan identifier** (Zenodo by default) comes first. Otherwise the answered identifier is used, and without one the plan's internal UUID. |
| `dmp.dmp_id.type` | `rda.dmp.dmp_id.type` | `doi` for a deposited DOI. An answered type is used with `rda.dmp.dmp_id.identifier`. With `rda.dmp.dmp_id`, or without an answered type, the type is inferred: `doi` for a DOI (bare, `doi:`, or `doi.org`), `url` for another web address, otherwise `other`. The internal UUID is typed `other`. |
| `dmp.title` | `rda.dmp.title` | Falls back to the plan's title. |
| `dmp.description` | `rda.dmp.description` | Falls back to the plan's description. |
| `dmp.created` | `rda.dmp.created` | An ISO date-time, or a date read as midnight UTC. Falls back to the date the plan was created. |
| `dmp.modified` | `rda.dmp.modified` | An ISO date-time, or a date read as midnight UTC. Falls back to the date the plan was last changed. |
| `dmp.language` | `rda.dmp.language` | A two-letter code, mapped to ISO 639-3 through the transformer's language map; a code the map does not hold is skipped. Falls back to the plan's language, then to `eng`. |

### Contact

| RDA JSON field | Semantic | Notes |
|---|---|---|
| `dmp.contact.name` | `rda.dmp.contact.name` | Falls back to the first and last name of the first contact in the blueprint's built-in **Contact** field, then to the plan creator's name. |
| `dmp.contact.mbox` | `rda.dmp.contact.mbox` | Same fallback: the **Contact** field, then the plan creator. |
| `dmp.contact.contact_id.identifier` | `rda.dmp.contact.contact_id.identifier` | Falls back to an internal id of the plan creator's email address. |
| `dmp.contact.contact_id.type` | `rda.dmp.contact.contact_id.type` | When no type is answered, it is inferred from the identifier: `orcid` for an ORCID (bare or as an `orcid.org` address), `url` for another web address, otherwise `other`. |
| `dmp.contact.affiliation[].name` | `rda.dmp.contact.affiliation.name` | |
| `dmp.contact.affiliation[].affiliation_id.identifier` | `rda.dmp.contact.affiliation.affiliation_id.identifier` | |
| `dmp.contact.affiliation[].affiliation_id.type` | `rda.dmp.contact.affiliation.affiliation_id.type` | |

The contact's affiliation is written only when its identifier or identifier type is answered. When the plan has no creator, its first owner with an email address stands in for the creator.

### Contributors

`dmp.contributor[]` is built from:

- Plan references of the type set in **Researchers** (`researchers` by default). Each reference gives a contributor with the reference's label as `name`, the reference type's name as `role`, the reference's `primaryEmail` field as `mbox`, and a `contributor_id` from the reference's value: an `orcid:` value becomes an `https://orcid.org/` address typed `orcid`, another ORCID is typed `orcid`, another web address `url`, and anything else `other`. A reference picked in several blueprint fields is exported once.
- The plan's members, one contributor per user, with the user id as `contributor_id.identifier` (typed `other`), the user's name, their email (if any), and their plan roles (for example `Owner`) as `role`. Members without a name are left out.
- Blueprint fields carrying the `rda.dmp.contributor.*` semantics listed under [Additions to `dmp.*` from asset templates](#additions-to-dmp-from-asset-templates), which asset templates can use as well. A contributor already listed under the same identifier is not added again; a contributor without an identifier is always added.

### Ethical issues

| RDA JSON field | Semantic |
|---|---|
| `dmp.ethical_issues_exist` | `rda.dmp.ethical_issues_exist` |
| `dmp.ethical_issues_description` | `rda.dmp.ethical_issues_description` |
| `dmp.ethical_issues_report` | `rda.dmp.ethical_issues_report` |

`dmp.ethical_issues_exist` takes `yes`, `no`, or `unknown`; other answers are dropped. Without a valid blueprint answer it is `unknown`, and asset-template fields with the same semantics can then change it (see [Additional ethical-issues values](#additional-ethical-issues-values)). A Yes/No input carrying this semantic (or `rda.dataset.personal_data`, `rda.dataset.sensitive_data`, or `rda.dataset.distribution.host.support_versioning`) is exported as `yes` or `no`.

### Project and funding

`dmp.project[]` is built from plan references first, of the types set in **Projects**, **Grants**, and **Funders**:

- Each project reference becomes a project, with the reference's label as `title` and its description as `description`. `start` and `end` come from the reference's `startDate` and `endDate` fields.
- When the plan has exactly one project, it gets the funding: with one funder, one funding entry per grant under that funder; otherwise one funding entry per funder, without grants. Several projects get no funding from references.
- Without a project reference but with exactly one funder, each grant becomes a project named after the grant, funded by that funder and grant.
- A funder's `funder_id` is the reference's value, typed `ror` for a ROR id (bare or as a `ror.org` address) and `fundref` otherwise, and a grant's `grant_id` is the reference's value typed `other`. A reference without a value uses its internal id, typed `other`.
- A reference picked in several blueprint fields is exported once.

Blueprint fields and asset templates can then contribute further projects through the `rda.dmp.project.*` semantics listed under [Additional projects on the DMP](#additional-projects-on-the-dmp). A project is not added twice: two projects are the same when they share a project identifier, or have the same title and the same grants. Describe a blueprint section as `rda.dmp.project` so that its title, dates, and funding questions make up one project instead of one project each.

### Cost

| RDA JSON field | Semantic | Notes |
|---|---|---|
| `dmp.cost[].title` | `rda.dmp.cost.title` | |
| `dmp.cost[].description` | `rda.dmp.cost.description` | |
| `dmp.cost[].value` | `rda.dmp.cost.value` | A number; other answers are dropped. |
| `dmp.cost[].currency_code` | `rda.dmp.cost.currency_code` | An ISO 4217 currency code; other answers are dropped. |

A cost is written when any of its values is answered. Asset templates can add further cost entries with the same semantics (see the additional-costs table below).

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

A related or alternate identifier is written when any of its values is answered. `scheme_uri` must be a valid URI; other answers are dropped.

### Affiliations

| RDA JSON field | Semantic |
|---|---|
| `dmp.affiliation[].name` | `rda.dmp.affiliation.name` |
| `dmp.affiliation[].affiliation_id.identifier` | `rda.dmp.affiliation.affiliation_id` *or* `rda.dmp.affiliation.affiliation_id.identifier` |
| `dmp.affiliation[].affiliation_id.type` | `rda.dmp.affiliation.affiliation_id.type` |

The RDA DMP Common Standard v1.3 has no `affiliation` on the DMP itself; the export adds it as an extra property. An affiliation is written when any of its values is answered. The plain `rda.dmp.affiliation.affiliation_id` key is read only from a question that also carries one of the other affiliation keys. Asset templates can add further affiliations with the same semantics.

## `dmp.dataset[]` — asset-level metadata

Each plan asset produces one entry in `dmp.dataset[]`. Assign these semantics to fields in the [asset templates](/docs/administering/content-management/templates/index.md) used by those assets.

### Identity

| RDA JSON field | Semantic | Notes |
|---|---|---|
| `dataset.title` | `rda.dataset.title` | Falls back to the asset's title. |
| `dataset.description` | `rda.dataset.description` | Falls back to the asset's description. |
| `dataset.language` | `rda.dataset.language` | An ISO 639-3 code; other answers are dropped. Falls back to the template's language (mapped through the language map), then to the plan's language. |
| `dataset.type` | `rda.dataset.type` | Defaults to `DMP Dataset`. |
| `dataset.issued` | `rda.dataset.issued` | Written as answered; a date input gives `YYYY-MM-DD`. |
| `dataset.rights` | `rda.dataset.rights` | Written only when answered. |
| `dataset.is_reused` | `rda.dataset.is_reused` | `true` or `yes` is true and `false` or `no` is false, in any case, so Yes/No inputs, text, and Yes/No options all work. Other answers leave it out. |
| `dataset.personal_data` | `rda.dataset.personal_data` | `yes`, `no`, or `unknown`; other answers are dropped. Defaults to `unknown`. |
| `dataset.sensitive_data` | `rda.dataset.sensitive_data` | `yes`, `no`, or `unknown`; other answers are dropped. Defaults to `unknown`. |
| `dataset.keyword` | `rda.dataset.keyword` | Every value of every answer, without repeats. Without any, the transformer falls back to the asset's tags. |
| `dataset.preservation_statement` | `rda.dataset.preservation_statement` | |
| `dataset.data_quality_assurance` | `rda.dataset.data_quality_assurance` | Every value of every answer; text-list fields contribute each entry. |
| `dataset.dataset_id.identifier` | `rda.dataset.dataset_id` *or* `rda.dataset.dataset_id.identifier` | The simple `rda.dataset.dataset_id` form wins if answered (text, external identifier, or reference). Falls back to the asset's UUID. |
| `dataset.dataset_id.type` | `rda.dataset.dataset_id.type` | Used with `rda.dataset.dataset_id.identifier`. With `rda.dataset.dataset_id`, or when no type is answered, the type is inferred from the identifier: `doi` for a DOI, `url` for another web address, otherwise `other`. The asset's UUID is typed `other`. |

### Alternate identifiers

| RDA JSON field | Semantic |
|---|---|
| `dataset.alternate_identifier[].identifier` | `rda.dataset.alternate_identifier.identifier` |
| `dataset.alternate_identifier[].type` | `rda.dataset.alternate_identifier.type` |

An entry is written when either value is answered. Every dataset also gets the alternate identifier `opencdmp_<asset id>`, typed `internal`, which the import uses to recognise the asset.

### Creators

Assign these to the inputs of a single question (field set) in the asset template. One creator is produced per answer to the question (field-set item); an item with no answered creator value is not written. When no `creator_id.type` is answered, it is inferred from the identifier: `orcid` for an ORCID, `url` for another web address, otherwise `other`.

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
| `dataset.technical_resource[].technical_resource_id[].identifier` | `rda.dataset.technical_resource.id.identifier` |
| `dataset.technical_resource[].technical_resource_id[].type` | `rda.dataset.technical_resource.id.type` |

The identifier keys are read only from a question that also carries `rda.dataset.technical_resource.name` or `rda.dataset.technical_resource.description`.

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

`language` takes an ISO 639-3 code; other answers are dropped. An answer to `rda.dataset.metadata.metadata_standard_id` becomes the standard identifier, typed `other`, and the other two standard keys are skipped. Without an answered type, the standard identifier is typed `other`.

### Distributions

Without an [object](/docs/administering/content-management/templates/semantics.md#objects-several-questions-one-exported-object), each answer to a question with these semantics is one distribution. The following semantics may be placed on its inputs.

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
| `dataset.distribution[]` (whole object) | `rda.dataset.distribution` on a reference input |

The export does not read `rda.dataset.distribution.exists`. On import, a Yes/No input carrying it is answered Yes when the dataset has a distribution.

- **Title**: when no title is answered, the distribution takes its host's title.
- **Picked references**: a reference input carrying `rda.dataset.distribution` fills a whole distribution from the picked reference. Each value comes from the reference field carrying the matching key (for example `rda.dataset.distribution.title`), the title falls back to the reference's label, and the host and licence are filled from the same reference. Answered inputs of the same object override these values.
- **One distribution per repository**: when a reference input for the host (or the whole distribution) holds several picked references, each produces its own distribution.
- **Empty distributions** are not written.
- **Formats**: `format` takes every value of the answer. `issued` and `available_until` must be dates (`YYYY-MM-DD`). `access_url` and `download_url` must be valid URIs. `data_access` takes `open`, `restricted`, or `closed`; an answer of `shared` is written as `restricted`. `byte_size` must be a whole number of bytes; a value such as `2 GB` is dropped. Values in the wrong format are dropped.

#### License

| RDA JSON field | Semantic | Notes |
|---|---|---|
| `dataset.distribution[].license[].license_ref` | `rda.dataset.distribution.license.license_ref` | Must be a valid URI; other answers are dropped. |
| `dataset.distribution[].license[].start_date` | `rda.dataset.distribution.license.start_date` | Written as answered; a date input gives `YYYY-MM-DD`. |
| `dataset.distribution[].license[]` (whole object) | `rda.dataset.distribution.license` on a reference input | Each picked reference produces one licence. `license_ref` and `start_date` come from the reference fields carrying `rda.dataset.distribution.license.license_ref` and `rda.dataset.distribution.license.start_date`. |

A licence with neither a `license_ref` nor a `start_date` is not written.

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
| `dataset.distribution[].host` (whole object) | `rda.dataset.distribution.host` on a reference input |

- **Picked repository**: a reference input carrying `rda.dataset.distribution.host` fills the host from the picked reference. Each value comes from the reference field carrying the matching key; the title falls back to the reference's label, the description to the reference's description, and `host_id` to the reference's value. Answered inputs of the same object override these values.
- **Identifier type**: when no `host_id.type` is answered, it is inferred from the identifier: `re3data` for a re3data DOI or record address, `doi` for another DOI, `url` for another web address, otherwise `other`.
- **Accepted values**: `geo_location` takes a country code, `support_versioning` takes `yes`, `no`, or `unknown`, and `certified_with` takes the values of the RDA standard; other values are skipped. For example, options such as "None" or "I don't know" on an input tagged `rda.dataset.distribution.host.certified_with` are dropped from the export; the editor's checks flag option values that a key does not accept. `pid_system` takes any value; the editors suggest the values listed by the RDA standard. `url` is optional and must be a valid URI.
- **PID system**: only the first value of an answer to `pid_system` is written.

## Additions to `dmp.*` from asset templates

These semantics live on asset-template fields but feed the **top-level** `dmp` object, not the dataset. Each asset contributes entries. A contributor already listed under the same identifier and a project already listed are not added again; alternate identifiers, related identifiers, costs, and affiliations are added as answered.

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
| `dmp.contributor[].role` | `rda.dmp.contributor.role` | Every value of the answer. |
| `dmp.contributor[].contributor_id.identifier` | `rda.dmp.contributor.contributor_id.identifier` | |
| `dmp.contributor[].contributor_id.type` | `rda.dmp.contributor.contributor_id.type` | When no type is answered, it is inferred from the identifier: `orcid` for an ORCID, `url` for another web address, otherwise `other`. |
| `dmp.contributor[].affiliation[].name` | `rda.dmp.contributor.affiliation.name` | |
| `dmp.contributor[].affiliation[].affiliation_id.identifier` | `rda.dmp.contributor.affiliation.affiliation_id.identifier` | |
| `dmp.contributor[].affiliation[].affiliation_id.type` | `rda.dmp.contributor.affiliation.affiliation_id.type` | |

### Additional affiliations on the DMP

| RDA JSON field | Semantic |
|---|---|
| `dmp.affiliation[].name` | `rda.dmp.affiliation.name` |
| `dmp.affiliation[].affiliation_id.identifier` | `rda.dmp.affiliation.affiliation_id` *or* `rda.dmp.affiliation.affiliation_id.identifier` |
| `dmp.affiliation[].affiliation_id.type` | `rda.dmp.affiliation.affiliation_id.type` |

### Additional ethical-issues values

Values from asset-template fields with `rda.dmp.ethical_issues_exist`, `rda.dmp.ethical_issues_description`, and `rda.dmp.ethical_issues_report` add to the DMP-level values computed from the blueprint:

- An asset's `yes` or `no` for `ethical_issues_exist` replaces the value so far, so the last asset that answers it decides. `unknown` changes nothing.
- `ethical_issues_description` and `ethical_issues_report` are taken from the first asset that answers them, and only when the blueprint left them empty.

### Additional projects on the DMP

Blueprint and asset-template questions whose inputs carry the project semantics below contribute further entries to `dmp.project[]` (including their funding and project identifiers). Each answer is one project with at most one funding entry.

| RDA JSON field | Semantic |
|---|---|
| `dmp.project[].title` | `rda.dmp.project.title` |
| `dmp.project[].description` | `rda.dmp.project.description` |
| `dmp.project[].start` | `rda.dmp.project.start` |
| `dmp.project[].end` | `rda.dmp.project.end` |
| `dmp.project[].project_id[].identifier` | `rda.dmp.project.project_id.identifier` |
| `dmp.project[].project_id[].type` | `rda.dmp.project.project_id.type` |
| `dmp.project[].funding[].funder_id.identifier` | `rda.dmp.project.funding.funder_id` *or* `rda.dmp.project.funding.funder_id.identifier` |
| `dmp.project[].funding[].funder_id.type` | `rda.dmp.project.funding.funder_id.type` |
| `dmp.project[].funding[].grant_id.identifier` | `rda.dmp.project.funding.grant_id` *or* `rda.dmp.project.funding.grant_id.identifier` |
| `dmp.project[].funding[].grant_id.type` | `rda.dmp.project.funding.grant_id.type` |
| `dmp.project[].funding[].funding_status` | `rda.dmp.project.funding.funding_status` |

- **Funder and grant identifiers**: on a reference input, the identifier is the picked reference's value; on any other input, the answer. A funder from `rda.dmp.project.funding.funder_id` is typed `other`, and one from `rda.dmp.project.funding.funder_id.identifier` is typed `ror` for a ROR id and `fundref` otherwise. A grant is typed `other` either way. An answered `.type` overrides the type; a type without an identifier is ignored.
- **Dates**: `start` and `end` are written as `YYYY-MM-DD`; answers that are not dates are dropped.
- **Funding status** takes `planned`, `applied`, `granted`, or `rejected`; other answers are dropped.
- **Project identifier**: a `project_id` entry is written when its identifier or type is answered.

## Import

The transformer also imports RDA maDMP JSON files into a plan, using the same semantics in the other direction. It accepts the files published with the RDA DMP Common Standard, including properties given as a single object where the schema expects a list (for example a single `contact_id`).

- Each RDA value is written to the first input carrying its semantic. Plan-level objects such as the contact and the projects are placed once, and each contributor gets its own answer.
- For a select or radio input whose options [stand for key values](/docs/administering/content-management/templates/semantics.md#answer-options-that-stand-for-key-values), the option whose key values all match the file is selected. When several match, the one matching the most values wins. Keys answered by other inputs of the object are left out of the comparison.
- When a dataset has no distribution, an option marked **Exports nothing** on a distribution question is selected.
- A `data_access` of `shared` or `restricted` selects whichever of the two options the input offers.
- A question that takes a single answer keeps the first matching object; for example, a non-repeating project question keeps the first of two projects.
- `dmp_id` is written back to the inputs carrying the `rda.dmp.dmp_id` semantics, unless it is a UUID typed `other`, which is the id OpenCDMP exports for a plan without a DOI. An imported plan is a new plan and gets its own id.

Some values are not read back on import. The editors mark those keys, using the plugin's [semantics manifest](#semantics-manifest).

## Semantics manifest

The transformer publishes a semantics manifest with its configuration: every key it reads, the RDA field it fills, the objects the keys make up, the value format and accepted values, and what it writes when a key is not answered. The blueprint and asset template editors use the manifest for suggestions, [coverage, and checks](/docs/administering/content-management/templates/semantics.md#what-the-editors-show-about-plugins).

The manifest marks as **needed**:

- `rda.dataset.dataset_id`, `rda.dataset.personal_data`, and `rda.dataset.sensitive_data` for asset templates, and `rda.dmp.contact.contact_id.identifier` and `rda.dmp.ethical_issues_exist` for blueprints. The export writes only a placeholder (`unknown` or an internal id) without them. Asset templates can also supply `rda.dmp.ethical_issues_exist`, but it is not needed there.
- Every value RDA requires inside an object when the transformer has nothing to put in its place, for example `rda.dataset.metadata.language`, `rda.dataset.related_identifier.type`, `rda.dataset.distribution.data_access`, and `rda.dataset.distribution.host.title`. An exported object without such a value fails the RDA schema. The editors expect these values only when the structure uses the object.

Every other key is marked **can use**. Values with a fallback show it, for example the distribution title (the host's title) and inferred identifier types (`doi`, `orcid`, `url`, or `other`).

## Related

- [Semantics — admin guide](/docs/administering/content-management/templates/semantics.md): how to assign semantics to blueprint and template fields
- [File Transformers](index.md): service overview and configuration pointers
- [File Transformer configuration](/docs/deployment/configuration/backend/file-transformers.md): environment variables
- [RDA DMP Common Standard v1.3](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard): the specification of the JSON structure
