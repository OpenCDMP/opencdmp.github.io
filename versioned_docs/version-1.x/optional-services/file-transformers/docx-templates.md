---
sidebar_position: 1
sidebar_label: DOCX Templates
description: Reference of the template placeholder codes supported by the DOCX file transformer
---

# DOCX Transformer — Template Reference

The [DOCX file transformer](https://hub.docker.com/r/opencdmp/file-transformer-docx) exports plans and descriptions to Word documents (and PDFs derived from the same DOCX). Unlike the JSON transformers, it does **not** use [semantic tags](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md). Instead, it substitutes placeholder codes embedded in a DOCX template at export time.

This page lists every placeholder code the transformer recognises.

## Create your custom template

Templates must be DOCX files; the same file is used for both DOCX and PDF export.

To apply a custom template to:

- **A specific plan** — upload a DOCX file in the [Blueprint](/versioned_docs/version-1.x/using/blueprints.md).
- **All plans** — upload a DOCX file in the plugin configuration on the [Tenant Configuration page](/versioned_docs/version-1.x/administering/tenant-management/tenant-configuration.md).
- **A specific description** — upload a DOCX file in the [Description Template](/versioned_docs/version-1.x/using/templates.md).
- **All descriptions** — upload a DOCX file in the plugin configuration on the [Tenant Configuration page](/versioned_docs/version-1.x/administering/tenant-management/tenant-configuration.md).

:::note
If a specific blueprint or description template has its own DOCX file, it overrides the template declared in the Tenant Configuration.
:::

## Placeholder codes

Include these codes as plain text in your template. The transformer replaces them with plan or description data during export. None of them is mandatory — any code not included is simply ignored.

| Code | Description |
|---|---|
| `'{OPENCDMP.PLAN.ID}'` | Id of the plan. |
| `'{OPENCDMP.PLAN.VERSION}'` | Version of the plan. |
| `'{OPENCDMP.PLAN.TITLE}'` | Title of the plan. |
| `'{OPENCDMP.PLAN.DESCRIPTION}'` | Description of the plan. |
| `'{OPENCDMP.PLAN.LANGUAGE}'` | Language of the plan. |
| `'{OPENCDMP.PLAN.ACCESS-TYPE}'` | Access Type of the plan. |
| `'{OPENCDMP.PLAN-REFERENCE.<REFERENCE-TYPE-CODE>'` | Reference of the plan by [**reference type code**](/versioned_docs/version-1.x/administering/system-configuration/reference-types.md). For example, to get the plan's reference with type grant, the correct code is `'{OPENCDMP.PLAN-REFERENCE.GRANTS}'`. |
| `'{OPENCDMP.PLAN.CONTACTS}'` | Contacts of the plan. |
| `'{OPENCDMP.PLAN.USERS}'` | Users of the plan. |
| `'{OPENCDMP.PLAN.USERS-WITH-ROLES}'` | Users of the plan with their roles. |
| `'{OPENCDMP.PLAN.STATUS}'` | Status of the plan. |
| `'{OPENCDMP.PLAN.CREATOR.NAME}'` | Creator of the plan. |
| `'{OPENCDMP.PLAN.BLUEPRINT.NAME}'` | Name of the blueprint. |
| `'{OPENCDMP.PLAN.DEPOSIT-IDENTIFIERS}'` | [**DOI**](/versioned_docs/version-1.x/using/plans/deposit-a-plan.md) of the plan. |
| `'{OPENCDMP.PLAN.FINALIZED-AT}'` | Date when the plan was finalized. |
| `'{OPENCDMP.PLAN.CREATED-AT}'` | Date when the plan was created. |
| `'{OPENCDMP.PLAN.FORM}'` | Plan's sections and their content. |
| `'{OPENCDMP.DESCRIPTION.ID}'` | Id of the description. |
| `'{OPENCDMP.DESCRIPTION.TITLE}'` | Title of the description. |
| `'{OPENCDMP.DESCRIPTION.DESCRIPTION}'` | Description of the description. |
| `'{OPENCDMP.DESCRIPTION.STATUS}'` | Status of the description. |
| `'{OPENCDMP.DESCRIPTION.SECTION}'` | Section of the plan in which the description was created. |
| `'{OPENCDMP.DESCRIPTION.TEMPLATE.NAME}'` | Name of the description template. |
| `'{OPENCDMP.DESCRIPTION-REFERENCE.<REFERENCE-TYPE-CODE>'` | Reference of the description by [**reference type code**](/versioned_docs/version-1.x/administering/system-configuration/reference-types.md). For example, to get the description's reference with type grant, the correct code is `'{OPENCDMP.DESCRIPTION-REFERENCE.GRANTS}'`. |
| `'{OPENCDMP.DESCRIPTION.CREATED-AT}'` | Date when the description was created. |
| `'{OPENCDMP.DESCRIPTION.FORM}'` | Description's sections and their content. |

:::warning
- Description codes (`'{OPENCDMP.DESCRIPTION.<CODE>}'`) are only resolved when exporting a specific description — not when exporting a plan.
- `'{OPENCDMP.PLAN.FORM}'` is only available when exporting a plan.
- `'{OPENCDMP.DESCRIPTION.FORM}'` is only available when exporting a description.
:::

## Related

- [File Transformers](index.md)
- [File Transformer Configuration](/versioned_docs/version-1.x/deployment/configuration/backend/file-transformers.md)
