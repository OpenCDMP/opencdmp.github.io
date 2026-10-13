---
description: Build, version, and finalize the asset templates that define the questions of an asset
---
import DocCardList from '@theme/DocCardList';

# Asset Templates

The **Asset Templates** page lists the asset templates of the organisation. From it you create, import, edit, version, and finalize templates.

:::info

**Asset Templates** describe how an [Asset](/docs/using/assets/index.md) is structured. All the sections and questions an Asset consists of are defined here.

:::

By default, the listing shows the `name` of each template with its `code` underneath, its `description`, `status`, `type`, and `version`, and when it was last `updated`. The code is defined when the template is created, cannot change afterwards, and is used internally during imports and exports. At the top right corner of the listing you can also select which columns to display.

:::tip

The `created` timestamp is hidden by default. Turn it on from the **Display settings** button.

:::

You can create new templates by clicking the `Create Asset Template` button at the top right of the page. To import a template from an **XML** file, click the `Import` button, upload the file, and enter a name for the template in the popup form. The imported template is added to the listing as a new template.

The three dots in the last column of a template offer these actions:

- **Edit**: Open the template in the [editor](#edit-form).<br/>*Only `Draft` templates can be edited. For a `Finalised` template the menu shows **View** instead, which opens it read-only.*
- **New Version**: Create a new version of this template.<br/>*This action is available on the current version of a `Finalised` template (more details in [statuses and versions](#statuses)).*
- **Clone**: Open a copy of the template as a new template.
- **All Asset Template Versions**: Open the [version history](/docs/administering/content-management/structure-editor.md#version-history) of this template.<br/>*In the listing, only the latest versions of templates are displayed.*
- **Download XML**: Download the structure of the template in XML format.
- **Delete**

Rows that you cannot edit, which are finalized templates and templates shared by the default organisation, show an eye icon (**View**) and a clone icon next to the menu. They open read-only.

This listing is organisation-scoped and supports the standard [admin listing](/docs/administering/admin-listings.md) controls: scope tabs, search, filter chips, Show deleted, column picker, and density. See that page for details.

## Authorization

Open to the **System Administrator**, **Organisation Admin**, and **Template Manager** roles. Users added as [editors](#editors) of a template can also edit that template. See [Roles](/docs/administering/how-it-fits-together.md#roles).

## Navigation

In the side navigation menu, switch to the **Admin** view and go to **Templates > Asset Templates**.

## This page's filters

- **Status**: its own filter chip. Filter templates by their status. The status can either be `Draft` or `Finalised`.<br/>*By default, no status is selected (more details in [statuses and versions](#statuses)).*
- **Type**: its own filter chip, shown once at least one [asset type](/docs/administering/content-management/types.md) exists. Filter templates by their asset type.<br/>*By default, no type is selected.*

For the search, scope tabs, Show deleted, column picker, and density controls shared with other administration pages, see [Admin listings](/docs/administering/admin-listings.md).

---

## The editor {#edit-form}

When you create, edit, clone, or create a new version of an asset template, the editor opens. Plan blueprints use the same editor, described in [The blueprint and template editor](/docs/administering/content-management/structure-editor.md): the header and banners, the problems panel, the outline, sections, questions and inputs, copying and moving, the Review tab, finalizing, and the version history. The sections below cover what only asset templates have.

### Details tab

Besides the icon, name, code, and description described in [Details tab](/docs/administering/content-management/structure-editor.md#details-tab), the **About this template** card holds:

- **Type**: The [asset type](/docs/administering/content-management/types.md) of the template.
- **Language**: The language the questions are written in.

The **How authors will see it** card previews the template as authors meet it when they add an asset: its icon, name, type, description, and the number of fields and sections.

#### Editors {#editors}

**Editors** are the people who can change this template, in addition to administrators. Click **Manage editors** to open the side panel:

- Search people by name or email to add them. New editors join as members and get an email with a link to the template.
- Use the role button of a person to **Make owner**, **Make member**, or **Remove from template**. Owners and members can both change the template; the role is recorded for your own reference.

On a saved template, changes to editors save immediately, even when the template is finalized. On a new template, they are saved with the template when you first save it.

### Structure tab {#asset-template-outline-form}

The Structure tab works as described in [Structure tab](/docs/administering/content-management/structure-editor.md#structure-tab). **Start with Basics** creates a first section holding the **Title** preset field.

#### Required preset fields {#required-preset-fields}

A [preset field](/docs/administering/content-management/templates/field-types.md#system-fields) stores its answer as a built-in asset property. An asset template must contain the **Title** preset field; while it is missing, click it in the **Required preset fields** bar to add it as a question. **Description** and **Tags** are optional: the bar mentions them while they are missing, and you add them with **Add question** > **Preset field**.

### Review tab

The Review tab previews the template in two moments, **Filling the asset** and **Download**. See [Review tab](/docs/administering/content-management/structure-editor.md#review-tab).

---

## Statuses and versions {#statuses}

A new asset template is a `Draft`. Only `Finalised` templates are offered to authors, and a finalized template cannot be edited again: create a new version, or clone it. Authors keep getting the current version until you finalize the next one, and assets already started stay on the version they were created with. See [Finalizing and new versions](/docs/administering/content-management/structure-editor.md#statuses) and [Version history](/docs/administering/content-management/structure-editor.md#version-history).

---

<DocCardList />
