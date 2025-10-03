---
sidebar_position: 13
description: Manage all entity locks
---

# Entity Locks

This page provides visibility and control over the locking mechanism that prevents concurrent editing conflicts in OpenCDMP.

## Why Entity Locks Matter

When multiple users collaborate on [plans](user-guide/plans/index.md) and [descriptions](user-guide/descriptions/index.md), the locking mechanism ensures data integrity by preventing simultaneous edits that could result in lost changes or conflicts. Understanding and managing these locks helps administrators:

- **Resolve stuck sessions** - When users close their browser without properly saving or discarding changes, locks may persist
- **Enable urgent edits** - Remove locks blocking critical updates when the original user is unavailable
- **Monitor collaboration** - View which entities are currently being edited and by whom
- **Troubleshoot issues** - Investigate when users report inability to edit content

## How Locks Work

:::info

When a user edits a [plan](user-guide/plans/index.md) or a [description](user-guide/descriptions/index.md), the system automatically places a lock on that entity. No other user can make changes while the lock is active. Locks are automatically removed:
- After a period of inactivity (timeout)
- When the user saves or discards their changes
- When the user navigates away from the editor

:::

## Managing Locks

In this page, you can view details about all actively locked entities and manually remove locks when necessary.

The information displayed by default is: the `target` which is the id of the entity, the `type` of the entity and timestamps for the `locking` and `updating` of the locks. At the top right corner of the listing you can also select which columns to display.

:::tip

For entity locks, all the columns are visible by default.

:::

You can manually remove a lock by clicking on the three dots on the far right corner of the records and then select `Delete`.

:::warning

Only remove locks manually when necessary (e.g., the user's session has ended but the lock persists). Removing a lock while a user is actively editing will cause them to lose unsaved changes.

:::

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
- **Types**: You can filter locks by the entity type they act upon. You can select one or more types.<br/>*By default, no type is selected.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.