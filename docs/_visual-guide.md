---
sidebar_position: 8
description: Visual diagrams and architecture overviews for OpenCDMP
---

# Visual Guide

This page provides visual diagrams to help you understand OpenCDMP's architecture, workflows, and concepts.

## System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "User Interface Layer"
        WebApp["Webapp<br/>(Angular Frontend)"]
    end

    subgraph "API Layer"
        API["API Service<br/>(Java Backend)"]
    end

    subgraph "Authentication"
        Keycloak["Keycloak<br/>(OAuth2/OIDC)"]
    end

    subgraph "Data Layer"
        DB[(PostgreSQL<br/>Database)]
        Search[(Elasticsearch<br/>Search Index)]
    end

    subgraph "Message Bus"
        RabbitMQ["RabbitMQ<br/>(Message Broker)"]
    end

    subgraph "Supplementary Services"
        Notification["Notification Service<br/>(Email & In-app)"]
        Annotation["Annotation Service<br/>(Comments & Reviews)"]
        PDFGen["PDF Generator<br/>(Document Creation)"]
    end

    subgraph "Integration Services"
        FileTransform["File Transformers<br/>(DOCX, PDF, XML)"]
        Deposit["Deposit Services<br/>(Zenodo, Dataverse)"]
    end

    WebApp -->|REST API| API
    WebApp -->|OAuth2 Login| Keycloak
    API -->|Authenticate| Keycloak
    API -->|Read/Write| DB
    API -->|Index/Search| Search
    API -->|Publish Events| RabbitMQ

    RabbitMQ -->|Subscribe| Notification
    RabbitMQ -->|Subscribe| Annotation

    API -->|Generate PDF| PDFGen
    API -->|Export/Import| FileTransform
    API -->|Publish Plan| Deposit

    style WebApp fill:#e1f5ff
    style API fill:#fff4e1
    style Keycloak fill:#ffe1e1
    style DB fill:#e1ffe1
    style Search fill:#e1ffe1
    style RabbitMQ fill:#f0e1ff
```

**Key Components**:

- **Webapp**: User-facing Angular application for creating and managing Plans
- **API Service**: Core backend managing all business logic and data
- **Keycloak**: Centralized authentication and user management
- **PostgreSQL**: Primary data storage for Plans, Descriptions, and configurations
- **Elasticsearch**: Fast full-text search across Plans and Descriptions
- **RabbitMQ**: Asynchronous messaging between services
- **Supplementary Services**: Optional but recommended services for notifications and comments
- **Integration Services**: Pluggable services for external integrations

---

## Plan Lifecycle

### Plan States and Transitions

```mermaid
stateDiagram-v2
    [*] --> Draft: Create Plan

    Draft --> Draft: Save Changes
    Draft --> Finalized: Finalize
    Draft --> [*]: Delete

    Finalized --> Finalized: Update Metadata
    Finalized --> Published: Deposit to Repository
    Finalized --> Draft: Revert to Draft

    Published --> Published: Update DOI Info

    note right of Draft
        Editable by Owner
        and Contributors
    end note

    note right of Finalized
        Read-only content
        Metadata editable
        Can be deposited
    end note

    note right of Published
        Has DOI assigned
        Publicly accessible
        Archived in repository
    end note
