---
sidebar_position: 10
description: Answers to frequently asked questions about OpenCDMP
---

# Frequently Asked Questions

---

## General

### What is the difference between a Plan and a Description?

A **Plan** is the top-level entity — it represents the overall Output Management Plan (DMP, SMP, etc.) and holds metadata such as title, contacts, funders, and access rights.

A **Description** is a detailed entry within a plan about a specific research output, such as a dataset, a piece of software, or a physical sample. A plan can contain many descriptions. The structure of each description is defined by a **Description Template** chosen at creation time.

---

### What is the difference between a Blueprint and a Description Template?

A **Blueprint** defines the structure of a *plan* — its sections, plan-level fields (contacts, grants, access rights), and which description templates are allowed in each section.

A **Description Template** defines the structure of a *description* — the questions users answer about a specific research output (fields, field types, visibility rules).

Think of the blueprint as the plan's skeleton and the description template as the form users fill in for each output.

---

### Can I use OpenCDMP without an external repository (Zenodo, Dataverse, etc.)?

Yes. Deposit services are optional. You can create, edit, export, and evaluate plans without ever depositing to an external repository. Deposit is only needed if you want a DOI assigned to your plan.

---

### Can I have multiple versions of a plan?

Yes. Once a plan is finalized, you can create a **New Version** from the plan overview. The new version starts as a draft copy of the finalized plan and is tracked separately. All versions are accessible from the plan listing. See [Versions](/versioned_docs/version-1.x/using/plans/versions.md).

---

## Plans and Descriptions

### Why can't I edit a finalized plan or description?

Finalized plans and descriptions are locked to preserve the integrity of the published record. To make changes, the plan or description must be transitioned back to a Draft-type status — if the configured workflow allows it. Contact your administrator if no such transition is available.

---

### How do I invite collaborators to my plan?

From the Plan Overview page, click **Invite** in the Plan Authors panel. Enter the collaborator's email address and assign their role (Contributor or Viewer). Section-level access can also be assigned to restrict a collaborator to specific parts of the plan. See [Invite Collaborators](/versioned_docs/version-1.x/using/plans/invite-collaborators.md).

---

### How do I add a value that is not in the reference list?

If a reference field does not contain the value you need, you can add it manually. Click the **Add manually** option in the reference picker, fill in the required fields (reference ID, label, and any type-specific fields), and save. See [Adding a Reference Manually](/versioned_docs/version-1.x/using/references.md#adding-a-reference-manually).

---

### What file formats are supported for export and import?

**Export:**
- PDF — full plan document (requires the DOCX or PDF file transformer)
- DOCX — editable Word document (requires the DOCX file transformer)
- JSON — RDA maDMP or RAiD format (requires the respective JSON transformer)
- XML — OpenCDMP native format

**Import:**
- XML — OpenCDMP native format (simplest path, no mapping required)
- JSON — RDA maDMP or RAiD format (requires template and section mapping)

Available formats depend on which [File Transformer Services](/versioned_docs/version-1.x/optional-services/file-transformers/index.md) your administrator has configured.

---

### Can I import an existing DMP from another tool?

Yes, if your DMP can be exported in RDA maDMP JSON or XML format. During JSON import, you will be asked to select a blueprint and map each description in the file to a description template and section. See [Plan Imports](/versioned_docs/version-1.x/using/plans/imports.md).

---

## Deposit and DOI

### What is a DOI and how do I get one?

A **DOI** (Digital Object Identifier) is a permanent, citable identifier assigned to a published record. In OpenCDMP, a DOI is assigned when you **deposit** a finalized plan to an external repository such as Zenodo or Dataverse. After a successful deposit, the DOI appears on the Plan Overview page. See [Deposit a Plan](/versioned_docs/version-1.x/using/plans/deposit-a-plan.md).

---

### Do I need to log in to Zenodo (or another repository) to deposit?

It depends on how the deposit service is configured by your administrator:

- If the service uses **system-level credentials** (PluginDefault), no personal login is required.
- If the service supports **OAuth2 login**, you will be redirected to the repository to authorize the connection.
- If the service uses **profile credentials**, you need to save your personal access token in [Profile Settings](/versioned_docs/version-1.x/using/profile-settings.md) before depositing.

---

## Evaluation

### Which evaluator should I use?

| Goal | Evaluator |
|---|---|
| Check compliance with the RDA maDMP JSON schema | **Evaluator RDA maDMP** |
| Assess alignment with open science and OSTrails framework | **Evaluator OSTrails** |
| Check FAIR principles (after deposit to Zenodo) | **Evaluator OpenAIRE FAIR** |

Your administrator may have configured additional custom evaluators. See [Evaluators](/versioned_docs/version-1.x/using/plans/evaluators.md).

---

### The OpenAIRE FAIR evaluator requires a deposit — why?

The FAIR evaluator retrieves the published record from the repository using the plan's DOI to check Findability and Accessibility. Without a DOI, there is no publicly accessible record to assess. Deposit the plan first, then run the FAIR evaluation.

---

## Configuration (Administrators)

### What are semantics and do I need to configure them?

Semantics are optional string tags assigned to blueprint or description template fields to declare what concept each field represents. They are used by:

- **File transformers** — to map field values to the correct positions in exported formats (RDA maDMP, RAiD, Zenodo, etc.)
- **Prefilling sources** — to identify which fields to populate with fetched data
- **Evaluators** — to locate specific fields without relying on template IDs

If you use any of the built-in export formats or prefilling, you should assign semantics using the suggested values. If you build custom plugins, you can define your own semantic strings. See [Semantics](/versioned_docs/version-1.x/administering/content-management/blueprints/semantics.md).

---

### What is the difference between a plan status and the internal status?

A **status** is a named state displayed to users (e.g., "Under Review", "Approved"). Administrators create and name these freely.

The **internal status** is a fixed platform concept — either **Draft** or **Finalized** (for plans; descriptions also have **Canceled**) — assigned to each status. It controls whether editing is allowed: Draft statuses allow editing, Finalized statuses lock the plan or description.

This separation lets administrators define meaningful workflow names while the platform enforces the correct editing behaviour. See [Plan Statuses](/versioned_docs/version-1.x/administering/system-configuration/plan-statuses.md).

---

### Can I create a custom evaluator or file transformer?

Yes. OpenCDMP's plugin architecture allows you to build custom services using the provided Maven base packages. Each plugin is an independent Spring Boot microservice. Once deployed and registered in Tenant Configuration, it becomes available to users alongside the built-in services.

- [How to create a File Transformer](/versioned_docs/version-1.x/developers/plugins/file-transformers.md)
- [How to create a Deposit Service](/versioned_docs/version-1.x/developers/plugins/deposit.md)
- [How to create an Evaluator](/versioned_docs/version-1.x/developers/plugins/evaluator.md)
