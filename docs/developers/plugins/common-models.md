---
sidebar_position: 4
---

# Common Models

:::info
[Common Models](https://mvnrepository.com/artifact/org.opencdmp/common-models) is a **Maven package** that provides shared models and classes used across the **OpenCDMP** platform. These models standardize the data structures and communication between the various services and microservices that make up the OpenCDMP ecosystem.
:::

## Overview

The **[common-models](https://github.com/OpenCDMP/common-models)** repository contains Java classes that are central to the functioning of the OpenCDMP platform. These models define the data structures used for: [plans](user-guide/plans/index.md), [descriptions](user-guide/descriptions/index.md), [file transformers](developers/plugins/file-transformers.md), [repository deposits](developers/plugins/deposit.md) and [evaluators](developers/plugins/evaluator.md). By using these common models, services in OpenCDMP can maintain consistent communication, ensuring interoperability and data integrity

## Key Models

### 1. PlanModel.java

This class defines the structure for a **Plan** used across OpenCDMP.

```java
public class PlanModel {

    private UUID id;
    private short version;
    private String label;
    private String description;

    /*
    * Enum class that have either Public or Restricted
    */
    private PlanAccessType accessType;
     
    /*
    * Object that contains plan status info (id, name, internalStatus)
    */
    private PlanStatus status;
    
    /*
    * Object that contains plan owner info (id, name, usercontact info)
    */
    private UserModel creator; 
    
    /*
    * Object that contains plan blueprint info (id, label, definition with all available sections, status, groupId)
    */
    private PlanBlueprintModel planBlueprint;

    /*
    * Object that contains properties for the plan. Properties are the values from blueprint sections and contacts if blueprint has contact field.
    */
    private PlanPropertiesModel properties;
    
    /*
    * List of objects that contains info of deposit sources for the plan. Each class contains id, doi, and repositoryId
    */
    private List<EntityDoiModel> entityDois;

    /*
    * List of objects that contains descriptions for the plan
    */
    private List<DescriptionModel> descriptions;

    /*
    * List of objects that contains plan's users info. Each object contains id, entire user model, role and section id that has this role 
    */
    private List<PlanUserModel> users;
    
    /*
    * List of objects that contains all references that used in this plan. Each object contains id, reference object, and field id that contains this reference
    */
    private List<PlanReferenceModel> references;

    /*
    * List of objects that all description templates that used in this plan. Each object contains description template group id and section id that contains this template
    */
    private List<PlanDescriptionTemplateModel> descriptionTemplates;

    /*
    * Object that stores the plan as a pdf file. Contains file name, file reference, type and the content of the file in byte array type 
    */
    private FileEnvelopeModel pdfFile;

    /*
    * Object that stores the plan as a json file. Contains file name, file reference, type and the content of the file in byte array type 
    */
    private FileEnvelopeModel rdaJsonFile;
    private FileEnvelopeModel raidJsonFile;
    private FileEnvelopeModel supportingFilesZip;

    /*
    * The doi for the last deposit plan's version 
    */
    private String previousDOI;

    /*
    * Τhe latest date a plan was finalized  
    */
    private Instant finalizedAt;

    /*
    * Τhe latest date a plan was deposited  
    */
    private Instant publicAfter;

    /*
    * Τhe latest date a plan was updated  
    */
    private Instant updatedAt;

    /*
    * Τhe date a plan was created  
    */
    private Instant createdAt;
    private String language;

    // Getters and Setters...
}
```

### 2. DescriptionModel.java

This class represents the structure for **Descriptions** related to a Plan, typically providing detailed explanations of the content or components of the plan.

```java
public class DescriptionModel {

    private UUID id;
    private String label;
    private String description;
    private List<String> tags;

    /*
    * Object that contains description status info (id, name, internal status)
    */
    private DescriptionStatus status;

    /*
    * Object that contains description Template info (id, label, description, description template type, groupId, version, language, definition of available queries and inputs)
    */
    private DescriptionTemplateModel descriptionTemplate;
    private PlanModel plan;

    /*
    * In which plan's section description was created
    */
    private UUID sectionId;
    private Instant createdAt;

    private PropertyDefinitionModel properties;
    
    /*
    * Adjusts which fields are visible in the body
    */
    private List<VisibilityStateModel> visibilityStates;

    // Getters and Setters...
}
```

### 3. ConfigurationField.java

This class represents the structure for **Configuration** related to Plugins. This can be used for additional configurations in [file transformers](developers/plugins/file-transformers.md#3-filetransformerconfigurationjava), [repository deposits](developers/plugins/deposit.md#3-depositconfigurationjava) and [evaluators](developers/plugins/evaluator.md#3-evaluatorconfigurationjava).

```java
public class ConfigurationField {
    /*
    *Identifier for the configurable plugin.
    */ 
    private String code;

    /*
    *Enum class that have either String or File
    */
    private DataType type;

    /*
    *Identifier for the plugin.
    */
    private String label;

    /*
    * List of Enum class that have either Plan or Description
    */
    private List<PluginEntityType> appliesTo;

    /*
    * Value to check if the field need encryption
    */
    private boolean authInfo;

}
```

### 4. PluginModel.java

This class contains information from ConfigurationField that are central to configuring the plugins. These model defines the additional configurations used for: [file transformers](developers/plugins/file-transformers.md), [repository deposits](developers/plugins/deposit.md) and [evaluators](developers/plugins/evaluator.md). 

```java
public class PluginModel {

    /*
    *Identifier for the configurable plugin.
    */ 
    private String code;

    /*
    *Enum class that have the available plugins. Evaluator, File Transformer, Deposit
    */
    private PluginType type;

    /*
    * List of objects that contains all plugin data that used in the selected plugin.
    */
    private List<PluginFieldModel> fields;

    /*
    * List of objects that contains all plugin user data that used in the selected plugin.
    */
    private List<PluginUserFieldModel> fields;


    // Getters and Setters...
}
```
These model extracts data from every available plugin from [configuration field](developers/plugins/common-models.md#3-configurationfieldjava). 
```java
public class PluginFieldModel {

    /*
    *Identifier for the configurable plugin.
    */ 
    private String code;

    /*
    *Identifier for the text value.
    */
    private String textValue;

    /*
    *Identifier for the file value
    */
    private FileEnvelopeModel file;

    // Getters and Setters...
}
```

These model extracts data from every available plugin from [configuration field](developers/plugins/common-models.md#3-configurationfieldjava). 
```java
public class PluginUserFieldModel {

    /*
    *Identifier for the configurable plugin.
    */ 
    private String code;

    /*
    *Identifier for the text value.
    */
    private String textValue;

    /*
    *Identifier for the file value
    */
    private FileEnvelopeModel file;

    // Getters and Setters...
}
```

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

## End notes

:::note
You can view `Common Models` source code [here](https://github.com/OpenCDMP/common-models).
:::