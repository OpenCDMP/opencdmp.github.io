---
sidebar_position: 2
description: How OpenCDMP notifies users by email and in the application, and where the notification channels are configured
---

# Notifications

The `Notifications Service` informs users about important events in the platform that relate to them. The contents of these notifications can be [configured](/docs/administering/system-configuration/notification-templates.md) and depend on the type of notification, that is, the event that triggered it. For example, when a user is invited to a [plan](/docs/using/plans/index.md), a notification is sent to that user.

Notifications are sent through one of two channels: `InApp` or `Email`. Each organisation decides which channels every notification may use (**Settings > Notifications**), and users choose which channel comes first in their profile.

## How notifications flow

```mermaid
graph LR
    subgraph "API Service"
        Event["User Action<br/>(invite, comment, status change…)"]
    end

    Event -->|Publish event| RabbitMQ["RabbitMQ<br/>(Message Broker)"]

    RabbitMQ -->|Subscribe| NotifService["Notification Service"]

    NotifService -->|Store| NotifDB[(Notification DB)]
    NotifService -->|Send via SMTP| Email["Email channel"]
    NotifService -->|Store for polling| InApp["In-App channel"]

    subgraph "Delivery"
        Email --> UserEmail["User email inbox"]
        InApp --> UserUI["Notification bell<br/>(Webapp)"]
    end

    style Event fill:#fff4e1,color:#1a1a1a,stroke:#555
    style RabbitMQ fill:#f0e1ff,color:#1a1a1a,stroke:#555
    style NotifService fill:#e1f5ff,color:#1a1a1a,stroke:#555
    style Email fill:#ffe1e1,color:#1a1a1a,stroke:#555
    style InApp fill:#e1ffe1,color:#1a1a1a,stroke:#555
```

import DocCardList from '@theme/DocCardList';

<DocCardList />