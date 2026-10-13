---
sidebar_position: 5
description: Manage all reference types
---

# Reference Types

This page allows administrators to configure the types of references (external data sources) that users can link to their plans and descriptions, enriching content with validated external information.

## What Are Reference Types

:::info

A **reference type** defines a category of external information that users can link to their [plans](/using/plans/index.md) and [descriptions](/using/descriptions/index.md). References can be:
- **Static** - Predefined lists maintained within OpenCDMP
- **External** - Dynamic data fetched from external APIs with search capabilities

These sources are highly configurable, supporting authentication, custom field mappings, and query parameters.

:::

## Why Use Reference Types

Reference types enhance data quality and interoperability by:

- **Linking to authoritative sources** - Connect plans to official databases (grants, organizations, publications)
- **Enabling data validation** - Verify information against trusted external sources
- **Improving discoverability** - Link plans to searchable identifiers (DOIs, ORCIDs, RORs)
- **Supporting compliance** - Meet funder requirements for linking to specific registries
- **Facilitating reporting** - Extract structured data from linked references for analytics

## Common Reference Types

Typical reference types include:
- **Grants** - Funding awards from databases like OpenAIRE or institutional systems
- **Organizations** - Research institutions from ROR (Research Organization Registry)
- **Researchers** - Author profiles from ORCID
- **Publications** - Academic papers from Crossref or institutional repositories
- **Datasets** - Research data from repositories like Zenodo or Dataverse
- **Taxonomies** - Controlled vocabularies and classification systems

## Managing Reference Types

In this page, you can view, create, edit, and manage all reference types available in your platform.

The information displayed by default is: the `name`, the `status`, the `identification code` and timestamps for the `creation` and `updates` of the records. At the top right corner of the listing you can also select which columns to display.

:::tip

For reference types, all the columns are visible by default.

:::

You can add a new reference type by clicking to the `+ Create Reference Type` button at the top right corner of the page.

Editing and removing existing reference types is also possible by clicking on the three dots available on the last column.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role can access this page.

## Edit Form

When you try to add new reference types or edit existing ones, the **reference type editing form** will appear containing the following sections.

### Main Information

- **Name**: The display name of this reference type, shown to users in selection lists and throughout the interface (e.g., `Researcher`, `Grant`, `Organization`).
- **Code**: A short, unique identifier used internally by the system (e.g., `researcher`, `grant`, `organization`). This code is referenced in description templates and blueprints when configuring fields of the **External Reference** type.

:::caution
Once a reference type is actively used in descriptions or templates, changing its **Code** may break existing configurations that reference it.
:::

---

### Fields

Fields define the **additional metadata** that a reference entry can carry, beyond its basic identity. When users manually add a reference or when one is retrieved from an external source, these fields store type-specific information.

For example, a **Researcher** reference type might define fields like `first_name`, `last_name`, and `orcid_id`, while a **Grant** reference type might define `grant_number`, `funder`, and `start_date`.

When the `Add Field` button is pressed, a form appears containing the following controls:

