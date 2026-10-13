---
sidebar_position: 0
description: Discover everything about the deposit services
---

# Deposit Services

The `Deposit Services` are independent third party services responsible to provide a place to store and validate data objects *(in our case [plans](/versioned_docs/version-1.x/using/plans/index.md))*. They are used as a source of trust and provide a unique key / signature *(called **DOIs** or **D**ata **O**bject **I**dentifiers)* for every data entity deposited to them.

These are the currently services implemented and integrated.

| Service | Supported Version(s) | Docker Image | Notes |
|---|---|---|---|
| [Zenodo](https://zenodo.org/) | InvenioRDM v12.0 | [repository-deposit-zenodo](https://hub.docker.com/r/opencdmp/repository-deposit-zenodo) | OAuth 2.0 or personal access token. See the [semantics reference](zenodo-semantics.md). |
| [DSpace](https://dspace.org/) | 8.x | [repository-deposit-dspace](https://hub.docker.com/r/opencdmp/repository-deposit-dspace) | Username/password authentication. See the [semantics reference](dspace-semantics.md). |
| [CKAN](https://ckan.org/) | 2.11.4 | [repository-deposit-ckan](https://hub.docker.com/r/opencdmp/repository-deposit-ckan) | Access token authentication. See the [semantics reference](ckan-semantics.md). |
| [Dataverse](https://dataverse.org/) | 6.9 | [repository-deposit-dataverse](https://hub.docker.com/r/opencdmp/repository-deposit-dataverse) | Access token authentication. See the [semantics reference](dataverse-semantics.md). |
| [Fedora](https://fedorarepository.org/) | 6.x | [repository-deposit-fedora](https://hub.docker.com/r/opencdmp/repository-deposit-fedora) | Username/password authentication. See the [semantics reference](fedora-semantics.md). |

:::note
You can create your own deposit source. More details [here](/versioned_docs/version-1.x/developers/plugins/deposit.md).
:::

## Plugin Semantics Reference

Every deposit plugin maps plan and description fields to target-repository metadata fields by matching each field's [semantic tag](/versioned_docs/version-1.x/administering/content-management/templates/semantics.md). The following pages document, for each plugin, which repository field is populated by which semantic:

- [Zenodo — semantics reference](zenodo-semantics.md)
- [DSpace — semantics reference](dspace-semantics.md)
- [CKAN — semantics reference](ckan-semantics.md)
- [Dataverse — semantics reference](dataverse-semantics.md)
- [Fedora — semantics reference](fedora-semantics.md)

---

## See Also

- [Deposit Service Configuration](/versioned_docs/version-1.x/deployment/configuration/backend/deposit.md) - Environment variable reference for deploying deposit services
