---
sidebar_position: 8
description: Discover everything about profile settings 
---

# My Profile

In **OpenCDMP**, you can view and edit your profile. By clicking profile picture at the top menu bar, the `My Profile Settings` option will be displayed.

![profile settings popup](/images/profile-settings/profile-settings-popup.png)


## Main info
This page appears an editor that contains main user's info 

- **Name**
- **Linked emails**
- **Organization**
- **Role**
- **Time Zone**
- **Format**
- **Language**

:::note
In **My Profile** page you can also switch to another tenant that you have access to
:::

## Link Account
If you have more than one user accounts in **OpenCDMP**, you can **merge** them as one. OpenCDMP supports functionality to **link existing accounts** based on their email. This merge results in all data from secondary accounts being transferred to the primary user account. The `primary` account is the one from which the request is submitted.

If you want to link your account with other press `Link OpenCDMP accounts` button.

![link account](/images/profile-settings/link-account.png)

A pop-up message appears asking you to enter the valid email from the other account you want to link. A confirmation notification is then sent to the selected email.
![link account popup](/images/profile-settings/link-account-popup.png)

:::warning
Linking account is completed only if notification is confirmed 
:::

## Unlink Account
If you have more than one email connected to your account, you can **unlink** them. **OpenCDMP** supports functionality to **ulink existing accounts** based on their email. Unlinking an email will remove the user credentials for it **without affecting your data or other linked emails**. This means that a new account can be created for this email.

If you want to unlink your account press `Unlink` button on one of the linked emails. After that, a confirmation notification is sent to the selected email that want to unlink.

When the notification is confirmed you are taken back to the platform for a final confirmation.

![Unlink confirmation](/images/profile-settings/unlink-confirmation.png)

:::warning
Unlinking account is completed only if notification is confirmed 
:::

## Notification Preferences

In this page you can also set your preferences on which channel you want system notifications to come through. The available channels are `InApp` and `Email`. More details about notifications can be found at the [notificaton service](/docs/supplementary-services/notifications/index.md) section.
:::note
Only notification that have more than one transmission channel are displayed.
:::
