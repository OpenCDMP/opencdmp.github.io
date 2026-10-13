import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
**Semantics** are free-form string tags that you assign to fields in a blueprint or description template to declare what that field *means*. Any string value is valid — the platform does not restrict or validate semantic values. The reference list below contains suggested values for built-in integrations, but you are not limited to them.
:::

## How Semantics Work

A semantic is typically a dot-separated path string that identifies a concept in a specification or external system. For example:

- `rda.dmp.title` — the title of a Data Management Plan in the RDA maDMP standard
- `zenodo.publication_date` — the publication date field in Zenodo's metadata schema
- `raid.contributor.id` — a contributor identifier in the RAiD standard

You can also define your own semantics entirely — for example `my-system.project.lead` — for use by custom plugins or external integrations you control.

When you assign a semantic to a field, any plugin or external system that understands that semantic can act on it:

1. **Export**: When a plan is exported to a repository (e.g., Zenodo), the file transformer reads each field's semantic and maps the value to the correct position in the target format.
2. **Prefilling**: When a [Prefilling Source](/versioned_docs/version-1.x/administering/system-configuration/prefilling-sources.md) is configured with a matching semantic target, the system knows which description template field to populate with the fetched data.
3. **Evaluation**: Evaluator plugins can locate specific fields by their semantics rather than by field ID, making evaluators template-agnostic.
4. **Custom plugins**: Any custom file transformer, deposit service, or evaluator you build can read `FieldModel.semantics` to find the right field regardless of how the template is structured.

## Where to Assign Semantics

Semantics can be assigned in two places:

- **Blueprint fields** — for plan-level metadata (grant, organization, contact, etc.)
- **Description template fields** — for description-level content (dataset type, access rights, license, etc.)

When editing a field in either location, the **Semantics** input accepts any string and provides autocomplete suggestions from the list below.

## Custom Semantics

You are not limited to the suggested values. If you are building a custom plugin or integrating with an external system that is not covered by the built-in integrations, define your own semantic strings. The only requirement is that your plugin and your template configuration use the same string — the platform passes them through without interpretation.

For example, a custom evaluator that checks dataset access rights might look for fields tagged `my-org.dataset.access_rights`, as long as the template fields are tagged with that same value.

## Suggested Semantics for Built-in Integrations

Match your field to the standard used by your target repository or specification:

| Your target | Use semantic prefix |
|-------------|-------------------|
| RDA maDMP export / evaluation | `rda.` |
| RAiD registration | `raid.` |
| Zenodo deposit | `zenodo.` |
| Dataverse deposit | `dataverse.` |
| DSpace deposit | `dspace.` |
| CKAN deposit | `ckan.` |
| Fedora deposit | `fedora.` |
| HEAL-Link integration | `heal_link.` |
| FAIRsharing policies integration | `fair_sharing_policies.` |

A field can have **multiple semantics** — for example, a dataset title field might have both `rda.dataset.title` and `zenodo.additional_title.title` if the plan is exported to both systems.

## Semantic Reference

