---
sidebar_position: 5
description: Discover everything about the evaluator services
---

# Evaluator Services

The `Evaluator Services` are standalone services that assess a [plan](/versioned_docs/version-1.x/using/plans/index.md) (and where supported, its [descriptions](/versioned_docs/version-1.x/using/descriptions/index.md)) against a defined standard or policy framework. Each evaluator returns a rank, a list of per-check metrics, and human-readable feedback that users can act on to improve compliance.

## Services

| Service | Input | External service | Descriptions | Result shape |
|---|---|---|---|---|
| Evaluator RDA maDMP | The plan's **RDA JSON export** | None — validates locally | Not supported | Pass/fail (1.0 / 0.0) per benchmark, with one feedback message per JSON Schema violation |
| Evaluator OSTrails | The plan's **RDA JSON export** | Yes — proxies to the [OSTrails DMP Evaluation Service](https://github.com/OSTrails/DMP-Evaluation-Service) | Not supported | Per-metric pass/fail (1.0 / 0.0) from OSTrails, plus a benchmark-level rank and a plan-level rank |
| Evaluator OpenAIRE FAIR | Would wrap the [OpenAIRE FAIR assessment service](https://www.openaire.eu/) | Yes (external) | — | Referenced in the docs; no plugin implementation currently shipped. Treat as a planned integration. |

All evaluators consume the RDA maDMP JSON produced by the [RDA file transformer](file-transformers/rda-json-semantics.md) — **not** the plan model directly. That means the shape of the RDA export (and therefore the field semantics you've assigned) is what drives the evaluation result.

:::note
You can create your own evaluator. More details [here](/versioned_docs/version-1.x/developers/plugins/evaluator.md).
:::

## Evaluator RDA maDMP

Validates the plan's RDA JSON export against the [RDA DMP Common Standard v1.2](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) JSON Schema (draft-07). The check runs locally — no outbound call. Each schema violation becomes one feedback entry (for example, `"#/dmp: required key [dataset] not found"`), and the benchmark rank is a binary **pass** (no violations) or **fail** (one or more violations).

Because the evaluator reads only the RDA export, the completeness of your export dictates the completeness of the evaluation. Revisit your plan blueprint's and description templates' semantics (see the [RDA JSON semantics reference](file-transformers/rda-json-semantics.md)) if you see unexpected failures — missing required fields in the export typically trace back to a missing or misassigned semantic tag on the source field.

Description evaluation is not supported by this evaluator.

## Evaluator OSTrails

A thin proxy to the [OSTrails DMP Evaluation Service](https://github.com/OSTrails/DMP-Evaluation-Service). It posts the plan's RDA JSON export as a multipart form with a benchmark id to `${OSTRAILS_EVALUATOR_BASE_URL}/assess/benchmark/json-ld` and translates the returned JSON-LD graph into OpenCDMP's result model. Each `ftr:TestResult` node becomes one metric (pass/fail, 1.0 / 0.0) with the upstream title, description, and log attached for user-facing feedback. Available benchmarks can be fetched dynamically from `/benchmarks/list`.

The plan-level rank fails if any metric fails. Description evaluation is not supported.

As with the RDA evaluator, the input is the RDA JSON export — not the plan object — so what OSTrails sees depends on what the RDA transformer emits.

## Evaluator OpenAIRE FAIR

Referenced in the documentation as a future integration with the OpenAIRE FAIR assessment service for [FAIR principles](https://www.go-fair.org/fair-principles/) (Findable, Accessible, Interoperable, Reusable) compliance scoring. No plugin implementation is shipped in the current repository. If you need FAIR-style assessment today, the OSTrails evaluator exposes FAIR-oriented benchmarks via its upstream service.

---

## See Also

- [Evaluator Configuration](/versioned_docs/version-1.x/deployment/configuration/backend/evaluators.md) — environment variable reference for deploying evaluator services
- [RDA JSON — semantics reference](file-transformers/rda-json-semantics.md) — what drives the RDA export that both shipped evaluators consume
- [Evaluator plugin development](/versioned_docs/version-1.x/developers/plugins/evaluator.md) — build your own evaluator
