---
sidebar_position: 1
description: View details about the field types available in blueprints
---

# Field Types

Blueprint fields are organized into four categories.

## System Fields

Predefined fields that represent core plan metadata. Each system field type can only be added once per blueprint.

| System Field | What It Captures |
|---|---|
| **Title** | The display name of the plan |
| **Description** | A free-text summary of the plan |
| **Language** | The language of the plan. Options come from the configured [Languages](/versioned_docs/version-1.x/administering/system-configuration/languages.md) |
| **Contact** | A responsible contact person for the plan |
| **Access Rights** | Whether the plan is `Public` or `Restricted` |
| **User** | A user registered on the platform |

## Reference Type Fields

Link a blueprint field to a [Reference Type](/versioned_docs/version-1.x/administering/system-configuration/reference-types.md). Users search for and select values from the configured source (e.g., a grant from OpenAIRE, an organization from ROR).

When adding a Reference Type field, you select which Reference Type it connects to.

## Extra Fields

Free-form fields for any additional plan-level metadata not covered by system or reference type fields.

| Data Type | Description |
|---|---|
| **Text** | A single-line text input |
| **Rich Text** | A formatted text editor (bold, italic, lists, links) |
| **Date** | A date picker |
| **Number** | A numeric input |

## Upload Fields

A file attachment at the plan level. Requires additional configuration:

| Setting | Description |
|---|---|
| **Max File Size** | The maximum file size users can upload (required) |
| **File Types** | Restrict uploads to specific file types by selecting from the available list |
| **Other File Types** | If a required file type is not in the list, add it manually with a name and MIME type |
