---
sidebar_position: 19
description: Maintenance platmform
---

# Maintenance

In this page, you can maintenance **OpenCDMP**  platmform to secure correct data. These maintenance tasks apply to all existing tenants **regardless** of which one you are logged in with. There are two types of management tasks:

- **Manage Indexes**
- **Manage Events**

## Manage Indexes

In **OpenCDMP**, [Elastic](https://www.elastic.co/) is used for indexing and searching [`Plans`](/docs/application/plans/index.md) and [`Descriptions`](/docs/application/descriptions/index.md) data (*more details about system architecture can be found [here](/docs/getting-started/architecture.md)*). That's why there are the following tasks for managing elastic indexes:

- **Generate Index**: `plan` and `description` indexes are created from the start
- **Clear Index**: `plan` and `description` indexes are deleted

:::tip
- `Generate Index` task is recommended when the OpenCDMP runs for the first time.
- Before `Generate Index` is executed, `Clear Index` must be executed for proper initialization.
:::

## Manage Events

Communication between the application and some of [supplementary services](/docs/supplementary-services/index.md) is done through message queue events. If something goes wrong with the events, you can send new to the other services.

### Main Events
All main events sends data to [notification](/docs/supplementary-services/notifications/index.md), [annotation](/docs/supplementary-services/notifications/index.md), [accounting](/docs/supplementary-services/accounting.md) (If is enabled for this installation) and [KPI](/docs/supplementary-services/kpi.md) (If is enabled for this installation) services. 
- **Send tenant touch events**
- **Send users touch events**
- **Send plan touch events**
- **Send description touch events**

### Accounting events
If [Accounting](/docs/supplementary-services/accounting.md) service is enabled, you can **reset** the values of OpenCDMP **metrics**, by running the following tasks:
- **Send plan accounting entries events**
- **Send description accounting entries events**
- **Send plan blueprint accounting entries events**
- **Send description template accounting entries events**
- **Send description template types accounting entries events**
- **Send preffiling source accounting entries events**
- **Send reference type accounting entries events**
- **Send plan status accounting entries events**
- **Send description status accounting entries events**
- **Send user accounting entries events**
- **Send plan evaluation accounting entries events**
- **Send description evaluation accounting entries events**

### Indicator events
If [KPI](/docs/supplementary-services/kpi.md) service is enabled, to communicate with this, you can run the following tasks:
1. **Send indicator create entry events**: creates an KPI indicator with fixed schema and metadata based on [statistics](/docs/administration/statistics.md)
2. **Send indicator reset entry events**: reset the existing KPI indicator with null data
3. **Send indicator access entry events**: users that have the global **Admin** or **InstallationAdmin** role or the tenant specific **TenantAdmin** role gain access to this indicator
4. **Send indicator point plan entry events**: the existing indicator feeds plan with data, which are called indicator points
5. **Send indicator point description entry events**: the existing indicator feeds description with data, which are called indicator points
6. **Send indicator point reference entry events**: the existing indicator feeds reference with data, which are called indicator points
7. **Send indicator point user entry events**: the existing indicator feeds user with data, which are called indicator points
8. **Send indicator point plan blueprint entry events**: the existing indicator feeds plan blueprint with data, which are called indicator points
9. **Send indicator point description template entry events**: the existing indicator feeds description template with data, which are called indicator points

:::warning
- `Send indicator create entry events` task is required to runs at least one time to display data in [Statistics Page](/docs/administration/statistics.md).
- Until `Send indicator create entry events` is executed, the rest of incdicator tasks will not have results
- Before you run `Send indicator access entry events` the `tenant touch` and `user touch` events must be run first.

:::

:::tip
`Send indicator reset entry events` task is recommended only if you want to delete the indicator points 
:::

:::info
**OpenCDMP** supports a daily task that runs `Send indicator point entry events` once every 24 hours to update the data. If the daily task is not enabled for this installation, the only way to update the data is to manually run this above maintenance task.
:::


## Authorization

Only users that have the global **Admin** role can access this page.

## Navigation

This page is available when the user presses the `Maintenance` link from the side navigation menu.