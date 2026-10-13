## Overview

The reviewing process in OpenCDMP allows collaborators to leave comments on specific questions within a plan or description. Comments are organized into threads attached directly to each question, making it easy to discuss and resolve issues in context.

The annotation system is provided by the [Annotations Service](/versioned_docs/version-1.x/optional-services/annotations.md) and must be enabled for your instance.

## Opening the Comment Panel

Every question in a plan or description has a **comments icon** next to its title. The number shown on the icon indicates how many open comments exist for that question.

Click the icon to open the comment panel for that question. The panel shows all existing comment threads and allows you to add new ones.

## Creating a Comment

In the comment panel, type your message in the text input at the bottom and press **Send**.

When creating a comment you can choose its **visibility**:

- **Visible** — all users with access to the plan or description can see this comment. Other users are notified when a visible comment is posted.
- **Hidden** — only you (the author) can see this comment. Use this for personal notes or draft thoughts.

## Replying to a Comment

Click **Reply** on any existing comment to add a response in the same thread. Threads keep related discussion together and are displayed in chronological order.

## Mentioning Users

Type `@` in the comment text to mention a specific user. A dropdown appears with matching users who have access to the plan or description. Select a user to include their mention in your comment.

Mentioned users receive a notification about your comment.

## Changing Comment Status

Each comment can be assigned a status to track its resolution. Click the status indicator on a comment to open the status dropdown and select a new status.

The available statuses are configured by your administrator on the [Annotation Statuses](/versioned_docs/version-1.x/administering/system-configuration/annotation-statuses.md) page. Common examples include: `Open`, `Resolved`, `Rejected`.

When a comment's status changes, the other users involved in that thread are notified.

## Sharing a Direct Link

Each comment panel has a **link icon** at the top right. Clicking it copies a direct link to that question's annotation panel to your clipboard. This link opens the plan or description and scrolls directly to the relevant question with the comment panel open.

Direct links are also included in the email notifications sent to users.

## Notification Behaviour

The platform sends notifications when:

- A visible comment is posted on a question in a plan or description you have access to
- A comment you are involved in changes status
- You are mentioned in a comment

Notification preferences can be adjusted in your [Profile Settings](/versioned_docs/version-1.x/using/profile-settings.md).
