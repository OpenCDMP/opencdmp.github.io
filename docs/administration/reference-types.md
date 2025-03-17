---
sidebar_position: 5
description: Manage all reference types
---

# Reference Types

In this page, there is a listing where you can view details about all the available reference types.

:::info

A **reference type** is any type of information that is made available to the users when they fill [plan](/docs/application/plans/index.md) forms. This information is either static, or coming from an outside source (*an external API*). These sources are extremely configurable as we will see in this section.

:::

The information displayed by default is: the `name`, the `status`, the `identification code` and timestamps for the `creation` and `updates` of the records. At the top right corner of the listing you can also select which columns to display.

:::tip

For reference types, all the columns are visible by default.

:::

You can add a new reference type by clicking to the `+ Create Reference Type` button at the top right corner of the page.

Editing and removing existing reference types is also possible by clicking on the tree dots available on the last column.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role can access this page.

## Navigation

This view is available when the user presses the `Reference Types` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them.

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for reference types.

- **Is Active**: By toggling this control you can view only the active or only the disabled reference types.<br/>*By default, this option is set to true.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

---

## Edit form

When you try to add new reference types or edit existing ones, the **reference type editing form** will appear containing the following sections.

### Main information section

- **Name**: The label of this reference type.
- **Code**: The identification code which is used internally for this type. 

### Fields section

In this section we can add custom fields made available from the source. When the `Add Field` button is pressed, a form appears containing the following controls:

- **Label**: The label of the field.
- **Description**: A short description for the field. <br/>*This is optional*
- **Code**: An identification code for this field, used for the information mappings we will discuss about shortly.
- **Data Type**: The data type of a field information can either be `Text` or `Date`.

:::tip

There is no limit on the fields that can be configured. To remove a field configuration, press the `delete` icon on the right side of the field form.

:::

### Sources section

In this section we can add configuration for the sources of this reference type. The configured sources can be more than one. This is useful when there is a need to 'merge' information coming from multiple sources at the same time. The basic information we can provide for a source is the following:

- **Key**: An identification key for our source.<br/>*Used internally by the system.*
- **Label**: A display name for our source.
- **Ordinal**: This specifies the order in which the source will be called.
- **Dependencies**: A source can be dependent on other reference types. Here we can specify these dependencies.
- **Source Type**: It can either be `API` or `Static`.

:::info

All the options that follow are only applicable if the source type we select is `API`. In case we select `Static` the only thing we can specify is the static fields of the source and their values. The **system fields** referred in the [mappings section](/docs/administration/reference-types.md#mappings-section)  are also required in the static sources.

:::

- **Url**: The url of our source.
- **Pagination Path**: The path inside the response in which the pagination information is located. This is only needed if the results are coming paginated from the source.
- **Content Type**: The content type of the responses of the source.<br/>*In most cases, this is `application/json`.*
- **First Page**: We can specify the first page to be different than the default 0.
- **HTTP Method**: The http method the source expects. This can either be `GET` or `POST`.
- **Filter Type**: How filtering is handled when this source is used. This can be set as `local` or `remote`.<br/>*In most cases, this is `remote`, meaning that the source handles the filtering. If set to `null`, the filtering (if any) is also handled remotely by the source.*
- **Headers**: Besides `Content Type`, we can add more API Headers by clicking `Add Header`. Then we select the type and the value of header.<br/>*This is optional.*
- **Results Path**: The path inside the source response where the results are located.

We can set parameters in `Url` which will be used in the [query section](/docs/administration/reference-types.md#queries-section). Parameters in the url are defined with the command `{parameter_name}`. For example. the url: `https://pub.orcid.org/v3.0/expanded-search/?q={like}&start={page}&rows={pageSize}` has three parameters: `{like}`, `{page}`, `{pageSize}`.

#### Mappings section

In this section we can specify how we will be consuming the information coming from our sources by mapping all the source fields we are interested in.

By default, there are three **system fields** available for mapping from the start. If we have specified more fields for our source, these will also appear by their code in this form for configuring their paths.

- **reference_id**: This can be used for identifier fields
- **label**
- **description**

For every field we have to specify the **Response Path** on which the information resides. The path fields on this form are using the [JSONPath](https://goessner.net/articles/JsonPath/) format. The response path must be a field that `Results Path` contains.

:::tip
There are cases where some APIs has values that are either text or array of objects. To get both type values, we can type the `.first()` after JSON Path (e.g. RESPONSE_PATH.first()). This function are not included in JSONPath format, but is a custom approach that would either select the text, or select the text of the first element. Sometimes the same applies in nested structures. To handle this, we can also type `.first()` for each nested structure (e.g. RESPONSE_PATH1.first().RESPONSE_PATH2.first()).
:::

:::tip
For the **concatenation** of multiple values as one information, we can add `@{{RESPONSE_PATH}}`. For example if we want to display full name and API has two diffenert fields for that, we could type `@{{fistName}} @{{lastName}}`.
:::

#### Authentication section

Some APIs require authentication. In this section we can specify the information about how our source API handles authentication. It is optional, and the form can be enabled by checking the `Authentication` checkbox. The options we have are the following:

- **Url**: The url where the API listens for authentication.
- **HTTP Method**: The HTTP method for the authentication request.
- **Token Path**: The path of the token, concatinated after the token type. <br/>*In most cases, it is `null`.*
- **Type**: The token type.<br/>*In most cases, it is `Bearer`.*
- **Request Body**: The body contents of the request, if required.

#### Queries section

In this section we can specify query parameters we can apply to our requests.

- Name: The name of the query parameter that is declared in the source url. <br/>*For example, `like`.*
- Default Value: The default value of the parameter.<br/>*This is optional.*

##### Case section

We can specify special cases where a query can have a certain value.

- **Condition**: This case can exist for specific like patterns.<br/>*This is optional.*
- **Seperator**: The result of query parameter can split by a specific character.<br/>*This is optional.*
- **Value**: The value of query parameter

:::note
The case section is recommended for parameters related to like queries
:::

---

## Test reference type sources

:::note
We can test the reference type to make sure we have configured our sources correctly and see their results. 
:::

:::tip
This functionality supports per-source testing and all-source testing.
:::
---

## End notes

:::note

For every source we add, the form gets populated with new `field mapping`, `authentication` and `queries` sections we can configure as we saw above.

:::