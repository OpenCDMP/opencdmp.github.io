---
sidebar_position: 5
description: Discover how to prefill a description to save time
---

# Prefill a Description

When adding a description to a plan, you can choose to **prefill it from an external source** instead of answering every question manually. Prefilling searches an external database (such as Zenodo, ORCID, or OpenAIRE) and automatically populates your description fields with the retrieved data.

:::note
Prefilling is only available when the plan's [blueprint](/versioned_docs/version-1.x/using/blueprints.md) has been configured to support it for the relevant section.
:::

## How to Prefill a Description

1. **Open a plan** and navigate to the section where you want to add a description.
2. **Click `Add Description`**. A dialog appears asking how you want to proceed.
3. **Select `Prefill`** instead of filling the description manually.
4. **Choose a description template** — this determines the structure and questions of your description.
5. **Choose a prefilling source** — this is the external database to search (e.g., `Zenodo Datasets`, `ORCID Researchers`).
6. **Type a search term** (e.g., a dataset title, a DOI, a researcher name) and wait for results to appear.
7. **Select a result** from the list. The system fetches the full details for that record and maps the values to your description fields.
8. Your description is pre-populated. Review the filled fields, make any corrections, and complete any fields that were not covered by the prefilling source.

## How Field Population Works

The prefilling system uses **semantics** to match data from the external source to the right fields in your description template.

Each question in a description template can have a semantic tag assigned to it by the administrator. Each field in a prefilling source also carries a semantic target. When a semantic in the prefilling source matches the semantic of a template question, that field is automatically populated.

This means that the same prefilling source can work with multiple different description templates — as long as the templates use matching semantics.

Some fields are set directly on the description itself, regardless of the template:

| System Field | What It Sets |
|-------------|-------------|
| `Label` | The description's title |
| `Description` | The description's summary |
| `Tags` | Tags added to the description |

Administrators can also configure **fixed value fields** that inject a static value into a specific field for every description created via that source (for example, automatically tagging all prefilled descriptions with the source name).

## After Prefilling

Prefilling is a starting point — not a final submission. After the description is pre-populated:

- Review all filled fields to ensure accuracy
- Complete any required fields that the prefilling source did not cover
- Edit or override any values that need correction
- Save the description as normal when ready

:::info
You can learn how administrators configure prefilling sources in the [Prefilling Sources](/versioned_docs/version-1.x/administering/system-configuration/prefilling-sources.md) section.
:::
