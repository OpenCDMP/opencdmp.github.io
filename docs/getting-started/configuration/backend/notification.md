---
sidebar_position: 1
description: Configuring the notification service
---

# Notification Service

| Env Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | - | `<keycloak-client-scope>` |
| `CORS_ALLOWED_ORIGIN` | String that contains allowed origin for this server. | - | `http://<hostname>:<port>` |
| `DB_CONNECTION_STRING` | Database connection string. | - | `jdbc:postgresql://<opencdmp-postgres-hostname>:<port>/<database-name>` | 
| `DB_USER` | Database username string. | - | `<opencdmp-user>` |
| `DB_PASSWORD` | Database password string. | - | `<opencdmp-password>` |
| `MAIL_HOST` | Mail server host. | - | `<hostname>` |
| `MAIL_PORT` | Mail server port. | - | `<port>` |
| `MAIL_ADDRESS` | Mail andress string. | - |`opencdmp@example.com` |
| `MAIL_AUTH` | Boolean value to enable authentication. | `false` | `true` |
| `MAIL_TLS` | Boolean value to enable TLS. | `false` | `false` |
| `MAIL_USERNAME` | Mail username string. | - | `<username>` |
| `MAIL_PASSWORD` | Mail password string. | - | `<user-password>` |'
| `QUEUE_ENABLED` | Boolean value to enable queue [RabbitMQ](https://www.rabbitmq.com/) server. It must be enabled if we want the notification service communicate with OpenCDMP.  | `true` | `true` |
| `QUEUE_APP_ID` | RabbitMQ application id string. | - | `<opencdmp-app-id>` |
| `QUEUE_NAME` | RabbitMQ name string. | - | `<rabbit-mq-queue-name>` |
| `QUEUE_EXCHANGE` | RabbitMQ name string. | - | `<rabbit-mq-queue-exchange>` |
| `RABBIT_HOST` | RabbitMQ connection host name. | - | `<hostname>` |'
| `RABBIT_PORT` | RabbitMQ connection port. | - | `<port>` |
| `RABBIT_USER` | RabbitMQ username string. | - | `<rabbit-mq-username>` |
| `RABBIT_PASS` | RabbitMQ password string. | - | `<rabbit-mq-password>` |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging confiiguration. | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARM`, `ERROR` | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | - | `logs/` |

---