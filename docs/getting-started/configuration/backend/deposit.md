---
sidebar_position: 4
description: Configuring the deposit services
---

# Deposit Services
There are currently five implemented [deposit services](/docs/optional-services/deposit-services.md). Here you can view all available configuration options for each deposit service.

## Zenodo 
This service is directly integrated with [Zenodo](https://zenodo.org/).

:::warning
- To perform a successful deposit in Zenodo from OpenCDMP with OAuth 2.0 authentication, a developer application must be created on the Zenodo platform. The values of `DEPOSIT_ZENODO_CLIENT_ID`, `DEPOSIT_ZENODO_CLIENT_SECRET`, `DEPOSIT_ZENODO_REDIRECT_URL` must come from this application.
- To perform a simple deposit in Zenodo from OpenCDMP without OAuth 2.0 authentication, a personal access token must be created on the Zenodo platform. This access token is the value of `DEPOSIT_ZENODO_ACCESS_TOKEN`. With this access token every user of the OpenCDMP can use it to make deposits in the Zenodo.

More details about authentication [here](https://developers.zenodo.org/#authentication).
:::

### Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | [Keycloak client scope](/getting-started/configuration/keycloak/#step-4-create-client-scopes) that security is intended for. | Yes | - | `<keycloak-client-scope>` |
| `OPENCDMP_DOMAIN` | OpenCDMP URL string. | Yes | - | `http://<opencdmp-hostname>:<opencdmp-port>/` |

### Zenodo API Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_ZENODO_URL` | [Zenodo API](https://developers.zenodo.org/#rest-api) URL | No | `https://zenodo.org/api/` | `https://<zenodo-hostname>/api/` |
| `DEPOSIT_ZENODO_RECORD_URL` | Zenodo record URL to get specific DOI. The url must contain the `{doi id}` element, which is handled internally by the OPENCDMP platform | No | `https://zenodo.org/doi/{doi_id}` | `https://<zenodo-hostname>/doi/{doi_id}` |

### Zenodo OAuth2 Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_ZENODO_REDIRECT_URL` | Zenodo redirect URL back to OpenCDMP platform. | Yes* | - | `http://<opencdmp-hostname>:<opencdmp-port>/deposit/oauth2/code-callaback` |
| `DEPOSIT_ZENODO_AUTHORIZATION_URL` | Zenodo URL for authorization. | Yes* | `https://zenodo.org/oauth/authorize` | `https://<zenodo-hostname>/oauth/authorize` |
| `DEPOSIT_ZENODO_ACCESS_TOKEN_URL` | Zenodo URL to get access token. | Yes* | `https://zenodo.org/oauth/token` | `https://<zenodo-hostname>/oauth/token` |
| `DEPOSIT_ZENODO_CLIENT_ID` | Zenodo client id to get access for deposit with your user account. | Yes* | - | `<zenodo-client-id>` |
| `DEPOSIT_ZENODO_CLIENT_SECRET` | Zenodo client secret to get access for deposit with your user account. | Yes* | - | `<zenodo-client-secret>` |

*Required only if using OAuth 2.0 authentication method

### Zenodo Access Token (Alternative Authentication)

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_ZENODO_ACCESS_TOKEN` | Zenodo access token for deposit without user-specific OAuth. | Yes** | - | `<zenodo-access-token>` |

**Required only if NOT using OAuth 2.0

### Zenodo Metadata Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_ZENODO_COMMUNITY_ID` | Zenodo community ID to store published DOIs. | No | - | `<id>` |
| `DEPOSIT_ZENODO_RESOURCE_TYPE_ID` | Zenodo Resource Type of a published plan. | No | - | `51715dd3-5590-49f2-b227-6a663c849921` |
| `DEPOSIT_ZENODO_PUBLISHER_NAME` | Default value of publisher name. | No | `Zenodo` | `<publisher-name>` |
| `DEPOSIT_ZENODO_AFFILIATION` | Zenodo affiliation. | No | - | `OpenCDMP` |

### Zenodo UI Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_ZENODO_HAS_LOGO` | Boolean value to enable Zenodo logo. | No | `true` | `true` |
| `DEPOSIT_ZENODO_LOGO_PATH` | Image for Zenodo logo. | No | `classpath:zenodo.jpg` | `classpath:<image-name>.<image-type>` |

### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |

## DSpace

This service is directly integrated with [DSpace](https://dspace.org/).

### Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | Yes | - | `<keycloak-client-scope>` |
| `OPENCDMP_DOMAIN` | OpenCDMP URL string. | Yes | - | `http://<opencdmp-hostname>:<opencdmp-port>/` |

### DSpace Authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_DSPACE_USERNAME` | DSpace username. | Yes | - | `<dspace_username>` |
| `DEPOSIT_DSPACE_PASSWORD` | DSpace password. | Yes | - | `<dspace_password>` |

### DSpace API Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_DSPACE_URL` | DSpace REST API URL | No | `https://dspace.org/server/api/` | `https://<dspace-hostname>/api/` |
| `DEPOSIT_DSPACE_RECORD_URL` | DSpace URL to get specific DOI. The url must contain the `{doi id}` element, which is handled internally by the OPENCDMP platform. | No | `https://dspace.org/handle/{doi_id}` | `https://<dspace-hostname>/doi/{doi_id}` |
| `DEPOSIT_DSPACE_COLLECTION_ID` | The DSpace collection ID where the items will be stored. | Yes | - | `51715dd3-5590-49f2-b227-6a663c849921` |
| `DEPOSIT_DSPACE_TYPE` | Type that deposited items have. (CV, more details in [REST documentation](https://github.com/DSpace/RestContract/?tab=readme-ov-file#rest-endpoints)) | No | `Dataset` | `Dataset` |

### DSpace UI Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_DSPACE_HAS_LOGO` | Boolean value to enable DSpace logo. | No | `true` | `true` |
| `DEPOSIT_DSPACE_LOGO_PATH` | Image for DSpace logo. | No | `classpath:dspace.jpg` | `classpath:<image-name>.<image-type>` |

### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |


## CKAN

This service is directly integrated with [CKAN](https://ckan.org/).

### Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | Yes | - | `<keycloak-client-scope>` |
| `OPENCDMP_DOMAIN` | OpenCDMP URL string. | Yes | - | `http://<opencdmp-hostname>:<opencdmp-port>/` |

### CKAN Authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_CKAN_ACCESS_TOKEN` | CKAN access token for deposit. | Yes | - | `<ckan-access-token>` |

### CKAN API Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_CKAN_URL` | CKAN REST API URL | Yes | - | `https://<ckan-hostname>/api/3/action/` |
| `DEPOSIT_CKAN_RECORD_URL` | CKAN URL to get specific DOI. The url must contain the `{doi id}` element, which is handled internally by the OPENCDMP platform | Yes | - | `https://<ckan-hostname>/dataset/{doi_id}` |
| `DEPOSIT_CKAN_ORGANIZATION_ID` | The CKAN organization ID where the items will be stored. | Yes | - | `51715dd3-5590-49f2-b227-6a663c849921` |

### CKAN UI Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_CKAN_HAS_LOGO` | Boolean value to enable CKAN logo. | No | `true` | `true` |
| `DEPOSIT_CKAN_LOGO_PATH` | Image for CKAN logo. | No | `classpath:ckan.jpg` | `classpath:<image-name>.<image-type>` |

### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |


## Dataverse

This service is directly integrated with [Dataverse](https://dataverse.org/).

### Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | Yes | - | `<keycloak-client-scope>` |
| `OPENCDMP_DOMAIN` | OpenCDMP URL string. | Yes | - | `http://<opencdmp-hostname>:<opencdmp-port>/` |

### Dataverse Authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_DATAVERSE_ACCESS_TOKEN` | Dataverse access token for deposit. | Yes | - | `<dataverse-access-token>` |

### Dataverse API Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_DATAVERSE_HOST` | Default host name (previously called Alias). | Yes | - | `<dataverse-host>` |
| `DEPOSIT_DATAVERSE_URL` | Dataverse REST API URL | Yes | - | `https://<dataverse-hostname>/api/` |
| `DEPOSIT_DATAVERSE_RECORD_URL` | Dataverse URL to get specific DOI. The url must contain the `{doi id}` element, which is handled internally by the OPENCDMP platform | Yes | - | `https://<dataverse-hostname>/dataset.xhtml?persistentId={doi_id}` |

### Dataverse UI Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_DATAVERSE_HAS_LOGO` | Boolean value to enable Dataverse logo. | No | `true` | `true` |
| `DEPOSIT_DATAVERSE_LOGO_PATH` | Image for Dataverse logo. | No | `classpath:dataverse.jpg` | `classpath:<image-name>.<image-type>` |

### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |


## Fedora

This service is directly integrated with [Fedora](https://fedorarepository.org/).

### Authentication & Core Settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `IDP_ISSUER_URI` | Keycloak realm URL string. | Yes | - | `http://<keycloak-hostname>:<port>/realms/<realm-name>` |
| `IDP_CLAIMS_ROLES_PATH` | Keycloak client roles path. | Yes | - | `<keycloak_client>.roles` |
| `SECURITY_AUDIENCE` | Keycloak client scope that security is intended for. | Yes | - | `<keycloak-client-scope>` |
| `OPENCDMP_DOMAIN` | OpenCDMP URL string. | Yes | - | `http://<opencdmp-hostname>:<opencdmp-port>/` |

### Fedora Authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_FEDORA_USERNAME` | Fedora username. | Yes | - | `<fedora_username>` |
| `DEPOSIT_FEDORA_PASSWORD` | Fedora password. | Yes | - | `<fedora_password>` |

### Fedora API Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_FEDORA_URL` | Fedora REST API URL | No | `https://fedora.org/fcrepo/rest/` | `https://<fedora-hostname>/rest/` |
| `DEPOSIT_FEDORA_RECORD_URL` | Fedora URL to get specific DOI. The url must contain the `{doi id}` element, which is handled internally by the OPENCDMP platform | No | `https://fedora.org/fcrepo/rest/{doi_id}` | `https://<fedora-hostname>/{doi_id}` |

### Fedora UI Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_FEDORA_HAS_LOGO` | Boolean value to enable Fedora logo. | No | `true` | `true` |
| `DEPOSIT_FEDORA_LOGO_PATH` | Image for Fedora logo. | No | `classpath:fedora.png` | `classpath:<image-name>.<image-type>` |

### Logging Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_CONFIG_PATH` | Xml file that stores logging configuration. | No | `classpath:logging/logback.xml` | `classpath:logging/<file-name>.xml` |
| `LOGGING_DEFAULT_LOG_LEVEL` | Level of error to store. Only 4 values can be assigned: `INFO`, `DEBUG`, `WARN`, `ERROR` | No | - | `WARN` |
| `LOGGING_PATH` | File path to store logging. | No | - | `logs/` |

---

## See Also

- [Main Backend Configuration](/docs/getting-started/configuration/backend/index.md) - Core backend service configuration
- [Deposit Service Authentication](/docs/getting-started/configuration/backend/index.md#deposit-service-authentication) - Backend authentication setup for deposit services
- [Keycloak Configuration](/getting-started/configuration/keycloak/) - Authentication and authorization setup

---