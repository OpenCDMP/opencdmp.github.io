---
sidebar_position: 3
description: See the overview of a plan and all available actions
---

# Plan Overview

<!-- TODO Add description overview url -->
This page provides a **summary view of the entire plan**, displaying all key information grouped by category. It includes general metadata such as the title, description, language, contact details, researchers involved, associated organizations, and funding details (e.g., grants and funding organizations).

It also shows licensing and access rights, any included [descriptions](user-guide/descriptions/index.md), and active users with their roles and assigned sections within the plan.


![Plan overview](/images/plans/plan-overview/plan-overview.png)
*Plan overview*

## User actions

Let's explore all actions and what privileges they require (*actions are displayed on the right side of the page*).

- **Edit**: From here, the user gets redirected to the [edit page](user-guide/plans/create-or-edit-a-plan.md).<br/>*Only the collaborators with the role `Owner` can do this*
- **Preview**: From here, the user gets redirected to the [edit page](user-guide/plans/create-or-edit-a-plan.md) in **read only** access.<br/>*The collaborators who do not have the role `Owner` have read only access. More information about the user roles is available on the [collaboration](user-guide/plans/invite-collaborators.md) section.*
- **Change Status**: With this option, a dropdown containing all the available transition statuses are displayed for this plan according to [workflow](user-guide/plans/plan-workflow.md). If the workflow has only one available status, then it is displayed directly on the screen without the `Change Status` button.<br/>*For each available transition status any collaborator assigned to it can do this. You can view more details about statuses [here](admin-guide/system-configuration/plan-statuses.md)*
- **New Version**: On the right side where the version is displayed you can create new version of this plan. More information is available in the [versioning](user-guide/plans/versions.md) and the [plan workflow](user-guide/plans/plan-workflow.md) sections.<br/>*Only the collaborators with the role `Owner` can do this*

- When you clicked more actions button:
    - **Export**: With this option, a dropdown containing all the export options pops up. You can view more details on the exports [here](user-guide/plans/exports.md).<br/>*Every collaborator can do this.*
    - **Duplicate**<br/>*Only the collaborators with the role `Owner` can do this*
    - **Delete**<br/>*Only the collaborators with the role `Owner` can do this*


Two additional boxes are displayed on the right-hand side of the Plan Overview:

- **DOI Provided / Deposit Options**:  
  This box includes the **Deposit** button, which opens a dropdown menu with all available deposit destinations. Users can submit their plan to an external service through this feature.  
  You can view more details about deposit [here](user-guide/plans/deposit-a-plan.md). 
  *Only the collaborators with the role `Owner` can do this*

- **Plan Authors / Evaluation**:  
  This box lists the users involved in the plan, along with their roles and section access. 
    - **Invite**: This is where the user can invite others to collaborate on the plan. More information is available on the [collaboration](user-guide/plans/invite-collaborators.md) section.<br/>*Only the collaborators with the role `Owner` can do this*

  - **Evaluate**: With this option, a dropdown containing all the evaluator options options pops up. You can view more details about evaluators [here](user-guide/plans/evaluators.md).<br/>*Only the collaborators with the role `Owner` can do this*

  *Both inviting collaborators and assigning evaluators are actions restricted to users with the `Owner` role.*


:::note
    When we clicked the current `version` of plan a dropdown containing all versions pops up
:::


## Authorization

All the users can access this page.

## Navigation

This view is available when the user select a plan either from [`Home`](user-guide/home.md) or from [`My Plans`](user-guide/plans/my-plans.md) page.