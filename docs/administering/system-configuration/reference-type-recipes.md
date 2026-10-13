---
sidebar_position: 2
description: Worked reference type configurations for ORCID researchers, re3data repositories, and a fixed list of licenses
---

# Reference type recipes

Three complete [reference type](/docs/administering/system-configuration/reference-types.md) configurations, from the fields to the source. The request, search rules, and mapping settings they use are described in [Connecting to an external API](/docs/administering/system-configuration/api-sources.md). The researcher and license recipes use the codes `researchers` and `licenses`, which repositories read when a plan is published; see [Reference types the repository reads](/docs/administering/publishing-setup.md#5-reference-types-the-repository-reads).

---

## ORCID researchers (JSON API source) {#orcid-researcher}

A reference type for **Researchers** that uses the ORCID public API, which needs no authentication.

### About this reference type

| Field | Value |
|-------|-------|
| Name | `Researchers` |
| Code | `researchers` |

### Fields

| Label | Code | Data Type | Required |
|-------|------|-----------|----------|
| First Name | `first_name` | Text | Yes |
| Last Name | `last_name` | Text | Yes |
| ORCID iD | `orcid_id` | Text | No |

### Source

Add a source with **Search an API**:

| Field | Value |
|-------|-------|
| Shown to users as | `ORCID Public API` |
| Key | `orcid` |

### Request

| Field | Value |
|-------|-------|
| Method | `GET` |
| URL | `https://pub.orcid.org/v3.0/expanded-search/?q={like}&start={page}&rows={pageSize}` |
| First page number | `0` |
| Content-Type | `application/json` |
| Header `ACCEPT` | `application/json` |

### Search rules

| Setting | Value |
|-------|-------|
| Who filters the results | The API |
| Placeholder | `like` |
| Rule 1 | Condition `is anything`, value to send `{like}` |
| No rule matches: Send instead | `*` |

### Test and map

| Setting | Value |
|-------|-------|
| Response format | `JSON` |
| Results are in | `$.expanded-result` |
| Total count is in | `$.num-found` |

| Field | Path in the reply |
|-------|---------------|
| Reference ID | `$.orcid-id` |
| Name | `@{{given-names}} @{{family-names}}` |
| Description | *(leave empty)* |
| First Name | `$.given-names` |
| Last Name | `$.family-names` |
| ORCID iD | `$.orcid-id` |

### Display

| Setting | Value |
|-------|-------|
| Link URL | `https://orcid.org/{reference_id}` |

---

## re3data repositories (XML API source) {#re3data-repositories}

A reference type for **Repositories** that uses the [re3data](https://www.re3data.org/) public API, which returns XML.

### About this reference type

| Field | Value |
|-------|-------|
| Name | `Repository` |
| Code | `repository` |

### Fields

| Label | Code | Data Type | Required |
|-------|------|-----------|----------|
| DOI | `doi` | Text | No |

### Source and request

| Field | Value |
|-------|-------|
| Shown to users as | `re3data Repositories` |
| Key | `re3data` |
| Method | `GET` |
| URL | `https://www.re3data.org/api/beta/repositories?query={like}` |
| Content-Type | `application/xml` |

### Search rules

| Setting | Value |
|-------|-------|
| Placeholder | `like` |
| Rule 1 | Condition `is anything`, value to send `{like}` |
| No rule matches: Send instead | `*` |

### Test and map

| Setting | Value |
|-------|-------|
| **Response format** | **`XML`** |
| Results are in | `//repository` |

| Field | Path in the reply |
|-------|---------------|
| Reference ID | `./id/text()` |
| Name | `./name/text()` |
| Description | *(leave empty)* |
| DOI | `./doi/text()` |

:::tip
A sample re3data response. It has no namespace declarations, so plain XPath such as `//repository` works:
```xml
<list>
  <repository>
    <id>r3d100012890</id>
    <doi>https://doi.org/10.17616/R3JZ3J</doi>
    <name>World Ocean Atlas</name>
    <link href="https://www.re3data.org/api/beta/repository/r3d100012890" rel="self" />
  </repository>
  ...
</list>
```
:::

---

## Licenses (fixed list) {#license-types}

A reference type for **Licenses** that uses a fixed list, with no external API connection.

### About this reference type

| Field | Value |
|-------|-------|
| Name | `Licenses` |
| Code | `licenses` |

### Fields

No custom fields are needed. The built-in Reference ID, Name, and Description fields are sufficient for a simple license list.

### Source

Add a source with **Fixed list**:

| Field | Value |
|-------|-------|
| Shown to users as | `Standard Licenses` |
| Key | `static-licenses` |

### Entries

| Reference ID | Name | Description |
|------|-------|-------|
| `cc-by-4.0` | CC BY 4.0 | Attribution |
| `cc-by-sa-4.0` | CC BY-SA 4.0 | Attribution-ShareAlike |
| `cc-by-nc-4.0` | CC BY-NC 4.0 | Attribution-NonCommercial |
| `cc0-1.0` | CC0 1.0 | Public Domain Dedication |
| `mit` | MIT License | Permissive software license |
| `apache-2.0` | Apache License 2.0 | Permissive software license with a patent grant |

---

## See also

- [Reference types](/docs/administering/system-configuration/reference-types.md) - The reference type editor
- [Connecting to an external API](/docs/administering/system-configuration/api-sources.md) - Requests, search rules, and mappings
