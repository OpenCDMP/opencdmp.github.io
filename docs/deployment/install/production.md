---
sidebar_position: 2
title: Before going to production
description: The checklist for turning the Docker example into a production installation - secrets, TLS and the reverse proxy, Keycloak, database users, backups, sizing, several API instances, and monitoring
---

# Before going to production

The [Docker example](/docs/deployment/install/index.md) is built for evaluation on one machine: every password is a published demo value, Keycloak runs in development mode, the application is served over plain HTTP, and every service connects to the database as the superuser. Work through this page before real users sign in. Some steps cannot be done later without losing data: secrets stored under the demo encryption key, for example, must be entered again once the key changes.

## Checklist

- [ ] Pull released images from Docker Hub, with every `*_TAG` in `.env` set to a version of the release (see [Registries and image versions](/docs/deployment/configuration/infrastructure.md#registries-and-image-versions))
- [ ] [Replace every demo secret](#replace-the-demo-secrets), including the encryption key of stored plugin secrets
- [ ] [Serve the application over HTTPS](#serve-over-https) and review the proxy routes and limits
- [ ] [Run Keycloak in production mode](#run-keycloak-in-production-mode)
- [ ] [Give each service its own database user](#give-each-service-its-own-database-user)
- [ ] [Back up](#back-up) the databases, the files, and the configuration, and test a restore
- [ ] [Size the containers](#size-the-containers) for your load
- [ ] [Plan for several API instances](#run-several-api-instances), if you run more than one
- [ ] [Monitor health and metrics](#monitor-health-and-metrics), and keep the monitoring endpoints internal
- [ ] Configure email for the [notification service](/docs/deployment/configuration/backend/notification.md) and for [Keycloak](/docs/deployment/configuration/keycloak.md#email)

---

## Replace the demo secrets {#replace-the-demo-secrets}

Every secret below is published in the docker-deployment repository and in this documentation. Generate your own values, for example with `openssl rand -base64 24`, and set each one in every place listed.

| Secret | Demo value | Set in | Repeated in |
| --- | --- | --- | --- |
| PostgreSQL superuser | `postgres` / `postgres-admin` | `config-files/postgres/postgres.env` (`POSTGRES_PASSWORD`) | `DB_PASS` of the API service, `DB_PASSWORD` of the notification and annotation services, `KC_DB_PASSWORD` of Keycloak. Better: [a user per service](#give-each-service-its-own-database-user). |
| RabbitMQ user | `guest` / `guest` | `config-files/rabbitmq/rabbitmq.env` | `RABBIT_USER` and `RABBIT_PASS` of the API, notification, and annotation services |
| Elasticsearch superuser | `elastic` / `elastic` | `.env` (`ELASTIC_PASSWORD`) | - |
| Elasticsearch user of the API service | `opencdmp-api-test` / `opencdmp` | `.env` (`ELASTIC_API_PASSWORD`) | - (Docker Compose passes it to the API service as `ELASTIC_PASS`) |
| Keycloak administrator (`master` realm) | `keycloak-admin` / `admin` | `config-files/keycloak/keycloak.env` (`KC_BOOTSTRAP_ADMIN_USERNAME`, `KC_BOOTSTRAP_ADMIN_PASSWORD`) | - |
| Secret of the `api` client | `web_secret` | The realm (**Clients** > `api` > **Credentials**) | `KEYCLOAK_API_CLIENT_SECRET`, `FILE_TRANSFORMER_AUTH_CLIENT_SECRET`, `DEPOSIT_AUTH_CLIENT_SECRET`, and `EVALUATOR_AUTH_CLIENT_SECRET` of the API service, and the **Client secret** of plugins that organisations added with this client |
| Secrets of the `annotation`, `notification`, and `plugins` clients | `annotation_secret`, `notification_secret`, `plugins_secret` | The realm | Not used by the example configuration; regenerate them anyway |
| Realm user `opencdmp-admin` (System Administrator) | `admin` | The realm (**Users**) | - |
| Realm user `dmp-keycloak-api` (`realm-admin` of the realm) | `admin` | The realm (**Users**) | `KEYCLOAK_API_PASSWORD` of the API service |
| Encryption key of stored plugin secrets | `rmpTvZnRWzyisUtFADBcZCn0q7Z75Xdz` / `ec05d521a23f80ad` | `TENANT_CONFIG_ENCRYPTION_AES_KEY` and `TENANT_CONFIG_ENCRYPTION_AES_IV` of the API service; the same values are also its built-in defaults | - |

:::danger Change the encryption key before anyone stores a plugin secret
The API service encrypts the secrets that organisations and users store for plugins (repository access tokens and passwords, client secrets of added plugins) and the authentication request bodies of reference types and prefilling sources with `TENANT_CONFIG_ENCRYPTION_AES_KEY` (32 characters) and `TENANT_CONFIG_ENCRYPTION_AES_IV` (16 characters). Secrets stored under one key cannot be read after the key changes and must be entered again. Set both before the installation goes live, for example with `openssl rand -hex 16` for the key and `openssl rand -hex 8` for the IV. See the [backend configuration](/docs/deployment/configuration/backend/index.md#encryption-configuration).
:::

PostgreSQL, RabbitMQ, Elasticsearch, and Keycloak read their initial passwords only when they initialize an empty data folder. On an installation that already ran, change the password in the service itself (`ALTER USER` in PostgreSQL, `rabbitmqctl change_password`, the Elasticsearch security API, or the Keycloak admin console), then update the files that repeat it.

The realm export also contains the example's addresses; work through [Start from the shipped realm export](/docs/deployment/configuration/keycloak.md#recommended-start-from-the-shipped-realm-export). The configuration files of the plugins hold repository credentials (for example `DEPOSIT_ZENODO_ACCESS_TOKEN`); keep `config-files/` readable by the administrators only.

---

## Serve over HTTPS {#serve-over-https}

### What the example proxy routes {#proxy-routes}

The `opencdmp.proxy` container (Nginx) is the only service published on the host. Its site configuration, `config-files/proxy/ProxyNginx.conf`, routes by path prefix; Nginx picks the longest matching prefix, so `/api/notification/` wins over `/api/`:

| Location | Forwarded to | Notes |
| --- | --- | --- |
| `/` | `opencdmp.frontend:8080` | The webapp. Any path that no other location matches, including `/actuator`, ends up here. |
| `/api/notification/` | `opencdmp.notification:8080` | Notification service |
| `/api/annotation/` | `opencdmp.annotation:8080` | Annotation service |
| `/api/` | `opencdmp.backend:8080` | API service, including the Swagger UI at `/api/swagger-ui` |
| `/ws/` | `opencdmp.backend:8080` | WebSocket connection of the API service, which shows who else is editing a plan. Sends the `Upgrade` and `Connection` headers over HTTP/1.1 and keeps the connection open for up to an hour (`proxy_read_timeout 3600`). |
| `/auth/` | `opencdmp.keycloak:8080` | Keycloak, with the `X-Forwarded-*` headers it needs to build its public addresses |

Every location sets `Host`, `X-Real-IP`, `X-Forwarded-For`, and `X-Forwarded-Proto`, and rewrites redirects (`proxy_redirect`) to the public address `http://opencdmp.localhost:8180`. Not routed, and to be kept that way: the services' `/actuator` endpoints, Keycloak's management port `9000`, RabbitMQ, Elasticsearch, PostgreSQL, and the plugins.

The proxy's main configuration, `config-files/proxy/nginx.conf`, sets the limits that matter for uploads and sign-in:

| Setting | Example value | What it limits |
| --- | --- | --- |
| `client_max_body_size` | `1150m` | Largest request body. Keep it at least as large as the API service's `MULTIPART_MAX_REQUEST_SIZE` (default `100MB`; see [Upload limits](/docs/deployment/configuration/backend/index.md#upload-limits)). |
| `large_client_header_buffers` | `4 32k` | Largest request header line. Access tokens travel in the `Authorization` header; the API service itself accepts headers of up to 16 KB. |
| `proxy_read_timeout` (per location) | `90` seconds | How long the proxy waits for a response. Large exports, imports, or Data Transfer operations that take longer fail with `504 Gateway Time-out`; raise the value on `/api/` if that happens. |

### Terminate TLS at the proxy

1. **Add a TLS server** to `ProxyNginx.conf`, with your certificate, and redirect plain HTTP to it:

   ```nginx title="config-files/proxy/ProxyNginx.conf"
   server {
       listen 80;
       server_name opencdmp.example.org;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       http2 on;
       server_name opencdmp.example.org;

       ssl_certificate     /etc/nginx/certs/fullchain.pem;
       ssl_certificate_key /etc/nginx/certs/privkey.pem;

       add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
       add_header X-Content-Type-Options nosniff always;
       add_header Referrer-Policy strict-origin always;

       # The location blocks of the example, with their proxy_redirect targets
       # changed to https://opencdmp.example.org/...
   }
   ```

   Mount the certificate folder into the proxy container, and publish ports `80` and `443` instead of `8180` in `docker-compose.override.yml`. The example keeps a set of security headers commented out at the top of its server block; enable the ones that suit you once HTTPS works.
2. **Keep `X-Forwarded-Proto $scheme`** in every location, so that Keycloak and the services know the original request was HTTPS. If another load balancer terminates TLS in front of the proxy, forward its `X-Forwarded-Proto` instead.
3. **Replace the example address** `http://opencdmp.localhost:8180` with `https://opencdmp.example.org` everywhere:
   - `.env`: `WEBAPP_API_URL`, `INSTALLATION_URL`, `KEYCLOAK_ADDRESS`;
   - `keycloak.env`: `KC_HOSTNAME`, `KC_HOSTNAME_ADMIN`;
   - the API service: `IDP_ISSUER_URI`, `CORS_ALLOWED_ORIGIN`, `KEYCLOAK_API_SERVER_URL`, the `*_AUTH_TOKEN_ENDPOINT` variables, `SWAGGER_SERVER_URL`, `SWAGGER_AUTH_REDIRECT_URL`;
   - the notification and annotation services: `IDP_ISSUER_URI`, `CORS_ALLOWED_ORIGIN`;
   - every plugin: `IDP_ISSUER_URI`, and the Zenodo service's `OPENCDMP_DOMAIN` and `DEPOSIT_ZENODO_REDIRECT_URL`;
   - the realm: the URLs of the `webapp` and `swagger` clients;
   - the proxy: `server_name` and the `proxy_redirect` lines.
4. **Let the containers reach the public address.** The services sign in to Keycloak and check tokens at the public address (`IDP_ISSUER_URI`, the token endpoints, `KEYCLOAK_API_SERVER_URL`), because the issuer of a token must match exactly. The example gives the proxy the network alias `opencdmp.localhost` on both Docker networks so that the containers reach it under the public name. Do the same with your host name, or make sure that the public DNS name resolves, and is reachable, from inside the containers.

The realm of the example requires HTTPS for requests that do not come from a private network address (`sslRequired: external`), so users outside your network cannot sign in until TLS works.

---

## Run Keycloak in production mode {#run-keycloak-in-production-mode}

The example starts Keycloak with `start-dev`, which relaxes its checks and caches for development. For production, use `start` in `docker-compose.override.yml`:

```yaml title="docker-compose.override.yml"
  opencdmp.keycloak:
    command: ["start", "--log=console,file", "--log-file=/tmp/logs/keycloak.log", "--import-realm"]
```

`--import-realm` imports the realm only when it does not exist yet, so it is harmless on later starts. In production mode Keycloak insists on a host name and on HTTPS. Behind the TLS-terminating proxy, set in `keycloak.env`:

| Env Variable | Production value | Why |
| --- | --- | --- |
| `KC_HOSTNAME` | `https://opencdmp.example.org/auth/` | The public address; tokens carry it in their issuer. |
| `KC_HOSTNAME_ADMIN` | `https://opencdmp.example.org/auth/`, or a separate internal address | Where the admin console is served. |
| `KC_HOSTNAME_STRICT` | `true` | Answer only on the configured host name (the example sets `false`). |
| `KC_PROXY_HEADERS` | `xforwarded` | Trust the `X-Forwarded-*` headers of the proxy. |
| `KC_HTTP_ENABLED` | `true` | The proxy talks plain HTTP to Keycloak on the internal network. |
| `KC_HTTP_RELATIVE_PATH` | `/auth` | Keep the path of the example, or change it together with the proxy location and every Keycloak address. |
| `KC_DB_USERNAME`, `KC_DB_PASSWORD` | A dedicated user | See [the next section](#give-each-service-its-own-database-user). |

After the first start, create a permanent administrator in the `master` realm and delete the temporary one that `KC_BOOTSTRAP_ADMIN_USERNAME` created. All variables are described in [Keycloak environment variables](/docs/deployment/configuration/keycloak.md#environment-variables); see the [Keycloak guides on configuring a server and running behind a reverse proxy](https://www.keycloak.org/guides#server) for the rest.

---

## Give each service its own database user {#give-each-service-its-own-database-user}

The example connects Keycloak, the API service, and the notification and annotation services to PostgreSQL as the superuser `postgres`. Give each its own user instead:

- **Keycloak**: a user that owns the `keycloak` database.
- **API service**: a user that owns the `opencdmp` database. The API service creates and migrates every table at startup, including the `ntf_` and `ant_` tables of the notification and annotation services, so it needs to create, alter, and drop tables, indexes, and constraints (see [Database user permissions](/docs/deployment/install/upgrade.md#database-user-permissions)). The schema needs the `uuid-ossp` extension, which a database owner may create on PostgreSQL 13 and later.
- **Notification and annotation services**: a user that may read and write the tables, but not change the schema.

For a new installation, create the users in the init script, before the first start:

```sql title="config-files/postgres/init-scripts/00-db-init.sql"
CREATE ROLE keycloak LOGIN PASSWORD '<keycloak-db-password>';
CREATE ROLE opencdmp LOGIN PASSWORD '<api-db-password>';
CREATE ROLE opencdmp_services LOGIN PASSWORD '<services-db-password>';

CREATE DATABASE "keycloak" WITH OWNER "keycloak";
CREATE DATABASE "opencdmp" WITH OWNER "opencdmp" TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';

\connect opencdmp
-- Tables and sequences that the API service creates are usable by the notification and annotation services
ALTER DEFAULT PRIVILEGES FOR ROLE opencdmp IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO opencdmp_services;
ALTER DEFAULT PRIVILEGES FOR ROLE opencdmp IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO opencdmp_services;
```

Then set `KC_DB_USERNAME` and `KC_DB_PASSWORD` in `keycloak.env`, `DB_USER` and `DB_PASS` of the API service, and `DB_USER` and `DB_PASSWORD` of the notification and annotation services. To narrow the services' user to their own tables, grant it the `ntf_` or `ant_` tables only, with one user per service.

On an existing installation, the tables belong to `postgres`. Create the users, transfer the ownership of the tables, sequences, and views of the `opencdmp` database to the API service's user, grant the services' user its rights on the existing tables (`GRANT ... ON ALL TABLES IN SCHEMA public`), and try it on a copy of the database first.

---

## Back up {#back-up}

| What | Where in the Docker example | How |
| --- | --- | --- |
| The `opencdmp` database: plans, assets, templates, users, settings, and the tables of the notification and annotation services | PostgreSQL | `docker compose exec -T opencdmp.postgres pg_dump -U postgres -Fc opencdmp > opencdmp.dump` |
| The `keycloak` database: accounts, passwords, groups, and the realm | PostgreSQL | `docker compose exec -T opencdmp.postgres pg_dump -U postgres -Fc keycloak > keycloak.dump` |
| Uploaded and generated files (`FILE_STORAGE` of the API service) | `storage/opencdmp/backend/` | Copy the folder |
| Configuration | `.env`, `docker-compose*.yml`, `config-files/` | Copy them; they contain secrets, so keep the copy encrypted |

The database refers to the files by name, so take the database dump and the copy of the files at the same time, or stop the API service while you take them.

The Elasticsearch index needs no backup: rebuild it after a restore with **Rebuild plan and asset indexes** on the [Maintenance](/docs/administering/maintenance.md#task-groups) page. RabbitMQ holds messages only while they travel between services; the API service keeps the messages it has not yet delivered in its database.

Restore a backup on a test machine from time to time. Before an upgrade, take a full backup: a database migrated by a newer version cannot be used with the previous one (see the [Upgrade guide](/docs/deployment/install/upgrade.md#2-back-up-your-data)).

---

## Size the containers {#size-the-containers}

The example's `docker-compose.override.yml` reserves memory for each container and caps it:

| Containers | Reserved | Limit |
| --- | --- | --- |
| API service, webapp, PostgreSQL, Elasticsearch, Keycloak, PDF service | 1 GB each | 2 GB each |
| Notification and annotation services | 512 MB each | 1 GB each |
| RabbitMQ | 256 MB | 512 MB |
| Proxy, DOCX and RDA JSON transformers, evaluator, Zenodo service | 128 MB each | 256 MB each |

Together the example reserves about 8 GB and may grow to about 16 GB, plus swap (`memswap_limit`). Plan the host's memory for the limits, not the reservations, and add every plugin you add.

- **Java heap**: the Java services do not set a heap size, so the JVM takes a quarter of the container's memory limit, for example 512 MB of the API service's 2 GB. To give a service more, raise its limit, and let the JVM use more of it with `JAVA_TOOL_OPTIONS=-XX:MaxRAMPercentage=75` in the service's `environment`.
- **Elasticsearch**: the example sets the heap to 1 GB (`ES_JAVA_OPTS=-Xmx1g -Xms1g`), half of its 2 GB memory limit, because Elasticsearch needs the rest for memory outside the heap and the filesystem cache. Keep that ratio when you raise the limit: for example a 4 GB limit with `-Xmx2g -Xms2g`.
- **Plugins**: 256 MB is enough for small plans. The DOCX transformer and the PDF service need more for large plans with many assets.
- **Disk**: PostgreSQL, the Elasticsearch index, the uploaded files, and the logs grow with use. The log files of each Java service are kept for 15 days without a size limit (see [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md#log-files-of-the-java-services)).

---

## Run several API instances {#run-several-api-instances}

You can run more than one API service, for high availability or for load. The example names its containers (`container_name`), so `docker compose up --scale` does not work with it; define each instance as its own service, or run them on separate hosts, and balance them in the proxy:

```nginx
upstream opencdmp_api {
    ip_hash;                      # keep a user on one instance, for the WebSocket connection
    server opencdmp.backend-1:8080;
    server opencdmp.backend-2:8080;
}
```

Use `proxy_pass http://opencdmp_api;` in the `/api/` and `/ws/` locations. Then:

- **Run the same version everywhere.** When the instances start together, one applies the database migrations and the others wait for it (see [Multiple API instances](/docs/deployment/install/upgrade.md#multiple-api-instances)).
- **Share the file storage.** Every instance must mount the same `FILE_STORAGE` folder: a file uploaded through one instance is read by another.
- **Deliver webhooks from one instance.** Set `WEBHOOKS_TASK_ENABLED=false` on all instances but one, because delivery rows are not locked across instances (see [Webhooks configuration](/docs/deployment/configuration/backend/index.md#webhooks-configuration)).
- **Expect the other background tasks on every instance.** The message outbox and inbox, and the cleanup of temporary files and of processed messages, run on every instance. They tolerate each other, but concurrent runs can log optimistic-locking conflicts, which are harmless.
- **Keep users on one instance.** The WebSocket connection that shows who else is editing a plan is held in the memory of one instance (`ip_hash` above): users connected to different instances do not see each other.
- **Allow for caches.** Each instance caches plugin configurations and settings in memory for up to ten minutes, so a change made through one instance can take that long to reach the others.

---

## Monitor health and metrics {#monitor-health-and-metrics}

The API service and the plugins report their health at `/actuator/health` and publish Prometheus metrics at `/actuator/prometheus`, on their own port and without authentication. Keycloak reports on its management port `9000`. The example proxy does not route these endpoints, and it should stay that way: they show the state of the database and other internals to anyone who can reach them. Scrape and probe them from inside the Docker network. The endpoints, the health checks of the example, and a Prometheus configuration are in [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md#health-checks).

Watch at least:

- the health of every service, and the containers' restart counts (`docker compose ps`);
- `ERROR` lines in each service's `logging.log`;
- `5xx` responses in the proxy's `access.log`;
- the free disk space of the storage and log folders;
- the **Database** card of the [Maintenance](/docs/administering/maintenance.md#database-migrations) page after each upgrade.

---

## See also

- [Installation](/docs/deployment/install/index.md) - The Docker example this page starts from
- [Upgrade guide](/docs/deployment/install/upgrade.md) - Backups, migrations, and rollbacks between versions
- [Infrastructure](/docs/deployment/configuration/infrastructure.md) - PostgreSQL, RabbitMQ, Elasticsearch, and the `.env` file
- [Keycloak setup](/docs/deployment/configuration/keycloak.md) - The realm, integration clients, and Keycloak's environment variables
- [Registering plugin services](/docs/deployment/configuration/plugin-services.md) - Plugins of the installation and of organisations
- [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) - Log files, health checks, and metrics
- [Troubleshooting](/docs/troubleshooting.md) - Diagnosing a running installation
