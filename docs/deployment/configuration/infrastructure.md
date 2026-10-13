---
sidebar_position: 2
title: Infrastructure
description: The Docker Compose environment file and the configuration of PostgreSQL, RabbitMQ, and Elasticsearch in the Docker example
---

# Infrastructure

These files of the [docker-deployment](https://github.com/OpenCDMP/docker-deployment) repository configure the containers around OpenCDMP: the Docker Compose environment file, PostgreSQL, RabbitMQ, and Elasticsearch. Keycloak has its own page, [Keycloak setup](/docs/deployment/configuration/keycloak.md#environment-variables).

| File | Configures |
| --- | --- |
| `.env` | Image versions, the webapp settings, ports, the host folders of the configuration, logs, and storage, and the Elasticsearch passwords |
| `config-files/postgres/postgres.env` and `config-files/postgres/init-scripts/` | The PostgreSQL superuser and the databases created on the first start |
| `config-files/rabbitmq/rabbitmq.env` | The RabbitMQ user and virtual host |
| `config-files/elk/elasticsearch/` | The Elasticsearch node settings and the script that creates the account of the API service |
| `config-files/keycloak/keycloak.env` | Keycloak; see [Keycloak environment variables](/docs/deployment/configuration/keycloak.md#environment-variables) |

The example values are demo defaults. Replace them as described in [Before going to production](/docs/deployment/install/production.md#replace-the-demo-secrets).

---

## Docker Compose environment (`.env`) {#docker}

The `.env` file sits next to `docker-compose.yml` and `docker-compose.override.yml`. Docker Compose reads it to fill in the image versions, the ports, and the host folders of the Compose files, and the webapp container receives the frontend settings from it.

### Registries and image versions

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `GITHUB_REGISTRY` | Registry of the OpenCDMP images (API service, webapp, file transformers, evaluator, and Zenodo deposit service), which Compose pulls as `<GITHUB_REGISTRY>/opencdmp/<image>`. | Yes | `docker.io` | `docker.io` |
| `DOCKER_REGISTRY` | Registry and namespace of the notification and annotation service images, which Compose pulls as `<DOCKER_REGISTRY>/java-pomolo-notification-api` and `<DOCKER_REGISTRY>/java-pomolo-annotation-api`. | Yes | `docker.io/citesa` | `docker.io/citesa` |
| `PROXY_TAG` | Version of the Nginx proxy image. | Yes | - | `mainline-alpine` |
| `MAIN_APP_TAG` | Version of the API service and webapp images. | Yes | - | `2.0.0` |
| `NOTIFICATION_APP_TAG` | Version of the notification service image. | Yes | - | `0.0.23` |
| `ANNOTATION_APP_TAG` | Version of the annotation service image. | Yes | - | `0.0.25` |
| `DOCX_APP_TAG` | Version of the DOCX file transformer image. | Yes | - | `2.0.0` |
| `JSON_APP_TAG` | Version of the RDA JSON file transformer image. | Yes | - | `2.0.0` |
| `EVALUATOR_APP_TAG` | Version of the RDA maDMP evaluator image. | Yes | - | `2.0.0` |
| `ZENODO_APP_TAG` | Version of the Zenodo deposit service image. | Yes | - | `2.0.0` |
| `POSTGRES_TAG` | PostgreSQL version. | Yes | - | `17-alpine` |
| `ELK_TAG` | Elasticsearch version. | Yes | - | `9.1.4` |
| `KEYCLOAK_TAG` | Keycloak version. | Yes | - | `26.1.0` |
| `RABBITMQ_TAG` | RabbitMQ version. | Yes | - | `4.1.4-management-alpine` |
| `PDF_SERVICE_TAG` | Version of the Gotenberg PDF service. | Yes | - | `8.23` |

The [changelog](/docs/deployment/install/changelog.md) lists the service versions of each release. Check that each tag exists on [Docker Hub](https://hub.docker.com/u/opencdmp) (for the notification and annotation services, [`citesa/java-pomolo-notification-api`](https://hub.docker.com/r/citesa/java-pomolo-notification-api) and [`citesa/java-pomolo-annotation-api`](https://hub.docker.com/r/citesa/java-pomolo-annotation-api)) before you pull.

### Application settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `PROFILE` | Profile of the OpenCDMP services. Each service reads `app-<profile>.env` and the `<name>-<profile>.yml` overrides from its `config` folder, so changing it means renaming those files. | Yes | `test` | `production` |
| `WEBAPP_BASE_URL` | Base path of the webapp, when it is not served at the root. Commented out in the example. | No | `/` | `/opencdmp/` |
| `WEBAPP_API_URL` | Address of the API, as the browser reaches it. | Yes | - | `https://opencdmp.example.org/api/` |
| `INSTALLATION_URL` | Address of the webapp. | Yes | - | `https://opencdmp.example.org/` |
| `DEFAULT_CULTURE` | Default language of the webapp. | No | `en` | `en` |
| `KEYCLOAK_ADDRESS` | Address of Keycloak, including its relative path. | Yes | - | `https://opencdmp.example.org/auth/` |
| `KEYCLOAK_REALM` | Keycloak realm. | Yes | - | `OpenCDMP` |
| `KEYCLOAK_CLIENT_ID` | Keycloak client of the webapp. | Yes | - | `webapp` |
| `KEYCLOAK_SCOPE` | Scopes the webapp requests. They must include `api` and, for comments and notifications, `annotation` and `notification`. | No | `openid profile email address phone api notification annotation identity_provider` | `openid profile email api notification annotation identity_provider` |
| `LOGGING_ENABLED` | Enables the webapp's logging to the browser console. | No | `false` | `true` |

These settings are described in more detail in the [frontend configuration](/docs/deployment/configuration/frontend/index.md).

### Ports and paths

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `SERVER_PORT` | Port that the file transformers and the evaluator listen on inside their containers. | Yes | `8080` | `8080` |
| `PROXY_APP_PORT` | Host port of the Nginx proxy, which serves the application. | Yes | `8180` | `443` |
| `POSTGRES_PORT` | Host port of PostgreSQL, published on `127.0.0.1` only. | Yes | `5433` | `5433` |
| `CONFIG_FILES_PATH` | Host folder with the configuration of every service. | Yes | `./config-files` | `/srv/opencdmp/config-files` |
| `LOG_FILES_PATH` | Host folder that receives the log files of every service. | Yes | `./logs` | `/var/log/opencdmp` |
| `STORAGE_PATH` | Host folder with the data of every service (database, search index, uploaded files). | Yes | `./storage` | `/srv/opencdmp/storage` |

Where a variable has no built-in default, the Default Value column shows the value of the example `.env` file. The Elasticsearch passwords are also set in `.env`; see [Elasticsearch](#elasticsearch). The example serves the application on `http://opencdmp.localhost:8180/`. To change the port or the host name, update the URLs above together with the files under `config-files/` and `docker-compose.override.yml`, which repeat them (see [Installation](/docs/deployment/install/index.md#ports)).

---

## Startup order {#startup-order}

The Docker Compose files start the services in dependency order, using health checks, so a single `docker compose up -d` starts the whole installation:

1. `opencdmp.init` prepares the storage and log folders of Elasticsearch and Keycloak, then exits.
2. Elasticsearch starts and installs its `analysis-icu` plugin on the first start; `opencdmp.elasticsearch.setup` then creates the account of the API service and exits.
3. PostgreSQL, Keycloak (which imports the `OpenCDMP` realm on the first start), and RabbitMQ start and report healthy.
4. The API service starts once the above are ready and migrates the database (see [Database migrations](/docs/deployment/install/upgrade.md#database-migrations)). The notification and annotation services start once PostgreSQL, Keycloak, and RabbitMQ are ready.
5. The webapp, the file transformers, the evaluator, the Zenodo deposit service, and the proxy start after the API service.

---

## PostgreSQL {#postgresql}

### The `postgres.env` file

The file is in [`config-files/postgres`](https://github.com/OpenCDMP/docker-deployment/tree/main/config-files/postgres). PostgreSQL reads it only when it creates the database cluster, on the first start with an empty data folder.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `POSTGRES_USER` | PostgreSQL superuser. | No | `postgres` | `postgres` |
| `POSTGRES_PASSWORD` | Password of the superuser. The example repeats it in the database settings of the API, notification, and annotation services and of Keycloak. | Yes | - | `<postgres-password>` |

In the Docker example, PostgreSQL is published on `127.0.0.1:${POSTGRES_PORT}` (port `5433` by default), so it is reachable from the host machine only. Its data is stored in `${STORAGE_PATH}/postgres/data`.

### Initialization scripts {#initialization-database-scripts}

The scripts in [`config-files/postgres/init-scripts`](https://github.com/OpenCDMP/docker-deployment/tree/main/config-files/postgres/init-scripts) run in name order when the container starts with an empty data folder. If the database already exists, they do not run again.

The init script `00-db-init.sql` only creates the empty databases:

- `opencdmp`, shared by the API service, the notification service, and the annotation service
- `keycloak`, used by Keycloak

The init scripts do **not** create the OpenCDMP schema or insert any data. The API service builds the schema, including the tables of the notification, annotation, and KPI services and the default seed data, the first time it starts against the empty `opencdmp` database, and applies later schema changes at startup. See [Database migrations](/docs/deployment/install/upgrade.md#database-migrations).

:::note
If your copy of this folder has schema or seed scripts from an earlier Docker example, remove them before you create a new database, so that the API service builds the schema itself.
:::

The example connects every service with the `postgres` superuser. To give each service its own database user, see [Before going to production](/docs/deployment/install/production.md#give-each-service-its-own-database-user). The user of the API service must be allowed to create and alter tables in the `opencdmp` database (see [Database user permissions](/docs/deployment/install/upgrade.md#database-user-permissions)).

---

## RabbitMQ {#rabbitmq}

The API service publishes events to RabbitMQ, and the notification and annotation services consume them. The `rabbitmq.env` file is in [`config-files/rabbitmq`](https://github.com/OpenCDMP/docker-deployment/tree/main/config-files/rabbitmq). RabbitMQ creates the user on the first start, with an empty data folder (`${STORAGE_PATH}/rabbitmq`).

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ user, created on the first start. The OpenCDMP services connect with it (`RABBIT_USER`). | No | `guest` | `opencdmp` |
| `RABBITMQ_DEFAULT_PASS` | Password of that user (`RABBIT_PASS` of the OpenCDMP services). | No | `guest` | `<rabbitmq-password>` |
| `RABBITMQ_DEFAULT_VHOST` | Default virtual host. | No | `/` | `/` |

The services that connect to RabbitMQ set `RABBIT_HOST`, `RABBIT_PORT`, `RABBIT_USER`, and `RABBIT_PASS`, and the names of their queue and exchange; see the [API service](/docs/deployment/configuration/backend/index.md#rabbitmq-configuration), [notification service](/docs/deployment/configuration/backend/notification.md), and [annotation service](/docs/deployment/configuration/backend/annotation.md) configuration. All of them must use the same exchange (`opencdmp_queue` in the example).

:::warning
RabbitMQ normally accepts the `guest` user only from `localhost`; the official Docker image lifts that restriction, which is how the example connects with it over the Docker network. Set your own user and password for any real installation.
:::

---

## Elasticsearch {#elasticsearch}

The API service indexes plans and assets in Elasticsearch for its listings and searches. The Docker example runs a single node with security enabled.

### Passwords {#the-elkenv-file}

Both Elasticsearch passwords are set in the `.env` file, and Docker Compose passes them to the containers that need them:

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `ELASTIC_PASSWORD` | Password of the built-in `elastic` superuser. Elasticsearch sets it on the first start; the health check of the container and the setup script sign in with it. | Yes | `elastic` | `<elastic-password>` |
| `ELASTIC_API_PASSWORD` | Password of the user that the API service connects as. The setup script creates or updates the user with it, and Docker Compose passes it to the API service as `ELASTIC_PASS`. | Yes | `opencdmp` | `<elastic-api-password>` |

Elasticsearch applies `ELASTIC_PASSWORD` only on the first start, with an empty data folder, so set it before that start. To change it later, see [Replace the demo secrets](/docs/deployment/install/production.md#replace-the-demo-secrets).

### Node settings

`config-files/elk/elasticsearch/elasticsearch.yml` sets a single-node cluster (`discovery.type: single-node`, cluster `opencdmp-cluster`), turns on security (`xpack.security.enabled: true`) with the basic license, and turns off the GeoIP downloader. The `opencdmp.elasticsearch` service installs the `analysis-icu` plugin on its first start, because the index analyzers of the API service need it, and sets the heap with `ES_JAVA_OPTS` (`-Xmx1g -Xms1g`, half of its 2 GB memory limit). See [Size the containers](/docs/deployment/install/production.md#size-the-containers) before you change memory settings.

### The account of the API service {#passwords-and-the-account-of-the-api-service}

The setup script `config-files/elk/elasticsearch/index_init.sh` creates the role and the user that the API service connects with: the user `opencdmp-api-test` with the password `ELASTIC_API_PASSWORD`, allowed on the indexes `opencdmp-plans-test` and `opencdmp-descriptions-test`. These values match `ELASTIC_USER`, `ELASTIC_PASS`, `ELASTIC_PLAN_INDEX`, and `ELASTIC_DESCRIPTION_INDEX` in the [backend configuration](/docs/deployment/configuration/backend/index.md#elasticsearch-configuration). Keep the index names of the role and of the API configuration the same.

The index can be rebuilt from the database at any time with **Rebuild plan and asset indexes** on the [Maintenance](/docs/administering/maintenance.md#task-groups) page.

---

## See also

- [Installation](/docs/deployment/install/index.md) - Start the Docker example
- [Before going to production](/docs/deployment/install/production.md) - Secrets, TLS, sizing, and backups
- [Backend configuration](/docs/deployment/configuration/backend/index.md) - Database, Elasticsearch, and RabbitMQ settings of the API service
- [Keycloak setup](/docs/deployment/configuration/keycloak.md) - Realm and Keycloak environment variables
- [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) - Log folders and health checks of each container
