---
sidebar_position: 3
title: Evaluator plugin
description: Build an evaluator that ranks plans and assets - the EvaluatorClient and EvaluatorController contract, benchmarks, rank results, and deployment
---

# Evaluator

:::info
[Evaluator Base](https://mvnrepository.com/artifact/org.opencdmp/evaluator-base) is a **Maven package** that provides the base interfaces and configuration classes required to implement plan evaluation services for the **OpenCDMP** platform. Each evaluator is an independent Spring Boot microservice that OpenCDMP calls to assess and rank **Plans** and **Assets** (named *Descriptions* in the API and plugin contracts) against defined benchmarks or criteria.
:::

## How it works

When a user triggers an evaluation on a plan or asset, the OpenCDMP backend:

1. Serializes the plan or asset into [`PlanModel`](/docs/developers/plugins/common-models.md#planmodel) or [`DescriptionModel`](/docs/developers/plugins/common-models.md#descriptionmodel) from the Common Models package.
2. Wraps it in a `PlanEvaluationModel` or `DescriptionEvaluationModel` alongside the lists of `benchmarkIds` and `testIds` to apply.
3. Calls `POST /api/evaluator/rank/plan` or `POST /api/evaluator/rank/description` on your microservice.
4. Receives a **list** of `RankResultModel` objects back. Each result carries an overall score and a detailed breakdown per benchmark and per metric, and may name the **target** it covers, for example one result per asset of the plan. The platform validates each target against the evaluated plan, stores the results, notifies the plan's collaborators, and shows the results to the user (several results render as tabs, one per target).

Your service implements the scoring logic: validating against a JSON schema, checking field completeness, calling external APIs, or applying any other criteria.

---

## Key interfaces and classes

:::info
`PlanModel` and `DescriptionModel` are part of the [Common Models](/docs/developers/plugins/common-models.md) package.
:::

### 1. EvaluatorClient

This interface defines the business logic operations your evaluator must implement.

```java
public interface EvaluatorClient {

    // Evaluate a plan against the specified benchmarks and tests.
    // Returns one or more ranked results — usually one for the whole plan,
    // or one per description when the evaluator assesses each asset separately.
    List<RankResultModel> rankPlan(PlanEvaluationModel plan);

    // Evaluate a description against the specified benchmarks and tests.
    List<RankResultModel> rankDescription(DescriptionEvaluationModel description);

    // Return this evaluator's capabilities and configuration.
    EvaluatorConfiguration getConfiguration();

    // Return the evaluator logo as a base64-encoded string, or null if none.
    String getLogo();
}
```

### 2. EvaluatorController

This interface defines the REST API endpoints your microservice must expose. Implement it as a `@RestController` and delegate to your `EvaluatorClient`.

```java
@RequestMapping("/api/evaluator")
public interface EvaluatorController {

    @PostMapping("/rank/plan")
    List<RankResultModel> rankPlan(@RequestBody PlanEvaluationModel planModel);

    @PostMapping("/rank/description")
    List<RankResultModel> rankDescription(@RequestBody DescriptionEvaluationModel descriptionModel);

    @GetMapping("/config")
    EvaluatorConfiguration getConfiguration();

    @GetMapping("/logo")
    String getLogo();
}
```

### 3. Input models

**`PlanEvaluationModel`**: the input to `rankPlan()`:

```java
public class PlanEvaluationModel {
    private PlanModel planModel;       // The plan to evaluate
    private List<String> benchmarkIds; // Which benchmarks to apply (IDs from availableBenchmarks)
    private List<String> testIds;      // Which tests to apply (IDs from availableTests)
}
```

**`DescriptionEvaluationModel`**: the input to `rankDescription()`:

```java
public class DescriptionEvaluationModel {
    private DescriptionModel descriptionModel; // The description to evaluate
    private List<String> benchmarkIds;
    private List<String> testIds;
}
```

### 4. EvaluatorConfiguration

Return this from `getConfiguration()` to describe your evaluator's capabilities to the platform.

```java
public class EvaluatorConfiguration {

    // Unique identifier for this evaluator (e.g. "rda-madmp", "fair-evaluator")
    private String evaluatorId;

    // How scores are represented — see RankConfig below
    private RankConfig rankConfig;

    // Which entity types this evaluator supports: Plan, Description, or both
    private List<PluginEntityType> evaluatorEntityTypes;

    // Whether to use shared file storage for file access
    private boolean useSharedStorage;

    // Whether getLogo() returns a logo
    private boolean hasLogo;

    // Admin-level configuration fields (e.g. external API endpoint)
    private List<ConfigurationField> configurationFields;

    // User-level configuration fields
    private List<ConfigurationField> userConfigurationFields;

    // The benchmarks users can select when triggering an evaluation
    private List<BenchmarkConfiguration> availableBenchmarks;

    // The tests users can select when triggering an evaluation
    private List<TestConfiguration> availableTests;

    // Optional: the semantic keys this evaluator reads — see Semantics Manifest Models in Common Models
    private SemanticsManifest semantics;
}
```

Publishing a `semantics` manifest lets the blueprint and asset template editors show which keys your evaluator looks for, and which of them a structure covers. See [Semantics Manifest Models](/docs/developers/plugins/common-models.md#semantics-manifest-models).

#### BenchmarkConfiguration

Declares one benchmark that users can select when evaluating a plan or asset.

```java
public class BenchmarkConfiguration {
    private String id;                        // Unique benchmark ID — passed in benchmarkIds at evaluation time
    private String label;                     // Display name shown in the UI
    private List<PluginEntityType> appliesTo; // Plan | Description
}
```

#### TestConfiguration

Declares one test that users can select when evaluating a plan or asset, with the same structure as `BenchmarkConfiguration`. Tests and benchmarks are parallel, independently selectable evaluation criteria.

```java
public class TestConfiguration {
    private String id;                        // Unique test ID — passed in testIds at evaluation time
    private String label;                     // Display name shown in the UI
    private List<PluginEntityType> appliesTo; // Plan | Description
}
```

#### RankConfig

Defines how scores are represented. OpenCDMP uses this to correctly display results.

```java
public class RankConfig {
    // RankType enum: ValueRange (0) | Selection (1)
    private RankType rankType;

    // Used when rankType is ValueRange — defines min, max, and pass threshold
    private ValueRangeConfiguration valueRangeConfiguration;

    // Used when rankType is Selection — defines discrete outcome values
    private SelectionConfiguration selectionConfiguration;
}
```

**`ValueRangeConfiguration`**: for numeric scores within a defined range:

```java
public class ValueRangeConfiguration {
    private NumberType numberType; // Decimal | Integer
    private double min;            // Minimum possible score
    private double max;            // Maximum possible score
    private double minPassValue;   // Minimum score considered a pass
}
```

**`SelectionConfiguration`**: for discrete outcomes (e.g. pass/fail):

```java
public class SelectionConfiguration {
    // Each entry maps a numeric score value to a pass/fail status
    private List<ValueSet> valueSetList;

    public static class ValueSet {
        private double key;               // The score value
        private SuccessStatus successStatus; // Pass | Fail | NotEvaluated
    }
}
```

**`SuccessStatus`**: the outcome a selection value maps to:

```java
public enum SuccessStatus {
    Fail(0),
    Pass(1),
    // The target was not assessed at all, so neither Pass nor Fail applies.
    // Put the reason in RankResultModel.details.
    NotEvaluated(-1);
}
```

:::info
If your evaluator can skip a target (for example, an asset without a persistent identifier to resolve), declare a `ValueSet` whose `successStatus` is `NotEvaluated` and return that `key` as the result's `rank`. Without such an entry the platform cannot map the skipped result and rejects the whole report. The UI shows a `NotEvaluated` result as a neutral `Not evaluated` chip with the text of `details`, and it counts as neither a pass nor a failure in the evaluation notification.
:::

---

### 5. Result models

`rankPlan()` and `rankDescription()` return a **list** of `RankResultModel`. Each entry is one complete evaluation result: a hierarchy of per-benchmark results, each containing per-metric results with individual messages. A result can be tied to the part of the entity it covers.

```text
List<RankResultModel>                               (one per evaluated target)
  └── RankResultModel
        ├── target: EvaluationTargetModel             (optional — which plan or description this result covers)
        └── results: List<EvaluationResultModel>      (one per benchmark)
              └── metrics: List<EvaluationResultMetricModel>  (one per criterion within the benchmark)
                    └── messages: List<EvaluationResultMessageModel>  (explanatory messages)
```

**`RankResultModel`**: one evaluation result:

```java
public class RankResultModel {
    private double rank;                         // Overall score across all benchmarks
    private String details;                      // Human-readable summary (or the reason when not evaluated)
    private List<EvaluationResultModel> results; // Per-benchmark breakdown
    private EvaluationTargetModel target;        // Which part of the evaluated entity this result is about (optional)
}
```

**`EvaluationTargetModel`**: identifies the plan or description a result covers:

```java
public class EvaluationTargetModel {
    private PluginEntityType entityType; // Plan | Description
    private UUID entityId;               // Id of the plan or description, as received in the input model
    private String label;                // Display name hint; the platform resolves its own label when it can
}
```

How the platform handles the list:

- **Single result**: an evaluator that assesses the whole plan or description returns a one-element list and leaves `target` unset. The result is displayed on its own.
- **One result per description**: an evaluator that fans out over the descriptions of a plan returns one `RankResultModel` per description and sets `target` to `PluginEntityType.Description` with the description's `id` taken from `PlanModel.descriptions`. Never invent or look up ids: the platform validates every reported `entityId` against the plan it asked about (and checks the reported `entityType`), drops a target that does not belong to it (the result itself is still stored), and replaces `label` with the description's current name when it has one. The UI renders such results as tabs named after the descriptions, each linking to the asset.
- **No target**: results without a target, including evaluations recorded before targets existed, are displayed as `Result 1`, `Result 2`, and so on.
- **Not evaluated**: a result whose `rank` maps to `SuccessStatus.NotEvaluated` (see [RankConfig](#rankconfig)) should leave `results` empty and explain in `details` why the target was skipped.
- **Notifications**: the `{result}` placeholder of the evaluation notification collapses all ranks into one verdict (`pass` only when something was assessed and every assessed rank passed; `not evaluated` when nothing was), and `{benchmarks}` lists every benchmark that ran across all results, deduplicated by title.

**`EvaluationResultModel`**: results for one benchmark:

```java
public class EvaluationResultModel {
    private double rank;                                  // Score for this benchmark
    private String benchmarkTitle;                        // Display name of the benchmark
    private String benchmarkDetails;                      // Description or guidance
    private List<EvaluationResultMetricModel> metrics;    // Per-metric breakdown
}
```

**`EvaluationResultMetricModel`**: results for one criterion within a benchmark:

```java
public class EvaluationResultMetricModel {
    private double rank;                                      // Score for this metric
    private String metricTitle;                               // Display name of the metric
    private String metricDetails;                             // Description or guidance
    private List<EvaluationResultMessageModel> messages;      // Explanatory messages
}
```

**`EvaluationResultMessageModel`**: a single feedback message for a metric:

```java
public class EvaluationResultMessageModel {
    private String title;   // Short message title
    private String message; // Full explanation (e.g. what is missing or why it passed)
}
```

---

## How to create a custom evaluator

### Prerequisites

- Java 21+
- Spring Boot 4 (the reference implementations use 4.0)
- Maven 3.6+

### Step 1 — Create a Spring Boot project

:::info Versions
Use the latest release of `evaluator-base` and `common-models` from [Maven Central](https://central.sonatype.com/namespace/org.opencdmp). The contract described here, including per-asset results with targets and the `NotEvaluated` status, ships with the 2.0 release. Define the `opencdmp.plugin-base.version` and `opencdmp.common-models.version` properties of the snippet below in the `<properties>` of your `pom.xml`. The reference implementations build on Spring Boot 4.0 and Java 21.
:::

Add the following dependencies to your `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>org.opencdmp</groupId>
        <artifactId>evaluator-base</artifactId>
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

### Step 2 — Implement EvaluatorClient

Create a `@Service` class that implements the evaluation logic:

```java
@Service
public class MyEvaluatorService implements EvaluatorClient {

    @Override
    public EvaluatorConfiguration getConfiguration() {
        EvaluatorConfiguration config = new EvaluatorConfiguration();
        config.setEvaluatorId("my-evaluator");
        config.setHasLogo(true);
        config.setEvaluatorEntityTypes(List.of(PluginEntityType.Plan));

        // Define how scores are represented
        RankConfig rankConfig = new RankConfig();
        rankConfig.setRankType(RankType.ValueRange);
        ValueRangeConfiguration range = new ValueRangeConfiguration();
        range.setNumberType(NumberType.Decimal);
        range.setMin(0.0);
        range.setMax(1.0);
        range.setMinPassValue(0.6);
        rankConfig.setValueRangeConfiguration(range);
        config.setRankConfig(rankConfig);

        // Define the benchmarks users can select
        BenchmarkConfiguration benchmark = new BenchmarkConfiguration();
        benchmark.setId("completeness-v1");
        benchmark.setLabel("Field Completeness Check");
        benchmark.setAppliesTo(List.of(PluginEntityType.Plan));
        config.setAvailableBenchmarks(List.of(benchmark));

        // Define the tests users can select — tests are independent of benchmarks,
        // but declared and requested the same way
        TestConfiguration test = new TestConfiguration();
        test.setId("no-empty-sections-v1");
        test.setLabel("No Empty Sections");
        test.setAppliesTo(List.of(PluginEntityType.Plan));
        config.setAvailableTests(List.of(test));

        return config;
    }

    @Override
    public List<RankResultModel> rankPlan(PlanEvaluationModel input) {

        PlanModel plan = input.getPlanModel();
        List<String> benchmarkIds = input.getBenchmarkIds();
        // List<String> testIds = input.getTestIds(); // Handle requested tests the same way, if you declared any

        // Run each requested benchmark
        List<EvaluationResultModel> benchmarkResults = new ArrayList<>();
        for (String benchmarkId : benchmarkIds) {
            benchmarkResults.add(evaluateBenchmark(plan, benchmarkId));
        }

        // Compute an overall score as the average of benchmark scores
        double overallRank = benchmarkResults.stream()
            .mapToDouble(EvaluationResultModel::getRank)
            .average()
            .orElse(0.0);

        RankResultModel result = new RankResultModel();
        result.setRank(overallRank);
        result.setDetails("Evaluated " + benchmarkResults.size() + " benchmark(s).");
        result.setResults(benchmarkResults);
        // One result for the whole plan: no target needed.
        // To report per description instead, return one RankResultModel per entry of
        // plan.getDescriptions(), each with
        //   result.setTarget(new EvaluationTargetModel(PluginEntityType.Description, description.getId(), description.getLabel()));
        return List.of(result);
    }

    @Override
    public List<RankResultModel> rankDescription(DescriptionEvaluationModel input) {
        // Throw if descriptions are not supported
        throw new UnsupportedOperationException("Description evaluation not supported");
    }

    @Override
    public String getLogo() {
        try (InputStream is = getClass().getResourceAsStream("/logo.png")) {
            if (is == null) return null;
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(is.readAllBytes());
        } catch (IOException e) {
            return null;
        }
    }

    private EvaluationResultModel evaluateBenchmark(PlanModel plan, String benchmarkId) {
        List<EvaluationResultMetricModel> metrics = new ArrayList<>();

        // Example metric: check that the plan has a title
        EvaluationResultMetricModel titleMetric = evaluateTitlePresence(plan);
        metrics.add(titleMetric);

        // Example metric: check that the plan has at least one description
        EvaluationResultMetricModel descMetric = evaluateDescriptionCount(plan);
        metrics.add(descMetric);

        double benchmarkScore = metrics.stream()
            .mapToDouble(EvaluationResultMetricModel::getRank)
            .average()
            .orElse(0.0);

        EvaluationResultModel result = new EvaluationResultModel();
        result.setRank(benchmarkScore);
        result.setBenchmarkTitle("Field Completeness Check");
        result.setBenchmarkDetails("Checks that key plan fields are populated.");
        result.setMetrics(metrics);
        return result;
    }

    private EvaluationResultMetricModel evaluateTitlePresence(PlanModel plan) {
        boolean hasTile = plan.getLabel() != null && !plan.getLabel().isBlank();

        EvaluationResultMessageModel message = new EvaluationResultMessageModel();
        message.setTitle(hasTile ? "Title present" : "Title missing");
        message.setMessage(hasTile
            ? "The plan has a title: \"" + plan.getLabel() + "\""
            : "The plan does not have a title. Please provide one.");

        EvaluationResultMetricModel metric = new EvaluationResultMetricModel();
        metric.setMetricTitle("Plan Title");
        metric.setMetricDetails("Checks whether the plan has a non-empty title.");
        metric.setRank(hasTile ? 1.0 : 0.0);
        metric.setMessages(List.of(message));
        return metric;
    }

    private EvaluationResultMetricModel evaluateDescriptionCount(PlanModel plan) {
        int count = plan.getDescriptions() == null ? 0 : plan.getDescriptions().size();
        boolean hasDescriptions = count > 0;

        EvaluationResultMessageModel message = new EvaluationResultMessageModel();
        message.setTitle(hasDescriptions ? count + " description(s) found" : "No descriptions found");
        message.setMessage(hasDescriptions
            ? "The plan contains " + count + " description(s)."
            : "The plan has no descriptions. Add at least one to improve completeness.");

        EvaluationResultMetricModel metric = new EvaluationResultMetricModel();
        metric.setMetricTitle("Descriptions Present");
        metric.setMetricDetails("Checks whether the plan contains at least one description.");
        metric.setRank(hasDescriptions ? 1.0 : 0.0);
        metric.setMessages(List.of(message));
        return metric;
    }
}
```

### Step 3 — Implement EvaluatorController

Create a `@RestController` that delegates to your service:

```java
@RestController
@RequestMapping("/api/evaluator")
public class MyEvaluatorController implements EvaluatorController {

    private final MyEvaluatorService evaluatorService;

    public MyEvaluatorController(MyEvaluatorService evaluatorService) {
        this.evaluatorService = evaluatorService;
    }

    @Override
    public List<RankResultModel> rankPlan(@RequestBody PlanEvaluationModel planModel) {
        return evaluatorService.rankPlan(planModel);
    }

    @Override
    public List<RankResultModel> rankDescription(@RequestBody DescriptionEvaluationModel descriptionModel) {
        return evaluatorService.rankDescription(descriptionModel);
    }

    @Override
    public EvaluatorConfiguration getConfiguration() {
        return evaluatorService.getConfiguration();
    }

    @Override
    public String getLogo() {
        return evaluatorService.getLogo();
    }
}
```

### Step 4 — Create the application entry point

```java
@SpringBootApplication(scanBasePackages = {
    "org.opencdmp.evaluatorbase",
    "com.example.myevaluator"   // your package
})
public class MyEvaluatorApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyEvaluatorApplication.class, args);
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
  port: 8087

spring:
  application:
    name: my-evaluator
```

Build and deploy the service as a standalone JAR or Docker container that the OpenCDMP API service can reach on the network.

### Step 6 — Register with OpenCDMP

A plugin becomes available in one of two ways:

- **For the whole installation**: the system administrator adds it to `evaluator.sources` in the configuration of the API service, with its address, its id, and the client the API service signs in with. See [Registering plugin services](/docs/deployment/configuration/plugin-services.md#plugin-registration), which also shows the Docker Compose entry for a new service.
- **For one organisation**: an organisation administrator connects it with **Add plugin** under **Settings > Plugins**. See [Plugins: add a plugin](/docs/administering/tenant-management/plugins.md#add-a-plugin).

In both cases the platform calls `GET /api/evaluator/config` to discover the plugin's capabilities, and the id configured for the plugin must match the id it reports there. The plugin then appears as an evaluation option for plans and assets.

Before you register the plugin, try it against a local installation as described in [Run and test a plugin locally](/docs/developers/plugins/run-locally.md). Once it is registered, **Test connection** on the plugin's page in **Settings > Plugins** checks that the platform can reach it and that the ids match (see [Check the connection](/docs/deployment/configuration/plugin-services.md#step-4-check-the-connection)).

---

## Reference implementations

| Project | Description | GitHub |
|---------|-------------|--------|
| `evaluator-rda-madmp` | Validates plans against the RDA maDMP JSON schema | [GitHub](https://github.com/OpenCDMP/evaluator-rda-madmp) |
| `evaluator-ostrails-dmp-evaluation-service` | OSTrails evaluation service | [GitHub](https://github.com/OpenCDMP/evaluator-ostrails-dmp-evaluation-service) |
| `evaluator-openaire-fair-evaluation-service` | Evaluates each dataset of the plan's RDA export against the OpenAIRE FAIR guidelines and returns one targeted result per asset, with `NotEvaluated` for assets without a resolvable identifier | [GitHub](https://github.com/OpenCDMP/evaluator-openaire-fair-evaluation-service) |

---

## License

This package is licensed under the [EUPL 1.2 License](https://github.com/OpenCDMP/evaluator-base/blob/main/LICENSE).

## Contact

For questions or support regarding the implementation of evaluation services, please contact:

- **Email**: opencdmp at cite.gr

:::note
The source code is in the [evaluator-base repository](https://github.com/OpenCDMP/evaluator-base).
:::
