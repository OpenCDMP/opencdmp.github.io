---
sidebar_position: 2.1
title: Deposit preview and metadata review
description: The optional preview contract of deposit services - the preview descriptor, field types and widgets, stored overrides, and vocabulary search
---

# Deposit preview and metadata review

A deposit service can let the user **review and edit** the metadata before it is sent to the repository. If your service declares `supportsPreview` in `DepositConfiguration`, OpenCDMP first calls `POST /api/deposit/preview` and, if the returned descriptor has any groups, shows the user a review dialog built from it. On confirm, the user's edits travel back on the subsequent `deposit()` call as `editedFields`/`editedGroups` on `PlanDepositModel`.

:::note
Preview is optional. If `supportsPreview` is `false` (the default), or a plugin does not override `preview()`, OpenCDMP calls `deposit()` directly with no review step.
:::

## How it works, end to end

1. The user opens the **Publish to** dialog and chooses the account. When they continue, and the repository declares `supportsPreview`, OpenCDMP calls `preview()` before depositing.
2. Your `preview()` implementation builds a `DepositPreviewModel`: the same mapping logic `deposit()` uses, described as groups of typed, labeled fields with their current (mapped) values prefilled. The `PlanModel` you receive on preview carries a **file manifest** instead of the files themselves; see [File manifest on preview](#file-manifest-on-preview).
3. If the user previously edited and deposited this same plan line, OpenCDMP passes back `storedFields`/`storedGroups` on the `PlanDepositModel` you receive. Call `DepositPreviewMergeHelper.merge(...)` (from `repository-deposit-base`) on your freshly built descriptor to re-apply those stored overrides using the shared three-way merge rules; see [DepositPreviewMergeHelper](#depositpreviewmergehelper).
4. The frontend renders the descriptor: each group as a titled section, each field per its `type` and `widgetHint`; see [Widgets](#widgets). `Select` fields with `vocabSearch` set are looked up through the platform (`GET /api/deposit/repositories/{repositoryId}/vocab/{fieldCode}?like=…`), which proxies to your `GET /api/deposit/vocab/{fieldCode}` as the user types. Fields where `source` is `System` are rendered read-only.
5. The user edits values and clicks **Publish**. The edits are sent back as `editedFields` (flat fields) and `editedGroups` (repeatable groups, whole-list replacement) on the `PlanDepositModel` passed to `deposit()`.
6. Your `deposit()` implementation builds the metadata as usual, then applies `editedFields`/`editedGroups` on top before submitting to the repository. The Zenodo plugin, for example, calls `ZenodoPreviewMapper.applyOverrides(...)` right after it builds the deposit.

:::tip
Keep the mapping logic that produces field values in `preview()` and the logic that applies overrides in `deposit()` in one place (e.g. one mapper class). The preview form and the deposited metadata must always agree on what each field code means and how it is read back. This is how the Zenodo plugin's `ZenodoPreviewMapper` is structured: `toPreview(...)` builds the descriptor, `applyOverrides(...)` reads it back.
:::

## File manifest on preview

A preview must be fast, so the platform does not generate the plan PDF, the RDA JSON, or the supporting-files archive before calling `preview()`. Instead it passes **name-only envelopes**: `PlanModel.pdfFile` and `PlanModel.rdaJsonFile` are `FileEnvelopeModel` instances with only `filename` set (`<plan label>.pdf`, `<plan label>.json`), and `supportingFilesZip` is set the same way (`<plan label>.zip`) **only when the plan has at least one uploaded attachment**; otherwise it is `null`. A file that is not deposited (see [DepositFileKind](/docs/developers/plugins/deposit.md#depositfilekind)) is `null` too. `file`, `fileRef`, and `mimeType` are empty on preview and `raidJsonFile` is not provided.

Use the manifest to show the user what will be uploaded, for example as a `ReadOnly` field or group listing the file names. Never read the bytes in `preview()`. On the subsequent `deposit()` call the same properties carry the full files.

```java
List<String> uploads = Stream.of(plan.getPdfFile(), plan.getRdaJsonFile(), plan.getSupportingFilesZip())
    .filter(Objects::nonNull)
    .map(FileEnvelopeModel::getFilename)
    .toList();
// -> ["My plan.pdf", "My plan.json", "My plan.zip"]
```

## DepositPreviewModel

The root of the preview descriptor returned by `preview()`.

```java
public class DepositPreviewModel {
    private List<PreviewFieldGroup> groups;
}
```

## PreviewFieldGroup

A titled group of fields, mirroring one section of the target repository's deposit form (e.g. "Basic information", "License and access"). A **repeatable** group describes an array of like-shaped entries (e.g. creators, funding) instead of a flat set of fields.

```java
public class PreviewFieldGroup {
    private String code;                        // Unique across the whole descriptor
    private String label;
    private boolean repeatable;
    private boolean required;                   // Repeatable groups: at least one row is needed before publishing

    // Non-repeatable groups: the group's fields
    private List<PreviewField> fields;
    private List<PreviewFieldGroup> groups;      // Optional nested sub-groups

    // Repeatable groups: fields act as the per-item template; items are the
    // current entries (keyed by field code, see PreviewGroupItemModel)
    private List<PreviewGroupItemModel> items;
    private List<PreviewGroupItemModel> baseItems;   // Items before any stored override — persist as the merge baseline
    private boolean storedItemsApplied;              // True when items came from a stored override, not the mapping

    // Optional hint for a purpose-built renderer (e.g. "person", "funding");
    // unrecognized hints fall back to a generic repeatable row editor
    private String widgetHint;
}
```

:::note
The OpenCDMP frontend renders every repeatable group with the same generic add/remove-row editor and ignores a group-level `widgetHint`. Field-level hints are honored; see [Widgets](#widgets).
:::

## PreviewField

A single field in the preview form.

```java
public class PreviewField {
    private String code;             // Identifies the field when edited values are submitted back
    private String label;
    private String description;
    private PreviewFieldType type;   // See enum below
    private PreviewFieldSource source;  // See enum below
    private boolean required;
    private boolean multipleSelect;
    private List<PreviewFieldOption> options;  // Static options for Select fields

    private PreviewFieldValue value;         // Current (prefilled) value
    private PreviewFieldValue baseValue;     // Value before any stored override — persist as the merge baseline
    private PreviewFieldValue previousValue; // A stored override that could NOT be reapplied (mapping changed) — shown as a hint
    private boolean storedValueApplied;      // True when value came from a stored override, not the mapping

    private boolean vocabSearch;     // If true, options are looked up via searchVocabulary() instead of the static list
    private String widgetHint;       // e.g. "richtext" — see Widgets below
}
```

`required` is enforced client-side with a standard required validator on flat fields. For a repeatable group, set `required` on the `PreviewFieldGroup` itself: the review then blocks **Publish** while the group has no rows. `required` is **not enforced on fields inside a repeatable group's rows**; if your repository has a hard requirement there, validate it yourself before submitting, since the repository's own validation error will otherwise surface directly to the user.

### Widgets

The frontend picks the control for each editable field from `type`, `multipleSelect`, `vocabSearch`, and `widgetHint`:

| Descriptor | Widget in the review dialog | Value slot |
|---|---|---|
| `Text` | Single-line text input | `textValue` |
| `TextArea` | Multi-line text area | `textValue` |
| `TextArea` with `widgetHint = "richtext"` | Rich text editor (the same editor as rich text fields in templates, with a **Format** / **Plain Text** toggle); the value is HTML | `textValue` |
| `Date` | Date picker | `dateValue` |
| `Boolean` | Checkbox | `booleanValue` |
| `Number` | Numeric input | `numberValue` |
| `Select` with static `options` | Dropdown | `textValue` |
| `Select` with `vocabSearch` | Autocomplete that queries `searchVocabulary()` (300 ms debounce) | `textValue` |
| `Select` with `multipleSelect` | Chip list; typing offers the static `options`, or `searchVocabulary()` results when `vocabSearch` is set | `textListValue` |
| `Tags` | Chip list of free-text values | `textListValue` |
| `Tags` with `vocabSearch` | Chip list with suggestions from `searchVocabulary()`; free-text values are still accepted | `textListValue` |
| `ReadOnly`, or any field with `source = System` | Static text | — |

Inside the rows of a **repeatable** group the same rules apply with a reduced set: `Select` renders a dropdown from `options`, `TextArea` a text area, any field with `vocabSearch` an autocomplete, and everything else a text input. Any `widgetHint` value the frontend does not recognize falls back to the plain control for the `type`.

## PreviewFieldValue

Carries one field's value, both inside a preview descriptor and when edits are submitted back. Exactly one typed slot is expected to be set, matching the field's `type`.

```java
public class PreviewFieldValue {
    private String code;
    private String textValue;             // Text, TextArea, single Select, ReadOnly
    private List<String> textListValue;    // Tags, Select with multipleSelect
    private Boolean booleanValue;          // Boolean
    private Double numberValue;            // Number
    private Instant dateValue;             // Date
}
```

## PreviewFieldOption

A selectable option for a `Select`-typed field.

```java
public class PreviewFieldOption {
    private String label;
    private String value;
}
```

## PreviewGroupItemModel and PreviewGroupValuesModel

One entry of a repeatable group's items (`PreviewGroupItemModel`) holds that row's values keyed by the group's field codes:

```java
public class PreviewGroupItemModel {
    private List<PreviewFieldValue> values;
}
```

`PreviewGroupValuesModel` is how a repeatable group's edited or stored entries travel on `PlanDepositModel` (`editedGroups`/`storedGroups`). Replacement is **whole-list**: submitting a group replaces its entire deposited array.

```java
public class PreviewGroupValuesModel {
    private String groupCode;
    private List<PreviewGroupItemModel> items;
    private List<PreviewGroupItemModel> baseItems;  // Snapshot of what the mapping produced when the user edited — enables later merge
}
```

## StoredPreviewFieldModel

A persisted flat-field override, sent back to you on the next `preview()` call (via `PlanDepositModel.storedFields`) so you can re-merge it.

```java
public class StoredPreviewFieldModel {
    private PreviewFieldValue value;  // The value the user confirmed
    private PreviewFieldValue base;   // The mapped value it replaced at the time of editing
}
```

## DepositPreviewMergeHelper

A static helper in `repository-deposit-base` (`org.opencdmp.depositbase.repository.DepositPreviewMergeHelper`) that all deposit plugins should call at the end of `preview()`, after building the fresh descriptor:

```java
DepositPreviewMergeHelper.merge(preview, planDepositModel.getStoredFields(), planDepositModel.getStoredGroups());
```

It applies stored overrides with the same three-way merge semantics everywhere, so behavior is consistent across plugins:

- **Manual fields** (no plan source): the stored value always prefills.
- **Mapped fields, mapping output unchanged** since the edit: the stored value is reapplied and the field is flagged `storedValueApplied` so the client resubmits it even if the user does not touch it again.
- **Mapped fields, mapping output changed**: the fresh mapped value wins; the stored value is surfaced as `previousValue` for a client-side hint instead.
- **Repeatable groups**: the stored items replace the mapped items only when the mapping still produces the stored `baseItems` snapshot; otherwise the freshly mapped items are kept.
- **System-sourced fields are never overridden** by a stored value.

## PreviewFieldType

```java
public enum PreviewFieldType {
    Text, TextArea, Date, Select, Tags, Boolean, Number, ReadOnly
}
```

`ReadOnly` fields (and any field with `source` = `System`) are rendered as static text, not an editable control.

## PreviewFieldSource

```java
public enum PreviewFieldSource {
    Mapped,   // Prefilled by your plugin's mapping; may be edited
    Manual,   // Supported by the repository but not derivable from the plan; rendered empty for the user to fill in
    System    // Fixed by configuration or versioning logic; always rendered read-only
}
```

:::note
`source` decides editability (`System` → read-only). The review summarizes each group with a tag: **Added automatically** when none of its fields is editable, **Changed by you** when the user edited it (or a stored override was reapplied), **Required** when a required value is missing, and **From your plan** otherwise. Groups that are optional and empty are collected under **More details [repository] accepts**.
:::

## searchVocabulary

Implement this only if your preview descriptor sets `vocabSearch` on one or more `Select` or `Tags` fields (e.g. a license or language picker backed by a large controlled vocabulary that should not be sent as a static options list). The frontend debounces user input (300 ms) and calls the platform endpoint `GET /api/deposit/repositories/{repositoryId}/vocab/{fieldCode}?like=...`, which forwards to your service's `GET /api/deposit/vocab/{fieldCode}?like=...` as the user types:

```java
@Override
public List<PreviewFieldOption> searchVocabulary(String fieldCode, String like) {
    // fieldCode identifies which field's vocabulary to search (your own PreviewField.code values)
    // like is the user's current search text, or null/blank for the top entries
    return List.of(new PreviewFieldOption("Creative Commons Attribution 4.0", "cc-by-4.0"));
}
```

## Example: implementing preview()

```java
@Override
public DepositPreviewModel preview(PlanDepositModel planDepositModel) {
    if (planDepositModel == null || planDepositModel.getPlanModel() == null) return null;

    // Build the same intermediate representation deposit() would build
    MyRepositoryRecord record = this.buildRecord(planDepositModel.getPlanModel());

    DepositPreviewModel preview = new DepositPreviewModel();
    List<PreviewFieldGroup> groups = new ArrayList<>();

    PreviewFieldGroup basicInfo = new PreviewFieldGroup();
    basicInfo.setCode("basic-information");
    basicInfo.setLabel("Basic information");
    PreviewField title = new PreviewField();
    title.setCode("title");
    title.setLabel("Title");
    title.setType(PreviewFieldType.Text);
    title.setSource(PreviewFieldSource.Mapped);
    title.setRequired(true);
    PreviewFieldValue titleValue = new PreviewFieldValue();
    titleValue.setCode("title");
    titleValue.setTextValue(record.getTitle());
    title.setValue(titleValue);
    title.setBaseValue(titleValue);
    basicInfo.setFields(List.of(title));
    groups.add(basicInfo);

    preview.setGroups(groups);

    // Re-apply any overrides the user confirmed on a previous preview/deposit of this plan line
    DepositPreviewMergeHelper.merge(preview, planDepositModel.getStoredFields(), planDepositModel.getStoredGroups());
    return preview;
}

@Override
public String deposit(PlanDepositModel planDepositModel) {
    MyRepositoryRecord record = this.buildRecord(planDepositModel.getPlanModel());
    this.applyOverrides(record, planDepositModel.getEditedFields(), planDepositModel.getEditedGroups());
    // ... create draft, upload files, publish, return DOI
    return this.publish(record);
}

private void applyOverrides(MyRepositoryRecord record, List<PreviewFieldValue> editedFields, List<PreviewGroupValuesModel> editedGroups) {
    if (editedFields == null) return;
    for (PreviewFieldValue value : editedFields) {
        if ("title".equals(value.getCode()) && value.getTextValue() != null) {
            record.setTitle(value.getTextValue());
        }
        // ... one branch per field code your preview() descriptor declares
    }
    // editedGroups: one branch per repeatable group code, replacing that array wholesale
}
```

Set `supportsPreview` to `true` in `getConfiguration()` once `preview()` is implemented; otherwise OpenCDMP never calls it.

---

## See also

- [Deposit](/docs/developers/plugins/deposit.md) - The rest of the deposit plugin contract
- [Common Models](/docs/developers/plugins/common-models.md) - `PlanModel` and the other shared models
- [Deposit services configuration](/docs/deployment/configuration/backend/deposit.md) - The `*_SUPPORTS_PREVIEW` switches of the shipped services
- [Run and test a plugin locally](/docs/developers/plugins/run-locally.md) - Call `POST /api/deposit/preview` against your service
