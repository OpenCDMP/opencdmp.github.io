---
title: Notification service
sidebar_position: 1
description: Environment variables of the notification service - authentication, database, email, RabbitMQ, and logging
---

# Notification service

These are the settings of the [notification service](/docs/optional-services/notifications/index.md), read from `app-<PROFILE>.env` in its `config` folder (`config-files/opencdmp/notification/config/app-test.env` in the Docker example).

## Authentication & core settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL, exactly as the issuer of its tokens (the same value as in the [API service](/docs/deployment/configuration/backend/index.md#authentication--security)). | Yes | - | `https://opencdmp.example.org/auth/realms/OpenCDMP` |
| `SECURITY_AUDIENCE` | Audience that tokens must carry: the [`notification` client scope](/docs/deployment/configuration/keycloak.md#step-4-create-client-scopes). | Yes | - | `notification` |
| `CORS_ALLOWED_ORIGIN` | Origin of the webapp (scheme, host, and port) that may call the service. One origin. | Yes | - | `https://opencdmp.example.org` |

## Database configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DB_CONNECTION_STRING` | JDBC address of the `opencdmp` database, the database of the API service. | Yes | - | `jdbc:postgresql://opencdmp.postgres:5432/opencdmp` |
| `DB_USER` | Database user. It reads and writes the tables of the service, which the API service creates (see [a user per service](/docs/deployment/install/production.md#give-each-service-its-own-database-user)). | Yes | - | `opencdmp_services` |
| `DB_PASSWORD` | Password of that user. | Yes | - | `<db-password>` |

## Mail configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `MAIL_HOST` | SMTP server host. | Yes | - | `smtp.example.org` |
| `MAIL_PORT` | SMTP server port. | Yes | - | `587` |
| `MAIL_ADDRESS` | Sender address of the emails. | Yes | - | `opencdmp@example.org` |
| `MAIL_AUTH` | `true` to sign in to the SMTP server with `MAIL_USERNAME` and `MAIL_PASSWORD`. | Yes | - | `true` |
| `MAIL_TLS` | `true` to upgrade the connection with STARTTLS. | Yes | - | `true` |
| `MAIL_USERNAME` | SMTP user. | Yes¹ | - | `opencdmp@example.org` |
| `MAIL_PASSWORD` | Password of that user. | Yes¹ | - | `<smtp-password>` |

¹ Needs a value only when `MAIL_AUTH` is `true`. The service refuses to start when one of the `MAIL_*` variables is missing, so define every one, and leave unused ones empty (`MAIL_USERNAME=`), as the Docker example does. With an empty `MAIL_HOST` the service starts, but every email fails.

## RabbitMQ configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `QUEUE_ENABLED` | Boolean value to connect to RabbitMQ and consume the events of the API service. | No | `true` | `true` |
| `QUEUE_APP_ID` | [RabbitMQ](https://www.rabbitmq.com/) application id of the service. | Yes | - | `opencdmp-notification` |
| `QUEUE_NAME` | Queue of the service. | Yes | - | `opencdmp_notification_inbox_queue` |
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

---

## See also

- [Backend configuration](/docs/deployment/configuration/backend/index.md) - The API service
- [Backend configuration: RabbitMQ](/docs/deployment/configuration/backend/index.md#rabbitmq-configuration) - The queue settings of the API service
- [Keycloak setup](/docs/deployment/configuration/keycloak.md) - The client scopes the services check
- [Infrastructure: RabbitMQ](/docs/deployment/configuration/infrastructure.md#rabbitmq) - The broker and its user
- [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) - Where the service's logs are

---