```

**State Descriptions**:

- **Draft**: Active editing state. All Contributors can add/edit Descriptions. Plan structure can be modified.
- **Finalized**: Content is locked. Plan is ready for submission or deposit. Metadata (title, description) can still be updated.
- **Published**: Plan has been deposited to an external repository (Zenodo, Dataverse, etc.) and has a DOI assigned. Content is archived and publicly accessible.

---

## User Roles and Permissions

### Plan-Level Roles

```mermaid
graph LR
    subgraph "Plan Roles"
        Owner["Owner<br/>👑<br/>Full Control"]
        Contributor["Contributor<br/>✏️<br/>Can Edit"]
        Reviewer["Reviewer<br/>👁️<br/>Can Comment"]
        Viewer["Viewer<br/>📖<br/>Read Only"]
    end

    Owner -->|Can do everything| Everything["• Edit Plan<br/>• Add/Remove Descriptions<br/>• Manage Users<br/>• Finalize/Publish<br/>• Delete Plan"]

    Contributor -->|Can edit content| EditPerm["• Edit Plan<br/>• Add/Remove Descriptions<br/>• Export Plan"]

    Reviewer -->|Can review| ReviewPerm["• View Plan<br/>• Add Comments<br/>• Request Changes"]

    Viewer -->|Can view| ViewPerm["• View Plan<br/>• Export Plan"]

    style Owner fill:#ffd700
    style Contributor fill:#90ee90
    style Reviewer fill:#87ceeb
    style Viewer fill:#d3d3d3
```

### System-Level Roles

```mermaid
graph TB
    subgraph "Administrative Roles"
        InstallAdmin["Installation Admin<br/>🔧<br/>System Configuration"]
        TenantAdmin["Tenant Admin<br/>🏢<br/>Tenant Management"]
        ConfigManager["Config Manager<br/>⚙️<br/>Blueprint/Template Admin"]
    end

    InstallAdmin -->|Manages| SysConfig["• System Settings<br/>• All Tenants<br/>• User Roles<br/>• Global Config"]

    TenantAdmin -->|Manages| TenantConfig["• Tenant Settings<br/>• Tenant Users<br/>• Tenant Blueprints<br/>• Tenant Templates"]

    ConfigManager -->|Manages| ContentConfig["• Blueprints<br/>• Description Templates<br/>• Reference Types<br/>• Prefilling Sources"]

    style InstallAdmin fill:#ff6b6b
    style TenantAdmin fill:#4ecdc4
    style ConfigManager fill:#45b7d1
```

---

## Plan Structure

### Blueprint Hierarchy

```mermaid
graph TD
    Blueprint["Blueprint<br/>(Plan Template)"]

    Blueprint --> Section1["Section 1<br/>Project Info"]
    Blueprint --> Section2["Section 2<br/>Data Collection"]
    Blueprint --> Section3["Section 3<br/>Data Storage"]

    Section1 --> Desc1["Description 1<br/>(Dataset Template)"]
    Section2 --> Desc2["Description 2<br/>(Dataset Template)"]
    Section2 --> Desc3["Description 3<br/>(Software Template)"]
    Section3 --> Desc4["Description 4<br/>(Dataset Template)"]

    Desc1 --> Fields1["Fields:<br/>• Dataset Name<br/>• Format<br/>• Size"]
    Desc2 --> Fields2["Fields:<br/>• Collection Method<br/>• Collection Period<br/>• Responsible Person"]
    Desc3 --> Fields3["Fields:<br/>• Software Name<br/>• Version<br/>• License"]

    style Blueprint fill:#e1f5ff
    style Section1 fill:#fff4e1
    style Section2 fill:#fff4e1
    style Section3 fill:#fff4e1
    style Desc1 fill:#e1ffe1
    style Desc2 fill:#e1ffe1
    style Desc3 fill:#e1ffe1
    style Desc4 fill:#e1ffe1
