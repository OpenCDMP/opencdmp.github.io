---
sidebar_position: 6
title: Logging and monitoring
description: Where each OpenCDMP service writes its logs, how to change log levels and read the log files, and the health and metrics endpoints
---

# Logging and monitoring

Each OpenCDMP service writes its own logs and reports its own health. For the audit events that the API service records, see the [audit event reference](/docs/developers/audit-events.md).

## Where the logs are {#log-locations}

The Java services (the API service, the notification and annotation services, and the plugins) write their logs to **files**, not to the console, so `docker compose logs` shows little more than their startup banner. The Docker example mounts each service's log folder under `LOG_FILES_PATH` (`./logs` by default):

| Service | Container | Host folder | Files |
| --- | --- | --- | --- |
| API service | `opencdmp.backend` | `logs/opencdmp/backend/` | `logging.log`, `auditing.log` |
| Notification service | `opencdmp.notification` | `logs/opencdmp/notification/` | `logging.log`, `auditing.log` |
| Annotation service | `opencdmp.annotation` | `logs/opencdmp/annotation/` | `logging.log`, `auditing.log` |
| DOCX file transformer | `opencdmp.file.transformer.docx` | `logs/opencdmp/file-transformer-docx/` | `logging.log`, `auditing.log` |
| RDA JSON file transformer | `opencdmp.file.transformer.rdajson` | `logs/opencdmp/file-transformer-rda-json/` | `logging.log`, `auditing.log` |
| RDA maDMP evaluator | `opencdmp.evaluator` | `logs/opencdmp/evaluator-rda-madmp/` | `logging.log`, `auditing.log` |
| Zenodo deposit service | `opencdmp.zenodo` | `logs/opencdmp/zenodo/` | `logging.log`, `auditing.log` |
| Reverse proxy | `opencdmp.proxy` | `logs/proxy/` | `access.log`, `error.log` |
| Keycloak | `opencdmp.keycloak` | `logs/keycloak/` | `keycloak.log` (also on the console) |
| Elasticsearch | `opencdmp.elasticsearch` | `logs/elasticsearch/` | Elasticsearch's own files (also on the console) |

The webapp's web server, PostgreSQL, RabbitMQ, and the PDF service log to the console only: read them with `docker compose logs <container>`.

## Log files of the Java services

Each Java service writes two files:

| File | Contents |
| --- | --- |
| `logging.log` | Troubleshooting output of the service and its libraries: startup, database migrations, warnings, and errors with their stack traces. |
| `auditing.log` | One line per completed API call that the service audits, at `INFO` level whatever the configured level. |

Both files roll over every day and when they reach 100 MB; rolled files are written next to them, in `LOGGING_PATH`, and named with the date and an index, for example `logging.2026-10-01.0.log`. Rolled files are kept for 15 days. There is no limit on their total size, so a busy day at `DEBUG` level can fill a disk; keep an eye on the log volume.

## Log levels

`LOGGING_DEFAULT_LOG_LEVEL` (default `WARN`) sets the level of the framework loggers: `org.springframework.web`, `org.hibernate`, `gr.cite` (the shared libraries of the services), and, in the API service, the Elasticsearch and HTTP client loggers. Everything else, including the code of OpenCDMP itself (`org.opencdmp`) and the database migrations, logs at `INFO` through the root logger. The audit logger is always at `INFO`.

To make one part more verbose without replacing the configuration, set a Spring Boot logger level in the service's `app-<PROFILE>.env` file, or as an environment variable of its container, and restart the service:

```properties title="config-files/opencdmp/backend/config/app-test.env"
# Debug output of OpenCDMP's own code
logging.level.org.opencdmp=DEBUG
```

```yaml title="docker-compose.override.yml (equivalent environment variable)"
  opencdmp.backend:
    environment:
      - LOGGING_LEVEL_ORG_OPENCDMP=DEBUG
```

