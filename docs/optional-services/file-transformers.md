---
sidebar_position: 3
description: Discover everything about the file transformer services
---

# File Transformers

The `File Transformer Services` are standalone services responsible to provide a way for users to download [plans](user-guide/plans/index.md) and [descriptions](user-guide/descriptions/index.md) in various file formats. So, their role is to *"transform"* these data structures to these formats.

There are currently three file transformer services implemented and integrated:

- **[Docx file transformer service](https://hub.docker.com/r/opencdmp/file-transformer-docx)**: Used for PDF files and Word documents.
- **[Rda file transformer service](https://hub.docker.com/r/opencdmp/file-transformer-rda-json)**: Used for JSON files following the [RDA specification](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard).
- **[Raid file transformer service](https://hub.docker.com/r/opencdmp/file-transformer-raid-json)**: Used for JSON files following the [RAID specification](https://metadata.raid.org/en/latest/).

:::note
You can create your own file transformer. More details [here](developers/plugins/file-transformers.md).
:::

# Create your custom template
In **[Docx file transformer service](https://hub.docker.com/r/opencdmp/file-transformer-docx)** you can also download **plans** and **descriptions** based on your own templates. Templates must be a docx file but at the same time are used also for export to pdf.

To use your custom template to:
- **a specific plan**, you must upload a docx file in [Blueprint](user-guide/blueprints.md).
- **all plans**, you must upload a docx file in Plugin Configuration in [Tenant Configuration Page](admin-guide/tenant-management/tenant-configuration.md)
- **a specific description**, you must upload a docx file in [Description Template](user-guide/templates.md).
- **all descriptions**, you must upload a docx file in Plugin Configuration in [Tenant Configuration Page](admin-guide/tenant-management/tenant-configuration.md)

:::note
If a specific blueprint or description template has a docx file, then it overrides those declared in the Tenant Configuration.
:::

In order for a template to work correctly in [Docx file transformer service](https://hub.docker.com/r/opencdmp/file-transformer-docx), all codes can be included in the file as text fields. These codes will be replaced by data during the transformation process, but they are not mandatory for the template to work.

| Code                             | Description                                                     |
| -------------------------------- | -------------------------------------------------------------------------------- |
| `'{OPENCDMP.PLAN.ID}'`      | Id of the plan.|
| `'{OPENCDMP.PLAN.VERSION}'`      | Version of the plan.|
| `'{OPENCDMP.PLAN.TITLE}'`      | Title of the plan.|
| `'{OPENCDMP.PLAN.DESCRIPTION}'`       | Description of the plan.|
| `'{OPENCDMP.PLAN.LANGUAGE}'`      | Language of the plan.|
| `'{OPENCDMP.PLAN.ACCESS-TYPE}'`      | Access Type of the plan.|
| `'{OPENCDMP.PLAN-REFERENCE.<REFERENCE-TYPE-CODE>'`      | Reference of the plan by [**reference type code**](admin-guide/system-configuration/reference-types.md). For example, if we want the plan's reference with type grant, the correct code is `'{OPENCDMP.PLAN-REFERENCE.GRANTS}'`|
| `'{OPENCDMP.PLAN.CONTACTS}'`      | Contacts of the plan.|
| `'{OPENCDMP.PLAN.USER}'`      | Users of the plan.|
| `'{OPENCDMP.PLAN.USER-WITH-ROLES}'`      | Users of the plan with the roles.|
| `'{OPENCDMP.PLAN.STATUS}'`      | Status of the plan.|
| `'{OPENCDMP.PLAN.CREATOR.NAME}'`      | Creator of the plan.|
| `'{OPENCDMP.PLAN.BLUEPRINT.NAME}'`      | Name of the blueprint.|
| `'{OPENCDMP.PLAN.DEPOSIT-IDENTIFIERS}'`      |  [**DOI**](user-guide/plans/deposit-a-plan.md) of the plan.|
| `'{OPENCDMP.PLAN.FINALIZED-AT}'`      | Date when the plan was finalized.|
| `'{OPENCDMP.PLAN.CREATED-AT}'`      | Date when the plan was created.|
| `'{OPENCDMP.DESCRIPTION.ID}'`      | Id of the description.|
| `'{OPENCDMP.DESCRIPTION.TITLE}'`      | Title of the description.|
| `'{OPENCDMP.DESCRIPTION.DESCRIPTION}'`      | Description of the description.|
| `'{OPENCDMP.DESCRIPTION.STATUS}'`      | Status of the description.|
| `'{OPENCDMP.DESCRIPTION.SECTION}'`      | Section of the plan in which the description has been created.|
| `'{OPENCDMP.DESCRIPTION.TEMPLATE.NAME}'`      | Name of the description template.|
| `'{OPENCDMP.DESCRIPTION-REFERENCE.<REFERENCE-TYPE-CODE>'`      | Reference of the description by [**reference type code**](admin-guide/system-configuration/reference-types.md). For example, if we want the description's reference with type grant, the correct code is `'{OPENCDMP.DESCRIPTION-REFERENCE.GRANTS}'`|
| `'{OPENCDMP.DESCRIPTION.CREATED-AT}'`      | Date when the description was created.|

:::warning
Any code related to descriptions (`'{OPENCDMP.DESCRIPTION.<CODE>}'`) is only available when exporting a specific description, not when exporting a plan.
:::

