---
sidebar_position: 4
description: Discover the workflow of a plan
---

# Plan Workflow

:::info

Plan workflow is a flow with **[Plan Statuses](/docs/administration/plan-statuses.md)** transitions. Workflow describes the plan lifecycle.

:::

 After a plan is created, it gets saved automatically the `starting status` that set in the **[Tenant Configuration](/docs/administration/tenant-configuration.md)**. If plan status does not have internal status with type `finalized`, the user can make any changes he wants and save it as many times as he wants. If workflow has available transition with status that contains internal status `finalized`, the user can then set this status, it which means no more changes will be possible. If contains another transition for the previous state, the plan can return to it again. To sum up, depending on the available transitions from workflow and the configuration of the statuses, the state of a plan can be changed.

If the current status contains action for deposit, then plan can then be [deposited](/docs/application/plans/deposit-a-plan.md).

:::warning

When a plan gets deposited it can not be edited anymore. This action is irreversible. In this case, the only option is to either clone it or make a new [version](/docs/application/plans/versions.md) of it.

:::

In the [`My Plans`](/docs/application/plans/my-plans.md) page, the user can view all the plans he has created or the ones he has been invited as a [collaborator](/docs/application/plans/invite-collaborators.md).