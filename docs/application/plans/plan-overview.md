---
sidebar_position: 3
description: See the overview of a plan and all avaiable actions
---

# Plan Overview

<!-- TODO Add description overview url -->
This page contains the overview of a plan and **all actions** based on user's role. The basic information of the specific plan is displayed such as: `name`, `version`, `user role`, `date` of creation or update, `grants` and `researchers` that is related and `description`. Also appear the included [descriptions](/docs/application/descriptions/index.md) and all active users with their roles (and in which section they have them) in this plan.

![Plan overview](/images/plans/plan-overview/plan-overview.png)
*Plan overview*

## User actions

Let's explore all actions and what privileges they require (*actions are displayed on the right side of the page*).

- **Edit**: From here, the user gets redirected to the [edit page](/docs/application/plans/create-or-edit-a-plan.md).<br/>*Only the collaborators with the role `Owner` can do this*
- **Preview**: From here, the user gets redirected to the [edit page](/docs/application/plans/create-or-edit-a-plan.md) in **read only** access.<br/>*The collaborators who do not have the role `Owner` have read only access. More information about the user roles is available on the [collaboration](/docs/application/plans/invite-collaborators.md) section.*
- **Change Status**: With this option, a dropdown containing all the available transition statuses are displayed for this plan according to [workflow](/docs/application/plans/plan-workflow.md). If the workflow has only one available status, then it is displayed directly on the screen without the `Change Status` button.<br/>*For each available transition status any collaborator assigned to it can do this. You can view more details about statuses [here](/docs/administration/plan-statuses.md)*
- **New Version**: On the right side where the version is displayed you can create new version of this plan. More information is available in the [versioning](/docs/application/plans/versions.md) and the [plan workflow](/docs/application/plans/plan-workflow.md) sections.<br/>*Only the collaborators with the role `Owner` can do this*

- When you clicked more actions button:
    - **Export**: With this option, a dropdown containing all the export options pops up. You can view more details on the exports [here](/docs/application/plans/exports.md).<br/>*Every collaborator can do this.*
    - **Duplicate**<br/>*Only the collaborators with the role `Owner` can do this*
    - **Delete**<br/>*Only the collaborators with the role `Owner` can do this*

- Also a box apears that contains:
    - **Invite**: This is where the user can invite others to collaborate on the plan. More information is available on the [collaboration](/docs/application/plans/invite-collaborators.md) section.<br/>*Only the collaborators with the role `Owner` can do this*
    - **Deposit**: With this option, a dropdown containing all the deposit options options pops up. You can view more details about deposit [here](/docs/application/plans/deposit-a-plan.md).<br/>*Only the collaborators with the role `Owner` can do this*
    - **Evaluate**: With this option, a dropdown containing all the evaluator options options pops up. You can view more details about evaluators [here](/docs/application/plans/evaluators.md).<br/>*Only the collaborators with the role `Owner` can do this*

:::note
    When we clicked the current `version` of plan a dropdown containing all versions pops up
:::


## Authorization

All the users can access this page.

## Navigation

This view is available when the user select a plan either from [`Home`](/docs/application/home.md) or from [`My Plans`](/docs/application/plans/my-plans.md) page.