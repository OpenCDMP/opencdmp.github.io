---
sidebar_position: 1
title: Getting Started
description: Complete guide for administrators setting up and managing OpenCDMP
---

# Getting Started - Administrator's Guide

This guide helps administrators set up and configure OpenCDMP for their organization. Whether you're deploying a new instance or managing an existing one, this walkthrough covers the essential tasks to get your organization's OpenCDMP environment operational.

---

## Prerequisites

Before you begin, ensure you have:

- ✅ **OpenCDMP deployed** - See [Deployment Guide](getting-started/deployment/index.md)
- ✅ **Admin access** - Installation Admin or Tenant Admin role
- ✅ **Keycloak configured** - Authentication system set up
- ✅ **Basic understanding** of your organization's:
  - Research data management policies
  - Required plan types (DMP, SMP, etc.)
  - User groups and permissions needed
  - External systems to integrate (Zenodo, institutional repository, etc.)

---

## Overview: Administrator Roles

OpenCDMP has different admin levels with specific permissions:

| Role | Scope | Capabilities |
|------|-------|--------------|
| **Installation Admin** | Entire OpenCDMP instance | System configuration, tenant management, global settings, usage limits |
| **Tenant Admin** | Single tenant/organization | Full tenant administration - all Config Manager and Plan Manager capabilities, plus: reference types, prefilling sources, tenant users, annotation statuses, tenant configuration |
| **Tenant Config Manager** | Tenant configuration | Manage languages, supportive material, plan statuses, description statuses, notification templates |
| **Tenant Plan Manager** | Content management | Manage blueprints, description templates, template types |

:::info Role Hierarchy
**Tenant Admin** has all permissions of both Config Manager and Plan Manager, plus additional tenant-specific administration capabilities.
:::

This guide focuses on **Tenant Admin** tasks, which are most common for organizational administrators.

---

## Step 1: Access Administrative Features

1. **Log in** to OpenCDMP with your admin credentials
2. Administrative features are accessible through the side navigation menu
3. Depending on your role (Tenant Admin, Config Manager, or Plan Manager), you'll see different administrative options in the navigation

:::info Navigation
Administrative pages like **Blueprints**, **Description Templates**, **Tenant Configuration**, **Users**, and other management features are available directly from the side navigation menu based on your permissions.
:::

---

## Step 2: Configure Tenant Settings

Your **tenant** represents your organization within OpenCDMP. Configure it first:

### Basic Tenant Information

1. Navigate to **Tenant Configuration**
2. Fill in essential information:
   - **Tenant Name**: Your organization's name
   - **Tenant Code**: Short identifier (e.g., "UNIVERSITY-LAB")
   - **Description**: Brief description of your organization
   - **Logo**: Upload your organization's logo
   - **Primary Color**: Brand color for theming

3. **Save** your changes

### Default Settings

Configure defaults for new plans:
- **Default Blueprint**: The blueprint shown first when users create plans
- **Default Language**: Primary language for your organization
- **Default Timezone**: Your organization's timezone

Learn more in [Tenant Configuration](admin-guide/tenant-management/tenant-configuration.md).

---

## Step 3: Set Up User Management

### Understanding User Roles

OpenCDMP uses role-based access control:

- **User**: Can create and manage their own plans
- **Tenant User**: Belongs to your organization, sees org-specific content
- **Tenant Config Manager**: Can configure languages, supportive material, plan/description statuses, and notification templates
- **Tenant Plan Manager**: Can manage blueprints, description templates, and template types
- **Tenant Admin**: Full administrative access - includes all Config Manager and Plan Manager permissions, plus reference types, prefilling sources, tenant users, annotation statuses, and tenant configuration

### Adding Users

#### Option A: Invite Users Individually

1. Go to **Users** or **Tenant Users**
2. Click **Invite User** or **Add User**
3. Enter user details:
   - Email address
   - Name
   - Role(s)
4. Click **Send Invitation**
5. User receives an email with login instructions

#### Option B: SSO/Keycloak Integration

If using Single Sign-On:
1. Users authenticate via your organization's SSO
2. First login creates their OpenCDMP account automatically
3. Assign roles after first login in **Users**

Learn more in [Tenant Users](admin-guide/user-management/tenant-users.md).

---

## Step 4: Create Your First Blueprint

A **Blueprint** defines the structure of plans in your organization.