```

**Hierarchy Explanation**:

1. **Blueprint**: Defines the overall structure of a Plan (e.g., "NSF Data Management Plan")
2. **Sections**: Major divisions within a Plan (e.g., "Project Information", "Data Management")
3. **Description Templates**: Define what types of Descriptions can be added to each section (e.g., "Dataset", "Software")
4. **Descriptions**: Actual instances created by users (e.g., "RNA Sequencing Dataset 2024")
5. **Fields**: Individual data points within a Description (text, numbers, dates, references, etc.)

---

## Authentication Flow

### OAuth2 Authorization Code Flow

```mermaid
sequenceDiagram
    participant User
    participant Webapp
    participant API
    participant Keycloak

    User->>Webapp: Access OpenCDMP
    Webapp->>Webapp: Check for token

    alt No token or expired
        Webapp->>Keycloak: Redirect to login
        User->>Keycloak: Enter credentials
        Keycloak->>Keycloak: Validate credentials
        Keycloak->>Webapp: Authorization code
        Webapp->>Keycloak: Exchange code for token
        Keycloak->>Webapp: Access token + Refresh token
    end

    Webapp->>API: API request with token
    API->>Keycloak: Validate token
    Keycloak->>API: Token valid + user info
    API->>Webapp: Response
    Webapp->>User: Display content

    Note over Webapp,Keycloak: Token expires after 30 min (default)

    alt Token expired
        Webapp->>Keycloak: Refresh token request
        Keycloak->>Webapp: New access token
    end
```

---

## Data Flow Examples

### Creating a Plan

```mermaid
sequenceDiagram
    participant User
    participant Webapp
    participant API
    participant DB
    participant Search

    User->>Webapp: Click "New Plan"
    Webapp->>API: GET /api/blueprints
    API->>DB: Query available blueprints
    DB->>API: Blueprint list
    API->>Webapp: Available blueprints
    Webapp->>User: Show blueprint selection

    User->>Webapp: Select blueprint, enter title
    Webapp->>API: POST /api/plans
    API->>DB: Create plan record
    DB->>API: Plan created (ID)
    API->>Search: Index plan
    API->>Webapp: Plan details
    Webapp->>User: Navigate to plan editor
```

### Adding a Description

```mermaid
sequenceDiagram
    participant User
    participant Webapp
    participant API
    participant DB
    participant RabbitMQ
    participant Search

    User->>Webapp: Click "Add Description"
    Webapp->>API: GET /api/description-templates
    API->>DB: Query templates for section
    DB->>API: Available templates
    API->>Webapp: Template list
    Webapp->>User: Show template selection

    User->>Webapp: Select template, fill fields
    Webapp->>API: POST /api/descriptions
    API->>DB: Create description record
    DB->>API: Description created
    API->>Search: Index description
    API->>RabbitMQ: Publish "description.created" event
    API->>Webapp: Description details
    Webapp->>User: Show saved description
```

### Exporting a Plan

```mermaid
sequenceDiagram
    participant User
    participant Webapp
    participant API
    participant FileTransformer
    participant Storage

    User->>Webapp: Click "Export as DOCX"
    Webapp->>API: POST /api/plans/{id}/export
    API->>API: Prepare plan data
    API->>FileTransformer: Transform to DOCX
    FileTransformer->>FileTransformer: Apply template
    FileTransformer->>API: DOCX file
    API->>Storage: Save to temp storage
    API->>Webapp: File URL
    Webapp->>User: Download file

    Note over API,Storage: Temp files cleaned up<br/>after 24 hours
```

### Publishing to Repository

```mermaid
sequenceDiagram
    participant User
    participant Webapp
    participant API
    participant DepositService
    participant Zenodo
    participant DB

    User->>Webapp: Click "Deposit"
    Webapp->>API: POST /api/plans/{id}/deposit
    API->>API: Validate plan is finalized
    API->>DepositService: Send plan + metadata
    DepositService->>Zenodo: Create deposit
    Zenodo->>Zenodo: Assign DOI
    Zenodo->>DepositService: DOI + deposit URL
    DepositService->>API: Deposit confirmation
    API->>DB: Update plan status to Published
    DB->>API: Updated
    API->>Webapp: Deposit successful + DOI
    Webapp->>User: Show DOI and repository link
