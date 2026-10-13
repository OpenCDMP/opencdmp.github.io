---
sidebar_position: 2
description: Discover how you can add custom deposit
---

# Deposit

:::info
[Repository Deposit Base](https://mvnrepository.com/artifact/org.opencdmp/repository-deposit-base) is a **Maven package** that provides the base interfaces and configuration classes required to implement repository deposit services for the **OpenCDMP** platform. Each deposit service is an independent Spring Boot microservice that registers with OpenCDMP to support [depositing Plans](/versioned_docs/version-1.x/using/plans/deposit-a-plan.md) to an external repository for **DOI assignment**.
:::

## How It Works

When a user deposits a plan to a repository, the OpenCDMP backend:

1. Serializes the plan into a [`PlanModel`](/versioned_docs/version-1.x/developers/plugins/common-models.md#planmodel) from the Common Models package.
2. Wraps it in a `PlanDepositModel` alongside the user's authentication info (`AuthInfo`).
3. Calls `POST /api/deposit` on your microservice.
4. Expects a DOI string back as the response.

Your service is responsible for everything in between — authenticating with the repository, uploading files, publishing the record, and returning the minted DOI.

---

## Key Interfaces and Classes

:::info
`PlanModel` is part of the [Common Models](/versioned_docs/version-1.x/developers/plugins/common-models.md) package.
:::

### 1. DepositClient

This interface defines the business logic operations your deposit service must implement.

```java
public interface DepositClient {

    // Deposit the plan to the repository. Returns the minted DOI.
    String deposit(PlanDepositModel planDepositModel) throws Exception;

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
    String deposit(@RequestBody PlanDepositModel planDepositModel) throws Exception;

    @GetMapping("/authenticate")
    String authenticate(@RequestParam("authToken") String code);

    @GetMapping("/configuration")
    DepositConfiguration getConfiguration();

    @GetMapping("/logo")
    String getLogo();
}
```

### 3. PlanDepositModel

The input to the `deposit()` operation — contains the plan data and the user's credentials.

```java
public class PlanDepositModel {
    private PlanModel planModel;  // The full plan to deposit
    private AuthInfo authInfo;    // Authentication credentials for the repository
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

    // Controls which deposit modes are available — see DepositType below
    private DepositType depositType;

    // System-level access token (used when depositType is SystemDeposit or BothWaysDeposit)
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

    // Admin-level configuration fields (e.g. community ID, collection handle)
    private List<ConfigurationField> configurationFields;

    // User-level configuration fields (e.g. personal API key, username)
    private List<ConfigurationField> userConfigurationFields;

    // Which authentication methods this service supports — see DepositAuthMethod below
    private List<DepositAuthMethod> authMethods;
}
```

#### DepositType

Controls how the deposit is authenticated:

| Value | Meaning |
|-------|---------|
| `SystemDeposit` | The service uses a single shared access token configured by the admin. Users do not need their own credentials. |
| `UserDeposit` | Each user must provide their own credentials (OAuth2 token or profile fields). |
| `BothWaysDeposit` | Both system and user deposit modes are available — the user can choose. |

#### DepositAuthMethod

Declares which authentication options are available to the user:

| Value | Meaning |
|-------|---------|
| `PluginDefault` | Use the system-level credentials configured by the admin (`accessToken` in `DepositConfiguration`). |
| `AuthInfoFromUserProfile` | Use credentials stored in the user's OpenCDMP profile (from `userConfigurationFields`). |
| `oAuth2Flow` | Authenticate via an OAuth2 authorization code flow — the user is redirected to the repository to log in. |

---

## How to Create a Custom Deposit Service

### Prerequisites

- Java 21+
- Spring Boot 3.x
- Maven 3.6+

### Step 1 — Create a Spring Boot Project

Add the following dependencies to your `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>org.opencdmp</groupId>
        <artifactId>repository-deposit-base</artifactId>
        <version>1.2.0</version>
    </dependency>

    <dependency>
        <groupId>org.opencdmp</groupId>
        <artifactId>common-models</artifactId>
        <version>1.2.0</version>
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
    public String deposit(PlanDepositModel depositModel) throws Exception {
        PlanModel plan = depositModel.getPlanModel();
        AuthInfo authInfo = depositModel.getAuthInfo();

        // Resolve the access token — prefer user token, fall back to system token
        String accessToken = authInfo.getAuthToken();
        if (accessToken == null || accessToken.isBlank()) {
            accessToken = getConfiguration().getAccessToken(); // system token
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

#### Handling Plan Versioning

If the plan was previously deposited, `plan.getPreviousDOI()` contains the DOI of the last version. Use this to create a new version of an existing record rather than a new deposit:

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
    public String deposit(@RequestBody PlanDepositModel planDepositModel) throws Exception {
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

### Step 4 — Create the Application Entry Point

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

### Step 5 — Configure and Deploy

```yaml
server:
  port: 8086

spring:
  application:
    name: my-repository-deposit
```

Build and deploy the service as a standalone JAR or Docker container accessible from the OpenCDMP backend.

### Step 6 — Register with OpenCDMP

Register your running service in OpenCDMP via the [Tenant Configuration](/versioned_docs/version-1.x/administering/tenant-management/tenant-configuration.md) page, providing its base URL. The platform will call `GET /api/deposit/configuration` to discover its capabilities and make it available as a deposit option for plans.

---

## Reference Implementations

The following open-source deposit services are part of the OpenCDMP platform and serve as complete examples. Each has a documented semantic-to-output-field mapping that shows how the plugin discovers values in the plan blueprint and description templates via [`FieldModel.semantics`](/versioned_docs/version-1.x/developers/plugins/common-models.md) — useful as a pattern for your own deposit service.

| Project | Repository | GitHub | Mapping reference |
|---------|------------|--------|-------------------|
| `repository-deposit-zenodo` | Zenodo | [GitHub](https://github.com/OpenCDMP/repository-deposit-zenodo) | [Zenodo semantics](/versioned_docs/version-1.x/optional-services/deposit-services/zenodo-semantics.md) |
| `repository-deposit-dataverse` | Dataverse | [GitHub](https://github.com/OpenCDMP/repository-deposit-dataverse) | [Dataverse semantics](/versioned_docs/version-1.x/optional-services/deposit-services/dataverse-semantics.md) |
| `repository-deposit-dspace` | DSpace | [GitHub](https://github.com/OpenCDMP/repository-deposit-dspace) | [DSpace semantics](/versioned_docs/version-1.x/optional-services/deposit-services/dspace-semantics.md) |
| `repository-deposit-ckan` | CKAN | [GitHub](https://github.com/OpenCDMP/repository-deposit-ckan) | [CKAN semantics](/versioned_docs/version-1.x/optional-services/deposit-services/ckan-semantics.md) |
| `repository-deposit-fedora` | Fedora | [GitHub](https://github.com/OpenCDMP/repository-deposit-fedora) | [Fedora semantics](/versioned_docs/version-1.x/optional-services/deposit-services/fedora-semantics.md) |

---

## License

This package is licensed under the [EUPL 1.2 License](https://github.com/OpenCDMP/repository-deposit-base/blob/main/LICENSE).

## Contact

For questions or support regarding the implementation of repository deposit services, please contact:

- **Email**: opencdmp at cite.gr

:::note
You can view the `Repository Deposit Base` source code [here](https://github.com/OpenCDMP/repository-deposit-base).
:::
