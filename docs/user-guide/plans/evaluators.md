---
sidebar_position: 11
description: Discover evaluator options for a plan
---

# Evaluators

You can evaluate a plan from [evaluator services](optional-services/evaluator-services.md) after pressing `EVALUATE` and select evaluation type. One type of evaluation is:
- **Evaluator RDA maDMP**: checks whether a plan conforms to the [RDA DMP Common Standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard) JSON schema and show the validation result in a popup-message. If plan is not valid, errors are displayed.
- **Evaluator OSTrails DMP**: checks whether a plan conforms to the [OSTrails](https://github.com/OSTrails/DMP-Evaluation-Service) JSON schema and show the validation result in a popup-message. If plan is not valid, errors are displayed.
:::info
- Evaluation feature is available only in [`Plan Overview`](user-guide/plans/plan-overview.md)
- You can use the evaluation feature if current plan status has this action. More details can be found [here](admin-guide/system-configuration/plan-statuses.md)
:::

![Evaluate a plan](/images/plans/evaluators/evaluate-plan-overview.png)
*Evaluate a plan*

![Evaluator RDA maDMP result](/images/plans/evaluators/evaluation-popup-dialog.png)
*Evaluator RDA maDMP result*