```

---

## Notification System

### Event-Driven Notifications

```mermaid
graph LR
    subgraph "API Service"
        Event["User Action<br/>(Invite, Comment, etc.)"]
    end

    Event -->|Publish| RabbitMQ["RabbitMQ<br/>Message Queue"]

    RabbitMQ -->|Subscribe| NotifService["Notification Service"]

    NotifService -->|Store| NotifDB[(Notification DB)]
    NotifService -->|Send| Email["Email<br/>(SMTP)"]
    NotifService -->|Create| InApp["In-App<br/>Notification"]

    subgraph "User Notification Delivery"
        Email --> UserEmail["User Email Inbox"]
        InApp --> UserUI["Webapp<br/>Notification Bell"]
    end

    style Event fill:#fff4e1
    style RabbitMQ fill:#f0e1ff
    style NotifService fill:#e1f5ff
    style Email fill:#ffe1e1
    style InApp fill:#e1ffe1
```

**Notification Types**:

- **Plan Invitation**: User is invited to collaborate on a Plan
- **Description Assigned**: User is assigned to work on a Description
- **Comment Added**: New comment on a Plan/Description the user is involved with
- **Plan Finalized**: Plan is finalized and ready for review/submission
- **Plan Published**: Plan is successfully deposited and has DOI
- **System Announcements**: Admin notifications to all users

---

## Search and Indexing

### Elasticsearch Integration

```mermaid
graph TB
    subgraph "Data Changes"
        CreatePlan["Create/Update Plan"]
        CreateDesc["Create/Update Description"]
        DeletePlan["Delete Plan"]
    end

    CreatePlan -->|Trigger| IndexPlan["Index Plan"]
    CreateDesc -->|Trigger| IndexDesc["Index Description"]
    DeletePlan -->|Trigger| RemoveIndex["Remove from Index"]

    IndexPlan -->|Send| ES[(Elasticsearch)]
    IndexDesc -->|Send| ES
    RemoveIndex -->|Send| ES

    User["User Search Query"] -->|Search| API["API Service"]
    API -->|Query| ES
    ES -->|Results| API
    API -->|Filter by permissions| Results["Filtered Results"]
    Results -->|Display| User

    style CreatePlan fill:#e1ffe1
    style CreateDesc fill:#e1ffe1
    style DeletePlan fill:#ffe1e1
    style ES fill:#fff4e1
```

**Search Capabilities**:

- Full-text search across Plan titles, descriptions, and content
- Search within Description fields
- Filter by status (Draft, Finalized, Published)
- Filter by Blueprint type
- Filter by user role (My Plans, Shared with Me)
- Faceted search with aggregations

---

## Multi-Tenancy

### Tenant Isolation

```mermaid
graph TB
    subgraph "OpenCDMP Instance"
        API["API Service"]
        DB[(Database)]
    end

    subgraph "Tenant 1: University A"
        Users1["Users"]
        Plans1["Plans"]
        Templates1["Templates"]
    end

    subgraph "Tenant 2: University B"
        Users2["Users"]
        Plans2["Plans"]
        Templates2["Templates"]
    end

    subgraph "Tenant 3: Research Institute"
        Users3["Users"]
        Plans3["Plans"]
        Templates3["Templates"]
    end

    API -->|Tenant ID: 1| Users1
    API -->|Tenant ID: 1| Plans1
    API -->|Tenant ID: 1| Templates1

    API -->|Tenant ID: 2| Users2
    API -->|Tenant ID: 2| Plans2
    API -->|Tenant ID: 2| Templates2

    API -->|Tenant ID: 3| Users3
    API -->|Tenant ID: 3| Plans3
    API -->|Tenant ID: 3| Templates3

    API -.->|All stored in| DB

    style Users1 fill:#e1f5ff
    style Plans1 fill:#e1f5ff
    style Templates1 fill:#e1f5ff
    style Users2 fill:#fff4e1
    style Plans2 fill:#fff4e1
    style Templates2 fill:#fff4e1
    style Users3 fill:#e1ffe1
    style Plans3 fill:#e1ffe1
    style Templates3 fill:#e1ffe1
