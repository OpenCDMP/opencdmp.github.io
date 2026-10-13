---
sidebar_position: 3
description: Tag questions with semantic keys so that export, deposit, prefilling, and evaluation plugins can find their answers
---

# Semantics

**If your users export plans as RDA maDMP JSON, or deposit them to Zenodo or another repository, the semantic keys on your blueprints and asset templates decide what ends up in the file or the record.** A question without a key is invisible to those plugins: its answer is not exported, and the plugin writes a placeholder or leaves the value out.

A semantic is a free-form text tag on a question or input that says what its answer *means*, for example `rda.dmp.title` or `zenodo.publication_date`. The platform does not interpret or validate the tags; it passes them to the plugins, which look for the keys they know:

- **Export**: a [file transformer](/docs/optional-services/file-transformers/index.md), such as RDA maDMP JSON or RAiD JSON, writes each answer at the position its key names.
- **Deposit**: a [deposit service](/docs/optional-services/deposit-services/index.md), such as Zenodo, fills the metadata of the repository record from the keys. A repository can also receive the RDA JSON export of the plan as a file, so the RDA keys can matter for a deposit too.
- **Prefilling**: a [prefilling source](/docs/administering/system-configuration/prefilling-sources.md) fills the inputs whose key matches its target.
- **Evaluation**: [evaluators](/docs/optional-services/evaluator-services.md) locate answers by key, not by question, so they work with any template.

Your own keys, such as `my-org.dataset.access_rights`, are allowed too, for a custom plugin or an integration you control. The only requirement is that the plugin and the template use the same string. One input can carry several keys, for example `rda.dataset.title` and `zenodo.additional_title.title`, when the plan goes to both.

---

## Where semantics are set

Semantics are set in the **Structure** tab of the [blueprint and template editor](/docs/administering/content-management/structure-editor.md): in blueprints for plan-level values such as the grant, the organisations, and the contact, and in asset templates for asset-level values such as the dataset type, the access rights, and the license. They can sit at four levels:

| Level | Where to set it | What it says | Example |
|---|---|---|---|
| **Input** | The **Add semantics** chip of the input | What the answer to this input is | `rda.dataset.distribution.host.url` on a free-text input |
| **Question** | **This question is**, in the **Export** row of the question | Which object one answer to the question describes | `rda.dataset.distribution.host` on "Where will the data be deposited?" |
| **Section** | **This section is**, on the section card | Which object all the questions of the section describe together | `rda.dataset.distribution` on a "Data sharing" section |
| **Answer option** | **Answers stand for keys**, in the **Export** row of the question, then the **Stands for** column of the options | Which key values choosing this option stands for | The option "Zenodo" stands for `rda.dataset.distribution.host.title` = `Zenodo` |

When you type a key, the editor suggests keys already used in this blueprint or template, keys used in your other blueprints and templates, the keys and objects the installed plugins read, and the installation's list of suggested keys (set with `SEMANTICS_PATH`, see [Backend configuration](/docs/deployment/configuration/backend/index.md)). Free text is always accepted.

In the outline, the **Keys** view lists every key in use with the questions that carry it, and **Unmapped only** shows only the questions without a key.

---

## Objects: several questions, one exported object {#objects-several-questions-one-exported-object}

Standards such as RDA maDMP nest values inside objects: a dataset has distributions, and each distribution has a host and licenses. Without objects, every answer is exported as its own object, so a "Data sharing" section whose questions ask for the repository, the access level, and the license separately exports three half-empty distributions.

Setting an object on a section or a question tells plugins how answers belong together:

- **Section object**: all the questions of the section that carry keys under the object make up **one** object. For example, a section described as `rda.dataset.distribution` exports one distribution, even when its host, access level, and licenses are asked in separate questions. When sections are nested, the outermost section that describes the object counts.
- **Question object**: each answer to the question makes up one object. For example, a repeating question described as `rda.dataset.distribution.license` exports one license per answer, inside the section's distribution.
- **No object**: nothing changes. Each answer is exported as its own object.

Keys are always stored in full. Under an object, the editor may show a key shortened to the part after the object (for example `…host.url`).

:::note
The same object on two sections or questions is allowed: the export merges them. The import cannot tell them apart, so it fills only the first one.
:::

## Answer options that stand for key values {#answer-options-that-stand-for-key-values}

A select or radio input can let one answer set several keys at once. Each option can carry a list of key/value pairs, for example:

| Option | Stands for |
|---|---|
| Zenodo | `rda.dataset.distribution.host.title` = `Zenodo`, `rda.dataset.distribution.host.url` = `https://zenodo.org`, `rda.dataset.distribution.host.pid_system` = `doi` |
| Our institutional repository | `rda.dataset.distribution.host.title` = `Institutional repository`, `rda.dataset.distribution.data_access` = `restricted` |
| Not deposited yet | *Exports nothing* |

- When the author picks an option, plugins read its key values as if inputs with those keys had been answered. A key that an input of the same object answers explicitly wins over the option's value.
- An option marked **Exports nothing** leaves the question's object out of the export entirely (in the example, no distribution is written).
- On import, the option whose key values match the file is selected, and the **Exports nothing** option is selected when the file has no such object.

Only the option's key needs to be filled in; a key without a value is allowed.

---

## Minimal recipes

