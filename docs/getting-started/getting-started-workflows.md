---
sidebar_position: 3
description: Real-world workflows and use cases for OpenCDMP
---

# Common Workflows & Use Cases

This guide demonstrates how OpenCDMP is used in real-world scenarios. Learn from practical examples covering common workflows, team collaboration patterns, and integration use cases.

---

## Use Case 1: Plan Creation, Review and Approval Workflow

### Scenario

A research organization requires all DMPs to be reviewed by a data governance committee before submission to funders.

### Roles

- **Researchers**: Create plans
- **Data Stewards**: Provide guidance and feedback
- **Governance Committee**: Approves plans
- **Funders**: Receive final approved plans

### Workflow

#### Stage 1: Draft

1. **Researcher creates plan**:
   - Fills in all sections
   - Saves as Draft
   - Submits for internal review

#### Stage 2: Under Review

2. **Plan status changes to "Under Review"**:
   - Automatically notifies assigned Data Steward
   - Researcher can no longer edit (read-only)

3. **Data Steward reviews plan**:
   - Uses annotation tool to add comments:
     - "Section 3: Please clarify backup frequency"
     - "Section 5: Add DOI for related dataset"
     - "Section 7: License choice - verify compatibility"
   - Each comment has status: Open, Resolved, Won't Fix

4. **Data Steward returns plan to researcher**:
   - Changes status to "Revision Required"
   - Researcher receives notification

#### Stage 3: Revision

5. **Researcher addresses comments**:
   - Plan status changed back to Draft (editable)
   - Makes required changes
   - Marks annotations as "Resolved" with explanations
   - Resubmits for review

6. **Data Steward verifies revisions**:
   - Reviews updated sections
   - Checks if annotations addressed
   - If satisfied, changes status to "Committee Review"

#### Stage 4: Committee Approval

7. **Committee reviews plan**:
   - Multiple committee members view plan
   - Discussion via annotations

8. **If approved**:
   - Status changes to "Approved"
   - Researcher notified
   - Plan locked from further edits (unless version update)
   - Can now export for funder submission

9. **If not approved**:
   - Status returns to "Revision Required"
   - Committee comments added
   - Cycle repeats

#### Stage 5: Submission

10. **Researcher exports approved plan**:
    - Exports PDF and other formats
    - Submits to funder
    - Uploads proof of submission to OpenCDMP
    - Status changed to "Submitted"

### Automation & Notifications

- **Email notifications** sent at each status change

### Key Takeaways

- ✅ **Status-based workflow** ensures proper review process
- ✅ **Annotations** provide structured feedback
- ✅ **Notifications** keep everyone informed

---

## Use Case 2: Integration with Institutional Repository

### Scenario

University library provides an institutional repository (Zenodo) for data archiving. OpenCDMP integrates to enable seamless deposit.

### Components

- **OpenCDMP**: Plan creation and management
- **Zenodo Repository**: Long-term data archiving
- **OpenCDMP Deposit Service**: Integration bridge

### Workflow

#### Setup (One-Time)

1. **Admin configures Zenodo deposit service**:
   - Zenodo URL
   - Authentication credentials (API token)
   - Community selection (which Zenodo community to deposit to)

#### User Workflow

2. **Researcher creates plan in OpenCDMP**:
   - Documents dataset to be archived
   - Completes metadata fields

3. **Ready to deposit**:
   - Plan is Finalized
   - Dataset is ready for archiving
   - Researcher clicks "Deposit" button in OpenCDMP

4. **Researcher confirms deposit**:
   - OpenCDMP sends metadata and files to Zenodo
   - Zenodo creates new record
   - Assigns DOI (persistent identifier)
   - Returns DOI to OpenCDMP

5. **OpenCDMP updates plan**:
   - Stores DOI in plan
   - Links to Zenodo record
   - Status changes to "Published"
   - User notified of successful deposit

### Benefits

- ✅ **No duplicate data entry**: Metadata filled once in OpenCDMP
- ✅ **Persistent identifier**: DOI for citation
- ✅ **Long-term preservation**: Zenodo handles archival
- ✅ **Funder compliance**: Demonstrates data sharing

### Advanced: Bidirectional Sync

