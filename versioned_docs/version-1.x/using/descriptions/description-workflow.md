---
sidebar_position: 4
description: Discover the workflow of a description
---

# Description Workflow

A description moves through a series of **statuses** during its lifecycle — from initial creation through to finalization. The available statuses and the transitions between them are configured by your administrator.

:::info
For administrator configuration details, see [Description Workflow Configuration](/versioned_docs/version-1.x/administering/system-configuration/description-workflow.md).
:::

## How It Works

When a description is created, it is automatically assigned the **starting status** configured for your tenant.

From that point, the description can move between statuses according to the configured workflow transitions. Each status has an **internal type** that controls editing:

| Internal type | Effect |
|---|---|
| **Draft** | The description can be freely edited and saved. |
| **Finalized** | The description is locked — no further edits are possible. |
| **Canceled** | The description is inactive and cannot be edited. |

A description remains editable as long as its current status has the **Draft** internal type. Once it transitions to a **Finalized** status, editing is no longer allowed.

If the workflow includes a transition back from Finalized to a Draft status, the description can be unlocked and edited again.

## Changing a Description's Status

Status transitions are performed from the description editor or the description overview. Only transitions that are permitted by the workflow configuration and your current role will be available.

## Relationship to Plan Finalization

When a plan is finalized, any descriptions that are not in a Finalized status are automatically set to **Canceled**. This ensures the plan and its descriptions are in a consistent state at finalization.

## Viewing Your Descriptions

All descriptions you have created or are a contributor to are listed on the [My Descriptions](using/descriptions/my-descriptions.md) page, along with their current status.
