---
sidebar_position: 11
description: Discover evaluator options for a plan
---

# Evaluators

Evaluators assess a plan (and optionally its descriptions) against a defined standard or set of criteria. Each evaluator runs independently and returns a score along with a detailed breakdown of what passed and what needs attention.

:::info
- The evaluation feature is available only on the [Plan Overview](using/plans/plan-overview.md) page.
- Evaluation is only available when the current plan status permits it. See [Plan Statuses](administering/system-configuration/plan-statuses.md) for details.
- The evaluators available to you depend on which [Evaluator Services](optional-services/evaluator-services.md) your administrator has configured.
:::

## How to Evaluate a Plan

1. Open the **Plan Overview** page for the plan you want to evaluate.
2. Click **Evaluate**.
3. Select the evaluator you want to use from the list.
4. If the evaluator supports multiple benchmarks, select which ones to apply.
5. Click **Run**. The evaluation result appears in a popup dialog.

![Evaluate a plan](/images-1.x/plans/evaluators/evaluate-plan-overview.png)
*Evaluate a plan*

## Understanding the Results

The result dialog shows:

- **Overall score** — a summary score across all selected benchmarks.
- **Per-benchmark breakdown** — each benchmark is listed separately with its own score.
- **Per-criterion detail** — within each benchmark, individual criteria are listed with pass/fail status and explanatory messages describing what was checked and why it passed or failed.

![Evaluator result dialog](/images-1.x/plans/evaluators/evaluation-popup-dialog.png)
*Evaluation result*

Scores are displayed either as a numeric range (e.g., 0.0–1.0) or as a discrete outcome (e.g., Pass / Fail), depending on how the evaluator is configured.

## Available Evaluators

### Evaluator RDA maDMP

Checks whether a plan conforms to the [RDA DMP Common Standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) JSON schema (v1.2). The result shows which required fields are missing or invalid according to the RDA specification.

:::note
Description evaluation is not supported by this evaluator.
:::

### Evaluator OSTrails

Checks whether a plan or description aligns with the [OSTrails](https://github.com/OSTrails/DMP-Evaluation-Service) metadata and policy framework. It assesses completeness, openness, and reproducibility of the research data management strategy.

### Evaluator OpenAIRE FAIR

Assesses whether a plan meets [FAIR principles](https://www.go-fair.org/fair-principles/) (Findable, Accessible, Interoperable, Reusable) as defined by the OpenAIRE FAIR assessment service.

:::note
This evaluator requires the plan to have been deposited to a repository (e.g., Zenodo) before evaluation. The DOI from the deposit is used to retrieve the published record for assessment.
:::

## Acting on Results

When an evaluation reveals issues:

1. Review the per-criterion messages — each explains specifically what is missing or incorrect.
2. Return to the plan editor and fill in or correct the flagged fields.
3. Re-run the evaluation to confirm the issues are resolved.

You can run evaluations as many times as needed. Evaluation does not modify the plan.

## See Also

- [Evaluator Services](optional-services/evaluator-services.md) — the available evaluators and how they are configured
- [Plan Overview](using/plans/plan-overview.md) — where the Evaluate button is located
- [Deposit a Plan](using/plans/deposit-a-plan.md) — required before running the OpenAIRE FAIR evaluator
