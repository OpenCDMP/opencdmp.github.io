---
sidebar_position: 12
description: Configure the tenant you are logged in with
---

# Tenant Configuration

On this page, we can configure the tenant we are logged in with. The configuration options are separated in the following sections.

<details>
  <summary>Default Tenant Locale</summary>

Here we specify the locale configuration, which will be applied by default to the users of this tenant.

- **Timezone**
- **Culture**
- **Language**
</details>

<details>
  <summary>App Theme</summary>

Here we specify the theme which will be applied to the UI when this tenant is selected. Every tenant can have a different theme.\
For more information on how to customize a tenant's theme, check out [**Theming**](getting-started/configuration/frontend/theming.md)
</details>

<details>
  <summary>Deposit Plugins</summary>

Here we specify the [deposit plugins](optional-services/deposit-services.md), which will be available for this tenant. We have the option to disable system plugins by selecting the `Disable System Sources`. Also we can add plugins by pressing the `Add Source` button. For every plugin, we have to specify the following.

- **Repository Id**: An identifier for the deposit plugin.
- **Url**: The url of the endpoint the deposit listens to.
- **Issuer Url**: The authentication token issuer url.
- **Client Id**: The authentication client.
- **Client Secret**: The authentication client secret.
- **Scope**: The authentication token scope.
- **Pdf Transformer Id**: The id of the file transformer plugin used for pdf files, if configured and available.<br/>*Please refer to the next section.*
- **Rda Transformer Id**: The id of the file transformer plugin used for rda files, if configured and available.<br/>*Please refer to the next section.*
</details>

<details>
  <summary>Evaluator Plugins</summary>

Here we specify the [evaluator plugins](optional-services/evaluator-services.md), which will be available for this tenant. We have the option to disable system plugins by selecting the `Disable System Sources`. Also we can add plugins by pressing the `Add Source` button. For every plugin, we have to specify the following.

- **Repository Id**: An identifier for the evaluator plugin.
- **Url**: The url of the endpoint the evaluator listens to.
- **Issuer Url**: The authentication token issuer url.
- **Client Id**: The authentication client.
- **Client Secret**: The authentication client secret.
- **Scope**: The authentication token scope.
</details>

<details>
  <summary>File Transformer Plugins</summary>

Here we specify the file [file transformers plugins](optional-services/file-transformers.md), which will be available for this tenant. We have the option to disable system plugins by selecting the `Disable System Sources`. Also we can add plugins by pressing the `Add Source` button. For every plugin, we have to specify the following.

- **Transformer Id**: An identifier for the transformer plugin.<br/>*This id can be added on deposit plugin configurations.*
- **Url**: The url of the endpoint the deposit listens to.
- **Issuer Url**: The authentication token issuer url.
- **Client Id**: The authentication client.
- **Client Secret**: The authentication client secret.
- **Scope**: The authentication token scope.
</details>

<details>
  <summary>Extra Logo</summary>

Here we can upload an extra logo, which will be displayed next to the platform logo. It is a great way for tenant branding.
</details>

<details>
  <summary>Notification Preferences</summary>

Here we specify the notification preferences, which will be applied by default to the users of this tenant. For every notification case, we can specify the channels which will be used and their priority.
</details>

<details>
  <summary>Plan Workflow</summary>

Here we configure the workflow for this tenant's plans. Plan workflow is a flow with **[Plan Statuses](admin-guide/system-configuration/plan-statuses.md)** transitions. We define the starting status (when a new plan created) and the next transitions (by pressing the `Add status transition` button).<br/>*Note: If the plan workflow is not defined for a specific tenant, default is used.*
</details>

<details>
  <summary>Description Workflow</summary>

Here we configure the workflow for this tenant's descriptions. Description workflow is a flow with **[Description Statuses](admin-guide/system-configuration/description-statuses.md)** transitions. We define the starting status (when a new description created) and the next transitions (by pressing the `Add status transition` button).<br/>*Note: If the descripton workflow is not defined for a specific tenant, default is used.*
</details>

<details>
  <summary>Default Plan Blueprint</summary>

Here we configure the default **[Plan Blueprint](user-guide/blueprints.md)** that appears as an option when [creating a new plan](user-guide/plans/create-or-edit-a-plan.md#create-a-plan).<br/>*Note: If the blueprint has a new finalized version, then the default is automatically updated.*
</details>

<details>
  <summary>Featured Entities</summary>

Here we configure the Featured Entities on that appears on **[home page](user-guide/home.md)**. You have full control over which blueprints and description templates appear as quick-access options on the Home page, and the order in which you arrange them here is exactly the order they will be displayed.<br/>*Note: If no Featured Entities are configured, the Featured Blueprints section will not appear on the Home page. Description templates functionality is not operational yet.*
</details>

<details>
  <summary>Plugin Configuration</summary>

  This section allows you to configure the [file transformer](developers/plugins/file-transformers.md), [deposit](developers/plugins/deposit.md), and [evaluator](developers/plugins/evaluator.md) plugins. These settings let users customize how various elements are processed and displayed, with options that adapt dynamically based on the selected plugins.
</details>

<details>
  <summary>View Preferences</summary>

  This section allows you to configure which references will appear on the [My Plans](user-guide/plans/my-plans.md) and [My Descriptions](user-guide/descriptions/my-descriptions.md). These preferences determine the visibility of specific references depending on what you define here. The visibility of references will be dynamically controlled based on the View Preferences the admin sets<br/>
</details>

## Authorization

Only users that have the global **Admin** role or the tenant specific **TenantAdmin** role can access this page.

## Navigation

This page is available when the user presses the `Tenant Configuration` link from the side navigation menu.