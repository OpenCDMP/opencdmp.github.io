---
sidebar_position: 1
description: Configuring the notification service
---

# Notification Service

Here you can view all available configuration options for [notification service](optional-services/notifications/index.md).

## Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `SECURITY_AUDIENCE` | [Keycloak client scope](/getting-started/configuration/keycloak/#step-4-create-client-scopes) that security is intended for. | Yes | - | `<keycloak-client-scope>` |
| `CORS_ALLOWED_ORIGIN` | String that contains allowed origin for this server. | Yes | - | `http://<hostname>:<port>` |

## Database Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DB_CONNECTION_STRING` | Database connection string. | Yes | - | `jdbc:postgresql://<opencdmp-postgres-hostname>:<port>/<database-name>` |
| `DB_USER` | Database username string. | Yes | - | `<opencdmp-user>` |
| `DB_PASSWORD` | Database password string. | Yes | - | `<opencdmp-password>` |

## Mail Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `MAIL_HOST` | Mail server host. | Yes | - | `<hostname>` |
| `MAIL_PORT` | Mail server port. | Yes | - | `<port>` |
| `MAIL_ADDRESS` | Mail address string. | Yes | - |`opencdmp@example.com` |
| `MAIL_AUTH` | Boolean value to enable authentication. | No | `false` | `true` |
| `MAIL_TLS` | Boolean value to enable TLS. | No | `false` | `false` |
| `MAIL_USERNAME` | Mail username string. | Yes* | - | `<username>` |
| `MAIL_PASSWORD` | Mail password string. | Yes* | - | `<user-password>` |

*Required only if `MAIL_AUTH` is set to `true`

## RabbitMQ Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `QUEUE_APP_ID` | [RabbitMQ](https://www.rabbitmq.com/) application id string. | Yes | - | `<opencdmp-app-id>` |
| `QUEUE_NAME` | RabbitMQ queue name string. | Yes | - | `<rabbit-mq-queue-name>` |
| `QUEUE_EXCHANGE` | RabbitMQ exchange name string. | Yes | - | `<rabbit-mq-queue-exchange>` |
| `RABBIT_HOST` | RabbitMQ connection host name. | Yes | - | `<hostname>` |
| `RABBIT_PORT` | RabbitMQ connection port. | Yes | - | `<port>` |
| `RABBIT_USER` | RabbitMQ username string. | Yes | - | `<rabbit-mq-username>` |
| `RABBIT_PASS` | RabbitMQ password string. | Yes | - | `<rabbit-mq-password>` |

## Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |

---

## See Also

- [Main Backend Configuration](getting-started/configuration/backend/index.md) - Core backend service configuration
- [RabbitMQ Configuration](getting-started/configuration/backend/index.md#rabbitmq-configuration) - RabbitMQ setup in main backend
- [Keycloak Configuration](/getting-started/configuration/keycloak/) - Authentication setup

---