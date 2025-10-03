---
sidebar_position: 1
title: Getting Started Tutorial
description: Complete walkthrough for creating your first plan in OpenCDMP
---

# Getting Started Tutorial - Your First Plan

This guide walks you through creating your first complete plan in OpenCDMP, from login to export. By the end, you'll have created a fully functional Data Management Plan (DMP) or Software Management Plan (SMP).

:::tip Expected Time
This walkthrough takes approximately 15-30 minutes to complete, depending on the complexity of your plan.
:::

---

## Prerequisites

Before you begin, ensure you have:

- ✅ Access to an OpenCDMP instance
- ✅ User account credentials (username/password or SSO)
- ✅ Basic information about your research project or output
- ✅ (Optional) Collaborators' email addresses if you plan to work as a team

---

## Step 1: Log In to OpenCDMP

1. Navigate to your OpenCDMP instance (e.g., `https://your-opencdmp.org`)
2. Click the **Sign In** button in the top-right corner
3. Enter your credentials or use Single Sign-On (SSO) based on your Keycloak configuration
4. After successful login, you'll see the OpenCDMP dashboard

<!-- ![OpenCDMP Dashboard](/images/dashboard/main-dashboard.png) -->
*OpenCDMP Dashboard after login*

:::info First Time User?
If this is your first time logging in, you may be prompted to complete your profile. Add your name, email, and any other required information.
:::

---

## Step 2: Start Creating a New Plan

From the dashboard, you have two options to create a plan:

### Option A: Create from Scratch (Recommended for First-Time Users)

1. Click the **New Plan** button (usually in the top-right or center of the dashboard)
2. A dialog will appear asking you to choose how to create your plan
3. Select **"Start from scratch"** or **"Create new plan"**

### Option B: Import an Existing Plan

