---
sidebar_position: 3
description: Manage all description template types
---

# Description Template Types

This page allows administrators to define categories for description templates, enabling better organization and filtering of templates based on their intended purpose.

## What Are Template Types

:::info
A **Template Type** is a classification category for [Description Templates](/docs/admin-guide/content-management/templates/index.md). When creating or editing a description template, administrators assign it a type. This type helps users identify the purpose of the template and allows filtering in the template selection interface.
:::

## Why Use Template Types

Template types help organize and manage templates by:

- **Categorizing content** - Group templates by discipline, data type, or purpose (e.g., "Dataset", "Software", "Publication")
- **Improving user experience** - Users can filter templates by type when creating descriptions
- **Supporting workflows** - Different types can have different review or approval processes
- **Enabling reporting** - Analyze plans by description template types
- **Maintaining organization** - Keep template library manageable as it grows

## Common Template Types

Typical template types include:
- **Dataset** - For describing research datasets
- **Software** - For software and code outputs
- **Publication** - For research papers and reports
- **Prototype** - For physical prototypes or designs
- **Sample** - For biological or physical samples
- **Model** - For computational or mathematical models

## Managing Template Types

In this page, you can view, create, edit, and manage all description template types available in your platform.

The information displayed by default is: the `display name` of the template type, the `status` and timestamps for the `creation` and `updates` of the records. There is also a `code` attribute which is defined during the creation of the template types, cannot change afterwards and is used internally during the imports and exports. At the top right corner of the listing you can also select which columns to display.

:::tip

For description template types, all the columns are visible by default.

:::

You can also create new or remove template types by clicking to the `Create Description Type` button at the top right of the page or to the three dots at the last column, respectively.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role or the tenant specific **TenantPlanManager** role can access this page.

## Navigation

This view is available when the user presses the `Description Types` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them.

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for description types.

- **Is Active**: By toggling this control you can view only the active or only the disabled types.<br/>*By default, this option is set to true.*
- **Status**: Filter types by their status. The status can either be `Draft` or `Finalized`.<br/>*By default, no status is selected  (more details in [statuses](/docs/admin-guide/content-management/template-types.md#statuses) section).*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

## Edit form

When you try to add new types or edit existing ones, the **description template type editing form** will appear containing the following controls.

- **Name**: The display name of the type.
- **Code**: The unique identification code which is used internally during the imports and exports.

## Statuses 

The are two available statuses: `Draft`, `Finalized`. If you want to save it as a `Draft`, press the `Save` button. Otherwise, press the `Finalize` button.

:::warning
- Only `Finalized` template types are available to description templates.
- If a template type has been finalized, you cannot edit it again.
:::