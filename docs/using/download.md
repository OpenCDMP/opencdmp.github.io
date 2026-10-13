---
sidebar_position: 8
title: Download a plan or asset
description: Download the content of a plan or a single asset as PDF, Word, RDA JSON, RAiD JSON, or XML, and pick the right format
---

# Download a plan or asset

You can download the content of a plan, with all its assets, or of a single asset, as a file.

## Which format? {#which-format}

| Format | In the menu | Use it to | Plans | Assets |
|---|---|---|---|---|
| PDF | **PDF** | Read, print, or send the plan to a funder or reviewer | Yes | Yes |
| Word (DOCX) | **Document** | Edit the text further in Microsoft Word or another word processor | Yes | Yes |
| RDA JSON | **RDA JSON** | Exchange a machine-actionable plan following the [RDA DMP Common Standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) with other tools | Yes | No |
| RAiD JSON | **RAiD JSON** | Share the project metadata in the [RAiD](https://metadata.raid.org/en/v1.6.3/core/core.html#contents) format | Yes | No |
| XML | **XML** | Keep a complete copy in OpenCDMP's own format, for example to [import it](/docs/using/plans/imports.md) into another OpenCDMP installation | Yes | Yes |

The formats offered depend on how your installation is set up, so your menu may list fewer or more formats.

:::tip
The PDF and Word downloads ask nothing and start straight away: their page size, date format, layout, and wording are set by administrators for the whole organisation.
:::

## Download a plan {#where-to-export-from}

- In the [plan editor](/docs/using/plans/create-or-edit-a-plan.md#the-toolbar) toolbar, the **Download** button opens the list of formats. It is disabled while the plan has unsaved changes (**Save your changes first**) or when the current status does not allow downloads.
- On the [Plan overview](/docs/using/plans/plan-overview.md) page, **Download** is in the **...** more actions menu. It is not shown when the current status does not allow downloads.

Choose a format to download the file. Whether a status allows downloads is set by your administrator on the [plan and asset workflows](/docs/administering/system-configuration/workflows.md#status-drawer).

![The more actions menu of the Plan Overview page with the Download submenu open, listing PDF, Document, RDA JSON, RAiD JSON, and XML](/images/plans/exports/plan-export.png)
*Download a plan*

## Download an asset {#download-an-asset}

On the [Asset overview](/docs/using/assets/asset-overview.md) page, open the **...** more actions menu and choose **Download**, then the format. Every collaborator on the plan can download its assets, when the asset's current status allows it (see [Plan & asset workflows](/docs/administering/system-configuration/workflows.md#status-drawer)).

![Asset overview with the more actions menu open and the Download submenu listing PDF, Document, and XML](/images/descriptions/exports/export-description.png)
*Download an asset*

## See also

- [Publish a plan](/docs/using/plans/deposit-a-plan.md): publish to a repository and receive a permanent DOI
- [Import a plan](/docs/using/plans/imports.md): create a plan from a downloaded XML or JSON file
