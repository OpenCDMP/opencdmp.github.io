---
sidebar_position: 19
description: Maintenance platform
---

# Maintenance

In this page, you can maintenance **OpenCDMP** platform to secure correct data. These maintenance tasks apply to all existing tenants **regardless** of which one you are logged in with. There are three types of management tasks:

- **Manage Indexes**
- **Manage Events**
- **Manage Misc Actions**

## Manage Indexes

In **OpenCDMP**, [Elastic](https://www.elastic.co/) is used for indexing and searching [`Plans`](using/plans/index.md) and [`Descriptions`](using/descriptions/index.md) data (*more details about system architecture can be found [here](deployment/architecture.md)*). That's why there are the following tasks for managing elastic indexes:

- **Generate Index**: `plan` and `description` indexes are created from the start
- **Clear Index**: `plan` and `description` indexes are deleted

:::tip
- `Generate Index` task is recommended when the OpenCDMP runs for the first time.
- Before `Generate Index` is executed, `Clear Index` must be executed for proper initialization.
:::

## Manage Events

Communication between the application and some of [supplementary services](optional-services/index.md) is done through message queue events. If something goes wrong with the events, you can send new to the other services.

### Main Events

All main events send data to the [notification](optional-services/notifications/index.md) and [annotation](optional-services/notifications/index.md) services.

- **Send tenant touch events**
- **Send users touch events**
- **Send plan touch events**
- **Send description touch events**

## Manage Misc Actions

The are some miscellaneous actions, that can be done to do some changes.

### Plan Blueprint

- **Set canEditDescriptionTemplates to true**


## Authorization

Only users that have the global **Admin** role can access this page.

## Navigation

This page is available when the user presses the `Maintenance` link from the side navigation menu.