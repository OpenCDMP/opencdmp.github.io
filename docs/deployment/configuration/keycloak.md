---
sidebar_position: 1
title: Keycloak setup
description: The Keycloak realm that OpenCDMP expects, integration clients, and the environment variables of the Keycloak container
---

# Keycloak setup

OpenCDMP uses [Keycloak](https://www.keycloak.org/) for authentication and for the roles and organisation memberships of its users. It expects a realm with the clients, client scopes, groups, and users described below. The instructions use the admin console of Keycloak 26, the version of the [Docker example](/docs/deployment/install/index.md). The Keycloak server itself (database, host name, proxy) is configured through the [environment variables](#environment-variables) at the end of this page, and [integration clients](#integration-client) let other systems call the API.

## Prerequisites

- Keycloak installed and running.
- Administrative access to the Keycloak admin console.

---

## Recommended: start from the shipped realm export

The Docker example ships a complete realm, `config-files/keycloak/imports/OpenCDMP-realm.json`, which Keycloak imports on its first start (`--import-realm`). For a new installation, import the same file and change what is specific to the example:

1. **Import the realm**: start Keycloak with the file in `/opt/keycloak/data/import/` and the `--import-realm` option, or create the realm from the file in the admin console (**Create realm** > **Resource file**).
2. **Change the client secrets** of `api` (`web_secret`), `annotation`, `notification`, and `plugins` (**Clients** > the client > **Credentials** > **Regenerate**), and set the new values in the configuration of the services that use them (for example `KEYCLOAK_API_CLIENT_SECRET` and the `*_AUTH_CLIENT_SECRET` variables of the [API service](/docs/deployment/configuration/backend/index.md)).
3. **Change the passwords** of the users `opencdmp-admin` and `dmp-keycloak-api` (both `admin` in the export), and set the new password of `dmp-keycloak-api` in `KEYCLOAK_API_PASSWORD`.
4. **Replace the example address** `http://opencdmp.localhost:8180` with your own in the **Root URL**, **Home URL**, **Valid redirect URIs**, and **Web origins** of the `webapp` client and in the **Valid redirect URIs** of the `swagger` client.
5. **Configure email** (**Realm settings** > **Email**) and review registration and email verification (**Realm settings** > **Login**); see [Realm settings](#step-10-configure-realm-settings).

The group ids of an imported realm are the ids in the file, so the `KEYCLOAK_API_*_GROUP_ID` values of the Docker example's `app-test.env` stay valid. The roles and `tenant_role` values of its groups are those described in [Step 7](#step-7-set-up-groups).

---

## How OpenCDMP reads roles and organisations

- **Installation-wide roles** (`Admin`, `InstallationAdmin`, `User`) are client roles of the `api` client. The API service reads them from the token path in `IDP_CLAIMS_ROLES_PATH` (`api.roles`, that is `resource_access.api.roles`).
- **Organisation roles** come from the `tenant_role` attribute of groups, which the `tenant_role` client scope puts into the token as the multivalued `tenant_roles` claim. Each value has the form `<Role>:<tenant-code>`, for example `TenantAdmin:default` or `TenantUser:uporto`. The roles are `TenantAdmin` (Organisation Admin), `TenantUser` (Member), `TenantConfigManager` (Content & Workflow Manager), and `TenantPlanManager` (Template Manager).
- **The API service manages group membership.** It signs in to the Keycloak admin API as `KEYCLOAK_API_USERNAME` and adds users to, or removes them from, the role groups when roles change in OpenCDMP. When an organisation is created, it creates a `tenant-<tenant-code>` subgroup under each organisation role group, with the matching `tenant_role` value. Only the `tenant-default` subgroups of the default organisation must exist beforehand.
- **The `KEYCLOAK_API_*_GROUP_ID` variables** of the API service hold the **ids (UUIDs)** of the role groups, not their names: `KEYCLOAK_API_GLOBAL_USER_GROUP_ID` for `role-user`, `KEYCLOAK_API_GLOBAL_ADMIN_GROUP_ID` for `role-admin`, `KEYCLOAK_API_GLOBAL_INSTALLATION_ADMIN_GROUP_ID` for `role-installation-admin`, `KEYCLOAK_API_TENANT_ADMIN_GROUP_ID` for `tenant-role-admin`, `KEYCLOAK_API_TENANT_USER_GROUP_ID` for `tenant-role-user`, `KEYCLOAK_API_TENANT_CONFIG_MANAGER_GROUP_ID` for `tenant-role-config-manager`, and `KEYCLOAK_API_TENANT_PLAN_MANAGER_GROUP_ID` for `tenant-role-manager`. A group's id is the last part of its address in the admin console (`.../groups/<id>`).

---

## Building the realm by hand

The steps below create the same realm as the shipped export. Client, scope, and group names are the ones the export and the example configuration use; other names work as long as the configuration of the services matches them.

### Step 1: Create a realm

1. Log in to the Keycloak admin console (in the Docker example, `http://opencdmp.localhost:8180/auth/admin/`).
2. Open the realm dropdown at the top of the left menu and click **Create realm**.
3. Enter the **Realm name** (e.g., `OpenCDMP`) and click **Create**.

---

### Step 2: Create OpenID Connect clients

Create the following OpenID Connect clients (**Clients** > **Create client**):

- `api`
- `annotation`
- `notification`
- `plugins`
- `webapp`
- `swagger`

#### General client settings

The **Capability config** page of the wizard holds the following options.

For the **`api`, `annotation`, `notification`, and `plugins` clients**:

- **Client authentication**: **On**
- **Standard flow**: **Off**
- **Direct access grants**: **On**
- **Service accounts roles**: **On**

For the **`swagger` client**:

- **Client authentication**: **Off**
- **Standard flow**: **On**
- **Direct access grants**: **On**
- **Implicit flow**: **On**

For the **`webapp` client**:

- **Client authentication**: **Off**
- **Standard flow**: **On**
- **Direct access grants**: **Off**

#### Client: `api` {#client-api}

1. **Client ID**: `api`; apply the general settings.
2. On the **Roles** tab, click **Create role** and create:
   - `Admin`
   - `User`
   - `InstallationAdmin`

The API service also uses this client to sign in to the Keycloak admin API (`KEYCLOAK_API_CLIENT_ID`) and to the plugins (`*_AUTH_CLIENT_ID`).

#### Client: `annotation`

1. **Client ID**: `annotation`; apply the general settings.
2. On the **Roles** tab, create `Admin` and `User`.

#### Client: `notification`

1. **Client ID**: `notification`; apply the general settings.
2. On the **Roles** tab, create `Admin` and `User`.

#### Client: `plugins`

1. **Client ID**: `plugins`; apply the general settings.
2. On the **Roles** tab, create `app-service`.

The client is the audience that the `plugins` client scope adds, which the plugins check. The Docker example does not sign in with it: the API service requests tokens for the plugins as the `api` client with `scope=plugins` (see [Registering plugin services](/docs/deployment/configuration/plugin-services.md#plugin-tokens)).

#### Client: `webapp`

1. **Client ID**: `webapp`; apply the `webapp` settings.
2. On the **Login settings** page (or later on the **Settings** tab), set:
   - **Root URL** and **Home URL**: `https://<APP_URL>/home`
   - **Valid redirect URIs**: `https://<APP_URL>/*`
   - **Web origins**: `https://<APP_URL>`

#### Client: `swagger` {#client-swagger}

1. **Client ID**: `swagger`; apply the `swagger` settings.
2. Set:
   - **Valid redirect URIs**: `https://<APP_URL>/api/swagger-ui/oauth2-redirect.html` (the value of `SWAGGER_AUTH_REDIRECT_URL`)
   - **Web origins**: `/*`

---

### Step 3: Create realm roles

On **Realm roles**, click **Create role** and create `Admin` and `User`.

---

### Step 4: Create client scopes {#step-4-create-client-scopes}

On **Client scopes**, click **Create client scope** and create the following scopes, each with **Type** **None**, **Protocol** **OpenID Connect**, and **Include in token scope** **On**:

- `api`
- `annotation`
- `notification`
- `plugins`
- `identity_provider`
- `tenant_role`

The audience scopes (`api`, `annotation`, `notification`, `plugins`) are what each service checks in `SECURITY_AUDIENCE`: the API service expects `api`, and the plugins expect `plugins`.

---

### Step 5: Configure mappers for client scopes

#### Audience mappers for `api`, `annotation`, `notification`, and `plugins`

For each of these client scopes:

1. Open the client scope and go to the **Mappers** tab.
2. Click **Configure a new mapper** (or **Add mapper** > **By configuration**) and choose **Audience**.
3. **Name**: `Client Id Audience`
4. **Included Client Audience**: the client of the same name (e.g., `api`)
5. **Add to access token**: **On**; **Add to token introspection**: **On**
6. Click **Save**.

#### Assign roles to client scopes

For the `api`, `annotation`, and `notification` client scopes, open the **Scope** tab, click **Assign role**, and assign the realm roles `Admin` and `User`.

#### User session note mapper for `identity_provider`

1. Open the `identity_provider` client scope, go to the **Mappers** tab, and configure a new **User Session Note** mapper.
2. **Name**: `identity_provider`
3. **User Session Note**: `identity_provider`
4. **Token Claim Name**: `identity_provider`
5. **Claim JSON Type**: **String**
6. **Add to ID token**, **Add to access token**, **Add to userinfo**, **Add to access token response**, and **Add to token introspection**: **On**
7. Click **Save**.

#### User attribute mapper for `tenant_role`

1. Open the `tenant_role` client scope, go to the **Mappers** tab, and configure a new **User Attribute** mapper.
2. **Name**: `Tenant role`
3. **User Attribute**: `tenant_role`
4. **Token Claim Name**: `tenant_roles`
5. **Claim JSON Type**: **String**
6. **Add to ID token**, **Add to access token**, **Add to userinfo**, and **Add to token introspection**: **On**
7. **Multivalued**: **On**
8. **Aggregate attribute values**: **On**. Group attributes reach the user through this option.
9. Click **Save**.

---

### Step 6: Assign client scopes to clients

On **Clients** > the client > **Client scopes**, click **Add client scope**:

| Client | Default client scopes | Optional client scopes |
| --- | --- | --- |
| `api` | (the realm defaults) | `plugins` |
| `webapp` | `identity_provider`, `tenant_role` | `api`, `annotation`, `notification` |
| `swagger` | `api`, `tenant_role` | - |

The webapp requests its optional scopes through `KEYCLOAK_SCOPE` (see the [Docker Compose environment](/docs/deployment/configuration/infrastructure.md#docker)), and the API service requests `plugins` when it calls a plugin (`*_AUTH_SCOPE`).

---

### Step 7: Set up groups

Groups grant the roles. OpenCDMP adds users to these groups and removes them when roles change in the application.

#### Create the root group and its subgroups

On **Groups**, click **Create group** and create `opencdmp-app`. Open it and, on the **Child groups** tab, click **Create child group** for each of the following:

| Group | Role code | Role in the user interface |
| --- | --- | --- |
| `role-admin` | `Admin` | System Administrator |
| `role-installation-admin` | `InstallationAdmin` | Installation Manager |
| `role-user` | `User` | Signed-in User |
| `tenant-role-admin` | `TenantAdmin` | Organisation Admin |
| `tenant-role-user` | `TenantUser` | Member |
| `tenant-role-config-manager` | `TenantConfigManager` | Content & Workflow Manager |
| `tenant-role-manager` | `TenantPlanManager` | Template Manager |

#### Assign client roles to the installation-wide groups

On each group's **Role mapping** tab, click **Assign role**, filter by clients, and assign:

| Group | `api` | `annotation` | `notification` |
| --- | --- | --- | --- |
| `role-admin` | `Admin` | `Admin` | `Admin` |
| `role-installation-admin` | `InstallationAdmin`, `User` | - | `User` |
| `role-user` | `User` | `User` | `User` |

#### Create the default organisation subgroups

Under each organisation role group (`tenant-role-admin`, `tenant-role-user`, `tenant-role-config-manager`, `tenant-role-manager`):

1. On the **Child groups** tab, click **Create child group** and name it `tenant-default`.
2. Open the `tenant-default` subgroup and, on the **Attributes** tab, add the attribute `tenant_role` with the value:
   - under `tenant-role-admin`: `TenantAdmin:default`
   - under `tenant-role-user`: `TenantUser:default`
   - under `tenant-role-config-manager`: `TenantConfigManager:default`
   - under `tenant-role-manager`: `TenantPlanManager:default`
3. Click **Save**.

Put the attribute on the `tenant-default` subgroup only, never on the parent role group: members of a subgroup inherit the attributes of its parents.

Do not create subgroups for other organisations: the API service creates `tenant-<tenant-code>` under each of the four groups when the organisation is created.

---

### Step 8: Set default groups for users

Every new user should be a member of:

- `/opencdmp-app/role-user`
- `/opencdmp-app/tenant-role-user/tenant-default`

On **Realm settings** > **User registration** > **Default groups**, click **Add groups** and select both.

---

### Step 9: Create users

#### Create an administrator

1. On **Users**, click **Add user**.
2. Enter the **Username** (e.g., `admin`), turn **Email verified** on, and click **Create**.
3. On the **Credentials** tab, click **Set password**, enter a password, and turn **Temporary** off.
4. On the **Groups** tab, click **Join groups** and add `/opencdmp-app/role-admin` and `/opencdmp-app/tenant-role-admin/tenant-default`.

#### Create the user of the API service

The API service signs in to the Keycloak admin API with this user to manage group memberships (`KEYCLOAK_API_USERNAME` and `KEYCLOAK_API_PASSWORD`). The shipped export calls it `dmp-keycloak-api`.

1. On **Users**, click **Add user**, enter the **Username** `dmp-keycloak-api`, turn **Email verified** on, and click **Create**.
2. On the **Credentials** tab, set a password with **Temporary** off.
3. On the **Role mapping** tab, click **Assign role**, filter by clients, and assign `realm-management` > `realm-admin`.
4. On the **Groups** tab, join `/opencdmp-app/role-user` and `/opencdmp-app/tenant-role-user/tenant-default`.

---

### Step 10: Configure realm settings

#### Login options

On **Realm settings** > **Login**, set:

- **User registration**: **On**, if users may create their own accounts
- **Verify email**: **On**, if users must confirm their email address

#### Email

On **Realm settings** > **Email**, enter the SMTP settings that Keycloak uses for verification and password emails: **From**, **Host**, **Port**, **Encryption**, and **Authentication**.

---

### Step 11: Configure identity providers (optional)

1. On **Identity providers**, choose the provider to add (e.g., **Google**, **Microsoft**, or a generic **OpenID Connect** or **SAML** provider).
2. Enter the credentials and settings that the provider gave you.
3. Click **Add**.

---

## Conclusion

Replace `<APP_URL>` with the address of your installation throughout, and check that the issuer URL of the realm matches `IDP_ISSUER_URI` in the configuration of every service.

To let an external application call the API, create an [integration client](#integration-client).

---

## Create an integration client {#integration-client}

An integration client lets another system, such as a research information system or a reporting script, call the OpenCDMP API without a user, with the OAuth2 Client Credentials flow. OpenCDMP treats the client's service account like a user: it creates an OpenCDMP account for it on the first call and takes its roles and organisation memberships from the token. The developer side of the flow is described in [Integrating with OpenCDMP](/docs/developers/integration.md).

Create one client per integrating system, so that each can be revoked on its own. Do not hand out the secret of the `api` client: the API service signs in with it to the Keycloak admin API and to the plugins.

1. **Create the client**: on **Clients**, click **Create client** and enter a **Client ID**, for example `cris-integration`. On the **Capability config** page, set **Client authentication** **On**, **Service accounts roles** **On**, **Standard flow** **Off**, and **Direct access grants** **Off**, then click **Save**.
2. **Copy the secret**: the client's **Credentials** tab shows the **Client secret**. Pass it to the integrator over a secure channel.
3. **Add the client scopes**: on the client's **Client scopes** tab, click **Add client scope** and add:
   - `api`, as **Default**, or as **Optional** if the integrator requests it with `scope=api`. It adds the `api` audience that the API service checks (`SECURITY_AUDIENCE`).
   - `tenant_role`, as **Default**. It adds the `tenant_roles` claim with the organisation memberships.
4. **Grant the roles through groups**: on the client's **Service accounts roles** tab, follow the link to the service account user (`service-account-<client-id>`), open its **Groups** tab, click **Join group**, and add:
   - `/opencdmp-app/role-user`, which grants the `User` role of the `api` client;
   - for each organisation the client works in, the `tenant-<tenant-code>` subgroup of the organisation role it needs, for example `/opencdmp-app/tenant-role-user/tenant-uporto` to make it a Member of the organisation `uporto`. The API service creates these subgroups when the organisation is created.

   Grant the smallest role that covers the integration. Avoid `role-admin`, which makes the client a System Administrator in every organisation.
5. **Check a token**:

   ```bash
   curl -s -X POST 'https://opencdmp.example.org/auth/realms/OpenCDMP/protocol/openid-connect/token' \
     -d grant_type=client_credentials \
     -d client_id=cris-integration \
     -d 'client_secret=<client-secret>' \
     -d scope=api \
     | jq -r .access_token \
     | jq -R 'split(".")[1] | gsub("-"; "+") | gsub("_"; "/") | @base64d | fromjson | {aud, resource_access, tenant_roles}'
   ```

   `aud` must contain `api`, `resource_access.api.roles` must list `User`, and `tenant_roles` must list the organisations, for example `TenantUser:uporto`.

To revoke the access, turn the client off (**Enabled** on its **Settings** tab) or regenerate its secret.

---

## Environment variables {#environment-variables}

The Keycloak container is configured through Keycloak's own environment variables, which the Docker example sets in [`config-files/keycloak/keycloak.env`](https://github.com/OpenCDMP/docker-deployment/tree/main/config-files/keycloak). See the [Keycloak configuration guide](https://www.keycloak.org/server/all-config) for the full list. The example starts Keycloak in development mode; for the settings of a production server, see [Run Keycloak in production mode](/docs/deployment/install/production.md#run-keycloak-in-production-mode).

### Database

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KC_DB` | Database vendor. | Yes | `dev-file` | `postgres` |
| `KC_DB_URL_HOST` | Database server host. | Yes | - | `opencdmp.postgres` |
| `KC_DB_PORT` | Database server port. | No | `5432` | `5432` |
| `KC_DB_URL_DATABASE` | Keycloak database name. | Yes | - | `keycloak` |
| `KC_DB_SCHEMA` | Database schema. | No | - | `public` |
| `KC_DB_USERNAME` | Keycloak database user. The example uses the PostgreSQL superuser `postgres`. | Yes | - | `keycloak` |
| `KC_DB_PASSWORD` | Keycloak database password. | Yes | - | `<keycloak-db-password>` |

### Initial administrator

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KC_BOOTSTRAP_ADMIN_USERNAME` | Username of the temporary administrator of the `master` realm, created on the first start. | Yes¹ | - | `keycloak-admin` |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | Password of that administrator. | Yes¹ | - | `<admin-password>` |
| `KEYCLOAK_ADMIN` | Older name of `KC_BOOTSTRAP_ADMIN_USERNAME`, deprecated since Keycloak 26, which still accepts it with a warning. | No | - | `keycloak-admin` |
| `KEYCLOAK_ADMIN_PASSWORD` | Older name of `KC_BOOTSTRAP_ADMIN_PASSWORD`, deprecated since Keycloak 26. | No | - | `<admin-password>` |

¹ Required on the first start, to sign in to the admin console. The Docker example sets `keycloak-admin` / `admin`. Keycloak reads the pair only when it creates the `master` realm; afterwards, create a permanent administrator in the admin console and delete the temporary one.

### Host name and HTTP

| Env Variable | Description | Required | Default Value | Example |
| --- | --- | --- | --- | --- |
| `KC_HOSTNAME` | Public URL of Keycloak, including the relative path. Tokens carry it in their issuer, so it must match `IDP_ISSUER_URI` (without `/realms/<realm>`) in every OpenCDMP service. | Yes | - | `https://opencdmp.example.org/auth/` |
| `KC_HOSTNAME_ADMIN` | Public URL of the admin console, when it differs from `KC_HOSTNAME`. | No | `KC_HOSTNAME` | `https://opencdmp.example.org/auth/` |
| `KC_HOSTNAME_STRICT` | When `true`, Keycloak answers only on `KC_HOSTNAME`. The example sets `false`. | No | `true` | `true` |
| `KC_HTTP_RELATIVE_PATH` | Path under which Keycloak serves its pages and endpoints. The Docker example serves Keycloak under `/auth` through its proxy. | No | `/` | `/auth` |
| `KC_HTTP_ENABLED` | Enables plain HTTP. Needed when a reverse proxy terminates TLS and forwards plain HTTP to Keycloak. | No | `false` | `true` |
| `KC_PROXY_HEADERS` | Proxy headers that Keycloak trusts to learn the original host and scheme. | Yes² | - | `xforwarded` |
| `KC_TRANSACTION_XA_ENABLED` | Enables XA transactions. | No | `false` | `false` |
| `KC_HEALTH_ENABLED` | Enables the health endpoints on the management port (`9000`), used by the health check of the Docker example (`/auth/health/ready`). | No | `false` | `true` |
| `KC_METRICS_ENABLED` | Enables the metrics endpoint on the management port. | No | `false` | `true` |

² Required when Keycloak runs behind a reverse proxy, as in the Docker example.

:::warning
The Docker example starts Keycloak with `start-dev`, the development mode. For production, start Keycloak with `start` behind a TLS-terminating proxy; see [Run Keycloak in production mode](/docs/deployment/install/production.md#run-keycloak-in-production-mode) and the [Keycloak server guides](https://www.keycloak.org/guides#server).
:::

---

## See also

- [Before going to production](/docs/deployment/install/production.md) - Client secrets, realm users, and Keycloak in production mode
- [Registering plugin services](/docs/deployment/configuration/plugin-services.md) - The `plugins` scope and the tokens the API service sends to plugins
- [Integrating with OpenCDMP](/docs/developers/integration.md) - OAuth2 flows for API clients
- [Backend configuration](/docs/deployment/configuration/backend/index.md#keycloak-api-configuration) - `KEYCLOAK_API_*` settings of the API service
- [Keycloak documentation](https://www.keycloak.org/documentation)
- [Keycloak server administration guide: OpenID Connect clients](https://www.keycloak.org/docs/latest/server_admin/#_oidc_clients)
- [Keycloak server administration guide: client scopes](https://www.keycloak.org/docs/latest/server_admin/#_client_scopes)
