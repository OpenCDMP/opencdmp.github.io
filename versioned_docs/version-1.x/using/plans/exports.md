---
sidebar_position: 9
description: Discover export options for a plan
---

# Exports

You can export the structure of a plan in the following formats:
- **PDF**
- **DOCX**
- **JSON**
- **XML**

:::info
- `JSON` file is produced according to [RDA](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) or [RAiD](https://metadata.raid.org/en/v1.6.3/core/core.html#contents) specifications
- File formats `PDF`, `DOCX`, `JSON` exports are done by [file transformer services](/versioned_docs/version-1.x/optional-services/file-transformers/index.md)
- You can use the export feature if current plan status has this action. More details can be found [here](administering/system-configuration/plan-statuses.md)
:::

![Export a plan](/images-1.x/plans/exports/plan-export.png)
*Export a plan*

:::tip

- `Export` the button can be used both internally in the form and externally in [`Μy Plans`](using/plans/my-plans.md) and [`Plan Overview`](using/plans/plan-overview.md)
- Export is also available for the [Public Plans](using/plans/my-plans.md#public-plans)

:::

## See Also

- [Deposit a Plan](using/plans/deposit-a-plan.md) — publish to a repository and receive a permanent DOI
- [File Transformer Services](/versioned_docs/version-1.x/optional-services/file-transformers/index.md) — learn about supported formats and how to add custom transformers
