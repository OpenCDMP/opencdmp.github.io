---
sidebar_position: 4
title: Asset overview
description: Read an asset's content in one page, and reach its actions, evaluations, and the plan it belongs to
---

# Asset overview

The Asset overview opens when you select an asset on the [Dashboard](/docs/using/home.md) or the [My Assets](/docs/using/assets/my-assets.md) page. It shows the asset and the actions your plan role allows. At the top, badges show the entity type, the [asset type](/docs/using/assets/index.md), and the current [status](/docs/using/assets/asset-workflow.md), followed by the asset name, its description, the owners, the number of collaborators, and the created and modified dates. The **Used in Plan** section links to the [plan](/docs/using/plans/index.md) the asset belongs to; the plan overview opens in a new tab. Below that, the entire content of the asset is displayed, organized into its sections, subsections and questions/answers exactly as defined by its [template](/docs/using/blueprints.md#asset-templates), and can be expanded or collapsed individually or all at once using the **collapse all** / **expand all** control.

![Asset overview with the type and status badges, the Edit and more actions buttons, the Used in Plan card, and the asset content](/images/descriptions/description-overview/description-overview.png)
*Asset overview*

## Actions {#user-actions}

The actions are at the top right of the page, with more actions under the **...** button. Each action lists the plan roles it requires.

- **Edit**: Opens the asset in the [edit page](/docs/using/assets/create-or-edit-an-asset.md), inside the plan editor.<br/>*Only the collaborators with the role **Owner** or **Editor** (in the plan section where the asset exists) can do this*
- **Preview**: Shown instead of **Edit** when you cannot edit the asset, when the asset is finalized, or when someone else is editing it (see [When someone else is editing](/docs/using/plans/invite-collaborators.md#when-someone-else-is-editing)). It opens the [edit page](/docs/using/assets/create-or-edit-an-asset.md) on the selected asset in **read only** access.<br/> *Only the collaborators with the roles **Reviewer**, **Viewer**, **Editor** (in a plan section where the asset does not exist) have read only access*
- **Evaluate**: When your administrator has configured [evaluator services](/docs/optional-services/evaluator-services.md) that support assets, an **Evaluation** box appears next to the asset content. Press its **Evaluate** toggle to list the available evaluators, then click one to assess the asset; the result opens in the **Evaluation Result** dialog. Past results are kept in the same box, where the **History** toggle lists previous runs with the evaluator and date, and a report icon reopens each result. See [Evaluate a plan or asset](/docs/using/plans/evaluators.md) for how to read the results, including the `Not evaluated` status.<br/>*Available to plan collaborators with the **Owner** role on an active asset; not available in public/read-only views. Users who cannot evaluate the asset see the box only when past evaluations exist, with only the **History**.*

- When you click the more actions (**...**) button:
    - **Download**: Opens a submenu with all the export formats, such as **PDF**, **Document**, and **XML**. See [Download a plan or asset](/docs/using/download.md#download-an-asset).<br/>*Every collaborator can do this.*
    - **Duplicate**: Copies the asset into a plan.<br/>*Only the collaborators with the role **Owner** or **Editor** (in the plan section where the asset exists) can do this*
    - **Delete**<br/>*Only the collaborators with the role **Owner** or **Editor** (in the plan section where the asset exists) can do this. It is disabled while someone else is editing the asset.*

:::note
The status of an asset is changed in the [asset editor](/docs/using/assets/create-or-edit-an-asset.md#edit-an-asset), not on this page.
:::

## Guided tour

A short [guided tour](/docs/using/home.md#guided-tours) introduces the page the first time you open it.
