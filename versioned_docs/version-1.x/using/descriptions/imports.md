---
sidebar_position: 8
description: Discover import options for a description
---

# Imports

Descriptions cannot be imported directly on their own. They are always imported as part of a plan import.

When you [import a plan](using/plans/imports.md), all descriptions contained in the import file are imported alongside it. During the import process, you map each description in the file to:

- A **description template** — defines the structure the description will use within OpenCDMP.
- A **section** of the target blueprint — determines where in the plan the description will appear.

This mapping step is required because the import format (such as RDA maDMP JSON) does not carry blueprint or template information — that structure is defined by your OpenCDMP configuration.

After a successful plan import, all mapped descriptions are created and attached to the newly imported plan. You can then find them on the [My Descriptions](using/descriptions/my-descriptions.md) page or within the plan itself.

:::info
For step-by-step instructions on the import process including the template and section mapping form, see [Plan Imports](using/plans/imports.md).
:::
