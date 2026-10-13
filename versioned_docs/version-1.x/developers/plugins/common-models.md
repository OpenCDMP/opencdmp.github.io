---
sidebar_position: 4
---

# Common Models

:::info
[Common Models](https://mvnrepository.com/artifact/org.opencdmp/common-models) is a **Maven package** that provides shared models and classes used across the **OpenCDMP** platform. These models standardize the data structures and communication between the various services and microservices that make up the OpenCDMP ecosystem.
:::

## Overview

The **[common-models](https://github.com/OpenCDMP/common-models)** repository contains Java classes that form the contract between the OpenCDMP platform and all its plugins — [file transformers](/versioned_docs/version-1.x/developers/plugins/file-transformers.md), [repository deposit services](/versioned_docs/version-1.x/developers/plugins/deposit.md), and [evaluators](/versioned_docs/version-1.x/developers/plugins/evaluator.md). Every plugin receives and returns instances of these models when communicating with the platform.

## Maven Dependency

```xml
<dependency>
    <groupId>org.opencdmp</groupId>
    <artifactId>common-models</artifactId>
    <version>1.2.0</version>
</dependency>
```

---

## FileEnvelopeModel

`FileEnvelopeModel` is a generic file wrapper used wherever the platform or a plugin needs to pass binary file data — export outputs, import inputs, logo images, etc.

```java
public class FileEnvelopeModel {
    private String filename;   // Original filename, including extension (e.g. "plan.docx")
    private String fileRef;    // Internal storage reference or identifier
    private String mimeType;   // MIME type of the file (e.g. "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    private byte[] file;       // Raw binary file content
}
```

---

## PlanModel

`PlanModel` represents a complete plan and is the primary input to export, deposit, and evaluation plugins.

```java
public class PlanModel {
    private UUID id;
    private short version;
    private String label;
    private String description;

    // PlanAccessType enum: Public | Restricted
    private PlanAccessType accessType;

    // Contains id, display name, and internalStatus (Draft | Finalized)
    private PlanStatusModel status;

    // The user who created this plan (id, name, email)
    private UserModel creator;

    // The blueprint that defines this plan's structure
    private PlanBlueprintModel planBlueprint;

    // The values entered in blueprint fields (e.g. contacts, extra fields)
    private PlanPropertiesModel properties;

    // DOIs assigned to this plan from deposit services
    private List<EntityDoiModel> entityDois;

    // All descriptions belonging to this plan
    private List<DescriptionModel> descriptions;

    // Users and their roles on this plan
    private List<PlanUserModel> users;

    // References linked to this plan (grants, organizations, etc.)
    private List<PlanReferenceModel> references;

    // Description templates used across this plan's sections
    private List<PlanDescriptionTemplateModel> descriptionTemplates;

    // Pre-generated file representations of this plan (may be null)
    private FileEnvelopeModel pdfFile;
    private FileEnvelopeModel rdaJsonFile;
    private FileEnvelopeModel raidJsonFile;
    private FileEnvelopeModel supportingFilesZip;

    // DOI from the previous deposited version (for updates)
    private String previousDOI;

    private Instant finalizedAt;
    private Instant publicAfter;
    private Instant updatedAt;
    private Instant createdAt;
    private String language;
}
```

### PlanBlueprintModel

Describes the structural template of the plan — its sections and fields.

```java
public class PlanBlueprintModel {
    private UUID id;
    private String label;
    private String description;
    private DefinitionModel definition;  // Contains sections and plugin configs
    private PlanBlueprintTypeModel type;
    // PlanBlueprintStatus enum: Draft | Finalized
    private PlanBlueprintStatus status;
    private UUID groupId;
}
```

The `DefinitionModel` contains the list of `SectionModel` objects, each of which holds the configured `FieldModel` entries (system fields, reference type fields, extra fields, upload fields).

### PlanPropertiesModel

Holds the actual values entered by users in the blueprint's fields.

```java
public class PlanPropertiesModel {
    // Values for each blueprint field (field ID → value)
    private List<PlanBlueprintValueModel> planBlueprintValues;
    // Contact entries if the blueprint includes a contact field
    private List<PlanContactModel> contacts;
}
```

### PlanUserModel

Represents a user's membership and role on a plan.

```java
public class PlanUserModel {
    private UserModel user;        // Full user info (id, name, email)
    private PlanUserRole role;     // Enum: Owner | Member | Viewer
    private UUID sectionId;        // Section-level role scope (null = plan-level)
}
```

### PlanReferenceModel

Links an external reference to a plan (e.g., a grant, organization, or researcher).

```java
public class PlanReferenceModel {
    private UUID id;
    private ReferenceModel reference;   // The reference record itself
    private PlanReferenceDataModel data; // Which blueprint field holds this reference
}
```

---

## DescriptionModel

`DescriptionModel` represents one description within a plan. It contains both the template structure and the user's answers.

```java
public class DescriptionModel {
    private UUID id;
    private String label;
    private String description;
    private List<String> tags;

    // Contains id, display name, and internalStatus (Draft | Finalized | Canceled)
    private DescriptionStatusModel status;

    // The template that defines this description's questions
    private DescriptionTemplateModel descriptionTemplate;

    // The plan this description belongs to
    private PlanModel plan;

    // Which blueprint section this description was created under
    private UUID sectionId;

    private Instant createdAt;

    // The user's answers to all questions in this description
    private PropertyDefinitionModel properties;

    // Controls which fields are currently visible (based on visibility rules)
    private List<VisibilityStateModel> visibilityStates;
}
```

### DescriptionTemplateModel

Describes the question structure of a description template (pages → sections → field sets → fields).

```java
public class DescriptionTemplateModel {
    private UUID id;
    private String label;
    private String description;
    private DescriptionTemplateTypeModel type;
    private UUID groupId;
    private Short version;
    private String language;
    private DefinitionModel definition;  // Contains pages and plugin configs
}
```

The `DefinitionModel` contains `PageModel` objects. Each page has `SectionModel` objects (which can be nested). Each section contains `FieldSetModel` objects, which hold the individual `FieldModel` question definitions.

Each `FieldModel` in the template contains:
- `id` — unique identifier
- `semantics` — semantic tags used for prefilling and interoperability. Plugins inspect `semantics` to locate fields by meaning rather than by id, which is how the built-in [file transformers](/versioned_docs/version-1.x/optional-services/file-transformers/index.md) and [deposit services](/versioned_docs/version-1.x/optional-services/deposit-services/index.md) map plan and description data to their output formats. Each plugin's per-semantic mapping is documented on its reference page.
- `validations` — e.g., `Required`, `Url`
- `data` — a `BaseFieldDataModel` subclass describing the field type (free text, date, reference, boolean, etc.)

### PropertyDefinitionModel — Description Answers

`PropertyDefinitionModel` holds all the answers a user has provided for a description. It mirrors the template structure using field set IDs as keys.

```java
public class PropertyDefinitionModel {
    // Key: field set ID from the template; Value: the answers for that field set
    private Map<String, PropertyDefinitionFieldSetModel> fieldSets;
}
```

**`PropertyDefinitionFieldSetModel`** — answers for one field set, supporting multiplicity (a field set can have multiple item rows):

```java
public class PropertyDefinitionFieldSetModel {
    private List<PropertyDefinitionFieldSetItemModel> items;
    private String comment;  // Optional comment on the field set
}
```

**`PropertyDefinitionFieldSetItemModel`** — one row of answers within a field set:

```java
public class PropertyDefinitionFieldSetItemModel {
    // Key: field ID from the template; Value: the answer for that field
    private Map<String, FieldModel> fields;
    private Integer ordinal;  // Position when multiple items exist
}
```

**`FieldModel`** — the actual answer to a single question. The field type determines which value property is populated:

```java
public class FieldModel {
    private String id;
    private String textValue;              // Free text, radio, select, textarea
    private FileEnvelopeModel file;        // Upload field
    private Boolean booleanValue;          // Checkbox/boolean field
    private List<String> textListValue;    // Multi-select or tag fields
    private Instant dateValue;             // Date picker field
    private List<ReferenceModel> references;             // Reference type field
    private ExternalIdentifierModel externalIdentifier;  // External identifier field
}
```

:::tip
To read a user's answer to a specific question, look up its field set ID in `properties.getFieldSets()`, then look up the field ID within an item's `fields` map. Only one value property will be non-null — determined by the field type defined in the template.
:::

### VisibilityStateModel

Tracks which fields are currently visible in a description (after visibility rules are evaluated).

```java
public class VisibilityStateModel {
    private String fieldId;   // The field whose visibility is tracked
    private Integer ordinal;  // Item index (for multiplicity)
    private boolean visible;
}
```

---

## ReferenceModel

`ReferenceModel` represents a linked external record — a grant, organization, researcher, publication, or any other [reference type](/versioned_docs/version-1.x/administering/system-configuration/reference-types.md).

```java
public class ReferenceModel {
    private UUID id;
    private String label;
    private ReferenceTypeModel type;          // Reference type (id, name, code, definition)
    private String description;
    private ReferenceDefinitionModel definition; // Custom fields and their values
    private String reference;                 // The primary identifier value (e.g., ORCID iD, ROR ID)
    private String abbreviation;
    private String source;
    // ReferenceSourceType enum: Internal | External
    private ReferenceSourceType sourceType;
}
```

---

## Plugin Configuration Models

These models allow plugins to declare configurable fields that appear in the OpenCDMP admin interface. Administrators fill in these fields when registering the plugin, and the values are passed back to the plugin at runtime.

### ConfigurationField

Declares one configurable field for a plugin.

```java
public class ConfigurationField {
    private String code;                      // Internal key for this field
    private DataType type;                    // DataType enum: String | File
    private String label;                     // Display label in the admin UI
    private List<PluginEntityType> appliesTo; // PluginEntityType: Plan | Description
    private boolean authInfo;                 // If true, the value is treated as a credential and encrypted at rest
}
```

**`configurationFields`** are filled in by the administrator when registering the plugin (e.g., an API key or a template file).

**`userConfigurationFields`** are filled in by individual users via their [profile settings](/versioned_docs/version-1.x/using/profile-settings.md) (e.g., a personal access token for a deposit repository).

### PluginModel

When a plugin's configuration fields have been filled in, the values are passed back to the plugin through `PluginModel` instances attached to the plan blueprint or description template.

```java
public class PluginModel {
    private String code;            // Matches the plugin's identifier
    private PluginType type;        // PluginType enum: FileTransformer | Deposit | Evaluation
    private List<PluginFieldModel> fields;         // System-level configured values
    private List<PluginUserFieldModel> userFields; // User-level configured values
}
```

**`PluginFieldModel`** and **`PluginUserFieldModel`** — a single resolved configuration value:

```java
public class PluginFieldModel {
    private String code;              // Matches ConfigurationField.code
    private String textValue;         // Value if type is String
    private FileEnvelopeModel file;   // Value if type is File
}
```

To retrieve a configuration value in your plugin implementation, find the `PluginModel` in `plan.getPlanBlueprint().getDefinition().getPlugins()` where `type` matches your plugin type, then look up the field by `code`.

---

## Key Enums

| Enum | Values |
|------|--------|
| `PlanAccessType` | `Public`, `Restricted` |
| `PlanStatus` | `Draft` (0), `Finalized` (1) |
| `DescriptionStatus` | `Draft` (0), `Finalized` (1), `Canceled` (2) |
| `PlanUserRole` | `Owner`, `Member`, `Viewer` |
| `PluginType` | `FileTransformer` (0), `Deposit` (1), `Evaluation` (2) |
| `PluginEntityType` | `Plan` (0), `Description` (1) |
| `DataType` | `String`, `File` |
| `ReferenceSourceType` | `Internal`, `External` |

---

## Key Features

- **Consistency**: Ensures consistent data structures across services.
- **Reusability**: Common models are reusable across different microservices in the platform.
- **Interoperability**: Simplifies communication between different components of OpenCDMP.
- **Standardization**: Provides a standard approach for handling core concepts like plans, descriptions, file operations, and repository deposits.

## License

This repository is licensed under the [EUPL 1.2 License](https://github.com/OpenCDMP/common-models/blob/main/LICENSE).

## Contact

For questions or support regarding this repository, please contact:

- **Email**: opencdmp at cite.gr

:::note
You can view the `Common Models` source code [here](https://github.com/OpenCDMP/common-models).
:::