### Understanding Blueprints

Blueprints determine:
- What fields users must fill in
- Which description templates can be used
- Workflow and validation rules

### Creating a Blueprint

1. Navigate to **Blueprints**
2. Click **New Blueprint** or **Create Blueprint**
3. **Basic Information**:
   - **Title**: e.g., "University Data Management Plan"
   - **Description**: Explain what this blueprint is for
   - **Status**: Draft (while building), Finalized (when ready for use)

4. **Add Sections**:
   - Click **Add Section**
   - Enter section title (e.g., "Project Information", "Data Collection", "Storage & Preservation")
   - Add a description if needed
   - Set section as required or optional
   - Add a description templates if needed

5. **Add Fields to Sections**:
   For each section, add fields:
   - **Text fields**: Short answer (project title, PI name)
   - **Text areas**: Long answer (project description)
   - **Date fields**: Start/end dates
   - **File uploads**: Supporting documents
   - **Reference fields**: Link to grants, organizations, publications

6. **Configure Field Properties**:
   - **Required**: Must be filled to finalize plan

7. **Finalize Blueprint**:
   - Review all sections and fields
   - Change status to **Finalized**
   - Blueprint is now available for users

<!-- ![Blueprint Editor](/images/admin/blueprints/blueprint-editor.png) -->
*Blueprint editor showing sections and fields*

Learn more in [Blueprints](admin-guide/content-management/blueprints/index.md).

---

## Step 5: Create Description Templates

**Description Templates** define the structure of detailed content within plans (datasets, software, publications, etc.).

### Why Description Templates Matter

Users add descriptions to plans to document:
- Individual datasets they'll create
- Software components
- Publications and outputs
- Samples, models, prototypes

Templates ensure consistency and completeness.

### Creating a Template

1. Navigate to **Description Templates**
2. Click **Create Description Template**
3. **Template Information**:
   - **Title**: e.g., "Dataset Description Template"
   - **Description**: What this template is for
   - **Type**: Dataset, Software, Publication, or custom type
   - **Language**: Primary language
   - **Status**: Draft (while building), Finalized (when ready)

4. **Add Template Fields**:
   Similar to blueprint fields but more types of fields. Some of these are:
   - **Text fields**: Short answer (project title, PI name)
   - **Text areas**: Long answer (project description)
   - **Date fields**: Start/end dates
   - **Dropdowns**: Predefined options
   - **File uploads**: Supporting documents
   - **Reference fields**: Link to grants, organizations, publications

5. **Organize into Pages/Sections**:
   - Group related fields together
   - Create multiple pages if template is long
   - Use logical flow (collection → storage → preservation → access)

6. **Set Validation Rules**:
   - Required fields
   - Format validation (URLs, emails, etc.)
   - Conditional requirements

7. **Finalize Template**:
   - Test the template by creating a sample description
   - Change status to **Finalized**
   - Template is now available in blueprints

<!-- ![Description Template Editor](/images/admin/templates/template-editor.png) -->
*Description template editor*

Learn more in [Description Templates](admin-guide/content-management/templates/index.md).

---

## Step 6: Configure Reference Types

**Reference Types** allow users to link plans to external systems and databases.

### Common Reference Types

- **Grants/Funding**: Link to grant databases
- **Organizations**: Institutional repositories
- **Researchers**: ORCID, institutional directories
- **Publications**: DOI, PubMed, arXiv
- **Datasets**: Existing data repositories
- **Projects**: Project management systems

### Setting Up Reference Types

1. Navigate to **Reference Types**
2. Review pre-configured types (if any)
3. **Add New Reference Type**:
   - **Name**: e.g., "ORCID", "Grant Database", "Institutional Repository"
   - **Description**: What this reference type connects to
   - **Code**: Short identifier
   - **API Configuration**: If integrating with external API
     - Endpoint URL
     - Authentication (API key, OAuth)
     - Search/query parameters

4. **Configure Fields**:
   - What information to fetch from the external system
   - How to display it to users
   - What data to store in OpenCDMP

5. **Test the Integration**:
   - Search for a known entity (researcher, grant, etc.)
   - Verify data is fetched correctly
   - Check display formatting

Learn more in [Reference Types](admin-guide/system-configuration/reference-types.md).

---

## Step 7: Set Up Supportive Material

**Supportive Material** provides guidance and information to users within the application.

