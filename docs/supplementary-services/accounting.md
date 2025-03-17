---
sidebar_position: 6
description: Discover everything about the Accounting service
---

# Accounting Service

The `Accounting` is a standalone service responsible to support accounting for any kind and type of data.

:::note
The use of the Accounting service is optional and can be used as an add-on feature for an **OpenCDMP** installation.
:::

## Usages
In **OpenCDMP**, with accounting service we can store info such as:
- the number of entities created per tenant
- how many times the other supplementary services were used per tenant

### Metrics
Application uses target metrics to define the above information to the accounting service. These metrics are:
- **USER_COUNT**
- **PLAN_COUNT**
- **PLAN_STATUS_COUNT**
- **BLUEPRINT_COUNT**
- **DESCRIPTION_COUNT**
- **DESCRIPTION_STATUS_COUNT**
- **DESCRIPTION_TEMPLATE_COUNT**
- **DESCRIPTION_TEMPLATE_TYPE_COUNT**
- **PREFILLING_SOURCES_COUNT**
- **REFERENCE_TYPE_COUNT**
- **DEPOSIT_EXECUTION_COUNT**
- **DEPOSIT_EXECUTION_COUNT_FOR**
- **FILE_TRANSFORMER_EXPORT_PLAN_EXECUTION_COUNT**
- **FILE_TRANSFORMER_EXPORT_PLAN_EXECUTION_COUNT_FOR**
- **FILE_TRANSFORMER_EXPORT_DESCRIPTIONS_EXECUTION_COUNT**
- **FILE_TRANSFORMER_EXPORT_DESCRIPTIONS_EXECUTION_COUNT_FOR**
- **FILE_TRANSFORMER_IMPORT_PLAN_EXECUTION_COUNT**
- **FILE_TRANSFORMER_IMPORT_PLAN_EXECUTION_COUNT_FOR**
- **EXPORT_PLAN_XML_EXECUTION_COUNT**
- **EXPORT_DESCRIPTION_XML_EXECUTION_COUNT**
- **EXPORT_BLUEPRINT_XML_EXECUTION_COUNT**
- **EXPORT_DESCRIPTION_TEMPLATE_XML_EXECUTION_COUNT**
- **IMPORT_PLAN_XML_EXECUTION_COUNT**
- **IMPORT_BLUEPRINT_XML_EXECUTION_COUNT**
- **IMPORT_DESCRIPTION_TEMPLATE_XML_EXECUTION_COUNT**

:::info
Details about metrics initialization can be found [here](/docs/administration/maintenance.md#accounting-events)
:::

### Usage Limits
Also accounting service can be used to check if an entity has exceeded its [usage limit](/docs/administration/usage-limits.md). So, every time before an entity is created, the number of the entity present in the application is calculated by accounting service . If the `value` declared in the usage limit for this entity has been exceeded, then the creation of this entity has not completed.

:::info

The way we configure a new usage limit is described in detail in the [usage limit administration](/docs/administration/usage-limits.md) section of the docs.

:::