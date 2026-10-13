---
sidebar_position: 10
description: Answers to frequently asked questions about OpenCDMP
---

# Frequently asked questions

Something not working? See [Troubleshooting](/docs/troubleshooting.md).

---

## General

### What is the difference between a Plan and an Asset?

A **Plan** is the Output Management Plan itself (a DMP, an SMP, and so on), with its title, contacts, funders, and access rights. An **Asset** is an entry in the plan about one research output, such as a dataset or a piece of software; a plan can hold many. See [Plans](/docs/using/plans/index.md) and [Assets](/docs/using/assets/index.md).

---

### What is the difference between a Blueprint and an Asset Template?

A **Blueprint** defines the structure of a *plan*: its sections, plan-level fields, and the asset templates each section offers. An **Asset Template** defines the questions of an *asset*. See [Blueprints](/docs/using/blueprints.md) and [Asset Templates](/docs/using/blueprints.md#asset-templates).

---

### Can I use OpenCDMP without an external repository (Zenodo, Dataverse, etc.)?

Yes. You can create, edit, download, and evaluate plans without publishing them. Publishing to a repository is needed only to get a DOI.

---

### Can I have multiple versions of a plan?

Yes. Once a plan is finalized, **Start new version** on the plan overview creates a copy that you can change. Earlier versions are reached from the **Version** dropdown, where you can also compare two versions. See [Versions](/docs/using/plans/versions.md).

---

## Plans and assets

### Why can't I edit a finalized plan or asset?

Finalized plans and assets are locked. Move them back to a draft status, if the workflow allows it, or start a new version of the plan. Ask your administrator if neither is offered. See [Plan workflow](/docs/using/plans/plan-workflow.md).

---

### How do I invite collaborators to my plan?

Open the **Collaborators** panel from the plan overview or the plan editor, click **Share**, pick an existing collaborator or enter an email address, choose a role, and click **Send invite**. Only plan owners can invite, also after the plan is finalized. See [Work together](/docs/using/plans/invite-collaborators.md).

---

### How do I add a value that is not in the reference list?

Click **Insert it manually** under the field's search bar, enter the **Name** and any details, and click **Add**. See [Add a reference manually](/docs/using/references.md#adding-a-reference-manually).

---

### What file formats are supported for download and import?

Plans download as PDF, Word, RDA JSON, RAiD JSON, or XML, and import from XML, RDA JSON, or RAiD JSON. The formats offered depend on the [file transformer services](/docs/optional-services/file-transformers/index.md) your installation runs; XML is always available. See [Which format?](/docs/using/download.md#which-format) and [Import a plan](/docs/using/plans/imports.md).

---

### Can I import an existing DMP from another tool?

Yes, if the tool exports RDA maDMP JSON. During the import, you choose a blueprint and map each entry of the file to an asset template and section. See [Import a plan](/docs/using/plans/imports.md).

---

## Deposit and DOI

### What is a DOI and how do I get one?

A **DOI** is a permanent, citable identifier. You get one by publishing a finalized plan to a repository such as Zenodo with **Publish**; it then appears on the plan overview. Publishing is not the same as making a plan public: see [Public plan](/docs/glossary.md#public-plan) and [Publish](/docs/glossary.md#publish). See [Publish a plan](/docs/using/plans/deposit-a-plan.md).

---

### Do I need to log in to Zenodo (or another repository) to deposit?

Only when you publish under your own repository account. Under **Publish as**, the organisation's account needs no login; your own account uses the credentials saved in your [profile](/docs/using/profile-settings.md#repository-accounts), typed in the dialog, or, for Zenodo, a sign-in pop-up. Your organisation decides which of the two you may use.

---

### Publishing failed. What now?

The dialog says why, and nothing was published. See [Publishing fails and no DOI is returned](/docs/using/troubleshooting.md#deposit-fails-no-doi-returned).

---

## Evaluation

### Which evaluator should I use?

| Goal | Evaluator |
|---|---|
| Check compliance with the RDA maDMP JSON schema | **Evaluator RDA maDMP** |
| Assess alignment with open science and the OSTrails framework | **Evaluator OSTrails** |
| Check the published records of the plan's assets against the FAIR principles | **Evaluator OpenAIRE FAIR** |

Your installation may offer others. See [Evaluate a plan or asset](/docs/using/plans/evaluators.md).

---

### The OpenAIRE FAIR evaluator reports assets as "Not evaluated". Why? {#openaire-fair-not-evaluated}

The evaluator assesses the published record behind each asset's persistent identifier, typically a DOI. An asset without one has nothing to assess. Publish the output, record its identifier in the asset, and evaluate again. See [Evaluator OpenAIRE FAIR](/docs/optional-services/evaluator-services.md#evaluator-openaire-fair).

---

## Configuration (administrators)

### What are semantics and do I need to configure them?

Semantics are tags on blueprint and template questions that say what each question means. Download formats, repositories, prefilling sources, and evaluators use them to find the right answers. Assign them when you use any of these. See [Semantics](/docs/administering/content-management/templates/semantics.md).

---

### What is the difference between a plan status and the internal status?

A **status** is a state that you name, such as "Under Review". What it **counts as** (draft, finalised, or a step in between) decides whether the plan can still be edited, published, or versioned. See [What a status counts as](/docs/administering/system-configuration/workflows.md#internal-statuses).

---

### Why do users not see a blueprint, template, or status?

Usually because it is not finalized, belongs to another organisation, or the workflow does not lead to it. See [Troubleshooting for administrators](/docs/administering/troubleshooting.md).

---

### How can I see how a question was answered across all plans in my organisation? {#how-can-i-see-how-a-question-was-answered-across-all-plans-in-my-tenant}

Use **Research Insights** in the **Analytics** group of the admin menu. It counts the answers to a question across the organisation, with breakdowns and a CSV export. See [Research Insights](/docs/administering/reports.md).

---

<!-- kpi disabled  -->
<!-- ### Where can I see usage statistics such as the number of plans over time?

The **Usage** page (**Analytics > Usage**) shows charts of plans, assets, references, users, blueprints, and templates over time, with an organisation-wide or installation-wide scope depending on your role. It requires the optional [KPI Service](/docs/optional-services/kpi.md) to be deployed and enabled. See [Statistics](/docs/administering/statistics.md).

--- -->

### Can OpenCDMP notify an external system when a plan changes?

Yes, with **webhooks**: signed HTTP `POST` requests sent when, for example, a plan is finalized or published. A system administrator must enable them for the installation. See [Webhooks](/docs/administering/webhooks.md).

---

### Can I move an organisation's content to another installation or copy it to another organisation? {#can-i-move-a-tenants-content-to-another-installation-or-copy-it-to-another-tenant}

Yes. A system administrator exports, imports, copies, or purges an organisation's content on the **Data Transfer** page (**Installation > Data Transfer**). See [Data Transfer](/docs/administering/tenant-management/tenant-transfer.md).

---

### Can I create a custom evaluator, file transformer, or deposit service?

Yes. Each plugin is a separate Spring Boot service built on the OpenCDMP base packages. Once deployed, a system administrator registers it for the installation, or an organisation administrator connects it with **Add plugin** under **Settings > Plugins**. See [Plugins](/docs/developers/plugins/index.md).
