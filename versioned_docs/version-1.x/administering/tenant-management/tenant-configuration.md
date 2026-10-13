---
sidebar_position: 12
description: Configure the tenant you are logged in with
---

# Tenant Configuration

This page allows administrators to configure the tenant they are logged into. Settings here control the tenant's locale, branding, registered plugins, workflow, and display preferences.

## Authorization

Only users with the global **Admin** role or the tenant-specific **TenantAdmin** role can access this page.

## Navigation

This page is available from the `Tenant Configuration` link in the side navigation menu.

---

## Default Tenant Locale

Configure the default locale applied to new users of this tenant.

- **Timezone** — The default timezone for date and time display.
- **Culture** — The locale/culture setting for number and date formatting.
- **Language** — The default interface language for users of this tenant.

Users can override these defaults in their own [Profile Settings](/versioned_docs/version-1.x/using/profile-settings.md).

---

## App Theme

Select the visual theme applied to the UI when this tenant is active. Each tenant can have a different theme, supporting custom branding.

For information on creating and customizing themes, see [Theming](/versioned_docs/version-1.x/deployment/configuration/frontend/theming.md).

---

## Plugin Registration

The following three sections register external plugin services with this tenant. Each plugin type has a separate section. Plugins registered here become available to users of this tenant.

:::tip
The **Transformer Id**, **Repository Id**, and **Evaluator Id** you enter here must exactly match the `fileTransformerId`, `repositoryId`, or `evaluatorId` returned by the plugin's configuration endpoint (`GET /api/file-transformer/formats`, `GET /api/deposit/configuration`, or `GET /api/evaluator/config`). Mismatches will cause the plugin to fail silently.
:::

### Deposit Plugins

Register [repository deposit services](/versioned_docs/version-1.x/optional-services/deposit-services/index.md) available to users for DOI assignment. Toggle **Disable System Sources** to hide any platform-wide deposit plugins for this tenant.

Click **Add Source** to register a new deposit plugin. For each plugin:

| Field | Description |
|-------|-------------|
| **Repository Id** | Must match the `repositoryId` returned by the plugin's `/api/deposit/configuration` endpoint |
| **URL** | Base URL of the running deposit service (e.g. `https://my-deposit-service.example.com`) |
| **Issuer URL** | The Keycloak realm URL used to issue tokens for authenticating calls to this plugin (e.g. `https://keycloak.example.com/realms/opencdmp`) |
| **Client Id** | The Keycloak client ID used by OpenCDMP to authenticate with this plugin |
| **Client Secret** | The corresponding client secret |
| **Scope** | The OAuth2 scope requested when authenticating (e.g. `openid`) |
| **PDF Transformer Id** | The Transformer Id of the file transformer to use for generating PDF files when depositing. Must match a registered file transformer. |
| **RDA Transformer Id** | The Transformer Id of the file transformer to use for generating RDA JSON files when depositing. |

### Evaluator Plugins

Register [evaluator services](/versioned_docs/version-1.x/optional-services/evaluator-services.md) available to users for plan and description assessment.

Click **Add Source** to register a new evaluator plugin. For each plugin:

| Field | Description |
|-------|-------------|
| **Repository Id** | Must match the `evaluatorId` returned by the plugin's `/api/evaluator/config` endpoint |
| **URL** | Base URL of the running evaluator service |
| **Issuer URL** | Keycloak realm URL for token issuance |
| **Client Id** | Keycloak client ID |
| **Client Secret** | Client secret |
| **Scope** | OAuth2 scope |

### File Transformer Plugins

Register [file transformer services](/versioned_docs/version-1.x/optional-services/file-transformers/index.md) available to users for import and export operations.

Click **Add Source** to register a new transformer plugin. For each plugin:

| Field | Description |
|-------|-------------|
| **Transformer Id** | Must match the `fileTransformerId` returned by the plugin's `/api/file-transformer/formats` endpoint. This value is also referenced in the **PDF Transformer Id** and **RDA Transformer Id** fields of deposit plugins. |
| **URL** | Base URL of the running transformer service |
| **Issuer URL** | Keycloak realm URL for token issuance |
| **Client Id** | Keycloak client ID |
| **Client Secret** | Client secret |
| **Scope** | OAuth2 scope |

---

## Extra Logo

Upload an additional logo displayed alongside the platform logo in the navigation bar. This is useful for tenant-specific branding (e.g., an institution's logo).

---

## Notification Preferences

Configure the default notification channels and their priority for each notification event in this tenant. These defaults apply to all users unless overridden in their individual profile settings.

For each notification type, you can specify whether notifications are sent via **email**, **in-app**, or both, and in what order they are attempted.

---

## Plan Workflow

Configure the lifecycle workflow for plans in this tenant. The workflow defines:

- **Starting Status** — the status assigned to a plan when it is first created.
- **Status Transitions** — which status changes are permitted (e.g., Draft → Under Review → Finalized).

Click **Add status transition** to define each allowed move between statuses.

:::note
If no workflow is configured here, the platform uses its built-in default workflow. Statuses must be created first on the [Plan Statuses](/versioned_docs/version-1.x/administering/system-configuration/plan-statuses.md) page.
:::

For a full explanation of how workflows operate, see [Plan Workflow](/versioned_docs/version-1.x/administering/system-configuration/plan-workflow.md).

---

## Description Workflow

Configure the lifecycle workflow for descriptions in this tenant. Works identically to the Plan Workflow but applies to individual descriptions.

:::note
If no workflow is configured, the platform uses its built-in default. Statuses must be created first on the [Description Statuses](/versioned_docs/version-1.x/administering/system-configuration/description-statuses.md) page.
:::

For a full explanation, see [Description Workflow](/versioned_docs/version-1.x/administering/system-configuration/description-workflow.md).

---

## Default Plan Blueprint

Select the blueprint that pre-populates the blueprint selector when users [create a new plan](/versioned_docs/version-1.x/using/plans/create-or-edit-a-plan.md). Users can still choose a different blueprint.

:::note
If the selected blueprint is updated to a new finalized version, this setting automatically points to the latest version.
:::

---

## Featured Entities

Control which blueprints appear as quick-access options on the [Home page](/versioned_docs/version-1.x/using/home.md). The order you arrange them here is the order displayed to users.

- Select blueprints to feature from the list of finalized blueprints.
- Reorder them using the drag handles.
- Remove any blueprint from the featured list at any time.

:::note
If no featured entities are configured, the featured section does not appear on the Home page.
:::

---

## Plugin Configuration

Configure the system-level and user-level values for registered plugins. When a plugin declares [ConfigurationFields](/versioned_docs/version-1.x/developers/plugins/common-models.md#plugin-configuration-models) in its configuration, those fields appear here for administrators to fill in.

Examples of system-level configuration values:
- A Zenodo community ID applied to all deposits
- A template file used by a file transformer
- An API endpoint for an evaluator

User-level configuration fields appear in each user's [Profile Settings](/versioned_docs/version-1.x/using/profile-settings.md) instead.

---

## View Preferences

Configure which reference columns are displayed on the [My Plans](/versioned_docs/version-1.x/using/plans/my-plans.md) and [My Descriptions](/versioned_docs/version-1.x/using/descriptions/my-descriptions.md) listing pages.

Select which reference types (e.g., Grant, Organization) should appear as columns in those views, helping users quickly identify key metadata at a glance.
