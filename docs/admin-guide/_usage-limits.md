---
sidebar_position: 15
description: Manage all usage limits
sidebar_class_name: hidden
---

<!-- accounting disabled -->
<!-- remove sidebar_class_name: hidden if you want to activate and rename file name to usage-limits.md -->
<!-- # Usage Limits

This page allows administrators to define and enforce quotas on platform resources, helping manage capacity and prevent resource exhaustion in multi-tenant environments.

## Why Use Usage Limits

Usage limits help organizations:

- **Control costs** - Prevent unlimited resource consumption in cloud or shared hosting environments
- **Ensure fair access** - Distribute resources equitably across tenants or user groups
- **Maintain performance** - Prevent individual tenants from degrading system performance
- **Enable tiered services** - Offer different service levels (free, standard, premium) with corresponding resource quotas
- **Plan capacity** - Monitor usage trends and plan infrastructure scaling

## Common Limit Types

Typical usage limits include:
- **Plans per tenant** - Maximum number of active plans
- **Descriptions per plan** - Maximum descriptions within a single plan
- **Users per tenant** - Maximum users in the tenant
- **Plan Blueprints per tenant** - Maximum file storage allocation
- **Description Templates per tenant** - Maximum file storage allocation

## How Usage Limits Work

:::info
Usage limits are quotas that can be set on different entities or resources. These limits are [tenant](admin-guide/tenant-management/tenants.md) specific, meaning you view only the limits set for tenants you manage.

Usage limits are **optional** and require the [accounting service](optional-services/accounting-services/accounting-preview.md) to be enabled, as it tracks resource consumption and enforces the defined limits.
:::

## Managing Usage Limits

In this page, you can view, create, edit, and manage all usage limits for your tenants.

The information displayed by default is: the `label`, the `target metric` which is the resource metric this limit is enforced on, the `limit` value, the `status` of the entity and timestamps for the `creation` and `updating` of the entities. At the top right corner of the listing you can also select which columns to display.

:::tip

For usage limits, all the columns are visible by default.

:::

You can edit or remove a limit by clicking on the three dots on the far right corner of the records and then select `Edit` or `Delete` respectively.

## Authorization

Only users that have the global **Admin** role can access this page.

## Navigation

This view is available when the user presses the `Usage Limits` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them. 

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There are some filtering options available for usage limits.

- **Is Active**: By toggling this control you can view only the active or only the disabled usage limits.<br/>*By default, this option is set to true.*
- **Type**: You can filter limits by the metric they are enforced uppon. You can select one or more metrics.<br/>*By default, no metric is selected.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

---

## Edit form

You can add a limit to your selected tenant by clicking on the `Create Usage Limit` button at the top right corner of the screen, above the listing.

In the form, you can specify the following:

- **Label**: The label of the limit.
- **Target Metric**: The metric this limit will be enforced uppon.<br/>*Metrics can be found in [accounting service section](optional-services/accounting-services/accounting-preview.md#metrics)*
- **Value**: The value of the limit. When set, the target metric will not be able to exceed this value.

When done, you can either save your changes by pressing the `Save` button, or discard them by pressing the `Cancel` button which redirects you back to the listing page. -->