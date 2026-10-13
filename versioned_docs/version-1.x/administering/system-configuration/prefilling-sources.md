---
sidebar_position: 6
description: Manage all prefilling sources
---

# Prefilling Sources

This page allows administrators to configure external data sources that automatically populate description fields, significantly reducing manual data entry and improving data consistency.

## What Are Prefilling Sources

:::info
**Prefilling sources** are external APIs (or static configurations) that integrate with OpenCDMP to help users populate [description](/using/descriptions/index.md) fields automatically. When creating a description, users can search these sources and import relevant information directly into their form — instead of answering every question by hand.
:::

## Why Use Prefilling Sources

Prefilling sources enhance the user experience and data quality by:

- **Reducing manual effort** - Users import data from trusted external APIs instead of typing everything manually
- **Improving accuracy** - Data pulled from authoritative sources (e.g., ORCID for researcher profiles, Zenodo for datasets) is more reliable than manual entry
- **Ensuring consistency** - Standardized data formats from external sources prevent variations in how information is recorded
- **Saving time** - Multiple description fields are populated from a single search query
- **Enriching content** - Automatically fill related fields at once (e.g., fetch title, authors, DOI, and abstract together from a publication record)

## Common Use Cases

Typical prefilling sources include:
- **ORCID** - Researcher profiles and publication lists
- **Zenodo** - Research datasets and DOIs
- **OpenAIRE** - Research outputs and projects
- **Crossref** - Publication metadata
- **ROR (Research Organization Registry)** - Organization information
- **Custom APIs** - Institution-specific data repositories

## How Prefilling Works

Understanding the end-to-end flow helps when configuring a prefilling source.

1. **The user starts creating a description** and chooses to prefill it instead of filling fields manually.
2. **The user selects a prefilling source** and searches for their subject (e.g., types a dataset title or a DOI).
3. **The Search API** is called — it returns a list of matching results from the external source.
4. **The user selects a result** from the list.
5. **The Get API** is called (if configured) to fetch the full details for the selected item. If no Get API is configured, the data from the search result is used directly.
6. **The system maps field values** to description template fields using **semantics** — each field in the prefilling source carries a `semanticTarget`, and any description template question that shares the same semantic is automatically populated with the corresponding value.
7. **System fields** (`label`, `description`, `tags`) are set directly on the description itself.

:::note
Prefilling is only available for descriptions in plans where the blueprint explicitly enables it for that section. See [Blueprints](/administering/content-management/blueprints/index.md) for configuration details.
:::

The key mechanism is **semantics**: a prefilling field's `Semantic Target` must match the semantic assigned to a question in the description template. This is how the system knows which API value goes into which form field.

---

## Managing Prefilling Sources

In this page, you can view, create, edit, and manage all configured prefilling sources.

The information displayed by default is: the `label` of the source, the `status` and timestamps for the `creation` and `updates` of the records. At the top right corner of the listing you can also select which columns to display.

:::tip
For prefilling sources, all the columns are visible by default.
:::

You can create new or edit/remove sources by clicking the `+ Create Prefilling Source` button at the top right of the page, or the three dots on the last column for existing entries.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role can access this page.

## Edit Form

The configuration form for a prefilling source is divided into several sections. Work through them in order — fields defined early in the form drive what appears in later sections.

### Main Information

- **Label**: The display name of this prefilling source, shown to users in the prefill selection dialog (e.g., `Zenodo Datasets`, `ORCID Researchers`).
- **Code**: A short, unique internal identifier for this source (e.g., `zenodo-datasets`, `orcid-researchers`).

---

### Fixed Value Fields

Fixed value fields inject a **hardcoded, static value** into a description field every time this prefilling source is used — regardless of what the API returns. They do not depend on the search result at all.

Use fixed value fields when you want to automatically set certain metadata to a predetermined value for all descriptions created via this source. For example, you might always set the `Tags` to `"imported"`, or always set a particular field to `"Zenodo"` to indicate the data origin.

Click `Add Field` to add a fixed value field. For each field:

- **System Target**: Maps this field to one of the three built-in description system fields:
  - `Label` — Sets the description's title/label
  - `Description` — Sets the description's summary text
  - `Tags` — Adds tags to the description
  - Leave empty if this field maps to a description template question instead (via Semantic Target).
- **Semantic Target**: The semantic identifier of the description template question this field should populate. The value specified here must match the semantic assigned to a question in the target description template. Leave empty if using **System Target** instead.
- **Trim Regex**: An optional regular expression applied to the field value before it is stored. Useful for stripping unwanted prefixes or formatting.
- **Fixed Value**: The static value to inject for this field (e.g., `"zenodo"`, `"imported"`, `"open-access"`).

:::note
Each field must have either a **System Target** or a **Semantic Target** — not both, and not neither.
:::

---

