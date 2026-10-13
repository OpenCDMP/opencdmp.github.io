---
sidebar_position: 1
description: The input types that the questions of an asset template can use, and how each one is stored
---

# Template field types

When you add a question or an input to an asset template, you choose its input type. The editor groups the types as **Text and numbers**, **Choices and dates**, and **Linked data and files**, plus **Preset field**. Several input types are stored as one of two field types, depending on a setting; the stored type is what appears in the XML export and the API.

| Input type | Stored field type | Best for |
|---|---|---|
| **Free text** | `freetext` | Short, one-line answers. The **URL** and **Email** validations require a valid web address or email address. |
| **Text area** | `textarea` | Longer answers in paragraphs. |
| **Rich text** | `richTextarea` | Answers that need formatting (bold, lists, links). The editor opens in plain-text mode; the **Format** button reveals the formatting toolbar and **Plain Text** hides it again. |
| **Number** | `number` | Quantities, counts, amounts, or any answer that must be a number. |
| **Yes / No** | `booleanDecision` | Yes/No questions, answered with two buttons. |
| **Single choice** | `radiobox`, or `select` when **Show as a dropdown** is on | One answer from predefined options. |
| **Multiple choice** | `select` with multiple selection | Several answers from predefined options. |
| **Tick box** | `checkBox` | A standalone opt-in or opt-out checkbox. |
| **Date** | `datePicker` | Dates, such as a start or end date. |
| **Reference** | `referenceTypes` | Values from a configured [Reference Type](/docs/administering/system-configuration/reference-types.md), such as funders, licenses, or ORCID records. **Authors can pick more than one** allows several. |
| **Plan or asset in OpenCDMP** | `internalEntitiesPlans` or `internalEntitiesDescriptions`, chosen by **Link to** | Linking to plans or assets that already exist in the platform. **Authors can link more than one** allows several. |
| **Tags** | `tags` | Free keywords. |
| **Dataset identifier** | `datasetIdentifier`, or `validation` when **Check that the identifier resolves** is on | DOIs, handles, and other persistent identifiers. With the check on, authors are told when an identifier cannot be found. |
| **File upload** | `upload` | Attaching supporting documents or data files. |
| **Preset field** | `system` | Reusing a core asset property (title, description, or tags) as a form field. See [Preset fields](#system-fields). |

A **Default value** can be set on free text, text area, rich text, number, yes/no, single choice, multiple choice, tick box, and date inputs. The same types can drive [conditional questions](/docs/administering/content-management/templates/conditional-questions.md).

## File upload settings

An input of type **File upload** has these settings:

| Setting | Description |
|---|---|
| **Max size** | The maximum file size authors can upload, in MB, up to the limit of the installation (required). |
| **Allowed file types** | The file types authors can upload, grouped as documents, spreadsheets, presentations, images, and data (required). |
| **Other media type…** | Add a type that is not in the list, with the name authors see and its media type (for example `application/x-netcdf`). |

## Preset fields {#system-fields}

A **preset field** maps an input to one of an asset's built-in properties instead of storing a custom answer. This lets you place a core asset property directly inside the template's structure, for example the asset title within a specific section.

Asset templates offer the following preset fields:

| Preset field | What it captures | Required in the template |
|---|---|---|
| **Title** | The title (label) of the asset | Yes. Authors must always answer it. |
| **Description** | The free-text summary of the asset | No |
| **Tags** | The tags applied to the asset | No |

:::info
A preset field shares its value with the corresponding built-in asset property: editing it updates the asset's title, description, or tags.
:::

:::warning
Preset fields behave differently from other inputs:

- Each preset field can appear only once in a template, and a template cannot be finalized without the **Title** preset field.
- The **Title** preset field is always required; the setting is locked.
- A question that holds a preset field **cannot be repeated**, and you cannot add more inputs to it.
- Preset fields **cannot be the target of a [conditional question](/docs/administering/content-management/templates/conditional-questions.md)**: they are always visible.
:::