<Tabs>
  <TabItem value="rda" label="RDA" className="outer-tab">
    :::tip See the full mapping
    [RDA maDMP JSON — semantics reference](/versioned_docs/version-1.x/optional-services/file-transformers/rda-json-semantics.md) documents which RDA JSON output field each semantic populates.
    :::
    <Tabs>
      <TabItem value="plans" label="Plans">
        - `rda.dmp.contact.affiliation.name`
        - `rda.dmp.contact.affiliation.affiliation_id.type`
        - `rda.dmp.contact.affiliation.affiliation_id.identifier`
        - `rda.dmp.related_identifier.identifier`
        - `rda.dmp.related_identifier.metadata_scheme`
        - `rda.dmp.related_identifier.relation_type`
        - `rda.dmp.related_identifier.resource_type`
        - `rda.dmp.related_identifier.scheme_type`
        - `rda.dmp.related_identifier.scheme_uri`
        - `rda.dmp.related_identifier.type`
        - `rda.dmp.contributor.affiliation.name`
        - `rda.dmp.contributor.affiliation.affiliation_id.type`
        - `rda.dmp.contributor.affiliation.affiliation_id.identifier`
        - `rda.dmp.alternate_identifier.identifier`
        - `rda.dmp.alternate_identifier.type`
        - `rda.dmp.project.project_id.identifier`
        - `rda.dmp.project.project_id.type`
        - `rda.dmp.contact.contact_id.identifier`
        - `rda.dmp.contact.contact_id.type`
        - `rda.dmp.contact.mbox`
        - `rda.dmp.contact.name`
        - `rda.dmp.contributor`
        - `rda.dmp.contributor.contributor_id.identifier`
        - `rda.dmp.contributor.contributor_id.type`
        - `rda.dmp.contributor.mbox`
        - `rda.dmp.contributor.name`
        - `rda.dmp.contributor.role`
        - `rda.dmp.cost`
        - `rda.dmp.cost.currency_code`
        - `rda.dmp.cost.description`
        - `rda.dmp.cost.title`
        - `rda.dmp.cost.value`
        - `rda.dmp.created`
        - `rda.dmp.description`
        - `rda.dmp.dmp_id`
        - `rda.dmp.dmp_id.identifier`
        - `rda.dmp.dmp_id.type`
        - `rda.dmp.ethical_issues_description`
        - `rda.dmp.ethical_issues_exist`
        - `rda.dmp.ethical_issues_report`
        - `rda.dmp.language`
        - `rda.dmp.modified`
        - `rda.dmp.project`
        - `rda.dmp.project.description`
        - `rda.dmp.project.end`
        - `rda.dmp.project.funding.funder_id`
        - `rda.dmp.project.funding.funder_id.identifier`
        - `rda.dmp.project.funding.funder_id.type`
        - `rda.dmp.project.funding.funding_status`
        - `rda.dmp.project.funding.grant_id`
        - `rda.dmp.project.funding.grant_id.identifier`
        - `rda.dmp.project.funding.grant_id.type`
        - `rda.dmp.project.start`
        - `rda.dmp.project.title`
        - `rda.dmp.title`
      </TabItem>
      <TabItem value="descriptions" label="Descriptions">
        - `rda.dataset.creator.affiliation.name`
        - `rda.dataset.creator.affiliation.affiliation_id.type`
        - `rda.dataset.creator.affiliation.affiliation_id.identifier`
        - `rda.dataset.creator.mbox`
        - `rda.dataset.creator.name`
        - `rda.dataset.creator.creator_id.identifier`
        - `rda.dataset.creator.creator_id.type`
        - `rda.dataset.related_identifier.identifier`
        - `rda.dataset.related_identifier.metadata_scheme`
        - `rda.dataset.related_identifier.relation_type`
        - `rda.dataset.related_identifier.resource_type`
        - `rda.dataset.related_identifier.scheme_type`
        - `rda.dataset.related_identifier.scheme_uri`
        - `rda.dataset.related_identifier.type`
        - `rda.dataset.alternate_identifier.identifier`
        - `rda.dataset.alternate_identifier.type`
        - `rda.dataset.technical_resource.id.identifier`
        - `rda.dataset.technical_resource.id.type`
        - `rda.dataset.distribution.issued`
        - `rda.dataset.distribution.host.host_id.identifier`
        - `rda.dataset.distribution.host.host_id.type`
        - `rda.dataset.rights`
        - `rda.dataset.is_reused`
        - `rda.dataset.data_quality_assurance`
        - `rda.dataset.distribution.exists`
        - `rda.dataset.distribution.access_url`
        - `rda.dataset.distribution.available_until`
        - `rda.dataset.distribution.byte_size`
        - `rda.dataset.distribution.data_access`
        - `rda.dataset.distribution.description`
        - `rda.dataset.distribution.download_url`
        - `rda.dataset.distribution.format`
        - `rda.dataset.distribution.host.availability`
        - `rda.dataset.distribution.host.backup_frequency`
        - `rda.dataset.distribution.host.backup_type`
        - `rda.dataset.distribution.host.certified_with`
        - `rda.dataset.distribution.host.description`
        - `rda.dataset.distribution.host.geo_location`
        - `rda.dataset.distribution.host.pid_system`
        - `rda.dataset.distribution.host.storage_type`
        - `rda.dataset.distribution.host.title`
        - `rda.dataset.distribution.host.url`
        - `rda.dataset.distribution.host.support_versioning`
        - `rda.dataset.distribution.license`
        - `rda.dataset.distribution.license.license_ref`
        - `rda.dataset.distribution.license.start_date`
        - `rda.dataset.distribution.title`
        - `rda.dataset.keyword`
        - `rda.dataset.language`
        - `rda.dataset.metadata.description`
        - `rda.dataset.metadata.language`
        - `rda.dataset.metadata.metadata_standard_id`
        - `rda.dataset.metadata.metadata_standard_id.identifier`
        - `rda.dataset.metadata.metadata_standard_id.type`
        - `rda.dataset.personal_data`
        - `rda.dataset.preservation_statement`
        - `rda.dataset.security_and_privacy`
        - `rda.dataset.security_and_privacy.description`
        - `rda.dataset.security_and_privacy.title`
        - `rda.dataset.sensitive_data`
        - `rda.dataset.technical_resource.description`
        - `rda.dataset.technical_resource.name`
        - `rda.dataset.title`
        - `rda.dataset.type`
        - `rda.dataset.issued`
        - `rda.dataset.dataset_id`
        - `rda.dataset.dataset_id.identifier`
        - `rda.dataset.dataset_id.type`
        - `rda.dataset.description`
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="raid" label="RAiD">
      :::tip See the full mapping
      [RAiD JSON — semantics reference](/versioned_docs/version-1.x/optional-services/file-transformers/raid-json-semantics.md) documents which RAiD JSON output field each semantic populates.
      :::
      - `raid.identifier.id`
      - `raid.identifier.schemaUri`
      - `raid.identifier.registrationAgency.id`
      - `raid.identifier.registrationAgency.schemaUri`
      - `raid.identifier.owner.id`
      - `raid.identifier.owner.schemaUri`
      - `raid.identifier.owner.servicePoint`
      - `raid.identifier.license`
      - `raid.identifier.version`
      - `raid.date.startDate`
      - `raid.date.endDate`
      - `raid.title.text`
      - `raid.title.type.id`
      - `raid.title.type.schemaUri`
      - `raid.title.language.id`
      - `raid.title.language.schemaUri`
      - `raid.title.startDate`
      - `raid.title.endDate`
      - `raid.description.text`
      - `raid.description.type.id`
      - `raid.description.type.schemaUri`
      - `raid.description.language.id`
      - `raid.description.language.schemaUri`
      - `raid.contributor.id`
      - `raid.contributor.schemaUri`
      - `raid.contributor.position.id`
      - `raid.contributor.position.schemaUri`
      - `raid.contributor.position.startDate`
      - `raid.contributor.position.endDate`
      - `raid.contributor.leader`
      - `raid.contributor.contact`
      - `raid.contributor.role.id`
      - `raid.contributor.role.schemaUri`
      - `raid.organisation.id`
      - `raid.organisation.schemaUri`
      - `raid.organisation.role.id`
      - `raid.organisation.role.schemaUri`
      - `raid.organisation.role.startDate`
      - `raid.organisation.role.endDate`
      - `raid.relatedObject.id`
      - `raid.relatedObject.schemaUri`
      - `raid.relatedObject.type.id`
      - `raid.relatedObject.type.schemaUri`
      - `raid.relatedObject.category.id`
      - `raid.relatedObject.category.schemaUri`
      - `raid.alternateIdentifier.id`
      - `raid.alternateIdentifier.type`
      - `raid.alternateUrl.url`
      - `raid.relatedRaid.id`
      - `raid.relatedRaid.type.id`
      - `raid.relatedRaid.type.schemaUri`
      - `raid.access.type.id`
      - `raid.access.type.schemaUri`
      - `raid.access.embargoExpiry`
      - `raid.access.statement.text`
      - `raid.access.statement.language.id`
      - `raid.access.statement.language.schemaUri`
  </TabItem>
  <TabItem value="deposits" label="Deposit & Integrations">
    <Tabs>
      <TabItem value="zenodo" label="Zenodo">
        :::tip See the full mapping
        [Zenodo — semantics reference](/versioned_docs/version-1.x/optional-services/deposit-services/zenodo-semantics.md) documents which Zenodo metadata field each semantic populates.
        :::
        - `zenodo.community`
        - `zenodo.subject`
        - `zenodo.language`
        - `zenodo.reference`
        - `zenodo.additional_title.title`
        - `zenodo.additional_title.type`
        - `zenodo.additional_title.language`
        - `zenodo.publishing_information.journal.title`
        - `zenodo.publishing_information.journal.issn`
        - `zenodo.publishing_information.journal.volume`
        - `zenodo.publishing_information.journal.issue`
        - `zenodo.publishing_information.journal.page_range_or_article_number`
        - `zenodo.publishing_information.imprint.title`
        - `zenodo.publishing_information.imprint.isbn`
        - `zenodo.publishing_information.imprint.place`
        - `zenodo.publishing_information.imprint.pagination`
        - `zenodo.publishing_information.thesis.university`
        - `zenodo.related_identifiers.isCitedBy`
        - `zenodo.related_identifiers.cites`
        - `zenodo.related_identifiers.isSupplementTo`
        - `zenodo.related_identifiers.isSupplementedBy`
        - `zenodo.related_identifiers.isContinuedBy`
        - `zenodo.related_identifiers.continues`
        - `zenodo.related_identifiers.isDescribedBy`
        - `zenodo.related_identifiers.describes`
        - `zenodo.related_identifiers.hasMetadata`
        - `zenodo.related_identifiers.isMetadataFor`
        - `zenodo.related_identifiers.isNewVersionOf`
        - `zenodo.related_identifiers.isPreviousVersionOf`
        - `zenodo.related_identifiers.isPartOf`
        - `zenodo.related_identifiers.hasPart`
        - `zenodo.related_identifiers.isReferencedBy`
        - `zenodo.related_identifiers.references`
        - `zenodo.related_identifiers.isDocumentedBy`
        - `zenodo.related_identifiers.documents`
        - `zenodo.related_identifiers.isCompiledBy`
        - `zenodo.related_identifiers.compiles`
        - `zenodo.related_identifiers.isVariantFormOf`
        - `zenodo.related_identifiers.isOriginalFormof`
        - `zenodo.related_identifiers.isIdenticalTo`
        - `zenodo.related_identifiers.isAlternateIdentifier`
        - `zenodo.related_identifiers.isReviewedBy`
        - `zenodo.related_identifiers.reviews`
        - `zenodo.related_identifiers.isDerivedFrom`
        - `zenodo.related_identifiers.isSourceOf`
        - `zenodo.related_identifiers.requires`
        - `zenodo.related_identifiers.isRequiredBy`
        - `zenodo.related_identifiers.isObsoletedBy`
        - `zenodo.related_identifiers.obsoletes`
        - `zenodo.publication_date`
        - `zenodo.related_identifiers.scheme.ark`
        - `zenodo.related_identifiers.scheme.arxiv`
        - `zenodo.related_identifiers.scheme.ads`
        - `zenodo.related_identifiers.scheme.crossreffunderid`
        - `zenodo.related_identifiers.scheme.doi`
        - `zenodo.related_identifiers.scheme.ean13`
        - `zenodo.related_identifiers.scheme.eissn`
        - `zenodo.related_identifiers.scheme.grid`
        - `zenodo.related_identifiers.scheme.handle`
        - `zenodo.related_identifiers.scheme.igsn`
        - `zenodo.related_identifiers.scheme.isbn`
        - `zenodo.related_identifiers.scheme.isni`
        - `zenodo.related_identifiers.scheme.issn`
        - `zenodo.related_identifiers.scheme.istc`
        - `zenodo.related_identifiers.scheme.lissn`
        - `zenodo.related_identifiers.scheme.lsid`
        - `zenodo.related_identifiers.scheme.pmid`
        - `zenodo.related_identifiers.scheme.purl`
        - `zenodo.related_identifiers.scheme.upc`
        - `zenodo.related_identifiers.scheme.url`
        - `zenodo.related_identifiers.scheme.urn`
        - `zenodo.related_identifiers.scheme.w3id`
        - `zenodo.related_identifiers.scheme.other`
        - `zenodo.alternate-identifiers.scheme.ark`
        - `zenodo.alternate-identifiers.scheme.arxiv`
        - `zenodo.alternate-identifiers.scheme.ads`
        - `zenodo.alternate-identifiers.scheme.crossreffunderid`
        - `zenodo.alternate-identifiers.scheme.doi`
        - `zenodo.alternate-identifiers.scheme.ean13`
        - `zenodo.alternate-identifiers.scheme.eissn`
        - `zenodo.alternate-identifiers.scheme.grid`
        - `zenodo.alternate-identifiers.scheme.handle`
        - `zenodo.alternate-identifiers.scheme.igsn`
        - `zenodo.alternate-identifiers.scheme.isbn`
        - `zenodo.alternate-identifiers.scheme.isni`
        - `zenodo.alternate-identifiers.scheme.issn`
        - `zenodo.alternate-identifiers.scheme.istc`
        - `zenodo.alternate-identifiers.scheme.lissn`
        - `zenodo.alternate-identifiers.scheme.lsid`
        - `zenodo.alternate-identifiers.scheme.pmid`
        - `zenodo.alternate-identifiers.scheme.purl`
        - `zenodo.alternate-identifiers.scheme.upc`
        - `zenodo.alternate-identifiers.scheme.url`
        - `zenodo.alternate-identifiers.scheme.urn`
        - `zenodo.alternate-identifiers.scheme.w3id`
        - `zenodo.alternate-identifiers.scheme.other`
        - `zenodo.date_type.accepted`
        - `zenodo.date_type.available`
        - `zenodo.date_type.collected`
        - `zenodo.date_type.copyrighted`
        - `zenodo.date_type.created`
        - `zenodo.date_type.issued`
        - `zenodo.date_type.other`
        - `zenodo.date_type.submitted`
        - `zenodo.date_type.updated`
        - `zenodo.date_type.valid`
        - `zenodo.date_type.withdrawn`
        - `zenodo.conference.title`
        - `zenodo.conference.acronym`
        - `zenodo.conference.place`
        - `zenodo.conference.dates`
        - `zenodo.conference.website`
        - `zenodo.conference.session`
        - `zenodo.conference.part`
        - `zenodo.software.repository-url`
        - `zenodo.software.programming-language`
        - `zenodo.software.development-status`
        - `zenodo.metadata.rights.link`
        - `zenodo.metadata.contributors.person_or_org.given_name`
        - `zenodo.metadata.contributors.person_or_org.family_name`
      </TabItem>
      <TabItem value="dspace" label="DSpace">
        :::tip See the full mapping
        [DSpace — semantics reference](/versioned_docs/version-1.x/optional-services/deposit-services/dspace-semantics.md) documents which Dublin Core field each semantic populates.
        :::
        - `dspace.identifier.citation`
        - `dspace.identifier.govdoc`
        - `dspace.identifier.isbn`
        - `dspace.identifier.ismn`
        - `dspace.identifier.other`
        - `dspace.identifier.uri`
        - `dspace.description`
        - `dspace.description.provenance`
        - `dspace.description.sponsorship`
        - `dspace.title.alternative`
        - `dspace.type`
        - `dspace.publisher`
        - `dspace.language.iso`
        - `dspace.contributor.author`
        - `dspace.date.accessioned`
        - `dspace.date.available`
      </TabItem>
      <TabItem value="ckan" label="CKAN">
        :::tip See the full mapping
        [CKAN — semantics reference](/versioned_docs/version-1.x/optional-services/deposit-services/ckan-semantics.md) documents which CKAN API field each semantic populates.
        :::
        - `ckan.dataset.type`
        - `ckan.dataset.organization`
        - `ckan.dataset.license`
        - `ckan.dataset.source`
        - `ckan.dataset.tags`
        - `ckan.dataset.extras`
        - `ckan.dataset.relationships_as_object.depends_on`
        - `ckan.dataset.relationships_as_object.dependency_of`
        - `ckan.dataset.relationships_as_object.derives_from`
        - `ckan.dataset.relationships_as_object.has_derivation`
        - `ckan.dataset.relationships_as_object.links_to`
        - `ckan.dataset.relationships_as_object.linked_from`
        - `ckan.dataset.relationships_as_object.child_of`
        - `ckan.dataset.relationships_as_object.parent_of`
        - `ckan.dataset.relationships_as_subject.depends_on`
        - `ckan.dataset.relationships_as_subject.dependency_of`
        - `ckan.dataset.relationships_as_subject.derives_from`
        - `ckan.dataset.relationships_as_subject.has_derivation`
        - `ckan.dataset.relationships_as_subject.links_to`
        - `ckan.dataset.relationships_as_subject.linked_from`
        - `ckan.dataset.relationships_as_subject.child_of`
        - `ckan.dataset.relationships_as_subject.parent_of`
      </TabItem>
      <TabItem value="dataverse" label="Dataverse">
        :::tip See the full mapping
        [Dataverse — semantics reference](/versioned_docs/version-1.x/optional-services/deposit-services/dataverse-semantics.md) documents which Dataverse citation-block field each semantic populates.
        :::
        - `dataverse.identifier`
        - `dataverse.dataset.subject`
        - `dataverse.dataset.description`
        - `dataverse.dataset.alternative_title`
        - `dataverse.dataset.subtitle`
        - `dataverse.dataset.alternative_url`
        - `dataverse.dataset.date_of_deposit`
        - `dataverse.dataset.notes`
        - `dataverse.author.name`
        - `dataverse.author.affiliation`
        - `dataverse.point_of_contact.name`
        - `dataverse.point_of_contact.email`
        - `dataverse.point_of_contact.affiliation`
        - `dataverse.related_publication.identifier`
        - `dataverse.related_publication.citation`
        - `dataverse.related_publication.url`
        - `dataverse.related_publication.relation_type`
        - `dataverse.related_publication.identifier_type`
        - `dataverse.related_publication.relation_type.isCitedBy`
        - `dataverse.related_publication.relation_type.Cites`
        - `dataverse.related_publication.relation_type.IsSupplementTo`
        - `dataverse.related_publication.relation_type.IsSupplementedBy`
        - `dataverse.related_publication.relation_type.IsContinuedBy`
        - `dataverse.related_publication.relation_type.Continues`
        - `dataverse.related_publication.relation_type.References`
        - `dataverse.related_publication.relation_type.IsReferencedBy`
        - `dataverse.related_publication.identifier_type.ark`
        - `dataverse.related_publication.identifier_type.arxiv`
        - `dataverse.related_publication.identifier_type.bibcode`
        - `dataverse.related_publication.identifier_type.cstr`
        - `dataverse.related_publication.identifier_type.doi`
        - `dataverse.related_publication.identifier_type.ean13`
        - `dataverse.related_publication.identifier_type.eissn`
        - `dataverse.related_publication.identifier_type.handle`
        - `dataverse.related_publication.identifier_type.isbn`
        - `dataverse.related_publication.identifier_type.issn`
        - `dataverse.related_publication.identifier_type.lissn`
        - `dataverse.related_publication.identifier_type.lsid`
        - `dataverse.related_publication.identifier_type.pmid`
        - `dataverse.related_publication.identifier_type.purl`
        - `dataverse.related_publication.identifier_type.upc`
        - `dataverse.related_publication.identifier_type.url`
        - `dataverse.related_publication.identifier_type.urm`
        - `dataverse.related_publication.identifier_type.DASH-NRS`
        - `dataverse.keyword.term`
        - `dataverse.keyword.term_uri`
        - `dataverse.keyword.controlled_vocabulary_name`
        - `dataverse.keyword.controlled_vocabulary_url`
        - `dataverse.other_identifier.agency`
        - `dataverse.other_identifier.identifier`
        - `dataverse.contributor.type.data_collector`
        - `dataverse.contributor.type.data_curator`
        - `dataverse.contributor.type.data_manager`
        - `dataverse.contributor.type.editor`
        - `dataverse.contributor.type.funder`
        - `dataverse.contributor.type.hosting_institution`
        - `dataverse.contributor.type.project_leader`
        - `dataverse.contributor.type.project_manager`
        - `dataverse.contributor.type.project_member`
        - `dataverse.contributor.type.related_person`
        - `dataverse.contributor.type.researcher`
        - `dataverse.contributor.type.research_group`
        - `dataverse.contributor.type.rights_holder`
        - `dataverse.contributor.type.sponsor`
        - `dataverse.contributor.type.supervisor`
        - `dataverse.contributor.type.work_package_leader`
        - `dataverse.contributor.type.other`
      </TabItem>
      <TabItem value="fedora" label="Fedora">
        :::tip See the full mapping
        [Fedora — semantics reference](/versioned_docs/version-1.x/optional-services/deposit-services/fedora-semantics.md) documents which Dublin Core element each semantic populates.
        :::
        - `fedora.creator`
        - `fedora.subject`
        - `fedora.description`
        - `fedora.publisher`
        - `fedora.contributor`
        - `fedora.type`
        - `fedora.format`
        - `fedora.identifier`
        - `fedora.source`
        - `fedora.language`
        - `fedora.relation`
        - `fedora.coverage`
        - `fedora.rights`
      </TabItem>
      <TabItem value="heal_link" label="HEAL-Link">
        - `heal_link.notes`
        - `heal_link.creator_user_id`
        - `heal_link.id`
        - `heal_link.organization.title`
        - `heal_link.organization.description`
        - `heal_link.organization.state`
        - `heal_link.organization.name`
        - `heal_link.organization.type`
        - `heal_link.organization.created`
        - `heal_link.organization.is_organization`
        - `heal_link.organization.approval_status`
        - `heal_link.organization.image_url`
        - `heal_link.datacite_doi`
        - `heal_link.type`
        - `heal_link.title_optional`
        - `heal_link.archived`
        - `heal_link.contact_email`
        - `heal_link.dataset_preview`
        - `heal_link.embargo_date`
        - `heal_link.is_requestdata_type`
        - `heal_link.isopen`
        - `heal_link.license_id`
        - `heal_link.license_title`
        - `heal_link.license_url`
        - `heal_link.maintainer`
        - `heal_link.maintainer_email`
        - `heal_link.package_creator`
        - `heal_link.metadata_created`
        - `heal_link.metadata_modified`
        - `heal_link.name`
        - `heal_link.notes_optional`
        - `heal_link.num_resources`
        - `heal_link.num_tags`
        - `heal_link.owner_org`
        - `heal_link.private`
        - `heal_link.publication_year`
        - `heal_link.qa_completed`
        - `heal_link.solr_additions`
        - `heal_link.subnational`
        - `heal_link.title`
        - `heal_link.state`
        - `heal_link.url`
        - `heal_link.version`
      </TabItem>
      <TabItem value="fair_sharing_policies" label="FAIRsharing Policies">
        - `fair_sharing_policies.data.attributes.metadata.doi`
        - `fair_sharing_policies.data.attributes.metadata.name`
        - `fair_sharing_policies.data.attributes.metadata.contacts.contact_name`
        - `fair_sharing_policies.data.attributes.metadata.contacts.contact_email`
        - `fair_sharing_policies.data.attributes.metadata.homepage`
        - `fair_sharing_policies.data.attributes.metadata.description`
        - `fair_sharing_policies.data.attributes.metadata.sharing_data.notes`
        - `fair_sharing_policies.data.attributes.metadata.sharing_data.mandated_data_sharing`
        - `fair_sharing_policies.data.attributes.metadata.sharing_data.exceptions_to_data_sharing`
        - `fair_sharing_policies.data.attributes.metadata.data_citation.notes`
        - `fair_sharing_policies.data.attributes.metadata.data_citation.value`
        - `fair_sharing_policies.data.attributes.metadata.data_protection.notes`
        - `fair_sharing_policies.data.attributes.metadata.data_protection.value`
        - `fair_sharing_policies.data.attributes.metadata.sharing_metadata.notes`
        - `fair_sharing_policies.data.attributes.metadata.sharing_metadata.value`
        - `fair_sharing_policies.data.attributes.metadata.data_preservation.value`
        - `fair_sharing_policies.data.attributes.metadata.licences_for_outputs.notes`
        - `fair_sharing_policies.data.attributes.metadata.licences_for_outputs.required`
        - `fair_sharing_policies.data.attributes.metadata.sharing_research_software.notes`
        - `fair_sharing_policies.data.attributes.metadata.sharing_research_software.value`
        - `fair_sharing_policies.data.attributes.metadata.data_availability_statement.notes`
        - `fair_sharing_policies.data.attributes.metadata.data_availability_statement.required`
        - `fair_sharing_policies.data.attributes.subjects`
        - `fair_sharing_policies.data.attributes.metadata.compliance.notes`
        - `fair_sharing_policies.data.attributes.metadata.compliance.monitoring_of_compliance`
        - `fair_sharing_policies.data.attributes.metadata.compliance.guidance_to_help_enable_compliance`
        - `fair_sharing_policies.data.attributes.metadata.dmp_development.notes`
        - `fair_sharing_policies.data.attributes.metadata.dmp_development.timing_of_dmp`
        - `fair_sharing_policies.data.attributes.metadata.dmp_development.updating_of_dmp`
        - `fair_sharing_policies.data.attributes.metadata.dmp_development.mandated_dmp_creation`
        - `fair_sharing_policies.data.attributes.metadata.supported_costs.notes`
        - `fair_sharing_policies.data.attributes.metadata.supported_costs.value`
        - `fair_sharing_policies.data.attributes.metadata.data_preservation.notes`
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>
