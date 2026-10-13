---
sidebar_position: 4
title: Common models
description: The common-models package shared by OpenCDMP and its plugins - plan, asset, blueprint, template, reference, file, plugin configuration, and semantics manifest models
---

# Common models

:::note
Assets are called *descriptions* in the API, plugin contracts, and data model.
:::

:::info
[Common Models](https://mvnrepository.com/artifact/org.opencdmp/common-models) is a **Maven package** that provides shared models and classes used across the **OpenCDMP** platform. These models standardize the data structures and communication between the various services and microservices that make up the OpenCDMP ecosystem.
:::

## Overview

The **[common-models](https://github.com/OpenCDMP/common-models)** repository contains Java classes that form the contract between the OpenCDMP platform and all its plugins: [file transformers](/docs/developers/plugins/file-transformers.md), [repository deposit services](/docs/developers/plugins/deposit.md), and [evaluators](/docs/developers/plugins/evaluator.md). Every plugin receives and returns instances of these models when communicating with the platform.

All classes live under the `org.opencdmp.commonmodels` base package, split into an `enums` package and a `models` package. `models` is further split into sub-packages (`plan`, `description`, `planblueprint`, `descriptiotemplate`, `planblueprintdescriptiontemplatefields`, `plandescriptionfields`, `plandescriptiontemplate`, `planreference`, `plugin`, `reference`, `referencetype`, `user`, `deposit`). Two pairs of classes share a simple name: **two distinct `DefinitionModel` classes** (`planblueprint.DefinitionModel` and `descriptiotemplate.DefinitionModel`) and **two distinct `FieldModel` classes** (`planblueprintdescriptiontemplatefields.FieldModel`, the question definition, and `plandescriptionfields.FieldModel`, the answer). The sections below give the package wherever two classes share a name.

:::note
The `deposit` sub-package (`DepositPreviewModel`, `PreviewField`, `PreviewFieldGroup`, and related classes) backs the optional deposit **preview and metadata review** feature. It is described with the deposit plugin contract in [Deposit preview and metadata review](/docs/developers/plugins/deposit-preview.md).
:::

## Maven dependency

```xml
<dependency>
    <groupId>org.opencdmp</groupId>
    <artifactId>common-models</artifactId>
    <version>${opencdmp.common-models.version}</version>
</dependency>
```

Use the latest release from [Maven Central](https://central.sonatype.com/namespace/org.opencdmp), or the version that your plugin base library depends on. The models described here ship with the 2.0 release.

---

## FileEnvelopeModel

`FileEnvelopeModel` is a generic file wrapper used wherever the platform or a plugin needs to pass binary file data: export outputs, import inputs, logo images, and so on.

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

    // The user who created this plan (id, name, additionalInfo, contacts — see UserModel)
    private UserModel creator;

    // The blueprint that defines this plan's structure
    private PlanBlueprintModel planBlueprint;

    // The values entered in blueprint fields (field sets, plus contacts)
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

    // Controls which blueprint fields are currently visible (based on visibility rules)
    private List<VisibilityStateModel> visibilityStates;

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

:::tip
`PlanModel` and `DescriptionModel` each carry their own independent `visibilityStates` list: one for blueprint-level fields (on the plan) and one for template-level fields (on each description). Both use the same [VisibilityStateModel](#visibilitystatemodel).
:::

### PlanBlueprintModel

Describes the structure of the plan: its sections and fields.

```java
public class PlanBlueprintModel {
    private UUID id;
    private String label;
    private String description;
    private DefinitionModel definition;  // planblueprint.DefinitionModel — see below
    private PlanBlueprintTypeModel type;
    // PlanBlueprintStatus enum: Draft | Finalized
    private PlanBlueprintStatus status;
    private UUID groupId;
}
```

`planblueprint.DefinitionModel` holds:

```java
public class DefinitionModel {
    private List<RootSectionModel> sections;
    private List<PluginModel> plugins;  // System-level plugin configuration — see Plugin Configuration Models
}
```

`RootSectionModel` extends the shared [SectionModel](#descriptiontemplatemodel) (id, ordinal, title, description, extendedDescription, nested `sections`, `fieldSets`) and adds two blueprint-only fields:

```java
public class RootSectionModel extends SectionModel {
    private Boolean hasTemplates;
    private Boolean canEditDescriptionTemplates;
}
```

### PlanPropertiesModel

Holds the actual values entered by users in the blueprint's fields.

```java
public class PlanPropertiesModel {
    // Key: field set ID from the blueprint; value: the answers for that field set
    private Map<String, PropertyDefinitionFieldSetModel> fieldSets;
    // Contact entries if the blueprint includes a contact field
    private List<PlanContactModel> contacts;
}
```

`PlanPropertiesModel.fieldSets` uses the exact same [PropertyDefinitionFieldSetModel](#propertydefinitionmodel--asset-answers) / `PropertyDefinitionFieldSetItemModel` / `FieldModel` shapes described under `PropertyDefinitionModel` below. Plan-level and asset-level answers share one answer model, keyed by field set ID.

`PlanContactModel`:

```java
public class PlanContactModel {
    private String firstName;
    private String lastName;
    private String email;
}
```

### PlanUserModel

Represents a user's membership and role on a plan.

```java
public class PlanUserModel {
    private UserModel user;        // Full user info (id, name, additionalInfo, contacts)
    private PlanUserRole role;     // Enum — see Key Enums
    private String sectionId;      // Section-level role scope (null = plan-level)
}
```

:::tip
`sectionId` is a `String`, not a `UUID`. Section IDs throughout the blueprint/template definition tree (`SectionModel.id`) are strings. This applies to `PlanUserModel.sectionId`, `DescriptionModel.sectionId`, and `PlanDescriptionTemplateModel.sectionId` alike.
:::

### PlanReferenceModel

Links an external reference to a plan (e.g., a grant, organization, or researcher).

```java
public class PlanReferenceModel {
    private UUID id;
    private ReferenceModel reference;       // The reference record itself
    private PlanReferenceDataModel data;    // Which blueprint field holds this reference
}
```

`PlanReferenceDataModel`:

```java
public class PlanReferenceDataModel {
    private String blueprintFieldId;  // The blueprint field this reference answers
    private Integer ordinal;          // Position when multiple references are linked
}
```

### PlanDescriptionTemplateModel

Identifies one description template made available to a specific section of the plan's blueprint.

```java
public class PlanDescriptionTemplateModel {
    private UUID descriptionTemplateGroupId;  // The template group offered
    private String sectionId;                 // Which blueprint section offers it
}
```

---

## DescriptionModel

`DescriptionModel` represents one asset within a plan. It contains both the template structure and the user's answers.

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
    private String sectionId;

    private Instant createdAt;

    // The user's answers to all questions in this description
    private PropertyDefinitionModel properties;

    // Controls which fields are currently visible (based on visibility rules)
    private List<VisibilityStateModel> visibilityStates;
}
```

### DescriptionTemplateModel

Describes the question structure of an asset template (sections → field sets → fields). This class lives in the `descriptiotemplate` package.

```java
public class DescriptionTemplateModel {
    private UUID id;
    private String label;
    private String description;
    private DescriptionTemplateTypeModel type;  // id, name
    private UUID groupId;
    private Short version;
    private String language;
    private DefinitionModel definition;  // descriptiotemplate.DefinitionModel — see below
}
```

`descriptiotemplate.DefinitionModel` holds:

```java
public class DefinitionModel {
    private List<SectionModel> sections;
    private List<PluginModel> plugins;  // System-level plugin configuration — see Plugin Configuration Models
}
```

`SectionModel` (in `planblueprintdescriptiontemplatefields`, shared with `RootSectionModel` above) can nest through its own `sections` list and holds `fieldSets`:

```java
public class SectionModel {
    private String id;
    private Integer ordinal;
    private String title;
    private String description;
    private String extendedDescription;
    private List<SectionModel> sections;    // Nested sub-sections
    private List<FieldSetModel> fieldSets;
    private List<String> semantics;         // The objects the section describes, e.g. "rda.dataset.distribution"
}
```

`FieldSetModel` holds the individual `FieldModel` question definitions, plus the configuration for repeatable ("multiplicity") entries:

```java
public class FieldSetModel {
    private String id;
    private Integer ordinal;
    private String title;
    private String description;
    private String extendedDescription;
    private String additionalInformation;
    private boolean hasMultiplicity;
    private MultiplicityModel multiplicity;  // Only meaningful when hasMultiplicity is true
    private List<FieldModel> fields;
    private List<String> semantics;          // The objects one answer describes, e.g. "rda.dataset.distribution.license"
}
```

`SectionModel.semantics` and `FieldSetModel.semantics` hold **objects**, not values: they tell a plugin which answers belong to one output object.

- Inside a section whose `semantics` name an object, all the section's answers with keys under that object make up one object. When sections nest, the outermost section describing the object counts.
- A field set whose `semantics` name an object produces one object per answer (`PropertyDefinitionFieldSetItemModel`).
- With neither, each answer is its own object.

Both lists are `null` or empty on structures that do not use them. See [Objects](/docs/administering/content-management/templates/semantics.md#objects-several-questions-one-exported-object) in the admin guide.

```java
public class MultiplicityModel {
    private Integer min;
    private Integer max;
    private String placeholder;
    private Boolean tableView;
    private Boolean transposedTableView;
}
```

When `hasMultiplicity` is true, a user can add multiple answer rows for the field set. Each row is one `PropertyDefinitionFieldSetItemModel` (see [PropertyDefinitionModel](#propertydefinitionmodel--asset-answers)), and `min`/`max` bound how many rows are allowed.

Each `FieldModel` in the template (package `planblueprintdescriptiontemplatefields`) contains:

```java
public class FieldModel {
    private String id;
    private Integer ordinal;                     // Position within the field set
    private List<String> semantics;
    private DefaultValueModel defaultValue;       // Prefilled default answer, if any
    private List<FieldValidationType> validations; // Enum — see Key Enums
    private Boolean includeInExport;              // Whether file transformers include this field's answer in export output
    private BaseFieldDataModel data;              // Polymorphic — see below
}
```

- `semantics`: semantic tags used for prefilling and interoperability. Plugins inspect `semantics` to locate fields by meaning, not by id, which is how the built-in [file transformers](/docs/optional-services/file-transformers/index.md) and [deposit services](/docs/optional-services/deposit-services/index.md) map plan and asset data to their output formats. Each plugin's per-semantic mapping is documented on its reference page.
- `validations`: a list of [FieldValidationType](#key-enums) values, e.g. `Required`, `Url`.
- `data`: a `BaseFieldDataModel` subclass describing the field type (free text, date, reference, boolean, etc.), selected by the [FieldType](#key-enums) discriminator.

`DefaultValueModel`:

```java
public class DefaultValueModel {
    private String textValue;
    private Instant dateValue;
    private Boolean booleanValue;
    private Double numberValue;
}
```

#### BaseFieldDataModel and its subclasses

`FieldModel.data` is deserialized polymorphically based on a JSON property named `fieldType`, whose value is one of the [FieldType](#key-enums) string codes (e.g. `"freetext"`, `"select"`, `"upload"`). `BaseFieldDataModel` itself carries:

```java
public abstract class BaseFieldDataModel {
    private String label;
    private FieldType fieldType;
}
```

Several `FieldType` values share one subclass with no extra fields; the discriminator alone tells them apart:

| Concrete class | Extra fields | `FieldType` values that map to it |
|---|---|---|
| `LabelDataModel` | *(none; label and fieldType only)* | `BooleanDecision`, `CheckBox`, `DatePicker`, `FreeText`, `RichTextarea`, `Tags`, `TextArea`, `Validation`, `DatasetIdentifier` |
| `LabelAndMultiplicityDataModel` | `multipleSelect` (Boolean) | `InternalEntitiesDescriptions`, `InternalEntitiesPlans` |
| `SelectDataModel` extends `LabelAndMultiplicityDataModel` | `options` (List of `OptionModel`: `label`, `value`, `semantics`, `exportsNothing`) | `Select` |
| `RadioBoxDataModel` | `options` (List of `RadioBoxOptionModel`: `label`, `value`, `semantics`, `exportsNothing`) | `RadioBox` |
| `UploadDataModel` | `types` (List of `{label, value}`) | `Upload` |
| `ReferenceTypeDataModel` | `multipleSelect` (Boolean), `referenceType` (ReferenceTypeModel) | `ReferenceTypes` |
| `NumberDataModel` | *(none)* | `Number` |
| `SystemFieldDataModel` | `systemFieldType` ([SystemFieldType](#key-enums) enum) | `System` |

Select and radio options can stand for semantic key values:

```java
public class OptionModel {                     // RadioBoxOptionModel has the same fields
    private String label;
    private String value;                      // The stored answer
    private List<SemanticValueModel> semantics; // Key values choosing this option stands for
    private boolean exportsNothing;            // Choosing it means nothing is exported for the question's object
}

public class SemanticValueModel {
    private String key;    // e.g. "rda.dataset.distribution.host.title"
    private String value;  // e.g. "Zenodo"; may be null
}
```

A plugin reading an answer should treat the chosen option's `semantics` as if inputs carrying those keys had been answered, and let a key answered by an input of the same object win over the option's value. When the chosen option has `exportsNothing`, leave out the object the question (or its section) describes. On import, select the option whose key values match the imported object, and the `exportsNothing` option when the file has no such object.

### PropertyDefinitionModel — asset answers

`PropertyDefinitionModel` holds all the answers a user has provided for an asset. It mirrors the template structure using field set IDs as keys.

```java
public class PropertyDefinitionModel {
    // Key: field set ID from the template; Value: the answers for that field set
    private Map<String, PropertyDefinitionFieldSetModel> fieldSets;
}
```

**`PropertyDefinitionFieldSetModel`**: answers for one field set, supporting multiplicity (a field set can have multiple item rows, per `FieldSetModel.multiplicity`):

```java
public class PropertyDefinitionFieldSetModel {
    private List<PropertyDefinitionFieldSetItemModel> items;
    private String comment;  // Optional comment on the field set
}
```

**`PropertyDefinitionFieldSetItemModel`**: one row of answers within a field set:

```java
public class PropertyDefinitionFieldSetItemModel {
    // Key: field ID from the template; Value: the answer for that field
    private Map<String, FieldModel> fields;
    private Integer ordinal;  // Position when multiple items exist
}
```

**`FieldModel`** (package `plandescriptionfields`, distinct from the template-side `FieldModel` above): the answer to a single question. The field type determines which value property is populated:

```java
public class FieldModel {
    private String id;
    private String textValue;              // Free text, radio, select, textarea
    private FileEnvelopeModel file;        // Upload field
    private Boolean booleanValue;          // Checkbox/boolean field
    private List<String> textListValue;    // Multi-select or tag fields
    private Instant dateValue;             // Date picker field
    private Double numberValue;            // Number field
    private List<ReferenceModel> references;             // Reference type field
    private ExternalIdentifierModel externalIdentifier;  // External identifier field
}
```

`ExternalIdentifierModel`:

```java
public class ExternalIdentifierModel {
    private String identifier;
    private String type;
}
```

:::tip
To read a user's answer to a specific question, look up its field set ID in `properties.getFieldSets()`, then look up the field ID within an item's `fields` map. Only one value property is non-null, depending on the field type defined in the template.
:::

### VisibilityStateModel

Tracks which fields are currently visible in a plan or asset (after visibility rules are evaluated).

```java
public class VisibilityStateModel {
    private String fieldId;   // The field whose visibility is tracked
    private Integer ordinal;  // Item index (for multiplicity)
    private boolean visible;
}
```

---

## ReferenceModel

`ReferenceModel` represents a linked external record: a grant, organization, researcher, publication, or any other [reference type](/docs/administering/system-configuration/reference-types.md).

```java
public class ReferenceModel {
    private UUID id;
    private String label;
    private ReferenceTypeModel type;             // The reference type's schema — see below
    private String description;
    private ReferenceDefinitionModel definition; // This instance's custom field values
    private String reference;                    // The primary identifier value (e.g., ORCID iD, ROR ID)
    private String abbreviation;
    private String source;
    // ReferenceSourceType enum: Internal | External
    private ReferenceSourceType sourceType;
}
```

Reference types follow a schema/value split, similar to blueprints and their answers:

- **Schema**: `ReferenceTypeModel` (`id`, `name`, `code`, `definition`) → `ReferenceTypeDefinitionModel` (`fields: List<ReferenceTypeFieldModel>`) → `ReferenceTypeFieldModel` (`code`, `label`, `description`, `dataType`, `semantics`, `required`) describes what custom fields a reference type has.
- **Values**: `ReferenceDefinitionModel` (`fields: List<ReferenceFieldModel>`) → `ReferenceFieldModel` (`code`, `dataType`, `value`) holds the actual values for one reference instance, correlated back to the schema by matching `code`.

```java
public class ReferenceTypeModel {
    private UUID id;
    private String name;
    private String code;
    private ReferenceTypeDefinitionModel definition;
}

public class ReferenceTypeFieldModel {
    private String code;
    private String label;
    private String description;
    private ReferenceTypeFieldDataType dataType;  // Enum — see Key Enums
    private List<String> semantics;
    private Boolean required;
}

public class ReferenceFieldModel {
    private String code;
    private ReferenceTypeFieldDataType dataType;
    private String value;
}
```

---

## Plugin configuration models

These models allow plugins to declare configurable fields that appear in the OpenCDMP interface. Organisation administrators fill in these fields on the plugin's settings page, users fill in their own fields in their profile, and the values are passed back to the plugin at runtime.

### ConfigurationField

Declares one configurable field for a plugin.

```java
public class ConfigurationField {
    private String code;                      // Internal key for this field
    private DataType type;                    // DataType enum — see Key Enums
    private String label;                     // Display label in the UI
    private List<PluginEntityType> appliesTo; // PluginEntityType: Plan | Description
    private boolean authInfo;                 // If true, the value is treated as a credential and encrypted at rest
    private List<ConfigurationFieldOption> options; // Selectable options — only meaningful when type is Select
}
```

`ConfigurationFieldOption` supplies the label/value pairs for a `ConfigurationField` of type `Select`:

```java
public class ConfigurationFieldOption {
    private String label;
    private String value;
}
```

The `type` decides which control the shared plugin editor renders, for administrator and user fields alike, and how the value travels on the wire. Every non-file type is stored as a string in `textValue`:

| `DataType` | Rendered as | `textValue` on the wire |
|---|---|---|
| `String` | Text input | The text as typed |
| `File` | File uploader (accepts `.docx`, PNG, and JPEG) | *(none; the value is a `FileEnvelopeModel` in `file`)* |
| `Boolean` | Slide toggle | `"true"` or `"false"` |
| `Select` | Dropdown built from `options` | The `value` of the chosen option |
| `Color` | Color picker with a text input | The color as typed or picked, for example `#AA3366` |
| `Number` | Numeric input | The number as a string, for example `"12"` |

:::note
`Boolean`, `Select`, `Color`, and `Number`, together with the `options` list, were added in common-models 2.0.0. A platform older than that does not render such fields; a plugin that must stay compatible with older platforms should keep to `String` and `File`.
:::

**`configurationFields`** are filled in by the administrator when registering the plugin on the **Settings > Plugins** page of the [Organisation settings](/docs/administering/tenant-management/tenant-configuration.md) and, for file transformers, can be overridden per plan blueprint or asset template (e.g., an API key or a template file).

**`userConfigurationFields`** are filled in by individual users via their [profile settings](/docs/using/profile-settings.md) (e.g., a personal access token for a deposit repository). For file transformers, the platform also offers the user configuration fields that apply to the exported entity type as **per-export options** in the export dialog; see [Per-export options](/docs/developers/plugins/file-transformers.md#per-export-options-and-selective-export).

When a `File` field is uploaded for a file transformer plugin, the platform also asks the transformer to validate the file; see [Template validation](/docs/developers/plugins/file-transformers.md#template-validation).

### PluginModel and PluginUserModel

System-level and user-level plugin configuration values are reached through two different object graphs, not through one shared model.

**System-level** values are passed back to the plugin through `PluginModel` instances attached to the plan blueprint's or asset template's `DefinitionModel.plugins`:

```java
public class PluginModel {
    private String code;                    // Matches the plugin's identifier
    private PluginType type;                // PluginType enum: FileTransformer | Deposit | Evaluation
    private List<PluginFieldModel> fields;  // System-level configured values
}
```

To retrieve a system-level configuration value in your plugin implementation, find the `PluginModel` in `plan.getPlanBlueprint().getDefinition().getPlugins()` where `type` matches your plugin type, then look up the field by `code`.

**User-level** values live on a separate `PluginUserModel`, reached via `UserModel.getAdditionalInfo().getPluginConfigurations()` (e.g. `plan.getCreator().getAdditionalInfo().getPluginConfigurations()`, or via a `PlanUserModel.user` entry):

```java
public class PluginUserModel {
    private String code;
    private PluginType type;
    private List<PluginUserFieldModel> userFields;  // exposed via getFields()/setFields()
}
```

```java
public class UserAdditionalInfoModel {
    private List<PluginUserModel> plugins;  // exposed via getPluginConfigurations()/setPluginConfigurations()
}
```

**`PluginFieldModel`** and **`PluginUserFieldModel`** hold a single resolved configuration value and have the same shape:

```java
public class PluginFieldModel {
    private String code;              // Matches ConfigurationField.code
    private String textValue;         // Value if type is String, Boolean, Select, Color, or Number
    private FileEnvelopeModel file;   // Value if type is File
}
```

---

## Semantics manifest models

A plugin can publish the semantic keys it reads in a `SemanticsManifest`, returned in the `semantics` property of its configuration (`FileTransformerConfiguration`, `DepositConfiguration`, or `EvaluatorConfiguration`). OpenCDMP collects the manifests of the tenant's plugins (`GET /api/semantics/plugins`) and the blueprint and asset template editors use them for suggestions, coverage, and checks. Nothing in a manifest makes a key required by OpenCDMP or blocks saving. The models live in the `semantics` package.

```java
public class SemanticsManifest {
    private List<SemanticVocabulary> vocabularies; // The key prefixes the plugin reads, with a readable name
    private List<SemanticKeyUsage> keys;           // One entry per value the plugin uses
    private List<SemanticObject> objects;          // Optional: the objects its values make up
}

public class SemanticVocabulary {
    private String prefix;     // First key segment, without the dot, e.g. "rda"
    private String name;       // e.g. "RDA maDMP"; the first vocabulary's name labels the plugin in the editors
    private boolean standard;  // True for a published metadata standard, as opposed to a repository's or an organisation's own keys
}
```

`SemanticKeyUsage` describes one value:

| Field | Meaning |
|---|---|
| `keys` | The keys that supply the value; an input carrying any of them covers it (e.g. `rda.dataset.dataset_id` and `rda.dataset.dataset_id.identifier`). |
| `prefix` | When true, any key starting with one of `keys` and a dot also covers the value. |
| `level` | [SemanticKeyLevel](#key-enums): `Needs` or `CanUse`. |
| `entityTypes` | Where the answers are read: `Plan` (blueprints), `Description` (asset templates), or both. A key may have one usage per entity type, for example `Needs` for blueprints and `CanUse` for templates. For a value read from both, the blueprint editor counts the value as covered when an asset template attached to the blueprint fills it. |
| `label`, `purpose` | A readable name ("Dataset › Identifier") and one line on what the plugin does with the value. |
| `target` | Optional: where the value lands in the output, e.g. `dmp.dataset[].dataset_id.identifier`. |
| `format`, `values` | Optional: the [SemanticValueFormat](#key-enums) the value must take, and for `Choice` the accepted values. Editors warn when an input cannot give it. A date input on a `DateTime` value is only a notice, since a date is read as midnight (UTC). |
| `multiple` | True when the plugin keeps several values (a list). |
| `fallback` | Optional: what the plugin writes when the key is not answered. Editors show it next to a missing value. |
| `object` | Optional: the key of the `SemanticObject` the value belongs to. Editors count the value only when the structure uses the object, or always when the object is `alwaysPresent`. |
| `fromReferenceFields` | True when a reference type's own fields can supply the value, so a picked reference covers it. |
| `imported` | True when the plugin's import writes the value back. |

`SemanticObject` describes an object that several values make up, such as a distribution and its host:

| Field | Meaning |
|---|---|
| `key`, `label` | The object's key (its values' keys start with it and a dot) and a readable name. |
| `parent` | The key of the object it sits in, or `null`. |
| `multiple` | True when the output holds a list of them (one per answer). |
| `fromReference` | True when a reference input carrying the key fills the whole object from the reference's fields. |
| `alwaysPresent` | True when every output has the object, mapped or not (RDA: the contact, its identifier, the plan and dataset identifiers). |
| `entityTypes`, `target` | As for `SemanticKeyUsage`. |

Use `Needs` for values without which the plugin cannot do its job or its output fails its standard, and `CanUse` for everything else. A `Needs` value inside an object is only expected where the structure uses that object, so a value that a standard requires inside an optional object can be `Needs` without flagging every structure. Give a value a `fallback` when the plugin writes something real in its place; editors show such gaps in amber, not red.

---

## UserModel

`UserModel` represents a platform user, used as `PlanModel.creator` and inside `PlanUserModel`.

```java
public class UserModel {
    private UUID id;
    private String name;
    private UserAdditionalInfoModel additionalInfo;  // Plugin configuration values — see above
    private List<UserContactInfoModel> contacts;
}
```

```java
public class UserContactInfoModel {
    private UUID id;
    private Integer ordinal;
    private ContactInfoType type;  // Enum — see Key Enums
    private String value;
    private Instant createdAt;
}
```

:::note
`UserModel` has no `email` field. Email addresses (and any other contact info) are held in the `contacts` list, typed by `ContactInfoType`.
:::

---

## Key enums

| Enum | Values |
|------|--------|
| `PlanAccessType` | `Public`, `Restricted` |
| `PlanStatus` | `Draft` (0), `Finalized` (1) |
| `PlanBlueprintStatus` | `Draft` (0), `Finalized` (1) |
| `DescriptionStatus` | `Draft` (0), `Finalized` (1), `Canceled` (2) |
| `PlanUserRole` | `Owner` (0), `Viewer` (1), `DescriptionContributor` (2), `Reviewer` (3), `DataSteward` (4), `DataPrivacyOfficer` (5), `EthicsReviewer` (6) |
| `PluginType` | `FileTransformer` (0), `Deposit` (1), `Evaluation` (2) |
| `PluginEntityType` | `Plan` (0), `Description` (1) |
| `DataType` | `String` (0), `File` (1), `Boolean` (2), `Select` (3), `Color` (4), `Number` (5) |
| `ReferenceSourceType` | `Internal`, `External` |
| `ReferenceTypeFieldDataType` | `Text` (0), `Date` (1) |
| `PlanBlueprintExtraFieldDataType` | `Text` (0), `RichTex` (1), `Date` (2), `Number` (3) |
| `PlanBlueprintFieldCategory` | `System` (0), `Extra` (1), `ReferenceType` (2), `Upload` (3) |
| `SystemFieldType` | `PlanTitle` (0), `PlanDescription` (1), `PlanLanguage` (2), `PlanContact` (3), `PlanAccessRights` (4), `PlanUser` (5), `DescriptionTitle` (100), `DescriptionDescription` (101), `DescriptionTag` (102) |
| `FieldValidationType` | `None` (0), `Required` (1), `Url` (2), `Email` (3) |
| `ContactInfoType` | `Email` (0) |
| `SemanticKeyLevel` | `Needs` (0), `CanUse` (1) |
| `SemanticValueFormat` | `Text` (0), `Date` (1), `DateTime` (2), `Uri` (3), `Email` (4), `Integer` (5), `Number` (6), `Boolean` (7), `Choice` (8), `LanguageTwoLetter` (9), `LanguageThreeLetter` (10), `CountryCode` (11), `CurrencyCode` (12), `MimeType` (13), `Reference` (14) |
| `FieldType` | String-valued discriminator for `BaseFieldDataModel`; see [BaseFieldDataModel and its subclasses](#basefielddatamodel-and-its-subclasses) for the full list of values and their mapped classes |

:::tip
Every enum is serialized and deserialized as its numeric `value` (or, for `FieldType`, its string code), not its Java identifier name. Expect integers or short strings on the wire, not enum names like `"Owner"`.
:::

---

## Key features

- **Consistency**: Ensures consistent data structures across services.
- **Reusability**: Common models are reusable across different microservices in the platform.
- **Interoperability**: Simplifies communication between different components of OpenCDMP.
- **Standardization**: Provides a standard approach for handling core concepts like plans, assets, file operations, and repository deposits.

## License

This repository is licensed under the [EUPL 1.2 License](https://github.com/OpenCDMP/common-models/blob/main/LICENSE).

## Contact

For questions or support regarding this repository, please contact:

- **Email**: opencdmp at cite.gr

:::note
The source code is in the [common-models repository](https://github.com/OpenCDMP/common-models).
:::
