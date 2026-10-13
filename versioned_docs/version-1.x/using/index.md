---
sidebar_position: 1
description: Guide for researchers and end users creating and managing plans in OpenCDMP
---

# Using OpenCDMP

This section covers all end-user features of OpenCDMP — creating and managing plans, adding descriptions, collaborating with your team, and exporting or depositing your work.

New to OpenCDMP? Start with the [Your First Plan](getting-started.md) tutorial, or read the overview below to understand the core concepts first.

---

## How it all fits together

Before diving into features, here is the relationship between the key entities:

1. **An administrator creates Description Templates** — each one defines a set of questions (fields) for a specific type of output, such as a dataset or software component.
2. **An administrator creates a Blueprint** — it defines the sections a Plan will have, and specifies which Description Templates can be used in each section.
3. **You create a Plan** using a Blueprint — the Plan inherits the section structure defined by that Blueprint.
4. **Within each section of the Plan, you add Descriptions** — each Description follows the structure of the selected Description Template and contains the actual answers/content for that output.

In short: **Blueprint → Plan structure. Description Template → Description content.**

:::info Prerequisites for end users
Before you can create a Plan, an administrator must have configured at least one Blueprint and at least one Description Template. If no blueprints appear when you try to create a plan, contact your OpenCDMP administrator.
:::

---

## Core Concepts

### Blueprints

A Blueprint defines the overall structure of a **Plan** by specifying its **Sections** and the content within each section.

- Each Blueprint is divided into one or more **Sections**, which can include fields describing the plan as a whole (title, contacts, funders, etc.) and slots for **Descriptions**.
- Blueprints are created and managed by administrators. As an end user, you select a Blueprint when creating a new Plan — you cannot modify the Blueprint itself.

See [Blueprints](blueprints.md) for more detail.

---

### Plans

A Plan is the primary entity and main output of the OpenCDMP platform — it represents a complete OMP for a research project or output.

- **Structured by a Blueprint**: when you create a Plan, you choose a Blueprint, and the Plan inherits its sections and structure.
- **Contains Descriptions**: within the Plan's sections, you add Descriptions that detail specific inputs or outputs (datasets, software, publications, etc.).
- **Collaborative**: invite users with different roles — Viewer, Contributor, Reviewer — at the Plan level or at individual Section level.
- **Versioned**: create new versions of a Plan to track changes over time while preserving history.
- **Exportable and depositable**: export in DOCX, PDF, RDA JSON, and more; deposit to repositories (Zenodo, Dataverse, etc.) to obtain a DOI.

See [Plans](plans/index.md) for the full guide.

---

### Description Templates

A Description Template defines the structure of a **Description** — the set of questions and fields a user must fill in for a specific type of output.

- Contains **sections** and **question definitions** with various input types: text, date, select, file upload, external references, and more.
- A Blueprint references which Description Templates are available in each of its sections.
- Description Templates are created and managed by administrators.

See [Templates](templates.md) for more detail.

---

### Descriptions

A Description is a detailed entry within a Plan that captures information about a specific research input or output — for example, a dataset, a piece of software, or a publication.

- Each Description is based on a **Description Template**, which determines what questions appear.
- Descriptions are added inside the sections of a Plan, as defined by the Blueprint.
- A Plan typically contains multiple Descriptions — one per output type or research asset.
- Descriptions can be exported, reviewed, and annotated independently.

See [Descriptions](descriptions/index.md) for the full guide.

---

### References

References are structured pieces of information that can be linked to a Plan or a Description — for example, a funder, a grant, a researcher (with ORCID), an organization, or a license.

- **Internal references**: already available in the system for selection.
- **External references**: fetched from external APIs (e.g., grant databases, researcher registries).
- Users can also add custom references manually.

---

## Typical workflow

1. **Log in** to your OpenCDMP instance.
2. **Create a new Plan** — choose a Blueprint that matches your project type.
3. **Fill in Plan-level details** — title, language, contacts, funding information (as defined by the Blueprint sections).
4. **Add Descriptions** — for each research output (dataset, software, etc.), add a Description using the appropriate Description Template and answer its questions.
5. **Invite collaborators** — assign roles to team members at the Plan or Section level.
6. **Review and finalize** — check completion, run evaluators if configured, change the plan status.
7. **Export or deposit** — download in your required format or deposit to a repository to obtain a DOI.

Follow the full step-by-step in the [Getting Started Tutorial](getting-started.md).

---

## Features

import DocCardList from '@theme/DocCardList';

<DocCardList />
