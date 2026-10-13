---
sidebar_position: 4
title: Deposit services
description: Environment variables of the Zenodo, DSpace, CKAN, Dataverse, and Fedora deposit services
---

# Deposit services

These are the settings of the five shipped [deposit services](/docs/optional-services/deposit-services/index.md). Every deposit service also reads the [settings common to all plugin services](/docs/deployment/configuration/plugin-services.md#settings-common-to-all-plugin-services): `IDP_ISSUER_URI`, `IDP_CLAIMS_ROLES_PATH`, and `SECURITY_AUDIENCE` for authentication, `PROFILE`, the logging settings, and `STORAGE_PATH`. To make a deposit service available, register it in the API service with a PDF and an RDA JSON transformer; see [Registering plugin services](/docs/deployment/configuration/plugin-services.md).

:::info Installation values are fallbacks
The credentials and record defaults configured here belong to the installation. Each organisation can set its own in the repository's settings (**Settings > Plugins** > the repository > **Configure**; see [Plugins: repositories](/docs/administering/tenant-management/plugins.md#repositories)), and the values here apply only where the organisation sets none:

- **Credentials**: a deposit under the organisation's account uses the organisation's **Access token** (or **Username** and **Password**) when set, and otherwise the installation's access token, username, or password below. A deposit under a user's own account uses only the user's credentials and never falls back to the organisation's or the installation's.
- **Record defaults**, such as the Zenodo community, the DSpace collection, or the Dataverse collection: the organisation's value when set, and otherwise the value below. A value set in a blueprint or asset template through a semantic still takes precedence over both.

See [Publishing accounts and files](/docs/optional-services/deposit-services/index.md#publishing-accounts-and-files) for how users choose the account.
:::

Every deposit service also needs the address of the installation:

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `OPENCDMP_DOMAIN` | Address of the OpenCDMP installation, with a trailing slash. The deposited record links back to the plan's public page under it (`<OPENCDMP_DOMAIN>explore-plans/overview/public/<plan-id>`). | Yes | - | `https://opencdmp.example.org/` |

## Zenodo

This service publishes to [Zenodo](https://zenodo.org/) or another InvenioRDM instance. Image `opencdmp/repository-deposit-zenodo` on Docker Hub, plugin id `zenodo`.

The Zenodo deposit service supports three ways to authenticate:

1. **Installation access token**: a personal access token created on Zenodo, set in `DEPOSIT_ZENODO_ACCESS_TOKEN`. It is used for deposits under the organisation's account in every organisation that sets no **Access token** of its own.
2. **OAuth 2.0, per user**: each user signs in to Zenodo. This needs a developer application on Zenodo and `DEPOSIT_ZENODO_CLIENT_ID`, `DEPOSIT_ZENODO_CLIENT_SECRET`, and `DEPOSIT_ZENODO_REDIRECT_URL`.
3. **User profile settings**: users store their personal Zenodo access token in their [OpenCDMP profile settings](/docs/using/profile-settings.md#repository-accounts), or type it in the publish dialog. The token is read at deposit time and stays valid until the user changes it.

See the [Zenodo authentication documentation](https://developers.zenodo.org/#authentication) for details.

### Zenodo API

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_ZENODO_URL` | [Zenodo REST API](https://developers.zenodo.org/#rest-api) URL. | No | `https://zenodo.org/api/` | `https://sandbox.zenodo.org/api/` |
| `DEPOSIT_ZENODO_RECORD_URL` | Address of a deposited record. `{doi_id}` is replaced with the identifier. | No | `https://zenodo.org/doi/{doi_id}` | `https://sandbox.zenodo.org/doi/{doi_id}` |
| `DEPOSIT_ZENODO_ACCESS_TOKEN` | Access token of the installation's Zenodo account. Used for deposits under the organisation's account when the organisation sets no **Access token**. | Yes¹ | - | `<zenodo-access-token>` |

¹ Required unless every organisation sets its own token or only OAuth 2.0 is used.

### Zenodo OAuth 2.0

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_ZENODO_REDIRECT_URL` | Address that Zenodo redirects users back to after they sign in. The webapp route is spelled `code-callaback`; use it exactly as shown. | Yes² | - | `https://opencdmp.example.org/deposit/oauth2/code-callaback` |
| `DEPOSIT_ZENODO_AUTHORIZATION_URL` | Zenodo authorization endpoint. | No | `https://zenodo.org/oauth/authorize` | `https://sandbox.zenodo.org/oauth/authorize` |
| `DEPOSIT_ZENODO_ACCESS_TOKEN_URL` | Zenodo token endpoint. | No | `https://zenodo.org/oauth/token` | `https://sandbox.zenodo.org/oauth/token` |
| `DEPOSIT_ZENODO_CLIENT_ID` | Client id of the developer application on Zenodo. | Yes² | - | `<zenodo-client-id>` |
| `DEPOSIT_ZENODO_CLIENT_SECRET` | Client secret of that application. | Yes² | - | `<zenodo-client-secret>` |

² Required only for OAuth 2.0.

### Zenodo record defaults

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_ZENODO_COMMUNITY_ID` | Zenodo community that records are submitted to. Used when the organisation sets no **Community**. | No | - | `<community-id>` |
| `DEPOSIT_ZENODO_RESOURCE_TYPE_ID` | Resource type of a deposited plan. Used when the organisation sets no **Resource type**. | No | `publication-datamanagementplan` | `publication-datamanagementplan` |
| `DEPOSIT_ZENODO_PUBLISHER_NAME` | Publisher of the record. Used when the organisation sets no **Publisher**. | No | `Zenodo` | `My University` |
| `DEPOSIT_ZENODO_AFFILIATION` | Affiliation of the record's creators. Used when the organisation sets no **Affiliation**. | No | - | `OpenCDMP` |
| `DEPOSIT_ZENODO_SUPPORTS_PREVIEW` | Let users review and edit the metadata before depositing. See [Deposit preview and metadata review](/docs/developers/plugins/deposit-preview.md). | No | `true` | `true` |

### Zenodo plugin settings

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_ZENODO_USE_SHARED_STORAGE` | See [Shared storage](/docs/deployment/configuration/plugin-services.md#shared-storage). | No | `false` | `true` |
| `DEPOSIT_ZENODO_HAS_LOGO` | Show the Zenodo logo. | No | `true` | `true` |
| `DEPOSIT_ZENODO_LOGO_PATH` | Image of the logo. | No | `classpath:zenodo.jpg` | `file:/config/zenodo.png` |
| `DEPOSIT_ZENODO_ORGANIZATIONS_CODE` | Code of the reference type of organisations. | No | `organisations` | `organisations` |
| `DEPOSIT_ZENODO_GRANTS_CODE` | Code of the reference type of grants. | No | `grants` | `grants` |
| `DEPOSIT_ZENODO_FUNDERS_CODE` | Code of the reference type of funders. | No | `funders` | `funders` |
| `DEPOSIT_ZENODO_RESEARCHERS_CODE` | Code of the reference type of researchers. | No | `researchers` | `researchers` |
| `DEPOSIT_ZENODO_LICENCES_CODE` | Code of the reference type of licences. | No | `licenses` | `licenses` |
| `DEPOSIT_ZENODO_PROJECTS_CODE` | Code of the reference type of projects. | No | `projects` | `projects` |
| `DEPOSIT_ZENODO_DATASETS_CODE` | Code of the reference type of datasets. | No | `datasets` | `datasets` |
| `DEPOSIT_ZENODO_PUBLICATIONS_CODE` | Code of the reference type of publications. | No | `publications` | `publications` |

The `*_CODE` variables are described in [Reference type codes](/docs/deployment/configuration/plugin-services.md#reference-type-codes).

## DSpace

This service publishes to [DSpace](https://dspace.org/). Image `opencdmp/repository-deposit-dspace` on Docker Hub, plugin id `dspace`.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_DSPACE_URL` | DSpace REST API URL. | No | `https://dspace.org/server/api/` | `https://dspace.example.org/server/api/` |
| `DEPOSIT_DSPACE_RECORD_URL` | Address of a deposited item. `{doi_id}` is replaced with the identifier. | No | `https://dspace.org/handle/{doi_id}` | `https://dspace.example.org/handle/{doi_id}` |
| `DEPOSIT_DSPACE_USERNAME` | Username of the installation's DSpace account. Used for deposits under the organisation's account when the organisation sets no **Username** and **Password**. | Yes | - | `opencdmp@example.org` |
| `DEPOSIT_DSPACE_PASSWORD` | Password of that account. | Yes | - | `<dspace-password>` |
| `DEPOSIT_DSPACE_COLLECTION_ID` | DSpace collection that items are stored in. Used when the organisation sets no **Collection**. | Yes | - | `51715dd3-5590-49f2-b227-6a663c849921` |
| `DEPOSIT_DSPACE_TYPE` | Type of the deposited items (see the [DSpace REST documentation](https://github.com/DSpace/RestContract/?tab=readme-ov-file#rest-endpoints)). Used when the organisation sets no **Default item type**. | No | `Dataset` | `Dataset` |
| `DEPOSIT_DSPACE_SUPPORTS_PREVIEW` | Let users review and edit the metadata before depositing. See [Deposit preview and metadata review](/docs/developers/plugins/deposit-preview.md). | No | `true` | `true` |
| `DEPOSIT_DSPACE_USE_SHARED_STORAGE` | See [Shared storage](/docs/deployment/configuration/plugin-services.md#shared-storage). | No | `false` | `true` |
| `DEPOSIT_DSPACE_HAS_LOGO` | Show the DSpace logo. | No | `true` | `true` |
| `DEPOSIT_DSPACE_LOGO_PATH` | Image of the logo. | No | `classpath:dspace.png` | `file:/config/dspace.png` |

## CKAN

This service publishes to [CKAN](https://ckan.org/). Image `opencdmp/repository-deposit-ckan` on Docker Hub, plugin id `ckan`.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_CKAN_URL` | CKAN action API URL. | Yes | - | `https://ckan.example.org/api/3/action/` |
| `DEPOSIT_CKAN_RECORD_URL` | Address of a deposited dataset. `{doi_id}` is replaced with the identifier. | Yes | - | `https://ckan.example.org/dataset/{doi_id}` |
| `DEPOSIT_CKAN_ACCESS_TOKEN` | API token of the installation's CKAN account. Used for deposits under the organisation's account when the organisation sets no **Access token**. | Yes | - | `<ckan-access-token>` |
| `DEPOSIT_CKAN_ORGANIZATION_ID` | CKAN organization that datasets are stored in. Used when the organisation sets no **Organisation** in the CKAN record settings. | Yes | - | `51715dd3-5590-49f2-b227-6a663c849921` |
| `DEPOSIT_CKAN_SUPPORTS_PREVIEW` | Let users review and edit the metadata before depositing. See [Deposit preview and metadata review](/docs/developers/plugins/deposit-preview.md). | No | `true` | `true` |
| `DEPOSIT_CKAN_USE_SHARED_STORAGE` | See [Shared storage](/docs/deployment/configuration/plugin-services.md#shared-storage). | No | `false` | `true` |
| `DEPOSIT_CKAN_HAS_LOGO` | Show the CKAN logo. | No | `true` | `true` |
| `DEPOSIT_CKAN_LOGO_PATH` | Image of the logo. | No | `classpath:ckan.png` | `file:/config/ckan.png` |
| `DEPOSIT_CKAN_LICENCES_CODE` | Code of the reference type of licences. | No | `licenses` | `licenses` |
| `DEPOSIT_CKAN_ORGANIZATIONS_CODE` | Code of the reference type of organisations. | No | `organisations` | `organisations` |

## Dataverse

This service publishes to [Dataverse](https://dataverse.org/). Image `opencdmp/repository-deposit-dataverse` on Docker Hub, plugin id `dataverse`.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_DATAVERSE_URL` | Dataverse REST API URL. | Yes | - | `https://dataverse.example.org/api/` |
| `DEPOSIT_DATAVERSE_RECORD_URL` | Address of a deposited dataset. `{doi_id}` is replaced with the identifier. | Yes | - | `https://dataverse.example.org/dataset.xhtml?persistentId={doi_id}` |
| `DEPOSIT_DATAVERSE_ACCESS_TOKEN` | API token of the installation's Dataverse account. Used for deposits under the organisation's account when the organisation sets no **Access token**. | Yes | - | `<dataverse-access-token>` |
| `DEPOSIT_DATAVERSE_HOST` | Alias of the Dataverse collection that datasets are created in. Used when the organisation sets no **Dataverse collection**. | Yes | - | `opencdmp-plans` |
| `DEPOSIT_DATAVERSE_DEFAULT_SUBJECT` | Subject of the dataset. Used when the organisation sets no **Default subject**. | No | - | `Other` |
| `DEPOSIT_DATAVERSE_SPECIFIED_METADATA_LANGUAGE` | Metadata language, for Dataverse installations that require one. Used when the organisation sets no **Metadata language**. | No | - | `en` |
| `DEPOSIT_DATAVERSE_SUPPORTS_PREVIEW` | Let users review and edit the metadata before depositing. See [Deposit preview and metadata review](/docs/developers/plugins/deposit-preview.md). | No | `true` | `true` |
| `DEPOSIT_DATAVERSE_USE_SHARED_STORAGE` | See [Shared storage](/docs/deployment/configuration/plugin-services.md#shared-storage). | No | `false` | `true` |
| `DEPOSIT_DATAVERSE_HAS_LOGO` | Show the Dataverse logo. | No | `true` | `true` |
| `DEPOSIT_DATAVERSE_LOGO_PATH` | Image of the logo. | No | `classpath:dataverse.png` | `file:/config/dataverse.png` |
| `DEPOSIT_DATAVERSE_LICENCES_CODE` | Code of the reference type of licences. | No | `licenses` | `licenses` |
| `DEPOSIT_DATAVERSE_ORGANIZATIONS_CODE` | Code of the reference type of organisations. | No | `organisations` | `organisations` |
| `DEPOSIT_DATAVERSE_FUNDERS_CODE` | Code of the reference type of funders. | No | `funders` | `funders` |
| `DEPOSIT_DATAVERSE_GRANTS_CODE` | Code of the reference type of grants. | No | `grants` | `grants` |
| `DEPOSIT_DATAVERSE_RESEARCHERS_CODE` | Code of the reference type of researchers. | No | `researchers` | `researchers` |

## Fedora

This service publishes to a [Fedora](https://fedorarepository.org/) repository. Image `opencdmp/repository-deposit-fedora` on Docker Hub, plugin id `fedora`.

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `DEPOSIT_FEDORA_URL` | Fedora REST API URL. | Yes | - | `https://fedora.example.org/fcrepo/rest/` |
| `DEPOSIT_FEDORA_RECORD_URL` | Address of a deposited record. `{doi_id}` is replaced with the identifier. | Yes | - | `https://fedora.example.org/fcrepo/rest/{doi_id}` |
| `DEPOSIT_FEDORA_USERNAME` | Username of the installation's Fedora account. Used for deposits under the organisation's account when the organisation sets no **Username** and **Password**. | Yes | - | `opencdmp` |
| `DEPOSIT_FEDORA_PASSWORD` | Password of that account. | Yes | - | `<fedora-password>` |
| `DEPOSIT_FEDORA_COLLECTION_ID` | Container, under the repository URL, that new records are created in, such as `plans/opencdmp`. It must already exist. Used when the organisation sets no **Container**; when both are empty, records are created at the repository root. | No | - | `plans/opencdmp` |
| `DEPOSIT_FEDORA_SUPPORTS_PREVIEW` | Let users review and edit the metadata before depositing. See [Deposit preview and metadata review](/docs/developers/plugins/deposit-preview.md). | No | `true` | `true` |
| `DEPOSIT_FEDORA_USE_SHARED_STORAGE` | See [Shared storage](/docs/deployment/configuration/plugin-services.md#shared-storage). | No | `false` | `true` |
| `DEPOSIT_FEDORA_HAS_LOGO` | Show the Fedora logo. | No | `true` | `true` |
| `DEPOSIT_FEDORA_LOGO_PATH` | Image of the logo. | No | `classpath:fedora.png` | `file:/config/fedora.png` |

---

## See also

- [Registering plugin services](/docs/deployment/configuration/plugin-services.md) - Run, register, and test a deposit service, and the settings every plugin shares
- [Backend configuration: deposit service authentication](/docs/deployment/configuration/backend/index.md#deposit-service-authentication) - The client the API service signs in with
- [Deposit services](/docs/optional-services/deposit-services/index.md) - Supported repository versions and the semantics of each service
- [Keycloak setup](/docs/deployment/configuration/keycloak.md) - The `plugins` client scope
