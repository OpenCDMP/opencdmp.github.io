---
sidebar_position: 2
---

# Notifications

The `Notifications Service` is responsible to inform users about important events taking place in the platform that relate with them. The contents of these notifications can be [configured](administering/system-configuration/notification-templates.md) and they depend on the type of notification. By type, we mean the event that triggered them. For example, if a user gets invited to a [plan](using/plans/index.md), this is considered an event and a notification gets pushed to the user it refers to.

The notifications sent, can use one of the following available channels. They can either be `InApp` or `Email`. More details about these notification channels can be found on the links below.

## How Notifications Flow

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

    style Event fill:#fff4e1
    style RabbitMQ fill:#f0e1ff
    style NotifService fill:#e1f5ff
    style Email fill:#ffe1e1
    style InApp fill:#e1ffe1
```

import DocCardList from '@theme/DocCardList';

<DocCardList />