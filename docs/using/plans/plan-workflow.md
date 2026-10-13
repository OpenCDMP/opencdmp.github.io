---
sidebar_position: 9
title: Change status and finalize a plan
description: Move a plan between statuses, finalize it with the Finalise this item? dialog, decide which assets go with it, and undo the finalization when your workflow allows
---

# Change status and finalize a plan

A plan moves through **statuses** during its life. Your organisation decides which statuses exist and which transitions between them are allowed (see [Plan & asset workflows](/docs/administering/system-configuration/workflows.md)). Every status counts either as a **draft** or as **finalized**:

- A new plan gets the starting status of the workflow, usually a draft status. While the plan is in a draft status, you can change it and save it as often as you need.
- **Finalizing** moves the plan to a finalized status. A finalized plan can no longer be edited, and the roles of its collaborators can no longer change; new collaborators can still be invited.
- If the workflow has a transition back to a draft status, a plan owner can [undo the finalization](#undo-finalization).

Finalizing is not the same as making the plan public or publishing it to a repository. See [Who can see your plan](/docs/using/plans/visibility.md).

## Change the status {#change-the-status}

The status control is the colored pill at the start of the [plan editor](/docs/using/plans/create-or-edit-a-plan.md#the-toolbar) toolbar. It shows the current status, for example **Draft**. Click it to open the **Change plan status** menu, which lists the statuses the workflow lets you move the plan to, each with its icon and, when the organisation has set one, a short description. The [Plan overview](/docs/using/plans/plan-overview.md) shows the status next to the title but does not change it.

![The Change plan status menu open under the Draft status pill in the plan editor toolbar, offering Finalize and Review](/images/plans/plan-workflow/change-plan-status-menu.png)
*Change plan status menu*

The menu entries are disabled, with the tooltip **Save your changes first**, while the plan or one of its assets has unsaved changes, or while you have added assets that are not saved yet.

While another collaborator is editing the plan or one of its assets, the pill cannot be clicked, and its tooltip says why, for example **An asset in this plan is locked by another user** (see [When someone else is editing](/docs/using/plans/invite-collaborators.md#when-someone-else-is-editing)).

The status control is not offered on a previous version of a plan, or once the plan has been [published](/docs/using/plans/deposit-a-plan.md) to a repository.

Moving to a status that is not finalized takes effect at once. The menu shows the action name your organisation gave each move, which can differ from the name of the status it leads to. Moving to a finalized status opens the **Finalise this item?** dialog.

## Finalize a plan {#finalize-a-plan}

Only the plan's **Owners** can finalize it (as can Organisation Admins and System Administrators), and the workflow can restrict who may move the plan to a given status.

:::tip Before you finalize
Set the plan's **Access** field the way you want it (see [Who can see your plan](/docs/using/plans/visibility.md)): it can't change once the plan is finalized. You can still [invite collaborators](/docs/using/plans/invite-collaborators.md) afterwards, but you can't change the roles of those already on the plan.
:::

1. Save or discard your changes.
2. Click the status pill and choose the finalized status. Its label depends on your workflow, for example **Finalize**.
3. Review the **Finalise this item?** dialog, described below.
4. Click **Finalise plan (*N* asset(s))**, or **Cancel** to close the dialog without changing anything.

When the plan is finalized, its [Plan overview](/docs/using/plans/plan-overview.md) opens.

![The Finalise this item? dialog, with the Plan panel reporting that the plan cannot be finalized, the section that needs input with its Fix fields button, and the draft assets of the plan](/images/plans/plan-workflow/finalize-dialog.png)
*Finalise this item? dialog*

### The Finalise this item? dialog {#the-finalise-dialog}

The dialog checks the plan and its assets, and has two panels:

- **Plan** shows the plan's title and description. If required answers are missing, it reads **This Plan can not be finalised** and lists the **Sections needing input**. **Fix fields** next to a section closes the dialog and takes you to that section, with the missing answers marked.
- **Assets** lists the plan's assets with their status. A draft asset with missing required answers is marked **(Invalid)**, with the questions to complete and its own **Fix fields** button.

When the plan itself is complete, the dialog asks **Do you want to finalise any of the following Draft Assets?** and lists the complete draft assets. Tick the ones to finalize together with the plan. Assets that are already finalized stay finalized.

At least one asset must be finalized: until one is (already, or ticked in the list), the dialog shows **You need to have at least one Asset Finalised** and the **Finalise plan** button stays disabled. A plan without assets cannot be finalized: the dialog shows **No Assets for this Plan so far**.

As soon as at least one asset will be finalized with the plan, already or ticked, the dialog also reminds you that you will not be able to edit the plan again. When the plan's Access is **Public**, it notes that the plan becomes publicly available once finalized; when it is **Restricted Access**, it notes that the plan can become public later if its access is opened.

### Assets you leave out {#assets-you-leave-out}

A warning lists every draft asset that will **not** be part of the finalized plan: the ones you did not tick and the incomplete ones. When you finalize:

| Asset status before | What happens |
|---|---|
| Finalized | Stays finalized and is part of the finalized plan. |
| Draft, ticked | Is finalized together with the plan. |
| Draft, not ticked or incomplete | Is set to the canceled status and removed from the plan. |
| Canceled | Is removed from the plan. |

Removed assets no longer appear in the plan, its downloads, or its public view. They cannot be edited, and undoing the finalization does not bring them back. If you want to keep an asset, complete it and tick it, or do not finalize the plan yet. See also [Asset workflow](/docs/using/assets/asset-workflow.md#relationship-to-plan-finalization).

### After finalizing {#after-finalizing}

- The plan is read-only: the Plan overview offers **Preview** instead of **Edit**, and the collaborator list can no longer change.
- Owners can [start a new version](/docs/using/plans/versions.md) to keep working on the plan, and can [publish](/docs/using/plans/deposit-a-plan.md) it to a repository if the status allows it.
- If the plan's Access is **Public**, the plan appears on **Public Plans**, and its finalized assets on **Public Assets**. See [Who can see your plan](/docs/using/plans/visibility.md).
- The plan's collaborators get a notification about the status change.

## Undo finalization {#undo-finalization}

If the workflow has a transition from the finalized status back to a draft status, a plan owner can reopen the plan:

1. Open the plan in the editor (the Plan overview offers **Preview** for a finalized plan).
2. Click the status pill and choose the draft status.
3. Confirm **Undo Finalisation?** with **Yes**.

The plan becomes editable again. Its assets keep their statuses: finalized assets stay finalized until you move them back to a draft status in the [asset editor](/docs/using/assets/create-or-edit-an-asset.md#edit-an-asset), and assets removed at finalization stay removed.

Undoing the finalization is refused:

- once a new version of the plan has been started, with the message **You have already created a new draft version for this plan.** Work on the new version instead;
- on a previous version, once a newer version has been finalized: the status control is no longer offered;
- once the plan has been published to a repository.

## Publishing is not a status {#publishing}

If the current status allows it, usually a finalized one, the plan can be [published](/docs/using/plans/deposit-a-plan.md) to a repository. Publishing is an action, not a status: the plan keeps its finalized status.

:::warning
Once a plan is published, it can no longer change status or be deleted. This cannot be undone. To keep working on it, duplicate it or start a new [version](/docs/using/plans/versions.md).
:::

## See also

- [Who can see your plan](/docs/using/plans/visibility.md): collaborators, the Access field, Public Plans, and publishing
- [Fill in a plan](/docs/using/plans/fill-in-a-plan.md): required questions and the Required fields counter
- [Asset workflow](/docs/using/assets/asset-workflow.md): asset statuses
- [Plan & asset workflows](/docs/administering/system-configuration/workflows.md): how administrators set up statuses and transitions
