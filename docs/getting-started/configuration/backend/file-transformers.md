---
sidebar_position: 3
description: Configuring the file transformer services
---

# File Transformer Services
These are the currently implemented [file transformers services](/docs/optional-services/file-transformers.md). Here you can view all available configuration options for each file transformer service.

## Docx File Transformer

### Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | [Keycloak client scope](/getting-started/configuration/keycloak/#step-4-create-client-scopes) that security is intended for. | Yes | - | `<keycloak-client-scope>` |

### Template Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `WORD_FILE_TRANSFORMER_WORD_PLAN_TEMPLATE` | Docx file that used as a template to export plans. | No | `classpath:documents/plan.docx` | `classpath:documents/plan.docx`|
| `WORD_FILE_TRANSFORMER_WORD_DESCRIPTION_TEMPLATE` | Docx file that used as a template to export descriptions. | No | `classpath:documents/description.docx` | `classpath:documents/description.docx`|

### PDF Conversion

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `PDF_CONVERTER_URL` | Server URL that convert docx files to pdf. Used to export plans or descriptions to pdf format. | Yes | - | `http://<hostname>:<port>`|

### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file to store logging. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |

## RDA File Transformer

### Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | Yes | - | `<keycloak-client-scope>` |

### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |

## RAiD File Transformer

### Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | Yes | - | `<keycloak-client-scope>` |

### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |

---

## See Also

- [Main Backend Configuration](/docs/getting-started/configuration/backend/index.md) - Core backend service configuration
- [File Transformer Service Authentication](/docs/getting-started/configuration/backend/index.md#file-transformer-service-authentication) - Backend authentication setup for file transformers
- [Keycloak Configuration](/getting-started/configuration/keycloak/) - Authentication setup

---