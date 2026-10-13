---
sidebar_position: 3
description: Discover how you can add custom evaluator
---

# Evaluator

:::info
[Evaluator Base](https://mvnrepository.com/artifact/org.opencdmp/evaluator-base) is a **Maven package** that provides the base interfaces and configuration classes required to implement plan evaluation services for the **OpenCDMP** platform. Each evaluator is an independent Spring Boot microservice that registers with OpenCDMP to assess and rank **Plans** and **Descriptions** against defined benchmarks or criteria.
:::

## How It Works

When a user triggers an evaluation on a plan or description, the OpenCDMP backend:

1. Serializes the plan or description into [`PlanModel`](/versioned_docs/version-1.x/developers/plugins/common-models.md#planmodel) or [`DescriptionModel`](/versioned_docs/version-1.x/developers/plugins/common-models.md#descriptionmodel) from the Common Models package.
2. Wraps it in a `PlanEvaluationModel` or `DescriptionEvaluationModel` alongside the list of `benchmarkIds` to apply.
3. Calls `POST /api/evaluator/rank/plan` or `POST /api/evaluator/rank/description` on your microservice.
4. Receives a `RankResultModel` back containing the overall score and a detailed breakdown per benchmark and per metric.

Your service implements the scoring logic — whether that means validating against a JSON schema, checking field completeness, running external API calls, or applying any other criteria.

---

## Key Interfaces and Classes

:::info
`PlanModel` and `DescriptionModel` are part of the [Common Models](/versioned_docs/version-1.x/developers/plugins/common-models.md) package.
:::

### 1. EvaluatorClient

This interface defines the business logic operations your evaluator must implement.

```java
public interface EvaluatorClient {

    // Evaluate a plan against the specified benchmarks. Returns a ranked result.
    RankResultModel rankPlan(PlanEvaluationModel plan)
        throws InvalidApplicationException, IOException, InvalidTypeException;

    // Evaluate a description against the specified benchmarks.
    RankResultModel rankDescription(DescriptionEvaluationModel description)
        throws InvalidApplicationException, IOException;

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
    RankResultModel rankPlan(@RequestBody PlanEvaluationModel planModel) throws Exception;

    @PostMapping("/rank/description")
    RankResultModel rankDescription(@RequestBody DescriptionEvaluationModel descriptionModel) throws Exception;

    @GetMapping("/config")
    EvaluatorConfiguration getConfiguration();

    @GetMapping("/logo")
    String getLogo();
}
```

### 3. Input Models

**`PlanEvaluationModel`** — the input to `rankPlan()`:

```java
public class PlanEvaluationModel {
    private PlanModel planModel;       // The plan to evaluate
    private List<String> benchmarkIds; // Which benchmarks to apply (IDs from availableBenchmarks)
}
```

**`DescriptionEvaluationModel`** — the input to `rankDescription()`:

```java
public class DescriptionEvaluationModel {
    private DescriptionModel descriptionModel; // The description to evaluate
    private List<String> benchmarkIds;
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
}
```

#### BenchmarkConfiguration

Declares one benchmark that users can select when evaluating a plan or description.

```java
public class BenchmarkConfiguration {
    private String id;                        // Unique benchmark ID — passed in benchmarkIds at evaluation time
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

**`ValueRangeConfiguration`** — for numeric scores within a defined range:

```java
public class ValueRangeConfiguration {
    private NumberType numberType; // Decimal | Integer
    private double min;            // Minimum possible score
    private double max;            // Maximum possible score
    private double minPassValue;   // Minimum score considered a pass
}
```

**`SelectionConfiguration`** — for discrete outcomes (e.g. pass/fail):

```java
public class SelectionConfiguration {
    // Each entry maps a numeric score value to a pass/fail status
    private List<ValueSet> valueSetList;

    public static class ValueSet {
        private double key;               // The score value
        private SuccessStatus successStatus; // Pass | Fail
    }
}
```

---

### 5. Result Models

Results are structured as a hierarchy: one overall result containing per-benchmark results, each containing per-metric results with individual messages.

```text
RankResultModel
  └── results: List<EvaluationResultModel>        (one per benchmark)
        └── metrics: List<EvaluationResultMetricModel>  (one per criterion within the benchmark)
              └── messages: List<EvaluationResultMessageModel>  (explanatory messages)
```

**`RankResultModel`** — the top-level evaluation result:

```java
public class RankResultModel {
    private double rank;                         // Overall score across all benchmarks
    private String details;                      // Human-readable summary
    private List<EvaluationResultModel> results; // Per-benchmark breakdown
}
```

**`EvaluationResultModel`** — results for one benchmark:

```java
public class EvaluationResultModel {
    private double rank;                                  // Score for this benchmark
    private String benchmarkTitle;                        // Display name of the benchmark
    private String benchmarkDetails;                      // Description or guidance
    private List<EvaluationResultMetricModel> metrics;    // Per-metric breakdown
}
```

**`EvaluationResultMetricModel`** — results for one criterion within a benchmark:

```java
public class EvaluationResultMetricModel {
    private double rank;                                      // Score for this metric
    private String metricTitle;                               // Display name of the metric
    private String metricDetails;                             // Description or guidance
    private List<EvaluationResultMessageModel> messages;      // Explanatory messages
}
```

**`EvaluationResultMessageModel`** — a single feedback message for a metric:

```java
public class EvaluationResultMessageModel {
    private String title;   // Short message title
    private String message; // Full explanation (e.g. what is missing or why it passed)
}
```

---

## How to Create a Custom Evaluator

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
        <artifactId>evaluator-base</artifactId>
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

        return config;
    }

    @Override
    public RankResultModel rankPlan(PlanEvaluationModel input)
            throws InvalidApplicationException, IOException {

        PlanModel plan = input.getPlanModel();
        List<String> benchmarkIds = input.getBenchmarkIds();

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
        return result;
    }

    @Override
    public RankResultModel rankDescription(DescriptionEvaluationModel input)
            throws InvalidApplicationException, IOException {
        // Return null or throw if descriptions are not supported
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
    public RankResultModel rankPlan(@RequestBody PlanEvaluationModel planModel) throws Exception {
        return evaluatorService.rankPlan(planModel);
    }

    @Override
    public RankResultModel rankDescription(@RequestBody DescriptionEvaluationModel descriptionModel) throws Exception {
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

### Step 4 — Create the Application Entry Point

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

### Step 5 — Configure and Deploy

```yaml
server:
  port: 8087

spring:
  application:
    name: my-evaluator
```

### Step 6 — Register with OpenCDMP

Register your running service in OpenCDMP via the [Tenant Configuration](/versioned_docs/version-1.x/administering/tenant-management/tenant-configuration.md) page. The platform will call `GET /api/evaluator/config` to discover its capabilities and make it available as an evaluation option for plans and descriptions.

---

## Reference Implementations

| Project | Description | GitHub |
|---------|-------------|--------|
| `evaluator-rda-madmp` | Validates plans against the RDA maDMP JSON schema | [GitHub](https://github.com/OpenCDMP/evaluator-rda-madmp) |
| `evaluator-ostrails` | OSTrails evaluation service | [GitHub](https://github.com/OpenCDMP/evaluator-ostrails) |

---

## License

This package is licensed under the [EUPL 1.2 License](https://github.com/OpenCDMP/evaluator-base/blob/main/LICENSE).

## Contact

For questions or support regarding the implementation of evaluation services, please contact:

- **Email**: opencdmp at cite.gr

:::note
You can view the `Evaluator Base` source code [here](https://github.com/OpenCDMP/evaluator-base).
:::
