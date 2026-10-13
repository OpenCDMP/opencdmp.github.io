---
sidebar_position: 2
description: Learn about the email notifications.
---

# Email Notifications

Email notifications are sent to users' registered email addresses to keep them informed of activity outside the platform.

## What triggers an email notification

The following events can generate email notifications:

| Event | Description |
|---|---|
| Plan invitation (new user) | You were invited to collaborate on a plan and do not yet have an account |
| Plan invitation (existing user) | You were invited to collaborate on a plan |
| Plan modified | A plan you are involved in was updated |
| Plan status changed | A plan you are involved in changed status |
| Plan finalized | A plan you are involved in was finalized |
| Plan deposited | A plan you are involved in was deposited to a repository and received a DOI |
| Plan evaluation completed | An evaluation was run on a plan you are involved in |
| Plan role added | You were assigned a role on a plan |
| Plan role changed | Your role on a plan was changed |
| Plan role removed | A role you held on a plan was removed |
| Plan access removed | Your access to a plan was removed |
| Annotation created | A comment was added to a plan or asset you are involved in |
| Annotation status changed | A comment's status was updated |
| Mentioned in annotation | You were @-mentioned in a comment |
| Asset created | An asset was added to a plan you are involved in |
| Asset modified | An asset you are involved in was updated |
| Asset status changed | An asset you are involved in changed status |
| Asset finalized | An asset you are involved in was finalized |
| Asset evaluation completed | An evaluation was run on an asset of a plan you are a member of |
| Asset template invitation | You were added to the users of an asset template |
| Organisation invitation (new user) | You were invited to join an organisation and do not yet have an account |
| Organisation invitation (existing user) | You were invited to join an organisation |
| Plan suggestion | An external system suggested a new plan, or changes to a plan |
| Contact support | A user sent a message with the support form; it goes to the installation's support address |
| Account merge confirmation | A request to link two accounts requires your email confirmation |
| Credential removal confirmation | A request to unlink an email requires your email confirmation |

:::info
Which of these events generate email notifications depends on the notification templates configured by your administrator. Users choose which channel comes first in their [profile](/docs/using/profile-settings.md#notifications).
:::

## Configuration

The mail server used to send notifications is configured during the [Notification Service](/docs/deployment/configuration/backend/notification.md) setup. Administrators configure the SMTP server, sender address, and per-notification templates.

## User preferences

Each organisation decides which channels every notification may use, and which one is tried first (see [Notifications](/docs/administering/tenant-management/tenant-configuration.md#notifications) in the organisation settings).

Users then choose, in the **Notifications** tab of their [profile](/docs/using/profile-settings.md#notifications), which channel comes first, per group of notifications or per notification. The choice changes only the order of the channels; it does not turn any channel off.
