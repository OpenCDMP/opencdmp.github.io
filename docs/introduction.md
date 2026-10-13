---
slug: /
sidebar_position: 1
description: Introduction to OpenCDMP and role-based paths through the documentation
---

# Introduction

**OpenCDMP** is an open, extensible platform for writing and managing **Output Management Plans (OMPs)**, such as **Data Management Plans (DMPs)** and **Software Management Plans (SMPs)**, together with the people who work on them.

---

## Where do I start?

Pick the path that matches what you want to do:

| I want to… | Go to |
|---|---|
| **Create and manage plans** as a researcher or end user | **[Using OpenCDMP](/docs/using/index.md)** |
| **Configure blueprints, templates, users, and organisations** as an organisation administrator | **[Administering OpenCDMP](/docs/administering/index.md)** |
| **Deploy or upgrade** an OpenCDMP installation and keep it running | **[Deployment & Configuration](/docs/deployment/index.md)** |
| **Integrate with the API** or build plugins as a developer | **[API & Integration](/docs/developers/index.md)** |

:::tip Two kinds of administrators
The people who deploy and operate an installation find their guides in [Deployment & Configuration](/docs/deployment/index.md). **Organisation administrators**, who configure blueprints, templates, and users inside a running installation, find theirs in [Administering OpenCDMP](/docs/administering/index.md). If you are not sure which applies, you are probably an organisation administrator.
:::

---

## What you can do

- **Write plans together**: invite collaborators with roles such as Editor, Reviewer, or Viewer, for the whole plan or for specific sections, discuss the content in comments, and make finalized plans public.
- **Shape the questions**: blueprints and asset templates, configured by administrators, decide what a plan and each of its assets ask.
- **Follow a workflow**: statuses and transitions that each organisation defines, with versions of a plan and a field-by-field comparison between them.
- **Download and publish**: download plans as PDF, DOCX, JSON, or XML, and publish them to repositories such as Zenodo to get a DOI.
- **Evaluate**: check plans against standards such as the RDA maDMP schema, OSTrails benchmarks, or the OpenAIRE FAIR guidelines with evaluator plugins.
- **Extend and integrate**: add file-transformer, deposit, and evaluator plugins, and connect other systems through the API and signed webhooks.
- **Stay informed**: email and in-app notifications, and the **Research Insights** page, which counts how questions were answered across an organisation.

---

## Core concepts

OpenCDMP is built around four main entities:

### Blueprints

Define the structure of a Plan by specifying its Sections and which Asset Templates can be used within each section. Blueprints are created by administrators and selected by users when creating a new Plan.

### Plans

The primary output of OpenCDMP: a complete OMP such as a DMP or SMP. A Plan is structured by a Blueprint, contains multiple Assets, and supports collaboration, versioning, export, and repository deposit.

### Asset Templates

Define the questions and input fields that make up an Asset. Each template is tailored to a specific type of output (dataset, software, publication, etc.) and is configured by administrators.

### Assets

Structured descriptions of research outputs (datasets, software, protocols, etc.) linked to a Plan. Each Asset follows the structure of an Asset Template, which defines the fields to fill in, and contains the actual content provided by the user.

### How they connect

A Blueprint defines what sections a Plan has and which Asset Templates are available in each section. When a user creates a Plan, they fill in plan-level information and then add Assets (one per output), each answering the questions defined by its Asset Template.

---

## Community and support

- **GitHub Repository**: [https://github.com/OpenCDMP/OpenCDMP](https://github.com/OpenCDMP/OpenCDMP)
- **Issue Tracker**: Report bugs or request features in the [OpenCDMP issue tracker](https://github.com/OpenCDMP/OpenCDMP/issues).
- **Contributing Guidelines**: See the [contributing guidelines](/docs/developers/contributing.md) to get started.

---

## License

OpenCDMP is released under the [EUPL-1.2 License](https://github.com/OpenCDMP/OpenCDMP/blob/main/LICENSE).

---

## Contact

For questions or support, please contact:

- **Email**: opencdmp at cite.gr
