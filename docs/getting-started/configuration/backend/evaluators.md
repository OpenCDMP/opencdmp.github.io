---
sidebar_position: 5
description: Configuring the evaluator services
---

# Evaluator Services
There are currently one implemented [evaluator service](/docs/supplementary-services/evaluator-services.md).

<h3>Evaluator RDA maDMP </h3>

| Env Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | - | `<keycloak-client-scope>` |
| `RDA_MADMP_RDA_SCHEMA` | JSON file that contains [RDA](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) schema to make evaluations. | `classpath:schema/rda-schema.json` | `classpath:schema/<file-name>.json` |
| `RDA_MADMP_HAS_LOGO` | Boolean value to enable evaluator logo. | `true` | `true` |
| `RDA_MADMP_LOGO_PATH` | Image for evaluator logo. | `classpath:fair.png` | `classpath:<image-name>.<image-type>` |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging confiiguration. | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARM`, `ERROR` | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | - | `logs/` |
---