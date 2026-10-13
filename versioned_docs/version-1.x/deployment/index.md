# Deployment & Configuration

This section is for **system administrators** who are deploying, configuring, and operating an OpenCDMP instance. If you are looking for something else:

- **Using OpenCDMP as a researcher or end user** → [Using OpenCDMP](/using/)
- **Managing blueprints, templates, users, or tenants inside a running instance** → [Administering OpenCDMP](/administering/)
- **Integrating with the API or building plugins** → [API & Integration](/developers/)

---

## What is in this section

- **[Architecture](architecture.md)** — Microservices architecture and component breakdown
- **[Installation](install/)** — Deploy OpenCDMP using Docker, and upgrade between versions
- **[Configuration](configuration/)** — Environment variable reference for all services (backend, frontend, Keycloak, PostgreSQL, RabbitMQ, Elasticsearch, infrastructure)
- **[Common Workflows](getting-started-workflows.md)** — Real-world use cases and workflow examples

:::tip First time deploying?
Start with the [Installation Guide](install/) to get OpenCDMP running, then follow [Keycloak Setup](configuration/keycloak.md) to configure authentication. Once the platform is live, hand off to a tenant administrator — the [Administering OpenCDMP](/administering/) guide walks them through setting up blueprints and templates so users can start creating plans.
:::