If you have a plan from another system:
1. Select **Import** from the New Plan dialog
2. Upload your plan file (supported formats vary by configuration)
3. Skip to [Step 4](#step-4-fill-in-plan-details) after import completes

For this walkthrough, we'll use **Option A: Create from scratch**.

<!-- ![New Plan Dialog](/images/plans/create-a-plan/new_plan_popup_dialog.png) -->
*New Plan creation dialog*

---

## Step 3: Choose a Blueprint

A **Blueprint** defines the structure and sections of your plan. Think of it as a template that determines what information you need to provide.

### Selecting Your Blueprint

1. **Browse available blueprints** - You'll see a list of all blueprints you have access to
2. **Review blueprint details**:
   - Click on a blueprint to see its description
   - View the sections and fields it includes
   - Check if it matches your project requirements
3. **Select the appropriate blueprint** for your project type
4. Click **"Proceed with this blueprint"**

:::tip Default Blueprint
The first option in the list is usually your organization's default blueprint. If you're unsure which to choose, the default is often a good starting point.
:::

<!-- ![Blueprint Selection](/images/plans/create-a-plan/plan-editor-first-step.png) -->
*Selecting a blueprint*

---

## Step 4: Fill in Plan Details

After selecting a blueprint, the **Plan Editor** opens with multiple sections to complete.

:::note Blueprint Structure
The plan editor fields are not fixed and depend on the blueprint structure. A blueprint is a plan template that defines what sections and fields appear in your plan. Learn more about [Blueprints](../user-guide/blueprints.md).
:::

### Understanding the Plan Editor

The editor is organized into sections on the left sidebar. Common sections may include:

- **Main Information** - Project details, title, description
- **Contributors** - Researchers and organizations involved
- **Funding** - Grants and funding sources
- **Licensing** - Data/software access and licensing
- **Additional Sections** - Varies by blueprint

### Filling in Main Information

The specific fields depend on your blueprint, but typically include:

1. **Plan Title** (Required)
   - Enter a clear, descriptive title
   - Example: "Data Management Plan for Marine Biology Research Project"

2. **Description**
   - Provide a brief overview of your project
   - Explain the purpose and scope
   - Example: "This DMP covers data collection, storage, and sharing protocols for a 3-year study of coastal marine ecosystems."

3. **Language**
   - Select the primary language for your plan
   - Default is usually your organization's language

4. **Contact Information**
   - Add primary contact details
   - This information may be used for inquiries about your plan

### Progress Indicator

Notice the **progress bar** at the top showing completion percentage.

:::note
You can save your work at any time. The plan will be saved as a **Draft** until all required fields are completed.
:::

<!-- ![Plan Editor Interface](/images/plans/create-a-plan/plan-editor.png) -->
*Plan Editor showing sections and progress*

---

## Step 5: Add Contributors and Organizations

:::note Blueprint Structure
The availability and fields for contributors and organizations depend on the blueprint structure. Some blueprints may not include these sections or may have different fields. Learn more about [Blueprints](../user-guide/blueprints.md).
:::

Plans often involve multiple people and institutions. If your blueprint includes these sections:

### Adding Researchers/Contributors

1. Navigate to the **Researchers** section in the left sidebar (if available in your blueprint)
2. Click **Select Researchers**
3. Choose from existing system researchers OR enter external researcher details:
   - Name
   - Email
   - Role (Principal Investigator, Researcher, Data Manager, etc.)
   - ORCID (if available)

### Adding Organizations

1. In the **Organizations** section in the left sidebar (if available in your blueprint)
2. Search for your organization in the system OR add new:
   - Organization name
   - description


---

## Step 6: Add Funding Information

:::note Blueprint Structure
The availability and fields for funding information depend on the blueprint structure. Some blueprints may not include this section or may have different fields. Learn more about [Blueprints](../user-guide/blueprints.md).
:::

If your project has funding and your blueprint includes a funding section, document it here:

1. Navigate to the **Funding** section (if available in your blueprint)
2. Choose from existing system fundings OR enter external funding
3. **Search existing grants** - OpenCDMP may integrate with grant databases

:::info Why Add Funding?
Many funders require DMPs/SMPs. Linking your plan to grants ensures compliance and makes reporting easier.
:::

---

## Step 7: Add Descriptions (The Core Content)

**Descriptions** are the detailed content sections of your plan. This is where you describe:
- What data/software you'll create
- How you'll manage it
- Storage and preservation plans
- Access and sharing policies

### Creating a Description

1. Identify sections in your blueprint that say **"Add Description"**
2. Click **Add Description** or the **+ icon**
3. You'll see a table of available **Description Templates** (examples may include Dataset Description, Software Description, Publication Description, or custom templates)
4. **Select a template** that matches what you're describing
5. Click **Create** or **Use Template**

### Filling in a Description

The description form will have multiple fields based on the description template you selected:

**Fields depend on the description template but may include:**
- **Title**: Name of the dataset/software/output
- **Type**: Category (raw data, processed data, analysis code, etc.)
- **Format**: File formats (CSV, JSON, .py, .R, etc.)
- **Size**: Estimated data volume
- **Collection method**: How data will be gathered
- **Quality assurance**: Validation and QA procedures
- **Storage location**: Where it will be stored during the project
- **Backup strategy**: How you'll prevent data loss
- **Preservation plan**: Long-term storage (5, 10+ years)
- **Access policy**: Who can access it and when
- **License**: Usage terms (CC-BY, MIT, GPL, etc.)

:::tip Multiple Descriptions
Most plans have multiple descriptions. For example:
- Raw field data (Dataset)
- Processed analysis data (Dataset)
- Analysis scripts (Software)
- Research paper (Publication)

Add as many descriptions as needed to cover all outputs.
:::

<!-- ![Description Editor](/images/descriptions/description-editor.png) -->
*Description template editor*

---

## Step 8: Define Licensing and Access Rights

:::note Blueprint Structure
The availability and fields for licensing and access rights depend on the blueprint structure. Some blueprints may not include this section or may have different fields. Learn more about [Blueprints](../user-guide/blueprints.md).
:::

In the **Licensing/Access** section (if available in your blueprint):

1. **Choose access level**:
   - Open Access: Publicly available
   - Restricted Access: Requires permission

2. **Select appropriate license**:
   Choose from existing system licenses OR enter external

3. **Specify access conditions**:
   - Who can access
   - When they can access
   - Any restrictions or requirements

4. **Add data sharing statement**
   - Explain your commitment to open science
   - Note any limitations (privacy, security, commercial)

:::warning Sensitive Data
If your plan involves personal data, health information, or commercially sensitive material, consult your institution's data protection policies before defining access rights.
:::

---

## Step 9: Review and Validate Your Plan

:::note Plan Status
The availability of review and validation features may depend on the plan status. Some features may only be available in certain plan states (Draft, Finalized, etc.). Learn more about [Plan Workflow](../user-guide/plans/plan-workflow.md).
:::

Before finalizing, review your work:

### Section-by-Section Review

Go through each section and verify:
- All required fields are filled
- Information is accurate and up-to-date
- Descriptions are clear and complete
- Contact information is correct
- Dates are reasonable

---

## Step 10: Change Plan Status (Finalize)

When your plan is complete and reviewed:

### Check Completion Status

1. Look at the **progress bar** - It should show 100% for required fields
2. Review the **validation messages**:
   - ❌ Red errors: Required fields incomplete

### Change Status

1. Click the **Status** dropdown (usually top-right)
2. Current status is likely **Draft**
3. Select **Finalized** or **Submit for Review** (depending on your workflow)
4. Confirm the status change

:::info Plan Workflow
OpenCDMP uses a workflow system:
- **Draft**: Work in progress, can be edited freely
- **Finalized**: Complete plan, limited editing
- **Published**: Publicly available (if applicable)

Learn more about [plan workflows](user-guide/plans/plan-workflow.md).
:::

<!-- ![Plan Status Change](/images/plans/workflow/status-change.png) -->
*Changing plan status to Finalized*

---

## Step 11: Invite Collaborators (Optional)

If you're working with a team:

1. Click **Invite Users** or **Share** in the top toolbar
2. Enter collaborator email addresses
3. Assign roles for each person:
   - **Owner**: Full control of the plan
   - **Contributor**: Can add or edit descriptions
   - **Reviewer**: Can add comments and annotations
   - **Viewer**: Read-only access
4. (Optional) Assign specific sections to each collaborator
5. Click **Send Invitations**

Collaborators will receive an email with a link to access the plan.

:::tip Section-Level Permissions
You can assign contributors to specific sections. For example:
- Data manager → Data Storage & Preservation section
- Legal advisor → Licensing & Ethics section
- PI → Overview and all sections
:::

Learn more about [inviting collaborators](user-guide/plans/invite-collaborators.md).

---

## Step 12: Export Your Plan

OpenCDMP supports multiple export formats:

### Exporting Steps

1. Click **Export** in the top toolbar
2. Select your desired format:
   - **PDF**: For printing or sharing
   - **DOCX**: For editing in Microsoft Word
   - **RDA JSON**: Standard machine-readable format
   - **XML**: For system interoperability
   - **Custom formats**: Organization-specific templates
3. Click **Download** or **Export**
4. Save the file to your computer

### When to Export

- ✅ Before submitting to funders
- ✅ For sharing with non-OpenCDMP users
- ✅ For archival/backup purposes
- ✅ For including in grant applications

Learn more about [plan exports](user-guide/plans/exports.md).

---

## Step 13: Deposit to a Repository (Optional)

Some organizations require plans to be deposited in a repository for a DOI:

### Depositing to Zenodo (Example)

1. Click **Deposit** in the top toolbar
2. Select **Zenodo** (or other configured repository)
3. Review deposit information:
   - Title and description will be auto-filled
   - Authors from your contributors list
   - Grant information (if linked)
4. Click **Deposit**
5. **Receive a DOI** that you can cite in publications

### Why Deposit?

- Get a permanent identifier (DOI) for your plan
- Increase visibility and citability
- Meet funder requirements
- Preserve plan for long-term access

Learn more about [depositing plans](user-guide/plans/deposit-a-plan.md).

---

## Next Steps

Congratulations! You've created your first plan in OpenCDMP. 🎉

### What to Do Next

1. **Keep it Updated**: Plans are living documents - update them as your project evolves
2. **Create Versions**: Use [versioning](user-guide/plans/versions.md) to track major changes
3. **Explore Advanced Features**:
   - [Annotations and review](user-guide/plans/reviewing.md)
   - [Plan evaluation](user-guide/plans/evaluators.md)
   - Multiple description templates
4. **Create Plans for Other Projects**: Repeat this process for each research project

### Common Next Actions

- **View your plans**: Go to [My Plans](user-guide/plans/my-plans.md) to see all your plans
- **Edit your plan**: Click on the plan title to reopen the editor
- **Share with stakeholders**: Export and send to supervisors, collaborators, or funders
- **Monitor compliance**: Check if your plan meets funder requirements using evaluators

---

## Tips for Success

### ✅ Do's

- **Start early**: Create your plan at project start, not when the funder asks for it
- **Be specific**: Vague statements like "we'll store data securely" aren't helpful - specify where and how
- **Think long-term**: Consider data preservation beyond the project end date
- **Involve your team**: Get input from all researchers, data managers, and IT staff
- **Update regularly**: Review and update your plan at key project milestones

### ❌ Don'ts

- **Don't rush**: Take time to think through data management properly
- **Don't ignore sensitive data**: Address privacy and ethics requirements upfront
- **Don't assume**: If you're unsure about storage or preservation options, ask your IT or library team
- **Don't forget metadata**: Plan for documentation that makes your data understandable to others
- **Don't work in isolation**: Use OpenCDMP's collaboration features

---

## Troubleshooting

### I Cannot Save My Plan

**Possible causes:**
- Missing required fields (check for red indicators)
- Session timeout - refresh the page and log in again
- Network connectivity issues
- Browser compatibility (use Chrome, Firefox, or Edge)

**Solution**: Check the validation messages, fill in all required fields, and try saving again.

### I Cannot Find My Saved Plan

**Solution**:
- Go to [My Plans](user-guide/plans/my-plans.md)
- Use filters to show Draft plans
- Check if you're logged in with the correct account
- Search by plan title if you have many plans

### A Section Is Not Appearing

**Possible causes:**
- Section visibility depends on previous answers
- Conditional sections may be hidden until specific fields are filled

**Solution**: Review the blueprint requirements and ensure dependent fields are completed.

### Collaborators Did Not Receive Invitation

**Solution**:
- Verify email addresses are correct
- Check collaborators' spam/junk folders
- Ensure your organization's email system allows invitations
- Re-send the invitation from the plan's sharing settings

---

## Related Guides

- [Administrator's First Steps](admin-guide/getting-started.md) - For setting up OpenCDMP
- [Common Workflows & Use Cases](getting-started/getting-started-workflows.md) - Real-world scenarios
- [Create/Edit a Plan](user-guide/plans/create-or-edit-a-plan.md) - Quick reference
- [Plan Workflow](user-guide/plans/plan-workflow.md) - Understanding plan statuses
- [Inviting Collaborators](user-guide/plans/invite-collaborators.md) - Team collaboration

---

## Need Help?

- **In-app Help**: Look for the ❓ icon in OpenCDMP for context-specific guidance
- **Contact Support**: Use the contact support feature or email your administrator
- **Community Forums**: Check for user discussions and Q&A
- **Documentation**: Browse the full [User Guide](user-guide/index.md)

---

:::tip Your Feedback Matters
Is this guide helpful? Let us know what worked well and what could be improved!
:::
