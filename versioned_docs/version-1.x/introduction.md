---
slug: /
sidebar_position: 1
description: Introduction to OpenCDMP and role-based paths through the documentation
---

# Introduction

**OpenCDMP** is an open and extensible software platform for managing, monitoring, and maintaining **Output Management Plans (OMPs)** — such as **Data Management Plans (DMPs)** and **Software Management Plans (SMPs)**. It streamlines the complex processes involved in handling OMPs, supporting efficiency, compliance, and collaboration across projects and organizations.

---

## Where do I start?

Pick the path that matches what you want to do:

| I want to… | Go to |
|---|---|
| **Create and manage plans** as a researcher or end user | **[Using OpenCDMP](/using/)** |
| **Configure blueprints, templates, users, and tenants** as a tenant administrator | **[Administering OpenCDMP](/administering/)** |
| **Deploy or upgrade** an OpenCDMP instance as a system administrator | **[Deployment & Configuration](/deployment/)** |
| **Integrate with the API** or build plugins as a developer | **[API & Integration](/developers/)** |

:::tip Two kinds of administrators
OpenCDMP distinguishes between the **system administrator** who deploys and operates the platform ([Deployment & Configuration](/deployment/)) and the **tenant administrator** who configures blueprints, templates, and users inside a running instance ([Administering OpenCDMP](/administering/)). If you are not sure which applies, you are probably a tenant administrator.
:::

---

## Key Features

- **Modular Architecture**: Easily extend the platform with new modules and plugins to meet specific needs.
- **Evaluation via Plugins**: Perform evaluation through customizable plugins tailored to specific standards and requirements.
- **Collaborative Environment**: Supports teamwork with multi-user access, version control, and change tracking.
- **Role-Based Access Control**: Invite users to a Plan with different roles — Viewer, Contributor, Reviewer, etc. — and set access rights at the Plan or Section level.
- **Review and Annotation System**: Reviewers can add annotations (comments) to Plans or Descriptions, with statuses to track their lifecycle.
- **Notification Features**: Receive Email and In-App notifications for updates, comments, and changes to Plans or Descriptions you are involved in.
- **Flexible Export Options**: Export Plans in human and machine-readable formats like XML, JSON, DOCX, and PDF.
- **Pluggable Export Mechanism**: Implement custom export plugins to suit specific requirements.
- **Repository Deposits for DOI Assignment**: Deposit OMPs directly to repositories for DOI (Digital Object Identifier) assignment.
- **Pluggable Deposit Mechanism**: Implement custom deposit plugins to integrate with different repositories.
- **Customizable Templates**: Offers a library of templates for various types of OMPs, customizable to fit specific project requirements.
- **Integration Capabilities**: Seamlessly connects with other software tools and platforms, enabling data import/export and interoperability via APIs.

---

## Core Concepts

OpenCDMP is built around four main entities. Understanding how they relate is the key to using the platform effectively:

  - #### **Blueprints**

    Define the structure of a Plan by specifying its Sections and which Description Templates can be used within each section. Blueprints are created by administrators and selected by users when creating a new Plan.

  - #### **Plans**

    The primary output of OpenCDMP — a complete OMP such as a DMP or SMP. A Plan is structured by a Blueprint, contains multiple Descriptions, and supports collaboration, versioning, export, and repository deposit.

  - #### **Description Templates**

    Define the questions and input fields that make up a Description. Each template is tailored to a specific type of output (dataset, software, publication, etc.) and is configured by administrators.

  - #### **Descriptions**

    Detailed entries within a Plan that document a specific research output — such as a dataset or software component. Each Description follows the structure of a Description Template and contains the actual content provided by the user.

**How they connect**: a Blueprint defines what sections a Plan has and which Description Templates are available in each section. When a user creates a Plan, they fill in plan-level information and then add Descriptions (one per output), each answering the questions defined by its Description Template.

---

## Benefits

- **Efficiency**: Streamlines the creation, management, and distribution of OMPs, saving time and resources.
- **Enhanced Collaboration**: Robust features like role-based access control, annotations, and notifications improve teamwork and communication.
- **Quality Control**: The review and annotation system ensures thorough examination and quality assurance of Plans.
- **Flexible Sharing and Distribution**: Diverse export and deposit options enable easy sharing, integration, and official registration of your Plans.
- **Customizability**: The pluggable mechanisms for validation, export, and deposit allow for tailored solutions to meet specific organizational needs.
- **Stay Informed**: Notification features ensure that team members are promptly aware of important updates and actions required.
- **Flexibility and Scalability**: Suits organizations of all sizes due to its flexible and extensible design.

---

## Community and Support

- **GitHub Repository**: [https://github.com/OpenCDMP/OpenCDMP](https://github.com/OpenCDMP/OpenCDMP)
- **Issue Tracker**: Report bugs or request features [here](https://github.com/OpenCDMP/OpenCDMP/issues).
- **Contributing Guidelines**: See the [contributing guidelines](/developers/contributing) to get started.

---

## License

OpenCDMP is released under the [EUPL-1.2 License](https://github.com/OpenCDMP/OpenCDMP/blob/main/LICENSE).

---

## Contact

For questions or support, please contact:

- **Email**: opencdmp at cite.gr

---

Start simplifying your Output Management Plans with OpenCDMP today!

[Download Now](https://github.com/OpenCDMP/OpenCDMP/releases)
