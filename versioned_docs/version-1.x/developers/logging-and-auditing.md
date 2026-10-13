---
sidebar_position: 5
description: Logging infrastructure and audit trail system used across all OpenCDMP backend services
---

# Logging and auditing

OpenCDMP backend services use a uniform logging infrastructure built on [Logback](https://logback.qos.ch/) (SLF4J). Every service produces two separate log streams: a **troubleshooting log** for operational diagnostics and an **audit log** for recording user activity. This page explains how each stream works, how to configure them, and what events the audit system captures.

---

## Log files

Each backend service writes to two rolling log files:

| File | Purpose | Default path |
|---|---|---|
| `logging.log` | Operational diagnostics — DEBUG/WARN/ERROR output from the application and its dependencies | `/logs/logging.log` |
| `auditing.log` | User activity trail — one line per audited API call, fixed at INFO level | `/logs/auditing.log` |

Both files roll by date and size. Each rolled file is named with a timestamp and index (e.g., `logging.2025-11-01.0.log`). Up to 15 rolled files are retained per appender; files larger than 100 MB roll immediately.

---

## Log entry format

### Troubleshooting log

```
%date{ISO8601} [%thread] %-5level %logger{36} [%X{req.id}] - %message%n
```

Example line:

```
2025-11-01T14:23:01.456+0200 [http-nio-8080-exec-3] WARN  o.o.service.PlanService          [a1b2c3d4] - Plan not found: id=f8e7...
```

Fields:

| Field | Description |
|---|---|
| `%date{ISO8601}` | Timestamp in ISO 8601 format |
| `[%thread]` | Thread name that handled the request |
| `%-5level` | Log level, left-padded to 5 characters (`DEBUG`, `INFO`, `WARN`, `ERROR`) |
| `%logger{36}` | Logger class name, truncated to 36 characters |
| `[%X{req.id}]` | Request correlation ID from MDC — use this to trace a single request across all log lines |
| `%message` | Log message |

### Audit log

```
%date{ISO8601} - %X{req.id} - %message%n
```

Each audit entry is a single line containing a timestamp, request ID, and a JSON payload under the `d` key. Example (formatted for readability):

```
2026-04-15 16:15:59,048 - da05effb-f63d-4555-8ff6-3042eb2cdb15 - {
  "d": {
    "Plan_Lookup": 5001,
    "usr": {
      "usr.subject": "8a0d0e1f-2723-4ac2-8056-8f395f8789c7",
      "usr.name": "dmproot dmproot"
    },
    "id": "71f92236-07a4-4c4d-ad0c-7104c87628ce",
    "invoker": {
      "req.requestURI": "/api/plan/71f92236-07a4-4c4d-ad0c-7104c87628ce",
      "req.remoteAddr": "0:0:0:0:0:0:0:1",
      "req.remoteUser": "dmproot dmproot",
      "req.method": "GET",
      "req.requestURL": "http://localhost:8081/api/plan/71f92236-07a4-4c4d-ad0c-7104c87628ce",
      "req.scheme": "http",
      "req.userAgent": "Mozilla/5.0 ..."
    },
    "fields": {
      "empty": false,
      "fields": ["id", "blueprint.definition.sections.id"]
    },
    "ts": "2026-04-15T13:15:59.047159200Z"
  }
}
```

Fields:

| Field | Description |
|---|---|
| Timestamp | Local server time in `yyyy-MM-dd HH:mm:ss,SSS` format |
| Request ID | UUID correlating this entry with `logging.log` lines from the same request |
| `d` | Envelope object containing all audit context |
| `d.<EventName>` | The audit event name as the key, its numeric ID as the value (e.g., `"Plan_Lookup": 5001`) |
| `d.usr.usr.subject` | Keycloak subject UUID of the authenticated user (`null` for anonymous requests) |
| `d.usr.usr.name` | Display name of the authenticated user |
| `d.invoker` | HTTP request metadata: URI, method, remote address, user agent |
| `d.fields` | Field projection requested by the client (the `f=` query parameters) |
| `d.ts` | UTC timestamp of the audit event in ISO 8601 format |
| Additional keys | Event-specific context — e.g., `id` for single-entity lookups, `lookup` for query parameters, `model` for persist payloads |

The request ID appears in both files, making it straightforward to correlate an audit entry with any troubleshooting lines produced by the same API call.

Anonymous API calls (no authenticated user) omit the `usr` block. The `d.invoker` block is always present.

---

## Configuration

Logback is configured in `web/src/main/resources/logging/logback.xml` within each service. Two properties are injected from the Spring environment at startup:

| Property | Default | Description |
|---|---|---|
| `LOGGING_PATH` | `/logs` | Directory where `logging.log` and `auditing.log` are written |
| `LOGGING_DEFAULT_LOG_LEVEL` | `WARN` | Log level applied to the framework loggers and the root logger for troubleshooting output |

Set these as environment variables or Spring Boot application properties to change the output path or increase verbosity (e.g., `LOGGING_DEFAULT_LOG_LEVEL=DEBUG` during development).

### Configured loggers

| Logger | Level source | Appender |
|---|---|---|
| `org.springframework.web` | `LOGGING_DEFAULT_LOG_LEVEL` | `logging.log` |
| `org.hibernate` | `LOGGING_DEFAULT_LOG_LEVEL` | `logging.log` |
| `gr.cite` | `LOGGING_DEFAULT_LOG_LEVEL` | `logging.log` |
| `org.springframework.data.elasticsearch.client.WIRE` | `LOGGING_DEFAULT_LOG_LEVEL` | `logging.log` |
| `audit` | `INFO` (fixed) | `auditing.log` |
| root | `INFO` | `logging.log` |

The `audit` logger is always at `INFO` and is not affected by `LOGGING_DEFAULT_LOG_LEVEL`.

---

## Troubleshooting log levels

Application code uses the `LoggerService` wrapper (from `gr.cite.tools.logging`) around a standard SLF4J logger. The following levels are used:

| Level | When used |
|---|---|
| `DEBUG` | Entry into a service method or controller action — includes entity type, ID, and requested field set. Useful during development; suppressed in production by the default `WARN` threshold. |
| `WARN` | Unexpected but recoverable conditions. Emitted by the root logger and framework loggers when `LOGGING_DEFAULT_LOG_LEVEL=WARN`. |
| `ERROR` | Unhandled exceptions and critical failures. |

Structured log entries are produced using `MapLogEntry` to attach key-value context:

```java
// Simple string message
logger.debug("querying {}", Plan.class.getSimpleName());

// Structured entry with key-value pairs
logger.debug(new MapLogEntry("retrieving " + Plan.class.getSimpleName())
    .And("id", id)
    .And("fields", fieldSet));
```

---

## Audit trail

### How it works

The `AuditService` (from `gr.cite.tools.auditing`) is injected into every REST controller. At the end of each endpoint method — after the main operation succeeds — the controller calls `auditService.track(...)` with an event identifier and the relevant context parameters. The audit service writes one line to the `audit` logger, which routes to `auditing.log`.

Audit calls are placed **at the end of successful controller methods only**. They are not triggered on authorization failures or exceptions, so the audit log reflects completed, authorized operations.

### Call patterns

**Single parameter:**

```java
this.auditService.track(AuditableAction.Plan_Delete, "id", id);
```

**Multiple parameters:**

```java
this.auditService.track(AuditableAction.Plan_Lookup, Map.ofEntries(
    new AbstractMap.SimpleEntry<String, Object>("id", id),
    new AbstractMap.SimpleEntry<String, Object>("fields", fieldSet)
));
```

---

## Audit event reference

All audit events are defined in `AuditableAction.java` in the main API service. Each event has a numeric ID and a string name. The name appears in `auditing.log`.

### Plans (5000–5022)

| Event ID | Event name | Trigger |
|---|---|---|
| 5000 | `Plan_Query` | List/search Plans |
| 5001 | `Plan_Lookup` | Retrieve a single Plan by ID |
| 5002 | `Plan_Persist` | Create or update a Plan |
| 5003 | `Plan_Delete` | Delete a Plan |
| 5004 | `Plan_Clone` | Clone a Plan |
| 5005 | `Plan_PersistNewVersion` | Create a new version of a Plan |
| 5006 | `Plan_Assign_Users` | Assign users to a Plan |
| 5007 | `Plan_RemoveUser` | Remove a user from a Plan |
| 5008 | `Plan_Invite_Users` | Send invitations to collaborate on a Plan |
| 5009 | `Plan_Invite_Accept` | Accept a Plan collaboration invitation |
| 5010 | `Plan_PublicQuery` | Query publicly visible Plans |
| 5011 | `Plan_Export` | Export a Plan to a file format |
| 5012 | `Plan_PublicLookup` | Retrieve a single public Plan by ID |
| 5013 | `Plan_Finalize` | Finalize a Plan |
| 5014 | `Plan_Undo_Finalize` | Undo finalization of a Plan |
| 5015 | `Plan_Validate` | Validate a Plan |
| 5016 | `Plan_GetXml` | Export a Plan as XML |
| 5017 | `Plan_Import` | Import a Plan from XML |
| 5017 | `Plan_GetPublicXml` | Export a public Plan as XML |
| 5018 | `Plan_ExportPublic` | Export a public Plan to a file format |
| 5019 | `Plan_PublicClone` | Clone a public Plan |
| 5020 | `Plan_SetStatus` | Change a Plan's workflow status |
| 5021 | `Plan_Creation_From_Request` | Create a Plan from a Plan update request |
| 5022 | `Plan_GetActiveUsers` | List active users of a Plan |

### Descriptions (6000–6015)

| Event ID | Event name | Trigger |
|---|---|---|
| 6000 | `Description_Query` | List/search Descriptions |
| 6001 | `Description_Lookup` | Retrieve a single Description by ID |
| 6002 | `Description_Persist` | Create or update a Description |
| 6003 | `Description_Delete` | Delete a Description |
| 6004 | `Description_PublicQuery` | Query publicly visible Descriptions |
| 6005 | `Description_PublicLookup` | Retrieve a single public Description by ID |
| 6006 | `Description_PersistStatus` | Change a Description's workflow status |
| 6007 | `Description_UploadFieldFiles` | Upload files attached to Description fields |
| 6008 | `Description_GetFieldFile` | Download a file attached to a Description field |
| 6009 | `Description_Validate` | Validate a Description |
| 6010 | `Description_GetDescriptionSectionPermissions` | Retrieve section-level permissions for a Description |
| 6011 | `Description_UpdateDescriptionTemplate` | Update the template linked to a Description |
| 6012 | `Description_GetXml` | Export a Description as XML |
| 6013 | `Description_GetPublicXml` | Export a public Description as XML |
| 6014 | `Description_PersistMultiple` | Create or update multiple Descriptions |
| 6015 | `Description_Clone` | Clone a Description |

### Blueprints (3000–3011)

| Event ID | Event name | Trigger |
|---|---|---|
| 3000 | `PlanBlueprint_Query` | List/search Plan Blueprints |
| 3001 | `PlanBlueprint_Lookup` | Retrieve a single Blueprint by ID |
| 3002 | `PlanBlueprint_Persist` | Create or update a Blueprint |
| 3003 | `PlanBlueprint_Delete` | Delete a Blueprint |
| 3004 | `PlanBlueprint_Clone` | Clone a Blueprint |
| 3005 | `PlanBlueprint_PersistNewVersion` | Create a new version of a Blueprint |
| 3006 | `PlanBlueprint_GetXml` | Export a Blueprint as XML |
| 3007 | `PlanBlueprint_Import` | Import a Blueprint from XML |
| 3008 | `PlanBlueprintType_Query` | List Blueprint types |
| 3009 | `PlanBlueprintType_Lookup` | Retrieve a single Blueprint type |
| 3010 | `PlanBlueprintType_Persist` | Create or update a Blueprint type |
| 3011 | `PlanBlueprintType_Delete` | Delete a Blueprint type |

### Description templates (8000–8007)

| Event ID | Event name | Trigger |
|---|---|---|
| 8000 | `DescriptionTemplate_Query` | List/search Description Templates |
| 8001 | `DescriptionTemplate_Lookup` | Retrieve a single Template by ID |
| 8002 | `DescriptionTemplate_Persist` | Create or update a Template |
| 8003 | `DescriptionTemplate_Delete` | Delete a Template |
| 8004 | `DescriptionTemplate_Clone` | Clone a Template |
| 8005 | `DescriptionTemplate_PersistNewVersion` | Create a new version of a Template |
| 8006 | `DescriptionTemplate_GetXml` | Export a Template as XML |
| 8007 | `DescriptionTemplate_Import` | Import a Template from XML |

### Description template types (1000–1003)

| Event ID | Event name | Trigger |
|---|---|---|
| 1000 | `DescriptionTemplateType_Query` | List Description Template types |
| 1001 | `DescriptionTemplateType_Lookup` | Retrieve a single Template type |
| 1002 | `DescriptionTemplateType_Persist` | Create or update a Template type |
| 1003 | `DescriptionTemplateType_Delete` | Delete a Template type |

### Users (11000–11017)

| Event ID | Event name | Trigger |
|---|---|---|
| 11000 | `User_Query` | List/search users |
| 11001 | `User_Lookup` | Retrieve a single user by ID |
| 11002 | `User_Persist` | Create or update a user |
| 11003 | `User_Delete` | Delete a user |
| 11004 | `User_LookupByEmail` | Look up a user by email address |
| 11005 | `User_ExportCsv` | Export user list as CSV |
| 11006 | `User_PersistRoles` | Update a user's roles |
| 11007 | `User_LanguageMine` | Retrieve the current user's language preference |
| 11008 | `User_TimezoneMine` | Retrieve the current user's timezone preference |
| 11009 | `User_CultureMine` | Retrieve the current user's culture preference |
| 11010 | `User_MergeRequest` | Request to merge two user accounts |
| 11011 | `User_MergeConfirm` | Confirm a user account merge |
| 11012 | `User_RemoveCredentialRequest` | Request to remove a user credential |
| 11013 | `User_RemoveCredentialConfirm` | Confirm removal of a user credential |
| 11014 | `User_PlanAssociatedQuery` | Query Plans associated with a user |
| 11015 | `User_AllowMergeAccount` | Allow another account to merge into this user |
| 11016 | `User_InviteToTenant` | Invite a user to a tenant |
| 11017 | `User_InviteToTenantConfirm` | Confirm a tenant invitation |

### Tenants (12000–12003)

| Event ID | Event name | Trigger |
|---|---|---|
| 12000 | `Tenant_Query` | List/search tenants |
| 12001 | `Tenant_Lookup` | Retrieve a single tenant by ID |
| 12002 | `Tenant_Persist` | Create or update a tenant |
| 12003 | `Tenant_Delete` | Delete a tenant |

### Tenant configuration (270000–270005)

| Event ID | Event name | Trigger |
|---|---|---|
| 270000 | `TenantConfiguration_Query` | List tenant configuration entries |
| 270001 | `TenantConfiguration_Lookup` | Retrieve a single tenant configuration entry |
| 270002 | `TenantConfiguration_Persist` | Create or update a tenant configuration entry |
| 270003 | `TenantConfiguration_Delete` | Delete a tenant configuration entry |
| 270004 | `TenantConfiguration_LookupByType` | Retrieve tenant configuration by type |
| 270005 | `TenantConfiguration_LookupBActiveType` | Retrieve active tenant configuration by type |

### References (7000–7005)

| Event ID | Event name | Trigger |
|---|---|---|
| 7000 | `Reference_Query` | List/search References |
| 7001 | `Reference_Lookup` | Retrieve a single Reference by ID |
| 7002 | `Reference_Persist` | Create or update a Reference |
| 7003 | `Reference_Delete` | Delete a Reference |
| 7004 | `Reference_Search` | Search References |
| 7005 | `Reference_Test` | Test a Reference type configuration |

### Reference types (10000–10003)

| Event ID | Event name | Trigger |
|---|---|---|
| 10000 | `ReferenceType_Query` | List/search Reference types |
| 10001 | `ReferenceType_Lookup` | Retrieve a single Reference type |
| 10002 | `ReferenceType_Persist` | Create or update a Reference type |
| 10003 | `ReferenceType_Delete` | Delete a Reference type |

### Prefilling sources (260000–260005)

| Event ID | Event name | Trigger |
|---|---|---|
| 260000 | `PrefillingSource_Query` | List/search prefilling sources |
| 260001 | `PrefillingSource_Lookup` | Retrieve a single prefilling source |
| 260002 | `PrefillingSource_Persist` | Create or update a prefilling source |
| 260003 | `PrefillingSource_Delete` | Delete a prefilling source |
| 260004 | `PrefillingSource_Generate` | Generate a Description from a prefilling source |
| 260005 | `PrefillingSource_Test` | Test a prefilling source configuration |

### Statuses and workflows

| Event ID | Event name | Trigger |
|---|---|---|
| 300000 | `PlanStatus_Query` | List Plan statuses |
| 300001 | `PlanStatus_Lookup` | Retrieve a single Plan status |
| 300002 | `PlanStatus_Persist` | Create or update a Plan status |
| 300003 | `PlanStatus_Delete` | Delete a Plan status |
| 400000 | `DescriptionStatus_Query` | List Description statuses |
| 400001 | `DescriptionStatus_Lookup` | Retrieve a single Description status |
| 400002 | `DescriptionStatus_Persist` | Create or update a Description status |
| 400003 | `DescriptionStatus_Delete` | Delete a Description status |
| 500000 | `PlanWorkflow_Query` | List Plan workflows |
| 500001 | `PlanWorkflow_Lookup` | Retrieve a single Plan workflow |
| 500002 | `PlanWorkflow_Persist` | Create or update a Plan workflow |
| 500003 | `PlanWorkflow_Delete` | Delete a Plan workflow |
| 600000 | `DescriptionWorkflow_Query` | List Description workflows |
| 600001 | `DescriptionWorkflow_Lookup` | Retrieve a single Description workflow |
| 600002 | `DescriptionWorkflow_Persist` | Create or update a Description workflow |
| 600003 | `DescriptionWorkflow_Delete` | Delete a Description workflow |

### Entity DOIs (2000–2003)

| Event ID | Event name | Trigger |
|---|---|---|
| 2000 | `EntityDoi_Query` | List DOI associations |
| 2001 | `EntityDoi_Lookup` | Retrieve a single DOI association |
| 2002 | `EntityDoi_Persist` | Create or update a DOI association |
| 2003 | `EntityDoi_Delete` | Delete a DOI association |

### Storage files (14000–14002)

| Event ID | Event name | Trigger |
|---|---|---|
| 14000 | `StorageFile_Download` | Download a stored file |
| 14001 | `StorageFile_Upload` | Upload a stored file |
| 14002 | `StorageFile_Query` | List stored files |

### Tags (19000–19003)

| Event ID | Event name | Trigger |
|---|---|---|
| 19000 | `Tag_Query` | List/search tags |
| 19001 | `Tag_Lookup` | Retrieve a single tag |
| 19002 | `Tag_Persist` | Create or update a tag |
| 19003 | `Tag_Delete` | Delete a tag |

### Languages (13000–13003)

| Event ID | Event name | Trigger |
|---|---|---|
| 13000 | `Language_Query` | List available languages |
| 13001 | `Language_Lookup` | Retrieve a single language |
| 13002 | `Language_Persist` | Create or update a language |
| 13003 | `Language_Delete` | Delete a language |

### Supportive material (9000–9003)

| Event ID | Event name | Trigger |
|---|---|---|
| 9000 | `SupportiveMaterial_Query` | List supportive material entries |
| 9001 | `SupportiveMaterial_Lookup` | Retrieve a single supportive material entry |
| 9002 | `SupportiveMaterial_Persist` | Create or update a supportive material entry |
| 9003 | `SupportiveMaterial_Delete` | Delete a supportive material entry |

### User settings (4000–4003)

| Event ID | Event name | Trigger |
|---|---|---|
| 4000 | `User_Settings_Query` | List user settings entries |
| 4001 | `User_Settings_Lookup` | Retrieve a single user settings entry |
| 4002 | `User_Settings_Persist` | Create or update a user settings entry |
| 4003 | `User_Settings_Delete` | Delete a user settings entry |

### Locks (17000–17009)

| Event ID | Event name | Trigger |
|---|---|---|
| 17000 | `Lock_Query` | List entity locks |
| 17001 | `Lock_Lookup` | Retrieve a single lock |
| 17002 | `Lock_Persist` | Acquire a lock |
| 17003 | `Lock_Delete` | Release a lock |
| 17004 | `Lock_IsLocked` | Check whether an entity is locked |
| 17005 | `Lock_UnLocked` | Confirm an entity is not locked |
| 17006 | `Lock_Touched` | Extend a lock's TTL |
| 17007 | `Lock_Locked` | Confirm an entity is locked |
| 17008 | `Lock_UnLockedMultiple` | Release multiple locks at once |
| 17009 | `Lock_CheckLock` | Check lock status |

### Usage limits (290000–290003)

| Event ID | Event name | Trigger |
|---|---|---|
| 290000 | `UsageLimit_Query` | List usage limit rules |
| 290001 | `UsageLimit_Lookup` | Retrieve a single usage limit rule |
| 290002 | `UsageLimit_Persist` | Create or update a usage limit rule |
| 290003 | `UsageLimit_Delete` | Delete a usage limit rule |

### Plan update requests (700000–700005)

| Event ID | Event name | Trigger |
|---|---|---|
| 700000 | `PlanUpdateRequest_Query` | List Plan update requests |
| 700001 | `PlanUpdateRequest_Lookup` | Retrieve a single Plan update request |
| 700002 | `PlanUpdateRequest_Persist` | Create or update a Plan update request |
| 700003 | `PlanUpdateRequest_Delete` | Delete a Plan update request |
| 700004 | `PlanUpdateRequest_Preprocessing` | Preprocess a Plan update request |
| 700005 | `PlanUpdateRequest_BuildPlan` | Build a Plan from an update request |

### Dashboard (15000–15002)

| Event ID | Event name | Trigger |
|---|---|---|
| 15000 | `Dashboard_MyRecentActivityItems` | Retrieve the current user's recent activity |
| 15001 | `Dashboard_MyDashboardStatistics` | Retrieve the current user's dashboard statistics |
| 15002 | `Dashboard_PublicDashboardStatistics` | Retrieve public dashboard statistics |

### Principal (240000–240001)

| Event ID | Event name | Trigger |
|---|---|---|
| 240000 | `Principal_Lookup` | Retrieve the authenticated principal's details |
| 240001 | `Principal_MyTenants` | Retrieve the current user's tenant memberships |

### Deposit integration (18000–18005)

| Event ID | Event name | Trigger |
|---|---|---|
| 18000 | `Deposit_GetAvailableRepositories` | List configured deposit repositories |
| 18001 | `Deposit_GetAccessToken` | Obtain a deposit repository access token |
| 18002 | `Deposit_Deposit` | Submit a Plan to a deposit repository |
| 18003 | `Deposit_GetLogo` | Retrieve a deposit repository logo |
| 18004 | `Deposit_GetRepository` | Retrieve a deposit repository configuration |
| 18005 | `Deposit_GetAuthMethods` | List authentication methods for a deposit repository |

### File transformers and evaluators (20000–20001)

| Event ID | Event name | Trigger |
|---|---|---|
| 20000 | `FileTransformer_GetAvailableConfigurations` | List configured file transformer services |
| 20001 | `Evaluator_GetAvailableConfigurations` | List configured evaluator services |

### Annotations and notifications (16000, 280000)

| Event ID | Event name | Trigger |
|---|---|---|
| 16000 | `Notification_Persist` | Create a notification |
| 280000 | `Annotation_Created_Notify` | Send notification for a new annotation |
| 280001 | `MaDMP_Touched` | maDMP synchronization event triggered |

### Semantics (250000)

| Event ID | Event name | Trigger |
|---|---|---|
| 250000 | `GetSemantics` | Retrieve the list of available semantics |

### Contact support (210000–210001)

| Event ID | Event name | Trigger |
|---|---|---|
| 210000 | `ContactSupport_Sent` | Submit a contact support request (authenticated) |
| 210001 | `ContactSupport_PublicSent` | Submit a contact support request (anonymous) |

### Maintenance (220000, 230000–230030)

These events are emitted by the maintenance controller when administrative background tasks are triggered manually.

| Event ID | Event name | Trigger |
|---|---|---|
| 220000 | `Maintenance_GenerateElastic` | Rebuild Elasticsearch indexes |
| 230000 | `Maintenance_ClearElastic` | Clear Elasticsearch indexes |
| 230001 | `Maintenance_SendUserTouchEvents` | Resend user accounting touch events |
| 230002 | `Maintenance_SendTenantTouchEvents` | Resend tenant accounting touch events |
| 230003 | `Maintenance_SendPlanTouchEvents` | Resend Plan accounting touch events |
| 230004 | `Maintenance_SendDescriptionTouchEvents` | Resend Description accounting touch events |
| 230005 | `Maintenance_SendPlanAccountingEntriesEvents` | Resend Plan accounting entries |
| 230006 | `Maintenance_SendBlueprintAccountingEntriesEvents` | Resend Blueprint accounting entries |
| 230007 | `Maintenance_SendDescriptionAccountingEntriesEvents` | Resend Description accounting entries |
| 230008 | `Maintenance_SendDescriptionTemplateAccountingEntriesEvents` | Resend Template accounting entries |
| 230009 | `Maintenance_SendDescriptionTemplateTypeAccountingEntriesEvents` | Resend Template type accounting entries |
| 230010 | `Maintenance_SendPrefillingSourceAccountingEntriesEvents` | Resend prefilling source accounting entries |
| 230011 | `Maintenance_SendReferenceTypeAccountingEntriesEvents` | Resend Reference type accounting entries |
| 230012 | `Maintenance_SendUserAccountingEntriesEvents` | Resend user accounting entries |
| 230013 | `Maintenance_SendIndicatorCreateEntryEvents` | Resend indicator creation entries |
| 230014 | `Maintenance_SendIndicatorResetEntryEvents` | Resend indicator reset entries |
| 230015 | `Maintenance_SendIndicatorAccessEntryEvents` | Resend indicator access entries |
| 230016 | `Maintenance_SendIndicatorPointPlanEntryEvents` | Resend Plan indicator point entries |
| 230017 | `Maintenance_SendIndicatorPointDescriptionEntryEvents` | Resend Description indicator point entries |
| 230018 | `Maintenance_SendIndicatorPointReferenceEntryEvents` | Resend Reference indicator point entries |
| 230019 | `Maintenance_SendIndicatorPointUserEntryEvents` | Resend user indicator point entries |
| 230020 | `Maintenance_SendIndicatorPointPlanBlueprintEntryEvents` | Resend Blueprint indicator point entries |
| 230021 | `Maintenance_SendIndicatorPointDescriptionTemplateEntryEvents` | Resend Template indicator point entries |
| 230022 | `Maintenance_SendPlanStatusAccountingEntriesEvents` | Resend Plan status accounting entries |
| 230023 | `Maintenance_SendDescriptionStatusAccountingEntriesEvents` | Resend Description status accounting entries |
| 230024 | `Maintenance_SendEvaluationPlanAccountingEntriesEvents` | Resend Plan evaluation accounting entries |
| 230025 | `Maintenance_SendEvaluationDescriptionAccountingEntriesEvents` | Resend Description evaluation accounting entries |
| 230026 | `Maintenance_SendIndicatorPointTenantEntryEvents` | Resend tenant indicator point entries |
| 230027 | `Maintenance_SetPlanBlueprintCanEditDescriptionTemplates` | Set Blueprint flag for template editing |
| 230028 | `Maintenance_SendReferenceEntriesEvents` | Resend Reference accounting entries |
| 230029 | `Maintenance_SendLanguageEntriesEvents` | Resend language accounting entries |
| 230030 | `Maintenance_SendBlueprintTypeAccountingEntriesEvents` | Resend Blueprint type accounting entries |

---

## See also

- [Backend configuration](/versioned_docs/version-1.x/deployment/configuration/backend/index.md) — environment variables including `LOGGING_PATH` and `LOGGING_DEFAULT_LOG_LEVEL`
- [Troubleshooting guide](/versioned_docs/version-1.x/troubleshooting.md) — how to use log files to diagnose runtime issues
- [Maintenance](/versioned_docs/version-1.x/administering/maintenance.md) — maintenance operations that emit audit events
