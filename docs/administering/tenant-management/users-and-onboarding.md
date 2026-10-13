---
description: The terms and conditions users accept, and the guided tours they see, when they first use the organisation
---

# Users & onboarding

The **Users & onboarding** page sets what people see when they sign in for the first time.

## Authorization

Open to the **System Administrator** and **Organisation Admin** roles. See [Roles](/docs/administering/how-it-fits-together.md#roles).

## Navigation

Switch the sidebar to the **Admin** view, choose **Settings** under **Organisation**, then **Users & onboarding** in the **Communication** group. See [Organisation settings](/docs/administering/tenant-management/tenant-configuration.md).

## Terms and conditions

The terms users must accept before they can use the platform in this organisation. Use the rich-text editor to format the content and link to your terms of service and privacy policy. A preview shows the dialog users see.

- The first save publishes the terms as version 1.
- Editing the text and saving keeps the current version: users who already accepted it are not asked again.
- **Publish as version N** publishes the edited terms as a new version when you save, so every user is asked to accept them again on their next sign-in. **Undo** returns to the current version before saving.

### Acceptance behavior

- On first login to the organisation, a dialog presents the terms and blocks access until the user accepts.
- Each acceptance is recorded against the version the user accepted, together with a timestamp and the user's IP address for auditability.

:::note
There is no fallback to the default organisation. If an organisation has no terms and conditions configured, its users are not shown an acceptance dialog.
:::

## Guided tours

Turn the "what's new" page tours on or off for this organisation. When enabled, users see a short guided tour the first time they open one of the redesigned pages (the Dashboard, My Plans, Start a new plan, Plan Overview, the plan editor and its asset editor, My Assets, Asset Overview) and can replay it from the `Support` menu with `Take a tour of this page`. Turning tours off hides both the automatic first-visit tours and the `Take a tour of this page` entry. See [Guided tours](/docs/using/profile-settings.md#guided-tours) for the user-facing behavior.

:::note
An organisation that has not saved this setting follows the Default organisation's, and the card is then marked **Set by the installation**; tours are on when neither has saved it. Tours are never shown on the public, read-only plan and asset overview pages, regardless of this setting.
:::

:::info
Which tours a user has already seen is stored in that user's own settings, per organisation, not in the organisation settings. Users read and edit only their own settings; only the **System Administrator** and **Installation Manager** roles can manage other users' settings.
:::

---

## See also

- [Organisation settings](/docs/administering/tenant-management/tenant-configuration.md) - The settings hub, and how settings are saved
- [Profile settings](/docs/using/profile-settings.md#guided-tours) - Guided tours as users see them
