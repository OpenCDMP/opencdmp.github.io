---
sidebar_position: 5
title: Run and test a plugin locally
description: Run a plugin against the Docker example, get a plugins token with curl, call the configuration endpoint, register the plugin with a local installation, and package it as a Docker image
---

# Run and test a plugin locally

Try a plugin you are building against a local OpenCDMP installation: run it next to the [Docker example](/docs/deployment/install/index.md), call it with a token the way the API service does, register it, and package it as a Docker image. The examples use a deposit service on port `8086`; for the other kinds, change the paths as shown in the table below.

| Kind | Base path | Configuration endpoint | Id field |
| --- | --- | --- | --- |
| File transformer | `/api/file-transformer` | `GET /api/file-transformer/formats` | `fileTransformerId` |
| Deposit service | `/api/deposit` | `GET /api/deposit/configuration` | `repositoryId` |
| Evaluator | `/api/evaluator` | `GET /api/evaluator/config` | `evaluatorId` |

## Start a local installation

Start the Docker example as described in [Installation](/docs/deployment/install/index.md). Its Keycloak realm already has what plugins need: the `plugins` client scope, which adds the `plugins` audience, and the `api` client, which may request it.

The plugin runs on your machine, outside Docker, and must reach Keycloak at the realm's public address, `http://opencdmp.localhost:8180/auth/realms/OpenCDMP`, to download its signing keys. If your operating system does not resolve `opencdmp.localhost`, add `127.0.0.1 opencdmp.localhost` to your hosts file.

## Run the plugin

Build the plugin and start it with the realm of the local installation. Environment variables take precedence over the `app.env` files packaged with the plugin:

```bash
mvn clean package

export IDP_ISSUER_URI=http://opencdmp.localhost:8180/auth/realms/OpenCDMP
export IDP_CLAIMS_ROLES_PATH=plugins.roles
export SECURITY_AUDIENCE=plugins
export SERVER_PORT=8086
export LOGGING_PATH=./logs
java -jar web/target/<your-plugin>.jar
```

Set the plugin's own settings the same way. When you run it from your IDE, set the same variables in the run configuration. The plugin writes its logs to `./logs/logging.log`; see [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) for their format.

Check that it is up:

```bash
curl http://localhost:8086/actuator/health
```

## Get a token {#get-a-token}

The API service calls plugins with a token from the Client Credentials flow. Request one the same way, with the client of the Docker example (`api`, secret `web_secret`) and the `plugins` scope:

```bash
TOKEN=$(curl -s -X POST 'http://opencdmp.localhost:8180/auth/realms/OpenCDMP/protocol/openid-connect/token' \
  -d grant_type=client_credentials \
  -d client_id=api \
  -d client_secret=web_secret \
  -d scope=plugins \
  | jq -r .access_token)
```

Check that the token carries the `plugins` audience and the realm's issuer:

```bash
echo "$TOKEN" | jq -R 'split(".")[1] | gsub("-"; "+") | gsub("_"; "/") | @base64d | fromjson | {iss, aud}'
```

`iss` must equal the plugin's `IDP_ISSUER_URI`, and `aud` must contain `plugins`. These values are demo defaults: on a real installation, use the client and secret configured for the plugins (see [Registering plugin services](/docs/deployment/configuration/plugin-services.md#plugin-tokens)).

## Call the configuration endpoint

```bash
curl -s -H "Authorization: Bearer $TOKEN" http://localhost:8086/api/deposit/configuration | jq .
```

The response is the plugin's configuration: for a deposit service, a `DepositConfiguration` with the `repositoryId` that you will register the plugin under. Without the token, or with a token that lacks the `plugins` audience, the plugin answers `401 Unauthorized`; its log names the reason.

The other endpoints take the models of the [Common Models](/docs/developers/plugins/common-models.md) package, such as a `PlanDepositModel` for `POST /api/deposit`. To exercise them, register the plugin with the local installation and use it from the user interface, with breakpoints in your IDE.

## Register it with the local installation

The API service runs inside Docker, so it reaches your plugin at the host's address, not at `localhost`:

- On Docker Desktop (Windows and macOS), use `http://host.docker.internal:8086`.
- On Linux, add the host name to the API service in `docker-compose.override.yml`, then recreate it with `docker compose up -d opencdmp.backend`:

  ```yaml title="docker-compose.override.yml"
    opencdmp.backend:
      extra_hosts:
        - "host.docker.internal:host-gateway"
  ```

Then register the plugin in one of two ways:

- **In one organisation, without a restart**: sign in as `opencdmp-admin`, open **Settings > Plugins**, click **Add plugin**, and enter:

  | Field | Value |
  | --- | --- |
  | **Plugin id** | The id your configuration endpoint reports |
  | **Address** | `http://host.docker.internal:8086` |
  | **Token issuer address** | `http://opencdmp.localhost:8180/auth/realms/OpenCDMP/protocol/openid-connect/token` |
  | **Client id** / **Client secret** | `api` / `web_secret` |
  | **Scope** | `plugins` |

  For a repository, also choose the DOCX transformer (`docx-file-transformer`) for the PDF copy and the RDA transformer (`rda-file-transformer`) for the machine-readable copy. Click **Test connection**, then save. See [Plugins: add a plugin](/docs/administering/tenant-management/plugins.md#add-a-plugin).
- **For the whole installation**: add an entry to `config-files/opencdmp/backend/config/deposit-test.yml` (or `file-transformer-test.yml`, `evaluator-test.yml`) with `url: http://host.docker.internal:8086` and your id, and restart the API service with `docker compose restart opencdmp.backend`. See [Register the plugin](/docs/deployment/configuration/plugin-services.md#plugin-registration).

The API service caches each plugin's configuration for up to ten minutes. After you change what your configuration endpoint returns, restart the API service to see the change at once.

## Package it as a Docker image

The shipped plugins use a one-stage Dockerfile that copies the JAR built by Maven:

```dockerfile title="Dockerfile"
FROM eclipse-temurin:21-jre-noble

ARG PROFILE
ENV SERVER_PORT=8080
EXPOSE ${SERVER_PORT}

COPY web/target/<your-plugin>.jar /app/app.jar

ENTRYPOINT ["java", "-Dspring.config.additional-location=file:/config/", "-Dspring.profiles.active=${PROFILE}", "-jar", "/app/app.jar"]
```

The exec-form `ENTRYPOINT` does not expand `${PROFILE}`; Spring resolves the placeholder from the `PROFILE` environment variable of the container. With `PROFILE=test`, the plugin reads `/config/app-test.env`, so mount its configuration folder at `/config` and its log folder at `/logs`:

```bash
mvn clean package
docker build -t my-repository-deposit:dev .
```

To run the image in the Docker example, add it to `docker-compose.override.yml` as shown in [Run the service](/docs/deployment/configuration/plugin-services.md#step-1-run-the-service), with `IDP_ISSUER_URI`, `IDP_CLAIMS_ROLES_PATH`, and `SECURITY_AUDIENCE` in its `app-test.env`, and register it with `http://<service-name>:8080` as its address.

## See also

- [Registering plugin services](/docs/deployment/configuration/plugin-services.md) - The operator's side: Compose entry, tokens, registration keys, and **Test connection**
- [File Transformer](/docs/developers/plugins/file-transformers.md), [Deposit](/docs/developers/plugins/deposit.md), and [Evaluator](/docs/developers/plugins/evaluator.md) - The contract of each plugin type
- [Keycloak setup](/docs/deployment/configuration/keycloak.md#step-4-create-client-scopes) - The `plugins` client scope
- [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) - Reading the plugin's logs
