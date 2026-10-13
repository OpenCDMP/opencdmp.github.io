---
description: Configure an organisation in OpenCDMP, from its templates and data sources to its users, settings, and workflows
---

# Administering OpenCDMP

An OpenCDMP installation hosts one or more organisations. Administrators decide what authors fill in (plan blueprints and asset templates), where the answers to look-up questions come from (reference types and prefilling sources), how plans move from draft to published (workflows and plugins), and who can do what (users and roles). Most administration pages act on the organisation you are working in, shown on the organisation button in the top bar; the pages of the **Installation** group act on every organisation at once. To reach them, switch the toggle at the top of the side navigation menu from **User View** to **Admin**; the menu shows only the groups and pages your role can open.

## Start here

1. [How it fits together](/docs/administering/how-it-fits-together.md): how blueprints, templates, reference types, semantics, plugins, and workflows connect; the roles; and what every organisation shares with the Default organisation.
2. [Getting started](/docs/administering/getting-started.md): the order in which to set up a new organisation, step by step.
3. [Set up publishing to a repository](/docs/administering/publishing-setup.md): everything a repository such as Zenodo needs before users can publish a plan.
4. [Admin listings](/docs/administering/admin-listings.md): the search, filters, and display controls the listings share.

## The admin menu

- **Analytics**: [Research Insights](/docs/administering/reports.md), which counts how questions were answered across the organisation
- **Templates**: [Plan Blueprints](/docs/administering/content-management/blueprints/index.md), [Asset Templates](/docs/administering/content-management/templates/index.md), and [Types](/docs/administering/content-management/types.md) (blueprint types and asset template types)
- **Data Sources**: [Reference Types](/docs/administering/system-configuration/reference-types.md) and [Prefilling Sources](/docs/administering/system-configuration/prefilling-sources.md)
- **Organisation**: [Users](/docs/administering/user-management/tenant-users.md) and [Settings](/docs/administering/tenant-management/tenant-configuration.md), the hub for everything an organisation can adjust: branding, languages, plugins, webhooks, [plan and asset workflows](/docs/administering/system-configuration/workflows.md), comment statuses, content defaults, help pages, notifications, and onboarding
- **Installation**: [Organisations](/docs/administering/tenant-management/tenants.md), [Data Transfer](/docs/administering/tenant-management/tenant-transfer.md), [Maintenance](/docs/administering/maintenance.md), [Edit Locks](/docs/administering/entity-locks.md), and [Notification Log](/docs/administering/notification-log.md)
<!-- accounting disabled -->
<!-- - **Installation** also lists **Quotas** (usage limits) when the accounting service is enabled -->

Which role sees which group and page is listed under [Roles](/docs/administering/how-it-fits-together.md#roles).
