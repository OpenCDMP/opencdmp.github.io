---
sidebar_position: 1
title: Installation
description: Start a complete OpenCDMP installation on one machine with the Docker Compose example of the docker-deployment repository
---

# Installation

OpenCDMP runs as a set of Docker containers, one per service. The [docker-deployment](https://github.com/OpenCDMP/docker-deployment) repository provides an example configuration that starts a complete installation on one machine with a single command. See the [architecture](/docs/deployment/architecture.md) for what each container does.

:::warning
The example is meant for local evaluation, not for production: every password is a demo default, Keycloak runs in development mode, and the application is served over plain HTTP. Before real users sign in, work through [Before going to production](/docs/deployment/install/production.md).
:::

## Prerequisites

1. **Docker and Docker Compose**:
   - [Install Docker](https://docs.docker.com/get-docker/) (a recent version is recommended)
   - [Install Docker Compose](https://docs.docker.com/compose/install/) (version 2, the `docker compose` command)
2. **Git**, to clone the repository.
3. **Internet access on the first start**, to pull the images from Docker Hub and the other public registries, and to download the `analysis-icu` plugin of Elasticsearch.
4. **Memory**: the example reserves about 8 GB for its containers and lets them grow to about 16 GB (see [Size the containers](/docs/deployment/install/production.md#size-the-containers)).

## Start the example

1. **Clone the repository**:

   ```bash
   git clone https://github.com/OpenCDMP/docker-deployment.git
   cd docker-deployment
   ```

2. **Start the services**:

   ```bash
   docker compose up -d
   ```

   The first start takes a few minutes: Elasticsearch installs its `analysis-icu` plugin, Keycloak imports the `OpenCDMP` realm, and the API service creates the database schema (see [Database migrations](/docs/deployment/install/upgrade.md#database-migrations)). The containers start in dependency order on their own (see [Startup order](/docs/deployment/configuration/infrastructure.md#startup-order)); no setup script is needed.

3. **Check the services**:

   ```bash
   docker compose ps
   ```

   The API service and the plugins report `healthy` once they are ready. If one does not, read its log file under `logs/` (see [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md#log-locations)).

4. **Open the application**:

   - Navigate to `http://opencdmp.localhost:8180/`.
   - Log in with the OpenCDMP administrator user:

     ```text
     User: opencdmp-admin
     Pass: admin
     ```

   - `opencdmp.localhost` needs no setup: browsers resolve every `*.localhost` name to the local machine and treat it as a secure origin, and inside Docker the proxy answers to the same name. If your browser cannot open it, add `127.0.0.1 opencdmp.localhost` to your hosts file.

5. **Open Keycloak**, the authentication service:

   - Navigate to `http://opencdmp.localhost:8180/auth/`.
   - Log in with Keycloak's administrator user:

     ```text
     User: keycloak-admin
     Pass: admin
     ```

   - Configure realms, clients, users, and roles as needed; see [Keycloak setup](/docs/deployment/configuration/keycloak.md).

## Ports

- The application is published on port `8180` (`PROXY_APP_PORT`).
- PostgreSQL is published on `127.0.0.1:5433` (`POSTGRES_PORT`), reachable from the local machine only.

To serve the application on a different port, replace `8180` in `.env`, in the files under `config-files/`, and in `docker-compose.override.yml`. To serve it under a different host name, replace `opencdmp.localhost` in the same files. [Serve over HTTPS](/docs/deployment/install/production.md#serve-over-https) lists every setting that holds the address.

## Start over

To discard the installation and start from scratch, run `docker compose down`, then delete the `storage/` and `logs/` folders.

## Adapt the example

Use the files of the docker-deployment repository as a starting point and edit them:

- [Infrastructure](/docs/deployment/configuration/infrastructure.md) explains the `.env` file and the PostgreSQL, RabbitMQ, and Elasticsearch settings.
- [Keycloak setup](/docs/deployment/configuration/keycloak.md) lists what to change in the shipped realm (client secrets, passwords, addresses).
- [Registering plugin services](/docs/deployment/configuration/plugin-services.md) adds file transformers, deposit services, and evaluators.
- [Before going to production](/docs/deployment/install/production.md) covers secrets, TLS, backups, sizing, and monitoring.

To upgrade an existing installation, follow the [Upgrade guide](/docs/deployment/install/upgrade.md).

## See also

- [Architecture](/docs/deployment/architecture.md) - The services and how they connect
- [Before going to production](/docs/deployment/install/production.md) - The production checklist
- [Upgrade guide](/docs/deployment/install/upgrade.md) - Moving to a new version
- [Configuration](/docs/deployment/configuration/index.md) - Every setting of every service
- [Administering OpenCDMP](/docs/administering/getting-started.md) - Setting up blueprints, templates, and users once the installation runs
