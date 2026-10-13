---
sidebar_position: 3
title: Prefill an asset
description: Fill in a new asset from a published record in Zenodo, DataCite, OpenAIRE, or another external source
---

# Prefill an asset

When adding an asset to a plan, you can choose to **prefill it from an external source** instead of answering every question manually. Prefilling searches an external database (such as Zenodo, DataCite, or OpenAIRE) and automatically populates your asset fields with the retrieved data.

:::note
Prefilling is available only when the plan's [blueprint](/docs/using/blueprints.md#blueprints) enables prefilling sources for the relevant section. The blueprint can also restrict which sources the section offers: when it names specific prefilling sources, only those are available; when it names none, every active prefilling source configured for your organisation is available.
:::

## Prefill an asset {#how-to-prefill-an-asset}

1. Open a plan and click **Add new Asset** in the section where you want to add an asset.
2. On the first step, select **Import from a published resource** instead of **Fill in myself**. This option is shown only when the section enables prefilling.
3. Choose a template. The template determines the structure and questions of your asset, and therefore which fields the imported metadata can fill in. It is pre-selected when the section links to only one template.
4. Choose a data source: the external repository to search, for example Zenodo, DataCite, or OpenAIRE. A single source is pre-selected.
5. Enter an identifier or title (for example a dataset title or a DOI) and press **Look up**.
6. Press **Import** on a matching record. When the source is set up to fetch the full record, the system first fetches the complete details of that record, then fills your asset fields with the values.
7. On the final step, name your asset. A banner reads **Imported from** *source* and confirms that the name and description were pre-filled from the imported record. Review and edit them if needed, then press **Continue — fill in details**.
8. Your asset is pre-populated. Review the filled fields, make any corrections, and complete any fields that the prefilling source did not cover.

See [Create or edit an asset](/docs/using/assets/create-or-edit-an-asset.md#importing-from-a-published-resource) for the full step-by-step wizard.

:::info
If the section enables prefilling but no active source is available, the step shows **No data sources are enabled for this section.** Ask your administrator to activate a [prefilling source](/docs/administering/system-configuration/prefilling-sources.md) or to name one on the blueprint section.
:::

## How fields are filled {#how-field-population-works}

Your administrator decides which values of the imported record go into which questions, so the same source can fill different templates (see [Prefilling sources](/docs/administering/system-configuration/prefilling-sources.md)).

## After prefilling

Prefilling gives you a starting point. After the asset is pre-populated:

- Check that the filled fields are correct
- Complete any required fields that the prefilling source did not cover
- Edit any values that need correction
- Save the asset
