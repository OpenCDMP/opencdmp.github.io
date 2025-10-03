import DocCardList from '@theme/DocCardList';

# Blueprints

In this page, there is a listing where you can view details about all the available plan blueprints.

:::info

**Plan Blueprints** describe how a [Plan](user-guide/plans/index.md) is structured. All the sections and fields a Plan is consisting of, are referenced here. More details will follow in the next sections.

:::

The information displayed by default is: the `display name` of the blueprints, the `status`, the `version` and timestamps for the `creation` and `updates` of the records. There is also a `code` attribute which is defined during the creation of the blueprints, cannot change afterwards and is used internally during the imports and exports. At the top right corner of the listing you can also select which columns to display.

:::tip

For plan blueprints, all the columns are visible by default.

:::

You can create new blueprints by clicking to the `+ Create Plan Blueprint` button at the top right of the page. You can otherwise import one if you have it in **XML** file format by clicking the `Import` button, upload the file and provide a name for your blueprint in the popup form.

There are also many more actions available for plan blueprints. When you clink on the three dots at the last column of a plan, you can perform one of the following actions:

- **Edit**
- **New Version**: Create a new version of this blueprint.<br/>*This action is available if one blueprint has `Finalized` status (more details in [statuses](admin-guide/content-management/blueprints/index.md#statuses) section).*
- **Clone**
- **All Plan Blueprint Versions**: View all the versions of this blueprint.<br/>*In the listing, only the last versions of blueprints are displayed, by default.*
- **Download XML**: Download the structure of the blueprint in XML format.
- **Delete**

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role or the tenant specific **TenantPlanManager** role can access this page.

## Navigation

This view is available when the user presses the `Plan Blueprints` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them.

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for plan blueprints.

- **Is Active**: By toggling this control you can view only the active or only the disabled blueprints.<br/>*By default, this option is set to true.*
- **Status**: Filter blueprints by their status. The status can either be `Draft` or `Finalized`.<br/>*By default, no status is selected (more details in [statuses](admin-guide/content-management/blueprints/index.md#statuses) section).*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

---

## Edit form

When you try to add new plan blueprints or edit existing ones, the **plan blueprint editing form** will appear, which is divided into three parts.

1. **General Info**: this part contains main info about blueprint.
    - **Name**: The display name of the blueprint.
    - **Code**: The unique identification code which is used internally during the imports and exports.<br/>*The `code` remains the same for all next versions of this template.*
    - **Description**: Info about the blueprint.
    - **DOCX template**: Here we can upload exclusively a docx file for the **[docx file transformer service](https://hub.docker.com/r/opencdmp/file-transformer-docx)** which operates as a template for the [export of a plan](user-guide/plans/exports.md). Uploaded file alter how a plan can be shown (more information about docx template [here](optional-services/file-transformers.md)).<br/>*This is optional, there is a default template.*
   
2. **Form**: this part contains the actual content of the blueprint. A blueprint is divided into  `sections` and `fields`. There is more information about how to create a blueprint at the [Blueprint outline form](admin-guide/content-management/blueprints/index.md#blueprint-outline-form) section.

3. **Preview**: When the blueprint is ready, you can navigate to this page to view a preview of your blueprint.<br/>*This tab is available only for editing a existing one.*

### Blueprint outline form

#### Section form
You can edit and see all **sections** by clicking the `Form` tab. You can add one or more by clicking the `Add Section` button. You can also delete a section by clicking the `delete` icon next to its name.

For every section you add, a new form part appears where you can specify everything about that blueprint section. You can specify:

- **Section Name**
- **Section Description**<br/>*This is optional.*

### Description Templates form

Each section can have one or more **description templates** attached to it. When you 'attach' a [description template](admin-guide/content-management/templates/index.md) to a blueprint, every [plan](user-guide/plans/index.md) that inherits from that blueprint could have a [description](user-guide/descriptions/index.md) that inherits from that template. More details will follow. If you want to have a specific description templates as default option you can add by clicking on the `Add Description Template` button. For every template you add, a new form part appears where you can specify everything about the template attachment. You can also delete one template clicking on the `delete` icon on the right end of its form.

- **Description Template**: The [template](admin-guide/content-management/templates/index.md) you want to add.

- **Editable Description Templates**: When the option is checked, users will be able to **edit** the attached description templates in their plans.  
If this option is **unchecked**, the templates will be **read-only** and cannot be modified by the plan users.

:::info
- This option is only visible when **Description Templates** is enabled.
- If Editable description templates is unchecked, at least one Description Template must be added.
:::
- **Min Multiplicity**: The minimum amount of [descriptions](user-guide/descriptions/index.md) with this [description template](admin-guide/content-management/templates/index.md) that a [plan](user-guide/plans/index.md) based on this blueprint has to have.<br/>*This is optional.*
- **Max Multiplicity**: The maximum amount of [descriptions](user-guide/descriptions/index.md) with this [description template](admin-guide/content-management/templates/index.md) that a [plan](user-guide/plans/index.md) based on this blueprint has to have.<br/>*This is optional.*

:::tip

Let's clarify a little bit more about our description multiplicity options. There are 4 **special cases**.

- If we select a `minimum` and not a `maximum`, it is **mandatory** and there is **no limit** on the amount.
- If we select a `maximum` and not a `minimum`, it is **not mandatory** and there is a **limit** on the amount.
- If we select the **same** `minimum` and `maximum`, we imply **only** that specific amount possible.
- if we select nothing, it is **not mandatory** and there is **no limit** on the amount.

:::

:::warning
At least one section should have description templates.
:::

##### Prefilling Sources form
Each section that has description templates, also contains prefilling sources option. More details about prefilling sources and how these are configured can be found [here](admin-guide/system-configuration/prefilling-sources.md). In blueprint, you specify which of the available prefilling sources will be available for the user to select, when he creates a [description](user-guide/descriptions/index.md) for this section.


You can add one or more **fields** by clicking the `Add Field` button. For every field you add, a new form part appears where we can specify everything about that field.

### Fields form

For a field you can specify:

- **Field Type**: There are four field types available. `System`, `External Reference`, `Custom` and `Upload`. There is more information available in the [Field Types](admin-guide/content-management/blueprints/field-types.md?t=blueprint) section.
- **System Field**: The specific system field we want to add. <br/>*Only applicable if we add a field of type `System`.*
- **Reference Type**: The type of external reference we want to add. For more information, you can refer to the [Reference Types](admin-guide/system-configuration/reference-types.md) section of our docs.<br/>*Only applicable if we add a field of type `External Reference`.*
- **Label**: A label for the field.<br/>*This is optional if we add a field of type `System` or `External Reference`.*
- **Placeholder**: Text that will appear to the input if it is empty. <br/>*This is optional.*
- **Description**: A short description for the field. <br/>*This is optional.*
- **Semantics**: Select from a list of predefined fields coming from Zenodo or rda specifications. There is more information available in the [Semantics](admin-guide/content-management/blueprints/semantics.md) section.<br/>*This is optional.*
- **Required**: You can make the field mandatory if you click the checkbox.<br/>*By default, this is set to false.*
- **Multiple**: You can specify if you allow the addition of multiple fields of the selected type if you click the checkbox.<br/>*Only applicable if we add a field of type `External Reference`. By default, this is set to false.*

:::warning

Blueprint must contains a `System` field of the following types: `Title`, `Description`, `Language` and `Access`.

:::


---

## Statuses 

When a blueprint is created for the first time it acquires the `Draft` status. When you edit an existing one, you can press the `Finalize` button and the blueprint gets `Finalized` Status. 

:::warning
- Only `Finalized` blueprints are available to plans.
- If a blueprint has been finalized, you cannot edit it again.
:::

---

<br/><DocCardList />