### Types of Supportive Material

- **User Guide**: How to use OpenCDMP
- **About**: Information about your OpenCDMP instance and organization
- **FAQ**: Frequently asked questions
- **Glossary**: Definitions of key terms
- **Terms of Service**: Usage policies
- **Cookie Policy**: Privacy information

### Adding Supportive Material

1. Navigate to **Supportive Material**
2. Click **Add Material** or **New Material**
3. Select **Type**: User Guide, About, FAQ, etc.
4. **Language**: Choose language (can have multiple translations)
5. **Content**:
   - Use rich text editor
   - Add formatting, links, images
   - Provide clear, helpful information
6. **Save**

:::tip Priority Content
Start with:
1. Brief "About" page explaining your OpenCDMP purpose
2. Short FAQ covering common questions (How do I create a plan? Who can see my plans?)
3. User Guide link to your detailed documentation
:::

Learn more in [Supportive Material](admin-guide/system-configuration/supportive-material.md).

---

## Step 8: Configure Prefilling Sources (Optional but Recommended)

**Prefilling Sources** automatically populate plan fields from external systems, reducing manual data entry.

### Common Prefilling Sources

- **ORCID**: Auto-fill researcher information
- **Grant databases**: Import grant details
- **Institutional repositories**: Fetch project information
- **OpenAIRE**: Pull publication and funding data

### Setting Up Prefilling

1. Navigate to **Prefilling Sources**
2. Click **Add Source** or **New Prefilling Source**
3. **Configure Source**:
   - **Name**: e.g., "ORCID Integration"
   - **Endpoint**: API URL
   - **Authentication**: API key or OAuth
   - **Field Mapping**: Map external fields to OpenCDMP fields

4. **Test Prefilling**:
   - Try prefilling a plan with sample data
   - Verify fields are populated correctly
   - Check for any data transformation issues

5. **Enable for Users**:
   - Make available in relevant blueprints
   - Add help text explaining how to use prefilling

Learn more in [Prefilling Sources](admin-guide/system-configuration/prefilling-sources.md).

---

## Step 9: Configure Plan Statuses

**Plan Statuses** define the possible states that a plan can have and their behavior.

### Understanding Plan Statuses

Plan statuses determine:
- Whether a plan is editable or not
- What actions are available (deposit, export, evaluate)
- Who can access the plan
- The display color and icon

### Common Plan Statuses

- **Draft**: Work in progress (editable)
- **Finalized**: Complete and ready (not editable)
- **Published**: If a finalized plan has been deposited

### Creating Plan Statuses

1. Navigate to **Plan Statuses**
2. Review existing statuses
3. **Add Custom Status** (if needed):
   - **Name**: e.g., "Under Review", "Approved by PI", "Submitted to Funder"
   - **Description**: When this status is used
   - **Internal Status**: Draft (editable) or Finalized (not editable)
   - **Available Actions**: Deposit, Export, Evaluate
   - **Authorization**: Who can access plans with this status (by role)
   - **Status Color**: Display color for this status
   - **Icon**: Display icon for the status change action

4. **Save** the status

:::note
Before a plan status can be used, it must be defined in the Plan Workflow (see Step 10).
:::

Learn more in [Plan Statuses](admin-guide/system-configuration/plan-statuses.md).

---

## Step 10: Configure Plan Workflow

**Plan Workflow** defines the lifecycle transitions between plan statuses.

### Understanding Plan Workflow

The workflow determines:
- What status a plan starts with when created
- Which status transitions are allowed
- The sequence of status changes throughout the plan lifecycle

### Configuring Plan Workflow

1. Navigate to **Tenant Configuration**
2. Find the **Plan Workflow** section
3. **Set Starting Status**: The status assigned when a new plan is created
4. **Add Status Transitions**: Click **Add status transition** to define allowed transitions
   - From which status
   - To which status

5. **Save** the workflow configuration

:::info
If the plan workflow is not defined for a specific tenant, the default workflow is used.
:::

Learn more in [Plan Workflow](user-guide/plans/plan-workflow.md) and [Tenant Configuration](admin-guide/tenant-management/tenant-configuration.md).

---
<!-- accounting disabled -->
<!-- ## Step 11: Create Usage Limits (Optional)

**Usage Limits** control resource consumption per user or tenant.

### Why Use Usage Limits?

