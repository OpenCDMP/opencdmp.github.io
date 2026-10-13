---
sidebar_position: 1.2
sidebar_label: DOCX Template Reference
description: Tags, data and styles available to DOCX templates of the DOCX file transformer
---

# DOCX Transformer — Template reference

A DOCX template is an ordinary Word file with **`{{…}}` tags** in it. The page design (fonts, colors, cover, headers and footers) is yours; the tags mark where the plan's content goes. Templates can show or hide blocks and repeat them for lists, but they cannot run code. For how to obtain, edit and upload a template, see [Managing templates](docx-templates.md).

## Tags

| Tag | Meaning |
|---|---|
| `{{plan.title}}` | **Text.** Replaced by the value, keeping the tag's formatting. |
| `{{?chapters}} … {{/chapters}}` | **Block.** Repeated once per item of a list, shown once for a value that is set or `true`, removed for an empty value or `false`. Inside the block, names refer to the current item: `{{title}}`. |
| `{{>plan.description}}` | **Content.** Inserts formatted content: rich text, questions and answers, reference lists, tables. Put it alone in its paragraph; that paragraph's style is used for rich text. |
| `{{@branding.logo}}` | **Picture.** The configured cover logo. |

`plan`, `layout`, `labels`, `export`, `branding`, `toc` and `pageBreak` can be used anywhere, including inside blocks. Tags work in the body, in tables, and in headers and footers.

## The built-in plan template

This is the skeleton of the built-in plan template, the best starting point for your own. Paragraph styles are shown on the right.

```
{{?layout.cover}}
{{@branding.logo}}
{{plan.kind}}                                          ← OpenCDMP Kicker (shown in capitals)
{{?plan.shortTitle}}{{plan.title}}{{/plan.shortTitle}} ← Title
{{?plan.longTitle}}{{plan.title}}{{/plan.longTitle}}   ← OpenCDMP Title Long
{{labels.version}} {{plan.version}} · {{plan.status}} · {{labels.updated}} {{plan.updatedAt}}
{{>plan.description}}
{{>plan.facts}}
{{export.note}}
{{>pageBreak}}
{{/layout.cover}}
{{?layout.toc}}
{{labels.contents}}
{{>toc}}
{{>pageBreak}}
{{/layout.toc}}
{{?chapters}}
{{?group}}
{{?newPage}}{{>pageBreak}}{{/newPage}}
{{numberPrefix}}{{title}}                              ← Heading 1
{{/group}}
{{?section}}
{{?newPage}}{{>pageBreak}}{{/newPage}}
{{numberPrefix}}{{title}}                              ← Heading 1
{{>description}}                                       ← OpenCDMP Guidance
{{>body}}
{{/section}}
{{?asset}}
{{?newPage}}{{>pageBreak}}{{/newPage}}
{{numberPrefix}}{{title}}                              ← OpenCDMP Asset Title
{{meta}}                                               ← OpenCDMP Asset Meta
{{>description}}                                       ← OpenCDMP Asset Lead
{{>body}}
{{/asset}}
{{/chapters}}
```

| Part | What it does |
|---|---|
| `{{?layout.cover}} … {{/layout.cover}}` | The cover, shown when the **Cover page** setting is on. The logo paragraph is removed when no **Cover logo** is set. `plan.kind` is the blueprint type, or the *planKind* text of **Wording**. Exactly one of the two title blocks is shown, depending on the title's length. The subtitle uses built-in texts (`labels.*`) and dates in the **Date format** setting. `{{>plan.facts}}` is the key facts table, with the rows of **Plan cover facts**; `{{export.note}}` is "Generated with OpenCDMP · Exported *date*". |
| `{{?layout.toc}} … {{/layout.toc}}` | The table of contents, shown when the **Table of contents** setting is on. `{{>toc}}` is a Word table-of-contents field, already filled in with the sections and assets, that lists headings down to the **Table of contents depth** setting. The PDF conversion adds page numbers; in Word, press F9 to update it. |
| `{{?chapters}} … {{/chapters}}` | The document body. Each chapter is exactly one of `group`, `section` or `asset`, so one of the three inner blocks is shown per chapter. The order follows the **Where assets appear** setting, so one template supports every placement. |
| `{{?newPage}}{{>pageBreak}}{{/newPage}}` | A page break, following the **Start each section / asset on a new page** settings. It is never set on the first chapter or on the chapter right after the Assets heading, so it never produces an empty page. |
| `{{numberPrefix}}{{title}}` | The heading: its number and a space (empty when **Section numbering** is off), then the title. `heading` holds both in one value. |
| `{{>body}}` | A section's or asset's content: sub-sections, question groups, questions and answers, tables, references and comments, laid out by the questions, references and table settings. |

