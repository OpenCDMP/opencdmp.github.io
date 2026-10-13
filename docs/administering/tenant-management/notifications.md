---
description: The channels each notification of the organisation uses, and which channel is tried first
---

# Notifications

The **Notifications** page sets how people are told about events: which channels each notification may use, and which one is tried first.

## Authorization

Open to the **System Administrator** and **Organisation Admin** roles. See [Roles](/docs/administering/how-it-fits-together.md#roles).

## Navigation

Switch the sidebar to the **Admin** view, choose **Settings** under **Organisation**, then **Notifications** in the **Communication** group. See [Organisation settings](/docs/administering/tenant-management/tenant-configuration.md).

## Channels

A table lists every notification, grouped by topic (**Plans**, **Assets**, **Comments**, **Account**, **Support**), with a column per channel, such as **In App** and **Email**:

- Tick the channels each notification may use. Every notification keeps at least one channel. A dash marks a channel the notification does not support.
- In the **Try first** column, choose which of the ticked channels is tried first; the platform falls back to the next one. A notification with a single channel shows it as *only*, for example *Email only*.

These defaults apply to all users of the organisation. Users can still choose which channel comes first in their [profile](/docs/using/profile-settings.md#notifications).

![The Channels per notification table of the Notifications page: the Plans group with In App and Email ticked for most notifications, In App chosen under Try first, and Plan Invitation External User marked Email only](/images/administering/settings/notifications-channels.png)

---

## See also

- [Organisation settings](/docs/administering/tenant-management/tenant-configuration.md) - The settings hub, and how settings are saved
- [Notification templates](/docs/administering/system-configuration/notification-templates.md) - The wording of every email and in-app message
- [Email notifications](/docs/optional-services/notifications/email.md) - The notification service behind the channels
