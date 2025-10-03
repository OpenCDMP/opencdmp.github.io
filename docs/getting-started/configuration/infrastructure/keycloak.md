---
sidebar_position: 2
description: A guide for the docker keycloak.env file.
---

# Keycloak

# Configuring the `keycloak.env` File

The `keycloak.env` file is a crucial component for deploying **OpenCDMP** using Docker Compose. It contains environment variables that specify:

- Keycloak's database settings.
- Keycloak's deployment.

This file is located in the [`config-files/keycloak`](https://github.com/OpenCDMP/docker-deployment/tree/main/config-files/keycloak) directory.

| Env Variable            | Description                           | Default Value | Example                                      |
| ----------------------- | ------------------------------------- | ------------- | -------------------------------------------- |
| KC_DB                   | Database server used.                 | -             | postgres                                     |
| KC_DB_URL_HOST          | Database server host.                 | -             | `<container_name>`                           |
| KC_DB_SCHEMA            | Database schema.                      | -             | `<schema_name>`                              |
| KC_DB_URL_DATABASE      | Keycloak database name.               | -             | keycloak-database                            |
| KC_DB_PORT              | Database server port.                 | -             | `<port>`                                     |
| KC_DB_USERNAME          | Keycloak database owner name.         | -             | keycloak-db-admin                            |
| KC_DB_PASSWORD          | Keycloak database owner password.     | -             | `<your_password>`                            |
| KEYCLOAK_ADMIN          | Keycloak app admin user.              | -             | keycloak-app-admin                           |
| KEYCLOAK_ADMIN_PASSWORD | Keycloak app admin password.          | -             | `<your_password>`                            |
| KC_HOSTNAME             | Keycloak URL.                         | -             | `http://<host>:<port>/<keycloak_path>`       |
| KC_HOSTNAME_ADMIN       | Keycloak admin console URL.           | -             | `http://<host>:<port>/<keycloak_path>/admin` |
| KC_HTTP_RELATIVE_PATH   | Keycloak relative base path.          | /             | `/<keycloak_path>`                           |
| KC_PROXY_HEADERS        | Type of proxy header.                 | -             | xforwarded                                   |
| KC_HEALTH_ENABLED       | Enable/Disable healthcheck endpoints. | false         | true                                         |
| KC_METRICS_ENABLED      | Enable/Disable collection of metrics. | false         | true                                         |