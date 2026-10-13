---
sidebar_position: 3
sidebar_label: CKAN
description: Reference of every semantic consumed by the CKAN deposit plugin and the CKAN API field it populates
---

# CKAN Deposit — Semantics Reference

The [CKAN deposit plugin](https://hub.docker.com/r/opencdmp/repository-deposit-ckan) submits plans as CKAN datasets and can also create CKAN dataset relationships. During deposit it reads values from the plan blueprint and assets, locating each field by its [semantic](/docs/administering/content-management/templates/semantics.md) tag. To populate a CKAN field, assign the semantic listed below to a blueprint or asset-template field.

## How the plugin resolves fields

Each semantic below is read from both **plan blueprint** fields and **asset template** fields, in every asset of the plan. Single-valued semantics use the first value found, and blueprint values come before asset values. Multi-valued semantics (tags, groups, extras, relationships) collect the values of all matching fields and drop duplicates.

The plugin reads a field's value as follows:

- Text, number, and checkbox fields give their value as entered (`true` or `false` for checkboxes).
- Date fields give the date as `yyyy-MM-dd`.
- Select and radio fields give the label of each chosen option.
- Tag fields give each tag.
- Reference fields give the code of each selected reference.
- Identifier fields give the identifier.

Users review the dataset's metadata before it is published and can edit it, apart from the values the organisation locks.

## Values that are always set (not semantic-driven)

| CKAN field | Source |
|---|---|
| `name` | The plan's id, which becomes the dataset's address in CKAN. |
| `title` | Plan label. |
| `private` | Set by the organisation's **Visibility** setting. By default it follows the plan: `true` for restricted plans, `false` for public plans. The setting can also make every dataset private or public. |
| `notes` | Plan description. |
| `version` | Plan version. A new version of a published plan gets the previous dataset's version plus one. |
| `type` | The organisation's **Dataset type** setting. Empty: CKAN's default type. |
| `author` | Plan creator's name. |
| `author_email` | Plan creator's email. |
| `maintainer` | Assembled from the plan's contacts. A single contact becomes `"First Last"`; multiple contacts are joined as `"First Last (email)"` entries. When the plan has no contacts, the organisation's **Maintainer** setting is used. |
| `maintainer_email` | Set when the plan has exactly one contact. When the plan has no contacts, the organisation's **Maintainer email** setting is used. |

CKAN takes no authors from plan members: the **Authors from plan members** setting does not apply to CKAN.

## Dataset fields

| CKAN field | Semantic | Notes |
|---|---|---|
| `url` | `ckan.dataset.source` | Single-valued. For public plans without a value, falls back to the address of the plan's public page in OpenCDMP, unless the organisation turns off **Link the public plan page**. |
| `owner_org` | `ckan.dataset.organization` | Single-valued. The value must be the name of an existing CKAN organization; other values are ignored. Without a value, the plugin uses the first organisation reference of the plan whose code is the name of a CKAN organization. If neither gives an organization, the organisation's **Organisation** setting is used, else the installation's organization. A value that matches no CKAN organization goes straight to these defaults, without checking the plan's references. |
| `license_id` | `ckan.dataset.license` | Single-valued. The value must be the id of a CKAN licence, such as `cc-by`; other values are ignored. Without a value, the plugin uses the first licence reference of the plan whose code is a CKAN licence id. If neither gives a licence, the organisation's **Licence** setting is used. A value that matches no CKAN licence goes straight to that setting, without checking the plan's references. |

The plan's organisation and licence references are those of the reference types set in the organisation's **Organisations** and **Licences** reference type settings, else the installation's (`organisations` and `licenses`).

## Tags

| CKAN field | Semantic | Notes |
|---|---|---|
| `tags[].name` | `ckan.dataset.tags` | Collected from blueprint fields, asset template fields, each asset's own tags, and the organisation's **Tags** setting. Values must contain only letters, numbers, spaces, dots, underscores, or hyphens; other values are left out. Duplicates are dropped. |

## Groups

| CKAN field | Semantic | Notes |
|---|---|---|
| `groups[].name` | `ckan.dataset.groups` | Collected from blueprint and asset template fields, then the organisation's **Groups** setting is added. Each value is the name of a CKAN group. The publishing account must be allowed to add datasets to the group. |

## Extras

| CKAN field | Semantic | Notes |
|---|---|---|
| `extras[].key` / `extras[].value` | `ckan.dataset.extras` | Collected from blueprint and asset template fields. Each matching field gives one extra entry: the key is the field's id, and the value is the field's value. A field answered in several places, for example in several assets made from the same template, gives one extra whose value joins its distinct answers with commas. |

## Custom fields

An installation whose CKAN uses a custom dataset schema can configure custom fields for the plugin. Each configured field has a code and a target field in the dataset.

| CKAN field | Semantic | Notes |
|---|---|---|
| The custom field's target | `ckan.custom_fields.<code>` | Collected from blueprint and asset template fields. A list field receives every value; any other field receives the first value. Values are converted to the field's configured data type. |
| The custom field's target, numbered: `<target>_1`, `<target>_2`, and so on | `ckan.custom_fields.creator_first_name`, `ckan.custom_fields.creator_last_name`, `ckan.custom_fields.creator_orcid_id` | For custom fields with the codes `creator_first_name`, `creator_last_name`, and `creator_orcid_id`. Asset template fields only, usually in a repeatable field set with one item per creator. Each item of the field set is written under its own number, starting at `_1`, so the first name, last name, and ORCID of one creator share the same number. |

## Relationships

The relationship semantics create [CKAN dataset relationships](https://docs.ckan.org/en/2.11/api/index.html#ckan.logic.action.create.package_relationship_create) after the dataset is created. The field value is the id or name of the related CKAN dataset, and the relationship type is the last part of the semantic. A relationship that CKAN rejects, for example because the related dataset does not exist, is skipped.

A new version of a published plan also gets a `derives_from` relationship to the dataset of the previous version.

### This dataset as subject

| Relationship type | Semantic |
|---|---|
| `depends_on` | `ckan.dataset.relationships_as_object.depends_on` |
| `dependency_of` | `ckan.dataset.relationships_as_object.dependency_of` |
| `derives_from` | `ckan.dataset.relationships_as_object.derives_from` |
| `has_derivation` | `ckan.dataset.relationships_as_object.has_derivation` |
| `links_to` | `ckan.dataset.relationships_as_object.links_to` |
| `linked_from` | `ckan.dataset.relationships_as_object.linked_from` |
| `child_of` | `ckan.dataset.relationships_as_object.child_of` |
| `parent_of` | `ckan.dataset.relationships_as_object.parent_of` |

### This dataset as object

| Relationship type | Semantic |
|---|---|
| `depends_on` | `ckan.dataset.relationships_as_subject.depends_on` |
| `dependency_of` | `ckan.dataset.relationships_as_subject.dependency_of` |
| `derives_from` | `ckan.dataset.relationships_as_subject.derives_from` |
| `has_derivation` | `ckan.dataset.relationships_as_subject.has_derivation` |
| `links_to` | `ckan.dataset.relationships_as_subject.links_to` |
| `linked_from` | `ckan.dataset.relationships_as_subject.linked_from` |
| `child_of` | `ckan.dataset.relationships_as_subject.child_of` |
| `parent_of` | `ckan.dataset.relationships_as_subject.parent_of` |

## Related

- [Semantics — admin guide](/docs/administering/content-management/templates/semantics.md)
- [Deposit Services](index.md)
- [Deposit Service Configuration](/docs/deployment/configuration/backend/deposit.md)
- [CKAN Action API](https://docs.ckan.org/en/latest/api/index.html)
