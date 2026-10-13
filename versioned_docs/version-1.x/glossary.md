---
sidebar_position: 9
description: Definitions of key terms used throughout the OpenCDMP documentation
---

# Glossary

Definitions of key terms used throughout the OpenCDMP platform and documentation.

---

### Annotation

A comment or review note attached to a specific field in a plan or description. Annotations support threaded replies, @-mentions, status tracking (open, resolved), and visibility settings (public or hidden). See [Reviewing](/versioned_docs/version-1.x/using/plans/reviewing.md).

---

### Blueprint

A structural template that defines how a Plan is organized — its sections, the field types available at the plan level (title, contacts, grants, etc.), and which description templates can be used in each section. Administrators create and publish blueprints; users select a blueprint when creating a new plan. See [Blueprints](/versioned_docs/version-1.x/using/blueprints.md).

---

### Description

A detailed entry within a Plan about a specific research output — for example, a dataset, a piece of software, or a physical sample. Each description follows the structure defined by its **Description Template**. A plan can contain many descriptions. See [Descriptions](/versioned_docs/version-1.x/using/descriptions/index.md).

---

### Description Template

Defines the question structure of a description: its pages, sections, field sets, and individual fields. Administrators create and publish description templates; users select a template when adding a description to a plan. See [Description Templates](/versioned_docs/version-1.x/using/templates.md).

---

### Deposit

The act of publishing a finalized plan to an external repository (such as Zenodo or Dataverse) to make it publicly accessible and receive a **DOI**. Depositing is handled by a **Deposit Service** plugin. See [Deposit a Plan](/versioned_docs/version-1.x/using/plans/deposit-a-plan.md).

---

### Deposit Service

A plugin microservice that connects OpenCDMP to an external repository for plan deposit and DOI assignment. Each deposit service implements the repository's specific API. See [Deposit Services](/versioned_docs/version-1.x/optional-services/deposit-services/index.md).

---

### DOI

**Digital Object Identifier** — a permanent, globally unique identifier assigned to a plan when it is deposited to a repository. A DOI provides a stable, citable link to the published record. Example: `10.5281/zenodo.1234567`.

---

### Evaluator

A plugin microservice that assesses a plan (and optionally its descriptions) against a defined standard or set of criteria, returning a score and detailed feedback. Examples: RDA maDMP compliance, FAIR principles, OSTrails framework. See [Evaluators](/versioned_docs/version-1.x/using/plans/evaluators.md).

---

### File Transformer

A plugin microservice that converts plans and descriptions to or from a specific file format (DOCX, PDF, RDA maDMP JSON, RAiD JSON, XML). Used for both export and import operations. See [File Transformer Services](/versioned_docs/version-1.x/optional-services/file-transformers/index.md).

---

### Finalized

An internal status type indicating that a plan or description is locked and can no longer be edited. Finalization is a prerequisite for most downstream actions such as deposit and certain evaluations. The exact status name shown in the UI is configured by administrators.

---

### Plan

The primary entity in OpenCDMP — a structured Output Management Plan (OMP) such as a Data Management Plan (DMP) or Software Management Plan (SMP). A plan is created from a **Blueprint**, can contain multiple **Descriptions**, and moves through a configurable lifecycle of statuses. See [Plans](/versioned_docs/version-1.x/using/plans/index.md).

---

### Prefilling Source

An API configuration that allows OpenCDMP to automatically populate description fields with data retrieved from an external source. When a user searches an external service (e.g., a data repository) and selects a result, fields with matching **semantics** are filled in automatically. See [Prefilling Sources](/versioned_docs/version-1.x/administering/system-configuration/prefilling-sources.md).

---

### Reference

A selectable value in a plan or description field that comes from a predefined list or an external source, rather than free text typed by the user. Examples: a grant from OpenAIRE, an organization from ROR, a researcher from ORCID, or a license from a static list. See [References](/versioned_docs/version-1.x/using/references.md).

---

### Reference Type

An admin-configured source of references — either a static (internal) list or a live external API. When a blueprint or description template includes a Reference Type field, users search and select from that source when filling in their plan or description. See [Reference Types](/versioned_docs/version-1.x/administering/system-configuration/reference-types.md).

---

### Semantic

A string tag assigned to a field in a blueprint or description template to declare what concept that field represents. Semantics are free-form strings — any value is valid. The platform and plugins (file transformers, deposit services, evaluators, prefilling sources) use semantics to locate the right field regardless of how the template is structured. See [Semantics](/versioned_docs/version-1.x/administering/content-management/blueprints/semantics.md) for how to assign them, and each plugin's semantics reference — e.g. [RDA maDMP JSON](/versioned_docs/version-1.x/optional-services/file-transformers/rda-json-semantics.md), [Zenodo](/versioned_docs/version-1.x/optional-services/deposit-services/zenodo-semantics.md) — for how each plugin interprets them.

---

### Status

A named state in the lifecycle of a plan or description (for example: "Draft", "Under Review", "Finalized"). Statuses and the allowed transitions between them are configured by administrators. Each status has an **internal type** (Draft, Finalized, or Canceled — for descriptions) that controls whether editing is permitted. See [Plan Statuses](/versioned_docs/version-1.x/administering/system-configuration/plan-statuses.md).

---

### Tenant

An isolated organizational unit within an OpenCDMP installation. Each tenant has its own users, plans, blueprints, templates, and configuration. Users can belong to multiple tenants and switch between them from their profile. See [Tenants](/versioned_docs/version-1.x/administering/tenant-management/tenants.md).

---

### Workflow

The set of allowed transitions between statuses for a plan or description. Administrators configure which status a plan starts in and which statuses it can transition to from each state. See [Plan Workflow](/versioned_docs/version-1.x/administering/system-configuration/plan-workflow.md).
