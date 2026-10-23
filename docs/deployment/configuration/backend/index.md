---
title: Backend configuration
description: Environment variables of the OpenCDMP API service - authentication, database, search, messaging, Keycloak, plugins, storage, encryption, webhooks, and reports
---

import DocCardList from '@theme/DocCardList';

# Backend configuration

The API service, the core backend of OpenCDMP, reads the settings below from `app.env` and `app-<PROFILE>.env` in the service's `config` folder (`config-files/opencdmp/backend/config/app-test.env` in the Docker example) or from the container's environment. The supplementary services and the plugins have [their own pages](#supplementary-services).

## API service

### Authentication & security

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL, exactly as Keycloak writes it in the issuer (`iss`) of its tokens. It includes Keycloak's relative path, if any: the Docker example serves Keycloak under `/auth`. | Yes | - | `https://<keycloak-host>/auth/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Path of the installation-wide roles in the token's `resource_access` claim: the roles of the [`api` client](/docs/deployment/configuration/keycloak.md#client-api). | Yes | - | `api.roles` |
| `SECURITY_AUDIENCE` | Audience that tokens must carry, added by the [`api` client scope](/docs/deployment/configuration/keycloak.md#step-4-create-client-scopes). | Yes | - | `api` |
| `CORS_ALLOWED_ORIGIN` | Origin of the webapp (scheme, host, and port) that may call the API and open its WebSocket connection. One origin. | Yes | - | `https://opencdmp.example.org` |

### Database configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DB_URL` | JDBC address of the `opencdmp` database. | Yes | - | `jdbc:postgresql://opencdmp.postgres:5432/opencdmp` |
| `DB_USER` | Database user. The user must be allowed to create and alter tables in the database, because the API service migrates the schema at startup. | Yes | - | `opencdmp` |
| `DB_PASS` | Password of that user. | Yes | - | `<db-password>` |

The API service creates and migrates its database schema automatically at startup, recording the applied migrations in the `DBMigrationHistory` table. An empty database gets the full schema and the default seed data; a database of version 1.2 or later is upgraded in place. See [Database migrations](/docs/deployment/install/upgrade.md#database-migrations).

### Elasticsearch configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `ELASTIC_ENABLED` | Boolean value to index plans and assets in Elasticsearch and run the listings against it. | Yes | - | `true` |
| `ELASTIC_HOST` | Host and port of Elasticsearch, without the scheme. | Yes¹ | - | `opencdmp.elasticsearch:9200` |
| `ELASTIC_USE_SSL` | Boolean value to connect to Elasticsearch over HTTPS. | Yes¹ | - | `false` |
| `ELASTIC_USER` | Elasticsearch user of the API service. | Yes¹ | - | `opencdmp-api` |
| `ELASTIC_PASS` | Password of that user. The Docker example sets it from `ELASTIC_API_PASSWORD` in `.env` (see [Elasticsearch](/docs/deployment/configuration/infrastructure.md#elasticsearch)). | Yes¹ | - | `<opencdmp-elastic-password>` |
| `ELASTIC_PLAN_INDEX` | Index of the plans. The API service creates it. | Yes¹ | - | `opencdmp-plans` |
| `ELASTIC_DESCRIPTION_INDEX` | Index of the assets. The API service creates it. | Yes¹ | - | `opencdmp-descriptions` |
| `ELASTIC_ENABLE_DB_FALLBACK` | When a plan or asset listing fails in Elasticsearch, run it against the database instead (and log the error). When `false`, the listing fails. | No | `true` | `false` |

¹ Required only if `ELASTIC_ENABLED` is set to `true`

### RabbitMQ configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `QUEUE_ENABLED` | Boolean value to connect to RabbitMQ and publish and consume messages. When `false`, the API sends no events to the notification and annotation services. | No | `true` | `true` |
| `QUEUE_APP_ID` | [RabbitMQ](https://www.rabbitmq.com/) application id of the API service. | Yes | - | `opencdmp-api` |
| `QUEUE_NAME` | Queue of the API service. | Yes | - | `opencdmp_api_inbox_queue` |
| `QUEUE_EXCHANGE` | Exchange shared with the notification and annotation services. | Yes | - | `opencdmp_queue` |
| `RABBIT_HOST` | RabbitMQ host. | Yes | - | `opencdmp.rabbitmq` |
| `RABBIT_PORT` | RabbitMQ port. | Yes | - | `5672` |
| `RABBIT_USER` | RabbitMQ user. | Yes | - | `opencdmp` |
| `RABBIT_PASS` | Password of that user. | Yes | - | `<rabbitmq-password>` |

### Keycloak API configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KEYCLOAK_API_SERVER_URL` | Keycloak server URL, including its relative path, used to call the Keycloak admin API. | Yes | - | `https://<keycloak-host>/auth` |
| `KEYCLOAK_API_REALM` | Keycloak realm. | Yes | - | `OpenCDMP` |
| `KEYCLOAK_API_CLIENT_ID` | Client that the API service signs in to the admin API with, together with the user below. | Yes | - | `api` |
| `KEYCLOAK_API_CLIENT_SECRET` | Secret of that client. | Yes | - | `<api-client-secret>` |
| `KEYCLOAK_API_USERNAME` | Keycloak user with the `realm-management` > `realm-admin` role, used to manage group memberships. | Yes | - | `dmp-keycloak-api` |
| `KEYCLOAK_API_PASSWORD` | Password of that user. | Yes | - | `<keycloak-password>` |

### Keycloak group IDs (role mapping)

Each variable holds the **id (UUID)** of a role group of the realm, not its name; the group names below are those of the [shipped realm](/docs/deployment/configuration/keycloak.md), and the examples are its group ids. The API service adds users to these groups and removes them when roles change in OpenCDMP. For the organisation roles, it creates a `tenant-<tenant-code>` subgroup under each group when an organisation is created; only the `tenant-default` subgroups must exist beforehand.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KEYCLOAK_API_GLOBAL_USER_GROUP_ID` | Id of the `role-user` group: the `User` role (**Signed-in User** in the UI). | Yes | - | `011269bd-9eec-445f-926d-1ebd1f45b5aa` |
| `KEYCLOAK_API_GLOBAL_ADMIN_GROUP_ID` | Id of the `role-admin` group: the `Admin` role (**System Administrator** in the UI). | Yes | - | `935ab34d-700a-407f-bb7b-8a00ddcef1d8` |
| `KEYCLOAK_API_GLOBAL_INSTALLATION_ADMIN_GROUP_ID` | Id of the `role-installation-admin` group: the `InstallationAdmin` role (**Installation Manager** in the UI). | Yes | - | `146561bf-ef12-41f4-a9b1-5f6dc9872a19` |
| `KEYCLOAK_API_TENANT_ADMIN_GROUP_ID` | Id of the `tenant-role-admin` group: the `TenantAdmin` role (**Organisation Admin** in the UI). | Yes | - | `01195be1-f754-415b-8225-3cc470744d62` |
| `KEYCLOAK_API_TENANT_USER_GROUP_ID` | Id of the `tenant-role-user` group: the `TenantUser` role (**Member** in the UI). | Yes | - | `64c07220-0d92-44e5-be6e-d9edf6c10a56` |
| `KEYCLOAK_API_TENANT_CONFIG_MANAGER_GROUP_ID` | Id of the `tenant-role-config-manager` group: the `TenantConfigManager` role (**Content & Workflow Manager** in the UI). | Yes | - | `1bfe8064-4e44-4ec1-a69e-836364a36e37` |
| `KEYCLOAK_API_TENANT_PLAN_MANAGER_GROUP_ID` | Id of the `tenant-role-manager` group: the `TenantPlanManager` role (**Template Manager** in the UI). | Yes | - | `735f22f1-a0cc-4afd-af4c-dba6bb2e7415` |

### File transformer service authentication

The API service signs in to the plugins with the client below, usually `api` with the `plugins` scope. These variables are referenced from the plugin registrations; see [Registering plugin services](/docs/deployment/configuration/plugin-services.md#plugin-tokens).

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `FILE_TRANSFORMER_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for [file transformer services](/docs/optional-services/file-transformers/index.md). | Yes² | - | `https://opencdmp.example.org/auth/realms/OpenCDMP/protocol/openid-connect/token` |
| `FILE_TRANSFORMER_AUTH_CLIENT_ID` | Keycloak client id string to get auth token for file transformer services. | Yes² | - | `api` |
| `FILE_TRANSFORMER_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for file transformer services. | Yes² | - | `<api-client-secret>` |
| `FILE_TRANSFORMER_AUTH_SCOPE` | Keycloak client scope string for file transformer services. | Yes² | - | `plugins` |

² Required if using file transformer services

### Deposit service authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for [deposit services](/docs/optional-services/deposit-services/index.md). | Yes³ | - | `https://opencdmp.example.org/auth/realms/OpenCDMP/protocol/openid-connect/token` |
| `DEPOSIT_AUTH_CLIENT_ID` | Keycloak client id string to get auth token deposit services. | Yes³ | - | `api` |
| `DEPOSIT_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for deposit services. | Yes³ | - | `<api-client-secret>` |
| `DEPOSIT_AUTH_SCOPE` | Keycloak client scope string for deposit services. | Yes³ | - | `plugins` |

³ Required if using deposit services

### Evaluator service authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `EVALUATOR_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for [evaluator services](/docs/optional-services/evaluator-services.md). | Yes⁴ | - | `https://opencdmp.example.org/auth/realms/OpenCDMP/protocol/openid-connect/token` |
| `EVALUATOR_AUTH_CLIENT_ID` | Keycloak client id string to get auth token evaluator services. | Yes⁴ | - | `api` |
| `EVALUATOR_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for evaluator services. | Yes⁴ | - | `<api-client-secret>` |
| `EVALUATOR_AUTH_SCOPE` | Keycloak client scope string for evaluator services. | Yes⁴ | - | `plugins` |

⁴ Required if using evaluator services

### Plugin registration {#plugin-registration}

The file transformers, deposit services, and evaluators of the installation are registered in `file-transformer-<profile>.yml`, `deposit-<profile>.yml`, and `evaluator-<profile>.yml` in the `config` folder, with the client settings above. The keys, examples, and the per-organisation alternative are described in [Registering plugin services](/docs/deployment/configuration/plugin-services.md#plugin-registration).

### File storage configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `FILE_STORAGE` | Folder of the files of the API service: uploaded files (`main`), temporary files (`temp`), and files exchanged with plugins (`transformer`, `deposit`). Back it up with the database, and share it between [several API instances](/docs/deployment/install/production.md#run-several-api-instances). | Yes | - | `/storage` |

### Upload limits

Maximum size of a single uploaded file and of a whole multipart request accepted by the API (plan and asset file uploads, template and blueprint imports, Data Transfer bundles). Values use Spring data-size notation (`MB`, `GB`). A reverse proxy in front of the API must allow at least the same request size.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `MULTIPART_MAX_FILE_SIZE` | Maximum size of one uploaded file. | No | `100MB` | `500MB` |
| `MULTIPART_MAX_REQUEST_SIZE` | Maximum size of one multipart request (all files of the request together). | No | `100MB` | `500MB` |

### Supportive material paths

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `SUPPORTIVE_MATERIAL_USER_GUIDE_PATH` | Folder with the built-in User Guide texts of the [help pages](/docs/administering/system-configuration/supportive-material.md), one file per language named `UserGuide_<lang>.html`. A `classpath:` or `file:` location ending in `/`. | No | `classpath:/material/user-guide/` | `file:/material/user-guide/` |
| `SUPPORTIVE_MATERIAL_ABOUT_PATH` | Folder with the built-in About texts of the [help pages](/docs/administering/system-configuration/supportive-material.md), one file per language named `About_<lang>.html`. A `classpath:` or `file:` location ending in `/`. | No | `classpath:/material/about/` | `file:/material/about/` |
| `SUPPORTIVE_MATERIAL_TERM_OF_SERVICE_PATH` | Folder with the built-in Terms of Service texts of the [help pages](/docs/administering/system-configuration/supportive-material.md), one file per language named `TermsOfService_<lang>.html`. A `classpath:` or `file:` location ending in `/`. | No | `classpath:/material/terms-of-service/` | `file:/material/terms-of-service/` |
| `SUPPORTIVE_MATERIAL_GLOSSARY_PATH` | Folder with the built-in Glossary texts of the [help pages](/docs/administering/system-configuration/supportive-material.md), one file per language named `Glossary_<lang>.html`. A `classpath:` or `file:` location ending in `/`. | No | `classpath:/material/glossary/` | `file:/material/glossary/` |
| `SUPPORTIVE_MATERIAL_FAQ_PATH` | Folder with the built-in FAQ texts of the [help pages](/docs/administering/system-configuration/supportive-material.md), one file per language named `Faq_<lang>.html`. A `classpath:` or `file:` location ending in `/`. | No | `classpath:/material/faq/` | `file:/material/faq/` |
| `SUPPORTIVE_MATERIAL_COOKIE_POLICY_PATH` | Folder with the built-in Cookie Policy texts of the [help pages](/docs/administering/system-configuration/supportive-material.md), one file per language named `CookiePolicy_<lang>.html`. A `classpath:` or `file:` location ending in `/`. | No | `classpath:/material/cookie-policy/` | `file:/material/cookie-policy/` |

The Docker example mounts `config-files/opencdmp/backend/material/` at `/material` and sets the variables to `file:/material/<folder>/`, so the API service serves the mounted files. Edit them there to change the built-in texts of the example.

### Semantics

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `SEMANTICS_PATH` | JSON file with the list of semantics that the blueprint and asset template editors suggest. | No | `classpath:Semantics.json` | `file:/config/Semantics.json` |

### Logging configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Logback configuration file. | No | `classpath:logging/logback.xml` | `file:/config/logback.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of the framework loggers: `ERROR`, `WARN`, `INFO`, or `DEBUG`. OpenCDMP's own code logs at `INFO`. | No | `WARN` | `INFO` |
| `LOGGING_PATH` | Folder of the log files `logging.log` and `auditing.log`, and of their rolled files. | No | `/logs` | `/logs` |

See [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) for the log files, finer log levels, and the health and metrics endpoints.

### Encryption configuration

:::danger Change the shipped key before you store plugin secrets
The default key and IV below are published in the source code and in this documentation, so anyone can decrypt secrets encrypted with them. Set your own random `TENANT_CONFIG_ENCRYPTION_AES_KEY` (32 characters) and `TENANT_CONFIG_ENCRYPTION_AES_IV` (16 characters) before anyone saves plugin credentials, such as the repository access tokens and passwords of the [organisation settings](/docs/administering/tenant-management/plugins.md) or of user profiles, or the [authentication](/docs/administering/system-configuration/api-sources.md#authentication) request body of a reference type or prefilling source. Secrets saved with one key cannot be read after the key changes and must be entered again. Request bodies saved by an earlier version are encrypted with the configured key the first time the API service starts after the upgrade.
:::

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `TENANT_CONFIG_ENCRYPTION_AES_KEY` | 32-character [AES key](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) used to encrypt the secrets stored for [file transformer](/docs/optional-services/file-transformers/index.md), [deposit](/docs/optional-services/deposit-services/index.md), and [evaluator](/docs/optional-services/evaluator-services.md) plugins: client secrets of plugins added by an organisation, and credentials in organisation settings and user profiles. Also encrypts the authentication request bodies of reference types and prefilling sources. | Yes (in production) | `rmpTvZnRWzyisUtFADBcZCn0q7Z75Xdz` (public; change it) | `<32-character random string>` |
| `TENANT_CONFIG_ENCRYPTION_AES_IV` | 16-character [AES IV](https://en.wikipedia.org/wiki/Initialization_vector) used with the key above. | Yes (in production) | `ec05d521a23f80ad` (public; change it) | `<16-character random string>` |

### Data Transfer configuration {#tenant-transfer-configuration}

The [Data Transfer](/docs/administering/tenant-management/tenant-transfer.md) page exports, imports, copies, and purges the content of a tenant (organisation). Comments (annotations) live in the [annotation service](/docs/optional-services/annotations.md); they are transferred together with the plans only when the API knows where that service is.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `ANNOTATION_SERVICE_URL` | Base URL of the annotation service, used to export, import, copy, and purge the comments of transferred plans through its `/api/annotation/transfer/*` endpoints. The annotation service must run the release matching the API. When empty, tenant transfer operations run without comments and report a warning. | No | - (annotation transfer disabled) | `http://opencdmp.annotation:8080` |

### Notification expiration settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `MERGE_ACCOUNT_EXPIRATION` | Expiration time (in seconds) for [link account notification](/docs/using/profile-settings.md#link-account). | No | `14400` | `14400` |
| `REMOVE_CREDENTIAL_EXPIRATION` | Expiration time (in seconds) for [unlink account notification](/docs/using/profile-settings.md#unlink-account). | No | `14400` | `14400` |
| `TENANT_SPECIFIC_INVITATION_EXPIRATION` | Expiration time (in seconds) for [invitations to an organisation](/docs/administering/user-management/tenant-users.md#inviting-users). | No | `2592000` | `2592000` |
| `PLAN_INVITATION_EXTERNAL_USER_EXPIRATION` | Expiration time (in seconds) for [notification of invitation of external users to a plan](/docs/using/plans/invite-collaborators.md). | No | `2592000` | `2592000` |

### Locale configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOCALE_TIMEZONE` | Default time zone of the API service. | No | `UTC` | `Europe/Athens` |
| `LOCALE_LANGUAGE` | Default language of the API service. | No | `en` | `en` |
| `LOCALE_CULTURE` | Default culture (number and date formats) of the API service. | No | `en` | `en` |

### Contact configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `CONTACT_SUPPORT_EMAIL_ADDRESS` | Address that receives the messages of the **Contact support** form. | Yes | - | `support@example.org` |
<!-- accounting disabled
#### Accounting Service Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `ACCOUNTING_ENABLED` | Boolean value to enable [accounting service](/docs/optional-services/accounting-services/accounting-preview.md). | No | `false` | `true` |
| `ACCOUNTING_SERVICE_ID` | Service id that the API reports to the accounting service. | No | `opencdmp` | `opencdmp` |
| `ACCOUNTING_URL` | Accounting service connection URL string. | Yes⁵ | - | `http://<hostname>:<port>` |
| `ACCOUNTING_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for accounting service. | Yes⁵ | - | `https://opencdmp.example.org/auth/realms/OpenCDMP/protocol/openid-connect/token` |
| `ACCOUNTING_AUTH_CLIENT_ID` | Keycloak client id string to get auth token accounting service. | Yes⁵ | - | `<keycloak-client-id>` |
| `ACCOUNTING_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for accounting service. | Yes⁵ | - | `<keycloak-client-secret>` |
| `ACCOUNTING_AUTH_SCOPE` | Keycloak client scope string for accounting service. | Yes⁵ | - | `<keycloak-scope>` |

⁵ Required if `ACCOUNTING_ENABLED` is set to `true` -->

<!-- kpi disabled  -->
<!-- #### KPI Service Configuration

The optional [KPI service](/docs/optional-services/kpi.md) provides the charts of the [Statistics](/docs/administering/statistics.md) page. When the integration is enabled, the API sends indicator points for plans, assets, references, users, blueprints, asset templates, blueprint types, asset types, and tenants, and publishes the indicator and dashboard definitions to the KPI service. The webapp must be configured with the KPI service address as well, see the [frontend configuration](/docs/deployment/configuration/frontend/index.md#kpi-service-configuration).

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KPI_VIEWER_TASK_ENABLED` | Boolean value to enable the KPI integration (sending indicator points and publishing definitions). | No | `false` | `true` |
| `KPI_VIEWER_BOOTSTRAP_ENABLED` | Boolean value to publish the indicator definition and the dashboard definitions to the KPI service automatically when the API starts. Has no effect when `KPI_VIEWER_TASK_ENABLED` is `false`. When disabled, publish them with the **KPI indicators** tasks of the [Maintenance](/docs/administering/maintenance.md#task-groups) page. | No | `true` | `false` |
| `KPI_VIEWER_BOOTSTRAP_DELAY_SECONDS` | Seconds to wait after startup before the automatic publishing runs, giving the KPI service and the message broker time to become available. | No | `30` | `60` |
| `KPI_VIEWER_INDICATOR_ID` | UUID of the indicator that OpenCDMP creates on the KPI service and sends its data points to. | No | `97c2d685-d7d2-4bd1-a287-ba329ad45d74` | `97c2d685-d7d2-4bd1-a287-ba329ad45d74` |
| `KPI_VIEWER_REFERENCE_TYPE_DEFAULT` | UUID of the reference type preselected in the reference type filters of the dashboards. | No | `2baab1e8-561f-4c15-84c3-571b811c52f6` | `2baab1e8-561f-4c15-84c3-571b811c52f6` |
| `KPI_VIEWER_PLAN_STATUS_DEFAULT` | UUID of the plan status preselected in the plan status filters of the dashboards. | No | `f1a3da63-0bff-438f-8b46-1a81ca176115` | `f1a3da63-0bff-438f-8b46-1a81ca176115` |
| `KPI_VIEWER_DESCRIPTION_STATUS_DEFAULT` | UUID of the asset status preselected in the asset status filters of the dashboards. | No | `c266e2ee-9ae9-4a2f-9b4b-bc6fb1dd54aa` | `c266e2ee-9ae9-4a2f-9b4b-bc6fb1dd54aa` |
| `KPI_VIEWER_ADMIN_DASHBOARD_PATH` | Path to the definition file of the Admin (multi-tenant) dashboard, published under the dashboard key `dmp_admin_dashboard`. Accepts a `classpath:` or `file:` location. | No | `classpath:kpi-dashboards/admin-dashboard.json` | `file:/config/kpi/admin-dashboard.json` |
| `KPI_VIEWER_TENANT_DASHBOARD_PATH` | Path to the definition file of the Tenant dashboard, published under the dashboard key `dmp_dashboard`. Accepts a `classpath:` or `file:` location. | No | `classpath:kpi-dashboards/tenant-dashboard.json` | `file:/config/kpi/tenant-dashboard.json` | -->

### Swagger configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `SWAGGER_ENABLED` | Boolean value to serve the [Swagger UI](/docs/developers/swagger.md) (`/api/swagger-ui`) and the OpenAPI document (`/api/v3/api-docs`). | No | `true` | `false` |
| `SWAGGER_AUTH_CLIENT_ID` | Id of the [`swagger` Keycloak client](/docs/deployment/configuration/keycloak.md#client-swagger) that the Swagger UI signs in with. | Yes⁶ | - | `swagger` |
| `SWAGGER_AUTH_REDIRECT_URL` | Swagger UI redirect URL. It must be one of the **Valid redirect URIs** of the [`swagger` Keycloak client](/docs/deployment/configuration/keycloak.md#client-swagger). | Yes⁶ | - | `https://<app-hostname>/api/swagger-ui/oauth2-redirect.html` |
| `SWAGGER_SERVER_URL` | Address that the Swagger UI sends requests to, without `/api` (the endpoint paths include it). | Yes⁶ | - | `https://<app-hostname>` |

⁶ Required only if `SWAGGER_ENABLED` is `true`

### Integration event configuration

Integration events are outbox events (for example, *plan touched* and *plan removal* events) that the API Service publishes to the message broker so that external integrations can react to changes in plans. When disabled, the API emits no integration events.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `INTEGRATION_EVENT_ENABLED` | Boolean value to enable publishing of integration events (such as plan touched and plan removal events) to the message broker for external integrations. | No | `false` | `true` |
| `RDA_MADMP_QUEUE_APP_ID` | The `QUEUE_APP_ID` of the [RDA maDMP API](https://github.com/OpenCDMP/rda-madmp-api). Its messages may create, change and remove the plan update requests that maDMPs changed through that API turn into. Empty: they are refused. | No | - | `rda-madmp-api` |

### Webhooks configuration

Webhooks let organisation administrators register HTTP endpoints that receive signed callbacks when plans and assets change (plan finalized, status changed, unfinalized, deposited, and asset finalized). See [Webhooks](/docs/administering/webhooks.md) for the administration guide and [Webhooks for developers](/docs/developers/webhooks.md) for the payload format and signature verification. The `WebhookSubscription` and `WebhookDelivery` tables that the feature uses are created by the [database migrations](/docs/deployment/install/upgrade.md#database-migrations) at startup.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `WEBHOOKS_ENABLED` | Boolean value to enable webhooks. When `false`, no events are recorded and the delivery task does not start; subscriptions can still be managed in the admin UI. | No | `true` | `false` |
| `WEBHOOKS_MAX_ATTEMPTS` | Maximum number of delivery attempts per event before the delivery is marked `Failed`. | No | `8` | `8` |
| `WEBHOOKS_TIMEOUT_SECONDS` | Connect and response timeout in seconds for each delivery attempt. | No | `10` | `10` |
| `WEBHOOKS_DENY_PRIVATE_ADDRESSES` | Boolean value to refuse deliveries to URLs that resolve to loopback, link-local, or private network addresses (SSRF guard). Refused deliveries fail immediately. | No | `true` | `true` |
| `WEBHOOKS_TASK_ENABLED` | Boolean value to run the delivery task on this instance. In clustered deployments enable it on a single instance only, because delivery rows are not locked across processes. | No | `true` | `true` |
| `WEBHOOKS_TASK_INTERVAL_SECONDS` | Interval in seconds between delivery task runs. | No | `30` | `30` |
| `WEBHOOKS_TASK_BATCH_SIZE` | Maximum number of due deliveries processed in one task run. | No | `50` | `50` |

### Reports configuration

Reports count how a question of an asset template or plan blueprint was answered across a tenant (organisation), and export the answers behind the counts. See [Research Insights](/docs/administering/reports.md) for the administration guide and [Reports for developers](/docs/developers/reports.md) for the endpoints. A report reads every matching item in one pass, so the limits below keep a single request bounded.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `REPORT_MAX_SUBJECTS` | Maximum number of plans or assets one report may read. Above it the request is refused with error `191`, so a report never returns a partial count. | No | `20000` | `50000` |
| `REPORT_MAX_SUBJECTS_INSTALLATION` | The same limit for installation-wide reports, which read across every tenant. Items are read in batches, so this limit bounds the duration of a report, not its memory use. | No | `100000` | `200000` |
| `REPORT_MAX_QUESTIONS` | Maximum number of questions per report request. | No | `10` | `10` |
| `REPORT_MAX_DIMENSIONS` | Maximum number of breakdown levels per report request. | No | `3` | `3` |
| `REPORT_TEXT_TOP_N` | Distinct free-text answers listed before the remainder is folded into *Other text (n)*. Callers may pass a different `textTopN` per request. | No | `20` | `50` |
| `REPORT_SEARCH_CACHE_SECONDS` | How long the parsed question index of a tenant is kept for the question search, which otherwise re-parses the current version of every template and blueprint on each keystroke. A template published inside the window appears in search results once it expires. `0` disables the cache. | No | `60` | `300` |

### Update check configuration

Once a day, the API service sends its version and installation ID to the OpenCDMP update service and reads back the latest release and the project notices that the [Maintenance](/docs/administering/maintenance.md#installation) page shows. Unless a system administrator switches it off on that page, the check also carries anonymous usage data: the installation's address, the number of organisations, users, plans and assets, and the Java and database versions.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `UPDATE_CHECK_ENABLED` | Boolean value to enable the daily update check. When `false`, nothing is sent, and the Maintenance page shows that update checks are switched off. | No | `true` | `false` |
| `UPDATE_CHECK_URL` | Address of the update service. | No | `https://updates.opencdmp.eu/v1/feed` | `https://updates.opencdmp.eu/v1/feed` |
| `UPDATE_CHECK_INSTALLATION_URL` | Address sent as the installation's address with the usage data. | No | The value of `CORS_ALLOWED_ORIGIN` | `https://dmp.example.org` |

---

## See also

- [Registering plugin services](/docs/deployment/configuration/plugin-services.md) - File transformers, deposit services, and evaluators of the installation
- [Keycloak setup](/docs/deployment/configuration/keycloak.md) - The realm, its clients, and its groups
- [Infrastructure](/docs/deployment/configuration/infrastructure.md) - PostgreSQL, RabbitMQ, and Elasticsearch in the Docker example
- [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) - Log files, health checks, and metrics
- [Before going to production](/docs/deployment/install/production.md) - Secrets, encryption key, and several API instances

---

## Supplementary services

The notification and annotation services and the plugins are configured separately:

<DocCardList />
