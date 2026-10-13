---
title: Supplementary Services
description: The services that extend OpenCDMP - deposit services, evaluators, file transformers, notifications, and annotations
---

# Supplementary Services

OpenCDMP supports a range of supplementary services that extend the platform's functionality. These services are standalone components that integrate with the core platform to provide additional capabilities such as file export, repository deposit, plan evaluation, notifications, and annotations.

The following supplementary services are available:

- **[Deposit Services](deposit-services/index.md)**: deposit plans to external research repositories (Zenodo, DSpace, CKAN, Dataverse, Fedora) to mint a DOI.
- **[Evaluator Services](evaluator-services.md)**: evaluate and rank plans against standards such as RDA maDMP, OSTrails, and OpenAIRE FAIR.
- **[File Transformers](file-transformers/index.md)**: export and import plans and assets in file formats including DOCX, PDF, RDA JSON, and RAiD JSON.
- **[Notifications](notifications/index.md)**: send email and in-app notifications to users for updates, invitations, and plan activity.
- **[Annotations](annotations.md)**: review plans and assets together through comments.
<!-- kpi disabled  -->
<!-- - **[KPI Service](kpi.md)**: store indicator data published by the platform and render the statistics dashboards. -->

To run a file transformer, deposit service, or evaluator and make it available, see [Registering plugin services](/docs/deployment/configuration/plugin-services.md).

import DocCardList from '@theme/DocCardList';

<DocCardList />