import DocCardList from '@theme/DocCardList';

# Backend Services Configuration
This document provides an overview of the configuration settings for the backend services of OpenCDMP, based on their respective `app.env` files.

### Backend Service Configuration

| Env Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | - | `<keycloak-client-scope>` |
| `CORS_ALLOWED_ORIGIN` | String that contains allowed origin for this server. | - | `http://<hostname>:<port>` |
| `DB_URL` | Database connection string. | - | `jdbc:postgresql://<opencdmp-postgres-hostname>:<port>/<database-name>` | 
| `DB_USER` | Database username string. | - | `<opencdmp-user>` |
| `DB_PASS` | Database password string. | - | `<opencdmp-password>` |
| `ELASTIC_ENABLED` | Boolean value to enable Elastic search. | - | `true` |
| `ELASTIC_HOST` | URI that contains elastic host. | - | `<elastic-host>:<port>` |
| `ELASTIC_USE_SSL` | Boolean value to enable Elastic SSL. | - | `true` |
| `ELASTIC_USER` | Elastic username string. | - | `<opencdmp-elastic-user>` |
| `ELASTIC_PASS` | Elastic password string. | - | `<opencdmp-elastic-password>` |
| `ELASTIC_PLAN_INDEX` | Elastic index name for plans. | - | `<opencdmp-plans-index>` |
| `ELASTIC_DESCRIPTION_INDEX` | Elastic index name for descriptions. | - | `<opencdmp-descriptons-index>` |
| `QUEUE_ENABLED` | Boolean value to enable queue [RabbitMQ](https://www.rabbitmq.com/) server. It must be enabled if we want the backend communicate with the other [supplementary services](/docs/supplementary-services/index.md).  | `true` | `true` |
| `QUEUE_APP_ID` | RabbitMQ application id string. | - | `<opencdmp-app-id>` |
| `QUEUE_NAME` | RabbitMQ name string. | - | `<rabbit-mq-queue-name>` |
| `QUEUE_EXCHANGE` | RabbitMQ name string. | - | `<rabbit-mq-queue-exchange>` |
| `RABBIT_HOST` | RabbitMQ connection host name. | - | `<hostname>` |'
| `RABBIT_PORT` | RabbitMQ connection port. | - | `<port>` |
| `RABBIT_USER` | RabbitMQ username string. | - | `<rabbit-mq-username>` |
| `RABBIT_PASS` | RabbitMQ password string. | - | `<rabbit-mq-password>` |
| `KEYCLOAK_API_SERVER_URL` | Keycloak server URL string. | - | `http://<keycloak-hostname>:<port>` |
| `KEYCLOAK_API_REALM` | Keycloak realm name. | - | `<keycloak-realm>` |
| `KEYCLOAK_API_CLIENT_ID` | Keycloak client id string to get auth token. | - | `<keycloak-client-id>` |
| `KEYCLOAK_API_CLIENT_SECRET` | Keycloak client secret string to get auth token. | - | `<keycloak-client-secret>` |
| `KEYCLOAK_API_USERNAME` | Keycloak user name string. | - | `<keycloak-username>` |
| `KEYCLOAK_API_PASSWORD` | Keycloak password string. | - | `<keycloak-password>` |
| `KEYCLOAK_API_GLOBAL_USER_GROUP_ID` | UUID group value for role `USER`. | - | `a04fd333-f127-449e-8fc2-0626570a3899` |
| `KEYCLOAK_API_GLOBAL_ADMIN_GROUP_ID` | UUID group value for role `ADMIN`. | - | `299f18fe-e271-4625-a4c1-9c3eb313b2ea` |
| `KEYCLOAK_API_GLOBAL_INSTALLATION_ADMIN_GROUP_ID` | UUID group value for role `INSTALLATION ADMIN`. | - | `88a65fff-dffe-474a-a461-252ff4230203` |
| `KEYCLOAK_API_TENANT_ADMIN_GROUP_ID` | UUID group value for role `TEANNT ADMIN`. | - | `4453d854-4aea-4d19-af80-7f9d85e5a2c9` |
| `KEYCLOAK_API_TENANT_USER_GROUP_ID` | UUID group value for role `TEANNT USER`. | - | `c7057c4d-e7dc-49ef-aa5d-02ad3a22bff89` |
| `KEYCLOAK_API_TENANT_CONFIG_MANAGER_GROUP_ID` | UUID group value for role `TEANNT CONFIG MANAGER`. | - | `09a6977b-719e-4e90-b3fc-3b394d82e05f` |
| `KEYCLOAK_API_TENANT_PLAN_MANAGER_GROUP_ID` | UUID group value for role `TEANNT PLAN MANAGER`. | - | `37d1fb0e-5e03-47bf-aefc-365c0670f84e` |
| `FILE_TRANSFORMER_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for [file transformer services](/docs/supplementary-services/file-transformers.md). | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>/protocol/openid-connect/token` |
| `FILE_TRANSFORMER_AUTH_CLIENT_ID` | Keycloak client id string to get auth token for file transformer services. | - | `<keycloak-client-id>` |
| `FILE_TRANSFORMER_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for file transformer services. | - | `<keycloak-client-secret>` |
| `FILE_TRANSFORMER_AUTH_SCOPE` | Keycloak client scope string for file transformer services. | - | `<keycloak-scope>` |
| `DEPOSIT_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for [deposit services](/docs/supplementary-services/deposit-services.md). | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>/protocol/openid-connect/token` |
| `DEPOSIT_AUTH_CLIENT_ID` | Keycloak client id string to get auth token deposit services. | - | `<keycloak-client-id>` |
| `DEPOSIT_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for deposit services. | - | `<keycloak-client-secret>` |
| `DEPOSIT_AUTH_SCOPE` | Keycloak client scope string for deposit services. | - | `<keycloak-scope>` |
| `EVALUATOR_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for [evaluator services](/docs/supplementary-services/evaluator-services.md). | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>/protocol/openid-connect/token` |
| `EVALUATOR_AUTH_CLIENT_ID` | Keycloak client id string to get auth token evaluator services. | - | `<keycloak-client-id>` |
| `EVALUATOR_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for evaluator services. | - | `<keycloak-client-secret>` |
| `EVALUATOR_AUTH_SCOPE` | Keycloak client scope string for evaluator services. | - | `<keycloak-scope>` |
| `FILE_STORAGE` | File path to store all application files. | - | `./storage/files` |
| `SUPPORTIVE_MATERIAL_USER_GUIDE_PATH` | File path to store Supportive Material [User Guide](/docs/administration/supportive-material.md).| `backend/web/src/main/resources/material/user-guide/` | `backend/web/src/main/resources/material/user-guide/` |
| `SUPPORTIVE_MATERIAL_ABOUT_PATH` | File path to store Supportive Material [About](/docs/administration/supportive-material.md).| `backend/web/src/main/resources/material/about/` | `backend/web/src/main/resources/material/about/` |
| `SUPPORTIVE_MATERIAL_TERM_OF_SERVICE_PATH` | File path to store Supportive Material [Terms of Service](/docs/administration/supportive-material.md).| `backend/web/src/main/resources/material/terms-of-service/` | `backend/web/src/main/resources/material/terms-of-service/` |
| `SUPPORTIVE_MATERIAL_GLOSSARY_PATH` | File path to store Supportive Material [Glosarry](/docs/administration/supportive-material.md). | `backend/web/src/main/resources/material/glossary/` | `backend/web/src/main/resources/material/glossary/` |
| `SUPPORTIVE_MATERIAL_FAQ_PATH` | File path to store Supportive Material [FAQ](/docs/administration/supportive-material.md). | `backend/web/src/main/resources/material/faq/` | `backend/web/src/main/resources/material/faq/` |
| `SUPPORTIVE_MATERIAL_COOKIE_POLICY_PATH` | File path to store Supportive Material [Cookie Policy](/docs/administration/supportive-material.md). | `backend/web/src/main/resources/material/cookie-policy/` | `backend/web/src/main/resources/material/cookie-policy/` |
| `SUPPORTIVE_MATERIAL_LANGUAGE_PATH` | File path to store [Language](/docs/administration/languages.md) files. | `frontend/src/assets/i18n/` | `frontend/src/assets/i18n/` |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging confiiguration. | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARM`, `ERROR` | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | - | `logs/` |
| `TENANT_CONFIG_ENCRYPTION_AES_KEY` | [AES key](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) used to encrypt keycloak client secret for [file transformer](/docs/supplementary-services/file-transformers.md), [deposit](/docs/supplementary-services/deposit-services.md), [evaluator](/docs/supplementary-services/evaluator-services.md) services. | `rmpTvZnRWzyisUtFADBcZCn0q7Z75Xdz` | `rmpTvZnRWzyisUtFADBcZCn0q7Z75Xdz` |
| `TENANT_CONFIG_ENCRYPTION_AES_IV` | [AES IV](https://en.wikipedia.org/wiki/Initialization_vector) used to encrypt keycloak client secret for [file transformer](/docs/supplementary-services/file-transformers.md), [deposit](/docs/supplementary-services/deposit-services.md), [evaluator](/docs/supplementary-services/evaluator-services.md) services. | `ec05d521a23f80ad` | `ec05d521a23f80ad` |
| `MERGE_ACCOUNT_EXPIRATION` | Expiration time (in seconds) for [link account notification](/docs/application/profile-settings.md#link-account). |`14400` | `14400` |
| `REMOVE_CREDENTIAL_EXPIRATION` | Expiration time (in seconds) for [unlink account notification](/docs/application/profile-settings.md#unlink-account). |`14400` | `14400` |
| `TENANT_SPECIFIC_INVITATION_EXPIRATION` | Expiration time (in seconds) for [user invite notification to tenant](/docs/administration/tenant-users.md). | `2592000` | `2592000` |
| `PLAN_INVITATION_EXTERNAL_USER_EXPIRATION` | Expiration time (in seconds) for [notification of invitation of external users to a plan](/docs/application/plans/invite-collaborators.md). | `2592000` | `2592000` |
| `PLAN_INVITATION_EXTERNAL_USER_EXPIRATION` | Expiration time (in seconds) for [notification of invitation of external users to a plan](/docs/application/plans/invite-collaborators.md). | `2592000` | `2592000` |
| `LOCALE_TIMEZONE` | Timezone for backend service. | `UTC` | `UTC` |
| `LOCALE_LANGUAGE` | Language for backend service. | `en` | `en` |
| `LOCALE_CULTURE` | Culture for backend service. | `en` | `en` |
| `CONTACT_SUPPORT_EMAIL_ADDRESS` | Email receiver for contact support notifications. | - | `support@opencdmp.com` |
| `ACCOUNTING_ENABLED` | Boolean value to enable [accounting service](/docs/supplementary-services/accounting.md). | - | `true` |
| `ACCOUNTING_URL` | Accounting service connection URL string. | - | `http://<hostname>:<port>` |
| `ACCOUNTING_AUTH_TOKEN_ENDPOINT` | URL to get keycloak auth token for accounting service. | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>/protocol/openid-connect/token` |
| `ACCOUNTING_AUTH_CLIENT_ID` | Keycloak client id string to get auth token accounting service. | - | `<keycloak-client-id>` |
| `ACCOUNTING_AUTH_CLIENT_SECRET` | Keycloak client secret string to get auth token for accounting service. | - | `<keycloak-client-secret>` |
| `ACCOUNTING_AUTH_SCOPE` | Keycloak client scope string for accounting service. | - | `<keycloak-scope>` |
| `KPI_VIEWER_TASK_ENABLED` | Boolean value to enable [KPI service](/docs/supplementary-services/kpi.md). | - | `true` |
| `KPI_VIEWER_INDICATOR_ID` | A UUID value to create an indicator. | `97c2d685-d7d2-4bd1-a287-ba329ad45d74` | `97c2d685-d7d2-4bd1-a287-ba329ad45d74` |
| `METRICS_ENABLED` | Boolean value to enable metrics. | `false` | `true` |
| `METRICS_USER_COUNT_IDP_CLIENT_ID_UUID` | Keycloak Client UUID to get active user sessions count for this client. | `745cd36a-b8bf-4f47-9523-c861abd2ed7a` | `745cd36a-b8bf-4f47-9523-c861abd2ed7a` |
| `METRICS_ENDPOINT_BASE_PATH` | path for metrics endopoint. | `/` | `/` |

---

### Backend configuration for supplementary services

<DocCardList />