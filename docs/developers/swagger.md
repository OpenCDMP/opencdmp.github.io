---
sidebar_position: 3
title: Swagger UI
description: The interactive Swagger UI and OpenAPI document of the OpenCDMP API - where to find them, which endpoints they list, signing in, and the x-tenant header
---

# Swagger UI

:::note
Assets are called *descriptions* in the API, plugin contracts, and data model. For example, the
`/api/description/**` endpoints listed below operate on assets.
:::

:::info Swagger UI
For interactive API documentation, open the Swagger UI at `https://your-opencdmp-instance/api/swagger-ui/index.html`. The OpenAPI document itself is served at `/api/v3/api-docs`.
:::

The Swagger UI shows one API group, **Current**, with the following endpoints:

- **/api/plan/\*\***
- **/api/description/\*\***
- **/api/plan-blueprint/\*\***
- **/api/plan-blueprint-type/\*\***
- **/api/description-template/\*\***
- **/api/description-template-type/\*\***
- **/api/reference/\*\***
- **/api/reference-type/\*\***
- **/api/user/\*\***
- **/api/tenant/\*\***
- **/api/file-transformer/\*\***
- **/api/evaluator/\*\***
- **/api/deposit/\*\***
- **/api/entity-doi/\*\***
- **/api/plan-status/\*\***
- **/api/plan-workflow/\*\***
- **/api/description-status/\*\***
- **/api/description-workflow/\*\***
- **/api/tag/\*\***
- **/api/principal/\*\***
- **/api/lock/\*\***
- **/api/report/\*\***

Some endpoints of these paths are hidden from the Swagger UI because the webapp uses them internally. The [report](/docs/developers/reports.md) endpoints are in the Swagger UI under **Reports**. Other endpoints of the API, such as the [webhook](/docs/developers/webhooks.md) endpoints, are not part of the Swagger UI; their pages describe them.

---

## Enable or disable the Swagger UI

The Swagger UI and the OpenAPI document are enabled by default. Set `SWAGGER_ENABLED=false` in the API service configuration to turn both off. `SWAGGER_AUTH_CLIENT_ID`, `SWAGGER_AUTH_REDIRECT_URL`, and `SWAGGER_SERVER_URL` configure the sign-in of the Swagger UI; see [Swagger configuration](/docs/deployment/configuration/backend/index.md#swagger-configuration).

---

## Base URL

All API endpoints are relative to your OpenCDMP instance:

```text
https://your-opencdmp-instance/api
```

**Example**: `https://opencdmp.example.org/api`

---

## Authentication

The Swagger UI page itself is public. Most endpoints require an OAuth2 Bearer token: click **Authorize** and sign in with your account. Endpoints under `public` paths (for example `/api/plan/public/query`) answer without a token.

Authenticated endpoints also need the `x-tenant` header with the code of the organisation to work in; the Swagger UI shows it as a parameter of each operation. See [Addressing an organisation](/docs/developers/api-usage.md#addressing-an-organisation-x-tenant).

Listing endpoints (`.../query`) accept a `like` search term. A term in double quotes is matched exactly, `*` and `?` act as wildcards, and any other term is a contains-match. See [Search syntax](/docs/developers/api-usage.md#search-syntax).

### Request headers

```http
Authorization: Bearer {access_token}
x-tenant: {tenant_code}
```

**Example**:

```http
GET /api/plan/c0c163dc-2965-45a5-9608-f76030578609?f=id&f=label HTTP/1.1
Host: opencdmp.example.org
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
x-tenant: default
```
