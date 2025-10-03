---
sidebar_position: 1
description: View details about the conditional questions
---

# Conditional Questions

You can set a question to be hidden by default and only show up if a certain condition is met. When you press `Make Conditional Question` on a question, you make it the source of the condition. Then, you must select the question you want to hide *(in the `then show Question` control)* and a value *(in the `If Value is` control)* for the answer that will satisfy the condition.

There can be more than one conditions set. In that case, all of them must be met. Also, it is possible to make specific question fields conditional by selecting them in the `then show Question` dropdown. All the options are grouped as `Questions` and `Inputs` respectively.

:::tip

It is recommended to specify placeholder texts for all the added inputs because they are also used in the question dropdown. Otherwise, they will be listed as '*\<Untitled\>*', making the selection of the ones you want to hide difficult.

:::

:::info

All the questions that expect text, selection list, checkbox and radio box based answers can be used as a condition, as long as they are not system specific like [references](admin-guide/system-configuration/reference-types.md).

:::