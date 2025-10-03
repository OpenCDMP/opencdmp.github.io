---
sidebar_position: 4
description: Discover the workflow of a plan
---

# Plan Workflow

:::info

Plan workflow is a flow with **[Plan Statuses](admin-guide/system-configuration/plan-statuses.md)** transitions. Workflow describes the plan lifecycle.

:::

After a plan is created, it is automatically saved with the `starting status` that is set in the **[Tenant Configuration](admin-guide/tenant-management/tenant-configuration.md)**. If the plan status does not have an internal status of type `finalized`, the user can make any changes and save it as many times as needed. If the workflow has an available transition to a status that contains the internal status `finalized`, the user can then set this status, which means no more changes will be possible. If the workflow contains another transition back to the previous state, the plan can return to it again. To sum up, depending on the available transitions in the workflow and the configuration of the statuses, the state of a plan can be changed.

If the current status contains an action for deposit, then the plan can be [deposited](user-guide/plans/deposit-a-plan.md).

:::warning

When a plan is deposited, it can no longer be edited. This action is irreversible. In this case, the only options are to either clone it or create a new [version](user-guide/plans/versions.md) of it.

:::

In the [`My Plans`](user-guide/plans/my-plans.md) page, the user can view all the plans he has created or the ones he has been invited as a [collaborator](user-guide/plans/invite-collaborators.md).