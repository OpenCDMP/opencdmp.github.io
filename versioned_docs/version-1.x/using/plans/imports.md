---
sidebar_position: 8
description: Discover import options for a plan
---

# Imports

You can import an existing plan so that you do not have to start from scratch. The import option is available from the plan listing page.

## Supported Formats

| Format | Description |
|---|---|
| **XML** | OpenCDMP's native export format. Contains all plan and description data including blueprint structure. |
| **JSON (RDA maDMP)** | Machine-actionable DMP format following the [RDA DMP Common Standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard). Requires additional mapping during import. |
| **JSON (RAiD)** | RAiD project metadata format. Requires additional mapping during import. |

Additional JSON formats may be available depending on the file transformers your administrator has configured.

## Importing an XML File

XML import is straightforward — the file already contains all structural information.

1. Click **Import** on the plan listing page.
2. Select your XML file.
3. Optionally edit the plan title (defaults to the filename).
4. Click **Import**. You are redirected to [My Plans](using/plans/my-plans.md) when complete.

![Import XML plan dialog](/images-1.x/plans/imports/import-xml.png)
*Import plan from XML file*

## Importing a JSON File

JSON formats (RDA maDMP, RAiD) do not include blueprint or template information, so an additional mapping step is required.

1. Click **Import** on the plan listing page.
2. Select your JSON file.
3. If multiple JSON transformers are available, select the format that matches your file (e.g., RDA maDMP or RAiD).
4. The platform analyses the file and extracts the descriptions it contains.
5. A mapping form appears:

![Import JSON plan dialog](/images-1.x/plans/imports/import-json.png)
*Import plan from JSON file*

### Completing the Mapping Form

| Field | Description |
|---|---|
| **Plan label** | The title for the imported plan. Pre-filled from the file where available. |
| **Blueprint** | The blueprint that defines the structure of the plan. Select the blueprint that best matches your plan's content. |
| **Description template** (per description) | The description template to use for each description found in the file. Click the eye icon to preview a template before selecting it. |
| **Section** (per description) | The section of the selected blueprint where the description will be placed. Only sections that accept description templates are shown. |

All fields are required. Once complete, click **Import**. You are redirected to [My Plans](using/plans/my-plans.md) when the import finishes.

:::info
Descriptions are always imported together with their parent plan. See [Description Imports](using/descriptions/imports.md) for more information.
:::
