---
title: Deployment & Configuration
description: Deploy, configure, secure, and operate an OpenCDMP installation - architecture, installation with Docker, the production checklist, upgrades, and the configuration of every service
---

# Deployment & Configuration

This section is for **system administrators** who deploy, configure, and operate an OpenCDMP installation. If you are looking for something else:

- **Using OpenCDMP as a researcher or end user**: [Using OpenCDMP](/docs/using/index.md)
- **Managing blueprints, templates, users, or organisations inside a running instance**: [Administering OpenCDMP](/docs/administering/index.md)
- **Integrating with the API or building plugins**: [API & Integration](/docs/developers/index.md)

---

## What is in this section

- **[Architecture](/docs/deployment/architecture.md)**: the services of OpenCDMP and how they connect
- **[Installation](/docs/deployment/install/index.md)**: start OpenCDMP with Docker Compose
- **[Before going to production](/docs/deployment/install/production.md)**: secrets, TLS, Keycloak, database users, backups, sizing, and monitoring
- **[Upgrade guide](/docs/deployment/install/upgrade.md)** and **[changelog](/docs/deployment/install/changelog.md)**: move to a new version
- **[Configuration](/docs/deployment/configuration/index.md)**: the settings of every service, Keycloak, the infrastructure, plugin registration, and logging

:::tip First time deploying?
Start with the [Installation](/docs/deployment/install/index.md) to get OpenCDMP running, then follow [Keycloak setup](/docs/deployment/configuration/keycloak.md) to configure authentication, and work through [Before going to production](/docs/deployment/install/production.md) before real users sign in. Once the platform is live, hand over to an organisation administrator: the [Administering OpenCDMP](/docs/administering/index.md) guide walks them through setting up blueprints and templates so that users can start creating plans.
:::
