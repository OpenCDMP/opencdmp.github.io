---
sidebar_position: 2
description: Learn about the email notifications.
---

# Email Notifications

Email notifications are sent to users' registered email addresses to keep them informed of activity outside the platform.

## What Triggers an Email Notification

The following events can generate email notifications:

| Event | Description |
|---|---|
| Plan invitation (new user) | You were invited to collaborate on a plan and do not yet have an account |
| Plan invitation (existing user) | You were invited to collaborate on a plan |
| Plan status changed | A plan you are involved in changed status |
| Plan finalized | A plan you are involved in was finalized |
| Plan deposited | A plan you are involved in was deposited to a repository and received a DOI |
| Plan evaluation completed | An evaluation was run on a plan you are involved in |
| Plan access removed | Your access to a plan was removed |
| Your role changed | Your role on a plan was changed |
| Annotation created | A comment was added to a plan or description you are involved in |
| Annotation status changed | A comment's status was updated |
| Mentioned in annotation | You were @-mentioned in a comment |
| Description status changed | A description you are involved in changed status |
| Description finalized | A description you are involved in was finalized |
| Account merge confirmation | A request to link two accounts requires your email confirmation |
| Credential removal confirmation | A request to unlink an email requires your email confirmation |

:::info
Which of these events generate email notifications depends on the notification templates configured by your administrator. Users can control their email preferences in [Profile Settings](/versioned_docs/version-1.x/using/profile-settings.md).
:::

## Configuration

The mail server used to send notifications is configured during the [Notification Service](/versioned_docs/version-1.x/deployment/configuration/backend/notification.md) setup. Administrators configure the SMTP server, sender address, and per-notification templates.

## User Preferences

Users can choose which notifications they receive via email in their [Profile Settings](/versioned_docs/version-1.x/using/profile-settings.md) under **Notification Preferences**. Only notifications that support more than one delivery channel (in-app and email) will appear as a preference option.
