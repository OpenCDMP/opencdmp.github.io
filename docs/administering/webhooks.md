---
sidebar_position: 4
description: Notify external systems with signed HTTP callbacks when plans and assets change
---

# Webhooks

Webhooks let an external system react to what happens in OpenCDMP without polling the API. When a subscribed event occurs, for example a plan is finalized or deposited, OpenCDMP sends a signed HTTP `POST` request with a JSON payload to the URL you configure.

Typical receivers are CRIS systems, institutional repositories, reporting pipelines, and chat or ticketing tools.

:::info Installation setting

Webhooks are enabled by default. An installation administrator can switch them off with `WEBHOOKS_ENABLED=false` in the backend configuration (see [Webhooks Configuration](/docs/deployment/configuration/backend/index.md#webhooks-configuration)). While the feature is switched off, this page still allows you to manage subscriptions, but no events are recorded or delivered.

:::

## How webhooks work

- A **webhook** is a subscription with a label, a payload URL, the set of events it listens to, and an enabled flag.
- Webhooks belong to the organisation in which they are created, and a webhook receives only the events of that organisation. This holds for the default organisation too: its webhooks are listed under **Shared by default organisation** in other organisations, but they receive only the default organisation's own events. To notify a system about several organisations, create a webhook in each.
- Every event that matches an enabled webhook is recorded as a **delivery**. A background task sends deliveries, retries failed ones with increasing delays, and marks a delivery as `Failed` after the maximum number of attempts. You can queue a failed delivery again from the delivery log.
- Each webhook has a **signing secret**. OpenCDMP signs every delivery with it, so the receiving system can verify that the request is genuine. The secret is generated when you create the webhook and is shown exactly once.

For the request format, the signature algorithm, and the exact retry schedule, see the [developer guide](/docs/developers/webhooks.md).

## Events

| Event | Shown in the UI as | Sent when | Payload data |
| --- | --- | --- | --- |
| `PlanFinalized` | Plan finalised | A plan moves to a status whose internal status is `Finalized`. | `planId`, `label`, `groupId`, `version`, `statusId`, `statusName` |
| `PlanStatusChanged` | Plan status changed | A plan moves between two statuses that are not `Finalized`. | `planId`, `label`, `groupId`, `version`, `statusId`, `statusName` |
| `PlanUnfinalized` | Plan reverted to draft | A finalized plan is reverted to a non-finalized status. | `planId`, `label`, `groupId`, `version`, `statusId`, `statusName` |
| `PlanDeposited` | Plan deposited | A plan is deposited to a repository and receives a DOI. | `planId`, `label`, `repositoryId`, `doi` |
| `DescriptionFinalized` | Asset finalised | An asset moves to a status whose internal status is `Finalized`. | `descriptionId` (the asset id), `label`, `planId` |
| `Ping` | Ping | An administrator uses **Send test ping**. | `message` |

## Managing webhooks

The listing shows every webhook of the current organisation with its **Label**, **URL**, **Events**, **Enabled** flag, and **Updated** timestamp. Use the **Display settings** button at the top right corner of the listing to choose which columns are visible; the **Created** timestamp is hidden by default.

This listing is organisation-scoped: it opens on the **Owned by [organisation name]** tab, showing only the current organisation's own webhooks, with **Shared by default organisation** and **All** tabs available. It also supports the other standard [admin listing](/docs/administering/admin-listings.md) controls: search, filter chips, Show deleted, column picker, and density. This page has no filters beyond those shared controls.

### Create a webhook

1. Click **Add webhook**. The webhook opens in a full-page editor inside the organisation settings.
2. Enter a **Label** that identifies the receiving system.
3. Enter the **Payload URL**. It must start with `http://` or `https://`. Use HTTPS for anything outside a test environment.
4. Select the **Events** the webhook should receive.
5. Leave **Enabled** on, unless you want to prepare the webhook and activate it later.
6. Click **Save**. The form reminds you that a signing secret is generated when you save and is shown once.

After the webhook is saved, the **Signing secret** dialog opens. It explains that the secret verifies the `X-OpenCDMP-Signature` header of incoming deliveries (HMAC-SHA256 over `timestamp.payload`). Click **Copy secret**, store it in the receiving system, and then click **I stored the secret**.

:::warning

The signing secret is shown only in this dialog and cannot be retrieved later. If you lose it, delete the webhook and create a new one.

:::

### Edit, enable, or disable a webhook

Click a webhook, or click the three dots at the far right of its row and select **Edit**, to change the label, URL, events, or the **Enabled** flag. Disabling a webhook keeps its configuration but stops event capture for it. Deliveries that are still pending when a webhook is disabled are marked `Failed`.

### Send a test ping

Select **Send test ping** from the three dots menu to queue a `Ping` event for the webhook. The delivery appears in the delivery log within one delivery task interval (30 seconds by default), together with the HTTP status returned by the receiving system.

### Inspect the delivery log

Select **Delivery log** from the three dots menu. The **Deliveries** dialog lists the latest deliveries of the webhook with:

- **Event**: the event type.
- **Status**: `Pending`, `Delivered`, or `Failed`.
- **Attempts**: how many times OpenCDMP has tried to deliver the event.
- **HTTP**: the status code returned by the last attempt, if a response was received.
- **Created**: when the event was recorded.
- **Detail**: the last error, and the time of the next retry for pending deliveries.

Click **Refresh** to reload the list. Click **Redeliver** on a `Failed` delivery to queue one more attempt with the same payload. Only the latest deliveries are listed; older ones are not shown.

### Delete a webhook

Select **Delete** from the three dots menu, or open the webhook and click **Delete**. Deliveries that are still pending are marked `Failed`, and the receiving system stops getting events.

## Retries

A delivery succeeds when the receiving system answers with a `2xx` status within the configured timeout (10 seconds by default). Any other outcome is retried with exponential backoff: about 1 minute after the first failure, then 2, 4, 8 minutes, and so on, up to a cap of 6 hours between attempts. After the maximum number of attempts (8 by default) the delivery is marked `Failed` and waits for a manual **Redeliver**.

By default, delivery to URLs that resolve to private, loopback, or link-local addresses is refused, and such deliveries fail immediately. Installation administrators can change this behavior and the retry limits in the [backend configuration](/docs/deployment/configuration/backend/index.md#webhooks-configuration).

## Authorization

Users with the **System Administrator** role, or the **Organisation Admin** role of the current organisation, can access this page and manage webhooks. See [Roles](/docs/administering/how-it-fits-together.md#roles).

## Navigation

In the side navigation menu, switch to the **Admin** view, go to **Organisation > Settings**, and open **Webhooks** (in the **Integrations** group of the section menu).

## See also

- [Webhooks for developers](/docs/developers/webhooks.md) - Request format, signature verification, and retry schedule
- [Webhooks Configuration](/docs/deployment/configuration/backend/index.md#webhooks-configuration) - Backend environment variables
- [Plans](/docs/using/plans/index.md) and [Assets](/docs/using/assets/index.md) - The entities whose lifecycle raises webhook events