### API Fields

API fields define the **dynamic fields** that will be populated from the external API response. Each field you define here will appear as a mappable entry in the [Field Mappings](#field-mappings) section of the API configuration below.

:::tip
After adding or changing API fields, press the **`Submit Fields`** button. This updates the Field Mappings section in the Search (and Get) API configuration to include all the fields you have defined. If you skip this step, newly added fields will not appear in the mappings form.
:::

Click `Add Field` to add an API field. For each field:

- **Code**: A machine-readable identifier for this field (e.g., `title`, `doi`, `author_name`, `abstract`). This code is used in the Field Mappings section to identify which JSONPath response value populates this field.
- **System Target**: Maps this field to a description system field (`Label`, `Description`, or `Tags`). Leave empty if using **Semantic Target** instead.
- **Semantic Target**: The semantic identifier of the description template question this field should populate. The semantic must match exactly the semantic assigned to a question in the description template used for prefilling.
- **Trim Regex**: An optional regular expression to clean up the extracted value before it is stored. For example, to strip the `https://doi.org/` prefix from a DOI value, use `^https://doi\.org/`.

:::note
Each field must have either a **System Target** or a **Semantic Target**.
:::

---

### Search Source Configuration

This section configures the **API endpoint used for searching** — the call made when a user types a query in the prefill dialog to find matching records.

- **Key**: A short internal identifier for this source configuration (e.g., `zenodo-search`).
- **Label**: A display name shown in the test/debug panel.
- **Ordinal**: The order in which this source is called relative to others.
- **URL**: The full endpoint URL. Embed dynamic query parameters using `{parameter_name}` placeholders, which are filled in from the [Queries](#queries) section. For example:
  ```text
  https://zenodo.org/api/records/?page={page}&size={pageSize}&q=title:"{like}" doi:"{like}"
  ```
- **HTTP Method**: The HTTP method the API expects — `GET` or `POST`.
- **Content Type**: The MIME type of the request body (for POST requests). In most cases this is `application/json`.
- **Results Path**: The [JSONPath](https://goessner.net/articles/JsonPath/) expression pointing to the array of result objects in the API response. For example, if the response is `{ "hits": { "hits": [...] } }`, the Results Path is `$.hits.hits`.
- **Pagination Path**: The JSONPath expression pointing to pagination metadata in the response (e.g., `$.hits.total`). Leave empty if the API does not return pagination information.
- **First Page**: The page index the API uses for the first page. Most APIs use `0`; some use `1`.
- **Filter Type**: Controls where filtering is applied:
  - `remote` — The API filters results based on your query parameters (most common).
  - `local` — OpenCDMP fetches results and filters locally.
  - Leave empty to default to remote filtering.
- **Headers**: Additional HTTP headers sent with every request. Click `Add Header` to add a key-value pair. Use this for API keys passed via headers or other custom request requirements.

:::note
A built-in debugging panel is available to test the search configuration. Enter a search term and execute a test request to verify that the URL, parameters, results path, and field mappings are all working correctly before saving.
:::

#### Field Mappings

This section maps each API field (defined in [API Fields](#api-fields) above) to its location in the API response, using [JSONPath](https://goessner.net/articles/JsonPath/) expressions.

Three **system fields** are always present and required:

| Field | Purpose |
|-------|---------|
| `reference_id` | The unique identifier of the result item (e.g., a DOI, record ID). Used to call the Get API for a specific item. |
| `label` | The display title shown in the search results list so users can identify each item. |
| `description` | A short description of the result item shown in the search list. |

Any API fields you defined in the [API Fields](#api-fields) section also appear here, listed by their code. For each field:

- **Response Path**: A JSONPath expression pointing to the value within a single result object (one element from the results array).

:::tip
Some APIs return fields as either a plain string or an array of objects depending on the record. Append `.first()` to handle both cases:
```text
$.metadata.title.first()
```
This returns the string value if it is a string, or the text of the first array element if it is an array.

For nested structures with multiple levels that may be arrays:
```text
$.metadata.creators.first().person_or_org.name
```
:::

:::tip
To **concatenate multiple values** into a single field, use `@{{RESPONSE_PATH}}` syntax:
```text
@{{metadata.creators.0.person_or_org.given_name}} @{{metadata.creators.0.person_or_org.family_name}}
```
:::

#### Authentication

Some APIs require authentication before accepting requests. This section is optional — enable it by checking the `Authentication` checkbox.

When enabled, OpenCDMP first sends an authentication request to obtain a token, then includes it automatically in all subsequent API calls.

- **URL**: The authentication (token) endpoint of the API provider.
- **HTTP Method**: The HTTP method for the authentication request — `GET` or `POST`.
- **Token Path**: The JSONPath expression pointing to the token value in the authentication response. For most OAuth2 APIs this is `$.access_token`. Set to `null` if the response body itself is the token.
- **Type**: The token type used in the `Authorization` header. The default is `Bearer`, producing `Authorization: Bearer <token>`.
- **Request Body**: The body to send with the authentication request. For OAuth2 client credentials:
  ```text
  grant_type=client_credentials&client_id=my-client-id&client_secret=my-client-secret
  ```

#### Queries

The Queries section defines the **URL parameters** that OpenCDMP populates when building search requests. Each entry corresponds to a `{parameter_name}` placeholder in the source URL.

For each query parameter:

- **Name**: Must exactly match the placeholder name in the URL (e.g., `like`, `page`, `pageSize`).
- **Default Value**: An optional fallback value used when no dynamic value is available.

##### Cases

Cases define **conditional values** for a query parameter — different values to use depending on the search term or context. Most useful for the `like` (search term) parameter.

For each case:

- **Condition**: An optional pattern. When the current value matches, this case is applied.
- **Separator**: An optional character or string used to split or join multi-part values.
- **Value**: The value or expression to send when the case applies.

:::note
Cases are most useful for the `like` (search) parameter to handle different query formats — for example, treating a DOI string differently from a plain text search.
:::

---

### Get Source Configuration

The Get Source Configuration is **optional**. Enable it by checking the `Get Source Configuration` checkbox in the Search section.

This section configures a **separate API endpoint used to fetch the full details of a single selected item**. It is called after the user picks a result from the search list — its purpose is to retrieve richer, more complete data than what the search endpoint returned.

:::info
**When to configure this:**
- Use a Get API when the search endpoint returns a lightweight summary of each result (e.g., just a title and ID), and a separate endpoint exists to retrieve the full record (e.g., all authors, abstract, keywords, access rights).
- If your search API already returns all the fields you need, the Get API can be left unconfigured.

A common pattern is:
- **Search API**: `GET /api/records?q={like}` — returns a list with minimal fields
- **Get API**: `GET /api/records/{reference_id}` — returns one complete record by ID
:::

The form for the Get Source Configuration is identical to the Search Source Configuration. The `reference_id` value from the search result is available as a parameter in the Get API URL.

A debugging panel is also available here to test the Get configuration independently.

---

## Complete Example: Zenodo Dataset Prefilling

The following shows a complete prefilling source configuration for **Zenodo** research datasets.

### Main Information

| Field | Value |
|-------|-------|
| Label | `Zenodo Datasets` |
| Code | `zenodo-datasets` |

### Fixed Value Fields

| System Target | Semantic Target | Fixed Value | Purpose |
|--------------|----------------|-------------|---------|
| `Tags` | *(empty)* | `zenodo` | Tag every prefilled description as coming from Zenodo |

### API Fields

| Code | System Target | Semantic Target | Trim Regex |
|------|--------------|----------------|------------|
| `title` | `Label` | *(empty)* | *(empty)* |
| `description_text` | `Description` | *(empty)* | *(empty)* |
| `doi` | *(empty)* | `http://www.w3.org/ns/dcat#identifier` | `^https://doi\.org/` |
| `access_rights` | *(empty)* | `http://purl.org/dc/terms/accessRights` | *(empty)* |
| `license` | *(empty)* | `http://purl.org/dc/terms/license` | *(empty)* |

### Search Source Configuration

| Field | Value |
|-------|-------|
| Key | `zenodo-search` |
| Label | `Zenodo Search API` |
| URL | `https://zenodo.org/api/records/?page={page}&size={pageSize}&q={like}&type=dataset` |
| HTTP Method | `GET` |
| Content Type | `application/json` |
| Results Path | `$.hits.hits` |
| Pagination Path | `$.hits.total` |
| First Page | `1` |
| Filter Type | `remote` |

#### Field Mappings

| Field | Response Path |
|-------|---------------|
| `reference_id` | `$.doi` |
| `label` | `$.metadata.title` |
| `description` | `$.metadata.description.first()` |
| `title` | `$.metadata.title` |
| `description_text` | `$.metadata.description.first()` |
| `doi` | `$.doi` |
| `access_rights` | `$.metadata.access_right` |
| `license` | `$.metadata.license.id` |

#### Query Parameters

| Name | Default Value |
|------|---------------|
| `like` | `*` |
| `page` | `1` |
| `pageSize` | `10` |

### Get Source Configuration

| Field | Value |
|-------|-------|
| Key | `zenodo-get` |
| URL | `https://zenodo.org/api/records/{reference_id}` |
| HTTP Method | `GET` |
| Results Path | `$` |

#### Field Mappings (Get)

Same as above — the Get endpoint returns the same structure for a single record.

---

## End Notes

:::note
The Search and Get configurations each maintain their own independent set of field mappings, authentication settings, and query parameters. Changes to one do not affect the other.
:::
