---
sidebar_position: 2
title: API usage guide
description: Call the OpenCDMP REST API - tokens, the x-tenant header, field projection, lookups, common plan and asset operations, exports, search syntax, and errors
---

# API usage guide

OpenCDMP exposes a REST API that allows external applications, scripts, and integrations to interact with the platform programmatically: creating plans, reading assets (named *descriptions* in the API and data model), triggering exports, and more.

## Authentication

Every request outside the public endpoints needs a Bearer token issued by the Keycloak realm of the installation, with `api` in its audience. See the [Integration guide](/docs/developers/integration.md) for how to obtain one with the Authorization Code Flow (web applications) or the Client Credentials Flow (server-to-server).

Include the token in every request:

```http
Authorization: Bearer <your_access_token>
```

### Example: a token for a service account

With a confidential client that has a service account (see [Give a service account access to OpenCDMP](/docs/developers/integration.md#give-a-service-account-access-to-opencdmp)), request a token with the `api` scope. The scope adds the `api` audience, which the API service checks against its `SECURITY_AUDIENCE` setting:

```bash
TOKEN=$(curl -s -X POST \
  'https://<keycloak-host>/auth/realms/OpenCDMP/protocol/openid-connect/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials' \
  -d 'client_id=<your-client-id>' \
  -d 'client_secret=<your-client-secret>' \
  -d 'scope=api' | jq -r .access_token)
```

The `/auth` part of the URL comes from the Keycloak relative path that the [Docker example](/docs/deployment/install/index.md) sets (`KC_HTTP_RELATIVE_PATH=/auth`); leave it out if your Keycloak serves the realms at its root. The realm URL must match the `IDP_ISSUER_URI` of the API service.

## Base URL

All API endpoints are relative to your OpenCDMP instance:

```text
https://<your-opencdmp-host>/api
```

## Addressing an organisation (`x-tenant`) {#addressing-an-organisation-x-tenant}

OpenCDMP is multi-tenant: every plan, asset, blueprint, template, and setting belongs to an organisation (a *tenant* in the API). Each request names the organisation it works in with the `x-tenant` header:

```http
x-tenant: <tenant-code>
```

- **Value**: the organisation's code, as shown on the **Organisations** page and in the webapp addresses (`/t/<tenant-code>/...`). The organisation's id (UUID) is accepted as well.
- **Default organisation**: its code is `default`. Its content is shared: other organisations see it as shared content.
- **When it is required**: on every authenticated request, except `GET /api/principal/me` and `GET /api/principal/my-tenants`. Without it the API answers `403` with `{"code": 103, "error": "tenant scope not provided"}`. Callers with the `Admin` or `InstallationAdmin` role are not refused, but they should send the header as well, so that the request runs in the intended organisation.
- **Membership**: the caller must belong to the organisation. The API reads the memberships from the `tenant_roles` claim of the token (values such as `TenantUser:<tenant-code>`); a code that is not in it gets `403` with `{"code": 112, "error": "tenant not allowed"}`. On the first request to an organisation that the token lists, the API adds the caller to its members.
- **Public endpoints** (`/api/public/...`, `/api/plan/public/...`, `/api/description/public/...`, and the other `public` paths) need neither a token nor the header.

To list the organisations the caller belongs to:

```bash
curl 'https://<host>/api/principal/my-tenants?f=id&f=code&f=name' \
  -H "Authorization: Bearer $TOKEN"
```

:::note
If the token itself carries an `x-tenant` claim, that claim takes precedence over the header.
:::

## API reference

The full interactive API reference is available via Swagger UI at:

```text
https://<your-opencdmp-host>/api/swagger-ui/index.html
```

See the [Swagger documentation](/docs/developers/swagger.md) for details.

---

## Request conventions

### Field projection

The API returns only the fields you ask for. Queries list them in `project.fields`; single-item requests (`GET`) and `persist` calls take them as repeated `f` query parameters (`?f=id&f=label`). Nested fields use dots, for example `status.name` or `descriptions.label`. A request without a projection returns items without their fields.

### Lookups

Listing endpoints (`POST .../query`) take a lookup body:

```json
{
  "page": { "offset": 0, "size": 10 },
  "order": { "items": ["-updatedAt"] },
  "metadata": { "countAll": true },
  "project": { "fields": ["id", "label", "status.name", "updatedAt"] }
}
```

| Field | Description |
|-------|-------------|
| `page.offset` | Number of records to skip |
| `page.size` | Number of records to return |
| `order.items` | Sort fields. Prefix with `-` for descending (e.g. `"-updatedAt"`) |
| `metadata.countAll` | When `true`, `count` in the response is the total number of matching records. Otherwise it is the number of records in this page. |
| `project.fields` | The fields to return |

Each endpoint adds its own filters next to these (see the examples below and the Swagger UI). The response has the shape `{ "items": [...], "count": <number> }`. To fetch the next page, increase `page.offset` by `page.size`.

---

## Common operations

The examples assume that `TOKEN` holds an access token and use the organisation code `uporto`.

### List plans

```bash
curl -X POST 'https://<host>/api/plan/query' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'x-tenant: uporto' \
  -H 'Content-Type: application/json' \
  -d '{
    "page": { "offset": 0, "size": 10 },
    "order": { "items": ["-updatedAt"] },
    "metadata": { "countAll": true },
    "isActive": [1],
    "project": { "fields": ["id", "label", "status.id", "status.name", "updatedAt"] }
  }'
```

**Plan filters:**

| Field | Type | Description |
|-------|------|-------------|
| `like` | string | Filter by plan title. See [Search syntax](#search-syntax). |
| `ids` | UUID[] | Only these plans |
| `statusIds` | UUID[] | Only plans in these plan statuses |
| `isActive` | integer[] | `[1]` for active, `[0]` for deleted |
| `versionStatuses` | integer[] | `0` Current, `1` Previous, `2` NotFinalized |
| `accessTypes` | integer[] | `0` Public, `1` Restricted |
| `groupIds` | UUID[] | Only versions of these plans (all versions of a plan share a `groupId`) |

**Response:**

```json
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "label": "My Research Data Management Plan",
      "status": { "id": "f1a3da63-0bff-438f-8b46-1a81ca176115", "name": "Draft" },
      "updatedAt": "2026-03-01T10:00:00Z"
    }
  ],
  "count": 42
}
```

---

### Get a single plan

```bash
curl 'https://<host>/api/plan/<plan-id>?f=id&f=label&f=hash&f=status.name&f=descriptions.id&f=descriptions.label' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'x-tenant: uporto'
```

---

### Create a plan

```bash
curl -X POST 'https://<host>/api/plan/persist?f=id&f=label&f=hash' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'x-tenant: uporto' \
  -H 'Content-Type: application/json' \
  -d '{
    "label": "My New Plan",
    "blueprint": "<blueprint-id>",
    "description": "A plan for managing research data.",
    "language": "en",
    "accessType": 1,
    "properties": { "fieldSets": {} },
    "descriptionTemplates": [],
    "users": []
  }'
```

**Request fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | string | Yes | The plan title |
| `blueprint` | UUID | Yes | The id of a finalized blueprint |
| `properties` | object | Yes | The answers to the blueprint's fields, keyed by field set id. Send `{ "fieldSets": {} }` for none. |
| `description` | string | No¹ | Plan summary |
| `language` | string | No¹ | Language code (e.g. `"en"`) |
| `accessType` | integer | No¹ | `0` = Public, `1` = Restricted |
| `descriptionTemplates` | object[] | Conditional | The asset templates of each section, as `{ "sectionId": "<blueprint-section-id>", "descriptionTemplateGroupId": "<template-group-id>" }`. For sections whose templates plan owners cannot change, it must list exactly the blueprint's templates of that section; otherwise the API answers `400` with code `178`. |
| `users` | object[] | No | Collaborators, as `{ "user": "<user-id>", "role": <role>, "sectionId": null }`, or with `"email"` instead of `"user"` to invite someone by email. Roles: `0` Owner, `1` Viewer, `2` Editor, `3` Reviewer, `4` Data Steward, `5` Data Privacy Officer, `6` Ethics Reviewer. The caller is added as owner automatically. |
| `statusId` | UUID | Updates only | Ignored when creating: a new plan starts in the starting status of the organisation's plan workflow. Required when updating. |
| `id`, `hash` | UUID, string | Updates only | To update a plan, send its `id` and the `hash` read with it. A stale `hash` is refused. |

¹ Required before the plan can be finalized.

**Response:** the created plan, with the projected fields.

---

### List the assets of a plan

The asset lookup has no plan id filter of its own; filter on the plan through `planSubQuery`, which takes the plan filters listed above:

```bash
curl -X POST 'https://<host>/api/description/query' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'x-tenant: uporto' \
  -H 'Content-Type: application/json' \
  -d '{
    "page": { "offset": 0, "size": 20 },
    "isActive": [1],
    "planSubQuery": { "ids": ["<plan-id>"], "isActive": [1] },
    "project": { "fields": ["id", "label", "status.name", "descriptionTemplate.label", "plan.id"] }
  }'
```

---

### Create an asset

An asset belongs to one of the plan's section templates (`planDescriptionTemplateId`, read from the plan's `planDescriptionTemplates.id` field) and uses a version of that template (`descriptionTemplateId`):

```bash
curl -X POST 'https://<host>/api/description/persist?f=id&f=label&f=hash' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'x-tenant: uporto' \
  -H 'Content-Type: application/json' \
  -d '{
    "planId": "<plan-id>",
    "planDescriptionTemplateId": "<plan-description-template-id>",
    "descriptionTemplateId": "<template-id>",
    "label": "Dataset A",
    "description": "Primary dataset for this study.",
    "properties": { "fieldSets": {} },
    "tags": []
  }'
```

`properties` holds the answers to the template's questions and is required, as for a plan: send `{ "fieldSets": {} }` for none. When an update changes `statusId`, the [asset workflow](/docs/administering/system-configuration/workflows.md) must lead from the current status to the new one; otherwise the API answers `400` with code `210`.

---

### Change the status of a plan

```bash
curl -X POST 'https://<host>/api/plan/set-status/<plan-id>/<new-status-id>' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'x-tenant: uporto' \
  -H 'Content-Type: application/json' \
  -d '{ "descriptionIds": [] }'
```

The body is required. When the new status finalizes the plan, `descriptionIds` lists the assets to finalize with it. The new status must be reachable from the plan's current status in the organisation's [plan workflow](/docs/administering/system-configuration/workflows.md); request the plan's `availableStatuses` field to see which statuses are. Any other status is refused with `400` and code `210` (*The workflow does not allow this status change*). The response is `true`.

---

### Export a plan

List the export formats first. Each file transformer reports its id (`fileTransformerId`) and its formats (`exportVariants[].format`):

```bash
curl 'https://<host>/api/file-transformer/available' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'x-tenant: uporto'
```

Then request the export:

```bash
curl -X POST 'https://<host>/api/file-transformer/export-plan' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'x-tenant: uporto' \
  -H 'Content-Type: application/json' \
  -d '{ "id": "<plan-id>", "repositoryId": "docx-file-transformer", "format": "pdf" }' \
  --output plan-export.pdf
```

| Field | Description |
|-------|-------------|
| `id` | The plan id |
| `repositoryId` | The `fileTransformerId` of the transformer |
| `format` | One of the transformer's export formats, for example `docx` or `pdf` |
| `options` | Optional per-export options, as `{ "<code>": "<value>" }`, from the transformer's `userConfigurationFields` |

`POST /api/file-transformer/export-description` exports an asset with the same body.

---

### List reference types

```bash
curl -X POST 'https://<host>/api/reference-type/query' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'x-tenant: uporto' \
  -H 'Content-Type: application/json' \
  -d '{
    "page": { "offset": 0, "size": 50 },
    "isActive": [1],
    "project": { "fields": ["id", "name", "code"] }
  }'
```

---

## Search syntax

Every listing endpoint that accepts a `like` field (plans, assets, blueprints, templates, statuses, workflows, reference types, references, prefilling sources, languages, locks, tags, users, tenants, webhooks, and others) interprets the search term in the same way, whether the query runs against PostgreSQL or Elasticsearch:

| Term | Behavior | Example |
|------|----------|---------|
| Plain text | **Contains** match: the term may appear anywhere in the searched text | `"like": "climate"` matches *Climate data plan* and *Microclimate study* |
| Text wrapped in double quotes | **Exact** match of the whole value | `"like": "\"Climate data plan\""` matches only *Climate data plan* |
| Text containing `*` or `?` | **Wildcard** match: `*` stands for any sequence of characters and `?` for exactly one; no implicit contains-match is applied | `"like": "clim*"` matches values that start with *clim*; `"like": "plan 202?"` matches *plan 2025* and *plan 2026* |

Leading and trailing whitespace is trimmed, and characters that are special to the underlying search engine are escaped automatically. An empty or missing `like` matches everything.

## Error responses

Errors return a JSON body with an `error` message and, for known errors, a numeric `code`, for example `{"code": 103, "error": "tenant scope not provided"}`.

| HTTP status | Meaning |
|-------------|---------|
| `400` | Validation failed: a required field is missing, a value is invalid, or the `hash` of an update is stale. The `message` field lists the failing fields. |
| `401` | The token is missing, expired, or not issued for the `api` audience |
| `403` | The caller lacks a permission, or the `x-tenant` header is missing or names an organisation the caller does not belong to |
| `404` | The requested item does not exist or is not visible in this organisation |
| `500` | Server error, including some refused operations (for example editing a plan that another user has locked). Check the message and the server logs. |

## Rate limiting

The API does not enforce rate limiting by default. If you are running batch operations, implement a delay between requests to avoid overloading the server.

## See also

- [Integration guide](/docs/developers/integration.md): how to obtain OAuth2 tokens
- [Swagger UI](/docs/developers/swagger.md): full interactive API reference
- [Plan & asset workflows](/docs/administering/system-configuration/workflows.md): status transitions
