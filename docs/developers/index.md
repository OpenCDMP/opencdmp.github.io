---
title: API & Integration
description: Integrate with the OpenCDMP REST API, receive webhooks, read reports and audit events, and build file transformer, deposit, and evaluator plugins
---

# API & Integration

This section is for developers who integrate other systems with OpenCDMP or extend it with plugins.

## Quick start

New to the OpenCDMP API? Start here:

1. **[Integrating with OpenCDMP](/docs/developers/integration.md)**: get a token from Keycloak for a user or a service account
2. **[Swagger UI](/docs/developers/swagger.md)**: try every endpoint interactively
3. **[API usage](/docs/developers/api-usage.md)**: request conventions, lookups, paging, the `x-tenant` header, and common operations

The Keycloak side of a service account is in [Create an integration client](/docs/deployment/configuration/keycloak.md#integration-client).

## More endpoints and events

- **[Reports](/docs/developers/reports.md)**: aggregate the answers stored in plans and assets
- **[Webhooks](/docs/developers/webhooks.md)**: signed HTTP callbacks for plan and asset events, with payload format, signature verification, and retries

## Logging and auditing

- **[Logging and auditing](/docs/developers/logging-and-auditing.md)**: logging conventions for code in the services
- **[Audit events](/docs/developers/audit-events.md)**: every audit event and its id
- **[Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md)**: where the logs are and how to read them, for operators

## Plugin development

Build file transformers, deposit services, and evaluators. To run one against a local installation, see [Run and test a plugin locally](/docs/developers/plugins/run-locally.md).

import DocCardList from '@theme/DocCardList';

<DocCardList />
