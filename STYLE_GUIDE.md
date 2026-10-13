# Documentation Style Guide

This guide establishes writing standards for OpenCDMP documentation to ensure consistency, clarity, and professionalism across all documentation files.

## Table of Contents

- [General Principles](#general-principles)
- [Capitalization](#capitalization)
- [Terminology](#terminology)
- [Grammar and Punctuation](#grammar-and-punctuation)
- [Formatting](#formatting)
- [Linking](#linking)
- [Code and Technical Elements](#code-and-technical-elements)
- [Common Terms Reference](#common-terms-reference)

---

## General Principles

### Voice and Tone
- Use **active voice** whenever possible
  - ✅ "The user can create a plan"
  - ❌ "A plan can be created by the user"
- Be **concise and direct** - avoid unnecessary words
- Use **present tense** for describing functionality
  - ✅ "The system validates the input"
  - ❌ "The system will validate the input"

### Audience
- Write for technical users who may be administrators, developers, or end users
- Provide context where needed, but avoid over-explaining basic concepts
- Link to related documentation rather than repeating information

### Write for the reader, not about the docs
Pages describe what the reader sees and does. Leave out anything that is about the writing itself or about how a fact was found:
- **No notes on wording or naming.** Don't explain spellings, why a term was chosen, or what the UI and the code each call something. The glossary carries the one developer-facing mapping (organisations are *tenants* in the API and configuration).
  - ❌ "An Organisation (British spelling, as in the interface) is called a tenant in the code."
- **No rename history** in pages. The changelog records renames.
  - ❌ "Before version 2.0 this page was called Reports. The URL and the API keep that name."
- **No investigation traces.** No class or method names, file paths or `file:line` references to platform internals in user and admin pages, and no "verified in…" or "checked against…" anywhere. Developer and deployment pages keep the identifiers readers use: environment variables, configuration keys, endpoints, and the classes a plugin implements.
- **No notes about the docs.** No "this page describes…", no remarks about anchors or compatibility, no "intended behaviour" or "known issue" notes about app bugs. Describe how the feature works and report the bug to the code repository.
- **Plain style.** Avoid em-dash chains, padded parentheticals, "rather than" explanations of what something is not, hedging where the behaviour is definite, and filler such as "simply", "just", "essentially" or "note that". Don't bold a label at the start of every bullet when a plain list reads better.

---

## Capitalization

### Headings
- Use **sentence case** for all headings
  - ✅ "Create a new plan"
  - ❌ "Create A New Plan"
- Exception: Proper nouns and product names maintain their capitalization
  - ✅ "Configure Keycloak authentication"

### Product and Service Names
Always capitalize these correctly:
- **OpenCDMP** (not OpenCdmp, Opencdmp, or opencdmp)
- **Keycloak** (not KeyCloak or keycloak)
- **PostgreSQL** (not Postgres, postgres, or postgresql in formal docs)
- **Elasticsearch** (not ElasticSearch or elastic search)
- **RabbitMQ** (not Rabbitmq or rabbit-mq)
- **Docker** (not docker)
- **Zenodo** (not zenodo)
- **Docusaurus** (not docusaurus)

### OpenCDMP-Specific Terms
- **Plan** - capitalize when referring to the entity type in admin/technical context
- **Asset** - capitalize when referring to the entity type in admin/technical context (formerly called *Description*; the API and data model retain the `Description` naming)
- **Blueprint** - capitalize when referring to the configuration entity
- **Template** - capitalize when referring to asset templates specifically

In body text describing actions, use lowercase:
- ✅ "When a user creates a plan..."
- ✅ "The Plan entity contains metadata..." (technical context)

---

## Terminology

### Standard Terms

| Correct | Incorrect | Notes |
|---------|-----------|-------|
| log in (verb) | login (verb) | "Users log in to the system" |
| login (noun) | log in (noun) | "Enter your login credentials" |
| email | e-mail, Email | One word, lowercase unless starting sentence |
| workflow | work flow | One word |
| finalized | finalised | Use US English spelling (see the exception for "organisation" below) |
| click | click on | Prefer "click" without "on" |
| username | user name | One word |
| endpoint | end point | One word for API endpoints |
| dropdown | drop-down, drop down | One word as adjective or noun |

### Organisation and tenant

The user interface calls a tenant an **organisation**, with British spelling. This is an exception to the US spelling rule:

- In user and administrator documentation (`docs/using/`, `docs/administering/`), prose says **organisation** ("the organisation you are working in", "organisation administrators"), and UI labels are quoted verbatim (**Organisations**, **Organisation Admin**, **Shared by default organisation**).
- Use **tenant** only for code-level concepts: the `x-tenant` header, the tenant code in `/t/:tenant_code` addresses, environment variables, API fields, database columns, permissions such as `ViewTenantPage`, and role codes such as `TenantAdmin`. Deployment and developer documentation keep "tenant" in that sense, but quoted UI labels and role names there also use the UI wording.
- Do not rename identifiers, URLs, file names, environment variables, or heading anchors that contain `tenant`. When retitling a heading that other pages link to, keep its anchor with an explicit heading ID, for example `## Clear organisation data {#clear-tenant-data}`.
- "Organization" (US spelling) remains correct for research organizations as data, for example a ROR organization reference.

### User References
- Use **"user"** for general reference
- Use **"end user"** only when distinguishing from administrators or developers
- Use **"collaborator"** for users who have been invited to a plan
- Use **"administrator"** or **"admin"** (both acceptable, be consistent within a document)

### Action Verbs
Prefer these consistent terms:
- **create** (not "make" or "add" for new entities)
- **edit** (not "modify" or "change")
- **delete** (not "remove" when permanently removing)
- **remove** (for removing from a list, not deleting)
- **configure** (for settings and setup)
- **enable/disable** (for toggles and features)

---

## Grammar and Punctuation

### Articles
- Include articles (a, an, the) for clarity
  - ✅ "The user can access the plan"
  - ❌ "User can access plan"
- Exception: Headings and UI labels where brevity is needed

### Lists
- Use parallel structure in lists
- Start list items with capital letters
- Use periods at the end of list items only if they are complete sentences
- For instructional lists, use imperative mood:
  - ✅ "Click the button"
  - ❌ "You should click the button"

### Commas
- Use serial (Oxford) commas in lists of three or more items
  - ✅ "Plans, assets, and templates"
  - ❌ "Plans, assets and templates"

### Contractions
- Avoid contractions in formal documentation
  - ✅ "cannot" (not "can't")
  - ✅ "does not" (not "doesn't")
- Exception: Can be used in informal tips or notes for friendlier tone

---

## Formatting

### Bold
Use bold for:
- UI elements users interact with: **Save**, **Create Plan**, **three dots menu**
- Emphasis on key terms when first introduced
- Field names in forms: **Label**, **Description**, **Status**

### Italic
Use italics sparingly:
- For emphasis within a sentence (rare)
- For variable text that users replace: *username*, *hostname*

### Code Formatting
Use backticks for:
- Code snippets: `npm install`
- Configuration values: `true`, `false`
- File paths: `classpath:logging/logback.xml`
- Environment variables: `KEYCLOAK_URL`
- Status values: `Draft`, `Finalized`
- API endpoints: `/api/plans`
- Field codes: `'{OPENCDMP.PLAN.TITLE}'`

### Diagrams
- Mermaid diagrams must stay readable in dark mode: a `style` or `classDef` that sets `fill:` also sets `color:` and `stroke:`, for example `style Owner fill:#ffd700,color:#1a1a1a,stroke:#b39700`.

### Notes, Tips, and Warnings
Use Docusaurus admonitions consistently:

```markdown
:::note
General information or context
:::

:::tip
Helpful suggestions or best practices
:::

:::info
Important information to be aware of
:::

:::warning
Cautions about potential issues or irreversible actions
:::
```

---

## Linking

### Internal Links
- Use **relative paths** from the docs root
  - ✅ `[blueprints](/docs/administration/blueprints/index.md)`
  - ❌ `[blueprints](../administration/blueprints/index.md)`
- Include the `.md` extension
- Link to specific sections using anchors: `/docs/file.md#section-name`

### External Links
- Use full URLs with https://
- Provide context for where the link goes
  - ✅ "See the [Keycloak documentation](https://www.keycloak.org/docs) for details"
  - ❌ "Click [here](https://www.keycloak.org/docs)"

### Cross-References
- Link liberally to related topics
- First mention of a major concept should be linked
- Don't repeat the same link multiple times in a short section

---

## Code and Technical Elements

### Configuration Tables
Use consistent column headers:
```markdown
| Env Variable | Description | Default Value | Example |
```

### File Paths
- Use forward slashes even in Windows context: `docs/administration/index.md`
- Prefix with `docs/` when referencing from project root
- Use brackets for clickable file references in text

### Command Examples
```bash
# Use bash syntax highlighting
npm start

# Use placeholders in angle brackets
git clone https://github.com/<username>/<repo>.git

# Show multi-line commands with line continuation
docker run \
  -e KEYCLOAK_URL=http://localhost \
  opencdmp/api
```

### Version Numbers
- Include version numbers when relevant
- Format: `v1.0.0` or `version 1.0.0`
- Use "latest" only when specifically referring to most recent release

---

## Common Terms Reference

### OpenCDMP-Specific Vocabulary

| Term | Definition | Usage |
|------|------------|-------|
| **Plan** | Primary entity representing an Output Management Plan | "Create a new plan" |
| **Asset** | Detailed entry within a plan section (formerly *Description*) | "Add an asset to the plan" |
| **Blueprint** | Defines the structure of a plan | "Select a blueprint" |
| **Asset Template** | Defines the structure and fields of an asset (formerly *Description Template*) | "Configure the template" |
| **Asset Type** | Category of asset templates (formerly *Description Template Type*) | "Create an asset type" |
| **Reference** | External or internal data source | "Add a reference" |
| **Reference Type** | Configuration for reference sources | "Create a reference type" |
| **Prefilling Source** | External API for pre-populating data | "Configure prefilling sources" |
| **Workflow** | State transition flow for plans/assets | "Plan workflow defines statuses" |
| **Status** | Current state in a workflow | "Change the status to finalized" |
| **Internal Status** | System-level status type | "`Draft`, `Finalized`, or `Deposited`" |
| **DOI** | Digital Object Identifier | "Assign a DOI through deposit" |
| **Deposit** | Publishing to external repository | "Deposit the plan to Zenodo" |
| **Annotation** | Review comment on plan/asset | "Add an annotation" |
| **Organisation** | Isolated workspace within an installation; *tenant* in the code | "Switch to another organisation" |
| **Collaborator** | User invited to work on a plan | "Invite collaborators" |

### Status Values
- **Draft** - Initial working state
- **Finalized** - Completed and locked
- **Deposited** - Published to external repository

### User Roles
- **Owner** - Full control over plan
- **Contributor** - Can edit plan content
- **Editor** - Can edit assets in specific sections
- **Reviewer** - Can add annotations
- **Viewer** - Read-only access

### Admin Roles
Use the UI label; add the role code in backticks where the code matters (configuration, permissions).

Installation-wide roles:
- **System Administrator** (`Admin`) - Everything in every organisation, including maintenance
- **Installation Manager** (`InstallationAdmin`) - Creates organisations and manages accounts across them
- **Signed-in User** (`User`) - Can sign in; organisation roles decide the rest

Organisation roles:
- **Organisation Admin** (`TenantAdmin`) - Everything in the organisation, including settings and users
- **Template Manager** (`TenantPlanManager`) - Plan blueprints, asset templates, and their types
- **Content & Workflow Manager** (`TenantConfigManager`) - Statuses and workflows, languages, help pages, and notification texts
- **Member** (`TenantUser`) - Creates plans and assets and works on plans shared with them

---

## Examples

### Before and After

**Before (inconsistent, unclear):**
```markdown
User's can login to make Plans. Click on the button for creating new plan.
After you made the plan, you should click on save button.
```

**After (consistent, clear):**
```markdown
Users can log in to create plans. Click the **Create Plan** button to start a new plan.
After you create the plan, click **Save**.
```

---

## Maintenance

This style guide should be:
- Updated when new conventions are established
- Referenced during documentation reviews
- Used to onboard new documentation contributors
- Enforced through pull request reviews

---

## Questions?

If you encounter a style question not covered in this guide, refer to:
1. Existing documentation for precedent
2. [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) for general technical writing
3. Project maintainers for OpenCDMP-specific decisions

---

*Last updated: 2025-09-30*