```

**Tenant Isolation**:

- Each tenant has separate users, Plans, and configurations
- Data is logically separated by tenant ID
- Users cannot see or access other tenants' data
- Each tenant can have custom Blueprints and Templates
- Shared default templates available across tenants (optional)

---

## Deployment Architecture

### Docker Compose Deployment

```mermaid
graph TB
    subgraph "Docker Network: opencdmp-network"
        subgraph "Frontend"
            Webapp["opencdmp-webapp<br/>Port: 8080"]
        end

        subgraph "Backend"
            API["opencdmp-backend<br/>Port: 8081"]
        end

        subgraph "Authentication"
            Keycloak["keycloak<br/>Port: 8082"]
        end

        subgraph "Data Stores"
            Postgres["postgres<br/>Port: 5432"]
            Elastic["elasticsearch<br/>Port: 9200"]
        end

        subgraph "Message Broker"
            Rabbit["rabbitmq<br/>Port: 5672, 15672"]
        end

        subgraph "Services"
            Notification["notification-service"]
            Annotation["annotation-service"]
            PDFGen["pdf-generator"]
        end

        subgraph "Transformers"
            DOCX["docx-transformer"]
            XML["xml-transformer"]
        end

        subgraph "Deposit"
            Zenodo["zenodo-deposit"]
        end
    end

    Internet["Internet"] -->|HTTPS :443| Nginx["Nginx<br/>Reverse Proxy"]
    Nginx -->|Forward| Webapp
    Nginx -->|Forward /api| API

    Webapp -->|API calls| API
    API --> Postgres
    API --> Elastic
    API --> Keycloak
    API --> Rabbit
    API --> PDFGen
    API --> DOCX
    API --> XML
    API --> Zenodo

    Rabbit --> Notification
    Rabbit --> Annotation

    style Nginx fill:#ffe1e1
    style Webapp fill:#e1f5ff
    style API fill:#fff4e1
    style Keycloak fill:#ffe1e1
    style Postgres fill:#e1ffe1
    style Elastic fill:#e1ffe1
    style Rabbit fill:#f0e1ff
```

**Container Roles**:

- **Nginx**: Reverse proxy handling SSL/TLS termination and routing
- **Webapp**: Serves Angular frontend application
- **Backend**: Java API service handling all business logic
- **Keycloak**: Authentication server
- **PostgreSQL**: Primary database
- **Elasticsearch**: Search index
- **RabbitMQ**: Message broker
- **Services**: Supplementary microservices
- **Transformers**: File format conversion services
- **Deposit**: Repository integration services

---

## Integration Patterns

### File Transformer Integration

```mermaid
sequenceDiagram
    participant API as API Service
    participant Auth as Auth Service
    participant Transformer as File Transformer

    Note over API: Plan export requested

    API->>Auth: Request service token
    Auth->>API: Access token

    API->>Transformer: POST /transform<br/>Authorization: Bearer {token}<br/>Body: {format, template, data}

    Transformer->>Transformer: Validate token
    Transformer->>Transformer: Apply template
    Transformer->>Transformer: Generate file

    alt Success
        Transformer->>API: 200 OK<br/>File content (binary)
        API->>API: Save to storage
    else Authentication Failed
        Transformer->>API: 401 Unauthorized
    else Transformation Failed
        Transformer->>API: 500 Error<br/>Error details
    end
```

### Repository Deposit Integration

```mermaid
sequenceDiagram
    participant API as API Service
    participant Deposit as Deposit Service
    participant Zenodo as Zenodo API

    Note over API: User clicks "Deposit"

    API->>Deposit: POST /deposit<br/>Body: {plan, metadata, files}

    Deposit->>Zenodo: Authenticate<br/>(OAuth2 or API key)
    Zenodo->>Deposit: Access token

    Deposit->>Zenodo: Create deposit
    Zenodo->>Deposit: Deposit ID

    Deposit->>Zenodo: Upload metadata
    Deposit->>Zenodo: Upload files

    Deposit->>Zenodo: Publish deposit
    Zenodo->>Zenodo: Assign DOI
    Zenodo->>Deposit: DOI + URL

    Deposit->>API: Success<br/>{doi, url, repositoryId}

    API->>API: Update plan status
    API->>API: Store DOI
