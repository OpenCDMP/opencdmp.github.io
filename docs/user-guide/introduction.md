---
sidebar_position: 1
description: A brief introduction to the core entities of the platform
---

# Introduction





## 🧩 **Core Concepts**

OpenCDMP is built around four main entities that work together to provide a structured and flexible approach to managing OMPs:

### **1. Blueprints**

Blueprints define the overall structure of a **Plan** by specifying its **Sections** and the content within each section.

- **Sections**: Each Blueprint is divided into multiple Sections, which can include various input fields and optional **Descriptions**.
- **Customization**: Tailor Blueprints to standardize the format and requirements of OMPs according to industry standards or specific project needs.

### **2. Plans**

A Plan is the primary entity and main output of the OpenCDMP platform, representing a comprehensive OMP.

- **Multiple Descriptions**: Contains multiple **Descriptions** of various inputs or outputs.
- **Structured by Blueprints**: Inherits the structure and content defined by the selected Blueprint, ensuring consistency and completeness.
- **Collaboration Features**: Invite users to a Plan with different roles and access rights—Viewer, Contributor, Reviewer, etc.
  - **Access Levels**: Grant access to the entire Plan or specific Sections for fine-grained control.
- **Export and Deposit Options**:
  - **Export**: Export the Plan in various formats (XML, JSON, DOCX, PDF) for both human and machine readability.
    - **Custom Exports**: Use the pluggable export mechanism to implement your own export plugins.
  - **Deposit**: Deposit OMPs directly to repositories for DOI assignment.
    - **Custom Deposits**: Use the pluggable deposit mechanism to implement your own deposit plugins for different repositories.

### **3. Description Templates**

Description Templates define the structure of a **Description** within a Plan, supporting a variety of input types to capture detailed information.

- **Supported Input Types**:
  - **Select**: Dropdown menus for predefined options.
  - **Boolean Decision**: Yes/No choices.
  - **RadioBox and CheckBox**: Multiple-choice selections.
  - **Text**: Open-ended text fields.
  - **File Upload**: Attach documents or files.
  - **Date**: Calendar selection for dates.
  - **External References**: Integration with external data sources via APIs.
- **Customization**: Configure Description Templates to meet specific data collection needs.

### **4. Descriptions**

Descriptions are detailed entries within a Plan that provide information about specific inputs or outputs.

- **Integration with Sections**: Included in various Sections of a Plan as defined by the Blueprint.
- **Detailed Information**: Offer a granular level of detail for comprehensive documentation.

### **5. References**

References are complex information that can be used either for a **Plan** or a **Description**. The user can add his own reference or select an existing one. The source of an existing reference can be:

- **Internal**: already be available for selection by the system.
- **External**: come from external APIs.

<!-- ### **5. Collaboration and Review**

Enhance teamwork and ensure quality through robust collaboration and review features.

- **User Roles and Access Rights**:
  - **Viewer**: Can view the Plan or specified Sections.
  - **Contributor**: Can edit the Plan or specified Sections.
  - **Reviewer**: Can review and add annotations to the Plan or specified Sections.
- **Section-Level Access**: Grant permissions at both the Plan and Section levels for precise control over user access.
- **Annotations (Comments)**:
  - **Adding Annotations**: Reviewers can add comments to Plans or specific Sections to provide feedback or request changes.
  - **Annotation Statuses**: Each annotation has statuses (e.g., Open, In Progress, Resolved, Closed) to track its lifecycle and ensure issues are addressed.

### **6. Notification Features**

Stay informed about updates and changes with flexible notification options.

- **Email Notifications**: Receive email alerts for important events, such as new annotations, status changes, or when you're invited to a Plan.
- **In-App Notifications**: Get real-time notifications within the platform for immediate awareness of updates and activities.
- **Customizable Settings**: Configure notification preferences to receive alerts that are most relevant to you.

### **7. Flexible Export and Deposit Options**

Easily share and integrate your Plans with others through various export formats and repository deposits.

- **Export Options**:
  - **Human-Readable Formats**: Export Plans as **DOCX** or **PDF** documents for easy sharing and presentation.
  - **Machine-Readable Formats**: Export Plans as **XML** or **JSON** files for integration with other systems or data processing.
  - **Pluggable Export Mechanism**:
    - **Custom Export Plugins**: Develop and integrate your own export plugins to support additional formats or specialized export needs.
    - **Extensibility**: The pluggable mechanism allows for seamless extension of export capabilities without modifying the core system.
- **Repository Deposits**:
  - **DOI Assignment**: Deposit OMPs directly to repositories to obtain a **Digital Object Identifier (DOI)**.
  - **Pluggable Deposit Mechanism**:
    - **Custom Deposit Plugins**: Implement your own deposit plugins to integrate with different repositories.
    - **Flexibility**: Supports multiple repositories, allowing you to choose where your OMPs are deposited.

### **8. Validation via Plugins**

Ensure your Plans meet specific standards and requirements through customizable validation.

- **Pluggable Validation Mechanism**:
  - **Custom Validation Plugins**: Develop and integrate your own validation plugins to check Plans against particular criteria.
  - **Flexibility**: Allows validation processes to be tailored to different industry standards, regulations, or organizational policies.
- **Manual Validation**: Perform validation checks as needed using the integrated tools provided by your custom plugins. -->

<!-- ## 🛠️ **Getting Started**

1. **Create a Blueprint**: Define the overall structure of your Plan by creating a Blueprint with the necessary Sections.
2. **Develop Description Templates**: Configure Description Templates with appropriate input types for the data you need to collect.
3. **Assemble the Plan**: Use the Blueprint to create a new Plan, inheriting the defined Sections and structure.
4. **Add Descriptions**: Within each Section of the Plan, add Descriptions by selecting from the available Description Templates and populating the input fields.
5. **Invite Collaborators**: Invite users to your Plan with specific roles (Viewer, Contributor, Reviewer) and assign access rights to the entire Plan or specific Sections.
6. **Set Up Notifications**: Configure your notification preferences for Email and In-App alerts to stay informed about updates and changes.
7. **Utilize External References**: Configure APIs as External References to include data from external sources, ensuring your Plan has the most up-to-date information.
8. **Review and Annotate**: Reviewers can add annotations to the Plan or specific Descriptions. Track annotation statuses to manage feedback effectively.
9. **Validate Your Plan**:
   - **Custom Validation**: Use validation plugins to check your Plan against specific standards or requirements.
   - **Manual Checks**: Perform validation manually through the tools provided by your custom plugins.
10. **Export or Deposit Your Plan**:
    - **Export**: Choose from various export formats (XML, JSON, DOCX, PDF) to share or integrate your Plan as needed.
      - **Custom Exports**: Implement custom export plugins if you have specific export requirements.
    - **Deposit**: Deposit your Plan to repositories for DOI assignment.
      - **Custom Deposits**: Implement custom deposit plugins to integrate with your preferred repositories.



## 🤝 **Contributing**

We welcome contributions from the community! Please check out our [contributing guidelines](developers/contributing.md) to get started.

## 📄 **License**

OpenCDMP is released under the [EUPL-1.2 License](https://github.com/OpenCDMP/OpenCDMP/blob/main/LICENSE).

---

Start simplifying your Output Management Plans with OpenCDMP today! -->
