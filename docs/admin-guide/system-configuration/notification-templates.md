---
sidebar_position: 10
description: Manage all notification templates
---

# Notification Templates

In this page, there is a listing where you can view details about all the notification templates.

:::info
Notification Templates describe how a notification is structured. There are default templates in [notification service](optional-services/notifications/index.md) but in this page you can create your own.
:::

The information displayed by default is: the `type` of the notifications, the `status`, the `precedence (kind)`, the notification `channel` to which it applies and timestamps for the `creation` and `updates` of the records. At the top right corner of the listing you can also select which columns to display.

:::tip

For notification templates, all the columns are visible by default.

:::

You can also create new or edit / remove notification templates by clicking to the `+ Create Notification Template` button at the top right corner of the page or to the three dots at the last column, respectively.

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role or the tenant specific **TenantConfigManager** role can access this page.

## Navigation

This view is available when the user presses the `Notification Templates` link from the side navigation menu.

## Pagination

Not all the records are being displayed at once. By default, there is a pagination of 10 records applied to them.

You can control how many records are being displayed at any time, by adjusting the `items per page` control at the bottom left corner of the table.

## Filtering

There is a filtering option available for tenants.

- **Is Active**: By toggling this control you can view only the active or only the disabled notification templates.<br/>*By default, this option is set to true.*
- **Type**: You can filter templates by the type which infers to the event this notification template applies to.<br/>*By default, no type is selected.*
- **Kind**: You can filter templates by their precedence.<br/>*By default, no kind is selected.*
- **Channel**: You can filter templates by the channel they are used in.<br/>*By default, no channel is selected.*

:::note

More details about some of the above options are discussed in the editing form section below.

:::

In order for the filters to apply, you have to click the `Apply filters` button. 

You can also clear any filters already applied, by pressing the `clear all filters` option, located at the top of the popup.

---

## Edit form

When you try to add new notification templates or edit existing ones, the **notification template editing form** will appear containing the following sections.

### Main information section

- **Notification Type**: The notification type this template applies to.
- **Language**: The language of the template.
- **Kind**: The precedence of this template. A kind can either be `Draft`, `Primary`, `Secondary` or `Default`.
- **Channel**: The notification channel this template will be used. The channel can be either `Email` or `InApp`.

:::info
To **override** default template that exists in notification service you must select `Primary` for field **Kind** 
:::

### Subject section

For the subject, we can specify the following:

- **Subject Text**: The subject itself.
- **Subject Key**: The key referring to the subject on the template.

### Body section

For the body, we can specify the following:

- **Body Text**: The actual contents of the template.
- **Body Key**: The key referring to the body on the template.

### Extra options section

- **Allow Attachments**: When checked, the notification can have attachments.<br/>*By default, this option is set to false.*
- **Priority Key**
- **CC**
- **CC Mode**: It can either be `Not Override`,`Additive` or `Replace`.
- **BCC**
- **BCC Mode**: It can either be `Not Override`,`Additive` or `Replace`.
- **Extra Data Keys**