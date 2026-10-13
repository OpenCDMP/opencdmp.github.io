---
sidebar_position: 4
title: Changelog
description: Release history and changes for all OpenCDMP services
---

# Changelog

All notable changes to OpenCDMP and its services are documented here. Releases are grouped by platform version.

For upgrade instructions, see the [Upgrade guide](/docs/deployment/install/upgrade.md).

:::note
The Notification Service and Annotation Service are closed-source components distributed under a free license. Their changelogs are not included here.
:::

---

## v2.0.0 — 2026-10-13

### Service Versions

| Service | Version | Released |
|---|---|---|
| API Service | 2.0.0 | 2026-10-13 |
| Webapp | 2.0.0 | 2026-10-13 |
| File Transformer — Docx | 2.0.0 | 2026-10-13 |
| File Transformer — RDA maDMP | 2.0.0 | 2026-10-13 |
| File Transformer — RAiD | 2.0.0 | 2026-10-13 |
| Deposit Service — Zenodo | 2.0.0 | 2026-10-13 |
| Deposit Service — DSpace | 2.0.0 | 2026-10-13 |
| Deposit Service — CKAN | 2.0.0 | 2026-10-13 |
| Deposit Service — Dataverse | 2.0.0 | 2026-10-13 |
| Deposit Service — Fedora | 2.0.0 | 2026-10-13 |
| Evaluator — RDA maDMP | 2.0.0 | 2026-10-13 |
| Evaluator — OSTrails DMP Evaluation Service | 2.0.0 | 2026-10-13 |
| Evaluator — OpenAIRE FAIR | 2.0.0 | 2026-10-13 |
| RDA maDMP API | 2.0.0 | 2026-10-13 |
| Notification Service | 0.0.23 | — |
| Annotation Service | 0.0.25 | — |

### Highlights

- **Redesigned interface**: new plan and asset editors with a table of contents and one toolbar, new overviews, listings, dashboard and navigation. Short guided tours introduce the redesigned pages.
- **Assets and Organisations**: the interface calls descriptions **Assets** and tenants **Organisations**, and the roles have new labels. Routes under `/descriptions` redirect to `/assets`.
- **One editor for blueprints and asset templates**, with **Details**, **Structure** and **Review** tabs. See [The structure editor](/docs/administering/content-management/structure-editor.md).
- **Publishing with a review step**: users choose the account to publish under and check the metadata before it reaches the repository. See [Deposit a plan](/docs/using/plans/deposit-a-plan.md).
- **Webhooks**, **Research Insights** and **Data Transfer** for integrations, answer statistics and moving content between organisations and installations.
- **Automatic database migrations**: the API service upgrades its database at startup.

### Before you upgrade

