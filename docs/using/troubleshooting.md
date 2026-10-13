---
sidebar_position: 20
title: Troubleshooting for users
description: What to do when you cannot sign in, save, find a plan, invite someone, download, upload, or publish
---

# Troubleshooting for users

Find what you see below, check the usual causes, and fix what you can. Administrators find their side of these problems in [Troubleshooting for administrators](/docs/administering/troubleshooting.md).

## Signing in

### The sign-in page does not accept your password

- **A typing error.** The password is case-sensitive; check that Caps Lock is off.
- **A forgotten password.** Click **Forgot Password?** on the sign-in page and follow the link in the email (check the spam folder). The link appears only when your installation allows password reset; if it is missing, ask your administrator.
- **A locked account.** After repeated failed attempts, the sign-in service can lock an account for a while. Wait and try again, or ask your administrator.
- **You sign in through your institution.** Check that you can sign in to your institution's own service directly; if not, the problem is on its side.

### You are sent back to the sign-in page, or the browser reports too many redirects

- **Old cookies.** Clear the cookies of the site, close the browser, and sign in again. A private window is a quick way to test this.
- **A browser extension.** Ad and tracker blockers can interrupt the sign-in. Disable them for the site.
- **Your session expired.** After a period without activity you are signed out, and unsaved changes are lost. Save your work before you leave the application idle.

