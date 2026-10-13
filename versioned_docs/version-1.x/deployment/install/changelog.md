---
sidebar_position: 3
title: Changelog
description: Release history and changes for all OpenCDMP services
---

# Changelog

All notable changes to OpenCDMP and its services are documented here. Releases are grouped by platform version.

For upgrade instructions, see the [Upgrade Guide](upgrade.md).

:::note
The Notification Service and Annotation Service are closed-source components distributed under a free license. Their changelogs are not included here.
:::

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
