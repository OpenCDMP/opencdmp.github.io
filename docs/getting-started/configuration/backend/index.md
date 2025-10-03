import DocCardList from '@theme/DocCardList';

# Backend Services Configuration
This document provides an overview of the configuration settings for the backend services of OpenCDMP, based on their respective `app.env` files.

### Backend Service Configuration

Here you can view all available configuration options for main app backend service.

#### Authentication & Security

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | [Keycloak API client](/getting-started/configuration/keycloak/#client-api) roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | [Keycloak API client scope](/getting-started/configuration/keycloak/#step-4-create-client-scopes) that security is intended for. | Yes | - | `<keycloak-client-scope>` |
| `CORS_ALLOWED_ORIGIN` | String that contains allowed origin for this server. | Yes | - | `http://<hostname>:<port>` |

#### Database Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DB_URL` | Database connection string. | Yes | - | `jdbc:postgresql://<opencdmp-postgres-hostname>:<port>/<database-name>` | 
| `DB_USER` | Database username string. | Yes | - | `<opencdmp-user>` |
| `DB_PASS` | Database password string. | Yes | - | `<opencdmp-password>` |

#### Elasticsearch Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `ELASTIC_ENABLED` | Boolean value to enable Elastic search. | Yes | - | `true` |
| `ELASTIC_HOST` | URI that contains elastic host. | Yes* | - | `<elastic-host>:<port>` |
| `ELASTIC_USE_SSL` | Boolean value to enable Elastic SSL. | No | `false` | `true` |
| `ELASTIC_USER` | Elastic username string. | Yes* | - | `<opencdmp-elastic-user>` |
| `ELASTIC_PASS` | Elastic password string. | Yes* | - | `<opencdmp-elastic-password>` |
| `ELASTIC_PLAN_INDEX` | Elastic index name for plans. | Yes* | - | `<opencdmp-plans-index>` |
| `ELASTIC_DESCRIPTION_INDEX` | Elastic index name for descriptions. | Yes* | - | `<opencdmp-descriptons-index>` |

*Required only if `ELASTIC_ENABLED` is set to `true`

#### RabbitMQ Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `QUEUE_APP_ID` | [RabbitMQ](https://www.rabbitmq.com/) application id string. | Yes | - | `<opencdmp-app-id>` |
| `QUEUE_NAME` | RabbitMQ queue name string. | Yes | - | `<rabbit-mq-queue-name>` |
| `QUEUE_EXCHANGE` | RabbitMQ exchange name string. | Yes | - | `<rabbit-mq-queue-exchange>` |
| `RABBIT_HOST` | RabbitMQ connection host name. | Yes | - | `<hostname>` |
| `RABBIT_PORT` | RabbitMQ connection port. | Yes | - | `<port>` |
| `RABBIT_USER` | RabbitMQ username string. | Yes | - | `<rabbit-mq-username>` |
| `RABBIT_PASS` | RabbitMQ password string. | Yes | - | `<rabbit-mq-password>` |

#### Keycloak API Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KEYCLOAK_API_SERVER_URL` | Keycloak server URL string. | Yes | - | `http://<keycloak-hostname>:<port>` |
| `KEYCLOAK_API_REALM` | Keycloak realm name. | Yes | - | `<keycloak-realm>` |
| `KEYCLOAK_API_CLIENT_ID` | Keycloak client id string to get auth token. | Yes | - | `<keycloak-client-id>` |
| `KEYCLOAK_API_CLIENT_SECRET` | Keycloak client secret string to get auth token. | Yes | - | `<keycloak-client-secret>` |
| `KEYCLOAK_API_USERNAME` | Keycloak user name string. | Yes | - | `<keycloak-username>` |
| `KEYCLOAK_API_PASSWORD` | Keycloak password string. | Yes | - | `<keycloak-password>` |

#### Keycloak Group IDs (Role Mapping)

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KEYCLOAK_API_GLOBAL_USER_GROUP_ID` | UUID group value for role `USER`. | Yes | - | `a04fd333-f127-449e-8fc2-0626570a3899` |
| `KEYCLOAK_API_GLOBAL_ADMIN_GROUP_ID` | UUID group value for role `ADMIN`. | Yes | - | `299f18fe-e271-4625-a4c1-9c3eb313b2ea` |
| `KEYCLOAK_API_GLOBAL_INSTALLATION_ADMIN_GROUP_ID` | UUID group value for role `INSTALLATION ADMIN`. | Yes | - | `88a65fff-dffe-474a-a461-252ff4230203` |
| `KEYCLOAK_API_TENANT_ADMIN_GROUP_ID` | UUID group value for role `TENANT ADMIN`. | Yes | - | `4453d854-4aea-4d19-af80-7f9d85e5a2c9` |
| `KEYCLOAK_API_TENANT_USER_GROUP_ID` | UUID group value for role `TENANT USER`. | Yes | - | `c7057c4d-e7dc-49ef-aa5d-02ad3a22bff89` |
| `KEYCLOAK_API_TENANT_CONFIG_MANAGER_GROUP_ID` | UUID group value for role `TENANT CONFIG MANAGER`. | Yes | - | `09a6977b-719e-4e90-b3fc-3b394d82e05f` |
| `KEYCLOAK_API_TENANT_PLAN_MANAGER_GROUP_ID` | UUID group value for role `TENANT PLAN MANAGER`. | Yes | - | `37d1fb0e-5e03-47bf-aefc-365c0670f84e` |

#### File Transformer Service Authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `FILE_TRANSFORMER_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for [file transformer services](/docs/optional-services/file-transformers.md). | Yes** | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>/protocol/openid-connect/token` |
| `FILE_TRANSFORMER_AUTH_CLIENT_ID` | Keycloak client id string to get auth token for file transformer services. | Yes** | - | `<keycloak-client-id>` |
| `FILE_TRANSFORMER_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for file transformer services. | Yes** | - | `<keycloak-client-secret>` |
| `FILE_TRANSFORMER_AUTH_SCOPE` | Keycloak client scope string for file transformer services. | Yes** | - | `<keycloak-scope>` |

**Required if using file transformer services

#### Deposit Service Authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for [deposit services](/docs/optional-services/deposit-services.md). | Yes*** | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>/protocol/openid-connect/token` |
| `DEPOSIT_AUTH_CLIENT_ID` | Keycloak client id string to get auth token deposit services. | Yes*** | - | `<keycloak-client-id>` |
| `DEPOSIT_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for deposit services. | Yes*** | - | `<keycloak-client-secret>` |
| `DEPOSIT_AUTH_SCOPE` | Keycloak client scope string for deposit services. | Yes*** | - | `<keycloak-scope>` |

***Required if using deposit services

#### Evaluator Service Authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `EVALUATOR_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for [evaluator services](/docs/optional-services/evaluator-services.md). | Yes**** | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>/protocol/openid-connect/token` |
| `EVALUATOR_AUTH_CLIENT_ID` | Keycloak client id string to get auth token evaluator services. | Yes**** | - | `<keycloak-client-id>` |
| `EVALUATOR_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for evaluator services. | Yes**** | - | `<keycloak-client-secret>` |
| `EVALUATOR_AUTH_SCOPE` | Keycloak client scope string for evaluator services. | Yes**** | - | `<keycloak-scope>` |

****Required if using evaluator services

#### File Storage Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `FILE_STORAGE` | File path to store all application files. | Yes | - | `./storage/files` |

#### Supportive Material Paths

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `SUPPORTIVE_MATERIAL_USER_GUIDE_PATH` | File path to store Supportive Material [User Guide](/docs/admin-guide/system-configuration/supportive-material.md). | No | `classpath:/material/user-guide/` | `classpath:<file-path>` |
| `SUPPORTIVE_MATERIAL_ABOUT_PATH` | File path to store Supportive Material [About](/docs/admin-guide/system-configuration/supportive-material.md). | No | `classpath:/material/about/` | `classpath:<file-path>` |
| `SUPPORTIVE_MATERIAL_TERM_OF_SERVICE_PATH` | File path to store Supportive Material [Terms of Service](/docs/admin-guide/system-configuration/supportive-material.md). | No | `classpath:/material/terms-of-service/` | `classpath:<file-path>` |
| `SUPPORTIVE_MATERIAL_GLOSSARY_PATH` | File path to store Supportive Material [Glossary](/docs/admin-guide/system-configuration/supportive-material.md). | No | `classpath:/material/glossary/` | `classpath:<file-path>` |
| `SUPPORTIVE_MATERIAL_FAQ_PATH` | File path to store Supportive Material [FAQ](/docs/admin-guide/system-configuration/supportive-material.md). | No | `classpath:/material/faq/` | `classpath:<file-path>` |
| `SUPPORTIVE_MATERIAL_COOKIE_POLICY_PATH` | File path to store Supportive Material [Cookie Policy](/docs/admin-guide/system-configuration/supportive-material.md). | No | `classpath:/material/cookie-policy/` | `classpath:<file-path>` |
| `SUPPORTIVE_MATERIAL_LANGUAGE_PATH` | File path to store [Language](/docs/admin-guide/system-configuration/languages.md) files. | No | `file:frontend/src/assets/i18n/` |`file:<file-path>` |

#### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:<file-path>/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |

#### Encryption Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `TENANT_CONFIG_ENCRYPTION_AES_KEY` | [AES key](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) used to encrypt keycloak client secret for [file transformer](/docs/optional-services/file-transformers.md), [deposit](/docs/optional-services/deposit-services.md), [evaluator](/docs/optional-services/evaluator-services.md) services. | No | `rmpTvZnRWzyisUtFADBcZCn0q7Z75Xdz` | `rmpTvZnRWzyisUtFADBcZCn0q7Z75Xdz` |
| `TENANT_CONFIG_ENCRYPTION_AES_IV` | [AES IV](https://en.wikipedia.org/wiki/Initialization_vector) used to encrypt keycloak client secret for [file transformer](/docs/optional-services/file-transformers.md), [deposit](/docs/optional-services/deposit-services.md), [evaluator](/docs/optional-services/evaluator-services.md) services. | No | `ec05d521a23f80ad` | `ec05d521a23f80ad` |

#### Notification Expiration Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `MERGE_ACCOUNT_EXPIRATION` | Expiration time (in seconds) for [link account notification](/docs/user-guide/profile-settings.md#link-account). | No | `14400` | `14400` |
| `REMOVE_CREDENTIAL_EXPIRATION` | Expiration time (in seconds) for [unlink account notification](/docs/user-guide/profile-settings.md#unlink-account). | No | `14400` | `14400` |
| `TENANT_SPECIFIC_INVITATION_EXPIRATION` | Expiration time (in seconds) for [user invite notification to tenant](/docs/admin-guide/user-management/tenant-users.md). | No | `2592000` | `2592000` |
| `PLAN_INVITATION_EXTERNAL_USER_EXPIRATION` | Expiration time (in seconds) for [notification of invitation of external users to a plan](/docs/user-guide/plans/invite-collaborators.md). | No | `2592000` | `2592000` |

#### Locale Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOCALE_TIMEZONE` | Timezone for backend service. | No | `UTC` | `UTC` |
| `LOCALE_LANGUAGE` | Language for backend service. | No | `en` | `en` |
| `LOCALE_CULTURE` | Culture for backend service. | No | `en` | `en` |

#### Contact Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `CONTACT_SUPPORT_EMAIL_ADDRESS` | Email receiver for contact support notifications. | Yes | - | `support@mydomain.com` |
<!-- accounting disabled
#### Accounting Service Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `ACCOUNTING_ENABLED` | Boolean value to enable [accounting service](/docs/optional-services/accounting-services/accounting-preview.md). | No | - | `true` |
| `ACCOUNTING_URL` | Accounting service connection URL string. | Yes***** | - | `http://<hostname>:<port>` |
| `ACCOUNTING_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for accounting service. | Yes***** | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>/protocol/openid-connect/token` |
| `ACCOUNTING_AUTH_CLIENT_ID` | Keycloak client id string to get auth token accounting service. | Yes***** | - | `<keycloak-client-id>` |
| `ACCOUNTING_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for accounting service. | Yes***** | - | `<keycloak-client-secret>` |
| `ACCOUNTING_AUTH_SCOPE` | Keycloak client scope string for accounting service. | Yes***** | - | `<keycloak-scope>` |

*****Required if `ACCOUNTING_ENABLED` is set to `true` -->
<!-- kpi disabled
#### KPI Service Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KPI_VIEWER_TASK_ENABLED` | Boolean value to enable [KPI service](/docs/optional-services/kpi.md). | No | - | `true` |
| `KPI_VIEWER_INDICATOR_ID` | A UUID value to create an indicator. | No | `97c2d685-d7d2-4bd1-a287-ba329ad45d74` | `97c2d685-d7d2-4bd1-a287-ba329ad45d74` | -->

#### Swagger Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `SWAGGER_AUTH_CLIENT_ID` | Keycloak [Swagger](/getting-started/configuration/keycloak/#client-swagger) client id | Yes | - | `<keycloak-client-id>` |
| `SWAGGER_AUTH_REDIRECT_URL` | Swagger redirect URL (must be the same value with [swagger keycloak client](/getting-started/configuration/keycloak/#client-swagger)). | Yes | - | `https://(APP_URL)/api/swagger-ui/oauth2-redirect.html` |
| `SWAGGER_SERVER_URL` | Server URL. | Yes | - | `https://(APP_URL)/api` |

---

### See Also

For detailed configuration of supplementary services, see:
- [Notification Service Configuration](notification.md) - Email notifications and RabbitMQ setup
- [Annotation Service Configuration](annotation.md) - Annotation service database and messaging
- [File Transformer Services](file-transformers.md) - Docx, RDA, and RAiD file transformers
- [Deposit Services](deposit.md) - Zenodo, DSpace, CKAN, Dataverse, and Fedora integration
- [Evaluator Services](evaluators.md) - RDA maDMP and OSTrails evaluators
- [Keycloak Configuration](/getting-started/configuration/keycloak/) - Authentication and authorization setup

---

### Backend configuration for supplementary services

<DocCardList />