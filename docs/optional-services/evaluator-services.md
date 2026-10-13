---
sidebar_position: 5
description: Discover everything about the evaluator services
---

# Evaluator Services

The `Evaluator Services` are standalone services that assess a [plan](/docs/using/plans/index.md) (and where supported, its [assets](/docs/using/assets/index.md)) against a defined standard or policy framework. Each evaluator returns one or more results. Each result has a rank, a list of per-check metrics, and feedback that users can act on to improve compliance.

## Services

| Service | Input | External service | Assets | Result shape |
|---|---|---|---|---|
| Evaluator RDA maDMP | The plan's **RDA JSON export** | None (validates locally) | Not supported | Pass/fail (1.0 / 0.0) per benchmark, with one feedback message per JSON Schema violation |
| Evaluator OSTrails | The plan's **RDA JSON export** | Yes: proxies to the [OSTrails DMP Evaluation Service](https://github.com/OSTrails/DMP-Evaluation-Service) | Not supported | Pass/fail (1.0 / 0.0) per OSTrails test result, plus a plan-level rank |
| Evaluator OpenAIRE FAIR | The plan's **RDA JSON export** | Yes: wraps the OpenAIRE FAIR assessment service | Not supported directly; plan evaluation returns **one result per asset** | Pass / fail / not evaluated per asset, with the OpenAIRE guideline checks as per-metric results |

All evaluators consume the RDA maDMP JSON produced by the [RDA file transformer](file-transformers/rda-json-semantics.md), **not** the plan model. The shape of the RDA export, and so the field semantics you have assigned, drives the evaluation result.

:::note
You can create your own evaluator; see [Evaluator plugin development](/docs/developers/plugins/evaluator.md).
:::

## Benchmarks, Tests, and Guidelines

An evaluator declares what it can be run against. This can be a set of **benchmarks** (named groups of checks), a set of individual **tests**, or both. When a user starts an evaluation, they choose from what the evaluator exposes:

- The RDA maDMP and OSTrails evaluators offer **benchmarks** (OSTrails can also expose **tests**).
- The OpenAIRE FAIR evaluator exposes its choices as **guidelines**.

When an evaluator provides both benchmarks and tests, the user first selects which kind to run, then picks one or more items. See [Evaluators](/docs/using/plans/evaluators.md) for the end-user flow.

## Results, targets, and the Not evaluated status

An evaluator responds with a **list** of rank results. Most evaluators return one result for the whole plan or asset. An evaluator that assesses each asset of a plan separately returns one result per asset and marks each with a **target**: the asset it covers. OpenCDMP checks that the target belongs to the evaluated plan. If it does not, the target is dropped and the result is kept. OpenCDMP also stores the asset's name with the result, so the report still reads correctly if the asset is later renamed or removed.

In the **Evaluation Result** dialog, several results render as tabs named after their assets, each linking to the asset's overview. Results without a target, from whole-plan evaluators or recorded before targets existed, are named `Result 1`, `Result 2`, and so on.

A result may also carry the `NotEvaluated` success status. It means the evaluator did not assess the target, for example because the asset has no persistent identifier the external service can resolve, or that service was unreachable. The evaluator puts the reason in the result's details. The UI shows a neutral `Not evaluated` chip with that reason. It is neither a pass nor a failure, and it does not color the verdict in the evaluation notification. For the plugin contract, see [Evaluator plugin development](/docs/developers/plugins/evaluator.md#5-result-models).

## Evaluator RDA maDMP

Validates the plan's RDA JSON export against the JSON Schema of the [RDA DMP Common Standard v1.3](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard). The check runs locally, with no outbound call. Each schema violation becomes one feedback entry (for example, `"#/dmp: required key [dataset] not found"`), and the benchmark rank is a binary **pass** (no violations) or **fail** (one or more violations).

The evaluator reads only the RDA export, so an incomplete export gives an incomplete evaluation. If you see unexpected failures, check the semantics of your plan blueprint and asset templates against the [RDA JSON semantics reference](file-transformers/rda-json-semantics.md). A required field missing from the export usually means a missing or wrong semantic on the source field.

Asset evaluation is not supported by this evaluator.

## Evaluator OSTrails

Forwards the plan to the [OSTrails DMP Evaluation Service](https://github.com/OSTrails/DMP-Evaluation-Service). For each chosen benchmark it posts the plan's RDA JSON export to `${OSTRAILS_EVALUATOR_BASE_URL}/assess/benchmark`, and for each chosen test to `/assess/test`. Each test result that OSTrails returns becomes one result, named after the benchmark or test, with a pass or fail (1.0 / 0.0) and the OSTrails title, description, and log as details. A benchmark that returns no test results counts as failed.

The benchmarks and tests users can choose are read from the OSTrails service (`/benchmarks/list/jsonLD` and `/tests/list`), or, when the installation switches remote lists off, from the evaluator's configuration; see [Evaluator Configuration](/docs/deployment/configuration/backend/evaluators.md#evaluator-ostrails).

The plan-level rank fails if any result fails. Asset evaluation is not supported.

As with the RDA evaluator, the input is the RDA JSON export, so what OSTrails sees depends on what the RDA transformer emits.

## Evaluator OpenAIRE FAIR

Assesses the assets of a plan against [FAIR principles](https://www.go-fair.org/fair-principles/) (Findable, Accessible, Interoperable, Reusable) using the OpenAIRE FAIR assessment service. It consumes the plan's RDA JSON export, produced by the configured RDA transformer. Users select its options as **guidelines**.

The evaluator walks the datasets of the RDA export, one per asset, and asks the OpenAIRE validator to assess the published record behind each dataset's persistent identifier (`dataset_id`, typically a DOI). It returns **one result per asset**, targeted at that asset through the `opencdmp_`-prefixed alternate identifier the RDA export stamps on every dataset. The per-asset rank is a pass/fail selection; each requested guideline becomes a benchmark result whose metrics are the individual OpenAIRE rules, with the rule's link, requirement level, and guideline attached as messages.

An asset is reported as `Not evaluated`, with the reason in the result details, when it has no persistent identifier that OpenAIRE can resolve (the RDA export falls back to the asset's internal id in that case) or when the OpenAIRE validator could not be reached. Deposit the asset or record its identifier, then evaluate again.

To enable it for the whole installation, register the evaluator service under `evaluator.sources` in the API service configuration, with `evaluatorId: openaire-fair` and the id of the RDA transformer as `rdaTransformerId`; see [Registering plugin services](/docs/deployment/configuration/plugin-services.md). The evaluator's own settings are in the [Evaluator Configuration](/docs/deployment/configuration/backend/evaluators.md#evaluator-openaire-fair).

---

## See also

- [Evaluator Configuration](/docs/deployment/configuration/backend/evaluators.md): environment variable reference for deploying evaluator services
- [Registering plugin services](/docs/deployment/configuration/plugin-services.md): running an evaluator and registering it for the installation or an organisation
- [RDA JSON semantics reference](file-transformers/rda-json-semantics.md): what drives the RDA export that the shipped evaluators consume
- [Evaluator plugin development](/docs/developers/plugins/evaluator.md): build your own evaluator
