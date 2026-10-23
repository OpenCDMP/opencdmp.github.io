---
title: Frontend configuration
description: Environment variables and config-override.json settings of the OpenCDMP webapp
---

# Frontend configuration

The OpenCDMP webapp is configured through its `config.json` file. When the webapp container starts, it fills in `config.json` from the environment variables below, which the Docker example sets in its `.env` file (see the [Docker Compose environment](/docs/deployment/configuration/infrastructure.md#docker)). Other values of `config.json` can be changed with a [`config-override.json`](#overrides) file.

## Environment variables

### Core configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `WEBAPP_API_URL` | Address of the API, as the browser reaches it, with a trailing slash. | Yes | - | `https://opencdmp.example.org/api/` |
| `INSTALLATION_URL` | Address of the webapp, with a trailing slash. | Yes | - | `https://opencdmp.example.org/` |
| `WEBAPP_BASE_URL` | Base path of the webapp, when it is not served at the root of its host. | No | `/` | `/opencdmp/` |
| `DEFAULT_CULTURE` | Default language of the webapp, as an ISO 639 code. | No | `en` | `en` |

### Keycloak authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KEYCLOAK_ADDRESS` | Keycloak server URL, including its relative path (`/auth/` in the Docker example). | Yes | - | `https://opencdmp.example.org/auth/` |
| `KEYCLOAK_REALM` | Keycloak realm. | Yes | - | `OpenCDMP` |
| `KEYCLOAK_CLIENT_ID` | Keycloak client of the webapp. | Yes | - | `webapp` |
| `KEYCLOAK_SCOPE` | Scopes the webapp requests. They must include `api` (the API audience) and, for comments and notifications, `annotation` and `notification`. | No | `openid profile email address phone api notification annotation identity_provider` | `openid profile email api notification annotation identity_provider` |

### Appearance and accessibility

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `PRIMARY_COLOR` | Main colour of the installation (`theme.primaryColor`). Each organisation can set its own on its [Branding](/docs/administering/tenant-management/branding.md) page. | No | - | `#1e6b52` |
| `CSS_OVERRIDES` | Style variables of the installation (`theme.cssOverride`): a JSON object of variable names and values, see [Branding](/docs/administering/tenant-management/branding.md#css-overrides). The value is inserted into a JSON string, so escape its quotes; it cannot contain a comma, so set more than one variable in [`config-override.json`](#overrides) instead. | No | - | `{\"--mat-sys-primary\":\"#1e6b52\"}` |
| `USERWAY_ID` | Account id of the [UserWay](https://userway.org/) accessibility widget (`userWay.id`). The widget is not loaded when it is empty. | No | - | `<userway-account-id>` |

<!-- kpi disabled  -->
<!-- ### KPI Service Configuration

These variables enable the [Statistics](/docs/administering/statistics.md) page, whose charts are served by the optional [KPI service](/docs/optional-services/kpi.md). The API service must have the KPI integration enabled as well, see the [backend KPI configuration](/docs/deployment/configuration/backend/index.md#kpi-service-configuration).

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KPI_SERVICE_ENABLED` | Boolean value that enables the KPI service integration and shows the Statistics page to eligible users. | No | `false` | `true` |
| `KPI_SERVICE_ADDRESS` | KPI service URL. | Yes¹ | - | `http://<hostname>:<port>/<kpi-path>` |

¹ Required only if `KPI_SERVICE_ENABLED` is set to `true` -->
<!-- accounting disabled
### Supplementary Services

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `ACCOUNTING_SERVICE_ENABLED` | Boolean value that enables accounting service | No | `false` | `true` |-->

### Logging

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_ENABLED` | Writes the webapp's log messages to the browser console. | No | `false` | `true` |

### Test installation banner

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `TEST_INSTALLATION_MESSAGE_ENABLED` | Shows a "This is a test environment." banner on every page, for test and staging installations. | No | `false` | `true` |

## Overrides {#overrides}

To change other values of `config.json`, mount a `config-override.json` file at `/usr/share/nginx/html/assets/config/config-override.json` in the webapp container (the Docker example has the volume line commented out in `docker-compose.override.yml`). The webapp merges it over `config.json` when it loads: objects are merged key by key, and any other value that is not `null` in the override replaces the value of `config.json`, including values set from the environment variables. List only the keys you change. The sections you can change are listed below.

### [Notifications](/docs/optional-services/notifications/index.md)
```json
"notification_service": {
    "enabled": true,
    "address": null
}
```
| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `enabled` | Shows the in-app notifications. | No | `true` | `false` |
| `address` | Address under which the webapp calls the notification service (`<address>api/notification/...`), with a trailing slash. When `null`, the webapp calls its own address, where the proxy forwards `/api/notification/`. | No | `null` | `https://notifications.example.org/` |

### [Annotations](/docs/optional-services/annotations.md)
```json
"annotation_service": {
    "enabled": true,
    "address": null
}
```
| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `enabled` | Shows comments on plans and assets. | No | `true` | `false` |
| `address` | Address under which the webapp calls the annotation service (`<address>api/annotation/...`), with a trailing slash. When `null`, the webapp calls its own address, where the proxy forwards `/api/annotation/`. | No | `null` | `https://annotations.example.org/` |

<!-- kpi disabled -->
<!-- ### [KPI Service](/docs/optional-services/kpi.md)

The `kpi_service` section lists the dashboards that the [Statistics](/docs/administering/statistics.md) page offers. Two dashboards are preconfigured and match the definitions that the API publishes to the KPI service: the Tenant dashboard (`dmp_dashboard`, shown as **Tenant-Scoped Statistics**) and the Admin dashboard (`dmp_admin_dashboard`, shown as **Multi-Tenant Statistics**). Override this section only to change which dashboards are offered or to whom. -->

<!-- **Default:**
```
"kpi_service": {
    "enabled": {KPI_SERVICE_ENABLED},
    "address": {KPI_SERVICE_ADDRESS},
    "dashboards": [
        {
            "dashboardId": "dmp_dashboard",
            "keywordFilter": "tenant_code",
            "availableToRoles": ["Admin", "InstallationAdmin", "TenantAdmin"]
        },
        {
            "dashboardId": "dmp_admin_dashboard",
            "keywordFilter": null,
            "availableToRoles": ["Admin", "InstallationAdmin"]
        }
    ]
}
``` -->

<!-- | Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `enabled` | Boolean value that enables the KPI service integration (Statistics page). | No | `false` | `true` |
| `address` | KPI service URL. | Yes¹ | - | `http://<hostname>:<port>/<kpi-path>` |
| `dashboards` | Array of dashboards offered on the Statistics page. When more than one dashboard is available to the logged-in user, a dropdown lets the user switch between them. | No | The two dashboards above | - |
| `dashboards[].dashboardId` | Key of a dashboard definition published to the KPI service by the API (`dmp_dashboard` or `dmp_admin_dashboard` with the default definitions). | Yes | - | `dmp_dashboard` |
| `dashboards[].keywordFilter` | Indicator keyword field used to scope the dashboard to the tenant the user is logged in with; the webapp filters that field by the current tenant code. Use `tenant_code` for a tenant-scoped dashboard and `null` for an installation-wide one. | No | `null` | `tenant_code` |
| `dashboards[].availableToRoles` | Roles for which the dashboard is offered. The dashboard is shown when the user holds the `ViewIndicatorDashboardPage` permission and at least one of the user's selected roles is in this list. | Yes | - | `["Admin", "TenantAdmin"]` |

¹ Required only if `enabled` is set to `true` -->

### Logging

When `LOGGING_ENABLED` is `true`, `logLevels` selects the levels written to the browser console.
```json
"logging": {
    "logLevels": ["debug", "info", "warning", "error"]
}
```
| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `logLevels` | Levels to write. | No | `["debug", "info", "warning", "error"]` | `["warning", "error"]` |

### Sidebar menu

**Default:**
```
"sidebar": {
    "infoItems": [
        {
            "title": "SIDE-BAR.SUPPORT",
            "icon": "help",
            "routerPath": "/contact-support",
            "accessLevel": "authenticated"
        }
    ],
    "footerItems": [
        {
            "routerPath": "/about",
            "title": "FOOTER.ABOUT",
            "icon": "feedback",
            "accessLevel": "public"
        },
        {
            "routerPath": "/terms-and-conditions",
            "title": "FOOTER.TERMS-OF-SERVICE",
            "accessLevel": "public"
        },
        {
            "routerPath": "/glossary",
            "title": "FOOTER.GLOSSARY",
            "accessLevel": "public"
        },
        {
            "routerPath": "/user-guide",
            "title": "FOOTER.GUIDE",
            "accessLevel": "public"
        },
        {
            "routerPath": "/contact-support",
            "title": "FOOTER.CONTACT-SUPPORT",
            "accessLevel": "authenticated"
        }
    ]
}
```

| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `title` | Page title | Yes | - | `page-title` |
| `routerPath` | Internal path to the page | Yes¹ | - | `/<relative-route>` |
| `externalUrl` | URL that leads to external view | Yes² | - | `http://<base-route>/<route>` |
| `accessLevel` | Access level of users allowed to view page | Yes | - | `authenticated` |
| `icon` | Sidebar menu **material symbol icon** that appears next to the title | No | - | `feedback` |

¹ Required if not using `externalUrl`
² Required if not using `routerPath`

### Authorization providers
`authProviders` sets the icon shown next to each email address on the [profile page](/docs/using/profile-settings.md), by the identity provider the user signed in with through [Keycloak](/docs/deployment/configuration/keycloak.md#step-11-configure-identity-providers-optional). Providers that are not listed get the default icon.

**Default:**
```
"authProviders": {
    "defaultAuthProvider": {
        "name": "Default",
        "providerClass": "defaultIcon"
    },
    "authProviders": [
        {
            "name": "google",
            "providerClass": "googleIcon",
            "cultures": ["en"]
        },
        {
            "name": "facebook",
            "providerClass": "facebookIcon",
            "cultures": ["en"]
        }
    ]
}
```

| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `name` | Alias of the identity provider in Keycloak. | Yes | - | `google` |
| `providerClass` | Style class of the icon. | Yes | - | `googleIcon` |
| `cultures` | Languages, as ISO 639 codes, in which the icon is shown. | Yes | - | `["en"]` |

### UserWay

[UserWay](https://userway.org/) is an accessibility widget. It is loaded when an account id is set, with `USERWAY_ID` or here.

```json
"userWay": {
    "id": "<userway-account-id>"
}
```
| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `id` | Account id of the UserWay widget. | No | - | `<userway-account-id>` |

### Theme

`primaryColor` and `cssOverride` are the installation's defaults, also set by `PRIMARY_COLOR` and `CSS_OVERRIDES`. Each organisation can replace them on its [Branding](/docs/administering/tenant-management/branding.md#css-overrides) page, which also lists the style variables. `cssOverride` is a JSON object written as a string:

```json
"theme": {
    "primaryColor": "#1e6b52",
    "cssOverride": "{\"--mat-sys-primary\": \"#1e6b52\", \"--link-color\": \"#1F57C3\"}"
}
```

---

## See also

- [Backend configuration](/docs/deployment/configuration/backend/index.md) - The API service
- [Keycloak setup](/docs/deployment/configuration/keycloak.md) - The `webapp` client and its scopes
- [Infrastructure](/docs/deployment/configuration/infrastructure.md#docker) - The `.env` file of the Docker example
- [Branding](/docs/administering/tenant-management/branding.md) - The main colour, logo, and style variables of an organisation
- [Notification Service](/docs/optional-services/notifications/index.md) - Email notification service
- [Annotation Service](/docs/optional-services/annotations.md) - Annotation service overview
<!-- kpi disabled  -->
<!-- - [KPI Service](/docs/optional-services/kpi.md) - Statistics dashboards provided by the KPI service -->

