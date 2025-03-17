---
sidebar_position: 13
description: Manage all entity locks
---

# Entity Locks

In this page, there is a listing where you can view details about all the actively locked entities.

:::info

When a user edits a [plan](/docs/application/plans/index.md) or a [description](/docs/application/descriptions/index.md), no other user can make changes on them at the same time. This is forced by an implemented locking mechanism. All the locks are eventually removed after some period of inactivity on the entities or when the user is done editing them.

:::

The information displayed by default is: the `target` which is the id of the entity, the `type` of the entity and timestamps for the `locking` and `updating` of the locks. At the top right corner of the listing you can also select which columns to display.

:::tip

For entity locks, all the columns are visible by default.

:::

You can manually remove a lock by clicking on the three dots on the far right corner of the records and then select `Delete`.

## Authorization

Only users that have the global **Admin** role can access this page.

## Navigation

This view is available when the user presses the `Entity Locks` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them. 

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There are some filtering options available for entity locks.

- **Users**: You can filter locks by their user. You can select one or more users.<br/>*By default, no user is selected.*
- **Types**: You can filter locks by the entity type they act uppon. You can select one or more types.<br/>*By default, no type is selected.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.