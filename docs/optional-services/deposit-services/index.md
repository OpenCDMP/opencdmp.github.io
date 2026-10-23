---
sidebar_position: 0
description: Discover everything about the deposit services
---

# Deposit Services

The `Deposit Services` are OpenCDMP plugins that publish [plans](/docs/using/plans/index.md) to external research repositories, such as Zenodo or a DSpace instance. Each service connects to one kind of repository: it creates a record there with the plan's metadata and files, and returns the persistent identifier that the repository assigns, typically a **DOI** (Digital Object Identifier). OpenCDMP stores the identifier with the plan.

The repository is a separate system that you or a third party run. The deposit service connects OpenCDMP to it.

The following deposit services are available. Their images are published on Docker Hub.

| Service | Supported Version(s) | Docker Image | Notes |
|---|---|---|---|
| [Zenodo](https://zenodo.org/) | InvenioRDM v12.0 | [`opencdmp/repository-deposit-zenodo`](https://hub.docker.com/r/opencdmp/repository-deposit-zenodo) | OAuth 2.0 or personal access token. See the [semantics reference](zenodo-semantics.md). |
| [DSpace](https://dspace.org/) | 8.x | [`opencdmp/repository-deposit-dspace`](https://hub.docker.com/r/opencdmp/repository-deposit-dspace) | Username/password authentication. See the [semantics reference](dspace-semantics.md). |
| [CKAN](https://ckan.org/) | 2.11.4 | [`opencdmp/repository-deposit-ckan`](https://hub.docker.com/r/opencdmp/repository-deposit-ckan) | Access token authentication. See the [semantics reference](ckan-semantics.md). |
| [Dataverse](https://dataverse.org/) | 6.9 | [`opencdmp/repository-deposit-dataverse`](https://hub.docker.com/r/opencdmp/repository-deposit-dataverse) | Access token authentication. See the [semantics reference](dataverse-semantics.md). |
| [Fedora](https://fedorarepository.org/) | 6.x | [`opencdmp/repository-deposit-fedora`](https://hub.docker.com/r/opencdmp/repository-deposit-fedora) | Username/password authentication. See the [semantics reference](fedora-semantics.md). |

:::note
You can create your own deposit service; see [Deposit plugin development](/docs/developers/plugins/deposit.md).
:::

## Publishing accounts and files

Users [publish a plan](/docs/using/plans/deposit-a-plan.md) to a repository under one of two accounts:

- **The organisation's account**: the record is published with the organisation's credentials, set in the repository's [organisation settings](#organisation-settings), or, when the organisation sets none, with the installation's account (configured through the service's [environment variables](/docs/deployment/configuration/backend/deposit.md)).
- **The user's own account**: the record is published with the user's credentials, either saved in the **Repository accounts** tab of their [profile](/docs/using/profile-settings.md#repository-accounts), typed in the publish dialog, or (for Zenodo) obtained by signing in to the repository in a pop-up. When a user chooses their own account, the organisation's or installation's account is never used instead.

Each organisation chooses which of the two its users may use. Credentials are stored encrypted, both in the organisation settings and in user profiles, and are never shown again once saved.

With each DOI the platform records how the plan was published (under the organisation's account, with saved or typed credentials, or by signing in) and which user published it. For a user's own account it also records the repository account the credentials belong to, as the service reports it: all five services do, and the Fedora service reports the username the deposit signed in with. The organisation's account is never looked up, so its identity in the repository is not stored or shown to users. When a later version of the plan is published to the same repository, the publish dialog uses this record to tell users which account must publish it, because a repository usually accepts a new version only from the account that published the earlier one. See [Publish a new version](/docs/using/plans/deposit-a-plan.md#depositing-a-new-version).

With the record, the platform uploads the files the repository accepts: the **Plan document** (PDF), the **Machine-actionable plan (RDA JSON)**, and, when the plan or its assets hold uploaded files, the **Supporting files** (a ZIP archive). An organisation can narrow this list with the **Files to deposit** setting. When the organisation has switched off the export plugin that produces the plan document or the RDA JSON, that file is not uploaded. All five services accept all three files.

All five repositories let users review and edit the record's metadata before it is published. For DSpace, the **Submission** setting then decides whether the record is published in the archive, submitted to the collection's review workflow, or left as a draft.

## Organisation settings

Each organisation adjusts how its users publish to a repository on the repository's page in the [organisation settings](/docs/administering/tenant-management/plugins.md#repositories) (**Settings** → **Plugins** → the repository → **Configure** → **Settings**). Empty settings follow the installation's value or the plugin's default.

### Shared settings

| Group | Setting | Description | Repositories |
|---|---|---|---|
| **Who publishes** | **Ways to publish** | The organisation's account and users' own accounts (default), only the organisation's account, or only users' own accounts | All |
| | **Preselected** | The choice users see selected when both are allowed: users' own accounts (default) or the organisation's account. Users with saved credentials start on their own account, unless an earlier version of the plan was published to the repository under the organisation's account. | All |
| | **Organisation account name** | What users see as the organisation's account in **Publish as**, and in the notice about an earlier version published under it. Empty: "The organisation's [repository] account". | All |
| **Organisation account** | **Access token** | The token of the organisation's account in the repository. Empty: the installation's account is used. | Zenodo, CKAN, Dataverse |
| | **Username** / **Password** | The credentials of the organisation's account in the repository. Empty: the installation's account is used. | DSpace, Fedora |
| **[Repository] record** | **Authors from plan members** | Which plan members are credited as authors: every member (default), owners and editors, owners only, or none, so that only the authors mapped through semantics (or, for Zenodo, added in the review) are credited | Zenodo, Dataverse, DSpace, Fedora |
| | **Link the public plan page** | Adds the plan's public OpenCDMP page to the record when the plan is public (default: yes). DSpace always adds it. | Zenodo, CKAN, Dataverse, Fedora |
| **Files** | **Files to deposit** | Which of the three files are uploaded with the record. Empty: all of them. | All |
| **Reference types** | **Licences**, **Funders**, **Grants**, **Organisations**, **Researchers** | The code of the reference type that holds each kind of plan reference, when it differs from the installation's. Each repository lists the kinds it reads. | Zenodo, CKAN, Dataverse |
| **Review** | **Hidden sections** | Sections users never see in the review. Values the plans map into them are still published. | Zenodo, CKAN, Dataverse, Fedora |
| | **Values users can't change** | Record defaults shown in the review as set by the organisation; users' edits to them are ignored. | Zenodo, CKAN, Dataverse, Fedora |

### Record defaults per repository

| Repository | Settings in the record group |
|---|---|
| Zenodo | **Community**, **Affiliation**, **Publisher**, **Resource type**, **Default licence**, **Copyright**, **Default language**, **Additional communities** |
| CKAN | **Organisation**, **Visibility**, **Licence**, **Tags**, **Groups**, **Dataset type**, **Maintainer**, **Maintainer email** |
| Dataverse | **Dataverse collection**, **Default subject**, **Metadata language**, **Licence**, **Contact name**, **Contact e-mail**, **Publish mode**; and, in the **Files** group, **Restrict files** |
| DSpace | **Collection**, **Default item type**, **Submission**, **Publisher**, **Rights**, **Rights URI** |
| Fedora | **Container**, **Publisher**, **Rights** |

Each setting is explained on the settings page itself. A value mapped in a blueprint or asset template through a semantic, such as a Zenodo community, generally takes precedence over the organisation's default. CKAN adds its **Tags** and **Groups** to the mapped ones, and DSpace always lists the **Default item type** first. The semantics reference of each repository gives the details.

## Plugin semantics reference

Every deposit plugin maps plan and asset fields to target-repository metadata fields by matching each field's [semantic tag](/docs/administering/content-management/templates/semantics.md). The semantics reference of each plugin lists which repository field each semantic populates:

- [Zenodo — semantics reference](zenodo-semantics.md)
- [DSpace — semantics reference](dspace-semantics.md)
- [CKAN — semantics reference](ckan-semantics.md)
- [Dataverse — semantics reference](dataverse-semantics.md)
- [Fedora — semantics reference](fedora-semantics.md)

---

## See also

- [Deposit Service Configuration](/docs/deployment/configuration/backend/deposit.md) - Environment variable reference for deploying deposit services
- [Registering plugin services](/docs/deployment/configuration/plugin-services.md) - Running a deposit service and registering it for the installation or an organisation
