---
sidebar_position: 4
title: Webhooks
description: Receive signed HTTP callbacks when plans and assets change
---

# Webhooks

Webhooks push events from OpenCDMP to your system. Instead of polling the API for changes, you register an HTTPS endpoint and OpenCDMP sends a signed `POST` request every time a subscribed event occurs in the tenant.

Administrators create and manage webhooks in the admin UI, as described in the [Webhooks admin guide](/docs/administering/webhooks.md), or through the [API endpoints](#managing-webhooks-through-the-api) listed at the end of this page.

## The delivery request

Each delivery is an HTTP `POST` to the payload URL of the webhook with a JSON body and the following headers.

| Header | Value |
| --- | --- |
| `Content-Type` | `application/json` |
| `User-Agent` | `OpenCDMP-Webhook` |
| `X-OpenCDMP-Event` | The event type name, for example `PlanFinalized`. |
| `X-OpenCDMP-Delivery` | The delivery id (UUID). It is the same as `eventId` in the body and stays the same across retries of the same event. |
| `X-OpenCDMP-Timestamp` | Unix time in seconds at which this attempt was sent. It changes on every retry. |
| `X-OpenCDMP-Signature` | `sha256=` followed by the hex-encoded HMAC-SHA256 signature of the request (see [Verifying the signature](#verifying-the-signature)). |

The body is an envelope that is identical for every event type:

```json
{
  "eventId": "6f1d2c0e-8f2b-4a2e-9c3d-1b5a7e9f0c11",
  "eventType": "PlanFinalized",
  "tenantCode": "uporto",
  "timestamp": "2026-09-04T10:15:30.123456Z",
  "data": {
    "planId": "83e8b5d0-eb3f-4f87-945f-a5996b49d787",
    "label": "NAUTILUS Data Management Plan",
    "groupId": "0b7c9d1e-2f3a-4b5c-8d6e-7f8091a2b3c4",
    "version": 2,
    "statusId": "f1a3da63-0bff-438f-8b46-1a81ca176115",
    "statusName": "Finalized"
  }
}
```

| Field | Description |
| --- | --- |
| `eventId` | Unique id of the delivery. Use it to deduplicate, because retries resend the same body. |
| `eventType` | One of the [event types](#event-types). |
| `tenantCode` | Code of the tenant in which the event occurred. |
| `timestamp` | ISO-8601 time at which the event was recorded. It does not change on retries. |
| `data` | Event-specific fields, listed below. |

The body is generated once, when the event is recorded, and is resent unchanged on every retry. Only the `X-OpenCDMP-Timestamp` and `X-OpenCDMP-Signature` headers differ between attempts.

## Event types

| Event | Sent when | `data` fields |
| --- | --- | --- |
| `PlanFinalized` | A plan moves to a status whose internal status is `Finalized`. | `planId`, `label`, `groupId`, `version`, `statusId`, `statusName` |
| `PlanStatusChanged` | A plan moves between two statuses that are not `Finalized`. | `planId`, `label`, `groupId`, `version`, `statusId`, `statusName` |
| `PlanUnfinalized` | A finalized plan is reverted to a non-finalized status. | `planId`, `label`, `groupId`, `version`, `statusId`, `statusName` |
| `PlanDeposited` | A plan is deposited to a repository and receives a DOI. | `planId`, `label`, `repositoryId`, `doi` |
| `DescriptionFinalized` | An asset moves to a status whose internal status is `Finalized`. | `descriptionId`, `label`, `planId` |
| `Ping` | An administrator sends a test ping from the admin UI or the API. | `message` (always `"ping"`) |

`groupId` identifies the plan across its versions and `version` is the version number that changed. `statusId` and `statusName` describe the new status. The payload carries identifiers and labels only; fetch the full plan or asset through the REST API, authenticating as described in the [integration guide](/docs/developers/integration.md).

:::note

Assets are called *descriptions* in the API and data model, so the asset event is named `DescriptionFinalized` and its identifier is `descriptionId`.

:::

Example `PlanDeposited` payload:

```json
{
  "eventId": "2c9e4d7a-1b3f-4e5d-8a6c-0f1e2d3c4b5a",
  "eventType": "PlanDeposited",
  "tenantCode": "uporto",
  "timestamp": "2026-09-04T10:20:41.554321Z",
  "data": {
    "planId": "83e8b5d0-eb3f-4f87-945f-a5996b49d787",
    "label": "NAUTILUS Data Management Plan",
    "repositoryId": "zenodo",
    "doi": "10.5281/zenodo.21355973"
  }
}
```

Example `DescriptionFinalized` payload:

```json
{
  "eventId": "9a8b7c6d-5e4f-4a3b-9c2d-1e0f9a8b7c6d",
  "eventType": "DescriptionFinalized",
  "tenantCode": "uporto",
  "timestamp": "2026-09-04T10:22:03.000000Z",
  "data": {
    "descriptionId": "e103b530-1ab6-4322-ba89-6a41979cf230",
    "label": "Experimental and sensor data from dock trials",
    "planId": "83e8b5d0-eb3f-4f87-945f-a5996b49d787"
  }
}
```

## Verifying the signature

Every webhook has a signing secret that is shown once, when the webhook is created. Use it to verify that a delivery comes from OpenCDMP and was not altered in transit.

1. Read the raw request body as bytes. Do not re-serialize the parsed JSON, because any change in whitespace or key order invalidates the signature.
2. Build the signed string: the value of `X-OpenCDMP-Timestamp`, a dot, and the raw body: `<timestamp>.<body>`.
3. Compute HMAC-SHA256 over that string with the secret (UTF-8 bytes) as the key, and hex-encode the result in lowercase.
4. Compare it with the value of `X-OpenCDMP-Signature` after the `sha256=` prefix, using a constant-time comparison.
5. Reject deliveries whose timestamp is too far from your clock (for example, more than five minutes) to limit replay attacks. Retries carry a fresh timestamp and signature, so a legitimate retry always passes this check.

Node.js example:

```javascript
const crypto = require('crypto');

function verify(rawBody, headers, secret) {
  const timestamp = headers['x-opencdmp-timestamp'];
  const received = (headers['x-opencdmp-signature'] || '').replace(/^sha256=/, '');
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`, 'utf8')
    .digest('hex');
  const fresh = Math.abs(Date.now() / 1000 - Number(timestamp)) < 300;
  return fresh
    && received.length === expected.length
    && crypto.timingSafeEqual(Buffer.from(received, 'hex'), Buffer.from(expected, 'hex'));
}
```

Python example:

```python
import hmac, hashlib, time

def verify(raw_body: bytes, headers: dict, secret: str) -> bool:
    timestamp = headers["X-OpenCDMP-Timestamp"]
    received = headers["X-OpenCDMP-Signature"].removeprefix("sha256=")
    expected = hmac.new(
        secret.encode("utf-8"),
        timestamp.encode("utf-8") + b"." + raw_body,
        hashlib.sha256,
    ).hexdigest()
    fresh = abs(time.time() - int(timestamp)) < 300
    return fresh and hmac.compare_digest(received, expected)
```

## Responding to a delivery

- Answer with any `2xx` status within the delivery timeout (10 seconds by default) to acknowledge the event. The response body is ignored.
- Any other status code, a timeout, a connection error, or a redirect counts as a failure and is retried. OpenCDMP does not follow redirects, so the payload URL must be the final URL.
- Acknowledge first and process later. Queue the event in your system and return `2xx` immediately; do not do slow work while OpenCDMP waits.
- Deduplicate on `eventId`. A delivery that timed out on your side may have been processed already and will be retried.

## Retries

Deliveries are sent by a background task that runs every 30 seconds by default, so the first attempt usually arrives within half a minute of the event. After a failed attempt the delivery waits before the next one, doubling the delay each time:

| Attempt | Delay after the previous failure |
| --- | --- |
| 2 | 1 minute |
| 3 | 2 minutes |
| 4 | 4 minutes |
| 5 | 8 minutes |
| 6 | 16 minutes |
| 7 | 32 minutes |
| 8 | 64 minutes |

A random jitter of up to 20 percent is added to each delay, and delays never exceed 6 hours. With the default limit of 8 attempts a delivery is retried for a little over two hours in total. After the last failed attempt the delivery is marked `Failed` and is not retried automatically.

An administrator can queue a `Failed` delivery again from the delivery log. A manual redelivery makes one more attempt with the same payload and a fresh signature. If a webhook is disabled or deleted, its pending deliveries are marked `Failed`.

## Security considerations

- **Use HTTPS.** Plain `http://` URLs are accepted for testing, but the payload contains plan and asset labels and identifiers.
- **Private targets are refused by default.** Deliveries to URLs that resolve to loopback, link-local, or private network addresses fail immediately, as do URLs whose host name cannot be resolved. Installation administrators can disable this guard with `WEBHOOKS_DENY_PRIVATE_ADDRESSES` when the receiving system is on an internal network.
- **Secrets are shown once.** The secret is 32 random bytes, encoded as URL-safe Base64, and is returned only in the response of the call that creates the webhook. To rotate it, delete the webhook and create a new one.
- **Always verify the signature** and check the timestamp. Do not rely on the source IP address alone.

## Managing webhooks through the API

Webhooks are tenant-scoped resources: a webhook receives only the events of the tenant it was created in, and this holds for the default tenant too. Include the `x-tenant` header, as described in [Addressing an organisation](/docs/developers/api-usage.md#addressing-an-organisation-x-tenant). All endpoints require the **Admin** or **TenantAdmin** role, which hold the permissions listed below by default. The feature itself must be enabled with `WEBHOOKS_ENABLED=true` (it is off by default); while it is disabled the endpoints still manage subscriptions, but no events are recorded or delivered.

| Method | Endpoint | Description | Permission |
| --- | --- | --- | --- |
| `POST` | `/api/webhook-subscription/query` | List webhooks of the tenant using a lookup body. | `BrowseWebhookSubscription` |
| `GET` | `/api/webhook-subscription/{id}` | Get one webhook. | `BrowseWebhookSubscription` |
| `GET` | `/api/webhook-subscription/event-types` | List the available event type codes. | `BrowseWebhookSubscription` |
| `POST` | `/api/webhook-subscription/persist` | Create or update a webhook. | `EditWebhookSubscription` |
| `DELETE` | `/api/webhook-subscription/{id}` | Delete a webhook. | `DeleteWebhookSubscription` |
| `POST` | `/api/webhook-subscription/{id}/ping` | Queue a `Ping` delivery. | `EditWebhookSubscription` |
| `POST` | `/api/webhook-subscription/delivery/query` | List deliveries using a lookup body. | `BrowseWebhookSubscription` |
| `POST` | `/api/webhook-subscription/delivery/{id}/redeliver` | Queue a delivery again. | `EditWebhookSubscription` |

In API requests and responses, event types and delivery statuses are numeric codes. The delivery payload and the `X-OpenCDMP-Event` header use the names.

| Event type | Code |
| --- | --- |
| `PlanFinalized` | `0` |
| `PlanStatusChanged` | `1` |
| `PlanUnfinalized` | `2` |
| `PlanDeposited` | `3` |
| `DescriptionFinalized` | `4` |
| `Ping` | `100` |

| Delivery status | Code |
| --- | --- |
| `Pending` | `0` |
| `Delivered` | `1` |
| `Failed` | `2` |

Example request to create a webhook:

```json
POST /api/webhook-subscription/persist?f=id&f=label&f=secret
{
  "label": "CRIS synchronisation",
  "url": "https://cris.example.org/hooks/opencdmp",
  "eventTypes": [0, 3, 4],
  "enabled": true
}
```

The response includes the `secret` field only for this creating call. To update a webhook, send the same body with the `id` and the current `hash` of the webhook, as for every other entity in the API.

## See also

- [Webhooks admin guide](/docs/administering/webhooks.md) - Creating webhooks, test pings, and the delivery log
- [Webhooks configuration](/docs/deployment/configuration/backend/index.md#webhooks-configuration) - Environment variables and defaults of the API service
- [Integrating with OpenCDMP](/docs/developers/integration.md) - Authenticating API calls
- [Audit events](/docs/developers/audit-events.md) - Audit events recorded for webhook management