What a structure needs at the least for each common target. The [Review tab](#what-the-editors-show-about-plugins) shows, per plugin, what your structure still misses; every key a plugin reads is listed on its reference page.

### RDA maDMP export

The [RDA maDMP JSON transformer](/docs/optional-services/file-transformers/rda-json-semantics.md) fills the title, description, dates, language, and contact of the plan from the plan itself when no key is set. Without the following keys, it can write only a placeholder (`unknown`, or an internal id where a real identifier belongs):

| Where | Key | What to ask |
|---|---|---|
| Blueprint | `rda.dmp.contact.contact_id.identifier` | The contact person's identifier, such as an ORCID |
| Blueprint | `rda.dmp.ethical_issues_exist` | Whether the plan raises ethical issues: `yes`, `no`, or `unknown` (a Yes/No input works) |
| Asset template | `rda.dataset.dataset_id` | The dataset's identifier, such as a DOI |
| Asset template | `rda.dataset.personal_data` | Whether the dataset contains personal data: `yes`, `no`, or `unknown` |
| Asset template | `rda.dataset.sensitive_data` | Whether the dataset contains sensitive data: `yes`, `no`, or `unknown` |

Once a structure uses an RDA object, such as a distribution or a host, RDA requires some values inside it (for example `rda.dataset.distribution.data_access` and `rda.dataset.distribution.host.url`), and an object without them fails the RDA schema. The Review tab lists those only for the objects your structure uses.

### Zenodo deposit

The [Zenodo deposit service](/docs/optional-services/deposit-services/zenodo-semantics.md) needs no keys: it writes the title, description, version, creators (as the **Authors from plan members** setting decides), publisher, resource type, and publication date from the plan and the [repository settings](/docs/administering/tenant-management/plugins.md#repositories). Licenses, funders, grants, and contributors come from the plan's references, through the reference types set in those settings, not from keys.

The keys most structures add:

| Where | Key | What it fills |
|---|---|---|
| Blueprint or template | `zenodo.publication_date` | The publication date; the first valid answer wins, and today when unanswered |
| Blueprint or template | `zenodo.subject` | A keyword of the record, one per value |
| Blueprint or template | `zenodo.language` | A language of the record, as a three-letter ISO 639 code |
| Blueprint or template | `zenodo.community` | The community the record is submitted to; the configured community when unanswered |

The record also gets the RDA JSON export of the plan when **Machine-actionable plan (RDA JSON)** is among the files to deposit, so the [RDA recipe](#rda-madmp-export) applies too.

### Other targets

Each plugin documents the keys it reads:

| Target | Key prefix | Reference |
|---|---|---|
| RDA maDMP export and evaluation | `rda.` | [RDA maDMP JSON](/docs/optional-services/file-transformers/rda-json-semantics.md) |
| RAiD registration | `raid.` | [RAiD JSON](/docs/optional-services/file-transformers/raid-json-semantics.md) |
| Zenodo deposit | `zenodo.` | [Zenodo](/docs/optional-services/deposit-services/zenodo-semantics.md) |
| Dataverse deposit | `dataverse.` | [Dataverse](/docs/optional-services/deposit-services/dataverse-semantics.md) |
| DSpace deposit | `dspace.` | [DSpace](/docs/optional-services/deposit-services/dspace-semantics.md) |
| CKAN deposit | `ckan.` | [CKAN](/docs/optional-services/deposit-services/ckan-semantics.md) |
| Fedora deposit | `fedora.` | [Fedora](/docs/optional-services/deposit-services/fedora-semantics.md) |

The installation's default list of suggested keys also offers `heal_link.` and `fair_sharing_policies.` keys. No plugin delivered with OpenCDMP reads them; they are only useful to an integration of your own that does.

---

## What the editors show about plugins {#what-the-editors-show-about-plugins}

Each installed plugin can publish a **semantics manifest**: the keys it reads, the objects they make up, the form each value must take, and what the plugin writes when a value is not answered. The blueprint and asset template editors read these manifests and use them to:

- **Suggest** keys for inputs, objects for questions and sections, and key values for answer options (with a dropdown when the plugin accepts a fixed list of values).
- **Show coverage** per plugin. A value is either **needed** (the plugin cannot do its job, or its output fails the standard, without it) or **can use** (it improves the result and can be left out). A needed value that the plugin fills with a fallback is shown in amber with the fallback it writes; a needed value with nothing in its place is shown in red. Values inside an object count only when the structure uses that object, so a template without a metadata question is not asked for metadata values. A value that a picked reference supplies through its own fields counts as covered when a reference input carries its object. In a blueprint, the values that the attached asset templates fill also count, for the values a plugin reads from assets as well as from the plan.
- **Check** mappings that will not come out right, such as a free-text input on a key that needs a whole number or a date, option values outside the values a key accepts, a reference key on an input that is not a reference, the keys of one object spread over several questions with no object set, and keys the plugin does not read back on import. A date input on a key that takes a date and time is only a notice: the date is read as midnight (UTC).

Checks apply only to keys that a plugin's manifest lists; your own keys are never flagged. Nothing in the coverage or the checks blocks saving or finalizing.

In the editor, the checks of an input are listed under it, and the outline marks the questions with a mapping problem. The [Review tab](/docs/administering/content-management/structure-editor.md#review-tab) has one block per plugin, for example *RDA maDMP export*:

- A summary and a progress bar: how many of the needed values the structure covers, how many fall back, and how many of the values it can use are covered.
- **Fix**: needed values that nothing fills and mappings that will not export correctly, each with the questions involved and **Open in Structure**.
- **Falls back**: needed values that are missing, with what the plugin writes instead.
- **Good to know**: notices, such as a date read as midnight.
- **Could also use**: the values the plugin can use that the structure does not fill yet.

**Show mappings**, above the author preview of the Review tab, puts the semantic keys on the form.

---

## See also

- [The blueprint and template editor](/docs/administering/content-management/structure-editor.md) - Where the keys are set
- [Plugin semantics manifests](/docs/developers/plugins/common-models.md#semantics-manifest-models) - How a plugin declares the keys it reads
