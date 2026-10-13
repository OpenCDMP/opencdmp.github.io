---
sidebar_position: 3
description: What do we call 'blueprints'
---

# Blueprints

A Blueprint defines how a [Plan](using/plans/index.md) is structured. It consists of one or more **Sections**, each of which can hold fields that describe the plan overall (such as title, contacts, or funding) and/or slots for [Descriptions](using/descriptions/index.md) based on selected [Description Templates](using/templates.md).

Key rules:

- At least one section in a Blueprint must allow Descriptions to be added.
- A section does not have to include Descriptions — it can contain only plan-level fields.
- When you create a Plan, you choose a Blueprint, and the Plan inherits its section structure. You cannot change the Blueprint after the Plan is created.

```mermaid
graph TD
    Blueprint["Blueprint"]

    Blueprint --> Section1["Section<br/>(e.g. Project Info)"]
    Blueprint --> Section2["Section<br/>(e.g. Data Collection)"]

    Section1 --> PlanFields1["Plan-level Fields<br/>(contacts, grants, dates…)"]
    Section1 --> DTSlot1["Allowed Description Templates<br/>(defines which types users can add)"]

    Section2 --> PlanFields2["Plan-level Fields<br/>(optional)"]
    Section2 --> DTSlot2["Allowed Description Templates"]

    DTSlot1 --> DT1["Dataset Template"]
    DTSlot2 --> DT2["Dataset Template"]
    DTSlot2 --> DT3["Software Template"]

    DT1 -.->|Users add| Desc1["Description instance"]
    DT2 -.->|Users add| Desc2["Description instance"]
    DT3 -.->|Users add| Desc3["Description instance"]

    style Blueprint fill:#e1f5ff
    style Section1 fill:#fff4e1
    style Section2 fill:#fff4e1
    style PlanFields1 fill:#e1ffe1
    style PlanFields2 fill:#e1ffe1
    style DTSlot1 fill:#f0e1ff
    style DTSlot2 fill:#f0e1ff
```

:::info Admin-only
Blueprints are created and managed by administrators. As an end user, you **select** a Blueprint when creating a new Plan but cannot create or edit Blueprints yourself.

If you cannot find a suitable Blueprint, contact your OpenCDMP administrator. Details on creating Blueprints are in the [Blueprint Administration](administering/content-management/blueprints/index.md) section.
:::
