---
sidebar_position: 5
description: Configuring the evaluator services
---

# Evaluator Services
These are the currently implemented [evaluator services](/optional-services/evaluator-services.md). Here you can view all available configuration options for each evaluator service.

## Evaluator RDA maDMP

### Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | [Keycloak client scope](/deployment/configuration/keycloak/#step-4-create-client-scopes) that security is intended for. | Yes | - | `<keycloak-client-scope>` |

### RDA Schema Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `RDA_MADMP_RDA_SCHEMA` | JSON file that contains [RDA](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) schema to make evaluations. | No | `classpath:schema/rda-schema.json` | `classpath:schema/<file-name>.json` |

### UI Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `RDA_MADMP_HAS_LOGO` | Boolean value to enable evaluator logo. | No | `true` | `true` |
| `RDA_MADMP_LOGO_PATH` | Image for evaluator logo. | No | `classpath:rda.png` | `classpath:<image-name>.<image-type>` |

### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |

---

## Evaluator OSTrails

### Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | Yes | - | `<keycloak-client-scope>` |

### UI Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `OSTRAILS_EVALUATOR_HAS_LOGO` | Boolean value to enable evaluator logo. | No | `true` | `true` |
| `OSTRAILS_EVALUATOR_LOGO_PATH` | Image for evaluator logo. | No | `classpath:ostrails.png` | `classpath:<image-name>.<image-type>` |

### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |

---

## Evaluator OpenAIRE FAIR

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

### UI Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `FAIR_EVALUATOR_BASE_URL` | URL string for evaluating with FAIR Standars. | Yes | - | - |
| `FAIR_EVALUATOR_HAS_LOGO` | Boolean value to enable evaluator logo. | No | `true` | `true` |
| `FAIR_EVALUATOR_LOGO_PATH` | Image for evaluator logo. | No | `classpath:fair.png` | `classpath:<image-name>.<image-type>` |

---

## See Also

- [Main Backend Configuration](/deployment/configuration/backend/index.md) - Core backend service configuration
- [Evaluator Service Authentication](/deployment/configuration/backend/index.md#evaluator-service-authentication) - Backend authentication setup for evaluators
- [Keycloak Configuration](/deployment/configuration/keycloak/) - Authentication setup

---