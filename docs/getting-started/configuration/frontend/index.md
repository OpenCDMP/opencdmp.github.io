# Frontend Services Configuration

import DocCardList from '@theme/DocCardList';

This document provides an overview of the configuration settings for the frontend of OpenCDMP, based on their `config.json` file structure.

| Env Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `WEBAPP_API_URL` | Server API URL | - | `https://<hostname>:<port>/<api-path>/` |
| `INSTALLATION_URL` | Installation base URL | - | `https://<hostname>:<port>/` |
| `DEFAULT_CULTURE` | Default app culture, in ISO639 format | - | `en` |
| `KEYCLOAK_ADDRESS` | Keycloak server URL string | - | `https://<keycloak-hostname>:<port>` |
| `KEYCLOAK_REALM` | Keycloak realm name | - | `opencdmp` |
| `KEYCLOAK_CLIENT_ID` | Keycloak client name | - | `webapp` |
| `KEYCLOAK_SCOPE` | Keycloak scope parameters | - | `openid <scope-value-1> <scope-value-2>` |
| `KPI_SERVICE_ENABLED` | Boolean value that enables KPI service (Statistics dashboard) | `false` | `true` |
| `KPI_SERVICE_ADDRESS` | KPI service URL | - | `http://<hostname>:<port>/<kpi-path>` |
| `KPI_SERVICE_DASHBOARD_ID` | KPI (Statistics) dashboard Id | - | `<dashboard-id>` |
| `KPI_SERVICE_KEYWORD_FILTER` | Filtering keyboards for the KPI dashboard | - | `<filter-value-code>` |
| `ACCOUNTING_SERVICE_ENABLED` | Boolean value that enables accounting service | `false` | `true` |
| `LOGGING_ENABLED` | Boolean value that enables logging service | `false` | `true` |

## Overrides

You can also override `config.json` values via creating a new `config-overrides.json` file, which defines the values that will be overriden.
`config-overrides.json` configured values are not mandatory and take precedence over other env variables.
The file structure is as follows:


### [Notifications](/docs/supplementary-services/notifications/index.md)
```
"notification_service": {
    "address": {NOTIFICATION_SERVICE_ADDRESS}
}
```
| Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `address` | Notification service URL string | `null` | `http://<hostname>:<port>/<path>` |

### Logging
```
"logging": {
    "logLevels": {LOG_LEVELS}
}
```
| Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `logLevels` | array of levels | `["debug", "info", "warning", "error"]` | `["debug"]` |

### Sidebar menu

**Default:**
```
"sidebar": {
    "infoItems": [
        {
            "title": "SIDE-BAR.SUPPORT",
            "icon": "help",
            "externalUrl": "/splash/contact.html",
            "accessLevel": "unauthenticated"
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

| Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `title` | Page title | - | `page-title` | 
| `routerPath` | Internal path to the page | - | `/<relative-route>` |
| `externalUrl` | url that leads to external view | - | `http://<base-route>/<route>` |
| `accessLevel` | Access level of users allowed to view page | - | `authenticated` |
| `icon` | Sidebar menu **material symbol icon** that appears next to the title | - | `feedback` |

### Authorization Providers 
Authorization Providers are used to set an icon next to email in [My Profile Page](/docs/application/profile-settings.md). You can set a default auth provider for all emails or a specific icon based on the email provider that comes from [keycloak](/docs/getting-started/configuration/keycloak.md). If provider don't exist in keycloak, default provider is used.

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

| Variable | Description | Default Value | Example |
| --- | --- | --- | --- |
| `name` | provider name | - | `google` | 
| `providerClass` | style class to be applied | - | `googleIcon` |
| `cultures` | list of supported cultures in ISO639 format | - | `["en"]` |


<DocCardList />