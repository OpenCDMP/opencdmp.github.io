---
sidebar_position: 3
description: Discover how you can add custom evaluator
---

# Evaluator

:::info
[Evaluator Base](https://mvnrepository.com/artifact/org.opencdmp/evaluator-base) is a **Maven package** that provides the base interfaces and configuration classes required to implement plan evaluation services for the **OpenCDMP** platform. Each evaluation service is developed as a separate microservice and can be registered with OpenCDMP to support the evaluation and ranking of **Plans** and related **Descriptions**.
:::

## Key Interfaces and Classes

:::info
The following models: `Plan Model`, `DescriptionModel` are supported by the [Common Models Plugin](/docs/for-devs/plugins/common-models.md).
:::

### 1. EvaluatorClient.java

This interface defines the core operations that any evaluation service must implement.

```java
public interface EvaluatorClient {

    RankModel rankPlan(PlanModel plan) throws InvalidApplicationException, IOException, InvalidTypeException;

    RankModel rankDescription(DescriptionModel description) throws InvalidApplicationException, IOException;

    EvaluatorConfiguration getConfiguration();

    String getLogo();
}
```

- **rankPlan()**: Evaluates and ranks a plan, returning a **RankModel** object with the evaluation details.
- **rankDescription()**: Evaluates and ranks a description, returning a **RankModel** object.
- **getConfiguration()**: Returns the configuration details of the evaluation service.
- **getLogo()**: Returns the service’s logo in base64 format, if available.

### 2. EvaluatorController.java

This interface defines the API endpoints that the evaluation service must implement to communicate with the OpenCDMP platform.

```java
@RequestMapping("/api/evaluator")
public interface EvaluatorController {

    @PostMapping("/rank/plan")
    RankModel rankPlan(@RequestBody PlanModel planModel) throws Exception;

    @PostMapping("/rank/description")
    RankModel rankDescription(@RequestBody DescriptionModel descriptionModel) throws Exception;

    @GetMapping("/config")
    EvaluatorConfiguration getConfiguration();

    @GetMapping("/logo")
    String getLogo();
}
```

- **rankPlan()**: Evaluates a plan and returns its rank.
- **rankDescription()**: Evaluates a description and returns its rank.
- **getConfiguration()**: Returns the evaluation service's configuration details.
- **getLogo()**: Returns the logo for the evaluation service if available.

### 3. EvaluatorConfiguration.java

This class contains the configuration details for each evaluation service, which the OpenCDMP platform reads and registers.

```java
public class EvaluatorConfiguration {

    private String evaluatorId;
    private RankConfig rankConfig;
    private List<EvaluatorEntityType> evaluatorEntityTypes;
    private boolean useSharedStorage;
    private boolean hasLogo;
}
```

**Fields**
- **evaluatorId**: Unique identifier for the evaluator service.
- **rankConfig**: Configuration details related to how rankings are assigned.
- **evaluatorEntityTypes**: Entity types the evaluator supports, such as plans or descriptions.
- **useSharedStorage**: Indicates if shared storage is used for the evaluator.
- **hasLogo**: Indicates if the evaluator service has a logo.

## How to Create a Custom Evaluation Service

To implement a custom evaluation service for OpenCDMP:

1. **Create a New Spring Boot Project**:
   - Use **[Spring Boot](https://spring.io/projects/spring-boot)** to create a microservice that implements the `EvaluatorClient` and `EvaluatorController` interfaces.

2. **Define Your Evaluation Configuration**:
   - Define the evaluation-specific configuration in the `EvaluatorConfiguration` class.

3. **Use Existing Implementations as Examples**:
   - You can refer to other evaluation services in the OpenCDMP platform for reference.
   - You can refer to the [evaluator-rda-madmp project](https://github.com/OpenCDMP/evaluator-rda-madmp) that is part of the OpenCDMP platform (*is mentioned in [supplementary services section](/docs/supplementary-services/evaluator-services.md)*) as example.

4. **Register the Service**:
   - Once your service is implemented and running, register it with the OpenCDMP platform (*for more details see **[Tenant Configuration](/docs/administration/tenant-configuration.md)***). It will be available as an evaluation option for plans and descriptions.


## License

This package is licensed under the [EUPL 1.2 License](https://github.com/OpenCDMP/evaluator-rda-madmp/blob/main/LICENSE).

## Contact

For questions or support regarding the implementation of evaluation services, please contact:

- **Email**: opencdmp at cite.gr

## End notes
:::note
You can view `Evaluator Base` source code [here](https://github.com/OpenCDMP/evaluator-base).
:::