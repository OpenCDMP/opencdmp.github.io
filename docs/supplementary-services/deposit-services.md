---
sidebar_position: 4
description: Discover everything about the deposit services
---

# Deposit Services

The `Deposit Services` are independent third party services responsible to provide a place to store and validate data objects *(in our case [plans](/docs/application/plans/index.md))*. They are used as a source of trust and provide a unique key / signature *(called **DOIs** or **D**ata **O**bject **I**dentifiers)* for every data entity deposited to them.

There is currently one deposit service implemented and integrated.
- **[Repository Deposit Zenodo](https://hub.docker.com/r/opencdmp/repository-deposit-zenodo)**: This service is directly integrated with [Zenodo](https://zenodo.org/).

:::note
You can create your own deposit source. More details [here](/docs/for-devs/plugins/deposit.md).
:::