## Plan data

| Name | Contents |
|---|---|
| `plan.title`, `plan.kind`, `plan.version`, `plan.status`, `plan.blueprint`, `plan.language`, `plan.access`, `plan.doi`, `plan.creator` | Plan metadata as text. `kind` is the blueprint type, for example "Data Management Plan". |
| `plan.createdAt`, `plan.updatedAt`, `plan.finalizedAt` | Dates in the configured date format. |
| `plan.finalized` | `true` for a finalized plan, for example `{{?plan.finalized}}Approved version{{/plan.finalized}}`. |
| `plan.longTitle`, `plan.shortTitle` | Whether the title is longer than about 38 characters, to set long titles smaller on a cover. `asset` has the same pair. |
| `{{>plan.description}}` | The plan description (rich text). |
| `{{>plan.facts}}` | The key facts table, with the rows of **Plan cover facts**. |
| `plan.contacts`, `plan.users` | Lists with `name`, `email` and `role`, for example `{{?plan.contacts}}{{name}} ({{email}}){{/plan.contacts}}`. |
| `plan.refs.<type code>` | The plan's references of a [reference type](/docs/administering/system-configuration/reference-types.md), as a list (`{{?plan.refs.grants}}{{label}}{{/plan.refs.grants}}`) or as a block (`{{>plan.refs.grants}}`). |
| `plan.sem.<semantic>` | The answer to the question carrying a [semantic](/docs/administering/content-management/templates/semantics.md), with dots replaced by underscores: `{{plan.sem.rda_dmp_ethical_issues_description}}`. |
| `plan.questions` | Every exported blueprint question, with `label`, `answer`, `section` and `semantics`. |
| `chapters` | The document body, see above. |
| `assets` | Every exported asset in document order, for example for an overview table. |

### Chapters

| Chapter | Fields |
|---|---|
| `section` | A blueprint section: `number`, `numberPrefix`, `title`, `heading`, `{{>description}}` (its guidance, when **Question guidance** is on), `newPage`, `{{>body}}`, `assets`, `questions`. |
| `asset` | An asset: `number`, `numberPrefix`, `title`, `heading`, `meta` (type · template · status; the type is left out when the template name contains it), `type`, `template`, `status`, `finalized`, `section`, `tags`, `createdAt`, `newPage`, `{{>description}}`, `{{>body}}`, `{{>facts}}` (its key facts, with the rows of **Asset cover facts**), `refs`, `sem`, `questions`. |
| `group` | The Assets heading of grouped placements: `number`, `numberPrefix`, `title`, `heading`, `newPage`. |

Assets continue the numbering of where they appear. After their section, they follow the section's own question groups (section 3 with groups 3.1 to 3.4, then asset 3.5, whose sections are 3.5.1, 3.5.2). When assets are grouped, the Assets chapter is numbered like a section: 1 before the sections, the next free number after them. In an export of a single asset, its sections start at 1.

## Asset exports

