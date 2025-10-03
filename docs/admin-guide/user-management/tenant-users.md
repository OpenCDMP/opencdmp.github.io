---
sidebar_position: 11
description: Manage all tenant based user roles
---

# Tenant Users

In this page, there is a listing where you can view details about all the [tenant](admin-guide/tenant-management/tenants.md) registered users.

:::info

Users that are not assigned to a specific tenant are always assigned to the *default* tenant. If you are an administrator on a tenant, you can view the assigned users and their roles in this page by selecting your tenant from the respective top navigation menu dropdown. If you do not belong to a tenant, that dropdown will not be available for you.

:::

The information displayed by default is: the `name` of the users, the `status` of their accounts and timestamps for the `creation` and `updates` of the records. At the top right corner of the listing you can also select which columns to display.

:::tip

For tenant users, there is a column for `emails`, hidden by default.

:::

You can assign new or remove assigned tenant roles from users by clicking to the icon next to the roles column. When you click it, a multiselect dropdown is made available in the roles column.

You can also invite users by clicking the `Invite users` button at the top of the listing, as well as export the users list in **.csv** format by clicking the `Export Users` button respectively.

For the user invitation, you will have to provide an email and a list of the roles you want the user to be assigned with, on the currently selected tenant.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role can access this page.

## Navigation

This view is available when the user presses the `Tenant Users` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them. 

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There are some filtering options available for tenant users.

- **Is Active**: By toggling this control you can view only the active or only the disabled users.<br/>*By default, this option is set to true.*
- **Roles**: You can filter users by their assigned roles. You can select one or more roles.<br/>*By default, no role is selected.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.