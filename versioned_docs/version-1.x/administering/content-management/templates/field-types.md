---
sidebar_position: 1
description: View details about the field types available in description templates
---

# Field Types

When adding a field to a description template, you choose one of the following field types:

| Field Type | Data Stored | Best For |
|---|---|---|
| **Free Text** | Single-line string | Short answers, identifiers, URLs |
| **Text Area** | Multi-line string | Longer free-text answers |
| **Rich Text Area** | Formatted HTML string | Answers requiring formatting (bold, lists, links) |
| **Date Picker** | Date value | Dates (e.g., start date, end date) |
| **Boolean Decision** | Boolean (true/false) | Yes/No questions presented as a decision |
| **Checkbox** | Boolean (true/false) | Standalone opt-in/opt-out toggle |
| **Radio Box** | Single selection from predefined options | Mutually exclusive choices (e.g., Yes / No / Unknown) |
| **Select** | Single or multiple selections from predefined options | Picking from a defined list; supports multi-select |
| **Tags** | List of text values | Free-form keyword or tag entry |
| **Upload** | Binary file | Uploading supporting documents or datasets |
| **Reference Types** | Linked reference record | Selecting from an external source (grants, organizations, etc.) — connects to a configured [Reference Type](/versioned_docs/version-1.x/administering/system-configuration/reference-types.md) |
| **Dataset Identifier** | External identifier with type | DOIs, handles, ARKs, and other persistent identifiers |
| **Validation** | String with format validation | Fields requiring a specific format (e.g., URL) |
| **Internal Entries – Plans** | Link to another plan | Cross-referencing other plans in the platform |
| **Internal Entries – Descriptions** | Link to another description | Cross-referencing other descriptions in the platform |

## Upload Field Configuration

When using the **Upload** field type, additional configuration is required:

| Setting | Description |
|---|---|
| **Max File Size** | The maximum file size users can upload (required) |
| **File Types** | Restrict uploads to specific file types by selecting from the available list |
| **Other File Types** | If a required file type is not in the list, add it manually with a name and MIME type |
