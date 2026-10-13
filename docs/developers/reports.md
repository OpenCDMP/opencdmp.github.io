---
sidebar_position: 5
title: Reports
description: Count how a question was answered across a tenant, or across the installation, through the API
---

# Reports

The report endpoints aggregate the answers stored in plans and assets: how many items answered a question, what they said, and how that splits by status, blueprint, period, tenant, or another answer. They back the [Answers admin page](/docs/administering/reports.md) and can be called directly for dashboards or scheduled extracts.

All endpoints live under `api/report` and require the `x-tenant` header described in [Addressing an organisation](/docs/developers/api-usage.md#addressing-an-organisation-x-tenant).

## Scope and permissions

Every endpoint works in one of two scopes:

| Scope | How to ask for it | Reads | Permissions |
| --- | --- | --- | --- |
| Tenant (default) | `installationWide` omitted or `false` | The plans, assets, templates, and blueprints of the tenant in the `x-tenant` header. Rows of other tenants, including the default tenant's, are excluded. | `BrowseReport`; `ExportReport` for the CSV |
| Installation | `installationWide: true` (a query parameter on the outline endpoints) | Every tenant of the installation. | `BrowseInstallationReport`; `ExportInstallationReport` for the CSV |

By default `BrowseReport` and `ExportReport` are granted to the `Admin`, `InstallationAdmin`, and `TenantAdmin` roles, and the two installation permissions to `Admin` and `InstallationAdmin`. Reports are tenant-wide: the caller's own plan memberships do not narrow them.

## Addressing a question

A report reads one or more **questions**. A question is addressed in one of two ways:

| Form | Fields | Reads |
| --- | --- | --- |
| By fieldset | `fieldSetId`, `fieldIds` | The named fields of one fieldset, in every version of one template or blueprint lineage, deleted versions included (`descriptionTemplateGroupId` / `planBlueprintGroupId` required). Field ids are stable across versions. |
| By semantic | `semantic` | Every field tagged with that semantic (case- and whitespace-insensitive), in every version in scope. When *all* questions are semantic the group id may be omitted, and every lineage in scope that carries the semantic is read. |

Ids and numbering come from the outline or search endpoints below; never guess them.

## Endpoints

### Search questions

`POST api/report/questions/search`

```json
{ "like": "repositor", "subject": 0, "limit": 20, "installationWide": false, "includeSources": false }
```

`subject` is optional (`0` = assets, `1` = plans; both when omitted). The search matches question numbering (prefix), fieldset title and description, and field labels, in the *current* version of each lineage. It also matches the names of semantics and the titles of the questions carrying them. `limit` defaults to `30`.

```json
{
  "questions": [
    {
      "subject": 0,
      "groupId": "7ae1c3d3-91a9-4315-9aec-b0f173010f2a",
      "groupLabel": "Science Europe",
      "tenantCode": null,
      "versionCount": 2,
      "fieldSetId": "8f1c…",
      "numbering": "5.2.4",
      "title": "In which repository will the data be deposited?",
      "hasMultiplicity": false,
      "fields": [ { "id": "a1…", "label": "Repository", "fieldType": "referenceTypes", "controlsOtherFields": false, "semantics": ["rda.dataset.distribution.host.title"] } ],
      "allFields": [ "…the fields above plus any control fields…" ]
    }
  ],
  "semantics": [
    {
      "subject": 0,
      "semantic": "rda.dataset.distribution.host.title",
      "label": "Repository",
      "titles": ["Repository", "In which repository will the data be deposited?"],
      "groupCount": 4,
      "groupLabels": ["Science Europe", "Horizon Europe DMP", "…"],
      "fieldTypes": ["referenceTypes", "freetext"]
    }
  ],
  "sources": null
}
```

A semantic's identity is the tag string itself, compared case- and whitespace-insensitively (`RDA.Dataset.Type ` and `rda.dataset.type` are one question). `label` is the fieldset title most templates give it and `titles` every distinct wording, most common first. A long list hints at loose tagging.

`fields` are the fields counted by default. When a fieldset holds a yes/no field (`fieldType` `booleanDecision`), the yes/no fields are the question and are the only fields listed. Otherwise a tick box whose only role is to reveal a sibling (`controlsOtherFields: true` on a `checkBox` field) is left out. `allFields` has every field. With an empty `like` the response lists only the semantics in use, ordered by how many lineages share them. `limit` caps the question hits and the semantic hits separately.

On an installation-wide search, `tenantCode` on each question hit names the tenant that owns the lineage; it is `null` otherwise.

With `includeSources: true` the response also carries `sources`: the template and blueprint lineages whose name contains `like` (all of them when `like` is empty), ordered by name and then tenant, and capped by `limit`. The admin page uses it to browse the lineages of every tenant, which the template and blueprint listings do not offer.

```json
"sources": [
  { "subject": 0, "groupId": "7ae1c3d3-…", "label": "Science Europe", "tenantCode": "example", "versionCount": 2 }
]
```

### Outline of a lineage

`GET api/report/outline/description-template/{groupId}`
`GET api/report/outline/plan-blueprint/{groupId}`

The numbered question tree of the newest version of the lineage: sections, fieldsets and fields with ids, numbering as the template editor shows it (`5.2.4`), titles, field types and semantics. Blueprint outlines leave out system fields (title, description, language, contact, access rights), which are already available as filters and export columns.

Add `?installationWide=true` to look up a lineage of another tenant; it requires `BrowseInstallationReport`.

### Run a report

`POST api/report/query`

```json
{
  "subject": 0,
  "descriptionTemplateGroupId": "7ae1c3d3-91a9-4315-9aec-b0f173010f2a",
  "questions": [
    { "fieldSetId": "8f1c…", "fieldIds": ["a1…", "b2…"], "label": "5.2.4 Repository" }
  ],
  "groupBy": [ { "type": 0 } ],
  "descriptionSubQuery": { "statusIds": ["…"] },
  "planSubQuery": { "planReferenceSubQuery": { "referenceIds": ["…"], "isActive": [1] } },
  "latestVersionOnly": true,
  "includeInactive": false,
  "dateBucket": 0,
  "textTopN": 20,
  "installationWide": false
}
```

| Field | Meaning |
| --- | --- |
| `subject` | `0` counts assets (descriptions), `1` counts plans. |
| `descriptionTemplateGroupId`, `planBlueprintGroupId` | The lineage read. On an asset report, `planBlueprintGroupId` also narrows to plans built from that blueprint and enables `planQuestions`. |
| `questions` | One to ten questions, keyed `q0`, `q1`, … in request order. |
| `planQuestions` | Asset reports only: questions of the parent plan's blueprint, keyed `p0`, `p1`, …, available as `PlanQuestion` breakdowns and as CSV columns. |
| `groupBy` | Up to three dimensions. `type` is a `ReportDimensionType`: `0` asset status, `1` plan status, `2` plan access, `3` plan blueprint, `4` plan version status, `5` template version, `6` created period, `7` finalized period, `8` answer to `questionKey`, `9` plan answer to `questionKey`, `10` tenant (installation-wide reports only). |
| `descriptionSubQuery`, `planSubQuery` | The asset and plan listing lookups, so anything the listings can filter by applies here. Paging and ordering are ignored. |
| `latestVersionOnly` | Count each plan lineage once, by its newest version (default `true`). The newest version is chosen over the whole lineage before the filters apply, so a status filter that excludes a newer draft drops the plan instead of falling back to its older finalized version. |
| `includeInactive` | Include deleted items (default `false`). |
| `dateBucket` | Granularity of date answers and date dimensions: `0` year, `1` month. |
| `textTopN` | Distinct free-text answers listed before the rest fold into *Other text (n)*. |
| `installationWide` | Count across every tenant (default `false`). Requires `BrowseInstallationReport`, or `ExportInstallationReport` for the CSV. |

The response:

```json
{
  "subject": 0,
  "sourceGroupId": "7ae1c3d3-…",
  "sourceLabel": "Science Europe",
  "sourceVersionCount": 2,
  "sourceSpansAllGroups": false,
  "subjects": 72,
  "distinctPlans": 34,
  "dimensions": [ { "type": 0, "label": "Asset status" } ],
  "questions": [
    {
      "key": "q0",
      "label": "5.2.4 Repository",
      "numbering": "5.2.4",
      "fieldType": "referenceTypes",
      "multiValue": true,
      "states": { "answered": 38, "notAnswered": 34, "notApplicable": 0, "notMigrated": 0 },
      "distribution": [ { "value": "Zenodo", "count": 25, "percentOfAnswered": 65.8 } ],
      "numberSummary": null
    }
  ],
  "crossTab": [
    {
      "dimensionValues": ["Finalized"],
      "subjects": 31,
      "distinctPlans": 14,
      "questions": [ { "key": "q0", "states": { "…": 0 }, "distribution": [ "…" ] } ]
    }
  ]
}
```

Answer states are per question, because two questions of the same request can disagree about whether an item answered:

| State | Meaning |
| --- | --- |
| `answered` | The question was visible to the author and a value was given. |
| `notAnswered` | Visible and left empty. |
| `notApplicable` | Hidden by a visibility rule for that item, or absent from the version the item was written against. Visibility is re-evaluated per item from the stored answers, because hidden fields are persisted empty. |
| `notMigrated` | The item still holds answers in the pre-2.0 shape (`planBlueprintValues`) and could not be read. Normally 0: the database migrations that run when the API service starts convert pre-2.0 plan values (see the [upgrade guide](/docs/deployment/install/upgrade.md#database-migrations)). |

Values are counted by label: reference, tag and internal-entry ids are resolved in one batch per type; select and radio options report their option label; booleans report `Yes`/`No`; uploads and external identifiers report `Provided`; dates report their bucket; numbers report the value and feed `numberSummary`. Rich-text values are stripped of markup and HTML entities are decoded. Values of one question that differ only in case or whitespace are merged under the spelling most items used, in the distribution, the cross tab, and the CSV alike. A `Tenant` dimension reports tenant codes, with the default tenant under its configured code.

### Export CSV

`POST api/report/export/csv`

Same body as `query`. Returns `answers_<date>.csv`, UTF-8 with a byte order mark, one row per item: on an installation-wide export a `Tenant` column first, then plan id, plan, plan version, plan status, plan access, plan version status, then asset id, asset, asset status and template version (asset reports) or blueprint version (plan reports), created, finalized, and for each question a value column and a *— state* column. Plan questions follow, prefixed `Plan: `. Across lineages, version columns carry the template name (`Science Europe v2`).

A cell that starts with `=`, `+`, `-`, `@`, a tab, or a carriage return is prefixed with `'` so spreadsheets do not evaluate it as a formula; plain negative numbers are left as they are.

## Errors

| Code | Meaning |
| --- | --- |
| `190` `report-question-not-found` | A question names a fieldset, field or semantic that no version in scope carries; a fieldset question without a group id; more than the allowed number of questions or dimensions; a dimension that does not apply to the subject or scope (a `Tenant` dimension on a tenant report). |
| `191` `report-subject-cap-exceeded` | More items match than `REPORT_MAX_SUBJECTS` (tenant reports) or `REPORT_MAX_SUBJECTS_INSTALLATION` (installation-wide reports). The message ends with `(matched: <n>, limit: <limit>)`. Narrow the filters. |
| `192` `report-subject-not-supported` | Reserved. |

## Auditing

Every call is recorded with its lookup as `Report_Outline` (1500000), `Report_Query` (1500001), `Report_ExportCsv` (1500002) or `Report_SearchQuestions` (1500003). The outline entries also record `installationWide`. See [Audit events](/docs/developers/audit-events.md).

## See also

- [Answers admin guide](/docs/administering/reports.md)
- [Reports configuration](/docs/deployment/configuration/backend/index.md#reports-configuration) - `REPORT_*` environment variables
- [Swagger](/docs/developers/swagger.md) - Interactive documentation of the `Reports` tag
