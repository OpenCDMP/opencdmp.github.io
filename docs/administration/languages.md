---
sidebar_position: 8
description: Manage all available languages
---

# Languages

In this page, there is a listing where you can view details about all the supported languages.

The information displayed by default is: the `code` of the languages, the `status` and timestamps for the `creation` and `updates` of the records. At the top right corner of the listing you can also select which columns to display.

:::tip

For languages, all the columns are visible by default.

:::

You can add support for a new language by clicking to the `+ Create Language` button at the top right corner of the page.

Editing and removing existing languages is also possible by clicking on the tree dots available on the last column.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role or the tenant specific **TenantConfigManager** role can access this page.

## Navigation

This view is available when the user presses the `Languages` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them. 

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for languages.

- **Is Active**: By toggling this control you can view only the active or only the disabled languages.<br/>*By default, this option is set to true.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

---

## Edit form

When you try to add new languages or edit existing ones, the **language editing form** will appear containing the following controls:

- **Code**: The code of the language, typically consisting of two characters.<br/>*For example: 'en', 'pt' etc.*
- **Ordinal**: This controlls the position in which the language will appear on all the dropdowns with the available languages.
- **Payload**: Here all the language strings can be edited, in **JSON** format.
- **Override from file**: In case a language is already defined in a file format, you can load the contents of the definition on the `Payload` control by clicking this checkbox. Then, you can proceed to make any change you want on the payload.

:::note
    If language payload is not defined, there are system files as a fallback.
:::

:::warning

Editing a language payload will override the file definition, if it exists.

:::