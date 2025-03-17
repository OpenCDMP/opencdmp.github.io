import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

By **Semantics** we mean a relation a field can have with a part of a data archive specification. When the users try to add semantics, a list of suggestions drops down, containing semantics for `RDA` and `Zenodo`.

:::

These are the semantics suggestions.

<Tabs>
  <TabItem value="rda" label="RDA" className="outer-tab">
    <Tabs>
      <TabItem value="plans" label="Plans">
        - `rda.dmp.contact`
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
        - `rda.dmp.project.funding`
        - `rda.dmp.project.funding.funder_id.identifier`
        - `rda.dmp.project.funding.funder_id.type`
        - `rda.dmp.project.funding.funding_status`
        - `rda.dmp.project.funding.grant_id.identifier`
        - `rda.dmp.project.funding.grant_id.type`
        - `rda.dmp.project.start`
        - `rda.dmp.dmp.project.title`
        - `rda.dmp.title`
      </TabItem>
      <TabItem value="descriptions" label="Descriptions">
        - `rda.dataset.data_quality_assurance`
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
        - `rda.dataset.distribution.host.supports_versioning`
        - `rda.dataset.distribution.host.title`
        - `rda.dataset.distribution.host.url`
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
  <TabItem value="zenodo" label="Zenodo">
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
  </TabItem>
</Tabs>