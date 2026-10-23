---
description: The blueprint for new plans, the featured blueprints and asset templates, and the references shown in plan and asset lists
---

# Content defaults

The **Content defaults** page sets what people see first when they start a plan and browse the lists.

## Authorization

Open to the **System Administrator** and **Organisation Admin** roles. See [Roles](/docs/administering/how-it-fits-together.md#roles).

## Navigation

Switch the sidebar to the **Admin** view, choose **Settings** under **Organisation**, then **Content defaults** in the **Content** group. See [Organisation settings](/docs/administering/tenant-management/tenant-configuration.md).

## Blueprint for new plans

The blueprint pre-selected when users [create a new plan](/docs/using/plans/create-or-edit-a-plan.md). Users can still choose a different blueprint.

:::note
If the selected blueprint is updated to a new finalized version, this setting automatically points to the latest version.
:::

## Featured blueprints and asset templates

- **Featured blueprints**: shown first, in this order, when starting a plan.
- **Featured asset templates**: shown first when adding an asset to a plan.

Both lists also fill the [Recommended blueprints and templates](/docs/using/home.md#recommended) panel on the Dashboard, blueprints first and then asset templates, each in the order set here. A blueprint card there starts a plan with that blueprint.

Add items from the finalized ones, reorder them by dragging (or with Alt and the left or right arrow key), and remove them at any time. If nothing is featured, the panel does not appear on the Dashboard.

## References shown in lists

Which reference types, for example Grant or Organization, appear as extra details on each row of the [My Plans](/docs/using/plans/my-plans.md) and [My Assets](/docs/using/assets/my-assets.md) lists, set separately for plan lists and asset lists. A preview shows a sample row with the chosen references.

The same reference types, in the same order, also get their own sections in the **Reference Types** filter of those lists. The plan list setting also decides the reference type rows of the **Overview** card on the [Dashboard page](/docs/using/home.md#overview). For anonymous visitors, the Overview card uses the plan list setting of the default organisation.

In all these places a reference type is shown by its **Name**. To show it in another language, add a text with the ID `REFERENCE-TYPES.NAMES.<code>` to that language on the [Languages & texts](/docs/administering/system-configuration/languages.md#editing-texts) page, where `<code>` is the reference type's **Code** in any letter case. For example, `REFERENCE-TYPES.NAMES.researchers` with the text `Investigadores` in Portuguese. A language without such a text keeps showing the **Name**.

---

## See also

- [Organisation settings](/docs/administering/tenant-management/tenant-configuration.md) - The settings hub, and how settings are saved
- [Plan Blueprints](/docs/administering/content-management/blueprints/index.md) - Creating and finalizing blueprints
