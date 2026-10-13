---
sidebar_position: 5
title: Asset workflow
description: How an asset moves between draft, finalized, and canceled statuses, and how plan finalization affects it
---

# Asset workflow

An asset moves through a series of **statuses**, from creation to finalization. The available statuses and the transitions between them are configured by your administrator.

:::info
For administrator configuration details, see [Plan & asset workflows](/docs/administering/system-configuration/workflows.md).
:::

## How it works

When an asset is created, it is automatically assigned the **starting status** configured for your organisation.

From that point, the asset can move between statuses according to the configured workflow transitions. Each status has an **internal type** that controls editing:

| Internal type | Effect |
|---|---|
| **Draft** | The asset can be freely edited and saved. |
| **Finalized** | The asset is locked and cannot be edited. |
| **Canceled** | The asset is inactive and cannot be edited. |

If the workflow includes a transition back from Finalized to a Draft status, the asset can be unlocked and edited again.

## Change an asset's status {#changing-an-assets-status}

You change an asset's status in the asset editor: click the status button in the band above the asset's form and pick the target status (see [Edit an asset](/docs/using/assets/create-or-edit-an-asset.md#edit-an-asset)). The [Asset overview](/docs/using/assets/asset-overview.md) shows the current status but does not change it. The menu offers only the transitions that the workflow and your role allow, and they stay disabled while the editor has unsaved changes.

## When the plan is finalized {#relationship-to-plan-finalization}

When you finalize a plan, the **Finalise this item?** dialog lets you pick which complete draft assets to finalize together with the plan. Draft assets you leave out, and canceled assets, are set to the canceled status and removed from the plan: they are not part of the finalized plan and can no longer be edited. Undoing the plan's finalization later does not bring them back. See [Change status and finalize a plan](/docs/using/plans/plan-workflow.md#assets-you-leave-out).

## View your assets {#viewing-your-assets}

All assets you have created or hold the **Editor** role on are listed on the [My Assets](/docs/using/assets/my-assets.md) page, along with their current status.
