import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In general, there are tree categories of fields that can be used.

- **System**: These are predefined fields that refer to system or specification information when filled by the end users. The available system fields are the following:
  - **Title**: Refers to a title of an entity.
  - **Description**: Refers to a description of an entity.
  - **Language**: Refers to the language to be used. The languages being displayed to the end user are discussed [here](/docs/administration/languages.md).
  - **Contact**: Refers to contact information about who should be responsible for the entity.
  - **Access**: Indicates if an entity is publicly available. The end user will have to select between `Public` or `Restricted`.
  - **User**: Refers to users registered to the platform.
- **External Reference**: These are fields that connect to a locally defined or an external source (an  external API in most cases). There is more information available in the [Reference Types](/docs/administration/reference-types.md) section.
- **Custom**: These are generic fields that can be added to provide any type of information. The available data types are the following:
  - **Text**
  - **Rich Text**
  - **Date**
  - **Number**

:::info

Let's explore some specifics based on where these fields are getting setup.
<Tabs queryString="t">
  <TabItem value="blueprint" label="Blueprints">
    In the case of [plan blueprints](/docs/administration/blueprints/index.md) you define the field you want by making two choices, what is the field category and then what is the system field type or the reference type or the data type respectively.
  </TabItem>
  <TabItem value="template" label="Description Templates">
    In the case of [description templates](/docs/administration/templates/index.md) the field type options are 'combined' in one dropdown control. The only difference here is that the options are separated inside that single dropdown based on the field category. 

    In the case of custom fields, you can specify the UI control that will be used in the forms. The elements that are supported are the following:

    - **Text Area**: A regular text area (multiple lines)
    - **Rich Text Area**: A rich text editor
    - **Free Text**: A regular text box (one line)
    - **File Upload**
    - **Switch**
    - **Radio Box**
    - **Select**
    - **Checkbox**
    - **Date Picker**
  </TabItem>
</Tabs>

:::