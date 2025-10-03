---
sidebar_position: 14
description: Manage all annotation statuses
---

# Annotation Statuses

This page allows administrators to define and manage the lifecycle of review comments (annotations) in OpenCDMP, enabling structured review workflows for plans and descriptions.

## Why Annotation Statuses Matter

Annotation statuses provide a formal review and quality assurance process by:

- **Tracking review progress** - Monitor which comments have been addressed vs. pending
- **Enabling structured workflows** - Define clear stages for the review process (e.g., Open → Resolved → Closed)
- **Improving collaboration** - Reviewers and plan owners can communicate status without additional tools
- **Ensuring accountability** - Track who resolved comments and when
- **Supporting compliance** - Document the review process for auditing or institutional requirements

## How Annotations Work in OpenCDMP

[Annotations](optional-services/annotations.md) (comments) can be added to plans and descriptions by users with the **Reviewer** role. Each annotation has a status that tracks its lifecycle:

1. **Created** - A reviewer adds a comment or question
2. **In Progress** - The plan owner or contributor is addressing the feedback
3. **Resolved** - The issue has been addressed
4. **Closed** - The comment thread is finalized

By customizing annotation statuses, you can adapt the review workflow to your organization's needs.

## Managing Annotation Statuses

In this page, you can view, create, edit, and manage all annotation statuses available in your tenant.

The information displayed by default is: the `label`, the `internal status` which is the system specific status, the `status` of the entity and timestamps for the `creation` and `updating` of the entities. At the top right corner of the listing you can also select which columns to display.

:::tip

For annotation statuses, all the columns are visible by default.

:::

You can edit or remove a status by clicking on the three dots on the far right corner of the records and then select `Edit` or `Delete` respectively.

:::warning

When an annotation status that is in use by existing annotations is deleted, the status is automatically removed from those annotations as well.

:::

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role can access this page.

## Navigation

This view is available when the user presses the `Annotation Statuses` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them. 

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There are some filtering options available for annotation statuses.

- **Is Active**: By toggling this control you can view only the active or only the disabled annotation statuses.<br/>*By default, this option is set to true.*
- **Internal Status**: You can filter statuses by the internal status they could relate with. You can select one or more statuses.<br/>*By default, no status is selected.*

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.