---
sidebar_position: 9
description: Definitions of key terms used throughout the OpenCDMP documentation
---

# Glossary

Definitions of key terms used throughout the OpenCDMP platform and documentation.

---

## Annotation

A comment on a question of a plan or asset. Annotations support threaded replies, @-mentions, statuses configured by administrators (for example Resolved), and a visibility setting (visible or hidden). See [Comments and review](/docs/using/comments.md).

---

## Research Insights {#report}

The admin page, under **Analytics**, that counts how a question of a blueprint or asset template was answered across the plans and assets of an organisation: how many items answered it, what they answered, and how the answers split by status, blueprint, period, or another answer. The answers behind the numbers can be exported to CSV. See [Answers](/docs/administering/reports.md).

---

## Asset

A detailed entry within a Plan about a specific research output, for example a dataset, a piece of software, or a physical sample. Each asset follows the structure defined by its **Asset Template**. A plan can contain many assets. See [Assets](/docs/using/assets/index.md).

In the API and plugin contracts: `Description`.

---

## Asset Template

Defines the questions of an asset: its sections (which can be nested), questions, and inputs. Administrators create and finalize asset templates; users pick a template when adding an asset to a plan. See [Asset Templates](/docs/using/blueprints.md#asset-templates).

In the API and plugin contracts: `DescriptionTemplate`.

---

## Blueprint

A template that defines how a Plan is organized: its sections, the plan-level fields (title, contacts, funding, and others), and which asset templates can be used in each section. Administrators create and finalize blueprints; users pick a blueprint when creating a plan. See [Blueprints](/docs/using/blueprints.md).

---

## Data Transfer {#tenant-transfer}

An administrator tool for moving the content of an organisation between installations as a bundle (export and additive import), copying content from one organisation to another within the same installation, or purging the data owned by an organisation. See [Data Transfer](/docs/administering/tenant-management/tenant-transfer.md).

---

## Deposit

Publishing a finalized plan to an external repository (such as Zenodo or Dataverse), where it gets a record and a **DOI**. In the application this action is called **Publish** (see [Publish](#publish)). Depositing is handled by a **Deposit Service** plugin. See [Publish a plan](/docs/using/plans/deposit-a-plan.md).

---

## Deposit Service

A plugin service that connects OpenCDMP to one kind of external repository, creates the plan's record there, and returns the identifier the repository assigns. See [Deposit Services](/docs/optional-services/deposit-services/index.md).

---

## DOI

A **Digital Object Identifier** is a permanent, globally unique identifier assigned to a plan when it is deposited to a repository. A DOI provides a stable, citable link to the published record. Example: `10.5281/zenodo.1234567`.

---

## Evaluator

A plugin service that assesses a plan (and, for some evaluators, its assets) against a standard or set of criteria, and returns a rank with detailed feedback. Examples: RDA maDMP schema compliance, OSTrails benchmarks, and OpenAIRE FAIR assessment. See [Evaluators](/docs/using/plans/evaluators.md).

---

## File Transformer

A plugin service that converts plans and assets to or from a file format (DOCX, PDF, RDA maDMP JSON, RAiD JSON). Used for both download and import. See [File Transformers](/docs/optional-services/file-transformers/index.md).

---

## Finalized

The internal status of a plan or asset that is locked and can no longer be edited. A plan is usually finalized before it is published. The name of the status shown in the interface is set by administrators. See [What a status counts as](/docs/administering/system-configuration/workflows.md#internal-statuses).

---

## Guided Tour

A short, page-specific walkthrough shown to a user the first time they open certain pages (for example My Plans, the plan editor, or an asset overview). A tour can be replayed from the **Support** menu, and organisation administrators can switch tours off under **Settings > Users & onboarding** (see [Organisation settings](/docs/administering/tenant-management/tenant-configuration.md)).

---

## Organisation {#tenant}

An isolated unit within an OpenCDMP installation, for example an institution. Each organisation has its own users, plans, blueprints, templates, and settings. Users can belong to multiple organisations and switch between them with the organisation button in the top bar. See [Organisations](/docs/administering/tenant-management/tenants.md).

In the API and configuration: *tenant*. The organisation's code appears in addresses as `/t/:tenant_code`, and API requests name the organisation in the `x-tenant` header.

---

## Plan

The primary entity in OpenCDMP: a structured Output Management Plan (OMP) such as a Data Management Plan (DMP) or Software Management Plan (SMP). A plan is created from a **Blueprint**, can contain multiple **Assets**, and moves through a configurable lifecycle of statuses. See [Plans](/docs/using/plans/index.md).

---

## Prefilling Source

An external source that fills in an asset's fields. When a user searches the source (for example a data repository) and picks a result, the fields with matching **semantics** are filled in automatically. See [Prefilling Sources](/docs/administering/system-configuration/prefilling-sources.md).

---

## Public plan

A finalized plan whose **Access** is set to **Public**. A public plan is listed on the **Public Plans** page (under **Explore** in the side navigation menu) and opens in a read-only public overview. Anyone can see it, including visitors who are not signed in and members of other organisations of the installation. A plan with restricted access, or one that is not finalized, is visible only to its collaborators. See [Who can see your plan](/docs/using/plans/visibility.md).

Making a plan public does not deposit it anywhere, and publishing a plan does not make it public: see [Publish](#publish).

---

## Publish

The action, on the Plan Overview page and in the plan editor, that deposits a finalized plan to an external repository such as Zenodo; the repository creates a record and assigns it a **DOI**. Publishing does not change who can see the plan in OpenCDMP: that is set by its **Access** (see [Public plan](#public-plan)). See [Publish a plan](/docs/using/plans/deposit-a-plan.md).

---

## Reference

A value you select in a plan or asset field from a predefined list or an external source. Examples: a grant from OpenAIRE, an organization from ROR, a researcher from ORCID, or a license from a static list. See [References](/docs/using/references.md).

---

## Reference Type

An admin-configured source of references: a static (internal) list or a live external API. When a blueprint or asset template includes a Reference Type field, users search and select from that source when filling in their plan or asset. See [Reference Types](/docs/administering/system-configuration/reference-types.md).

---

## Role

A set of permissions held by a user. Installation-wide roles are **System Administrator**, **Installation Manager**, and **Signed-in User**. Roles within an organisation are **Organisation Admin**, **Template Manager**, **Content & Workflow Manager**, and **Member**. Plan roles, such as **Owner** or **Editor**, are a separate set given to collaborators on a plan. See [Roles](/docs/administering/how-it-fits-together.md#roles).

Role codes, used in Keycloak and the permission configuration: `Admin`, `InstallationAdmin`, and `User` for the installation-wide roles, and `TenantAdmin`, `TenantPlanManager`, `TenantConfigManager`, and `TenantUser` for the organisation roles, in the order above.

---

## Semantic

A text tag on a question or input of a blueprint or asset template that declares what its answer means. Semantics are free-form, and any value is valid. Plugins (file transformers, deposit services, evaluators) and prefilling sources use them to find the right answers, whatever the structure of the template. See [Semantics](/docs/administering/content-management/templates/semantics.md) for how to assign them. Each plugin's semantics reference, for example [RDA maDMP JSON](/docs/optional-services/file-transformers/rda-json-semantics.md) or [Zenodo](/docs/optional-services/deposit-services/zenodo-semantics.md), explains how that plugin reads them.

Semantics can also sit on a question or a section, where they name the **object** the answers describe (for example a distribution), and on a select or radio option, where they give the key values that choosing the option stands for.

---

## Semantics manifest

The list of semantic keys a plugin reads, published with the plugin's configuration: each key's level (**needed** or **can use**), value format, fallback, and the objects the keys make up. The blueprint and asset template editors use the manifests of the organisation's plugins to suggest keys and to show which values a structure covers. See [Semantics](/docs/administering/content-management/templates/semantics.md#what-the-editors-show-about-plugins).

---

## Status

A named state in the lifecycle of a plan or asset (for example: "Draft", "Under Review", "Finalized"). Statuses and the allowed transitions between them are configured by administrators. Each status counts as one of the platform's **internal statuses**: **Draft** (still editable), **Finalised** (locked), **Cancelled** (assets only, withdrawn), or **A step in between** (no internal status; the editing rules do not change). See [Plan & asset workflows](/docs/administering/system-configuration/workflows.md#internal-statuses).

---

<!-- kpi disabled -->
<!-- ## Usage

The admin page, under **Analytics**, that charts how many plans, assets, references, users, blueprints, and templates an organisation or the whole installation has, and how they grew over time. It requires the optional KPI service. See [Usage](/docs/administering/statistics.md) and [KPI Service](/docs/optional-services/kpi.md).

--- -->

## Webhook

An organisation-level subscription that makes OpenCDMP send a signed HTTP `POST` request to an external URL when a selected event occurs, for example when a plan is finalized or deposited. Failed deliveries are retried automatically. See [Webhooks](/docs/administering/webhooks.md).

---

## Workflow

The statuses of a plan or asset and the allowed transitions between them. Administrators configure which status new plans and assets start in and which statuses each status can move to. See [Plan & asset workflows](/docs/administering/system-configuration/workflows.md).