:::warning
At `DEBUG` level the services log request payloads, which can include personal data and, for deposit services, credentials. Turn `DEBUG` on for a limited time and remove the files afterwards.
:::

To change where or how the logs are written, for example to also write them to the console so that `docker compose logs` shows them, copy the service's `logging/logback.xml` from its source repository, change it, mount it into the container, and point `LOGGING_CONFIG_PATH` to it (for example `file:/config/logback.xml`). A console appender to add next to the file appenders looks like this:

```xml
<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
        <Pattern>%date{ISO8601} [%thread] %-5level %logger{36} [%X{req.id}] - %message%n</Pattern>
    </encoder>
</appender>
```

Reference it with `<appender-ref ref="CONSOLE"/>` in the `root` element and in the loggers you want on the console.

## Reading the logs

### Troubleshooting log format

```text
%date{ISO8601} [%thread] %-5level %logger{36} [%X{req.id}] - %message%n
```

For example:

```text
2026-10-01 14:23:01,456 [http-nio-8080-exec-3] WARN  o.o.s.plan.PlanServiceImpl [a1b2c3d4-...] - ...
```

| Field | Description |
| --- | --- |
| Timestamp | Local time of the container, in ISO 8601 format |
| Thread | Thread that wrote the line; `http-nio-...` threads serve requests |
| Level | `ERROR`, `WARN`, `INFO`, or `DEBUG` |
| Logger | Class that wrote the line, abbreviated |
| Request id | Id of the request that the line belongs to; empty for background tasks |
| Message | The message, followed by the stack trace for errors |

### Audit log format {#audit-log-format}

```text
%date{ISO8601} - %X{req.id} - %message%n
```

Each line holds a timestamp, the request id, and a JSON object under the `d` key. For example (formatted for readability):

```text
2026-04-15 16:15:59,048 - da05effb-f63d-4555-8ff6-3042eb2cdb15 - {
  "d": {
    "Plan_Lookup": 5001,
    "usr": {
      "usr.subject": "8a0d0e1f-2723-4ac2-8056-8f395f8789c7",
      "usr.name": "Jane Doe"
    },
    "id": "71f92236-07a4-4c4d-ad0c-7104c87628ce",
    "invoker": {
      "req.requestURI": "/api/plan/71f92236-07a4-4c4d-ad0c-7104c87628ce",
      "req.remoteAddr": "172.18.0.12",
      "req.remoteUser": "Jane Doe",
      "req.method": "GET",
      "req.requestURL": "http://opencdmp.localhost:8180/api/plan/71f92236-07a4-4c4d-ad0c-7104c87628ce",
      "req.scheme": "http",
      "req.userAgent": "Mozilla/5.0 ..."
    },
    "fields": {
      "empty": false,
      "fields": ["id", "blueprint.definition.sections.id"]
    },
    "ts": "2026-04-15T13:15:59.047159200Z"
  }
}
```

| Field | Description |
| --- | --- |
| Timestamp | Local time of the container, in `yyyy-MM-dd HH:mm:ss,SSS` format |
| Request id | The id that the lines of `logging.log` from the same request carry |
| `d.<EventName>` | The audit event, with its numeric id as the value, for example `"Plan_Lookup": 5001`. See the [audit event reference](/docs/developers/audit-events.md). |
| `d.usr.usr.subject` | Keycloak subject id of the user; the `usr` block is missing for anonymous calls |
| `d.usr.usr.name` | Display name of the user |
| `d.invoker` | The HTTP request: URI, method, remote address, and user agent |
| `d.fields` | The fields the caller asked for (the `f=` query parameters) |
| `d.ts` | Time of the event in UTC |
| Other keys | Context of the event, such as `id` for a single item, `lookup` for query parameters, or `model` for saved data |

Audit lines are written only for calls that completed successfully: refused and failed calls appear in `logging.log` only.

The remote address is the address the service saw, which behind the proxy is the proxy's. The proxy's `access.log` records the client address and the `X-Forwarded-For` chain.

