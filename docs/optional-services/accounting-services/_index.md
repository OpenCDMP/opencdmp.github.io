<!-- accounting disabled if you want to activate and rename file name to index.md 
sidebar_position: 1
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
- **`user_count`**
- **`plan_count`**
- **`plan_by_<status_name>_count`**
- **`plan_status_count`**
- **`plan_published_count`**
- **`plan_doied_count`**
- **`blueprint_count`**
- **`plan_blueprint_draft_count`**
- **`plan_blueprint_finalized_count`**
- **`description_count`**
- **`description_by_<status_name>_count`**
- **`description_status_count`**
- **`description_template_count`**
- **`description_template_draft_count`**
- **`description_template_finalized_count`**
- **`description_template_type_count`**
- **`reference_count`**
- **`reference_by_<type_code>_count`**
- **`language_count`**
- **`prefilling_sources_count`**
- **`evaluation_plan_execution_count`**
- **`evaluation_plan_execution_count_for_<evaluator_id>`**
- **`reference_type_count`**
- **`deposit_execution_count`**
- **`deposit_execution_count_for_<deposit_id>`**
- **`file_transformer_export_plan_execution_count`**
- **`file_transformer_export_plan_execution_count_for_<file_transformer_id>`**
- **`file_transformer_export_description_execution_count`**
- **`file_transformer_export_description_execution_count_for_<file_transformer_id>`**
- **`file_transformer_import_plan_execution_count`**
- **`file_transformer_import_plan_execution_count_for_<file_transformer_id>`**
- **`export_plan_xml_execution_count`**
- **`export_description_xml_execution_count`**
- **`export_blueprint_xml_execution_count`**
- **`export_description_template_xml_execution_count`**
- **`import_plan_xml_execution_count`**
- **`import_blueprint_xml_execution_count`**
- **`import_description_template_xml_execution_count`**

:::info
Details about metrics initialization can be found [here](admin-guide/maintenance.md#accounting-events)
:::

:::warning  
Some metrics use dynamic placeholders that are replaced at runtime based on context:

- `{plan_by_<status_name>_count}` and `{description_by_<status_name>_count}`  
  The `<status_name>` is dynamically replaced with the actual status name of each plan or description.  

- `{reference_by_<type_code>_count}`  
  The `<type_code>` corresponds to the code of a reference type defined in the system.  

- Metrics ending in `_for_<...>` require a specific service-related ID to be appended.  
  These include:  
  - `evaluation_plan_execution_count_for_<evaluator_id>`  
     where `<evaluator_id>` is the ID of an [evaluation service](optional-services/evaluator-services.md)
    
  - `deposit_execution_count_for_<deposit_id>`  
      where `<deposit_id>` refers to a [deposit service](optional-services/deposit-services.md). 

  - `file_transformer_import_plan_execution_count_for_<file_transformer_id>`  
     where `<file_transformer_id>` is the ID of the [file transformer](optional-services/file-transformers.md) service used  

These dynamic parts are essential for tracking usage per specific configuration or service integration in the system.  
:::

### Usage Limits
Also accounting service can be used to check if an entity has exceeded its [usage limit](admin-guide/usage-limits.md). So, every time before an entity is created, the number of the entity present in the application is calculated by accounting service . If the `value` declared in the usage limit for this entity has been exceeded, then the creation of this entity has not completed.

:::info

The way we configure a new usage limit is described in detail in the [usage limit administration](admin-guide/usage-limits.md) section of the docs.

:::

import DocCardList from '@theme/DocCardList';

<DocCardList /> -->