---
sidebar_position: 1
description: A brief guide on the API documentation tool this platform uses
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# Swagger UI

The Swagger UI is available at the `/swagger-ui/index.html` url. It contains documentation for the following API endpoints.

<Tabs>
 <TabItem value="current" label="Current">

    - **/api/plan/\*\***
    - **/api/description/\*\***
    - **/api/description-template/\*\***
    - **/api/description-template-type/\*\***
    - **/api/plan-blueprint/\*\***
    - **/api/plan-status/\*\***
    - **/api/plan-workflow/\*\***
    - **/api/description-status/\*\***
    - **/api/description-workflow/\*\***
    - **/api/entity-doi/\*\***
    - **/api/deposit/\*\***
    - **/api/file-transformer/\*\***
    - **/api/evaluator/\*\***
    - **/api/tag/\*\***
    - **/api/reference/\*\***
    - **/api/reference-type/\*\***
    - **/api/user/\*\***
    - **/api/principal/\*\***
    - **/api/lock/\*\***

    <Admonition type="info">
      <p>These endpoints require authentication.</p>
    </Admonition>

  </TabItem>
  <TabItem value="legacy" label="Legacy">

    - **/api/plan/public/\*\***
    - **/api/description/public/\*\***

    <Admonition type="info">
      <p>These endpoints do not require authentication.</p>
    </Admonition>

  </TabItem>
</Tabs>