Follow [Upgrading from 1.2 or 1.3 to 2.0](/docs/deployment/install/upgrade.md#upgrading-from-12-or-13-to-20). The changes that need action:

- The API service migrates the database at startup from 1.2 onwards, so its database user must be allowed to create and alter tables. Installations older than 1.2 first apply the scripts of the [1.3.0 release](https://github.com/OpenCDMP/OpenCDMP/tree/1.3.0/db) up to `01.00.010`; the `db/` folder is no longer in the repository.
- The legacy public API (`/api/public/dmps/**`, `/api/public/datasets/**`), `public-api.yml` with the `PUBLIC_API_*` variables, and `dashboard.yml` are removed.
- `SUPPORTIVE_MATERIAL_LANGUAGE_PATH` is no longer used. Open and save each customised language once, so that it keeps only its own texts. Add the new languages on the **Languages** page if you want them.
- A customised `permissions.yml` needs the new permissions; see [For integrators](#for-integrators).
- The API service checks for updates once a day and shares anonymous usage data. Turn the sharing off on the **Maintenance** page, or the whole check with `UPDATE_CHECK_ENABLED=false`. See [Maintenance](/docs/administering/maintenance.md#installation).
- Rebuild the plan and asset indexes from the **Maintenance** page after the upgrade.
- DOCX templates with `'{OPENCDMP.…}'` placeholders are no longer rendered. Recreate them from the built-in template.
- Evaluator plugins return a list of results; see [Plugin contract changes](#plugin-contract-changes).
- Upgrade the annotation service and every plugin to the versions above.

### API Service & Webapp

#### New features

- **Plan editor**: one toolbar with **Download**, **Evaluate** and **Publish**, a **Save** that keeps the editor open, and an **Add a new asset** wizard that fills an asset in by hand, from a published resource or from another asset. See [Fill in a plan](/docs/using/plans/fill-in-a-plan.md).
- **Plan creation**: choose a blueprint from a searchable library grouped by blueprint type, in the order set on the **Types** page, with a preview. Plans are imported from the same screen.
- **Plan version comparison**: compare any two versions of a plan field by field from the plan overview. See [Versions](/docs/using/plans/versions.md).
- **Asset template updates**: when a newer version of an asset template is available, users see the changes and choose which to apply.
- **Admin menu and Settings hub**: the admin menu is regrouped, and **Organisation > Settings** gathers everything an organisation can adjust. Settings an organisation takes from the Default organisation are shown as such. See [Organisation settings](/docs/administering/tenant-management/tenant-configuration.md).
- **Plan & asset workflows**: statuses, icons and the allowed changes between statuses are edited on one page, and the API refuses changes the workflow does not allow. See [Plan & asset workflows](/docs/administering/system-configuration/workflows.md).
- **Plan creation consent**: a blueprint can ask users to accept a statement before a plan is created, copied or versioned.
- **Terms and Conditions**: organisations can require users to accept versioned terms.
- **Webhooks**: organisations can send plan and asset events to external systems, with signed requests, retries and a delivery log. See [Webhooks](/docs/administering/webhooks.md).
- **Research Insights**: count how a question was answered across an organisation or the installation, with breakdowns and CSV export. See [Research Insights](/docs/administering/reports.md).
- **Data Transfer**: export an organisation's content, import it into another installation, copy content between organisations, and purge an organisation's data. See [Data Transfer](/docs/administering/tenant-management/tenant-transfer.md).
- **Repository settings per organisation**: each organisation chooses the accounts users may publish under, its credentials, record defaults, the files to deposit, and the review sections and values users may change. See [Deposit services](/docs/optional-services/deposit-services/index.md#organisation-settings).
- **Evaluation**: evaluators can return one result per asset, users can pick an evaluator's tests as well as its benchmarks, assets can be evaluated from their overview, and an asset that could not be assessed is shown as **Not evaluated**.
- **Export options**: an options dialog before each export, and exports of a chosen subset of sections and assets, when the file transformer supports them.
- **Reference type and prefilling source editors**: redesigned, with a live test of each source and click-to-map paths, and export and import of definitions as XML. Sources can return XML. See [Reference types](/docs/administering/system-configuration/reference-types.md).
- **Manual references** keep their own identifier and are never merged with other references. See [References](/docs/using/references.md).
- **Semantic objects**: sections and questions can name the object they describe, and answer options can stand for key values, so exports build whole objects. The editors show which values each plugin needs. See [Semantics](/docs/administering/content-management/templates/semantics.md).
- **Languages** store only the texts an organisation changes, with a text editor for search, import and export. The interface is also available in Czech, Dutch, Finnish, French, Italian and Romanian. See [Languages](/docs/administering/system-configuration/languages.md).
- **Comments** can be edited and deleted by their authors, and a side panel lists all comments of a plan. See [Comments](/docs/using/comments.md).
- **Profile page** with tabs for language and region, notifications and repository accounts. See [Profile settings](/docs/using/profile-settings.md).
- **Fields**: a Number question type, email validation for text questions, preset fields (such as an asset's title or a plan's language) inside the form, a transposed table view for repeated questions, icons for blueprints and asset templates, and a new rich text editor.
- **Maintenance page**: tasks run on the server one run at a time, with progress, a **Full refresh** preset and the database migration history. An **Installation** card shows the latest release and project notices. See [Maintenance](/docs/administering/maintenance.md).

<!-- kpi disabled  -->
<!-- - **Usage dashboard**: **Usage** (`/usage`, in the **Analytics** group) replaces the **Statistics** page, with key-figure cards, tabbed charts and an organisation comparison in the installation view. The API publishes the indicator and dashboard definitions to the optional KPI service at startup (`KPI_VIEWER_BOOTSTRAP_*`). See [Usage](/docs/administering/statistics.md) and the [KPI service](/docs/optional-services/kpi.md). -->

#### Improvements

- The plan role *Description Contributor* is now **Editor**. In the invitation dialog, *Internal* and *External* are now **Existing collaborator** and **New collaborator**.
- Public Plans, Public Assets and the anonymous Dashboard include public records of every organisation in the installation.
- My Plans can be filtered by blueprint and blueprint type, and shown in a compact or full view.
- Administrator listings share one layout with scope tabs, search, filter chips and a column picker. See [Admin listings](/docs/administering/admin-listings.md).
- Listing searches support exact phrases in double quotes and the `*` and `?` wildcards.
- **Users**: admins cannot remove their own admin role, an organisation keeps at least one Organisation Admin, and only a System Administrator can give or take away that role. Installation Managers can change organisation roles and invite users.
- New notifications when a plan role is added, changed or removed, and when plan access is removed.
- The Dashboard overview shows the reference types chosen in **Content defaults > References shown in lists**.
- The upload limit is 100 MB and configurable (`MULTIPART_MAX_FILE_SIZE`, `MULTIPART_MAX_REQUEST_SIZE`).
- Blueprint sections that enable prefilling without listing sources offer every active source of the organisation.
- The Docker example starts with one `docker compose up -d`, and the API service builds the database. See [Installation](/docs/deployment/install/index.md).
- Accessibility: contrast, labels, focus and keyboard access across the editors and the main pages.
- The webapp runs on Angular 22 and builds with Node 24.

#### Fixes

- Save and Delete buttons could be pressed again while their request was running (#91).
- Filtering assets by template did not work when the search ran through Elasticsearch (#347).
- Public Assets also listed draft assets and assets of plans that were not finalized.
- Sorting My Plans by **Published at** sorted by last modification, and the Dashboard overview failed on installations without the Grant or Organisation reference types.
- **Delete** was offered on published plans.
- Evaluating an asset ended in an error instead of notifying the members of its plan.
- Quotas on blueprint types and on plan and asset evaluations had no effect.
- Downloads of plans and assets whose titles contained quotes, `;` or non-Latin characters could get a broken file name.
- The **Finalise this item?** dialog showed its warnings only when an asset was already finalized, and undoing the finalization of a plan that was not finalized was not refused.
- A too-many-answers error showed a text key instead of **Please provide at most *N* answers**, and error messages of file uploads were not shown.
- In list mode, links from the admin listings led to a page that did not exist and some rows had no title. The Notifications, Annotation Statuses and Reference listings raised console errors.
- The **View all** link of the dashboard's top blueprints lost the organisation.
- **Create Plan Blueprint** followed the wrong permission.
- Saving an asset without `properties` through the API failed with a server error instead of a validation error.
- Importing an RDA file refused several assets on the same template of a section with fixed templates, added a template to its section more than once, and answered a template mismatch with a server error instead of error 178.
- A plugin address ending in `/` could not be reached.
- The touch event maintenance tasks resent the Default organisation's plans and assets with every organisation.
- When an organisation was created, Installation Managers were added to its Organisation Admin group in Keycloak. In the shipped realm, Installation Managers were also System Administrators, Members of any organisation also joined the Default organisation, and two groups of the Default organisation gave no role.
- In the Docker example, the evaluator address ended in `/`, help pages showed the built-in texts instead of the mounted `material` folder, and rolled log files were written outside `LOGGING_PATH`.

#### Removals

- The legacy public API and its configuration, and `dashboard.yml`.
- The *Authors/Contributors* blueprint field. Collaborators are managed from the **Collaborators** panel, and the migration drops the field from existing blueprints.
- The data migration actions of the **Maintenance** page, replaced by the database migrations.
- The `db/` folder of hand-applied scripts.

#### For integrators

- **API**: new endpoints for plan version comparison (`GET /api/plan/{id}/version-diff/{otherId}`), source tests of reference types and prefilling sources, webhooks and reports. Workflow violations return error 210, and plan imports with missing internal references errors 197 and 198. See [API usage](/docs/developers/api-usage.md).
- **Permissions**: new permissions for webhooks (`BrowseWebhookSubscription`, `EditWebhookSubscription`, `DeleteWebhookSubscription`, `ViewWebhooksPage`), reports (`BrowseReport`, `ExportReport`, `ViewReportsPage`, `BrowseInstallationReport`, `ExportInstallationReport`), Data Transfer (`TransferTenantData`, `PurgeTenantData`, `ViewTenantTransferPage`), the library pages (`ViewPlanBlueprintLibraryPage`, `ViewDescriptionTemplateLibraryPage`) and user settings (`BrowseUserSettings`, `EditUserSettings`). Installation Managers gain `EditTenantUserRole` and `InviteTenantUser`.
- **Database**: new tables `DepositMetadata`, `WebhookSubscription`, `WebhookDelivery`, `MaintenanceRun`, `MaintenanceTaskRun`, `Installation` and `UserTermsAcceptance`, and the KPI service tables. New columns: `additional_info` on `Plan` and `Description`, `ordinal` on `PlanBlueprintType`, and `external_id`, `external_id_type` and `applied_data` on `PlanUpdateRequest`. `DBVersion` stays at `01.01.009`; Flyway records migrations in `DBMigrationHistory`.
- **Configuration**: new `webhook.yml` and `report.yml`, and the `WEBHOOKS_*`, `REPORT_*`, `UPDATE_CHECK_*`, `INTEGRATION_EVENT_ENABLED`, `ANNOTATION_SERVICE_URL`, `MULTIPART_MAX_*`, `KPI_VIEWER_BOOTSTRAP_*` and `RDA_MADMP_QUEUE_APP_ID` variables. Webhooks are on by default. See the [backend configuration reference](/docs/deployment/configuration/backend/index.md).
- **Audit events**: `Plan_GetPublicXml` (5026), `FileTransformer_ValidateTemplate` (20002) and the `Evaluation_*` events (1100000–1100003) have ids of their own. See [Audit events](/docs/developers/audit-events.md).

#### Plugin contract changes

- **Evaluators (evaluator-base)**: `rankPlan` and `rankDescription` return a list of `RankResultModel`. A result can carry a `target`, the asset it is about, and `SuccessStatus` gains `NotEvaluated`. Plugins that return one result wrap it in a one-element list. `EvaluatorConfiguration` gains `availableTests`, and the evaluation models carry the selected `testIds`. See the [evaluator plugin guide](/docs/developers/plugins/evaluator.md).
- **Deposit services (repository-deposit-base)**: the metadata review contract, `uploadedFiles`, `oauthScope`, `authMethods` in place of `depositType`, and the `DepositPluginSettings` helper for organisation settings. See the [deposit plugin guide](/docs/developers/plugins/deposit.md).
- **File transformers (file-transformer-base)**: per-export options, and an optional `validate-template` endpoint called when an export template is uploaded. See the [file transformer plugin guide](/docs/developers/plugins/file-transformers.md).
- **Common models**: Boolean, Select, Color and Number configuration fields; the `Email` field validation; semantic objects on sections, questions and answer options; and the semantics manifest that every plugin type can publish. See [Common models](/docs/developers/plugins/common-models.md).

### File Transformer — Docx

- Templates use `{{…}}` tags, and the built-in templates are redesigned. Layout, cover, references and wording are set in export settings. See [Managing templates](/docs/optional-services/file-transformers/docx-templates.md).
- Templates with `'{OPENCDMP.…}'` placeholders are no longer rendered: uploading one reports an error, and exports fall back to the built-in template.
- Uploaded templates are validated before they are saved.
- Plans that are not finalized carry a draft watermark with their status, and PDF exports can be PDF/A and PDF/UA (`PDF_CONVERTER_PDFA_FORMAT`, `PDF_CONVERTER_PDFUA`).

### File Transformer — RDA maDMP

- Semantic objects and answer keys build whole RDA objects, such as one distribution with its host and licences. See the [RDA JSON semantics reference](/docs/optional-services/file-transformers/rda-json-semantics.md).
- The grants and funders reference types and the repository of the plan identifier are set per organisation in **Settings > Plugins**.
- All ten examples of the RDA DMP Common Standard import.
- Identifier types are written in lowercase, as the schema requires, and inferred when missing.
- Empty distributions and creators are no longer written, and a reference picked in several fields is exported once.

### File Transformer — RAiD

- Answers in plan blueprint fields are exported as well as asset answers.
- The transformer publishes the keys it reads, so the editors show what it can export.
- Empty RAiD blocks are no longer written, and field names in the export follow the RAiD schema.

### Deposit Services

- All five services describe their record for the **Review** step of the **Publish to** dialog. Zenodo's review covers its whole deposit form, with searchable vocabularies.
- **Dataverse**: the review follows the metadata block of the target installation. Grants are read through the new **Grants** reference type setting (`DEPOSIT_DATAVERSE_GRANTS_CODE`), and related publications, grants and contacts are no longer duplicated.
- **CKAN**: custom fields and the dataset type can be configured for instances with their own dataset schema, and an extra answered in several places is sent once, with its answers joined by commas.

### Evaluator — RDA maDMP

- The evaluator can read the plan's RDA JSON from a folder it shares with the API service (`RDA_MADMP_USE_SHARED_STORAGE`, `STORAGE_PATH`).

### Evaluator — OSTrails DMP Evaluation Service

- The evaluator offers the tests of the OSTrails service as well as its benchmarks, and returns one result per test.
- A failed test no longer counts as a pass.

### Evaluator — OpenAIRE FAIR

- First public release. It assesses each asset by its own persistent identifier against the FAIR principles and returns one result per asset; assets without one are **Not evaluated**. See [Evaluator services](/docs/optional-services/evaluator-services.md).

### RDA maDMP API

- First public release: a service that publishes the plans of an installation through the [Common maDMP API](https://github.com/RDA-DMP-Common/common-madmp-api). OpenCDMP sends its plans over RabbitMQ when integration events are on, and maDMPs changed through the API come back as plan update requests. Set `OPENCDMP_QUEUE_APP_ID` on the service and `RDA_MADMP_QUEUE_APP_ID` on the API service to each other's `QUEUE_APP_ID`. See the [repository](https://github.com/OpenCDMP/rda-madmp-api).

---

## v1.3 — 2026-03-24

### Service Versions

| Service | Version |
|---|---|
| API Service | 1.3.0 |
| Webapp | 1.3.0 |
| File Transformer — Docx | 1.3.0 |
| File Transformer — RDA maDMP | 1.3.0 |
| File Transformer — RAiD | 1.3.0 |
| Deposit Service — Zenodo | 1.3.0 |
| Deposit Service — DSpace | 1.3.0 |
| Deposit Service — CKAN | 1.3.0 |
| Deposit Service — Dataverse | 1.3.0 |
| Deposit Service — Fedora | 1.3.0 |
| Evaluator — RDA maDMP | 1.3.0 |
| Evaluator — OSTrails DMP Evaluation Service | 1.3.0 |

### API Service & Webapp

#### New Features
- **Plan Blueprint Types**: Administrators can categorize blueprints with types, enabling filtering and better organization across the blueprint library
- **Real-time collaboration**: Active users shown live in the plan editor and plan overview; navigate to another user's position in the editor
- **Plan update requests**: Users can request changes to a finalized plan; the plan owner receives a notification and can accept or reject the request
- **New plan role notifications**: Email and in-app notifications sent when a user's plan role is added, changed, or removed
- **OSTrails evaluator**: Full configuration and UI support for the OSTrails DMP evaluation service
- **OpenAIRE FAIR evaluator**: Full configuration and UI support for the OpenAIRE FAIR assessment service
- **Evaluator benchmarks**: Evaluators can return benchmark comparisons alongside rank results; benchmark IDs are configurable per evaluator
- **Tenant label translation**: Tenant labels are now translatable per language
- **Enriched semantics**: HealLink and RDA DMP Common Standard v1.2 semantic field definitions added
- **Reference type enhancements**: Semantics support in the reference type editor; required field option; popup to view field details; fields included in export and import
- **Public page improvements**: Plan authors shown on public pages; description preview added to public plan pages
- **Swagger UI**: Extended API documentation with public plan and description endpoints; configurable via `SWAGGER_ENABLED`, `SWAGGER_AUTH_REDIRECT_URL`, and `SWAGGER_SERVER_URL`
- **Supporting zip file**: Plans can now include a supporting zip archive of attachments
- **Cookie consent and analytics**: Matomo analytics integration with per-user consent controls

#### Improvements
- **Spring Boot 4.0.0** and **Angular 21** upgrades; Material v20 UI and Keycloak v19 compatibility
- Plan listing: DOIs column; references displayed using reference type configuration
- Plan overview: status colour, reference labels, language name, and date format improvements; notification when a newer version is available
- Blueprint editor: finalize button hidden when blueprint is in a new-version draft state

#### Fixes
- DOI messages and deposit dropdown display
- Organization display in user profile

### File Transformer — Docx

- Reference type field information now rendered in output documents
- Font size in reference rows configurable via the DOCX template rather than hardcoded

### File Transformer — RDA maDMP

- **RDA DMP Common Standard v1.2** support
- Full import coverage for project objects, contributors, contacts, and funding/grant identifiers

### File Transformer — RAiD
- JSON export following the RAiD specification (v1.6–1.6.3)
- Identifier, access, and date semantics supported for description template export

### Deposit Service — Zenodo

- Reference type semantics for researchers and licenses mapped to Zenodo metadata
- New version deposit: previous DOI stored as parent record

### Deposit Service — DSpace
- DSpace 8.x support with username/password authentication

### Deposit Service — CKAN
- CKAN 2.11.4 support with access token authentication

### Deposit Service — Dataverse
- Dataverse 6.9 support with access token authentication

### Deposit Service — Fedora
- Fedora 6.x support with username/password authentication

### Evaluator — RDA maDMP

- **RDA DMP Common Standard v1.2** schema validation
- Benchmark configuration and result fields

### Evaluator — OSTrails
- Evaluates whether a plan or description aligns with the OSTrails metadata and policy framework
- Assesses completeness, openness, and reproducibility against OSTrails guidelines

### Evaluator — OpenAIRE FAIR
- Assesses whether a plan meets FAIR principles (Findable, Accessible, Interoperable, Reusable)
- Provides structured feedback for improving FAIR compliance

---

## v1.2 — 2025

### Service Versions

| Service | Version | Released |
|---|---|---|
| API Service | 1.2.2 | 2026-01-13 |
| Webapp | 1.2.2 | 2026-01-13 |
| File Transformer — Docx | 1.2.1 | 2026-01-05 |
| File Transformer — RDA maDMP | 1.2.1 | 2026-01-07 |
| Deposit Service — Zenodo | 1.2.2 | 2026-01-05 |
| Evaluator — RDA maDMP | 1.2.0 | 2025-07-11 |

### Patch Releases

| Version | Released | Changes |
|---|---|---|
| API 1.2.1 | 2025-10-02 | Minor fixes and improvements |
| API 1.2.2 | 2026-01-13 | Deployment health checks, monitoring endpoint, external fetcher SSL option, bug fixes |

### API Service & Webapp

#### New Features
- **Custom DOCX templates**: Upload a `.docx` template to a blueprint or description template to override the default export layout for plans and descriptions
- **Plan deposit overhaul**: New deposit dialog with support for multiple authentication methods — system token, OAuth2, and user profile API key
- **Plugin user API key**: Users can configure per-plugin credentials in their profile settings
- **Public plan pages**: Public-facing plan and description overview pages for anonymous users, including access type visibility controls
- **Plan author ordering**: Authors can be given an ordinal position within a plan
- **Reference type semantic fields**: Semantic identifiers added to reference type fields; included in XML export and import
- **Blueprint description template restrictions**: Controls whether plan users may edit attached description templates
- **New plan user roles**: Data Privacy Officer and additional collaboration roles added
- **Description field set table view**: Multiplicity inputs can be displayed in a table layout
- **Annotation indication in table of contents**: Annotation counts shown at section and description level

#### Improvements
- Plan listing: DOIs column added; references displayed using reference type configuration
- Plan overview: status colour, reference labels, language name, and date format improvements; notification when a newer plan version is available
- Elasticsearch TLS certificate configuration support

#### Fixes
- Description field value saving for plan and description reference field types

### File Transformer — Docx

- **Custom DOCX templates**: Dynamic replacement of template codes (`{OPENCDMP.PLAN.*}`, `{OPENCDMP.DESCRIPTION.*}`, `{OPENCDMP.PLAN-REFERENCE.*}`, `{OPENCDMP.DESCRIPTION-REFERENCE.*}`)
- Reference type code substitution in templates (e.g., `{OPENCDMP.PLAN-REFERENCE.GRANTS}`)
- Description section code, header and footer options
- Upload field (file attachment) support in plan and description export

### File Transformer — RDA maDMP

- Full import support for RDA DMP project objects, contributor semantics, and funding/grant identifiers
- DMP contacts semantics applied on import

### Deposit Service — Zenodo

- **Communities support**: Deposit to a specific Zenodo community
- **Software and conference semantics**: Additional deposit metadata mapped from semantic fields
- **Custom fields and additional titles**: Extended metadata support for Zenodo records
- Funding and grant information populated from reference semantics
- Access rights, custom license, and relator type support
- New version deposit: previous DOI stored as parent record

### Evaluator — RDA maDMP

- **Benchmark support**: Evaluator now returns benchmark data alongside rank results; benchmark IDs configurable

---

## v1.1 — 2025-03

### Service Versions

| Service | Version | Released |
|---|---|---|
| API Service | 1.1.0 | 2025-03-26 |
| Webapp | 1.1.0 | 2025-03-26 |
| File Transformer — Docx | 1.1.0 | 2025-03-06 |
| File Transformer — RDA maDMP | 1.1.0 | 2025-03-06 |
| Deposit Service — Zenodo | 1.1.0 | 2025-03-06 |
| Evaluator base library | 1.1.0 | 2025-03-05 |

### API Service & Webapp

- **Plan and Description statuses**: Custom status workflows with colour indicators applied to plan and description overview pages
- **Material 3 design system**: Full UI overhaul — cohesive M3 theming, consistent font sizing across the application, CSS cleanup
- **Accessibility improvements**: Required field hints, ARIA fixes, toggle switch and guided tour improvements
- **Elasticsearch TLS**: Certificate-based connection support
- Inactive plan user display in plan editor improved
- Plan and description action toolbar reorganised

### File Transformer — Docx

- **Dynamic template code replacement**: Plan and description codes (`{OPENCDMP.PLAN.*}`, `{OPENCDMP.DESCRIPTION.*}`) replaced at export time; footer reference type codes supported
- Description section code, header options
- Language lookup from configuration file

### File Transformer — RDA maDMP

- RDA project date format fix

### Deposit Service — Zenodo

- Minor maintenance updates

---

## v1.0 — 2024-10

### Service Versions

| Service | Version | Released |
|---|---|---|
| API Service | 1.0.0 | 2024-10-15 |
| Webapp | 1.0.0 | 2024-10-15 |
| File Transformer — Docx | 1.0.0 | 2024-10-11 |
| File Transformer — RDA maDMP | 1.0.0 | 2024-10-11 |
| Deposit Service — Zenodo | 1.0.0 | 2024-10-30 |

### Patch Releases

| Version | Released | Changes |
|---|---|---|
| API 1.0.1 | 2024-10-29 | Unlink account fixes, email expiration configuration, minor UI fixes |
| API 1.0.2 | 2024-11-21 | Reference label/quote fixes, content disposition fix, user credential change event, DB schema update |

### API Service & Webapp

- Initial public release
- Plan and description creation, editing, versioning, and export
- Blueprint-based plan structure with sections and fields
- Description Template system
- Keycloak OAuth2/OIDC authentication
- Role-based access control (Viewer, Contributor, Reviewer) at plan and section level
- Annotation and review system with comment statuses
- Email and in-app notifications

### File Transformer — Docx

- Initial release: Word and PDF export for plans and descriptions

### File Transformer — RDA maDMP

- Initial release: JSON export following the RDA DMP Common Standard

### Deposit Service — Zenodo

- Initial release: plan deposit to Zenodo with DOI assignment
