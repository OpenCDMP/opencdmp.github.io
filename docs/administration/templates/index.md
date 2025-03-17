import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';

# Description Templates

In this page, there is a listing where you can view details about all the available description templates.

:::info

**Description Templates** describe how a [Description](/docs/application/descriptions/index.md) is structured. All the chapters and fields a Description is consisting of, are referenced here. More details will follow in the next sections.

:::

The information displayed by default is: the `display name` of the templates, the `status`, the `version` and timestamps for the `creation` and `updates` of the records. There is also a `code` attribute which is defined during the creation of the templates, cannot change afterwards and is used internally during the imports and exports. At the top right corner of the listing you can also select which columns to display.

:::tip

For description templates, all the columns are visible by default.

:::

You can create new templates by clicking to the `+ Create Description Template` button at the top right of the page. You can otherwise import one if you have it in **XML** file format by clicking the `Import` button, upload the file and provide a name for your template in the popup form.

There are also many more actions available for description templates. When you clink on the three dots at the last column of a template, you can perform one of the following actions:

- **Edit**
- **New Version**: Create a new version of this template.<br/>*This action is available if one description templates has `Finalized` status (more details in [statuses](/docs/administration/templates/index.md#statuses) section).*
- **Clone**
- **All Description Template Versions**: View all the versions of this template.<br/>*In the listing, only the last versions of templates are displayed, by default.*
- **Download XML**: Download the structure of the template in XML format.
- **Delete**

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role or the tenant specific **TenantPlanManager** role can access this page.

## Navigation

This view is available when the user presses the `Description Templates` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them.

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for description templates.

- **Is Active**: By toggling this control you can view only the active or only the disabled templates.<br/>*By default, this option is set to true.*
- **Status**: Filter templates by their status. The status can either be `Draft` or `Finalized`.<br/>*By default, no status is selected (more details in [statuses](/docs/administration/templates/index.md#statuses) section).*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

---

## Edit form

When you try to add new description templates or edit existing ones, the **description template editing form** will appear, which is divided into three parts.

1. **General Info**: this part contains main info about description.
    - **Description template name**: The display name of the description.
    - **Description template code**: The unique identification code which is used internally during the imports and exports.<br/>*The `code` remains the same for all next versions of this template.*
    - **Description**: Info about the description.
    - **Description template type**: Select the type of description from the available ones. There is more information at the [Description template types](/docs/administration/template-types.md) section.
    - **Description template language**: The language of the description
    - **Editors**: The users that own this template. You can add new owners on the template by using the `Editors` dropdown below the Editors listing. You can also remove existing owners by clicking the `Remove Editor` icon on the last column.<br/>*This is optional.*

2. **Form Description**: this part contains the actual content of the description. A description is divided into `chapters`, `sections`, `questions` and `inputs`. There is more information about how to create a description at the [Description outline form](/docs/administration/templates/index.md#description-outline-form) section.

3. **Preview & Finalize**: When the description is ready, you can navigate to this page to view a preview of your description.<br/>*This tab is available only for editing a existing one.*

### Description outline form

#### Chapter form
You can add one or more **chapters** to the template by clicking the `Form Description` tab. Then you can add the first chapter by clicking the `+ Create the first chapter` button. For every chapter you add, a new form part appears where you can specify everything about that chapter. It is also added to the template navigation sidebar on the left side of the form.
For a chapter you can specify:

- **Chapter Name**

You can add one or more **sections** to the form by clicking the `Create section` button. For every section you add, a new form part appears where we can specify everything about that section.

#### Section form

For a section you can specify:

- **Section Name**
- **Section Description**: A short description for the section.<br/>*This is optional.*

You can add one or more questions to a form section by clicking the `Add Question` button found both on the sidebar and the form when you hover over it (*It appears below it*).

:::note
You can add sections within sections.
:::

#### Question form

For a question you can specify:

- **Title**: The question title
- **Description**: A description for the question which will be displayed below the title.<br/>*This is optional.*
- **Type**: Here, you can select the ui element that will appear to the form for the user to answer this question if it is custom, or the system [data source](/docs/administration/reference-types.md) that will be used.
- **Semantics**: You can view more information [here](/docs/administration/templates/semantics.md).<br/>*This is optional.*
- **Default Value**: If you set this, it will be the default answer for this question.<br/>*This is optional.*
- **Input Placeholder Text**: Text that will appear to the input if it is empty. Only applicable if no default value is set.<br/>*This is optional.*
- **Required**: If set to true, the answer will be mandatory.
- **Make Conditional Question**: Some question types can be displayed to the forms only if some conditions you specify here are met. You can view more information [here](/docs/administration/templates/conditional-questions.md)<br/>*By default, all questions are visible.*

:::info

Inputs that are custom, meaning they are not system specific, can be conditionally added to the form. More information on how to configure this is available in the [conditional questions](/docs/administration/templates/conditional-questions.md) page of this section.

:::

At the bottom of the form, there are more options available for our question.

- **Comment field**: Give the user the option to leave comments about his answer.<br/>*This is optional.*
- **Multiplicity**: Make multiple answers for this question possible. If set to true, four more controls appear.<br/>*This is optional.*
  - **Minimum**: The minimum amount of answers.
  - **Maximum**: The maximum amount of answers.
  - **Multiplicity Placeholder Text**
  - **View inputs in table**: If set to true, all the given answers will also be displayed to the form in a table.

You can add more inputs to the questions by clicking the `Add input` button. For each input you add, you can specify the `type`, the `semantics` and the `default value` as we saw previously. There are more options available for inputs based on the type selected. We will explore our options in the next section.

If you click on the three dots at the bottom right corner of the question form, you can specify the following.

- **Description**: There is already a description section included by default. Here, you can select to ommit it.
- **Extended Description**: This is useful if you want to hide part of the description. If set, a `View more` link will appear below the main description so that the user can reveal the extended description.
- **Additional Information**: If set, a bubble tooltip will be available next to the question title. This is intended to give some short useful tips to the user.

#### Input form

The available input types for a question that are supported are the following:
  - **Text Area**: a regular text area (multiple lines)
  - **Rich Text Area**: a rich text editor
  - **Free Text**: a regular text box (one line)
  - **File Upload**: a file as input
  - **Boolean Decision**: true or false decision
  - **Radio Box**: allow selection of only one option from several pre-defined alternatives
  - **Select**: allow selection or selections from several pre-defined alternatives
  - **Checkbox**: graphical widget that allows the user to make a binary choice
  - **Date Picker**: date input
  - **Reference Types**: inputs from external sources
  - **OpenCDMP Entities**
    - **Internal Plans**: existing plans as inputs
    - **Internal Descriptions**: existing descriptions as inputs
    - **Tags**: existing descriptions tags as inputs
  - **Dataset Identifier**: a text input that needs identification 
  - **Validator**: validation for a text input


Some of the above input types require extra configurations.

<Tabs>
  <TabItem value="upload" label="Upload">
    - **Max File Size**: It is required to limit the size of the files uploaded by the user.
    - **File types**: You can force the upload of specific file types.
    - **Other file types**: If the file type is not available in the dropdown, you can add your own by pressing the `+` icon and giving a name and the specific MIME type you want.
  </TabItem>
  <TabItem value="radio" label="Radio Box">
    You can add one or more options for the users to select, by pressing the `+` button on the `Radio Box Data` section.

    - **Label**: The label of the option.
    - **Value**: The actual input value.
  </TabItem>
  <TabItem value="select" label="Select">
    You can add one or more options for the users to select, by pressing the `+` button on the `Word List Data` section.

    - **Label**: The label of the option.
    - **Value**: The actual input value.
    - **Multiple Selection**: When set to true, the user can select more than one options.
  </TabItem>
  <TabItem value="reference-types" label="Reference Types">
    - **Reference Type**: You can learn more on the [reference types](/docs/administration/reference-types.md) section.
    - **Multiple Selection**: When set to true, the user can select more than one options.
  </TabItem>
</Tabs>

---

## Statuses 

When a description template is created for the first time it acquires the `Draft` status. When you edit an existing one, you can press the `Finalize` button in `Preview & Finalize` tab and the description template gets `Finalized` Status. 

:::warning
- Only `Finalized` templates are available for usage.
- If a description template has been finalized, you can't edit it again.
:::

## End notes

:::tip

For every question you configure, you can view a live preview on how it will look on the form.

:::

:::info

You can invite users to the templates so that they can also edit them.

:::


<DocCardList />