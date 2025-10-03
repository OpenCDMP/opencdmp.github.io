---
sidebar_position: 1
description: A brief guide on the API documentation tool this platform uses
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# Swagger UI

:::info Swagger UI
For interactive API documentation, access the Swagger UI at: `https://your-opencdmp-instance/api/swagger-ui/index.html`. It contains documentation for the following API endpoints.
:::

<Tabs>
 <TabItem value="current" label="Current">

    - **/api/plan/\*\***
    - **/api/description/\*\***
    - **/api/plan-blueprint/\*\***
    - **/api/description-template/\*\***
    - **/api/description-template-type/\*\***
    - **/api/reference/\*\***
    - **/api/reference-type/\*\***
    - **/api/user/\*\***
    - **/api/tenants\*\***
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

    <Admonition type="info">
      <p>These endpoints require authentication.</p>
    </Admonition>

  </TabItem>
  <TabItem value="legacy" label="Legacy">

    - **/api/public/dmps/\*\***
    - **/api/public/datasets/\*\***

    <Admonition type="info">
      <p>These endpoints do not require authentication.</p>
    </Admonition>

  </TabItem>
</Tabs>

---

## Base URL

All API endpoints are relative to your OpenCDMP instance:

```
https://your-opencdmp-instance/api
```

**Example**: `https://opencdmp.example.org/api`

---

## Authentication

All API requests (except legacy public endpoints) require authentication using OAuth2 Bearer tokens. In `Swagger UI` page `authorize` with your account to get authentication access.

### Request Header

```http
Authorization: Bearer {access_token}
```

**Example**:
```http
GET /api/plan HTTP/1.1
Host: opencdmp.example.org
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: user-guide/json
```