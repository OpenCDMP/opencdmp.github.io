---
sidebar_position: 5
description: Discover plan versioning options
---

# Versions

A plan can have many versions. There is always one version that is marked as `current`, it is the most recent version and it is the one that gets displayed on the listing views. All the other ones are marked as `previous` and can be viewed when the `All Plan Versions` option is pressed.

:::info

If the current plan status has internal status with type `finalized` you can create a new version for this plan, which will have all the properties of the last one and it gets saved automatically the `starting status` (according to [Plan Workflow](user-guide/plans/plan-workflow.md)) ready for changes. Making a new version doesn't delete the previous ones.

:::

The `New Version` option can be found in the [`My Plans`](user-guide/plans/my-plans.md) [`plan overview section`](user-guide/plans/plan-overview.md) or [`Plan Overview`](user-guide/plans/plan-overview.md) pages. In the new version form, the user can change titles, descriptions, plan blueprints and optionally select which descriptions to include in the new version. After the process is completed, the new plan and descriptions are available for editing.


![version](/images/plans/version/versions.png)

:::note

When viewing a **previous version** of a plan, a message is displayed at the top of the page prompting the user to **navigate back to the latest version**.  
This helps ensure users are always aware of which version they're working on and can easily return to the most up-to-date plan.

:::