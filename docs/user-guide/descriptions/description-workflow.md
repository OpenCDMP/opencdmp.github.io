---
sidebar_position: 4
description: Discover the workflow of a description
---

# Description Workflow

:::info

Description workflow is a flow with **[Description Statuses](admin-guide/system-configuration/description-statuses.md)** transitions. Workflow describes the description lifecycle.

:::

After a description is created, it is automatically saved with the `starting status` that is set in the **[Tenant Configuration](admin-guide/tenant-management/tenant-configuration.md)**. If the description status does not have an internal status of type `finalized`, the user can make any changes and save it as many times as needed. If the workflow has an available transition to a status that contains the internal status `finalized`, the user can then set this status, which means no more changes will be possible. If the workflow contains another transition back to the previous state, the description can return to it again. To sum up, depending on the available transitions in the workflow and the configuration of the statuses, the state of a description can be changed.

In the [`My Descriptions`](user-guide/descriptions/my-descriptions.md) page, the user can view all the descriptions he has created or the ones that are related with [plans](user-guide/plans/index.md) he has been invited as a [collaborator](user-guide/plans/invite-collaborators.md).