---
sidebar_position: 7
title: Who can see your plan
description: Collaborators, the Access field, Public Plans, and publishing to a repository, and what "publish" means in each place of the interface
---

# Who can see your plan

Who can see a plan depends on three separate things: the people you share it with, its **Access** field together with its status, and whether you publish it to a repository.

| | Who sees it | How |
|---|---|---|
| **Collaborators** | The people you invite, with the role you give them | [Work together](/docs/using/plans/invite-collaborators.md) |
| **Public plan** | Anyone, including visitors who are not logged in and members of other organisations | Set **Access** to **Public** and [finalize](/docs/using/plans/plan-workflow.md) the plan |
| **Published plan** | Anyone who opens the repository record | [Publish](/docs/using/plans/deposit-a-plan.md) the plan to a repository and get a DOI |

## Collaborators {#collaborators}

A plan you create is visible to you and to the people you invite. Each collaborator has a role, such as **Owner**, **Editor**, **Reviewer**, or **Viewer**, which decides what they can do; some roles can be limited to specific sections. See [Plan roles](/docs/using/plans/invite-collaborators.md#plan-roles).

Organisation Admins and System Administrators can also see every plan of the organisation.

## The Access field {#access}

Most blueprints include an **Access** question on the plan itself. Its label depends on the blueprint (for example **Access Rights** or *Who can see this plan?*), and it offers two values:

- **Restricted Access**: only the plan's collaborators (and the administrators above) can see the plan.
- **Public**: once the plan is finalized, anyone can see it.

![An Access question titled Who can see this plan, with its help text and the dropdown open on Public and Restricted Access](/images/plans/visibility/access-field.png)
*The Access question in the plan editor*

The Access field has no effect while the plan is a draft: a draft plan is never public. Set it before you finalize, because a finalized plan can no longer be edited. To change it later, [undo the finalization](/docs/using/plans/plan-workflow.md#undo-finalization) if your workflow allows it, or start a [new version](/docs/using/plans/versions.md).

## Public Plans and Public Assets {#public-plans}

A plan that is both finalized and **Public**:

- is listed on the [Public Plans](/docs/using/plans/my-plans.md#public-plans) page, and its finalized assets on [Public Assets](/docs/using/assets/my-assets.md#public-assets);
- opens in a public, read-only overview;
- is visible to visitors who are not logged in, and to members of every organisation in the installation, not only yours;
- is counted on the Dashboard that visitors see (see [Dashboard for visitors who are not logged in](/docs/using/home.md#dashboard-for-visitors-who-are-not-logged-in)).

Signed-in users can also copy a public asset as the starting point of one of their own (see [Copy an existing asset](/docs/using/assets/create-or-edit-an-asset.md#copying-an-existing-asset)).

## Publishing to a repository {#publishing}

**Publish** sends a finalized plan to an external repository, such as Zenodo, and returns a **DOI**. It is separate from the Access field: publishing does not make the plan public in OpenCDMP, and a public plan is not published anywhere until you use **Publish**. The repository record has its own access settings, which you can review before you publish when the repository offers a review step. See [Publish a plan](/docs/using/plans/deposit-a-plan.md).

## What "publish" means where {#publish-meanings}

The interface uses "publish" and "published" in different senses:

| Where | What it means |
|---|---|
| **Publish** button, **Publish to** menu, **Already published** | Depositing the plan in a repository to get a DOI |
| **Published** sort on Public Plans and Public Assets | The date the plan was finalized |
| The **Finalise this item?** dialog: *it'll be published and be publicly available* | The plan will appear on Public Plans, because its Access is Public |
| **Import from a published resource**, when you add an asset | Prefilling the asset from a record that already exists in an external source (see [Prefill an asset](/docs/using/assets/prefill-an-asset.md)) |

## See also

- [Work together](/docs/using/plans/invite-collaborators.md): invite people and choose their roles
- [Change status and finalize a plan](/docs/using/plans/plan-workflow.md): finalize the plan and undo the finalization
- [Publish a plan](/docs/using/plans/deposit-a-plan.md): publish the plan to a repository and get a DOI
