---
sidebar_position: 4
description: Configuring the deposit services
---

# Deposit Services
There are currently one implemented [deposit service](/docs/supplementary-services/deposit-services.md). This service is directly integrated with [Zenodo](https://zenodo.org/).

<h3> Repository Deposit Zenodo </h3>

| Env Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | - | `<keycloak-client-scope>` |
| `OPENCDMP_DOMAIN` | OpenCDMP URL string. | - | `http://<opencdmp-hostname>:<opencdmp-port>/` |
| `DEPOSIT_ZENODO_URL` | [Zenodo API](https://developers.zenodo.org/#rest-api) URL | `https://zenodo.org/api/` | `https://<zenodo-hostname>/api/` |
| `DEPOSIT_ZENODO_RECORD_URL` | Zenodo record URL to get specific DOI. The url must contain the `{doi id}` element, which is handled internally by the OPENCDMP platfmorm | `https://zenodo.org/doi/{doi_id}` | `https://<zenodo-hostname>/doi/{doi_id}` |
| `DEPOSIT_ZENODO_REDIRECT_URL` | Zenodo redirect URL back to OpenCDMP platform. | - | `http://<opencdmp-hostname>:<opencdmp-port>/deposit/oauth2/code-callaback` |
| `DEPOSIT_ZENODO_AUTHORIZATION_URL` | Zenodo URL for authorization. | `https://zenodo.org/oauth/authorize` | `https://<zenodo-hostname>/oauth/authorize` |
| `DEPOSIT_ZENODO_ACCESS_TOKEN_URL` | Zenodo URL to get access token. | `https://zenodo.org/oauth/token` | `https://<zenodo-hostname>/oauth/token` |
| `DEPOSIT_ZENODO_CLIENT_ID` | Zenodo client id to get access for deposit with your user account. | - | `<zenodo-client-id>` |
| `DEPOSIT_ZENODO_CLIENT_SECRET` | Zenodo client secret to get access for deposit with your user account. | - | `<zenodo-client-secret>` |
| `DEPOSIT_ZENODO_ACCESS_TOKEN` | Zenodo access token for deposit without your user account. | - | `<zenodo-client-secret>` |
| `DEPOSIT_ZENODO_COMMUNITY` | Zenodo community. | - | `OpenCDMP` |
| `DEPOSIT_ZENODO_AFFILIATION` | Zenodo affiliation. | - | `OpenCDMP` |
| `DEPOSIT_ZENODO_HAS_LOGO` | Boolean value to enable Zenodo logo. | `true` | `true` |
| `DEPOSIT_ZENODO_LOGO_PATH` | Image for Zenodo logo. | `classpath:zenodo.jpg` | `classpath:<image-name>.<image-type>` |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging confiiguration. | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARM`, `ERROR` | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | - | `logs/` |

---