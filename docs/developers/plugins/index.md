---
title: Plugins
description: Build file transformer, deposit, and evaluator plugins for OpenCDMP - the plugin types, how the platform calls them, and how to register and test them
---

import DocCardList from '@theme/DocCardList';

# Plugins

OpenCDMP is built around a **plugin architecture** that lets you extend the platform with your own services for file export and import, repository deposit, and plan evaluation. Each plugin is an independent **Spring Boot microservice** that OpenCDMP calls over HTTP; once registered, it is available to users through the standard user interface.

:::note
Assets are called *descriptions* in the API, plugin contracts, and data model.
:::

## Plugin types

| Plugin type | Purpose | Base package |
|---|---|---|
| **File transformer** | Export plans and assets to custom file formats, or import from them | `org.opencdmp:file-transformer-base` |
| **Deposit service** | Deposit plans to external repositories and receive DOIs | `org.opencdmp:repository-deposit-base` |
| **Evaluator** | Assess plans and assets against standards or criteria | `org.opencdmp:evaluator-base` |

## How plugins work

All plugin types follow the same pattern:

1. **Implement a client interface**, which contains your business logic (`FileTransformerClient`, `DepositClient`, `EvaluatorClient`).
2. **Implement a controller interface**, which exposes the REST endpoints the platform calls (`FileTransformerController`, `DepositController`, `EvaluatorController`) under `/api/file-transformer`, `/api/deposit`, or `/api/evaluator`.
3. **Expose a configuration endpoint**, which the platform calls to discover the plugin's id and capabilities (supported formats, benchmarks, authentication methods, and so on): `GET /api/file-transformer/formats`, `GET /api/deposit/configuration`, or `GET /api/evaluator/config`.
4. **Secure the endpoints**: accept only tokens from the installation's Keycloak realm with the `plugins` audience (`IDP_ISSUER_URI`, `SECURITY_AUDIENCE=plugins`, `IDP_CLAIMS_ROLES_PATH=plugins.roles`).
5. **Test it locally** against a local installation; see [Run and test a plugin locally](/docs/developers/plugins/run-locally.md).
6. **Register it with OpenCDMP**, for the whole installation in the API service configuration (`file-transformer.sources`, `deposit.sources`, or `evaluator.sources`), or for one organisation with **Add plugin** under **Settings > Plugins**. See [Registering plugin services](/docs/deployment/configuration/plugin-services.md). The platform then makes the plugin available to users.

## Shared data models

All plugins communicate with OpenCDMP using the **Common Models** package (`org.opencdmp:common-models`), which defines the data structures for plans, assets, and files. See [Common Models](/docs/developers/plugins/common-models.md) for the full reference.

## Plugin documentation

<DocCardList />
