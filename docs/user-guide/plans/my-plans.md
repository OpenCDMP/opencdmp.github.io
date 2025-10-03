---
sidebar_position: 2
description: View, search and manage your plans
---

# My Plans

The user can view the plans he has created or is a contributor. The basic information of the plans is displayed in a card format. At the top of the cards, the `name` and the `date` of creation or update are displayed. At the main body of the cards, the user can view the `status` of the plan (more information [here](admin-guide/system-configuration/plan-statuses.md)), the `version`, the `grant` that is related with the plan, if any, and the role he has on it. The [descriptions](user-guide/descriptions/index.md) are also listed, along with their total count. At the bottom of the cards, the user has access to some of the actions that he can perform on the plans, based on his plan specific role (*all the actions exist in [plan overview page](user-guide/plans/plan-overview.md)*).

![My Plans](/images/plans/my-plans/my-plans.png)
*My Plans*

## User actions

Let's explore these actions and what privileges they require.

- **Export**: With this option, a dropdown containing all the export options pops up. You can view more details on the exports [here](user-guide/plans/exports.md).<br/>*Every collaborator can do this.*
- **Add Description**: From here, the user gets redirected to the [edit page](user-guide/plans/create-or-edit-a-plan.md) of the plan where he can add [descriptions](user-guide/descriptions/index.md).<br/>*Only the collaborators with the role `Owner` can do this*
- **Invite**: This is where the user can invite others to collaborate on the plan. More information is available on the [collaboration](user-guide/plans/invite-collaborators.md) section.<br/>*Only the collaborators with the role `Owner` can do this*
- **Clone**: More information is available in the [plan workflow](user-guide/plans/plan-workflow.md) section.<br/>*Only the collaborators with the role `Owner` can do this*
- **Delete**<br/>*Only the collaborators with the role `Owner` can do this*
- **New Version**: More information is available in the [versioning](user-guide/plans/versions.md) and the [plan workflow](user-guide/plans/plan-workflow.md) sections.<br/>*Only the collaborators with the role `Owner` can do this*
- **All Plan Versions**: From here, the user gets redirected to a listing with all the versions of the plan.<br/>*Every collaborator can do this.*

## Authorization

All the users can access this page.

## Navigation

This view is available when the user presses the `My Plans` link from the side navigation menu.

## Searching

Using the searchbox above the plan cards on the right, you can search for plans by text.

## Filtering

There are also a lot of filtering choices for the plans. The filtering options are displayed in a sidebar at the right side of the screen when the user clicks on the respective `filtering` handle and they are the following:

- **Status**: Show only plans that are saved with specific status.
- **Active**: By toggling this control you can view only the active plans (*By default, this option is set to true*).
- **Related Tenant**: Filter plans based on the the [tenant](admin-guide/tenant-management/tenants.md) your are logged in with.
- **Related Description Templates**: Filter plans based on the [templates](user-guide/templates.md) their [descriptions](user-guide/descriptions/index.md) are using.
- **Related Plan Blueprints**: Filter plans based on their [blueprint](user-guide/blueprints.md).
- **Role**: Filter plans based on the role the user has on them.
- **Reference Types**: Filter plans based on their [references](user-guide/references.md). You can filter using more than one references by clicking the `Add a Reference Type` button and selecting your reference.

When done setting the filters, the button `Apply filters` located at the bottom of the sidebar must be pressed.

## Sorting
There are also a sorting choices.
- **Modified**: groupping plans by most recent updates
- **Label**: groupping plans by label
- **Status**: groupping plans by status

## Public Plans

In addition to the `My Plans` page, there is also the `Public Plans` page where all finalized plans with public access are displayed. 
Τhe same information is displayed for each plan, but the available user actions for them are only: `Export`, `Clone`, `All Plan Versions`.

![My Plans](/images/plans/my-plans/public-plan.png)

:::info
`Public Plans` page is availalble to both authorized and anonymous users. 
:::