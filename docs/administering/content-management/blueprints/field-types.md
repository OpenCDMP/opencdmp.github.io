---
sidebar_position: 1
description: The preset fields and input types that the questions of a plan blueprint can use
---

# Blueprint field types

Blueprint questions share the field model of [asset templates](/docs/administering/content-management/templates/field-types.md). When you add a question or an input to a blueprint section, you choose either:

- a **Preset field**, which stores the answer as a core plan property, or
- an input type, such as **Free text**, **Number**, **Date**, **Single choice**, **Reference**, or **File upload**.

## Preset fields {#system-fields}

Preset fields represent core plan metadata. Each preset field can be added only once per blueprint.

| Preset field | What it captures | Required in the blueprint |
|---|---|---|
| **Title** | The display name of the plan | Yes |
| **Description** | A free-text summary of the plan | Yes |
| **Language** | The language of the plan. Options come from the configured [Languages](/docs/administering/system-configuration/languages.md) | Yes |
| **Access** | Whether the plan is `Public` or `Restricted` | Yes |
| **Contact** | A responsible contact person for the plan | No |

:::warning
Every blueprint must contain the **Title**, **Description**, **Language**, and **Access** preset fields, and authors must always answer them: the **Required** setting is locked. The **Required preset fields** bar of the Structure tab adds the missing ones.
:::

:::note
A question with a preset field cannot be repeated, and preset fields cannot be the target of a conditional rule. They always represent a single, unique plan property and are always visible.
:::

## Input types

Blueprint questions offer the same input types as asset templates, grouped as **Text and numbers** (free text, text area, rich text, number), **Choices and dates** (yes/no, single choice, multiple choice, tick box, date), and **Linked data and files** (reference, plan or asset in OpenCDMP, tags, dataset identifier, file upload). For each type, its settings, and how it is stored, see the [asset template field types](/docs/administering/content-management/templates/field-types.md).

The types most used in blueprints are:

| Input type | Use in a plan |
|---|---|
| **Free text**, **Text area**, **Rich text** | Plan-level answers such as a project summary or a data policy statement |
| **Number**, **Date** | Quantities, budgets, and project dates |
| **Reference** | Values from a [Reference Type](/docs/administering/system-configuration/reference-types.md), such as a grant from OpenAIRE or an organization from ROR. Supports multiple selection. |
| **File upload** | A file attachment at the plan level. Set the **Max size** and the **Allowed file types**. |
