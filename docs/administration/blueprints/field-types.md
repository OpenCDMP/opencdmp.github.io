---
sidebar_position: 1
description: View details about the field types
---

# Field Types

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In general, there are tree categories of fields that can be used.

- **System**: These are predefined fields that refer to system or specification information when filled by the end users. The available system fields are the following:
  - **Title**: Refers to a title of an entity.
  - **Description**: Refers to a description of an entity.
  - **Language**: Refers to the language to be used. The languages being displayed to the end user are discussed [here](/docs/administration/languages.md).
  - **Contact**: Refers to contact information about who should be responsible for the entity.
  - **Access**: Indicates if an entity is publicly available. The end user will have to select between `Public` or `Restricted`.
  - **User**: Refers to users registered to the platform.
- **External Reference**: These are fields that connect to a locally defined or an external source (an  external API in most cases). There is more information available in the [Reference Types](/docs/administration/reference-types.md) section.
- **Custom**: These are generic fields that can be added to provide any type of information. The available data types are the following:
  - **Text**: a regular text box (one line)
  - **Rich Text**: a rich text editor
  - **Date**: date input
  - **Number**: number input