- **Label**: The human-readable display name for this field, shown to users in the interface (e.g., `First Name`, `ORCID Identifier`).
- **Description**: An optional explanation of what this field is for or how it should be filled in.
- **Code**: A machine-readable identifier for this field. This code is used when **mapping API response data** to this field in the [Mappings](#mappings) section. Must be unique within this reference type (e.g., `first_name`, `orcid_id`, `grant_number`).
- **Data Type**: The expected data format of the field:
  - `Text` – For any textual content: names, identifiers, URLs, descriptions
  - `Date` – For date values
- **Semantics**: Optional semantic tags that classify the meaning of this field for interoperability purposes. See [Semantics](/administering/content-management/templates/semantics.md) for more information. *This is optional.*
- **Required**: When set to `true`, users must provide a value for this field when **manually** adding a reference of this type. This only applies to manual entry — it does not affect references retrieved automatically from an API source.

:::tip
There is no limit on the number of fields that can be configured. To remove a field, press the `delete` icon on the right side of the field form.
:::

**Example — Researcher reference type fields:**

| Label | Code | Data Type | Required |
|-------|------|-----------|----------|
| First Name | `first_name` | Text | Yes |
| Last Name | `last_name` | Text | Yes |
| ORCID Identifier | `orcid_id` | Text | No |

---

### Sources

A source defines **where and how** the reference data is retrieved. Every reference type must have at least one source.

You can configure multiple sources for the same reference type. This is useful when data needs to be merged from more than one provider — for example, combining results from two different grant databases simultaneously.

The common fields for every source are:

- **Key**: A short, unique internal identifier for this source (e.g., `orcid-api`, `ror-api`, `static-licenses`). Used by the system to distinguish sources within the same reference type.
- **Label**: The display name for this source, shown in the test panel and diagnostic logs (e.g., `ORCID Public API`, `ROR API`).
- **Ordinal**: Controls the order in which sources are queried and how their results are presented to users. Sources with lower ordinal values are queried first.
- **Source Type**: Determines how data is provided — either `API` or `Static` (see below).
- **Dependencies**: Optional links to other reference types whose field values will be automatically injected into this source's API requests. See [Dependencies](#dependencies) below.

#### Static Sources

When **Source Type** is set to `Static`, the source contains a fixed list of options defined directly within the configuration form. No external connection is made — all data is stored inside OpenCDMP.

This is suitable for controlled vocabularies or small, infrequently changing lists, such as license types, access modes, or document statuses.

For each item in the static list you define:
- **Code**: A machine-readable value stored internally for this option (e.g., `cc-by-4.0`).
- **Value**: The display label shown to users when they browse or select this option (e.g., `CC BY 4.0 – Attribution`).

You must also configure the [Mappings](#mappings) for a static source, pointing the system fields (`reference_id`, `label`, `description`) to the appropriate codes of the items defined above.

:::tip
Static sources are ideal for short, stable lists such as:
- License types (CC-BY, CC-BY-NC, MIT, Apache 2.0)
- Yes / No / Not Applicable options
- Internal project categories or funding types
:::

#### API Sources

When **Source Type** is set to `API`, OpenCDMP fetches data dynamically from an external HTTP endpoint. The following fields configure the API connection.

- **URL**: The full endpoint URL. You can embed query parameters using the `{parameter_name}` syntax — these placeholders are filled in at request time from the values configured in the [Queries](#queries) section. For example:
  ```text
  https://pub.orcid.org/v3.0/expanded-search/?q={like}&start={page}&rows={pageSize}
  ```
  This URL has three parameters: `{like}` (the search term), `{page}` (the page offset), and `{pageSize}` (results per page).

- **HTTP Method**: The request method expected by the API — `GET` or `POST`.

- **Content Type**: The MIME type of the request body (relevant for `POST` requests). In most cases this is `application/json`.

- **Results Path**: The [JSONPath](https://goessner.net/articles/JsonPath/) expression pointing to the **array of result objects** inside the API response. For example, given the response:
  ```json
  { "expanded-result": [{ "orcid-identifier": {} }, { "orcid-identifier": {} }] }
  ```
  The Results Path would be `$.expanded-result`. Each object in this array is then processed individually through the [Mappings](#mappings) to populate the reference fields.

- **Pagination Path**: The JSONPath expression pointing to the **pagination metadata** in the API response (e.g., `$.num-found`). Leave empty if the API does not return pagination information.

- **First Page**: The page index value the API uses for the first page of results. Most APIs use `0`; some use `1`. Set this to match the API's convention.

- **Filter Type**: Controls where result filtering is applied:
  - `remote` – The API handles filtering based on the query parameters you send. This is the most common setting.
  - `local` – OpenCDMP fetches the full dataset and filters it locally.
  - Leave empty (`null`) to also default to remote filtering.

- **Headers**: Additional HTTP headers to include with every request to this source. Click `Add Header` to add a key-value pair. Use this for API keys passed in headers, `Accept` headers, or other custom requirements.

#### Dependencies

A **Dependency** links this source to another reference type, allowing the value of a previously selected reference to be injected automatically into this source's API request.

This is useful when an external API requires a parameter that comes from another reference. For example, if you have a **Projects** reference type and an **Outputs** reference type where outputs are fetched by project ID, the Outputs source can declare a dependency on the Projects reference type. When a user has selected a project, its ID is automatically passed to the Outputs API request.

When a dependency is added, the fields of the dependent reference type become available as injectable parameters in the URL and query configuration.

:::info
The platform also provides **system-level filters** that are always available and injected automatically when the URL contains matching placeholder names. You do not need to configure these explicitly.
:::

---

### Mappings

Mappings tell OpenCDMP **how to extract field values** from the API response (or from static option codes) and assign them to the reference's fields.

By default, three **system fields** are always present and must be mapped for every source:

| System Field | Purpose |
|-------------|---------|
| `reference_id` | The unique identifier of the reference entry (e.g., an ORCID iD, a DOI, an ROR ID) |
| `label` | The display name shown to users when browsing or selecting a reference |
| `description` | A brief description of the reference entry |

If you have defined additional **custom fields** in the [Fields](#fields) section, they also appear here listed by their code.

For each field, specify the **Response Path** — a [JSONPath](https://goessner.net/articles/JsonPath/) expression pointing to the value within a **single result item** (one object from the results array identified by the **Results Path**).

:::tip
Some APIs return fields that can be either a plain text value or an array of objects depending on the record. Append `.first()` to the JSONPath expression to handle both cases gracefully:
```text
$.person.name.value.first()
```
This returns the text value if it is a string, or the text of the first array element if it is an array.

For nested structures where multiple levels may be arrays:
```text
$.affiliation-group.first().affiliation.first().organization.name
```
:::

:::tip
To **concatenate multiple response values** into a single field, use the `@{{RESPONSE_PATH}}` syntax:
```text
@{{first-name}} @{{family-name}}
```
This combines two separate API fields into one output value, which is useful for composing a full name as the `label`.
:::

---

### Authentication

Some external APIs require authentication before accepting data requests. The authentication configuration is **optional** — enable it by checking the `Authentication` checkbox.

When enabled, OpenCDMP will first send an authentication request to obtain a token, then include that token automatically in all subsequent data requests to this source.

- **URL**: The authentication endpoint (token URL) of the API provider.
- **HTTP Method**: The HTTP method for the authentication request — `GET` or `POST`.
- **Token Path**: The JSONPath expression pointing to the token value in the authentication response. For most OAuth2 APIs this is `$.access_token`. Set to `null` if the response body itself is the token.
- **Type**: The token type used in the `Authorization` header. The default value is `Bearer`, producing a header of the form `Authorization: Bearer <token>`.
- **Request Body**: The body to send with the authentication request, formatted as required by the API provider. For OAuth2 client credentials, this is typically a URL-encoded string:
  ```text
  grant_type=client_credentials&client_id=my-client-id&client_secret=my-client-secret
  ```

---

### Queries

The Queries section defines the **URL parameters** that OpenCDMP populates when building requests to this source. Each entry here corresponds to a `{parameter_name}` placeholder used in the source URL.

For each query parameter, configure:

- **Name**: Must exactly match the placeholder name in the URL (e.g., if the URL contains `{like}`, the name here is `like`).
- **Default Value**: An optional fallback value used when no dynamic value is available for this parameter. *This is optional.*

#### Cases

Cases allow you to define **conditional values** for a query parameter — different values depending on the context. This is most useful for the search (`like`) parameter, where you may need to format the query term differently in certain scenarios.

For each case:

- **Condition**: An optional pattern that triggers this case. When the current value matches this pattern, the case applies. *This is optional.*
- **Separator**: An optional character or string used to split or join multi-part values (e.g., ` AND ` or `,`). *This is optional.*
- **Value**: The value or value expression to send for this parameter when the case applies. You can reference field values from dependent reference types or use the search term directly.

:::note
The Cases configuration is most relevant for the `like` (search term) parameter. It enables handling scenarios such as formatting an ORCID-format string differently from a plain name search.
:::

---

## Test Reference Type Sources

Once you have configured your reference type, test it before saving to confirm the sources are correctly set up and returning the expected results.

:::note
The test panel supports both:
- **Per-source testing** — Test a specific source in isolation to verify its connection and mappings
- **All-source testing** — Test all configured sources together and review their combined results
:::

Enter a sample search term in the test panel and press the test button for the desired source. The results panel displays the data returned (or any error messages), allowing you to verify that:

1. The source URL and parameters resolve correctly
2. The Results Path locates the correct array in the response
3. All field mappings return the expected values
4. Authentication (if configured) succeeds
5. The `reference_id` and `label` system fields are populated for every result

---

## Complete Example: ORCID Researcher (API Source)

The following shows a complete reference type configuration for **Researchers** using the ORCID public API (no authentication required).

### Main Information

| Field | Value |
|-------|-------|
| Name | `Researcher` |
| Code | `researcher` |

### Fields

| Label | Code | Data Type | Required |
|-------|------|-----------|----------|
| First Name | `first_name` | Text | Yes |
| Last Name | `last_name` | Text | Yes |
| ORCID iD | `orcid_id` | Text | No |

### Source

| Field | Value |
|-------|-------|
| Key | `orcid` |
| Label | `ORCID Public API` |
| Ordinal | `1` |
| Source Type | `API` |
| URL | `https://pub.orcid.org/v3.0/expanded-search/?q={like}&start={page}&rows={pageSize}` |
| HTTP Method | `GET` |
| Content Type | `application/json` |
| Results Path | `$.expanded-result` |
| First Page | `0` |
| Filter Type | `remote` |

### Mappings

| Field | Response Path |
|-------|---------------|
| `reference_id` | `$.orcid-identifier.path` |
| `label` | `@{{first-name}} @{{family-names}}` |
| `description` | *(leave empty)* |
| `first_name` | `$.first-name` |
| `last_name` | `$.family-names` |
| `orcid_id` | `$.orcid-identifier.uri` |

### Query Parameters

| Name | Default Value |
|------|---------------|
| `like` | `*` |
| `page` | `0` |
| `pageSize` | `10` |

---

## Complete Example: License Types (Static Source)

The following shows a reference type configuration for **Licenses** using a static list — no external API connection required.

### Main Information

| Field | Value |
|-------|-------|
| Name | `License` |
| Code | `license` |

### Fields

No custom fields are needed. The built-in `reference_id` and `label` system fields are sufficient for a simple license list.

### Source

| Field | Value |
|-------|-------|
| Key | `static-licenses` |
| Label | `Standard Licenses` |
| Ordinal | `1` |
| Source Type | `Static` |

### Static Items

| Code | Value |
|------|-------|
| `cc-by-4.0` | CC BY 4.0 – Attribution |
| `cc-by-sa-4.0` | CC BY-SA 4.0 – Attribution-ShareAlike |
| `cc-by-nc-4.0` | CC BY-NC 4.0 – Attribution-NonCommercial |
| `cc0-1.0` | CC0 1.0 – Public Domain |
| `mit` | MIT License |
| `apache-2.0` | Apache License 2.0 |

### Mappings

| Field | Response Path |
|-------|---------------|
| `reference_id` | `code` |
| `label` | `value` |
| `description` | *(leave empty)* |

---

## End Notes

:::note
For every source added to a reference type, the form is populated with its own independent **Mappings**, **Authentication**, and **Queries** sections. Each source is configured and tested independently.
:::
