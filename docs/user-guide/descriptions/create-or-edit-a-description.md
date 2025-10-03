---
sidebar_position: 1
description: Discover how to create a new or edit an existing description
---

# Create/Edit a Description

## Create a Description

There is only one way to create descriptions: 

- [Edit a plan](user-guide/plans/create-or-edit-a-plan.md#edit-a-plan) by clicking `Add Description` in a specific section.<br/>*You can only add a description in sections that have a description template assigned*. 

![Plan editor in the edit state](/images/descriptions/create-a-description/add-description-plan-editor.png)
*Plan editor*

:::tip

You can also click `Add Description` in the [`My Descriptions`](user-guide/descriptions/my-descriptions.md) or the [`Home`](user-guide/home.md) page and select in which plan the description will be stored. When plan selected, after pressing `next`, the editor appears for this plan.
:::

![Add description dialog](/images/descriptions/create-a-description/add-description-home-popup.png)
*Add description from Home page*

When creating a new description a popup message appears to select which description template want to use to initialize your description. The available description templates are those already assigned in the specific section. If plan structure supports prefilling sources for this section (for more details check [Blueprint](admin-guide/content-management/blueprints/index.md)), this popup message gives you the choice to automatically obtain answers from external sources (for more details check [Prefill a Description](user-guide/descriptions/prefill-a-description.md)) or continue manually as before.

![Prefill description pop up dialog](/images/descriptions/create-a-description/add-description-prefilling-source-popup.png)
*Initialize your description*

Then, a new editor for the description appears inside the plan editor. This editor is provided to add information according to the selected template. First, a form appears between the sections with the main info: `Title`, `Description`, `Tags`, `Template` for this description. If you selected to continue manually from popup message, the title of the description is the name of selected template as a default solution. Then, you can proceed to the next sub sections of the form based on the selected template. `Title` and `Template` are required fields to create the description. After saving, the description has a specific status according to [description worfklow](user-guide/descriptions/description-workflow.md).

:::warning

After creating the description you can not change the selected description template.

:::

![Description editor](/images/descriptions/create-a-description/plan-description-editor.png)


## Edit a Description

While in the edit view, the available transition statuses displayed for this description according to [description workflow](user-guide/descriptions/description-workflow.md).

:::tip

To change description `status` you must save or discard all editor changes first.

:::

![Description editor](/images/descriptions/edit-a-description/plan-description-editor.png)

:::note

To `finalize` a description, you must answer all the required questions. If the description is not valid for finalization yet, all unanswered required questions are marked red and you will have to continue editing.

:::
