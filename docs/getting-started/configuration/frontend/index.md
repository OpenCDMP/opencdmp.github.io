# Frontend Services Configuration

import DocCardList from '@theme/DocCardList';

This document provides an overview of the configuration settings for the frontend of OpenCDMP, based on their `config.json` file structure. 

The following table's environment variables are defined inside the `.env` file of the Docker configuration. The frontend container reads them at runtime to populate its `config.json`, which drives the web application's behavior. If you want to see the full Docker configuration, you can navigate [here](getting-started/configuration/infrastructure/docker.md).

### Core Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `WEBAPP_API_URL` | Server API URL | Yes | - | `https://<hostname>:<port>/<api-path>/` |
| `INSTALLATION_URL` | Installation base URL | Yes | - | `https://<hostname>:<port>/` |
| `DEFAULT_CULTURE` | Default app culture, in ISO639 format | Yes | - | `en` |

### Keycloak Authentication

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KEYCLOAK_ADDRESS` | Keycloak server URL string | Yes | - | `https://<keycloak-hostname>:<port>` |
| `KEYCLOAK_REALM` | Keycloak realm name | Yes | - | `opencdmp` |
| `KEYCLOAK_CLIENT_ID` | Keycloak client name | Yes | - | `webapp` |
| `KEYCLOAK_SCOPE` | Keycloak scope parameters | Yes | - | `openid <scope-value-1> <scope-value-2>` |
<!-- kpi disabled -->
<!-- ### KPI Service Configuration

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KPI_SERVICE_ENABLED` | Boolean value that enables KPI service (Statistics dashboard) | No | `false` | `true` |
| `KPI_SERVICE_ADDRESS` | KPI service URL | Yes* | - | `http://<hostname>:<port>/<kpi-path>` |
| `KPI_SERVICE_DASHBOARD_ID` | KPI (Statistics) dashboard Id | Yes* | - | `<dashboard-id>` |
| `KPI_SERVICE_KEYWORD_FILTER` | Filtering keywords for the KPI dashboard | No | - | `<filter-value-code>` | 

*Required only if `KPI_SERVICE_ENABLED` is set to `true`
-->
<!-- accounting disabled
### Supplementary Services

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `ACCOUNTING_SERVICE_ENABLED` | Boolean value that enables accounting service | No | `false` | `true` |-->

### Logging

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `LOGGING_ENABLED` | Boolean value that enables logging service | No | `false` | `true` | -->

## Overrides

You can also override `config.json` values via creating a new `config-override.json` file, which defines the values that will be overriden.
`config-override.json` configured values are **not mandatory** and take precedence over other env variables.
The file structure is as follows:


### [Notifications](optional-services/notifications/index.md)
```
"notification_service": {
    "address": {NOTIFICATION_SERVICE_ADDRESS}
}
```
| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `address` | Notification service URL string | No | `null` | `http://<hostname>:<port>/<path>` |

### [Annotations](optional-services/annotations.md)
```
"annotation_service": {
    "address": {ANNOTATION_SERVICE_ADDRESS}
}
```
| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `address` | Annotation service URL string | No | `null` | `http://<hostname>:<port>/<path>` |

### Logging

If `LOGGING_ENABLED` is true you can define the levels of the frontend logging.
```
"logging": {
    "logLevels": {LOG_LEVELS}
}
```
| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `logLevels` | array of levels | No | `["debug", "info", "warning", "error"]` | `["debug"]` |

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

| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `title` | Page title | Yes | - | `page-title` |
| `routerPath` | Internal path to the page | Yes* | - | `/<relative-route>` |
| `externalUrl` | URL that leads to external view | Yes** | - | `http://<base-route>/<route>` |
| `accessLevel` | Access level of users allowed to view page | Yes | - | `authenticated` |
| `icon` | Sidebar menu **material symbol icon** that appears next to the title | No | - | `feedback` |

*Required if not using `externalUrl`
**Required if not using `routerPath`

### Authorization Providers 
Authorization Providers are used to set an icon next to email in [My Profile Page](user-guide/profile-settings.md). You can set a default auth provider for all emails or a specific icon based on the email provider that comes from [keycloak](getting-started/configuration/keycloak.md). If provider do not exist in keycloak, default provider is used.

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
| `name` | provider name | Yes | - | `google` |
| `providerClass` | style class to be applied | Yes | - | `googleIcon` |
| `cultures` | list of supported cultures in ISO639 format | Yes | - | `["en"]` |

### UserWay

UserWay is an accessibility plugin that OpenCDMP uses. More details [here](https://userway.org/).

```
"userWay": {
    "id": {USERWAY_ID}
}
```
| Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `id` | String identifier provided by UserWay to enable the accessibility feature. | No | - | `<UserWay_id>` |

### Theme

The application supports theme customization. A full explanation of all available theme values can be found in the [theming guide](getting-started/configuration/frontend/theming.md).

```
"theme": {
    "primaryColor": {PRIMARY_COLOR},
    "cssOverride": {CSS_OVERRIDES}
}
```

---

## See Also

- [Backend Configuration](getting-started/configuration/backend/index.md) - Core backend service configuration
- [Keycloak Configuration](/getting-started/configuration/keycloak/) - Authentication and authorization setup
- [Docker Configuration](getting-started/configuration/infrastructure/docker.md) - Full Docker configuration
- [Theming Guide](theming.md) - Customize the application theme
- [Notification Service](optional-services/notifications/index.md) - Email notification service
- [Annotation Service](optional-services/annotations.md) - Annotation service overview

---

<DocCardList />