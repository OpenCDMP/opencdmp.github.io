---
sidebar_position: 20
title: Troubleshooting a deployment
description: Diagnose services that do not start, sign-in and 401 errors, database migrations, Elasticsearch, RabbitMQ, Keycloak, memory limits, and plugin connectivity
---

# Troubleshooting a deployment

For problems that administrators fix in the application, see [Troubleshooting for administrators](/docs/administering/troubleshooting.md).

The commands use the service names of the example Docker deployment (`opencdmp.backend`, `opencdmp.keycloak`, `opencdmp.elasticsearch`, and so on). Run them from the folder that holds `docker-compose.yml`.

## Services do not start

### Find the failing service {#find-the-failing-service}

```bash
# State, health, and exit code of every container, including the ones that exited
docker compose ps -a
```

The services start in dependency order (see [Startup order](/docs/deployment/configuration/infrastructure.md#startup-order)), so one failing service holds back the services that wait for it. Docker Compose then reports, for example, `dependency failed to start: container opencdmp.keycloak is unhealthy`, or `service "opencdmp.elasticsearch.setup" didn't complete successfully: exit 1`. Look at the service it names first:

```bash
docker compose logs opencdmp.keycloak --tail 200
```

The Java services (the API service, the notification and annotation services, and the plugins) write their logs to files, not to the console; read them under `logs/` (see [Where the logs are](/docs/deployment/configuration/logging-and-monitoring.md#log-locations)):

```bash
tail -n 200 logs/opencdmp/backend/logging.log
```

The API service and the plugins report their health at `/actuator/health`; see [Health checks](/docs/deployment/install/upgrade.md#health-checks).

### Elasticsearch cannot download its analysis-icu plugin on the first start

On its first start, `opencdmp.elasticsearch` installs the `analysis-icu` plugin, which the search indexes need, and downloads it from Elastic. Without internet access the install fails, Elasticsearch never becomes healthy, and the API service does not start.

- Start once with internet access: the plugin is kept in `storage/elasticsearch/plugins` for later starts.
- On a host without internet access, download `analysis-icu` for the Elasticsearch version of `ELK_TAG` elsewhere and install it from the file with `bin/elasticsearch-plugin install file:///<path>/analysis-icu-<version>.zip`.

### opencdmp.elasticsearch.setup fails

This container waits for Elasticsearch, creates the role and user that the API service uses for its indexes, and exits. The API service starts only after it completes successfully.

- Its log names the step that failed: *Set the ELASTIC_PASSWORD environment variable in the .env file*, *Failed to create the role*, or *Failed to create the user*.
- If you changed `ELASTIC_PASSWORD` in `.env` after the first start, Elasticsearch still has the old password: the superuser's password is set only on the first start, with an empty data folder. Change it with the Elasticsearch security API as well, or put the old value back in `.env`.

### Keycloak does not import the realm {#keycloak-does-not-import-the-realm}

On its first start, Keycloak imports the `OpenCDMP` realm from `config-files/keycloak/imports/OpenCDMP-realm.json`.

- **The file is invalid.** Keycloak stops with the import error in its log, and every service that waits for Keycloak stays down.
- **Edits to the file have no effect.** The realm is imported only once: when it already exists, Keycloak logs that the import was skipped. Change the realm in the Keycloak admin console instead, or start over with an empty Keycloak database.

See [Keycloak](/docs/deployment/configuration/keycloak.md#environment-variables).

### A container is killed for lack of memory {#a-container-runs-out-of-memory}

Each service of the example has a memory limit (`deploy.resources.limits.memory` in `docker-compose.override.yml`). A container that exceeds it is killed and exits with code `137`. Check with:

```bash
docker inspect --format '{{.State.OOMKilled}}' <container>
```

Raise the limit of that service, or give Docker more memory (Docker Desktop has its own memory setting). For Elasticsearch, keep the heap in `ES_JAVA_OPTS` within the container's limit.

## The API service does not start

Read its log first:

```bash
tail -n 200 logs/opencdmp/backend/logging.log
```

### The database cannot be reached

```text
Connection to <host>:5432 refused. Check that the hostname and port are correct and that the postmaster is accepting TCP/IP connections.
FATAL: password authentication failed for user "<user>"
```

- Check that PostgreSQL is running and healthy, and test it directly:
  ```bash
  docker compose exec opencdmp.postgres psql -U <user> -d <database> -c "SELECT 1;"
  ```
- Check `DB_URL`, `DB_USER`, and `DB_PASS`. The host of `DB_URL` is the service name on the Docker network (`opencdmp.postgres` in the example), not `localhost`.
- Check for special characters in the password that need escaping, and for firewall rules that block port `5432`.

See [PostgreSQL](/docs/deployment/configuration/infrastructure.md#postgresql).

### A database migration fails

```text
The database is older than OpenCDMP 1.2: it lacks the changes of ... Apply the scripts up to 01.00.010 from the db/ folder of OpenCDMP 1.3.0 by hand, then restart.
The definition of plan blueprint <id> could not be parsed. Fix it, then restart.
```

The API service migrates the database at startup and stops when a migration fails; the log names the migration and the cause.

- **A database older than 1.2** needs the scripts of the 1.3.0 release's `db` folder applied by hand first; see [Installations older than 1.2](/docs/deployment/install/upgrade.md#installations-older-than-12).
- **An item that cannot be converted** is named in the message. Fix it, then restart the API service.
- **Missing permissions.** The user of `DB_USER` must be allowed to create, alter, and drop tables, indexes, and constraints; see [Database user permissions](/docs/deployment/install/upgrade.md#database-user-permissions).

See [If a migration fails](/docs/deployment/install/upgrade.md#if-a-migration-fails).

### Keycloak cannot be reached

```text
Unable to resolve the Configuration with the provided Issuer of "<IDP_ISSUER_URI>"
```

Check that Keycloak is running and healthy, and that `IDP_ISSUER_URI` is correct and reachable from inside the API service's container (see [the next section](#issue-signed-in-but-every-request-fails-with-401)).

### A configuration variable is missing

```text
Could not resolve placeholder 'DB_URL' in value "${DB_URL}"
```

The API service reads its variables from `app.env` and `app-<PROFILE>.env` in its mounted configuration folder (`config-files/opencdmp/backend/config/` in the example, for example `app-test.env`), not from the `.env` file of Docker Compose. Check that `PROFILE` in `.env` matches the name of that file, and that the file defines the variable named in the error. See [Backend configuration](/docs/deployment/configuration/backend/index.md).

### Other causes

- **A port is already in use.** Change the port mapping in `docker-compose.override.yml`.
- **A volume is not writable.** Check the ownership and permissions of the mounted folders.

## Sign-in and browser errors

### Signed in, but every request fails with 401 {#issue-signed-in-but-every-request-fails-with-401}

Signing in works, but the application shows no data or returns to the sign-in page, and the browser's network tab shows `401` for every call to `/api/`.

- **The issuer does not match.** The API service accepts a token only when its issuer (the `iss` claim) equals `IDP_ISSUER_URI`. Keycloak writes into the token the address the browser used to reach it, so the API service must use that same address (for example `http://opencdmp.localhost:8180/auth/realms/OpenCDMP`), not an internal one such as `http://opencdmp.keycloak:8080/...`.
- **The address is not reachable from the container.** The example deployment gives the proxy the alias `opencdmp.localhost` on the internal networks, so the same address works from the browser and from the containers.
- **To compare:** the issuer of the realm is the `issuer` field of `<IDP_ISSUER_URI>/.well-known/openid-configuration`; the frontend reaches Keycloak through `KEYCLOAK_ADDRESS` and `KEYCLOAK_REALM`.
- **The audience does not match.** The token must also carry the audience set in `SECURITY_AUDIENCE`.

### The browser loops between the application and Keycloak

- Check that the Keycloak client's redirect URIs include the address of the webapp.
- Check the issuer, as in [the previous section](#issue-signed-in-but-every-request-fails-with-401).
- Rule out the browser: if the loop stops in a private window, the user's cookies are at fault, not the installation.

### The browser console shows CORS errors

`CORS_ALLOWED_ORIGIN` of the API service must equal the address of the webapp exactly, with protocol and any non-standard port (for example `http://localhost:4200`). Behind a reverse proxy, check that it passes the `Access-Control-Allow-Origin` header through and does not add its own.

### Users are signed out too often

Session lifetimes are set in the Keycloak admin console, under **Realm Settings** > **Sessions** and **Tokens**. The example realm uses an **SSO Session Idle** of 30 minutes, an **SSO Session Max** of 10 hours, and an **Access Token Lifespan** of 5 minutes.

## Supporting services

### Search results are missing or out of date

- **Elasticsearch is down.** With `ELASTIC_ENABLE_DB_FALLBACK=true` (the default), plan and asset listings that fail in Elasticsearch run against the database instead, and the error is logged; the application keeps working, more slowly. With `false`, the listings fail.
- **The indexes do not match the database**, after an upgrade, a restore, or an outage. Run **Rebuild plan and asset indexes** on the [Maintenance](/docs/administering/maintenance.md#task-groups) page.
- **The configuration is wrong.** Check `ELASTIC_HOST`, `ELASTIC_USER`, `ELASTIC_PASS`, and `ELASTIC_USE_SSL`; see [Backend configuration](/docs/deployment/configuration/backend/index.md) and [Elasticsearch](/docs/deployment/configuration/infrastructure.md#elasticsearch).

### Notifications and comments are not processed {#notifications-and-comments-are-not-processed}

The API service sends its events (notifications, invitations, and the changes the annotation and notification services keep a copy of) through RabbitMQ.

- **RabbitMQ is down, or refuses the user.** Check `docker compose ps` and the API service log. The example ships with the default `guest` user; set your own user in `rabbitmq.env` and the matching `RABBIT_USER` and `RABBIT_PASS`. See [RabbitMQ](/docs/deployment/configuration/infrastructure.md#rabbitmq).
- **Events are switched off.** With `QUEUE_ENABLED=false`, the API service sends no events to the notification and annotation services.
- **The notification service does not send email.** Check its log and its mail server settings; see [Mail configuration](/docs/deployment/configuration/backend/notification.md#mail-configuration). Each message and its result is listed on the [Notification Log](/docs/administering/notification-log.md) page.

The API service keeps outgoing events in its `QueueOutbox` table and retries them, so events raised while RabbitMQ was unreachable are sent when it is back. If the annotation or notification service is still out of sync afterwards, run the **Touch events** tasks on the [Maintenance](/docs/administering/maintenance.md#task-groups) page; they resend organisations, users, assets, and plans, not the notifications themselves.

### Plugin connectivity {#plugin-connectivity}

A plugin (file transformer, deposit service, or evaluator) that the API service cannot reach reads **Not responding** under **Settings > Plugins**, and its formats, repositories, or benchmarks do not load. The status is checked when the page first opens; reload the page after fixing the connection. The plugins provided by the installation are listed in `file-transformer-<PROFILE>.yml`, `deposit-<PROFILE>.yml`, and `evaluator-<PROFILE>.yml` of the API service's configuration folder.

- **The base URL.** Register the plugin's base URL, for example `http://opencdmp.file.transformer.docx:8080`, without the path: the API service appends `/api/file-transformer/formats`, `/api/deposit/configuration`, or `/api/evaluator/config` itself. Check the protocol (`http` or `https`).
- **The host name inside Docker.** Use the service name. `localhost` inside a container is the container itself.
- **The network.** The plugin must be reachable from the API service's container, not only from the host. Test from there; any HTTP answer, even `401`, shows that the plugin is reachable, and a connection error or timeout shows that it is not:
  ```bash
  docker compose exec opencdmp.backend wget -S -O- http://opencdmp.file.transformer.docx:8080/api/file-transformer/formats
  ```
  Containers on different Docker networks cannot reach each other; check with `docker network inspect <network-name>`.
- **The certificate.** A plugin behind HTTPS needs a certificate that the API service's JVM trusts. Import a self-signed certificate into its trust store.
- **The plugin itself.** Read its log under `logs/opencdmp/<plugin>/logging.log`, for example `logs/opencdmp/file-transformer-docx/logging.log`.

For downloads in particular:

- **PDF fails, Word works.** The DOCX transformer converts Word documents to PDF with the PDF service (`opencdmp.pdf-service` in the example), at the address in its `PDF_CONVERTER_URL`. Check that it runs; see [File transformer services](/docs/deployment/configuration/backend/file-transformers.md).
- **Shared storage.** A transformer that uses shared storage needs the same volume mounted in the API service and in its own container.

### Deposit service cannot reach the repository {#deposit-service-cannot-reach-the-repository}

The deposit service, not the API service, talks to the external repository. When publishing fails with a network error or a message that the repository refused the credentials, read the deposit service's log, and test outbound access from its container:

```bash
tail -n 100 logs/opencdmp/zenodo/logging.log
docker compose exec opencdmp.zenodo wget -S -O /dev/null https://zenodo.org
```

The installation's own repository credentials, used when an organisation sets none, are in the [deposit service configuration](/docs/deployment/configuration/backend/deposit.md).

## Performance

### The installation is slow

```bash
# CPU and memory of every container
docker stats

# Free disk space
df -h
```

- **Memory.** A service that is close to its memory limit slows down before it is killed; see [A container is killed for lack of memory](#a-container-runs-out-of-memory).
- **The database.** List the longest-running queries:
  ```bash
  docker compose exec opencdmp.postgres psql -U <user> -d <database> -c \
    "SELECT pid, now() - query_start AS duration, query
     FROM pg_stat_activity
     WHERE state != 'idle' ORDER BY duration DESC LIMIT 10;"
  ```
  Run `VACUUM ANALYZE;` the same way to update the table statistics, and move the PostgreSQL data to faster storage if the disk is the bottleneck.
- **Elasticsearch is down**, so listings run against the database; see [Search results are missing or out of date](#search-results-are-missing-or-out-of-date).

## Building plugins

Problems inside a plugin's own code, such as evaluation scores that are always `0`, benchmarks that are not declared, or results that the platform cannot display, are covered in the plugin development guides: [Evaluator](/docs/developers/plugins/evaluator.md) (`rankPlan`, `rankDescription`, `RankConfig`, `ValueRange`, and `SelectionConfiguration`), [File transformers](/docs/developers/plugins/file-transformers.md), and [Deposit](/docs/developers/plugins/deposit.md).

## See also

- [Upgrade guide](/docs/deployment/install/upgrade.md): upgrades and the database migrations
- [Installation](/docs/deployment/install/index.md): the example Docker deployment
- [How to report a problem](/docs/troubleshooting.md#how-to-report-a-problem)