### Useful commands

Run them in the folder of `docker-compose.yml`:

```bash
# Follow the API service while it starts or migrates the database
tail -f logs/opencdmp/backend/logging.log

# The latest errors
grep -n ' ERROR ' logs/opencdmp/backend/logging.log | tail -20

# Everything one request did, in both files (take the id from an error line)
grep -h 'a1b2c3d4-5e6f-7a8b-9c0d-ef1234567890' logs/opencdmp/backend/*.log

# Who deleted plans, and when
grep '"Plan_Delete"' logs/opencdmp/backend/auditing.log

# Requests that the proxy answered with a server error
awk '$9 >= 500' logs/proxy/access.log | tail -20
```

To find the user behind a `usr.subject`, look it up in Keycloak (**Users**, search by id).

## Health checks {#health-checks}

The API service and the plugins report their health and metrics through Spring Boot Actuator on their own port (`8080` in the Docker example):

| Endpoint | Content |
| --- | --- |
| `/actuator/health` | `"status":"UP"` or `"DOWN"`, with the state of each checked dependency, such as the database and the disk space |
| `/actuator/info` | Application information |
| `/actuator/metrics` | The names of the available metrics; `/actuator/metrics/<name>` shows one |
| `/actuator/prometheus` | All metrics in the Prometheus text format |

The endpoints need no authentication, and the health endpoint shows the details of every check. The Docker example's proxy does not forward `/actuator`: a request for `https://<host>/actuator/...` reaches the webapp, not a service. Keep it that way, and reach the endpoints from inside the Docker network:

```bash
docker compose exec opencdmp.backend wget -qO- http://localhost:8080/actuator/health
docker compose exec opencdmp.backend wget -qO- http://opencdmp.zenodo:8080/actuator/health
```

The Docker example uses these endpoints as container health checks, which `docker compose ps` shows in the **STATUS** column:

| Container | Health check |
| --- | --- |
| API service and plugins | `wget` of `/actuator/health`, expecting `UP`, every 30 seconds after a 120-second start period |
| PostgreSQL | `pg_isready` |
| Elasticsearch | `_cluster/health` reports `green` or `yellow` |
| Keycloak | `/auth/health/ready` on the management port `9000` (needs `KC_HEALTH_ENABLED=true`) |
| RabbitMQ | `rabbitmq-diagnostics -q ping` |

The notification and annotation services have no health check in the Docker example.

## Metrics

The API service and the plugins publish their metrics in the Prometheus format at `/actuator/prometheus`, tagged with `application` set to the service's name (`opencdmp-backend-api` for the API service). A Prometheus server on the same Docker network can scrape them:

```yaml title="prometheus.yml"
scrape_configs:
  - job_name: opencdmp-api
    metrics_path: /actuator/prometheus
    static_configs:
      - targets: ['opencdmp.backend:8080']
  - job_name: opencdmp-plugins
    metrics_path: /actuator/prometheus
    static_configs:
      - targets:
          - opencdmp.file.transformer.docx:8080
          - opencdmp.file.transformer.rdajson:8080
          - opencdmp.evaluator:8080
          - opencdmp.zenodo:8080
```

Keycloak publishes its own metrics at `/auth/metrics` on the management port `9000` when `KC_METRICS_ENABLED` is `true`, as in the Docker example.

## See also

- [Audit events](/docs/developers/audit-events.md) - Every audit event and its id
- [Backend configuration: logging](/docs/deployment/configuration/backend/index.md#logging-configuration) - Logging settings of the API service
- [Settings common to all plugin services](/docs/deployment/configuration/plugin-services.md#plugin-logging) - Logging settings of the plugins
- [Before going to production](/docs/deployment/install/production.md#monitor-health-and-metrics) - Monitoring a production installation
- [Troubleshooting](/docs/troubleshooting.md) - Diagnosing problems from the logs
