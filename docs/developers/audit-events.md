---
sidebar_position: 7.1
title: Audit events
description: How the OpenCDMP services record audited API calls, and the reference of every audit event and its id
---

# Audit events

The API service records every completed API call that changes or reads data in its audit log, `auditing.log`, one line per call. For where the audit log is, its line format, and how to search it, see [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md#audit-log-format).

## How auditing works

The `AuditService` (from `gr.cite.tools.auditing`) is injected into every REST controller. At the end of each endpoint method, after the main operation succeeds, the controller calls `auditService.track(...)` with an event identifier and the relevant context parameters. The audit service writes one line to the `audit` logger, which routes to `auditing.log`.

Audit calls are placed **at the end of successful controller methods only**. They are not triggered on authorization failures or exceptions, so the audit log reflects completed, authorized operations.

Each line names the event with its id, for example `"Plan_Lookup": 5001`, and carries the user, the HTTP request, and the context the controller passed. The line format is described in [Audit log format](/docs/deployment/configuration/logging-and-monitoring.md#audit-log-format).

## Call patterns

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

## Audit event reference {#audit-event-reference}

All audit events are defined in `AuditableAction.java` in the main API service. Each event has a numeric ID and a string name. The name appears in `auditing.log`.

:::note
Assets are called *descriptions* in the API and data model, so audit event names such as
`Description_Query` refer to operations on assets.
:::

### Plans (5000–5026)

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
| 5018 | `Plan_ExportPublic` | Export a public Plan to a file format |
| 5019 | `Plan_PublicClone` | Clone a public Plan |
| 5020 | `Plan_SetStatus` | Change a Plan's workflow status |
| 5021 | `Plan_Creation_From_Request` | Create a Plan from a Plan update request |
| 5022 | `Plan_GetActiveUsers` | List active users of a Plan |
| 5023 | `Plan_UpdateDescriptionTemplates` | Add or remove the asset templates of a Plan's sections |
| 5024 | `Plan_GetUsers` | List the collaborators of a Plan |
| 5025 | `Plan_VersionDiff` | Compare two versions of a Plan |
| 5026 | `Plan_GetPublicXml` | Export a public Plan as XML |

### Assets (6000–6015)

| Event ID | Event name | Trigger |
|---|---|---|
| 6000 | `Description_Query` | List/search Assets |
| 6001 | `Description_Lookup` | Retrieve a single Asset by ID |
| 6002 | `Description_Persist` | Create or update an Asset |
| 6003 | `Description_Delete` | Delete an Asset |
| 6004 | `Description_PublicQuery` | Query publicly visible Assets |
| 6005 | `Description_PublicLookup` | Retrieve a single public Asset by ID |
| 6006 | `Description_PersistStatus` | Change an Asset's workflow status |
| 6007 | `Description_UploadFieldFiles` | Upload files attached to Asset fields |
| 6008 | `Description_GetFieldFile` | Download a file attached to an Asset field |
| 6009 | `Description_Validate` | Validate an Asset |
| 6010 | `Description_GetDescriptionSectionPermissions` | Retrieve section-level permissions for an Asset |
| 6011 | `Description_UpdateDescriptionTemplate` | Update the template linked to an Asset |
| 6012 | `Description_GetXml` | Export an Asset as XML |
| 6013 | `Description_GetPublicXml` | Export a public Asset as XML |
| 6014 | `Description_PersistMultiple` | Create or update multiple Assets |
| 6015 | `Description_Clone` | Clone an Asset |

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

### Asset templates (8000–8008)

| Event ID | Event name | Trigger |
|---|---|---|
| 8000 | `DescriptionTemplate_Query` | List/search Asset Templates |
| 8001 | `DescriptionTemplate_Lookup` | Retrieve a single Template by ID |
| 8002 | `DescriptionTemplate_Persist` | Create or update a Template |
| 8003 | `DescriptionTemplate_Delete` | Delete a Template |
| 8004 | `DescriptionTemplate_Clone` | Clone a Template |
| 8005 | `DescriptionTemplate_PersistNewVersion` | Create a new version of a Template |
| 8006 | `DescriptionTemplate_GetXml` | Export a Template as XML |
| 8007 | `DescriptionTemplate_Import` | Import a Template from XML |
| 8008 | `DescriptionTemplate_AssignUsers` | Set the editors of an Asset Template |

### Asset types (1000–1003)

| Event ID | Event name | Trigger |
|---|---|---|
| 1000 | `DescriptionTemplateType_Query` | List Asset types |
| 1001 | `DescriptionTemplateType_Lookup` | Retrieve a single Asset type |
| 1002 | `DescriptionTemplateType_Persist` | Create or update an Asset type |
| 1003 | `DescriptionTemplateType_Delete` | Delete an Asset type |

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

### References (7000–7007)

| Event ID | Event name | Trigger |
|---|---|---|
| 7000 | `Reference_Query` | List/search References |
| 7001 | `Reference_Lookup` | Retrieve a single Reference by ID |
| 7002 | `Reference_Persist` | Create or update a Reference |
| 7003 | `Reference_Delete` | Delete a Reference |
| 7004 | `Reference_Search` | Search References |
| 7005 | `Reference_Test` | Test a Reference type configuration |
| 7006 | `Reference_Usage` | List References ranked by the number of plans or assets that use them |
| 7007 | `Reference_TestSource` | Test one external source of a Reference type |

### Reference types (10000–10004)

| Event ID | Event name | Trigger |
|---|---|---|
| 10000 | `ReferenceType_Query` | List/search Reference types |
| 10001 | `ReferenceType_Lookup` | Retrieve a single Reference type |
| 10002 | `ReferenceType_Persist` | Create or update a Reference type |
| 10003 | `ReferenceType_Delete` | Delete a Reference type |
| 10004 | `ReferenceType_PublicLogo` | Retrieve the logo of a Reference type (anonymous access) |

### Prefilling sources (260000–260006)

| Event ID | Event name | Trigger |
|---|---|---|
| 260000 | `PrefillingSource_Query` | List/search prefilling sources |
| 260001 | `PrefillingSource_Lookup` | Retrieve a single prefilling source |
| 260002 | `PrefillingSource_Persist` | Create or update a prefilling source |
| 260003 | `PrefillingSource_Delete` | Delete a prefilling source |
| 260004 | `PrefillingSource_Generate` | Generate an Asset from a prefilling source |
| 260005 | `PrefillingSource_Test` | Test a prefilling source configuration |
| 260006 | `PrefillingSource_TestSource` | Test one external source of a prefilling source |

### Statuses and workflows

| Event ID | Event name | Trigger |
|---|---|---|
| 300000 | `PlanStatus_Query` | List Plan statuses |
| 300001 | `PlanStatus_Lookup` | Retrieve a single Plan status |
| 300002 | `PlanStatus_Persist` | Create or update a Plan status |
| 300003 | `PlanStatus_Delete` | Delete a Plan status |
| 400000 | `DescriptionStatus_Query` | List Asset statuses |
| 400001 | `DescriptionStatus_Lookup` | Retrieve a single Asset status |
| 400002 | `DescriptionStatus_Persist` | Create or update an Asset status |
| 400003 | `DescriptionStatus_Delete` | Delete an Asset status |
| 500000 | `PlanWorkflow_Query` | List Plan workflows |
| 500001 | `PlanWorkflow_Lookup` | Retrieve a single Plan workflow |
| 500002 | `PlanWorkflow_Persist` | Create or update a Plan workflow |
| 500003 | `PlanWorkflow_Delete` | Delete a Plan workflow |
| 600000 | `DescriptionWorkflow_Query` | List Asset workflows |
| 600001 | `DescriptionWorkflow_Lookup` | Retrieve a single Asset workflow |
| 600002 | `DescriptionWorkflow_Persist` | Create or update an Asset workflow |
| 600003 | `DescriptionWorkflow_Delete` | Delete an Asset workflow |

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

### Plan update requests (700000–700007)

| Event ID | Event name | Trigger |
|---|---|---|
| 700000 | `PlanUpdateRequest_Query` | List Plan update requests |
| 700001 | `PlanUpdateRequest_Lookup` | Retrieve a single Plan update request |
| 700002 | `PlanUpdateRequest_Persist` | Create or update a Plan update request |
| 700003 | `PlanUpdateRequest_Delete` | Delete a Plan update request |
| 700004 | `PlanUpdateRequest_Preprocessing` | Preprocess a Plan update request |
| 700005 | `PlanUpdateRequest_BuildPlan` | Build a Plan from an update request |
| 700006 | `PlanUpdateRequest_Apply` | Apply an update request to create a Plan |
| 700007 | `PlanUpdateRequest_Preview` | Preview a Plan or Asset built from an update request |

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

### Deposit integration (18000–18009)

| Event ID | Event name | Trigger |
|---|---|---|
| 18000 | `Deposit_GetAvailableRepositories` | List configured deposit repositories |
| 18001 | `Deposit_GetAccessToken` | Obtain a deposit repository access token |
| 18002 | `Deposit_Deposit` | Submit a Plan to a deposit repository |
| 18003 | `Deposit_GetLogo` | Retrieve a deposit repository logo |
| 18004 | `Deposit_GetRepository` | Retrieve a deposit repository configuration |
| 18005 | `Deposit_GetAuthMethods` | List authentication methods for a deposit repository |
| 18006 | `Deposit_Preview` | Preview the metadata that a deposit would send |
| 18007 | `Deposit_SearchVocabulary` | Search a repository's controlled vocabulary for a preview field |
| 18008 | `Deposit_GetFiles` | List the files that a deposit would upload |
| 18009 | `Deposit_GetFile` | Download a file that a deposit would upload |

### File transformers and evaluators (20000–20002)

| Event ID | Event name | Trigger |
|---|---|---|
| 20000 | `FileTransformer_GetAvailableConfigurations` | List configured file transformer services |
| 20001 | `Evaluator_GetAvailableConfigurations` | List configured evaluator services |
| 20002 | `FileTransformer_ValidateTemplate` | Validate an uploaded export template with its file transformer |

### Evaluations (1100000–1100003)

| Event ID | Event name | Trigger |
|---|---|---|
| 1100000 | `Evaluation_Query` | List evaluation results |
| 1100001 | `Evaluation_Lookup` | Retrieve a single evaluation result |
| 1100002 | `Evaluation_Persist` | Create or update an evaluation result |
| 1100003 | `Evaluation_Delete` | Delete an evaluation result |

### Annotations and notifications (16000, 280000)

| Event ID | Event name | Trigger |
|---|---|---|
| 16000 | `Notification_Persist` | Create a notification |
| 280000 | `Annotation_Created_Notify` | Send notification for a new annotation |
| 280001 | `MaDMP_Touched` | maDMP synchronization event triggered |

### Semantics (250000–250001)

| Event ID | Event name | Trigger |
|---|---|---|
| 250000 | `GetSemantics` | Retrieve the list of available semantics |
| 250001 | `GetPluginSemantics` | Retrieve the semantics manifests published by the plugins |

### Contact support (210000–210001)

| Event ID | Event name | Trigger |
|---|---|---|
| 210000 | `ContactSupport_Sent` | Submit a contact support request (authenticated) |
| 210001 | `ContactSupport_PublicSent` | Submit a contact support request (anonymous) |

### Terms and conditions (800000)

| Event ID | Event name | Trigger |
|---|---|---|
| 800000 | `UserTermsAcceptance_Accept` | A user accepts the Terms and Conditions |

### Tenant transfer (900000–900006)

| Event ID | Event name | Trigger |
|---|---|---|
| 900000 | `TenantTransfer_Export` | Export a transfer bundle |
| 900001 | `TenantTransfer_AnalyzeImport` | Check a transfer bundle before import (dry run) |
| 900002 | `TenantTransfer_Import` | Import a transfer bundle |
| 900003 | `TenantTransfer_AnalyzePurge` | Analyze a tenant data purge (dry run) |
| 900004 | `TenantTransfer_Purge` | Permanently delete tenant data |
| 900005 | `TenantTransfer_AnalyzeCopy` | Check a copy from another tenant (dry run) |
| 900006 | `TenantTransfer_Copy` | Copy content from another tenant |

### Statistics (1000000)

| Event ID | Event name | Trigger |
|---|---|---|
| 1000000 | `Statistics_Query` | Query statistics or the names of the entities they refer to |

### Reports (1500000–1500003)

| Event ID | Event name | Trigger |
|---|---|---|
| 1500000 | `Report_Outline` | Retrieve the outline (questions) of a template or blueprint for reporting |
| 1500001 | `Report_Query` | Run an answer report |
| 1500002 | `Report_ExportCsv` | Export the answers behind a report as CSV |
| 1500003 | `Report_SearchQuestions` | Search the questions that can be reported |

### Webhooks (1200000–1200006)

| Event ID | Event name | Trigger |
|---|---|---|
| 1200000 | `WebhookSubscription_Query` | List webhooks of the tenant |
| 1200001 | `WebhookSubscription_Lookup` | Retrieve a single webhook by ID |
| 1200002 | `WebhookSubscription_Persist` | Create or update a webhook |
| 1200003 | `WebhookSubscription_Delete` | Delete a webhook |
| 1200004 | `WebhookSubscription_Ping` | Queue a test `Ping` delivery |
| 1200005 | `WebhookDelivery_Query` | List deliveries of a webhook |
| 1200006 | `WebhookDelivery_Redeliver` | Queue a failed delivery again |

Outgoing deliveries themselves are not audit events; their outcome is recorded in the delivery log described in [Webhooks](/docs/developers/webhooks.md).

### Maintenance (220000, 230000–230043)

These events are emitted by the maintenance endpoints (`/api/maintenance/*`). The [Maintenance](/docs/administering/maintenance.md) page starts tasks as a server-side run, which records one `Maintenance_StartRun` event with the list of tasks, not one event per task; the per-task events below are recorded when a task endpoint is called directly. Clearing the indexes from the page records `Maintenance_ClearElastic`.

| Event ID | Event name | Trigger |
|---|---|---|
| 220000 | `Maintenance_GenerateElastic` | Rebuild Elasticsearch indexes |
| 230000 | `Maintenance_ClearElastic` | Clear Elasticsearch indexes |
| 230001 | `Maintenance_SendUserTouchEvents` | Resend user accounting touch events |
| 230002 | `Maintenance_SendTenantTouchEvents` | Resend tenant accounting touch events |
| 230003 | `Maintenance_SendPlanTouchEvents` | Resend Plan accounting touch events |
| 230004 | `Maintenance_SendDescriptionTouchEvents` | Resend Asset accounting touch events |
| 230005 | `Maintenance_SendPlanAccountingEntriesEvents` | Resend Plan accounting entries |
| 230006 | `Maintenance_SendBlueprintAccountingEntriesEvents` | Resend Blueprint accounting entries |
| 230007 | `Maintenance_SendDescriptionAccountingEntriesEvents` | Resend Asset accounting entries |
| 230008 | `Maintenance_SendDescriptionTemplateAccountingEntriesEvents` | Resend Template accounting entries |
| 230009 | `Maintenance_SendDescriptionTemplateTypeAccountingEntriesEvents` | Resend Asset type accounting entries |
| 230010 | `Maintenance_SendPrefillingSourceAccountingEntriesEvents` | Resend prefilling source accounting entries |
| 230011 | `Maintenance_SendReferenceTypeAccountingEntriesEvents` | Resend Reference type accounting entries |
| 230012 | `Maintenance_SendUserAccountingEntriesEvents` | Resend user accounting entries |
| 230013 | `Maintenance_SendIndicatorCreateEntryEvents` | Resend indicator creation entries |
| 230014 | `Maintenance_SendIndicatorResetEntryEvents` | Resend indicator reset entries |
| 230015 | `Maintenance_SendIndicatorAccessEntryEvents` | Resend indicator access entries |
| 230016 | `Maintenance_SendIndicatorPointPlanEntryEvents` | Resend Plan indicator point entries |
| 230017 | `Maintenance_SendIndicatorPointDescriptionEntryEvents` | Resend Asset indicator point entries |
| 230018 | `Maintenance_SendIndicatorPointReferenceEntryEvents` | Resend Reference indicator point entries |
| 230019 | `Maintenance_SendIndicatorPointUserEntryEvents` | Resend user indicator point entries |
| 230020 | `Maintenance_SendIndicatorPointPlanBlueprintEntryEvents` | Resend Blueprint indicator point entries |
| 230021 | `Maintenance_SendIndicatorPointDescriptionTemplateEntryEvents` | Resend Template indicator point entries |
| 230022 | `Maintenance_SendPlanStatusAccountingEntriesEvents` | Resend Plan status accounting entries |
| 230023 | `Maintenance_SendDescriptionStatusAccountingEntriesEvents` | Resend Asset status accounting entries |
| 230024 | `Maintenance_SendEvaluationPlanAccountingEntriesEvents` | Resend Plan evaluation accounting entries |
| 230025 | `Maintenance_SendEvaluationDescriptionAccountingEntriesEvents` | Resend Asset evaluation accounting entries |
| 230026 | `Maintenance_SendIndicatorPointTenantEntryEvents` | Resend tenant indicator point entries |
| 230028 | `Maintenance_SendReferenceEntriesEvents` | Resend Reference accounting entries |
| 230029 | `Maintenance_SendLanguageEntriesEvents` | Resend language accounting entries |
| 230030 | `Maintenance_SendBlueprintTypeAccountingEntriesEvents` | Resend Blueprint type accounting entries |
| 230031 | `Maintenance_SendDashboardTouchedEntryEvents` | Republish the KPI dashboards |
| 230035 | `Maintenance_SendIndicatorPointPlanBlueprintTypeEntryEvents` | Resend Blueprint type indicator point entries |
| 230036 | `Maintenance_SendIndicatorPointDescriptionTemplateTypeEntryEvents` | Resend Asset type indicator point entries |
| 230037 | `Maintenance_StartRun` | Start a maintenance run |
| 230038 | `Maintenance_LatestRun` | Retrieve the latest maintenance run |
| 230039 | `Maintenance_StopRun` | Stop a maintenance run after its current task |
| 230040 | `Maintenance_LastTaskRuns` | Retrieve the last run of each maintenance task |
| 230041 | `Maintenance_DatabaseMigrations` | Retrieve the database migration state and history |
| 230042 | `Maintenance_Installation` | Retrieve the installation version, update status and notices |
| 230043 | `Maintenance_PersistInstallation` | Turn usage data sharing on or off |

---

## See also

- [Logging and monitoring](/docs/deployment/configuration/logging-and-monitoring.md) - Where `auditing.log` is and how to search it
- [Logging and auditing](/docs/developers/logging-and-auditing.md) - Logging conventions for code that runs in the services
- [Maintenance](/docs/administering/maintenance.md) - Maintenance operations that emit audit events
