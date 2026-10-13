---
sidebar_position: 5
description: Manage the statuses of comment threads
---

# Comment Statuses

The **Comment statuses** page lets administrators define the states a comment thread can be in, so that reviews of plans and assets follow clear stages.

## Why comment statuses matter

With comment statuses, reviewers and plan owners can:

- See which comments have been addressed and which are still pending.
- Move comments through defined review stages, for example from *Open* to *Resolved*.
- Agree on the state of a comment without other tools.
- Document the review process for audits or institutional requirements.

## How comments work in OpenCDMP

[Comments](/docs/optional-services/annotations.md) can be added to plans and assets by users with the **Reviewer** plan role, among others. Each comment thread can be given one of the statuses defined on this page, for example *Open*, *In Progress*, or *Resolved*. A status can count as **Resolved**, which tells the platform that the thread has been dealt with.

## Managing comment statuses

The listing shows the comment statuses available in your organisation. The columns are the **Label**, **Counts as** (the internal status), and the **Created** and **Updated** dates. Statuses shared by the default organisation carry a **Shared** chip and can be viewed, but not edited, from other organisations. Use the **Display settings** button at the top right to choose which columns are visible.

Click **Add comment status** at the top of the page to create a status. Click a row to open its editor; to delete a status, click the three dots menu at the end of its row and select **Delete**.

This listing supports the standard [admin listing](/docs/administering/admin-listings.md) controls: search, filter chips, Show deleted items, column picker, and density. It has no scope tabs.

:::warning

When a comment status that is in use by existing comments is deleted, the status is automatically removed from those comments as well.

:::

## Editor

Comment statuses open in a full-page editor with two fields:

- **Label**: The name of the status.<br/>*This is required.*
- **Counts as**: The internal status: **Resolved**, or **None**.

Click **Save** to save, **Delete** to delete the status, or **Cancel** to return to the listing.

## Authorization

Users with the **System Administrator** or **Organisation Admin** role can access this page and create, edit, and delete comment statuses. See [Roles](/docs/administering/how-it-fits-together.md#roles).

## Navigation

In the side navigation menu, switch to the **Admin** view, go to **Organisation > Settings**, and open **Comment statuses** (in the **Workflows** group of the section menu).

## This page's filters

- **Counts as**: its own filter chip. You can filter statuses by their internal status. You can select one or more values.<br/>*By default, no value is selected.*

For the search, Show deleted items, column picker, and density controls shared with other administration pages, see [Admin listings](/docs/administering/admin-listings.md).