- Prevent system overload
- Fair resource allocation
- Manage costs
- Enforce policies

### Configuring Limits

1. Navigate to **Usage Limits**
2. **Create Limit**:
   - **Type**: Plans per user, Descriptions per plan
   - **Value**: Maximum allowed
   - **Period**: Per month, per year

3. **Save** and **Monitor**:
   - Check usage reports
   - Adjust limits as needed

Learn more in [Usage Limits](admin-guide/usage-limits.md).

--- -->

## Step 11: Test the System End-to-End

Before rolling out to users, test the complete workflow:

### Testing Checklist

1. ✅ **User Registration/Login**
   - Create a test user account
   - Verify login works
   - Check user profile

2. ✅ **Plan Creation**
   - Create a plan using your blueprint
   - Fill in all sections
   - Add descriptions using your templates
   - Test field validation

3. ✅ **Collaboration**
   - Invite a test collaborator
   - Verify they receive invitation
   - Check their access permissions
   - Test simultaneous editing

4. ✅ **Plan Workflow**
   - Change plan status
   - Verify workflow transitions
   - Check notifications are sent

5. ✅ **Export**
   - Export plan to PDF
   - Export to DOCX
   - Check format and content

6. ✅ **Deposit** (if configured)
   - Deposit a test plan to repository
   - Verify DOI is assigned
   - Check metadata accuracy

7. ✅ **Search and Discovery**
   - Search for plans
   - Test filters
   - Verify visibility settings

8. ✅ **Notifications**
   - Trigger various notifications
   - Check email delivery
   - Verify content and formatting

---

## Step 12: Train Your Users

Once the system is configured and tested:

### Create Training Materials

1. **Getting Started Guide**: Link to [Your First Plan](user-guide/getting-started.md)
2. **Video Tutorials**: Screen recordings of common tasks
3. **FAQ**: Organization-specific questions
4. **Cheat Sheet**: One-page reference for key tasks

### Conduct Training Sessions

1. **Administrator Training**: For additional admins and config managers
2. **Power User Training**: For principal investigators and data managers
3. **General User Training**: For all researchers creating plans
4. **Drop-in Sessions**: Regular office hours for questions

### Provide Ongoing Support

1. **Help Desk**: Email or ticketing system for support requests
2. **User Forum**: Community Q&A space
3. **Regular Updates**: Share tips, new features, best practices
4. **Feedback Mechanism**: Collect user input for improvements

---

### Content Updates

- Keep blueprints current with funder requirements
- Update templates based on user feedback
- Refresh supportive material
- Add new reference types as needed

---

## Common Administrative Tasks

### Adding a New Blueprint

1. Go to **Blueprints** → **New Blueprint**
2. Follow blueprint creation steps above
3. Finalize and publish

### Modifying an Existing Template

1. Go to **Description Templates**
2. Find the template
3. Create a **new version** (don't edit published version)
4. Make changes
5. Finalize new version
6. Old version remains for existing plans

### Handling a Support Request

1. Understand the user's issue
2. Reproduce the problem if possible
3. Check documentation and known issues
4. Provide solution or escalate to technical team
5. Update FAQ if it's a common issue

---

### Advanced Configuration

- [Keycloak SSO Integration](getting-started/configuration/keycloak.md)
- [Frontend Theming](getting-started/configuration/frontend/theming.md)
- [API Integration](developers/integration.md)
- [Custom Plugins](developers/plugins/index.md)

---

## Related Guides

- [Your First Plan](user-guide/getting-started.md) - User walkthrough
- [Blueprints Administration](admin-guide/content-management/blueprints/index.md) - Detailed blueprint guide
- [Tenant Configuration](admin-guide/tenant-management/tenant-configuration.md) - Tenant settings
- [User Management](admin-guide/user-management/tenant-users.md) - Managing users

---

## Need Help?

- **Installation Issues**: See [Deployment Guide](getting-started/deployment/index.md)
- **Configuration Questions**: Check [Configuration Documentation](getting-started/configuration/index.md)
- **GitHub Issues**: [Report bugs or request features](https://github.com/OpenCDMP/OpenCDMP/issues)
- **Community**: Join discussions and ask questions

---

:::tip Continuous Improvement
OpenCDMP administration is an iterative process. Start with the basics, learn from your users, and gradually enhance your instance to meet your organization's evolving needs.
:::