```

---

## Performance Optimization

### Caching Strategy

```mermaid
graph TB
    Request["User Request"]

    Request -->|Check| AppCache["Application Cache<br/>(In-Memory)"]

    AppCache -->|Hit| ReturnCached["Return Cached Data"]
    AppCache -->|Miss| QueryDB["Query Database"]

    QueryDB -->|Fetch| DB[(PostgreSQL)]
    DB -->|Return| QueryDB
    QueryDB -->|Store| AppCache
    QueryDB -->|Return| Response["Return Response"]

    style AppCache fill:#fff4e1
    style ReturnCached fill:#e1ffe1
    style QueryDB fill:#e1f5ff
```

**Cached Data**:

- Blueprints (rarely change)
- Description Templates (rarely change)
- Reference Types (rarely change)
- User permissions (TTL: 5 minutes)
- Keycloak configuration (TTL: 15 minutes)

**Cache Invalidation**:

- Manual admin action (clear cache)
- Time-to-live (TTL) expiration
- On entity update (automatic)

---

## Backup and Recovery

### Backup Strategy

```mermaid
graph LR
    subgraph "Data Sources"
        DB[(PostgreSQL<br/>Plans & Config)]
        Keycloak[(Keycloak<br/>Users)]
        Files["File Storage<br/>Uploads"]
        ES[(Elasticsearch<br/>Index)]
    end

    subgraph "Backup Process"
        DBBackup["pg_dump<br/>(Daily)"]
        KeycloakBackup["Keycloak Export<br/>(Weekly)"]
        FileBackup["File Copy<br/>(Daily)"]
        ESBackup["Snapshot<br/>(Daily)"]
    end

    subgraph "Backup Storage"
        S3["S3 / Object Storage<br/>(Encrypted)"]
    end

    DB -->|Backup| DBBackup
    Keycloak -->|Export| KeycloakBackup
    Files -->|Sync| FileBackup
    ES -->|Snapshot| ESBackup

    DBBackup -->|Upload| S3
    KeycloakBackup -->|Upload| S3
    FileBackup -->|Upload| S3
    ESBackup -->|Upload| S3

    S3 -->|Restore| Recovery["Recovery Process"]

    style DB fill:#e1ffe1
    style Keycloak fill:#ffe1e1
    style Files fill:#e1f5ff
    style ES fill:#fff4e1
    style S3 fill:#f0e1ff
```

---

## Related Documentation

### Getting Started
- [Architecture Overview](/getting-started/architecture.md)
- [Deployment Guide](/getting-started/deployment/index.md)
- [Configuration](/getting-started/configuration/backend/)
- [Common Workflows](/getting-started/getting-started-workflows.md)

### User Guides
- [Your First Plan](/user-guide/getting-started.md)

### Administration
- [Administrator Getting Started](/admin-guide/getting-started.md)
- [Blueprint Management](/admin-guide/content-management/blueprints/)
- [User Management](/admin-guide/user-management/users.md)

### Integration
- [OAuth2 Integration](/developers/integration.md)
- [Supplementary Services](/optional-services/deposit-services.md)

---

## Diagram Legend

```mermaid
graph LR
    subgraph "Component Types"
        User["User/Actor"]
        Service["Service/Container"]
        DB[(Database)]
        Queue[/"Message Queue"/]
    end

    subgraph "Connection Types"
        A["Component A"]
        B["Component B"]
        C["Component C"]
        D["Component D"]

        A -->|Synchronous| B
        C -.->|Asynchronous| D
    end

    style User fill:#e1f5ff
    style Service fill:#fff4e1
    style DB fill:#e1ffe1
    style Queue fill:#f0e1ff
```

**Color Coding**:
- 🔵 Blue: User interface components
- 🟡 Yellow: Backend services
- 🔴 Red: Authentication/security
- 🟢 Green: Data storage
- 🟣 Purple: Message queues
