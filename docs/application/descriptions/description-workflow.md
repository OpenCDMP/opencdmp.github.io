---
sidebar_position: 4
description: Discover the workflow of a description
---

# Description Workflow

:::info

Description workflow is a flow with **[Description Statuses](/docs/administration/description-statuses.md)** transitions. Workflow describes the description lifecycle.

:::

After a description is created, it gets saved automatically the `starting status` that set in the **[Tenant Configuration](/docs/administration/tenant-configuration.md)**. If description status does not have internal status with type `finalized`, the user can make any changes he wants and save it as many times as he wants. If workflow has available transition with status that contains internal status `finalized`, the user can then set this status, it which means no more changes will be possible. If contains another transition for the previous state, the plan can return to it again. To sum up, depending on the available transitions from workflow and the configuration of the statuses, the state of a description can be changed.