---
sidebar_position: 3
description: Manage all plan blueprint types
---

# Blueprints Types

This page allows administrators to define categories for plan blueprints, enabling better organization and filtering of blueprints based on their intended purpose.

## What Are Blueprint Types

:::info
A **Blueprint Type** is a classification category for [Plan Blueprint](/administering/content-management/blueprints/index.md). When creating or editing a description blueprint, administrators assign it a type. This type helps users identify the purpose of the blueprint and allows filtering in the blueprint selection interface.
:::

## Why Use Blueprint Types

Blueprint types help organize and manage blueprints by:

- **Categorizing content** - Group blueprints by discipline, data type, or purpose (e.g., "Dataset", "Software", "Publication")
- **Improving user experience** - Users can filter blueprints by type when creating descriptions
- **Supporting workflows** - Different types can have different review or approval processes
- **Enabling reporting** - Analyze plans by description blueprint types
- **Maintaining organization** - Keep blueprint library manageable as it grows


## Managing Blueprint Types

In this page, you can view, create, edit, and manage all description blueprint types available in your platform.

The information displayed by default is: the `display name` of the blueprint type, the `status` and timestamps for the `creation` and `updates` of the records. There is also a `code` attribute which is defined during the creation of the blueprint types, cannot change afterwards and is used internally during the imports and exports. At the top right corner of the listing you can also select which columns to display.

:::tip

For blueprint types, all the columns are visible by default.

:::

You can also create new or remove blueprint types by clicking to the `Create Blueprint Type` button at the top right of the page or to the three dots at the last column, respectively.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role or the tenant specific **TenantPlanManager** role can access this page.

## Navigation

This view is available when the user presses the `Blueprint Types` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them.

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for description types.

- **Is Active**: By toggling this control you can view only the active or only the disabled types.<br/>*By default, this option is set to true.*
- **Status**: Filter types by their status. The status can either be `Draft` or `Finalized`.<br/>*By default, no status is selected  (more details in [statuses](/administering/content-management/blueprints/blueprint-types.md#statuses) section).*

In order for the filters to apply, you have to click the `Apply filters` button.

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

## Edit form

When you try to add new types or edit existing ones, the **plan blueprint type editing form** will appear containing the following controls.

- **Name**: The display name of the type.
- **Code**: The unique identification code which is used internally during the imports and exports.

## Statuses

The are two available statuses: `Draft`, `Finalized`. If you want to save it as a `Draft`, press the `Save` button. Otherwise, press the `Finalize` button.

:::warning
- Only `Finalized` blueprint types are available to plan blueprints.
- If a blueprint type has been finalized, you cannot edit it again.
:::
