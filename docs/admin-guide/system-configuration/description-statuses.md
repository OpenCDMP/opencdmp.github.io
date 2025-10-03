---
sidebar_position: 17
description: Manage all description statuses
---

# Description Statuses

In this page, there is a listing where you can view details about all the available statuses for a [description](user-guide/descriptions/index.md).

:::info

A **description status** is a **potential** state that a description can have. In description status, we can configure the behavior that a description will have, such as if it is editable or not, the available actions and also the access to it.

:::

The information displayed by default is: the `name`, the `description`, the `internal status` and timestamps for the `creation` and `updates` of the records. At the top right corner of the listing you can also select which columns to display.

:::note
Before a a description status can be used, it must be defined in the [Description Workflow](user-guide/descriptions/description-workflow.md)

:::

:::tip

For description statuses, all the columns are visible by default.

:::

You can add a new description status by clicking to the `+ Create Description Status` button at the top right corner of the page.

Editing and removing existing description statuses is also possible by clicking on the three dots available on the last column.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin**, **TenantConfigManager** roles can access this page.

## Navigation

This view is available when the user presses the `Description Statuses` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them.

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for description statuses.

- **Is Active**: By toggling this control you can view only the active or only the disabled description statuses.<br/>*By default, this option is set to true.*
- **Internal Status**: You can filter the description statuses that have the selected internal status.<br/>*By default, this option is not set.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

---

## Edit form

When you try to add new description statuses or edit existing ones, the **description status editing form** will appear containing the following sections.

### Main information section

- **Name**: The label of this description status.
- **Description**: The description of this description status.<br/>*This is optional.*
- **Internal Status**: The selection of internal status is very **critical** to the behavior of the description. There are three internal types:
    - **Draft**: with this status description is editable.
    - **Finalized**: with this status description is not editable.
    - **Canceled**: with this status description is not editable. This state is used internally when a plan is finalized and a specific description is not selected during finalization.
    <br/>*This is optional and if we do not set internal status, the description is editable.*
- **Ordinal**: This specifies the order in which description statuses that have the same internal status, will be called.
- **Available Actions**: The available actions for the description that can be executed when it has this status. The following actions are:
    - **[Export](user-guide/descriptions/exports.md)**
    <br/>*This is optional.*
- **Action**: The display name that the status change action in this status will have.<br/>*This is optional. if we do not set it, the status name will be displayed by default.*
- **Icon Action**: The icon that will appear in the available status change action in this status. The icon can either be `mat icon` from [angular material](https://material.angular.io/components/icon/overview) or an `image`.<br/>*This is optional and if we do not set it, a default icon will appear.*
- **Status Color**: The color that the description will display in various parts of the application for this status.<br/>*This is optional*


### Status authorization section

In order a user can edit a description, he must gain access to status of this description. In this section we can define which users will have access based on their role. The options we have are the following:

- **User Roles**: Users based on their global or tenant role.
- **User Description Roles**: Users based on their description role.
- **Authenticated users**: Users who have been authenticated
- **Allow anonymous users**: All users

:::note

You can choose more than one option and if none of authorization options are selected, no user will have access

:::
