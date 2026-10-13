---
sidebar_position: 18
description: Configure the plan lifecycle workflow
---

# Plan Workflow

A **Plan Workflow** defines the lifecycle of a plan — which statuses a plan can move through and in which order. It controls the sequence of states from the moment a plan is created until it is finalized or archived.

:::info
The workflow does not create statuses — it connects them. You must first create [Plan Statuses](/versioned_docs/version-1.x/administering/system-configuration/plan-statuses.md) before you can build a workflow.
:::

## How It Works

A workflow is made up of:

- **Starting Status** — the status automatically assigned to a plan when it is first created.
- **Status Transitions** — pairs of statuses defining which moves are allowed (e.g., from `Draft` → `Under Review`, or `Under Review` → `Finalized`).

When a user attempts to change a plan's status, the platform checks the workflow to determine if that transition is permitted. If no transition exists between the current status and the target status, the change is blocked.

## Where to Configure

Plan Workflow is configured per tenant in [Tenant Configuration](/versioned_docs/version-1.x/administering/tenant-management/tenant-configuration.md) under the **Plan Workflow** section.

:::note
If no workflow is configured for a tenant, the platform uses a built-in default workflow.
:::

## Configuration Steps

### Step 1 — Create Your Plan Statuses

Before configuring the workflow, ensure all statuses you need exist on the [Plan Statuses](/versioned_docs/version-1.x/administering/system-configuration/plan-statuses.md) page. Each status defines:

- Its **Internal Status** (Draft or Finalized) — controls editability
- **Available Actions** (Deposit, Export, Evaluate)
- **Authorization** — who can transition a plan to this status
- **Visual appearance** (color, icon)

### Step 2 — Open Tenant Configuration

Navigate to **Tenant Configuration** from the side navigation and expand the **Plan Workflow** section.

### Step 3 — Set the Starting Status

Select the status that newly created plans will receive. This is typically a status with `Internal Status: Draft` so plans are editable from creation.

### Step 4 — Define Status Transitions

Click **Add status transition** to define each allowed move:

- **From Status** — the status the plan is currently in
- **To Status** — the status the plan is allowed to move to

Add one transition for each allowed move. For example:

| From Status | To Status |
|-------------|-----------|
| `Draft` | `Under Review` |
| `Under Review` | `Draft` |
| `Under Review` | `Finalized` |
| `Finalized` | `Draft` |

This example creates a review cycle where plans can be sent for review, returned to draft for revisions, or finalized from review.

:::tip
Include reverse transitions (e.g., `Finalized → Draft`) if you want plans to be "un-finalized" — for example, to allow corrections after finalization.
:::

### Step 5 — Save

Save the Tenant Configuration. The new workflow takes effect immediately for all plans in this tenant.

## Example Workflows

### Simple Two-Status Workflow

The minimal workflow — suitable for small teams or straightforward use cases.

| Status | Internal Status | Transitions To |
|--------|----------------|----------------|
| `Draft` | Draft | `Finalized` |
| `Finalized` | Finalized | `Draft` |

Starting status: `Draft`

### Review Workflow

A three-status workflow with an intermediate review step.

| Status | Internal Status | Available Actions | Transitions To |
|--------|----------------|-------------------|----------------|
| `Draft` | Draft | Export | `Submitted for Review` |
| `Submitted for Review` | Draft | Export | `Draft`, `Finalized` |
| `Finalized` | Finalized | Deposit, Export, Evaluate | `Draft` |

Starting status: `Draft`

This workflow allows:
- Authors to submit their plan for review
- Reviewers to either return it to Draft (for corrections) or finalize it
- Finalized plans to be re-opened if needed

### Multi-Stage Approval Workflow

For organizations requiring multiple approval stages.

| Status | Internal Status | Transitions To |
|--------|----------------|----------------|
| `Draft` | Draft | `Department Review` |
| `Department Review` | Draft | `Draft`, `Management Approval` |
| `Management Approval` | Draft | `Department Review`, `Finalized` |
| `Finalized` | Finalized | — |

Starting status: `Draft`

## Authorization and Transitions

Each status defines **who can transition a plan into it** via its authorization settings. This means:

- You can restrict who can finalize a plan (e.g., only Owners or TenantAdmins)
- You can allow contributors to submit for review but not finalize
- You can make certain statuses only reachable by administrators

Review the authorization settings of each status when designing your workflow.

## Relationship to Plan Statuses

The workflow references statuses by their configuration. If a status is edited or deactivated, review the workflow to ensure it remains consistent.

## See Also

- [Plan Statuses](/versioned_docs/version-1.x/administering/system-configuration/plan-statuses.md) — Create and configure individual plan statuses
- [Tenant Configuration](/versioned_docs/version-1.x/administering/tenant-management/tenant-configuration.md) — Where workflow is configured
- [Plan Workflow (User Guide)](/versioned_docs/version-1.x/using/plans/plan-workflow.md) — How users interact with the workflow
