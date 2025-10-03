---
sidebar_position: 5
description: Manage all prefilling sources
---

# Prefilling Sources

This page allows administrators to configure external data sources that automatically populate description fields, significantly reducing manual data entry and improving data consistency.

## What Are Prefilling Sources

:::info
**Prefilling sources** are external data sources that integrate with OpenCDMP to help users populate [description](/docs/user-guide/descriptions/index.md) fields automatically. When creating or editing a description, users can search these sources and import relevant information directly into their forms.
:::

## Why Use Prefilling Sources

Prefilling sources enhance the user experience and data quality by:

- **Reducing manual effort** - Users can import data from trusted external APIs instead of typing everything manually
- **Improving accuracy** - Data pulled from authoritative sources (e.g., ORCID for researcher information, Zenodo for publications) is more reliable than manual entry
- **Ensuring consistency** - Standardized data formats from external sources prevent variations in how information is entered
- **Saving time** - Quickly populate multiple fields from a single search query
- **Enriching content** - Automatically fill related fields (e.g., fetching author affiliations along with names)

## Common Use Cases

Typical prefilling sources include:
- **ORCID** - Researcher profiles and publications
- **Zenodo** - Research datasets and DOIs
- **OpenAIRE** - Research outputs and projects
- **Crossref** - Publication metadata
- **ROR (Research Organization Registry)** - Organization information
- **Custom APIs** - Institution-specific data sources

## Managing Prefilling Sources

In this page, you can view, create, edit, and manage all configured prefilling sources.

The information displayed by default is: the `label` of the source, the `status` and timestamps for the `creation` and `updates` of the records. At the top right corner of the listing you can also select which columns to display.

:::tip

For prefilling sources, all the columns are visible by default.

:::

You can also create new or edit / remove sources by clicking to the `+ Create Prefilling Source` button at the top right of the page or to the three dots at the last column, respectively.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role can access this page.

## Navigation

This view is available when the user presses the `Prefilling Sources` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them.

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for prefilling sources.

- **Is Active**: By toggling this control you can view only the active or only the disabled types.<br/>*By default, this option is set to true.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

---

## Edit form

Let's explore all the available configuration options for a prefilling source. The first thing we specify is a label for it. This label will be displayed on the prefilling source selection menus. All the other options are grouped in the following form parts.

### Main information section

- **Label**: The label of this prefilling source.
- **Code**: The identification code which is used internally for this type. 

### Fixed value fields form

Here we specify the static fields. These are the fields that relate with one of the available system targets, being `Label`, `Description` and `Tags`, or other custom static fields. We can add one or more fields by pressing the `Add Field` button. For every field we add, we can specify the following.

- **System Target**: Specify the system target, if the field is related.
- **Semantic Target**: Please refer to the [semantics](/docs/admin-guide/content-management/blueprints/semantics.md) section.
- **Trim Regex**: A regular expression used to trim the field value.
- **Fixed Value**: The value of the field.

### API fields

Here we specify the dynamic fields, coming from the API we will configure in the next sections of the form. We can add one or more fields by pressing the `Add Field` button. For every field we add, we can specify the following.

- **Code**: An identifier for the field.
- **System Target**: Specify the system target, if the field is related.
- **Semantic Target**: Please refer to the [semantics](/docs/admin-guide/content-management/blueprints/semantics.md) section.
- **Trim Regex**: A regular expression used to trim the field value.

When we are done adding or updating our fields, we need to press the `Submit Fields` button in order to update an important part of our configurations form, the field mappings section of the source API configuration, coming up next.

### Search source configuration

Here we configure the API endpoint for the search queries

- **Key**: An identification key for our source.<br/>*Used internally by the system.*
- **Label**: A display name for our source.
- **Ordinal**: This specifies the order in which the source will be called.
- **Url**: The url of our source.
- **Pagination Path**: The path inside the response in which the pagination information is located. This is only needed if the results are coming paginated from the source.
- **Content Type**: The content type of the responses of the source.<br/>*In most cases, this is `user-guide/json`.*
- **First Page**: We can specify the first page to be different than the default 0.
- **HTTP Method**: The http method the source expects. This can either be `GET` or `POST`.
- **Filter Type**: How filtering is handled when this source is used. This can be set as `local` or `remote`.<br/>*In most cases, this is `remote`, meaning that the source handles the filtering. If set to `null`, the filtering (if any) is also handled remotely by the source.*
- **Headers**: Besides `Content Type`, we can add more API Headers by clicking `Add Header`. Then we select the type and the value of header.<br/>*This is optional.*
- **Results Path**: The path inside the source response where the results are located.

We can set parameters in `Url` which will be used in the [query section](/docs/admin-guide/system-configuration/prefilling-sources.md#queries-section). Parameters in the url are defined with the command `{parameter_name}`. For example. the url: `https://zenodo.org/api/records/?page={page}&size={pageSize}&q=title:"{like}" doi:"{like}" conceptdoi:"{like}"` has three parameters: `{like}`, `{page}`, `{pageSize}`.

#### Field mappings section

Here we specify where the fields we have specified above can be found on the API response body.

- **Code**: The code of the field.
- **Response Path**: The [JSONPath](https://goessner.net/articles/JsonPath/) on the response, where this field maps to.

By default, there are three **system fields** available for mapping from the start. If we have specified more `API fields` for our source, these will also appear by their code in this form for configuring their paths.

- **reference_id**: This can be used for identifier fields
- **label**
- **description**

:::tip
There are cases where some APIs has values that are either text or array of objects. To get both type values, we can type the `.first()` after JSON Path (e.g. RESPONSE_PATH.first()). This function are not included in JSONPath format, but is a custom approach that would either select the text, or select the text of the first element. Sometimes the same applies in nested structures. To handle this, we can also type `.first()` for each nested structure (e.g. RESPONSE_PATH1.first().RESPONSE_PATH2.first()).
:::

:::tip
For the **concatenation** of multiple values as one information, we can add `@{{RESPONSE_PATH}}`. For example if we want to display full name and API has two different fields for that, we could type `@{{firstName}} @{{lastName}}`.
:::

#### Authentication section

Some APIs require authentication. In this section we can specify the information about how our source API handles authentication. It is optional, and the form can be enabled by checking the `Authentication` checkbox. The options we have are the following:

- **Url**: The url where the API listens for authentication.
- **HTTP Method**: The HTTP method for the authentication request.
- **Token Path**: The path of the token, concatenated after the token type. <br/>*In most cases, it is `null`.*
- **Type**: The token type.<br/>*In most cases, it is `Bearer`.*
- **Request Body**: The body contents of the request, if required.

#### Queries section

In this section we can specify query parameters we can apply to our requests.

- Name: The name of the query parameter that is declared in the source url. <br/>*For example, `like`.*
- Default Value: The default value of the parameter.<br/>*This is optional.*

##### Case section

We can specify special cases where a query can have a certain value.

- **Condition**: This case can exist for specific like patterns.<br/>*This is optional.*
- **Separator**: The result of query parameter can split by a specific character.<br/>*This is optional.*
- **Value**: The value of query parameter

:::note
The case section is recommended for parameters related to like queries
:::

---

### Get source configuration

The contents of this form are identical with the previous section. The difference here, is that we configure the API endpoint that fetches a specific source item. We also specify the API field mappings as we do for the source configuration, if added previously.

:::info

This section is optional. It appears if we click the `Get Source Configuration` checkbox on the previous section, and is used if the API we configure supports this type of requests.

:::