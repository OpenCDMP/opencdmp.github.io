---
sidebar_position: 2
title: Deposit plugin
description: Build a deposit service that publishes plans to a repository - the DepositClient and DepositController contract, configuration, authentication, organisation settings, and deployment
---

# Deposit

:::info
[Repository Deposit Base](https://mvnrepository.com/artifact/org.opencdmp/repository-deposit-base) is a **Maven package** that provides the base interfaces and configuration classes required to implement repository deposit services for the **OpenCDMP** platform. Each deposit service is an independent Spring Boot microservice that OpenCDMP calls to support [depositing Plans](/docs/using/plans/deposit-a-plan.md) to an external repository for **DOI assignment**.
:::

## How it works

When a user deposits a plan to a repository, the OpenCDMP backend:

1. Checks that the organisation allows the account the user chose (see [Organisation settings read by the platform](#organisation-settings-read-by-the-platform)) and, when the user chose their own account, that credentials were given or saved in their profile. Otherwise it refuses the deposit without calling your service.
2. Builds only the files your service uploads (see `uploadedFiles` in [DepositConfiguration](#4-depositconfiguration)), narrowed by the organisation's **Files to deposit** setting.
3. Serializes the plan into a [`PlanModel`](/docs/developers/plugins/common-models.md#planmodel) from the Common Models package. The plan blueprint's plugin configuration (`planModel.getPlanBlueprint().getDefinition().getPlugins()`) carries the organisation's settings for your plugin, with secrets decrypted.
4. Wraps it in a `PlanDepositModel` alongside the user's authentication info (`AuthInfo`).
5. Calls `POST /api/deposit` on your microservice.
6. Expects a DOI string back as the response.

Your service is responsible for everything in between: authenticating with the repository, uploading files, publishing the record, and returning the minted DOI.

:::warning
The model passed to your service carries decrypted credentials, both in `AuthInfo` and in the organisation's plugin settings. Never log the deposit request.
:::

If your service declares `supportsPreview` (see [DepositConfiguration](#4-depositconfiguration)), the user first sees a **review dialog** before the deposit is submitted; see [Deposit preview and metadata review](/docs/developers/plugins/deposit-preview.md).

---

## Key interfaces and classes

:::info
`PlanModel` is part of the [Common Models](/docs/developers/plugins/common-models.md) package.
:::

### 1. DepositClient

This interface defines the business logic operations your deposit service must implement.

```java
public interface DepositClient {

    // Deposit the plan to the repository. Returns the minted DOI.
    // If planDepositModel carries edited fields/groups from the review dialog,
    // apply them on top of your own mapping before submitting.
    String deposit(PlanDepositModel planDepositModel);

    // Optional — build a preview descriptor of the metadata that would be deposited,
    // without submitting anything to the repository. Only called when your
    // DepositConfiguration declares supportsPreview. Default throws
    // UnsupportedOperationException.
    default DepositPreviewModel preview(PlanDepositModel planDepositModel) {
        throw new UnsupportedOperationException("preview not supported");
    }

    // Optional — search the repository's controlled vocabulary backing a preview
    // field (e.g. licenses, languages). Only called for fields whose descriptor
    // declares vocabSearch. Default throws UnsupportedOperationException.
    default List<PreviewFieldOption> searchVocabulary(String fieldCode, String like) {
        throw new UnsupportedOperationException("vocabulary search not supported");
    }

    // Exchange an OAuth2 authorization code for an access token.
    // Called during the OAuth2 redirect flow. Returns the access token.
    String authenticate(String code);

    // Return this service's capabilities and repository connection details.
    DepositConfiguration getConfiguration();

    // Return the repository logo as a base64-encoded string, or null if none.
    String getLogo();
}
```

### 2. DepositController

This interface defines the REST API endpoints your microservice must expose. Implement it as a `@RestController` and delegate to your `DepositClient`.

```java
@RequestMapping("/api/deposit")
public interface DepositController {

    @PostMapping()
    String deposit(@RequestBody PlanDepositModel planDepositModel);

    // Optional — same contract as DepositClient.preview(); default throws
    // UnsupportedOperationException if you do not implement it.
    @PostMapping("/preview")
    default DepositPreviewModel preview(@RequestBody PlanDepositModel planDepositModel) {
        throw new UnsupportedOperationException("preview not supported");
    }

    // Optional — same contract as DepositClient.searchVocabulary().
    @GetMapping("/vocab/{fieldCode}")
    default List<PreviewFieldOption> searchVocabulary(@PathVariable("fieldCode") String fieldCode, @RequestParam(value = "like", required = false) String like) {
        throw new UnsupportedOperationException("vocabulary search not supported");
    }

    @GetMapping("/authenticate")
    String authenticate(@RequestParam("authToken") String code);

    @GetMapping("/configuration")
    DepositConfiguration getConfiguration();

    @GetMapping("/logo")
    String getLogo();
}
```

### 3. PlanDepositModel

The input to `deposit()` and `preview()`: the plan data, the user's credentials, and, once a preview round-trip has happened, the user's edits.

```java
public class PlanDepositModel {
    private PlanModel planModel;  // The full plan to deposit
    private AuthInfo authInfo;    // Authentication credentials for the repository (not required for preview)

    // Values the user changed in the review dialog for flat fields — apply on
    // top of your own mapping in deposit(). Null/absent on a plain deposit
    // with no review step.
    private List<PreviewFieldValue> editedFields;

    // Whole-list replacements the user confirmed for repeatable groups
    // (e.g. creators, funding) — see PreviewGroupValuesModel below.
    private List<PreviewGroupValuesModel> editedGroups;

    // Overrides persisted from an earlier preview/deposit of the same plan
    // line, sent back on the next preview() call so you can re-merge them —
    // see DepositPreviewMergeHelper below.
    private List<StoredPreviewFieldModel> storedFields;
    private List<PreviewGroupValuesModel> storedGroups;
}
```

**`AuthInfo`** carries the credentials needed to authenticate with the repository. Which fields are populated depends on the `authMethods` your service declares:

```java
public class AuthInfo {
    // An OAuth2 access token (populated when using oAuth2Flow or AuthInfoFromUserProfile)
    private String authToken;

    // Additional credentials from the user's profile (e.g., API key, username/password)
    // Each entry's code matches a ConfigurationField.code declared in userConfigurationFields
    private List<PluginUserFieldModel> authFields;
}
```

### 4. DepositConfiguration

Return this from `getConfiguration()` to describe the repository and how the platform should interact with it.

```java
public class DepositConfiguration {

    // Unique identifier for this deposit service (e.g. "zenodo", "dataverse")
    private String repositoryId;

    // Older field, replaced by authMethods — see DepositType below
    private DepositType depositType;

    // The installation's access token, for the plugin's own use; the platform does not read it
    private String accessToken;

    // Base URL of the repository (displayed in the UI)
    private String repositoryUrl;

    // URL template for viewing a deposited record — use {0} as a placeholder for the DOI
    private String repositoryRecordUrl;

    // OAuth2 endpoints (required when authMethods includes oAuth2Flow)
    private String repositoryAuthorizationUrl;  // Authorization endpoint
    private String repositoryAccessTokenUrl;    // Token exchange endpoint
    private String repositoryClientId;
    private String repositoryClientSecret;
    private String redirectUri;                 // OAuth2 redirect back to OpenCDMP

    // Whether to use shared file storage for file access
    private boolean useSharedStorage;

    // Whether this service provides a logo via getLogo()
    private boolean hasLogo;

    // Whether this service implements preview() — shows the user a review
    // dialog before deposit. See Preview and Metadata Review below.
    private boolean supportsPreview;

    // Admin-level configuration fields (e.g. community ID, collection handle)
    private List<ConfigurationField> configurationFields;

    // User-level configuration fields (e.g. personal API key, username)
    private List<ConfigurationField> userConfigurationFields;

    // Which authentication methods this service supports — see DepositAuthMethod below
    private List<DepositAuthMethod> authMethods;

    // Optional: the semantic keys this service reads — see Semantics Manifest Models in Common Models
    private SemanticsManifest semantics;

    // The files this service uploads; the platform builds only these. Empty or null means all of them.
    private List<DepositFileKind> uploadedFiles;

    // The scope the platform asks for when users sign in to the repository (oAuth2Flow)
    private String oauthScope;
}
```

Publishing a `semantics` manifest lets the blueprint and asset template editors suggest your repository's keys (for example `zenodo.*`) and show what your service will send from a given structure. See [Semantics Manifest Models](/docs/developers/plugins/common-models.md#semantics-manifest-models).

#### DepositType

An older field that `authMethods` replaces: the platform decides how a deposit signs in from `authMethods` alone. Existing services may still set it:

| Value | Meaning |
|-------|---------|
| `SystemDeposit` | Deposits under one shared account. |
| `UserDeposit` | Deposits under each user's own account. |
| `BothWaysDeposit` | Either of the two. |

#### DepositAuthMethod

Declares which authentication options are available to the user:

| Value | Meaning |
|-------|---------|
| `PluginDefault` | Publish under the organisation's account. `AuthInfo` is empty: use the organisation's credentials from your plugin settings (for example an `organisation-access-token` configuration field), else the installation's `accessToken` in `DepositConfiguration`. Shown to users as **The organisation's [repository] account**. |
| `AuthInfoFromUserProfile` | Publish under the user's own account with the credentials of your `userConfigurationFields` marked `authInfo`, saved in the user's profile or typed in the publish dialog. The platform refuses the deposit when any of them is missing. |
| `oAuth2Flow` | Publish under the user's own account after an OAuth2 authorization code flow: the user signs in to the repository in a pop-up, and `AuthInfo.authToken` carries the token. Offered only when `repositoryAuthorizationUrl` is set. |

The organisation's **Ways to publish** setting can withdraw `PluginDefault`, or the two user-account methods, from what you declare.

#### DepositFileKind

The files the platform can build for a deposit:

| Value | File | Property on `PlanModel` |
|-------|------|-------------------------|
| `PlanDocument` (0) | The plan as PDF, from the repository's **Transformer for the PDF copy** | `pdfFile` |
| `RdaJson` (1) | The plan as RDA maDMP JSON, from the **Transformer for the machine-readable copy** | `rdaJsonFile` |
| `SupportingFiles` (2) | A ZIP archive of the files uploaded in the plan and its assets; only when there are any | `supportingFilesZip` |

A file your service does not list in `uploadedFiles`, or that the organisation left out, is `null` on the `PlanModel`. Users see the list, and can download each file, in the publish dialog before they publish.

### 5. CustomFieldProperties

An optional helper for repositories whose metadata schema includes repository-specific custom fields (used, for example, by the CKAN deposit service). Each `CustomField` maps a `code` to a JSON path (`jPath`) in the repository's request payload, with a `dataType` describing how to serialize the value:

```java
public class CustomFieldProperties {
    private List<CustomField> customFields;

    public static class CustomField {
        private String code;
        private String jPath;
        private DataType dataType;  // repository-deposit-base's own enum — see below
        private boolean isArray;
    }
}
```

#### DataType (repository-deposit-base)

:::note
This `DataType` belongs to the `org.opencdmp.depositbase.enums` package. It is distinct from [common-models' `DataType`](/docs/developers/plugins/common-models.md#key-enums), which describes `ConfigurationField` types.
:::

| Value | Meaning |
|-------|---------|
| `String` (0) | Text value |
| `Boolean` (1) | True/false value |
| `Integer` (2) | Whole number |
| `Long` (3) | Large whole number |
| `Double` (4) | Decimal number |

### 6. DepositPluginSettings

A helper in `repository-deposit-base` (`org.opencdmp.depositbase.repository.DepositPluginSettings`, from version `2.0.0`) that reads your plugin's settings for one deposit: the `defaultValue` of each of your `configurationFields`, overridden by the values the organisation set on its [organisation settings](/docs/administering/tenant-management/plugins.md#repositories) page. Blank values never override.

```java
DepositPluginSettings settings = DepositPluginSettings.of(planDepositModel, this.getConfiguration());
String community = settings.text("community", properties.getCommunity()); // the organisation's value, else the installation's
```

| Method | Returns |
|---|---|
| `text(code)` / `text(code, fallback)` | The value, or `null` / the fallback when nobody set one |
| `list(code)` | A comma-separated setting as a list of codes (`"a, b=Renamed"` gives `a`, `b`) |
| `bool(code, fallback)` | A `"true"` / `"false"` setting |
| `authors(users)` | The plan members to credit as authors, following `authors-from-members` |
| `linkPublicPlan()` | Whether to link a public plan's OpenCDMP page from the record (`link-public-plan`, default `true`) |
| `depositFiles(uploaded)` | The organisation's `deposit-files` choice within the files you upload |
| `isHidden(sectionCode)` / `isLocked(settingCode)` | Whether a review section is hidden (`review-hidden-sections`), or a record default locked (`review-locked`) |

Declare the well-known settings as `configurationFields` (with `group`, `label`, `description`, `defaultValue`, and `options`) so that organisations can set them. Fields marked `authInfo` (such as the organisation's access token or password) are stored encrypted and never shown again to administrators.

#### Organisation settings read by the platform

| Code | Values | Effect |
|---|---|---|
| `publish-ways` | `both` (default), `organisation`, `own` | Which accounts users may publish under; the platform drops the other authentication methods |
| `publish-preselected` | `own` (default), `organisation` | The account selected in the publish dialog when both are allowed |
| `organisation-account-name` | Text | The name users see for the organisation's account |
| `deposit-files` | `DepositFileKind` names, comma-separated | The files to deposit, a subset of `uploadedFiles`; empty means all of them |

#### Settings read by your plugin

| Code | Meaning |
|---|---|
| `authors-from-members` | Which plan members are credited as authors: `all` (default), `contributors` (owners and asset contributors), `owners`, or `none` |
| `link-public-plan` | Whether a public plan's OpenCDMP page is added to the record |
| `review-hidden-sections` | Preview group codes to remove from the preview; their mapped values are still deposited |
| `review-locked` | Setting codes whose preview fields you mark `System` (read-only), and whose edits you ignore in `deposit()` |

Codes for the organisation's credentials (such as `organisation-access-token`, or `organisation-username` and `organisation-password`) and for the record defaults are your own; the reference implementations share the same names.

---

## Preview and metadata review {#preview-and-metadata-review}

A deposit service may let the user review and edit the metadata before it is sent to the repository. A service that declares `supportsPreview` in its `DepositConfiguration` implements `preview()` (`POST /api/deposit/preview`) and, for fields backed by a controlled vocabulary, `searchVocabulary()` (`GET /api/deposit/vocab/{fieldCode}`), and applies the user's edits in `deposit()`. The contract, its models, and an example implementation are described in [Deposit preview and metadata review](/docs/developers/plugins/deposit-preview.md).

---

## How to create a custom deposit service

### Prerequisites

- Java 21+
- Spring Boot 4 (the reference implementations use 4.0)
- Maven 3.6+

### Step 1 — Create a Spring Boot project

:::info Versions
Use the latest release of `repository-deposit-base` and `common-models` from [Maven Central](https://central.sonatype.com/namespace/org.opencdmp). The contract described here, including the preview contract and `DepositPluginSettings`, ships with the 2.0 release. Define the `opencdmp.plugin-base.version` and `opencdmp.common-models.version` properties of the snippet below in the `<properties>` of your `pom.xml`. The reference implementations build on Spring Boot 4.0 and Java 21.
:::

Add the following dependencies to your `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>org.opencdmp</groupId>
        <artifactId>repository-deposit-base</artifactId>
        <version>${opencdmp.plugin-base.version}</version>
    </dependency>

    <dependency>
        <groupId>org.opencdmp</groupId>
        <artifactId>common-models</artifactId>
        <version>${opencdmp.common-models.version}</version>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

### Step 2 — Implement DepositClient

Create a `@Service` class that implements the deposit logic:

```java
@Service
public class MyRepositoryDepositService implements DepositClient {

    @Override
    public DepositConfiguration getConfiguration() {
        DepositConfiguration config = new DepositConfiguration();
        config.setRepositoryId("my-repository");
        config.setRepositoryUrl("https://myrepository.example.com");
        config.setRepositoryRecordUrl("https://myrepository.example.com/records/{0}");
        config.setDepositType(DepositType.BothWaysDeposit);
        config.setHasLogo(true);

        // Declare supported authentication methods
        config.setAuthMethods(List.of(
            DepositAuthMethod.PluginDefault,
            DepositAuthMethod.oAuth2Flow
        ));

        // OAuth2 endpoints (if oAuth2Flow is supported)
        config.setRepositoryAuthorizationUrl("https://myrepository.example.com/oauth/authorize");
        config.setRepositoryAccessTokenUrl("https://myrepository.example.com/oauth/token");
        config.setRepositoryClientId("my-client-id");
        config.setRepositoryClientSecret("my-client-secret");
        config.setRedirectUri("https://opencdmp.example.com/deposit/callback");

        // Optional: admin-level config fields (e.g. community/collection)
        ConfigurationField communityField = new ConfigurationField();
        communityField.setCode("communityId");
        communityField.setLabel("Community ID");
        communityField.setType(DataType.String);
        config.setConfigurationFields(List.of(communityField));

        return config;
    }

    @Override
    public String deposit(PlanDepositModel depositModel) {
        PlanModel plan = depositModel.getPlanModel();
        AuthInfo authInfo = depositModel.getAuthInfo();

        // Resolve the access token: the user's (oAuth2Flow) when given; otherwise this is a
        // PluginDefault deposit, so use the organisation's token, else the installation's.
        // The platform never sends an own-account deposit without the user's credentials.
        String accessToken = authInfo != null ? authInfo.getAuthToken() : null;
        if (accessToken == null || accessToken.isBlank()) {
            DepositPluginSettings settings = DepositPluginSettings.of(depositModel, getConfiguration());
            accessToken = settings.text("organisation-access-token", getConfiguration().getAccessToken());
        }

        // Get any user-configured fields (e.g. personal API key)
        String apiKey = null;
        if (authInfo.getAuthFields() != null) {
            apiKey = authInfo.getAuthFields().stream()
                .filter(f -> "apiKey".equals(f.getCode()))
                .map(PluginUserFieldModel::getTextValue)
                .findFirst().orElse(null);
        }

        // Build the HTTP client
        WebClient client = WebClient.builder()
            .baseUrl("https://myrepository.example.com/api")
            .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
            .build();

        // Step 1: Create a new deposit record
        String depositId = createRecord(client, plan);

        // Step 2: Upload files (PDF, RDA JSON, etc.)
        if (plan.getPdfFile() != null) {
            uploadFile(client, depositId, plan.getPdfFile());
        }
        if (plan.getRdaJsonFile() != null) {
            uploadFile(client, depositId, plan.getRdaJsonFile());
        }

        // Step 3: Publish and return the DOI
        return publish(client, depositId);
    }

    @Override
    public String authenticate(String code) {
        // Exchange authorization code for access token via OAuth2
        WebClient client = WebClient.create();
        Map<String, String> response = client.post()
            .uri(getConfiguration().getRepositoryAccessTokenUrl())
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .bodyValue("grant_type=authorization_code"
                + "&code=" + code
                + "&client_id=" + getConfiguration().getRepositoryClientId()
                + "&client_secret=" + getConfiguration().getRepositoryClientSecret()
                + "&redirect_uri=" + getConfiguration().getRedirectUri())
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {})
            .block();

        return response != null ? response.get("access_token") : null;
    }

    @Override
    public String getLogo() {
        // Return the logo as a base64-encoded string
        try (InputStream is = getClass().getResourceAsStream("/logo.png")) {
            if (is == null) return null;
            byte[] bytes = is.readAllBytes();
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(bytes);
        } catch (IOException e) {
            return null;
        }
    }

    private String createRecord(WebClient client, PlanModel plan) {
        // POST metadata to create a draft record — repository-specific
        // Return the record/deposit ID
        return "deposit-id";
    }

    private void uploadFile(WebClient client, String depositId, FileEnvelopeModel file) {
        // Upload the file bytes to the draft record — repository-specific
    }

    private String publish(WebClient client, String depositId) {
        // Publish the draft and return the DOI string
        return "10.5281/zenodo.0000000";
    }
}
```

#### Handling plan versioning

If the plan was previously deposited, `plan.getPreviousDOI()` contains the DOI of the last version. Use it to create a new version of the existing record, not a new deposit:

```java
String previousDoi = plan.getPreviousDOI();
if (previousDoi != null && !previousDoi.isBlank()) {
    // Update/version the existing record using previousDoi
} else {
    // Create a new record
}
```

### Step 3 — Implement DepositController

Create a `@RestController` that implements the controller interface:

```java
@RestController
@RequestMapping("/api/deposit")
public class MyDepositController implements DepositController {

    private final MyRepositoryDepositService depositService;

    public MyDepositController(MyRepositoryDepositService depositService) {
        this.depositService = depositService;
    }

    @Override
    public String deposit(@RequestBody PlanDepositModel planDepositModel) {
        return depositService.deposit(planDepositModel);
    }

    @Override
    public String authenticate(@RequestParam("authToken") String code) {
        return depositService.authenticate(code);
    }

    @Override
    public DepositConfiguration getConfiguration() {
        return depositService.getConfiguration();
    }

    @Override
    public String getLogo() {
        return depositService.getLogo();
    }
}
```

### Step 4 — Create the application entry point

```java
@SpringBootApplication(scanBasePackages = {
    "org.opencdmp.depositbase",
    "com.example.myrepositorydeposit"   // your package
})
public class MyRepositoryDepositApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyRepositoryDepositApplication.class, args);
    }
}
```

### Step 5 — Configure security and deploy

OpenCDMP calls your plugin with a Bearer token that it obtains from Keycloak for the `plugins` client scope (see [Registering plugin services](/docs/deployment/configuration/plugin-services.md#plugin-tokens)). Your service must accept only tokens from the installation's realm with the `plugins` audience. The reference implementations do this with a `SecurityConfiguration` class (Spring Security's OAuth2 resource server through `gr.cite:oidc-authn`), a `security.yml`, and an `idpclaims.yml`; copy them from one of the [reference implementations](#reference-implementations), and set:

| Env Variable | Description | Example |
| --- | --- | --- |
| `IDP_ISSUER_URI` | The realm URL, the same value as the `IDP_ISSUER_URI` of the API service | `https://<keycloak-host>/auth/realms/OpenCDMP` |
| `SECURITY_AUDIENCE` | The audience the tokens must carry | `plugins` |
| `IDP_CLAIMS_ROLES_PATH` | Path of the roles in the token's `resource_access` claim | `plugins.roles` |

Keep the `/api` endpoints authenticated and leave only `/actuator` open, as the reference `security.yml` does:

```yaml
web:
  security:
    enabled: true
    authorized-endpoints: [ api ]
    allowed-endpoints: [ actuator ]
    idp:
      resource:
        token-type: JWT
        jwt:
          issuer-uri: ${IDP_ISSUER_URI}
          audiences:
            - ${SECURITY_AUDIENCE}
          validIssuer: ${IDP_ISSUER_URI}
```

Set the port and the application name in `application.yml`:

```yaml
server:
  port: 8086

spring:
  application:
    name: my-repository-deposit
```

Build and deploy the service as a standalone JAR or Docker container that the OpenCDMP API service can reach on the network.

### Step 6 — Register with OpenCDMP

A plugin becomes available in one of two ways:

- **For the whole installation**: the system administrator adds it to `deposit.sources` in the configuration of the API service, with its address, its id, and the client the API service signs in with. See [Registering plugin services](/docs/deployment/configuration/plugin-services.md#plugin-registration), which also shows the Docker Compose entry for a new service.
- **For one organisation**: an organisation administrator connects it with **Add plugin** under **Settings > Plugins**. See [Plugins: add a plugin](/docs/administering/tenant-management/plugins.md#add-a-plugin).

In both cases the platform calls `GET /api/deposit/configuration` to discover the plugin's capabilities, and the id configured for the plugin must match the id it reports there. The plugin then appears as a repository that plans can be deposited to.

Before you register the plugin, try it against a local installation as described in [Run and test a plugin locally](/docs/developers/plugins/run-locally.md). Once it is registered, **Test connection** on the plugin's page in **Settings > Plugins** checks that the platform can reach it and that the ids match (see [Check the connection](/docs/deployment/configuration/plugin-services.md#step-4-check-the-connection)).

---

## Reference implementations

The following open-source deposit services are part of the OpenCDMP platform and serve as complete examples. Each has a documented semantic-to-output-field mapping that shows how the plugin discovers values in the plan blueprint and asset templates (named *description templates* in the API and plugin contracts) via [`FieldModel.semantics`](/docs/developers/plugins/common-models.md). Use them as a pattern for your own deposit service.

| Project | Repository | GitHub | Mapping reference |
|---------|------------|--------|-------------------|
| `repository-deposit-zenodo` | Zenodo | [GitHub](https://github.com/OpenCDMP/repository-deposit-zenodo) | [Zenodo semantics](/docs/optional-services/deposit-services/zenodo-semantics.md) |
| `repository-deposit-dataverse` | Dataverse | [GitHub](https://github.com/OpenCDMP/repository-deposit-dataverse) | [Dataverse semantics](/docs/optional-services/deposit-services/dataverse-semantics.md) |
| `repository-deposit-dspace` | DSpace | [GitHub](https://github.com/OpenCDMP/repository-deposit-dspace) | [DSpace semantics](/docs/optional-services/deposit-services/dspace-semantics.md) |
| `repository-deposit-ckan` | CKAN | [GitHub](https://github.com/OpenCDMP/repository-deposit-ckan) | [CKAN semantics](/docs/optional-services/deposit-services/ckan-semantics.md) |
| `repository-deposit-fedora` | Fedora | [GitHub](https://github.com/OpenCDMP/repository-deposit-fedora) | [Fedora semantics](/docs/optional-services/deposit-services/fedora-semantics.md) |

:::tip
All five support [preview](/docs/developers/plugins/deposit-preview.md). Zenodo's `ZenodoPreviewMapper` class is the most complete example of the `toPreview()` / `applyOverrides()` pattern, including hidden sections and locked values. All five declare `uploadedFiles` and the shared [organisation settings](#6-depositpluginsettings).
:::

---

## License

This package is licensed under the [EUPL 1.2 License](https://github.com/OpenCDMP/repository-deposit-base/blob/main/LICENSE).

## Contact

For questions or support regarding the implementation of repository deposit services, please contact:

- **Email**: opencdmp at cite.gr

:::note
The source code is in the [repository-deposit-base repository](https://github.com/OpenCDMP/repository-deposit-base).
:::
