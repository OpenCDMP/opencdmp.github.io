---
title: Annotation service
sidebar_position: 2
description: Environment variables of the annotation service - authentication, database, RabbitMQ, and logging - and its part in Data Transfer
---

# Annotation service

These are the settings of the [annotation service](/docs/optional-services/annotations.md), read from `app-<PROFILE>.env` in its `config` folder (`config-files/opencdmp/annotation/config/app-test.env` in the Docker example).

## Authentication & core settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL, exactly as the issuer of its tokens (the same value as in the [API service](/docs/deployment/configuration/backend/index.md#authentication--security)). | Yes | - | `https://opencdmp.example.org/auth/realms/OpenCDMP` |
| `SECURITY_AUDIENCE` | Audience that tokens must carry: the [`annotation` client scope](/docs/deployment/configuration/keycloak.md#step-4-create-client-scopes). | Yes | - | `annotation` |
| `CORS_ALLOWED_ORIGIN` | Origin of the webapp (scheme, host, and port) that may call the service. One origin. | Yes | - | `https://opencdmp.example.org` |

## Database configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DB_CONNECTION_STRING` | JDBC address of the `opencdmp` database, the database of the API service. | Yes | - | `jdbc:postgresql://opencdmp.postgres:5432/opencdmp` |
| `DB_USER` | Database user. It reads and writes the tables of the service, which the API service creates (see [a user per service](/docs/deployment/install/production.md#give-each-service-its-own-database-user)). | Yes | - | `opencdmp_services` |
| `DB_PASSWORD` | Password of that user. | Yes | - | `<db-password>` |

## RabbitMQ configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `QUEUE_ENABLED` | Boolean value to connect to RabbitMQ and consume the events of the API service. | No | `true` | `true` |
| `QUEUE_APP_ID` | [RabbitMQ](https://www.rabbitmq.com/) application id of the service. | Yes | - | `opencdmp-annotation` |
| `QUEUE_NAME` | Queue of the service. | Yes | - | `opencdmp_annotation_inbox_queue` |
| `QUEUE_EXCHANGE` | Exchange, the same as `QUEUE_EXCHANGE` of the API service. | Yes | - | `opencdmp_queue` |
| `RABBIT_HOST` | RabbitMQ host. | Yes | - | `opencdmp.rabbitmq` |
| `RABBIT_PORT` | RabbitMQ port. | Yes | - | `5672` |
| `RABBIT_USER` | RabbitMQ user. | Yes | - | `opencdmp` |
| `RABBIT_PASS` | Password of that user. | Yes | - | `<rabbitmq-password>` |

## Logging configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Logback configuration file. | No | `classpath:logging/logback.xml` | `file:/config/logback.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of the framework loggers: `ERROR`, `WARN`, `INFO`, or `DEBUG`. | No | `WARN` | `INFO` |
| `LOGGING_PATH` | Folder of the log files `logging.log` and `auditing.log`. | No | `/logs` | `/logs` |

## Data Transfer integration {#tenant-transfer-integration}

The annotation service exposes transfer endpoints (`/api/annotation/transfer/export`, `/api/annotation/transfer/import`, and `/api/annotation/transfer/purge`) that the main API service calls from the [Data Transfer](/docs/administering/tenant-management/tenant-transfer.md) page to move, copy, or purge the comments of transferred plans and assets. The API forwards the caller's bearer token and `x-tenant` header when it calls them. No configuration is needed on the annotation service side; on the main API service, set `ANNOTATION_SERVICE_URL` to the base URL of this service (see [Data Transfer configuration](/docs/deployment/configuration/backend/index.md#tenant-transfer-configuration)). The annotation service must run the release matching the API service; older releases do not provide the transfer endpoints.

---

## See also

- [Backend configuration](/docs/deployment/configuration/backend/index.md) - The API service
- [Backend configuration: RabbitMQ](/docs/deployment/configuration/backend/index.md#rabbitmq-configuration) - The queue settings of the API service
- [Keycloak setup](/docs/deployment/configuration/keycloak.md) - The client scopes the services check
- [Infrastructure: RabbitMQ](/docs/deployment/configuration/infrastructure.md#rabbitmq) - The broker and its user
- [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) - Where the service's logs are

---