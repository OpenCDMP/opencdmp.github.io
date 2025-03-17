---
sidebar_position: 2
description: A guide for the docker .env file.
---

# Docker

# Configuring the `.env` File

The `.env` file is a crucial component for deploying **OpenCDMP** using Docker Compose. It contains environment variables that specify:

- Versions of the container images.
- Docker registry to be used.
- Exposed ports for the proxy, API, and PostgreSQL services.

This file is located in the same directory as the `docker-compose.yml` files. 

| Env Variable               | Description                                                                                                           | Default Value  | Example                                |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------- | -------------------------------------- |
| PROXY_TAG                  | Nginx proxy version.                                                                                                  | -              | `<version>`                            |
| MAIN_APP_TAG               | OpenCDMP's backend/frontend version.                                                                                  | -              | `<version>`                            |
| NOTIFICATION_APP_TAG       | OpenCDMP's notification service version.                                                                              | -              | `<version>`                            |
| ANNOTATION_APP_TAG         | OpenCDMP's annotation service version.                                                                                | -              | `<version>`                            |
| DOCX_APP_TAG               | OpenCDMP's docx file transformer version.                                                                             | -              | `<version>`                            |
| JSON_APP_TAG               | OpenCDMP's json file transformer version.                                                                             | -              | `<version>`                            |
| EVALUATOR_APP_TAG          | OpenCDMP's evaluator service version.                                                                                 | -              | `<version>`                            |
| ZENODO_APP_TAG             | OpenCDMP's zenodo plugin service version.                                                                             | -              | `<version>`                            |
| POSTGRES_TAG               | Postgresql database version.                                                                                          | -              | `<version>`                            |
| ELK_TAG                    | Elasticsearch database version.                                                                                       | -              | `<version>`                            |
| KEYCLOAK_TAG               | Keycloak authentication service version.                                                                              | -              | `<version>`                            |
| RABBITMQ_TAG               | RabbitMQ message-broker service version.                                                                              | -              | `<version>`                            |
| PDF_SERVICE_TAG            | Gotenberg pdf file transformer version.                                                                               | -              | `<version>`                            |
| PROFILE                    | OpenCDMP profile. (Changing this requires you to also change the "test" prefix in your opencdmp configuration files.) | test           | production                             |
| WEBAPP_BASE_URL            | Frontend base path. (commented by default)                                                                            | /              | `/<base_path>`                         |
| WEBAPP_API_URL             | Backend base URL.                                                                                                     | -              | `http://<host>:<port>/`                |
| INSTALLATION_URL           | Frontend base URL.                                                                                                    | -              | `http://<host>:<port>/<api_path>`      |
| DEFAULT_CULTURE            | Default language to be used.                                                                                          | en             | `<default_culture>`                    |
| KEYCLOAK_ADDRESS           | Keycloak base URL.                                                                                                    | -              | `http://<host>:<port>/<keycloak_path>` |
| KEYCLOAK_REALM             | Keycloak realm used.                                                                                                  | -              | `<realm_name>`                         |
| KEYCLOAK_CLIENT_ID         | Frontend client used.                                                                                                 | -              | `<webapp_client_name>`                 |
| KEYCLOAK_SCOPE             | Frontend required client scopes.                                                                                      | -              | `<scope1>` `<scope2>` ... `<scope X>`  |
| LOGGING_ENABLED            | Enable/Disable logging.                                                                                               | true           | true                                   |
| SERVER_PORT                | Internal container ports for the OpenCDMP services.                                                                   | 8080           | `<port>`                               |
| PROXY_APP_PORT             | External container port for the Nginx proxy service.                                                                  | 8081           | `<port>`                               |
| POSTGRES_PORT              | External container port for the Postgresql database service.                                                          | 5432           | `<port>`                               |
| CONFIG_FILES_PATH          | Bind mount base path for all service configuration.                                                                   | ./config-files | `<path>`                               |
| LOG_FILES_PATH             | Bind mount base path for all service logging.                                                                         | ./logs         | `<path>`                               |
| STORAGE_PATH               | Bind mount base path for all service storage.                                                                         | ./storage      | `<path>`                               |
| ELASTIC_PASSWORD           | Elasticsearch default password for the opencdmp.elasticsearch.setup container.                                        | elastic        | `<your_password>`                      |

---

Configuring the `.env` file correctly is essential for the successful deployment of OpenCDMP. Adjust the variables according to your deployment environment and ensure consistency across all services.

