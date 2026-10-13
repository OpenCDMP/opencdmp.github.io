---
sidebar_position: 2
description: Guide to using the OpenCDMP REST API programmatically
---

# API Usage Guide

OpenCDMP exposes a REST API that allows external applications, scripts, and integrations to interact with the platform programmatically — creating plans, reading descriptions, triggering exports, and more.

## Authentication

All API requests require a Bearer token obtained from Keycloak. See the [Integration Guide](/versioned_docs/version-1.x/developers/integration.md) for how to obtain a token using either the Authorization Code Flow (web applications) or the Client Credentials Flow (server-to-server).

Include the token in every request:

```http
Authorization: Bearer <your_access_token>
```

## Base URL

All API endpoints are relative to your OpenCDMP instance:

```text
https://<your-opencdmp-host>/api
```

## API Reference

The full interactive API reference is available via Swagger UI at:

```text
https://<your-opencdmp-host>/api/swagger-ui/index.html
```

See the [Swagger documentation](/versioned_docs/version-1.x/developers/swagger.md) for details.

---

## Common Operations

### List Plans

Retrieve a paginated list of plans accessible to the authenticated user.

```bash
curl -X POST \
  'https://<host>/api/plan/query' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "offset": 0,
    "pageSize": 10,
    "order": { "items": ["-updatedAt"] }
  }'
```

**Key request fields:**

| Field | Type | Description |
|-------|------|-------------|
| `offset` | integer | Number of records to skip (for pagination) |
| `pageSize` | integer | Number of records to return |
| `order.items` | string[] | Sort fields. Prefix with `-` for descending (e.g. `"-updatedAt"`) |
| `like` | string | Filter by plan title (partial match) |
| `statuses` | UUID[] | Filter by plan status IDs |
| `isActive` | integer[] | `[1]` for active, `[0]` for deleted |

**Response:**

```json
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "label": "My Research Data Management Plan",
      "status": { "id": "...", "name": "Draft" },
      "updatedAt": "2025-03-01T10:00:00Z"
    }
  ],
  "count": 42
}
```

---

### Get a Single Plan

Retrieve full details for a specific plan by ID.

```bash
curl -X GET \
  'https://<host>/api/plan/<plan-id>' \
  -H 'Authorization: Bearer <token>'
```

To control which fields are returned, append a `?f=` query parameter with comma-separated field paths. For example, to get only the label and descriptions:

```bash
curl -X GET \
  'https://<host>/api/plan/<plan-id>?f=id,label,descriptions' \
  -H 'Authorization: Bearer <token>'
```

---

### Create a Plan

Create a new plan using a blueprint.

```bash
curl -X POST \
  'https://<host>/api/plan/persist' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "label": "My New Plan",
    "blueprintId": "<blueprint-id>",
    "description": "A plan for managing research data.",
    "language": "en",
    "accessType": 1
  }'
```

**Key request fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | string | Yes | The plan title |
| `blueprintId` | UUID | Yes | The blueprint to use |
| `description` | string | No | Plan summary |
| `language` | string | No | Language code (e.g. `"en"`) |
| `accessType` | integer | No | `0` = Restricted, `1` = Public |

**Response:** Returns the full created plan object including its assigned `id`.

---

### List Descriptions for a Plan

```bash
curl -X POST \
  'https://<host>/api/description/query' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "planIds": ["<plan-id>"],
    "offset": 0,
    "pageSize": 20
  }'
```

---

### Create a Description

Create a description within a plan section.

```bash
curl -X POST \
  'https://<host>/api/description/persist' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "planId": "<plan-id>",
    "planSectionId": "<section-id>",
    "descriptionTemplateId": "<template-id>",
    "label": "Dataset A",
    "description": "Primary dataset for this study."
  }'
```

---

### Change Plan Status

Transition a plan to a different status.

```bash
curl -X POST \
  'https://<host>/api/plan/<plan-id>/status/<status-id>' \
  -H 'Authorization: Bearer <token>'
```

The `status-id` must be a valid plan status that is reachable from the plan's current status via the configured [Plan Workflow](/versioned_docs/version-1.x/administering/system-configuration/plan-workflow.md).

---

### Export a Plan

Trigger a file export for a plan. The `transformerId` and `format` values come from the registered file transformer's configuration.

```bash
curl -X GET \
  'https://<host>/api/plan/<plan-id>/export/<format>?transformerId=<transformer-id>' \
  -H 'Authorization: Bearer <token>' \
  --output plan-export.docx
```

---

### List Reference Types

```bash
curl -X POST \
  'https://<host>/api/reference-type/query' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "isActive": [1],
    "offset": 0,
    "pageSize": 50
  }'
```

---

## Pagination Pattern

All list endpoints follow the same pagination pattern:

```json
{
  "offset": 0,
  "pageSize": 10
}
```

The response always includes a `count` field with the total number of matching records. To fetch the next page, increment `offset` by `pageSize`:

```json
{ "offset": 10, "pageSize": 10 }
```

## Error Responses

| HTTP Status | Meaning |
|-------------|---------|
| `400` | Bad request — check request body for missing required fields |
| `401` | Unauthorized — token missing or expired |
| `403` | Forbidden — insufficient permissions for this operation |
| `404` | Not found — the requested resource does not exist |
| `409` | Conflict — e.g. attempting an invalid status transition |
| `500` | Internal server error — check server logs |

## Rate Limiting

The API does not enforce rate limiting by default. If you are running batch operations, implement a delay between requests to avoid overloading the server.

## See Also

- [Integration Guide](/versioned_docs/version-1.x/developers/integration.md) — How to obtain OAuth2 tokens
- [Swagger UI](/versioned_docs/version-1.x/developers/swagger.md) — Full interactive API reference
- [Plan Workflow](/versioned_docs/version-1.x/administering/system-configuration/plan-workflow.md) — Understanding status transitions
