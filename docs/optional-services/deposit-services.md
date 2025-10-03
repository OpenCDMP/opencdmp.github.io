---
sidebar_position: 4
description: Discover everything about the deposit services
---

# Deposit Services

The `Deposit Services` are independent third party services responsible to provide a place to store and validate data objects *(in our case [plans](user-guide/plans/index.md))*. They are used as a source of trust and provide a unique key / signature *(called **DOIs** or **D**ata **O**bject **I**dentifiers)* for every data entity deposited to them.

These are the currently services implemented and integrated.
- **[Repository Deposit Zenodo](https://hub.docker.com/r/opencdmp/repository-deposit-zenodo)**: This service is directly integrated with [Zenodo](https://zenodo.org/).

- **[Repository Deposit Dspace](https://hub.docker.com/r/opencdmp/repository-deposit-dspace)**: This service is directly integrated with [Dspace](https://dspace.org/).

- **[Repository Deposit Ckan](https://hub.docker.com/r/opencdmp/repository-deposit-ckan)**: This service is directly integrated with [Ckan](https://ckan.org/).

- **[Repository Deposit Dataverse](https://hub.docker.com/r/opencdmp/repository-deposit-dataverse)**: This service is directly integrated with [Dataverse](https://dataverse.org/).

- **[Repository Deposit Fedora](https://hub.docker.com/r/opencdmp/repository-deposit-fedora)**: This service is directly integrated with [Fedora](https://fedorarepository.org/).

:::note
You can create your own deposit source. More details [here](developers/plugins/deposit.md).
:::