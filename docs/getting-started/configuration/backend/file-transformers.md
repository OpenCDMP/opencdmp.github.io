---
sidebar_position: 3
description: Configuring the file transformer services
---

# File Transformer Services
There are currently two implemented [file transformers services](/docs/supplementary-services/file-transformers.md).

<h3>Docx File Transformer</h3>

| Env Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | - | `<keycloak-client-scope>` |
| `WORD_FILE_TRANSFORMER_WORD_PLAN_TEMPLATE` | Docx file that used as a template to export plans. | `classpath:documents/plan.docx` | `classpath:documents/plan.docx`|
| `WORD_FILE_TRANSFORMER_WORD_DESCRIPTION_TEMPLATE` | Docx file that used as a template to export descriptions. | `classpath:documents/description.docx` | `classpath:documents/description.docx`|
| `PDF_CONVERTER_URL` | Server URL that convert docx files to pdf. Used to export plans or descriptions to pdf format. | - | `http://<hostname>:<port>`|
| `LOGGING_CONFIG_PATH` | Xml file to store logging. | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |

<h3>RDA File Transformer</h3>

| Env Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | - | `<keycloak-client-scope>` |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging confiiguration. | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARM`, `ERROR` | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | - | `logs/` |

---