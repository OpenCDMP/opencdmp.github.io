---
sidebar_position: 16
description: Manage all plan statuses
---

# Plan Statuses

In this page, there is a listing where you can view details about all the available statuses for a [plan](using/plans/index.md).

:::info

A **plan status** is a **potential** state that a plan can have. In plan status, we can configure the behavior that a plan will have, such as if it is editable or not, the available actions and also the access to it.

:::

The information displayed by default is: the `name`, the `description`, the `internal status` and timestamps for the `creation` and `updates` of the records. At the top right corner of the listing you can also select which columns to display.

:::note
Before a a plan status can be used, it must be defined in the [Plan Workflow](using/plans/plan-workflow.md)

:::

:::tip

For plan statuses, all the columns are visible by default.

:::

You can add a new plan status by clicking to the `+ Create Plan Status` button at the top right corner of the page.

Editing and removing existing plan statuses is also possible by clicking on the three dots available on the last column.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin**, **TenantConfigManager** roles can access this page.

## Navigation

This view is available when the user presses the `Plan Statuses` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them.

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for plan statuses.

- **Is Active**: By toggling this control you can view only the active or only the disabled plan statuses.<br/>*By default, this option is set to true.*
- **Internal Status**: You can filter the plan statuses that have the selected internal status.<br/>*By default, this option is not set.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

---

## Edit form

When you try to add new plan statuses or edit existing ones, the **plan status editing form** will appear containing the following sections.

### Main information section

- **Name**: The label of this plan status.
- **Description**: The description of this plan status.<br/>*This is optional.*
- **Internal Status**: The selection of internal status is very **critical** to the behavior of the plan. There are two internal types:
    - **Draft**: with this status plan is editable.
    - **Finalized**: with this status plan is not editable.
    <br/>*This is optional and if we do not set internal status, the plan is editable.*
- **Ordinal**: This specifies the order in which plan statuses that have the same internal status, will be called.
- **Available Actions**: The available actions for the plan that can be executed when it has this status. The following actions are:
    - **[Deposit](using/plans/deposit-a-plan.md)**
    - **[Export](using/plans/exports.md)**
    - **[Evaluate](using/plans/evaluators.md)**
    <br/>*This is optional.*
- **Action**: The label that will appear in the available status change dropdown action.<br/>*This is optional. if we do not set it, the status name will be displayed by default.*
- **Icon Action**: The icon that will appear in the available status change dropdown action in this status. The icon can either be `mat icon` from [angular material](https://material.angular.io/components/icon/overview) or an `image`.<br/>*This is optional and if we do not set it, a default icon will appear.*
- **Status Color**: The color that the plan will display in various parts of the application for this status.<br/>*This is optional*


### Status authorization section

This section controls which users can change the status of a plan based on their role:

- **User Roles**: Grant access to users who hold a specific global or tenant role (e.g. `TenantAdmin`, `TenantUser`).
- **User Plan Roles**: Grant access to users based on their [role on the plan](using/plans/invite-collaborators.md) (e.g. `Owner`, `Reviewer`, `Viewer`).
- **Authenticated Users**: Grant access to any logged-in user.
- **Allow Anonymous Users**: Grant access to all users, including unauthenticated ones.

:::info How authorization works
A status option is shown to a user **only if they satisfy at least one of the selected authorization options** — regardless of whether that transition is defined in the [Plan Workflow](using/plans/plan-workflow.md).
:::

:::note
Multiple options can be selected simultaneously. If no option is selected, no user will be able to change the plan to this status — however, the plan remains visible to its author and users with **Admin** or **Tenant Admin** roles regardless of this configuration.
:::

:::tip
When using **User Plan Roles**, make sure the intended users also have the **Tenant User** role assigned.
:::
