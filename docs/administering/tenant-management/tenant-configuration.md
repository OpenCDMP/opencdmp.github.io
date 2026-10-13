---
sidebar_position: 1
description: The Settings hub of an organisation, how its settings are saved, and where each settings page is documented
---

# Organisation settings

The organisation settings let administrators configure the organisation they are working in: its branding, the defaults of new users, the plugins it offers and their settings, its workflows, what plans and lists show first, notifications, and what users see when they sign in for the first time.

Each settings page is described on a page of its own, listed [below](#settings-pages) in the order of the menu.

## Authorization

The settings hub is open to the **System Administrator** and **Organisation Admin** roles. The **Content & Workflow Manager** role reaches only some of its pages: **Languages & texts**, **Plan & asset workflows**, **Help pages & legal**, and **Notification templates**; for this role, **Settings** opens on **Plan & asset workflows**. The menu lists only the pages you can open. See [Roles](/docs/administering/how-it-fits-together.md#roles).

## Navigation

Switch the sidebar to the **Admin** view and choose **Settings** under **Organisation**. The page opens on the **Overview**, and a menu on the left leads to each page, in groups: **Appearance**, **Integrations**, **Workflows**, **Content**, and **Communication**.

---

## How settings are saved

Each group of settings shows the value that applies to the organisation, and where it comes from:

- **Default**: neither the organisation nor the Default organisation has saved a value, so the built-in value applies.
- **Set by the installation**: the organisation follows the value the Default organisation saved (see [what falls back](/docs/administering/how-it-fits-together.md#the-default-organisation-and-inheritance)). The value is shown read-only. **Use your own value** starts the organisation's own copy of it, which you can then edit; saving creates it, and **Discard** goes back to the shared value.
- **Changed**: the organisation has its own value. **Reset to default** removes it, after a confirmation, so the Default organisation's value, or the built-in one, applies again.

![The Blueprint for new plans card of an organisation that follows the Default organisation: the tag Set by the installation, the Use your own value link, and the shared blueprint shown read-only](/images/administering/settings/setting-inherited.png)

Changes are not stored until you save. While a page has unsaved changes, a bar at the bottom shows how many places changed, with **Save changes** and **Discard**. Settings that need attention (for example a required field left empty) are reported there, and saving waits until they are fixed. Leaving a page with unsaved changes asks for confirmation first.

Languages & texts, Webhooks, Plan & asset workflows, Comment statuses, Help pages & legal, and Notification templates also open inside the hub.

---

## Overview

A card for each page of the hub, grouped as in the menu, with a short description. For the pages that store organisation settings, the card also shows their state: *Using the defaults*, or how many of its settings are customized and when they were last updated, and how many follow the Default organisation (*set by the installation*). The **Plugins** card shows how many plugins are offered to users and how many are not responding. Click a card to open its page.

![The Overview page of the organisation settings: the section menu on the left and a card for each page, grouped as Appearance, Integrations, Workflows, Content, and Communication](/images/administering/settings/settings-overview.png)

---

## Settings pages

### Appearance

#### Branding {#branding}

Main color, logo, and custom style variables. See [Branding](/docs/administering/tenant-management/branding.md).

#### Language & region {#language--region}

The default language, timezone, and format of new users. See [Language & region](/docs/administering/tenant-management/language-and-region.md).

#### Languages & texts

The languages people can pick, and your own wording for any text. See [Languages & texts](/docs/administering/system-configuration/languages.md).

### Integrations

#### Plugins {#plugins}

Export formats, repositories, and evaluators: offer or hide them, connect your own, and adjust their settings. See [Plugins](/docs/administering/tenant-management/plugins.md), and on that page:

- <a id="add-a-plugin"></a>[Add a plugin](/docs/administering/tenant-management/plugins.md#add-a-plugin): connect a plugin that runs outside the installation.
- <a id="plugin-page"></a>[Plugin page](/docs/administering/tenant-management/plugins.md#plugin-page): a plugin's settings and connection.
- <a id="repositories"></a>[Repositories](/docs/administering/tenant-management/plugins.md#repositories): the settings that decide how users publish plans.

#### Webhooks

Addresses that are called when plans and assets change. See [Webhooks](/docs/administering/webhooks.md).

### Workflows

#### Plan & asset workflows

The statuses plans and assets move through, and who can move them. See [Plan & asset workflows](/docs/administering/system-configuration/workflows.md).

#### Comment statuses

The states a comment thread can be in. See [Comment statuses](/docs/administering/system-configuration/annotation-statuses.md).

### Content

#### Content defaults {#content-defaults}

What people see first when they start a plan and browse the lists. See [Content defaults](/docs/administering/tenant-management/content-defaults.md), and on that page:

- <a id="blueprint-for-new-plans"></a>[Blueprint for new plans](/docs/administering/tenant-management/content-defaults.md#blueprint-for-new-plans): the blueprint pre-selected for a new plan.
- [Featured blueprints and asset templates](/docs/administering/tenant-management/content-defaults.md#featured-blueprints-and-asset-templates): what is offered first.
- <a id="references-shown-in-lists"></a>[References shown in lists](/docs/administering/tenant-management/content-defaults.md#references-shown-in-lists): the reference types shown on the rows of My Plans and My Assets.

#### Help pages & legal

The FAQ, user guide, and policy pages. See [Help pages & legal](/docs/administering/system-configuration/supportive-material.md).

### Communication

#### Notifications {#notifications}

The channels each notification uses, and which is tried first. See [Notifications](/docs/administering/tenant-management/notifications.md).

#### Notification templates

The wording of every email and in-app message. See [Notification templates](/docs/administering/system-configuration/notification-templates.md).

#### Users & onboarding {#users--onboarding}

What people see when they sign in for the first time. See [Users & onboarding](/docs/administering/tenant-management/users-and-onboarding.md), and on that page:

- <a id="terms-and-conditions"></a>[Terms and conditions](/docs/administering/tenant-management/users-and-onboarding.md#terms-and-conditions): the terms users accept, and their versions.
- <a id="guided-tours"></a>[Guided tours](/docs/administering/tenant-management/users-and-onboarding.md#guided-tours): turn the page tours on or off.
