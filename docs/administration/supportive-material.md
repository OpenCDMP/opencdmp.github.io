---
sidebar_position: 9
description: Manage supportive material
---

# Supportive Material

In this page, there is a listing where you can view details about the supportive material.

:::info
 Supporting Material is a list of information relevant to explaining the application. It is available to both authorized and anonymous users.
:::

The information displayed by default is: the `code` of the registered [languages](./languages.md), the `type` of materials and timestamps for the `creation` and `updates` of the records. At the top right corner of the listing you can also select which columns to display.

:::tip

For supportive material, all the columns are visible by default.

:::

You can add a new supportive material by clicking to the `+ Create Supportive Material` button at the top right corner of the page.

Editing and removing existing supportive materials is also possible by clicking on the tree dots available on the last column.

:::note
    If no supportive materials are defined, there are system files as a fallback.
:::

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin**, **TenantConfigManager** roles can access this page.

## Navigation

This view is available when the user presses the `Supportive Material` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them.

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for plan statuses.

- **Is Active**: By toggling this control you can view only the active or only the disabled supportive material.<br/>*By default, this option is set to true.*
- **By Tenant**: By toggling this control you can view only the supportive materials that exist in the tenant we are logged in with.<br/>*By default, this option is set to false.*
- **Type**: You can filter supportive materials by the type they are enforced uppon. You can select one or more types.<br/>*By default, no metric is selected.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

---

## Edit form

When you try to add new languages or edit existing ones, the **language editing form** will appear containing the following controls:

- **Material Type**: You select the specific supportive material you want to edit. Let's explore all the available supportive material types:
    - **FAQ**: Frequently Asked Questions.
    - **About**: A brief description of the platform.
    - **Glossary**: A brief description of the most important keywords you see through the app.
    - **Terms Of Service**
    - **User Guide**: A small guide available to the users directly on the platform
    - **Cookie Policy**: Cookies description
- **Language**: You select the specific available language. These materials can have translations available for all the registered [languages](./languages.md).
- **Payload**: Here all the contentn that you want to add.
- **Override from file**: In case a language code is already defined in form, you can load the contents of the definition on the `Payload` control by clicking this checkbox. Then, you can proceed to make any change you want on the payload.

:::warning

Editing a supportive material content will override the file definition, if it exists.

:::
---

## End notes

:::note

All the above are available for the users to read, following the links situated at the bottom part of the side navigation, visible on every page.

:::
:::tip

You can always minimize the navigation sidebar by clicking on the `x` button on the top of it.

:::