If the loop continues in a private window, the installation is misconfigured: tell your administrator (see [Signed in, but every request fails with 401](/docs/deployment/troubleshooting.md#issue-signed-in-but-every-request-fails-with-401)).

### You are signed in, but a message asks you to select an organisation

The messages *Organisation Selection Required. Please select an organisation before proceeding.* and *You are not allowed to access this page based on your associated organisation. Please reselect your Organisation.* mean that the page belongs to another organisation, or that none is selected. Choose the organisation from the organisation button in the top navigation bar, which shows the organisation you are working in. If the organisation you need is not listed, you are not a member of it: ask its administrator to invite you.

## Saving and finalizing

### The plan cannot be saved

**Save** checks only a few things; everything else waits until you finalize. A plan saves when it has:

- a **Title**;
- a name and a template for each asset you added or changed;
- at least one owner. Otherwise the message reads *The plan cannot be saved without an assigned owner for all sections.*

If the message reads *It looks like someone else has made changes to this page. Please reload to view the latest updates.*, a collaborator saved the same plan or asset after you opened it. Copy the text you added, reload the page, and enter it again.

See [Saving your work](/docs/using/plans/create-or-edit-a-plan.md#saving-your-work).

### Required fields block finalizing {#issue-required-field-errors-preventing-save}

Fields marked in red, and an amber counter on sections and assets, mean that required questions are still empty or invalid.

- **Find the missing fields.** The **Required fields** counter under the table of contents, and the amber counter on each section and asset, show how many fields still need input; hover a counter to see which.
- **Use the finalize dialog.** It lists the **Sections needing input** and the assets marked **(Invalid)**; click **Fix fields** next to one to jump to it.
- **Read the message under each red field.** It says what is wrong, for example an invalid URL.
- **Check conditional questions.** Some answers show further questions, which can be required too.

See [Required fields](/docs/using/plans/create-or-edit-a-plan.md#required-fields).

### The status you need is not in the status menu

The status menu offers only the statuses that the workflow allows from the current status **and** that your role may move the plan to.

- **Unsaved changes.** The status options are disabled until you save or discard them (*Save your changes first*).
- **Your role.** Moving to some statuses, finalizing for example, may be reserved for owners or administrators. Ask a plan owner.
- **The workflow.** If nobody can reach the status, ask your administrator; see [Plan workflow](/docs/using/plans/plan-workflow.md).

### A finalized plan cannot be edited

A finalized plan is locked. Move it back to a draft status, if the workflow offers one, or start a new version with **Start a new version** (see [Versions](/docs/using/plans/versions.md)). A plan that has been published cannot change status any more.

### The editor turns read-only while you work, or shows Preview instead of Edit {#edit-locks}

Someone else is editing the same plan or asset. OpenCDMP locks each plan and each asset separately while a person edits it:

- The editor shows **This plan is locked for editing** (or **This asset is locked for editing**) with **Locked by** and the person's name, and the overview offers **Preview** instead of **Edit**. Wait until they close the editor, or work on another asset.
- The lock is released when its holder leaves the editor, or about two minutes after their editor stops renewing it, for example when they closed the browser. A lock that stays longer can be removed by a system administrator on the [Edit Locks](/docs/administering/entity-locks.md) page.
- **You no longer hold the editing lock** means that your own lock expired or was taken over, and editing was disabled so that you do not overwrite the other person's changes. Copy any text you need, then reload the page.

See [When someone else is editing](/docs/using/plans/invite-collaborators.md#when-someone-else-is-editing).

## Finding plans

### A plan is missing from My Plans

- **Another organisation.** **My Plans** lists the plans of the organisation you are working in. Switch organisation with the organisation button in the top navigation bar.
- **Filters or search text.** A counter on the **Filters** button shows how many filters are active. Open the panel and click **Reset**, and clear the search box. See [My Plans](/docs/using/plans/my-plans.md#filtering).
- **An earlier version.** The listings show only the current version of each plan. Earlier versions are reached from the **Version** dropdown on the plan's overview.
- **You are not a collaborator yet.** A plan appears in **My Plans** only when you own it or were added to it. If you were invited by email, open the invitation link first (see [Invitations](#invitations)).
- **The search text is too specific.** Search with a part of the title, for example "Marine" instead of "Marine Biology Project".

### A plan is in Public Plans but not in My Plans, or the other way round

The two pages list different plans:

- **My Plans** lists the plans you own or collaborate on, in any status, in the current organisation.
- **Public Plans** lists the finalized plans whose access is set to **Public**, from every organisation of the installation, and opens them read-only. A draft, or a plan whose access is not **Public**, never appears there.

See [Public Plans](/docs/using/plans/my-plans.md#public-plans).

## Invitations

### The invited person did not receive an email

How an invitation works depends on whether the person already has an account:

- **An existing account.** The person is added to the plan straight away and receives a notification; they do not need to accept anything. Check the **Collaborators** list: they may already be there, and the plan is in their **My Plans**.
- **No account.** The person receives an email with an invitation link, and joins the plan only after opening it and signing in (or signing up).

If the email does not arrive:

- **Check the address** for typing errors and extra spaces.
- **Check the spam or junk folder**, and any quarantine of a corporate mail system.
- **Invite again.** There is no resend action: open the **Collaborators** panel, click **Share**, choose **New collaborator**, and send the invitation to the same address. Every invitation sends a new email.

If no invitation email arrives for anyone, the email service may be down: tell your administrator.

### The invitation link does not work

- *This token is for another user*: the link was opened while signed in with an account that does not use the invited email address. Sign in with that account, or ask for an invitation to the address your account uses.
- *Request has expired*: the link is no longer valid (by default after 30 days). Ask the plan owner to invite you again.

See [If you are invited](/docs/using/plans/invite-collaborators.md#if-you-are-invited).

### A collaborator cannot edit

- **Their role.** Only owners edit the plan's own fields. Editors, Data Stewards, and Data Privacy Officers edit assets in the sections assigned to them; Reviewers, Ethics Reviewers, and Viewers cannot edit. See [Plan roles](/docs/using/plans/invite-collaborators.md#plan-roles).
- **Their sections.** In the **Collaborators** panel, check the **Sections** selector of the collaborator's role, assign the sections they need or **All**, and click **Save** at the bottom of the panel. Role and section changes are not applied until you save.
- **The plan is finalized.** Nobody can edit a finalized plan, and the roles of its collaborators can no longer be changed.
- **Someone else is editing.** See [Preview instead of Edit](#edit-locks).

## Downloads

### Download is disabled or missing

- **Unsaved changes.** In the plan editor, **Download** is disabled until you save (*Save your changes first*).
- **The current status does not allow downloads.** Your administrator decides which statuses allow them.
- **The format is not in the menu.** The formats depend on the export services your installation runs. When none of them answers, the menu offers only **XML**. Ask your administrator.

See [Download a plan or asset](/docs/using/download.md).

### The downloaded document leaves out content

- **Unanswered questions.** By default, PDF and Word documents leave out questions without an answer. Check the **Required fields** counter, save, and download again.
- **The organisation's export settings.** Settings such as the question layout or the cover page change what the document contains, for everyone in the organisation. If a whole section is missing, ask your administrator.
- **Another format.** If a PDF or Word file looks broken, try the other one, or XML, to tell whether the content or the conversion is at fault, and report the result.

## Uploads

### A file cannot be uploaded

- *File exceeds max size*: the file is larger than the upload field allows. The installation also sets an overall limit (100 MB by default). Compress the file, or store it elsewhere and link to it.
- *Invalid file type. Accepted types:* followed by a list: the field accepts only those types, which are also listed under the field after **Supported formats:**. Convert the file, or ask the template's administrator to allow the type.
- **Nothing happens.** Try another browser, or disable extensions.

## Notifications

### An email notification does not arrive

- **Check the notification bell.** The organisation decides which channels each notification may use, and your profile decides which channel is tried first. The notification may have been delivered in the application instead of by email. See [Notifications](/docs/using/profile-settings.md#notifications) in your profile.
- **Check the spam folder**, and add the installation's sender address to your safe senders.
- **Check your email address** on the **Profile** tab of your profile.

If nobody receives notifications, tell your administrator.

## Publishing

### Publishing fails and no DOI is returned {#deposit-fails-no-doi-returned}

When a repository does not publish the plan, the **Publish to [repository]** dialog says why and confirms that *Nothing was published, and your plan is unchanged.* No DOI is assigned and no repository record is created. Expand **Details** to read the repository's own message.

| What the dialog shows | Cause | What to do |
|---|---|---|
| **Your [repository] credentials are missing** | You chose **My own [repository] account**, but no credentials were typed in the dialog or saved in your profile. | Enter the credentials in the dialog, or save them in the **Repository accounts** tab of your [profile](/docs/using/profile-settings.md#repository-accounts). If the organisation allows it, click **Use the organisation's account** instead. |
| **[repository] didn't accept the sign-in** | You chose to sign in to the repository, but the sign-in did not complete. | Click **Try again** and sign in in the pop-up. If you closed the pop-up, the dialog says *The sign-in window was closed before you signed in. Nothing was published.* |
| **[repository] didn't publish the plan**, with **Details** reading *Your organisation does not allow publishing to this repository under this account* | The organisation does not allow the account you chose. | Choose the other account under **Publish as**, or ask your organisation administrator. |
| **[repository] didn't publish the plan**, with another message under **Details** | The repository refused the record, for example because of missing metadata or expired credentials, or it could not be reached. | Click **Try again** later. If it keeps failing, send the text of **Details** to your administrator. |
| **Couldn't load the review**, after **Continue** | The repository did not return the details to review, for example because it could not be reached with the chosen account. Nothing was published. | Click **Try again**, or **Back** to choose another account. If it keeps failing, send the text of **Details** to your administrator. |

When you publish under your own account, the organisation's account is never used instead: the dialog says *The organisation's account was not used instead.*

Other cases:

- **Publish is disabled** with the tooltip **Finalise this plan first to publish it.** Publishing is allowed only in a status that permits it, usually a finalized one.
- **A new version fails to publish.** A new version of a published plan becomes a new version of the earlier repository record. If that record was deleted from the repository, or the account you publish with cannot manage it, the repository refuses the new version.

See [Publish a plan](/docs/using/plans/deposit-a-plan.md).

## Evaluation

### An asset is reported as Not evaluated

The OpenAIRE FAIR evaluator assesses the published record behind each asset's persistent identifier. An asset without one is reported as `Not evaluated`. See [the FAQ answer](/docs/faq.md#openaire-fair-not-evaluated) and [Evaluate a plan or asset](/docs/using/plans/evaluators.md).

## Still stuck?

Contact your administrator, or use the contact option in the **Support** menu if your installation offers one. [How to report a problem](/docs/troubleshooting.md#how-to-report-a-problem) lists what to include.
