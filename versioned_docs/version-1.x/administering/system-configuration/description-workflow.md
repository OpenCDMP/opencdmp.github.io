---
sidebar_position: 19
description: Configure the description lifecycle workflow
---

# Description Workflow

A **Description Workflow** defines the lifecycle of a description — which statuses a description can move through and in which order. It mirrors the concept of the [Plan Workflow](/versioned_docs/version-1.x/administering/system-configuration/plan-workflow.md) but applies to individual descriptions within a plan.

:::info
The workflow does not create statuses — it connects them. You must first create [Description Statuses](/versioned_docs/version-1.x/administering/system-configuration/description-statuses.md) before you can build a workflow.
:::

## How It Works

A description workflow is made up of:

- **Starting Status** — the status automatically assigned to a description when it is first created.
- **Status Transitions** — pairs of statuses defining which moves are allowed (e.g., from `Draft` → `Complete`).

## Where to Configure

Description Workflow is configured per tenant in [Tenant Configuration](/versioned_docs/version-1.x/administering/tenant-management/tenant-configuration.md) under the **Description Workflow** section.

:::note
If no workflow is configured for a tenant, the platform uses a built-in default workflow.
:::

## Internal Statuses

Description statuses map to three internal states, which control platform behavior:

| Internal Status | Description Behavior |
|----------------|----------------------|
| `Draft` | The description is editable |
| `Finalized` | The description is read-only |
| `Canceled` | The description is read-only. Used automatically by the platform when a plan is finalized and a description is not included |

## Configuration Steps

### Step 1 — Create Your Description Statuses

Ensure all required statuses exist on the [Description Statuses](/versioned_docs/version-1.x/administering/system-configuration/description-statuses.md) page. Each status defines:

- Its **Internal Status** (Draft, Finalized, or Canceled)
- **Available Actions** (Export)
- **Authorization** — who can transition a description to this status
- **Visual appearance** (color, icon)

### Step 2 — Open Tenant Configuration

Navigate to **Tenant Configuration** from the side navigation and expand the **Description Workflow** section.

### Step 3 — Set the Starting Status

Select the status that newly created descriptions will receive. This should be a status with `Internal Status: Draft`.

### Step 4 — Define Status Transitions

Click **Add status transition** to define each allowed move:

- **From Status** — the status the description is currently in
- **To Status** — the status the description is allowed to move to

### Step 5 — Save

Save the Tenant Configuration. The new workflow takes effect immediately.

## Example Workflows

### Simple Workflow

| Status | Internal Status | Transitions To |
|--------|----------------|----------------|
| `Draft` | Draft | `Complete` |
| `Complete` | Finalized | `Draft` |

Starting status: `Draft`

### Review Workflow

| Status | Internal Status | Available Actions | Transitions To |
|--------|----------------|-------------------|----------------|
| `Draft` | Draft | Export | `Ready for Review` |
| `Ready for Review` | Draft | Export | `Draft`, `Approved` |
| `Approved` | Finalized | Export | `Draft` |

Starting status: `Draft`

## Relationship to Plan Finalization

When a plan is finalized, the platform automatically handles descriptions that were not explicitly included in the finalization — those descriptions receive the `Canceled` internal status. Ensure your workflow includes a status mapped to `Canceled` internal status if you need to display canceled descriptions distinctly.

## See Also

- [Description Statuses](/versioned_docs/version-1.x/administering/system-configuration/description-statuses.md) — Create and configure individual description statuses
- [Plan Workflow](/versioned_docs/version-1.x/administering/system-configuration/plan-workflow.md) — The equivalent workflow for plans
- [Tenant Configuration](/versioned_docs/version-1.x/administering/tenant-management/tenant-configuration.md) — Where workflow is configured
