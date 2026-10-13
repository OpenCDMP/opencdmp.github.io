---
sidebar_position: 1
sidebar_label: DOCX Templates
description: Manage the Word templates the DOCX file transformer uses for DOCX and PDF exports of plans and assets
---

# DOCX Transformer — Managing templates

The [DOCX file transformer](https://hub.docker.com/r/opencdmp/file-transformer-docx) exports [plans](/docs/using/download.md#where-to-export-from) and [assets](/docs/using/download.md#download-an-asset) as Word documents, and as PDF files converted from the same document. What an export looks like is decided by two things:

- **A template**: a Word (`.docx`) file that sets the page design (cover, fonts, colors, headers and footers) and marks with tags where the plan's content goes.
- **Export settings**: options such as where assets appear, how references are laid out, which facts the cover shows, and the texts used. They change the export without editing any template. See [Export settings](docx-export-settings.md).

The transformer ships with a built-in template for plans and one for assets. Most organisations only need the export settings. A custom template is for organisations that need their own layout, for example a funder's required document structure or a corporate cover page.

## Where templates apply

A template can be set at three levels. For each export the transformer uses the most specific one:

| Level | Applies to | Set in |
|---|---|---|
| Asset template | Exports of assets made from that asset template | The asset template editor, **Details** tab, **Export template** card |
| Blueprint | Exports of plans that use that blueprint | The blueprint editor, **Details** tab, **Export template** card |
| Organisation | Every other plan or asset export of the organisation | [Organisation settings](/docs/administering/tenant-management/plugins.md#plugin-page): **Settings** → **Plugins** → **docx-file-transformer** → **Configure** → **Settings** → **Templates & branding** |
| Built-in | Everything else | Shipped with the transformer |

Plan templates and asset templates are separate settings (**Plan template** and **Asset template**). A plan export never uses an asset template file, and the other way round.

The same order applies to every export setting, not only to the template. A setting left empty on a blueprint or asset template follows the organisation's value, and a setting left empty there follows the transformer's default. In the blueprint and asset template editors, such settings are marked **From organisation settings**; at the organisation level they are marked **Plugin default**.

:::tip
Change a setting only at the level where it should differ. For example, set the accent color once for the organisation, and set a blueprint's own template only for the funder that requires it.
:::

## Start from the built-in template

The quickest way to a custom template is to adapt the built-in one:

1. Open the settings page of the DOCX transformer (**Settings** → **Plugins** → **docx-file-transformer** → **Configure** → **Settings**), or the **Export template** card on the **Details** tab of a blueprint or asset template, where **Customize** shows the settings.
2. Under **Plan template** (or **Asset template**), click **Download the built-in template**.
3. Open the file in Microsoft Word or LibreOffice Writer.

The built-in templates embed their fonts (Noto Sans), so a template adapted from them looks the same on every computer and in the PDF conversion.

## Customize a template

Edit the downloaded file like any Word document, keeping the tags in place:

- **Page design**: change the cover, margins, headers and footers, add your organisation's logo as an image, add fixed text (for example a funder's instructions or a disclaimer).
- **Styles**: generated content (headings, questions, answers, tables, the key facts table) uses named styles such as *Heading 1*, *OpenCDMP Question* and *OpenCDMP Answer*. Restyle it by modifying these styles in Word (**Home** → **Styles** → **Modify**), not by formatting individual paragraphs. The styles are listed in the [template reference](docx-template-reference.md#styles).
- **Structure**: move, remove or repeat tags. For example, delete the table of contents block to never print one, or move `{{>plan.facts}}` to the end of the document. Every tag and the data it gives access to is described in the [template reference](docx-template-reference.md).

Keep these rules in mind:

- Type tags in one go, or paste them as plain text. When Word splits a tag across formatting runs (for example because part of it was corrected or reformatted), the transformer cannot read it. Retyping the tag fixes it.
- Put content tags (`{{>…}}`) alone in their paragraph. Their paragraph style is used for the content they insert.
- Keep the accent color `#2457C5` wherever the configured **Accent colour** setting should apply. The transformer replaces this exact color (and its light tint in table headers) with the configured one.
- Use `{{…}}` tags only. The older `'{OPENCDMP.…}'` placeholders are no longer supported; see [Templates with `'{OPENCDMP.…}'` placeholders](#templates-with-opencdmp-placeholders).

## Upload a template

Upload the file in the **Plan template** or **Asset template** setting at the level where it should apply, then save.

### Validation on upload

Wherever you upload a template, the platform sends it to the transformer for a check and lists the outcome under the uploader. On the settings page of the DOCX transformer and in the **Export template** card of blueprints and asset templates, a template saved earlier is also checked when the page opens:

- **Warnings**: for example an unknown tag name, which renders empty, a plan template that never loops over `chapters` (so the plan's content would be missing), or an asset template that never renders `asset.body`. The template still works, but the flagged parts may not render as you expect.
- **Errors**: for example a file that is not a valid Word document, a tag that is opened and never closed, or `'{OPENCDMP.…}'` placeholders. Exports are likely to fail with this template, or, for placeholders, to use the built-in template instead.

The check is advisory: you can save regardless of the outcome, and upload a corrected file at any time. Plan template uploads are checked as plan templates and asset template uploads as asset templates, so an asset-only tag in a plan template is reported. If the transformer is unreachable, no result is shown and the upload proceeds.

## Check the result

The settings page of the DOCX transformer shows a **Preview**: one of your plans, rendered as a PDF with the settings as they are being edited, including settings not yet saved. Use **Preview with** to search for another plan, and **Download PDF** to keep the result.

:::note
A newly uploaded file (logo or template) appears in the preview after the settings are saved. Blueprint and asset template overrides still apply in the preview, as in a real export.
:::

To check a blueprint's or asset template's own template, export a plan or asset that uses it.

## Replace, remove or reset a template

- **Replace**: upload a new file in the same setting and save. The previous file is discarded.
- **Remove**: remove the file in the uploader and save. Exports then use the template of the broader level (organisation, then built-in).
- **Reset all settings**: at the organisation level, **Reset to default** on the **Settings** card removes the organisation's DOCX settings, including its templates, so the built-in template and the transformer's defaults apply again.

## Templates with `'{OPENCDMP.…}'` placeholders {#templates-with-opencdmp-placeholders}

Templates made before the `{{…}}` tags were introduced use placeholders such as `'{OPENCDMP.PLAN.TITLE}'` and `'{OPENCDMP.PLAN.FORM}'`. These placeholders are no longer supported:

- **In the settings**, such a template is reported with an error under the uploader, both when it is uploaded and, for one saved earlier, when the settings page or **Export template** card opens.
- **On export**, a template that is already configured and still uses them is skipped, and the export uses the built-in template instead, with the export settings applied. Exports keep working, but without that template's own design.

To keep an organisation's design, recreate it from the built-in template: [download it](#start-from-the-built-in-template), carry the page design over (cover, logo, fonts, colors, headers and footers, fixed text), and upload the result in place of the old file. This is quicker than converting the placeholders one by one, since the built-in template already renders the plan's content. The [template reference](docx-template-reference.md) lists the tags that replace the old placeholders, for example `{{plan.title}}` for `'{OPENCDMP.PLAN.TITLE}'` and the `{{?chapters}}` block for `'{OPENCDMP.PLAN.FORM}'`.

## See also

- [Export settings](docx-export-settings.md): every setting of the DOCX transformer
- [Template reference](docx-template-reference.md): tags, data and styles for writing templates
- [File Transformers](index.md)
- [File Transformer Configuration](/docs/deployment/configuration/backend/file-transformers.md)
