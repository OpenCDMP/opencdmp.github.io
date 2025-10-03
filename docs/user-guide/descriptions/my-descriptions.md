---
sidebar_position: 2
description: View, search and manage your descriptions
---

# My Descriptions

The user can view the descriptions he has created or is a contributor. The basic information of the descriptions is displayed in a card format. At the top of the cards, the `name` and the `date` of creation or update are displayed. At the main body of the cards, the user can view the `status` of the description (more information [here](admin-guide/system-configuration/description-statuses.md)), the `version`, the `grant` that is related with the description, if any, and the role he has on it. The [plan](user-guide/plans/index.md) is also listed. At the bottom of the cards, the user has access to some of the actions that he can perform on the description, based on his plan specific role (*all the actions exist in [description overview page](user-guide/descriptions/description-overview.md)*).

![My Descriptions](/images/descriptions/my-descriptions/my-descriptions.png)
*My Descriptions*

## User actions

Let's explore these actions and what privileges they require.

- **Export**: With this option, a dropdown containing all the export options pops up. You can view more details on the exports [here](user-guide/descriptions/exports.md).<br/>*Every collaborator can do this.*
- **Invite**: This is where the user can invite others to collaborate on the plan. More information is available on the [collaboration](user-guide/plans/invite-collaborators.md) section.<br/>*Only the collaborators with the role `Owner` can do this*
- **Copy Description**: With this option you can copy a description to a plan of your choosing.<br/>*Only the collaborators with the role `Owner` can do this*
- **Delete**<br/>*Only the collaborators with the role `Owner` can do this*

## Authorization

All the users can access this page.

## Navigation

This view is available when the user presses the `My Description` link from the side navigation menu.

## Searching

Using the searchbox above the description cards on the right, you can search for descriptions by text.

## Filtering

There are also a lot of filtering choices for the descriptions. The filtering options are displayed in a sidebar at the right side of the screen when the user clicks on the respective `filtering` handle and they are the following:

- **Status**: Show only descriptions that are saved with specific status.
- **Active**: By toggling this control you can view only the active descriptions (*By default, this option is set to true*).
- **Related Plans**: Filter descriptions based on the the [tenant](admin-guide/tenant-management/tenants.md) your are logged in with.
- **Related Tenant**: Filter plans based on the the [tenant](admin-guide/tenant-management/tenants.md) your are logged in with.
- **Related Description Templates**: Filter descriptions based on the [templates](user-guide/templates.md) their [descriptions](user-guide/descriptions/index.md) are using.
- **Role**: Filter descriptions based on the role the user has on them.
- **Tags**: Filter descriptions based on the tags.
- **Reference Types**: Filter descriptions based on their [references](user-guide/references.md). You can filter using more than one references by clicking the `Add a Reference Type` button and selecting your reference.

When done setting the filters, the button `Apply filters` located at the bottom of the sidebar must be pressed.

## Sorting
There are also a sorting choices.
- **Modified**: groupping descriptions by most recent updates
- **Label**: groupping descriptions by label
- **Status**: groupping descriptions by status

## Public Descriptions

In addition to the `My Descriptions` page, there is also the `Public Descriptions` page where all finalized descriptions which their finalized plans with public access are displayed. 
Τhe same information is displayed for each description, but the available user actions for them are only: `Export`, `Copy Description`.

![My Descriptions](/images/descriptions/my-descriptions/public-descriptions.png)

:::info
`Public Descriptions` page is available to both authorized and anonymous users. 
:::