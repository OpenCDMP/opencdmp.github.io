import DocCardList from '@theme/DocCardList';

# Plugins

OpenCDMP is built around a **plugin architecture** that allows you to extend the platform with custom services for file export/import, repository deposit, and plan evaluation. Each plugin is an independent **Spring Boot microservice** that registers with OpenCDMP and is then available to users through the standard UI.

## Plugin Types

There are three plugin types:

| Plugin Type | Purpose | Base Package |
|---|---|---|
| **File Transformer** | Export plans/descriptions to custom file formats, or import from them | `org.opencdmp:file-transformer-base` |
| **Deposit Service** | Deposit plans to external repositories and receive DOIs | `org.opencdmp:repository-deposit-base` |
| **Evaluator** | Assess plans and descriptions against standards or criteria | `org.opencdmp:evaluator-base` |

## How Plugins Work

All plugin types follow the same pattern:

1. **Implement a client interface** — contains your business logic (`FileTransformerClient`, `DepositClient`, `EvaluatorClient`).
2. **Implement a controller interface** — exposes REST endpoints the platform calls (`FileTransformerController`, `DepositController`, `EvaluatorController`).
3. **Expose a configuration endpoint** — the platform calls this at registration time to discover the plugin's capabilities (supported formats, benchmarks, auth methods, etc.).
4. **Register with OpenCDMP** — add the running service URL in [Tenant Configuration](/versioned_docs/version-1.x/administering/tenant-management/tenant-configuration.md). The platform then makes the plugin available to users.

## Shared Data Models

All plugins communicate with OpenCDMP using the **Common Models** package (`org.opencdmp:common-models`), which defines the data structures for plans, descriptions, and files. See [Common Models](/versioned_docs/version-1.x/developers/plugins/common-models.md) for the full reference.

## Plugin Documentation

<DocCardList />
