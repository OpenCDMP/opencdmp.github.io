---
sidebar_position: 1
description: Discover how to create a new or edit an existing plan
---

# Create/Edit a Plan

## Create a Plan

To create a new Plan in OpenCDMP you can either [import](using/plans/imports.md) an existing plan from a file or fill in a Plan from the start.

![New plan popup dialog](/images-1.x/plans/create-a-plan/new_plan_popup_dialog.png)
*New plan popup dialog*

To create new Plan from start, the first step is **[Blueprint](using/blueprints.md)** selection that describes plan's structure. There is a list with all available blueprints to use. In the first item of the list appears the Default Plan Blueprint (defined in [Tenant Configuration Page](administering/tenant-management/tenant-configuration.md)) as an option. For each plan blueprint you can see the detailed information and then, after choosing, proceed to the next step by pressing `Proceed with this blueprint`. 

![Plan editor first step](/images-1.x/plans/create-a-plan/plan-editor-first-step.png)
*Plan editor (first step)*

The full plan editor appears with all the sections of the selected blueprint. After saving, the plan: 
- has a specific status according to plan workflow, more information can be found [here](using/plans/plan-workflow.md)
- has the version 1, more information can be found [here](using/plans/versions.md)

![Plan editor sidebar](/images-1.x/plans/create-a-plan/plan-editor.png)
*Plan editor*

## Edit a Plan

While in the edit view, you can make and revert changes but also add descriptions to specific sections that contain description template fields. For each section that has description templates option, appears a table with all available templates. In the table you can add or remove description templates from plan. You can preview a description template to see the structure, also search by name and filter by type and language. More information about creating descriptions can be found [here](using/descriptions/create-or-edit-a-description.md). 
On the top and right side of the form we see some additional actions besides saving. Μore information about these actions can be found in [plan overview section](using/plans/plan-overview.md).

:::tip

To change plan `status` you must save or discard all editor changes first.

:::

![Plan editor](/images-1.x/plans/edit-a-plan/plan-editor.png)
*Plan editor*

:::note
There is a progression bar percentage that counts the completed required fields. To finalize a plan you must fill all the required fields.

:::

### Working with References in a Plan

When editing a plan, some fields require selecting values from predefined lists instead of typing free text.  
These lists are called **[References](using/references.md)**.

If the required value doesn’t exist in the available options, you can **add it manually**.
Learn more about how to add a manual reference in the [Adding a Reference Manually](using/references.md#adding-a-reference-manually) section.

---

## Next Steps

- [Plan Overview](using/plans/plan-overview.md) — view all plan details and take actions such as status changes, export, deposit, and evaluation
- [Invite Collaborators](using/plans/invite-collaborators.md) — share your plan and assign sections to team members
- [Export a Plan](using/plans/exports.md) — download your plan as PDF, DOCX, JSON, or XML

