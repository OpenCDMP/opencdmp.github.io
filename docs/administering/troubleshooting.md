---
title: Troubleshooting for administrators
description: Why users do not see a blueprint, template, status, reference, or prefilled value, and what to check when webhooks, plugins, publishing, notifications, or exports fail
---

# Troubleshooting for administrators

These are problems that an organisation or system administrator fixes in the application. For problems that users can solve themselves, see [Troubleshooting for users](/docs/using/troubleshooting.md); for problems with the services, containers, and configuration files, see [Troubleshooting a deployment](/docs/deployment/troubleshooting.md).

Each section starts from what you or your users see. Check the causes in the order listed.

## Templates and workflows

### Users are not offered a blueprint

- **The blueprint is a draft.** Only finalized blueprints are offered. Finalize it; see [Statuses and versions](/docs/administering/content-management/blueprints/index.md#statuses).
- **A new version is still a draft.** Users get the current finalized version until you finalize the new one. Plans already started stay on the version they were created with.
- **It belongs to another organisation.** A blueprint is visible only in the organisation that owns it. Blueprints of the default organisation are shared with every organisation.

To have a blueprint pre-selected or shown first, set **Blueprint for new plans** or **Featured blueprints** in the [content defaults](/docs/administering/tenant-management/content-defaults.md).

### Users are not offered an asset template

- **The template is a draft**, or its new version is. As for blueprints, only the current finalized version is offered; see [Statuses and versions](/docs/administering/content-management/templates/index.md#statuses).
- **The blueprint section does not list it.** When adding an asset, users get the templates listed under **Templates authors can use** of that section, plus any finalized template when **Authors may add other templates** is on. See [Assets in this section](/docs/administering/content-management/blueprints/index.md#asset-templates-form).
- **The section does not collect assets.** **Assets in this section** must be on.

If a question of a template does not show, check its visibility rules: a conditional question stays hidden until the answer that shows it is given. See [Conditional questions](/docs/administering/content-management/templates/conditional-questions.md).

### A status is missing from the status menu

A target status is offered only when **both** hold:

1. The current status has a move to it: in [Allowed changes](/docs/administering/system-configuration/workflows.md#allowed-changes), the box in the row of the current status and the column of the target status is ticked.
2. The user matches **Who can move a plan here** (or **Who can move an asset here**) of the target status. With no option ticked, nobody can move work into it.

Also check that the target status is reachable at all: the diagram draws unreachable statuses with a dashed border. A published plan cannot change status any more, and reverting a finalized plan is refused once a newer version of it has been started. See [Who can change a status](/docs/administering/system-configuration/workflows.md#authorization-and-transitions).

When users report that **Download**, **Evaluate**, or **Publish** is disabled, check the actions the current status allows in its [status panel](/docs/administering/system-configuration/workflows.md#status-drawer).

An integration that changes statuses through the API follows the same workflow: a move the workflow does not have is refused with error `210` (*The workflow does not allow this status change*).

## Data sources

### A reference search returns nothing

Open the reference type and run the user's search text in [Test and map](/docs/administering/system-configuration/api-sources.md#test-and-map) of each source. The result shows the HTTP status, the number of results, and the URL that was sent, or the error the API returned.

- **No rule sends the search text.** A placeholder sends the search text only through a rule. For a plain search, add a rule with the condition `is anything` and the value `{like}`. Check it with **Try a search**. See [Search rules](/docs/administering/system-configuration/api-sources.md#search-rules).
- **The mapping drops every result.** Entries without a **Reference ID** or **Name** are dropped. Check that **Results are in** points to the list of results, and that both paths give a value in the preview.
- **The format is wrong.** A reply read as JSON when it is XML, or the reverse, maps nothing; the test offers to **Switch** the format.
- **The API needs a token** or a header that is not set. Turn on **Needs a token** if it uses one. Custom headers, such as API keys, are not supported.
- **The source filters nothing itself.** For an API without search, set **Who filters the results** to the application, so that it keeps the entries whose name contains the search text.

A source that fails while users search returns no results, and the error is written to the API service log; the other sources of the type still answer.

### Prefilling is not offered, or fills nothing

- **The section does not offer it.** Turn on **Prefill assets from repositories** on the blueprint section. An empty source list means every active source of the organisation. See [Prefilling](/docs/administering/content-management/blueprints/index.md#prefilling-sources-form).
- **No active source.** Users then see *No data sources are enabled for this section.*
- **The semantics do not match.** A fill rule fills a template question only when the semantic of the rule equals the semantic of the question. Check the semantics of the template's questions against the rules; see [Semantics](/docs/administering/content-management/templates/semantics.md).
- **A rule is marked.** `Goes nowhere` means the rule has neither an asset field nor a semantic; `Not returned by the record` means the record field it takes is no longer in the search or full record.

Use **Try it as an author would** on the prefilling source to see what each rule puts where, without saving. See [Fill rules](/docs/administering/system-configuration/prefilling-sources.md#4-fill-rules).

## Texts and languages

### Changed texts do not show

- **Users have not reloaded.** Texts are loaded when the application starts; changes show after users reload the page.
- **Another language.** A change applies to the language you edited. Users who chose another language keep seeing that language's texts.
- **Another organisation.** The changes of the default organisation apply to every organisation, and an organisation's own changes apply on top of them. Check that you edited the language in the organisation where users work.

See [How texts are stored](/docs/administering/system-configuration/languages.md#how-texts-are-stored).

## Integrations

### A webhook delivers nothing

Open the webhook's **Delivery log** and use **Send test ping**.

- **The log stays empty after real events**, and test pings stay `Pending`: webhooks are switched off for the installation (`WEBHOOKS_ENABLED=false`). A system administrator sets it to `true` or removes it; see [Webhooks configuration](/docs/deployment/configuration/backend/index.md#webhooks-configuration). Events that happen while webhooks are switched off are not recorded, so they are not delivered later.
- **Deliveries fail at once with** *target resolves to a private or local address*: the payload URL resolves to a loopback, link-local, or private network address, which the installation refuses by default. The same detail appears when the host name cannot be resolved. Use a public address, or have the system administrator set `WEBHOOKS_DENY_PRIVATE_ADDRESSES=false` for a receiver on an internal network.
- **Deliveries fail with** *unexpected http status*: the receiver answered, but not with a `2xx` status. Check the receiver's own log.
- **Deliveries are retried** with growing delays and marked `Failed` after the last attempt. Fix the receiver, then click **Redeliver**.
- **The webhook is disabled.** Pending deliveries of a disabled webhook are marked `Failed`.

See [Webhooks](/docs/administering/webhooks.md#retries).

### A plugin is missing, or reads Not responding

Users miss a download format, a repository, or an evaluator. Open **Organisation > Settings > Plugins**:

- **The plugin is switched off.** Turn on its switch (**Offered to users**) and save.
- **It reads Not responding.** Open **Configure** > **Connection** and click **Test connection**. A plugin added by the organisation needs its base **Address**, without the `/api` part, and a working **Token issuer address**, **Client id**, and **Client secret**. A plugin provided by the installation is fixed by the system administrator; see [Plugin connectivity](/docs/deployment/troubleshooting.md#plugin-connectivity).
- **The Plugin id does not match.** It must equal the id the plugin reports for itself, case included. **Test connection** shows the id to use when they differ.
- **The plugin is not listed.** A system administrator registers it for the whole installation, or you connect it with **Add plugin**.

An evaluator offered for plans but not for assets declares only plans as what it evaluates; that is set in the plugin, not here. See [Plugins](/docs/administering/tenant-management/plugins.md).

### Publishing fails for users

Users see the causes described in [Publishing fails and no DOI is returned](/docs/using/troubleshooting.md#deposit-fails-no-doi-returned). The three refusals that name their cause carry these error codes:

| Error code | Shown as | What to check |
|---|---|---|
| `194` (`deposit-credentials-missing`) | **Your [repository] credentials are missing** | The user chose their own account without credentials. Nothing to fix on your side, unless the organisation's account should be allowed. |
| `195` (`deposit-sign-in-failed`) | **[repository] didn't accept the sign-in** | When it keeps failing for everyone, the repository's OAuth2 client settings in the [deposit service configuration](/docs/deployment/configuration/backend/deposit.md). |
| `196` (`deposit-way-not-allowed`) | **[repository] didn't publish the plan**, *Your organisation does not allow publishing to this repository under this account* | **Ways to publish** under **Who publishes** in the repository's [settings](/docs/administering/tenant-management/plugins.md#repositories). |

For other failures, the dialog shows the repository's message under **Details**:

- **The organisation's account.** Check the **Access token** (or **Username** and **Password**) under **Organisation account** in the repository's settings: valid, not expired, and with the permissions the repository requires. When the organisation sets none, the installation's account is used, which the system administrator configures.
- **Repository metadata.** Some repositories require fields such as a license. Check the record defaults of the repository's settings and the [deposit service](/docs/optional-services/deposit-services/index.md) documentation.
- **Anything else.** The deposit service's log holds the repository's full answer; see [Deposit service cannot reach the repository](/docs/deployment/troubleshooting.md#deposit-service-cannot-reach-the-repository).

To check the whole setup step by step, see [Set up publishing to a repository](/docs/administering/publishing-setup.md).

### Evaluation fails or shows no benchmarks

- **Benchmarks are missing.** The benchmarks come from the evaluator itself. If none are listed, run **Test connection** on the evaluator's plugin page; if it answers, the evaluator declares none, which its provider fixes.
- **Assets are reported as Not evaluated.** The OpenAIRE FAIR evaluator skips assets without a persistent identifier; see [Evaluator OpenAIRE FAIR](/docs/optional-services/evaluator-services.md#evaluator-openaire-fair).
- **The evaluation fails.** Evaluators that call external services fail when those services are unreachable. The evaluator's log names the cause; see [Plugin connectivity](/docs/deployment/troubleshooting.md#plugin-connectivity).

## Notifications and users

### Notifications are not sent

- **The channel is not allowed.** Under **Organisation > Settings > Notifications**, check that the notification may use the channel users expect, and which channel is tried first. See [Notifications](/docs/administering/tenant-management/notifications.md).
- **The notification was sent, but not received.** A system administrator can look up each notification and its result on the [Notification Log](/docs/administering/notification-log.md) page (**Installation > Notification Log**), and use **Send again** on a **Failed** or **Skipped** one.
- **Nothing is sent at all.** The notification service, its mail server settings, or RabbitMQ is down; see [Notifications and comments are not processed](/docs/deployment/troubleshooting.md#notifications-and-comments-are-not-processed).

To change what a notification says, see [Notification templates](/docs/administering/system-configuration/notification-templates.md).

### Users cannot be invited to the organisation

- **Your role.** Only the **Organisation Admin** and **System Administrator** roles see **Invite users** on the **Users** page, in the **This organisation** view. See [Inviting users](/docs/administering/user-management/tenant-users.md#inviting-users).
- **The person already has an account.** Accounts are created the first time a person signs in; there is no need to create them in Keycloak. One account can belong to several organisations. Search the users list first.
- **The invitation email does not arrive.** See [Notifications are not sent](#notifications-are-not-sent).

### A role change has no effect

Role changes apply the next time the person opens the application. Ask them to reload the page.

### A role cannot be changed

The drawer on the **Users** page shows why a role is locked, and the API refuses the same changes:

| Error code | Shown as | What to do |
|---|---|---|
| `199` (`cannot-remove-own-admin-role`) | *You can't take an admin role away from yourself.* | Ask another System Administrator or Organisation Admin to make the change. |
| `209` (`last-tenant-admin`) | *An organisation needs at least one Organisation Admin. Make someone else Organisation Admin first.* | Give the role to someone else, then take it away from this person. |

- **The person has not signed in yet.** The drawer shows *Roles can be changed after their first sign-in*. Invite them, or ask them to sign in once.
- **The System Administrator role.** Only a System Administrator can give or take it away.

See [Changing roles](/docs/administering/user-management/tenant-users.md#changing-roles).

### A plan stays locked

A lock is released when its holder leaves the editor, or shortly after their editor stops renewing it. A system administrator can remove a lock that stays on the [Edit Locks](/docs/administering/entity-locks.md) page; the holder loses their unsaved changes.

## Search

### Search or filters return nothing after an upgrade

The search indexes may not match the new version. In 2.0, for example, the blueprint and asset type filters return nothing for existing plans until the indexes are rebuilt. A system administrator runs **Rebuild plan and asset indexes** from the **Search index** group of the [Maintenance](/docs/administering/maintenance.md#task-groups) page. See [Rebuild the Elasticsearch indexes](/docs/deployment/install/upgrade.md#6-rebuild-the-elasticsearch-indexes).

If plans are missing from searches outside an upgrade, the same task fills the indexes again from the database.

## Exports

### DOCX or PDF documents leave out content or look wrong

- **Unanswered questions** are left out by default, and settings such as **Question layout** or **Cover page** change what the document contains. Check the settings of the DOCX transformer under **Organisation > Settings > Plugins** > **Configure**, and the **Export template** of the plan's blueprint. See [DOCX export settings](/docs/optional-services/file-transformers/docx-export-settings.md).
- **A custom template** produces the wrong layout. Uploaded templates are checked right away, and warnings appear under the uploader. See [Managing templates](/docs/optional-services/file-transformers/docx-templates.md).
- **Semantics are missing.** Machine-readable formats such as RDA JSON fill their fields from the semantics of the blueprint and template questions. The **Review** tab of the editors shows what each plugin gets.

### A download fails or the file is empty

- **The format is not offered.** See [A plugin is missing, or reads Not responding](#a-plugin-is-missing-or-reads-not-responding).
- **PDF fails, Word works.** PDF documents are converted from Word by a separate PDF service, which the system administrator checks.
- **Every download of a format fails.** The transformer's log holds the cause; see [Plugin connectivity](/docs/deployment/troubleshooting.md#plugin-connectivity).
