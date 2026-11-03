---
description: The slides on members' Dashboard, the terms and conditions users accept, and the guided tours they see when they first use the organisation
---

# Users & onboarding

The **Users & onboarding** page sets what people see when they first sign in, and the information on their Dashboard.

## Authorization

Open to the **System Administrator** and **Organisation Admin** roles. See [Roles](/docs/administering/how-it-fits-together.md#roles).

## Navigation

Switch the sidebar to the **Admin** view, choose **Settings** under **Organisation**, then **Users & onboarding** in the **Communication** group. See [Organisation settings](/docs/administering/tenant-management/tenant-configuration.md).

## Information on the Dashboard {#information-on-the-dashboard}

The slides every member of the organisation sees at the top of their [Dashboard](/docs/using/home.md#recommended), one at a time. Changes on this card are saved at once, without the save bar of the other settings.

Without slides of its own, the organisation's members see the Default organisation's slides, all of them and never mixed with yours. The empty card says so, except in the Default organisation itself. Deleting your last slide returns to the Default organisation's slides.

### Adding a slide

**Add slide** offers two kinds:

- **Content slide**: your own title and text, with an image and a button if you want them. It opens the **Edit slide** panel.
- **Recommended blueprints and templates**: the blueprints and asset templates chosen under [Featured blueprints and asset templates](/docs/administering/tenant-management/content-defaults.md#featured-blueprints-and-asset-templates). It is added to the list at once, and an organisation can have only one, so the choice reads **Already added** once it exists.

A new slide is shown on the Dashboard as soon as it is saved, unless its **Show from** date is still to come.

### The list of slides

Each row shows the slide, its languages, when it is shown, and its **On the Dashboard** switch:

- **When** reads **Always**, **From** or **Until** a date, or **Ended** and the date once the **Show until** date has passed. A slide that has ended is not shown to members and stays in the list until you delete it.
- **On the Dashboard** shows or hides a slide without deleting it.
- Drag a slide, or use **Move up** and **Move down** in its menu, to change the order on the Dashboard. The recommended slide is moved like any other.
- On a content slide, **Edit** opens the **Edit slide** panel, and the menu offers **Duplicate** and **Delete**. A duplicate starts with the same texts, image, button, and dates.
- On the recommended slide, the row says how many items it shows, for example *7 items from Content defaults · 3 slides on the Dashboard*, since every three items make one slide. **Change items** opens Content defaults. With no featured items the row reads *No items chosen yet in Content defaults*, and the slide is not shown.

### The Edit slide panel

At the top, **How the slide looks** previews the slide in the language whose tab is open, cut where the Dashboard cuts long texts.

**Text in each language** holds what is translated, with one tab per language:

- **Title**, **Text** (with the rich-text editor of Help pages & legal), and the **Button text** when the slide has a button.
- The organisation's default language, set under [Language & region](/docs/administering/tenant-management/language-and-region.md), comes first and is required. **Add language** adds a tab for another language, and **Remove** drops it again. Members whose language has no text see the default language's text.
- The slide shows the first lines of the text. A longer text gets **Read more** on the Dashboard, which opens the whole slide in a window.

**For all languages** holds what is the same in every language:

- **Image**: shown on the right of the text. Without an image, the text takes the whole width. Images are not shown on narrow screens. Under the image, **Fill** covers the whole area and may crop the image, and **Fit** shows the whole image, which suits a logo.
- **Button**: **URL** opens a web page in a new tab, and **Email** starts an email to the address you enter. Select the chosen kind again to remove the button.
- **Show from** and **Show until**: optional dates for news or events. The slide appears and disappears by itself, counting whole days.

### Hiding the slides

Members can fold the section with **Hide**, and their choice is kept in their own settings. The section opens again for them when a slide is added, or when the text, image, or button of a slide changes. Reordering slides, switching them on or off, and changing their dates do not open it again.

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
- [Dashboard](/docs/using/home.md#recommended) - The slides as members see them
- [Content defaults](/docs/administering/tenant-management/content-defaults.md#featured-blueprints-and-asset-templates) - The items of the recommended slide
- [Profile settings](/docs/using/profile-settings.md#guided-tours) - Guided tours as users see them