Asset exports provide `asset` (the fields listed above, with sections starting at Heading 1) and `plan` (the asset's plan). The body is `{{>asset.body}}`, and the cover uses `{{>asset.facts}}` and `{{?asset.longTitle}}`.

## Everywhere

| Name | Contents |
|---|---|
| `layout.cover`, `layout.toc`, `layout.numbering`, `layout.assetPageBreak`, `layout.assetsInSections`, `layout.assetsBeforeSections`, `layout.assetsAfterSections` | The layout settings as `true` or `false`, for blocks such as `{{?layout.toc}}…{{/layout.toc}}`. |
| `layout.questionStyle`, `layout.referenceStyle`, `layout.tableStyle` | The **Question layout** (`stacked`, `table` or `compact`), **Reference layout** (`detailed`, `compact` or `table`) and **Table style** (`lined`, `grid` or `striped`) settings as text. |
| `labels.<key>` | The built-in texts in the plan's language, or your **Wording**: `version`, `updated`, `contents`, `page`, `of`, `partOf`, `assets`, `notAnswered` and others. |
| `export.date`, `export.generator`, `export.note` | The export date, "Generated with OpenCDMP" (absent when hidden in **Wording**), and both as one line. |
| `{{>toc}}` | The table of contents, down to the **Table of contents depth** setting. |
| `{{>pageBreak}}` | A page break. |
| `{{@branding.logo}}`, `branding.accentColor` | The cover logo, when one is configured, and the configured **Accent colour** as a hex code (empty when none is set). |

## Styles

Generated content uses named styles only, so you restyle it by editing these styles in Word (**Home** → **Styles** → **Modify**). A style your template does not define is copied in from the built-in template.

| Style | Used for |
|---|---|
| Heading 1–6 | Section headings. A plan section is Heading 1 and its sub-sections Heading 2 and lower; an asset's sections start at Heading 3 in a plan and at Heading 1 in an asset export. |
| Title, OpenCDMP Title Long | The cover title; the second is used for long titles. |
| OpenCDMP Kicker | The line above the cover title. |
| OpenCDMP Field Set Title | The title of a group of questions. |
| OpenCDMP Asset Title, OpenCDMP Asset Meta, OpenCDMP Asset Lead | An asset's heading band and its description. The title and meta line share their borders and fill, so Word draws them as one box. |
| OpenCDMP Guidance | Section and question help texts. |
| OpenCDMP Question, OpenCDMP Answer | A question's label and its answer. |
| OpenCDMP Entry | "Entry 2" above repeated question groups. |
| OpenCDMP Reference Details | The details line under a reference ("ORCID … · Affiliation …"). |
| OpenCDMP Placeholder, OpenCDMP Comment | "Not answered", and comments. |
| OpenCDMP Table Header, OpenCDMP Table Text | Table cells. |
| OpenCDMP Fact Label, OpenCDMP Fact Value | The key facts table. |
| Caption, TOC 1, TOC 2 | Figure captions and the table of contents. |
| Hyperlink, OpenCDMP Strong Char, OpenCDMP Number Char, OpenCDMP Meta Char | Links, reference names, heading numbers, muted text. |
| OpenCDMP Table Lined, Grid, Striped; OpenCDMP Table Facts | Table styles. The **Table style** setting picks one of the first three. |

The built-in templates use the accent color `#2457C5`. When an **Accent colour** is configured, every use of it (and of its light tint in table headers, and the cover stripe) is replaced. Use the same color in your own template where it should follow the configured accent.

## Examples

**A line shown only on finalized plans:**

```
{{?plan.finalized}}Final version, finalized on {{plan.finalizedAt}}.{{/plan.finalized}}
```

**The plan's grants, one per paragraph** (the block repeats once per grant):

```
{{?plan.refs.grants}}
{{label}}
{{/plan.refs.grants}}
```

**A list of every asset** with its number and type, for example after the table of contents:

```
{{?assets}}
{{number}}  {{title}} ({{type}})
{{/assets}}
```

:::note
Blocks have no *else*. To show one of two alternatives, use two blocks on values that exclude each other, as the built-in template does with `plan.shortTitle` and `plan.longTitle`.
:::

## See also

- [Managing templates](docx-templates.md)
- [Export settings](docx-export-settings.md)