Some institutions implement bidirectional sync:
- **OpenCDMP → Zenodo**: Deposit as described above
- **Zenodo → OpenCDMP**: Update plan if dataset metadata changes in repository
- **Benefits**: Single source of truth, always up-to-date

---

## Use Case 3: Multi-Tenant Academic Institution

### Scenario

A large university deploys OpenCDMP to serve multiple departments, each with their own requirements and users.

### Structure

- **Central IT** manages the instance
- **5 Departments** use separate tenants:
  - Life Sciences
  - Physics & Engineering
  - Social Sciences
  - Humanities
  - Medical School

### Implementation

#### Central IT Setup

1. **Creates tenant for each department**:
   - Separate user pools
   - Department-specific branding (logos, colors)
   - Custom blueprints per discipline

2. **Appoints Tenant Admins**:
   - Each department has 1-2 admins
   - Admins manage their department's blueprints, users, templates

3. **Shared Resources**:
   - Common reference types (ORCID, grant databases)
   - Central authentication (university SSO)
   - Shared deposit service (institutional repository)

#### Department-Specific Configuration

**Life Sciences Tenant:**
- Blueprints: DMP with ethics/biosafety sections
- Templates: Clinical trial data, lab experiment data, biobank samples
- File Transformers: DOCX export with ethics compliance formatting, RDA JSON for biodiversity data
- Deposit Services: Zenodo
- Evaluators: Biosafety compliance checker, FAIR data principles evaluator
- Prefilling Sources: ClinicalTrials.gov, PubMed, institutional ethics database

**Physics & Engineering Tenant:**
- Blueprints: Data & Software Management Plan hybrid
- Templates: Simulation data, experimental setup, computational models
- File Transformers: DOCX with code documentation sections, JSON for computational workflows
- Deposit Services: DSpace
- Evaluators: Software citation validator, reproducibility checklist
- Prefilling Sources: DOE Data Explorer, NASA data repositories, Zenodo

**Social Sciences Tenant:**
- Blueprints: DMP with GDPR and human subjects sections
- Templates: Survey data, interview transcripts, statistical datasets
- File Transformers: DOCX with anonymization guidelines, DDI XML for survey data
- Deposit Services: Dataverse
- Evaluators: Zenodo
- Prefilling Sources: OpenAIRE, institutional IRB database, DataCite

**Humanities Tenant:**
- Blueprints: Scholarly edition management, digital humanities project plans
- Templates: Archival materials, digital collections, text corpora
- File Transformers: TEI XML export, DOCX with manuscript formatting
- Deposit Services: Humanities Commons, institutional digital libraries
- Evaluators: DSpace
- Prefilling Sources: ORCID, library catalogs, digital humanities registries

**Medical School Tenant:**
- Blueprints: Clinical DMP with HIPAA compliance
- Templates: Patient data, clinical trial protocols, imaging data
- File Transformers: DOCX with HIPAA privacy sections, FHIR JSON for clinical data

### Benefits

- ✅ **Department autonomy**: Each department controls their own configuration
- ✅ **Cost efficiency**: Single instance, multiple tenants
- ✅ **Consistent university branding**: Central IT maintains core identity
- ✅ **Shared infrastructure**: Authentication, storage
- ✅ **Discipline-specific integrations**: Each tenant can configure their own file transformers, deposit services, evaluators, and prefilling sources to match their research workflows and compliance requirements

### Challenges & Solutions

**Challenge**: Different departments have conflicting requirements

**Solution**: Tenant isolation allows independent customization

**Challenge**: Central IT overwhelmed with support requests

**Solution**: Train Tenant Admins to handle department-specific issues

---

## Conclusion

OpenCDMP supports a wide range of workflows, from simple individual plans to complex multi-institutional collaborations. The key to success is:

1. **Choose the right workflow** for your needs
2. **Leverage OpenCDMP's features** (collaboration, versioning, integrations)
3. **Iterate and improve** based on experience
4. **Share best practices** with your community

For more detailed guidance on specific features, see:
- [Your First Plan](user-guide/getting-started.md) - Step-by-step walkthrough
- [Administrator's First Steps](admin-guide/getting-started.md) - Setup and configuration
- [User Guides](user-guide/index.md) - Feature documentation

---

<!-- :::tip Have a Workflow to Share?
If you've developed a workflow that works well for your organization, consider contributing it to the OpenCDMP documentation to help others!
::: -->
