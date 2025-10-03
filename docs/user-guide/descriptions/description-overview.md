---
sidebar_position: 3
description: See the overview of a description and all available actions
---

# Description Overview

This page contains the overview of a description and **all actions** based on user's plan role. The basic information of the specific plan is displayed such as: `name`, `version`, `plan user role`, `date` of creation or update. Also appear in which plan that belongs to, `grants` and `researchers` that is related, `description` and all active users with their roles (and in which plan section they have them).

![Description overview](/images/descriptions/description-overview/description-overview.png)
*Description overview*

## User actions

Let's explore all actions and what privileges they require (*actions are displayed on the right side of the page*).

- **Edit**: From here, the user gets redirected to the [edit page](user-guide/descriptions/create-or-edit-a-description.md) exactly on the selected description.<br/>*Only the collaborators with the role `Owner` or `Description Contributor` (in plan section that description exists) can do this*
- **Preview**: From here, the user gets redirected to the [edit page](user-guide/descriptions/create-or-edit-a-description.md) exactly on the selected description in **read only** access.<br/> *Only the collaborators with the roles `Reviewer`, `Viewer`, `Description Contributor` (in plan section that description doesn't exist) have read only access*
- **Change Status**: With this option, a dropdown containing all the available transition statuses are displayed for this description according to [workflow](user-guide/descriptions/description-workflow.md). If the workflow has only one available status, then it is displayed directly on the screen without the `Change Status` button.<br/>*For each available transition status any collaborator assigned to it can do this. You can view more details about statuses [here](admin-guide/system-configuration/description-statuses.md)*

- When you clicked more actions button:
    - **Export**: With this option, a dropdown containing all the export options pops up. You can view more details on the exports [here](user-guide/descriptions/exports.md).<br/>*Every collaborator can do this.*
    - **Duplicate**<br/>*Only the collaborators with the role `Owner` or `Description Contributor`(in plan section that description exists) can do this*
    - **Delete**<br/>*Only the collaborators with the role `Owner` or `Description Contributor` (in plan section that description exists) can do this*

- Also a box appears that contains:
    - **Invite**: This is where the user can invite others to collaborate on the plan that this description belongs. More information is available on the [collaboration](user-guide/plans/invite-collaborators.md) section.<br/>*Only the collaborators with the role `Owner` can do this*


## Authorization

All the users can access this page.

## Navigation

This view is available when the user select a description either from [`Home`](user-guide/home.md) or selecting a description of a plan from [`Plan Overview`](user-guide/plans/plan-overview.md) page.